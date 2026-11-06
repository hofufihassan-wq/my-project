const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const root=process.env.VLEX_REVIEW_ROOT||path.resolve(__dirname,'../..');
const out=process.env.VLEX_REVIEW_OUTPUT||path.join(__dirname,'explainer-transfer.json');
const server=http.createServer((q,r)=>{const name=new URL(q.url,'http://localhost').pathname;const f=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!f.startsWith(root+path.sep)||!fs.existsSync(f)){r.writeHead(404);return r.end()}r.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.woff2':'font/woff2'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f));});
let browser;const results=[];
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const page=await browser.newPage();await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>window.vueLexiconApp);
await page.evaluate(()=>vueLexiconApp.openLearning('explain','const transferred=1;'));
await page.getByTestId('explain-source').fill('const userDraft=2;');
await page.waitForFunction(()=>VLexLearningStore.getSection('explainer').source==='const userDraft=2;');
await page.evaluate(()=>vueLexiconApp.setAppMode('home'));await page.getByTestId('explain-source').waitFor({state:'detached'});
await page.getByTestId('nav-explain').click();
const observed={editor:await page.getByTestId('explain-source').inputValue(),stored:await page.evaluate(()=>VLexLearningStore.getSection('explainer').source),automatic:await page.getByTestId('explain-auto').isChecked()};
try{assert.equal(observed.editor,'const userDraft=2;');assert.equal(observed.stored,observed.editor);assert.equal(observed.automatic,false);results.push({name:'manual explanation source transfer never overrides later saved draft on return',passed:true,observed})}catch(e){results.push({name:'manual explanation source transfer never overrides later saved draft on return',passed:false,error:e.stack,observed});await page.getByTestId('explain-source').evaluate(e=>{e.style.outline='5px solid red';e.style.borderRadius='40%'});}
await page.screenshot({path:out.replace(/\.json$/,'.png'),fullPage:true});
})().catch(e=>results.push({name:'runner',passed:false,error:e.stack})).finally(async()=>{if(browser)await browser.close();server.close();fs.writeFileSync(out,JSON.stringify({timestamp:new Date().toISOString(),sourceRoot:root,passed:results.filter(r=>r.passed).length,total:results.length,results},null,2));console.log(JSON.stringify(results));if(results.some(r=>!r.passed))process.exitCode=1;});
