/* Verify that phase-one styling does not redesign the deferred workspaces. */
const { parseArgs } = require('node:util');
const { values } = parseArgs({ options: { before: { type: 'string' }, after: { type: 'string' }, output: { type: 'string' } } });
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const { chromium }=require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const output=path.resolve(values.output);
fs.mkdirSync(output,{recursive:true});
function server(root){return http.createServer((req,res)=>{
  let name=new URL(req.url,'http://localhost').pathname;if(name.endsWith('/'))name+='index.html';
  const file=path.resolve(root,'.'+decodeURIComponent(name));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end();}
  res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2'})[path.extname(file)]||'application/octet-stream');
  res.end(fs.readFileSync(file));
});}
const hosts=[server(path.resolve(values.before)),server(path.resolve(values.after))];
const scenes=[
  ...['green','glass'].flatMap(theme=>[1440,390].map(width=>({name:`simulator-${theme}-${width}`,theme,width,mode:'practice'}))),
  ...['course','explain','cssLab','jsLab'].map(mode=>({name:`deferred-${mode}`,theme:'petroleum',width:1440,mode})),
  ...['projects','calendar'].map(section=>({name:`deferred-${section}`,theme:'petroleum',width:1440,section}))
];
let browser;const results=[];
(async()=>{
  for(const host of hosts)await new Promise(resolve=>host.listen(0,'127.0.0.1',resolve));
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  for(const scene of scenes){
    const shots=[];
    for(let index=0;index<hosts.length;index++){
      const context=await browser.newContext({viewport:{width:scene.width,height:1000},reducedMotion:'reduce',timezoneId:'Asia/Riyadh'});
      const page=await context.newPage();
      // Freeze Date only: compare the simulator's live clock at the same instant.
      // Timers, rendering, and application behavior remain enabled.
      await page.clock.setFixedTime(new Date('2026-11-09T08:00:00Z'));
      const errors=[];page.on('pageerror',error=>errors.push(error.message));
      await page.goto('http://127.0.0.1:'+hosts[index].address().port,{waitUntil:'networkidle'});
      await page.waitForFunction(()=>window.vueLexiconApp);
      await page.evaluate(scene=>{
        const app=window.vueLexiconApp;app.setTheme(scene.theme);
        if(scene.section)app.openFoundation(scene.section);
        else if(scene.mode==='practice')app.openVisualSimulator();
        else app.openLearning(scene.mode);
        window.scrollTo({top:0,behavior:'instant'});
      },scene);
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(400);
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
      const image=await page.screenshot({path:path.join(output,`${scene.name}-${index?'after':'before'}.png`)});
      shots.push({buffer:image,sha256:crypto.createHash('sha256').update(image).digest('hex'),errors});
      await context.close();
    }
    const item={scene:scene.name,passed:shots[0].buffer.equals(shots[1].buffer)&&!shots.some(s=>s.errors.length),before:shots[0].sha256,after:shots[1].sha256,errors:shots.flatMap(s=>s.errors)};
    results.push(item);console.log((item.passed?'PASS':'FAIL')+' '+scene.name+' pixel equality');
  }
})().catch(error=>{results.push({scene:'runner',passed:false,error:error.stack});console.error(error)}).finally(async()=>{
  if(browser)await browser.close();for(const host of hosts)host.close();
  fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,results},null,2));
  if(results.some(result=>!result.passed))process.exitCode=1;
});
