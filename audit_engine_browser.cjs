const {fs,path,assert,chromium,server,enter}=require('./scripts/simulator-completion-test-helpers.cjs');
const mode=process.env.AUDIT_ENGINE_PHASE||'before';
const out=path.resolve('audit-artifacts/engine',mode);fs.mkdirSync(out,{recursive:true});
const host=server();let browser;
(async()=>{await new Promise(r=>host.listen(0,'127.0.0.1',r));browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:1440,height:1040},recordVideo:{dir:out,size:{width:1440,height:1040}},reducedMotion:'reduce'});const page=await context.newPage();
 await page.goto('http://127.0.0.1:'+host.address().port,{waitUntil:'networkidle'});await enter(page);await page.waitForTimeout(300);
 await page.evaluate(()=>{const a=window.vueLexiconApp;a.practiceAutoRun=false;a.techEditorView='draft';a.practiceCode='<p>Unicode example: İ</p>\n<script>console.log("ENGINE_UNICODE_OK")</script>';a.techLanguage='js'});
 await page.waitForTimeout(700);const state=await page.evaluate(()=>({view:window.vueLexiconApp.techBlockView,source:window.vueLexiconApp.practiceCode}));
 // Explicit audit overlay: circles the real observed disabled-editor diagnostic.
 const diagnostic=page.locator('.beta-language-reason');if(await diagnostic.count()){const b=await diagnostic.boundingBox();if(b)await page.evaluate(b=>{const mark=document.createElement('div');mark.dataset.auditAnnotation='red-circle';mark.style.cssText=`position:fixed;left:${b.x-8}px;top:${b.y-8}px;width:${b.width+16}px;height:${b.height+16}px;border:4px solid red;border-radius:50%;z-index:2147483647;pointer-events:none`;document.body.append(mark)},b)}
 await page.screenshot({path:path.join(out,'unicode-editor.png'),fullPage:false});await page.waitForTimeout(1700);
 if(mode==='after'){assert(state.view.editable);assert.equal(state.view.code,'console.log("ENGINE_UNICODE_OK")');await page.getByTestId('tech-run').click();await page.waitForFunction(()=>window.vueLexiconApp.practiceLogs.some(x=>x.msg==='ENGINE_UNICODE_OK'));}
 else assert.equal(state.view.editable,false);
 fs.writeFileSync(path.join(out,'browser.json'),JSON.stringify({timestamp:new Date().toISOString(),mode,browser:browser.version(),state,assertionsPassed:true,annotation:'Real browser capture; CSS audit overlay circles observed diagnostic when present.'},null,2)+'\n');
 const video=page.video();await context.close();await video.saveAs(path.join(out,'unicode-editor.webm'));console.log('PASS',mode,JSON.stringify(state));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();host.close()});
