/* Phase 5B: actual Chromium, real local assets, visual identity and state preservation.
 * Screenshots use a separate clean browser context, never the seeded test records.
 * This runner writes only phase5b-artifacts (or VLP_PHASE5B_OUTPUT).
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const http = require('node:http');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/codex/cua_node/lib/node_modules/playwright-core');

const root = __dirname;
const output = path.resolve(root, process.env.VLP_PHASE5B_OUTPUT || 'phase5b-artifacts');
const screenshots = path.join(output, 'screenshots');
const fixture = { window: {} };
for (const file of ['lexicon-data.js', 'practice-curriculum.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), fixture);
}
const lessons = fixture.window.PRACTICE_CURRICULUM.lessons;
const terms = fixture.window.RAW_LEXICON_TUPLES;
const ids = terms.map(t => `${t[0]}-${t[1].toLowerCase().replace(/[^a-z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'item'}`);
const progress = Object.fromEntries(lessons.map((lesson, i) => [lesson.id, {
  // The existing hydration intentionally unlocks locked starter lessons.
  // Keep this fixture valid without migration so exact preservation is testable.
  status: lesson.id.endsWith('-101') && i % 4 === 3 ? 'unlocked' : ['unlocked', 'passed', 'solution_viewed', 'locked'][i % 4],
  ...(i % 3 === 0 ? { codeDraft: null } : i % 3 === 1 ? { codeDraft: `<p id="saved-${lesson.id}">مسودة محفوظة ${lesson.id}</p>` } : {}),
  updatedAt: '2026-10-29T06:00:00.000Z'
}]));
const seed = {
  vuelexicon_practice_progress: JSON.stringify(progress),
  vuelexicon_bookmarks_v3: JSON.stringify([ids[1], ids[3]]),
  vuelexicon_mastery_v3: JSON.stringify({ [ids[1]]: 'learning', [ids[3]]: 'mastered' }),
  vuelexicon_recent_v3: JSON.stringify([ids[3], ids[1]]),
  vuelexicon_recovery_phase5b_sentinel: '{"raw":"نسخة أصلية محفوظة؛ لا تُستبدل"}',
  unrelated_application_sentinel: 'must remain byte-for-byte intact'
};
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const protectedHashes = Object.fromEntries(['lexicon-data.js', 'practice-curriculum.js', 'progress-data.js', 'preview-runner.js', 'dictionary-preview.js', 'simulator-guides.js'].map(file => [file, sha(fs.readFileSync(path.join(root, file)))]));
const runtimeHashes = Object.fromEntries(['app.js', 'index.html', 'styles.css', 'identity.css', 'assets/tailwind-3.4.17.min.css', 'assets/vendor/manifest.json'].map(file => [file, sha(fs.readFileSync(path.join(root, file)))]));
const results = [], networkEvidence = [], screenshotFiles = [];
let browser;
const server = http.createServer((req, res) => {
  let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (name.startsWith('/nested/app/')) name = name.slice('/nested/app'.length);
  if (name.endsWith('/')) name += 'index.html';
  const file = path.resolve(root, '.' + name);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404); res.end(); return;
  }
  res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' })[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});

function appCall(page, fn, arg) {
  return page.evaluate(({ source, arg }) => (new Function('a', 'arg', `return (${source})(a,arg)`))(window.vueLexiconApp, arg), { source: fn.toString(), arg });
}
async function storage(page) {
  return page.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])));
}
async function contentDigest(page) {
  return sha(await appCall(page, a => JSON.stringify({ terms: a.rawLexiconData, lessons: a.practiceLessons })));
}
async function settle(page) {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}
async function geometry(page) {
  await settle(page);
  const state = await page.evaluate(() => ({
    rtl: document.documentElement.dir,
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    controls: [...document.querySelectorAll('header button, .vl-sidebar button')].filter(e => e.getClientRects().length).map(e => ({ label: e.getAttribute('aria-label') || e.textContent.trim(), left: e.getBoundingClientRect().left, right: e.getBoundingClientRect().right }))
  }));
  assert.equal(state.rtl, 'rtl');
  assert(state.scrollWidth <= state.width + 1, JSON.stringify(state));
  for (const control of state.controls) assert(control.left >= -1 && control.right <= state.width + 1, JSON.stringify(control));
}
async function navigate(page, mode) {
  const testId = { home: 'nav-home', lexicon: 'nav-lexicon', practice: 'nav-simulator', training: 'nav-training', settings: 'nav-settings' }[mode];
  const control = page.locator(`[data-testid="${testId}"]:visible`).first();
  assert.equal(await control.count(), 1, `visible UI navigation must exist: ${testId}`);
  await control.click();
  await settle(page);
  assert.equal(await appCall(page, a => a.appMode), mode === 'training' ? 'practice' : mode);
}
async function test(width, title, fn) {
  try {
    await fn(); results.push({ engine: 'chromium', width, title, passed: true }); console.log('PASS', width, title);
  } catch (error) {
    results.push({ engine: 'chromium', width, title, passed: false, error: error.stack || error.message }); console.error('FAIL', width, title, error.message);
  }
}
async function contextFor(origin, viewport, seeded) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce', acceptDownloads: true });
  const evidence = { viewport, seeded, externalRequests: [], failedRequests: [], uncaughtErrors: [] };
  await context.route('**/*', route => {
    const u = new URL(route.request().url());
    if (u.origin === origin || ['blob:', 'about:', 'data:'].includes(u.protocol)) return route.continue();
    evidence.externalRequests.push(u.href); return route.abort('blockedbyclient');
  });
  if (seeded) await context.addInitScript(seed => {
    if (window !== window.top || sessionStorage.getItem('phase5b-seeded')) return;
    for (const [key, value] of Object.entries(seed)) localStorage.setItem(key, value);
    sessionStorage.setItem('phase5b-seeded', 'yes');
  }, seed);
  const page = await context.newPage();
  page.on('pageerror', error => evidence.uncaughtErrors.push(error.message));
  page.on('requestfailed', request => evidence.failedRequests.push({ url: request.url(), reason: request.failure()?.errorText }));
  page.on('response', response => { if (response.status() >= 400) evidence.failedRequests.push({ url: response.url(), status: response.status() }); });
  networkEvidence.push(evidence);
  return { context, page, evidence };
}
async function loaded(page, url) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.vueLexiconApp?.rawLexiconData.length === 180);
  await page.evaluate(() => document.fonts.ready);
}
async function takeScreenshot(page, filename) {
  // Let transient notifications expire rather than capturing them over content.
  await page.waitForFunction(() => !window.vueLexiconApp.toastVisible);
  await page.mouse.move(0, 0);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await settle(page);
  await page.screenshot({ path: path.join(screenshots, filename), fullPage: false });
  screenshotFiles.push('screenshots/' + filename);
}

