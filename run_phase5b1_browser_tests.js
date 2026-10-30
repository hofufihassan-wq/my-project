/* Phase 5B.1: actual local Chromium, dictionary/simulator correction and exact
 * homepage preservation against a49a7c7. No old report is overwritten.
 * Test records live only in isolated browser contexts. Delivery screenshots use
 * separate clean contexts. Run after the application changes have been assembled.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const http = require('node:http');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const { PNG } = require(process.env.PNGJS_PATH || '/opt/codex/cua_node/lib/node_modules/pngjs');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/codex/cua_node/lib/node_modules/playwright-core');

const root = __dirname;
const baselineRef = 'a49a7c7';
const output = path.resolve(root, process.env.VLP_PHASE5B1_OUTPUT || 'phase5b1-artifacts');
const screenshotDir = path.join(output, 'screenshots');
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const git = args => execFileSync('git', args, { cwd: root, maxBuffer: 64 * 1024 * 1024 });
const baselineFiles = new Set(git(['ls-tree', '-r', '--name-only', baselineRef]).toString().trim().split('\n'));
const baselineCache = new Map();
function baselineRead(file) {
  if (!baselineFiles.has(file)) return null;
  if (!baselineCache.has(file)) baselineCache.set(file, git(['show', `${baselineRef}:${file}`]));
  return baselineCache.get(file);
}
const protectedFiles = ['lexicon-data.js', 'practice-curriculum.js', 'progress-data.js', 'simulator-guides.js', ...[...baselineFiles].filter(file => file.startsWith('_pristine_backup/') || file.startsWith('_v3.5_pre_hands_on_backup/'))];
const sourceHashes = Object.fromEntries(protectedFiles.map(file => [file, sha(baselineRead(file))]));
const runtimeFiles = ['app.js', 'index.html', 'styles.css', 'identity.css', 'dictionary-correction.css', 'simulator-correction.css', 'assets/tailwind-3.4.17.min.css', 'preview-runner.js', 'dictionary-preview.js', 'assets/vendor/manifest.json'];
const runtimeHashes = Object.fromEntries(runtimeFiles.map(file => [file, sha(fs.readFileSync(path.join(root, file)))]));
const fixture = { window: {} };
for (const file of ['lexicon-data.js', 'practice-curriculum.js']) vm.runInNewContext(baselineRead(file).toString(), fixture);
const lessons = fixture.window.PRACTICE_CURRICULUM.lessons;
const terms = fixture.window.RAW_LEXICON_TUPLES;
const ids = terms.map(t => `${t[0]}-${t[1].toLowerCase().replace(/[^a-z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'item'}`);
const progress = Object.fromEntries(lessons.map((lesson, i) => [lesson.id, {
  // The pre-existing hydration unlocks starter lessons. Avoid requesting a
  // migration while testing byte-for-byte preservation of current valid data.
  status: lesson.id.endsWith('-101') && i % 4 === 3 ? 'unlocked' : ['unlocked', 'passed', 'solution_viewed', 'locked'][i % 4],
  ...(i % 3 === 0 ? { codeDraft: null } : i % 3 === 1 ? { codeDraft: `<p id="saved-${lesson.id}">مسودة محفوظة ${lesson.id}</p>` } : {}),
  updatedAt: '2026-10-29T06:00:00.000Z'
}]));
const seed = {
  vuelexicon_practice_progress: JSON.stringify(progress),
  vuelexicon_bookmarks_v3: JSON.stringify([ids[1], ids[3]]),
  vuelexicon_mastery_v3: JSON.stringify({ [ids[1]]: 'learning', [ids[3]]: 'mastered' }),
  vuelexicon_recent_v3: JSON.stringify([ids[3], ids[1]]),
  vuelexicon_recovery_phase5b1_sentinel: '{"raw":"نسخة أصلية محفوظة؛ لا تُستبدل"}',
  unrelated_application_sentinel: 'must remain byte-for-byte intact'
};
const selectors = {
  dictionaryEditor: '[data-testid="dictionary-editor"]',
  dictionaryRun: '[data-testid="dictionary-run"]',
  dictionaryReset: '[data-testid="dictionary-reset"]',
  dictionaryFrame: 'iframe[title="المعاينة المباشرة للمصطلح"]',
  editorPanel: '[data-testid="sim-editor-panel"]',
  console: '[data-testid="sim-console"]',
  stages: '[data-testid="sim-stages"]',
  previewPanel: '[data-testid="sim-preview-panel"]',
  expandEditor: '[data-testid="sim-expand-editor"]',
  expandPreview: '[data-testid="sim-expand-preview"]',
  resize: 'input[type="range"][aria-label="حصة عرض محرر المحاكي"]'
};
const tabs = ['meaning', 'example', 'usage', 'compare', 'pitfalls'];
const results = [], networkEvidence = [], screenshots = [], homepageComparisons = [];
let browser;

function makeServer(baseline) {
  return http.createServer((req, res) => {
    let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (name.startsWith('/nested/app/')) name = name.slice('/nested/app'.length);
    if (name.endsWith('/')) name += 'index.html';
    const relative = name.slice(1);
    const file = path.resolve(root, relative);
    let data = null;
    if (file.startsWith(root + path.sep)) {
      if (baseline) data = baselineRead(relative);
      else if (fs.existsSync(file) && fs.statSync(file).isFile()) data = fs.readFileSync(file);
    }
    if (data === null) { res.writeHead(404); res.end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' })[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
}
const server = makeServer(false), baselineServer = makeServer(true);
const app = (page, fn, arg) => page.evaluate(({ source, arg }) => (new Function('a', 'arg', `return (${source})(a,arg)`))(window.vueLexiconApp, arg), { source: fn.toString(), arg });
const stored = page => page.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])));
const settle = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
const normalize = text => String(text).replace(/\s+/g, ' ').trim();
async function test(width, title, fn) {
  try { await fn(); results.push({ engine: 'chromium', width, title, passed: true }); console.log('PASS', width, title); }
  catch (error) { results.push({ engine: 'chromium', width, title, passed: false, error: error.stack || error.message }); console.error('FAIL', width, title, error.message); }
}
async function contextFor(origin, viewport, seeded) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce', acceptDownloads: true, timezoneId: 'Asia/Riyadh' });
  const evidence = { origin, viewport, seeded, externalRequests: [], failedRequests: [], uncaughtErrors: [] };
  await context.route('**/*', route => {
    const u = new URL(route.request().url());
    if (u.origin === origin || ['blob:', 'data:', 'about:'].includes(u.protocol)) return route.continue();
    evidence.externalRequests.push(u.href); return route.abort('blockedbyclient');
  });
  if (seeded) await context.addInitScript(seed => {
    if (window !== window.top || sessionStorage.getItem('phase5b1-seeded')) return;
    for (const [key, value] of Object.entries(seed)) localStorage.setItem(key, value);
    sessionStorage.setItem('phase5b1-seeded', 'yes');
  }, seed);
  const page = await context.newPage();
  page.on('pageerror', e => evidence.uncaughtErrors.push(e.message));
  page.on('requestfailed', r => evidence.failedRequests.push({ url: r.url(), reason: r.failure()?.errorText }));
  page.on('response', r => { if (r.status() >= 400) evidence.failedRequests.push({ url: r.url(), status: r.status() }); });
  networkEvidence.push(evidence);
  return { context, page, evidence };
}
async function load(page, origin, nested = false) {
  await page.goto(origin + (nested ? '/nested/app/' : '/'), { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.vueLexiconApp?.rawLexiconData.length === 180);
  await page.evaluate(() => document.fonts.ready);
  await settle(page);
}
async function navigate(page, mode) {
  const testId = { home: 'nav-home', lexicon: 'nav-lexicon', practice: 'nav-simulator', training: 'nav-training', settings: 'nav-settings' }[mode];
  const control = page.locator(`[data-testid="${testId}"]:visible`).first();
  assert.equal(await control.count(), 1, `visible navigation button required: ${testId}`);
  await control.click(); await settle(page);
  assert.equal(await app(page, a => a.appMode), mode === 'training' ? 'practice' : mode);
}
async function geometry(page) {
  const geometry = await page.evaluate(() => ({ rtl: document.documentElement.dir, width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  assert.equal(geometry.rtl, 'rtl');
  assert(geometry.scrollWidth <= geometry.width + 1, JSON.stringify(geometry));
}
async function chooseTerm(page, name, expectedStorage) {
  const id = await app(page, (a, name) => { const term = a.rawLexiconData.find(t => t.term === name); if (!term) throw new Error('Missing real term ' + name); a.selectTerm(term); return term.id; }, name);
  await settle(page);
  if (expectedStorage) {
    const previous = JSON.parse(expectedStorage.vuelexicon_recent_v3);
    expectedStorage.vuelexicon_recent_v3 = JSON.stringify([id, ...previous.filter(value => value !== id)].slice(0, 12));
    assert.deepEqual(await stored(page), expectedStorage, 'only the explicit term visit may update recent history');
  }
}
async function selectTab(page, name) {
  const tab = page.getByTestId('dictionary-tab-' + name);
  await tab.click(); await settle(page);
  assert.equal(await tab.getAttribute('aria-selected'), 'true');
  const id = await tab.getAttribute('aria-controls');
  assert(id, 'tab must identify its panel');
  const panel = page.locator('#' + id);
  assert.equal(await panel.getAttribute('role'), 'tabpanel');
  assert.equal(await panel.isVisible(), true);
  return panel;
}
async function shot(page, filename, anchor = null) {
  await page.waitForFunction(() => !window.vueLexiconApp.toastVisible);
  await page.mouse.move(0, 0);
  if (anchor) await page.locator(anchor).evaluate(e => window.scrollTo({ top: Math.max(0, scrollY + e.getBoundingClientRect().top - 12), behavior: 'instant' }));
  else await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await settle(page);
  const buffer = await page.screenshot({ path: path.join(screenshotDir, filename), fullPage: false });
  screenshots.push('screenshots/' + filename);
  return buffer;
}
async function simulatorSession(page) {
  return app(page, a => ({ runId: a.activeRun?.runId ?? null, key: a.practiceIframeKey, doc: a.practiceIframeDoc, code: a.practiceCode, state: a.executionState }));
}
async function dictionarySession(page) {
  return app(page, a => ({ runId: a.dictionaryPreviewSession?.runId ?? null, key: a.dictionaryPreviewKey, doc: a.dictionaryPreviewDoc, state: a.dictionaryPreviewState }));
}

async function main() {
  fs.mkdirSync(screenshotDir, { recursive: true });
  await Promise.all([new Promise(resolve => server.listen(0, '127.0.0.1', resolve)), new Promise(resolve => baselineServer.listen(0, '127.0.0.1', resolve))]);
  const origin = `http://127.0.0.1:${server.address().port}`, baselineOrigin = `http://127.0.0.1:${baselineServer.address().port}`;
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const browserVersion = browser.version();
  for (const [width, height] of [[1440, 1000], [768, 1024], [390, 844]]) {
    const { context, page, evidence } = await contextFor(origin, { width, height }, true);
    await load(page, origin, width === 768);
    const expectedStorage = { ...seed };
    const initialContent = sha(await app(page, a => JSON.stringify({ terms: a.rawLexiconData, lessons: a.practiceLessons })));
    await test(width, 'startup preserves null absent and multiple drafts plus favorites mastery history and backup sentinel', async () => {
      assert.deepEqual(await stored(page), expectedStorage);
      assert.equal(await app(page, a => a.rawLexiconData.length), 180);
      assert.equal(await app(page, a => a.practiceLessons.length), 15);
      await geometry(page);
    });
    await test(width, 'dictionary tabs expose every original explanation field with keyboard and ARIA relationships', async () => {
      await navigate(page, 'lexicon'); await chooseTerm(page, 'ref()', expectedStorage);
      const term = await app(page, a => a.selectedTerm);
      const text = [];
      assert.equal(await page.getByRole('tablist').count(), 1);
      for (const name of tabs) {
        const panel = await selectTab(page, name);
        // Secondary material may remain compact in accessible disclosures;
        // open their real summary controls before checking original fields.
        for (const detail of await panel.locator('details').all()) {
          if (!await detail.evaluate(e => e.open)) await detail.locator('summary').first().click();
        }
        text.push(await panel.innerText());
        assert.equal(await page.getByRole('tab', { selected: true }).count(), 1);
      }
      for (const detail of await page.locator('#detailed-term-view details').all()) {
        if (await detail.isVisible() && !await detail.evaluate(e => e.open)) await detail.locator('summary').first().click();
      }
      const allText = normalize((await page.locator('#detailed-term-view').innerText()) + ' ' + text.join(' '));
      const originalFields = [term.arabicTitle, term.description, term.syntaxInfo, term.returnProps, term.env, ...term.useCases, term.compareNotes, ...term.codeBreakdown, term.pitfall, ...term.keyProps.flatMap(p => [p.name, p.type, p.desc])].filter(Boolean);
      for (const field of originalFields) assert(allText.includes(normalize(field)), 'original field must be reachable: ' + field);
      assert(await page.locator(`a[href="${term.docUrl}"]`).count(), 'official documentation link remains available');
      const first = page.getByTestId('dictionary-tab-' + tabs[0]);
      await first.focus(); await page.keyboard.press('End');
      assert.equal(await page.getByTestId('dictionary-tab-' + tabs.at(-1)).getAttribute('aria-selected'), 'true');
      await page.keyboard.press('Home'); assert.equal(await first.getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowLeft');
      assert.notEqual(await app(page, a => a.dictionaryTab), tabs[0]);
      await page.keyboard.press('ArrowRight'); assert.equal(await first.getAttribute('aria-selected'), 'true');
      assert.deepEqual(await stored(page), expectedStorage);
      await geometry(page);
    });
    await test(width, 'dictionary runs the unchanged ref example in its own sandbox without touching simulator drafts', async () => {
      await selectTab(page, 'example');
      const originalCode = await app(page, a => a.currentCode);
      assert.equal(await page.locator(selectors.dictionaryEditor).inputValue(), originalCode);
      const simulatorBefore = await simulatorSession(page);
      await page.locator(selectors.dictionaryRun).click();
      await page.waitForFunction(() => window.vueLexiconApp.dictionaryPreviewState === 'preview_ready');
      const frame = page.locator(selectors.dictionaryFrame).contentFrame();
      assert.equal(await page.locator(selectors.dictionaryFrame).getAttribute('sandbox'), 'allow-scripts');
      await frame.getByRole('button', { name: 'العدد: 0' }).click();
      await frame.getByRole('button', { name: 'العدد: 1' }).waitFor();
      assert.equal(await frame.locator('body').evaluate(() => { try { parent.localStorage.getItem('x'); return 'unsafe'; } catch (_) { return 'isolated'; } }), 'isolated');
      const before = await app(page, a => ({ state: a.dictionaryPreviewState, logs: a.dictionaryPreviewLogs, key: a.dictionaryPreviewKey, doc: a.dictionaryPreviewDoc }));
      await app(page, a => {
        const session = a.dictionaryPreviewSession;
        const data = { source: 'VUELEXICON_SANDBOX', runId: session.runId, lessonId: session.lessonId, type: 'EXECUTION_ERROR', payload: { msg: 'UNTRUSTED_DICTIONARY_ERROR', lineno: 0 } };
        window.dispatchEvent(new MessageEvent('message', { source: window, origin: 'null', data }));
        for (const invalid of [{ ...data, source: 'UNKNOWN_SOURCE' }, { ...data, runId: 'stale-run' }, { ...data, payload: null }, { ...data, type: 'UNKNOWN_TYPE' }]) {
          window.dispatchEvent(new MessageEvent('message', { source: a.dictionaryPreviewRef.contentWindow, origin: 'null', data: invalid }));
        }
      });
      await settle(page);
      assert.deepEqual(await app(page, a => ({ state: a.dictionaryPreviewState, logs: a.dictionaryPreviewLogs, key: a.dictionaryPreviewKey, doc: a.dictionaryPreviewDoc })), before, 'untrusted or malformed messages must not alter the dictionary session');
      assert.deepEqual(await simulatorSession(page), simulatorBefore);
      assert.deepEqual(await stored(page), expectedStorage);
    });
    await test(width, 'dictionary editor is ephemeral and manual edits cannot silently rerun or alter educational sources', async () => {
      const originalCode = await app(page, a => a.currentCode);
      const before = await dictionarySession(page);
      const edited = originalCode + '\n<!-- تعديل جلسة التحقق فقط -->';
      await page.locator(selectors.dictionaryEditor).fill(edited);
      await page.waitForTimeout(400);
      const after = await dictionarySession(page);
      assert.equal(after.runId, before.runId); assert.equal(after.key, before.key); assert.equal(after.doc, before.doc);
      assert.equal(await app(page, a => a.dictionaryPreviewStale), true);
      assert.equal(await app(page, a => a.currentCode), originalCode);
      assert.deepEqual(await stored(page), expectedStorage);
      await page.locator(selectors.dictionaryRun).click();
      await page.waitForFunction(() => window.vueLexiconApp.dictionaryPreviewState === 'preview_ready');
      assert.notEqual((await dictionarySession(page)).runId, before.runId);
      assert.equal(await app(page, a => a.dictionaryPreviewStale), false);
      await app(page, (a, oldRunId) => {
        window.dispatchEvent(new MessageEvent('message', { source: a.dictionaryPreviewRef.contentWindow, origin: 'null', data: { source: 'VUELEXICON_SANDBOX', runId: oldRunId, lessonId: a.dictionaryPreviewSession.lessonId, type: 'EXECUTION_ERROR', payload: { msg: 'STALE_DICTIONARY_ERROR', lineno: 0 } } }));
      }, before.runId);
      assert.equal(await app(page, a => a.dictionaryPreviewState), 'preview_ready');
      await page.locator(selectors.dictionaryReset).click();
      assert.equal(await page.locator(selectors.dictionaryEditor).inputValue(), originalCode);
      assert.equal(await app(page, a => a.dictionaryPreviewStale), true, 'resetting text must not silently rerun the current preview');
      assert.deepEqual(await stored(page), expectedStorage);
    });
    await test(width, 'dictionary session copies are scoped to term and format while incomplete original examples keep their error', async () => {
      const originalCode = await app(page, a => a.currentCode);
      const edited = originalCode + '\n<!-- نسخة جلسة خاصة بالمصطلح والصيغة -->';
      await page.locator(selectors.dictionaryEditor).fill(edited);
      await page.locator('.dictionary-editor-formats').getByRole('button', { name: 'Vanilla JS', exact: true }).click();
      assert.equal(await app(page, a => a.dictionaryPreviewSession), null);
      assert.equal(await page.locator(selectors.dictionaryEditor).inputValue(), await app(page, a => a.selectedTerm.vanillaCode));
      await page.locator(selectors.dictionaryRun).click();
      await page.waitForFunction(() => window.vueLexiconApp.dictionaryPreviewState === 'error');
      assert((await app(page, a => a.dictionaryPreviewLogs)).some(log => log.type === 'error'), 'the original incomplete ref Vanilla example must show its error without invented context');
      await page.locator('.dictionary-editor-formats').getByRole('button', { name: 'Vue 3 SFC', exact: true }).click();
      assert.equal(await page.locator(selectors.dictionaryEditor).inputValue(), edited);
      assert.equal(await app(page, a => a.dictionaryPreviewSession), null);
      await chooseTerm(page, 'color', expectedStorage);
      assert.equal(await app(page, a => a.dictionaryTab), 'meaning');
      assert.equal(await app(page, a => a.dictionaryPreviewSession), null);
      await chooseTerm(page, 'ref()', expectedStorage);
      assert.equal(await page.locator(selectors.dictionaryEditor).inputValue(), edited);
      await page.locator(selectors.dictionaryReset).click();
      assert.equal(await page.locator(selectors.dictionaryEditor).inputValue(), originalCode);
      assert.deepEqual(await stored(page), expectedStorage);
    });
    await test(width, 'simulator retains manual reference execution with editor left console below stages center and preview right', async () => {
      await navigate(page, 'practice');
      await app(page, a => a.selectLesson('JS-101', true));
      await page.getByTestId('simulator-reference-run').click();
      await page.waitForFunction(() => window.vueLexiconApp.executionState === 'preview_ready');
      await page.locator('iframe[title="معاينة كود التمرين"]').contentFrame().locator('#card').waitFor();
      for (const key of ['editorPanel', 'console', 'stages', 'previewPanel']) assert.equal(await page.locator(selectors[key]).count(), 1, key);
      const boxes = {};
      for (const key of ['editorPanel', 'console', 'stages', 'previewPanel']) boxes[key] = await page.locator(selectors[key]).boundingBox();
      if (width >= 1024) {
        assert(boxes.editorPanel.x + boxes.editorPanel.width <= boxes.stages.x + 2, JSON.stringify(boxes));
        assert(boxes.stages.x + boxes.stages.width <= boxes.previewPanel.x + 2, JSON.stringify(boxes));
        assert(boxes.console.y >= boxes.editorPanel.y + boxes.editorPanel.height - 2, JSON.stringify(boxes));
        assert(Math.abs(boxes.console.x - boxes.editorPanel.x) < 2, JSON.stringify(boxes));
      }
      const stageText = await page.locator(selectors.stages).innerText();
      assert(stageText.trim().length > 0, 'visual stage labels must be visible');
      assert(!/\d+\s*(?:ms|مللي ثانية)/i.test(stageText), 'no invented execution timings');
      assert.deepEqual(await stored(page), expectedStorage);
      await geometry(page);
    });
    await test(width, 'expanding and keyboard resizing simulator panels preserve the existing run iframe and saved code', async () => {
      const before = await simulatorSession(page);
      for (const key of ['expandEditor', 'expandPreview']) {
        const control = page.locator(selectors[key]);
        await control.focus(); await page.keyboard.press('Enter'); await settle(page);
        assert.equal(await app(page, a => a.simulatorExpandedPanel), key === 'expandEditor' ? 'editor' : 'preview');
        assert.deepEqual(await simulatorSession(page), before);
        await control.focus(); await page.keyboard.press('Enter'); await settle(page);
        assert.equal(await app(page, a => a.simulatorExpandedPanel), '');
        assert.deepEqual(await simulatorSession(page), before);
      }
      const range = page.locator(selectors.resize);
      if (await range.isVisible()) {
        const value = Number(await range.inputValue());
        await range.focus(); await page.keyboard.press(value < 60 ? 'ArrowRight' : 'ArrowLeft'); await settle(page);
        assert.notEqual(Number(await range.inputValue()), value, 'native keyboard resize changes the range value');
        assert.deepEqual(await simulatorSession(page), before);
      } else assert(width < 1024, 'desktop keyboard resize control must be visible');
      assert.deepEqual(await stored(page), expectedStorage);
      await geometry(page);
    });
    await test(width, 'returning to dictionary and reloading keeps source content persistent data and manual-run boundaries', async () => {
      await navigate(page, 'lexicon');
      assert.equal(await app(page, a => a.activeRun), null);
      await navigate(page, 'home');
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.vueLexiconApp?.rawLexiconData.length === 180);
      assert.deepEqual(await stored(page), expectedStorage);
      assert.equal(sha(await app(page, a => JSON.stringify({ terms: a.rawLexiconData, lessons: a.practiceLessons }))), initialContent);
      await geometry(page);
    });
    await test(width, 'corrected workspaces load with local assets without failed requests or uncaught exceptions', async () => {
      assert.deepEqual(evidence.externalRequests, []); assert.deepEqual(evidence.failedRequests, []); assert.deepEqual(evidence.uncaughtErrors, []);
    });
    await context.close();

    const clean = await contextFor(origin, { width, height }, false);
    const original = await contextFor(baselineOrigin, { width, height }, false);
    await Promise.all([load(clean.page, origin), load(original.page, baselineOrigin)]);
    await test(width, 'homepage is pixel-identical to approved phase5B commit a49a7c7 in clean contexts', async () => {
      const before = await shot(original.page, `homepage-before-${width}.png`);
      const after = await shot(clean.page, `homepage-after-${width}.png`);
      const left = PNG.sync.read(before), right = PNG.sync.read(after);
      assert.equal(left.width, right.width); assert.equal(left.height, right.height);
      let changedPixels = 0;
      for (let i = 0; i < left.data.length; i += 4) if (!left.data.subarray(i, i + 4).equals(right.data.subarray(i, i + 4))) changedPixels++;
      homepageComparisons.push({ width, height, baselineRef, changedPixels, beforePngSha256: sha(before), afterPngSha256: sha(after) });
      assert.equal(changedPixels, 0, 'homepage must remain visually unchanged from the approved commit');
    });
    await test(width, 'clean-context corrected dictionary and simulator screenshots show real interactive pages', async () => {
      await navigate(clean.page, 'lexicon'); await chooseTerm(clean.page, 'ref()'); await selectTab(clean.page, 'example');
      await clean.page.locator(selectors.dictionaryRun).click();
      await clean.page.waitForFunction(() => window.vueLexiconApp.dictionaryPreviewState === 'preview_ready');
      await shot(clean.page, `dictionary-${width}.png`);
      const dictionaryFrame = clean.page.locator(selectors.dictionaryFrame).contentFrame();
      await dictionaryFrame.getByRole('button', { name: 'العدد: 0' }).click();
      await dictionaryFrame.getByRole('button', { name: 'العدد: 1' }).waitFor();
      await shot(clean.page, `dictionary-workspace-${width}.png`, '[role="tablist"]');
      if (width < 1024) await shot(clean.page, `dictionary-preview-${width}.png`, '.dictionary-live-panel');
      await navigate(clean.page, 'practice'); await app(clean.page, a => a.selectLesson('JS-101', true));
      await clean.page.getByTestId('simulator-reference-run').click();
      await clean.page.waitForFunction(() => window.vueLexiconApp.executionState === 'preview_ready');
      await shot(clean.page, `simulator-${width}.png`);
      if (width === 390) {
        await shot(clean.page, `simulator-editor-${width}.png`, selectors.editorPanel);
        await shot(clean.page, `simulator-preview-${width}.png`, selectors.previewPanel);
      }
      assert.deepEqual(clean.evidence.uncaughtErrors, []); assert.deepEqual(clean.evidence.failedRequests, []);
    });
    await clean.context.close(); await original.context.close();
  }
  await test(null, 'all original educational content IDs and backup files match phase5B and runtime remained stable during checks', async () => {
    for (const [file, hash] of Object.entries(sourceHashes)) assert.equal(sha(fs.readFileSync(path.join(root, file))), hash, file);
    for (const [file, hash] of Object.entries(runtimeHashes)) assert.equal(sha(fs.readFileSync(path.join(root, file))), hash, file + ' changed while verification was running');
  });
  const passed = results.filter(result => result.passed).length;
  fs.writeFileSync(path.join(output, 'phase5b1-browser-report.json'), JSON.stringify({ timestamp: new Date().toISOString(), baselineRef, browser: { engine: 'chromium', version: browserVersion }, otherBrowsers: 'Not exercised by this runner.', sourceHashes, runtimeHashes, passed, total: results.length, screenshotData: 'Clean independent contexts, no seeded test records.', screenshots, homepageComparisons, networkEvidence, results }, null, 2) + '\n');
  console.log(`${passed}/${results.length} phase 5B.1 browser checks passed`);
  if (!results.length || passed !== results.length) process.exitCode = 1;
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
  if (browser) await browser.close(); server.close(); baselineServer.close();
});
