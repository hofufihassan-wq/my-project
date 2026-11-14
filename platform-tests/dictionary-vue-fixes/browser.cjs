process.env.PLAYWRIGHT_BROWSERS_PATH ||= '/workspace/.playwright-browsers';
const { fs, path, assert, chromium, server } = require('../../scripts/simulator-completion-test-helpers.cjs');
const patches = require('./patches.json');
const editorMode = process.argv.includes('--editor');
const baselineMode = process.argv.includes('--baseline');
const suffix = baselineMode ? 'baseline' : editorMode ? 'editor' : 'source';
const out = path.join(__dirname, suffix);
fs.mkdirSync(out, { recursive: true });
const h = server();
const results = [], errors = [];
let browser, page, context;
async function test(name, fn) {
  try { const evidence = await fn(); results.push({ name, passed: true, evidence }); console.log('PASS', name); }
  catch (error) { results.push({ name, passed: false, error: error.stack }); console.error('FAIL', name, error.message); }
}
async function textIs(frame, id, text) {
  await frame.locator(`[data-testid="${id}"]`).waitFor({ state: 'visible', timeout: 4000 });
  for (let n = 0; n < 40; n++) {
    if ((await frame.locator(`[data-testid="${id}"]`).innerText()).trim() === text) return;
    await page.waitForTimeout(50);
  }
  assert.equal((await frame.locator(`[data-testid="${id}"]`).innerText()).trim(), text);
}
async function press(frame, id) {
  // Actual focused control + Enter: works even with a clipped iframe viewport.
  await frame.locator(`[data-testid="${id}"]`).focus();
  await page.keyboard.press('Enter');
}
async function run(patch, code) {
  await page.evaluate(({ patch, code, editorMode, baselineMode }) => {
    const a = window.vueLexiconApp;
    a.setAppMode('lexicon');
    a.selectTerm(a.rawLexiconData.find(t => t.id === patch.id));
    a.dictionaryExpanded=true;
    a.setCodeFormat(patch.field === 11 ? 'vanilla' : 'vue');
    if (editorMode || baselineMode || code !== null) {
      a.updateDictionaryEditor({ target: { value: code ?? (baselineMode ? patch.before : patch.after) } });
    } else {
      if (a.dictionaryEditorCode !== patch.after) throw Error('Source patch not applied: ' + patch.id);
    }
    a.runDictionaryPreview();
  }, { patch, code: code ?? null, editorMode, baselineMode });
  await page.waitForFunction(() => ['error', 'preview_ready'].includes(window.vueLexiconApp.dictionaryPreviewState), null, { timeout: 8000 });
  if (!baselineMode) {
    const state = await page.evaluate(() => ({ state: window.vueLexiconApp.dictionaryPreviewState, logs: window.vueLexiconApp.dictionaryPreviewLogs }));
    assert.equal(state.state, 'preview_ready', JSON.stringify(state));
  }
  return page.locator('iframe[title="المعاينة المباشرة للمصطلح"]').contentFrame();
}
const scenarios = {
  'vue-computed': async f => { await textIs(f, 'count', 'العدد: 0'); await textIs(f, 'doubled', 'الضعف: 0'); await press(f, 'increment'); await textIs(f, 'count', 'العدد: 1'); await textIs(f, 'doubled', 'الضعف: 2'); return { count: 1, doubled: 2 }; },
  'vue-defineasynccomponent': async f => { await textIs(f, 'async-counter', 'عداد المكوّن المحمّل: 0'); await press(f, 'async-counter'); await textIs(f, 'async-counter', 'عداد المكوّن المحمّل: 1'); return { asyncComponentCounter: 1 }; },
  'vue-defineexpose': async f => { assert.equal(await f.getByTestId('exposed-input').inputValue(), 'سارة'); await press(f, 'clear'); assert.equal(await f.getByTestId('exposed-input').inputValue(), ''); await press(f, 'focus'); assert.equal(await f.getByTestId('exposed-input').evaluate(e => document.activeElement === e), true); return { resetWorked: true, focusWorked: true, parentAccess: 'not verified: requires external parent context' }; },
  'vue-nexttick': async f => { await textIs(f, 'count', '0'); await press(f, 'increment'); await textIs(f, 'count', '1'); await textIs(f, 'observed', 'قبل=0؛ بعد=1'); return { actualDOMBefore: '0', actualDOMAfter: '1' }; },
  'vue-onmounted': async f => { await textIs(f, 'mounted', 'قرأنا من DOM بعد التركيب: عنصر جاهز'); return { actualDOMReadOnMount: 'عنصر جاهز' }; },
  'vue-onunmounted': async f => { await f.getByTestId('timer-child').waitFor(); for (let n = 0; n < 40 && +(await f.getByTestId('ticks').innerText()) < 1; n++) await page.waitForTimeout(50); assert(+(await f.getByTestId('ticks').innerText()) >= 1); await press(f, 'remove'); await textIs(f, 'cleanup', 'تم تنظيف المؤقت'); assert.equal(await f.getByTestId('timer-child').count(), 0); const stoppedAt = +(await f.getByTestId('ticks').innerText()); await page.waitForTimeout(350); assert.equal(+(await f.getByTestId('ticks').innerText()), stoppedAt); return { timerStoppedAt: stoppedAt, waitedAfterRemovalMs: 350 }; },
  'vue-provide_inject': async f => { await textIs(f, 'session', 'جلسة الابن: سارة'); await press(f, 'rename'); await textIs(f, 'session', 'جلسة الابن: ليان'); return { injectedRefUpdated: 'ليان' }; },
  'vue-reactive': async f => { await textIs(f, 'count', '0'); await press(f, 'increment'); await textIs(f, 'count', '1'); return { actualCount: 1 }; },
  'vue-shallowref_shallowreactive': async f => { await textIs(f, 'shallow-ref', 'shallowRef: 0'); await textIs(f, 'shallow-reactive', 'shallowReactive: 0'); await press(f, 'nested'); await page.waitForTimeout(150); await textIs(f, 'shallow-ref', 'shallowRef: 0'); await textIs(f, 'shallow-reactive', 'shallowReactive: 0'); await press(f, 'replace'); await textIs(f, 'shallow-ref', 'shallowRef: 2'); await textIs(f, 'shallow-reactive', 'shallowReactive: 2'); return { afterNestedMutationDOM: [0, 0], afterRootReplacementDOM: [2, 2] }; },
  'vue-toref_torefs': async f => { await textIs(f, 'state', 'سارة: 0'); await textIs(f, 'refs', 'سارة: 0'); await f.getByTestId('name-input').fill('ليان'); await press(f, 'increment'); await textIs(f, 'state', 'ليان: 1'); await textIs(f, 'refs', 'ليان: 1'); return { originalStateAndRefs: 'ليان: 1' }; },
  'vue-useslots_useattrs': async f => { await textIs(f, 'default-slot', 'محتوى الفتحة الأساسية'); await textIs(f, 'footer-slot', 'تذييل من المكوّن الأب'); await textIs(f, 'card-title', 'عنوان أول'); assert.equal(await f.getByTestId('attrs-card').getAttribute('title'), 'عنوان أول'); assert.equal(await f.getByTestId('attrs-card').getAttribute('aria-label'), 'بطاقة محلية'); await f.getByTestId('title-input').fill('عنوان جديد'); await textIs(f, 'card-title', 'عنوان جديد'); assert.equal(await f.getByTestId('attrs-card').getAttribute('title'), 'عنوان جديد'); return { slotsRendered: ['default', 'footer'], reactiveAttrsTitle: 'عنوان جديد' }; },
  'vue-watch_watcheffect': async f => { await textIs(f, 'effect', 'watchEffect: 0'); await textIs(f, 'watch', 'watch ينتظر أول تغيير'); await press(f, 'increment'); await textIs(f, 'effect', 'watchEffect: 1'); await textIs(f, 'watch', 'watch: 0 → 1'); return { effectRunsImmediately: true, watchedTransition: [0, 1] }; },
  'vue-watchposteffect': async f => { await textIs(f, 'observed', 'DOM بعد التحديث: 0؛ الحالة: 0'); await press(f, 'increment'); await textIs(f, 'observed', 'DOM بعد التحديث: 1؛ الحالة: 1'); return { afterPatchDOMEqualsState: [1, 1] }; },
  'js-export_import': async f => { await textIs(f, 'count', '0'); await press(f, 'increment'); await textIs(f, 'count', '1'); return { topLevelImportExportCompiled: true, actualCount: 1, externalModulesSupported: false }; },
  'ts-type_narrowing_guards': async () => { await page.waitForFunction(() => { const logs = window.vueLexiconApp.dictionaryPreviewLogs; return logs.some(l => l.msg.includes('VUELEXICON')) && logs.some(l => l.msg.includes('42.86')); }); const logs = await page.evaluate(() => window.vueLexiconApp.dictionaryPreviewLogs); return { actualConsole: logs }; }
};
(async () => {
  await new Promise(resolve => h.listen(0, '127.0.0.1', resolve));
  browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  context = await browser.newContext({ viewport: { width: 1440, height: 1080 }, recordVideo: { dir: path.join(out, 'video'), size: { width: 1440, height: 1080 } } });
  page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:' + h.address().port, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.vueLexiconApp);
  for (const patch of patches) await test(patch.id + ':' + (patch.field === 11 ? 'vanilla' : 'vue'), async () => {
    const frame = await run(patch);
    if (baselineMode) {
      const state = await page.evaluate(() => ({ state: window.vueLexiconApp.dictionaryPreviewState, logs: window.vueLexiconApp.dictionaryPreviewLogs }));
      state.actualDOM = (await frame.locator('body').innerText().catch(() => '')).slice(0, 3000);
      state.actualInteractiveControls = await frame.locator('[data-testid]').count().catch(() => 0);
      assert.equal(state.actualInteractiveControls, 0, 'Original source unexpectedly contains corrected test controls');
      // Explicit review annotation over the genuine browser image; no generated UI/image.
      await page.evaluate(() => {
        const frame = document.querySelector('iframe[title="المعاينة المباشرة للمصطلح"]');
        const box = frame.getBoundingClientRect();
        const ring = document.createElement('div');
        ring.id = 'independent-audit-red-ring';
        Object.assign(ring.style, { position: 'fixed', left: box.left + 'px', top: box.top + 'px', width: box.width + 'px', height: box.height + 'px', border: '5px solid #ff2438', borderRadius: '50%', boxSizing: 'border-box', zIndex: '2147483647', pointerEvents: 'none' });
        const label = document.createElement('span');
        label.textContent = 'تعليق تدقيق: موضع الخلل في المصدر الأصلي';
        Object.assign(label.style, { position: 'absolute', top: '0', right: '5%', background: '#b00020', color: '#fff', font: 'bold 13px Arial', padding: '5px', borderRadius: '4px' });
        ring.append(label);
        document.body.append(ring);
      });
      await page.screenshot({ path: path.join(out, patch.id + '.png') });
      await page.evaluate(() => document.getElementById('independent-audit-red-ring')?.remove());
      return state;
    }
    const evidence = await scenarios[patch.id](frame);
    const state = await page.evaluate(() => ({ state: window.vueLexiconApp.dictionaryPreviewState, logs: window.vueLexiconApp.dictionaryPreviewLogs }));
    assert.equal(state.state, 'preview_ready', JSON.stringify(state));
    assert(!state.logs.some(l => l.type === 'error'), JSON.stringify(state.logs));
    await page.screenshot({ path: path.join(out, patch.id + '.png') });
    return { ...evidence, state: state.state, logs: state.logs };
  });
  if (!baselineMode) await test('typeof guard: invalid type throws actual TypeError', async () => {
    const patch = patches.find(p => p.id === 'ts-type_narrowing_guards');
    await page.evaluate(({ patch }) => { const a = window.vueLexiconApp; a.updateDictionaryEditor({ target: { value: patch.after + '\nprocessInput(true);' } }); a.runDictionaryPreview(); }, { patch });
    await page.waitForFunction(() => window.vueLexiconApp.dictionaryPreviewLogs.some(l => /TypeError|المطلوب نص أو رقم/.test(l.msg)));
    return { logs: await page.evaluate(() => window.vueLexiconApp.dictionaryPreviewLogs) };
  });
  await test('parent application: no uncaught errors', async () => { assert.deepEqual(errors, []); return { errors }; });
  await context.close();
})().catch(error => { results.push({ name: 'runner', passed: false, error: error.stack }); console.error(error); }).finally(async () => {
  if (browser) await browser.close();
  h.close();
  fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ timestamp: new Date().toISOString(), mode: suffix, browser: 'system Chromium', sourcePatches: patches.map(p => ({ id: p.id, field: p.field })), passed: results.filter(x => x.passed).length, total: results.length, results, errors }, null, 2) + '\n');
  if (results.some(x => !x.passed)) process.exitCode = 1;
});
