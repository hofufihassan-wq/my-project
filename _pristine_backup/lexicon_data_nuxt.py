# -*- coding: utf-8 -*-
"""
Nuxt UI v3 Component Catalog Dataset (25 Items)
"""

NUXT_ITEMS = [
    (
        "nuxt",
        "<UAccordion>",
        "القوائم القابلة للطي والتوسيع (الأكورديون)",
        "UAccordion nuxt ui accordion collapse أكورديون طي توسيع أسئلة شائعة",
        "مكون متكامل لعرض الأقسام القابلة للطي والتوسيع بشكل انسيابي، وهو مثالي لصفحات الأسئلة الشائعة (FAQ) وتفاصيل الحسابات، مع دعم التوسيع المفرد أو المتعدد والتحكم بحالات الفتح.",
        "<template>\n  <UAccordion\n    :items=\"faqItems\"\n    color=\"primary\"\n    variant=\"soft\"\n    :ui=\"{ wrapper: 'space-y-2' }\"\n  />\n</template>\n\n<script setup>\nconst faqItems = [\n  { label: 'ما هو VueLexicon Pro؟', content: 'قاموس ومساعد تفاعلي شامل لمطوري الويب.' },\n  { label: 'كيف أستخدم مكتبة Nuxt UI؟', content: 'عبر تثبيت @nuxt/ui في مشروع Nuxt 3.' }\n];\n<\/script>",
        "<UAccordion :items=\"itemsArray\" [color=\"...\"] [variant=\"...\"] />",
        "props: { items, color, variant, multiple, openIcon, closeIcon }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "بناء قسم الأسئلة الشائعة (FAQ) في الصفحات التعريفية",
            "عرض تفاصيل الفواتير والبيانات الإضافية القابلة للطي",
            "إدارة إعدادات الحساب المتقدمة في لوحات التحكم"
        ],
        "accordion",
        "// في Vanilla: كتابة حلقات استماع للأحداث وتبديل أصناف maxHeight يدوياً مع حساب الارتفاع!",
        "<template>\n  <UAccordion :items=\"faqList\" color=\"primary\" />\n</template>",
        "https://ui.nuxt.com/components/accordion"
    ),
    (
        "nuxt",
        "<UAlert>",
        "تنبيهات الإشعارات والتحذيرات الأنيقة",
        "UAlert nuxt ui alert notification banner تنبيه إشعار رسالة تحذير خطأ نجاح",
        "مكون احترافي لعرض التنبيهات والتحذيرات ورسائل النجاح؛ يوفر ألواناً دلالية جاهزة (success, warning, error, info) مع دعم الأيقونات، الأزرار الإجرائية، وزر الإغلاق التلقائي.",
        "<template>\n  <UAlert\n    icon=\"i-heroicons-information-circle\"\n    color=\"primary\"\n    variant=\"subtle\"\n    title=\"تحديث جديد متوفر!\"\n    description=\"تمت إضافة معمل Nuxt UI التفاعلي بكفاءة عالية.\"\n    :close-button=\"{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray' }\"\n  />\n</template>",
        "<UAlert [title=\"...\"] [description=\"...\"] [color=\"...\"] [variant=\"...\"] [icon=\"...\"] />",
        "props: { title, description, color, variant, icon, actions, closeButton }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "عرض تنبيهات نجاح العمليات (تم حفظ التغييرات بنجاح)",
            "تحذير المستخدم قبل اتخاذ إجراءات حساسة أو حذف بيانات",
            "عرض رسائل أخطاء الاتصال بالخادم أعلى النماذج"
        ],
        "alert",
        "// في الأسلوب التقليدي: بناء صندوق div معزول مع تنسيق حواف وأيقونات يدوياً",
        "<template>\n  <UAlert color=\"error\" title=\"فشل الاتصال\" icon=\"i-heroicons-exclamation-triangle\" />\n</template>",
        "https://ui.nuxt.com/components/alert"
    ),
    (
        "nuxt",
        "<UAvatar>",
        "الصور الرمزية والصور الشخصية",
        "UAvatar nuxt ui avatar user picture رمزية صورة شخصية مستخدم شارة",
        "مكون ذكي لعرض الصور الشخصية للمستخدمين؛ يدعم تحديد المقاسات، الأشكال (دائري أو حواف مستديرة)، شارات التواجد، ونصوص الحروف الأولى البديلة (Fallback Initials) عند فشل تحميل الصورة.",
        "<template>\n  <div class=\"flex items-center gap-3\">\n    <UAvatar\n      src=\"https://avatars.githubusercontent.com/u/739984?v=4\"\n      alt=\"Vue.js\"\n      size=\"lg\"\n      chip-color=\"primary\"\n      chip-position=\"top-right\"\n    />\n    <UAvatar text=\"حيدر\" size=\"md\" />\n  </div>\n</template>",
        "<UAvatar [src=\"...\"] [alt=\"...\"] [text=\"...\"] [size=\"...\"] [chipColor=\"...\"] />",
        "props: { src, alt, text, size, chipColor, chipPosition, icon }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "عرض صورة الملف الشخصي للمستخدم المسجل في شريط الهيدر",
            "إظهار مؤشر اتصال المستخدم الأخضر عبر chip-color",
            "عرض الأحرف الأولى لاسم المستخدم تلقائياً عند عدم رفع صورة"
        ],
        "generic",
        "// في Vanilla: كتابة معالج img.onerror لإظهار الأحرف البديلة يدوياً!",
        "<template>\n  <UAvatar :src=\"user.photo\" :alt=\"user.name\" size=\"md\" />\n</template>",
        "https://ui.nuxt.com/components/avatar"
    ),
    (
        "nuxt",
        "<UBadge>",
        "الشارات والأوسمة التوضيحية",
        "UBadge nuxt ui badge tag pill وسام شارة وسم علامة حالة عداد",
        "عنصر واجهة مدمج وأنيق لعرض حالات الكيانات، التصنيفات، أو عدادات الإشعارات، مع خيارات متعددة للألوان والمقاسات والتنوعات البصرية (solid, outline, soft, subtle).",
        "<template>\n  <div class=\"flex gap-2\">\n    <UBadge color=\"primary\" variant=\"solid\">جديد</UBadge>\n    <UBadge color=\"emerald\" variant=\"subtle\">Nuxt UI v3</UBadge>\n    <UBadge color=\"red\" variant=\"soft\" size=\"xs\">عاجل</UBadge>\n  </div>\n</template>",
        "<UBadge [color=\"...\"] [variant=\"...\"] [size=\"...\"]> النص </UBadge>",
        "props: { color, variant, size, label }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "عرض حالة الطلب في الجداول (مكتمل، قيد الانتظار، ملغي)",
            "إبراز الميزات الجديدة والعروض الترويجية داخل البطاقات",
            "تمييز فئات المقالات وأقسام المعجم البرمجي"
        ],
        "badge",
        "// كتابة فئات span مع ألوان محددة يدوياً وتكرارها في كل صفحة",
        "<template>\n  <UBadge color=\"primary\" variant=\"subtle\">نشط الآن</UBadge>\n</template>",
        "https://ui.nuxt.com/components/badge"
    ),
    (
        "nuxt",
        "<UBreadcrumb>",
        "مسار التنقل الهرمي (فتات الخبز)",
        "UBreadcrumb nuxt ui breadcrumb navigation مسار تنقل هرمي صفحات شجرة",
        "مكون ملاحة هرمي يوضح للمستخدم موقعه الحالي داخل هيكلية الموقع، ويوفر مساراً سريعاً للعودة إلى الصفحات العليا السابقة، مع دعم كامل لروابط NuxtLink التلقائية.",
        "<template>\n  <UBreadcrumb :links=\"breadcrumbLinks\" />\n</template>\n\n<script setup>\nconst breadcrumbLinks = [\n  { label: 'الرئيسية', icon: 'i-heroicons-home', to: '/' },\n  { label: 'المعجم البرمجي', icon: 'i-heroicons-book-open', to: '/lexicon' },\n  { label: 'مكتبة Nuxt UI', icon: 'i-heroicons-cube' }\n];\n<\/script>",
        "<UBreadcrumb :links=\"linksArray\" [divider=\"...\"] />",
        "props: { links, divider, ui }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "تحسين تجربة التنقل في المواقع ذات المستويات والصفحات المتعددة",
            "تحسين السيو (SEO) وتسهيل فهرسة محركات البحث لهيكل الموقع",
            "تمكين المستخدم من الرجوع خطوة واحدة أو للرئيسية بنقرة واحدة"
        ],
        "generic",
        "// بناء قائمة ol مع فواصل شرطية يدوية وتنسيقات CSS مرهقة",
        "<template>\n  <UBreadcrumb :links=\"navLinks\" />\n</template>",
        "https://ui.nuxt.com/components/breadcrumb"
    ),
    (
        "nuxt",
        "<UButton>",
        "الزر التفاعلي المتطور الأكثر استخداماً",
        "UButton nuxt ui button action زر تفاعلي إجراء نقر أيقونة تحميل",
        "المكون الرائد والأكثر شهرة في Nuxt UI؛ يجمع بين الأناقة الفائقة، دعم حالات التحميل المدمجة (loading spinner)، الأيقونات الأمامية والخلفية، وملاءمة الروابط كـ NuxtLink تلقائياً عند تمرير to.",
        "<template>\n  <UButton\n    icon=\"i-heroicons-sparkles\"\n    color=\"primary\"\n    variant=\"solid\"\n    size=\"md\"\n    label=\"استكشف المعجم\"\n    :loading=\"isLoading\"\n    @click=\"handleClick\"\n  />\n</template>",
        "<UButton [label=\"...\"] [color=\"...\"] [variant=\"...\"] [icon=\"...\"] [:loading=\"...\"] />",
        "props: { color, variant, size, icon, leading, trailing, loading, disabled, to }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "أزرار الإجراءات الأساسية (CTA) في صفحات الهبوط والبطاقات",
            "أزرار إرسال النماذج مع تفعيل حالة التحميل :loading لمنع النقرات المتكررة",
            "أزرار التنقل السلس بين المسارات باستخدام الخاصية to=\"/path\""
        ],
        "button",
        "const btn = document.createElement('button');\nbtn.className = 'btn-green';\nbtn.innerHTML = '<span class=\"spinner\"></span> جاري التحميل';",
        "<template>\n  <UButton color=\"primary\" variant=\"solid\" :loading=\"pending\" label=\"حفظ\" />\n</template>",
        "https://ui.nuxt.com/components/button"
    ),
    (
        "nuxt",
        "<UCard>",
        "حاويات البطاقات الهيكلية المتكاملة",
        "UCard nuxt ui card container بطاقة حاوية هيكل ترويسة ذيل بطاقات",
        "حاوية بطاقات موحدة ومنسقة بذكاء، تقسم المحتوى اختيارياً إلى ترويسة (header)، وجسم أساسي (body)، وذيل (footer)، مع حواف وظلال داكنة مطابقة لهوية Nuxt.",
        "<template>\n  <UCard class=\"w-full max-w-md\">\n    <template #header>\n      <h3 class=\"text-lg font-bold text-white\">عنوان البطاقة</h3>\n    </template>\n\n    <p class=\"text-gray-300\">محتوى البطاقة التفاعلي بأسلوب Nuxt UI v3 الفاخر.</p>\n\n    <template #footer>\n      <div class=\"flex justify-end gap-2\">\n        <UButton color=\"gray\" variant=\"ghost\" label=\"إلغاء\" />\n        <UButton color=\"primary\" label=\"تأكيد\" />\n      </div>\n    </template>\n  </UCard>\n</template>",
        "<UCard> [#header] محتوى البطاقة [#footer] </UCard>",
        "props: { as, ui } وفتحات (#header, default, #footer)",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "عرض بطاقات المنتجات، الخدمات، والمصطلحات البرمجية",
            "بناء صناديق تسجيل الدخول والإعدادات المنظمة",
            "عرض مؤشرات لوحات التحكم (Dashboard Widgets)"
        ],
        "card",
        "// بناء div مع فئات border, rounded-lg, shadow, p-4 وتكرارها",
        "<template>\n  <UCard>\n    <template #header><h1>الإحصائيات</h1></template>\n    <p>150 مصطلح</p>\n  </UCard>\n</template>",
        "https://ui.nuxt.com/components/card"
    ),
    (
        "nuxt",
        "<UCheckbox>",
        "مربعات الاختيار والتحقق التفاعلية",
        "UCheckbox nuxt ui checkbox check مربع اختيار تحقق تأكيد موافقة",
        "مكون حديث لمربعات الاختيار يدعم الربط ثنائي الاتجاه عبر v-model، ويقدم تسميات مدمجة، وحالات غير محددة (indeterminate)، وتنسيقاً سلساً يتوافق مع أنظمة الألوان.",
        "<template>\n  <UCheckbox\n    v-model=\"agreeTerms\"\n    name=\"terms\"\n    label=\"أوافق على جميع الشروط والأحكام\"\n    help=\"تأكد من قراءة سياسة الخصوصية بعناية.\"\n    color=\"primary\"\n  />\n</template>\n\n<script setup>\nconst agreeTerms = ref(false);\n<\/script>",
        "<UCheckbox v-model=\"booleanRef\" [label=\"...\"] [color=\"...\"] />",
        "props: { modelValue, label, help, color, disabled, indeterminate }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "تأكيد الموافقة على شروط الاستخدام في نماذج التسجيل",
            "تحديد عناصر متعددة في جداول البيانات لحذفها أو تعديلها معاً",
            "تبديل وتفعيل الخيارات الإضافية في لوحات الإعدادات"
        ],
        "switch",
        "const cb = document.querySelector('#agree');\ncb.checked = true;",
        "<template>\n  <UCheckbox v-model=\"selected\" label=\"خيار 1\" />\n</template>",
        "https://ui.nuxt.com/components/checkbox"
    ),
    (
        "nuxt",
        "<UCommandPalette>",
        "لوحة الأوامر والبحث السريع العالمية (Ctrl + K)",
        "UCommandPalette nuxt ui command palette search spotlight أوامر بحث شامل نافذة ذكية",
        "مكون بحث وأوامر خارق مستوحى من Spotlight و MacOS Raycast؛ يتيح للمستخدمين البحث السريع، تشغيل الإجراءات، والتنقل في الموقع بالكامل عبر اختصار لوحة المفاتيح Ctrl + K.",
        "<template>\n  <UCommandPalette\n    :groups=\"commandGroups\"\n    :autoselect=\"true\"\n    placeholder=\"ابحث عن أمر أو مصطلح...\"\n    @update:model-value=\"onSelectCommand\"\n  />\n</template>\n\n<script setup>\nconst commandGroups = [\n  {\n    key: 'terms',\n    commands: [\n      { id: 1, label: 'computed()', icon: 'i-heroicons-code-bracket' },\n      { id: 2, label: '<UButton>', icon: 'i-heroicons-cube' }\n    ]\n  }\n];\n<\/script>",
        "<UCommandPalette :groups=\"groups\" [placeholder=\"...\"] />",
        "props: { groups, placeholder, autoselect, closeButton }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "بناء لوحة التنقل الذكية للمواقع التوثيقية ولوحات تحكم SaaS",
            "توفير وصول فوري للميزات والوظائف دون التنقل بين القوائم",
            "تنفيذ البحث الفوري في قواعد البيانات الضخمة"
        ],
        "generic",
        "// يتطلب مئات أسطر JavaScript للتحكم في مفاتيح الأسهم، التركيز، والتصفية يدوياً!",
        "<template>\n  <UCommandPalette :groups=\"searchGroups\" />\n</template>",
        "https://ui.nuxt.com/components/command-palette"
    ),
    (
        "nuxt",
        "<UDrawer>",
        "الألواح السفلية والجانبية المنزلقة",
        "UDrawer nuxt ui drawer slide bottom sheet لوح منزلق جانبي سفلي شاشة جوال",
        "مكون لوح منزلق مخصص للأجهزة الذكية (Bottom Sheet) والشاشات الكبيرة؛ ينزلق بنعومة من الأسفل أو الجوانب لعرض التفاصيل الإضافية والقوائم الفرعية دون مغادرة الصفحة.",
        "<template>\n  <UButton label=\"فتح اللوح السفلي\" @click=\"isOpen = true\" />\n\n  <UDrawer v-model=\"isOpen\">\n    <div class=\"p-6 max-w-md mx-auto\">\n      <h3 class=\"text-xl font-bold text-white\">تفاصيل المصطلح</h3>\n      <p class=\"mt-2 text-gray-400\">محتوى إضافي منزلق من أسفل الشاشة بتجربة لمس مذهلة.</p>\n    </div>\n  </UDrawer>\n</template>\n\n<script setup>\nconst isOpen = ref(false);\n<\/script>",
        "<UDrawer v-model=\"booleanRef\"> محتوى اللوح </UDrawer>",
        "props: { modelValue, direction, handle }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "تقديم تجربة تطبيقات الجوال الأصلية (Native App Feel) على الهواتف",
            "عرض سلة التسوق السريعة دون الانتقال لصفحة الدفع",
            "عرض مرشحات وفلاتر البحث في شاشات الجوال"
        ],
        "modal",
        "// يتطلب التعامل مع أحداث اللمس touchstart, touchmove وحساب نسب السحب يدوياً!",
        "<template>\n  <UDrawer v-model=\"showFilterSheet\">\n    <FilterOptions />\n  </UDrawer>\n</template>",
        "https://ui.nuxt.com/components/drawer"
    ),
    (
        "nuxt",
        "<UDropdownMenu>",
        "القوائم المنسدلة التفاعلية الغنية",
        "UDropdownMenu nuxt ui dropdown menu سياق قائمة منسدلة إجراءات خيارات",
        "مكون قوائم سياقية متطور ينبثق عند النقر على عنصر أو تمرير الفأرة فوقه؛ يدعم تجميع العناصر، الأيقونات، الاختصارات السريعة (Kbd)، وعناصر التحديد المشروطة.",
        "<template>\n  <UDropdownMenu :items=\"menuItems\">\n    <UButton icon=\"i-heroicons-ellipsis-vertical\" color=\"gray\" variant=\"ghost\" />\n  </UDrawerMenu>\n</template>\n\n<script setup>\nconst menuItems = [\n  [\n    { label: 'تعديل الملف', icon: 'i-heroicons-pencil-square' },\n    { label: 'تكرار السجل', icon: 'i-heroicons-document-duplicate' }\n  ],\n  [\n    { label: 'حذف نهائي', icon: 'i-heroicons-trash', color: 'red' }\n  ]\n];\n<\/script>",
        "<UDropdownMenu :items=\"nestedArrays\"> <trigger-element /> </UDropdownMenu>",
        "props: { items, mode, popper, disabled }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "قوائم خيارات المستخدم في شريط الهيدر (الملف الشخصي، الإعدادات، تسجيل الخروج)",
            "قائمة الإجراءات الثلاثية النقاط داخل كل صف في جداول البيانات",
            "قوائم تصدير التقارير (PDF, Excel, CSV)"
        ],
        "generic",
        "// في Vanilla: حساب موضع العنصر بالبكسل والتأكد من عدم خروج القائمة عن حدود الشاشة!",
        "<template>\n  <UDropdownMenu :items=\"options\">\n    <UButton label=\"خيارات\" />\n  </UDropdownMenu>\n</template>",
        "https://ui.nuxt.com/components/dropdown-menu"
    ),
    (
        "nuxt",
        "<UForm>",
        "إدارة النماذج والتحقق المتكامل بالأنواع",
        "UForm nuxt ui form validation zod نموذج تحقق استمارة مخطط بيانات أمان",
        "مكون إدارة النماذج الشامل في Nuxt UI؛ يتكامل بسلاسة مع مكتبات التحقق مثل Zod و Yup، ويقوم بفحص كافة الحقول تلقائياً وعرض رسائل الخطأ عند الإرسال بدقة متناهية.",
        "<template>\n  <UForm :schema=\"loginSchema\" :state=\"formState\" @submit=\"onSubmit\" class=\"space-y-4\">\n    <UFormField label=\"البريد الإلكتروني\" name=\"email\">\n      <UInput v-model=\"formState.email\" type=\"email\" />\n    </UFormField>\n\n    <UButton type=\"submit\" color=\"primary\" label=\"تسجيل الدخول\" />\n  </UForm>\n</template>\n\n<script setup>\nimport { z } from 'zod';\nconst loginSchema = z.object({\n  email: z.string().email('صيغة البريد الإلكتروني غير صحيحة')\n});\nconst formState = reactive({ email: '' });\nconst onSubmit = (event) => console.log('البيانات صحيحة:', event.data);\n<\/script>",
        "<UForm :schema=\"schema\" :state=\"reactiveState\" @submit=\"handler\"> ... </UForm>",
        "props: { schema, state, validateOn }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "بناء نماذج التسجيل والدخول والتحقق من كلمة المرور",
            "استمارات الدفع وإدخال العناوين وتأكيد صحتها قبل الإرسال",
            "نماذج إنشاء وتعديل المنتجات والمقالات في لوحات التحكم"
        ],
        "input",
        "// التحقق اليدوي وكتابة 20 جملة if/else لفحص صحة النصوص والرموز!",
        "<template>\n  <UForm :schema=\"zodSchema\" :state=\"state\" @submit=\"onSuccess\">\n    <slot />\n  </UForm>\n</template>",
        "https://ui.nuxt.com/components/form"
    ),
    (
        "nuxt",
        "<UFormField>",
        "حقل النموذج مع التسمية ورسائل الخطأ",
        "UFormField nuxt ui form field label error حقل تسمية خطأ وصف مساعدة",
        "مكون يغلف أي حقل إدخال (Input, Select, Textarea) ليضيف له تلقائياً التسمية الموجهة (Label)، النص المساعد (Help)، شارة الحقل الإلزامي، ورسائل الخطأ الناتجة عن التحقق.",
        "<template>\n  <UFormField\n    label=\"اسم المستخدم\"\n    name=\"username\"\n    description=\"سيظهر هذا الاسم في ملفك الشخصي للعامة.\"\n    required\n  >\n    <UInput v-model=\"username\" placeholder=\"haidar_dev\" icon=\"i-heroicons-user\" />\n  </UFormField>\n</template>",
        "<UFormField [label=\"...\"] [name=\"...\"] [description=\"...\"] [required]> <UInput ... /> </UFormField>",
        "props: { label, name, description, help, error, required }",
        "Nuxt 3 مع موديول @nuxt/ui v3",
        [
            "توحيد مظهر حقول النماذج وتوزيع التسميات والرسائل بشكل منظم",
            "ربط حقول الإدخال تلقائياً بنظام التحقق في UForm عبر خاصية name",
            "إبراز الحقول الإلزامية بنجمة حمراء تلقائياً عبر required"
        ],
        "input",
        "// كتابة وسم label منفصل، ثم div للإدخال، ثم p أحمر للخطأ يدوياً لكل حقل!",
        "<template>\n  <UFormField label=\"الاسم\" required>\n    <UInput v-model=\"name\" />\n  </UFormField>\n</template>",
        "https://ui.nuxt.com/components/form-field"
    ),
    (
        "nuxt",
        "<UInput>",
        "حقل الإدخال النصي الذكي متعدد الإمكانيات",
        "UInput nuxt ui input textfield إدخال نص حقل بحث أيقونة مسح",
        "حقل إدخال عالي التخصيص يدعم الأيقونات في البداية والنهاية، زر مسح النص الفوري، حالات التحميل، أنواع الإدخال المختلفة، ومطابقة ثيم المشروع بدون أي تنسيق إضافي.",
        "<template>\n  <UInput\n    v-model=\"search\"\n    placeholder=\"ابحث عن دالة أو مكون...\"\n    icon=\"i-heroicons-magnifying-glass\"\n    color=\"primary\"\n    variant=\"outline\"\n    size=\"md\"\n    :trailing=\"true\"\n  />\n</template>\n\n<script setup>\nconst search = ref('');\n<\/script>",
        "<UInput v-model=\"textRef\" [placeholder=\"...\"] [icon=\"...\"] [color=\"...\"] />",
        "props: { modelValue, type, placeholder, icon, leading, trailing, disabled, color }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "أشرطة البحث المركزية والتصفية الفورية للمحتوى",
            "حقول إدخال كلمات المرور والبريد الإلكتروني وأرقام الهواتف",
            "حقول الأكواد البرمجية والمفاتيح السرية (API Keys)"
        ],
        "input",
        "// حقل HTML خام يتطلب فئات Tailwind كثيرة للحصول على مظهر متناسق:",
        "<template>\n  <UInput v-model=\"term\" icon=\"i-heroicons-search\" color=\"primary\" />\n</template>",
        "https://ui.nuxt.com/components/input"
    ),
    (
        "nuxt",
        "<UKbd>",
        "شارات واختصارات لوحة المفاتيح",
        "UKbd nuxt ui kbd keyboard shortcut زر لوحة مفاتيح اختصار مفتاح",
        "عنصر واجهة رسومي صغير وأنيق يحاكي مظهر أزرار لوحة المفاتيح الحقيقية، ويُستخدم لتوضيح الاختصارات السريعة للمستخدمين (مثل Ctrl, Shift, K, Enter).",
        "<template>\n  <div class=\"flex items-center gap-2 text-sm text-gray-400\">\n    <span>للبحث السريع اضغط:</span>\n    <div class=\"flex gap-1\">\n      <UKbd>Ctrl</UKbd>\n      <UKbd>K</UKbd>\n    </div>\n  </div>\n</template>",
        "<UKbd [size=\"...\"]> المفتاح </UKbd>",
        "props: { size, value }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "عرض اختصارات لوحة المفاتيح داخل حقول البحث وأشرطة الهيدر",
            "توضيح مفاتيح التنقل في النوافذ المنبثقة والقوائم",
            "توثيق اختصارات التطبيقات ومحررات الأكواد"
        ],
        "badge",
        "// كتابة kbd مع أصناف border-b-2, bg-gray-800, px-1.5 يدوياً في كل موضع",
        "<template>\n  <UKbd>⌘</UKbd> <UKbd>K</UKbd>\n</template>",
        "https://ui.nuxt.com/components/kbd"
    ),
    (
        "nuxt",
        "<UModal>",
        "النوافذ المنبثقة والطبقات الحوارية",
        "UModal nuxt ui modal dialog popup نافذة منبثقة حوار خلفية معتمة تراكب",
        "مكون نوافذ منبثقة احترافي ينبثق فوق الصفحة مع طبقة تعتيم ضبابية خلفية (Backdrop)؛ يدعم الإغلاق بمفتاح Escape، النقر خارج النافذة، ومنع تمرير الصفحة الخلفية.",
        "<template>\n  <UButton label=\"فتح النافذة الإرشادية\" @click=\"isOpen = true\" />\n\n  <UModal v-model=\"isOpen\">\n    <UCard>\n      <template #header>\n        <h3 class=\"font-bold text-white\">مستشار Nuxt UI</h3>\n      </template>\n      <p class=\"text-gray-300\">استفد من مكونات Nuxt UI v3 لبناء واجهات فائقة السرعة والجمال.</p>\n      <template #footer>\n        <UButton color=\"primary\" label=\"فهمت ذلك\" @click=\"isOpen = false\" />\n      </template>\n    </UCard>\n  </UModal>\n</template>\n\n<script setup>\nconst isOpen = ref(false);\n<\/script>",
        "<UModal v-model=\"booleanRef\"> <UCard>...</UCard> </UModal>",
        "props: { modelValue, preventClose, fullscreen, transition }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "عرض تفاصيل إضافية للمصطلح البرمجي دون مغادرة صفحة المعجم",
            "نوافذ تأكيد الحذف والإجراءات الحاسمة",
            "نوافذ تسجيل الدخول وإدخال البيانات السريعة"
        ],
        "modal",
        "// بناء div ثابت بـ z-50 والتحكم في إخفاء scroll الجسم يدوياً لمنع التمرير الخلفي!",
        "<template>\n  <UModal v-model=\"showDialog\">\n    <UCard><p>محتوى الحوار</p></UCard>\n  </UModal>\n</template>",
        "https://ui.nuxt.com/components/modal"
    ),
    (
        "nuxt",
        "<UPagination>",
        "شريط تقسيم وتصفح الصفحات الرقمي",
        "UPagination nuxt ui pagination pages تصفح صفحات أرقام تقسيم تنقل",
        "مكون تنقل بين الصفحات يقوم بحساب عدد الأزرار الرقمية ومؤشرات الحذف (...) تلقائياً بناءً على إجمالي العناصر والعدد في كل صفحة مع أزرار السابق والتالي.",
        "<template>\n  <UPagination\n    v-model=\"currentPage\"\n    :page-count=\"10\"\n    :total=\"150\"\n    :max=\"5\"\n    color=\"primary\"\n  />\n</template>\n\n<script setup>\nconst currentPage = ref(1);\n<\/script>",
        "<UPagination v-model=\"pageRef\" :total=\"totalItems\" :page-count=\"perPage\" />",
        "props: { modelValue, total, pageCount, max, color }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "تقسيم الجداول الكبيرة وقوائم المنتجات إلى صفحات متتالية",
            "تصفح المقالات والنتائج البحثية خطوة بخطوة",
            "تحسين أداء الواجهة بمنع رسم مئات العناصر دفعة واحدة"
        ],
        "generic",
        "// خوارزمية حسابية معقدة لإنشاء مصفوفة الأرقام وأزرار السابق والتالي يدوياً!",
        "<template>\n  <UPagination v-model=\"page\" :total=\"100\" :page-count=\"10\" />\n</template>",
        "https://ui.nuxt.com/components/pagination"
    ),
    (
        "nuxt",
        "<UProgress>",
        "أشرطة التقدم ونسب الإنجاز",
        "UProgress nuxt ui progress bar percentage شريط تقدم نسبة مئوية إنجاز تحميل",
        "مكون يعرض شريط تقدم متحرك بنسب مئوية محددة أو في حالة غير محددة (Indeterminate) للعمليات المستمرة غير معلومة المدى مع خيارات ألوان متناسقة.",
        "<template>\n  <div class=\"space-y-4 w-full max-w-sm\">\n    <!-- شريط تقدم محدد بالنسبة -->\n    <UProgress :value=\"75\" color=\"primary\" size=\"md\" />\n    <!-- شريط تقدم متحرك مستمر للتحميل -->\n    <UProgress animation=\"carousel\" color=\"emerald\" />\n  </div>\n</template>",
        "<UProgress [:value=\"number\"] [color=\"...\"] [size=\"...\"] [animation=\"...\"] />",
        "props: { value, max, color, size, animation }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "عرض نسبة إكمال الملف الشخصي أو مراحل التسجيل",
            "إظهار نسبة رفع وتنزيل الملفات الكبيرة",
            "مؤشرات قراءة المقالات وإنجاز الاختبارات والمهام"
        ],
        "badge",
        "// بناء div خارجي وآخر داخلي والتحكم في width: 75% عبر inline-styles!",
        "<template>\n  <UProgress :value=\"progressVal\" color=\"primary\" />\n</template>",
        "https://ui.nuxt.com/components/progress"
    ),
    (
        "nuxt",
        "<USelect>",
        "القوائم المنسدلة لاختيار القيم",
        "USelect nuxt ui select dropdown اختيار قائمة منسدلة خيارات تحديد",
        "مكون متناسق لاختيار قيمة مفردة من قائمة خيارات ممررة؛ يدعم تمرير مصفوفات نصوص بسيطة أو كائنات مخصصة بقيم وتسميات وأيقونات محددة.",
        "<template>\n  <USelect\n    v-model=\"selectedRole\"\n    :options=\"roleOptions\"\n    placeholder=\"اختر نوع الصلاحية...\"\n    color=\"primary\"\n    icon=\"i-heroicons-user-group\"\n  />\n</template>\n\n<script setup>\nconst selectedRole = ref('');\nconst roleOptions = [\n  { label: 'مدير النظام (Admin)', value: 'admin' },\n  { label: 'مطور واجهات (Frontend)', value: 'frontend' },\n  { label: 'زائر (Guest)', value: 'guest' }\n];\n<\/script>",
        "<USelect v-model=\"selectedRef\" :options=\"optionsArray\" />",
        "props: { modelValue, options, placeholder, icon, color, disabled }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "اختيار اللغات والدول والعملات في الإعدادات",
            "تصفية جداول البيانات حسب التصنيف أو الحالة",
            "تحديد خيارات الشحن وطرق الدفع في المتاجر"
        ],
        "generic",
        "// وسم <select> التقليدي الذي يصعب تخصيص سهمه وألوانه الداكنة بين المتصفحات!",
        "<template>\n  <USelect v-model=\"role\" :options=\"roles\" />\n</template>",
        "https://ui.nuxt.com/components/select"
    ),
    (
        "nuxt",
        "<USkeleton>",
        "هياكل التحميل الوهمية الشبحية",
        "USkeleton nuxt ui skeleton placeholder loading تحميل شبحي وهمي وميض هيكل",
        "مكون لعرض هياكل رمادية وامضة تحاكي شكل النصوص والصور والبطاقات الحقيقية قبل اكتمال تحميلها، مما يمنح تجربة مستخدم مريحة ويمنع القفزات البصرية (Layout Shift).",
        "<template>\n  <div class=\"flex items-center space-x-4 space-x-reverse\">\n    <!-- دائرة تحاكي الصورة الرمزية -->\n    <USkeleton class=\"h-12 w-12 rounded-full\" />\n    <div class=\"space-y-2\">\n      <!-- خطوط تحاكي النصوص -->\n      <USkeleton class=\"h-4 w-[200px]\" />\n      <USkeleton class=\"h-4 w-[150px]\" />\n    </div>\n  </div>\n</template>",
        "<USkeleton class=\"h-4 w-full rounded\" />",
        "عنصر واجهة شكلي يقبل فئات Tailwind لتحديد الحجم",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "عرض مؤشرات تحميل بديلة للبطاقات أثناء انتظار استجابة useFetch",
            "هياكل تحميل المقالات والمشاركات في تطبيقات التواصل",
            "منع تشتت عين المستخدم وتقليل وقت الانتظار النفسي المتصور"
        ],
        "badge",
        "// كتابة فئات animate-pulse و bg-gray-700 يدوياً لكل عنصر ومحاذاته",
        "<template>\n  <USkeleton class=\"h-10 w-full\" v-if=\"pending\" />\n  <RealComponent v-else />\n</template>",
        "https://ui.nuxt.com/components/skeleton"
    ),
    (
        "nuxt",
        "<USwitch>",
        "مفاتيح التبديل السريع (Toggle Switch)",
        "USwitch nuxt ui switch toggle مفتاح تبديل تشغيل إيقاف وضع ليلي زر",
        "مكون مفتاح تبديل عصري وانسيابي بديل لمربعات الاختيار؛ مثالي لتفعيل أو تعطيل الميزات الفردية، مع دعم كامل للربط بـ v-model وأيقونات داخل زر التبديل.",
        "<template>\n  <USwitch\n    v-model=\"isDarkMode\"\n    color=\"primary\"\n    label=\"الوضع الليلي الزمردي\"\n    checked-icon=\"i-heroicons-moon\"\n    unchecked-icon=\"i-heroicons-sun\"\n  />\n</template>\n\n<script setup>\nconst isDarkMode = ref(true);\n<\/script>",
        "<USwitch v-model=\"booleanRef\" [label=\"...\"] [color=\"...\"] />",
        "props: { modelValue, label, color, checkedIcon, uncheckedIcon, disabled }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "تبديل الوضع الليلي (Dark Mode) والنهاري للموقع",
            "تفعيل أو تعطيل استقبال إشعارات البريد الإلكتروني في الإعدادات",
            "تبديل حالات توفر المنتجات في لوحة إدارة المتجر"
        ],
        "switch",
        "// بناء عنصر معقد بـ 3 مستويات من div و span مع نسب translateX وحركات CSS!",
        "<template>\n  <USwitch v-model=\"enabled\" color=\"primary\" />\n</template>",
        "https://ui.nuxt.com/components/switch"
    ),
    (
        "nuxt",
        "<UTable>",
        "جداول البيانات المتقدمة وسريعة التفاعل",
        "UTable nuxt ui table data grid جدول بيانات صفوف أعمدة ترتيب تصفية",
        "مكون جداول بيانات متكامل؛ يدعم تحديد الأعمدة، الترتيب (Sorting) التصاعدي والتنازلي، التحديد المتعدد، والتحكم بمحتوى الخلايا عبر الفتحات المخصصة (Slots).",
        "<template>\n  <UTable :rows=\"userRows\" :columns=\"tableColumns\">\n    <!-- تخصيص عرض عمود الحالة بشارة ملونة -->\n    <template #status-data=\"{ row }\">\n      <UBadge :color=\"row.status === 'نشط' ? 'emerald' : 'gray'\">{{ row.status }}</UBadge>\n    </template>\n  </UTable>\n</template>\n\n<script setup>\nconst tableColumns = [\n  { key: 'name', label: 'اسم المطور', sortable: true },\n  { key: 'role', label: 'المكتبة المفضلة' },\n  { key: 'status', label: 'الحالة' }\n];\nconst userRows = [\n  { name: 'حيدر', role: 'Nuxt 3 & Vue', status: 'نشط' },\n  { name: 'سارة', role: 'Tailwind CSS', status: 'نشط' }\n];\n<\/script>",
        "<UTable :rows=\"dataRows\" :columns=\"columnsConfig\" />",
        "props: { rows, columns, sort, loading, emptyState }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "عرض وإدارة قواعد بيانات المستخدمين والطلبات في لوحات التحكم",
            "ترتيب وتصفية البيانات البرمجية والمصطلحات بسرعة",
            "الجداول المالية وتقارير العمليات وسجلات الأحداث"
        ],
        "table",
        "// كتابة وسوم <table> <thead> <tbody> يدوياً وكتابة كود ترتيب الفهارس بالكامل!",
        "<template>\n  <UTable :rows=\"items\" :columns=\"cols\" />\n</template>",
        "https://ui.nuxt.com/components/table"
    ),
    (
        "nuxt",
        "<UTabs>",
        "أشرطة التبويبات والتنقل الأفقي السلس",
        "UTabs nuxt ui tabs navigation تبويبات تنقل أفقي أقسام تبديل محتوى",
        "مكون تبويبات أنيق يفصل المحتوى إلى أقسام فرعية قابلة للتبديل بنقرة واحدة، مع شريط مؤشر متحرك يتبع التبويب النشط بسلاسة ودعم كامل للأيقونات.",
        "<template>\n  <UTabs :items=\"tabItems\" class=\"w-full\">\n    <template #item=\"{ item }\">\n      <div class=\"p-4 bg-slate-900 rounded-xl mt-2 border border-slate-800\">\n        <p>{{ item.content }}</p>\n      </div>\n    </template>\n  </UTabs>\n</template>\n\n<script setup>\nconst tabItems = [\n  { label: 'الكود العملي', icon: 'i-heroicons-code-bracket', content: 'أكواد Vue 3 واضحة ومباشرة.' },\n  { label: 'المقارنة', icon: 'i-heroicons-arrows-right-left', content: 'مقارنة بين Vanilla JS و Vue 3.' }\n];\n<\/script>",
        "<UTabs :items=\"tabsArray\"> <template #item=\"{ item }\"> ... </template> </UTabs>",
        "props: { items, defaultIndex, orientation }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "التبديل بين أوضاع العرض في بطاقة تفاصيل المصطلح في VueLexicon Pro",
            "تنظيم صفحات إعدادات الحساب (عام، أمان، إشعارات، فواتير)",
            "عرض نماذج تسجيل الدخول وإنشاء حساب في نفس الصندوق"
        ],
        "generic",
        "// إدارة activeTab ومستمعات النقر وتغيير أصناف الألوان لكل تبويب يدوياً",
        "<template>\n  <UTabs :items=\"items\" />\n</template>",
        "https://ui.nuxt.com/components/tabs"
    ),
    (
        "nuxt",
        "<UTextarea>",
        "صناديق النصوص متعددة الأسطر",
        "UTextarea nuxt ui textarea multiline صندوق نص متعدد أسطر تعليق وصف",
        "مكون حقول نصوص متعددة الأسطر يدعم التمدد التلقائي التكيفي (Autoresize) مع كتابة المستخدم، مع تنسيقات حدود وألوان تتناغم تماماً مع حقول UInput.",
        "<template>\n  <UTextarea\n    v-model=\"userNotes\"\n    placeholder=\"اكتب ملاحظاتك البرمجية حول هذا المكون...\"\n    :rows=\"4\"\n    :autoresize=\"true\"\n    color=\"primary\"\n  />\n</template>\n\n<script setup>\nconst userNotes = ref('');\n<\/script>",
        "<UTextarea v-model=\"notesRef\" [rows=\"...\"] [:autoresize=\"...\"] />",
        "props: { modelValue, rows, autoresize, color, placeholder }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "صناديق إدخال التعليقات والآراء والمراجعات",
            "كتابة الوصف التفصيلي للمنتجات والمقالات",
            "مساحات كتابة الأكواد والملاحظات السريعة للمطورين"
        ],
        "input",
        "// وسم <textarea> الكلاسيكي الذي لا يتمدد ذاتياً ويتطلب كود JS لحساب scrollHeight!",
        "<template>\n  <UTextarea v-model=\"desc\" autoresize color=\"primary\" />\n</template>",
        "https://ui.nuxt.com/components/textarea"
    ),
    (
        "nuxt",
        "<UTooltip>",
        "التلميحات العائمة الذكية عند التحويم",
        "UTooltip nuxt ui tooltip popover تلميح عائم تحويم فأرة شرح سريع فقاعة",
        "مكون تلميح يظهر فقاعة توضيحية عائمة صغيرة ومتقنة فور تمرير الفأرة فوق العنصر أو التركيز عليه، مع ضبط تلقائي ذكي للموضع لمنع خروج التلميح خارج حواف الشاشة.",
        "<template>\n  <UTooltip text=\"حفظ هذا المصطلح في قائمة المفضلة الدائمة\" :popper=\"{ placement: 'top' }\">\n    <UButton icon=\"i-heroicons-star\" color=\"gray\" variant=\"ghost\" />\n  </UTooltip>\n</template>",
        "<UTooltip [text=\"...\"] [:popper=\"...\"]> <trigger-element /> </UTooltip>",
        "props: { text, popper, shortcuts }",
        "Nuxt 3 مع موديول @nuxt/ui",
        [
            "شرح وظائف الأزرار التي تعتمد على الأيقونات فقط دون نصوص",
            "عرض اختصارات لوحة المفاتيح التابعة لكل إجراء سريع",
            "تقديم معلومات إرشادية وتوضيحات للمصطلحات المعقدة"
        ],
        "generic",
        "// استخدام خاصية title البدائية في HTML التي تظهر متأخرة ودون أي جمالية بصرية!",
        "<template>\n  <UTooltip text=\"نسخ الكود\">\n    <button>📋</button>\n  </UTooltip>\n</template>",
        "https://ui.nuxt.com/components/tooltip"
    )
]

print(f"Loaded Nuxt items: {len(NUXT_ITEMS)}")
