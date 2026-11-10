const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const base=JSON.parse(fs.readFileSync(path.join(__dirname,'raw-tuples.json'))),sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../../lexicon-data.js'),'utf8'),sandbox);
const current=JSON.parse(JSON.stringify(sandbox.window.RAW_LEXICON_TUPLES)),changes=JSON.parse(fs.readFileSync(path.join(__dirname,'content-corrections.json')));
assert.equal(current.length,180);for(let i=0;i<base.length;i++)for(let j=0;j<base[i].length;j++){
 const isAllowed=changes.some(c=>c.term===base[i][1]&&(c.field===j||c.field==='14:codeBreakdown'&&j===14));
 if(!isAllowed)assert.deepEqual(current[i][j],base[i][j],`${base[i][1]} field ${j}`);
}
let browser;const results=[];
async function check(name,fn){try{await fn();results.push({name,passed:true});console.log('PASS',name);}catch(e){results.push({name,passed:false,error:e.stack});console.error('FAIL',name,e.message);}}
(async()=>{
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const page=await browser.newPage();
 await check('180 stable IDs, both 360 example sources and unrelated fields retained',async()=>{assert.equal(current.length,180);assert.deepEqual(current.map(t=>[t[0],t[1],t[5],t[11]]),base.map(t=>[t[0],t[1],t[5],t[11]]));});
 await check('structuredClone(function) rejects with DataCloneError; circular objects supported',async()=>assert.deepEqual(await page.evaluate(()=>{let a={};a.self=a;let err;try{structuredClone(()=>1)}catch(e){err=e.name}let b=structuredClone(a);return {error:err,circular:b.self===b}}),{error:'DataCloneError',circular:true}));
 await check('JSON.stringify is not universal: BigInt and cycles throw',async()=>assert.deepEqual(await page.evaluate(()=>{const a={};a.self=a;return [a,1n].map(x=>{try{JSON.stringify(x);return false}catch(e){return e.name}})}),['TypeError','TypeError']));
 await check('filter accepts truthy non-booleans and callback may mutate source objects',async()=>assert.deepEqual(await page.evaluate(()=>{let a=[{x:1}];let b=a.filter(v=>(v.x++, 'yes'));return {sameReference:a[0]===b[0],mutated:a[0].x,count:b.length}}),{sameReference:true,mutated:2,count:1}));
 await check('current Chromium WeakMap accepts a nonregistered Symbol key',async()=>assert.equal(await page.evaluate(()=>{const k=Symbol();return new WeakMap([[k,42]]).get(k)}),42));
 await check('relative date text is produced by Intl.RelativeTimeFormat',async()=>{const r=await page.evaluate(()=>({relative:new Intl.RelativeTimeFormat('ar').format(-5,'minute'),absolute:new Intl.DateTimeFormat('ar-SA').format(new Date('2026-10-31T00:00:00Z'))}));assert(r.relative.includes('٥')||r.relative.includes('5'));assert.notEqual(r.relative,r.absolute);});
 await page.addScriptTag({path:path.join(__dirname,'../../assets/vendor/vue-3.4.21.global.prod.js')});
 await check('Vue 3.4.21 renders a valid v-for without key',async()=>{const text=await page.evaluate(async()=>{document.body.innerHTML='<div id="audit-vue"></div>';Vue.createApp({template:'<p v-for="n in 3">{{n}}</p>'}).mount('#audit-vue');await Vue.nextTick();return document.querySelector('#audit-vue').textContent});assert.equal(text,'123');});
 fs.writeFileSync(path.join(__dirname,'content-regression-results.json'),JSON.stringify({timestamp:new Date().toISOString(),results},null,2));await browser.close();if(results.some(r=>!r.passed))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close()});
