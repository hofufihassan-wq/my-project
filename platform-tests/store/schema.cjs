const assert=require('node:assert/strict');
const fs=require('node:fs');
const {createStore,validate,KEY}=require('../../learning-store.js');
const course=require('../../learning-course.js');
const css=require('../../learning-css-lab.js');
const results=[];
function test(name,fn){try{fn();results.push({name,passed:true});console.log('PASS',name)}catch(e){results.push({name,passed:false,error:e.stack});console.error('FAIL',name,e.message)}}
function memory(seed={}){const data={...seed};return{data,getItem:k=>data[k]??null,setItem:(k,v)=>data[k]=v,removeItem:k=>delete data[k]};}
const stamp='2026-11-04T12:30:00.000Z';
const task={id:'task-id',title:'مهمة',status:'todo',due:'2026-11-04',projectId:'project-id',createdAt:stamp,updatedAt:stamp,archived:false};
const envelope=state=>JSON.stringify({app:'V Lex Pro Learning',version:1,exportedAt:stamp,state});
function rejects(section,values){for(const value of values)assert.throws(()=>validate({version:1,[section]:value}),undefined,section+': '+JSON.stringify(value));}
test('actual component schemas survive backup roundtrip without dropping fields',()=>{
 const m=memory(),a=createStore(m),c=course.initialState(),id=course.lessons[0].id,stage=course.projectStages[0].id;
 c.completed=[id];c.answers[id]={choice:0,correct:true,attempts:1,lastAt:stamp};c.reviews[id]={due:stamp,intervalDays:1};c.drafts[id]='<h1>تجربة</h1>';c.projectChecks[stage]=[0,3];c.history=[{id,choice:0,correct:true,at:stamp}];
 const sections={tasks:[task],events:[{id:'event-id',title:'موعد',date:'2026-11-05',time:'18:30',notes:'شرح',createdAt:stamp}],notes:[{id:'note-id',title:'ملاحظة',body:'سطر\nآخر',archived:false}],projects:[{id:'project-id',title:'مشروع',description:'وصف'}],course:c,cssLab:{version:1,html:'<main id="lab-target"></main>',css:'p{}',controls:css.defaults(),autoRun:false},jsLab:{source:'const a=1;'},explainer:{source:'<p>أهلًا</p>',language:'html'},preferences:{theme:'green'}};
 for(const[section,value]of Object.entries(sections))assert(a.setSection(section,value),section);
 const before=a.read();assert(a.importData(a.exportData()));assert.deepEqual(a.read(),before);assert.equal(m.data[KEY],JSON.stringify(before));
});
test('older partial sections retain defaults and no feature requires new metadata',()=>{
 const result=validate({version:1,tasks:[{id:'a',title:'A',status:'todo'}],notes:[{id:'n',title:'N'}],course:{completed:['html-structure']},cssLab:{css:'p{}'},jsLab:{},explainer:{}});
 assert.deepEqual(result.course.answers,{});assert.deepEqual(result.course.reviews,{});assert.deepEqual(result.course.drafts,{});assert.equal(result.notes[0].body,undefined);assert.equal(result.tasks[0].createdAt,undefined);
});
test('falsy and object organizer strings cannot bypass validation',()=>{
 rejects('notes',[{id:'n',title:'N',body:{}}].map(n=>[n]));
 for(const body of[null,0,false,[],{}])rejects('notes',[[{id:'n',title:'N',body}]]);
 for(const projectId of[null,false,3,{},[]])rejects('tasks',[[{...task,projectId}]]);
 rejects('projects',[[{id:'p',title:'P',description:{}}]]);rejects('events',[[{id:'e',title:'E',date:'2026-11-04',notes:[]}]]);
});
test('organizer impossible dates times and typed timestamp fields are rejected',()=>{
 for(const due of[null,0,false,{},[],'2026-02-31','2025-02-29','2026-13-01'])rejects('tasks',[[{...task,due}]]);
 for(const time of[null,false,0,{},'25:00','12:70'])rejects('events',[[{id:'e',title:'E',date:'2026-11-04',time}]]);
 for(const createdAt of[{},null,42,'nonsense','2026-02-31T10:00:00.000Z'])rejects('tasks',[[{...task,createdAt}]]);
 assert.equal(validate({version:1,tasks:[{...task,due:'2024-02-29'}]}).tasks[0].due,'2024-02-29');
});
test('course maps refuse arrays null and primitive containers',()=>{
 for(const field of['answers','reviews','drafts','projectChecks'])for(const value of[null,[],false,2,'x'])rejects('course',[{[field]:value}]);
});
test('course answer records are checked without assuming lesson ids',()=>{
 const answer={choice:0,correct:false,attempts:1,lastAt:stamp};
 for(const bad of[null,[],false,{...answer,choice:'0'},{...answer,choice:3},{...answer,correct:'false'},{...answer,attempts:0},{...answer,lastAt:'not-a-date'}])rejects('course',[{answers:{'future-safe-id':bad}}]);
 assert.equal(validate({version:1,course:{answers:{'future-safe-id':answer}}}).course.answers['future-safe-id'].choice,0);
});
test('review entries check calendar timestamps and finite interval bounds',()=>{
 for(const bad of[null,[],false,{due:stamp,intervalDays:'1'},{due:stamp,intervalDays:-1},{due:'2026-02-31T00:00:00Z',intervalDays:1}])rejects('course',[{reviews:{id:bad}}]);
});
test('course drafts project checklists and history reject malformed entries',()=>{
 rejects('course',[{drafts:{id:{}}},{drafts:{id:null}},{drafts:{id:'a'.repeat(65537)}},{projectChecks:{id:0}},{projectChecks:{id:[4]}},{projectChecks:{id:['1']}},{history:{}},{history:[null]},{history:[{id:'id',choice:0,correct:'false',at:stamp}]}]);
});
test('editor source fields are exact strings and flags are real booleans',()=>{
 for(const value of[null,{},[],false,3]){rejects('cssLab',[{html:value},{css:value}]);rejects('jsLab',[{source:value}]);rejects('explainer',[{source:value}]);}
 rejects('cssLab',[{autoRun:'false'},{autoRun:0},{controls:[]}]);rejects('explainer',[{language:'nuxt'},{language:{}},{lang:{}}]);rejects('preferences',[{theme:false},{theme:{}}]);
});
test('CSS controls refuse invalid known property types and preserve optional controls',()=>{
 rejects('cssLab',[{controls:{...css.defaults(),gap:{value:'12',unit:'px'}}},{controls:{...css.defaults(),columns:0}},{controls:{...css.defaults(),background:{}}}]);
 assert.equal(validate({version:1,cssLab:{controls:{}}}).cssLab.controls.constructor,Object);
});
test('malformed backup rejection is atomic and creates no recovery side effects',()=>{
 const m=memory(),a=createStore(m);assert(a.setSection('jsLab',{source:'keep'}));const before=JSON.stringify(m.data),state=a.read();
 for(const bad of[{version:1,notes:[{id:'n',title:'N',body:{}}]},{version:1,course:{answers:[]}},{version:1,jsLab:{source:{}}}])assert.throws(()=>a.importData(envelope(bad)));
 assert.deepEqual(a.read(),state);assert.equal(JSON.stringify(m.data),before);assert.equal(a.status().mode,'ready');
});
test('invalid live edit cannot poison saving mode or erase the last valid draft',()=>{
 const m=memory(),a=createStore(m);assert(a.setSection('jsLab',{source:'first draft'}));const before=JSON.stringify(m.data),state=a.read();
 assert.equal(a.setSection('jsLab',{source:{invalid:true}}),false);assert.deepEqual(a.read(),state);assert.equal(JSON.stringify(m.data),before);assert.equal(a.status().mode,'ready');
 assert(a.setSection('jsLab',{source:'corrected draft'}));assert.equal(createStore(m).getSection('jsLab').source,'corrected draft');assert.equal(a.status().message,'');
});
test('rejected payload keeps protected and memory sessions in their existing modes',()=>{
 const broken='{broken',m=memory({[KEY]:broken}),a=createStore(m);assert.equal(a.setSection('jsLab',{source:[]}),false);assert.equal(a.status().mode,'protected');assert.equal(m.data[KEY],broken);
 const q=memory(),b=createStore(q);q.setItem=()=>{throw Error('quota')};assert.equal(b.setSection('jsLab',{source:'session only'}),false);assert.equal(b.status().mode,'memory');assert.equal(b.setSection('jsLab',{source:null}),false);assert.equal(b.status().mode,'memory');assert.equal(b.getSection('jsLab').source,'session only');
});
test('invalid stored shapes protect and preserve exact original on load',()=>{
 const original=JSON.stringify({version:1,notes:[{id:'n',title:'N',body:{}}]}),m=memory({[KEY]:original}),a=createStore(m);
 assert.equal(a.status().mode,'protected');assert.equal(m.data[KEY],original);assert(Object.entries(m.data).some(([k,v])=>k.startsWith('vlex_learning_recovery_')&&v===original));assert.deepEqual(a.getSection('notes'),[]);
});
test('harmless unknown optional metadata remains lossless while unsafe keys fail',()=>{
 const value={version:1,notes:[{id:'n',title:'N',body:'B',metadata:{tag:'future'}}],course:{futureFlag:true},cssLab:{customSetting:2}};
 const out=validate(value);assert.deepEqual(out.notes[0].metadata,{tag:'future'});assert.equal(out.course.futureFlag,true);assert.equal(out.cssLab.customSetting,2);
 assert.throws(()=>validate(JSON.parse('{"version":1,"course":{"drafts":{"constructor":"unsafe"}}}')));
});
test('near-limit saved data always fits its own importable backup envelope',()=>{
 const m=memory(),a=createStore(m),limit=2*1024*1024;const before=a.read(),baseBytes=Buffer.byteLength(JSON.stringify({...before,jsLab:{source:''}})),bareSource='x'.repeat(limit-baseBytes);
 assert.equal(a.setSection('jsLab',{source:bareSource}),false);assert.deepEqual(a.read(),before);assert.equal(a.status().mode,'ready');
 const envelopeOverhead=Buffer.byteLength(a.exportData())-Buffer.byteLength(JSON.stringify(before)),safeSource='x'.repeat(limit-baseBytes-envelopeOverhead);
 assert(a.setSection('jsLab',{source:safeSource}));const file=a.exportData();assert.equal(Buffer.byteLength(file),limit);assert.deepEqual(a.parseBackup(file),a.read());
 // Partial imported sections add defaults; their final envelope must fit too.
 assert.throws(()=>validate({version:1,jsLab:{source:bareSource}}));
});
const report={timestamp:new Date().toISOString(),passed:results.filter(r=>r.passed).length,total:results.length,results};
fs.writeFileSync(__dirname+'/schema-results.json',JSON.stringify(report,null,2));if(report.passed!==report.total)process.exitCode=1;
