/* Bounded educational assessment. Student source runs only in a terminable Worker. */
(function(root){
'use strict';
function prepare(source,task,parser){
 if(typeof source!=='string'||!source.trim()||source.length>16000)throw Error('اكتب حلًا لا يتجاوز 16000 محرف.');
 let ast;try{ast=parser(source,{sourceType:'script'})}catch(e){throw Error('خطأ صياغة: '+String(e.message).slice(0,300))}
 const names=new Set(['undefined','NaN','Infinity','Math','Number']);let target=null;
 const walk=(n,fn,parent=null,key='')=>{if(!n||typeof n!=='object')return;fn(n,parent,key);for(const k of Object.keys(n)){if(['loc','tokens','comments','leadingComments','trailingComments','innerComments','extra','errors'].includes(k))continue;const v=n[k];if(Array.isArray(v))v.forEach(x=>walk(x,fn,n,k));else if(v&&typeof v==='object')walk(v,fn,n,k)}};
 walk(ast.program,n=>{if(n.type==='VariableDeclarator'&&n.id.type==='Identifier'){names.add(n.id.name);if(n.id.name===task.name)target=n.init}if(['ArrowFunctionExpression','FunctionExpression','FunctionDeclaration'].includes(n.type)){if(n.id)names.add(n.id.name);for(const p of n.params){if(p.type!=='Identifier')throw Error('غير مدعوم هنا: استخدم معاملات بأسماء بسيطة.');names.add(p.name)}}});
 if(target?.type!=='ArrowFunctionExpression')throw Error('عرّف '+task.name+' بدالة سهمية. هذا شرط المهارة منفصل عن صحة الناتج.');
 if(ast.program.body.some(n=>!['VariableDeclaration','FunctionDeclaration','EmptyStatement'].includes(n.type)))throw Error('غير مدعوم: ضع الحسابات داخل الدالة واكتفِ بالتعريفات في المستوى الأعلى.');
 const allowed=new Set(['Program','VariableDeclaration','VariableDeclarator','Identifier','ArrowFunctionExpression','FunctionExpression','FunctionDeclaration','BlockStatement','ReturnStatement','ExpressionStatement','AssignmentExpression','UpdateExpression','IfStatement','ForStatement','WhileStatement','DoWhileStatement','BreakStatement','ContinueStatement','EmptyStatement','BinaryExpression','LogicalExpression','UnaryExpression','ConditionalExpression','NumericLiteral','StringLiteral','BooleanLiteral','NullLiteral','ArrayExpression','MemberExpression','CallExpression']);
 const props=new Set(['filter','map','reduce','length','push','abs','min','max','isFinite','isInteger']);
 walk(ast.program,(n,p,k)=>{
  if(!allowed.has(n.type)||n.async||n.generator)throw Error('غير مدعوم في هذا التقييم: '+n.type+'. النطاق دوال عددية ومصفوفات متزامنة دون DOM أو حزم.');
  if(n.type==='MemberExpression'&&(n.computed||n.property.type!=='Identifier'||!props.has(n.property.name)))throw Error('غير مدعوم: الوصول إلى هذه الخاصية خارج نطاق التمرين.');
  if(['AssignmentExpression','UpdateExpression'].includes(n.type)&&(n.left||n.argument).type!=='Identifier')throw Error('غير مدعوم: لا تغيّر خصائص الكائنات في الحل.');
  if(n.type==='Identifier'&&!(p?.type==='MemberExpression'&&k==='property')&&!names.has(n.name))throw Error('اسم غير مدعوم أو غير معرّف في التمرين: '+n.name);
 });
 return{source,name:task.name,cases:task.cases};
}
function workerBootstrap(config){
 'use strict';
 const NativeFunction=Function,isArray=Array.isArray,freeze=Object.freeze,parse=JSON.parse,stringify=JSON.stringify,numberFinite=Number.isFinite;
 const inputCases=parse(stringify(config.cases));let port=null;
 function initialize(event){if(event.data!=='VLEX_ARROW_INIT'||!event.ports[0]||port)return;port=event.ports[0];self.removeEventListener('message',initialize);const send=port.postMessage.bind(port);
 try{
  const fn=new NativeFunction('"use strict";\n'+config.source+'\n;return '+config.name+';')();
  const checks=[];
  for(let i=0;i<inputCases.length;i++){
   const test=inputCases[i],input=test[0],expected=test[1];let actual,unchanged=true;
   if(config.name==='evenNumbers'){const original=stringify(input);freeze(input);actual=fn(input);unchanged=stringify(input)===original}
   else if(config.name==='add')actual=fn(input[0],input[1]);else actual=fn(input);
   let correct;
   if(isArray(expected)){correct=isArray(actual)&&actual.length===expected.length;for(let j=0;correct&&j<expected.length;j++)correct=actual[j]===expected[j]}
   else correct=typeof actual==='number'&&numberFinite(actual)&&actual===expected;
   checks[i]={passed:correct&&unchanged,label:'الحالة '+(i+1),expected:stringify(expected),actual:typeof actual==='number'||typeof actual==='undefined'?String(actual):isArray(actual)&&actual.length<30?stringify(actual):'نوع ناتج غير مناسب'};
  }
  send({kind:'result',checks});
 }catch(e){send({kind:'error',text:typeof e?.message==='string'?e.message.slice(0,500):'تعذر تنفيذ الحل'})}
 }
 self.addEventListener('message',initialize);
}
function broker(config){
 let worker,url,port,timer;const send=data=>parent.postMessage({source:'VLEX_ARROW',runId:config.runId,...data},'*');
 function stop(){clearTimeout(timer);worker?.terminate();port?.close();if(url)URL.revokeObjectURL(url)}
 try{
  url=URL.createObjectURL(new Blob(['('+config.bootstrap+')('+JSON.stringify(config.plan)+')'],{type:'text/javascript'}));worker=new Worker(url);const channel=new MessageChannel();port=channel.port1;
  port.onmessage=e=>{const d=e.data;if(d?.kind==='result'&&Array.isArray(d.checks)&&d.checks.length===config.plan.cases.length){stop();send(d)}else if(d?.kind==='error'&&typeof d.text==='string'){stop();send(d)}};
  worker.onerror=()=>{stop();send({kind:'error',text:'خطأ في العامل المعزول'})};
  timer=setTimeout(()=>{stop();send({kind:'timeout',text:'تجاوز الحل مهلة 1500 مللي ثانية؛ أُوقف العامل.'})},1500);
  worker.postMessage('VLEX_ARROW_INIT',[channel.port2]);
 }catch(_){stop();send({kind:'unsupported',text:'تعذر تشغيل Worker في هذا المتصفح.'})}
 addEventListener('pagehide',stop);
}
function documentFor(plan,runId){const json=JSON.stringify({plan,runId,bootstrap:String(workerBootstrap)}).replace(/</g,'\\u003c');return '<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\' \'unsafe-eval\' blob:; worker-src blob:; connect-src \'none\'"><script>('+String(broker)+')('+json+');<\/script>'}
function valid(data,runId,count){return data&&data.source==='VLEX_ARROW'&&data.runId===runId&&(['timeout','unsupported','error'].includes(data.kind)&&typeof data.text==='string'&&data.text.length<=1000||data.kind==='result'&&Array.isArray(data.checks)&&data.checks.length===count&&data.checks.every(c=>c&&typeof c.passed==='boolean'&&['label','expected','actual'].every(k=>typeof c[k]==='string'&&c[k].length<2000)))}
const api={prepare,documentFor,valid};root.VLexArrowEvaluator=api;if(typeof module==='object')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
