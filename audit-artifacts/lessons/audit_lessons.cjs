const fs=require('fs'),path=require('path'),http=require('http'),vm=require('vm'),assert=require('assert/strict'),{execFileSync}=require('child_process');
const root=path.resolve(__dirname,'../..'),base=process.env.AUDIT_REF||'3d4575aeae16c22b6932a6bac5b18a7a4f9cca37',out=process.env.AUDIT_OUTPUT||__dirname;
const revision=require('/opt/codex/cua_node/lib/node_modules/playwright-core/browsers.json').browsers.find(b=>b.name==='ffmpeg').revision;
const cache=path.join('/tmp','audit-lessons-browser'),ff=path.join(cache,'ffmpeg-'+revision);fs.mkdirSync(ff,{recursive:true});if(!fs.existsSync(path.join(ff,'ffmpeg-linux')))fs.symlinkSync('/usr/bin/ffmpeg',path.join(ff,'ffmpeg-linux'));process.env.PLAYWRIGHT_BROWSERS_PATH=cache;
const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const files=new Map(),read=f=>{if(!files.has(f))files.set(f,base==='working'?fs.readFileSync(path.join(root,f)):execFileSync('git',['show',base+':'+f],{cwd:root,maxBuffer:32*1024*1024,stdio:['ignore','pipe','ignore']}));return files.get(f)};
const c={window:{}};vm.runInNewContext(read('practice-curriculum.js').toString(),c);const lessons=c.window.PRACTICE_CURRICULUM.lessons;
const s=http.createServer((q,r)=>{let f=decodeURIComponent(new URL(q.url,'http://localhost').pathname).slice(1)||'index.html';try{r.setHeader('Content-Type',({'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml'})[path.extname(f)]||'application/octet-stream');r.end(read(f))}catch{r.writeHead(404);r.end()}});
const report={base,started:new Date().toISOString(),results:[],pageErrors:[],browserConsole:[],external:[],note:'Every response served from immutable git show at the pinned commit. No mocks/substitutes. JS equivalents in TS lessons are not TypeScript compilation.'};
let b,ctx,p;const app=(fn,arg)=>p.evaluate(({src,arg})=>(new Function('a','arg',`return (${src})(a,arg)`))(window.vueLexiconApp,arg),{src:fn.toString(),arg});
async function ready(){await p.waitForFunction(()=>['preview_ready','error'].includes(window.vueLexiconApp.executionState),null,{timeout:10000});await p.waitForTimeout(250)}
async function select(id){await app((a,id)=>{a.practiceAutoRun=false;a.selectedTrack=a.practiceLessons.find(l=>l.id===id).track;a.selectLesson(id,true);a.techEditorView='draft';a.techLanguage='source'},id);await p.waitForTimeout(90)}
async function edit(code){await app(a=>{a.techEditorView='draft';a.techLanguage='source';a.practiceAutoRun=false});await p.getByTestId('tech-editor').fill(code);assert.equal(await app(a=>a.practiceCode),code)}
async function run(){await p.getByTestId('tech-run').click();await ready()}
const frame=()=>p.getByTestId('tech-live-preview').contentFrame();
async function observed(){return frame().locator('body').evaluate(e=>({text:e.innerText,html:e.innerHTML,errors:window.__errors||null}))}
async function referenceCheck(l){const f=frame();switch(l.id){
case'JS-101':assert.match(await f.locator('#card').innerText(),/سارة/);break;
case'JS-102':assert.match(await f.locator('#app-view').innerText(),/لوحة التحكم/);break;
case'JS-103':assert.equal(await f.locator('#cards-container .card').count(),3);break;
case'HTML-101':assert.equal(await f.locator('article h1').count(),1);assert((await f.locator('article p').innerText()).length>10);break;
case'HTML-102':assert((await f.locator('img').getAttribute('alt')).length>4);assert.equal(await f.locator('a').getAttribute('rel'),'noopener');return {imageLoaded:await f.locator('img').evaluate(e=>e.complete&&e.naturalWidth>0),networkDependent:true};
case'HTML-103':await f.locator('#full-name').fill('مراجع مستقل');await f.locator('#user-email').fill('auditor@example.test');assert.equal(await f.locator('form').evaluate(e=>e.checkValidity()),true);await f.locator('button[type=submit]').click();return {validFormFields:true,submitButtonActivated:true,successDOMText:await f.locator('body').innerText(),modalsAllowed:await p.getByTestId('tech-live-preview').getAttribute('sandbox')};
case'CSS-101':assert(parseFloat(await f.locator('.box').evaluate(e=>getComputedStyle(e).paddingTop))>0);break;
case'CSS-102':assert.equal(await f.locator('.navbar').evaluate(e=>getComputedStyle(e).display),'flex');break;
case'CSS-103':assert.equal(await f.locator('.grid-container').evaluate(e=>getComputedStyle(e).display),'grid');assert.equal(await f.locator('.card').count(),3);break;
case'TS-101':assert.match(await f.locator('#output').innerText(),/VueLexicon Pro/);return {runtime:'JavaScript equivalent only'};
case'TS-102':assert.match(await f.locator('#dev-card').innerText(),/سعود/);return {runtime:'JavaScript equivalent only'};
case'TS-103':assert.match(await f.locator('#results').innerText(),/ID-STR: VUE-PRO/);assert.match(await f.locator('#results').innerText(),/ID-NUM: #0042/);return {runtime:'JavaScript equivalent only'};
case'VUE-101':assert.equal(await f.locator('.count-display').innerText(),'0');await f.locator('button').click();assert.equal(await f.locator('.count-display').innerText(),'1');break;
case'VUE-102':assert.equal(await f.locator('li').count(),3);await f.locator('.toggle-btn').click();assert.equal(await f.locator('li').count(),0);await f.locator('.toggle-btn').click();assert.equal(await f.locator('li').count(),3);break;
case'VUE-103':assert.equal(await f.locator('.course-card').count(),3);assert.match(await f.locator('.course-card').first().innerText(),/JavaScript/);break;
}return {behaviorVerified:true}}
function alternate(l){let x=l.solution;switch(l.id){
case'JS-101':x=x.replace('const userName = "سارة";','let userName = ["س", "ارة"].join("");');break;
case'JS-102':x=x.replace('const isLoggedIn = true;','let isLoggedIn = Boolean(1);');break;
case'JS-103':x=x.replace('products.map(p =>','products.map((p, index) =>');break;
case'HTML-101':x=x.replace('<article>','<article aria-label="مقال تعليمي">');break;
case'HTML-102':x=x.replace('rel="noopener"','rel="noopener" aria-label="مرجع MDN الرسمي"');break;
case'HTML-103':x=x.replace('type="email"','type="email" autocomplete="email"');break;
case'CSS-101':x=x.replace('.box {','.box { box-sizing: border-box;');break;
case'CSS-102':x=x.replace('.navbar {','.navbar { column-gap: 1rem;');break;
case'CSS-103':x=x.replace('.grid-container {','.grid-container { align-items: stretch;');break;
case'TS-101':x=x.replace('const appTitle = "VueLexicon Pro";','let appTitle = ["VueLexicon", "Pro"].join(" ");');break;
case'TS-102':x=x.replace('const developer = {','let developer = {');break;
case'TS-103':x=x.replace("return 'ID-STR: ' + id.toUpperCase();","return `ID-STR: ${id.toUpperCase()}`;");break;
case'VUE-101':x=x.replace('count.value++;','count.value = count.value + 1;');break;
case'VUE-102':x=x.replace('isLoggedIn = !isLoggedIn','isLoggedIn = Boolean(!isLoggedIn)');break;
case'VUE-103':x=x.replace("props: ['title', 'level', 'icon'],","props: { title: String, level: String, icon: String },");break;
}assert.notEqual(x,l.solution);return x}
async function check(id,name,fn){try{const extra=await fn();report.results.push({id,name,passed:true,...extra});console.log('PASS',id,name)}catch(e){report.results.push({id,name,passed:false,error:e.stack});console.error('FAIL',id,name,e.message)}}
async function main(){await new Promise(r=>s.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+s.address().port;b=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});fs.mkdirSync(path.join(out,'video'),{recursive:true});fs.mkdirSync(path.join(out,'screenshots'),{recursive:true});ctx=await b.newContext({viewport:{width:1440,height:1040},recordVideo:{dir:path.join(out,'video'),size:{width:1280,height:924}},reducedMotion:'reduce'});await ctx.route('**/*',r=>{const u=new URL(r.request().url());if(u.origin===origin||['data:','blob:','about:'].includes(u.protocol))return r.continue();report.external.push(u.href);return r.abort('blockedbyclient')});p=await ctx.newPage();p.on('pageerror',e=>report.pageErrors.push(e.message));p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')report.browserConsole.push({type:m.type(),text:m.text()})});await p.goto(origin,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.vueLexiconApp);await p.locator('[data-testid=nav-simulator]:visible').first().click();
for(const l of lessons){await select(l.id);
await check(l.id,'open/navigation/unlocked',async()=>{assert.equal(await app(a=>a.currentLesson.id),l.id);assert.equal(await p.getByTestId('tech-editor').isVisible(),true);return {status:await app((a,id)=>a.getLessonStatus(id),l.id)}});
await check(l.id,'reference functional DOM/interactions',async()=>{const prev=await app(a=>a.practiceCode);await p.getByTestId('tech-reference-run').click();await ready();assert.equal(await app(a=>a.executionState),'preview_ready');assert.equal(await app(a=>a.practiceCode),prev);return await referenceCheck(l)});
if(['HTML-103','VUE-101','CSS-103'].includes(l.id))await p.screenshot({path:path.join(out,'screenshots',l.id+'-reference.png'),fullPage:false});
const alt=alternate(l);await check(l.id,'alternate valid draft and behavior',async()=>{await edit(alt);await run();assert.equal(await app(a=>a.executionState),'preview_ready');return await referenceCheck(l)});
await check(l.id,'draft save and navigation roundtrip',async()=>{const saved=await p.evaluate(id=>JSON.parse(localStorage.getItem('vuelexicon_practice_progress'))[id].codeDraft,l.id);assert.equal(saved,alt);const other=l.id==='JS-101'?'HTML-101':'JS-101';await select(other);await select(l.id);assert.equal(await app(a=>a.practiceCode),alt)});
await check(l.id,'draft survives real reload',async()=>{await p.reload({waitUntil:'networkidle'});await p.waitForFunction(()=>window.vueLexiconApp);await p.locator('[data-testid=nav-simulator]:visible').first().click();await select(l.id);assert.equal(await app(a=>a.practiceCode),alt)});
await check(l.id,'runtime error is shown',async()=>{await edit(alt.replace('</body>',`<script>throw new Error('AUDIT_RUNTIME_${l.id}')</script></body>`));await run();await p.waitForFunction(()=>window.vueLexiconApp.executionState==='error');assert.match(await p.getByTestId('beta-error').innerText(),new RegExp('AUDIT_RUNTIME_'+l.id))});
await check(l.id,'syntax error is shown',async()=>{await edit(alt.replace('</body>','<script>const broken = ;</script></body>'));await run();await p.waitForFunction(()=>window.vueLexiconApp.executionState==='error');assert.match(await p.getByTestId('beta-error').innerText(),/Unexpected token/)});
await check(l.id,'stop invalidates session and preserves draft',async()=>{const before=await app(a=>a.practiceCode);await p.getByTestId('tech-stop').click();assert.equal(await app(a=>a.executionState),'stopped');assert.equal(await app(a=>a.activeRun),null);assert.equal(await app(a=>a.practiceCode),before)});
await check(l.id,'reset restores starter without grading',async()=>{await app(a=>a.techResetManual());await ready();assert.equal(await app(a=>a.practiceCode),l.initialCode);assert.equal(await app(a=>a.validationFeedback),null);return {status:await app((a,id)=>a.getLessonStatus(id),l.id)}});
}
report.servedHashes=Object.fromEntries([...files].map(([f,b])=>[f,require('crypto').createHash('sha256').update(b).digest('hex')]));report.finished=new Date().toISOString();report.passed=report.results.filter(r=>r.passed).length;report.total=report.results.length;await ctx.close();await b.close();s.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,total:report.total}));if(report.passed!==report.total)process.exitCode=1}
main().catch(async e=>{report.fatal=e.stack;fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));console.error(e);await ctx?.close();await b?.close();s.close();process.exitCode=1});
