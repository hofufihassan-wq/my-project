/* Actual Chromium verification for the simulator redesign only.
 * All test data is isolated. Delivery capture uses an independent clean context.
 * This work script never writes application source or historical reports.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const http = require('node:http');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { chromium } = require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const { PNG } = require('/opt/codex/cua_node/lib/node_modules/pngjs');
const root = process.env.VLP_ROOT || __dirname;
const baselineRef = 'ab3a676';
const output = process.env.VLP_TECH_OUTPUT || path.join(root, 'phase5b2-artifacts');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const git = args => execFileSync('git', args, { cwd: root, maxBuffer: 64 * 1024 * 1024 });
const baselineFiles = new Set(git(['ls-tree','-r','--name-only',baselineRef]).toString().trim().split('\n'));
const cache = new Map();
function old(file) {
  if (!baselineFiles.has(file)) return null;
  if (!cache.has(file)) cache.set(file, git(['show',`${baselineRef}:${file}`]));
  return cache.get(file);
}
const protectedFiles = [
  'lexicon-data.js','practice-curriculum.js','progress-data.js','preview-runner.js',
  'dictionary-preview.js','simulator-guides.js','styles.css','identity.css',
  'dictionary-correction.css','simulator-correction.css','package.json','package-lock.json',
  ...[...baselineFiles].filter(file => file.startsWith('_pristine_backup/') || file.startsWith('_v3.5_pre_hands_on_backup/'))
];
const fixture = {window:{}};
vm.runInNewContext(old('practice-curriculum.js').toString(),fixture);
const lessons = fixture.window.PRACTICE_CURRICULUM.lessons;
const progress = Object.fromEntries(lessons.map((lesson,i)=>[lesson.id,{
  status:'unlocked',
  ...(i % 3 === 0 ? {codeDraft:null} : i % 3 === 1 ? {codeDraft:`<p id="saved-${lesson.id}">مسودة محفوظة ${lesson.id}</p>`} : {}),
  updatedAt:'2026-10-29T06:00:00.000Z'
}]));
const seed = {
  vuelexicon_practice_progress:JSON.stringify(progress),
  vuelexicon_recovery_phase5b2_sentinel:'{"raw":"نسخة اختبار استرجاع أصلية؛ لا تُستبدل"}',
  unrelated_application_sentinel:'must remain byte-for-byte intact'
};
const cssNames = [...fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map(m=>m[1]).filter(name=>!name.includes(':'));
const runtimeNames = [...new Set(['app.js','index.html','assets/tailwind-3.4.17.min.css','assets/vendor/manifest.json',...cssNames])];
const runtimeHashes = Object.fromEntries(runtimeNames.map(file=>[file,sha(fs.readFileSync(path.join(root,file)))]));
const results = [],networkEvidence = [],screenshots = [],homepageComparisons=[];
let browser;
function makeServer(baseline=false) {
  return http.createServer((req,res)=>{
    let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(name.endsWith('/'))name+='index.html';
    const relative=name.slice(1),file=path.resolve(root,relative);
    let bytes=null;
    if(file.startsWith(root+path.sep)) {
      if(baseline)bytes=old(relative);
      else if(fs.existsSync(file)&&fs.statSync(file).isFile())bytes=fs.readFileSync(file);
    }
    if(bytes===null){res.writeHead(404);res.end();return;}
    res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'})[path.extname(file)]||'application/octet-stream');
    res.end(bytes);
  });
}
const server=makeServer(),baselineServer=makeServer(true);
const app=(page,fn,arg)=>page.evaluate(({source,arg})=>(new Function('a','arg',`return (${source})(a,arg)`))(window.vueLexiconApp,arg),{source:fn.toString(),arg});
const stored=page=>page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).sort().map(key=>[key,localStorage.getItem(key)])));
const settle=page=>page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
async function test(title,fn){try{await fn();results.push({title,passed:true});console.log('PASS',title);}catch(error){results.push({title,passed:false,error:error.stack||error.message});console.error('FAIL',title,error.message);}}
async function contextFor(origin,seeded,reducedMotion='reduce'){
  const context=await browser.newContext({viewport:{width:1440,height:960},deviceScaleFactor:1,reducedMotion,timezoneId:'Asia/Riyadh'});
  const evidence={origin,seeded,reducedMotion,externalRequests:[],failedRequests:[],uncaughtErrors:[]};
  await context.route('**/*',route=>{
    const url=new URL(route.request().url());
    if(url.origin===origin||['blob:','about:','data:'].includes(url.protocol))return route.continue();
    evidence.externalRequests.push(url.href);return route.abort('blockedbyclient');
  });
  if(seeded)await context.addInitScript(seed=>{
    if(window!==window.top||sessionStorage.getItem('phase5b2-seeded'))return;
    for(const [key,value]of Object.entries(seed))localStorage.setItem(key,value);
    sessionStorage.setItem('phase5b2-seeded','yes');
  },seed);
  const page=await context.newPage();
  page.on('pageerror',e=>evidence.uncaughtErrors.push(e.message));
  page.on('requestfailed',r=>evidence.failedRequests.push({url:r.url(),error:r.failure()?.errorText}));
  page.on('response',r=>{if(r.status()>=400)evidence.failedRequests.push({url:r.url(),status:r.status()});});
  networkEvidence.push(evidence);
  await page.goto(origin+'/',{waitUntil:'networkidle'});
  await page.waitForFunction(()=>window.vueLexiconApp?.practiceLessons?.length===15);
  await page.evaluate(()=>document.fonts.ready);
  await settle(page);
  return {context,page,evidence};
}
function section(source,start,end){const a=source.indexOf(start),b=source.indexOf(end,a);assert(a>=0&&b>a,`source anchors ${start}`);return source.slice(a,b);}
async function main(){
  fs.mkdirSync(path.join(output,'screenshots'),{recursive:true});
  await Promise.all([new Promise(resolve=>server.listen(0,'127.0.0.1',resolve)),new Promise(resolve=>baselineServer.listen(0,'127.0.0.1',resolve))]);
  const origin=`http://127.0.0.1:${server.address().port}`,baselineOrigin=`http://127.0.0.1:${baselineServer.address().port}`;
  browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  await test('educational sources, engine modules, dictionary styles and all original backups match baseline',async()=>{
    for(const file of protectedFiles)assert.equal(sha(fs.readFileSync(path.join(root,file))),sha(old(file)),file);
  });
  await test('accepted homepage stays unchanged and submission/message handlers match reviewed S2 telemetry baseline',async()=>{
    const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),baseHtml=old('index.html').toString();
    const begin='  <main v-if="appMode === \'home\'"',end='  <main v-if="appMode === \'settings\'"';
    assert.equal(section(html,begin,end),section(baseHtml,begin,end));
    // S2 intentionally instruments these parent handlers; pin their exact accepted S2 source.
    // The execution modules remain protected against the original baseline above.
    const current=fs.readFileSync(path.join(root,'app.js'),'utf8'),base=git(['show','3f4dfdd:app.js']).toString();
    for(const [start,end] of [['    function submitSimulatorCode(','    function stopPracticeExecution('],['    function handleWindowMessage(','    // Practical exploration:']])assert.equal(section(current,start,end),section(base,start,end),start);
  });
  const {context,page,evidence}=await contextFor(origin,true);
  const initialStorage=await stored(page);
  await test('manual simulator entry preserves null, absent and stored drafts without running them',async()=>{
    await page.locator('[data-testid="nav-simulator"]:visible').first().click();
    await app(page,a=>a.selectLesson('JS-101',true));await settle(page);
    assert.equal(await page.locator('main.tech-simulator').count(),1);
    assert.equal(await app(page,a=>a.activeRun),null);
    assert.deepEqual(await stored(page),initialStorage);
    assert.equal(await page.locator('[data-testid="tech-editor"]').inputValue(),await app(page,a=>a.currentLesson.initialCode));
  });
  await test('original reference actually runs in an opaque iframe while all drafts remain unchanged',async()=>{
    await page.locator('[data-testid="tech-reference-run"]').click();
    await page.waitForFunction(()=>window.vueLexiconApp.executionState==='preview_ready');
    assert.equal(await page.locator('[data-testid="tech-live-preview"]').getAttribute('sandbox'),'allow-scripts');
    assert.equal(await app(page,a=>a.activeRun.kind),'reference');
    assert.deepEqual(await stored(page),initialStorage);
    const frame=page.locator('[data-testid="tech-live-preview"]').contentFrame();
    await frame.locator('#card').waitFor();
    assert.equal(await frame.locator('body').evaluate(()=>{try{parent.localStorage.getItem('x');return 'unsafe';}catch(_){return 'isolated';}}),'isolated');
  });
  await test('preview HTML CSS and Console tools switch without recreating or rerunning the live frame',async()=>{
    const before=await app(page,a=>({runId:a.activeRun.runId,key:a.practiceIframeKey,doc:a.practiceIframeDoc,draft:a.practiceCode}));
    for(const tab of ['html','css','console','result']){
      await page.locator(`[data-testid="tech-preview-tab-${tab}"]`).click();await settle(page);
      assert.equal(await app(page,a=>a.techPreviewTab),tab);
      assert.deepEqual(await app(page,a=>({runId:a.activeRun.runId,key:a.practiceIframeKey,doc:a.practiceIframeDoc,draft:a.practiceCode})),before);
    }
    assert.deepEqual(await stored(page),initialStorage);
  });
  await test('editor, organized Console, central decoration and live preview have the requested desktop geometry',async()=>{
    await page.locator('.tech-source-switch').getByRole('button',{name:'مسودتي',exact:true}).click(); await settle(page);
    const geometry=await page.evaluate(()=>{
      const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
      return {editor:box('[data-testid="tech-editor"]'),console:box('[data-testid="tech-console"]'),flow:box('[data-testid="tech-flow-canvas"]'),preview:box('[data-testid="tech-live-preview"]'),width:innerWidth,scrollWidth:document.documentElement.scrollWidth};
    });
    assert(geometry.editor.right<=geometry.flow.x+24,JSON.stringify(geometry));
    assert(geometry.flow.right<=geometry.preview.x+24,JSON.stringify(geometry));
    assert(geometry.console.y>=geometry.editor.bottom-3,JSON.stringify(geometry));
    assert(geometry.scrollWidth<=1441,JSON.stringify(geometry));
    assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
  });
  await test('syntax overlay preserves complete editor text and scroll alignment',async()=>{
    const overlay=page.locator('[data-testid="tech-highlight"]');
    assert.equal(await overlay.count(),1);
    const editor=page.locator('[data-testid="tech-editor"]');
    assert.equal((await overlay.textContent()).replace(/\n+$/,''),(await editor.inputValue()).replace(/\n+$/,''));
    const metrics=await page.evaluate(()=>{
      const a=document.querySelector('[data-testid="tech-editor"]'),b=document.querySelector('[data-testid="tech-highlight"]');
      const x=getComputedStyle(a),y=getComputedStyle(b);return{editor:{fontSize:x.fontSize,lineHeight:x.lineHeight,fontFamily:x.fontFamily},overlay:{fontSize:y.fontSize,lineHeight:y.lineHeight,fontFamily:y.fontFamily}};
    });
    assert.deepEqual(metrics.editor,metrics.overlay);
    await editor.evaluate(e=>{e.scrollTop=120;e.scrollLeft=40;e.dispatchEvent(new Event('scroll'));});await settle(page);
    const offsets=await page.evaluate(()=>{const a=document.querySelector('[data-testid="tech-editor"]'),b=document.querySelector('[data-testid="tech-highlight"]');return{a:[a.scrollTop,a.scrollLeft],b:[b.scrollTop,b.scrollLeft]};});
    assert.deepEqual(offsets.a,offsets.b);
  });
  await test('manual edit saves only its selected lesson and does not silently execute the draft',async()=>{
    const before=await app(page,a=>({runId:a.activeRun.runId,key:a.practiceIframeKey,doc:a.practiceIframeDoc}));
    const code='<!doctype html><html><body><p id="manual">اختبار محفوظ</p><script>console.log("ACTUAL_MANUAL_RUN");setTimeout(()=>console.log("ACTUAL_TIMER_LOG"),160)<\/script></body></html>';
    await page.locator('[data-testid="tech-editor"]').fill(code);await page.waitForTimeout(400);
    assert.deepEqual(await app(page,a=>({runId:a.activeRun.runId,key:a.practiceIframeKey,doc:a.practiceIframeDoc})),before);
    const expected={...initialStorage};const saved=JSON.parse(expected.vuelexicon_practice_progress);saved['JS-101']={...saved['JS-101'],codeDraft:code};expected.vuelexicon_practice_progress=JSON.stringify(saved);
    assert.deepEqual(await stored(page),expected);
    await page.locator('[data-testid="tech-run"]').click();
    await page.waitForFunction(()=>window.vueLexiconApp.executionState==='preview_ready'&&window.vueLexiconApp.practiceLogs.some(l=>l.msg==='ACTUAL_TIMER_LOG'));
    const frame=page.locator('[data-testid="tech-live-preview"]').contentFrame();await frame.locator('#manual').filter({hasText:'اختبار محفوظ'}).waitFor();
    assert((await page.locator('[data-testid="tech-console"]').textContent()).includes('ACTUAL_MANUAL_RUN'));
    assert.deepEqual(await stored(page),expected);
  });
  await test('forged and stale-source messages cannot change actual simulator evidence',async()=>{
    const before=await app(page,a=>({state:a.executionState,logs:a.practiceLogs,snapshot:a.lastDomSnapshot,events:a.techRunEvents,error:a.techLatestError}));
    await app(page,a=>{
      const s=a.activeRun,data={source:'VUELEXICON_SANDBOX',runId:s.runId,lessonId:s.lessonId,type:'EXECUTION_ERROR',payload:{msg:'UNTRUSTED_TECH_ERROR',lineno:0}};
      window.dispatchEvent(new MessageEvent('message',{source:window,origin:'null',data}));
      for(const bad of [{...data,source:'UNKNOWN_SOURCE'},{...data,runId:'old-run'},{...data,payload:null}])window.dispatchEvent(new MessageEvent('message',{source:a.practiceIframeRef.contentWindow,origin:'null',data:bad}));
    });await settle(page);
    assert.deepEqual(await app(page,a=>({state:a.executionState,logs:a.practiceLogs,snapshot:a.lastDomSnapshot,events:a.techRunEvents,error:a.techLatestError})),before);
  });
  await test('stop invalidates the session and replaces its frame while retaining the saved draft',async()=>{
    const draft=await app(page,a=>a.practiceCode),before=await stored(page),key=await app(page,a=>a.practiceIframeKey);
    await page.locator('[data-testid="tech-stop"]').click();await settle(page);
    assert.equal(await app(page,a=>a.activeRun),null);assert.equal(await app(page,a=>a.executionState),'stopped');
    assert.notEqual(await app(page,a=>a.practiceIframeKey),key);assert.equal(await app(page,a=>a.practiceCode),draft);assert.deepEqual(await stored(page),before);
  });
  await test('all seeded runtime checks use only local assets without failed requests or uncaught exceptions',async()=>{
    assert.deepEqual(evidence.externalRequests,[]);assert.deepEqual(evidence.failedRequests,[]);assert.deepEqual(evidence.uncaughtErrors,[]);
  });
  await context.close();
  const clean=await contextFor(origin,false,'no-preference');
  const base=await contextFor(baselineOrigin,false,'reduce');
  await test('approved homepage remains pixel-identical at 1440px',async()=>{
    await clean.page.emulateMedia({reducedMotion:'reduce'});await settle(clean.page);
    const before=await base.page.screenshot(),after=await clean.page.screenshot();
    const a=PNG.sync.read(before),b=PNG.sync.read(after);assert.equal(a.width,b.width);assert.equal(a.height,b.height);
    let changedPixels=0;for(let i=0;i<a.data.length;i+=4)if(a.data[i]!==b.data[i]||a.data[i+1]!==b.data[i+1]||a.data[i+2]!==b.data[i+2]||a.data[i+3]!==b.data[i+3])changedPixels++;
    homepageComparisons.push({width:1440,height:960,baselineRef,changedPixels,beforeSha256:sha(before),afterSha256:sha(after)});assert.equal(changedPixels,0);
  });
  await base.context.close();
  await test('delivery screenshot is an actual 1440px browser page with a real running original reference and empty user storage',async()=>{
    await clean.page.emulateMedia({reducedMotion:'no-preference'});
    assert.equal(await clean.page.evaluate(()=>localStorage.getItem('vuelexicon_recovery_phase5b2_sentinel')),null);
    await clean.page.locator('[data-testid="nav-simulator"]:visible').first().click();
    await app(clean.page,a=>a.selectLesson('JS-101',true));
    await clean.page.locator('[data-testid="tech-reference-run"]').click();
    await clean.page.waitForFunction(()=>window.vueLexiconApp.executionState==='preview_ready');
    await clean.page.getByTitle('انتقل إلى كتلة JavaScript',{exact:true}).click(); await settle(clean.page);
    await clean.page.mouse.move(1435,955);await clean.page.evaluate(()=>document.fonts.ready);await settle(clean.page);
    await clean.page.screenshot({path:path.join(output,'screenshots','simulator-1440.png'),fullPage:false});screenshots.push('screenshots/simulator-1440.png');
    assert.deepEqual(clean.evidence.externalRequests,[]);assert.deepEqual(clean.evidence.failedRequests,[]);assert.deepEqual(clean.evidence.uncaughtErrors,[]);
  });
  await test('reduced-motion mode suppresses decorative animation without changing the running session',async()=>{
    const before=await app(clean.page,a=>({runId:a.activeRun.runId,key:a.practiceIframeKey,draft:a.practiceCode}));
    await clean.page.emulateMedia({reducedMotion:'reduce'});await settle(clean.page);
    const animations=await clean.page.locator('.tech-simulator').evaluate(e=>e.getAnimations({subtree:true}).map(a=>({state:a.playState,duration:a.effect?.getTiming().duration})).filter(a=>a.state==='running'&&typeof a.duration==='number'&&a.duration>1));
    assert.deepEqual(animations,[]);
    assert.deepEqual(await app(clean.page,a=>({runId:a.activeRun.runId,key:a.practiceIframeKey,draft:a.practiceCode})),before);
  });
  await clean.context.close();
  await test('verification leaves source and protected files unchanged',async()=>{
    for(const [file,hash]of Object.entries(runtimeHashes))assert.equal(sha(fs.readFileSync(path.join(root,file))),hash,file);
    for(const file of protectedFiles)assert.equal(sha(fs.readFileSync(path.join(root,file))),sha(old(file)),file);
  });
  const passed=results.filter(r=>r.passed).length;
  fs.writeFileSync(path.join(output,'browser-report.json'),JSON.stringify({timestamp:new Date().toISOString(),baselineRef,browser:{engine:'chromium',version:browser.version()},passed,total:results.length,protectedFileCount:protectedFiles.length,runtimeHashes,homepageComparisons,screenshots,networkEvidence,results},null,2)+'\n');
  console.log(`${passed}/${results.length} tech simulator checks passed`);if(passed!==results.length)process.exitCode=1;
}
main().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();await Promise.all([new Promise(resolve=>server.close(resolve)),new Promise(resolve=>baselineServer.close(resolve))]);});
