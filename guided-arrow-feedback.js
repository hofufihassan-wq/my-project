/* Presentation metadata only. No execution, grading or persistence lives here. */
(function(root){
'use strict';
function describe(error,source,parser,kind='error'){
 const raw=typeof error==='string'?error:String(error?.message||'تعذر قراءة رسالة الخطأ');
 const result={kind,raw,original:raw,line:null,column:null,code:'',hint:kind==='timeout'?'راجع شرط انتهاء الحلقة، ثم أعد التشغيل.':kind==='unsupported'?'استخدم نطاق JavaScript المعلن لهذا التمرين.':'راجع الرسالة الأصلية وحاول عزل التعليمة المسببة للخطأ.'};
 // Only the parser's explicit source location is a student line number. Runtime
 // stack offsets belong to generated wrappers and are deliberately never guessed.
 if(kind==='prepare'&&typeof parser==='function')try{parser(source,{sourceType:'script',allowAwaitOutsideFunction:false,allowReturnOutsideFunction:false})}catch(e){
  result.kind='syntax';result.original=String(e.message);result.code=typeof e.code==='string'?e.code:'';
  if(Number.isInteger(e.loc?.line)&&e.loc.line>0&&e.loc.line<=source.split('\n').length&&Number.isInteger(e.loc.column)&&e.loc.column>=0&&e.loc.column<=source.split('\n')[e.loc.line-1].length){result.line=e.loc.line;result.column=e.loc.column+1;}
  result.hint='افحص الأقواس والمعاملات قرب الموضع الذي حدده المحلل؛ قد يبدأ السبب قبل هذا الموضع.';
 }
 if(result.kind==='prepare'){result.kind=/غير مدعوم|خارج نطاق|غير متاح/.test(raw)?'unsupported':'requirement';result.hint=result.kind==='unsupported'?'راجع حدود التشغيل المذكورة بجوار التمرين.':'راجع اسم الدالة والصيغة المطلوبة في وصف المهمة.';}
 return result;
}
const api={describe};root.VLexArrowFeedback=api;if(typeof module==='object')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
