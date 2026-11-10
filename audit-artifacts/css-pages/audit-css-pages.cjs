/* Independent audit: native UI changes, computed CSS, isolated browser records. */
const fs=require('fs'), path=require('path'), http=require('http');
process.env.PLAYWRIGHT_BROWSERS_PATH='/tmp/vuelexicon-audit-browser-tools';
fs.mkdirSync('/tmp/vuelexicon-audit-browser-tools/ffmpeg-1011',{recursive:true});
try{fs.symlinkSync('/usr/bin/ffmpeg','/tmp/vuelexicon-audit-browser-tools/ffmpeg-1011/ffmpeg-linux')}catch(e){if(e.code!=='EEXIST')throw e}
const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const root=path.resolve(__dirname,'../..'), out=process.env.CSS_AUDIT_OUT||__dirname;fs.mkdirSync(out,{recursive:true});
const report={base:'3d4575aeae16c22b6932a6bac5b18a7a4f9cca37',timestamp:new Date().toISOString(),css:[],pages:[],responsive:[],issues:[],errors:[]};
const server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p.endsWith('/'))p+='index.html';let f=path.resolve(root,'.'+p);if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404);return res.end()};res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.woff2':'font/woff2'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));});
let browser;
const snap=()=>[...document.querySelectorAll('.educational-output [style]')].map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,80),inline:e.style.cssText,computed:Object.fromEntries([...e.style].map(p=>[p,getComputedStyle(e).getPropertyValue(p)])),rect:{w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}}));
async function main(){
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});report.browser=browser.version();
 const c=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'reduce',...(process.env.CSS_AUDIT_FAST?{}:{recordVideo:{dir:path.join(out,'video'),size:{width:1440,height:1100}}})});
 const p=await c.newPage();p.on('pageerror',e=>report.errors.push(e.message));
 await p.goto(origin,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.vueLexiconApp);
 const call=(fn,arg)=>p.evaluate(({s,arg})=>(new Function('a','arg',`return (${s})(a,arg)`))(window.vueLexiconApp,arg),{s:fn.toString(),arg});
 await call(a=>a.setAppMode('lexicon'));
 const terms=await call(a=>a.rawLexiconData.filter(t=>t.category==='css').map(t=>({id:t.id,term:t.term,type:t.previewType})));
 for(const term of terms){
  await call((a,id)=>a.selectTerm(a.rawLexiconData.find(t=>t.id===id)),term.id);await p.waitForTimeout(100);
  const detail=p.locator('details.dictionary-studio');await detail.evaluate(e=>e.open=true);await detail.scrollIntoViewIfNeeded();
  const editorBefore=await call(a=>a.dictionaryEditorCode); const inputs=detail.locator('input,select'); const controls=[];
  for(let i=0;i<await inputs.count();i++){
   const ctrl=inputs.nth(i),meta=await ctrl.evaluate(e=>({tag:e.tagName,type:e.type,min:e.min,max:e.max,step:e.step,initial:e.value,label:e.parentElement.textContent.trim(),options:e.tagName==='SELECT'?[...e.options].map(x=>x.value):[]}));
   const values=meta.tag==='SELECT'?meta.options:meta.type==='color'?['#ff0000','#000000','#ffffff']:[meta.min,String((Number(meta.min)+Number(meta.max))/2),meta.max];
   const trials=[];
   for(const value of values){const before=await p.evaluate(snap);await ctrl.evaluate((e,value)=>{e.value=value;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}))},value);await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await p.waitForTimeout(5);const after=await p.evaluate(snap);
    const reapplied=await detail.evaluate(async e=>{const output=[];for(const t of [...e.querySelectorAll('.educational-output [style]')]){const clone=t.cloneNode(true);clone.style.transition='none';clone.style.animation='none';t.parentNode.append(clone);let result;for(let attempt=0;attempt<30;attempt++){result=[...t.style].filter(k=>!['transition','animation'].includes(k)).map(k=>({property:k,valid:CSS.supports(k,t.style.getPropertyValue(k)),original:getComputedStyle(t).getPropertyValue(k),reapplied:getComputedStyle(clone).getPropertyValue(k)}));if(result.every(x=>x.original===x.reapplied))break;await new Promise(r=>setTimeout(r,20))}clone.remove();output.push(result)}return output});
    trials.push({value,before,after,changed:JSON.stringify(before)!==JSON.stringify(after),reapplied});
   }
   controls.push({kind:'input/select',meta,trials});
  }
  const buttons=detail.locator('.educational-output button');const buttonCount=await buttons.count();
  for(let i=0;i<buttonCount;i++){const b=buttons.nth(i);const meta=await b.evaluate(e=>({text:e.textContent.trim(),title:e.title}));if(meta.text.includes('معاينة'))continue;const before=await p.evaluate(snap);await b.click();await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await p.waitForTimeout(5);const after=await p.evaluate(snap);controls.push({kind:'button',meta,before,after,changed:JSON.stringify(before)!==JSON.stringify(after)});}
  const noCSSGeneration=(await call(a=>a.dictionaryEditorCode))===editorBefore;
  const record={...term,controls,snapshot:await p.evaluate(snap),noCSSGeneration,body:await detail.innerText()};
  report.css.push(record);
  if(term.type==='css_background'||term.type==='css_aspect_ratio'||term.type==='css_opacity_blur'){
   if(term.type==='css_aspect_ratio')await detail.getByRole('button',{name:'1/1',exact:true}).click();
   await detail.scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,term.type+'-clean.png')});
   await p.evaluate(type=>{const area=document.querySelector('.educational-output');const targets=type==='css_background'?[...area.querySelectorAll('h4')]:type==='css_aspect_ratio'?[...area.querySelectorAll('[style]')].filter(e=>e.style.aspectRatio):[...area.querySelectorAll('[style]')].filter(e=>e.style.backdropFilter);for(const t of targets){const r=t.getBoundingClientRect(),n=document.createElement('div');n.dataset.auditOverlay='';Object.assign(n.style,{position:'fixed',left:r.x-8+'px',top:r.y-8+'px',width:r.width+16+'px',height:r.height+16+'px',border:'4px solid red',borderRadius:'50%',pointerEvents:'none',zIndex:2147483647});document.body.append(n)}},term.type);
   await p.screenshot({path:path.join(out,term.type+'-red-circle.png')});await p.waitForTimeout(800);await p.locator('[data-audit-overlay]').evaluateAll(es=>es.forEach(e=>e.remove()));
  }
 }
 for(const id of ['projects','kanban','notes','calendar','explain']){await call((a,id)=>a.openFoundation(id),id);report.pages.push({id,text:await p.locator('main.foundation-page').innerText(),inputs:await p.locator('main.foundation-page input,main.foundation-page textarea').count(),buttons:await p.locator('main.foundation-page button').allTextContents()});}
 for(const theme of ['petroleum','light','purple']){await call((a,t)=>{a.setAppMode('settings');a.setTheme(t)},theme);await p.waitForTimeout(80);report.pages.push({id:'theme-'+theme,data:await p.locator('#app').getAttribute('data-theme'),background:await p.locator('#app').evaluate(e=>getComputedStyle(e).backgroundColor)});}
 await p.reload({waitUntil:'networkidle'});report.pages.push({id:'theme-after-reload',data:await p.locator('#app').getAttribute('data-theme')});
 await c.close();
 for(const width of (process.env.CSS_AUDIT_FAST?[]:[1440,768,390,320]))for(const mode of ['home','lexicon','practice','settings']){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'}), page=await context.newPage();await page.goto(origin,{waitUntil:'networkidle'});await page.waitForFunction(()=>window.vueLexiconApp);await page.evaluate(mode=>{const a=window.vueLexiconApp;a.setAppMode(mode);if(mode==='practice')a.selectLesson('HTML-101',true)},mode);await page.waitForTimeout(200);
  const data=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,buttons:[...document.querySelectorAll('button')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&getComputedStyle(e).visibility!=='hidden'}).filter(e=>{const r=e.getBoundingClientRect();return r.left< -1||r.right>innerWidth+1}).map(e=>({text:e.innerText.slice(0,60),label:e.getAttribute('aria-label'),rect:e.getBoundingClientRect().toJSON()}))}));report.responsive.push({mode,...data});await page.screenshot({path:path.join(out,mode+'-'+width+'.png'),fullPage:true});await context.close();
 }
 report.finished=new Date().toISOString();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({terms:report.css.length,controls:report.css.reduce((n,t)=>n+t.controls.length,0),responsive:report.responsive.length,errors:report.errors}));
}
main().catch(e=>{report.fatal=e.stack;fs.writeFileSync(path.join(out,'results-partial.json'),JSON.stringify(report,null,2));console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
