/* Language-specific, functional assessment. Student JS never runs in the app window. */
(function(root){
'use strict';
const LIMIT=16000,TIMEOUT=2200;
const fail=text=>{throw Error(text)};
function walk(node,fn){if(!node||typeof node!=='object')return;fn(node);for(const[k,v]of Object.entries(node)){if(['loc','extra','comments','leadingComments','trailingComments','innerComments','tokens'].includes(k))continue;if(Array.isArray(v))v.forEach(n=>walk(n,fn));else if(v&&typeof v==='object')walk(v,fn)}}
function compileVue(source,compiler,routerEnabled=false){
 const parsed=compiler.parse(source,{filename:'Lesson.vue'});if(parsed.errors.length)throw parsed.errors[0];
 const d=parsed.descriptor;if(!d.template||!d.scriptSetup||d.script)fail('النطاق المدعوم: مكوّن SFC بـ template وscript setup، دون script عادي.');
 if(d.scriptSetup.lang&&d.scriptSetup.lang!=='js')fail('TypeScript غير مدعوم في هذا التقييم.');
 if(d.template.src||d.scriptSetup.src||d.styles.some(s=>s.src)||d.customBlocks.length)fail('اكتب المكوّن في الملف نفسه؛ لا ملفات أو حزم خارجية.');
 const original=compiler.babelParse(d.scriptSetup.content,{sourceType:'module'});
 for(const n of original.program.body)if(n.type==='ImportDeclaration'&&n.source.value==='vue-router'&&!routerEnabled)fail('Vue Router متاح فقط في درس يعلن سياق Router ذاكرة معزولًا.');
 for(const n of original.program.body)if(n.type==='ImportDeclaration'&&(!['vue','vue-router'].includes(n.source.value)||n.specifiers.some(s=>s.type!=='ImportSpecifier')))fail('تُدعم استيرادات Vue المسماة فقط.');
 // Compile only as data in parent; resulting code executes in a terminable Worker.
 const compiled=compiler.compileScript(d,{id:'vlex-guided',inlineTemplate:true,templateOptions:{compilerOptions:{hoistStatic:false}}}).content;
 const ast=compiler.babelParse(compiled,{sourceType:'module'});const edits=[];
 for(const n of ast.program.body){if(n.type==='ImportDeclaration'){
  if(!['vue','vue-router'].includes(n.source.value)||n.specifiers.some(s=>s.type!=='ImportSpecifier'))fail('الاستيراد خارج Vue غير مدعوم.');
  edits.push({start:n.start,end:n.end,text:'const {'+n.specifiers.map(s=>s.imported.name+':'+s.local.name).join(',')+'}='+(n.source.value==='vue'?'Vue':'VueRouter')+';'});
 }else if(n.type==='ExportDefaultDeclaration')edits.push({start:n.start,end:n.declaration.start,text:'return '});else if(n.type.startsWith('Export'))fail('لا تصدير إضافيًا في المكوّن.');}
 let code=compiled;for(const e of edits.sort((a,b)=>b.start-a.start))code=code.slice(0,e.start)+e.text+code.slice(e.end);
 return{code,styles:d.styles.map(s=>s.content).join('\n')};
}
function prepare(source,spec,compiler){
 if(typeof source!=='string'||!source.trim()||source.length>LIMIT)fail('اكتب كودًا بين 1 و16000 محرف.');
 if(!['html','css','javascript','vue'].includes(spec.language))fail('لغة غير مدعومة.');
 const out={...JSON.parse(JSON.stringify(spec)),source};
 if(['javascript','vue'].includes(spec.language)){
  const script=spec.language==='vue'?compiler.parse(source).descriptor.scriptSetup?.content:source;
  if(script){const ast=compiler.babelParse(script,{sourceType:spec.language==='vue'||spec.module?'module':'script'});walk(ast,n=>{if(n.type==='ImportExpression'||n.type==='Import'||n.type==='Identifier'&&(n.name==='document'&&spec.environment!=='dom'||n.name==='fetch'&&!spec.mockFetch||n.name==='localStorage'&&!spec.storage)||n.type==='Identifier'&&['self','globalThis','window','parent','top','XMLHttpRequest','WebSocket','EventSource','importScripts','Function','eval','constructor','prototype','__proto__'].includes(n.name)||n.type==='MemberExpression'&&n.computed&&n.property.type==='StringLiteral'&&['constructor','prototype','__proto__'].includes(n.property.value))fail('هذا التقييم لا يدعم الوصول إلى بيئة التطبيق أو الشبكة أو إنشاء كود ديناميكي.');});}
 }
 if(spec.language==='vue')Object.assign(out,compileVue(source,compiler,!!spec.router));
 if(spec.language==='javascript'){
  try{const parsed=compiler.babelParse(source,{sourceType:spec.module?'module':'script'});if(spec.module){out.moduleImports=[];for(const n of parsed.program.body)if(n.type==='ImportDeclaration'||(n.type==='ExportNamedDeclaration'||n.type==='ExportAllDeclaration')&&n.source){if(!Object.hasOwn(spec.modules||{},n.source.value))fail('استيراد غير مدعوم: استخدم وحدة التمرين المحلية الموثقة.');out.moduleImports.push({start:n.source.start,end:n.source.end,name:n.source.value})}}}catch(e){e.phase='parse';throw e}
  if(!/^[A-Za-z_$][\w$]*$/.test(spec.entry||''))fail('لا يوجد مدخل موثوق للتمرين.');
  const syntax=compiler.babelParse(source,{sourceType:spec.module?'module':'script'}),types=new Set(),calls=new Set();walk(syntax,n=>{types.add(n.type);if(n.type==='CallExpression'&&n.callee.type==='MemberExpression')calls.add(n.callee.property.name||n.callee.property.value)});for(const name of spec.requiredCalls||[])if(!calls.has(name))fail('شرط المهارة: استعمل '+name+' في الحل.');for(const group of spec.requireNodes||[])if(!group.some(t=>types.has(t)))fail('شرط المهارة: استخدم '+group.join(' أو ')+'. صحة الناتج تُفحص بعد ذلك وظيفيًا.');if(spec.requiredImports?.some(name=>!out.moduleImports?.some(i=>i.name===name)))fail('شرط المهارة: استورد وحدة التمرين المطلوبة.');
 }
 return out;
}
function workerRuntime(){
 'use strict';
 const NativeFunction=Function,parse=JSON.parse,stringify=JSON.stringify,keys=Object.keys,entries=Object.entries,own=Object.hasOwn,isArray=Array.isArray,finite=Number.isFinite,apply=Reflect.apply;
 let port,send,config,tree,Vue,VueRouter,instance,DOM,app,router,rootProps;const emitted={};
 const text=v=>{try{return typeof v==='string'?v:stringify(v)??String(v)}catch(_){return '[قيمة غير قابلة للعرض]'}};
 const same=(a,b)=>{if(a===b)return true;if(typeof a!==typeof b||a===null||b===null||typeof a!=='object')return false;if(isArray(a)!==isArray(b))return false;const ak=keys(a),bk=keys(b);if(ak.length!==bk.length)return false;for(let i=0;i<ak.length;i++){const k=ak[i];if(!own(b,k)||!same(a[k],b[k]))return false}return true};
 function disableNetwork(){for(const key of ['Object','Array','Function','Number','String','Boolean','Promise','Map','Set','RegExp','JSON','Math','Reflect']){const value=self[key];try{if(value.prototype)Object.freeze(value.prototype);Object.freeze(value);Object.defineProperty(self,key,{value,writable:false,configurable:false})}catch(_){}}for(const k of ['fetch','XMLHttpRequest','WebSocket','EventSource','importScripts','Worker','SharedWorker','BroadcastChannel','indexedDB','caches'])try{Object.defineProperty(self,k,{value:undefined,writable:false,configurable:false})}catch(_){}}
 function describe(e){return{message:String(e?.message||e).slice(0,1600),name:String(e?.name||'Error'),stack:String(e?.stack||'').slice(0,5000)}}
 function node(tag,value=''){return{tag,text:value,children:[],parent:null,props:{},style:{display:''},value:'',listeners:{},addEventListener(type,fn){(this.listeners[type]??=[]).push(fn)},removeEventListener(type,fn){this.listeners[type]=(this.listeners[type]||[]).filter(f=>f!==fn)},getAttribute(key){return this.props[key]??null},setAttribute(key,value){this.props[key]=String(value)},removeAttribute(key){delete this.props[key]},dispatchEvent(event){event.target=this;event.currentTarget=this;event.preventDefault??=()=>{event.defaultPrevented=true};event.stopPropagation??=()=>{};for(const fn of this.listeners[event.type]||[])fn(event);const handler=this.props['on'+event.type[0].toUpperCase()+event.type.slice(1)];if(typeof handler==='function')handler(event);else if(isArray(handler))handler.forEach(fn=>fn(event));return true}}}
 function snapshot(n,depth=0){if(depth>30)throw Error('المخرجات متداخلة أكثر من الحد.');return{tag:n.tag,text:n.text,props:Object.fromEntries(entries(n.props).filter(([k,v])=>!k.startsWith('on')&&['string','number','boolean'].includes(typeof v))),children:n.children.map(c=>snapshot(c,depth+1))}}
 function all(n){return[n,...n.children.flatMap(all)]}
 function matches(n,selector){const match=/^([a-z][\w-]*)?(?:#([\w-]+))?(?:\.([\w-]+))?(?:\[([\w-]+)(?:="([^"]*)")?\])?$/i.exec(selector);if(!match)throw Error('محدد Vue المدعوم: اسم عنصر أو #id أو .class أو [خاصية="قيمة"].');return(!match[1]||n.tag===match[1])&&(!match[2]||n.props.id===match[2])&&(!match[3]||String(n.props.class||'').split(/\s+/).includes(match[3]))&&(!match[4]||own(n.props,match[4])&&(match[5]===undefined||String(n.props[match[4]])===match[5]))}
 function find(selector){return all(tree).filter(n=>matches(n,selector))}
 const content=n=>n.text+n.children.map(content).join('');
 function vueCheck(rule){const found=rule.kind==='event'?[]:find(rule.selector),n=found[0];let actual;if(rule.kind==='event')actual=emitted[rule.property]||[];else if(rule.kind==='style')actual=n?.style[rule.property]??null;else if(rule.kind==='count')actual=found.length;else if(!n)actual=null;else if(rule.kind==='text')actual=content(n);else if(rule.kind==='prop')actual=n.props[rule.property]??null;else if(rule.kind==='value')actual=n.value;else throw Error('قاعدة Vue غير معروفة');return{label:rule.label,expected:text(rule.expected),actual:text(actual),passed:same(actual,rule.expected)}}
 async function vueAction(action){
  if(action.kind==='setProps'){Object.assign(rootProps,action.value);await Vue.nextTick();return}
  if(action.kind==='unmount'){app.unmount();await Vue.nextTick();return}
  if(action.kind==='route'){if(!router)throw Error('لا يوجد Router في سياق هذا الدرس.');await router.push(action.path);await Vue.nextTick();return}
  if(action.kind==='tick'){await Vue.nextTick();return}
  const n=find(action.selector)[0];if(!n)throw Error('لم يُعثر على عنصر التفاعل: '+action.selector);
  if(action.kind==='input'||action.kind==='change'){n.value=action.value;self.document.activeElement=n;n.dispatchEvent({type:action.kind});self.document.activeElement=null}
  else if(action.kind==='click')n.dispatchEvent({type:'click',button:0});
  else if(action.kind==='submit')n.dispatchEvent({type:'submit'});else throw Error('تفاعل غير مدعوم');
  await new Promise(r=>setTimeout(r,0));await Vue.nextTick();
 }
 async function runVue(){
  // Genuine Vue renderer/reactivity, with a bounded custom host rather than a browser DOM.
  self.document={activeElement:null};self.Event=class{constructor(type){this.type=type}};
  const renderer=Vue.createRenderer({
   createElement:tag=>node(tag),createText:t=>node('#text',t),createComment:t=>node('#comment',''),
   setText:(n,t)=>n.text=t,setElementText:(n,t)=>{n.children=[];n.text=t},
   parentNode:n=>n.parent,nextSibling:n=>{if(!n.parent)return null;return n.parent.children[n.parent.children.indexOf(n)+1]||null},
   insert(n,p,anchor=null){if(n.parent){const a=n.parent.children;a.splice(a.indexOf(n),1)}n.parent=p;const i=anchor?p.children.indexOf(anchor):-1;p.children.splice(i<0?p.children.length:i,0,n)},
   remove(n){if(n.parent){const a=n.parent.children;a.splice(a.indexOf(n),1);n.parent=null}},
   patchProp(n,key,old,value){n.props[key]=value;if(key==='value')n.value=value??'';if(key==='style'&&value&&typeof value==='object')Object.assign(n.style,value);if(key==='class')n.props.class=value||''},
   querySelector:()=>null,setScopeId(){},insertStaticContent(){throw Error('محتوى static المحسّن غير مدعوم في العارض؛ استخدم عنصرًا ديناميكيًا في هذا المثال.')}
  });
  tree=node('root');const component=new NativeFunction('Vue','VueRouter','"use strict";\n'+config.code)(Vue,VueRouter);rootProps=Vue.reactive({...config.props});
  const slots={};for(const[name,value]of entries(config.slots||{}))slots[name]=()=>Vue.h(value.tag||'span',value.props||{},String(value.text||''));
  const listeners={};for(const name of config.events||[])listeners['on'+name[0].toUpperCase()+name.slice(1)]=(...args)=>{(emitted[name]??=[]).push(args);if(config.model&&name==='update:modelValue')rootProps.modelValue=args[0]};
  app=renderer.createApp({setup:()=>()=>Vue.h(component,{...rootProps,...listeners},slots)});app.config.errorHandler=e=>{throw e};
  if(config.router){router=VueRouter.createRouter({history:VueRouter.createMemoryHistory(),routes:config.router.routes.map(r=>({path:r.path,component:{render:()=>Vue.h('p',{id:'route-view'},r.text)}}))});app.use(router);await router.push(config.router.initial||'/');await router.isReady()}
  instance=app.mount(tree);await Vue.nextTick();
  const checks=[];for(const phase of config.phases||[]){for(const a of phase.actions||[])await vueAction(a);for(const rule of phase.rules||[])checks.push(vueCheck(rule))}
  send({kind:'result',checks,snapshot:snapshot(tree),logs:[]});
 }
 async function runJS(){
  const logs=[],console=Object.freeze({log:(...args)=>{if(logs.length<80)logs.push(args.map(text).join(' '))}});
  let storageData=parse(stringify(config.storageData||{})),activeCase={};
  const storage=config.storage?Object.freeze({getItem:key=>own(storageData,String(key))?storageData[String(key)]:null,setItem(key,value){key=String(key);value=String(value);if(['__proto__','prototype','constructor'].includes(key)||key.length>512||value.length>16000)throw Error('مفتاح أو قيمة خارج حدود مساحة التدريب.');const next={...storageData,[key]:value};if(keys(next).length>100||stringify(next).length>65536)throw Error('امتلأت مساحة التخزين المعزولة.');storageData=next},removeItem(key){delete storageData[String(key)]},clear(){storageData={}},key:i=>keys(storageData)[i]??null,get length(){return keys(storageData).length}}):undefined;
  const mockFetch=config.mockFetch?async(url,options)=>{const response=activeCase.response||config.response||{};if(config.requestURL&&String(url)!==config.requestURL)throw Error('عنوان الطلب خارج مورد التمرين.');if(response.reject)throw Error(response.reject);return new Response(typeof response.body==='string'?response.body:stringify(response.body??{}),{status:response.status||200,headers:{'Content-Type':'application/json'}})}:undefined;
  let doc;if(config.environment==='dom')doc=DOM.parseHTML('<!doctype html><html><head></head><body>'+config.fixture+'</body></html>').document;
  let fn;
  if(config.module){
   const urls={};for(const[key,value]of entries(config.modules||{}))urls[key]=URL.createObjectURL(new Blob([value],{type:'text/javascript'}));let source=config.source;for(const edit of [...config.moduleImports].sort((a,b)=>b.start-a.start))source=source.slice(0,edit.start)+stringify(urls[edit.name])+source.slice(edit.end);
   const url=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));try{fn=(await import(url))[config.entry]}finally{URL.revokeObjectURL(url);for(const url of Object.values(urls))URL.revokeObjectURL(url)}
  }else fn=new NativeFunction('console','document','Event','CustomEvent','localStorage','fetch','"use strict";\n'+config.source+'\n;return '+config.entry+';')(console,doc,DOM?.Event,DOM?.CustomEvent,storage,mockFetch);
  if(typeof fn!=='function')throw Error('عرّف دالة باسم '+config.entry+'.');
  const checks=[];
  if(doc){
   await apply(fn,undefined,[]);
   for(const phase of config.phases||[]){for(const action of phase.actions||[]){const n=doc.querySelector(action.selector);if(!n)throw Error('لم يُعثر على عنصر التفاعل: '+action.selector);if(action.kind==='input'||action.kind==='change'){n.value=action.value;n.dispatchEvent(new DOM.Event(action.kind,{bubbles:true}))}else if(action.kind==='append'){const holder=doc.createElement('div');holder.innerHTML=action.html;while(holder.firstChild)n.append(holder.firstChild)}else if(action.kind==='click')n.dispatchEvent(new DOM.Event('click',{bubbles:true,cancelable:true}));else if(action.kind==='submit')n.dispatchEvent(new DOM.Event('submit',{bubbles:true,cancelable:true}));else throw Error('تفاعل DOM غير مدعوم.');await new Promise(r=>setTimeout(r,0))}
    for(const rule of phase.rules||[]){const nodes=[...doc.querySelectorAll(rule.selector)],n=nodes[0];let actual;if(rule.kind==='count')actual=nodes.length;else if(!n)actual=null;else if(rule.kind==='text')actual=n.textContent.trim();else if(rule.kind==='attr')actual=n.getAttribute(rule.property);else if(rule.kind==='value')actual=n.value;else throw Error('قاعدة DOM غير مدعومة.');checks[checks.length]={label:rule.label,expected:text(rule.expected),actual:text(actual),passed:same(actual,rule.expected)}}
   }
  }else for(const c of config.cases||[]){activeCase=c;if(c.storageData)storageData=parse(stringify(c.storageData));try{const input=parse(stringify(c.args)),before=c.preserveInputs?parse(stringify(input)):null,pending=apply(fn,undefined,input),isPromise=!!pending&&typeof pending.then==='function',result=await pending,storageOK=!config.expectStorage||entries(config.expectStorage).every(([key,value])=>storageData[key]===String(value==='$arg0'?input[0]:value));checks[checks.length]={label:c.label||'حالة اختبار',expected:c.throws||text(c.expected),actual:text(result)+(storageOK?'':' (لم تطابق البيانات المحفوظة)')+((config.requirePromise||c.requirePromise)&&!isPromise?' (قيمة متزامنة)':''),passed:storageOK&&!c.throws&&(!(config.requirePromise||c.requirePromise)||isPromise)&&same(result,c.expected)&&(!c.preserveInputs||same(input,before))}}catch(e){checks[checks.length]={label:c.label||'حالة اختبار',expected:c.throws||text(c.expected),actual:String(e.message),passed:typeof c.throws==='string'&&String(e.message).includes(c.throws)}}}
  const preview=doc?doc.toString():undefined;if(preview&&preview.length>100000)throw Error('تجاوزت مخرجات DOM الحد المسموح.');send({kind:'result',checks,logs,...(preview?{preview}:{}),...(config.persistStorage?{storage:storageData}:{})});
 }
 function initialize(event){if(event.data?.type!=='VLEX_GUIDED_INIT'||!event.ports[0]||port)return;self.removeEventListener('message',initialize);port=event.ports[0];send=port.postMessage.bind(port);config=event.data.config;
  try{if(config.language==='vue'){importScripts(config.vueURL);Vue=self.Vue;if(config.router){importScripts(config.routerURL);VueRouter=self.VueRouter}}if(config.environment==='dom'){importScripts(config.domURL);DOM=self.VLexDOM}disableNetwork();Promise.resolve(config.language==='vue'?runVue():runJS()).catch(e=>send({kind:'error',error:describe(e)}))}catch(e){send({kind:'error',error:describe(e)})}
 }
 self.addEventListener('message',initialize);
}
function workerBroker(runtime,vueURL,domURL,routerURL){
 const script='const runtime='+JSON.stringify(runtime)+';const expectedParent=parent;let worker=null,port=null;addEventListener("message",function init(e){if(e.source!==expectedParent||!e.ports[0]||port)return;port=e.ports[0];removeEventListener("message",init);try{const url=URL.createObjectURL(new Blob([runtime],{type:"text/javascript"}));worker=new Worker(url);URL.revokeObjectURL(url);const channel=new MessageChannel();channel.port1.onmessage=e=>port.postMessage(e.data);worker.onerror=e=>{e.preventDefault();port.postMessage({kind:"error",error:{message:e.message,name:"WorkerError"}})};worker.postMessage({type:"VLEX_GUIDED_INIT",config:e.data},[channel.port2]);}catch(e){port.postMessage({kind:"error",error:{message:e.message,name:e.name}})}});';
 const policy="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' blob: "+vueURL+" "+domURL+" "+routerURL+"; worker-src blob:; connect-src 'none'; img-src 'none'; frame-src 'none'; base-uri 'none'; form-action 'none'";
 return '<!doctype html><meta http-equiv="Content-Security-Policy" content="'+policy+'"><script>'+script.replace(/<\/script/gi,'<\\/script')+'<\/script>';
}
function runWorker(plan){
 let done=false,timer,frame,port;const cleanup=()=>{clearTimeout(timer);port?.close();frame?.remove()};let resolve;
 const promise=new Promise(r=>resolve=r);const finish=result=>{if(done)return;done=true;cleanup();resolve(result)};
 try{
  const vueURL=new URL('assets/vendor/vue-3.4.21.global.prod.js',document.baseURI).href,domURL=new URL('assets/vendor/linkedom-0.18.12.global.min.js',document.baseURI).href,routerURL=new URL('assets/vendor/vue-router-4.5.1.global.prod.js',document.baseURI).href;
  frame=document.createElement('iframe');frame.setAttribute('sandbox','allow-scripts');frame.hidden=true;
  const channel=new MessageChannel();port=channel.port1;port.onmessage=event=>{const d=event.data;if(!d||!['result','error'].includes(d.kind))return;
   const expected=plan.language==='vue'||plan.environment==='dom'?(plan.phases||[]).reduce((n,p)=>n+(p.rules||[]).length,0):(plan.cases||[]).length;
   if(d.kind==='result'&&(!Array.isArray(d.checks)||d.checks.length!==expected||d.checks.some(c=>typeof c.passed!=='boolean'||typeof c.label!=='string'||typeof c.actual!=='string'||typeof c.expected!=='string')))return finish({kind:'error',error:{message:'نتيجة تقييم غير صالحة؛ لم يُحتسب نجاح.'}});
   finish(d);
  };
  frame.onload=()=>{if(!done)try{frame.contentWindow.postMessage({...plan,vueURL,domURL,routerURL},'*',[channel.port2])}catch(e){finish({kind:'error',error:{message:e.message,name:e.name,stack:e.stack}})}};
  frame.srcdoc=workerBroker('('+workerRuntime.toString()+')()',vueURL,domURL,routerURL);document.body.append(frame);
  timer=setTimeout(()=>finish({kind:'timeout',error:{message:'تجاوز التنفيذ المهلة وأُوقف العامل. لم يُحتسب نجاح.',name:'Timeout',stack:''}}),TIMEOUT);
 }catch(e){finish({kind:'error',error:{message:e.message,name:e.name,stack:e.stack}})}
 return{promise,stop:()=>finish({kind:'cancelled'})};
}
function safeHTML(source){
 const doc=new DOMParser().parseFromString(source,'text/html');
 for(const n of doc.querySelectorAll('script,iframe,frame,frameset,object,embed,link,base,meta,portal,svg,math'))n.remove();
 for(const n of doc.querySelectorAll('*'))for(const a of [...n.attributes])if(/^on/i.test(a.name)||['srcdoc','action','formaction'].includes(a.name)||(/^(?:href|src|poster|xlink:href)$/i.test(a.name)&&!a.value.startsWith('#')&&!a.value.startsWith('data:image/')))n.removeAttribute(a.name);
 return '<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:; form-action \'none\'; base-uri \'none\'">'+doc.documentElement.outerHTML;
}
function runDOM(plan){
 let done=false,frame,timer,resolve;const promise=new Promise(r=>resolve=r);
 const finish=r=>{if(done)return;done=true;clearTimeout(timer);frame?.remove();resolve(r)};
 try{
  frame=document.createElement('iframe');frame.setAttribute('sandbox','allow-same-origin');frame.setAttribute('aria-hidden','true');frame.style.cssText='position:fixed;left:-10000px;top:0;width:800px;height:600px;pointer-events:none;';
  frame.onload=async()=>{if(done)return;try{
   const doc=frame.contentDocument,win=frame.contentWindow,checks=[];
   const phases=plan.phases||[{rules:plan.rules||[]}];const sheets=[...doc.styleSheets],media=[];function collect(rules){for(const rule of rules){if(rule.type===4)media.push({rule,original:rule.conditionText});if(rule.cssRules&&rule.type!==7)collect(rule.cssRules)}}for(const sheet of sheets)collect(sheet.cssRules);
   const keyframes=[];function keyframeRules(rules){for(const rule of rules){if(rule.type===7&&rule.cssRules.length>=2)keyframes.push(rule.name);else if(rule.cssRules)keyframeRules(rule.cssRules)}}for(const sheet of sheets)keyframeRules(sheet.cssRules);
   for(const phase of phases){if(phase.media){for(const item of media)if(item.original.replace(/\s/g,'').toLowerCase()===phase.media.replace(/\s/g,'').toLowerCase())item.rule.media.mediaText=phase.active?'all':'not all';await new Promise(r=>requestAnimationFrame(r))}if(phase.width){frame.style.width=phase.width+'px';await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))}
    for(const a of phase.actions||[]){const n=doc.querySelector(a.selector);if(!n)throw Error('لم يُعثر على عنصر التفاعل: '+a.selector);if(a.kind==='style')n.style.setProperty(a.property,a.value);else if(a.kind==='value')n.value=a.value;else if(a.kind==='click')n.click();else if(a.kind==='focus')n.focus();else throw Error('تفاعل HTML غير مدعوم')}
    for(const rule of phase.rules||[]){const nodes=rule.kind==='keyframes'?[]:[...doc.querySelectorAll(rule.selector)],n=nodes[0];let actual;
     if(rule.kind==='keyframes')actual=keyframes.includes(rule.property);else if(rule.kind==='count')actual=nodes.length;else if(rule.kind==='nonempty')actual=nodes.length>0&&nodes.every(n=>n.textContent.trim().length>0);else if(!n)actual=null;else if(rule.kind==='text')actual=n.textContent.trim();else if(rule.kind==='attr')actual=n.getAttribute(rule.property);else if(rule.kind==='style')actual=win.getComputedStyle(n).getPropertyValue(rule.property).trim();else if(rule.kind==='styleDefined')actual=win.getComputedStyle(n).getPropertyValue(rule.property).trim().length>0;else if(rule.kind==='width')actual=Math.round(n.getBoundingClientRect().width);else if(rule.kind==='valid')actual=n.checkValidity();else if(rule.kind==='focus')actual=doc.activeElement===n;else if(rule.kind==='imageLoaded')actual=n.complete&&n.naturalWidth>0;else throw Error('قاعدة DOM غير معروفة');
     checks.push({label:rule.label,expected:JSON.stringify(rule.expected),actual:JSON.stringify(actual),passed:actual===rule.expected});
    }
   }
   finish({kind:'result',checks,preview:safeHTML(plan.language==='css'?'<style>'+plan.source.replace(/</g,'\\3c ')+'</style>'+plan.fixture:plan.source),logs:[]});
  }catch(e){finish({kind:'error',error:{message:e.message,name:e.name,stack:String(e.stack)}})}};
  timer=setTimeout(()=>finish({kind:'timeout',error:{message:'انتهت مهلة معاينة المتصفح؛ لم يُحتسب نجاح.'}}),TIMEOUT);
  frame.srcdoc=safeHTML(plan.language==='css'?'<style>'+plan.source.replace(/</g,'\\3c ')+'</style>'+plan.fixture:plan.source);document.body.append(frame);
 }catch(e){finish({kind:'error',error:{message:e.message}})}
 return{promise,stop:()=>finish({kind:'cancelled'})};
}
function run(source,spec,compiler=root.VueLexiconCompiler){try{const plan=prepare(source,spec,compiler);return ['html','css'].includes(plan.language)?runDOM(plan):runWorker(plan)}catch(e){return{promise:Promise.resolve({kind:'error',error:{message:String(e.message||e),name:e.name||'Error',stack:String(e.stack||''),line:spec.language==='javascript'?e.loc?.line||null:null,column:spec.language==='javascript'&&e.loc?.column!=null?e.loc.column+1:null,phase:e.phase||'prepare'}}),stop(){}}}}
const api={LIMIT,TIMEOUT,prepare,compileVue,run,safeHTML};root.VLexGuidedEvaluator=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
