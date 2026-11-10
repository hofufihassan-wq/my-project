"""Apply exact, field-scoped corrections; retain all IDs and example sources."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[2]
before=json.loads((Path(__file__).parent/'raw-tuples.json').read_text())
source=(root/'lexicon-data.js').read_text()
changes=[]
updates={
'useFetch()':(4,'أداة جلب بيانات في Nuxt 3 تدير data وpending وerror وrefresh وتتكامل مع SSR ونقل البيانات إلى المتصفح. ليست جزءًا من Vue 3 نفسه؛ لدى VueUse أداة بالاسم نفسه لكن بواجهة وسلوك مختلفين، فلا تُخلط أمثلتهما. تتطلب هذه الصيغة سياق Nuxt ولا تعمل في مشغل Vue المستقل هنا.'),
 'typeof':(4,'معامل أحادي يعيد سلسلة نصية تصف نوع قيمة أو تعبير، مثل string أو number أو boolean أو object أو function أو undefined. يُقيّم التعبير عادةً؛ وله سلوك خاص مع اسم غير معرّف، ولا يتجاوز منطقة الموت المؤقتة لمتغيرات let وconst.'),
'JSON.stringify / parse':(4,'أداتان قياسيتان في كائن JSON: تحول stringify القيم القابلة للتمثيل إلى نص JSON، وتحول parse نص JSON صالحًا إلى قيمة JavaScript. ليستا نسخًا عميقًا عامًا؛ تفشل stringify مع المراجع الدائرية وBigInt افتراضيًا، وقد تحذف أو تغير بعض القيم مثل undefined والدوال.'),
'WeakMap / WeakSet':(4,'هياكل بيانات تحتفظ بمراجع ضعيفة (Weak References) لمفاتيح WeakMap أو قيم WeakSet؛ تقبل الكائنات والرموز غير المسجلة عالميًا (Non-registered Symbols) في البيئات الداعمة، مما يسمح بجمعها من الذاكرة عندما تزول المراجع القوية إليها.'),
'Math.random() / Math.floor()':(4,'تُعيد Math.random() رقمًا شبه عشوائي أكبر من أو يساوي 0 وأصغر من 1. تُستخدم مع Math.floor() لتوليد أعداد صحيحة لأغراض مثل محاكاة النرد؛ ليست آمنة لتوليد كلمات السر أو الرموز الأمنية، ولتلك الأغراض استخدم crypto.getRandomValues().'),
'Date & Intl.DateTimeFormat':(4,'كائن Date يمثل التاريخ والوقت، وتنسق Intl.DateTimeFormat التواريخ والأوقات بحسب اللغة والتقويم والمنطقة الزمنية. أما عبارات مثل «قبل 5 دقائق» فتستخدم Intl.RelativeTimeFormat بعد حساب الفرق الزمني، وليست وظيفة Intl.DateTimeFormat.'),
'structuredClone()':(4,'دالة في المتصفحات وNode.js الحديثة تنشئ نسخة عميقة من القيم المدعومة بخوارزمية Structured Clone، ومنها Date وSet وMap والمراجع الدائرية. لا تدعم كل القيم: الدوال وعناصر DOM مثلًا تسبب DataCloneError، ولا تحافظ على سلسلة prototype المخصصة للكائنات.'),
':key':(4,'خاصية خاصة تساعد Vue على تتبع هوية العناصر وإعادة استخدامها وترتيبها. يُوصى بمفتاح فريد وثابت مع v-for، خصوصًا للمكونات والعناصر ذات الحالة؛ لكنه ليس شرطًا نحويًا لكل حلقة، وقد يستخدم Vue التحديث في المكان عند غيابه.'),
'v-for':(4,'توجيه لتكرار رسم العناصر في القالب بناءً على مصفوفة أو كائن أو مدى رقمي بصياغة مثل item in items. يُوصى بإضافة :key فريد وثابت لتتبع هوية العناصر، خصوصًا عند إعادة ترتيب مكونات أو عناصر ذات حالة؛ وليس إلزاميًا نحويًا في كل استخدام.'),
'justify-content & align-items':(4,'خصائص للمحاذاة في Flexbox وGrid: في Flexbox تعمل justify-content على المحور الرئيسي وalign-items على المحور المتعامد. في Grid توزع justify-content مسارات الشبكة على المحور السطري، بينما تحاذي align-items العناصر داخل مناطقها على المحور الكتلي.'),
'z-index':(4,'تتحكم في ترتيب التكديس للعناصر المتموضعة ولعناصر Flex وGrid. تُقارن قيمها داخل سياق التكديس نفسه؛ لا تضمن قيمة أعلى أن يظهر عنصر فوق عناصر من سياق تكديس آخر.'),
}
for term,(field,new) in updates.items():
 t=next(t for t in before if t[1]==term);old=t[field]
 encoded=json.dumps(old,ensure_ascii=False)
 assert source.count(encoded)==1 or source.count(json.dumps(new,ensure_ascii=False))==1,(term,source.count(encoded))
 source=source.replace(encoded,json.dumps(new,ensure_ascii=False),1)
 changes.append({'term':term,'field':field,'before':old,'after':new})
t=next(t for t in before if t[1]=='filter()')
for old,new in [
(t[14][1],'filter نفسها لا تعدل المصفوفة الأصلية، لكن دالة رد الاتصال قد تعدل الكائنات أو تسبب آثارًا جانبية؛ والنسخة الناتجة سطحية.'),
(t[14][2],'تُبقي filter العنصر عندما تعيد دالة رد الاتصال قيمة truthy، وتستبعده عند قيمة falsy؛ لا يلزم إرجاع boolean صريح.')]:
 assert source.count(json.dumps(old,ensure_ascii=False))==1 or source.count(json.dumps(new,ensure_ascii=False))==1
 source=source.replace(json.dumps(old,ensure_ascii=False),json.dumps(new,ensure_ascii=False),1)
 changes.append({'term':'filter()','field':'14:codeBreakdown','before':old,'after':new})
(root/'lexicon-data.js').write_text(source)
(Path(__file__).parent/'content-corrections.json').write_text(json.dumps(changes,ensure_ascii=False,indent=2)+'\n')
print(f'{len(updates)+1} terms, {len(changes)} field corrections; sources untouched')
