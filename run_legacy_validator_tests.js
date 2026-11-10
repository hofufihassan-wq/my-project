/* Negative fixtures are deliberately not claimed to be browser executions. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync('practice-curriculum.js','utf8'),context);
vm.runInContext(fs.readFileSync('legacy-validator-guards.js','utf8'),context);
const lesson=id=>context.window.PRACTICE_CURRICULUM.lessons.find(l=>l.id===id);
const results=[];
function test(name,fn){try{fn();results.push({name,passed:true});console.log('PASS',name);}catch(e){results.push({name,passed:false,error:e.message});console.error('FAIL',name,e.message);}}
const empty={snapshot:{},getElementById:()=>null};
for(const id of ['JS-101','TS-101']){
  const l=lesson(id),bad=id==='JS-101'?"const userName='a';const welcomeMsg='b';":'// appTitle\nfunction formatAppDetails(){}';
  test(id+' rejects the documented false positive without DOM',()=>assert.equal(l.validator(bad,empty,[]).passed,false));
  test(id+' reference source alone cannot claim a rendered result',()=>assert.equal(l.validator(l.solution,empty,[]).passed,false));
  test(id+' ignores unrelated body text and wrong target text',()=>{
    const preview={snapshot:{bodyText:'VueLexicon Pro 3.6 سارة أهلاً بك في أولى خطواتك العملية مع لغة JavaScript الحديثة!',cardText:'wrong',outputText:'wrong'},getElementById:()=>null};
    assert.equal(l.validator(l.solution,preview,[]).passed,false);
  });
  test(id+' null/absent evidence is rejected without throwing',()=>{
    for(const preview of [null,{},empty])assert.equal(l.validator(l.solution,preview,[]).passed,false);
  });
  test(id+' valid isolated target text still accepts the reference fixture',()=>{
    const text=id==='JS-101'?'مرحباً بك، سارة! أهلاً بك في أولى خطواتك العملية مع لغة JavaScript الحديثة!':'VueLexicon Pro - v3.6 (نسخة مستقرة ✓)';
    const snapshot=id==='JS-101'?{cardText:text}:{outputText:text};
    assert.equal(l.validator(l.solution,{snapshot,getElementById:()=>null},[]).passed,true);
    assert.equal(l.validator(l.solution,{snapshot:{},getElementById:key=>key===(id==='JS-101'?'card':'output')?{textContent:text}:null},[]).passed,true);
  });
}
fs.mkdirSync('phase4-artifacts',{recursive:true});
fs.writeFileSync('phase4-artifacts/legacy-validator-report.json',JSON.stringify({timestamp:new Date().toISOString(),guardsLoaded:!!context.window.VueLexiconLegacyGuards,passed:results.filter(r=>r.passed).length,total:results.length,results},null,2)+'\n');
console.log(`${results.filter(r=>r.passed).length}/${results.length} legacy validator checks passed`);
if(results.some(r=>!r.passed))process.exitCode=1;
