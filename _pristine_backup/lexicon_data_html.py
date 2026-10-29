# -*- coding: utf-8 -*-
HTML_ITEMS = [
  [
    "html",
    "<a>",
    "روابط التشعب والارتباطات الفائقة",
    "a anchor link href رابط تشعبي صفحة ملاحة انتقال موقع",
    "العنصر الأساسي لشبكة الويب العالمية؛ يُستخدم لإنشاء الروابط التشعبية التي تنقل المستخدم إلى صفحات أخرى، أقسام داخل نفس الصفحة، ملفات للتنزيل، أو روابط بريد إلكتروني.",
    "<!-- رابط تشعبي لصفحة خارجية مع معايير الأمان الحديثة -->\n<a\n  href=\"https://ui.nuxt.com\"\n  target=\"_blank\"\n  rel=\"noopener noreferrer\"\n  class=\"text-emerald-400 underline hover:text-emerald-300\"\n>\n  زيارة توثيق Nuxt UI الرسمي ↗\n</a>",
    "<a href=\"url\" [target=\"_blank\"] [rel=\"...\"]>نص الرابط</a>",
    "وسم مزدوج <a>...</a> يحتاج إغلاقاً صريحاً",
    "جميع المتصفحات (معيار HTML الأصلي)",
    [
      "التنقل بين الصفحات والمسارات في المواقع والمنصات",
      "إنشاء أزرار تحميل الملفات المباشرة download=\"filename.pdf\"",
      "القفز إلى عناوين وأقسام محددة داخل نفس الصفحة عبر href=\"#sectionId\""
    ],
    "html_link",
    "<a href=\"/dashboard\">لوحة التحكم</a>",
    "<!-- في Vue / Nuxt نستخدم NuxtLink بدلاً من a لمنع إعادة تحميل الصفحة والاستفادة من SPA: -->\n<NuxtLink to=\"/dashboard\" class=\"text-emerald-400\">لوحة التحكم</NuxtLink>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"
  ],
  [
    "html",
    "<audio>",
    "تضمين وتشغيل المقاطع الصوتية",
    "audio sound player mp3 صوت مقطع مشغل استماع وسائط",
    "عنصر HTML5 القياسي لتضمين وتشغيل الملفات والمقاطع الصوتية مباشرة في المتصفح دون الحاجة لمشغلات فلاش قديمة، مع دعم خيارات التحكم (controls) والتشغيل التلقائي والتكرار.",
    "<audio controls class=\"w-full max-w-md\">\n  <source src=\"https://example.com/audio/pronunciation.mp3\" type=\"audio/mpeg\">\n  <source src=\"https://example.com/audio/pronunciation.ogg\" type=\"audio/ogg\">\n  متصفحك لا يدعم مشغل الصوت المدمج.\n</audio>",
    "<audio controls [autoplay] [loop] [muted]> <source src=\"...\" type=\"...\" /> </audio>",
    "وسم مزدوج <audio>...</audio> يتضمن وسوم <source>",
    "جميع المتصفحات الحديثة",
    [
      "تشغيل النطق الصوتي الصحيح للمصطلحات البرمجية باللغة الإنجليزية",
      "تضمين حلقات البودكاست والمؤثرات الصوتية للألعاب التفاعلية",
      "تطوير مشغلات موسيقى مخصصة عبر JavaScript Audio API"
    ],
    "html_audio",
    "const audio = new Audio('sound.mp3');\naudio.play();",
    "<template>\n  <audio ref=\"audioRef\" :src=\"currentTrackUrl\" @ended=\"nextTrack\" controls />\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio"
  ],
  [
    "html",
    "<button>",
    "أزرار الإجراءات التفاعلية القياسية",
    "button click form submit زر إجراء نقر إرسال تنفيذ أمر",
    "العنصر الدلالي الأساسي لإطلاق الإجراءات التفاعلية وإرسال النماذج؛ يتميز بدعمه التلقائي لإمكانية الوصول (Accessibility)، والتنقل عبر زر Tab، وتنشيطه بمفتاحي المسافة و Enter.",
    "<!-- زر إرسال مع حالات التعطيل والأمان الدلالي -->\n<button\n  type=\"button\"\n  onclick=\"alert('تم تفعيل الزر!')\"\n  class=\"px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:bg-emerald-400\"\n>\n  تنفيذ الأمر التفاعلي\n</button>",
    "<button type=\"button|submit|reset\" [disabled]>نص الزر</button>",
    "وسم مزدوج <button>...</button> يحتاج إغلاقاً صريحاً",
    "كافة المتصفحات العالمية",
    [
      "إرسال استمارات تسجيل الدخول والدفع type=\"submit\"",
      "فتح وإغلاق النوافذ المنبثقة والقوائم المنسدلة",
      "تشغيل العمليات الحسابية وتعديل الحالات في واجهات المستخدم"
    ],
    "html_button",
    "<button id=\"myBtn\" onclick=\"doSomething()\">انقر هنا</button>",
    "<template>\n  <button @click=\"count++\" class=\"btn-emerald\">العدد: {{ count }}</button>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button"
  ],
  [
    "html",
    "<canvas>",
    "مساحة الرسم النقطي ثنائي وثلاثي الأبعاد",
    "canvas 2d 3d webgl graphics رسم نقطي جرافيكس مخططات ألعاب رسومات",
    "عنصر رائع يوفر لوحة رسم فارغة يمكن التحكم في كل بكسل فيها برمجياً عبر JavaScript لإنشاء المخططات البيانية، الرسوم المتحركة، الألعاب، ومعالجة الصور في الوقت الفعلي (WebGL).",
    "<canvas id=\"myCanvas\" width=\"300\" height=\"150\" class=\"border border-emerald-500 rounded\"></canvas>\n\n<script>\nconst canvas = document.getElementById('myCanvas');\nif (canvas) {\n  const ctx = canvas.getContext('2d');\n  ctx.fillStyle = '#00DC82';\n  ctx.fillRect(20, 20, 100, 80);\n}\n<\\/script>",
    "<canvas width=\"pixelWidth\" height=\"pixelHeight\">رسالة بديلة</canvas>",
    "وسم مزدوج <canvas>...</canvas> يتطلب إغلاقاً",
    "كافة المتصفحات الحديثة",
    [
      "رسم المخططات البيانية المعقدة والمؤشرات الحية (مثل Chart.js)",
      "بناء ألعاب المتصفح التفاعلية والتطبيقات ثنائية وثلاثية الأبعاد",
      "تطبيق الفلاتر وقص وضغط الصور محلياً داخل المتصفح"
    ],
    "html_canvas",
    "const ctx = canvas.getContext('2d');\nctx.fillRect(0, 0, 50, 50);",
    "<template>\n  <canvas ref=\"chartCanvas\"></canvas>\n</template>\n<script setup>\nconst chartCanvas = ref(null);\nonMounted(() => initChart(chartCanvas.value));\n<\\/script>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas"
  ],
  [
    "html",
    "class",
    "سمة التجميع والتنسيق الفئوية",
    "class attribute styling selector فئة صنف تنسيق محدد تجميع سمة",
    "السمة الأكثر استخداماً في HTML عالمياً؛ تسمح بتعيين اسم فئة أو أكثر لعنصر ما لاستهدافه عبر محددات CSS (.className) أو تفعيل فئات أطر العمل مثل Tailwind CSS وربطه بـ JavaScript.",
    "<!-- تطبيق أصناف متعددة من Tailwind CSS -->\n<div class=\"p-4 rounded-xl bg-slate-900 border border-emerald-500/20 shadow-lg\">\n  <h4 class=\"text-emerald-400 font-bold\">بطاقة منسقة عبر سمة class</h4>\n</div>",
    "class=\"class1 class2 class3\"",
    "سمة عامة (Global Attribute) يمكن تطبيقها على أي وسم HTML",
    "جميع المتصفحات وأطر عمل الويب",
    [
      "تطبيق تنسيقات CSS ومكتبات الأنماط الخدمية مثل Tailwind CSS",
      "استهداف العناصر وتجميعها في JavaScript عبر getElementsByClassName و querySelectorAll",
      "تبديل الحالات البصرية (مثل .active و .dark و .hidden)"
    ],
    "html_class",
    "el.className = 'active card';\nel.classList.toggle('expanded');",
    "<template>\n  <div :class=\"{ 'bg-emerald-500': isPrimary, 'opacity-50': isDisabled }\">محتوى</div>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class"
  ],
  [
    "html",
    "<details> / <summary>",
    "الأكورديون الدلالي الأصيل بدون جافاسكريبت",
    "details summary accordion collapse كشف طي توسيع أصيل بدون كود دلالي",
    "وسم HTML5 دلالي متألق يسمح بإنشاء أقسام قابلة للطي والتوسيع (Native Accordion) وتتفاعل ذاتياً بالكامل بنقرة واحدة من المستخدم دون الحاجة لكتابة سطر واحد من JavaScript.",
    "<details class=\"p-3 bg-slate-900 rounded-lg border border-slate-800 text-gray-200\">\n  <summary class=\"font-bold cursor-pointer text-emerald-400 select-none\">\n    ما هي ميزة VueLexicon Pro الكبرى؟\n  </summary>\n  <p class=\"mt-2 text-sm text-gray-400 leading-relaxed\">\n    توفير قاعدة بيانات شاملة لأكثر من 150 مصطلحاً ومكوناً مع تجارب حية فورية ومقارنات عملية.\n  </p>\n</details>",
    "<details [open]> <summary>عنوان القسم</summary> المحتوى المخفي </details>",
    "وسوم مزدوجة <details> و <summary> تتطلب إغلاقاً",
    "جميع المتصفحات الحديثة",
    [
      "إنشاء أقسام تفاصيل الدفع والشروط دون الحاجة لمكتبات واجهة إضافية",
      "بناء الأسئلة الشائعة الخفيفة والسريعة الصديقة لمحركات البحث (SEO)",
      "عرض التفاصيل التقنية للأخطاء وتفاصيل الاستجابات في أدوات المطورين"
    ],
    "html_details",
    "// قديماً: كتابة كود JS للاستماع للنقر وتبديل display: none / block",
    "<template>\n  <!-- يعمل بشكل طبيعي وتلقائي 100% -->\n  <details :open=\"isOpen\">\n    <summary>عرض التفاصيل</summary>\n    <p>المحتوى</p>\n  </details>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details"
  ],
  [
    "html",
    "<dialog>",
    "النوافذ الحوارية الدلالية الأصلية بالمتصفح",
    "dialog modal popup native نافذة حوارية أصيلة منبثقة دلالية متصفح طبقة",
    "العنصر القياسي الرسمي في HTML5 لإنشاء النوافذ المنبثقة والحوارية؛ يوفر دوال متصفح مدمجة مثل showModal() و close() مع تعتيم خلفي أصلي (::backdrop) دون أي مكتبات مساعدة.",
    "<dialog id=\"demoDialog\" class=\"p-6 rounded-2xl bg-slate-900 text-white border border-emerald-500 backdrop:bg-black/70\">\n  <h3 class=\"text-lg font-bold text-emerald-400\">نافذة حوار أصلية بالمتصفح!</h3>\n  <p class=\"mt-2 text-gray-300\">تُغلق تلقائياً عند الضغط على Escape.</p>\n  <button onclick=\"document.getElementById('demoDialog').close()\" class=\"mt-4 text-sm text-emerald-300\">\n    إغلاق النافذة\n  </button>\n</dialog>\n\n<button onclick=\"document.getElementById('demoDialog').showModal()\">فتح الحوار</button>",
    "<dialog [open]> ... </dialog>",
    "وسم مزدوج <dialog>...</dialog> يوفر واجهات DOM برمجية (showModal, close)",
    "جميع المتصفحات الحديثة (Chromium, Firefox, Safari)",
    [
      "إنشاء نوافذ التحقق من العمليات الحساسة دون الاعتماد على مكتبات خارجية",
      "الاستفادة من إغلاق النافذة التلقائي بمفتاح Escape وإدارة التركيز المدمجة",
      "بناء نماذج سريعة منبثقة وتأكيدات الحذف"
    ],
    "html_dialog",
    "const dialog = document.querySelector('dialog');\ndialog.showModal();\ndialog.close();",
    "<template>\n  <dialog ref=\"nativeDialog\">\n    <button @click=\"nativeDialog?.close()\">إغلاق</button>\n  </dialog>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog"
  ],
  [
    "html",
    "<div>",
    "الحاوية العامة لتقسيم الكتل وتجميع العناصر",
    "div division container wrapper حاوية عامة تجميع كتلة تقسيم هيكل",
    "العنصر الأكثر استخداماً لتقسيم الكتل وتجميع العناصر في مستند HTML؛ لا يحمل أي معنى دلالي خاص بذاته، ويُستخدم كحاوية لتطبيق التنسيقات بواسطة CSS وشبكات Flexbox و Grid.",
    "<div class=\"flex items-center justify-between p-4 bg-slate-800 rounded-xl\">\n  <span class=\"text-white font-medium\">إجمالي المصطلحات:</span>\n  <span class=\"text-emerald-400 font-bold\">+150</span>\n</div>",
    "<div>محتوى الحاوية</div>",
    "وسم مزدوج <div>...</div> يحتاج إغلاقاً صريحاً",
    "كافة المتصفحات بدون استثناء",
    [
      "تجميع عناصر الواجهة لتطبيق تخطيطات Flexbox و CSS Grid عليها",
      "إنشاء البطاقات، الألواح، والأسطح الزجاجية في التصاميم الحديثة",
      "تغليف العناصر لتطبيق تأثيرات التدرج والظلال عليها"
    ],
    "html_div",
    "<div class=\"wrapper\">...</div>",
    "<template>\n  <div class=\"grid grid-cols-2 gap-4\">...</div>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div"
  ],
  [
    "html",
    "<form>",
    "حاويات النماذج والاستمارات التفاعلية",
    "form submit input action نموذج استمارة إرسال حقول بيانات تحقق",
    "عنصر تجميع حقول الإدخال والتحكم؛ يدير آلية إرسال البيانات (Submit) إلى الخادم أو التعامل معها محلياً في تطبيقات SPA مع دعم تفعيل الفحص التلقائي لمدخلات المستخدم.",
    "<form onsubmit=\"event.preventDefault(); alert('تم إرسال النموذج!');\" class=\"space-y-3\">\n  <input type=\"text\" placeholder=\"اسمك الكريم\" required class=\"p-2 rounded bg-slate-900 border text-white\" />\n  <button type=\"submit\" class=\"px-4 py-2 bg-emerald-500 rounded font-bold text-slate-950\">إرسال</button>\n</form>",
    "<form [action=\"url\"] [method=\"POST|GET\"]> ... </form>",
    "وسم مزدوج <form>...</form> يحتاج إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "إرسال نماذج تسجيل الدخول، إنشاء الحساب، والاتصال بنا",
      "تمكين إرسال النموذج بالضغط على مفتاح Enter من أي حقل إدخال بداخله",
      "تطبيق قواعد التحقق من الصحة (HTML5 Form Validation)"
    ],
    "html_form",
    "form.addEventListener('submit', (e) => {\n  e.preventDefault();\n  sendFormData();\n});",
    "<template>\n  <form @submit.prevent=\"handleSubmit\">\n    <input v-model=\"formData.name\" />\n    <button type=\"submit\">حفظ</button>\n  </form>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form"
  ],
  [
    "html",
    "<h1>-<h6>",
    "عناوين المستند الهرمية والتنظيمية",
    "h1 h2 h3 h4 h5 h6 headings عناوين هرمية سيو ترتيب نصوص مستند",
    "ستة مستويات من العناوين الهيكلية للدلالة على الأهمية النسبية لأقسام الصفحة (h1 هو العنوان الرئيسي الأهم، يليه h2 فالأصغر)، وتلعب دوراً حاسماً في إمكانية الوصول وتهيئة محركات البحث (SEO).",
    "<h1 class=\"text-3xl font-extrabold text-emerald-400\">VueLexicon Pro</h1>\n<h2 class=\"text-xl font-bold text-white mt-2\">المعجم الشامل لمطوري الويب</h2>\n<h3 class=\"text-base font-semibold text-gray-300\">مكتبة Nuxt UI و Vue 3</h3>",
    "<h1>العنوان الرئيسي</h1> ... <h6>العنوان الفرعي الأدنى</h6>",
    "وسوم مزدوجة <hX>...</hX> تتطلب إغلاقاً صريحاً",
    "كافة المتصفحات والأجهزة القارئة للشاشة",
    [
      "تعريف عنوان الصفحة الرئيسي والفريد h1 لتعزيز نتائج محركات البحث",
      "تنظيم المقالات الطويلة وتسهيل قراءتها على المستخدمين",
      "مساعدة قارئات الشاشة في بناء جدول محتويات صوتي للمستخدمين ذوي الإعاقة"
    ],
    "html_heading",
    "<h1>عنوان الصفحة</h1>",
    "<template>\n  <h1 class=\"text-4xl font-black text-emerald-400\">{{ pageTitle }}</h1>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements"
  ],
  [
    "html",
    "<header> / <footer>",
    "الترويسة والذيل الدلاليان للمستند والأقسام",
    "header footer semantic ترويسة ذيل رأس صفحة تذييل دلالي",
    "وسمان دلاليان يعبران عن مقدمة المستند أو القسم (header، وعادة ما يحتوي على الشعار وشريط التنقل) ونهايته (footer، ويحتوي على حقوق النشر، روابط الخصوصية، ومعلومات الاتصال).",
    "<header class=\"border-b border-emerald-500/20 p-4 flex justify-between items-center bg-slate-950/80\">\n  <h1 class=\"text-emerald-400 font-bold\">VueLexicon Pro</h1>\n  <nav class=\"space-x-4 space-x-reverse text-sm text-gray-300\">\n    <a href=\"#\">الرئيسية</a>\n    <a href=\"#\">المصطلحات</a>\n  </nav>\n</header>\n\n<footer class=\"p-4 text-center text-xs text-gray-500\">\n  © 2026 VueLexicon Pro. جميع الحقوق محفوظة.\n</footer>",
    "<header> ... </header> | <footer> ... </footer>",
    "وسوم دلالية مزدوجة تحتاج إغلاقاً",
    "كافة المتصفحات الحديثة",
    [
      "تنظيم الهيكل العام للموقع وتحسين قراءته من قبل محركات البحث",
      "تثبيت شريط الهيدر أعلى الشاشة (Sticky Header) أثناء التمرير",
      "تضمين شروط الاستخدام وروابط التواصل الاجتماعي داخل الذيل"
    ],
    "html_layout",
    "<div class=\"header\">...</div> <div class=\"footer\">...</div>",
    "<template>\n  <header class=\"sticky top-0 z-40 backdrop-blur\">...</header>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header"
  ],
  [
    "html",
    "<iframe>",
    "تضمين صفحات ومستندات الويب المتداخلة",
    "iframe embed sandbox تضمين إطار متداخل فيديو صفحة خارجية",
    "عنصر يسمح بتضمين مستند HTML خارجي كامل داخل الصفحة الحالية، مثل تضمين مقاطع YouTube، الخرائط التفاعلية لـ Google Maps، أو مساحات تجربة الأكواد التفاعلية.",
    "<iframe\n  src=\"https://www.wikipedia.org\"\n  title=\"ويكيبيديا\"\n  width=\"100%\"\n  height=\"200\"\n  sandbox=\"allow-scripts allow-same-origin\"\n  class=\"rounded-xl border border-slate-700\"\n></iframe>",
    "<iframe src=\"url\" title=\"description\" [sandbox=\"...\"]></iframe>",
    "وسم مزدوج <iframe></iframe> يتطلب إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "تضمين مقاطع الفيديو من منصات البث مثل Vimeo و YouTube",
      "عرض المعاينات الحية المعزولة للأكواد وتجارب المستخدمين",
      "دمج بوابات الدفع الإلكترونية المصرفية الآمنة"
    ],
    "html_iframe",
    "<iframe src=\"embed.html\"></iframe>",
    "<template>\n  <iframe :src=\"externalPreviewUrl\" class=\"w-full h-96\" />\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe"
  ],
  [
    "html",
    "<img>",
    "تضمين وعرض الصور والرسومات",
    "img image src alt صورة تضمين رسومات وسائط تحميل",
    "عنصر ذاتي الإغلاق مخصص لعرض الصور في الصفحة؛ يُعد تحديد خاصية alt إلزامياً لضمان إمكانية الوصول ولتوضيح محتوى الصورة في حال تعذر تحميلها أو لمحركات البحث.",
    "<img\n  src=\"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400\"\n  alt=\"خلفية فنية متدرجة بألوان داكنة\"\n  loading=\"lazy\"\n  class=\"w-full max-w-xs rounded-xl shadow-lg border border-emerald-500/30\"\n/>",
    "<img src=\"imageUrl\" alt=\"alternativeText\" [loading=\"lazy\"] />",
    "وسم ذاتي الإغلاق (Void Element) لا يحتاج وسم إغلاق منفصل",
    "كافة المتصفحات بلا استثناء",
    [
      "عرض الصور التوضيحية والشعارات وصور المنتجات في المتاجر",
      "استخدام خاصية loading=\"lazy\" لتأخير تحميل الصور حتى يقترب تمريرها",
      "توفير صور متجاوبة عبر srcset لمختلف أحجام الشاشات"
    ],
    "html_image",
    "<img src=\"photo.jpg\" alt=\"صورة\">",
    "<template>\n  <img :src=\"item.imageUrl\" :alt=\"item.title\" loading=\"lazy\" />\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img"
  ],
  [
    "html",
    "<input>",
    "حقول الإدخال والتقاط بيانات المستخدم",
    "input form text number checkbox حقل إدخال نص رقم مربع نموذج",
    "العنصر الأكثر مرونة وتنوعاً في بناء النماذج؛ يتحول سلوكه ومظهره بالكامل بناءً على قيمة خاصية type المحددة له (مثل text, number, email, password, checkbox, radio, file, date).",
    "<!-- حقل إدخال نصي مع خاصية الإكمال التلقائي -->\n<input\n  type=\"text\"\n  placeholder=\"اكتب مصطلحك هنا...\"\n  class=\"px-4 py-2 bg-slate-900 border border-emerald-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400\"\n/>",
    "<input type=\"text|email|password|...\" [placeholder=\"...\"] [value=\"...\"] />",
    "وسم ذاتي الإغلاق (Void Element)",
    "كافة المتصفحات العالمية",
    [
      "استقبال مدخلات المستخدم في محركات البحث والتصفية",
      "إدخال البيانات المالية والأرقام بدقة مع type=\"number\"",
      "رفع الملفات والمستندات عبر المتصفح باستخدام type=\"file\""
    ],
    "html_input",
    "const val = document.querySelector('input').value;",
    "<template>\n  <input v-model=\"searchTerm\" placeholder=\"ابحث...\" />\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
  ],
  [
    "html",
    "<label>",
    "العناوين التوضيحية لحقول الإدخال",
    "label form accessibility تسمية وسم حقل توضيح سهولة وصول نقر",
    "عنصر دلالي يمثل تسمية توضيحية لعنصر إدخال في النموذج؛ يزيد من مساحة النقر المفيدة بحيث يؤدي النقر على النص داخل label إلى تنشيط حقل الإدخال المقترن به تلقائياً.",
    "<!-- ربط التسمية بالحقل عبر خاصية for المطابقة لـ id الحقل -->\n<div class=\"flex items-center gap-2\">\n  <input type=\"checkbox\" id=\"termsCheck\" class=\"accent-emerald-500\" />\n  <label for=\"termsCheck\" class=\"text-sm text-gray-300 cursor-pointer select-none\">\n    أوافق على الشروط والأحكام (انقر على النص للتفعيل)\n  </label>\n</div>",
    "<label for=\"inputId\">النص التوضيحي</label>",
    "وسم مزدوج <label>...</label> يحتاج إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "تحسين تجربة الاستخدام بتوسيع مساحة النقر على مربعات الاختيار الصغيرة",
      "تمكين قارئات الشاشة للمكفوفين من نطق وصف الحقل فور الوقوف عليه",
      "تنظيم وتنسيق عناصر استمارات تسجيل البيانات"
    ],
    "html_label",
    "<label for=\"username\">اسم المستخدم</label>\n<input id=\"username\" />",
    "<template>\n  <label :for=\"fieldId\">{{ labelText }}</label>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label"
  ],
  [
    "html",
    "<main>",
    "المحتوى الجوهري الأساسي للمستند",
    "main semantic accessibility محتوى أساسي جوهري مستند صفحة دلالي",
    "عنصر دلالي مخصص لاحتواء المحتوى الرئيسي والفريد لصفحة الويب؛ يجب ألا يتكرر في نفس المستند أكثر من مرة واحدة، ويستثني المحتويات المكررة كالأشرطة الجانبية وقوائم الهيدر والفوتر.",
    "<main class=\"container mx-auto px-4 py-8\">\n  <h1 class=\"text-2xl font-bold text-white\">لوحة التحكم التفاعلية</h1>\n  <p class=\"text-gray-400 mt-2\">المحتوى الجوهري الخاص بهذه الصفحة تحديداً.</p>\n</main>",
    "<main> المحتوى الأساسي </main>",
    "وسم دلالي مزدوج يتطلب إغلاقاً",
    "كافة المتصفحات الحديثة",
    [
      "توجيه محركات البحث بدقة إلى المحتوى الفريد الذي تمثله الصفحة",
      "تسهيل قفز قارئات الشاشة مباشرة للمحتوى الأساسي (Skip to main content)",
      "فصل الهيكل الجوهري عن الأشرطة الثابتة في التصميم"
    ],
    "html_main",
    "<div id=\"main-content\">...</div>",
    "<template>\n  <main class=\"flex-1\">\n    <router-view />\n  </main>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main"
  ],
  [
    "html",
    "<nav>",
    "أشرطة وروابط الملاحة والتنقل",
    "nav navigation links ملاحة تنقل قائمة روابط هيدر",
    "عنصر دلالي يحدد قسماً في الصفحة يحتوي على روابط الملاحة الأساسية للتنقل بين صفحات الموقع أو الانتقال بين أقسام الصفحة الطويلة.",
    "<nav class=\"flex gap-4 p-3 bg-slate-900 rounded-lg text-sm text-gray-300\">\n  <a href=\"#\" class=\"text-emerald-400 font-bold\">الرئيسية</a>\n  <a href=\"#\" class=\"hover:text-white\">المصطلحات</a>\n  <a href=\"#\" class=\"hover:text-white\">معمل Nuxt UI</a>\n</nav>",
    "<nav> <a href=\"...\">...</a> </nav>",
    "وسم دلالي مزدوج يتطلب إغلاقاً",
    "كافة المتصفحات الحديثة",
    [
      "بناء القوائم الرئيسية وأشرطة الهيدر للتنقل",
      "إنشاء أشرطة الحروف الأبجدية A-Z للتصفية الملاحية",
      "تحسين فهم محركات البحث للروابط الهيكلية الأهم في موقعك"
    ],
    "html_nav",
    "<div class=\"menu-links\">...</div>",
    "<template>\n  <nav class=\"flex items-center space-x-2\">\n    <NuxtLink to=\"/\">الرئيسية</NuxtLink>\n  </nav>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav"
  ],
  [
    "html",
    "<option>",
    "خيارات القوائم المنسدلة",
    "option select dropdown خيار قائمة منسدلة عنصر تحديد قيمة",
    "يُستخدم داخل عناصر <select> أو <datalist> لتمثيل خيار فردي متاح يمكن للمستخدم اختياره، مع تحديد قيمة value التي تُرسل برمجياً والنص المقروء للمستخدم.",
    "<select class=\"bg-slate-900 text-white p-2 rounded border border-slate-700\">\n  <option value=\"\" disabled selected>اختر لغة البرمجة المفضلة...</option>\n  <option value=\"js\">JavaScript (ES6+)</option>\n  <option value=\"vue\">Vue.js 3</option>\n  <option value=\"nuxt\">Nuxt UI</option>\n</select>",
    "<option value=\"val\" [selected] [disabled]>نص الخيار</option>",
    "وسم مزدوج <option>...</option>",
    "كافة المتصفحات العالمية",
    [
      "توفير عناصر اختيار اللغات والبلدان في النماذج",
      "تحديد خيارات الفلترة والتصنيف في القوائم المنسدلة",
      "تزويد قوائم الإكمال التلقائي datalist بالخيارات المقترحة"
    ],
    "html_select",
    "<option value=\"vue\">Vue 3</option>",
    "<template>\n  <option v-for=\"opt in options\" :key=\"opt.val\" :value=\"opt.val\">\n    {{ opt.label }}\n  </option>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option"
  ],
  [
    "html",
    "<p>",
    "الفقرات النصية الإنشائية",
    "p paragraph text فقرة نصية نص شرح وصف مقال",
    "العنصر الدلالي القياسي لكتابة الفقرات النصية في الويب؛ يوفر افتراضياً هوامش علوية وسفلية مناسبة للقراءة ويفصل الكتل النصية بوضوح وفق معايير الطباعة.",
    "<p class=\"text-gray-300 leading-relaxed text-sm\">\n  يُعد VueLexicon Pro بوابتك الذكية لفهم أدق تفاصيل منظومة Vue و Nuxt ومفاهيم JavaScript الحديثة.\n</p>",
    "<p>نص الفقرة هنا...</p>",
    "وسم مزدوج <p>...</p> يتطلب إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "كتابة شروحات المصطلحات والفقرات التوضيحية للمكونات",
      "عرض نصوص المقالات والمشاركات والتعليقات",
      "عرض رسائل المساعدة والإرشادات التوجيهية في النماذج"
    ],
    "html_paragraph",
    "<p>مرحباً بالعالم</p>",
    "<template>\n  <p class=\"text-slate-300\">{{ item.description }}</p>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p"
  ],
  [
    "html",
    "<section>",
    "الأقسام الدلالية المستقلة ذات الموضوع الموحد",
    "section semantic division قسم مستقل موضوع موحد دلالي جزء صفحة",
    "عنصر دلالي يعبر عن قسم مستقل موضوعياً في المستند (مثل قسم من نحن، قسم الميزات، أو قسم شريط البحث الذكي) وعادة ما يبدأ بعنوان h2-h6 خاص به.",
    "<section class=\"py-6 px-4 bg-slate-900/50 rounded-2xl border border-slate-800\">\n  <h2 class=\"text-xl font-bold text-emerald-400 mb-2\">قسم مستشار Nuxt UI</h2>\n  <p class=\"text-gray-400 text-sm\">استكشف مكونات مكتبة واجهة المستخدم الأكثر تطوراً.</p>\n</section>",
    "<section> <h2>عنوان القسم</h2> ... </section>",
    "وسم دلالي مزدوج يتطلب إغلاقاً",
    "كافة المتصفحات الحديثة",
    [
      "تقسيم صفحات الهبوط (Landing Pages) إلى قطاعات موضوعية متناسقة",
      "فصل مناطق العمل الرئيسية في التطبيق (قسم البحث، قسم الفهرس، قسم التفاصيل)",
      "تحسين دلالات السيو والتسلسل المنطقي لصفحات الويب"
    ],
    "html_section",
    "<div class=\"section-block\">...</div>",
    "<template>\n  <section aria-labelledby=\"section-title\">...</section>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section"
  ],
  [
    "html",
    "<select>",
    "القوائم المنسدلة القياسية للاختيار",
    "select dropdown form اختيار قائمة منسدلة نموذج تحديد خيارات",
    "عنصر نموذج أصيل يتيح للمستخدم اختيار قيمة واحدة أو أكثر من قائمة خيارات منسدلة باستخدام وسوم <option> الداخلية، ويدعم التخصيص الكامل لحدث onChange.",
    "<select class=\"px-3 py-2 bg-slate-900 border border-emerald-500/40 rounded-lg text-white\">\n  <option value=\"all\">عرض جميع الأقسام</option>\n  <option value=\"vue\">Vue.js 3</option>\n  <option value=\"nuxt\">Nuxt UI</option>\n</select>",
    "<select [name=\"...\"] [multiple]> <option ...>...</option> </select>",
    "وسم مزدوج <select>...</select> يحتاج إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "اختيار العملات واللغات في شريط الهيدر",
      "تصفية وفرز البيانات حسب الأحدث أو الأعلى تقييماً",
      "اختيار الفئات الرئيسية في استمارات إنشاء المحتوى"
    ],
    "html_select",
    "selectEl.addEventListener('change', (e) => console.log(e.target.value));",
    "<template>\n  <select v-model=\"activeCategory\">\n    <option value=\"all\">الكل</option>\n  </select>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select"
  ],
  [
    "html",
    "<span>",
    "الحاوية النصية السطرية المدمجة (Inline)",
    "span inline container حاوية سطرية نص مدمج تلوين جزء نص",
    "حاوية نصية سطرية (Inline) لا تحمل دلالة خاصة؛ تُستخدم لعزل وتنسيق كلمة أو جزء صغير من النص داخل فقرة دون كسر السطر وتوليد سطر جديد مثل div.",
    "<p class=\"text-gray-300\">\n  يتألق التصميم بلمسات من اللون\n  <span class=\"text-[#00DC82] font-bold\">الأخضر الزمردي</span>\n  المستوحى من هوية Nuxt.\n</p>",
    "<span>نص مدمج</span>",
    "وسم مزدوج <span>...</span> يتطلب إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "تمييز وتلوين كلمات مفتاحية معينة داخل النصوص والشروحات",
      "احتواء الأيقونات الصغيرة والشارات والأرقام التوضيحية",
      "تطبيق تأثيرات بصرية خاصة على أحرف معينة"
    ],
    "html_span",
    "<span class=\"highlight\">كلمة</span>",
    "<template>\n  <span :class=\"badgeClass\">{{ count }}</span>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span"
  ],
  [
    "html",
    "<table>",
    "جداول البيانات الهيكلية المنظمة",
    "table thead tbody tr th td جدول بيانات خلايا صفوف أعمدة هيكلي",
    "العنصر الرسمي لعرض البيانات المجدولة ثنائية الأبعاد (صفوف وأعمدة)؛ يتكامل مع <thead> للعناوين، و <tbody> للبيانات، و <tr> للصفوف، و <td> للخلايا.",
    "<table class=\"w-full text-sm text-right text-gray-300 border border-slate-800\">\n  <thead class=\"bg-slate-900 text-emerald-400\">\n    <tr>\n      <th class=\"p-2\">المصطلح</th>\n      <th class=\"p-2\">القسم</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class=\"border-t border-slate-800\">\n      <td class=\"p-2 font-mono\">computed()</td>\n      <td class=\"p-2\">Vue.js 3</td>\n    </tr>\n  </tbody>\n</table>",
    "<table> <thead><tr><th>...</th></tr></thead> <tbody><tr><td>...</td></tr></tbody> </table>",
    "وسم مزدوج <table>...</table> يحتاج إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "عرض جداول المقارنة البرمجية بين Vanilla JS و Vue 3",
      "عرض فواتير الشراء وسجلات النشاط المالي للمستخدمين",
      "جداول مقارنة الخطط والأسعار في منصات SaaS"
    ],
    "html_table",
    "// كتابة كود تكرار وإنشاء عناصر tr و td يدوياً",
    "<template>\n  <table>\n    <tr v-for=\"row in rows\" :key=\"row.id\"><td>{{ row.text }}</td></tr>\n  </table>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table"
  ],
  [
    "html",
    "<template>",
    "حاويات القوالب الخاملة في المتصفح",
    "template fragment virtual dom قالب خامل شظية حاوية افتراضية هيكل",
    "وسم حاوية فريد في HTML5 لا يُعرض محتواه نهائياً عند تحميل الصفحة؛ في Vue.js يلعب دوراً جوهرياً كحاوية لكتل القوالب وكشظية افتراضية (Fragment) لتطبيق التوجيهات دون توليد وسم div زائد في DOM.",
    "<template>\n  <!-- حاوية قالب لا تولد وسماً حقيقياً في شجرة DOM -->\n  <div class=\"card\">\n    <h3 class=\"text-emerald-400\">مكون Vue Lexicon</h3>\n    <template v-if=\"isLoaded\">\n      <span>المحتوى جاهز</span>\n      <span>بيانات إضافية</span>\n    </template>\n  </div>\n</template>",
    "<template> محتوى القالب غير المرئي </template>",
    "وسم مزدوج <template>...</template> خامل في المتصفح ونشط في محرك Vue",
    "كافة المتصفحات الحديثة ومحركات قوالب الويب",
    [
      "تطبيق v-if أو v-for على عدة عناصر معاً دون إضافة وسم div غير مرغوب فيه إلى DOM",
      "تسمية وتمرير فتحات المكونات المخصصة <template #header>",
      "حفظ قوالب HTML الأصلية بالمتصفح لاستنساخها برمجياً عبر cloneNode"
    ],
    "html_template",
    "const t = document.querySelector('#tpl');\nconst clone = t.content.cloneNode(true);",
    "<template>\n  <template v-for=\"n in 3\" :key=\"n\">...</template>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template"
  ],
  [
    "html",
    "<ul> / <li>",
    "القوائم غير المرتبة والعناصر النقطية",
    "ul li unordered list bullet قائمة غير مرتبة عناصر نقطية تعداد",
    "العنصر القياسي لإنشاء القوائم النقطية غير المرتبة؛ يمثل <ul> الحاوية العامة للقائمة، ويمثل <li> كل عنصر فردي بداخلها؛ يُستخدم على نطاق واسع في بناء أشرطة التنقل وقوائم الميزات.",
    "<ul class=\"space-y-2 text-sm text-gray-300\">\n  <li class=\"flex items-center gap-2\">\n    <span class=\"text-emerald-400\">✓</span> أكثر من 150 مصطلح ومكون\n  </li>\n  <li class=\"flex items-center gap-2\">\n    <span class=\"text-emerald-400\">✓</span> معمل تفاعلي حي لمكتبة Nuxt UI\n  </li>\n</ul>",
    "<ul> <li>عنصر 1</li> <li>عنصر 2</li> </ul>",
    "وسوم مزدوجة <ul> و <li> تتطلب إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "بناء أشرطة القوائم الجانبية وقوائم التنقل في الهيدر",
      "عرض حالات الاستخدام (Use Cases) النقطية في بطاقة تفاصيل المصطلح",
      "سرد ميزات وخصائص المنتجات في صفحات الهبوط"
    ],
    "html_list",
    "<ul>\n  <li>العنصر الأول</li>\n</ul>",
    "<template>\n  <ul>\n    <li v-for=\"item in list\" :key=\"item\">{{ item }}</li>\n  </ul>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul"
  ],
  [
    "html",
    "<video>",
    "تضمين وتشغيل مقاطع الفيديو الأصلية",
    "video media player mp4 فيديو مقطع مشغل وسائط مرئي متصفح",
    "عنصر HTML5 المدمج لتشغيل وتضمين مقاطع الفيديو الرقمية في المتصفح بجودة عالية، مع خيارات التحكم الكاملة (controls)، التشغيل التلقائي (autoplay)، وكتم الصوت (muted).",
    "<video\n  controls\n  poster=\"https://example.com/poster.jpg\"\n  class=\"w-full max-w-md rounded-xl border border-emerald-500/30 shadow-lg\"\n>\n  <source src=\"https://example.com/video/intro.mp4\" type=\"video/mp4\">\n  متصفحك لا يدعم مشغل الفيديو المدمج.\n</video>",
    "<video controls [poster=\"...\"] [autoplay] [muted] [loop]> <source ...> </video>",
    "وسم مزدوج <video>...</video> يتضمن وسوم <source>",
    "كافة المتصفحات الحديثة",
    [
      "عرض الفيديوهات التعريفية للمنتجات ودورات الشرح التعليمية",
      "تشغيل خلفيات الفيديو المتحركة الصامتة (muted autoplay loop) في واجهات الهبوط",
      "تطوير مشغلات فيديو مخصصة للتدريب عن بعد"
    ],
    "html_video",
    "const vid = document.querySelector('video');\nvid.play();",
    "<template>\n  <video ref=\"videoEl\" :src=\"src\" controls @play=\"onPlay\" />\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video"
  ]
]
