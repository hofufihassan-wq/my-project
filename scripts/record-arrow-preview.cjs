/* Records real Chromium interactions in a fresh profile; never imports user data. */
process.env.PLAYWRIGHT_BROWSERS_PATH='/workspace/.playwright-browsers';
const {fs,path,assert,chromium,server}=require('./simulator-completion-test-helpers.cjs');
const os=require('node:os'),crypto=require('node:crypto');
const output=path.resolve(process.argv[2]||'docs/guided-arrow/preview');
const media=path.join(output,'media');fs.mkdirSync(media,{recursive:true});
const raw=fs.mkdtempSync(path.join(os.tmpdir(),'vlex-arrow-preview-video-'));
const h=server(),events=[],errors=[];let browser,context,page,videoPath,started;
const pause=ms=>page.waitForTimeout(ms);
function mark(action,extra={}){events.push({seconds:Math.round((Date.now()-started)/100)/10,action,...extra})}
async function shot(name){await page.screenshot({path:path.join(media,name),fullPage:true,type:'jpeg',quality:85});mark('screenshot',{file:'media/'+name});await pause(1400)}
async function step(index){await page.getByTestId('arrow-step-'+index).click();mark('open-stage',{stage:index+1});await pause(1000)}
async function checked(id){await page.getByTestId(id==='mastery'?'mastery-check':'arrow-check').click();await page.waitForFunction(()=>!document.querySelector('[data-testid="arrow-check"]:disabled')&&!document.querySelector('[data-testid="mastery-check"]:disabled'));return page.evaluate(id=>VLexLearningStore.getSection('guidedArrow').results[id]?.passed,id)}
(async()=>{
 await new Promise(r=>h.listen(0,'127.0.0.1',r));
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 context=await browser.newContext({viewport:{width:1280,height:900},recordVideo:{dir:raw,size:{width:1280,height:900}},locale:'ar',timezoneId:'Etc/UTC'});
 page=await context.newPage();started=Date.now();page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+h.address().port+'/#arrow-functions',{waitUntil:'networkidle'});
 await page.getByTestId('guided-arrow').waitFor();
 assert.equal(await page.evaluate(()=>Object.keys(VLexLearningStore.getSection('guidedArrow',{})).length),0);
 mark('fresh-browser-no-import');await shot('01-understand.jpg');
 await step(1);await page.getByRole('button',{name:'شرح =>',exact:true}).first().click();await pause(900);await shot('02-code-explanation.jpg');
 await step(2);await page.getByTestId('prediction-1').click();mark('wrong-prediction-6');await pause(1500);
 await page.getByRole('button',{name:'تلميح تدريجي',exact:true}).click();await pause(1000);await page.getByRole('button',{name:'تلميح تدريجي',exact:true}).click();mark('two-progressive-hints');await shot('03-predict-wrong-hints.jpg');
 await page.getByTestId('prediction-0').click();assert.equal(await page.evaluate(()=>VLexLearningStore.getSection('guidedArrow').answers.prediction),0);mark('correct-prediction-undefined');await pause(1000);
 await step(3);await page.getByTestId('arrow-try').fill('const double = n => n * 2;\nconsole.log("ناتج التجربة:", double(4));');await page.getByTestId('arrow-run').click();await page.waitForFunction(()=>document.querySelector('[data-testid="arrow-console"]').textContent.includes('8'));mark('real-worker-output-8');await shot('04-playground.jpg');
 await page.getByTestId('arrow-simulator').click();await page.waitForFunction(()=>vueLexiconApp.appMode==='practice');assert.equal(await page.evaluate(()=>vueLexiconApp.activeRun),null);mark('simulator-received-without-auto-run');await pause(1600);
 await page.getByTestId('tech-reference-run').click();await page.waitForFunction(()=>vueLexiconApp.executionState==='preview_ready');mark('run-simulator-reference');await pause(1200);await shot('04b-simulator.jpg');
 await page.getByTestId('arrow-return').click();await page.getByTestId('arrow-try').waitFor();assert.match(await page.getByTestId('arrow-try').inputValue(),/double\(4\)/);mark('return-preserves-stage-and-source');await shot('04c-return.jpg');
 await step(4);await shot('05-apply.jpg');
 await page.getByTestId('draft-double').fill('');await page.getByTestId('draft-double').pressSequentially('const double = n => { n * 2; };',{delay:35});await page.getByRole('button',{name:'انتقل للتحقق',exact:true}).click();mark('open-assessment');assert.equal(await checked('double'),false);assert.match(await page.getByTestId('arrow-checks').innerText(),/undefined/);mark('actual-wrong-code-fails');await page.getByRole('button',{name:'أحتاج تلميحًا',exact:true}).click();await shot('06-check-failed-hint.jpg');
 await page.getByTestId('draft-double').fill('// تعليق تجريبي يبقى مقبولًا\nconst double = (value) => { return value + value; };');assert.equal(await checked('double'),true);mark('alternative-correct-solution-passes-five-cases');await shot('06b-check-passed.jpg');
 await page.getByRole('button',{name:'أصلح الإرجاع',exact:true}).click();await page.getByTestId('draft-fix').fill('const square = number => { return number * number; };');assert.equal(await checked('fix'),true);mark('missing-return-fixed');await pause(1000);
 await step(6);await page.getByTestId('understanding-1').click();await page.getByTestId('output-2').click();await page.getByTestId('draft-mastery').fill('');await page.getByTestId('draft-mastery').pressSequentially('const add = (a, b) => a + b;',{delay:35});assert.equal(await checked('mastery'),true);mark('mastery-understanding-prediction-and-code-passed');await shot('07-mastery.jpg');
 await step(7);assert.equal(await page.evaluate(()=>VLexArrowContent.mastered(VLexLearningStore.getSection('guidedArrow'))),true);mark('mastery-backed-by-real-attempts');await shot('08-save-review.jpg');
 await page.reload({waitUntil:'networkidle'});await page.getByTestId('arrow-mastery-status').waitFor();assert.match(await page.getByTestId('arrow-mastery-status').innerText(),/^اجتزت/);assert.equal(await page.evaluate(()=>VLexLearningStore.getSection('guidedArrow').hints.prediction),2);mark('reload-restores-stage-hints-and-evidence');await shot('09-restored.jpg');
 assert.deepEqual(errors,[]);
 videoPath=await page.video().path();await context.close();context=null;
 const images=fs.readdirSync(media).filter(n=>n.endsWith('.jpg')).sort().map(n=>{const f=path.join(media,n),data=fs.readFileSync(f);return{file:'media/'+n,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')}});
 fs.writeFileSync(path.join(output,'capture-evidence.json'),JSON.stringify({sourceCommit:require('node:child_process').execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),browser:'Chromium on Linux',viewport:{width:1280,height:900},freshContext:true,userDataImported:false,syntheticDemoOnly:true,continuousRealBrowserRecording:true,audioRecorded:false,parentErrors:errors,assertionsPassed:true,events,images},null,2)+'\n');
 fs.writeFileSync('/tmp/vlex-arrow-recording.json',JSON.stringify({videoPath,output,seconds:Math.round((Date.now()-started)/1000)}));
 console.log(JSON.stringify({screenshots:images.length,videoPath,seconds:Math.round((Date.now()-started)/1000),assertionsPassed:true}));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(context)await context.close();if(browser)await browser.close();h.close()});
