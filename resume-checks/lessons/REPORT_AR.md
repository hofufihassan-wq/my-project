# فحص الدروس الحالي — جولة مستقلة محفوظة

- المصدر: الفرع feat/vlex-personal-learning-platform عند commit `1cf220c506a132ae1a43a78f3cb508ee394a48c6`، دون تعديل ملفات التشغيل.
- وقت البدء: 2026-11-07T11:08:12.120Z. وقت الانتهاء: 2026-11-07T11:10:49.240Z.
- النتيجة: 89/101 تحققًا؛ 12 إخفاقات مسجلة، 32 درسًا جديدًا و15 درسًا قديمًا.
- الطريقة: Chromium فعلي على Linux، نقرات وكتابة من Playwright على واجهة التطبيق الكاملة. خادم HTTP على 127.0.0.1 بمنفذ عشوائي، وسياق متصفح جديد مستقل. هذه ليست تجربة بشرية على Windows، وليست إعادة تشغيل الاختبارات القديمة وحدها.

## ماذا اختُبر فعليًا

فتح كل درس جديد من قائمته، وتجربة فلاتر المستويات، ومقارنة العنوان والشرح والتعليمات والسؤال والكود الظاهر بالمصدر. في كل درس اختير جواب خاطئ وظهر شرحه البديل ثم جواب صحيح وظهر توضيحه؛ الدروس لم تُقفل. نُقل المصدر من زر «افتح مسودتي في المحاكي» ثم ضُغط «تشغيل المرجع» صراحة؛ التحقق يشمل DOM حقيقيًا وتفاعلات وقيم CSS، ولا يكتفي بإشارة Ready.

أُنشئت مسودة قديمة مستقلة داخل JS-101 بواجهة المحرر، ثم قورنت سلسلة تخزين التقدم القديمة قبل/بعد جميع عمليات نقل الدروس. حُفظت تجارب معدلة في أربعة مسارات HTML/CSS/JavaScript/Vue، واختُبر بقاؤها عند التنقل وتحديث الصفحة وتشغيلها يدويًا. جرى التحقق من بقاء 32 إقرار فهم و32 جوابًا و64 محاولة سؤال بعد تحديث كامل.

الدروس القديمة فُتحت بالنقر على مسارها وزرها في شريط المحاكي الجانبي. جرى التحقق من المحرر، وعدم التشغيل التلقائي أو وجود قفل درجات، ثم تشغيل جميع المراجع والتأكد من الناتج. عُدّل عداد Vue بالنقر، وأُخفيت/أُظهرت قائمة Vue، وأُدخل نموذج HTML صحيح وظهر تأكيد محلي.

## الدروس الجديدة

| المعرّف | العنوان المشاهد | المستوى | الواجهة والسؤال | النقل والتشغيل الفعلي |
|---|---|---|---|---|
| html-structure | أول صفحة: العنوان والفقرة | beginner | تحقق | تحقق |
| html-attributes | الخصائص والروابط | beginner | تحقق | فشل |
| html-form | مدخلات لها أسماء واضحة | beginner | تحقق | فشل |
| html-semantics | عناصر لها معنى | beginner | تحقق | تحقق |
| css-selectors | من نختار ونلوّن؟ | beginner | تحقق | تحقق |
| css-spacing | الحشو والهامش والحجم | beginner | تحقق | تحقق |
| css-flex | رتّب المهام بـFlexbox | beginner | تحقق | تحقق |
| css-responsive | خلّ الصفحة تناسب الجوال | beginner | تحقق | تحقق |
| js-values | القيم والمتغيرات | beginner | تحقق | تحقق |
| js-conditions | قرار بـif وelse | beginner | تحقق | تحقق |
| js-arrays | المصفوفات والتكرار | beginner | تحقق | تحقق |
| js-events | الدوال والأحداث | beginner | تحقق | فشل |
| vue-ref | ref تربط القيمة بالواجهة | beginner | تحقق | فشل |
| vue-model | v-model: الكتابة تصير بيانات | beginner | تحقق | تحقق |
| vue-list | v-for وv-if وcomputed | beginner | تحقق | تحقق |
| vue-components | المكونات والـprops | beginner | تحقق | تحقق |
| html-accessible-feedback | رسائل مرتبطة بالحقل وتُقرأ عند التغيير | intermediate | تحقق | فشل |
| html-native-validation | تحقق المتصفح من نموذج محلي | intermediate | تحقق | تحقق |
| html-details-disclosure | إظهار التفاصيل بعنصر أصلي | intermediate | تحقق | فشل |
| html-table-relations | جدول بيانات بعلاقات واضحة | intermediate | تحقق | تحقق |
| css-grid-minmax | Grid يتكيف حسب المساحة المتاحة | intermediate | تحقق | تحقق |
| css-flex-min-width | عنصر Flex طويل بدون كسر التخطيط | intermediate | تحقق | تحقق |
| css-custom-properties-clamp | قيم مشتركة وقياس مرن بحدود | advanced | تحقق | فشل |
| css-transition-reduced-motion | تفاعل مرئي يحترم تقليل الحركة | advanced | تحقق | فشل |
| js-closure-counters | Closure: كل عداد يحتفظ بقيمته | intermediate | تحقق | فشل |
| js-async-error-handling | Promise وasync/await مع خطأ متوقع | advanced | تحقق | فشل |
| js-reduce-summary | reduce: حول قائمة إلى ملخص | intermediate | تحقق | تحقق |
| js-event-delegation | مستمع واحد لعناصر تُضاف لاحقًا | advanced | تحقق | فشل |
| vue-computed-filter | computed: نتيجة مشتقة بدون نسخ الحالة | intermediate | تحقق | تحقق |
| vue-watch-side-effect | watch لأثر جانبي واضح | intermediate | تحقق | تحقق |
| vue-props-emits | المكون يستقبل بيانات ويعلن حدثًا | advanced | تحقق | تحقق |
| vue-keyed-component-state | key ثابت يحافظ على هوية المكون | advanced | تحقق | فشل |

