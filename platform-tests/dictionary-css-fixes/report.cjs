const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');const out=__dirname;
const r=JSON.parse(fs.readFileSync(path.join(out,'applied/results.json'),'utf8'));
const ps=JSON.parse(fs.readFileSync(path.join(out,'patches.json'),'utf8'));
if(r.total!==25||r.passed!==25||r.parentErrors.length)throw Error('Final 25-case successful applied pass required');
const c={window:{}};vm.runInNewContext(fs.readFileSync('lexicon-data.js','utf8'),c);const id=t=>t[0]+'-'+(t[1].toLowerCase().replace(/[^a-z0-9_-]/g,'_').replace(/_+/g,'_').replace(/^_|_$/g,'')||'item');
for(const p of ps){const t=c.window.RAW_LEXICON_TUPLES.find(t=>id(t)===p.id);if(t[5]!==p.after)throw Error('Applied source differs: '+p.id)}
const reason='مثال Vue مستقل؛ تحقق المتصفح من الخاصية أو التخطيط والتفاعل المقصود، وليس من رسالة Ready فقط.';
const statuses=ps.map(p=>({id:p.id,format:'vue',field:5,status:'يعمل',reason,expected:p.expected,sourceSha256:crypto.createHash('sha256').update(p.after).digest('hex'),evidence:`platform-tests/dictionary-css-fixes/${r.runDirectory}/results.json`,observed:r.results.find(x=>x.id===p.id).observed}));
fs.writeFileSync(path.join(out,'verified-statuses.json'),JSON.stringify({testedAt:r.time,passed:25,total:25,scope:'25 CSS Vue field5 sources only; actual Chromium isolated dictionary runner; all assertions passed',statuses},null,2)+'\n');
const actual={
'css-animation_keyframes':'مقارنة transform عند 0 و1000ms؛ تغيّر فعلي إلى scale(1.03)، ثم animation:none عند تقليل الحركة.',
'css-aspect-ratio':'نسبة مستطيل16/9 ومربع64×64؛ بقاء النسبة بعد تضييق الإطار.',
'css-background':'radial-gradient حقيقي، لون احتياطي rgb(2,4,32)، وحجم cover.',
'css-border_border-radius':'إطار solid أخضر2px وزوايا16px حول المحتوى.',
'css-box-shadow':'تحويم بمؤشر فعلي؛ انتقال التمويه من25px إلى35px والانتشار من-5px إلى2px.',
'css-color':'لون العنوان rgb(0,220,130) والوصف rgb(148,163,184).',
'css-cursor':'pointer وnot-allowed صحيحان؛ details يفتح ويغلق بالنقر الفعلي؛ الزر الآخر disabled.',
'css-display':'صندوقا Flex في صف واحد؛ العنصر المخفي أبعاده صفر وdisplay:none.',
'css-filter_blur_drop-shadow':'blur(3px) على نص فعلي وdrop-shadow12px على SVG نجمة.',
'css-flex_flexbox':'row وspace-between وcenter؛ قياس مراكز العناصر والفواصل الفعلية.',
'css-gap':'قياس فاصل Flex12px؛ أعمدة Grid32px وصفوف24px.',
'css-grid_css_grid':'نسبة عرض1:2 عند800px، ثم صفان بمحاذاة أفقية واحدة عند500px.',
'css-hover_focus':'تحويم فعلي يغيّر اللون؛ تركيز حقل وكتابة Vue؛ حلقة3px.',
'css-justify-content_align-items':'مطابقة مركز العنصر والحاوية هندسيًا على المحورين.',
'css-linear-gradient':'linear-gradient135deg ولونا البداية والنهاية صحيحان في computedStyle.',
'css-margin_padding':'padding24px وهامش فعلي16px بين البطاقتين؛ قياس إزاحة المحتوى الداخلية.',
'css-media':'column عند500px وrow عند800px مع قياس تغيّر موضع العنصرين.',
'css-opacity_backdrop-filter':'خلفية مخططة فعلية تحت لوحة blur16px وrgba؛ opacity.5 على نص مستقل.',
'css-overflow_overflow-x_y':'scrollHeight يتجاوزclientHeight؛ Ctrl+End فعلي يحرّك القائمة؛ overflow-x:hidden.',
'css-position':'أيقونة absolute في حاوية relative؛16px من اليمين وتوسيط رأسي هندسي.',
'css-scroll-behavior':'نقر حقيقي؛ أحداث scroll تسجّل قيمًا بين0 و320 ثم تصل320؛ reduce-motion:auto.',
'css-transform_transition':'hover فعلي scale1.02 ورفع2px؛ ضغط فعلي scale.98؛ transition.2s.',
'css-user-select':'none/all/text؛ النقر الفعلي يحدد سطر الكود كاملًا.',
'css-width_height':'عرض320px وسقف متجاوب وارتفاع120px؛ مربع80×80؛ تضييق فعلي.',
'css-z-index':'قيم40/50/10؛ elementFromPoint في منطقة التداخل يعيد القائمة الأمامية.'};
const videos=fs.readdirSync(path.join(out,r.runDirectory,'video')).filter(x=>x.endsWith('.webm'));
const text=`# إصلاح مصادر CSS التعليمية في القاموس\n\nتاريخ الاختبار: ${r.time}. الفرع أثناء العمل: \`feat/vlex-personal-learning-platform\`. مرجع العمل المحفوظ قبل هذه الإصلاحات: \`55fab885d1eba6cb48313b407bd6d10432dd2297\`. رقم commit التسليم النهائي يثبته المطوّر المسؤول بعد جمع الإصلاحات.\n\n## النتيجة\n\nاجتازت مصادر Vue الخمسة والعشرون لفئة CSS الاختبار الفعلي داخل مشغّل القاموس المعزول في Chromium: **25/25**. لم يُستخدم Ready وحده دليلًا؛ فُحصت القيم المحسوبة والأبعاد والتحويم والتركيز والنقر والتمرير والحركة وفق المفهوم. لم تظهر أخطاء في التطبيق الأب، ولم تتطلب الأمثلة طلبًا خارجيًا.\n\nفي الاختبار السابق للإصلاح كانت **25/25** مصادر تعرض قالبًا عامًا دون أي عنصر يطابق المحدد الأساسي للمفهوم. كانت قواعد كاملة متداخلة داخل \`.target-element\`، بينما العناصر المستهدفة غير موجودة. لا يعني ذلك أن كل CSS المتداخل مرفوض نحويًا في المتصفحات الحديثة؛ الخطأ المثبت هو عدم تطبيق العرض التعليمي المقصود.\n\n## حدود التغيير\n\nتحتوي [patches.json](patches.json) على المصدر قبل وبعد، والمعرّف الثابت، والحقل5، والسبب، والنتيجة المتوقعة، ومرجع MDN الموجود أصلًا. التغيير خاص بمصدر Vue لكل مصطلح؛ لم أغيّر المعرّفات أو أمثلة Vanilla أو التعريفات أو النسخ الاحتياطية أو المحاكي. أضيفت عناصر HTML حقيقية مع CSS محلي واضح بدل الاعتماد على Tailwind أو مكونات Nuxt غير المتاحة.\n\nمثال scroll-behavior يستخدم زر Vue وref يستدعي scrollTo دون خيار سلاسة داخل JavaScript؛ تحدد CSS السلوك الناعم. استُبعد رابط fragment لأن srcdoc قد يحله نسبة إلى مستند الأب وينتقل بدل التمرير المحلي. يستخدم مثال cursor عنصر details أصليًا، وله فتح وإغلاق حقيقيان دون خدمة أو مكتبة وهمية.\n\n## نتائج كل مثال\n\n| المعرّف الثابت | النتيجة المقاسة | الحالة |\n|---|---|---|\n${ps.map(p=>`| \`${p.id}\` | ${actual[p.id]} | يعمل ضمن الاختبار المذكور |`).join('\n')}\n\n## الأدلة وإعادة التشغيل\n\n- [سجل قبل الإصلاح](baseline/results.json): تأكيد غياب عناصر المفهوم في25 مصدرًا أصليًا.\n- [النتيجة النهائية](applied/results.json): نتائج فعلية وتفاصيل القيم المتوقعة والمقاسة؛ مسار الجولة النهائية \`${r.runDirectory}\`.\n- [تفاصيل الجولة النهائية](${r.runDirectory}/results.json). توجد25 لقطة iframe فعلية في المجلد نفسه، باسم المعرّف.\n- [فيديو المتصفح الفعلي](${r.runDirectory}/video/${videos[0]}).\n- [الحالات القابلة للاستهلاك](verified-statuses.json):25 مصدرًا مع بصمة SHA-256 ونطاق الإثبات.\n- [تشخيص التمرير المستقل](scroll-diagnostic.json): مقاييس حقيقية ومواضع إصابة المؤشر؛ القائمة0→184، والتمرير الناعم0→320.\n\nأمر الإعادة من جذر المستودع:\n\n\`\`\`bash\nPLAYWRIGHT_BROWSERS_PATH=/workspace/.playwright-browsers node platform-tests/dictionary-css-fixes/browser.cjs --applied\n\`\`\`\n\nأمر الأصل السابق للإصلاح يستخدم نص before المحفوظ داخل محرر القاموس فقط ولا يعدّل ملفات التطبيق:\n\n\`\`\`bash\nnode platform-tests/dictionary-css-fixes/browser.cjs --baseline\n\`\`\`\n\nحُفظت جولات التشخيص السابقة مع إخفاقاتها وصورها وفيديوهاتها حيث أُنتجت. عولجت في الاختبار تسمية Vue للمفتاح الحركي scoped، واختيار أول بطاقة من بطاقتين، وانتظار استقرار إصابة مؤشر Chromium للإطار المعزول. تأكد الاختبار النهائي أن النقر وصل العنصر فعلًا، وأن smooth scroll أرسل قيَمًا وسطية؛ لم تُلغَ الشروط لإخفاء فشل.\n\n## ما لا يثبته هذا التقرير\n\nهذا تحقق من25 مصدر CSS بصيغة Vue على Chromium/Linux، وليس اعتمادًا لكل360 مصدر أو لكل تعريف أو لكل متصفح. لم يُشغّل Windows هنا. فحص filter وbackdrop-filter والتدرجات يعتمد على CSS المحسوب والعناصر/الخلفيات الفعلية والصور المرفقة؛ لا يوجد تحليل بكسل منفصل لكل هذه التأثيرات. جرى اختبار200ms/300ms من التحولات المقصودة، لا كل قيمة ممكنة يعدّلها المتعلم.\n\nرُفعت للمطوّر المسؤول ملاحظة منفصلة عن values غير صالحة في نص justify-content القديم؛ أصلح الحقلين6 و14 إلى space-between وspace-around وspace-evenly وسجلها في \`platform-tests/dictionary/css-syntax-corrections.json\`. هذا التصحيح منفصل عن حزمة الحقل5 الموضحة هنا.\n`;
fs.writeFileSync(path.join(out,'REPORT_AR.md'),text);
console.log(JSON.stringify({passed:25,total:25,run:r.runDirectory,statuses:'platform-tests/dictionary-css-fixes/verified-statuses.json',report:'platform-tests/dictionary-css-fixes/REPORT_AR.md',video:videos[0]}));
