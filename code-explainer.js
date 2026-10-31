/* Page controller: immutable source snapshots, cancellable worker, session-only state. */
(function(root){'use strict';
function createController({Vue,terms,onSimulator,onTerm,notify}){
 const{ref,computed,watch}=Vue,source=ref(''),language=ref('javascript'),result=ref(null),busy=ref(false),error=ref(''),selected=ref(1),detail=ref('brief'),mobileTab=ref('source');let worker=null,timer=null,deadline=null,revision=0;
 const termIndex=terms.map(t=>({term:t,keys:t.term.toLowerCase().split(/[\s/(),]+/).map(x=>x.replace(/[<>]/g,'')).filter(Boolean)}));
 const line=computed(()=>result.value?.lines[selected.value-1]||null);
 const descriptions=computed(()=>line.value?line.value.annotations.map(id=>result.value.entries[id]):[]);
 const issues=computed(()=>result.value?.diagnostics.filter(x=>x.line===selected.value)||[]);
 const related=computed(()=>{const words=new Set(descriptions.value.flatMap(x=>x.terms).map(x=>String(x).toLowerCase().replace(/[<>()]/g,'')));return termIndex.filter(x=>x.keys.some(k=>words.has(k))).slice(0,8).map(x=>x.term)});
 function rawOffset(position){let normalized=0;for(let i=0;i<source.value.length;i++){if(normalized===position)return i;if(source.value[i]==='\r'&&source.value[i+1]==='\n')i++;normalized++;}return source.value.length;}
 function updateSource(event){const element=event.target,next=element.value,old=source.value.replace(/\r\n?/g,'\n');let a=0,b=0;while(a<old.length&&a<next.length&&old[a]===next[a])a++;while(b<old.length-a&&b<next.length-a&&old[old.length-1-b]===next[next.length-1-b])b++;const start=element.selectionStart,end=element.selectionEnd;source.value=source.value.slice(0,rawOffset(a))+next.slice(a,next.length-b)+source.value.slice(rawOffset(old.length-b));Vue.nextTick(()=>{element.selectionStart=start;element.selectionEnd=end;});}
 function pasteSource(event){if(!event.clipboardData)return;const text=event.clipboardData.getData('text/plain'),element=event.target,start=element.selectionStart,end=element.selectionEnd;event.preventDefault();source.value=source.value.slice(0,rawOffset(start))+text+source.value.slice(rawOffset(end));Vue.nextTick(()=>{element.selectionStart=element.selectionEnd=start+text.replace(/\r\n?/g,'\n').length;});}
 function cancel(){if(timer)clearTimeout(timer);if(deadline)clearTimeout(deadline);timer=deadline=null;if(worker)worker.terminate();worker=null;busy.value=false;}
 function analyze(){cancel();const id=++revision;result.value=null;error.value='';if(!source.value)return;if(new TextEncoder().encode(source.value).length>131072){error.value='المصدر أكبر من128KiB. بقي النص الأصلي كاملًا؛ لم يبدأ التحليل.';return;}if(typeof Worker!=='function'){error.value='Worker غير متاح في هذا المتصفح؛ لا ننفذ التحليل الكبير في واجهة الموقع.';return;}busy.value=true;const snapshot=source.value,lang=language.value;
 try{worker=new Worker(new URL('code-explainer.worker.js',document.baseURI));worker.onmessage=e=>{if(e.data?.id!==id||id!==revision||source.value!==snapshot||language.value!==lang)return;clearTimeout(deadline);deadline=null;busy.value=false;if(e.data.error){error.value=e.data.error;result.value=null;}else{result.value=e.data.result;selected.value=Math.min(Math.max(1,selected.value),result.value.lines.length);}if(worker)worker.terminate();worker=null;};worker.onerror=()=>{if(id!==revision)return;cancel();error.value='تعذر تحميل المحللات المحلية أو إكمال التحليل. تحقق من ملفات النسخة؛ المصدر لم يتغير.';};deadline=setTimeout(()=>{if(id!==revision)return;cancel();error.value='تجاوز التحليل مهلة5 ثوانٍ؛ أوقفنا Worker وأبقينا المصدر دون تعديل.';},5000);worker.postMessage({id,source:snapshot,language:lang});}catch(_){cancel();error.value='تعذر إنشاء Worker. استخدم خادمHTTP محليًا وافحص دعم المتصفح.';}
 }
 watch([source,language],()=>{++revision;cancel();result.value=null;error.value='';timer=setTimeout(analyze,350);},{flush:'sync'});
 function choose(number,showDetails=true){if(!Number.isInteger(number)||!result.value?.lines[number-1])return;selected.value=number;if(showDetails&&root.innerWidth<900)mobileTab.value='details';}
 function transfer(){if(!source.value.trim())return;onSimulator({code:source.value,type:({javascript:'javascript',html:'html',css:'css',vue:'vue'})[language.value],legacyClosers:false,title:'نسخة من صفحة شرح الأكواد · '+language.value});}
 function download(){const blob=new Blob([source.value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='VueLexicon-source.'+({javascript:'js',html:'html',css:'css',vue:'vue'})[language.value];a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function openTerm(term){onTerm(term);}
 function dispose(){++revision;cancel();}
 return{updateSource,pasteSource,source,language,result,busy,error,selected,detail,mobileTab,line,descriptions,issues,related,analyze,choose,transfer,download,openTerm,dispose};
}
root.VueLexiconExplainer={createController};
})(window);
