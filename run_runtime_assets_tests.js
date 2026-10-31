/* Real runtime, fonts and compiled CSS. No Vue/CSS/highlight substitutions. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/codex/cua_node/lib/node_modules/playwright-core');
const output = process.env.VLP_TEST_OUTPUT || 'runtime-assets-artifacts';
const results = [];
let browser;
const server = http.createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname.startsWith('/nested/app/')) pathname = pathname.slice('/nested/app'.length);
  if (pathname.endsWith('/')) pathname += 'index.html';
  const file = path.resolve(__dirname, '.' + pathname);
  if (!file.startsWith(__dirname + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404); res.end(); return;
  }
  res.setHeader('Content-Type', ({'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2'})[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({executablePath:process.env.CHROME_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  async function test(name, fn) {
    try { await fn(); results.push({name,passed:true}); console.log('PASS', name); }
    catch (error) { results.push({name,passed:false,error:error.message}); console.error('FAIL',name,error.message); }
  }
  let coldStyles;
  for (let round=0; round<3; round++) {
    const context = await browser.newContext({reducedMotion:round===0?'no-preference':'reduce',viewport:{width:round===1?390:1440,height:900}});
    const external = [], errors = [], failures = [], fontRequests = [];
    await context.route('**/*', route => {
      const u = new URL(route.request().url());
      if (u.origin === origin || ['data:','about:','blob:'].includes(u.protocol)) return route.continue();
      external.push(u.href); return route.abort('blockedbyclient');
    });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => {if(m.type()==='error') errors.push(m.text());});
    page.on('requestfailed', r => failures.push({url:r.url(),reason:r.failure()?.errorText}));
    page.on('response', r => {if(r.status()>=400) failures.push({url:r.url(),status:r.status()});});
    page.on('request', r => {if(r.url().endsWith('.woff2')) fontRequests.push(r.url());});
    const base = origin + (round===2?'/nested/app/':'/');
    const app = (fn,arg) => page.evaluate(({s,arg}) => (new Function('a','arg',`return (${s})(a,arg)`))(window.vueLexiconApp,arg), {s:fn.toString(),arg});
    async function clickInFrame(button) {
      // Use an actual pointer after positioning the newly composed opaque frame.
      await page.waitForFunction(()=>window.vueLexiconApp.simulatorObservation !== null);
      await page.locator('iframe').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
      await button.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
      await page.waitForTimeout(200);
      await button.click();
    }
    for (let load=0;load<2;load++) {
      await test(`cold context ${round+1}, load ${load+1}: local assets mount with matching fonts/styles and no network`, async () => {
        if(load===0) await page.goto(base,{waitUntil:'networkidle'}); else await page.reload({waitUntil:'networkidle'});
        await page.waitForFunction(() => window.vueLexiconApp?.rawLexiconData.length===180);
        // 5B opens the dashboard. Enter the dictionary explicitly for these legacy scenarios.
        await page.evaluate(() => window.vueLexiconApp.setAppMode('lexicon'));
        await page.waitForTimeout(100);
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.evaluate(() => Vue.version),'3.4.21');
        assert.equal(await page.evaluate(() => hljs.versionString),'11.9.0');
        assert.equal(await page.evaluate(() => document.querySelector('#app').hasAttribute('v-cloak')),false);
        const style = await page.evaluate(() => ({
          body:getComputedStyle(document.body).backgroundColor,
          family:getComputedStyle(document.body).fontFamily,
          logo:document.querySelector('header svg').getBoundingClientRect().width,
          overflow:document.documentElement.scrollWidth > innerWidth + 1,
          arabic:document.fonts.check('400 14px Alexandria','مرحبا'),
          mono:document.fonts.check('400 14px "JetBrains Mono"','const a = 1;')
        }));
        assert.equal(style.body,'rgb(3, 12, 14)');assert.match(style.family,/Alexandria/);
        assert(style.logo>0 && style.logo<100);assert.equal(style.overflow,false);
        assert(style.arabic && style.mono);assert(fontRequests.length>=2);
        if(round===0 && load===0) coldStyles=style;
        if(round===0 && load===1 || round===2) assert.deepEqual(style,coldStyles);
        assert.match(await app(a => a.highlightCode('const answer = 42;', 'javascript')),/hljs-keyword/);
        assert.deepEqual(external,[]);assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
      });
    }
    await test(`context ${round+1}: dictionary filtering and simulator layout retain CSS`, async () => {
      await app(a => {a.searchQuery='map';});assert((await app(a => a.filteredTermsList.length))>0);
      await app(a => {a.searchQuery='';a.setCategory('css');});assert.equal(await app(a => a.filteredTermsList.length),25);
      await app(a => {a.openSimulator();a.backToTracks();});
      assert.equal(await page.locator('[data-track]').count(),5);
      if(round===1) { assert.equal(await page.locator('.beta-mobile-tracks option').count(),5); assert(await page.locator('.beta-mobile-tracks').isVisible()); }
      else assert.equal(await page.locator('[data-track]').first().evaluate(el=>getComputedStyle(el).display),'flex');
      await app(a => a.selectTrack('js'));
      assert.equal(await page.locator('iframe').getAttribute('sandbox'),'allow-scripts');
      assert.equal(await page.locator('.tech-main-grid').evaluate(el=>getComputedStyle(el).display),round===1?'flex':'grid');
    });
    for (const id of ['VUE-101','VUE-102','VUE-103']) {
      await test(`context ${round+1}: ${id} loads local Vue and behaves correctly with Internet blocked`, async () => {
        await app((a,id)=>a.selectLesson(id),id);
        const draft=await app(a=>a.practiceCode);
        await page.getByTestId('tech-reference-run').click();
        await page.waitForFunction(id=>window.vueLexiconApp.activeRun?.lessonId===id && window.vueLexiconApp.activeRun?.kind==='reference' && window.vueLexiconApp.executionState==='preview_ready',id);
        if(await page.getByTestId('final-panel-preview').isVisible())await page.getByTestId('final-panel-preview').click();
        await page.waitForTimeout(200);
        const frame=page.locator('iframe').contentFrame();
        await frame.locator('#app').waitFor();
        assert.equal(await frame.locator('body').evaluate(()=>Vue.version),'3.4.21');
        const srcdoc=await page.locator('iframe').getAttribute('srcdoc');
        assert(srcdoc.includes(base+'assets/vendor/vue-3.4.21.global.prod.js'));
        assert(!srcdoc.includes('https://unpkg.com/vue@3/dist/vue.global.prod.js'));
        if(id==='VUE-101') {
          const button=frame.getByRole('button',{name:'انقر للزيادة ⚡'});
          await clickInFrame(button);
          await page.waitForFunction(()=>window.vueLexiconApp.simulatorObservation?.bodyText.includes('1'));
          assert.equal(await frame.locator('.count-display').textContent(),'1');
        } else if(id==='VUE-102') {
          assert.equal(await frame.locator('li').count(),3);
          const button=frame.getByRole('button',{name:'تبديل حالة الدخول'});
          await clickInFrame(button);
          await frame.locator('li').first().waitFor({state:'detached'});
          assert.equal(await frame.locator('li').count(),0);
        } else {
          assert.equal(await frame.locator('.course-card').count(),3);
          assert.match(await frame.locator('.cards-grid').textContent(),/JavaScript/);
        }
        assert.equal(await frame.locator('body').evaluate(()=>{try{parent.localStorage.getItem('x');return 'unsafe';}catch(_){return 'isolated';}}),'isolated');
        assert.equal(await app(a=>a.practiceCode),draft);
        assert.deepEqual(external,[]);assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
      });
    }
    if(round<2) {
      fs.mkdirSync(path.join(output, 'screenshots'),{recursive:true});
      await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
      await page.screenshot({path:path.join(output, 'screenshots', `${round===0?'desktop':'mobile'}.png`)});
    }
    await context.close();
  }
  const passed=results.filter(r=>r.passed).length;
  fs.mkdirSync(output,{recursive:true});
  fs.writeFileSync(path.join(output, 'browser-report.json'),JSON.stringify({timestamp:new Date().toISOString(),runtime:'Real Chromium, actual local Vue/CSS/fonts/highlight; external requests blocked; no substitutes',passed,total:results.length,results},null,2)+'\n');
  console.log(`${passed}/${results.length} actual runtime checks passed`);
  if(passed!==results.length) process.exitCode=1;
}
main().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();server.close();});
