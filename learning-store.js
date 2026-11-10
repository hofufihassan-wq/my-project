/* Additive local learning data. Legacy VueLexicon records are never migrated. */
(function(root){
'use strict';
const KEY='vlex_personal_learning_v1',LIMIT=2*1024*1024;
const sections=['tasks','events','notes','projects','course','preferences','cssLab','jsLab','explainer','guidedArrow','navigation','organizerDrafts','dictionary','simulatorLayout','guided'];
const clone=x=>JSON.parse(JSON.stringify(x));
const fresh=()=>({version:1,tasks:[],events:[],notes:[],projects:[],course:{completed:[],answers:{},reviews:{},drafts:{}},preferences:{theme:'petroleum'},cssLab:{},jsLab:{},explainer:{},guidedArrow:{},navigation:{},organizerDrafts:{},dictionary:{},simulatorLayout:{},guided:{}});
const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&(Object.getPrototypeOf(v)===Object.prototype||Object.getPrototypeOf(v)===null);
const own=(v,key)=>Object.hasOwn(v,key);
function fail(label){throw new Error('بيانات '+label+' غير صالحة')}
function string(v,label,max=LIMIT,empty=true){if(typeof v!=='string'||v.length>max||(!empty&&!v.trim()))fail(label)}
function optionalString(v,key,max=LIMIT){if(own(v,key))string(v[key],key,max)}
function calendarDate(v){
 if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;
 const parsed=new Date(v+'T00:00:00Z');return Number.isFinite(parsed.getTime())&&parsed.toISOString().slice(0,10)===v;
}
function timestamp(v){return typeof v==='string'&&v.length<=40&&/^\d{4}-\d\d-\d\dT([01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(Z|[+-]([01]\d|2[0-3]):[0-5]\d)$/.test(v)&&calendarDate(v.slice(0,10))&&Number.isFinite(Date.parse(v))}
function map(v,label,check){if(!record(v)||Object.keys(v).length>2000)fail(label);for(const[key,value]of Object.entries(v)){string(key,label,160,false);check(value,key)}}
function list(v,label,max,check){if(!Array.isArray(v)||v.length>max)fail(label);for(const item of v)check(item)}
function organizer(section,items){
 const ids=new Set();list(items,section,2000,item=>{
  if(!record(item))fail(section);string(item.id,'معرّف '+section,160,false);string(item.title,'عنوان '+section,500,false);if(ids.has(item.id))fail('معرّف مكرر');ids.add(item.id);
  if(own(item,'archived')&&typeof item.archived!=='boolean')fail('حالة الأرشفة');
  for(const key of ['body','description','notes','projectId'])optionalString(item,key);
  for(const key of ['due','date'])if(own(item,key)&&(typeof item[key]!=='string'||(item[key]!==''&&!calendarDate(item[key]))))fail('التاريخ');
  if(own(item,'time')&&(typeof item.time!=='string'||(item.time!==''&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(item.time))))fail('الوقت');
  for(const key of ['createdAt','updatedAt'])if(own(item,key)&&!timestamp(item[key]))fail(key);
  if(section==='tasks'&&!['todo','doing','done'].includes(item.status))fail('حالة المهمة');
 });
}
function answer(v){if(!record(v)||!Number.isInteger(v.choice)||v.choice<0||v.choice>2||typeof v.correct!=='boolean'||!Number.isSafeInteger(v.attempts)||v.attempts<1||!timestamp(v.lastAt))fail('إجابة الدرس')}
function course(v){
 if(own(v,'ui')){const u=v.ui;if(!record(u)||Object.keys(u).some(k=>!['topic','level','mode','hintOpen','projectHint'].includes(k))||!['all','html','css','js','vue'].includes(u.topic)||!['all','beginner','intermediate','advanced'].includes(u.level)||!['lessons','project','review'].includes(u.mode))fail('مرشحات الدروس');for(const k of ['hintOpen','projectHint'])if(own(u,k)&&typeof u[k]!=='boolean')fail('حالة التلميح');}
 if(own(v,'selected'))string(v.selected,'الدرس المختار',160,false);
 if(own(v,'completed'))list(v.completed,'الدروس المكتملة',2000,id=>string(id,'معرّف درس',160,false));
 if(own(v,'answers'))map(v.answers,'الإجابات',answer);
 if(own(v,'reviews'))map(v.reviews,'المراجعات',r=>{if(!record(r)||!timestamp(r.due)||!Number.isInteger(r.intervalDays)||r.intervalDays<0||r.intervalDays>30)fail('المراجعة')});
 if(own(v,'drafts'))map(v.drafts,'مسودات الدروس',code=>string(code,'مسودة درس',65536));
 if(own(v,'projectChecks'))map(v.projectChecks,'فحص المشروع',checks=>list(checks,'فحص المشروع',4,n=>{if(!Number.isInteger(n)||n<0||n>3)fail('معيار المشروع')}));
 if(own(v,'projectStage')&&(!Number.isSafeInteger(v.projectStage)||v.projectStage<0))fail('مرحلة المشروع');
 if(own(v,'history'))list(v.history,'سجل الإجابات',2000,h=>{if(!record(h))fail('سجل الإجابات');string(h.id,'معرّف سجل الإجابات',160,false);if(typeof h.correct!=='boolean'||!Number.isInteger(h.choice)||h.choice<0||h.choice>2||!timestamp(h.at))fail('سجل الإجابات')});
}
function cssControls(v){
 if(!record(v))fail('أدوات CSS');
 for(const key of ['margin','padding','fontSize','width','height','gap','radius'])if(own(v,key)){const metric=v[key];if(!record(metric)||typeof metric.value!=='number'||!Number.isFinite(metric.value)||!['px','rem','%'].includes(metric.unit))fail('قيمة أداة CSS')}
 const choices={display:['flex','grid','block'],direction:['row','column','row-reverse','column-reverse'],justify:['flex-start','center','flex-end','space-between','space-around','space-evenly'],align:['stretch','flex-start','center','flex-end','baseline'],wrap:['wrap','nowrap','wrap-reverse']};
 for(const[key,values]of Object.entries(choices))if(own(v,key)&&!values.includes(v[key]))fail('خيار CSS');
 for(const key of ['background','foreground'])if(own(v,key)&&(typeof v[key]!=='string'||!/^#[0-9a-f]{6}$/i.test(v[key])))fail('لون CSS');
 if(own(v,'columns')&&(!Number.isInteger(v.columns)||v.columns<1||v.columns>6))fail('أعمدة CSS');
}
function guidedArrow(v){
 if(Object.keys(v).length===0)return;
 const keys=['version','step','activeTask','drafts','hints','answers','results','reviews'];
 if(Object.keys(v).some(k=>!keys.includes(k))||v.version!==1||!Number.isInteger(v.step)||v.step<0||v.step>7)fail('الدرس الموجّه');
 const tasks=['try','double','fix','mastery','filter'];
 if(own(v,'activeTask')&&!['double','fix','filter'].includes(v.activeTask))fail('التمرين المختار');
 for(const k of ['drafts','hints','answers','results','reviews'])if(!record(v[k]))fail('الدرس الموجّه');
 map(v.drafts,'مسودات النموذج',(code,key)=>{if(!tasks.includes(key))fail('معرّف تمرين');string(code,'كود التمرين',16000)});
 map(v.hints,'تلميحات النموذج',(n,key)=>{if(!['prediction',...tasks].includes(key)||!Number.isInteger(n)||n<0||n>3)fail('تلميح')});
 map(v.answers,'إجابات النموذج',(n,key)=>{if(!['prediction','understanding','output'].includes(key)||!Number.isInteger(n)||n<0||n>2)fail('إجابة')});
 map(v.results,'نتائج النموذج',(r,key)=>{if(!tasks.filter(k=>k!=='try').includes(key)||!record(r)||Object.keys(r).some(k=>!['passed','source','at','attempts'].includes(k))||typeof r.passed!=='boolean'||!timestamp(r.at))fail('نتيجة تمرين');string(r.source,'نسخة الحل المفحوصة',16000);if(own(r,'attempts')&&(!Number.isInteger(r.attempts)||r.attempts<1||r.attempts>1000000))fail('عدد المحاولات')});
 map(v.reviews,'مراجعة المهارات',(r,key)=>{if(!['syntax','return','application'].includes(key)||!record(r)||Object.keys(r).some(k=>!['due','status'].includes(k))||!timestamp(r.due)||!['review','passed'].includes(r.status))fail('مراجعة مهارة')});
}
function guided(v){
 if(!Object.keys(v).length)return;
 if(v.version!==1||Object.keys(v).some(k=>!['version','selected','topic','lessons'].includes(k))||!['all','html','css','javascript','vue'].includes(v.topic))fail('المحرك الموجّه');
 string(v.selected,'الدرس المختار',160,false);
 map(v.lessons,'دروس موجّهة',(s,id)=>{
  if(!/^[a-z][a-z0-9-]{0,100}$/.test(id)||!record(s)||Object.keys(s).some(k=>!['step','drafts','answers','answerAttempts','mistakes','hints','results','reviews','completed','sandboxStorage'].includes(k))||!Number.isInteger(s.step)||s.step<0||s.step>7)fail('حالة الدرس');
  map(s.drafts,'مسودات الدرس',(code,k)=>{if(!['try','exercise','fix','mastery'].includes(k))fail('معرف مسودة');string(code,'كود الدرس',16000)});
  map(s.answers,'إجابات الدرس',(n,k)=>{if(!['prediction','understanding','output'].includes(k)||!Number.isInteger(n)||n<0||n>2)fail('اختيار الإجابة')});
  if(own(s,'answerAttempts'))map(s.answerAttempts,'محاولات الفهم',(n,k)=>{if(!['prediction','understanding','output'].includes(k)||!Number.isInteger(n)||n<1||n>1000000)fail('محاولات الإجابة')});
  if(own(s,'mistakes'))list(s.mistakes,'أخطاء الدرس',40,e=>{if(!record(e)||Object.keys(e).some(k=>!['kind','message','at','choice'].includes(k))||!['prediction','understanding','output','exercise','fix','mastery'].includes(e.kind)||!timestamp(e.at)||own(e,'choice')&&(!Number.isInteger(e.choice)||e.choice<0||e.choice>2))fail('خطأ محفوظ');string(e.message,'تفاصيل الخطأ',1600)});
  map(s.hints,'تلميحات الدرس',(n,k)=>{if(!['prediction','try','exercise','fix','mastery'].includes(k)||!Number.isInteger(n)||n<0||n>3)fail('تلميحات')});
  map(s.results,'نتائج الدرس',(r,k)=>{if(!['exercise','fix','mastery'].includes(k)||!record(r)||Object.keys(r).some(x=>!['passed','source','at','attempts'].includes(x))||typeof r.passed!=='boolean'||!timestamp(r.at)||!Number.isInteger(r.attempts)||r.attempts<1||r.attempts>1000000)fail('نتيجة');string(r.source,'الكود المفحوص',16000)});
  map(s.reviews,'مراجعات الدرس',(r,k)=>{if(!['prediction','understanding','output','exercise','fix','mastery','lesson'].includes(k)||!record(r)||Object.keys(r).some(x=>!['status','due','days'].includes(x))||!timestamp(r.due)||!['review','passed'].includes(r.status)||!Number.isInteger(r.days)||r.days<0||r.days>30)fail('مراجعة')});
  if(own(s,'sandboxStorage')){if(Object.keys(s.sandboxStorage).length>100)fail('حجم مساحة التدريب');map(s.sandboxStorage,'تخزين التدريب',(value,key)=>{string(key,'مفتاح التدريب',512,false);string(value,'قيمة التدريب',16000)});if(JSON.stringify(s.sandboxStorage).length>65536)fail('حجم مساحة التدريب');}
  if(own(s,'completed')&&!timestamp(s.completed))fail('تاريخ الإتقان');
 });
}
function validate(input){
 if(!record(input)||input.version!==1)throw new Error('إصدار بيانات التعلّم غير مدعوم');
 if(Object.keys(input).some(k=>k!=='version'&&!sections.includes(k)))throw new Error('حقول بيانات غير معروفة');
 let nodes=0;function scan(v,depth){if(++nodes>60000||depth>25)throw new Error('بنية البيانات معقدة جدًا');if(typeof v==='number'&&!Number.isFinite(v))throw new Error('رقم غير صالح');if(v!==null&&!['string','boolean','number','object'].includes(typeof v))fail('نوع JSON');if(v&&typeof v==='object'){if(!Array.isArray(v)&&!record(v))fail('كائن JSON');for(const k of Object.keys(v)){if(['__proto__','prototype','constructor'].includes(k))throw new Error('مفتاح غير آمن');scan(v[k],depth+1)}}}scan(input,0);
 const text=JSON.stringify(input);if(new TextEncoder().encode(text).length>LIMIT)throw new Error('البيانات أكبر من 2 MiB؛ لم يُقص أي نص');
 const out=fresh();for(const s of sections)if(own(input,s)){const v=input[s];if(['tasks','events','notes','projects'].includes(s))organizer(s,v);else if(!record(v))fail('قسم '+s);out[s]=clone(v)}
 map(out.organizerDrafts,'مسودات النماذج',(draft,key)=>{
  if(!['tasks','events','notes','projects'].includes(key)||!record(draft)||Object.keys(draft).some(k=>!['record','editingId'].includes(k))||!record(draft.record))fail('مسودة نموذج');
  string(draft.editingId,'معرف التعديل',160);
  const limits={id:160,title:180,body:12000,description:12000,notes:12000,due:40,date:40,time:40,status:20,projectId:160,createdAt:40,updatedAt:40};
  for(const[k,v]of Object.entries(draft.record)){if(k==='archived'){if(typeof v!=='boolean')fail('أرشفة المسودة')}else{if(!own(limits,k))fail('حقل مسودة غير معروف');string(v,'حقل المسودة',limits[k])}}
 });
 const layout=out.simulatorLayout;if(Object.keys(layout).length){const limits={editorHeight:[340,650],previewHeight:[400,740],editorWidth:[29,44],consoleHeight:[100,360],customWidth:[240,1920],customHeight:[160,1200],zoom:[.1,1.5]},choices={language:['source','css','js'],viewport:['desktop','tablet','mobile','custom'],compactPanel:['all','editor','stages','preview','console'],previewTab:['result','html','css','console']};
 if(layout.version!==1||Object.keys(layout).some(k=>!['version','hiddenPanels',...Object.keys(limits),...Object.keys(choices)].includes(k)))fail('تخطيط المحاكي');
 for(const[k,range]of Object.entries(limits))if(own(layout,k)&&(typeof layout[k]!=='number'||!Number.isFinite(layout[k])||layout[k]<range[0]||layout[k]>range[1]||k!=='zoom'&&!Number.isInteger(layout[k])))fail('مقاس المحاكي');
 for(const[k,allowed]of Object.entries(choices))if(own(layout,k)&&!allowed.includes(layout[k]))fail('خيار المحاكي');
 if(own(layout,'hiddenPanels'))list(layout.hiddenPanels,'لوحات المحاكي',5,p=>{if(!['editor','preview','console','stages','notes'].includes(p))fail('لوحة المحاكي')});
 }
 const dict=out.dictionary;if(Object.keys(dict).some(k=>!['drafts','selectedId','format'].includes(k)))fail('مسودات القاموس');if(own(dict,'drafts'))map(dict.drafts,'أكواد القاموس',(code,key)=>{if(!/^(html|css|js|vue|nuxt|ts)-[a-z0-9_-]+:(vue|vanilla)$/.test(key))fail('معرف مثال');string(code,'كود القاموس',65536)});if(own(dict,'selectedId'))string(dict.selectedId,'المصطلح المختار',160);if(own(dict,'format')&&!['vue','vanilla'].includes(dict.format))fail('صيغة المثال');
 const nav=out.navigation;if(Object.keys(nav).some(k=>!['workspace','section','simulatorLesson'].includes(k))||own(nav,'workspace')&&!['home','lexicon','course','arrow','guided','cssLab','jsLab','explain','settings','foundation'].includes(nav.workspace)||own(nav,'section')&&!['projects','kanban','notes','calendar'].includes(nav.section))fail('موضع الاستكمال');if(own(nav,'simulatorLesson'))string(nav.simulatorLesson,'درس المحاكي',80,false);
 guidedArrow(out.guidedArrow||{});guided(out.guided);
 course(out.course);out.course={...fresh().course,...out.course};
 if(own(out.preferences,'theme')&&!['petroleum','light','purple','green','glass'].includes(out.preferences.theme))throw new Error('الثيم غير معروف');
 out.preferences={...fresh().preferences,...out.preferences};
 for(const key of ['html','css','source'])optionalString(out.cssLab,key);
 if(own(out.cssLab,'controls'))cssControls(out.cssLab.controls);
 if(own(out.cssLab,'autoRun')&&typeof out.cssLab.autoRun!=='boolean')fail('التحديث التلقائي');
 if(own(out.cssLab,'version')&&out.cssLab.version!==1)fail('إصدار مختبر CSS');
 optionalString(out.jsLab,'source');optionalString(out.explainer,'source');
 for(const key of ['language','lang'])if(own(out.explainer,key)&&!['html','css','javascript','vue'].includes(out.explainer[key]))fail('لغة الشرح');
 // Budget the complete export, including defaults and its fixed-size metadata.
 // Otherwise a state right at LIMIT could save successfully but produce a
 // backup that this same parser (and the upload UI) refuses to restore.
 if(new TextEncoder().encode(JSON.stringify({app:'V Lex Pro Learning',version:1,exportedAt:'2000-01-01T00:00:00.000Z',state:out})).length>LIMIT)throw new Error('البيانات مع غلاف النسخة الاحتياطية أكبر من 2 MiB؛ لم يُقص أي نص');
 return out;
}
function createStore(storage){
 let state=fresh(),mode='ready',message='',unread=false,sequence=0,verified=false;const listeners=new Set();
 const notify=()=>{for(const fn of [...listeners]){try{fn(clone(state))}catch(_){}}};
 function backup(raw){if(raw===null)return true;let k;try{do{k='vlex_learning_recovery_'+Date.now()+'_'+(++sequence)}while(storage.getItem(k)!==null);storage.setItem(k,raw);return storage.getItem(k)===raw}catch(_){return false}}
 try{const raw=storage.getItem(KEY);if(raw!==null)try{state=validate(JSON.parse(raw));verified=true}catch(_){const saved=backup(raw);mode='protected';message=saved?'السجل غير متوافق؛ حُفظ أصله للاسترجاع. التعديلات مؤقتة حتى تستورد نسخة سليمة.':'تعذر حفظ نسخة استرجاع؛ الأصل محفوظ دون تغيير والتعديلات مؤقتة.'}}catch(_){mode='protected';unread=true;message='تعذرت قراءة التخزين؛ لن نستبدل السجل الأصلي. صدّر التعديلات ثم أعد فتح الصفحة.'}
 function setSection(section,value){
  if(!sections.includes(section))throw new Error('قسم غير معروف');let next,base=state,copy,persistedRaw=null;
  // A rejected form/import payload is not evidence that durable storage is
  // corrupt. Keep the prior state and saving mode intact so a corrected edit
  // can be saved normally on the next attempt.
  try{copy=clone(value);validate({...state,[section]:copy})}catch(e){message='رُفض التغيير دون استبدال البيانات: '+e.message;notify();return false}
  if(mode==='ready')try{const raw=storage.getItem(KEY);persistedRaw=raw;if(raw!==null)base=validate(JSON.parse(raw))}catch(e){mode='protected';message='تعذر قراءة السجل الأصلي: '+e.message;state=validate({...state,[section]:copy});notify();return false}
  try{next=validate({...base,[section]:copy})}catch(e){message='رُفض التغيير دون استبدال البيانات: '+e.message;notify();return false}
  state=next;if(mode==='protected'){notify();return false}try{const text=JSON.stringify(state);if(mode!=='ready'||text!==persistedRaw)storage.setItem(KEY,text);if(storage.getItem(KEY)!==text)throw new Error('فشل التحقق من الكتابة');mode='ready';verified=true;message=''}catch(_){mode='memory';message='تعذر الحفظ الدائم؛ التعديلات في هذه الجلسة. صدّرها قبل الإغلاق.'}notify();return mode==='ready'
 }
 function parseBackup(text){if(typeof text!=='string'||new TextEncoder().encode(text).length>LIMIT)throw new Error('ملف غير صالح أو أكبر من 2 MiB');let data;try{data=JSON.parse(text)}catch(_){throw new Error('صيغة JSON غير صالحة')}if(data.app!=='V Lex Pro Learning'||data.version!==1||Object.keys(data).some(k=>!['app','version','exportedAt','state'].includes(k)))throw new Error('هذه ليست نسخة بيانات التعلّم');return validate(data.state)}
 function importData(text){const next=parseBackup(text);if(unread)throw new Error('أعد فتح الصفحة أولًا لاستعادة قراءة التخزين');let original;try{original=storage.getItem(KEY)}catch(_){unread=true;mode='protected';throw new Error('تعذرت قراءة الأصل؛ لم يتم الاستيراد')}if(!backup(original))throw new Error('تعذر حفظ الأصل قبل الاستيراد؛ لم تتغير البيانات');const serialized=JSON.stringify(next);try{storage.setItem(KEY,serialized);if(storage.getItem(KEY)!==serialized)throw new Error('فشل التحقق من الكتابة')}catch(e){try{if(original===null)storage.removeItem(KEY);else storage.setItem(KEY,original)}catch(_){}throw new Error('تعذر الحفظ؛ بقيت الحالة الحالية والأصل في نسخة الاسترجاع')}state=next;mode='ready';verified=true;message='';notify();return true}
 return {key:KEY,read:()=>clone(state),getSection:(s,fallback)=>Object.hasOwn(state,s)?clone(state[s]):clone(fallback),setSection,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn)},status:()=>({mode,message,verified,persistent:mode==='ready'}),exportData:()=>JSON.stringify({app:'V Lex Pro Learning',version:1,exportedAt:new Date().toISOString(),state}),parseBackup,importData,reload:()=>{if(mode!=='ready')return;try{const raw=storage.getItem(KEY);if(raw!==null){state=validate(JSON.parse(raw));notify()}}catch(_){mode='protected';message='تغير التخزين أو تعذرت قراءته؛ صدّر تعديلاتك قبل الإغلاق.';notify()}}};
}
const api={KEY,validate,createStore};if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(root&&root.document){try{root.VLexLearningStore=createStore({getItem:k=>{if(root.VLexFullBackupRecovery?.blocked)throw Error('استرجاع معلق');return root.localStorage.getItem(k)},setItem:(k,v)=>{root.VLexFullBackup?.assertWritable(root.localStorage,k);root.localStorage.setItem(k,v)},removeItem:k=>{root.VLexFullBackup?.assertWritable(root.localStorage,k);root.localStorage.removeItem(k)}})}catch(_){root.VLexLearningStore=createStore({getItem(){throw new Error('Storage unavailable')}})}root.addEventListener('storage',e=>{if(e.key===KEY)root.VLexLearningStore.reload()})}root.VLexLearning=api;
})(typeof window!=='undefined'?window:globalThis);
