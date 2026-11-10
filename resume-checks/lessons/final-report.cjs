const fs=require('node:fs'),path=require('node:path'),root=__dirname,folder='verified-after-fixes';
const r=JSON.parse(fs.readFileSync(path.join(root,folder,'results.json')));if(!r.finished)throw Error('The full walkthrough has not finished; no readiness report generated.');
const supplementaryPath=path.join(root,'legacy-expanded/results.json');const supplementary=fs.existsSync(supplementaryPath)?JSON.parse(fs.readFileSync(supplementaryPath)):null;const supplementaryOK=supplementary?.passed===15&&supplementary?.total===15&&supplementary?.sourceStable;
const state=x=>x?.failed?'تعثر: راجع السجل':'تحقق';
const rows=r.courses.map(x=>`| ${x.id} | ${x.title} | ${state(x.ui)} | ${state(x.preview)} |`).join('\n');
const legacy=r.legacy.map(x=>`| ${x.id} | ${x.navigation?.title||'—'} | ${state(x.navigation)} | ${state(x.reference)}${supplementaryOK?'؛ متابعة موسعة: '+(supplementary.lessons.find(l=>l.id===x.id)?.passed?'تحقق':'تعثر'):''} |`).join('\n');
const failed=r.checks.filter(x=>!x.passed),baseline=JSON.parse(fs.readFileSync(path.join(root,'complete/results.json')));
const text=`# نتائج الدروس بعد إصلاح fragment — جولة متصفح مستقلة

بدأت الجولة ${r.started} وانتهت ${r.finished}. النتيجة ${r.passed}/${r.total} تحققًا؛ المصدر بقي ثابتًا أثناء الجولة: **${r.sourceStable?'نعم':'لا'}** وفق مقارنة بصمات ملفات التشغيل قبل/بعد. ${supplementaryOK?'أُعيدت الدروس القديمة في جولة موسعة منفصلة بعد ذلك: **15/15**، والمصدر ثابت خلالها أيضًا.':''}

الفرع \`${r.branch}\`، وأساس Git عند بدء الجولة \`${r.commit}\`. شُغّلت نسخة working tree متضمنة إصلاح preview-runner فوق هذا الأساس؛ الفرق الكامل موجود في results.json بحقل sourceDiffAtStart، وليست النتيجة منسوبة إلى HEAD نظيف. بصمة preview-runner.js المختبر: \`${r.sourceHashesBefore['preview-runner.js']}\`. توجد بصمات app.js/index.html/المناهج/التخزين/CSS/manifest قبل وبعد في الملف نفسه.

هذه جولة جديدة في Chromium الحقيقي على Linux، بنقرات وكتابة من Playwright على التطبيق الكامل. استُخدم خادم HTTP خاص بـ127.0.0.1، وسياق متصفح مستقل، وحُجبت الشبكة الخارجية. ليست تجربة بشرية على جهاز Windows. لم يعدّل هذا الوكيل ملفات تشغيل المنتج أو بيانات المستخدم، ولم ينشئ commit أو يرفع/ينشر شيئًا.

## ما تثبته الجولة

- فُتح كل درس من الدروس الجديدة الـ32 بالنقر، وشُوهد العنوان والشرح والمثال والتعليمات والسؤال. طابقت النصوص المصدر، وعملت فلاتر المستويات، ولم تُفرض أقفال.
- اختير جواب خاطئ ثم صحيح في كل درس؛ ظهر شرح بديل ثم توضيح الجواب الصحيح. بقيت 32 إجابة و32 إقرار فهم و64 محاولة بعد تحديث كامل.
- نُقل كل مصدر إلى المحاكي بزر المسودة دون تشغيل تلقائي أو استبدال مسودة JS-101 التجريبية السابقة، ثم ضُغط تشغيل المرجع صراحة. شُوهد DOM الناتج والتفاعل المطلوب، ولم يُكتف بإشارة Ready.
- جرى إدخال نماذج، وفتح details بلوحة المفاتيح والنقر، وتغيير عدادات JS/Vue، والبحث بـcomputed، ومتابعة watch، وتبديل props/emits، وعكس قائمة مع بقاء حالة المكون مرتبطة بمعرّفه. اختُبر نجاح/فشل Promise المعالج، وإضافة/حذف عناصر بتفويض الأحداث، وقيم CSS الفعلية والاستجابة390/768، وتقليل الحركة.
- حُفظت مسودات معدلة في HTML/CSS/JavaScript/Vue، وبقيت عند التنقل والتحديث، وظهرت إضافاتها الفعلية في المعاينة. قورنت سلسلة التخزين القديمة خلال النقل للتأكد من عدم تغيرها.
- فُتحت الدروس القديمة الـ15 بالنقر على المسار والدرس، وظهر محررها دون درجات أو أقفال. في الجولة الأساسية تعثرت نقرة عداد VUE-101 في اللوحة غير الموسعة، وبقي العدد0؛ بقية14مرجعًا نجحت. ${supplementaryOK?'في المتابعة المنفصلة legacy-expanded أُعيد فتح جميع15درسًا وفحص المحرر ثم تشغيل المرجع في التوسيع الموجود؛ نجحت15/15، وزاد العداد بالنقر0→1. لا يُعرض نجاح المتابعة بوصفه إصلاحًا لقيد القص.':''}

## قبل/بعد والقيود الباقية

قبل الإصلاح انتهت جولة تابلت768 غير الموسعة بـ${baseline.passed}/${baseline.total}. كان رابط #goal يغادر srcdoc إلى صفحة التطبيق داخل iframe، وأُثبت ذلك بالنقر وEnter في العرض المرن؛ الأدلة القديمة محفوظة في desktop وBASELINE_FINDINGS_AR.md. بعد الإصلاح صار رابط الدرس يعمل ضمن المستند في الجولة الحالية.

لا تعني مقارنة الأعداد أن كل الإخفاقات القديمة أصلحها fragment: معظم إخفاقات النقر كانت عند قص معاينة768 داخل لوحة أضيق. سجّلت focused/results.json وصول بعض النقرات إلى IFRAME في الأم أو mouseup وحده في الابن، بينما نجحت النقرات في العرض المرن. الجولة الحالية استخدمت **زر توسيع المعاينة الموجود** ثم مقاس768 لضمان ظهور كامل الإطار؛ لم تُغيّر CSS أو التصميم، ولم تستخدم evaluate(click) لتجاوز النقر الحقيقي. يبقى سلوك النقر في المعاينة غير الموسعة الأعرض من اللوحة بحاجة لتجربة بشرية على جهاز المستخدم وحسم سبب القص/التمرير/الأتمتة. لا يُعد نجاح التوسيع إصلاحًا لهذه الحالة.

لا تثبت الجولة كل الحلول الصحيحة المحتملة أو كل أخطاء الطلاب أو بلوغ الاحتراف. دروس TS القديمة تشغّل JavaScript المكافئ، ولا يوجد إثبات مترجم TypeScript أو دعم Nuxt/مشاريع متعددة الملفات. صورة HTML-102 الخارجية لم تُحمّل في البيئة المقيدة؛ تحقق alt والرابط دون ادعاء عمل الصورة بلا اتصال. ليست هذه شهادة جاهزية لجميع صفحات الموقع، وملاحظات الصفحة الرئيسية والصفحات التنظيمية لدى الوكيل الرئيسي مستقلة.

## الدروس الجديدة — ملاحظة لكل معرّف

| المعرّف | العنوان المشاهد | الواجهة والأسئلة | التشغيل والتفاعل في المعاينة الموسعة |
|---|---|---|---|
${rows}

## الدروس القديمة

| المعرّف | العنوان المشاهد | التنقل والمحرر | المرجع الفعلي |
|---|---|---|---|
${legacy}

## السجلات والأدلة

${failed.length?failed.map(x=>`- ${x.name}: ${x.error.split('\n')[0]}`).join('\n'):'لا إخفاقات مسجلة في هذه الجولة المحددة.'}

${supplementaryOK?'جولة المتابعة القديمة: legacy-expanded/results.json وسجل legacy-expanded-run.log، وصور HTML-103/CSS-103/VUE-101 في legacy-expanded/screenshots وفيديوها الأصلي في legacy-expanded/video. تُحفظ بصمات المصدر وcommit عند بدايتها في JSON.':''}

نتائج JSON ومخرجات DOM قبل/بعد وصياغة التوقعات وبصمات المصدر: verified-after-fixes/results.json. سجل التنفيذ: verified-after-fixes-run.log. صور كل درس وصور محاكي مختارة: verified-after-fixes/screenshots. فيديو المتصفح الأصلي: verified-after-fixes/video. فهرس الصور: FINAL_EVIDENCE_INDEX.html. يوجد فيديو baseline بصيغة MP4 في desktop/native-interactions.mp4. كل الصور والفيديوهات ناتجة من المتصفح، ولم تُنشأ صور تخيلية.

بقيت سجلات المحاولات الأولى والوسيطة وwide المجهضة دون حذف. تشرح BASELINE_FINDINGS_AR.md أخطاء أداة الفحص وحدود النتائج القديمة. لا يُستعمل أي سجل جزئي لإعلان نجاح كامل.
`;
fs.writeFileSync(path.join(root,'FINAL_LESSONS_REPORT_AR.md'),text);
const files=fs.readdirSync(path.join(root,folder,'screenshots')).filter(x=>x.endsWith('.png'));
fs.writeFileSync(path.join(root,'FINAL_EVIDENCE_INDEX.html'),'<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>صور الدروس بعد الإصلاح</title><style>body{font:18px system-ui;background:#eef3f0;color:#12362a;padding:20px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}figure{margin:0;padding:10px;background:white}img{width:100%;height:350px;object-fit:contain;object-position:top}figcaption{direction:ltr;overflow-wrap:anywhere}</style><h1>صور متصفح فعلية بعد إصلاح fragment</h1><p>فهرس أدلة؛ اضغط صورة لفتح الأصل.</p><div class="grid">'+files.map(f=>`<figure><a href="${folder}/screenshots/${f}"><img src="${folder}/screenshots/${f}" loading="lazy"></a><figcaption>${f}</figcaption></figure>`).join('')+'</div></html>');
console.log(JSON.stringify({report:'FINAL_LESSONS_REPORT_AR.md',images:files.length,passed:r.passed,total:r.total,sourceStable:r.sourceStable}));
