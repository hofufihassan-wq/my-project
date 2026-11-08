/* Capture and check the actual UI using isolated, explicitly synthetic fixtures. */
const { parseArgs } = require('node:util');
const { values } = parseArgs({ options: {
  root: { type: 'string' }, output: { type: 'string' }, stage: { type: 'string', default: 'after' },
  check: { type: 'boolean', default: false }
} });
process.env.VLP_ROOT = values.root || require('node:path').resolve(__dirname, '..');
const { fs, path, assert, chromium, server } = require('./simulator-completion-test-helpers.cjs');
const output = path.resolve(values.output || 'emerald-review');
fs.mkdirSync(output, { recursive: true });
const host = server();
const results = [], errors = [];
let browser;

async function seed(page) {
  await page.evaluate(() => {
    const store = window.VLexLearningStore;
    const now = new Date(), stamp = now.toISOString();
    const today = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
    const lessonIds = window.VLexCourse.lessons.map(lesson => lesson.id);
    store.setSection('projects', [{ id: 'qa-project', title: 'مساحتي الأولى على الويب', description: 'بيانات معاينة معزولة', archived: false, createdAt: stamp, updatedAt: stamp }]);
    store.setSection('tasks', [
      { id: 'qa-1', title: 'أجرّب Grid وأقارن توزيع البطاقات', status: 'doing', due: today, projectId: 'qa-project', archived: false, createdAt: stamp, updatedAt: stamp },
      { id: 'qa-2', title: 'أراجع التفاعلية في Vue', status: 'todo', due: today, projectId: '', archived: false, createdAt: stamp, updatedAt: stamp },
      { id: 'qa-3', title: 'أبني هيكل صفحتي الأولى', status: 'done', due: today, projectId: 'qa-project', archived: false, createdAt: stamp, updatedAt: stamp }
    ]);
    store.setSection('events', [
      { id: 'qa-e1', title: 'جلسة تطبيق: من الفكرة إلى الصفحة', date: today, time: '18:30', notes: '', archived: false, createdAt: stamp, updatedAt: stamp },
      { id: 'qa-e2', title: 'مراجعة مفاهيم JavaScript', date: today, time: '20:00', notes: '', archived: false, createdAt: stamp, updatedAt: stamp }
    ]);
    const completed = lessonIds.filter((_, i) => i % 4 === 0).slice(0, 8);
    store.setSection('course', { ...store.getSection('course', {}), completed,
      reviews: { [lessonIds[0]]: { due: new Date(now.getTime()-3600000).toISOString(), intervalDays: 1 },
        [lessonIds[4]]: { due: new Date(now.getTime()-3600000).toISOString(), intervalDays: 1 } } });
    const app = window.vueLexiconApp;
    for (const term of app.rawLexiconData.slice(0, 3)) app.selectTerm(term);
    app.setAppMode('home');
  });
}

async function check(name, fn) {
  try { await fn(); results.push({ name, passed: true }); console.log('PASS', name); }
  catch (error) { results.push({ name, passed: false, error: error.stack }); console.error('FAIL', name, error.message); }
}

