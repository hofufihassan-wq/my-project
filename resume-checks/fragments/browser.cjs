process.env.PLAYWRIGHT_BROWSERS_PATH = '/workspace/.playwright-browsers';
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { chromium } = require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const root = path.resolve(__dirname, '../..');
const phase = process.argv[2] || 'after';
const out = path.join(__dirname, phase);
fs.mkdirSync(out, { recursive: true });
const results = [], errors = [], navigations = [];
let browser, context, page, host, httpServer;
const session = { runId: 'fragment-regression', lessonId: 'HTML-101' };
const fixture = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<a id="normal" href="#goal"><span>Go to goal</span></a>
<a id="encoded" href="#%D9%87%D8%AF%D9%81">Encoded Arabic target</a>
<a id="blank" href="#">Top</a>
<a id="missing" href="#not-there">Missing</a>
<a id="bad-encoding" href="#%E0%A4%A">Malformed encoding</a>
<a id="named" href="#legacy-name">Named anchor</a>
<a id="cancelled" href="#goal">User-cancelled</a>
<a id="external" href="/different-page">Different document</a>
<div style="height:1100px">Spacer</div>
<h2 id="goal">REAL INNER GOAL</h2>
<h2 id="هدف">REAL ARABIC GOAL</h2>
<a name="legacy-name">REAL NAMED GOAL</a>
<div style="height:700px">Tail</div>
<script>window.__fragmentUserCode='child-only';window.__cancelledCount=0;
document.getElementById('cancelled').addEventListener('click',e=>{e.preventDefault();window.__cancelledCount++});
<\/script></body></html>`;
const harness = `<!doctype html><meta charset="utf-8"><title>Fragment regression harness</title>
<p id="parent-marker">Parent harness unchanged</p><iframe id="preview" sandbox="allow-scripts" style="width:600px;height:320px"></iframe>
<script src="/preview-runner.js"></script><script>
window.accepted=[];window.rejected=0;window.session=${JSON.stringify(session)};
addEventListener('message',event=>{const frame=document.getElementById('preview');const data=VueLexiconRunner.validateMessage(event,frame.contentWindow,window.session);if(data)window.accepted.push(data);else window.rejected++});
<\/script>`;
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
function server() {
  return http.createServer((request, response) => {
    const name = new URL(request.url, 'http://localhost').pathname;
    if (name === '/fragment-harness') {
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      return response.end(harness);
    }
    if (name === '/different-page') {
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      return response.end('<h1>DIFFERENT DOCUMENT WAS REQUESTED</h1>');
    }
    const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404);return response.end();
    }
    response.setHeader('Content-Type', ({ '.html': 'text/html;charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' })[path.extname(file)] || 'application/octet-stream');
    response.end(fs.readFileSync(file));
  });
}
async function fresh() {
  await page.goto(host + '/fragment-harness', { waitUntil: 'networkidle' });
  await page.evaluate(({ code, session }) => {
    document.getElementById('preview').srcdoc = VueLexiconRunner.buildDocument(code, session);
  }, { code: fixture, session });
  await page.waitForFunction(() => window.accepted.some(message => message.type === 'PREVIEW_READY'));
  return await page.locator('#preview').contentFrame();
}
async function observation(frame) {
  return await frame.locator('body').evaluate(body => ({
    url: location.href, baseURI: document.baseURI, scrollY, goalTop: document.getElementById('goal')?.getBoundingClientRect().top,
    goal: document.getElementById('goal')?.textContent, text: body.innerText.slice(0, 180),
    childCode: window.__fragmentUserCode,
  }));
}
async function test(name, fn) {
  try { const evidence = await fn();results.push({ name, passed: true, evidence });console.log('PASS', name); }
  catch (error) { results.push({ name, passed: false, error: error.stack });console.log('FAIL', name, error.message); }
}
async function clickAndWait(frame, id, keyboard) {
  const item = frame.locator('#' + id);
  if (keyboard) { await item.focus();await item.press('Enter'); }
  else await item.click();
  await page.waitForTimeout(200);
}
async function staysInside(frame) {
  const current = await observation(frame);
  assert.match(current.url, /^about:srcdoc(?:#|$)/);
  assert.equal(current.goal, 'REAL INNER GOAL');
  assert.equal(await page.locator('#parent-marker').innerText(), 'Parent harness unchanged');
  assert.equal(page.url(), host + '/fragment-harness');
  return current;
}
(async () => {
  const h = httpServer = server();await new Promise(resolve => h.listen(0, '127.0.0.1', resolve));
  host = 'http://127.0.0.1:' + h.address().port;
  browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, recordVideo: { dir: path.join(out, 'video'), size: { width: 1440, height: 1000 } } });
  page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('framenavigated', frame => { if (frame.parentFrame()) navigations.push(frame.url()); });
  for (const keyboard of [false, true]) await test((keyboard ? 'Enter' : 'mouse') + ' fragment stays in srcdoc and scrolls actual target', async () => {
    const frame = await fresh();const before = await observation(frame);await clickAndWait(frame, 'normal', keyboard);
    await page.screenshot({ path: path.join(out, (keyboard ? 'keyboard' : 'mouse') + '-fragment.png') });
    const after = await staysInside(frame);assert(after.scrollY > 800);assert(Math.abs(after.goalTop) <= 2);return { before, after };
  });
  await test('encoded Unicode id scrolls to real Arabic target', async () => {
    const frame = await fresh();await clickAndWait(frame, 'encoded');const current = await staysInside(frame);
    const top = await frame.locator('[id="هدف"]').evaluate(el => el.getBoundingClientRect().top);assert(Math.abs(top) <= 2);return { current, arabicTop: top };
  });
  await test('empty fragment returns to top without leaving child', async () => {
    const frame = await fresh();await frame.locator('body').evaluate(() => scrollTo(0, 700));await clickAndWait(frame, 'blank', true);
    const current = await staysInside(frame);assert.equal(current.scrollY, 0);return current;
  });
  for (const id of ['missing', 'bad-encoding']) await test(id + ' fragment preserves document with no unhandled error', async () => {
    const frame = await fresh();await clickAndWait(frame, id);return await staysInside(frame);
  });
  await test('legacy named anchor remains local and scrolls', async () => {
    const frame = await fresh();await clickAndWait(frame, 'named');const current = await staysInside(frame);
    const top = await frame.locator('a[name="legacy-name"]').evaluate(el => el.getBoundingClientRect().top);assert(Math.abs(top) <= 2);return { current, namedTop: top };
  });
  await test('user preventDefault is respected and listener runs once', async () => {
    const frame = await fresh();await clickAndWait(frame, 'cancelled');const current = await staysInside(frame);
    assert.equal(current.scrollY, 0);assert.equal(await frame.locator('body').evaluate(() => window.__cancelledCount), 1);return current;
  });
  await test('nonfragment document links retain their existing behavior', async () => {
    const frame = await fresh();await clickAndWait(frame, 'external');assert.match(frame.locator('body') ? page.frames().find(f => f.parentFrame())?.url() || '' : '', /different-page$/);
    assert.equal(await page.locator('#preview').contentFrame().locator('h1').innerText(), 'DIFFERENT DOCUMENT WAS REQUESTED');return { destination: page.frames().find(f => f.parentFrame()).url() };
  });
  await test('sandbox stays opaque and user code never runs in parent', async () => {
    const frame = await fresh();assert.equal(await page.locator('#preview').getAttribute('sandbox'), 'allow-scripts');
    const isolation = await frame.locator('body').evaluate(() => { const blocked = {};for (const [key, read] of Object.entries({ parentDocument: () => parent.document.body, parentStorage: () => parent.localStorage.length })) { try { read();blocked[key] = false; } catch (_) { blocked[key] = true; } }return blocked; });
    assert.deepEqual(isolation, { parentDocument: true, parentStorage: true });assert.equal(await page.evaluate(() => window.__fragmentUserCode), undefined);return isolation;
  });
  await test('message sender identity, run and payload bounds still reject forged data', async () => {
    await fresh();const before = await page.evaluate(() => accepted.length);
    await page.evaluate(() => { const good = { source: 'VUELEXICON_SANDBOX', ...window.session, type: 'PREVIEW_READY', payload: {} };window.postMessage(good, '*');const frame = document.getElementById('preview');window.dispatchEvent(new MessageEvent('message', { source: frame.contentWindow, data: { ...good, runId: 'old-run' } }));window.dispatchEvent(new MessageEvent('message', { source: frame.contentWindow, data: { ...good, payload: { unexpected: true } } })); });
    await page.waitForTimeout(100);const after = await page.evaluate(() => ({ accepted: accepted.length, rejected }));assert.equal(after.accepted, before);assert(after.rejected >= 3);return after;
  });
  await test('full simulator user editor fragment click keeps actual lesson preview', async () => {
    await page.goto(host, { waitUntil: 'networkidle' });await page.waitForFunction(() => window.vueLexiconApp);
    await page.locator('[data-testid="nav-simulator"]:visible').first().click();await page.locator('.tech-auto input').uncheck();
    await page.getByTestId('beta-language-source').click();await page.getByTestId('tech-editor').fill(fixture);await page.getByTestId('tech-run').click();
    await page.waitForFunction(() => window.vueLexiconApp.executionState === 'preview_ready');
    const frame = page.getByTestId('tech-live-preview').contentFrame();await frame.locator('#normal').focus();await frame.locator('#normal').press('Enter');await page.waitForTimeout(200);
    const after = await observation(frame);assert.match(after.url, /^about:srcdoc(?:#|$)/);assert.equal(after.goal, 'REAL INNER GOAL');assert(after.scrollY > 800);
    assert.equal(await page.getByTestId('tech-live-preview').getAttribute('sandbox'), 'allow-scripts');
    await page.screenshot({ path: path.join(out, 'full-simulator-fragment.png') });return after;
  });
  await context.close();await browser.close();h.close();
})().catch(error => { results.push({ name: 'runner', passed: false, error: error.stack }); }).finally(async () => {
  if (browser?.isConnected()) await browser.close();
  httpServer?.close();
  const report = { phase, timestamp: new Date().toISOString(), runnerSHA256: hash(fs.readFileSync(path.join(root, 'preview-runner.js'))), passed: results.filter(item => item.passed).length, total: results.length, results, errors, navigations };
  fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: report.passed, total: report.total, errors }));
  if (results.some(item => !item.passed) || errors.length) process.exitCode = 1;
});
