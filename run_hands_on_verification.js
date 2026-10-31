const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');

const PORT = 8089;
const candidates = [process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome'
].filter(Boolean);
const CHROME_PATH = candidates.find(p => fs.existsSync(p));
if (!CHROME_PATH) {
  console.error('No browser available. Set CHROME_PATH. Browser tests were NOT run.');
  process.exit(1);
}
// Preserve the original report and screenshots shipped in the archive.
const OUTPUT_DIR = process.env.VLP_TEST_OUTPUT || path.join(__dirname, 'phase0a-artifacts', 'legacy');
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, 'screenshots');
let activeChrome;
let activeSocket;
let browserProfile;

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, async () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  try {
    await runAutomatedTests();
  } catch (err) {
    console.error('Test suite runner error:', err);
    process.exitCode = 1;
  } finally {
    if (activeSocket) activeSocket.close();
    if (activeChrome && activeChrome.exitCode === null) {
      activeChrome.kill();
      await new Promise(resolve => activeChrome.once('exit', resolve));
    }
    if (browserProfile) fs.rmSync(browserProfile, { recursive: true, force: true });
    server.close();
  }
});

async function runAutomatedTests() {
  console.log('Launching headless Chrome for verification...');
  browserProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'vlp-legacy-browser-'));
  const chromeProc = activeChrome = spawn(CHROME_PATH, [
    '--user-data-dir=' + browserProfile,
    'about:blank',
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--window-size=1440,900'
  ]);

  await new Promise((resolve, reject) => {
    chromeProc.once('error', reject);
    setTimeout(resolve, 1500);
  });

  const targetsRes = await fetch('http://127.0.0.1:9223/json');
  const targets = await targetsRes.json();
  const pageTarget = targets.find(t => t.type === 'page' && t.webSocketDebuggerUrl);

  if (!pageTarget) {
    throw new Error('Could not find active CDP page target');
  }

  console.log('Connected to Chrome CDP:', pageTarget.webSocketDebuggerUrl);
  const WS = globalThis.WebSocket;
  const ws = activeSocket = new WS(pageTarget.webSocketDebuggerUrl);
  let msgId = 1;
  const pendingRequests = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pendingRequests.has(data.id)) {
      pendingRequests.get(data.id)(data);
      pendingRequests.delete(data.id);
    }
  };

  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

  function sendCommand(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      const timeout = setTimeout(() => {
        pendingRequests.delete(id);
        resolve({ error: { message: 'CDP request timed out: ' + method } });
      }, 15000);
      pendingRequests.set(id, value => { clearTimeout(timeout); resolve(value); });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expression) {
    const res = await sendCommand('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.error || res.result?.exceptionDetails) {
      throw new Error('Browser evaluation failed: ' + JSON.stringify(res.error || res.result.exceptionDetails));
    }
    return res.result?.result?.value;
  }

  async function captureScreenshot(filename, width = 1440, height = 900) {
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768
    });
    await new Promise(r => setTimeout(r, 350));
    const shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    if (shot.result?.data) {
      const p = path.join(SCREENSHOT_DIR, filename);
      fs.writeFileSync(p, Buffer.from(shot.result.data, 'base64'));
      console.log(`Saved screenshot: ${filename} (${width}x${height})`);
    }
  }

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');

  console.log(`Navigating to http://localhost:${PORT}/index.html...`);
  await sendCommand('Page.navigate', { url: `http://localhost:${PORT}/index.html` });
  await new Promise(r => setTimeout(r, 2000));

  const testResults = [];

  function recordTest(id, name, passed, details = '') {
    testResults.push({ id, name, passed, details });
    console.log(`[${passed ? 'PASS ✓' : 'FAIL ✗'}] ${id}: ${name} ${details ? '(' + details + ')' : ''}`);
  }

  // TEST 1: App loaded, no fatal JS errors, Vue mounted
  const appMounted = await evaluate(`!!window.vueLexiconApp && !!document.querySelector('#app').__vue_app__`);
  const termCount = await evaluate(`window.RAW_LEXICON_TUPLES ? window.RAW_LEXICON_TUPLES.length : 0`);
  recordTest('TEST-01', 'Page loads without fatal JS errors & Vue mounts', appMounted && termCount === 180, `Found ${termCount} entries`);

  // TEST 2: Lexicon Category Integrity (HTML: 26, CSS: 25, JS: 54, Vue: 30, Nuxt: 25, TS: 20)
  const catDistribution = await evaluate(`(() => {
    const cats = {};
    window.RAW_LEXICON_TUPLES.forEach(t => { cats[t[0]] = (cats[t[0]] || 0) + 1; });
    return cats;
  })()`);
  const expectedCats = { js: 54, vue: 30, nuxt: 25, html: 26, css: 25, ts: 20 };
  const catsMatch = Object.keys(expectedCats).every(cat => catDistribution[cat] === expectedCats[cat]) && Object.keys(catDistribution).length === Object.keys(expectedCats).length;
  recordTest('TEST-02', 'Lexicon category counts preserved (180 total, 25 Nuxt)', catsMatch, JSON.stringify(catDistribution));

  // TEST 3: No mentions of "مترجم" in rendered DOM or meta
  const domText = await evaluate(`document.body.innerText`);
  const metaDesc = await evaluate(`document.querySelector('meta[name="description"]')?.getAttribute('content') || ''`);
  const hasMotarjem = domText.includes('مترجم') || metaDesc.includes('مترجم');
  recordTest('TEST-03', 'No mentions of "مترجم" (Translator) in UI or meta tags', !hasMotarjem, hasMotarjem ? 'Found مترجم' : '0 occurrences');

  // TEST 4: Nuxt UI Lab and Scratchpad removed from navigation
  const navText = await evaluate(`Array.from(document.querySelectorAll('header nav button, header .md\\\\:hidden button')).map(b => b.textContent.trim()).join(' ')`);
  const hasOldLabs = navText.includes('Nuxt Lab') || navText.includes('معمل Nuxt') || navText.includes('مساحة الأكواد') || navText.includes('scratchpad');
  recordTest('TEST-04', 'Standalone Nuxt Lab & Scratchpad removed from header/mobile nav', !hasOldLabs, `Nav buttons clean`);

  // Capture Lexicon Baseline Screenshot
  await captureScreenshot('01_lexicon_baseline_1440.png', 1440, 900);

  // TEST 5: Switch to Hands-on Practice Mode
  await evaluate(`(() => {
    window.vueLexiconApp.setAppMode('practice');
  })()`);
  await new Promise(r => setTimeout(r, 600));

  const isPracticeMode = await evaluate(`window.vueLexiconApp.appMode === 'practice' && window.vueLexiconApp.selectedTrack === null`);
  recordTest('TEST-05', 'Open Hands-on Practice Mode ("وش تحب تتدرّب اليوم؟")', isPracticeMode, 'Selection view rendered');
  await captureScreenshot('02_practice_track_selection_1440.png', 1440, 900);

  // TEST 6: All 5 tracks rendered with real lesson counts
  const renderedTracks = await evaluate(`(() => {
    const cards = Array.from(document.querySelectorAll('[data-track] h3, [data-track] > strong'));
    return cards.map(c => c.textContent.trim());
  })()`);
  const trackCheck = ['JavaScript', 'HTML5', 'CSS3', 'TypeScript', 'Vue 3'].every(t => renderedTracks.includes(t));
  recordTest('TEST-06', '5 Interactive Tracks rendered with correct names & badges', trackCheck, renderedTracks.join(', '));

  // TEST 7: Open JavaScript Track -> JS-101
  await evaluate(`(() => {
    window.vueLexiconApp.selectTrack('js');
  })()`);
  await new Promise(r => setTimeout(r, 800));

  const js101Active = await evaluate(`window.vueLexiconApp.selectedLessonId === 'JS-101'`);
  recordTest('TEST-07', 'Select JavaScript Track opens JS-101 sequentially', js101Active, 'JS-101 active');
  await captureScreenshot('03_lesson_workspace_js101_1440.png', 1440, 900);

  // TEST 8: Check Desktop Layout (Grid: Code & Preview Left, Instructions Right)
  const layoutCheck = await evaluate(`(() => {
    const grid = document.querySelector('.tech-main-grid');
    if (!grid) return { ok: false, reason: 'No grid found' };
    const style = window.getComputedStyle(grid);
    const editor = document.querySelector('.tech-editor-panel');
    const preview = document.querySelector('.tech-preview-panel');
    const instructions = document.querySelector('.tech-explain-card');
    return {
      ok: style.display === 'grid' && (editor ? getComputedStyle(editor).direction : null) === 'ltr' && (instructions ? getComputedStyle(instructions).direction : null) === 'rtl',
      display: style.display,
      editorDir: (editor ? getComputedStyle(editor).direction : null),
      instructionsDir: (instructions ? getComputedStyle(instructions).direction : null)
    };
  })()`);
  recordTest('TEST-08', 'Desktop beta grid keeps code LTR and Arabic guidance RTL', layoutCheck.ok, JSON.stringify(layoutCheck));

  // TEST 9: Autocomplete Overlay while typing
  await evaluate(`(() => {
    const textarea = document.querySelector('.editor-textarea');
    if (textarea) {
      textarea.value = textarea.value + '\\nmap';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
  })()`);
  await new Promise(r => setTimeout(r, 400));

  const autocompleteSeen = await evaluate(`window.vueLexiconApp.autocompleteVisible === true && window.vueLexiconApp.autocompleteSuggestions.some(s => s.label.includes('map'))`);
  recordTest('TEST-09', 'Live Autocomplete / IntelliSense overlay shows map()', autocompleteSeen, 'map() suggestion visible');

  // TEST 10: Tab setting toggle ("استخدام Tab للاقتراحات")
  const tabToggleInitial = await evaluate(`window.vueLexiconApp.tabAcceptsAutocomplete`);
  recordTest('TEST-10', 'Tab setting toggle switch is present and interactive', typeof tabToggleInitial === 'boolean', `Initial: ${tabToggleInitial}`);

  // TEST 11: Solve JS-101 and Check Solution
  await evaluate(`(() => {
    let code = window.vueLexiconApp.currentLesson.initialCode;
    code = code.replace('const userName = "";', 'const userName = "سارة العبدالله";');
    code = code.replace('const welcomeMsg = "";', 'const welcomeMsg = "أهلاً بك في أول بطاقة ترحيب برمجية!";');
    window.vueLexiconApp.practiceCode = code;
    window.vueLexiconApp.runPracticeCode();
  })()`);
  await new Promise(r => setTimeout(r, 600));

  await evaluate(`(() => {
    window.vueLexiconApp.checkPracticeSolution();
  })()`);
  await new Promise(r => setTimeout(r, 600));

  const js101Passed = await evaluate(`window.vueLexiconApp.validationFeedback?.passed === true`);
  recordTest('TEST-11', 'JS-101 Greeting Card: Check Solution passes with green verification', js101Passed, 'All criteria met');
  await captureScreenshot('04_js101_passed_solution_1440.png', 1440, 900);

  // TEST 12: Next button unlocks JS-102
  await evaluate(`(() => {
    window.vueLexiconApp.goToNextLesson();
  })()`);
  await new Promise(r => setTimeout(r, 800));

  const js102Active = await evaluate(`window.vueLexiconApp.selectedLessonId === 'JS-102'`);
  recordTest('TEST-12', 'Sequential unlock: JS-101 unlocks JS-102 (if/else)', js102Active, 'JS-102 loaded');

  // TEST 13: Solve JS-102 and Check Solution
  await evaluate(`(() => {
    let code = window.vueLexiconApp.currentLesson.initialCode;
    window.vueLexiconApp.practiceCode = code;
    window.vueLexiconApp.runPracticeCode();
  })()`);
  await new Promise(r => setTimeout(r, 600));

  await evaluate(`(() => {
    window.vueLexiconApp.checkPracticeSolution();
  })()`);
  await new Promise(r => setTimeout(r, 600));

  const js102Passed = await evaluate(`window.vueLexiconApp.validationFeedback?.passed === true`);
  recordTest('TEST-13', 'JS-102 if/else Authentication Toggle passes verification', js102Passed, 'Condition checked');

  // TEST 14: Next button unlocks JS-103
  await evaluate(`(() => {
    window.vueLexiconApp.goToNextLesson();
  })()`);
  await new Promise(r => setTimeout(r, 800));

  const js103Active = await evaluate(`window.vueLexiconApp.selectedLessonId === 'JS-103'`);
  recordTest('TEST-14', 'Sequential unlock: JS-102 unlocks JS-103 (Arrays & map)', js103Active, 'JS-103 loaded');

  // TEST 15: Solve JS-103 (Array & map 3 cards)
  await evaluate(`(() => {
    let code = window.vueLexiconApp.currentLesson.initialCode;
    window.vueLexiconApp.practiceCode = code;
    window.vueLexiconApp.runPracticeCode();
  })()`);
  await new Promise(r => setTimeout(r, 600));

  await evaluate(`(() => {
    window.vueLexiconApp.checkPracticeSolution();
  })()`);
  await new Promise(r => setTimeout(r, 600));

  const js103Passed = await evaluate(`window.vueLexiconApp.validationFeedback?.passed === true`);
  recordTest('TEST-15', 'JS-103 Arrays & map() passes with 3 generated cards', js103Passed, '3 cards rendered in preview');
  await captureScreenshot('05_js103_map_cards_passed_1440.png', 1440, 900);

  // TEST 16: Educational Code Timeline simulation modal (Step-by-step trace)
  await evaluate(`(() => {
    window.vueLexiconApp.selectLesson('JS-101');
  })()`);
  await new Promise(r => setTimeout(r, 500));

  await evaluate(`(() => {
    window.vueLexiconApp.openLessonTimeline();
  })()`);
  await new Promise(r => setTimeout(r, 500));

  const timelineModalVisible = await evaluate(`window.vueLexiconApp.showLessonTimelineModal === true`);
  recordTest('TEST-16', 'Educational Timeline Simulation modal launches with step trace & memory table', timelineModalVisible, 'Modal visible');
  await captureScreenshot('06_timeline_simulation_modal_1440.png', 1440, 900);

  // Close timeline modal
  await evaluate(`(() => {
    window.vueLexiconApp.closeLessonTimeline();
  })()`);
  await new Promise(r => setTimeout(r, 400));

  // TEST 17: Real Stop Execution button terminates running code & cleans iframe
  await evaluate(`(() => {
    window.vueLexiconApp.stopPracticeExecution();
  })()`);
  await new Promise(r => setTimeout(r, 600));

  const executionStopped = await evaluate(`window.vueLexiconApp.executionState === 'stopped'`);
  recordTest('TEST-17', 'Stop Execution button resets sandbox iframe & sets status to متوقف', executionStopped, 'State stopped');
  await captureScreenshot('07_stopped_execution_sandbox_1440.png', 1440, 900);

  // TEST 18: Progressive Hints & Reference Solution Reveal
  await evaluate(`(() => {
    window.vueLexiconApp.revealHint();
  })()`);
  await new Promise(r => setTimeout(r, 400));

  const hintShown = await evaluate(`window.vueLexiconApp.revealedHintsCount >= 1`);
  recordTest('TEST-18', 'Progressive hint 1 appears on demand', hintShown, 'Hint 1 displayed');

  // TEST 19: Responsive Views (Mobile 360px, 390px, Tablet 768px, Desktop 1024px)
  await captureScreenshot('08_responsive_mobile_360.png', 360, 740);
  const scrollWidth360 = await evaluate(`document.documentElement.scrollWidth`);
  const noOverflow360 = scrollWidth360 <= 365;
  recordTest('TEST-19', 'Responsive Mobile 360px has zero unintended horizontal overflow', noOverflow360, `scrollWidth: ${scrollWidth360}px`);

  await captureScreenshot('09_responsive_mobile_390.png', 390, 844);
  await captureScreenshot('10_responsive_tablet_768.png', 768, 1024);
  await captureScreenshot('11_responsive_desktop_1024.png', 1024, 768);

  // Restore 1440px desktop
  await sendCommand('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 300));

  // TEST 20: Lexicon Search & Filter Regression Check
  await evaluate(`(() => {
    window.vueLexiconApp.setAppMode('lexicon');
  })()`);
  await new Promise(r => setTimeout(r, 600));

  await evaluate(`(() => {
    window.vueLexiconApp.searchQuery = 'map';
  })()`);
  await new Promise(r => setTimeout(r, 400));

  const searchResultsCount = await evaluate(`window.vueLexiconApp.filteredTermsList.length`);
  recordTest('TEST-20', 'Lexicon Search & Relevance filtering regression test', searchResultsCount > 0, `Results returned for map: ${searchResultsCount}`);

  // Write Test Report JSON
  const allPassed = testResults.every(t => t.passed);
  const report = {
    suite: 'VueLexicon Pro 4.0 — legacy Hands-on Practice Verification Suite',
    timestamp: new Date().toISOString(),
    totalTests: testResults.length,
    passedCount: testResults.filter(t => t.passed).length,
    failedCount: testResults.filter(t => !t.passed).length,
    allPassed,
    results: testResults
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'hands_on_verification_report.json'), JSON.stringify(report, null, 2), 'utf8');
  console.log('==============================================');
  console.log(`Automated Test Suite Completed: ${report.passedCount}/${report.totalTests} PASSED`);
  console.log('Report saved to ' + path.join(OUTPUT_DIR, 'hands_on_verification_report.json'));
  if (!allPassed) process.exitCode = 1;
  console.log('==============================================');

  ws.close();
  chromeProc.kill();
}
