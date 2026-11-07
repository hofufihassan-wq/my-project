// Verify the supplied Windows ZIP on Linux/Python and actual persistent Chromium.
// Windows CMD is unavailable: this does not claim native BAT execution.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const net=require('node:net'),crypto=require('node:crypto'),{spawn,execFileSync}=require('node:child_process');
const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright-core');
if(!process.argv[2])throw Error('Supply the exact release ZIP path.');
const archive=path.resolve(process.argv[2]),out=__dirname,origin='http://127.0.0.1:8091';
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'VLex release local '));
const root=path.join(temporary,'VLex-Pro'),profile=path.join(temporary,'persistent browser profile');
const report={archive,archiveSHA256:crypto.createHash('sha256').update(fs.readFileSync(archive)).digest('hex'),
  extracted:temporary,platform:process.platform,nativeWindowsCmdTested:false,origin,steps:[],pageErrors:[],externalRequests:[],serverLogs:[]};
let server,context,page,firstHealth,savedFavorite;
async function step(name,fn){try{const evidence=await fn();report.steps.push({name,status:'passed',evidence});console.log('PASS '+name);return true;}catch(e){report.steps.push({name,status:'failed',error:e.stack});console.error('FAIL '+name+': '+e.message);return false;}}
function portFree(){return new Promise(resolve=>{const s=net.connect({host:'127.0.0.1',port:8091});s.once('connect',()=>{s.end();resolve(false)});s.once('error',()=>resolve(true));});}
async function health(){try{const response=await fetch(origin+'/__vlex_health__');return response.ok?await response.json():null;}catch{return null;}}
async function start(){
  assert(await portFree(),'Port8091 occupied: no unrelated process will be stopped.');
  const child=spawn('python3',['scripts/start-local.py','--no-browser'],{cwd:root,stdio:['ignore','pipe','pipe']});server=child;
  child.stdout.on('data',data=>report.serverLogs.push(String(data)));child.stderr.on('data',data=>report.serverLogs.push(String(data)));
  const expected=crypto.createHash('sha256').update(fs.realpathSync(root)).digest('hex').slice(0,20);
  for(let i=0;i<60;i++){
    if(child.exitCode!==null)throw Error('Own local server exited: '+report.serverLogs.join(''));
    const current=await health();if(current){assert.equal(current.root_id,expected);assert.equal(current.origin,origin);return current;}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  throw Error('Local server readiness timed out.');
}
async function stop(){
  if(!server||server.exitCode!==null)return;
  const own=server;own.kill('SIGINT');
  await Promise.race([new Promise(resolve=>own.once('exit',resolve)),new Promise((_,reject)=>setTimeout(()=>reject(Error('Own server did not stop after SIGINT')),4000))]);
  assert.notEqual(own.exitCode,null);server=null;
}
async function open(){
  context=await chromium.launchPersistentContext(profile,{headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox'],viewport:{width:1440,height:1100}});
  await context.route('**/*',route=>{if(new URL(route.request().url()).origin!==origin){report.externalRequests.push(route.request().url());return route.abort();}return route.continue();});
  page=await context.newPage();page.on('pageerror',e=>report.pageErrors.push(e.message));
  await page.goto(origin+'/',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.vueLexiconApp?.rawLexiconData.length===180);
}
async function searchBoth(){
  await page.locator('[data-testid="nav-lexicon"]:visible').first().click();
  const search=page.locator('input[placeholder^="ابحث عن أي"]'),counts={};
  for(const [query,expected] of [['filter','filter'],['مصفوفة','مصفوف']]){
    await search.fill(query);await page.waitForFunction(q=>window.vueLexiconApp.searchQuery===q,query);
    const rows=await page.evaluate(()=>window.vueLexiconApp.filteredTermsList.map(t=>({term:t.term,arabicTitle:t.arabicTitle,description:t.description})));
    assert(rows.length>0&&rows.length<180,query+' did not narrow dictionary');
    assert(rows.some(row=>(row.term+' '+row.arabicTitle+' '+row.description).toLowerCase().includes(expected)),query+' has no relevant result');counts[query]=rows.length;
  }
  await search.fill('');await search.blur();return counts;
}
const cssHTML='<section id="lab-target">مسودة CSS محفوظة بعد إعادة الفتح</section>';
const cssSource='#lab-target { padding: 23px; color: rgb(13, 77, 131); }\n/* release roundtrip */';
const jsSource='const releaseValue = 42;\nconsole.log(releaseValue);\n// saved without auto-running';
(async()=>{
  const verified=await step('extract exact release ZIP, verify every hash and required files',async()=>{
    const verification=execFileSync('python3',['-c',`import sys,zipfile,json,hashlib,pathlib,stat
p=pathlib.Path(sys.argv[2])
with zipfile.ZipFile(sys.argv[1]) as z:
 for entry in z.infolist():
  target=(p/entry.filename).resolve(); target.relative_to(p.resolve())
  assert not stat.S_ISLNK(entry.external_attr >> 16),entry.filename
 z.extractall(p)
r=p/'VLex-Pro';m=json.loads((r/'LOCAL_PACKAGE_MANIFEST.json').read_text())
for n,i in m['files'].items():
 assert hashlib.sha256((r/n).read_bytes()).hexdigest()==i['sha256'],n
for n in ['start-local.bat','scripts/start-local.py','scripts/package-static.py','LOCAL_RUN_AR.md','index.html','_pristine_backup/index.html','_v3.5_pre_hands_on_backup/index.html']:
 assert (r/n).is_file(),n
assert m['uncommitted_files_present'] is False,'Release must record a clean source commit'
print(json.dumps({'source_commit':m['git_commit'],'branch':m['git_branch'],'files':len(m['files']),'clean_source':not m['uncommitted_files_present']}))`,archive,temporary],{encoding:'utf8'});
    report.manifest=JSON.parse(verification);return report.manifest;
  });if(!verified)throw Error('Release extraction/integrity failed; browser tests not started.');
  if(!await step('start extracted folder with spaces on fixed loopback origin',async()=>{firstHealth=await start();await open();return firstHealth;}))throw Error('Local launch failed.');
  await step('Arabic and English search before shutdown',searchBoth);
  await step('save a favorite through dictionary button',async()=>{
    await page.locator('#detailed-term-view').getByTitle('إضافة للمفضلة',{exact:true}).click();
    await page.waitForFunction(()=>window.vueLexiconApp.bookmarkedIds.size===1);
    savedFavorite=await page.evaluate(()=>localStorage.getItem('vuelexicon_bookmarks_v3'));assert.equal(JSON.parse(savedFavorite).length,1);
    await page.screenshot({path:path.join(out,'favorite-before-close.png')});return {bookmarks:JSON.parse(savedFavorite)};
  });
  await step('save CSS and JavaScript drafts through native editors',async()=>{
    await page.getByTestId('nav-css-lab').click();
    await page.getByRole('checkbox',{name:'التحديث التلقائي لمختبر CSS'}).uncheck();
    await page.getByTestId('css-lab-html').fill(cssHTML);await page.getByTestId('css-lab-css').fill(cssSource);
    await page.getByTestId('nav-js-lab').click();await page.getByTestId('js-lab-source').fill(jsSource);
    await page.waitForFunction(({cssHTML,cssSource,jsSource})=>{
      const raw=localStorage.getItem('vlex_personal_learning_v1');if(!raw)return false;
      const value=JSON.parse(raw);return JSON.stringify(value).includes('release roundtrip')&&JSON.stringify(value).includes('saved without auto-running');
    },{cssHTML,cssSource,jsSource});
    return {cssHTML,cssSource,jsSource};
  });
  if(!await step('close full persistent browser, stop and restart own local server, reopen same profile',async()=>{
    await context.close();context=null;await stop();assert.equal(await health(),null);
    const secondHealth=await start();assert.equal(secondHealth.root_id,firstHealth.root_id);assert.equal(secondHealth.origin,firstHealth.origin);
    await open();return {sameProfile:profile,sameOrigin:true,sameFolder:true,serverRestarted:true};
  }))throw Error('Roundtrip restart failed.');
  await step('Arabic and English search after full browser/server restart',searchBoth);
  await step('favorite persists after full browser/server restart',async()=>{
    assert.equal(await page.evaluate(()=>localStorage.getItem('vuelexicon_bookmarks_v3')),savedFavorite);
    await page.locator('[title="عرض المفضلة"]:visible').first().click();
    await page.waitForFunction(()=>window.vueLexiconApp.activeCategory==='bookmarks'&&window.vueLexiconApp.filteredTermsList.length===1);
    assert.equal(await page.locator('#detailed-term-view').getByTitle('إزالة من المفضلة',{exact:true}).count(),1);
    await page.screenshot({path:path.join(out,'favorite-after-reopen.png')});return {favoriteVisible:true};
  });
  await step('CSS HTML/CSS and JS source drafts persist after full browser/server restart',async()=>{
    await page.getByTestId('nav-css-lab').click();assert.equal(await page.getByTestId('css-lab-html').inputValue(),cssHTML);
    assert.equal(await page.getByTestId('css-lab-css').inputValue(),cssSource);
    assert.equal(await page.getByRole('checkbox',{name:'التحديث التلقائي لمختبر CSS'}).isChecked(),false);
    await page.screenshot({path:path.join(out,'css-draft-after-reopen.png')});
    await page.getByTestId('nav-js-lab').click();assert.equal(await page.getByTestId('js-lab-source').inputValue(),jsSource);
    assert.equal(await page.getByTestId('js-lab-frame').count(),0,'Restored JS source must not auto-run');
    await page.screenshot({path:path.join(out,'js-draft-after-reopen.png')});return {cssHTML:true,cssSource:true,autoRunPreference:false,jsSource:true,jsNotAutoRun:true};
  });
  await step('server denies private/project source files and browser stays offline',async()=>{
    for(const name of ['.git/config','.env','README.md','_pristine_backup/index.html','scripts/start-local.py'])assert.equal((await fetch(origin+'/'+name)).status,404,name);
    assert.deepEqual(report.pageErrors,[]);assert.deepEqual(report.externalRequests,[]);return {privatePaths:'404',pageErrors:0,externalRequests:0};
  });
})().catch(e=>{report.runnerError=e.stack;process.exitCode=1;console.error(e.message);}).finally(async()=>{
  if(context)await context.close();try{await stop();}catch(e){report.shutdownError=e.message;process.exitCode=1;}
  fs.writeFileSync(path.join(out,'server.log'),report.serverLogs.join(''));
  report.finishedUtc=new Date().toISOString();report.status=report.runnerError||report.shutdownError||report.steps.some(step=>step.status!=='passed')?'failed':'passed';
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');if(report.status!=='passed')process.exitCode=1;
  console.log(JSON.stringify({status:report.status,passed:report.steps.filter(step=>step.status==='passed').length,total:report.steps.length,source:report.manifest}));
});
