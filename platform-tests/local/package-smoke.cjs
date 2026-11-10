const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawn,execFileSync}=require('node:child_process');
const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const archive=process.argv[2]||JSON.parse(fs.readFileSync(path.join(__dirname,'package-build.json'))).archive;
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'VLex local package ')),out=process.env.VLEX_PACKAGE_SMOKE_OUTPUT||__dirname;fs.mkdirSync(out,{recursive:true});
const results=[],origin='http://127.0.0.1:8091';let child,context;
async function test(name,fn){try{await fn();results.push({name,passed:true});console.log('PASS',name)}catch(e){results.push({name,passed:false,error:e.stack});console.error('FAIL',name,e.message)}}
(async()=>{
await test('extract exact ZIP and verify every file hash',async()=>{execFileSync('python3',['-c',`import sys,zipfile,json,hashlib,pathlib
p=pathlib.Path(sys.argv[2])
with zipfile.ZipFile(sys.argv[1]) as z:
 for n in z.namelist():
  target=(p/n).resolve(); target.relative_to(p.resolve())
 z.extractall(p)
r=p/'VLex-Pro'; m=json.loads((r/'LOCAL_PACKAGE_MANIFEST.json').read_text())
for n,i in m['files'].items(): assert hashlib.sha256((r/n).read_bytes()).hexdigest()==i['sha256'],n
print(len(m['files']))`,archive,temporary],{encoding:'utf8'})});
const root=path.join(temporary,'VLex-Pro');
await test('launch extracted folder with spaces and render dictionary',async()=>{let preexisting=false;try{await fetch(origin+'/__vlex_health__');preexisting=true}catch{}assert.equal(preexisting,false,'Do not replace an existing local server.');child=spawn('python3',['scripts/start-local.py','--no-browser'],{cwd:root,stdio:['ignore','pipe','pipe']});let logs='';child.stdout.on('data',d=>logs+=d);child.stderr.on('data',d=>logs+=d);let healthy=false;for(let i=0;i<100;i++){try{healthy=(await fetch(origin+'/__vlex_health__')).ok}catch{}if(healthy)break;if(child.exitCode!==null)throw Error(logs);await new Promise(r=>setTimeout(r,100))}assert(healthy,logs);context=await chromium.launchPersistentContext(path.join(temporary,'browser profile'),{headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox'],viewport:{width:1440,height:1000}});const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(origin,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.vueLexiconApp?.rawLexiconData.length===180);await p.locator('[data-testid="nav-lexicon"]:visible').first().click();const s=p.locator('input[placeholder^="ابحث عن أي"]');await s.fill('v-model');await p.waitForFunction(()=>window.vueLexiconApp.filteredTermsList.some(t=>t.term==='v-model'));await s.fill('');await p.locator('#detailed-term-view').getByTitle('إضافة للمفضلة',{exact:true}).click();assert.equal(await p.evaluate(()=>window.vueLexiconApp.bookmarkedIds.size),1);await p.reload({waitUntil:'networkidle'});await p.waitForFunction(()=>window.vueLexiconApp?.bookmarkedIds.size===1);assert.deepEqual(errors,[]);await p.screenshot({path:path.join(out,'package-dictionary.png')});fs.writeFileSync(path.join(out,'package-server.log'),logs)});
})().catch(e=>{results.push({name:'runner',passed:false,error:e.stack});console.error(e)}).finally(async()=>{if(context)await context.close();if(child&&child.exitCode===null){child.kill('SIGINT');await new Promise(r=>child.once('exit',r))}fs.writeFileSync(path.join(out,'package-smoke-results.json'),JSON.stringify({timestamp:new Date().toISOString(),archive,extracted:temporary,passed:results.filter(r=>r.passed).length,total:results.length,results},null,2)+'\n');if(results.some(r=>!r.passed))process.exitCode=1});
