/* Real local pages; isolated review data only, no personal browser profile. */
const {parseArgs}=require('node:util');
const {values}=parseArgs({options:{root:{type:'string'},output:{type:'string'},before:{type:'boolean',default:false},video:{type:'boolean',default:false},only:{type:'string'}}});
process.env.VLP_ROOT=values.root||require('node:path').resolve(__dirname,'..');
const {fs,path,assert,chromium,server}=require('./simulator-completion-test-helpers.cjs');
const out=path.resolve(values.output);fs.mkdirSync(out,{recursive:true});
const scenes=[['dashboard','home'],['dictionary','lexicon'],['explainer','explain'],['lessons','course'],['css-lab','cssLab'],['js-lab','jsLab'],['live-preview','lexicon'],['training','training'],['projects','projects'],['notes','notes'],['calendar','calendar'],['settings','settings'],['simulator','simulator']];
const results=[],errors=[];let browser;const host=server();
async function check(name,fn){try{const detail=await fn();results.push({name,passed:true,detail});console.log('PASS '+name)}catch(e){results.push({name,passed:false,error:e.stack});console.error('FAIL '+name+' '+e.message)}}
async function visit(p,mode){await p.evaluate(mode=>{const a=window.vueLexiconApp;if(['projects','notes','calendar'].includes(mode))a.openFoundation(mode);else if(['course','explain','cssLab','jsLab'].includes(mode))a.openLearning(mode);else if(mode==='simulator')a.openVisualSimulator();else a.setAppMode(mode);window.scrollTo({top:0,behavior:'instant'});},mode);await p.waitForTimeout(350)}
async function prepare(p,name){
 if(name==='dictionary'||name==='live-preview'){await p.evaluate(name=>{const a=window.vueLexiconApp;const term=name==='live-preview'?a.rawLexiconData.find(t=>t.category==='html'&&/button/i.test(t.term)):a.rawLexiconData.find(t=>/flex/i.test(t.term)&&t.category==='css');a.selectTerm(term||a.rawLexiconData[0]);a.setCodeFormat('vanilla')},name);await p.waitForTimeout(200);await p.getByTestId('dictionary-run').click();await p.waitForTimeout(500);if(name==='live-preview'){await p.locator('.dictionary-live-panel iframe').scrollIntoViewIfNeeded();await p.locator('.dictionary-live-panel iframe').contentFrame().getByRole('button').waitFor({state:'visible'});await p.waitForTimeout(350)}}
 if(name==='explainer'){await p.getByTestId('explain-sample').click();await p.getByTestId('explain-run').click();await p.getByTestId('explain-results').waitFor()}
 if(name==='lessons'){await p.locator('.vlc-lesson details').first().evaluate(el=>el.open=true)}
 if(name==='css-lab'){await p.getByTestId('css-lab-run').click();await p.getByTestId('css-lab-preview').contentFrame().locator('#lab-target').waitFor()}
 if(name==='js-lab'){await p.getByTestId('js-lab-run').click();await p.waitForTimeout(600)}
}
async function picture(p,file,locator){await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);if(locator)await locator.screenshot({path:path.join(out,file),type:'jpeg',quality:88});else await p.screenshot({path:path.join(out,file),fullPage:true,type:'jpeg',quality:86})}
(async()=>{
 await new Promise(r=>host.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+host.address().port;
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 for(const theme of ['green','glass']){
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(origin,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.vueLexiconApp);await p.evaluate(theme=>window.vueLexiconApp.setTheme(theme),theme);
  for(const [name,mode] of scenes){
   if(values.only&&!values.only.split(',').includes(name))continue;
   if(values.before&&!['dashboard','dictionary','explainer','css-lab','js-lab','lessons','calendar'].includes(name))continue;
   await visit(p,mode);await prepare(p,name);await picture(p,`${values.before?'before-':''}${name}-${theme}-desktop.jpg`);
   if(!values.before){
    await check(`${name} ${theme}: actual page, no runtime error or horizontal overflow`,async()=>{assert.deepEqual(errors,[]);const dims=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(dims.scroll<=dims.width+1);return dims});
    if(['dictionary','explainer','lessons','css-lab','js-lab'].includes(name))await picture(p,`editor-${name}-${theme}.jpg`,p.locator('.vlex-code-shell').first());
    if(name==='live-preview')await picture(p,`live-preview-detail-${theme}.jpg`,p.locator('.dictionary-live-panel'));
    if(name==='css-lab')await picture(p,`css-controls-${theme}.jpg`,p.locator('.vlex-css-controls'));
    if(['css-lab','js-lab','dictionary','explainer','lessons'].includes(name))await check(`${name} ${theme}: genuine syntax spans and aligned native editor`,async()=>{const ta=p.locator('textarea.vlex-code-input').first();assert(await ta.count());const measurements=await ta.evaluate(el=>{const pre=el.previousElementSibling,ec=getComputedStyle(el),pc=getComputedStyle(pre);return{spans:pre.querySelectorAll('[class^="hljs-"]').length,value:el.value.length,textMatches:pre.textContent===el.value+'\n',font:ec.font===pc.font,height:el.clientHeight,width:el.clientWidth,paintWidth:pre.clientWidth,background:ec.backgroundColor}});assert(measurements.spans>0);assert(measurements.textMatches);assert(measurements.font);assert.equal(measurements.background,'rgba(0, 0, 0, 0)');assert.equal(measurements.width,measurements.paintWidth);return measurements});
    if(theme==='green'){await p.setViewportSize({width:390,height:844});await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await picture(p,`${name}-mobile.jpg`);await check(`${name}: mobile fits 390px`,async()=>{const d=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(d.scroll<=d.width+1);return d});await p.setViewportSize({width:1440,height:1000})}
   }
  }
  await context.close();
 }
 // Native editing must keep literal source, escaped highlighting, selection, IME and saved drafts.
 if(!values.before){const c=await browser.newContext();const p=await c.newPage();await p.goto(origin,{waitUntil:'networkidle'});await visit(p,'jsLab');const ta=p.getByTestId('js-lab-source');await check('native editor preserves input, selection, literal HTML and reload',async()=>{const code='const label = "<img src=x onerror=alert(1)>";\n// تعليق آمن\nconsole.log(label);';await ta.fill(code);await p.waitForTimeout(500);assert.equal(await ta.inputValue(),code);assert.equal(await p.locator('.vlex-code-paint img').count(),0);await ta.evaluate(el=>{el.focus();el.setSelectionRange(0,5)});assert.equal(await ta.evaluate(el=>el.selectionEnd-el.selectionStart),5);await p.reload({waitUntil:'networkidle'});await visit(p,'jsLab');assert.equal(await p.getByTestId('js-lab-source').inputValue(),code)});await c.close()}
})().catch(e=>{errors.push(e.stack);console.error(e)}).finally(async()=>{if(browser)await browser.close();host.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,results,errors},null,2));if(errors.length||results.some(r=>!r.passed))process.exitCode=1});
