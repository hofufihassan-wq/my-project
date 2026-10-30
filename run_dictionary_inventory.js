/* Read-only content audit: readiness is not proof of an example's semantics. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'/opt/codex/cua_node/lib/node_modules/playwright-core');
const rows=[],invariantErrors=[],external=[];let browser,current=null;
const server=http.createServer((req,res)=>{
  let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';
  const file=path.resolve(__dirname,'.'+name);
  if(!file.startsWith(__dirname+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
async function main(){
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({reducedMotion:'reduce'});
  const frames=new WeakMap();
  await context.route('**/*',route=>{
    const u=new URL(route.request().url());if(u.origin===origin||['data:','blob:','about:'].includes(u.protocol))return route.continue();
    let example=null;try{example=frames.get(route.request().frame())||null;}catch(_){}
    external.push({example,observedDuring:current,url:u.href});return route.abort('blockedbyclient');
  });
  const page=await context.newPage();
  page.on('frameattached',frame=>frames.set(frame,current?{...current}:null));
  await page.goto(origin,{waitUntil:'networkidle'});await page.waitForFunction(()=>window.vueLexiconApp);
  const app=(fn,arg)=>page.evaluate(({s,arg})=>(new Function('a','arg',`return (${s})(a,arg)`))(window.vueLexiconApp,arg),{s:fn.toString(),arg});
  const storage=()=>page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])));
  const before=await storage(),terms=await app(a=>a.rawLexiconData.map(t=>({id:t.id,term:t.term,category:t.category})));
  for(const format of ['vue','vanilla'])for(const term of terms){
    current={id:term.id,format};
    await app((a,{id,format})=>{a.setCodeFormat(format);a.sendTermToScratchpad(a.rawLexiconData.find(t=>t.id===id));},{id:term.id,format});
    let timedOut=false;
    try{await page.waitForFunction(()=>['preview_ready','error'].includes(window.vueLexiconApp.executionState),null,{timeout:5000});}
    catch(_){timedOut=true;}
    const row=await app((a,{id,format})=>({type:window.VueLexiconRunner.selectDictionaryExample(a.rawLexiconData.find(t=>t.id===id),format).type,state:a.executionState,
      error:a.practiceLogs.find(l=>l.type==='error')?.msg||null,sourceUnchanged:a.activeRun.code===a.simulatorReferenceCode,
      text:(a.lastDomSnapshot.bodyText||'').slice(0,400)}),{id:term.id,format});
    row.timedOut=timedOut;
    if(row.state==='error'){
      try{await page.locator('iframe').contentFrame().getByRole('alert').waitFor({timeout:1500});row.visibleDiagnostic=true;}
      catch(_){row.visibleDiagnostic=false;invariantErrors.push({...current,issue:'Error has no visible diagnostic'});}
    }
    if(!row.sourceUnchanged)invariantErrors.push({...current,issue:'Reference source changed'});
    rows.push({...term,format,...row});
    if(rows.length%30===0)console.log('AUDITED',rows.length,'of 360');
  }
  try{assert.deepEqual(await storage(),before);}catch(_){invariantErrors.push({issue:'Parent localStorage changed'});}
  await app(a=>a.stopPracticeExecution());
  const summary={};for(const row of rows){const key=row.format+':'+(row.timedOut?'timeout':row.state);summary[key]=(summary[key]||0)+1;}
  fs.mkdirSync('phase4-artifacts',{recursive:true});
  fs.writeFileSync('phase4-artifacts/dictionary-inventory.json',JSON.stringify({timestamp:new Date().toISOString(),note:'Actual unchanged sources, both tabs; external network blocked. Preview readiness does not certify semantic completeness. No educational content was edited.',total:rows.length,summary,invariantErrors,externalRequests:external,rows},null,2)+'\n');
  console.log(JSON.stringify({summary,invariantErrors}));
  if(rows.length!==360||invariantErrors.length)process.exitCode=1;
  await context.close();
}
main().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();server.close();});
