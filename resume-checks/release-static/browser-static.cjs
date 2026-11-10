// Actual Chromium smoke test at / and /review/ with all external traffic blocked.
// This does not publish, modify the site, or claim native Windows/HTTPS coverage.
const fs = require('fs'), path = require('path'), http = require('http');
const net = require('net'), childProcess = require('child_process');
const {chromium} = require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const website = path.resolve(process.argv[2]);
const output = __dirname, project = path.resolve(__dirname, '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(website, '..', 'STATIC_PACKAGE_MANIFEST.json'), 'utf8'));
const report = {sourceCommit: manifest.source_commit, website,
  transport: 'local HTTP only', browser: 'Chromium on Linux; Windows CMD not available',
  externalRequests: [], pageErrors: [], paths: []};
const assert = (value, message) => { if (!value) throw new Error(message); };
let browser, server, launcher;
function freePort(port) {
  return new Promise(resolve => {
    const socket = net.connect({port, host:'127.0.0.1'});
    socket.once('connect', () => {socket.end(); resolve(false);});
    socket.once('error', () => resolve(true));
  });
}
(async () => {
  server = http.createServer((request, response) => {
    let name = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (name.startsWith('/review/')) name = name.slice('/review'.length);
    if (name.endsWith('/')) name += 'index.html';
    const file = path.resolve(website, '.' + name);
    if (!file.startsWith(website + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404); response.end(); return;
    }
    response.setHeader('Content-Type', ({'.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.woff2':'font/woff2', '.svg':'image/svg+xml', '.json':'application/json'})[path.extname(file)] || 'application/octet-stream');
    response.end(fs.readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  browser = await chromium.launch({executablePath:'/usr/bin/chromium', headless:true, args:['--no-sandbox']});
  for (const prefix of ['/', '/review/']) {
    const context = await browser.newContext({viewport:{width:1440,height:1000}});
    await context.route('**/*', route => {
      if (new URL(route.request().url()).origin !== origin) {
        report.externalRequests.push(route.request().url()); return route.abort();
      }
      return route.continue();
    });
    const page = await context.newPage(), failed = [], errors = [];
    page.on('pageerror', e => {errors.push(e.message); report.pageErrors.push({prefix, message:e.message});});
    page.on('response', response => {if (response.status() >= 400) failed.push({url:response.url(), status:response.status()});});
    await page.goto(origin + prefix, {waitUntil:'networkidle'});
    await page.waitForFunction(() => window.vueLexiconApp);
    await page.locator('[data-testid="nav-lexicon"]:visible').click();
    const search = page.locator('input[placeholder^="ابحث عن أي تاق"]');
    await search.fill('ref');
    await page.waitForFunction(() => window.vueLexiconApp.searchQuery === 'ref' && window.vueLexiconApp.filteredTermsList.length > 0);
    const englishMatches = await page.evaluate(() => window.vueLexiconApp.filteredTermsList.length);
    await search.fill('مصفوف');
    await page.waitForFunction(() => window.vueLexiconApp.filteredTermsList.length > 0);
    const arabicMatches = await page.evaluate(() => window.vueLexiconApp.filteredTermsList.length);
    await search.fill(''); await search.blur();
    const assetResponses = await page.evaluate(async () => {
      const urls = Array.from(document.querySelectorAll('script[src],link[href]')).map(x => x.src || x.href).filter(url => !url.startsWith('data:'));
      return Promise.all(urls.map(async url => {const r = await fetch(url); return {url, status:r.status};}));
    });
    assert(assetResponses.every(response => response.status === 200), 'Missing script/link asset at ' + prefix);
    assert(errors.length === 0 && failed.length === 0, 'Browser errors at ' + prefix);
    const screenshot = path.join(output, prefix === '/' ? 'static-root.png' : 'static-nested.png');
    await page.screenshot({path:screenshot});
    report.paths.push({prefix, englishMatches, arabicMatches, htmlAssetsFetched:assetResponses.length,
      mounted:true, requestsWithErrors:failed, screenshot:path.basename(screenshot)});
    await context.close();
  }
  assert(report.externalRequests.length === 0, 'App attempted external runtime traffic');
  if (await freePort(8091)) {
    let stdout = '', stderr = '';
    launcher = childProcess.spawn('python3', ['scripts/start-local.py','--no-browser'], {cwd:project});
    launcher.stdout.on('data', data => stdout += data.toString());
    launcher.stderr.on('data', data => stderr += data.toString());
    const deadline = Date.now() + 5000;
    while (!stdout.includes('is running') && launcher.exitCode === null && Date.now() < deadline) await new Promise(resolve => setTimeout(resolve, 100));
    assert(stdout.includes('is running'), 'Local launcher failed: ' + stderr);
    const health = await fetch('http://127.0.0.1:8091/__vlex_health__').then(response => response.json());
    assert(health.application === 'VLex Pro local', 'Local launcher health mismatch');
    const blocked = {};
    for (const name of ['.git/config', '.env', 'README.md', '_pristine_backup/index.html', 'scripts/start-local.py']) {
      blocked[name] = (await fetch('http://127.0.0.1:8091/' + name)).status;
      assert(blocked[name] === 404, 'Local server disclosed ' + name);
    }
    report.localLauncher = {status:'passed on Linux/Python', origin:health.origin, blocked,
      note:'Only this test-owned process was stopped with SIGINT. Windows BAT reviewed, not executed.'};
    launcher.kill('SIGINT');
    await new Promise(resolve => launcher.once('exit', resolve)); launcher = null;
  } else report.localLauncher = {status:'skipped', reason:'8091 already occupied; unrelated process untouched'};
  report.status = 'passed'; report.finishedUtc = new Date().toISOString();
  fs.writeFileSync(path.join(output, 'browser-results.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report));
})().catch(error => {
  report.status = 'failed'; report.error = error.stack;
  fs.writeFileSync(path.join(output, 'browser-results.json'), JSON.stringify(report,null,2) + '\n');
  console.error(error.stack); process.exitCode = 1;
}).finally(async () => {
  if (launcher) launcher.kill('SIGINT');
  if (browser) await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
});
