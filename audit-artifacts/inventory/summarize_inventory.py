import json,csv,re
from pathlib import Path
out=Path(__file__).parent
run=json.loads((out/'browser-inventory.json').read_text()); terms=json.loads((out/'hydrated-terms.json').read_text()); secondary={r['term']:r for r in json.loads((out/'secondary-review.json').read_text())['findings']};changes=json.loads((out/'content-corrections.json').read_text())
assert len(run['rows'])==360 and len(terms)==180
assert not any(r.get('harnessError') or r.get('timedOut') for r in run['rows'])
expectedLogs={
'bind() / call() / apply()':['مرحباً الأستاذ طارق'], 'console.log':['95'], 'filter()':['لوحة مفاتيح','فأرة ميكانيكية'], 'find()':['u2','سارة'], 'forEach()':['[#1]','[#2]','[#3]'], 'JSON.stringify / parse':['string','زيد'], 'map()':['37.5','93.75','187.5','375'], 'Object.keys/entries':['views: 1200','likes: 450','shares: 89'], 'Promise':['الخادم يعمل بكفاءة'], 'push() / splice()':['مراجعة الكود','كتابة اختبارات E2E','نشر التحديث'], 'reduce()':['210$'], 'Set / Map':['1','2','3','4','5'], 'setTimeout()':['بداية العملية','1500ms'], 'switch':['الحساب قيد المراجعة'], 'Template Literals':['حيدر','Nuxt 3','خبير متقدم'], 'try / catch':['تم اصطياد خطأ','تُنفذ هذه الكتلة دائماً'], 'typeof':['string','number','boolean','function','undefined','object'], 'var':['تمت الكتابة فوق المتغير'], 'yield':['ID_100','ID_101'], 'String.replace() / replaceAll()':['NuxtLexicon'], 'RegExp (test / match)':['true'], 'structuredClone()':['dark'], 'URL & URLSearchParams':['category=nuxt','tab=code']}
codeAsText={'computed()','defineAsyncComponent()','defineExpose()','nextTick()','onMounted()','onUnmounted()','provide() / inject()','reactive()','shallowRef() / shallowReactive()','toRef() / toRefs()','useSlots() / useAttrs()','watch() / watchEffect()','watchPostEffect()'}
htmlExpected={'<button>':'button','class':'div','<div>':'div','<header> / <footer>':'header','<h1>-<h6>':'h1','<input>':'input','<label>':'label','<main>':'main','<nav>':'nav','<option>':'option','<p>':'p','<section>':'section','<select>':'select','<span>':'span','<table>':'table','<ul> / <li>':'ul'}
rows=[]
for r in run['rows']:
 t=next(t for t in terms if t['id']==r['id']); source=r['source']; isVue=r['format']=='vue'; s=secondary.get(r['term'],{});logs=r.get('final',{}).get('logs',[]);errors=' ; '.join(l['msg'] for l in logs if l['type']=='error');text=r.get('after',{}).get('text',''); html=r.get('after',{}).get('html','');logtext='\n'.join(l['msg'] for l in logs)
 expectation=s.get('vueExpected' if isVue else 'vanillaContextOrEffect') or ('إظهار أثر مفهوم '+r['term']+' كما في المصدر؛ لا يكفي إشعار الجاهزية.')
 status='يحتاج سياقًا';reason='لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه.';verified='تم التشغيل وفحص DOM والسجل، ولم تُثبت كل الدلالة التعليمية.'
 if r['category']=='css':
  status='يحتوي خطأً' if isVue else 'يحتاج سياقًا'
  reason='قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية.' if isVue else 'CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر.'
 elif isVue and r['term'] in codeAsText:
  status='يحتوي خطأً';reason='JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور.'
 elif isVue and (r['category'] in ['nuxt','ts'] or r['term'] in ['useState()','useFetch()']):
  status='غير مدعوم';reason='المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع.'
 elif r['term']=='localStorage':
  status='غير مدعوم';reason='الوصول للتخزين من إطار opaque ممنوع بسبب sandbox؛ لا ينبغي إضافة allow-same-origin لتشغيل هذا المثال.'
 elif r['term']=='export / import':
  status='يحتوي خطأً' if isVue else 'غير مدعوم';reason='Vue: استيراد وتصدير داخل execute مع خلط ملفين، فلا يجتاز الصياغة. Vanilla: require/module تخص Node CommonJS غير المتوفر في المتصفح.'
 elif not isVue and r['term'] in ['Type Narrowing & Guards','tsconfig.json']:
  status='يحتوي خطأً';reason='return خارج دالة في JavaScript.' if r['term']=='Type Narrowing & Guards' else 'JSON خام يُرسل لمشغل JavaScript؛ ملف إعدادات ليس برنامجًا مستقلاً قابلاً للتنفيذ.'
 elif errors and r['term']!='try / catch':
  status='يحتاج سياقًا';reason=errors
  if 'غير مدعوم' in errors or 'المكوّن' in errors or 'require is not defined' in errors or 'module is not defined' in errors: status='غير مدعوم'
 elif isVue and r['term'] in expectedLogs and all(piece in logtext for piece in expectedLogs[r['term']]):
  status='يعمل';reason='طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي.';verified='تحقق من المخرجات المذكورة، وليس جميع المدخلات/الفروع أو كل API مجمّع في اسم المصطلح.'
 elif isVue and r['term']=='addEventListener()' and any(d['example']=={'id':r['id'],'format':r['format']} and d['message']=='تم النقر!' for d in run['dialogs']):
  status='يعمل';reason='نقر الزر أظهر alert بالنص المقصود.';verified='اختبار نقر فعلي في الطفل؛ لا يثبت بقية أنواع الأحداث.'
 elif isVue and r['term']=='ref()' and 'العدد: 1' in text:
  status='يعمل';reason='نقر العداد حدّث القيمة من 0 إلى 1 في DOM.';verified='تفاعل محدد مع ref مرجعي.'
 elif isVue and r['term']=='v-model' and 'مراجعة مستقلة' in text:
  status='يعمل';reason='إدخال نص فعلي انعكس في الفقرة المرتبطة.';verified='حقل نص فعلي، لا كل أنماط v-model.'
 elif isVue and r['term']=='<slot>' and 'عنوان افتراضي' in text:
  status='يعمل';reason='ظهر محتوى fallback الموجود بالفعل في المصدر.';verified='fallback فقط؛ تمرير slots من مكون أب غير مختبر ولا مُختلق.'
 elif isVue and r['term']=='Date & Intl.DateTimeFormat' and any(l['type']=='log' and l['msg'].strip() for l in logs):
  status='يعمل';reason='أنتج المنسق تاريخًا عربيًا حقيقيًا في Console.';verified='تنسيق التاريخ، لا العبارات الزمنية النسبية أو جميع المناطق الزمنية.'
 elif r['category']=='html' and not errors:
  if not isVue and r['term']=='<canvas>':
   status='يحتوي خطأً';reason='إغلاق script مخزن حرفيًا <\\/script> غير صالح كإغلاق HTML؛ لم يظهر الرسم المقصود.'
  elif not isVue and r['term'] in ['<audio>','<video>','<iframe>','<img>','<a>']:
   reason='عنصر ظاهر لكن مورده/تنقله خارجي أو مقيد بالعزل؛ لم يتحقق تشغيل الوسائط/التنقل الخارجي.'
  elif not isVue and r['term'] in ['<details> / <summary>','<dialog>','<form>','<template>']:
   reason='ظهر HTML الأصلي، لكن دورة تفاعله الكاملة لم تُثبت في هذه الجولة؛ template خامَل بطبيعته ويحتاج تهيئة/استخدامًا.'
  elif r['term'] in htmlExpected and re.search(r'<'+htmlExpected[r['term']]+r'(?:\s|>)',html):
   status='يعمل';reason='وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ.';verified='عرض HTML الموجود فقط؛ لا يثبت الأحداث غير المنفذة ولا جميع سلوكيات العنصر.'
 if any(e['example']=={'id':r['id'],'format':r['format']} for e in run['unexpected']):
  status='يحتاج سياقًا';reason+=' خطأ متأخر مُسجل في pageerror؛ المثال يحتاج input معرّفًا قبل مؤقته.'
 rows.append({'id':r['id'],'category':r['category'],'term':r['term'],'format':r['format'],'status':status,'reason':reason,'expected':expectation,'actualText':text,'actualLogs':logs,'state':r.get('final',{}).get('state'),'syntax':'رفض المشغل المصدر/تشخيص في السجل' if errors or r.get('initial',{}).get('state')=='error' else 'قبله المشغل في هذا الاختبار؛ لا يثبت ذلك صحة دلالته','runtimeSupport':reason,'contextOrMissing':s.get('vueContextOrDefect' if isVue else 'vanillaContextOrEffect','') or reason,'interaction':r['interactions'],'verificationScope':verified,'officialReference':r['officialReference'],'source':source})
