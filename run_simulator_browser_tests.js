/* Actual Chromium checks for replacing learning exams with practical simulation.
 * Uses the same pinned Vue fixture as the 0A suite. CSS/CDN uptime are not tested. */
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/codex/cua_node/lib/node_modules/playwright-core');
const runtimePath = process.env.VUE_TEST_RUNTIME || '/tmp/vuelexicon-vue-3.4.21.js';
if (!fs.existsSync(runtimePath)) throw new Error('Missing Vue 3.4.21 fixture; simulator browser tests were NOT run. See PHASE0A_REPORT.md.');
const vueRuntime = fs.readFileSync(runtimePath);
const curriculumContext = { window: {} };
vm.createContext(curriculumContext);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'practice-curriculum.js'), 'utf8'), curriculumContext);
const lessons = curriculumContext.window.PRACTICE_CURRICULUM.lessons;
const seed = Object.fromEntries(lessons.map((lesson, index) => [lesson.id, {
  status: lesson.id.endsWith('-101') ? 'unlocked' : index % 3 === 0 ? 'passed' : index % 3 === 1 ? 'locked' : 'solution_viewed',
  codeDraft: `<!doctype html><html><body><p id="card">saved ${lesson.id}</p></body></html>`,
  updatedAt: '2026-10-29T06:00:00.000Z'
}]));
const results = [];
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let browser;
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname === '/__fixture_vue_3_4_21.js') {
    res.setHeader('Content-Type', 'application/javascript');
    res.end(vueRuntime); return;
  }
  const file = path.resolve(__dirname, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(__dirname + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404); res.end(); return;
  }
  res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' })[path.extname(file)] || 'application/octet-stream');
  if (pathname === '/practice-curriculum.js') {
    // Opaque-origin child frames may bypass Playwright route interception in this
    // Chromium build. Remap this one CDN URL in the TEST RESPONSE, never on disk.
    const localVue = `http://127.0.0.1:${server.address().port}/__fixture_vue_3_4_21.js`;
    res.end(fs.readFileSync(file, 'utf8').replaceAll('https://unpkg.com/vue@3/dist/vue.global.prod.js', localVue));
    return;
  }
  res.end(fs.readFileSync(file));
});

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({ acceptDownloads: true });
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (process.env.SIMULATOR_TEST_DEBUG) console.log('REQUEST', url.href);
    if (url.origin === base || ['data:', 'about:'].includes(url.protocol)) return route.continue();
    if (/\/vue(?:@|\/)/.test(url.pathname)) return route.fulfill({ contentType: 'application/javascript', body: vueRuntime });
    if (url.hostname === 'cdn.tailwindcss.com') return route.fulfill({ contentType: 'application/javascript', body: 'window.tailwind={config:{}};' });
    if (url.pathname.includes('highlight')) return route.fulfill({ contentType: 'application/javascript', body: 'window.hljs={highlight:(s)=>({value:s.replace(/&/g,"&amp;").replace(/</g,"&lt;")}),highlightAuto:(s)=>({value:s}),getLanguage:()=>true,highlightAll:()=>{}};' });
    return route.fulfill({ body: '', contentType: 'text/plain' });
  });
  await context.addInitScript(initial => {
    if (window !== window.top || sessionStorage.getItem('simulator_seeded')) return;
    localStorage.setItem('vuelexicon_practice_progress', JSON.stringify(initial));
    sessionStorage.setItem('simulator_seeded', 'true');
  }, seed);
  const page = await context.newPage();
  if (process.env.SIMULATOR_TEST_DEBUG) {
    page.on('console', message => { if (message.type() === 'error') console.error('BROWSER', message.text()); });
    page.on('requestfailed', request => console.error('FAILED REQUEST', request.url(), request.failure()?.errorText));
  }
  const pageErrors = [];
  page.on('pageerror', error => { if (error.message !== 'intentional-simulator-error') pageErrors.push(error.message); });
  await page.goto(base, { waitUntil: 'load' });
  await page.waitForFunction(() => window.vueLexiconApp?.practiceLessons?.length === 15);
  const app = (fn, arg) => page.evaluate(({ source, arg }) => (new Function('a', 'arg', `return (${source})(a,arg)`))(window.vueLexiconApp, arg), { source: fn.toString(), arg });
  const persisted = () => page.evaluate(() => JSON.parse(localStorage.getItem('vuelexicon_practice_progress')));
  async function test(name, fn) {
    try { await fn(); results.push({ name, passed: true }); console.log('PASS', name); }
    catch (error) { results.push({ name, passed: false, error: error.message }); console.error('FAIL', name, error.message); }
  }
  async function waitReady() {
    await page.waitForFunction(() => ['preview_ready', 'error'].includes(window.vueLexiconApp.executionState));
  }
  async function select(id) {
    await app((a, id) => { a.selectedTrack = a.practiceLessons.find(l => l.id === id).track; a.selectLesson(id); }, id);
    await waitReady();
  }
  async function editDraft(code) {
    // Beta reference runs show a read-only submitted source. Use the actual draft-view control before typing.
    if (await app(a => a.techEditorView) !== 'draft') {
      await page.locator('.tech-source-switch').getByRole('button', { name: 'مسودتي', exact: true }).click();
    }
    await page.locator('.editor-textarea').fill(code);
  }
  async function run(code) {
    await app((a, code) => { a.practiceCode = code; a.runPracticeCode(); }, code);
    await waitReady();
  }

  await test('simulator entry exists and preserves 180 terms and 15 examples', async () => {
    assert.equal(await app(a => a.rawLexiconData.length), 180);
    assert.equal(await app(a => a.practiceLessons.length), 15);
    await app(a => a.openSimulator());
    assert.equal(await app(a => a.appMode), 'practice');
    assert.equal(await page.getByRole('button', { name: /بنك أسئلة|فحص الحل|تأكيد الإنجاز|إرسال الإجابة/ }).count(), 0);
    assert.equal(await page.getByText('شروط النجاح القابلة للفحص:', { exact: true }).count(), 0);
  });
  await test('all 15 examples open even with locked historical status; navigation changes no historical records', async () => {
    const before = await persisted();
    for (const lesson of lessons) {
      await select(lesson.id);
      assert.equal(await app(a => a.currentLesson.id), lesson.id);
      assert.equal(await app(a => a.practiceCode), seed[lesson.id].codeDraft);
    }
    assert.deepEqual(await persisted(), before);
  });
  await test('previous and next example navigation needs no success grade', async () => {
    await select('JS-101');
    await app(a => a.goToNextLesson());
    await waitReady();
    assert.equal(await app(a => a.currentLesson.id), 'JS-102');
    assert.equal(await app(a => a.getLessonStatus('JS-102')), seed['JS-102'].status);
    await app(a => a.goToPrevLesson());
    await waitReady();
    assert.equal(await app(a => a.currentLesson.id), 'JS-101');
    assert.equal(await page.getByRole('button', { name: /فحص الحل|تأكيد الإنجاز/ }).count(), 0);
  });
  await test('reference display is read-only and does not replace editor or saved draft', async () => {
    await select('JS-101');
    const before = await persisted();
    const draft = await app(a => a.practiceCode);
    await page.getByTestId('simulator-reference-toggle').click();
    assert.equal(await app(a => a.simulatorReferenceVisible), true);
    assert.equal(await page.getByTestId('simulator-reference-panel').locator('textarea,input').count(), 0);
    assert.equal(await page.getByTestId('simulator-reference-panel').locator('code').textContent(), await app(a => a.currentLesson.solution));
    assert.equal(await app(a => a.practiceCode), draft);
    assert.deepEqual(await persisted(), before);
    await page.getByTestId('simulator-reference-toggle').click();
    assert.equal(await app(a => a.simulatorReferenceVisible), false);
  });
  await test('running reference submits a separate session while retaining original draft and historical status', async () => {
    const before = await persisted();
    const draft = await app(a => a.practiceCode);
    await page.getByTestId('tech-reference-run').click();
    await waitReady();
    assert.equal(await app(a => a.activeRun.kind), 'reference');
    assert.equal(await app(a => a.submittedPracticeCode === a.currentLesson.solution), true);
    assert.equal(await app(a => a.practiceCode), draft);
    assert.deepEqual(await persisted(), before);
    await app(a => a.runPracticeCode());
    await waitReady();
    assert.equal(await app(a => a.activeRun.kind), 'draft');
    assert.equal(await app(a => a.submittedPracticeCode), draft);
  });
  await test('manual editing keeps reference preview unchanged until draft run; empty draft survives navigation', async () => {
    await app(a => { a.practiceAutoRun = false; a.runSimulatorReference(); });
    await waitReady();
    const before = await app(a => ({ key: a.practiceIframeKey, doc: a.practiceIframeDoc }));
    await editDraft('');
    await pause(500);
    assert.deepEqual(await app(a => ({ key: a.practiceIframeKey, doc: a.practiceIframeDoc })), before);
    assert.equal((await persisted())['JS-101'].codeDraft, '');
    await select('JS-102');
    await select('JS-101');
    assert.equal(await app(a => a.practiceCode), '');
  });
  await test('sandbox, debounce and old-session message rejection remain active in simulator', async () => {
    await run('<p id="card">first submitted</p>');
    assert.equal(await page.locator('iframe[title="معاينة كود التمرين"]').getAttribute('sandbox'), 'allow-scripts');
    const old = await app(a => ({ runId: a.activeRun.runId, lessonId: a.activeRun.lessonId }));
    await app(a => { a.practiceAutoRun = true; });
    await pause(450);
    const key = await app(a => a.practiceIframeKey);
    await editDraft('<p id="card">latest 1</p>');
    await editDraft('<p id="card">latest 2</p>');
    await pause(550);
    assert.equal(await app(a => a.practiceIframeKey), key + 1);
    assert.equal(await app(a => a.submittedPracticeCode), '<p id="card">latest 2</p>');
    await app((a, old) => {
      const data = { source: 'VUELEXICON_SANDBOX', ...old, type: 'EXECUTION_ERROR', payload: { msg: 'stale reference message', lineno: 0 } };
      window.dispatchEvent(new MessageEvent('message', { source: a.practiceIframeRef.contentWindow, data, origin: 'null' }));
    }, old);
    assert.equal(await app(a => a.executionState), 'preview_ready');
    assert.equal(await app(a => a.practiceLogs.some(l => l.msg.includes('stale reference'))), false);
    await app(a => { a.practiceAutoRun = false; });
  });
  await test('reference and snapshot evidence resets on changing example', async () => {
    await select('JS-101');
    await app(a => { if (!a.simulatorReferenceVisible) a.toggleSimulatorReference(); a.runSimulatorReference(); });
    await waitReady();
    const old = await app(a => ({ runId: a.activeRun.runId, lessonId: a.activeRun.lessonId }));
    await select('HTML-101');
    assert.equal(await app(a => a.simulatorReferenceVisible), false);
    assert.equal(await app(a => a.activeRun.lessonId), 'HTML-101');
    assert.equal(await app(a => a.activeRun.kind), 'draft');
    await app((a, old) => {
      window.dispatchEvent(new MessageEvent('message', { source: a.practiceIframeRef.contentWindow, origin: 'null', data: {
        source: 'VUELEXICON_SANDBOX', ...old, type: 'DOM_SNAPSHOT', payload: { bodyText: 'old reference', cardText: '', appViewText: '', cardElementsCount: 0, cardsContainerCount: 0 }
      } }));
    }, old);
    assert.notEqual(await app(a => a.lastDomSnapshot.bodyText), 'old reference');
  });
  await test('Vue reference is interactive and observations follow real button events without replacing draft', async () => {
    await select('VUE-101');
    const before = await persisted();
    const draft = await app(a => a.practiceCode);
    await page.getByTestId('tech-reference-run').click();
    await waitReady();
    const frame = page.locator('iframe[title="معاينة كود التمرين"]').contentFrame();
    await frame.locator('.count-display').waitFor();
    assert.equal(await frame.locator('.count-display').textContent(), '0');
    await frame.getByRole('button', { name: 'انقر للزيادة ⚡' }).click();
    // Vue rendering and the debounced observation cross two event loops. Require
    // the first real pointer event's result before sending the second; no retries
    // or synthetic DOM clicks are used to manufacture the expected count.
    await frame.locator('.count-display').filter({ hasText: /^1$/ }).waitFor();
    await page.waitForFunction(() => window.vueLexiconApp.simulatorObservation?.bodyText.includes('1'));
    await frame.getByRole('button', { name: 'انقر للزيادة ⚡' }).click();
    await frame.locator('.count-display').filter({ hasText: /^2$/ }).waitFor();
    assert.equal(await frame.locator('.count-display').textContent(), '2');
    await page.waitForFunction(() => window.vueLexiconApp.simulatorObservation?.bodyText.includes('2'));
    assert.equal(await app(a => a.practiceCode), draft);
    assert.deepEqual(await persisted(), before);
    assert.equal(await page.getByRole('button', { name: /فحص الحل|تأكيد الإنجاز/ }).count(), 0);
  });
  await test('lexicon example runs separately and cannot overwrite any lesson draft or historical status', async () => {
    const before = await persisted();
    await app(a => {
      a.setAppMode('lexicon');
      a.sendTermToScratchpad({ term: 'مصطلح اختبار', category: 'html', vueSfcCode: '',
        vanillaCode: '<button id="term-demo" onclick="this.textContent=\'changed\'">term initial</button>' });
    });
    await waitReady();
    assert.equal(await app(a => a.appMode), 'practice');
    assert.equal(await app(a => a.activeRun.kind), 'reference');
    assert.equal(await app(a => a.simulatorReferenceTitle.includes('مصطلح اختبار')), true);
    assert.equal(await app(a => a.submittedPracticeCode.includes('term-demo')), true);
    assert.equal(await app(a => a.practiceCode.includes('term-demo')), false);
    assert.deepEqual(await persisted(), before);
    const frame = page.locator('iframe[title="معاينة كود التمرين"]').contentFrame();
    await frame.locator('#term-demo').evaluate(button => new Promise(resolve => {
      if (button.ownerDocument.readyState === 'complete') resolve();
      else button.ownerDocument.defaultView.addEventListener('load', resolve, { once:true });
    }));
    // The small button can be clipped at the frame edge after a lesson switch.
    // Position it before sending a real pointer event; do not click a parent notice.
    await page.locator('iframe').evaluate(frame => frame.scrollIntoView({block:'center',behavior:'instant'}));
    await frame.locator('#term-demo').evaluate(button => button.scrollIntoView({block:'center',behavior:'instant'}));
    const bounds = await frame.locator('#term-demo').boundingBox();
    assert(bounds);
    assert.equal(await page.evaluate(b => document.elementFromPoint(b.x+b.width/2,b.y+b.height/2)?.tagName, bounds), 'IFRAME');
    // Wait for the button's own stable position and hit target after local CSS
    // loads. Locator.click still sends a real pointer event, unlike DOM.click.
    await frame.locator('#term-demo').click();
    await page.waitForFunction(() => window.vueLexiconApp.simulatorObservation?.bodyText.includes('changed'));
    assert.equal(await frame.locator('#term-demo').textContent(), 'changed');
    await select('HTML-102');
    assert.equal(await app(a => a.simulatorReferenceCode === a.currentLesson.solution), true);
    assert.equal(await app(a => a.simulatorReferenceVisible), false);
    assert.equal(await app(a => a.activeRun.kind), 'draft');
    assert.deepEqual(await persisted(), before);
  });
  await test('export includes original historical statuses and independently edited drafts', async () => {
    const current = await persisted();
    const downloadPromise = page.waitForEvent('download');
    await app(a => a.exportUserData());
    const download = await downloadPromise;
    const exported = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
    assert.deepEqual(exported.practiceProgress, current);
    for (const id of Object.keys(seed)) assert.equal(exported.practiceProgress[id].status, seed[id].status);
    assert.equal(exported.practiceProgress['CSS-101'].codeDraft, seed['CSS-101'].codeDraft);
  });
  await test('reload preserves drafts and changing sections cannot fire pending automatic run', async () => {
    await select('JS-101');
    const draft = '<p id="card">persistent simulator draft</p>';
    await editDraft(draft);
    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => window.vueLexiconApp?.practiceLessons?.length === 15);
    await app(a => { a.openSimulator(); a.selectTrack('js'); a.selectLesson('JS-101'); });
    await waitReady();
    assert.equal(await app(a => a.practiceCode), draft);
    await app(a => { a.practiceAutoRun = true; a.practiceCode = '<p>pending</p>'; a.setAppMode('lexicon'); });
    await pause(500);
    assert.equal(await app(a => a.appMode), 'lexicon');
    assert.equal(await app(a => a.activeRun), null);
  });
  async function importProgress(payload) {
    await app((a, payload) => {
      a.toastMessage = ''; a.toastType = '';
      a.importUserData({ target: { files: [new File([JSON.stringify(payload)], 'drafts.json')], value: 'drafts.json' } });
    }, payload);
    await page.waitForFunction(() => /استيراد|الاستيراد/.test(window.vueLexiconApp.toastMessage));
    return app(a => a.toastType);
  }
  await test('imported active draft replaces editor only after commit; edit save reopen and reload preserve every other draft', async () => {
    await app(a => { a.openSimulator(); a.practiceAutoRun = false; });
    await select('JS-101');
    const before = await persisted();
    const imported = '<p id="card">new imported draft</p>';
    assert.equal(await importProgress({ practiceProgress: { 'JS-101': { status: before['JS-101'].status, codeDraft: imported } } }), 'success');
    assert.equal(await app(a => a.practiceCode), imported);
    assert.equal(await app(a => a.activeRun), null);
    assert.deepEqual(await app(a => a.lastDomSnapshot), {});
    assert.equal(await app(a => a.validationFeedback), null);
    const backups = await page.evaluate(() => Object.keys(localStorage).filter(k => k.startsWith('vuelexicon_recovery_import_')).map(k => JSON.parse(localStorage.getItem(k))));
    assert(backups.some(b => b.vuelexicon_practice_progress && JSON.stringify(JSON.parse(b.vuelexicon_practice_progress)) === JSON.stringify(before)));
    const edited = imported + '<p>edited after import</p>';
    await editDraft(edited);
    assert.equal((await persisted())['JS-101'].codeDraft, edited);
    for (const id of Object.keys(before).filter(id => id !== 'JS-101')) assert.deepEqual((await persisted())[id], before[id]);
    await select('CSS-101'); await select('JS-101');
    assert.equal(await app(a => a.practiceCode), edited);
    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => window.vueLexiconApp?.practiceLessons?.length === 15);
    await app(a => a.openSimulator()); await select('JS-101');
    assert.equal(await app(a => a.practiceCode), edited);
    const downloadPromise = page.waitForEvent('download');
    await app(a => a.exportUserData());
    const download = await downloadPromise;
    const exported = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
    assert.deepEqual(exported.practiceProgress, await persisted());
    assert.equal(exported.practiceProgress['JS-101'].codeDraft, edited);
  });
  await test('empty and null imported drafts synchronize without rewriting their stored representation', async () => {
    for (const codeDraft of ['', null]) {
      assert.equal(await importProgress({ practiceProgress: { 'JS-101': { status: 'unlocked', codeDraft } } }), 'success');
      assert.equal(await app(a => a.practiceCode), codeDraft === null ? await app(a => a.currentLesson.initialCode) : '');
      assert.equal((await persisted())['JS-101'].codeDraft, codeDraft);
      assert.equal(await app(a => a.activeRun), null);
    }
  });
  await test('status-only and other-lesson imports leave the active editor and preview untouched', async () => {
    await run('<p id="card">keep active text</p>');
    const before = await app(a => ({ code:a.practiceCode, key:a.practiceIframeKey, doc:a.practiceIframeDoc, run:a.activeRun.runId }));
    assert.equal(await importProgress({ practiceProgress: { 'JS-101': { status: 'passed' }, 'CSS-101': { status: 'unlocked', codeDraft:'<p>other imported draft</p>' } } }), 'success');
    assert.deepEqual(await app(a => ({ code:a.practiceCode, key:a.practiceIframeKey, doc:a.practiceIframeDoc, run:a.activeRun.runId })), before);
    await select('CSS-101'); assert.equal(await app(a => a.practiceCode), '<p>other imported draft</p>');
    await select('JS-101'); assert.equal(await app(a => a.practiceCode), before.code);
  });
  await test('rejected import and failed persistence cannot alter editor or current session', async () => {
    const before = await app(a => ({ code:a.practiceCode, run:a.activeRun.runId, progress:JSON.stringify(a.practiceProgress) }));
    assert.equal(await importProgress({ practiceProgress: { 'JS-101': { status:'passed', codeDraft:{} } } }), 'error');
    await page.evaluate(() => {
      window.originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function(key,value) {
        if (key === 'vuelexicon_practice_progress' && value.includes('quota-import-probe')) throw new Error('quota test');
        return window.originalSetItem.call(this,key,value);
      };
    });
    try { assert.equal(await importProgress({ practiceProgress: { 'JS-101': { status:'passed', codeDraft:'quota-import-probe' } } }), 'error'); }
    finally { await page.evaluate(() => { Storage.prototype.setItem = window.originalSetItem; delete window.originalSetItem; }); }
    assert.deepEqual(await app(a => ({ code:a.practiceCode, run:a.activeRun.runId, progress:JSON.stringify(a.practiceProgress) })), before);
  });
  await test('import invalidates reference and pending auto run without executing imported source', async () => {
    await app(a => { a.practiceAutoRun = true; a.runSimulatorReference(); a.practiceCode = '<p>pending before import</p>'; });
    assert.equal(await importProgress({ practiceProgress: { 'JS-101': { status:'unlocked', codeDraft:'<script>parent.postMessage("should-not-run", "*")<\/script><p>auto import</p>' } } }), 'success');
    const key = await app(a => a.practiceIframeKey);
    await pause(500);
    assert.equal(await app(a => a.practiceIframeKey), key);
    assert.equal(await app(a => a.activeRun), null);
    assert.equal(await app(a => a.simulatorReferenceVisible), false);
    await editDraft('<p id="card">user edit after auto import</p>');
    await page.waitForFunction(() => window.vueLexiconApp.activeRun?.code.includes('user edit after auto import'));
    await waitReady();
    assert.equal(await app(a => a.activeRun.kind), 'draft');
    await app(a => { a.practiceAutoRun = false; });
  });
  await test('async file completion respects lesson selected at completion time', async () => {
    await select('JS-101');
    await page.evaluate(() => {
      window.savedReader = window.FileReader;
      window.FileReader = class { readAsText() { window.pendingDraftReader = this; } };
      window.vueLexiconApp.importUserData({ target: { files:[{size:100}], value:'pending.json' } });
    });
    await select('CSS-101');
    const before = await app(a => a.practiceCode);
    await page.evaluate(() => {
      window.FileReader = window.savedReader;
      window.pendingDraftReader.onload({ target: { result:JSON.stringify({practiceProgress:{'JS-101':{status:'unlocked',codeDraft:'<p>late JS import</p>'}}}) } });
      delete window.savedReader; delete window.pendingDraftReader;
    });
    assert.equal(await app(a => a.practiceCode), before);
    assert.equal(await app(a => a.currentLesson.id), 'CSS-101');
    await select('JS-101'); assert.equal(await app(a => a.practiceCode), '<p>late JS import</p>');
  });
  await test('no application page errors in simulator checks', async () => assert.deepEqual(pageErrors, []));
  const passed = results.filter(r => r.passed).length;
  const out = process.env.VLP_TEST_OUTPUT || path.join(__dirname, 'simulator-artifacts');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'simulator-browser-report.json'), JSON.stringify({ runtime: 'Chromium + actual Vue 3.4.21 test-only CDN fixture', timestamp: new Date().toISOString(), passed, total: results.length, results }, null, 2) + '\n');
  console.log(`${passed}/${results.length} simulator browser checks passed`);
  if (passed !== results.length) process.exitCode = 1;
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { if (browser) await browser.close(); server.close(); });
