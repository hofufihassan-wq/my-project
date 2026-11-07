// Reproduce route -> organizer mismatches by native UI clicks; never patch app state.
const fs = require('fs'), path = require('path'), http = require('http');
const {chromium} = require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const website = path.resolve(process.argv[2]);
let server, browser;
(async () => {
  server = http.createServer((req, res) => {
    let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (name.endsWith('/')) name += 'index.html';
    const file = path.resolve(website, '.' + name);
    if (!file.startsWith(website + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404); res.end(); return;
    }
    res.setHeader('Content-Type', ({'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml'})[path.extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  browser = await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  const context = await browser.newContext({viewport:{width:1440,height:1000}});
  const external = [];
  await context.route('**/*', route => {
    if (new URL(route.request().url()).origin !== origin) {external.push(route.request().url()); return route.abort();}
    return route.continue();
  });
  const page = await context.newPage();
  await page.goto(origin, {waitUntil:'networkidle'});
  await page.locator('.main-nav').getByRole('button',{name:'المشاريع',exact:true}).click();
  const observations = [];
  for (const item of [
    {id:'projects',label:'المشاريع',field:'project-title'},
    {id:'kanban',label:'لوحة المهام',field:'task-title'},
    {id:'notes',label:'الملاحظات',field:'note-title'},
    {id:'calendar',label:'التقويم',field:'event-title'}
  ]) {
    await page.getByRole('navigation',{name:'أقسام التنظيم'}).getByRole('button',{name:item.label,exact:true}).click();
    const organizer = page.getByTestId('learning-organizer');
    const observed = {
      route:item.id,
      pageHeading:await page.locator('.foundation-page>.page-heading h2').innerText(),
      selectedTab:await page.locator('.foundation-tabs button[aria-current="page"]').innerText(),
      expectedMode:item.id,
      observedMode:await organizer.getAttribute('data-mode'),
      organizerHeading:await organizer.locator('.vlp-organizer-heading h2').innerText(),
      expectedField:item.field,
      expectedFieldVisible:await page.getByTestId(item.field).isVisible(),
      taskFieldVisible:await page.getByTestId('task-title').isVisible(),
      kanbanLayoutVisible:await page.locator('.vlp-kanban').isVisible(),
      foundationSectionExposed:await page.evaluate(() => Object.hasOwn(window.vueLexiconApp.$.setupState, 'foundationSection')),
      activeFoundation:await page.evaluate(() => window.vueLexiconApp.activeFoundation.id),
      screenshot:'organizer-route-' + item.id + '.png'
    };
    if (observed.pageHeading !== item.label || observed.activeFoundation !== item.id) throw new Error('Native navigation failed for '+item.id);
    if (observed.observedMode !== 'tasks' || observed.foundationSectionExposed) throw new Error('Original bug no longer reproduces; review source version');
    await page.screenshot({path:path.join(__dirname, observed.screenshot)});
    observations.push(observed);
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(website,'..','STATIC_PACKAGE_MANIFEST.json'),'utf8'));
  const report = {sourceCommit:manifest.source_commit,sourceWebsite:website,checkedUtc:new Date().toISOString(),
    status:'bug reproduced on four native UI routes',externalRequests:external,observations};
  fs.writeFileSync(path.join(__dirname,'organizer-binding-results.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report));
})().catch(error=>{console.error(error.stack);process.exitCode=1;}).finally(async()=>{
  if(browser) await browser.close();
  if(server) await new Promise(resolve=>server.close(resolve));
});
