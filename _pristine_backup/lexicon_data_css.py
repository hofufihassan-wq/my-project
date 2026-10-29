# -*- coding: utf-8 -*-
CSS_ITEMS = [
  [
    "css",
    "animation & @keyframes",
    "الرسوم المتحركة والإطارات المفتاحية",
    "animation keyframes transition css حركة رسوم متحركة إطارات انسياب تدفق",
    "ميزة CSS3 القوية لتصميم حركات ورسوم متحركة معقدة عبر تعريف مراحل التغيير في إطارات مفتاحية (@keyframes) مثل 0% و 50% و 100% دون كتابة كود JavaScript.",
    "@keyframes pulseGlow {\n  0%, 100% {\n    box-shadow: 0 0 15px rgba(0, 220, 130, 0.2);\n    transform: scale(1);\n  }\n  50% {\n    box-shadow: 0 0 30px rgba(0, 220, 130, 0.6);\n    transform: scale(1.03);\n  }\n}\n\n.pulse-card {\n  animation: pulseGlow 2s infinite ease-in-out;\n}",
    "animation: name duration timing-function delay iteration-count direction; @keyframes name { ... }",
    "قاعدة أنماط CSS ومحدد إطارات مفتاحية",
    "جميع المتصفحات الحديثة",
    [
      "تطبيق النبضات الضوئية المتوهجة حول الأزرار والشارات النشطة",
      "تحريك مؤشرات التحميل الدوارة (Spinners)",
      "بناء التأثيرات الجذابة لصفحات الهبوط وبطاقات المنتجات"
    ],
    "css_animation",
    "// قديماً: حساب مواضع العناصر يدوياً في حلقة requestAnimationFrame!",
    "/* حديثاً: كود CSS نقي عالي الأداء معالَج ببطاقة الرسوميات GPU: */\n.badge { animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/animation"
  ],
  [
    "css",
    "aspect-ratio",
    "تثبيت وتحديد نسبة الأبعاد التناسبية",
    "aspect-ratio ratio responsive أبعاد نسبة تناسبية شاشة عرض ارتفاع",
    "خاصية CSS عصرية فائقة الفائدة تتيح تحديد نسبة ثابتة بين العرض والارتفاع للعنصر (مثل 16 / 9 للفيديو أو 1 / 1 للمربعات والصور الشخصية) لمنع القفزات التخطيطية (Layout Shift).",
    ".video-wrapper {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  background-color: #0F172A;\n  border-radius: 1rem;\n}\n\n.avatar-square {\n  width: 64px;\n  aspect-ratio: 1 / 1;\n}",
    "aspect-ratio: width / height;",
    "خاصية CSS تحدد أبعاد النسبة الرياضية",
    "كافة المتصفحات الحديثة",
    [
      "حجز مساحة مقاطع الفيديو والصور المتجاوبة قبل تحميلها لتجنب وميض CLS",
      "إنشاء بطاقات مربعة متناسقة تماماً aspect-ratio: 1/1",
      "بناء حاويات الخرائط ومخططات الرسوم البيانية المتجاوبة"
    ],
    "css_aspect_ratio",
    "// قديماً كانت تتطلب حيلة معقدة: padding-top: 56.25% داخل حاوية نسبية!",
    "/* حديثاً بسطر واحد أنيق ومباشر: */\n.responsive-media { aspect-ratio: 16 / 9; }",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio"
  ],
  [
    "css",
    "background",
    "تنسيق الخلفيات والتدرجات اللونية",
    "background color image gradient خلفية تدرج لوني صورة تغطية تكرار",
    "خاصية مجمعة (Shorthand) تتيح تحديد لون الخلفية، الصور، التدرجات الخطية والشعاعية، تكرارها، موقعها، وحجمها (cover, contain) داخل عنصر التصميم.",
    ".nuxt-hero-surface {\n  background: radial-gradient(circle at 50% 0%, rgba(0, 220, 130, 0.15) 0%, #020420 70%);\n  background-color: #020420;\n  background-size: cover;\n}",
    "background: [color] [image] [repeat] [position] / [size];",
    "خاصية CSS تنسيقية مجمعة",
    "كافة المتصفحات العالمية",
    [
      "تصميم خلفية التطبيق الداكنة العميقة المستوحاة من Nuxt UI (#020420)",
      "إنشاء التدرجات اللونية المتوهجة (Gradients) للبطاقات والأزرار",
      "ضبط صور الهيدر لملء المساحة بالكامل باستخدام background-size: cover"
    ],
    "css_background",
    "el.style.backgroundColor = '#020420';",
    "<!-- في Tailwind CSS: -->\n<div class=\"bg-gradient-to-r from-emerald-500 to-teal-700\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/background"
  ],
  [
    "css",
    "border & border-radius",
    "الحدود وحواف الزوايا المستديرة",
    "border border-radius rounded حدود حواف زوايا مستديرة إطار بطاقة",
    "تحدد خاصية border سُمك ونمط ولون الإطار الخارجي للعنصر، بينما تحدد border-radius درجة انحناء واستدارة زواياه، وهي أساسية لخلق لغة التصميم الحديثة للبطاقات والأزرار.",
    ".emerald-card {\n  border: 1px solid rgba(0, 220, 130, 0.25);\n  border-radius: 1rem; /* 16px زوايا ناعمة */\n  background-color: #0F172A;\n}",
    "border: width style color; border-radius: radiusValue;",
    "خصائص CSS هيكلية ومظهرية",
    "كافة المتصفحات العالمية",
    [
      "إنشاء الحواف المتوهجة الرقيقة (#1e332c) الخاصة بثيم Nuxt UI",
      "صياغة الأزرار الدائرية وأزرار الحبوب (Pills) باستخدام border-radius: 9999px",
      "فصل عناصر القوائم بحدود سفلية خفيفة border-b border-slate-800"
    ],
    "css_border_radius",
    "div.style.border = '1px solid #00DC82'; div.style.borderRadius = '12px';",
    "<!-- في Tailwind CSS: -->\n<div class=\"border border-[#00DC82]/30 rounded-2xl\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius"
  ],
  [
    "css",
    "box-shadow",
    "الظلال والتأثيرات الضوئية المتوهجة",
    "box-shadow glow shadow ظلال إضاءة توهج عمق بصري هالة",
    "خاصية تضفي عمقاً بصرياً واقعياً أو هالات توهج ضوئية (Glow Effects) حول العناصر، وتأخذ إزاحة X، إزاحة Y، درجة التمويه (Blur)، درجة الانتشار (Spread)، واللون.",
    ".nuxt-glow-button {\n  /* توهج زمردي ناعم مستوحى من Nuxt UI */\n  box-shadow: 0 0 25px -5px rgba(0, 220, 130, 0.4);\n  transition: box-shadow 0.3s ease;\n}\n\n.nuxt-glow-button:hover {\n  box-shadow: 0 0 35px 2px rgba(0, 220, 130, 0.6);\n}",
    "box-shadow: [inset] offsetX offsetY blurRadius spreadRadius color;",
    "خاصية CSS بصرية للعمق والإضاءة",
    "كافة المتصفحات العالمية",
    [
      "إنشاء تأثير التوهج الأخضر الزمردي المميز لهوية VueLexicon Pro",
      "رفع البطاقات بصرياً عن الخلفية لإظهار الترتيب الهرمي للطبقات",
      "إبراز حقول الإدخال النشطة عند التركيز (Focus Ring)"
    ],
    "css_box_shadow",
    "el.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.3)';",
    "<!-- في Tailwind CSS: -->\n<div class=\"shadow-2xl shadow-emerald-500/20\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow"
  ],
  [
    "css",
    "color",
    "ألوان النصوص والمحتوى الأمامي",
    "color text typography لون نص طباعة ألوان وسم خطوط",
    "الخاصية الأساسية لتحديد لون النصوص والأيقونات المعتمدة على الخطوط (Font Icons) ولون مؤشر الكتابة في عناصر HTML، وتدعم أسماء الألوان، Hex، RGB، و HSL.",
    ".brand-accent-text {\n  color: #00DC82; /* اللون الأخضر الزمردي الرسمي لـ Nuxt */\n}\n\n.muted-caption {\n  color: #94A3B8; /* رمادي خافت للقراءات الهادئة */\n}",
    "color: colorValue;",
    "خاصية CSS توريثية (Inherited Property)",
    "كافة المتصفحات العالمية",
    [
      "تلوين أسماء المصطلحات البرمجية باللون الأخضر الفاتح لسهولة القراءة",
      "تطبيق تباين ألوان عالي ومريح للعين في الوضع الليلي المظلم",
      "تمييز حالات الأخطاء باللون الأحمر وحالات النجاح بالأخضر"
    ],
    "css_color",
    "p.style.color = '#00DC82';",
    "<!-- في Tailwind CSS: -->\n<p class=\"text-emerald-400\">نص زمردي</p>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/color"
  ],
  [
    "css",
    "cursor",
    "شكل مؤشر الفأرة التفاعلي",
    "cursor pointer mouse مؤشر فأرة يد سهم تفاعل تخصيص",
    "تحدد شكل وحركة مؤشر الفأرة عند التحويم فوق العنصر، مثل تحويله إلى يد (pointer) للإشارة إلى قابلية النقر، أو علامة ممنوع (not-allowed) للأزرار المعطلة، أو صليب (crosshair).",
    ".clickable-card {\n  cursor: pointer; /* مؤشر اليد للإشارة لقابلية النقر */\n}\n\n.disabled-button {\n  cursor: not-allowed; /* مؤشر المنع للحالات المعطلة */\n  opacity: 0.6;\n}",
    "cursor: auto | default | pointer | not-allowed | wait | text | ...;",
    "خاصية CSS تفاعلية لتحسين تجربة المستخدم",
    "كافة المتصفحات العالمية",
    [
      "إشعار المستخدم بأن البطاقة أو النص قابل للنقر والتفاعل",
      "منع حيرة المستخدم بتوضيح أن الزر معطل أو قيد الانتظار cursor: wait",
      "تحديد مؤشر السحب والتحريك grab / grabbing في القوائم القابلة لإعادة الترتيب"
    ],
    "css_cursor",
    "btn.style.cursor = 'pointer';",
    "<!-- في Tailwind CSS: -->\n<div class=\"cursor-pointer hover:bg-slate-800\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/cursor"
  ],
  [
    "css",
    "display",
    "نوع التخطيط وتوليد صناديق العناصر",
    "display block inline flex grid none نوع تخطيط صندوق إظهار إخفاء",
    "أهم خاصية تخطيطية في CSS ككل؛ تحدد ما إذا كان العنصر يُعامل ككتلة (block)، أم كعنصر سطري (inline)، أم حاوية مرنة (flex)، أم شبكية (grid)، أو إخفائه تماماً من التدفق (none).",
    ".custom-flex-row {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.hidden-element {\n  display: none; /* إخفاء العنصر بالكامل من شجرة العرض */\n}",
    "display: block | inline | inline-block | flex | grid | none | contents;",
    "خاصية CSS جوهرية لتحديد بنية الصندوق",
    "كافة المتصفحات العالمية",
    [
      "تفعيل أنظمة التخطيط الحديثة Flexbox و CSS Grid على الحاويات",
      "إخفاء العناصر المشروطة دون حجز مساحة فارغة في الصفحة display: none",
      "تحويل الروابط من عناصر سطرية إلى أزرار كتلية قابلة لتحديد الأبعاد"
    ],
    "css_display",
    "div.style.display = 'flex';",
    "<!-- في Tailwind CSS: -->\n<div class=\"flex md:grid block hidden\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/display"
  ],
  [
    "css",
    "filter (blur, drop-shadow)",
    "المؤثرات البصرية والمرشحات الرقمية",
    "filter blur drop-shadow مرشحات فلاتر تمويه ظبابية تأثيرات بصرية",
    "خاصية تطبق تأثيرات رسومية رقمية متقدمة على العناصر ومحتوياتها، مثل التمويه (blur)، وتعديل التباين، والسطوع، وتحويل الألوان إلى درجات الرمادي، أو إسقاط الظلال الذكية.",
    ".blurred-backdrop {\n  filter: blur(8px);\n}\n\n.glowing-logo {\n  /* إسقاط ظل يتبع بالضبط منحنيات وتفريغ وسم SVG */\n  filter: drop-shadow(0 0 12px rgba(0, 220, 130, 0.6));\n}",
    "filter: blur(px) | brightness(%) | contrast(%) | drop-shadow(...) | grayscale(%);",
    "خاصية CSS لمعالجة الصور والرسوميات",
    "جميع المتصفحات الحديثة",
    [
      "إضافة هالات ضوئية تتبع تفريغ شعار SVG بدقة متناهية عبر drop-shadow",
      "تمويه المحتوى الخلفي للنوافذ المنبثقة لإبراز التركيز",
      "تحويل صور الرعاة والشركاء إلى الرمادي وتلوينها عند التحويم grayscale"
    ],
    "css_filter",
    "img.style.filter = 'grayscale(100%)';",
    "<!-- في Tailwind CSS: -->\n<div class=\"blur-sm hover:blur-none transition-all\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/filter"
  ],
  [
    "css",
    "flex (Flexbox)",
    "نظام التخطيط المرن أحادي البعد",
    "flex flexbox layout تخطيط مرن توزيع عناصر محاذاة أبعاد صف عمود",
    "نظام تخطيط ثوري أحادي البعد (صف أو عمود) يتيح توزيع المساحات بين العناصر ومحاذاتها تلقائياً بسهولة بالغة والتكيف مع مختلف مقاسات الشاشات دون الحاجة للعوامات (Floats).",
    ".header-navbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.5rem;\n}",
    "display: flex; flex-direction: row|column; flex-wrap: nowrap|wrap;",
    "نظام تخطيط CSS مدمج",
    "كافة المتصفحات العالمية الحديثة",
    [
      "توزيع عناصر أشرطة التنقل ومحاذاة الشعار والأزرار أفقياً",
      "محاذاة الأيقونات بدقة في منتصف الأزرار عمودياً align-items: center",
      "تصميم بطاقات وقوائم متجاوبة تلتف تلقائياً مع الشاشات الصغيرة flex-wrap"
    ],
    "css_flexbox",
    "// قديماً كانت تتطلب floats و clearfix وحسابات نسب مئوية معقدة!",
    "<!-- في Tailwind CSS: -->\n<div class=\"flex items-center justify-between gap-4\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout"
  ],
  [
    "css",
    "gap",
    "الفواصل والمسافات البينية بين العناصر",
    "gap spacing flex grid فواصل مسافات بينية شبكة تباعد أبعاد",
    "خاصية حديثة وعملية جداً تحدد المسافة الفاصلة بين الصفوف والأعمدة داخل حاويات Flexbox و CSS Grid دون الحاجة لإضافة هوامش (margin) يدوية على كل عنصر.",
    ".buttons-group {\n  display: flex;\n  gap: 0.75rem; /* 12px مسافة نظيفة بين جميع الأزرار */\n}\n\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.5rem 2rem; /* فواصل مختلفة للصفوف والأعمدة */\n}",
    "gap: [rowGap] [columnGap];",
    "خاصية تباعد مدمجة لأنظمة التخطيط",
    "كافة المتصفحات الحديثة",
    [
      "إنشاء مسافات منتظمة بين بطاقات المصطلحات في الشبكة",
      "الفصل بين أزرار أشرطة الأدوات وحقول الإدخال بسهولة",
      "الاستغناء النهائي عن محددات الهوامش القديمة مثل :last-child { margin-right: 0 }"
    ],
    "css_gap",
    "// قديماً: margin-left: 10px على كل عنصر وحذفها من الأخير!",
    "<!-- في Tailwind CSS: -->\n<div class=\"flex gap-4\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/gap"
  ],
  [
    "css",
    "grid (CSS Grid)",
    "نظام التخطيط الشبكي ثنائي الأبعاد",
    "grid css grid layout شبكة تخطيط ثنائي أبعاد صفوف أعمدة تقسيم",
    "أقوى نظام تخطيط في CSS على الإطلاق؛ يتعامل مع بُعدين في نفس الوقت (صفوف وأعمدة معاً) لبناء هياكل الصفحات الأكثر تعقيداً بتقسيمات دقيقة ونسب مرنة (fr units).",
    ".app-workspace {\n  display: grid;\n  grid-template-columns: 4fr 8fr; /* تقسيم 12 عمود: 4 للقائمة و 8 للتفاصيل */\n  gap: 1.5rem;\n}\n\n@media (max-width: 1024px) {\n  .app-workspace {\n    grid-template-columns: 1fr; /* عمود واحد في شاشات الجوال */\n  }\n}",
    "display: grid; grid-template-columns: repeat(n, size);",
    "نظام تخطيط شبكي ثنائي الأبعاد مدمج",
    "كافة المتصفحات الحديثة",
    [
      "تقسيم واجهة VueLexicon Pro إلى 4 أعمدة للقائمة الجانبية و 8 أعمدة لبطاقة الشرح",
      "بناء معارض البطاقات المتجاوبة auto-fit minmax(280px, 1fr)",
      "تخطيط لوحات التحكم الكاملة (Header, Sidebar, Main, Widgets)"
    ],
    "css_grid",
    "// بناء جداول معقدة أو استخدام أطر عمل ضخمة قديماً!",
    "<!-- في Tailwind CSS: -->\n<div class=\"grid grid-cols-1 lg:grid-cols-12 gap-6\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout"
  ],
  [
    "css",
    ":hover & :focus",
    "الفئات الزائفة للتحويم والتركيز التفاعلي",
    "hover focus pseudo class فئات زائفة تحويم تركيز مفاتيح تفاعل فأرة",
    "فئات زائفة أساسية (Pseudo-classes) للتفاعل؛ تُفعل :hover عند مرور مؤشر الفأرة فوق العنصر، بينما تُفعل :focus عند التركيز عليه عبر النقر أو التنقل بلوحة المفاتيح بمفتاح Tab.",
    ".nav-pill:hover {\n  background-color: rgba(0, 220, 130, 0.15);\n  border-color: #00DC82;\n}\n\n.search-input:focus {\n  outline: none;\n  border-color: #00DC82;\n  box-shadow: 0 0 0 3px rgba(0, 220, 130, 0.25);\n}",
    "selector:hover { ... } | selector:focus { ... } | selector:focus-visible { ... }",
    "فئات تحديد سلوكية في CSS",
    "كافة المتصفحات العالمية",
    [
      "تغيير خلفيات وألوان البطاقات والأزرار عند تمرير الفأرة فوقها",
      "إبراز حقول البحث بإطار مضيء زمردي عند الكتابة بداخلها",
      "تحسين إمكانية الوصول والتنقل لمستخدمي لوحة المفاتيح عبر :focus-visible"
    ],
    "css_hover_focus",
    "btn.onmouseover = () => btn.classList.add('hovered');",
    "<!-- في Tailwind CSS: -->\n<button class=\"hover:bg-emerald-600 focus:ring-2 ring-emerald-400\">زر</button>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/:hover"
  ],
  [
    "css",
    "justify-content & align-items",
    "محاذاة وتوزيع العناصر على المحاور",
    "justify-content align-items alignment محاذاة توزيع محاور توسيط منتصف",
    "خصائص المحاذاة في Flexbox و Grid؛ تتحكم justify-content في توزيع العناصر على المحور الرئيسي (Main Axis)، بينما تتحكم align-items في المحاذاة على المحور المتعامد (Cross Axis).",
    ".center-everything {\n  display: flex;\n  justify-content: center; /* توسيط أفقي على المحور الرئيسي */\n  align-items: center;     /* توسيط عمودي على المحور المتعامد */\n  min-height: 200px;\n}",
    "justify-content: start|end|center|between|around|evenly; align-items: start|end|center|stretch;",
    "خصائص محاذاة وتوزيع مساحات",
    "كافة المتصفحات الحديثة",
    [
      "توسيط العناصر تماماً في منتصف الشاشة (Centering in CSS)",
      "فصل الشعار عن روابط الحساب في الهيدر عبر justify-content: space-between",
      "محاذاة الأيقونات والنصوص في نفس السطر بدقة رأسية مثالية"
    ],
    "css_alignment",
    "// قديماً: استخدام margin: auto مع حسابات موضع مطلقة صعبة التنسيق!",
    "<!-- في Tailwind CSS: -->\n<div class=\"flex justify-between items-center\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content"
  ],
  [
    "css",
    "linear-gradient",
    "التدرجات اللونية الخطية الاحترافية",
    "linear-gradient gradient تدرج لوني خطي زوايا ألوان خلفية",
    "دالة CSS تنشئ صورة خلفية بتدرج لوني خطي سلس بين لونين أو أكثر في اتجاه محدد (زاوية بالدرجات deg أو اتجاهات مثل to right و to bottom).",
    ".emerald-gradient-badge {\n  background: linear-gradient(135deg, #00DC82 0%, #064E3B 100%);\n  color: #FFFFFF;\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n}",
    "background: linear-gradient([angle|direction], color1 [stop1], color2 [stop2], ...);",
    "دالة إنتاج صور CSS ديناميكية",
    "كافة المتصفحات العالمية",
    [
      "تصميم الشعار المدمج والحدود المضيئة لتطبيق VueLexicon Pro",
      "إنشاء نصوص بتدرج لوني عبر background-clip: text وتلوين العناوين",
      "خلق تأثيرات أزرار الدعوة للإجراء (CTA) الجذابة والحديثة"
    ],
    "css_gradient",
    "btn.style.background = 'linear-gradient(to right, #00DC82, #064E3B)';",
    "<!-- في Tailwind CSS: -->\n<div class=\"bg-gradient-to-br from-[#00DC82] to-[#064E3B]\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient"
  ],
  [
    "css",
    "margin & padding",
    "الهوامش الخارجية والحشوات الداخلية للصناديق",
    "margin padding spacing هوامش حشوة داخلية خارجية تباعد صندوق أبعاد",
    "ركنان أساسيان في نموذج الصندوق (Box Model)؛ تمثل margin المساحة الفارغة الخارجية المحيطة بالعنصر لفصله عن جيرانه، بينما تمثل padding الحشوة الداخلية بين محتوى العنصر وإطاره.",
    ".term-card {\n  margin-bottom: 1rem; /* هامش خارجي سفلي لفصل البطاقات */\n  padding: 1.5rem;      /* حشوة داخلية مريحة لمنع التصاق النصوص بالحدود */\n  background-color: #0F172A;\n}",
    "margin: [top] [right] [bottom] [left]; padding: [top] [right] [bottom] [left];",
    "خصائص المسافات في نموذج الصندوق",
    "كافة المتصفحات بلا استثناء",
    [
      "توسيط الحاويات ذات العرض الثابت تلقائياً عبر margin: 0 auto",
      "توفير مساحات قراءة مريحة وغير مضغوطة داخل البطاقات وحقول الإدخال",
      "ضبط هوامش الفقرات والعناوين لمنع تداخل النصوص"
    ],
    "css_box_model",
    "div.style.margin = '20px'; div.style.padding = '15px';",
    "<!-- في Tailwind CSS: -->\n<div class=\"m-4 p-6 my-2 px-3\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/margin"
  ],
  [
    "css",
    "@media",
    "استعلامات الوسائط والتصميم المتجاوب",
    "media queries responsive breakpoints تصميم متجاوب شاشات جوال حاسوب استعلامات",
    "القاعدة الأساسية لتطبيق التصميم المتجاوب (Responsive Web Design)؛ تتيح تطبيق قواعد CSS مختلفة بناءً على حجم الشاشة، دقة العرض، أو تفضيل الوضع الليلي للنظام.",
    "/* تنسيق افتراضي للهواتف الذكية */\n.sidebar-layout {\n  flex-direction: column;\n}\n\n/* تطبيق التنسيق الأفقي للشاشات الكبيرة ابتداءً من 1024px */\n@media (min-width: 1024px) {\n  .sidebar-layout {\n    flex-direction: row;\n  }\n}",
    "@media (media-feature-rule) { /* قواعد التنسيق هنا */ }",
    "قاعدة شرطية عليا (At-rule) في CSS",
    "كافة المتصفحات العالمية",
    [
      "تحويل شبكة العرض من عمود واحد في شاشات الجوال إلى عمودين في الحواسيب",
      "إخفاء الأشرطة الجانبية وإظهار أزرار القائمة المنزلقة في الشاشات الصغيرة",
      "اكتشاف الوضع الليلي للنظام عبر @media (prefers-color-scheme: dark)"
    ],
    "css_media_query",
    "// قديماً: الاستماع لحدث window.resize في JS وحساب العرض يدوياً!",
    "<!-- في Tailwind CSS: استخدام البادئات السلسة sm: md: lg: xl: -->\n<div class=\"w-full lg:w-1/3\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/@media"
  ],
  [
    "css",
    "opacity & backdrop-filter",
    "الشفافية والتأثيرات الزجاجية الضبابية",
    "opacity backdrop-filter glassmorphism شفافية زجاجي ضبابي خلفية بلور",
    "تحدد opacity شفافية العنصر بكافة محتوياته، بينما تطبق backdrop-filter تأثيرات رسومية (مثل blur) على المنطقة والطبقات الواقعة خلف العنصر مباشرة، وهو أساس تصميم الزجاج الضبابي (Glassmorphism).",
    ".nuxt-glass-header {\n  background-color: rgba(2, 4, 32, 0.75); /* خلفية داكنة شبه شفافة */\n  backdrop-filter: blur(16px);             /* تمويه محتوى الصفحة المار خلف الهيدر */\n  border-bottom: 1px solid rgba(0, 220, 130, 0.15);\n}",
    "opacity: 0 to 1; backdrop-filter: blur(px) ...;",
    "خصائص بصرية للشفافية ومعالجة الخلفيات",
    "جميع المتصفحات الحديثة",
    [
      "إنشاء الهيدر الزجاجي الضبابي الفاخر (Glassmorphic Sticky Header)",
      "تعتيم الأزرار المعطلة لبيان عدم قابليتها للنقر opacity: 0.5",
      "تطبيق خلفيات ضبابية ناعمة خلف النوافذ المنبثقة والقوائم المنسدلة"
    ],
    "css_opacity_blur",
    "header.style.backdropFilter = 'blur(12px)';",
    "<!-- في Tailwind CSS: -->\n<div class=\"bg-slate-900/80 backdrop-blur-xl border-b\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter"
  ],
  [
    "css",
    "overflow / overflow-x / y",
    "التحكم في فيضان المحتوى وشرائط التمرير",
    "overflow scroll hidden شريط تمرير فيضان إخفاء محتوى تجاوز",
    "تحدد كيفية التعامل مع المحتوى الذي يتجاوز حجم صندوق العنصر المخصص له؛ تتيح إخفاء الزوائد (hidden)، إظهار شرائط تمرير تلقائية (auto / scroll)، أو السماح له بالتدفق (visible).",
    ".terms-scroll-list {\n  max-height: calc(100vh - 280px);\n  overflow-y: auto;  /* شريط تمرير عمودي مخصص عند زيادة المصطلحات */\n  overflow-x: hidden;/* منع التمرير الأفقي غير المرغوب */\n  scrollbar-width: thin;\n}",
    "overflow: visible | hidden | clip | scroll | auto;",
    "خاصية إدارة مساحات المحتوى الفائض",
    "كافة المتصفحات العالمية",
    [
      "تمكين التمرير الداخلي المنفصل للقائمة الجانبية للمصطلحات في VueLexicon Pro",
      "قص الحواف الدائرية للبطاقات ومنع خروج الصور منها overflow: hidden",
      "بناء أشرطة التنقل الأفقية القابلة للتمرير على الجوال overflow-x: auto"
    ],
    "css_overflow",
    "list.style.overflowY = 'auto';",
    "<!-- في Tailwind CSS: -->\n<div class=\"overflow-y-auto max-h-96\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/overflow"
  ],
  [
    "css",
    "position",
    "أنظمة التموضع الجغرافي والطبقات",
    "position relative absolute fixed sticky تموضع موقع نسبي مطلق ثابت لزج",
    "تحدد طريقة تموضع وحساب موقع العنصر في المستند؛ تشمل التموضع النسبي (relative)، المطلق (absolute) بالنسبة لأقرب أب متموضع، الثابت (fixed) بالنسبة لنافذة العرض، واللزج (sticky).",
    ".search-wrapper {\n  position: relative; /* نقطة مرجعية لأيقونة البحث وأزرار المسح */\n}\n\n.search-glass-icon {\n  position: absolute;\n  right: 1rem;\n  top: 50%;\n  transform: translateY(-50%); /* محاذاة في المنتصف الرأسي تماماً */\n}",
    "position: static | relative | absolute | fixed | sticky;",
    "خاصية تحديد الموقع الهيكلي",
    "كافة المتصفحات العالمية",
    [
      "تثبيت شريط الهيدر أعلى الصفحة أثناء التمرير position: sticky; top: 0",
      "وضع أيقونة العدسة وأزرار مسح النص داخل حقل البحث التفاعلي",
      "تثبيت أزرار العودة للأعلى والتنبيهات العائمة position: fixed"
    ],
    "css_position",
    "icon.style.position = 'absolute'; icon.style.right = '12px';",
    "<!-- في Tailwind CSS: -->\n<div class=\"relative\"><span class=\"absolute right-3\">🔍</span></div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/position"
  ],
  [
    "css",
    "scroll-behavior",
    "انسيابية ونعومة التمرير",
    "scroll-behavior smooth scrolling تمرير انسيابي ناعم قفز صفحات",
    "تحدد نمط انتقال التمرير عند النقر على روابط القفز الداخلية (#hash)؛ تتيح تفعيل التمرير الانسيابي والناعم (smooth) بدلاً من القفز الفوري المزعج للمستخدم.",
    "html {\n  scroll-behavior: smooth; /* تمرير ناعم ومريح لكافة روابط الصفحة */\n}\n\n.lexicon-container {\n  scroll-behavior: smooth;\n}",
    "scroll-behavior: auto | smooth;",
    "خاصية سلوك التمرير بالصفحة",
    "جميع المتصفحات الحديثة",
    [
      "جعل الانتقال بين أقسام الصفحة والوثائق انسيابياً ومريحاً",
      "تحسين تجربة الانتقال لأعلى الصفحة عبر زر Back to top",
      "الاستغناء عن مكتبات jQuery القديمة التي كانت تُستخدم للتحريك التمريري"
    ],
    "css_scroll",
    "window.scrollTo({ top: 0, behavior: 'smooth' });",
    "<!-- في Tailwind CSS: -->\n<html class=\"scroll-smooth\">...</html>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior"
  ],
  [
    "css",
    "transform & transition",
    "التحويلات الهندسية والانتقالات الحركية",
    "transform transition scale rotate translate حركة تحويل هندسي انسياب تكبير دوران",
    "ثنائي صناعة التفاعل البصري؛ تتيح transform تغيير حجم العنصر (scale)، وتدويره (rotate)، ونقله (translate)، بينما تضمن transition تحول هذه التغييرات بنعومة عبر فترة زمنية محددة بدلاً من التحول المفاجئ.",
    ".interactive-btn {\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.interactive-btn:hover {\n  transform: translateY(-2px) scale(1.02);\n}\n\n.interactive-btn:active {\n  transform: translateY(0) scale(0.98);\n}",
    "transform: scale() | rotate() | translate(); transition: property duration timing-function;",
    "خصائص التحريك والتحويلات الهندسية في CSS",
    "كافة المتصفحات العالمية",
    [
      "إعطاء شعور بالعمق والاستجابة الفيزيائية للأزرار عند النقر والتحويم",
      "تحريك أسهم القوائم المنسدلة والدوران بزاوية 180 درجة rotate(180deg)",
      "بناء التأثيرات الانتقالية السلسة لظهور النوافذ المنبثقة"
    ],
    "css_transform",
    "card.style.transform = 'scale(1.05)'; card.style.transition = '0.3s';",
    "<!-- في Tailwind CSS: -->\n<button class=\"transition transform hover:-translate-y-1 hover:scale-105 active:scale-95\">زر</button>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/transform"
  ],
  [
    "css",
    "user-select",
    "التحكم في تحديد ونسخ النصوص",
    "user-select text selection منع تحديد نسخ نصوص واجهة أزرار",
    "تحدد ما إذا كان يمكن للمستخدم تحديد ونسخ النصوص داخل العنصر؛ تُستخدم user-select: none لمنع تحديد نصوص الأزرار والشارات بطريق الخطأ أثناء النقر السريع المتكرر.",
    ".no-select-btn {\n  user-select: none; /* منع تحديد النص باللون الأزرق أثناء النقر */\n  -webkit-user-select: none;\n}\n\n.code-block {\n  user-select: all;  /* تحديد الكود بالكامل بنقرة واحدة لتسهيل النسخ */\n}",
    "user-select: none | auto | text | all | contain;",
    "خاصية تحكم في تفاعل المؤشر مع النصوص",
    "كافة المتصفحات الحديثة",
    [
      "منع تظليل نصوص الأزرار والتبويبات عند النقر المتكرر السريع",
      "تسهيل نسخ الأكواد البرمجية والمفاتيح بنقرة واحدة عبر user-select: all",
      "حماية أجزاء معينة من واجهة المستخدم من التحديد العرضي"
    ],
    "css_user_select",
    "btn.style.userSelect = 'none';",
    "<!-- في Tailwind CSS: -->\n<div class=\"select-none\">محتوى غير قابل للتظليل</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/user-select"
  ],
  [
    "css",
    "width & height",
    "أبعاد العرض والارتفاع ومقاييس الحدود",
    "width height min-width max-width أبعاد عرض ارتفاع مقاييس حدود شاشة",
    "الخصائص الأساسية للتحكم في الأبعاد الفيزيائية للعناصر، مع دعم خصائص الحدود القصوى والدنيا (min-width, max-width, min-height, max-height) لضمان التجاوب ومنع انكسار التصميم.",
    ".container-responsive {\n  width: 100%;\n  max-width: 1400px; /* سقف عرض أقصى لمنع تمدد الصفحة المفرط في الشاشات العريضة */\n  margin: 0 auto;\n  min-height: 100vh; /* ملء ارتفاع الشاشة بالكامل على الأقل */\n}",
    "width: value; height: value; min-width: ...; max-width: ...;",
    "خصائص الأبعاد الصندوقية الأساسية",
    "كافة المتصفحات بلا استثناء",
    [
      "ضبط حاوية التطبيق المركزية بحد أقصى max-w-7xl",
      "ضمان تغطية خلفية التطبيق لكامل ارتفاع نافذة المتصفح min-h-screen",
      "تحديد أحجام حقول البحث والأزرار والصور الرمزية"
    ],
    "css_dimensions",
    "el.style.width = '100%'; el.style.maxWidth = '1200px';",
    "<!-- في Tailwind CSS: -->\n<div class=\"w-full max-w-6xl min-h-screen\">...</div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/width"
  ],
  [
    "css",
    "z-index",
    "ترتيب الطبقات والعمق على المحور العمودي (Z)",
    "z-index stacking context layers طبقات ترتيب عمودي تراكب تداخل نوافذ",
    "تحدد ترتيب تكديس العناصر المتموضعة (Positioned Elements) على المحور العمودي المتجه نحو المستخدم؛ العنصر ذو القيمة الأعلى يظهر فوق العناصر ذات القيم الأقل.",
    "/* هيكلية z-index الصارمة في VueLexicon Pro */\n.search-section {\n  position: relative;\n  z-index: 40; /* قسم البحث */\n}\n\n.search-dropdown-menu {\n  position: absolute;\n  z-index: 50; /* القائمة المنسدلة تعلو كافة المحتويات بالأسفل */\n}\n\n.tabs-filter-section {\n  position: relative;\n  z-index: 10; /* قسم التبويبات بالأسفل لمنع التداخل نهائياً */\n}",
    "z-index: auto | integerNumber;",
    "خاصية إدارة سياق التكديس (Stacking Context)",
    "كافة المتصفحات العالمية",
    [
      "منع تداخل القائمة المنسدلة للبحث الفوري مع أزرار الفلاتر والأقسام التي تليها",
      "ضمان ظهور النوافذ المنبثقة (Modals) فوق كافة عناصر التطبيق z-50",
      "تثبيت شريط الهيدر فوق المحتوى المتدفق أثناء التمرير z-40"
    ],
    "css_zindex",
    "dropdown.style.zIndex = '50';",
    "<!-- في Tailwind CSS: -->\n<div class=\"relative z-40\"><div class=\"absolute z-50\">...</div></div>",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/z-index"
  ]
]
