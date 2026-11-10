const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const root=path.resolve(__dirname,'../..'),out=path.join(__dirname,'evidence');fs.mkdirSync(out,{recursive:true});
const lessons=require('../../learning-course-advanced.js'),expected=require('./expectations.cjs'),results=[];
let browser;const errors=[],network=[];
const server=http.createServer((req,res)=>{
  if(req.url==='/advanced'){
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.end('<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/learning-course.css"><div id="app"><vlex-course></vlex-course></div><script src="/assets/vendor/vue-3.4.21.global.prod.js"></script><script src="/learning-store.js"></script><script src="/preview-runner.js"></script><script src="/learning-course.js"></script><script src="/learning-course-advanced.js"></script><script>const app=Vue.createApp({});for(const entry of VLexPlatformComponents)app.component(entry.name,entry.component);app.mount("#app");</script></html>');return;
  }
  if(req.url==='/runner'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end('<!doctype html><meta charset="utf-8"><script src="/preview-runner.js"></script><body style="margin:0"></body>');return;}
  const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'application/octet-stream');res.end(fs.readFileSync(file));
});
async function test(name,fn){try{await fn();results.push({name,passed:true});console.log('PASS',name);}catch(error){results.push({name,passed:false,error:error.stack});console.error('FAIL',name,error.message);}}
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
  await context.route('**/*',route=>{const url=route.request().url();if(/^https?:/.test(url)&&!url.startsWith(origin+'/')){network.push(url);route.abort();}else route.continue();});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(origin+'/runner');
  async function run(lesson,width=800){await page.evaluate(({lesson,origin,width})=>{
    document.querySelector('#example-frame')?.remove();const frame=document.createElement('iframe');frame.id='example-frame';frame.setAttribute('sandbox','allow-scripts');frame.style='border:0;width:'+width+'px;height:650px';
    frame.srcdoc=VueLexiconRunner.buildDocument(lesson.example,{runId:lesson.id,lessonId:lesson.id},{vueRuntimeUrl:origin+'/assets/vendor/vue-3.4.21.global.prod.js'});document.body.append(frame);
  },{lesson,origin,width});return page.frameLocator('#example-frame');}
  const outcomes=[];
  for(const lesson of lessons)await test(lesson.id+' actual DOM and behavior',async()=>{
    const frame=await run(lesson),check=expected[lesson.id];await frame.locator(check.selector).first().waitFor();
    if(check.count)assert.equal(await frame.locator(check.selector).count(),check.count);
    if(check.text)assert((await frame.locator(check.selector).first().innerText()).includes(check.text));
    await check.interact(frame);
    outcomes.push({id:lesson.id,title:lesson.title,level:lesson.level,passed:true,observed:await frame.locator(check.selector).first().innerText(),interaction:true,sourceBytes:Buffer.byteLength(lesson.example)});
  });
  await test('responsive grid at390px becomes one column without overflow',async()=>{
    const frame=await run(lessons.find(x=>x.id==='css-grid-minmax'),390);await frame.locator('.cards article').first().waitFor();
    assert.equal(await frame.locator('.cards').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),1);
    assert(await frame.locator('body').evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  });
  await test('reduced motion disables displacement and transition while preserving state',async()=>{
    await page.emulateMedia({reducedMotion:'reduce'});const frame=await run(lessons.find(x=>x.id==='css-transition-reduced-motion'));await frame.locator('#toggle-motion').click();
    assert.deepEqual(await frame.locator('.motion-card').evaluate(e=>({transform:getComputedStyle(e).transform,duration:getComputedStyle(e).transitionDuration,background:getComputedStyle(e).backgroundColor})),{transform:'none',duration:'0s',background:'rgb(187, 247, 208)'});
    await page.emulateMedia({reducedMotion:'no-preference'});
  });
  await test('all32lessons append to real component and advanced source opens without autoexecution',async()=>{
    await page.goto(origin+'/advanced');await page.getByTestId('learning-course').waitFor();assert.equal(await page.evaluate(()=>VLexCourse.lessons.length),32);
    assert.equal(await page.locator('[data-lesson-id]').count(),32);
    await page.locator('[data-lesson-id="vue-props-emits"]').click();assert((await page.getByTestId('course-draft').inputValue()).includes('TaskCard'));
    assert.equal(await page.locator('iframe').count(),0);
    await page.screenshot({path:path.join(out,'advanced-course-1440.png'),fullPage:true});
  });
  await test('390px course remains usable with advanced lesson selected',async()=>{
    await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    assert((await page.locator('.vlc-lesson h2').innerText()).includes('المكون يستقبل'));
    await page.screenshot({path:path.join(out,'advanced-course-390.png'),fullPage:true});
  });
  await test('no external requests or unexpected errors in actual examples',async()=>{assert.deepEqual(network,[]);assert.deepEqual(errors,[]);});
  fs.writeFileSync(path.join(out,'example-results.json'),JSON.stringify(outcomes,null,2));await context.close();
})().catch(error=>{results.push({name:'runner',passed:false,error:error.stack});console.error(error);}).finally(async()=>{
  if(browser)await browser.close();server.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({timestamp:new Date().toISOString(),passed:results.filter(x=>x.passed).length,total:results.length,results},null,2));
  if(results.some(x=>!x.passed))process.exitCode=1;
});
