/* Versioned full backup and recoverable multi-key transaction. No student code executes here. */
(function(root){
'use strict';
const APP='V Lex Pro Full Backup',LIMIT=8*1024*1024,PENDING='vlex_full_backup_pending_v1';
const KEYS=['vlex_personal_learning_v1','vuelexicon_bookmarks_v3','vuelexicon_mastery_v3','vuelexicon_recent_v3','vuelexicon_practice_progress','vuelexicon_simulator_preferences_v1','vuelexicon_simulator_ambient_v1','vuelexicon_tab_autocomplete','app_demo_theme_v3'];
const record=v=>v&&typeof v==='object'&&!Array.isArray(v),own=(v,k)=>Object.hasOwn(v,k),bytes=s=>new TextEncoder().encode(s).length;
function exact(v,keys){if(!record(v)||Object.keys(v).some(k=>!keys.includes(k)))throw Error('حقول نسخة احتياطية غير صالحة')}
function validateLegacy(value,schema){exact(value,['app','version','exportDate','bookmarks','mastery','recent','practiceProgress']);if(bytes(JSON.stringify(value))>4*1024*1024)throw Error('بيانات القاموس والتدريب أكبر من 4 MiB');const metadata={};for(const key of ['app','version','exportDate'])if(own(value,key))metadata[key]=value[key];schema.parseImport(JSON.stringify({...metadata,bookmarks:[]}));const out={};for(const key of ['bookmarks','mastery','recent','practiceProgress']){if(!own(value,key))throw Error('نسخة القاموس أو التدريب ناقصة');out[key]=schema.field(key,value[key])}return out}
function validate(value,deps){exact(value,['app','version','createdAt','learning','legacy','preferences']);if(value.app!==APP||value.version!==1||typeof value.createdAt!=='string'||!Number.isFinite(Date.parse(value.createdAt)))throw Error('إصدار أو تاريخ النسخة غير مدعوم');
 const learning=deps.learning.validate(value.learning),legacy=validateLegacy(value.legacy,deps.legacy);
 if(['bookmarks','mastery','recent','practiceProgress'].some(k=>!own(legacy,k)))throw Error('نسخة القاموس أو التدريب ناقصة');
 const p=value.preferences;exact(p,['simulator','ambient','tabAutocomplete','demoTheme']);if(typeof p.tabAutocomplete!=='boolean'||!['emerald','midnight'].includes(p.demoTheme))throw Error('إعدادات النسخة غير صالحة');
 const simulator=deps.simulator.parsePreferences(JSON.stringify(p.simulator)),ambient=deps.simulator.parseAmbientPreferences(JSON.stringify(p.ambient));
 return{app:APP,version:1,createdAt:value.createdAt,learning,legacy,preferences:{simulator,ambient,tabAutocomplete:p.tabAutocomplete,demoTheme:p.demoTheme}};
}
function parse(text,deps){if(typeof text!=='string'||bytes(text)>LIMIT)throw Error('النسخة أكبر من 8 MiB أو غير صالحة');let value;try{value=JSON.parse(text)}catch(_){throw Error('صيغة JSON غير صالحة')}return validate(value,deps)}
function serialize(value,deps){const text=JSON.stringify(validate(value,deps));if(bytes(text)>LIMIT)throw Error('النسخة أكبر من 8 MiB؛ لم يُقص نص');return text}
function entries(v){return[[KEYS[0],JSON.stringify(v.learning)],[KEYS[1],JSON.stringify(v.legacy.bookmarks)],[KEYS[2],JSON.stringify(v.legacy.mastery)],[KEYS[3],JSON.stringify(v.legacy.recent)],[KEYS[4],JSON.stringify(v.legacy.practiceProgress)],[KEYS[5],JSON.stringify(v.preferences.simulator)],[KEYS[6],JSON.stringify(v.preferences.ambient)],[KEYS[7],String(v.preferences.tabAutocomplete)],[KEYS[8],v.preferences.demoTheme]]}
function durable(storage,key,text){storage.setItem(key,text);if(storage.getItem(key)!==text)throw Error('فشل التحقق من الكتابة')}
function remove(storage,key){storage.removeItem(key);if(storage.getItem(key)!==null)throw Error('تعذر إنهاء معاملة الاستيراد')}
function journal(raw){if(typeof raw!=='string'||bytes(raw)>2*LIMIT)throw Error('سجل استرجاع غير صالح');const j=JSON.parse(raw);exact(j,['version','before','after']);if(j.version!==1)throw Error('إصدار استرجاع غير مدعوم');for(const field of ['before','after']){exact(j[field],KEYS);if(KEYS.some(k=>!own(j[field],k)||j[field][k]!==null&&typeof j[field][k]!=='string'))throw Error('بيانات استرجاع ناقصة')}return j}
function rollback(storage,j){for(const k of KEYS){const current=storage.getItem(k);if(current!==j.before[k]&&current!==j.after[k])throw Error('تغير سجل أثناء الاستيراد؛ احتُفظ بالنسخة للاسترجاع دون الكتابة فوق التغيير')}for(const k of KEYS){if(j.before[k]===null)remove(storage,k);else durable(storage,k,j.before[k])}remove(storage,PENDING)}
function recover(storage){try{const raw=storage.getItem(PENDING);if(raw===null)return{blocked:false,recovered:false};rollback(storage,journal(raw));return{blocked:false,recovered:true}}catch(e){return{blocked:true,recovered:false,message:'تعذر استرجاع عملية استيراد منقطعة؛ أُوقف الحفظ لحماية الأصل. '+e.message}}}
function restore(text,storage,deps){const v=parse(text,deps);if(storage.getItem(PENDING)!==null)throw Error('توجد عملية استرجاع معلقة؛ أعد فتح الموقع أولًا');const after=Object.fromEntries(entries(v)),before=Object.fromEntries(KEYS.map(k=>[k,storage.getItem(k)])),j={version:1,before,after},raw=JSON.stringify(j);let backup='vlex_full_recovery_'+Date.now()+'_'+Math.random().toString(36).slice(2);durable(storage,backup,JSON.stringify({version:1,before}));durable(storage,PENDING,raw);
 try{for(const[k,value]of Object.entries(after))durable(storage,k,value);remove(storage,PENDING);return{backupKey:backup}}
 catch(e){try{rollback(storage,j)}catch(_){throw Error('تعذر الحفظ والاسترجاع التلقائي؛ الأصل محفوظ في '+backup+'، أعد فتح الموقع قبل التحرير')}throw Error('فشل الاستيراد؛ أُعيدت جميع البيانات الأصلية. '+e.message)}
}
function assertWritable(storage,key){if(KEYS.includes(key)&&(root.VLexFullBackupRecovery?.blocked||storage.getItem(PENDING)!==null))throw Error('الحفظ موقوف لحماية استرجاع معلق')}
const api={APP,LIMIT,KEYS,PENDING,validateLegacy,validate,parse,serialize,restore,recover,assertWritable};root.VLexFullBackup=api;if(typeof module==='object')module.exports=api;
if(root.document){try{root.VLexFullBackupRecovery=recover(root.localStorage)}catch(_){root.VLexFullBackupRecovery={blocked:true,message:'تعذر فحص بيانات الاسترجاع؛ الحفظ موقوف لحماية الأصل.'}}}
})(typeof window!=='undefined'?window:globalThis);
