const fs=require('node:fs'),path=require('node:path');
const root=__dirname,p=path.join(root,'complete/results.json'),r=JSON.parse(fs.readFileSync(p));
const ok=value=>value?.failed?'فشل':'تحقق';
const rows=r.courses.map(x=>`| ${x.id} | ${x.title} | ${x.level} | ${ok(x.ui)} | ${ok(x.preview)} |`).join('\n');
const old=r.legacy.map(x=>`| ${x.id} | ${x.navigation?.title||'—'} | ${ok(x.navigation)} | ${ok(x.reference)} |`).join('\n');
const failed=r.checks.filter(x=>!x.passed);
const text=`# فحص الدروس الحالي — جولة مستقلة محفوظة

- المصدر: الفرع feat/vlex-personal-learning-platform عند commit \`${r.commit}\`، دون تعديل ملفات التشغيل.
- وقت البدء: ${r.started}. وقت الانتهاء: ${r.finished||'لم تكتمل الجولة'}.
- النتيجة: ${r.passed}/${r.total} تحققًا؛ ${failed.length} إخفاقات مسجلة، ${r.courses.length} درسًا جديدًا و${r.legacy.length} درسًا قديمًا.
- الطريقة: Chromium فعلي على Linux، نقرات وكتابة من Playwright على واجهة التطبيق الكاملة. خادم HTTP على 127.0.0.1 بمنفذ عشوائي، وسياق متصفح جديد مستقل. هذه ليست تجربة بشرية على Windows، وليست إعادة تشغيل الاختبارات القديمة وحدها.

## ماذا اختُبر فعليًا

فتح كل درس جديد من قائمته، وتجربة فلاتر المستويات، ومقارنة العنوان والشرح والتعليمات والسؤال والكود الظاهر بالمصدر. في كل درس اختير جواب خاطئ وظهر شرحه البديل ثم جواب صحيح وظهر توضيحه؛ الدروس لم تُقفل. نُقل المصدر من زر «افتح مسودتي في المحاكي» ثم ضُغط «تشغيل المرجع» صراحة؛ التحقق يشمل DOM حقيقيًا وتفاعلات وقيم CSS، ولا يكتفي بإشارة Ready.

أُنشئت مسودة قديمة مستقلة داخل JS-101 بواجهة المحرر، ثم قورنت سلسلة تخزين التقدم القديمة قبل/بعد جميع عمليات نقل الدروس. حُفظت تجارب معدلة في أربعة مسارات HTML/CSS/JavaScript/Vue، واختُبر بقاؤها عند التنقل وتحديث الصفحة وتشغيلها يدويًا. جرى التحقق من بقاء 32 إقرار فهم و32 جوابًا و64 محاولة سؤال بعد تحديث كامل.

الدروس القديمة فُتحت بالنقر على مسارها وزرها في شريط المحاكي الجانبي. جرى التحقق من المحرر، وعدم التشغيل التلقائي أو وجود قفل درجات، ثم تشغيل جميع المراجع والتأكد من الناتج. عُدّل عداد Vue بالنقر، وأُخفيت/أُظهرت قائمة Vue، وأُدخل نموذج HTML صحيح وظهر تأكيد محلي.

## الدروس الجديدة

| المعرّف | العنوان المشاهد | المستوى | الواجهة والسؤال | النقل والتشغيل الفعلي |
|---|---|---|---|---|
${rows}

## الدروس القديمة

| المعرّف | العنوان المشاهد | التنقل والمحرر | الناتج الفعلي |
|---|---|---|---|
${old}

## حدود النتيجة

- دروس TS-101/102/103 تشغّل حلول JavaScript المكافئة الموجودة، ولا تثبت وجود مترجم TypeScript. لا يُدّعى دعم Nuxt أو المشاريع متعددة الملفات.
- صورة HTML-102 من مصدر خارجي لم تُحمّل لأن الشبكة الخارجية حُجبت عمدًا في الجولة. تَحقّق نص alt وخصائص الرابط، ولم يُصنّف تحميل الصورة بأنه ناجح بلا اتصال.
- لم تُجرّب كل الحلول الصحيحة الممكنة ولا كل أخطاء الطلاب. هذه الجولة تختبر أمثلة الدروس المحددة وتفاعلاتها ومسودات مختارة، وليست ضمانًا لكامل صحة المحتوى أو بلوغ الاحتراف.
- تشغيل المرجع لا يمنح صحة تلقائية لكود المتعلم؛ إقرار الفهم ذاتي، والأسئلة قصيرة. المدققات التاريخية داخل الشيفرة ليست أقفال درجات مفروضة على واجهة هذه الدروس.
- لا يثبت هذا التقرير سلامة بقية الصفحات. ملاحظات الوكيل الرئيسي عن الصفحة الرئيسية منفصلة، وأي خلل مؤكد فيها يمنع وصف الموقع كله بالجاهز.
- لم تُستخدم بيانات المستخدم أو التخزين القديم؛ أُنشئ سياق مستقل ولم يُنفّذ استيراد بيانات شخصية أو حذفها.

## الإخفاقات والسجلات

${failed.length?failed.map(x=>`- ${x.name}: ${x.error.split('\n')[0]}`).join('\n'):'لم تُسجّل إخفاقات منتج في هذه الجولة المكتملة.'}

المحاولة الأولى في results.json/run.log فشلت في محدد اختبار يطابق فقرتين بدل فقرة تعليمات واحدة. المحاولة الثانية في fresh/results.json وfresh-run.log قرأت اسم خاصية داخلية غير مُصدّرة من Vue. كلاهما خلل في أداة الفحص، وحُفظت سجلاتهما دون حذف. الجولة المصححة تعتمد simulatorReferenceCode المصدّرة وتفحص الناتج الحقيقي؛ لا تغيير في مصدر الموقع لتجاوز اختبار.

الدليل التفصيلي القابل للمراجعة: complete/results.json، سجل complete-run.log، صور كل درس في complete/screenshots، وفيديو Chromium الأصلي في complete/video. تتضمن JSON لكل درس عنوانًا وتعليمات وسؤالًا ومرجعًا رسميًا وبصمة المصدر والمخرجات الفعلية قبل/بعد التفاعل وقيود sandbox. الصور لقطات فعلية ولم تُنشأ بصريًا أو تُستبدل بصور تخيلية.
`;
fs.writeFileSync(path.join(root,'REPORT_AR.md'),text);
const imageNames=fs.readdirSync(path.join(root,'complete/screenshots')).filter(f=>f.endsWith('.png'));
fs.writeFileSync(path.join(root,'EVIDENCE_INDEX.html'),'<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>دليل صور الدروس الفعلية</title><style>body{font:18px system-ui;background:#eef3f0;color:#12362a;padding:20px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}figure{margin:0;padding:10px;background:white}img{width:100%;height:350px;object-fit:contain;object-position:top}figcaption{direction:ltr;overflow-wrap:anywhere}</style><h1>صور فعلية من جولة Chromium</h1><p>كل صورة رابط لملفها الأصلي. هذه فهرسة للأدلة وليست واجهة المنتج.</p><div class="grid">'+imageNames.map(f=>`<figure><a href="complete/screenshots/${f}"><img src="complete/screenshots/${f}" loading="lazy"></a><figcaption>${f}</figcaption></figure>`).join('')+'</div></html>');
console.log(JSON.stringify({report:'REPORT_AR.md',images:imageNames.length,passed:r.passed,total:r.total}));