## الدروس القديمة

| المعرّف | العنوان المشاهد | التنقل والمحرر | الناتج الفعلي |
|---|---|---|---|
| JS-101 | المتغيرات والقيم والقوالب النصية | تحقق | تحقق |
| JS-102 | اتخاذ القرارات بواسطة if / else | تحقق | تحقق |
| JS-103 | المصفوفات ودالة التحويل map() | تحقق | تحقق |
| HTML-101 | هيكل المستند والعناصر الدلالية | تحقق | تحقق |
| HTML-102 | الروابط والصور وإمكانية الوصول | تحقق | تحقق |
| HTML-103 | النماذج وحقول الإدخال والتحقق | تحقق | تحقق |
| CSS-101 | نموذج الصندوق (Box Model) والمسافات | تحقق | تحقق |
| CSS-102 | نظام التخطيط المرن (Flexbox) | تحقق | تحقق |
| CSS-103 | شبكة CSS المتجاوبة (CSS Grid) | تحقق | تحقق |
| TS-101 | الأنواع الأساسية والتعليقات النوعية | تحقق | تحقق |
| TS-102 | الواجهات (Interfaces) ونماذج البيانات | تحقق | تحقق |
| TS-103 | أنواع الاتحاد والتضييق (Union & Narrowing) | تحقق | تحقق |
| VUE-101 | التفاعلية وعرض البيانات مع ref() | تحقق | تحقق |
| VUE-102 | التوجيهات الشرطية والتكرار (v-if & v-for) | تحقق | تحقق |
| VUE-103 | المكونات وتمرير الخصائص (Props & Components) | تحقق | تحقق |

## حدود النتيجة

- دروس TS-101/102/103 تشغّل حلول JavaScript المكافئة الموجودة، ولا تثبت وجود مترجم TypeScript. لا يُدّعى دعم Nuxt أو المشاريع متعددة الملفات.
- صورة HTML-102 من مصدر خارجي لم تُحمّل لأن الشبكة الخارجية حُجبت عمدًا في الجولة. تَحقّق نص alt وخصائص الرابط، ولم يُصنّف تحميل الصورة بأنه ناجح بلا اتصال.
- لم تُجرّب كل الحلول الصحيحة الممكنة ولا كل أخطاء الطلاب. هذه الجولة تختبر أمثلة الدروس المحددة وتفاعلاتها ومسودات مختارة، وليست ضمانًا لكامل صحة المحتوى أو بلوغ الاحتراف.
- تشغيل المرجع لا يمنح صحة تلقائية لكود المتعلم؛ إقرار الفهم ذاتي، والأسئلة قصيرة. المدققات التاريخية داخل الشيفرة ليست أقفال درجات مفروضة على واجهة هذه الدروس.
- لا يثبت هذا التقرير سلامة بقية الصفحات. ملاحظات الوكيل الرئيسي عن الصفحة الرئيسية منفصلة، وأي خلل مؤكد فيها يمنع وصف الموقع كله بالجاهز.
- لم تُستخدم بيانات المستخدم أو التخزين القديم؛ أُنشئ سياق مستقل ولم يُنفّذ استيراد بيانات شخصية أو حذفها.

## الإخفاقات والسجلات

- course html-attributes transfer without autorun + explicit reference + actual output: locator.getAttribute: Error: strict mode violation: locator('a') resolved to 2 elements:
- course html-form transfer without autorun + explicit reference + actual output: AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:
- course js-events transfer without autorun + explicit reference + actual output: AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
- course vue-ref transfer without autorun + explicit reference + actual output: locator.waitFor: Timeout 10000ms exceeded.
- course html-accessible-feedback transfer without autorun + explicit reference + actual output: AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
- course html-details-disclosure transfer without autorun + explicit reference + actual output: AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
- course css-custom-properties-clamp transfer without autorun + explicit reference + actual output: AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
- course css-transition-reduced-motion transfer without autorun + explicit reference + actual output: AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
- course js-closure-counters transfer without autorun + explicit reference + actual output: AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
- course js-async-error-handling transfer without autorun + explicit reference + actual output: locator.waitFor: Timeout 10000ms exceeded.
- course js-event-delegation transfer without autorun + explicit reference + actual output: AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
- course vue-keyed-component-state transfer without autorun + explicit reference + actual output: locator.waitFor: Timeout 10000ms exceeded.

المحاولة الأولى في results.json/run.log فشلت في محدد اختبار يطابق فقرتين بدل فقرة تعليمات واحدة. المحاولة الثانية في fresh/results.json وfresh-run.log قرأت اسم خاصية داخلية غير مُصدّرة من Vue. كلاهما خلل في أداة الفحص، وحُفظت سجلاتهما دون حذف. الجولة المصححة تعتمد simulatorReferenceCode المصدّرة وتفحص الناتج الحقيقي؛ لا تغيير في مصدر الموقع لتجاوز اختبار.

الدليل التفصيلي القابل للمراجعة: complete/results.json، سجل complete-run.log، صور كل درس في complete/screenshots، وفيديو Chromium الأصلي في complete/video. تتضمن JSON لكل درس عنوانًا وتعليمات وسؤالًا ومرجعًا رسميًا وبصمة المصدر والمخرجات الفعلية قبل/بعد التفاعل وقيود sandbox. الصور لقطات فعلية ولم تُنشأ بصريًا أو تُستبدل بصور تخيلية.
