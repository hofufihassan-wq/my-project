/* Measure computed syntax colors in the real application, across all five themes. */
const {fs,path,assert,chromium,server}=require('./simulator-completion-test-helpers.cjs');
const out=path.resolve(process.argv[2]||'/tmp/vlex-five-theme-contrast');fs.mkdirSync(out,{recursive:true});const h=server(),results=[];let b;
(async()=>{await new Promise(r=>h.listen(0,'127.0.0.1',r));b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:1000}});await p.goto('http://127.0.0.1:'+h.address().port,{waitUntil:'networkidle'});
for(const theme of ['green','glass','petroleum','purple','light'])for(const mode of ['jsLab','cssLab','explain']){
 await p.evaluate(({theme,mode})=>{vueLexiconApp.setTheme(theme);vueLexiconApp.openLearning(mode)},{theme,mode});
 if(mode==='explain')await p.getByTestId('explain-sample').click();
 await p.waitForTimeout(250);
 const measured=await p.evaluate(()=>{
 const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number),lum=c=>c.slice(0,3).map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0),ratio=(a,b)=>{a=lum(a);b=lum(b);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
 const paints=[...document.querySelectorAll('.vlex-code-paint')];const code=paints.flatMap(pre=>[pre,...pre.querySelectorAll('span')].map(el=>({token:el.className||'plain',color:getComputedStyle(el).color,ratio:ratio(rgb(getComputedStyle(el).color),rgb(getComputedStyle(pre).backgroundColor))})));
 // Flat-color ancestor composition is a bounded estimate; gradient/backdrop pixels are not sampled.
 const blend=(f,b)=>f.slice(0,3).map((x,i)=>x*(f[3]??1)+b[i]*(1-(f[3]??1)));
 const el=document.querySelector('.vlex-explain-intro')||document.querySelector('.vlx-js-limits')||document.querySelector('.vlex-css-notice');let bg=[255,255,255],chain=[];for(let e=el;e;e=e.parentElement)chain.unshift(e);for(const e of chain)bg=blend(rgb(getComputedStyle(e).backgroundColor),bg);
 return {lowestToken:code.sort((a,b)=>a.ratio-b.ratio)[0],codeMinimum:Math.min(...code.map(x=>x.ratio)),tokens:code.length,textEstimate:ratio(rgb(getComputedStyle(el).color),bg),textColor:getComputedStyle(el).color};
 });
 const passed=measured.tokens>0&&measured.codeMinimum>=4.5&&measured.textEstimate>=4.5;results.push({theme,mode,passed,...measured});console.log((passed?'PASS ':'FAIL ')+theme+' '+mode+' '+JSON.stringify(measured));
 if(mode==='jsLab')await p.screenshot({path:path.join(out,`theme-${theme}.jpg`),type:'jpeg',quality:85,fullPage:true});
}
await p.close();})().catch(e=>results.push({passed:false,error:e.stack})).finally(async()=>{if(b)await b.close();h.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:results.filter(x=>x.passed).length,total:results.length,method:'Computed syntax on opaque code backgrounds; prose estimate composites flat ancestor colors, not gradient/backdrop pixels.',results},null,2));if(results.some(x=>!x.passed))process.exitCode=1});
