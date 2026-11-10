// Full application regression: native navigation/forms only; no method calls,
// template replacements, fake components, or localStorage injection.
const fs = require('fs'), path = require('path'), http = require('http');
const {chromium} = require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const source = path.resolve(process.argv[2]);
const phase = process.argv[3] || 'check';
if (!/^[a-z0-9-]+$/.test(phase)) throw new Error('Use a simple evidence phase name');
const base = path.join(__dirname, 'organizer-native-' + phase);
const report = {source, phase,startedUtc:new Date().toISOString(), steps:[], pageErrors:[],externalRequests:[],
  scope:'Full app via native UI, fresh isolated browser context, create and reload; no source/storage injection'};
const check = (value, message) => {if (!value) throw new Error(message);};
const routes = [
  {id:'projects',label:'المشاريع',field:'project-title'},
  {id:'kanban',label:'لوحة المهام',field:'task-title'},
  {id:'notes',label:'الملاحظات',field:'note-title'},
  {id:'calendar',label:'التقويم',field:'event-title'}
];
let server,browser,page;
async function step(name, work) {
  try {const evidence=await work();report.steps.push({name,status:'passed',evidence});return true;}
  catch(error) {report.steps.push({name,status:'failed',error:error.message});return false;}
}
async function route(item) {
  await page.getByRole('navigation',{name:'أقسام التنظيم'}).getByRole('button',{name:item.label,exact:true}).click();
  const organizer=page.getByTestId('learning-organizer');
  const state={heading:await page.locator('.foundation-page>.page-heading h2').innerText(),
    mode:await organizer.getAttribute('data-mode'),field:await page.getByTestId(item.field).isVisible(),
    kanbanVisible:await page.locator('.vlp-kanban').isVisible()};
  check(state.heading===item.label,'Wrong route heading: '+JSON.stringify(state));
  check(state.mode===item.id && state.field && (item.id!=='kanban'||state.kanbanVisible),
    'Native route '+item.id+' rendered wrong organizer: '+JSON.stringify(state));
  return state;
}
(async()=>{
  server=http.createServer((req,res)=>{
    let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(name.endsWith('/'))name+='index.html';
    const file=path.resolve(source,'.'+name);
    if(!file.startsWith(source+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()) {res.writeHead(404);res.end();return;}
    res.setHeader('Content-Type',({'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');
    res.end(fs.readFileSync(file));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin='http://127.0.0.1:'+server.address().port;
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:1440,height:1100},timezoneId:'UTC'});
  await context.route('**/*',route=>{
    if(new URL(route.request().url()).origin!==origin) {report.externalRequests.push(route.request().url());return route.abort();}
    return route.continue();
  });
  page=await context.newPage();page.on('pageerror',error=>report.pageErrors.push(error.message));
  await page.goto(origin,{waitUntil:'networkidle'});
  await page.locator('.main-nav').getByRole('button',{name:'المشاريع',exact:true}).click();
  const usable={};
  for(const item of routes) usable[item.id]=await step('native route '+item.id,()=>route(item));
  const stamp=Date.now(),projectTitle='مشروع تحقق مستقل '+stamp,noteTitle='ملاحظة تحقق '+stamp,
    taskTitle='مهمة تحقق '+stamp,eventTitle='مراجعة تحقق '+stamp,date=new Date().toISOString().slice(0,10);
  const created={};
  const skip=name=>report.steps.push({name,status:'blocked',reason:'Correct route/form unavailable; no alternate direct component mount used'});
  if(usable.projects) created.project=await step('create project through full-app form',async()=>{
    await route(routes[0]);
    await page.getByTestId('project-title').fill(projectTitle);
    await page.getByTestId('project-description').fill('وصف محفوظ لاختبار المسار الكامل');
    await page.getByTestId('project-save').click();
    await page.getByRole('heading',{name:projectTitle,exact:true}).waitFor();
    check((await page.getByTestId('organizer-message').innerText()).includes('تم الحفظ'),'Project did not report durable save');
    return {title:projectTitle};
  }); else skip('create project through full-app form');
  if(usable.kanban) created.task=await step('create task and move it to done through native select',async()=>{
    await route(routes[1]);
    await page.getByTestId('task-title').fill(taskTitle);
    await page.getByTestId('task-date').fill(date);
    if(created.project) await page.getByTestId('task-project').selectOption({label:projectTitle});
    await page.getByTestId('task-save').click();
    const card=page.locator('article.vlp-record-card').filter({has:page.getByRole('heading',{name:taskTitle,exact:true})});
    await card.waitFor();
    const stateSelect=card.getByRole('combobox',{name:'حالة المهمة '+taskTitle,exact:true});
    await stateSelect.selectOption('doing');check(await stateSelect.inputValue()==='doing','Task did not move to doing');
    await stateSelect.selectOption('done');check(await stateSelect.inputValue()==='done','Task did not move to done');
    check((await card.locator('..').getByRole('heading').first().innerText()).includes('مكتملة'),'Task not displayed in completed column');
    return {title:taskTitle,status:'done',projectLinked:!!created.project};
  }); else skip('create task and move it to done through native select');
  if(usable.notes) created.note=await step('create note through full-app form',async()=>{
    await route(routes[2]);
    await page.getByTestId('note-title').fill(noteTitle);
    await page.getByTestId('note-body').fill('السطر الأول\nالسطر الثاني');
    await page.getByTestId('note-save').click();
    await page.getByRole('heading',{name:noteTitle,exact:true}).waitFor();
    check((await page.getByTestId('organizer-message').innerText()).includes('تم الحفظ'),'Note did not report durable save');
    return {title:noteTitle};
  }); else skip('create note through full-app form');
  if(usable.calendar) created.event=await step('create dated event and navigate calendar month',async()=>{
    await route(routes[3]);
    const month=await page.getByTestId('calendar-month').innerText();
    await page.getByTestId('calendar-next').click();
    check(await page.getByTestId('calendar-month').innerText()!==month,'Calendar next month did not change');
    await page.getByTestId('calendar-prev').click();
    check(await page.getByTestId('calendar-month').innerText()===month,'Calendar previous month did not restore');
    await page.getByTestId('event-title').fill(eventTitle);await page.getByTestId('event-date').fill(date);
    await page.getByTestId('event-time').fill('14:30');await page.getByTestId('event-notes').fill('موعد اختبار حفظ التقويم');
    await page.getByTestId('event-save').click();await page.getByRole('heading',{name:eventTitle,exact:true}).waitFor();
    const dateButton=page.locator('.vlp-calendar-grid button[data-date="'+date+'"]');
    check((await dateButton.innerText()).includes('1 موعد'),'Calendar date count did not reflect saved event');
    return {title:eventTitle,date,time:'14:30'};
  }); else skip('create dated event and navigate calendar month');
  await page.screenshot({path:base+'-before-reload.png'});
  if(Object.values(created).some(Boolean)) {
    await page.reload({waitUntil:'networkidle'});
    await page.locator('.main-nav').getByRole('button',{name:'المشاريع',exact:true}).click();
    for(const [key,title,index] of [['project',projectTitle,0],['task',taskTitle,1],['note',noteTitle,2],['event',eventTitle,3]]) {
      if(!created[key]) continue;
      await step('persist '+key+' after real page reload',async()=>{
        await route(routes[index]);
        if(key==='event') await page.locator('.vlp-calendar-grid button[data-date="'+date+'"]').click();
        const heading=page.getByRole('heading',{name:title,exact:true});await heading.waitFor();
        const card=page.locator('article.vlp-record-card').filter({has:heading});
        if(key==='task') {
          check(await card.getByRole('combobox',{name:'حالة المهمة '+taskTitle,exact:true}).inputValue()==='done','Task status lost after reload');
          if(created.project) check((await card.innerText()).includes(projectTitle),'Task project link lost');
        }
        if(key==='note') check((await card.innerText()).includes('السطر الثاني'),'Note body lost');
        if(key==='event') check((await card.innerText()).includes('14:30'),'Event time lost');
        return {title,visible:true};
      });
    }
  } else skip('reload persistence: creation blocked');
  await page.screenshot({path:base+'-after.png'});
  await step('no page errors or external runtime requests',async()=>{
    check(report.pageErrors.length===0&&report.externalRequests.length===0,JSON.stringify({pageErrors:report.pageErrors,external:report.externalRequests}));
    return {pageErrors:0,externalRequests:0};
  });
  report.finishedUtc=new Date().toISOString();
  report.status=report.steps.some(step=>step.status!=='passed')?'failed':'passed';
  fs.writeFileSync(base+'.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report));if(report.status!=='passed')process.exitCode=1;
})().catch(error=>{report.status='harness error';report.error=error.stack;fs.writeFileSync(base+'.json',JSON.stringify(report,null,2)+'\n');console.error(error.stack);process.exitCode=1;}).finally(async()=>{
  if(browser)await browser.close();if(server)await new Promise(resolve=>server.close(resolve));
});
