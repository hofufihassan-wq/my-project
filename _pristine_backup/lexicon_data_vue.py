# -*- coding: utf-8 -*-
"""
Vue.js 3 Composition API Dataset (30 Items)
"""

VUE_ITEMS = [
    (
        "vue",
        ":key",
        "مفتاح تتبع العناصر الفريد في القوائم",
        "key v-for diffing virtual dom مفتاح تتبع معرف فريد قائمة هوية",
        "خاصية توجيه خاصة تُستخدم بشكل إلزامي مع v-for لتمكين خوارزمية Virtual DOM من التعرف على هوية كل عنصر بشكل فريد، مما يضمن إعادة ترتيب وحذف العناصر بدقة وسرعة قصوى.",
        "<template>\n  <ul>\n    <!-- استخدام مفتاح فريد وثابت دائماً -->\n    <li v-for=\"user in users\" :key=\"user.id\" class=\"p-2 border-b\">\n      {{ user.name }}\n    </li>\n  </ul>\n</template>",
        ":key=\"uniqueIdentifier\"",
        "String | Number | Symbol",
        "Vue 3 و Vue 2",
        [
            "الحفاظ على حالة العناصر الفرعية وحقول الإدخال عند إعادة ترتيب القوائم",
            "إجبار المكون أو عنصر DOM على إعادة البناء من الصفر (Force Re-render) بتغيير المفتاح",
            "تحسين أداء خوارزمية مقارنة الشجرة الافتراضية (DOM Diffing)"
        ],
        "filter",
        "// في Vanilla DOM، إعادة الترتيب تتطلب حذف وإعادة رسم العناصر يدوياً:\nlistEl.innerHTML = ''; items.forEach(i => appendItem(i));",
        "<template>\n  <!-- في Vue، المفتاح الذكي يمنع إعادة الرسم غير الضرورية: -->\n  <div v-for=\"item in items\" :key=\"item.id\">{{ item.title }}</div>\n</template>",
        "https://vuejs.org/api/built-in-special-attributes.html#key"
    ),
    (
        "vue",
        "<KeepAlive>",
        "الحفاظ على حالة المكونات غير النشطة بالذاكرة",
        "keepalive cache component lifecycle كاش حفظ حالة مكون بالذاكرة تبديل",
        "مكون مدمج في Vue يقوم بحفظ وتخزين المكونات الديناميكية غير النشطة مؤقتاً في الذاكرة بدلاً من تدميرها، مما يحافظ على بيانات الحقول وموقع التمرير عند العودة إليها.",
        "<template>\n  <div class=\"tabs-container\">\n    <button @click=\"currentTab = 'ProfileTab'\">الملف الشخصي</button>\n    <button @click=\"currentTab = 'SettingsTab'\">الإعدادات</button>\n\n    <!-- حفظ حالة المكون الحالي عند التبديل -->\n    <KeepAlive :max=\"5\">\n      <component :is=\"currentTab\" />\n    </KeepAlive>\n  </div>\n</template>",
        "<KeepAlive [include=\"...\"] [exclude=\"...\"] [max=\"...\"]> <component :is=\"...\" /> </KeepAlive>",
        "مكون بنيوي يقوم بتغليف المكونات الديناميكية",
        "بيئة تشغيل Vue 3 و Nuxt 3",
        [
            "الحفاظ على مسودات النماذج الطويلة عند تنقل المستخدم بين التبويبات",
            "منع إعادة جلب البيانات المتكررة عند التبديل السريع بين الصفحات",
            "تفعيل دوال دورة الحياة الخاصة onActivated و onDeactivated"
        ],
        "modal",
        "// في Vanilla JS يتطلب الأمر إخفاء العناصر بـ display: none يدوياً للحفاظ على قيم الحقول!",
        "<template>\n  <KeepAlive>\n    <component :is=\"activeTab\" />\n  </KeepAlive>\n</template>",
        "https://vuejs.org/guide/built-ins/keep-alive.html"
    ),
    (
        "vue",
        "<slot>",
        "منافذ حقن المحتوى داخل المكونات",
        "slot scoped slots content projection منفذ حقن محتوى قوالب مرونة",
        "عنصر توزيع المحتوى الرسمي في قوالب Vue؛ يسمح للمكون الأب بتمرير عناصر وقوالب برمجية ليتم عرضها في أماكن محددة داخل المكون الابن، مما يمنحه مرونة فائقة وإمكانية تخصيص لا نهائية.",
        "<!-- مكون MyCard.vue الابن -->\n<template>\n  <div class=\"border rounded-xl p-4 bg-slate-900\">\n    <header class=\"border-b pb-2 mb-3 text-emerald-400 font-bold\">\n      <slot name=\"header\">عنوان افتراضي للبطاقة</slot>\n    </header>\n    <main>\n      <slot /> <!-- المنفذ الافتراضي -->\n    </main>\n  </div>\n</template>",
        "<slot [name=\"slotName\"] [propName=\"value\"]>محتوى افتراضي</slot>",
        "عنصر توزيع قوالب (Template Outlet)",
        "Vue 3 و Nuxt 3",
        [
            "تصميم بطاقات، نوافذ منبثقة، ولوحات تحكم عامة قابلة لإعادة الاستخدام",
            "تمرير بيانات من الابن إلى الأب عبر المنافذ ذات النطاق (Scoped Slots)",
            "تخصيص أيقونات وأزرار مكونات مكتبات واجهة المستخدم مثل Nuxt UI"
        ],
        "card",
        "// قديماً في JS: تمرير سلاسل HTML معقدة كوسائط للدوال:\nrenderCard('العنوان', '<p>المحتوى</p>');",
        "<template>\n  <MyCard>\n    <template #header><h1>عنوان مخصص</h1></template>\n    <p>محتوى حر ممرر من الأب!</p>\n  </MyCard>\n</template>",
        "https://vuejs.org/guide/components/slots.html"
    ),
    (
        "vue",
        "<Teleport>",
        "نقل وإسقاط العناصر خارج الشجرة الهيكلية",
        "teleport portal modal backdrop نقل عنصر نافذة منبثقة خارج الشجرة هيكل",
        "مكون مدمج مذهل في Vue 3 يتيح لك نقل وإسقاط جزء من قالب المكون إلى أي مكان آخر في شجرة DOM خارج حاوية التطبيق الحالية (مثل إسقاطه مباشرة في <body> أو #modal-target).",
        "<template>\n  <button @click=\"isOpen = true\">فتح النافذة المنبثقة</button>\n\n  <!-- نقل النافذة المنبثقة مباشرة إلى وسم body في DOM -->\n  <Teleport to=\"body\">\n    <div v-if=\"isOpen\" class=\"fixed inset-0 bg-black/60 flex items-center justify-center z-50\">\n      <div class=\"bg-slate-900 p-6 rounded-2xl border border-emerald-500\">\n        <h3 class=\"text-white font-bold\">نافذة منبثقة منتقلة عبر Teleport!</h3>\n        <button @click=\"isOpen = false\" class=\"mt-4 text-emerald-400\">إغلاق</button>\n      </div>\n    </div>\n  </Teleport>\n</template>",
        "<Teleport to=\"targetSelector\" [:disabled=\"boolean\"]> ... </Teleport>",
        "مكون تقني لنقل فروع DOM الافتراضية",
        "Vue 3 و Nuxt 3 (Client-side DOM)",
        [
            "عرض النوافذ المنبثقة (Modals & Dialogs) دون التأثر بقواعد z-index أو overflow:hidden للأب",
            "إنشاء التنبيهات العائمة (Toast Notifications) في زاوية الشاشة",
            "بناء القوائم المنسدلة (Dropdowns) وأشرطة التلميح (Tooltips) الدقيقة"
        ],
        "modal",
        "// في Vanilla DOM: نقل العنصر يدوياً عبر document.body.appendChild(modalEl);",
        "<template>\n  <Teleport to=\"body\">\n    <MyModal v-if=\"showModal\" />\n  </Teleport>\n</template>",
        "https://vuejs.org/guide/built-ins/teleport.html"
    ),
    (
        "vue",
        "<Transition>",
        "التحريك والانتقالات الحركية السلسة",
        "transition animation fade slide حركة انتقال تلاشي انزلاق حركي",
        "مكون مدمج في Vue لتطبيق تأثيرات حركية تلقائية عند ظهور العناصر أو اختفائها (عبر v-if أو v-show) من خلال تطبيق فئات CSS انتقالية مخصصة مثل enter-from و leave-to.",
        "<template>\n  <button @click=\"show = !show\">تبديل الظهور</button>\n\n  <Transition name=\"fade\">\n    <p v-if=\"show\" class=\"text-emerald-400 font-bold p-3\">\n      مرحباً بك! يظهر هذا النص بتأثير انسيابي.\n    </p>\n  </Transition>\n</template>\n\n<style>\n.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }\n.fade-enter-from, .fade-leave-to { opacity: 0; }\n</style>",
        "<Transition [name=\"customName\"] [mode=\"out-in\"]> ... </Transition>",
        "مكون انتقالي يدير فئات CSS وأحداث JavaScript الانتقالية",
        "Vue 3 و Nuxt 3",
        [
            "تلاشي وظهور التنبيهات والإشعارات العائمة بسلاسة",
            "تأثيرات فتح وإغلاق القوائم الجانبية والنوافذ المنبثقة",
            "التبديل الانسيابي بين المسارات والصفحات في تطبيقات Nuxt 3"
        ],
        "alert",
        "// قديماً: تعيين requestAnimationFrame أو setTimeout وحساب قيم الشفافية يدوياً!",
        "<template>\n  <Transition name=\"fade\" mode=\"out-in\">\n    <component :is=\"activeView\" />\n  </Transition>\n</template>",
        "https://vuejs.org/guide/built-ins/transition.html"
    ),
    (
        "vue",
        "computed()",
        "الخصائص المحسوبة التفاعلية ذات التخزين المؤقت",
        "computed getter derived reactivity خاصية محسوبة كاش تتبع مشتق حالة",
        "دالة تنشئ مرجعاً تفاعلياً مشتقاً من حالات أخرى؛ تتميز بخاصية التخزين المؤقت الذكي (Caching) حيث لا تعيد تنفيذ الحساب إلا إذا تغيرت إحدى الحالات التفاعلية التي تعتمد عليها.",
        "<script setup>\nimport { ref, computed } from 'vue';\n\nconst firstName = ref('حيدر');\nconst lastName = ref('علي');\n\n// خاصية محسوبة مشتقة يتم تخزينها مؤقتاً\nconst fullName = computed(() => {\n  return `${firstName.value} ${lastName.value}`;\n});\n<\/script>",
        "const computedRef = computed(getterFunction | { get, set })",
        "ComputedRef<T> مرجع للقراءة فقط (أو للقراءة والكتابة مع setter)",
        "Vue 3 Composition API و Nuxt 3",
        [
            "فلترة وتصفية القوائم الضخمة دون هدر موارد المعالج",
            "حساب المجاميع والضرائب ومؤشرات التقدم في سلات الشراء",
            "دمج وصياغة نصوص الترحيب وتنسيق الأسماء والأرقام"
        ],
        "counter",
        "// في Vanilla JS: يجب استدعاء دالة التحديث يدوياً عند كل تعديل:\nfunction updateFullName() { el.innerText = first + ' ' + last; }\ninput.oninput = updateFullName;",
        "const fullName = computed(() => `${first.value} ${last.value}`);\n// يتم التحديث فوراً في كل مكان يُعرض فيه fullName دون أي تدخل يدوي!",
        "https://vuejs.org/guide/essentials/computed.html"
    ),
    (
        "vue",
        "defineAsyncComponent()",
        "التحميل الكسول للمكونات الكبيرة",
        "defineAsyncComponent lazy loading code splitting تحميل كسول تقسيم كود مكونات",
        "دالة في Vue 3 لتعريف مكونات يتم جلب كودها من الخادم فقط عند الحاجة إليها (Lazy Loading)، مما يقلل حجم الحزمة الأولية (Initial Bundle Size) ويسرع التحميل الأولي للموقع.",
        "<script setup>\nimport { defineAsyncComponent } from 'vue';\n\n// تحميل المكون فقط عندما يُعرض على الشاشة\nconst HeavyChart = defineAsyncComponent(() =>\n  import('./components/HeavyAnalyticsChart.vue')\n);\n<\/script>",
        "defineAsyncComponent(() => import('./PathToComponent.vue'))",
        "مكون Vue يتم حله بشكل غير متزامن",
        "Vue 3 و Nuxt 3 (Vite / Webpack)",
        [
            "تحميل الرسوم البيانية الضخمة ومحررات النصوص الثقيلة فقط عند فتح تبويبها",
            "تحسين درجات أداء الموقع وسرعة استجابة أول تفاعل (LCP و FID)",
            "تقسيم الأكواد البرمجية (Code Splitting) في التطبيقات الضخمة"
        ],
        "generic",
        "// في Vanilla: جلب ملف JS عبر وسوم script ديناميكية معقدة:\nconst s = document.createElement('script'); s.src = 'chart.js';",
        "const HeavyEditor = defineAsyncComponent(() => import('./Editor.vue'));",
        "https://vuejs.org/guide/components/async.html"
    ),
    (
        "vue",
        "defineEmits()",
        "التصريح بأحداث المكون الموجهة للأب",
        "defineEmits emit events custom events تصريح أحداث إرسال للأب مكون",
        "ماكرو برمجي (Compiler Macro) في <script setup> يُستخدم للتصريح عن الأحداث المخصصة التي يمكن للمكون الابن إطلاقها وإرسالها إلى المكون الأب مع تمرير البيانات (Payload).",
        "<script setup>\n// التصريح عن الأحداث المقبولة ونوع بياناتها\nconst emit = defineEmits(['save', 'delete']);\n\nfunction handleSave() {\n  emit('save', { id: 101, status: 'completed' });\n}\n<\/script>\n\n<template>\n  <button @click=\"handleSave\">حفظ وإرسال للأب</button>\n</template>",
        "const emit = defineEmits(['event1', 'event2']) | defineEmits<{ (e: 'event', val: type): void }>()",
        "دالة emit لإطلاق الأحداث",
        "Vue 3 <script setup> و Nuxt 3",
        [
            "إشعار المكون الأب بإغلاق نافذة منبثقة أو إلغاء عملية",
            "تمرير بيانات النماذج من المكونات الفرعية إلى حالة الأب",
            "توثيق واجهة التفاعل بين المكونات وحمايتها بالأنواع في TypeScript"
        ],
        "button",
        "// في Vanilla DOM: إنشاء وإطلاق CustomEvent يدوياً:\nthis.dispatchEvent(new CustomEvent('save', { detail: { id: 101 } }));",
        "<script setup>\nconst emit = defineEmits(['save']);\nconst onSave = () => emit('save', data.value);\n<\/script>",
        "https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits"
    ),
    (
        "vue",
        "defineExpose()",
        "تحديد الخصائص المكشوفة للمكون عبر المراجع",
        "defineExpose expose template ref كشف خصائص دوال مرجع مكون ابن",
        "ماكرو برمجي داخل <script setup> يُستخدم لتحديد الخصائص والدوال التي يسمح بكشفها وإتاحتها للمكون الأب عند استخدامه مراجع القوالب (Template Refs)، لأن المكونات تكون مغلقة افتراضياً.",
        "<!-- مكون الابن MyModal.vue -->\n<script setup>\nimport { ref } from 'vue';\nconst isOpen = ref(false);\nconst open = () => { isOpen.value = true; };\nconst close = () => { isOpen.value = false; };\n\n// كشف دوال محددة فقط للأب\ndefineExpose({ open, close });\n<\/script>",
        "defineExpose({ prop1, method1, ... })",
        "void (كشف للواجهة الخارجية)",
        "Vue 3 <script setup> و Nuxt 3",
        [
            "السماح للمكون الأب بفتح وإغلاق النوافذ المنبثقة برمجياً modalRef.value.open()",
            "إعادة تعيين حقول النماذج الفرعية أو تشغيل التحقق منها من الأعلى",
            "كشف دوال التشغيل والإيقاف لمشغلات الفيديو والصوت المخصصة"
        ],
        "modal",
        "// في الكلاسات القديمة كانت جميع الدوال مكشوفة للعامة وتفتقر للأمان!",
        "// في Vue 3 مغلق افتراضياً ومحمي تماماً، ونكشف ما نريد صراحة:\ndefineExpose({ resetForm, focusInput });",
        "https://vuejs.org/api/sfc-script-setup.html#defineexpose"
    ),
    (
        "vue",
        "defineModel()",
        "الربط التفاعلي ثنائي الاتجاه المباشر",
        "defineModel v-model two-way binding ربط ثنائي اتجاه ماكرو تحديث تلقائي",
        "ميزة حديثة تم اعتمادها رسمياً في Vue 3.4 لتبسيط الربط ثنائي الاتجاه v-model داخل المكونات؛ تُغني عن كتابة defineProps و defineEmits التقليدية بسطر واحد فائق الأناقة.",
        "<!-- مكون CustomInput.vue الابن -->\n<script setup>\n// سطر واحد يوفر خاصية modelValue وحدث update:modelValue معاً!\nconst model = defineModel({ default: '' });\n<\/script>\n\n<template>\n  <input v-model=\"model\" class=\"border p-2 rounded bg-slate-800 text-white\" />\n</template>",
        "const model = defineModel<Type>([name], [options])",
        "Ref تفاعلي ثنائي الاتجاه متصل مباشرة بـ v-model الأب",
        "Vue 3.4+ و Nuxt 3.10+",
        [
            "بناء حقول إدخال ومكونات نماذج مخصصة بأقل قدر ممكن من الكود التكراري",
            "دعم نماذج متعددة على نفس المكون defineModel('title') و defineModel('content')",
            "تطبيق المعدلات المخصصة (Modifiers) بسهولة فائقة"
        ],
        "input",
        "// قديماً في Vue 3:\nconst props = defineProps(['modelValue']);\nconst emit = defineEmits(['update:modelValue']);",
        "// حديثاً في Vue 3.4+ بأسلوب defineModel الخارق:\nconst model = defineModel();",
        "https://vuejs.org/guide/components/v-model.html#v-model-arguments"
    ),
    (
        "vue",
        "defineProps()",
        "التصريح بخصائص ومداخل المكون الواردة من الأب",
        "defineProps props input properties مداخل خصائص واردة مكون أب",
        "الماكرو البرمجي الأساسي في <script setup> لاستقبال الخصائص والبيانات الممررة من المكون الأب، مع دعم كامل للتحقق من الأنواع والقيم الافتراضية الصارمة.",
        "<script setup>\n// تعريف الخصائص مع أنواعها وقيمها الافتراضية\nconst props = withDefaults(defineProps<{\n  title: string;\n  count?: number;\n  variant?: 'solid' | 'outline';\n}>(), {\n  count: 0,\n  variant: 'solid'\n});\n<\/script>\n\n<template>\n  <div :class=\"variant\">{{ title }} ({{ count }})</div>\n</template>",
        "const props = defineProps<{ prop1: string, ... }>() | defineProps(['prop1'])",
        "كائن Props تفاعلي ومحمي للقراءة فقط (Read-only)",
        "Vue 3 <script setup> و Nuxt 3",
        [
            "تمرير المعطيات والبيانات من صفحات التطبيق إلى المكونات القابلة لإعادة الاستخدام",
            "تحديد حالات وتنوعات أزرار وبطاقات واجهة المستخدم (مثل color, size, disabled)",
            "ضمان توافق الأنواع وتفادي الأخطاء البرمجية أثناء وقت التطوير"
        ],
        "card",
        "// في Vanilla: استقبال وسائط دالة عادية تفتقر للأمان التفاعلي:\nfunction createCard(title, count) { ... }",
        "<script setup>\nconst props = defineProps<{ title: string; active?: boolean }>();\n<\/script>",
        "https://vuejs.org/guide/components/props.html"
    ),
    (
        "vue",
        "nextTick()",
        "الانتظار حتى اكتمال تحديث شجرة DOM",
        "nextTick dom update queue tick انتظار تحديث شجرة افتراضية دورة",
        "دالة مساعدة تُعيد وعداً (Promise) يحل فور انتهاء Vue من معالجة كافة التغييرات التفاعلية وتحديث شجرة DOM الحقيقية بالمتصفح، مما يضمن قراءة الأبعاد الحقيقية بدقة.",
        "<script setup>\nimport { ref, nextTick } from 'vue';\n\nconst isEditing = ref(false);\nconst inputField = ref<HTMLInputElement | null>(null);\n\nasync function startEdit() {\n  isEditing.value = true;\n  // ننتظر حتى يقوم Vue برسم حقل الإدخال في DOM الحقيقي:\n  await nextTick();\n  inputField.value?.focus(); // الآن التركيز سينجح بالتأكيد!\n}\n<\/script>",
        "await nextTick() | nextTick(() => { ... })",
        "Promise<void>",
        "Vue 3 و Nuxt 3",
        [
            "التركيز التلقائي على حقول الإدخال فور ظهورها المشروط بـ v-if",
            "حساب الارتفاع الحقيقي وموقع التمرير (scrollHeight) بعد إضافة رسائل دردشة جديدة",
            "تحديث مكتبات خارجية تعتمد على قياسات الأبعاد الفيزيائية لعناصر DOM"
        ],
        "generic",
        "// قديماً كان المطورون يلجأون لحيل غير دقيقة مثل:\nsetTimeout(() => input.focus(), 0);",
        "await nextTick();\ninputEl.value?.focus();",
        "https://vuejs.org/api/general.html#nexttick"
    ),
    (
        "vue",
        "onMounted()",
        "خطاف اكتمال تحميل وتركيب المكون في DOM",
        "onMounted lifecycle mounted hook تحميل تركيب عنصر بدء شجرة استدعاء",
        "أهم خطافات دورة حياة المكون (Lifecycle Hook) في Composition API؛ يُنفذ كود الدالة الممررة له فور اكتمال تركيب المكون وإنشاء كافة عناصر DOM التابعة له وجاهزيتها للتفاعل.",
        "<script setup>\nimport { ref, onMounted } from 'vue';\n\nconst banner = ref<HTMLElement | null>(null);\n\nonMounted(() => {\n  console.log('المكون مركب الآن في DOM بنجاح! جاهز للقياس والتحريك.');\n  // بدء مؤقت أو ربط مكتبة خرائط أو رسوم بيانية هنا\n});\n<\/script>",
        "onMounted(() => { /* كود التنفيذ بعد التركيب */ })",
        "void",
        "Vue 3 و Nuxt 3 (Client-side Only)",
        [
            "جلب البيانات الأولية من APIs فور تحميل الصفحة في تطبيقات SPA",
            "تهيئة مكتبات الطرف الثالث غير المتوافقة مع Vue مثل Chart.js أو Leaflet",
            "ربط مُستمعات أحداث النافذة العامة مثل window.addEventListener('resize')"
        ],
        "generic",
        "document.addEventListener('DOMContentLoaded', () => {\n  initDashboard();\n});",
        "<script setup>\nonMounted(async () => {\n  await loadDashboardData();\n});\n<\/script>",
        "https://vuejs.org/api/composition-api-lifecycle.html#onmounted"
    ),
    (
        "vue",
        "onUnmounted()",
        "خطاف تفكيك وتنظيف المكون والذاكرة",
        "onUnmounted cleanup destroy lifecycle تفكيك تنظيف ذاكرة إلغاء مؤقتات",
        "خطاف دورة الحياة الذي يُستدعى بعد تفكيك المكون بالكامل وإزالته من شجرة DOM؛ هو المكان الأساسي لتنظيف الموارد، إلغاء المؤقتات، وإلغاء مستمعات الأحداث لمنع تسريب الذاكرة.",
        "<script setup>\nimport { onMounted, onUnmounted } from 'vue';\n\nlet timerId: any = null;\n\nonMounted(() => {\n  timerId = setInterval(() => console.log('نبضة فحص...'), 2000);\n});\n\nonUnmounted(() => {\n  // تنظيف وحذف المؤقت فور مغادرة المستخدم للصفحة\n  clearInterval(timerId);\n  console.log('تم تنظيف كافة الموارد بنجاح وحماية الذاكرة.');\n});\n<\/script>",
        "onUnmounted(() => { /* عمليات التنظيف */ })",
        "void",
        "Vue 3 و Nuxt 3",
        [
            "إلغاء المؤقتات الزمنية setInterval و setTimeout",
            "إزالة مستمعات أحداث النافذة window.removeEventListener",
            "قطع اتصالات قنوات WebSockets و WebRTC لمنع استهلاك الشبكة"
        ],
        "generic",
        "// قديماً في Options API:\nbeforeDestroy() { clearInterval(this.timer); }",
        "<script setup>\nonUnmounted(() => clearInterval(timerId));\n<\/script>",
        "https://vuejs.org/api/composition-api-lifecycle.html#onunmounted"
    ),
    (
        "vue",
        "provide() / inject()",
        "حقن وتوفير الحالات عبر شجرة المكونات العميقة",
        "provide inject dependency injection حقن تبعيات مشاركة حالة عميقة شجرة",
        "آلية حقن التبعيات الرسمية في Vue؛ تتيح للمكون الجد (Ancestor) توفير حالة أو دالة عبر provide، ليتمكن أي مكون حفيد على أي عمق من حقنها وقراءتها عبر inject دون الحاجة لتمرير props يدوياً.",
        "<!-- في المكون الجد الأب -->\n<script setup>\nimport { ref, provide } from 'vue';\nconst currentTheme = ref('dark');\nprovide('themeKey', currentTheme);\n<\/script>\n\n<!-- في أي مكون فرعي على أي عمق في الشجرة -->\n<script setup>\nimport { inject } from 'vue';\nconst theme = inject('themeKey', ref('light')); // مع قيمة احتياطية\n<\/script>",
        "provide(key, value) | const val = inject(key, [defaultValue])",
        "قيمة الخاصية المحقونة",
        "Vue 3 و Nuxt 3",
        [
            "حل مشكلة تمرير الخصائص المرهق عبر مستويات عديدة (Prop Drilling)",
            "بناء مكتبات مكونات مجمعة متناسقة مثل مجموعات الأزرار (ButtonGroup) وحقول الاختيار",
            "توفير خدمات عامة مثل إدارة التفضيلات، التوثيق، والموضوع اللوني"
        ],
        "generic",
        "// قديماً كان المطورون يمررون الخصائص عبر 6 مكونات وسيطة لا تحتاجها!",
        "provide('userSession', sessionRef);\n// الحفيد يستقبلها مباشرة:\nconst session = inject('userSession');",
        "https://vuejs.org/guide/components/provide-inject.html"
    ),
    (
        "vue",
        "reactive()",
        "تغليف الكائنات بالتفاعل العميق",
        "reactive state proxy reactivity كائن تفاعلي بروكسي تتبع عميق حالة",
        "دالة تحول كائناً أو مصفوفة JavaScript عادية إلى نسخة تفاعلية بعمق (Deep Reactivity) باستخدام JavaScript Proxies، بحيث يُمكن قراءة وتعديل خصائصه مباشرة دون الحاجة لـ .value.",
        "<script setup>\nimport { reactive } from 'vue';\n\nconst userProfile = reactive({\n  name: 'طارق',\n  stats: {\n    posts: 12,\n    followers: 1200\n  }\n});\n\nfunction updateFollowers() {\n  userProfile.stats.followers += 1; // تعديل مباشر دون .value!\n}\n<\/script>",
        "const state = reactive(rawObject)",
        "نسخة Proxy تفاعلية بالكامل من الكائن الممرر",
        "Vue 3 و Nuxt 3",
        [
            "إدارة كائنات النماذج والاستمارات التي تحتوي على حقول متعددة",
            "بناء مخازن الحالات المعقدة وحسابات السجلات المتشعبة",
            "تجميع الحالات المترابطة داخل كائن منظم واحد"
        ],
        "counter",
        "const state = { count: 0 };\nfunction inc() { state.count++; render(); }",
        "const state = reactive({ count: 0 });\nstate.count++; // الواجهة تتحدث ذاتياً!",
        "https://vuejs.org/guide/essentials/reactivity-fundamentals.html#reactive"
    ),
    (
        "vue",
        "ref()",
        "المرجع التفاعلي الأساسي للقيم الفردية والكائنات",
        "ref reactivity value reactive reference مرجع تفاعلي قيمة وحيد غلاف",
        "حجر الزاوية الأساسي لنظام التفاعل في Vue 3؛ يأخذ أي قيمة أولية (رقم، نص، منطقي) أو كائن، ويُعيد كائناً تفاعلياً يحمل القيمة في خاصية .value في الكود، ويفكها تلقائياً داخل القوالب.",
        "<script setup>\nimport { ref } from 'vue';\n\nconst count = ref(0); // تعريف مرجع تفاعلي برقم أولي\n\nfunction increment() {\n  count.value++; // في JavaScript نصل لها عبر .value\n}\n<\/script>\n\n<template>\n  <!-- في القالب نكتب count مباشرة بدون .value! -->\n  <button @click=\"increment\">العدد: {{ count }}</button>\n</template>",
        "const myRef = ref(initialValue)",
        "Ref<T> كائن مرجعي تفاعلي مغلف",
        "Vue 3 و Nuxt 3",
        [
            "تعريف كافة المتغيرات التفاعلية الفردية (الأرقام، النصوص، الحالات المنطقية)",
            "استخدامه كـ Template Ref للوصول المباشر إلى عناصر شجرة DOM",
            "المرونة الكاملة في إعادة التعيين الكاملة myRef.value = newArray"
        ],
        "counter",
        "let count = 0;\nbtn.onclick = () => { count++; countSpan.innerText = count; };",
        "<template>\n  <button @click=\"count++\">{{ count }}</button>\n</template>\n<script setup>\nconst count = ref(0);\n<\/script>",
        "https://vuejs.org/api/reactivity-core.html#ref"
    ),
    (
        "vue",
        "shallowRef() / shallowReactive()",
        "المراجع التفاعلية السطحية فائقة السرعة",
        "shallowRef shallowReactive performance تحسين أداء تفاعل سطحي خفيف",
        "بدائل محسنة الأداء لـ ref و reactive العادية؛ تقوم بتتبع التغييرات السطحية فقط (مثل إعادة إسناد .value بالكامل) دون مراقبة الخصائص العميقة داخلياً، مما يوفر استهلاك الذاكرة بشكل هائل.",
        "<script setup>\nimport { shallowRef, triggerRef } from 'vue';\n\n// كائن ضخم جداً من 50,000 سجل\nconst bigDataset = shallowRef({ rows: [] });\n\nfunction replaceData(newRows) {\n  // التغيير السطحي يُفعّل التفاعل فوراً وبكفاءة خارقة\n  bigDataset.value = { rows: newRows };\n}\n<\/script>",
        "const shallow = shallowRef(bigObject)",
        "ShallowRef<T> مرجع سطحي خفيف",
        "Vue 3 و Nuxt 3",
        [
            "تحسين الأداء عند حفظ كائنات ضخمة غير متغيرة مثل استجابات الخرائط والبيانات الجغرافية",
            "حفظ نسخ من كائنات خارجية مثل كائنات Three.js المشهدية",
            "تجنب التحويل التفاعلي العميق المكلف للبيانات الضخمة المقروءة فقط"
        ],
        "generic",
        "// التفاعل العادي ref() يمر على كل خاصية متداخلة وينشئ Proxy، مما يستهلك الذاكرة للبيانات العملاقة!",
        "const heavyData = shallowRef(hugeJsonData); // سرعة فائقة وحفظ للذاكرة!",
        "https://vuejs.org/api/reactivity-advanced.html#shallowref"
    ),
    (
        "vue",
        "toRef() / toRefs()",
        "تحويل خصائص الكائنات التفاعلية إلى مراجع فردية",
        "toRef toRefs destructuring reactive تحويل خصائص مراجع تفكيك الحفاظ على التفاعل",
        "أدوات مساعدة لحل مشكلة فقدان التفاعل عند تفكيك (Destructuring) كائنات reactive؛ تقوم بتحويل الخصائص إلى مراجع ref منفصلة تظل متصلة ومتزامنة تماماً مع الكائن التفاعلي الأصلي.",
        "<script setup>\nimport { reactive, toRefs } from 'vue';\n\nconst state = reactive({\n  searchTerm: '',\n  page: 1\n});\n\n// تفكيك آمن يحافظ على التفاعل بنسبة 100%\nconst { searchTerm, page } = toRefs(state);\n\n// الآن يمكن تمرير searchTerm واستخدامه كـ Ref عادي!\n<\/script>",
        "const { prop } = toRefs(reactiveObj) | const prop = toRef(obj, 'propName')",
        "Refs فردية متصلة برباط تفاعلي ثنائي مع الكائن الأصلي",
        "Vue 3 و Nuxt 3",
        [
            "إرجاع الحالات من دوال Composables المخصصة دون أن يفقد المستدعي التفاعل عند التفكيك",
            "تمرير خاصية فردية من كائن reactive إلى دالة تقبل مرجع Ref",
            "تحويل props إلى مراجع لتمريرها إلى Composables مساعدة"
        ],
        "generic",
        "// التفكيك العادي للكائن التفاعلي يفقد التفاعل:\nconst { count } = reactive({ count: 0 }); // count الآن رقم عادي ثابت!",
        "const { count } = toRefs(reactiveState); // count يظل مرجعاً تفاعلياً فعالاً!",
        "https://vuejs.org/api/reactivity-utilities.html#torefs"
    ),
    (
        "vue",
        "useFetch()",
        "جلب البيانات التفاعلي المتقدم في Nuxt و Vue",
        "useFetch nuxt composable async data جلب بيانات تفاعلي متقدم خادم عميل",
        "أداة جلب البيانات المتكاملة المدمجة في Nuxt 3 (والمتوفرة عبر مكتبة VueUse)؛ تدير دورة جلب البيانات بالكامل، وتوفر مراجع تلقائية لـ data و pending و error و refresh مع منع تكرار الطلبات.",
        "<script setup>\n// جلب بيانات تفاعلي بسطر واحد مع دعم SSR التلقائي في Nuxt 3\nconst { data: users, pending, error, refresh } = await useFetch('/api/users', {\n  query: { role: 'admin' },\n  lazy: false\n});\n<\/script>\n\n<template>\n  <div v-if=\"pending\">جاري التحميل...</div>\n  <ul v-else>\n    <li v-for=\"u in users\" :key=\"u.id\">{{ u.name }}</li>\n  </ul>\n</template>",
        "const { data, pending, error, refresh } = await useFetch(url, [options])",
        "{ data: Ref<T>, pending: Ref<boolean>, error: Ref<Error>, refresh: Function }",
        "Nuxt 3 و Vue 3 (مع VueUse)",
        [
            "تنفيذ طلبات البيانات المتوافقة مع العرض من طرف الخادم (SSR) دون وميض الترطيب (Hydration Mismatch)",
            "إعادة جلب البيانات تلقائياً بمجرد تغير معلمات الاستعلام التفاعلية",
            "توفير حالات التحميل والخطأ جاهزة للعرض الفوري في القالب"
        ],
        "fetch",
        "// في الأسلوب التقليدي: إدارة 4 متغيرات يدوياً (data, loading, error, fetchFn)",
        "const { data, pending } = await useFetch('/api/stats');",
        "https://nuxt.com/docs/api/composables/use-fetch"
    ),
    (
        "vue",
        "useSlots() / useAttrs()",
        "الوصول البرمجي للمنافذ والخصائص غير المعلنة",
        "useSlots useAttrs programmatic slots attrs وصول برمجي منافذ خصائص",
        "أدوات مساعدة في Composition API تسمح بالوصول البرمجي المباشر إلى المنافذ (Slots) الممررة للمكون وخصائص السقوط الحر (Fallthrough Attributes) التي لم يتم التصريح عنها في defineProps.",
        "<script setup>\nimport { useSlots, useAttrs } from 'vue';\n\nconst slots = useSlots();\nconst attrs = useAttrs();\n\n// فحص ما إذا كان المستخدم قد مرر محتوى لمنفذ header\nconst hasHeader = computed(() => !!slots.header);\nconsole.log('الخصائص غير المعلنة الممررة للمكون:', attrs);\n<\/script>",
        "const slots = useSlots(); const attrs = useAttrs();",
        "كائنات كشف برمجية للمنافذ والخصائص",
        "Vue 3 و Nuxt 3",
        [
            "إخفاء وتنسيق عناصر القوالب إذا كان المنفذ فارغاً تماماً",
            "بناء مكونات متقدمة ومغلفة (Wrapper Components) وتمرير السمات للعنصر الداخلي",
            "تطوير مكتبات واجهة المستخدم (UI Libraries) عالية المرونة"
        ],
        "generic",
        "// قديماً في Options API:\nthis.$slots.default; this.$attrs;",
        "<script setup>\nconst slots = useSlots();\nconst hasFooter = computed(() => !!slots.footer);\n<\/script>",
        "https://vuejs.org/api/composition-api-setup.html#useslots-useattrs"
    ),
    (
        "vue",
        "useState()",
        "إدارة الحالة التفاعلية المتوافقة مع SSR في Nuxt",
        "useState nuxt ssr global state إدارة حالة شاملة تزامن خادم عميل",
        "الأداة الرسمية في Nuxt 3 لإنشاء حالة تفاعلية عامة مشتركة عبر المكونات؛ تتميز بتوافقها المطلق مع العرض من طرف الخادم (SSR) ونقل الحالة المحلولة إلى المتصفح دون إعادة استدعائها.",
        "<script setup>\n// تعريف حالة عامة مشتركة بمفتاح فريد 'cartCount'\nconst cartCount = useState('cartCount', () => 0);\n\nfunction addToCart() {\n  cartCount.value++;\n}\n<\/script>\n\n<template>\n  <div class=\"badge\">سلة التسوق: {{ cartCount }}</div>\n</template>",
        "const state = useState<T>(keyString, [initFunction])",
        "Ref تفاعلي متزامن بين الخادم والمتصفح",
        "Nuxt 3 حصرياً",
        [
            "مشاركة الحالات البسيطة (مثل عدد عناصر السلة أو بيانات المستخدم المسجل) دون الحاجة لـ Pinia",
            "حماية البيانات من التدمير أو عدم التطابق أثناء الترطيب (SSR Hydration)",
            "تبادل البيانات بسهولة بين صفحات وتخطيطات (Layouts) الموقع"
        ],
        "counter",
        "// استخدام متغير عالمي عادي خارج المكون يتسبب في تسريب البيانات بين مستخدمي الخادم!",
        "const user = useState('user', () => null); // آمن تماماً ومعزول لكل مستخدم في Nuxt 3",
        "https://nuxt.com/docs/api/composables/use-state"
    ),
    (
        "vue",
        "v-bind (:)",
        "الربط التفاعلي للخصائص والسمات",
        "v-bind bind attributes dynamic attributes ربط خصائص ديناميكي سمات نقطتين",
        "توجيه القوالب الأساسي في Vue لربط أي خاصية من خصائص HTML أو خصائص المكونات (props) بتعبير تفاعلي برمجياً؛ يُكتب بصيغته المختصرة الأكثر شيوعاً بنقطتين (:).",
        "<template>\n  <!-- الصيغة المختصرة بنقطتين: -->\n  <img :src=\"userAvatarUrl\" :alt=\"userName\" class=\"rounded-full\" />\n\n  <!-- ربط الأصناف المشروطة ديناميكياً -->\n  <button :disabled=\"isSubmitting\" :class=\"{ 'opacity-50': isSubmitting }\">\n    إرسال\n  </button>\n</template>",
        "v-bind:attr=\"expression\" | :attr=\"expression\"",
        "توجيه ربط خصائص في القالب",
        "Vue 3 و Vue 2 و Nuxt 3",
        [
            "تحديث الروابط، الصور، وحالات التعطيل (disabled) بشكل ديناميكي",
            "تبديل وتطبيق فئات CSS بناءً على شروط منطقية تفاعلية",
            "تمرير كائنات خصائص كاملة دفعة واحدة باستخدام v-bind=\"propsObject\""
        ],
        "button",
        "img.setAttribute('src', userAvatar);\nbtn.disabled = true;",
        "<img :src=\"userAvatar\" :class=\"{ active: isActive }\" />",
        "https://vuejs.org/api/built-in-directives.html#v-bind"
    ),
    (
        "vue",
        "v-for",
        "تكرار ورسم القوائم في القوالب",
        "v-for list rendering iteration تكرار قوائم عناصر مصفوفة رسم قوالب",
        "التوجيه المخصص لتكرار رسم العناصر في القالب بناءً على مصفوفة أو كائن أو مدى رقمي؛ يعتمد على صياغة item in items ويتطلب دائماً مفتاحاً فريداً :key.",
        "<template>\n  <div class=\"grid grid-cols-3 gap-4\">\n    <div\n      v-for=\"(course, index) in courses\"\n      :key=\"course.id\"\n      class=\"card p-4 bg-slate-800 rounded-xl\"\n    >\n      <h3>{{ index + 1 }}. {{ course.title }}</h3>\n      <p class=\"text-emerald-400 font-bold\">{{ course.price }}$</p>\n    </div>\n  </div>\n</template>",
        "v-for=\"(item, index) in items\" :key=\"item.id\"",
        "توجيه تكرار إنشائي في القالب",
        "Vue 3 و Vue 2 و Nuxt 3",
        [
            "عرض جداول وبطاقات البيانات الديناميكية المستلمة من API",
            "بناء قوائم التنقل، التبويبات، وعناصر التصفية",
            "تكرار عناصر واجهة المستخدم بعدد محدد v-for=\"n in 5\""
        ],
        "filter",
        "items.forEach(item => {\n  const el = document.createElement('li');\n  el.innerText = item.name;\n  list.appendChild(el);\n});",
        "<template>\n  <li v-for=\"item in items\" :key=\"item.id\">{{ item.name }}</li>\n</template>",
        "https://vuejs.org/guide/essentials/list.html"
    ),
    (
        "vue",
        "v-if / v-else",
        "العرض الشرطي البنيوي من شجرة DOM",
        "v-if v-else v-else-if conditional rendering عرض شرطي إدراج إزالة شجرة",
        "توجيه العرض الشرطي في قوالب Vue؛ يقوم بإضافة العنصر فعلياً إلى شجرة DOM أو إزالته بالكامل وتدميره بناءً على صحة الشرط المنطقي، مما يوفر استهلاك الذاكرة للعناصر غير المعروضة.",
        "<template>\n  <div class=\"auth-box\">\n    <div v-if=\"isLoggedIn\" class=\"welcome-view\">\n      <h2>مرحباً بك يا {{ username }}!</h2>\n      <button @click=\"logout\">تسجيل الخروج</button>\n    </div>\n    <div v-else class=\"login-prompt\">\n      <p>يرجى تسجيل الدخول للوصول إلى لوحة التحكم.</p>\n      <button @click=\"login\">دخول</button>\n    </div>\n  </div>\n</template>",
        "v-if=\"condition\" ... v-else-if=\"otherCondition\" ... v-else",
        "توجيه تحكم بنيوي في شجرة القالب",
        "Vue 3 و Vue 2 و Nuxt 3",
        [
            "عرض نماذج تسجيل الدخول أو المحتوى المحمي بناءً على حالة المستخدم",
            "التبديل بين شاشات التحميل (Skeleton/Spinner) وشاشات عرض البيانات المكتملة",
            "منع تدمير المكونات الفرعية عند عدم الحاجة إليها وتوفير موارد النظام"
        ],
        "alert",
        "if (loggedIn) {\n  container.innerHTML = '<h1>Welcome</h1>';\n} else {\n  container.innerHTML = '<button>Login</button>';\n}",
        "<template>\n  <UserDashboard v-if=\"loggedIn\" />\n  <LoginButton v-else />\n</template>",
        "https://vuejs.org/guide/essentials/conditional.html"
    ),
    (
        "vue",
        "v-model",
        "الربط التفاعلي ثنائي الاتجاه لحقول الإدخال",
        "v-model two way data binding ربط ثنائي اتجاه حقول إدخال نموذج تزامن فوري",
        "أشهر توجيه في Vue على الإطلاق؛ ينشئ ربطاً ثنائياً فورياً ومتبادلاً بين قيمة حالة المتغير في JavaScript وقيمة حقل الإدخال في القالب، بحيث ينعكس أي تغيير في أحدهما على الآخر فوراً.",
        "<script setup>\nimport { ref } from 'vue';\nconst searchKeyword = ref('');\n<\/script>\n\n<template>\n  <div>\n    <input\n      v-model=\"searchKeyword\"\n      placeholder=\"اكتب مصطلحك البرمجي...\"\n      class=\"border p-2 rounded bg-slate-900 text-white\"\n    />\n    <p class=\"mt-2 text-emerald-400\">أنت تبحث عن: {{ searchKeyword }}</p>\n  </div>\n</template>",
        "v-model=\"reactiveRef\" | v-model.lazy | v-model.number | v-model.trim",
        "توجيه ربط ثنائي الاتجاه",
        "Vue 3 و Vue 2 و Nuxt 3",
        [
            "مزامنة حقول النصوص، مربعات الاختيار (Checkboxes)، وقوائم الاختيار (Selects)",
            "تنفيذ البحث والتصفية الفورية أثناء كتابة المستخدم",
            "تطبيق المعدلات المساعدة مثل v-model.trim لحذف المسافات الزائدة تلقائياً"
        ],
        "input",
        "input.value = currentVal;\ninput.addEventListener('input', (e) => {\n  currentVal = e.target.value;\n  display.innerText = currentVal;\n});",
        "<template>\n  <input v-model=\"searchTerm\" />\n</template>",
        "https://vuejs.org/guide/essentials/forms.html"
    ),
    (
        "vue",
        "v-on (@)",
        "الاستماع للأحداث والتفاعل في القالب",
        "v-on event listener click submit استماع أحداث نقر إرسال معالجة اختصار آت",
        "التوجيه المخصص لربط أحداث DOM (مثل النقر، الإرسال، ضغط المفاتيح) بدوال المعالجة في الكود؛ يُكتب بصيغته المختصرة الشائعة برمز آت (@).",
        "<template>\n  <!-- ربط حدث النقر بالصيغة المختصرة @ -->\n  <button @click=\"handleSubmit\" class=\"btn-primary\">\n    إرسال النموذج\n  </button>\n\n  <!-- استخدام معدلات الأحداث لمنع إعادة تحميل الصفحة -->\n  <form @submit.prevent=\"saveData\">\n    <input type=\"text\" @keyup.enter=\"saveData\" />\n  </form>\n</template>",
        "v-on:eventName=\"handler\" | @eventName=\"handler\" | @eventName.modifier",
        "توجيه منصت أحداث في القالب",
        "Vue 3 و Vue 2 و Nuxt 3",
        [
            "الاستجابة لضغطات الأزرار، تقديم النماذج، وتمرير الفأرة",
            "استخدام معدل .prevent لمنع السلوك الافتراضي للمتصفح دون event.preventDefault()",
            "الاستماع لأحداث مفاتيح مخصصة مثل @keydown.esc لإغلاق النوافذ"
        ],
        "button",
        "btn.addEventListener('click', (e) => {\n  e.preventDefault();\n  submitForm();\n});",
        "<form @submit.prevent=\"submitForm\">\n  <button type=\"submit\">إرسال</button>\n</form>",
        "https://vuejs.org/guide/essentials/event-handling.html"
    ),
    (
        "vue",
        "v-show",
        "التبديل البصري للظهور عبر CSS Display",
        "v-show toggle visibility display none تبديل ظهور إخفاء شاشة مرئي بصري",
        "توجيه شرطي يتحكم في ظهور العنصر على الشاشة؛ بخلاف v-if، يظل العنصر موجوداً دائماً في شجرة DOM ويتم فقط تبديل خاصية CSS الخاصة به display: none، مما يجعله فائق السرعة للتبديل المتكرر.",
        "<template>\n  <button @click=\"isVisible = !isVisible\">تبديل إظهار الإحصائيات</button>\n\n  <!-- العنصر يبقى في DOM وتتغير خاصية display فقط -->\n  <div v-show=\"isVisible\" class=\"p-4 bg-slate-900 border border-emerald-500 rounded-xl\">\n    <p>إحصائيات المطور: 150 مصطلح تم استعراضه بنجاح!</p>\n  </div>\n</template>",
        "v-show=\"condition\"",
        "توجيه تبديل مظهري عبر نمط CSS",
        "Vue 3 و Vue 2 و Nuxt 3",
        [
            "القوائم المنسدلة والتلميحات التي يتم فتحها وإغلاقها بشكل متكرر وسريع",
            "الألواح الجانبية القابلة للطي (Collapsible Sidebars)",
            "الحفاظ على حالة العناصر الداخلية التي يكون تدميرها وإعادة بنائها مكلفاً"
        ],
        "switch",
        "panel.style.display = isVisible ? 'block' : 'none';",
        "<template>\n  <div v-show=\"isPanelOpen\">لوحة سريعة التبديل</div>\n</template>",
        "https://vuejs.org/guide/essentials/conditional.html#v-show"
    ),
    (
        "vue",
        "watch() / watchEffect()",
        "مراقبة التغيرات التفاعلية وتنفيذ التأثيرات الجانبية",
        "watch watchEffect reactive watcher مراقبة تتبع تغيرات تأثير جانبي استماع",
        "دوال مراقبة الحالات في Vue 3؛ تتيح لك تشغيل دالة تأثير جانبي (Side Effect) استجابة لتغير حالة تفاعلية محددة؛ يقوم watchEffect بتتبع كافة الاعتمادات التفاعلية المستخدمة داخله تلقائياً وبدء التشغيل فوراً.",
        "<script setup>\nimport { ref, watch, watchEffect } from 'vue';\n\nconst query = ref('');\n\n// مراقبة دقيقة ومحددة مع الوصول للقيمة القديمة والجديدة\nwatch(query, (newVal, oldVal) => {\n  console.log(`تغير الاستعلام من '${oldVal}' إلى '${newVal}'`);\n});\n\n// مراقبة تلقائية لكافة الحالات وتعمل فوراً عند التهيئة\nwatchEffect(() => {\n  console.log('القيمة الحالية للاستعلام هي:', query.value);\n});\n<\/script>",
        "watch(source, (newVal, oldVal) => { ... }, [options]) | watchEffect(() => { ... })",
        "دالة stopHandle لإلغاء المراقبة برمجياً",
        "Vue 3 Composition API و Nuxt 3",
        [
            "تنفيذ استدعاءات API أو تخزين البيانات في localStorage عند تغير المتغيرات",
            "إعادة ضبط مؤشرات الصفحات عند تغيير المستخدم لكلمات البحث",
            "تسجيل تحليلات سلوك المستخدم ومراقبة المسارات"
        ],
        "generic",
        "// في Vanilla: يجب حقن كود المراقبة يدوياً في كل دالة تعديل!",
        "<script setup>\nwatch(activeFilter, () => {\n  fetchData();\n});\n<\/script>",
        "https://vuejs.org/guide/essentials/watchers.html"
    ),
    (
        "vue",
        "watchPostEffect()",
        "المراقبة بعد اكتمال تحديث شجرة DOM",
        "watchPostEffect post watcher مراقبة بعد التحديث اكتمال شجرة",
        "نسخة متخصصة من watchEffect تُشغّل دالة التأثير الجانبي حصرياً بعد أن يقوم Vue بتحديث شجرة DOM الحقيقية، وهي مفيدة جداً عند الحاجة لقراءة أبعاد العناصر أو التعامل مع عناصر DOM المحدثة.",
        "<script setup>\nimport { ref, watchPostEffect } from 'vue';\n\nconst items = ref(['عنصر 1']);\nconst containerRef = ref<HTMLElement | null>(null);\n\nwatchPostEffect(() => {\n  // يُنفذ هذا الكود دائماً بعد أن يكون العنصر قد رُسم فعلياً في DOM!\n  if (containerRef.value) {\n    containerRef.value.scrollTop = containerRef.value.scrollHeight;\n  }\n});\n<\/script>",
        "watchPostEffect(() => { /* كود ينفذ بعد اكتمال تحديث DOM */ })",
        "دالة stopHandle لإلغاء المراقبة",
        "Vue 3 و Nuxt 3",
        [
            "التمرير التلقائي لأسفل صناديق الدردشة بعد إدراج الرسائل الجديدة",
            "تحديث مؤشرات التمرير والمخططات المعتمدة على قياسات DOM الواقعية",
            "التقاط الصور ولقطات الشاشة للعناصر فور تحديثها التفاعلي"
        ],
        "generic",
        "// بديل معقد عبر MutationObserver في المتصفح!",
        "watchPostEffect(() => {\n  chatEl.value.scrollTop = chatEl.value.scrollHeight;\n});",
        "https://vuejs.org/api/reactivity-core.html#watchposteffect"
    )
]

print(f"Loaded Vue items: {len(VUE_ITEMS)}")