(async () => {
  await new Promise(resolve => host.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + host.address().port;
  browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  for (const theme of ['green', 'glass']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1060 }, reducedMotion: 'reduce', timezoneId: 'Asia/Riyadh' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(origin, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.vueLexiconApp);
    await page.evaluate(theme => window.vueLexiconApp.setTheme(theme), theme);
    await seed(page);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [1440, 1024, 768, 390, ...(values.check ? [360] : [])]) {
      await page.setViewportSize({ width, height: width < 800 ? 1000 : 1060 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(350);
      await page.screenshot({ path: path.join(output, `${values.stage}-${theme}-${width}.png`), fullPage: true });
      if (width === 1440) await page.screenshot({ path: path.join(output, `${values.stage}-${theme}-desktop.png`) });
      if (values.check) await check(`${theme} ${width}px has no clipped page or unreadable horizontal layout`, async () => {
        const size = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }));
        assert(size.scroll <= size.viewport + 1, JSON.stringify(size));
        const dashboard = page.getByTestId('learning-daily-dashboard');
        assert(await dashboard.isVisible());
        assert(await page.getByTestId('dashboard-task-title').isVisible());
      });
    }
    await page.setViewportSize({ width: 1440, height: 1060 });
    if (values.check) {
      await check(`${theme} chart uses actual reviewed lessons and ignores duplicate or unknown identifiers`, async () => {
        assert.equal((await page.locator('.vlp-course-ring strong').innerText()).replace(/\s/g, ''), '25%');
        assert.equal(await page.locator('.vlp-progress-column').count(), 4);
        const before = await page.evaluate(() => VLexLearningStore.getSection('course', {}));
        await page.evaluate(() => { const course=VLexLearningStore.getSection('course', {});
          VLexLearningStore.setSection('course', {...course, completed:[...course.completed, course.completed[0], 'unknown-fixture-id']}); });
        assert.equal((await page.locator('.vlp-course-ring strong').innerText()).replace(/\s/g, ''), '25%');
        await page.evaluate(course => VLexLearningStore.setSection('course', course), before);
      });
      await check(`${theme} secondary dictionary and practice sections remain accessible by keyboard`, async () => {
        const library = page.getByTestId('dashboard-library');
        await library.locator('summary').focus();
        await library.locator('summary').press('Enter');
        assert(await library.evaluate(element => element.open));
        assert.equal(await library.locator('.track-row').count(), 5);
        assert.equal(await library.locator('.stat-card').count(), 4);
        assert(await library.locator('.mastery-panel').isVisible());
        await page.screenshot({path:path.join(output, `${values.stage}-${theme}-expanded.png`), fullPage:true});
        await library.locator('summary').press('Enter');
      });
      await check(`${theme} reduced-motion disables entrance animation`, async () => {
        assert.equal(await page.locator('.vlp-mini-stats article').first().evaluate(element => getComputedStyle(element).animationName), 'none');
      });
      await check(`${theme} frost-card text has at least 4.5:1 contrast over the darkest canvas`, async () => {
        const readings=await page.evaluate(()=>{
          const style=getComputedStyle(document.getElementById('app'));
          const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d');
          const rgba=value=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=value;ctx.fillRect(0,0,1,1);return Array.from(ctx.getImageData(0,0,1,1).data);};
          const base=rgba(style.getPropertyValue('--canvas')),surface=rgba(style.getPropertyValue('--dash-card-soft'));
          const background=surface.slice(0,3).map((v,i)=>v*surface[3]/255+base[i]*(1-surface[3]/255));
          const light=values=>values.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
          return ['--dash-ink','--dash-muted','--dash-accent'].map(name=>{const a=light(background),b=light(rgba(style.getPropertyValue(name)));return {name,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};});
        });
        assert(readings.every(value=>value.ratio>=4.5), JSON.stringify(readings));
      });
      await check(`${theme} persisted theme keeps every task and course record on reload`, async () => {
        const before = await page.evaluate(() => VLexLearningStore.read());
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForFunction(theme => window.vueLexiconApp?.theme === theme, theme);
        assert.deepEqual(await page.evaluate(() => VLexLearningStore.read()), before);
      });
      await check(`${theme} daily task form and keyboard submit retain existing behavior`, async () => {
        await page.getByTestId('dashboard-task-title').fill('مهمة للتحقق من الحفظ');
        await page.getByTestId('dashboard-task-title').press('Enter');
        assert(await page.evaluate(() => VLexLearningStore.read().tasks.some(task => task.title === 'مهمة للتحقق من الحفظ')));
        await page.locator('.vlp-task-toggle').filter({ hasText: 'مهمة للتحقق من الحفظ' }).locator('input').check();
        assert.equal(await page.evaluate(() => VLexLearningStore.read().tasks.find(task => task.title === 'مهمة للتحقق من الحفظ').status), 'done');
      });
      await check(`${theme} all five theme identifiers remain selectable`, async () => {
        for (const id of ['petroleum', 'light', 'purple', 'green', 'glass']) {
          await page.evaluate(id => window.vueLexiconApp.setTheme(id), id);
          assert.equal(await page.locator('#app').getAttribute('data-theme'), id);
        }
      });
      await check(`${theme} new project shortcut uses the existing organizer route`, async () => {
        await page.locator('.vlp-stat-action').filter({hasText:'افتح المشاريع'}).click();
        assert.equal(await page.evaluate(() => window.vueLexiconApp.foundationSection), 'projects');
        assert.equal(await page.evaluate(() => window.vueLexiconApp.appMode), 'foundation');
      });
    }
    await context.close();
  }
  if (values.check) {
    const context=await browser.newContext({viewport:{width:1440,height:1060},reducedMotion:'reduce'});
    const page=await context.newPage();
    await page.goto(origin,{waitUntil:'networkidle'});
    await check('first-use dashboard remains genuinely empty without seeded records', async()=>{
      await page.waitForFunction(()=>window.vueLexiconApp);
      assert.deepEqual(await page.evaluate(()=>VLexLearningStore.read().tasks),[]);
      assert.equal((await page.locator('.vlp-course-ring strong').innerText()).replace(/\s/g,''),'0%');
      assert.equal(await page.locator('.vlp-record-list li').count(),0);
      await page.evaluate(()=>window.vueLexiconApp.setTheme('green'));
      await page.screenshot({path:path.join(output,`${values.stage}-empty.png`),fullPage:true});
    });
    await context.close();
    const motionContext=await browser.newContext({viewport:{width:1440,height:1060},reducedMotion:'no-preference'});
    const motionPage=await motionContext.newPage();
    await motionPage.goto(origin,{waitUntil:'networkidle'});
    await motionPage.evaluate(()=>document.fonts.ready);
    await check('normal motion plays once on real navigation and does not change page height', async()=>{
      await motionPage.evaluate(async()=>{
        const app=window.vueLexiconApp;app.setAppMode('settings');await Vue.nextTick();
        app.setAppMode('home');await Vue.nextTick();
      });
      const first=await motionPage.locator('.vlp-mini-stats article').first().evaluate(element=>({
        opacity:Number(getComputedStyle(element).opacity),animation:getComputedStyle(element).animationName,
        iterations:getComputedStyle(element).animationIterationCount,height:document.documentElement.scrollHeight
      }));
      assert.equal(first.animation,'emerald-arrive');assert.equal(first.iterations,'1');assert(first.opacity<1);
      await motionPage.waitForTimeout(600);
      const last=await motionPage.locator('.vlp-mini-stats article').first().evaluate(element=>({opacity:Number(getComputedStyle(element).opacity),height:document.documentElement.scrollHeight}));
      assert.equal(last.opacity,1);assert.equal(last.height,first.height);
    });
    await motionContext.close();
  }
  if (values.check) await check('no uncaught application errors', async () => assert.deepEqual(errors, []));
})().catch(error => { results.push({ name: 'runner', passed: false, error: error.stack }); console.error(error); }).finally(async () => {
  if (browser) await browser.close(); host.close();
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ stage: values.stage,
    fixture: 'Synthetic demonstration data in new isolated browser contexts only; no product or user data is seeded.',
    passed: results.filter(result => result.passed).length, total: results.length, errors, results }, null, 2));
  if (results.some(result => !result.passed)) process.exitCode = 1;
});
