/* Real local Vue + official SFC compiler in Chromium. No library substitutions. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const http = require('node:http');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/codex/cua_node/lib/node_modules/playwright-core');
const results = [];
const output = process.env.VLP_TEST_OUTPUT || 'sfc-preview-artifacts';
const data = {window:{}};
vm.runInNewContext(fs.readFileSync('practice-curriculum.js', 'utf8'), data);
const seed = Object.fromEntries(data.window.PRACTICE_CURRICULUM.lessons.map(l => [l.id, {
  status:'unlocked', codeDraft:l.track==='vue'?null:`<p id="card">محفوظ ${l.id}</p>`
}]));
const server = http.createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname.startsWith('/nested/app/')) pathname = pathname.slice('/nested/app'.length);
  if (pathname.endsWith('/')) pathname += 'index.html';
  const file = path.resolve(__dirname, '.' + pathname);
  if (!file.startsWith(__dirname + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type', ({'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2'})[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
let browser;
const sfc = `<script setup>
import { ref, computed } from 'vue';
const count = ref(0); const visible = ref(true);
const doubled = computed(() => count.value * 2); const items = ref(['أ','ب']);
const literal = 'import { imaginary } from "missing"';
globalThis.__vlxPreviewExecutionSentinel = 'opaque-preview-only';
</script>
<template><button id="increment" @click="count++">{{ count }} / {{ doubled }}</button>
<button id="toggle" @click="visible=!visible">إظهار</button><ul v-if="visible"><li v-for="item in items" :key="item">{{item}}</li></ul>
<p class="scoped-text">{{literal}}</p></template>
<style scoped>.scoped-text {color:rgb(255, 0, 0)}</style>`;

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({executablePath:process.env.CHROME_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  for (const prefix of ['/', '/nested/app/']) {
    const context = await browser.newContext({acceptDownloads:true,reducedMotion:'reduce'});
    const external = [], errors = [], failures = [];
    await context.route('**/*', route => {
      const u = new URL(route.request().url());
      if (u.origin === origin || ['blob:','about:','data:'].includes(u.protocol)) return route.continue();
      external.push(u.href); return route.abort('blockedbyclient');
    });
    await context.addInitScript(seed => {
      if (window !== window.top) return; // The opaque preview has no storage access.
      if (!sessionStorage.getItem('sfc-seeded')) {
        localStorage.setItem('vuelexicon_practice_progress', JSON.stringify(seed));
        sessionStorage.setItem('sfc-seeded', 'yes');
      }
    }, seed);
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('requestfailed', req => failures.push({url:req.url(),reason:req.failure()?.errorText}));
    page.on('response', res => {if(res.status()>=400)failures.push({url:res.url(),status:res.status()});});
    await page.goto(origin+prefix, {waitUntil:'networkidle'});
    await page.waitForFunction(() => window.vueLexiconApp?.rawLexiconData.length===180);
    const app = (fn,arg) => page.evaluate(({source,arg}) => (new Function('a','arg',`return (${source})(a,arg)`))(window.vueLexiconApp,arg),{source:fn.toString(),arg});
    const storage = () => page.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k)])));
    async function test(name, fn) {
      try {await fn();results.push({name:prefix+' '+name,passed:true});console.log('PASS',prefix,name);}
      catch(error){results.push({name:prefix+' '+name,passed:false,error:error.message});console.error('FAIL',prefix,name,error.message);}
    }
    async function show(code, type='vue') {
      await app((a,{code,type})=>{
        a.setCodeFormat(type==='vue'?'vue':'vanilla');
        a.sendTermToScratchpad({term:'مرجع اختبار', category:type==='vue'?'vue':type==='javascript'?'js':type,
          vueSfcCode:type==='vue'?code:'',vanillaCode:type==='vue'?'':code});
      },{code,type});
      await page.waitForFunction(()=>['preview_ready','error'].includes(window.vueLexiconApp.executionState));
      return page.locator('iframe').contentFrame();
    }
    const initialLearning = await page.evaluate(()=>window.VLexLearningStore.read());
    // A1 deliberately persists the selected simulator lesson when opening a
    // reference. Permit exactly that declared navigation write; retain exact
    // checks for all other learning data, legacy drafts, nulls and recovery keys.
    async function assertReferenceStorageUnchanged(before) {
      const actual=await storage(), expected={...before}, key='vlex_personal_learning_v1';
      const learning=expected[key]?JSON.parse(expected[key]):structuredClone(initialLearning);
      learning.navigation={...learning.navigation,simulatorLesson:'VUE-101'};
      assert.deepEqual(JSON.parse(actual[key]),learning);
      delete actual[key];delete expected[key];assert.deepEqual(actual,expected);
    }
    const pristine = await storage();
    await test('script setup, named imports, ref, computed, events, v-if/v-for and scoped CSS actually run', async()=>{
      const frame = await show(sfc);
      assert.equal(await app(a=>a.executionState),'preview_ready');
      assert.equal(await frame.locator('#increment').textContent(),'0 / 0');
      await frame.locator('#increment').evaluate(button=>button.click());
      await frame.locator('#increment').filter({hasText:'1 / 2'}).waitFor();
      assert.equal(await frame.locator('li').count(),2);
      await frame.locator('#toggle').evaluate(button=>button.click());
      await frame.locator('li').first().waitFor({state:'detached'});
      assert.equal(await frame.locator('.scoped-text').evaluate(el=>getComputedStyle(el).color),'rgb(255, 0, 0)');
      assert.equal(await frame.locator('.scoped-text').getAttribute('data-v-lexicon-preview'),'');
      assert.notEqual(await frame.locator('body').evaluate(()=>{const p=document.createElement('p');p.className='scoped-text';document.body.append(p);return getComputedStyle(p).color;}),'rgb(255, 0, 0)');
      // The learning lab loads this trusted parser for AST analysis in the parent.
      // User SFC execution must still occur only in the opaque preview realm.
      assert.equal(await page.evaluate(()=>typeof window.VueLexiconCompiler?.babelParse),'function');
      assert.equal(await page.evaluate(()=>typeof window.__vlxPreviewExecutionSentinel),'undefined');
      assert.equal(await frame.locator('body').evaluate(()=>globalThis.__vlxPreviewExecutionSentinel),'opaque-preview-only');
      assert.equal(await page.locator('iframe').getAttribute('sandbox'),'allow-scripts');
      assert.equal(await frame.locator('body').evaluate(()=>{try{parent.localStorage.getItem('x');return false;}catch(_){return true;}}),true);
      assert.equal(await app(a=>a.simulatorReferenceCode),sfc);
      await assertReferenceStorageUnchanged(pristine); // Includes original null drafts.
    });
    await test('export default Options API, namespace/aliased imports and style v-bind',async()=>{
      let frame=await show(`<template><button @click="count++">{{count}}</button><span>{{then()}}</span></template><script>import * as V from 'vue'; import { ref as makeRef } from 'vue'; export const extra=7; export default {setup(){return {count:makeRef(3),then:()=> 'ordinary method' }}}</script>`);
      assert.equal(await app(a=>a.executionState),'preview_ready');
      assert.equal(await frame.locator('button').textContent(),'3');
      assert.equal(await frame.locator('#vuelexicon-example span').textContent(),'ordinary method');
      await frame.locator('button').evaluate(b=>b.click());
      await frame.getByRole('button',{name:'4',exact:true}).waitFor();
      frame=await show(`<script setup>import {ref} from 'vue';const color=ref('rgb(0, 255, 0)')</script><template><p>لون</p></template><style scoped>p { color:v-bind(color) }</style>`);
      assert.equal(await app(a=>a.executionState),'preview_ready');
      assert.equal(await frame.locator('#vuelexicon-example p').evaluate(p=>getComputedStyle(p).color),'rgb(0, 255, 0)');
    });
    await test('selected HTML tab runs HTML and events instead of the term’s SFC',async()=>{
      await app(a=>{a.setCodeFormat('vanilla');a.sendTermToScratchpad({term:'HTML',category:'html',vueSfcCode:'<template>WRONG TAB</template>',vanillaCode:'<button id="html-button" onclick="this.textContent=\'نقر\'">HTML</button>'});});
      const frame=page.locator('iframe').contentFrame();
      await frame.locator('#html-button').waitFor();
      await frame.locator('#html-button').evaluate(b=>b.click());
      assert.equal(await frame.locator('#html-button').textContent(),'نقر');
      assert.equal(await frame.locator('body').evaluate(()=>typeof VueLexiconCompiler),'undefined');
    });
    await test('CSS tab loads CSS on a clearly described sample',async()=>{
      const frame=await show('.preview-sample {color:rgb(0, 255, 0)}','css');
      assert.equal(await frame.locator('.preview-sample').evaluate(e=>getComputedStyle(e).color),'rgb(0, 255, 0)');
      assert.match(await frame.locator('body').textContent(),/عناصر تجريبية/);
    });
    await test('JavaScript, Vue-only module import/export, circular and BigInt logging work',async()=>{
      await show(`import {ref} from 'vue'; export const n=ref(9); const obj={};obj.self=obj; console.log('JS_RESULT',n.value,obj,7n);`,'javascript');
      await page.waitForFunction(()=>window.vueLexiconApp.practiceLogs.some(l=>l.msg.includes('JS_RESULT')));
      const log=await app(a=>a.practiceLogs.find(l=>l.msg.includes('JS_RESULT')).msg);
      assert.match(log,/9/);assert.match(log,/Circular/);assert.match(log,/7n/);
    });
    await test('script-tag text inside JavaScript remains text; an empty chosen tab has a clear message',async()=>{
      const code=`const text='</script><script>throw new Error("escaped_source_executed")</script>';console.log('SAFE_TEXT',text);`;
      await show(code,'javascript');
      assert.equal(await app(a=>a.executionState),'preview_ready');
      assert((await app(a=>a.practiceLogs.find(l=>l.msg.startsWith('SAFE_TEXT')).msg)).includes('escaped_source_executed'));
      const frame=await show('','javascript');
      assert.equal(await app(a=>a.executionState),'error');
      assert.match(await frame.getByRole('alert').textContent(),/لا يحتوي التبويب المختار/);
    });
    await test('the unchanged real ref() term runs with its legacy escaped closing tag',async()=>{
      await app(a=>{a.setCodeFormat('vue');a.sendTermToScratchpad(a.rawLexiconData.find(t=>t.term==='ref()'));});
      await page.waitForFunction(()=>['preview_ready','error'].includes(window.vueLexiconApp.executionState));
      assert.equal(await app(a=>a.executionState),'preview_ready');
      const frame=page.locator('iframe').contentFrame();
      await frame.getByRole('button',{name:'العدد: 0'}).evaluate(b=>b.click());
      await frame.getByRole('button',{name:'العدد: 1'}).waitFor();
      assert((await app(a=>a.simulatorReferenceCode)).includes('<\\/script>'));
    });
    const rejected = [
      ['external module',`<template><p>bad</p></template><script setup>import {z} from 'zod';console.log('MUST_NOT_EXECUTE')</script>`,/غير متوفر محليًا/],
      ['relative file',`<template>bad</template><script setup>import Child from './Child.vue'</script>`,/غير متوفر محليًا/],
      ['dynamic import',`<template>bad</template><script setup>const load=()=>import('https://example.com/x.js')</script>`,/الاستيراد الديناميكي/],
      ['TypeScript',`<template>bad</template><script setup lang="ts">const n:number=1</script>`,/TypeScript/],
      ['external SFC block',`<template src="./View.html"></template>`,/src الخارجية/],
      ['custom block',`<template>bad</template><i18n>{}</i18n>`,/المخصصة/],
      ['CSS Modules',`<template>bad</template><style module>.a{color:red}</style>`,/CSS Modules/],
      ['empty CSS Modules attribute',`<template>bad</template><style module="">.a{color:red}</style>`,/CSS Modules/],
      ['CSS preprocessor',`<template>bad</template><style lang="scss">$color:red;</style>`,/Sass/],
      ['top-level await',`<template>bad</template><script setup>await Promise.resolve()</script>`,/Suspense/],
      ['Options API async setup',`<template>bad</template><script>export default {async setup(){return {}}}</script>`,/Suspense/],
      ['setup returning a Promise',`<template>bad</template><script>export default {setup(){return Promise.resolve({})}}</script>`,/Suspense/],
      ['unknown Nuxt component',`<template><UAlert title="غير متوفر"/></template>`,/المكوّن.*غير متوفر/],
      ['missing template data',`<template><p>{{missing}}</p></template>`,/غير معرّف/],
      ['malformed script',`<template>bad</template><script setup>const = ???</script>`,/JavaScript غير صالحة/],
      ['external CSS import',`<template>bad</template><style>@import "https://example.com/a.css";</style>`,/CSS خارجي/],
      ['case-insensitive external CSS import',`<template>bad</template><style>@IMPORT "https://example.com/a.css";</style>`,/CSS خارجي/],
      ['escaped closer inside a JS string', '<template><p>{{text}}</p></template><script setup>const text=`first\n<\\/script>\nlast`;\n<\\/script>',null]
    ];
    for(const [name,code,message] of rejected) await test(name+(message?' shows an Arabic diagnostic without running unsupported code':' preserves the string when fixing only the real legacy closer'),async()=>{
      const before=await storage();const frame=await show(code);
      if(message){
        assert.equal(await app(a=>a.executionState),'error');
        assert.match(await frame.getByRole('alert').textContent(),message);
        await page.waitForTimeout(150);
        assert.equal(await app(a=>a.executionState),'error');
        assert.equal(await app(a=>a.activeRun.previewReady),false);
      } else {
        assert.equal(await app(a=>a.executionState),'preview_ready');
        // JavaScript itself interprets \/ as /. The parser must not treat the
        // escaped tag inside the template literal as the SFC closing tag.
        assert.equal(await frame.locator('#vuelexicon-example p').textContent(),'first\n</script>\nlast');
      }
      await assertReferenceStorageUnchanged(before);
      assert.equal(await app(a=>a.simulatorReferenceCode),code);
      assert(!await app(a=>a.practiceLogs.some(l=>l.msg==='MUST_NOT_EXECUTE')));
    });
    await test('runtime error stays an error after DOM readiness',async()=>{
      const frame=await show('<template><p>bad</p></template><script setup>throw new Error("intentional dictionary error")</script>');
      assert.equal(await app(a=>a.executionState),'error');
      assert.match(await frame.getByRole('alert').textContent(),/intentional dictionary error/);
      await page.waitForTimeout(150);
      assert.equal(await app(a=>a.executionState),'error');
    });
    await test('new reference clears evidence; stop destroys timers and rejects stale messages',async()=>{
      await show(`<template><p>timer</p></template><script setup>setInterval(()=>console.log('OLD_SFC_TICK'),30)</script>`);
      await page.waitForFunction(()=>window.vueLexiconApp.practiceLogs.some(l=>l.msg==='OLD_SFC_TICK'));
      const old=await app(a=>({runId:a.activeRun.runId,lessonId:a.activeRun.lessonId}));
      await app(a=>a.stopPracticeExecution());
      await page.waitForTimeout(150);
      assert(!await app(a=>a.practiceLogs.some(l=>l.msg==='OLD_SFC_TICK')));
      await app(a=>a.runSimulatorReference());
      await page.waitForFunction(()=>window.vueLexiconApp.executionState==='preview_ready');
      await page.locator('iframe').contentFrame().locator('body').evaluate((_,old)=>parent.postMessage({source:'VUELEXICON_SANDBOX',...old,type:'DOM_SNAPSHOT',payload:{bodyText:'OLD_EVIDENCE',cardText:'',appViewText:'',cardsContainerCount:9,cardElementsCount:9}},'*'),old);
      await page.waitForTimeout(30);
      assert(!JSON.stringify(await app(a=>a.lastDomSnapshot)).includes('OLD_EVIDENCE'));
      await show('<template><p>NEW_REFERENCE</p></template>');
      assert(!await app(a=>a.practiceLogs.some(l=>l.msg==='OLD_SFC_TICK')));
    });
    await test('imported drafts never auto-run when opening a dictionary reference; export and saved nulls survive',async()=>{
      await app(a=>{a.selectLesson('JS-101');a.practiceAutoRun=true;a.toastMessage='';a.importUserData({target:{files:[new File([JSON.stringify({practiceProgress:{'JS-101':{status:'unlocked',codeDraft:'<script>console.log("IMPORTED_CODE_MUST_NOT_RUN")</script>'}}})],'import.json')],value:'import.json'}});});
      await page.waitForFunction(()=>window.vueLexiconApp.toastType==='success');
      assert.equal(await app(a=>a.activeRun),null);
      const before=await storage();
      const draft=await app(a=>a.practiceCode);
      await show('<template><p>Reference only</p></template><script setup>import {ref} from "vue";const n=ref(1)</script>');
      await page.waitForTimeout(400);
      assert.equal(await app(a=>a.activeRun.kind),'reference');
      assert(!await app(a=>a.practiceLogs.some(l=>l.msg==='IMPORTED_CODE_MUST_NOT_RUN')));
      await assertReferenceStorageUnchanged(before);
      await app(a=>{a.practiceAutoRun=false;a.selectLesson('JS-101');});
      assert.equal(await app(a=>a.practiceCode),draft);
      const download=page.waitForEvent('download');
      await app(a=>a.exportUserData());
      const file=await download;const exported=JSON.parse(fs.readFileSync(await file.path(),'utf8'));
      assert.equal(exported.practiceProgress['JS-101'].codeDraft,draft);
      assert.equal(exported.practiceProgress['VUE-101'].codeDraft,null);
    });
    await test('real core files work offline in this path, without request failures or uncaught exceptions',async()=>{
      assert.deepEqual(external,[]);assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
      assert.equal(await page.evaluate(()=>Vue.version),'3.4.21');
      assert.equal(await page.evaluate(()=>window.vueLexiconApp.rawLexiconData.length),180);
    });
    await context.close();
  }
  const passed=results.filter(r=>r.passed).length;
  fs.mkdirSync(output,{recursive:true});
  fs.writeFileSync(path.join(output, 'browser-report.json'),JSON.stringify({timestamp:new Date().toISOString(),runtime:'Real Chromium, local Vue 3.4.21 and official compiler-sfc; root and nested/app; external requests blocked; no library substitutes',passed,total:results.length,results},null,2)+'\n');
  console.log(`${passed}/${results.length} dictionary preview checks passed`);
  if(passed!==results.length)process.exitCode=1;
}
main().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();server.close();});