termrows=[]
for t in terms:
 termrows.append({'id':t['id'],'category':t['category'],'term':t['term'],'definition':t['description'],'syntaxInfo':t['syntaxInfo'],'returnProps':t['returnProps'],'descriptionReview':'قراءة أولية للتعريف، لا تصديق شامل لكل حقل أو لكل تفصيل من مرجع خارجي.','contentNotes':secondary.get(t['term'],{}).get('contentNotes',[]),'corrections':[c for c in changes if c['term']==t['term']],'reference':t['docUrl'],'exampleRows':[r for r in rows if r['id']==t['id']]})
summary={k:sum(r['status']==k for r in rows) for k in ['يعمل','يحتاج سياقًا','غير مدعوم','يحتوي خطأً']}
meta={'base':run['base'],'timestamp':run['timestamp'],'counts':{'terms':180,'sources':360,'actualDomSnapshots':sum('before' in r for r in run['rows']),'attemptedControlInteractions':sum(len(r['interactions']) for r in run['rows']),'harnessErrors':0,'timeouts':0,'initialDefinitionsRead':180,'secondarySourceReviews':74,'correctedTerms':12,'correctedStrings':13},'statuses':summary,'limits':'Works is scoped to observable behavior described per row. No claim of complete semantic correctness; declaration-only examples and all context-dependent features are not marked works. Reference URLs supplied for180; only saved official source documents fetched. No context fixtures inserted.'}
(out/'complete-inventory.json').write_text(json.dumps({'metadata':meta,'terms':termrows},ensure_ascii=False,indent=2)+'\n')
with (out/'complete-inventory.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=['id','category','term','format','status','reason','expected','state','syntax','contextOrMissing','verificationScope','officialReference','actualText'],extrasaction='ignore');w.writeheader();w.writerows(rows)
lines=['# جرد القاموس: 180 مصطلحًا / 360 مصدر مثال','',f'الأساس الثابت: `{run["base"]}`. وقت التشغيل `{run["timestamp"]}`.','',f'النتائج: {json.dumps(summary,ensure_ascii=False)}.','',meta['limits'],'','لم يُستخدم Ready كدليل صحة. كل صف يحيل إلى DOM وسجل فعليين في browser-inventory.json؛ expected من قراءة المصدر ولا يساوي ادعاء النتيجة لكل المدخلات.','', '## جرد جميع المصادر','', '| المعرف | المصطلح | المصدر | الحالة | الدليل / النقص |','|---|---|---|---|---|']
for r in rows:lines.append('| '+' | '.join(str(r[k]).replace('|','\\|').replace('\n',' ') for k in ['id','term','format','status','reason'])+' |')
(out/'COMPLETE_INVENTORY_AR.md').write_text('\n'.join(lines)+'\n');(out/'inventory-summary.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n');print(json.dumps(meta,ensure_ascii=False,indent=2))
