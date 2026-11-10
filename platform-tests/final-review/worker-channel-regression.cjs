process.env.PLAYWRIGHT_BROWSERS_PATH=process.env.PLAYWRIGHT_BROWSERS_PATH||'/workspace/.playwright-browsers';
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const root = process.env.VLEX_REVIEW_ROOT || path.resolve(__dirname, '../..');
const output = process.env.VLEX_REVIEW_OUTPUT || path.join(__dirname, 'worker-channel-after.json');
const results = [];
let browser, page;
const html = '<!doctype html><meta charset="utf-8"><div id="app"><vlex-js-lab></vlex-js-lab></div><script src="/assets/vendor/vue-3.4.21.global.prod.js"></script><script src="/assets/vendor/compiler-sfc-3.4.21.global.min.js"></script><script src="/learning-js-lab.js"></script><script>const app=Vue.createApp({});for(const item of VLexPlatformComponents)app.component(item.name,item.component);app.mount("#app");</script>';
const server = http.createServer((req, res) => {
  if (req.url === '/') { res.setHeader('Content-Type', 'text/html'); return res.end(html); }
  const file = path.resolve(root, '.' + new URL(req.url, 'http://localhost').pathname);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.setHeader('Content-Type', 'text/javascript'); res.end(fs.readFileSync(file));
});
async function test(name, fn) {
  try { const observed = await fn(); results.push({ name, passed: true, observed }); console.log('PASS', name); }
  catch (error) {
    results.push({ name, passed: false, error: error.stack }); console.error('FAIL', name, error.message);
    if (page) {
      await page.locator('[data-testid="js-lab-console"]').evaluate(element => {
        element.style.outline = '5px solid red'; element.style.borderRadius = '50%';
        element.setAttribute('data-review-annotation', 'Actual forged console messages');
      });
      await page.screenshot({path:output.replace(/\.json$/, '-failure.png'),fullPage:true});
    }
  }
}
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  page = await browser.newPage({viewport:{width:1400,height:1000},recordVideo:{dir:path.join(path.dirname(output),'worker-channel-video'),size:{width:1400,height:1000}}});
  await page.goto('http://127.0.0.1:' + server.address().port);
  async function run(source) {
    await page.getByTestId('js-lab-source').fill(source); await page.getByTestId('js-lab-run').click();
    await page.waitForFunction(() => /انتهت التعليمات|يوجد خطأ|مهلة التنفيذ/.test(document.querySelector('[data-testid="js-lab-status"]').textContent));
  }
  await test('nested bootstrap clone cannot forge log or an existing declared variable', async () => {
    await run(`let actual = 1;
if (self.name !== 'nested') {
  const clone = new Worker(self.location.href, {name: 'nested'});
  const controls = new MessageChannel();
  controls.port1.onmessage = () => {
    console.log('CLONE_PORT_OBSERVED');
    postMessage({type:'log',payload:{text:'FORGED_PRIVATE_CHANNEL',level:'log'}});
    postMessage({type:'snapshot',payload:{index:0,variables:[{name:'actual',value:'666'}]}});
  };
  clone.onmessage = event => {
    if (!event.data.nonce) return;
    console.log('NESTED_NONCE_LEAK');
    postMessage({nonce:event.data.nonce,type:'log',payload:{text:'FORGED_PRIVATE_CHANNEL',level:'log'}});
    postMessage({nonce:event.data.nonce,type:'snapshot',payload:{index:0,variables:[{name:'actual',value:'666'}]}});
  };
  clone.postMessage({type:'VLEX_INIT_PORT'}, [controls.port2]);
}`);
    await page.waitForTimeout(400);
    const log = await page.getByTestId('js-lab-console').innerText();
    const history = await page.locator('.vlx-js-history').textContent();
    assert(!log.includes('FORGED_PRIVATE_CHANNEL'), log);
    assert(!history.includes('666'), history);
    assert(!log.includes('NESTED_NONCE_LEAK'), log);
    await page.screenshot({path:output.replace(/\.json$/, '-passed.png'),fullPage:true});
    return { log, history };
  });
  await test('normal console and observation survive private telemetry; global spoof ignored', async () => {
    await run('let result=7; result+=2; postMessage({type:"log",payload:{text:"GLOBAL_SPOOF",level:"log"}}); console.log("ACTUAL",result);');
    const log = await page.getByTestId('js-lab-console').innerText();
    assert(log.includes('ACTUAL 9')); assert(!log.includes('GLOBAL_SPOOF'));
    assert((await page.getByTestId('js-lab-variables').innerText()).includes('9'));
    return { log };
  });
})().catch(error => { results.push({name:'runner',passed:false,error:error.stack}); }).finally(async () => {
  if (browser) await browser.close(); server.close();
  fs.writeFileSync(output, JSON.stringify({timestamp:new Date().toISOString(),sourceRoot:root,passed:results.filter(x=>x.passed).length,total:results.length,results},null,2));
  if (results.some(x=>!x.passed)) process.exitCode=1;
});