async function main() {
  fs.mkdirSync(screenshots, { recursive: true });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const version = browser.version();
  for (const [width, height] of [[360, 740], [390, 844], [768, 1024], [1440, 1000]]) {
    const { context, page, evidence } = await contextFor(origin, { width, height }, true);
    const base = origin + (width === 768 ? '/nested/app/' : '/');
    await loaded(page, base);
    const initialStorage = await storage(page);
    const initialContent = await contentDigest(page);
    await test(width, 'dashboard starts in RTL with actual dictionary and lesson counts', async () => {
      assert.equal(await appCall(page, a => a.appMode), 'home');
      assert.equal(await appCall(page, a => a.practiceLessons.length), 15);
      assert.equal(await appCall(page, a => new Set(a.rawLexiconData.map(t => t.id)).size), 180);
      assert.deepEqual(await appCall(page, a => a.dashboardStats), { mastered: 1, learning: 1, drafts: 5, totalLessons: 15 });
      const cards = await page.locator('.stat-card strong').allTextContents();
      assert.deepEqual(cards.map(value => value.trim().replace(/\s+/g, ' ')), ['180', '2', '5 / 15', '1'], 'rendered dashboard values must come from the seeded user records, not visual-reference numbers');
      assert.deepEqual(initialStorage, seed);
      await geometry(page);
    });
    await test(width, 'navigation and all three session themes preserve saved data and educational content', async () => {
      const observedThemes = {};
      for (const theme of ['petroleum', 'light', 'purple']) {
        await navigate(page, 'settings');
        await page.locator(`.theme-option[data-palette="${theme}"]`).click();
        await settle(page);
        assert.equal(await page.locator('#app').getAttribute('data-theme'), theme);
        for (const mode of ['home', 'lexicon', 'practice', 'training', 'settings']) {
          await navigate(page, mode);
          if (mode === 'practice') assert.equal(await page.locator('#app').getAttribute('data-workspace'), 'practice');
          if (mode === 'training') assert.equal(await page.locator('#app').getAttribute('data-workspace'), 'training');
          await geometry(page);
          assert.deepEqual(await storage(page), initialStorage);
          assert.equal(await contentDigest(page), initialContent);
        }
        observedThemes[theme] = await page.locator('#app').evaluate(e => ({ color: getComputedStyle(e).color, background: getComputedStyle(e).backgroundColor }));
      }
      assert.notDeepEqual(observedThemes.light, observedThemes.petroleum, 'light theme must render different computed colors');
      assert.notDeepEqual(observedThemes.purple, observedThemes.petroleum, 'purple theme must render different computed colors');
    });
    await test(width, 'manual simulator reference preserves every null, absent and stored draft; theme CSS stays outside iframe', async () => {
      await appCall(page, a => { a.setTheme('petroleum'); a.setAppMode('practice'); a.selectLesson('JS-101', true); });
      assert.equal(await appCall(page, a => a.activeRun), null);
      const savedDraft = await appCall(page, a => a.practiceCode);
      await appCall(page, a => a.runSimulatorReference());
      await page.waitForFunction(() => window.vueLexiconApp.executionState === 'preview_ready' && window.vueLexiconApp.simulatorObservation !== null);
      const frame = page.locator('iframe[title="معاينة كود التمرين"]').contentFrame();
      await frame.locator('#card').waitFor();
      const css = () => frame.locator('#card').evaluate(e => {
        const s = getComputedStyle(e); return { background: s.backgroundColor, color: s.color, border: s.borderColor, font: s.fontFamily, radius: s.borderRadius, text: e.textContent };
      });
      const originalCss = await css();
      const runId = await appCall(page, a => a.activeRun.runId);
      assert.equal(await page.locator('iframe').getAttribute('sandbox'), 'allow-scripts');
      for (const theme of ['light', 'purple', 'petroleum']) {
        await appCall(page, (a, theme) => a.setTheme(theme), theme); await settle(page);
        assert.deepEqual(await css(), originalCss);
        assert.equal(await appCall(page, a => a.activeRun.runId), runId);
        assert.equal(await appCall(page, a => a.practiceCode), savedDraft);
        assert.deepEqual(await storage(page), initialStorage);
      }
      assert.equal(await frame.locator('body').evaluate(() => { try { parent.localStorage.getItem('x'); return 'unsafe'; } catch (_) { return 'isolated'; } }), 'isolated');
      await geometry(page);
    });
    await test(width, 'foreign window and unknown-source messages cannot overwrite simulator state', async () => {
      const before = await appCall(page, a => ({ state: a.executionState, snapshot: a.lastDomSnapshot, logs: a.practiceLogs }));
      await appCall(page, a => {
        const data = { source: 'VUELEXICON_SANDBOX', runId: a.activeRun.runId, lessonId: a.activeRun.lessonId, type: 'EXECUTION_ERROR', payload: { msg: 'UNTRUSTED_PHASE5B_ERROR', lineno: 0 } };
        window.dispatchEvent(new MessageEvent('message', { source: window, origin: 'null', data }));
        window.dispatchEvent(new MessageEvent('message', { source: a.practiceIframeRef.contentWindow, origin: 'null', data: { ...data, source: 'UNKNOWN_SOURCE' } }));
      });
      await settle(page);
      assert.deepEqual(await appCall(page, a => ({ state: a.executionState, snapshot: a.lastDomSnapshot, logs: a.practiceLogs })), before);
      assert.deepEqual(await storage(page), initialStorage);
    });
    await test(width, 'returning to dashboard and reload retain bookmarks mastery history backups and all drafts', async () => {
      await navigate(page, 'home');
      assert.equal(await appCall(page, a => a.activeRun), null);
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.vueLexiconApp?.rawLexiconData.length === 180);
      assert.deepEqual(await storage(page), initialStorage);
      assert.deepEqual(await appCall(page, a => [...a.bookmarkedIds]), [ids[1], ids[3]]);
      assert.deepEqual(await appCall(page, a => a.recentViewedIds), [ids[3], ids[1]]);
      assert.equal(await appCall(page, (a, id) => a.getTermMastery(id), ids[3]), 'mastered');
      assert.equal(await contentDigest(page), initialContent);
    });
    await test(width, 'legacy Tailwind dimensions colors responsive typography and filters still render inside isolated iframe', async () => {
      // A disposable opaque-origin frame tests the shipped CSS without touching
      // practiceCode, saved drafts, the active simulator session, or page styles.
      await page.evaluate(({ css, width }) => {
        const frame = document.createElement('iframe');
        frame.id = 'phase5b-utility-probe';
        frame.setAttribute('sandbox', 'allow-scripts');
        frame.style.cssText = `position:fixed;left:0;top:-10000px;width:${width}px;height:120px;border:0`;
        frame.srcdoc = `<!doctype html><html><head><link rel="stylesheet" href="${css}"></head><body style="margin:0"><div id="probe" class="w-96 h-11 bg-emerald-950 text-lg sm:text-2xl filter blur">اختبار CSS الأصلي</div></body></html>`;
        document.body.append(frame);
      }, { css: origin + '/assets/tailwind-3.4.17.min.css', width });
      try {
        const frame = page.locator('#phase5b-utility-probe').contentFrame();
        await frame.locator('#probe').waitFor();
        await frame.locator('#probe').evaluate(() => new Promise(resolve => document.readyState === 'complete' ? resolve() : window.addEventListener('load', resolve, { once: true })));
        const style = await frame.locator('#probe').evaluate(e => {
          const s = getComputedStyle(e); return { width: s.width, height: s.height, background: s.backgroundColor, fontSize: s.fontSize, filter: s.filter, viewport: innerWidth };
        });
        assert.deepEqual(style, { width: '384px', height: '44px', background: 'rgb(2, 44, 34)', fontSize: width >= 640 ? '24px' : '18px', filter: 'blur(8px)', viewport: width });
        assert.deepEqual(await storage(page), initialStorage);
      } finally {
        await page.locator('#phase5b-utility-probe').evaluate(e => e.remove());
      }
    });
    await test(width, 'core application uses local assets without failed requests or uncaught exceptions', async () => {
      assert.deepEqual(evidence.externalRequests, []);
      assert.deepEqual(evidence.failedRequests, []);
      assert.deepEqual(evidence.uncaughtErrors, []);
    });
    await context.close();
  }
  // Real page screenshots with empty user storage. No test seed is used here.
  for (const [width, height, label] of [[1440, 1000, 'desktop'], [390, 844, 'mobile'], [768, 1024, 'tablet']]) {
    const { context, page, evidence } = await contextFor(origin, { width, height }, false);
    await loaded(page, origin + '/');
    await test(width, `${label} clean-context dashboard dictionary and simulator screenshots`, async () => {
      assert.equal(await page.evaluate(() => localStorage.getItem('vuelexicon_recovery_phase5b_sentinel')), null);
      assert.deepEqual((await page.locator('.stat-card strong').allTextContents()).map(value => value.trim().replace(/\s+/g, ' ')), ['180', '0', '0 / 15', '0']);
      await takeScreenshot(page, `dashboard-${label}.png`);
      await navigate(page, 'lexicon');
      await appCall(page, a => { a.resetFilters(); a.selectTerm(a.rawLexiconData.find(t => t.term === 'ref()')); });
      await takeScreenshot(page, `dictionary-${label}.png`);
      if (label === 'mobile') {
        await page.locator('#detailed-term-view').evaluate(e => { e.scrollIntoView({ block: 'start', behavior: 'instant' }); window.scrollBy(0, -160); });
        await settle(page);
        await page.screenshot({ path: path.join(screenshots, 'dictionary-detail-mobile.png'), fullPage: false });
        screenshotFiles.push('screenshots/dictionary-detail-mobile.png');
      }
      await appCall(page, a => { a.setAppMode('practice'); a.selectLesson('JS-101', true); a.runSimulatorReference(); });
      await page.waitForFunction(() => window.vueLexiconApp.executionState === 'preview_ready');
      await takeScreenshot(page, `simulator-${label}.png`);
      if (label === 'mobile') {
        await page.locator('.editor-textarea').scrollIntoViewIfNeeded();
        await settle(page);
        await page.screenshot({ path: path.join(screenshots, 'simulator-editor-mobile.png'), fullPage: false });
        screenshotFiles.push('screenshots/simulator-editor-mobile.png');
      }
      if (label === 'desktop') for (const theme of ['light', 'purple']) {
        await appCall(page, (a, theme) => { a.setAppMode('home'); a.setTheme(theme); }, theme);
        await takeScreenshot(page, `dashboard-${theme}-${label}.png`);
        await navigate(page, 'lexicon');
        await takeScreenshot(page, `dictionary-${theme}-${label}.png`);
      }
      assert.deepEqual(evidence.uncaughtErrors, []);
      assert.deepEqual(evidence.failedRequests, []);
    });
    await context.close();
  }
  await test(null, 'educational sources execution modules and visual runtime remain unchanged during verification', async () => {
    for (const [file, hash] of Object.entries({ ...protectedHashes, ...runtimeHashes })) assert.equal(sha(fs.readFileSync(path.join(root, file))), hash, file);
  });
  const passed = results.filter(result => result.passed).length;
  fs.writeFileSync(path.join(output, 'phase5b-browser-report.json'), JSON.stringify({
    timestamp: new Date().toISOString(), browser: { engine: 'chromium', version },
    otherBrowsers: 'Not exercised by this runner; no Firefox, WebKit or Safari claim.',
    screenshotData: 'Separate clean contexts; no seeded records or fictitious user statistics.',
    protectedHashes, runtimeHashes, passed, total: results.length, screenshots: screenshotFiles, networkEvidence, results
  }, null, 2) + '\n');
  console.log(`${passed}/${results.length} phase 5B browser checks passed`);
  if (!results.length || passed !== results.length) process.exitCode = 1;
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
  if (browser) await browser.close();
  server.close();
});
