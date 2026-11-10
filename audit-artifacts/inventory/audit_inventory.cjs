/* Independent content audit: actual sources, actual child DOM and interaction; Ready is not a semantic pass. */
const fs=require('fs'),path=require('path'),http=require('http');
const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const root=process.env.VLP_ROOT||'/tmp/vuelexicon-audit-base',out=__dirname;
const server=http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const p=path.resolve(root,'.'+name);if(!p.startsWith(root+path.sep)||!fs.existsSync(p)||!fs.statSync(p).isFile()){res.writeHead(404);res.end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2'})[path.extname(p)]||'application/octet-stream');res.end(fs.readFileSync(p));});
const rows=[],network=[],unexpected=[],dialogs=[];let browser,current;
const app=(page,fn,arg)=>page.evaluate(({s,arg})=>(new Function('a','arg',`return (${s})(a,arg)`))(window.vueLexiconApp,arg),{s:fn.toString(),arg});
function save(){fs.writeFileSync(path.join(out,'browser-inventory.json'),JSON.stringify({base:process.env.AUDIT_BASE||'3d4575aeae16c22b6932a6bac5b18a7a4f9cca37',timestamp:new Date().toISOString(),note:'External requests blocked, no context/DOM fixtures injected, source unchanged; preview_ready never treated as semantic evidence.',rows,network,unexpected,dialogs},null,2)+'\n');}
async function snapshot(page){return app(page,a=>({state:a.executionState,runId:a.activeRun?.runId,logs:a.practiceLogs.map(l=>({type:l.type,msg:l.msg})),dom:a.lastDomSnapshot}));}
async function capture(frame){return frame.evaluate(()=>({text:document.body.innerText.slice(0,4500),html:document.body.innerHTML.slice(0,9000),controls:[...document.querySelectorAll('button,input,select,textarea,a')].map(e=>({tag:e.tagName,type:e.type,text:e.innerText,value:e.value})),cssRules:[...document.styleSheets].reduce((n,s)=>{try{return n+s.cssRules.length}catch{return n}},0)}));}
async function main(){
 fs.mkdirSync(path.join(out,'screenshots'),{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const ctx=await browser.newContext({viewport:{width:1600,height:1100},reducedMotion:'reduce'});
 await ctx.route('**/*',route=>{const u=new URL(route.request().url());if(u.origin===origin||['blob:','data:','about:'].includes(u.protocol))return route.continue();network.push({example:current,url:u.href});return route.abort('blockedbyclient');});
 const page=await ctx.newPage();page.on('pageerror',e=>unexpected.push({example:current,error:e.message}));page.on('dialog',async d=>{dialogs.push({example:current,type:d.type(),message:d.message()});await d.dismiss();});
 await page.goto(origin,{waitUntil:'networkidle'});await page.waitForFunction(()=>window.vueLexiconApp?.rawLexiconData.length===180);const terms=await app(page,a=>a.rawLexiconData);
 const storageBefore=await page.evaluate(()=>JSON.stringify({...localStorage}));fs.writeFileSync(path.join(out,'hydrated-terms.json'),JSON.stringify(terms,null,2));
 for(const format of ['vue','vanilla'])for(const term of terms){
  current={id:term.id,format};const row={...current,term:term.term,category:term.category,source:format==='vue'?term.vueSfcCode:term.vanillaCode,officialReference:term.docUrl,interactions:[]};
  try{
   await app(page,(a,{id,format})=>{a.setCodeFormat(format);a.sendTermToScratchpad(a.rawLexiconData.find(t=>t.id===id));},{id:term.id,format});
   await page.waitForFunction(()=>['preview_ready','error'].includes(window.vueLexiconApp.executionState),null,{timeout:7000}).catch(()=>row.timedOut=true);
   row.initial=await snapshot(page);const frame=await (await page.locator('[data-testid="tech-live-preview"]').elementHandle()).contentFrame();
   if(frame){
    row.before=await capture(frame);
    if(row.initial.state==='preview_ready'){
     // Exercise real declared controls only; do not add missing application context.
     const count=Math.min(await frame.locator('button').count(),4);
     for(let i=0;i<count;i++){
      const label=await frame.locator('button').nth(i).innerText().catch(()=>'?');
      try{await frame.locator('button').nth(i).click({force:true,timeout:1500});await page.waitForTimeout(/Promise|setTimeout/.test(term.term)?1650:200);row.interactions.push({action:'click',index:i,label,result:await snapshot(page)});}catch(e){row.interactions.push({action:'click',index:i,label,error:e.message});}
     }
     const inputs=frame.locator('input:not([type=file]):not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=submit]):not([type=button])');
     if(await inputs.count())try{await inputs.first().fill('مراجعة مستقلة',{timeout:1000});await page.waitForTimeout(100);row.interactions.push({action:'fill first input',value:'مراجعة مستقلة',result:await snapshot(page)});}catch(e){row.interactions.push({action:'fill first input',error:e.message});}
    }
    row.after=await capture(frame).catch(e=>({error:e.message}));
   }
   row.final=await snapshot(page);row.sourceUnchanged=await app(page,a=>a.activeRun?.code===a.simulatorReferenceCode);
   if((format==='vue'&&['Blob / FileReader','computed()','export / import'].includes(term.term))){
    await page.screenshot({path:path.join(out,'screenshots',`${term.id}-${format}-raw.png`),fullPage:true});
    const box=await page.locator('[data-testid="tech-live-preview"]').boundingBox();
    if(box){await page.evaluate(box=>{const e=document.createElement('div');e.id='audit-red-annotation';Object.assign(e.style,{position:'absolute',left:`${box.x+scrollX+4}px`,top:`${box.y+scrollY+4}px`,width:`${Math.max(40,box.width-8)}px`,height:`${Math.max(40,box.height-8)}px`,border:'5px solid red',borderRadius:'50%',pointerEvents:'none',zIndex:'99999'});document.body.append(e);},box);await page.screenshot({path:path.join(out,'screenshots',`${term.id}-${format}-red-circle.png`),fullPage:true});await page.evaluate(()=>document.querySelector('#audit-red-annotation')?.remove());}
   }
  }catch(e){row.harnessError=e.stack;}
  rows.push(row);if(rows.length%10===0){save();console.log('AUDITED',rows.length,'/360');}
 }
 const storageAfter=await page.evaluate(()=>JSON.stringify({...localStorage}));fs.writeFileSync(path.join(out,'storage-check.json'),JSON.stringify({unchanged:storageAfter===storageBefore,before:storageBefore,after:storageAfter},null,2));save();await ctx.close();
}
main().catch(e=>{console.error(e);save();process.exitCode=1}).finally(async()=>{await browser?.close();server.close();});
