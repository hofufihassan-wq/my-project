/* Real Chromium integration checks. Test-only CDN fixtures do not verify CDN availability or CSS. */
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const assert = require('node:assert/strict');

const playwrightPath = process.env.PLAYWRIGHT_PATH || '/opt/codex/cua_node/lib/node_modules/playwright-core';
const { chromium } = require(playwrightPath);
const runtimePath = process.env.VUE_TEST_RUNTIME || '/tmp/vuelexicon-vue-3.4.21.js';
if (!fs.existsSync(runtimePath)) {
  throw new Error('Provide VUE_TEST_RUNTIME pointing to the verified Vue 3.4.21 browser build (see PHASE0A_REPORT.md).');
}
const vueRuntime = fs.readFileSync(runtimePath);
const results = [];
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let browser;
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(__dirname, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(__dirname + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404); res.end(); return;
  }
  res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' })[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext();
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === base || url.protocol === 'data:' || url.protocol === 'about:') return route.continue();
    if (/\/vue(?:@|\/)/.test(url.pathname)) return route.fulfill({ contentType: 'application/javascript', body: vueRuntime });
    if (url.hostname === 'cdn.tailwindcss.com') return route.fulfill({ contentType: 'application/javascript', body: 'window.tailwind={config:{}};' });
    if (url.pathname.includes('highlight')) return route.fulfill({ contentType: 'application/javascript', body: 'window.hljs={highlight:(s)=>({value:s.replace(/&/g,"&amp;").replace(/</g,"&lt;")}),highlightAuto:(s)=>({value:s}),getLanguage:()=>true,highlightAll:()=>{}};' });
    return route.fulfill({ body: '', contentType: 'text/plain' });
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => { if (error.message !== 'intentional-phase0a-error') pageErrors.push(error.message); });
  await page.addInitScript(() => {
    if (window !== window.top) return;
    if (!sessionStorage.getItem('phase0a_seeded')) {
      localStorage.setItem('vuelexicon_practice_progress', 'null');
      sessionStorage.setItem('phase0a_seeded', 'true');
    }
  });
  await page.goto(base, { waitUntil: 'load' });
  await page.waitForFunction(() => window.vueLexiconApp?.practiceLessons?.length === 15);
  async function test(name, fn) {
    try { await fn(); results.push({name, passed:true}); console.log('PASS', name); }
    catch (error) { results.push({name, passed:false, error:error.message}); console.error('FAIL', name, error.message); }
  }
  const evalApp = (fn, arg) => page.evaluate(({source, arg}) => (new Function('a', 'arg', `return (${source})(a,arg)`))(window.vueLexiconApp, arg), { source: fn.toString(), arg });
  async function run(code) {
    await evalApp((a, code) => { a.practiceCode = code; a.runPracticeCode(); }, code);
    await page.waitForFunction(() => ['preview_ready', 'error'].includes(window.vueLexiconApp.executionState));
  }
  async function importPayload(payload) {
    await evalApp((a, payload) => { a.toastMessage=''; a.toastType=''; a.importUserData({ target: { files: [new File([JSON.stringify(payload)], 'progress.json', { type:'application/json' })], value:'progress.json' } }); }, payload);
    await page.waitForFunction(() => /استيراد|الاستيراد/.test(window.vueLexiconApp.toastMessage));
    return evalApp(a => ({ type:a.toastType, text:a.toastMessage }));
  }
  await test('JSON null local progress starts safely and keeps recoverable raw backup', async () => {
    assert.equal(await evalApp(a => a.rawLexiconData.length), 180);
    assert.equal(await page.evaluate(() => Object.keys(localStorage).some(k => k.startsWith('vuelexicon_recovery_') && localStorage.getItem(k) === 'null')), true);
  });
  await test('codeDraft object import is rejected before any stored/user state changes', async () => {
    const before = await evalApp(a => JSON.stringify({p:a.practiceProgress,b:[...a.bookmarkedIds],m:a.termMastery}));
    const stored = await page.evaluate(() => JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))));
    const result = await importPayload({practiceProgress:{'JS-101':{status:'passed',codeDraft:{}}}});
    assert.equal(result.type, 'error');
    assert.equal(await evalApp(a => JSON.stringify({p:a.practiceProgress,b:[...a.bookmarkedIds],m:a.termMastery})), before);
    assert.equal(await page.evaluate(() => JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))), stored);
  });
  await test('random JSON file rejected', async () => assert.equal((await importPayload({unrelated:'file'})).type,'error'));
  await test('supported legacy and versioned valid exports import', async () => {
    assert.equal((await importPayload({practiceProgress:{'JS-101':{status:'unlocked',codeDraft:''}}})).type,'success');
    assert.equal((await importPayload({app:'VueLexicon Pro',version:'3.6.0',practiceProgress:{'JS-101':{status:'unlocked',codeDraft:'<p>legacy draft</p>'}}})).type,'success');
    assert.equal((await importPayload({app:'VueLexicon Pro',version:'4.0.0',practiceProgress:{'JS-101':{status:'unlocked',codeDraft:'<p>current draft</p>'}}})).type,'success');
  });
  await evalApp(a => { a.setAppMode('practice'); a.selectTrack('js'); });
  await page.waitForSelector('iframe[title="معاينة كود التمرين"]');
  await test('manual mode typing changes neither submitted code nor iframe document', async () => {
    await run('<p id="card">submitted</p>');
    const before = await evalApp(a => ({key:a.practiceIframeKey, doc:a.practiceIframeDoc}));
    await page.locator('.editor-textarea').fill('<p id="card">draft only</p>');
    await pause(550);
    assert.deepEqual(await evalApp(a => ({key:a.practiceIframeKey, doc:a.practiceIframeDoc})), before);
    assert.equal(await page.locator('iframe[title="معاينة كود التمرين"]').contentFrame().locator('#card').textContent(),'submitted');
    await evalApp(a => a.runPracticeCode());
    await page.waitForFunction(() => window.vueLexiconApp.executionState === 'preview_ready');
    assert.equal(await page.locator('iframe[title="معاينة كود التمرين"]').contentFrame().locator('#card').textContent(),'draft only');
  });
  await test('auto mode debounces rapid edits and submits only latest source', async () => {
    await evalApp(a => { a.practiceAutoRun=true; });
    await pause(500);
    const before = await evalApp(a => a.practiceIframeKey);
    await page.locator('.editor-textarea').fill('<p id="card">first</p>');
    await page.locator('.editor-textarea').fill('<p id="card">latest</p>');
    await pause(700);
    assert.equal(await evalApp(a => a.practiceIframeKey), before+1);
    assert.equal(await page.locator('iframe[title="معاينة كود التمرين"]').contentFrame().locator('#card').textContent(),'latest');
    await evalApp(a => { a.practiceAutoRun=false; });
  });
  await test('circular object and BigInt console output does not stop user script', async () => {
    await run('<body><script>const circle={};circle.self=circle;console.log(circle,123n);document.body.dataset.done="yes";<\/script></body>');
    await page.waitForFunction(() => window.vueLexiconApp.practiceLogs.some(l=>l.msg.includes('123n')));
    assert.equal(await page.locator('iframe[title="معاينة كود التمرين"]').contentFrame().locator('body').getAttribute('data-done'),'yes');
    assert.equal(await evalApp(a => a.executionState),'preview_ready');
  });
  await test('new run and stop discard snapshot and validation result', async () => {
    await run('<p id="card">old snapshot</p>');
    await page.waitForFunction(() => window.vueLexiconApp.lastDomSnapshot?.cardText === 'old snapshot');
    await evalApp(a => { a.validationFeedback={passed:true}; a.practiceCode='<p>new source</p>';a.runPracticeCode(); });
    assert.equal(await evalApp(a => a.validationFeedback),null);
    assert.notEqual(await evalApp(a => a.lastDomSnapshot?.cardText),'old snapshot');
    await evalApp(a => a.stopPracticeExecution());
    assert.deepEqual(await evalApp(a => a.lastDomSnapshot),{});
    assert.equal(await evalApp(a => a.validationFeedback),null);
  });
  await test('editing invalidates previous solution verification', async () => {
    await run('<p>test</p>');
    await evalApp(a => { a.validationFeedback={passed:true}; });
    await page.locator('.editor-textarea').fill('<p>changed</p>');
    assert.equal(await evalApp(a => a.validationFeedback),null);
  });
  await test('foreign window messages and stale run IDs are ignored', async () => {
    await run('<p id="card">trusted run</p>');
    const old = await evalApp(a => ({runId:a.activeRun.runId,lessonId:a.activeRun.lessonId}));
    await run('<p id="card">next run</p>');
    await evalApp((a, old) => {
      const payload={source:'VUELEXICON_SANDBOX',runId:a.activeRun.runId,lessonId:a.activeRun.lessonId,type:'EXECUTION_ERROR',payload:{msg:'FOREIGN ERROR',lineno:0}};
      window.dispatchEvent(new MessageEvent('message',{source:window,data:payload,origin:'null'}));
      const stale={...payload,...old};
      window.dispatchEvent(new MessageEvent('message',{source:a.practiceIframeRef.contentWindow,data:stale,origin:'null'}));
      window.dispatchEvent(new MessageEvent('message',{source:a.practiceIframeRef.contentWindow,data:{...payload,payload:null},origin:'null'}));
      window.dispatchEvent(new MessageEvent('message',{source:a.practiceIframeRef.contentWindow,data:{...payload,payload:{msg:'x'.repeat(4001),lineno:0}},origin:'null'}));
      window.dispatchEvent(new MessageEvent('message',{source:a.practiceIframeRef.contentWindow,data:{...payload,type:'UNKNOWN'},origin:'null'}));
    },old);
    assert.equal(await evalApp(a => a.executionState),'preview_ready');
    assert.equal(await evalApp(a => a.practiceLogs.some(l=>l.msg.includes('FOREIGN ERROR'))),false);
  });
  await test('late DOM readiness cannot turn thrown error into success', async () => {
    await run('<script>throw new Error("intentional-phase0a-error")<\/script><p>loaded</p>');
    await pause(600);
    assert.equal(await evalApp(a => a.executionState),'error');
  });
  await test('real interval stops after iframe reset; previous timer cannot contaminate new run', async () => {
    await run('<script>setInterval(()=>console.log("OLD_TIMER_TICK"),40)<\/script>');
    await page.waitForFunction(() => window.vueLexiconApp.practiceLogs.filter(l=>l.msg==='OLD_TIMER_TICK').length>=2);
    await evalApp(a => a.stopPracticeExecution());
    await pause(120);
    const count = await evalApp(a => a.practiceLogs.filter(l=>l.msg==='OLD_TIMER_TICK').length);
    await pause(250);
    assert.equal(await evalApp(a => a.practiceLogs.filter(l=>l.msg==='OLD_TIMER_TICK').length),count);
    await run('<script>console.log("NEW_SESSION")<\/script>');
    await pause(220);
    assert.equal(await evalApp(a => a.practiceLogs.some(l=>l.msg==='OLD_TIMER_TICK')),false);
  });
  await test('lesson change clears old verification and creates new lesson session', async () => {
    await evalApp(a=>{a.validationFeedback={passed:true};a.selectTrack('html');});
    assert.equal(await evalApp(a=>a.validationFeedback),null);
    assert.equal(await evalApp(a=>a.activeRun.lessonId),'HTML-101');
  });
  await test('no application page errors during integration checks', async () => assert.deepEqual(pageErrors, []));
  const passed = results.filter(r=>r.passed).length;
  fs.writeFileSync('phase0a_browser_report.json',JSON.stringify({runtime:'Chromium + Vue 3.4.21 test-only CDN fixture',date:new Date().toISOString(),passed,total:results.length,results},null,2)+'\n');
  console.log(`${passed}/${results.length} browser integration checks passed`);
  if (passed !== results.length) process.exitCode=1;
}
main().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{ if(browser)await browser.close();server.close(); });
