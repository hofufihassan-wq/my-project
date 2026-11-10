/* Phase 4: real UI, saved data and optional browser engines. No runtime substitutes. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const http = require('node:http');
const assert = require('node:assert/strict');
const engines = require(process.env.PLAYWRIGHT_PATH || '/opt/codex/cua_node/lib/node_modules/playwright-core');
const output = process.env.VLP_TEST_OUTPUT || 'phase4-artifacts';
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync('practice-curriculum.js','utf8'),ctx);
const lessons=ctx.window.PRACTICE_CURRICULUM.lessons;
const seed=Object.fromEntries(lessons.map((l,i)=>[l.id,{status:'unlocked',codeDraft:i%3===0?null:`<p id="card">saved ${l.id}</p>`}]));
seed['HTML-102']={status:'unlocked'};
const results=[], availability=[], networkEvidence=[];
let browser;
const server=http.createServer((req,res)=>{
  let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(name.startsWith('/nested/app/'))name=name.slice('/nested/app'.length);
  if(name.endsWith('/'))name+='index.html';
  const file=path.resolve(__dirname,'.'+name);
  if(!file.startsWith(__dirname+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2'})[path.extname(file)]||'application/octet-stream');
  res.end(fs.readFileSync(file));
});
async function main(){
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`;
  for(const name of ['chromium','firefox','webkit']){
    try{
      browser=await engines[name].launch({headless:true,...(name==='chromium'?{executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',args:['--no-sandbox']}:{})});
      availability.push({engine:name,available:true,version:browser.version()});
    }catch(error){availability.push({engine:name,available:false,reason:error.message.slice(0,1100)});console.log('UNAVAILABLE',name,error.message.split('\n')[0]);continue;}
    for(const [width,height] of [[360,740],[390,844],[768,1024],[1440,900]]){
      const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce',acceptDownloads:true});
      const errors=[],external=[],failed=[];
      await context.route('**/*',route=>{
        const u=new URL(route.request().url());
        if(u.origin===origin||['blob:','about:','data:'].includes(u.protocol))return route.continue();
        external.push(u.href);return route.abort('blockedbyclient');
      });
      await context.addInitScript(seed=>{
        if(window!==window.top||sessionStorage.getItem('phase4-seeded'))return;
        localStorage.setItem('vuelexicon_practice_progress',JSON.stringify(seed));
        sessionStorage.setItem('phase4-seeded','yes');
      },seed);
      const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
      page.on('requestfailed',r=>failed.push({url:r.url(),reason:r.failure()?.errorText}));
      page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});
      const base=origin+(width===768?'/nested/app/':'/');
      await page.goto(base,{waitUntil:'networkidle'});
      await page.waitForFunction(()=>window.vueLexiconApp?.rawLexiconData.length===180);
        // 5B opens the dashboard. Enter the dictionary explicitly for these legacy scenarios.
        await page.evaluate(() => window.vueLexiconApp.setAppMode('lexicon'));
        await page.waitForTimeout(100);
      const app=(fn,arg)=>page.evaluate(({s,arg})=>(new Function('a','arg',`return (${s})(a,arg)`))(window.vueLexiconApp,arg),{s:fn.toString(),arg});
      const stored=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('vuelexicon_practice_progress')));
      async function test(title,fn){if(process.env.PHASE4_FILTER&&!title.includes(process.env.PHASE4_FILTER))return;try{await fn();results.push({engine:name,width,title,passed:true});console.log('PASS',name,width,title);}catch(error){results.push({engine:name,width,title,passed:false,error:error.message});console.error('FAIL',name,width,title,error.message);}}
      async function ready(){await page.waitForFunction(()=>['preview_ready','error'].includes(window.vueLexiconApp.executionState));await page.waitForTimeout(200);if(await page.getByTestId('final-panel-all').isVisible())await page.getByTestId('final-panel-all').click();}
      const search=page.locator('input[placeholder^="ابحث عن أي"]');
      await test('header geometry keeps every quick action fully inside the viewport',async()=>{
        const geometry=await page.locator('header').evaluate(header=>({width:innerWidth,
          brand:header.querySelector('[class*="select-none"]').getBoundingClientRect().toJSON(),
          buttons:[...header.querySelectorAll('button[title]')].map(button=>({title:button.title,...button.getBoundingClientRect().toJSON()}))}));
        for(const button of geometry.buttons)assert(button.left>=0&&button.right<=width,JSON.stringify(geometry));
        for(const title of ['عرض المفضلة','اختصارات لوحة المفاتيح','سجل التعلّم، التقدم والنسخ الاحتياطي']){
          await page.getByTitle(title,{exact:true}).click();
          await page.keyboard.press('Escape');
        }
      });
      await test('bookmark UI list click stores a real ID without losing other favorites',async()=>{
        const before=await app(a=>[...a.bookmarkedIds]);
        const raw=await page.evaluate(()=>localStorage.getItem('vuelexicon_bookmarks_v3'));
        try{
          await app(a=>{a.setAppMode('lexicon');a.resetFilters();if(!a.isBookmarked(a.rawLexiconData[1]))a.toggleBookmark(a.rawLexiconData[1]);});
          const target=await app(a=>a.rawLexiconData[0].id);
          await page.locator('aside').getByTitle('إضافة للمفضلة',{exact:true}).first().click();
          const ids=await page.evaluate(()=>JSON.parse(localStorage.getItem('vuelexicon_bookmarks_v3')));
          assert(ids.includes(target));assert(!ids.includes(null));
          assert(ids.includes(await app(a=>a.rawLexiconData[1].id)));
          await page.locator('aside').getByTitle('إزالة من المفضلة',{exact:true}).first().click();
          assert(!await app((a,id)=>a.bookmarkedIds.has(id),target));
        }finally{
          await app((a,before)=>{a.bookmarkedIds=new Set(before);},before);
          await page.evaluate(raw=>{if(raw===null)localStorage.removeItem('vuelexicon_bookmarks_v3');else localStorage.setItem('vuelexicon_bookmarks_v3',raw);},raw);
        }
      });
      await test('bookmark UI header returns from simulator on mobile and desktop navigation',async()=>{
        await page.locator('header button:visible').filter({hasText:'المحاكي'}).first().click();
        assert.equal(await app(a=>a.appMode),'practice');
        // Beta mobile header groups account actions; return via its visible dictionary link first.
        await page.locator('.tech-topbar nav button:visible').filter({hasText:'المعجم'}).click();
        await page.locator('button[title="عرض المفضلة"]:visible').click();
        assert.equal(await app(a=>a.appMode),'lexicon');assert.equal(await app(a=>a.activeCategory),'bookmarks');
        await page.locator('header button:visible').filter({hasText:'المعجم'}).first().click();
        assert.equal(await app(a=>a.appMode),'lexicon');
      });
      await test('startup and navigation preserve saved null/missing drafts exactly',async()=>{
        assert.deepEqual(await stored(),seed);
        await app(a=>{a.openSimulator();a.selectLesson('VUE-101');a.selectLesson('HTML-102');a.selectLesson('JS-101');});await ready();
        assert.deepEqual(await stored(),seed);
        await app(a=>a.setAppMode('lexicon'));
      });
      await test('search suggestions remain selectable across category and alphabet filters',async()=>{
        await app(a=>{a.setCategory('css');a.setLetter('B');a.highlightedDropdownIndex=0;});
        await search.fill('map');await search.press('Enter');
        assert.equal(await app(a=>a.searchQuery),'');
        assert.equal(await app(a=>a.selectedTerm?.term),'map()');
        assert(await app(a=>a.filteredTermsList.some(t=>t.id===a.selectedTerm?.id)));
      });
      await test('changing query resets stale keyboard suggestion selection',async()=>{
        await app(a=>a.resetFilters());await search.focus();await search.evaluate(e=>e.blur());await search.fill('a');await search.press('ArrowUp');
        assert((await app(a=>a.highlightedDropdownIndex))>0);
        await search.fill('WeakMap');
        // A delayed blur callback must not close suggestions after the input regains focus.
        await page.waitForTimeout(300);
        assert.equal(await search.evaluate(e=>document.activeElement===e),true);
        assert.equal(await app(a=>a.searchFocused),true);
        await search.press('Enter');
        assert.equal(await app(a=>a.searchQuery),'');
        assert.equal(await app(a=>a.selectedTerm.term),'WeakMap / WeakSet');
      });
      await test('typing ? in the code editor does not invoke global shortcuts',async()=>{
        await app(a=>{a.openSimulator();a.selectLesson('JS-101');a.practiceAutoRun=false;});await ready();
        const editor=page.locator('textarea.editor-textarea');await editor.fill('const value = source');await editor.press('?');
        const opened=await app(a=>a.showShortcutsModal);
        await app(a=>{a.showShortcutsModal=false;});
        assert.equal(opened,false);assert((await app(a=>a.practiceCode)).includes('?'));
      });
      await test('global ? still works and Escape closes progress and shortcut dialogs',async()=>{
        await page.locator('textarea.editor-textarea').evaluate(e=>e.blur());await page.keyboard.press('?');
        assert.equal(await app(a=>a.showShortcutsModal),true);await page.keyboard.press('Escape');
        assert.equal(await app(a=>a.showShortcutsModal),false);
        await app(a=>{a.showProgressModal=true;});await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');
        const open=await app(a=>a.showProgressModal);await app(a=>{a.showProgressModal=false;});assert.equal(open,false);
      });
      await test('late completion of an older import cannot replace the newest selected file',async()=>{
        await app(a=>{
          window.__nativeReader=window.FileReader;window.__pendingReaders=[];
          window.FileReader=class{readAsText(file){this.file=file;window.__pendingReaders.push(this);}};
          for(const text of ['older','newer'])a.importUserData({target:{files:[{size:100,name:text}],value:text}});
          const payload=text=>JSON.stringify({practiceProgress:{'JS-101':{status:'unlocked',codeDraft:'<p>'+text+'</p>'}}});
          window.__pendingReaders[1].onload({target:{result:payload('newer')}});
          window.__pendingReaders[0].onload({target:{result:payload('older')}});
          window.FileReader=window.__nativeReader;
        });
        assert.equal(await app(a=>a.practiceCode),'<p>newer</p>');
        assert.equal((await stored())['JS-101'].codeDraft,'<p>newer</p>');assert.equal(await app(a=>a.activeRun),null);
      });
      await test('bookmark mastery code explanation export reject-import and reload preserve data',async()=>{
        await app(a=>{a.setAppMode('lexicon');a.resetFilters();a.selectTerm(a.rawLexiconData.find(t=>t.term==='ref()'));});
        const id=await app(a=>a.selectedTerm.id);
        assert((await app(a=>a.selectedTerm.codeBreakdown.length))>0);
        await app(a=>{if(!a.isBookmarked(a.selectedTerm))a.toggleBookmark(a.selectedTerm);a.setTermMastery(a.selectedTerm.id,'learning');a.setCategory('bookmarks');});
        assert(await app(a=>a.filteredTermsList.some(t=>t.id===a.selectedTerm.id)));
        const before=await stored();const dl=page.waitForEvent('download');await app(a=>a.exportUserData());
        const file=await dl,payload=JSON.parse(fs.readFileSync(await file.path(),'utf8'));
        assert.deepEqual(payload.practiceProgress,before);assert(payload.bookmarks.includes(id));assert.equal(payload.mastery[id],'learning');
        await app(a=>{a.toastMessage='';a.importUserData({target:{files:[new File(['{"practiceProgress":{"JS-101":{"status":"unlocked","codeDraft":{}}}}'],'bad.json')],value:'bad'}});});
        await page.waitForFunction(()=>window.vueLexiconApp.toastType==='error');assert.deepEqual(await stored(),before);
        await page.reload({waitUntil:'networkidle'});await page.waitForFunction(()=>window.vueLexiconApp);
        assert.deepEqual(await stored(),before);assert(await app((a,id)=>a.bookmarkedIds.has(id),id));
        assert.equal(await app((a,id)=>a.getTermMastery(id),id),'learning');
      });
      await test('RTL Arabic fonts dark theme and layouts remain usable at this width',async()=>{
        await page.evaluate(()=>document.fonts.ready);
        assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
        assert(await page.evaluate(()=>document.fonts.check('400 14px Alexandria','مرحبا')));
        assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(3, 12, 14)');
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
        await app(a=>{a.openSimulator();a.backToTracks();});assert.equal(await page.locator('[data-track]').count(),5);
        if(width<=850) await page.locator('.beta-mobile-tracks').selectOption('vue');
        else await page.locator('[data-track="vue"]').click();
        assert.equal(await app(a=>a.activeRun),null,'track navigation stays manual');
        await page.getByTestId('tech-run').click();await ready();
        await app(a=>a.selectLesson('VUE-101'));await ready();
        // The beta uses its tech grid at tablet/desktop widths and stacks it at <=560px.
        assert.equal(await page.locator('textarea.editor-textarea').evaluate(e=>getComputedStyle(e.closest('.tech-main-grid')).display),width<=560?'flex':'grid');
        assert.equal(await page.locator('iframe').getAttribute('sandbox'),'allow-scripts');
        await page.getByTestId('tech-reference-run').click();await ready();
        const frame=page.locator('iframe').contentFrame();await frame.locator('.count-display').waitFor();
        await page.locator('iframe').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await frame.getByRole('button',{name:'انقر للزيادة ⚡'}).evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForTimeout(200);await frame.getByRole('button',{name:'انقر للزيادة ⚡'}).click();assert.equal(await frame.locator('.count-display').textContent(),'1');
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
        if(process.env.PHASE4_SCREENSHOTS){
          fs.mkdirSync(process.env.PHASE4_SCREENSHOTS,{recursive:true});
          await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
          await page.screenshot({path:path.join(process.env.PHASE4_SCREENSHOTS,`${name}-${width}-simulator.png`)});
        }
      });
      await test('no core external requests, failed resources or uncaught errors',async()=>{assert.deepEqual(external,[]);assert.deepEqual(failed,[]);assert.deepEqual(errors,[]);});
      if(width===1440){
        for(const lesson of lessons)await test('real reference execution and internal validator: '+lesson.id,async()=>{
          await app((a,id)=>{a.openSimulator();a.selectLesson(id);a.practiceCode=a.currentLesson.solution;a.runPracticeCode();},lesson.id);
          await ready();assert.equal(await app(a=>a.executionState),'preview_ready');
          const result=await app(a=>a.currentLesson.validator(a.practiceCode,{snapshot:a.lastDomSnapshot,getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[]},a.practiceLogs));
          assert.equal(result.passed,true,JSON.stringify(result));
          assert((await app(a=>a.lastDomSnapshot.bodyText)).trim().length>0);
        });
        await test('known false positives fail after actual isolated runs without output',async()=>{
          for(const [id,code] of [['JS-101',"const userName='a';const welcomeMsg='b';"],['TS-101','// appTitle\nfunction formatAppDetails(){}']]){
            await app((a,{id,code})=>{a.selectLesson(id);a.practiceCode='<!doctype html><script>'+code+'</script>';a.runPracticeCode();},{id,code});await ready();
            assert.equal(await app(a=>a.currentLesson.validator(a.practiceCode,{snapshot:a.lastDomSnapshot,getElementById:()=>null},[]).passed),false);
          }
          assert.equal(await page.getByRole('button',{name:/فحص الحل|تأكيد الإنجاز/}).count(),0);
        });
        await test('no uncaught exceptions after all fifteen real reference executions',async()=>assert.deepEqual(errors,[]));
      }
      networkEvidence.push({engine:name,width,uncaughtErrors:errors,externalRequests:external,failedRequests:failed});
      await context.close();
    }
    await browser.close();browser=null;
  }
  const passed=results.filter(r=>r.passed).length;fs.mkdirSync(output,{recursive:true});
  fs.writeFileSync(output+'/stability-browser-report.json',JSON.stringify({timestamp:new Date().toISOString(),availability,filter:process.env.PHASE4_FILTER||null,passed,total:results.length,networkEvidence,results},null,2)+'\n');
  console.log(`${passed}/${results.length} stability browser checks passed`);if(passed!==results.length||!results.length)process.exitCode=1;
}
main().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();server.close();});
