# -*- coding: utf-8 -*-
JS_ITEMS = [
  [
    "js",
    "addEventListener()",
    "مُنصت ومُستمع الأحداث",
    "event listener click hover scroll dom حدث استماع مراقبة",
    "دالة متصفح قياسية تُستخدم لربط دالة معالجة (Handler) بحدث معين يقع على عنصر في شجرة DOM، مثل النقر، التمرير، أو إدخال نص.",
    "const btn = document.querySelector('#actionBtn');\nbtn.addEventListener('click', (event) => {\n  console.log('تم النقر على العنصر بنجاح!', event.target);\n});",
    "element.addEventListener(type, listener, [options])",
    "void (لا تُرجع قيمة)",
    "جميع المتصفحات وبيئات DOM",
    [
      "الاستجابة لنقر الأزرار وإرسال النماذج",
      "مراقبة تمرير الصفحة (Scroll) وتفعيل التأثيرات",
      "التقاط ضغطات لوحة المفاتيح مثل مفتاح Enter أو Escape"
    ],
    "js_event_listener",
    "const btn = document.querySelector('#btn');\nbtn.addEventListener('click', () => {\n  alert('نقر تقليدي عبر DOM!');\n});",
    "<template>\n  <button @click=\"handleClick\">نقر تفاعلي بأسلوب Vue</button>\n</template>\n<script setup>\nconst handleClick = () => alert('تم النقر!');\n<\\/script>",
    "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"
  ],
  [
    "js",
    "Arrow Function (=>)",
    "الدوال السهمية المختصرة",
    "arrow function lambda es6 دالة سهمية مختصر هذا this context",
    "صيغة مختصرة لكتابة الدوال تم تقديمها في ES6، تتميز بعدم امتلاكها لسياق this خاص بها، بل ترث this من النطاق المعجمي المحيط بها (Lexical this).",
    "// دالة سهمية من سطر واحد تعيد القيمة تلقائياً\nconst multiply = (a, b) => a * b;\n\n// دالة سهمية متعددة الأسطر\nconst greetUser = (name) => {\n  const message = `مرحباً بك يا ${name}!`;\n  return message;\n};",
    "(param1, param2) => expression | { statements }",
    "تُرجع التعبير مباشرة أو القيمة المحددة بـ return",
    "Node.js وجميع المتصفحات الحديثة (ES6+)",
    [
      "كتابة دوال رد الاتصال (Callbacks) الممررة لمصفوفات map و filter",
      "الحفاظ على سياق this بداخل مؤقتات setTimeout ومُستمعات الأحداث",
      "صياغة دوال مساعدة صغيرة وموجزة داخل المكونات"
    ],
    "js_arrow",
    "const numbers = [1, 2, 3];\nconst doubled = numbers.map(function(num) {\n  return num * 2;\n});",
    "const numbers = ref([1, 2, 3]);\nconst doubled = computed(() => numbers.value.map(n => n * 2));",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions"
  ],
  [
    "js",
    "async / await",
    "المعالجة غير المتزامنة الأنيقة",
    "async await promise fetch asynchronous تزامن غير متزامن انتظار",
    "بناء تركيبي يجعل التعامل مع الوعود (Promises) يبدو ككود متزامن تسلسلي وسهل القراءة مع إمكانية اصطياد الأخطاء بسهولة باستخدام try/catch.",
    "async function fetchUserData(userId) {\n  try {\n    const response = await fetch(`https://api.example.com/users/${userId}`);\n    if (!response.ok) throw new Error('فشل جلب البيانات');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('حدث خطأ أثناء الاتصال:', error);\n  }\n}",
    "async function name() { await promise; }",
    "Promise<any> دائماً تُرجع وعداً",
    "ES2017+ المتصفحات و Node.js",
    [
      "طلب البيانات من واجهات برمجة التطبيقات (APIs) دون تجميد واجهة المستخدم",
      "تنفيذ عمليات القراءة والكتابة على قواعد البيانات أو الملفات بتسلسل منطقي",
      "تنسيق العمليات المتتالية التي تعتمد كل منها على نتيجة العملية السابقة"
    ],
    "js_fetch",
    "fetch('/api/user')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));",
    "// في Vue 3 / Nuxt 3 نستخدم useFetch الفوري\nconst { data, status, error } = await useFetch('/api/user');",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"
  ],
  [
    "js",
    "bind() / call() / apply()",
    "تحديد سياق التنفيذ (this)",
    "bind call apply this context ربط استدعاء سياق دالة",
    "دوال كائنية في JavaScript تُستخدم للتحكم الصريح في قيمة this داخل أي دالة وتمرير الوسائط إما متفرقة (call) أو في مصفوفة (apply) أو إنشاء دالة جديدة بربط دائم (bind).",
    "const user = { name: 'طارق' };\nfunction introduce(greeting, title) {\n  return `${greeting} ${title} ${this.name}`;\n}\n\n// استدعاء مباشر بتمرير this\nintroduce.call(user, 'أهلاً', 'المهندس');\n\n// ربط دائم لدالة جديدة\nconst boundIntro = introduce.bind(user);\nconsole.log(boundIntro('مرحباً', 'الأستاذ'));",
    "fn.call(thisArg, ...args) | fn.apply(thisArg, [args]) | fn.bind(thisArg, ...args)",
    "call/apply: نتيجة الدالة، bind: دالة جديدة مرتبطة",
    "جميع بيئات JavaScript القياسية",
    [
      "استعارة دوال كائنات أخرى (Method Borrowing)",
      "تثبيت سياق this عند تمرير دوال الكلاسات كـ Callbacks",
      "صياغة دوال جزئية (Currying / Partial Application)"
    ],
    "js_event_listener",
    "const handler = this.handleClick.bind(this);\nbutton.addEventListener('click', handler);",
    "// في Vue 3 Composition API، الدوال السهمية داخل <script setup> لا تحتاج bind نهائياً!\nconst handleClick = () => { /* سياق محلي نظيف */ };",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind"
  ],
  [
    "js",
    "Blob / FileReader",
    "معالجة البيانات الثنائية والملفات",
    "blob filereader binary file upload صورة رفع ملفات ثنائي",
    "واجهات برمجية في المتصفح لتمثيل وقراءة البيانات الثنائية للملفات الخام (مثل الصور، الصوتيات، أو مستندات PDF) وتحويلها إلى Base64 أو Data URLs للمعاينة.",
    "const input = document.querySelector('input[type=\"file\"]');\ninput.addEventListener('change', (e) => {\n  const file = e.target.files[0];\n  if (file) {\n    const reader = new FileReader();\n    reader.onload = (event) => {\n      console.log('بيانات الصورة كـ URL:', event.target.result);\n    };\n    reader.readAsDataURL(file);\n  }\n});",
    "new FileReader() / reader.readAsDataURL(blob)",
    "كائن FileReader وقراءة غير متزامنة للبيانات",
    "بيئة المتصفح القياسية (Web APIs)",
    [
      "المعاينة الفورية للصور المرفوعة قبل رفعها إلى الخادم",
      "تنزيل وتوليد ملفات CSV أو نصوص ديناميكية من طرف العميل",
      "ضغط الصور وقصها محلياً داخل المتصفح"
    ],
    "js_fetch",
    "const reader = new FileReader();\nreader.onload = (e) => img.src = e.target.result;\nreader.readAsDataURL(file);",
    "const previewUrl = ref('');\nconst onFileChange = (e) => {\n  const file = e.target.files[0];\n  if (file) previewUrl.value = URL.createObjectURL(file);\n};",
    "https://developer.mozilla.org/en-US/docs/Web/API/FileReader"
  ],
  [
    "js",
    "class",
    "الأصناف والبرمجة كائنية التوجه",
    "class oop constructor extends super كلاس كائن وراثة أصناف",
    "صيغة حديثة (Syntactic Sugar) لبناء الكائنات وتطبيق مبادئ البرمجة كائنية التوجه (OOP) والوراثة في JavaScript بطريقة واضحة ومألوفة لمطوري اللغات الأخرى.",
    "class UserAccount {\n  constructor(username, email) {\n    this.username = username;\n    this.email = email;\n    this.createdAt = new Date();\n  }\n\n  displayInfo() {\n    return `${this.username} (${this.email})`;\n  }\n}\n\nconst user = new UserAccount('haidar_dev', 'haidar@example.com');",
    "class ClassName [extends Parent] { constructor() {} methods() {} }",
    "مخطط هيكلي (Constructor Function) لإنشاء كائنات جديدة",
    "ES6+ المتصفحات و Node.js",
    [
      "بناء نماذج البيانات ومخدمات الخدمات (Service Classes)",
      "إنشاء أدوات ومكتبات مخصصة مع دوال وخصائص مغلفة",
      "تطوير الألعاب وهياكل البيانات المتقدمة مثل الأشجار والمكدسات"
    ],
    "js_json",
    "function User(name) { this.name = name; }\nUser.prototype.sayHi = function() { return this.name; };",
    "// في Vue 3 نفضل استخدام Composables الوظيفية بدلاً من الكلاسات\nexport function useUser() {\n  const name = ref('');\n  const sayHi = () => name.value;\n  return { name, sayHi };\n}",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
  ],
  [
    "js",
    "console.log",
    "سجل التصحيح والمراقبة",
    "console log debug warn error طباعة سجل كونسول مراقبة فحص",
    "دالة الفحص الأساسية في المتصفح و Node.js لطباعة القيم، النصوص، والكائنات في نافذة الكونسول للمطورين لمراقبة تدفق التطبيق واكتشاف الأخطاء.",
    "const score = 95;\nconsole.log('النتيجة الحالية:', score);\nconsole.table([\n  { id: 1, name: 'سارة' },\n  { id: 2, name: 'عمر' }\n]);",
    "console.log(data1, [data2, ...])",
    "undefined (طباعة في الكونسول)",
    "جميع بيئات تشغيل JavaScript",
    [
      "فحص قيم المتغيرات أثناء تشغيل الكود وتتبع الأخطاء",
      "التحقق من البيانات الراجعة من واجهات API",
      "استخدام console.table لعرض المصفوفات والكائنات بشكل جدولي أنيق"
    ],
    "js_json",
    "console.log('Value is:', myVar);",
    "// في Vue 3 يمكنك أيضاً مراقبة الحالة بسهولة عبر watchEffect\nwatchEffect(() => console.log('القيمة التفاعلية:', myRef.value));",
    "https://developer.mozilla.org/en-US/docs/Web/API/console/log"
  ],
  [
    "js",
    "const",
    "التصريح بالثوابت المحمية",
    "const variable immutable block scope متغير ثابت نطاق كتل",
    "كلمة محجوزة للتصريح عن متغيرات ذات نطاق كتل (Block Scope) لا يمكن إعادة تعيين قيمتها (Reassignment) بعد إسنادها الأول، مما يضمن أمان تدفق البيانات.",
    "const API_BASE_URL = 'https://api.vuelexicon.dev/v1';\n// API_BASE_URL = 'other'; // يُسبب TypeError حماية للقيمة\n\nconst settings = { theme: 'dark' };\nsettings.theme = 'emerald'; // مسموح: محتوى الكائن قابل للتعديل",
    "const identifier = initialValue;",
    "لا تُرجع قيمة؛ تقوم بإنشاء مرجع ثابت",
    "ES6+ المتصفحات و Node.js",
    [
      "تعريف مراجع Vue التفاعلية مثل const count = ref(0)",
      "حفظ الروابط الأساسية (Endpoints) ومفاتيح التكوين الثابتة",
      "حماية الدوال والمراجع من التغيير العرضي أثناء تشغيل الكود"
    ],
    "vue_counter",
    "var x = 10; // نطاق دالي قد يتسبب في مشاكل تسريب\nx = 20;",
    "const count = ref(0); // المرجع ثابت، لكن القيمة الداخلية count.value تتغير تفاعلياً",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const"
  ],
  [
    "js",
    "Destructuring",
    "تفكيك الكائنات والمصفوفات",
    "destructuring unpacking es6 تفكيك استخراج كائن مصفوفة خصائص",
    "صيغة تعبيرية مبتكرة تسمح باستخراج الخصائص من الكائنات أو العناصر من المصفوفات وإسنادها إلى متغيرات فردية بأسلوب شديد الإيجاز والأناقة.",
    "// تفكيك الكائنات\nconst user = { id: 101, username: 'ahmed', role: 'admin' };\nconst { username, role } = user;\n\n// تفكيك المصفوفات مع قيم افتراضية\nconst [firstColor = 'emerald', secondColor] = ['#00DC82', '#064E3B'];\n\n// تفكيك وسائط الدوال\nfunction printCard({ title, badge }) {\n  console.log(`${title} [${badge}]`);\n}",
    "const { prop1, prop2 } = object; | const [item1, item2] = array;",
    "توليد متغيرات جديدة من الكائن أو المصفوفة",
    "ES6+ المتصفحات و Node.js",
    [
      "استخراج الحقول المهمة مباشرة من استجابات API أو كائنات التكوين",
      "استلام النتائج المرجعة من Composables في Vue 3 مثل const { data, error } = useFetch()",
      "تسهيل التعامل مع props المكونات البرمجية"
    ],
    "js_json",
    "const name = user.name;\nconst age = user.age;\nconst city = user.address.city;",
    "const { name, age, address: { city } } = user;\n// وفي وسائط المكونات: defineProps<{ title: string }>()",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
  ],
  [
    "js",
    "export / import",
    "نظام الوحدات البرمجية النمطي (ES Modules)",
    "export import esm modules نمطية تصدير استيراد حزم وحدات",
    "المعيار القياسي الرسمي في JavaScript لتصدير المتغيرات، الدوال، والأصناف من ملف برمجيات (Module) واستيرادها في ملفات أخرى لتنظيم الكود ومنع التداخل.",
    "// ملف helpers.js\nexport const formatCurrency = (val) => `$${val.toFixed(2)}`;\nexport default class CartService { /* ... */ }\n\n// ملف main.js\nimport CartService, { formatCurrency } from './helpers.js';",
    "export const name = ...; | export default ... | import { name } from 'path';",
    "مشاركة النطاقات واستيراد الكائنات بين الوحدات البرمجية",
    "جميع المتصفحات الحديثة و Node.js (type: module)",
    [
      "تقسيم مشاريع الواجهات الكبيرة إلى وحدات Composables ومكونات صغيرة",
      "استيراد مكونات مكتبات واجهة المستخدم مثل import { UButton } from '#components'",
      "تمكين ميزة شجرة الإسقاط (Tree-shaking) لتقليص حجم الحزمة النهائية"
    ],
    "js_event_listener",
    "// قديماً CommonJS في Node:\nconst utils = require('./utils');\nmodule.exports = myFunction;",
    "// حديثاً ESM القياسي المعتمد في Vue و Vite:\nimport { ref, computed } from 'vue';\nexport function useCounter() { /*...*/ }",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
  ],
  [
    "js",
    "fetch()",
    "جلب البيانات والاتصال الشبكي",
    "fetch api http request ajax جلب بيانات شبكة استعلام خادم",
    "دالة واجهة برمجة تطبيقات الويب الحديثة (Web API) لإرسال طلبات HTTP غير المتزامنة واستقبال الموارد من الخوادم، وتعتمد على نظام الوعود (Promises).",
    "fetch('https://jsonplaceholder.typicode.com/posts/1')\n  .then(response => {\n    if (!response.ok) throw new Error('خطأ في استجابة الخادم');\n    return response.json();\n  })\n  .then(post => console.log('تم استلام المنشور:', post))\n  .catch(error => console.error('خطأ الاتصال:', error));",
    "fetch(resource, [init])",
    "Promise<Response> وعد يحل بكائن الاستجابة",
    "بيئة المتصفح القياسية و Node.js v18+",
    [
      "إرسال واستقبال بيانات REST APIs و GraphQL",
      "إرسال نماذج تسجيل الدخول والاستبيانات عبر POST",
      "تحميل ملفات JSON والصور عبر الشبكة ديناميكياً"
    ],
    "js_fetch",
    "const xhr = new XMLHttpRequest();\nxhr.open('GET', '/api/data');\nxhr.onload = () => console.log(JSON.parse(xhr.responseText));\nxhr.send();",
    "// في Vue 3 / Nuxt 3 نستخدم useFetch السلس:\nconst { data, pending, error, refresh } = await useFetch('/api/data');",
    "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
  ],
  [
    "js",
    "filter()",
    "تصفية وترشيح المصفوفات",
    "filter array تصفية فلترة استخراج عناصر مصفوفة شروط",
    "دالة كائنية مصفوفية مكررة تُنشئ مصفوفة جديدة تحتوي حصرياً على كافة العناصر التي حققت شرط الاختبار المُعطى في دالة رد الاتصال الممررة.",
    "const products = [\n  { name: 'لوحة مفاتيح', price: 120, inStock: true },\n  { name: 'شاشة 4K', price: 800, inStock: false },\n  { name: 'فأرة ميكانيكية', price: 60, inStock: true }\n];\n\n// تصفية المنتجات المتوفرة فقط\nconst available = products.filter(item => item.inStock);\nconsole.log(available);",
    "array.filter((element, index, array) => booleanCondition)",
    "Array جديدة كلياً بالعناصر المطابقة للشرط دون تعديل الأصلية",
    "جميع بيئات تشغيل JavaScript (ES5+)",
    [
      "تنفيذ البحث الفوري وفلترة عناصر القوائم والمصطلحات في واجهات المستخدم",
      "إزالة عنصر محدد من مصفوفة عبر مطابقة المُعرّف item => item.id !== deletedId",
      "فرز المنتجات بحسب الفئة، السعر، أو التوفر"
    ],
    "js_filter",
    "const activeUsers = [];\nfor (let i = 0; i < users.length; i++) {\n  if (users[i].active) activeUsers.push(users[i]);\n}",
    "const filteredTerms = computed(() => {\n  return terms.value.filter(t => t.name.includes(searchQuery.value));\n});",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"
  ],
  [
    "js",
    "find()",
    "البحث عن عنصر فردي في مصفوفة",
    "find array search بحث إيجاد عنصر أول مطابقة مصفوفة",
    "دالة مصفوفية تُعيد أول عنصر يُحقق شرط الفحص المحدد مباشرة، وإذا لم يتطابق أي عنصر مع الشرط، فإنها تُعيد undefined دون متابعة باقي العناصر.",
    "const members = [\n  { id: 'u1', name: 'أحمد' },\n  { id: 'u2', name: 'سارة' },\n  { id: 'u3', name: 'زياد' }\n];\n\n// إيجاد العضو صاحب المعرف المحدد\nconst target = members.find(m => m.id === 'u2');\nconsole.log(target); // { id: 'u2', name: 'سارة' }",
    "array.find((element, index, array) => booleanCondition)",
    "العنصر المطابق الأول، أو undefined عند عدم العثور عليه",
    "ES6+ المتصفحات و Node.js",
    [
      "استخراج بيانات السجل النشط المختار من قائمة جداول أو بطاقات",
      "التحقق من وجود إعداد معين في مصفوفة الإعدادات",
      "العثور على المستخدم الحالي من مصفوفة الجلسات"
    ],
    "js_find",
    "let found = null;\nfor (let item of list) {\n  if (item.id === targetId) { found = item; break; }\n}",
    "const activeItem = computed(() => items.value.find(i => i.id === selectedId.value));",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find"
  ],
  [
    "js",
    "for / for...of",
    "حلقات التكرار والدوران",
    "for loop for of iteration تكرار دوران مصفوفة كائنات حلقة",
    "بُنى تحكم أساسية لتنفيذ كود محدد عدة مرات؛ تمثل for...of الطريقة الأحدث والأنقى للتكرار على العناصر القابلة للتكرار (Iterables) مثل المصفوفات والسلاسل النصية.",
    "const frameworkNames = ['Vue.js', 'Nuxt', 'Tailwind'];\n\n// تكرار عصري عبر for...of\nfor (const name of frameworkNames) {\n  console.log(`المكتبة المدعومة: ${name}`);\n}\n\n// حلقة التكرار الكلاسيكية ذات العداد\nfor (let i = 0; i < 5; i++) {\n  console.log(`الخطوة رقم: ${i + 1}`);\n}",
    "for (const item of iterable) { ... } | for (let i = 0; i < n; i++) { ... }",
    "void (تحكم في مسار التنفيذ)",
    "جميع بيئات تشغيل JavaScript",
    [
      "معالجة عناصر المصفوفات الضخمة بكفاءة وسرعة أداء عالية",
      "تنفيذ عمليات غير متزامنة متسلسلة باستخدام await داخل الحلقة",
      "التنقل في سلاسل الأحرف أو تراكيب Set و Map"
    ],
    "js_loop",
    "for (var i = 0; i < items.length; i++) {\n  renderItem(items[i]);\n}",
    "<template>\n  <!-- في قوالب Vue نستخدم توجيه v-for بدلاً من حلقات الكود اليدوية -->\n  <li v-for=\"item in items\" :key=\"item.id\">{{ item.name }}</li>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of"
  ],
  [
    "js",
    "forEach()",
    "المرور الإجرائي على عناصر المصفوفة",
    "forEach array loop iterate مرور تنفيذ دالة مصفوفة استدعاء",
    "دالة مصفوفية تُنفذ دالة رد اتصال (Callback) معطاة مرة واحدة لكل عنصر من عناصر المصفوفة بالترتيب؛ تُستخدم لتنفيذ تأثيرات جانبية دون إنتاج مصفوفة جديدة.",
    "const tags = ['Vue', 'Nuxt', 'JavaScript'];\n\ntags.forEach((tag, index) => {\n  console.log(`[#${index + 1}] تقنية: ${tag}`);\n});",
    "array.forEach((currentValue, index, array) => { ... })",
    "undefined دائماً",
    "ES5+ جميع المتصفحات و Node.js",
    [
      "إرسال تنبيهات أو إحصائيات تحليلية لكل عنصر في القائمة",
      "تحديث أو إضافة فئات CSS لعناصر مصفوفة DOM",
      "إجراء عمليات كتابة في السجلات لكل مستخدم مسجل"
    ],
    "js_loop",
    "for (let i = 0; i < list.length; i++) {\n  process(list[i]);\n}",
    "// نفضل map أو computed عند الرغبة في تحويل البيانات داخل Vue\nconst names = computed(() => users.value.map(u => u.name));",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach"
  ],
  [
    "js",
    "function",
    "التصريح بالدوال الكلاسيكية",
    "function declaration statement دالة اقتران استدعاء بارامترات",
    "الوسيلة الكلاسيكية لتعريف الدوال القابلة لإعادة الاستخدام في JavaScript؛ تتميز بخاصية الرفع (Hoisting) وامتلاكها لكائن arguments وسياق this الديناميكي.",
    "function calculateDiscount(price, percentage = 10) {\n  const discountAmount = price * (percentage / 100);\n  return price - discountAmount;\n}\n\nconst finalPrice = calculateDiscount(200, 15); // 170",
    "function name([param[, ...param]]) { statements }",
    "تُرجع القيمة المحددة في return، أو undefined",
    "كافة إصدارات وبيئات JavaScript",
    [
      "بناء الدوال العامة والمساعدة في ملفات المشروع",
      "إنشاء دوال المنشئ (Constructor Functions) في الأكواد التراثية",
      "تعريف خوارزميات العمليات الحسابية والمنطقية المعقدة"
    ],
    "js_event_listener",
    "function add(a, b) {\n  return a + b;\n}",
    "// دالة مساعدة معلنة في Vue 3 Composition API\nconst add = (a: number, b: number) => a + b;",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function"
  ],
  [
    "js",
    "getElementById()",
    "الوصول السريع للعنصر بالمعرف",
    "getElementById dom selector عنصر معرف وصول استهداف",
    "أسرع وأقدم دالة في كائن document بالمتصفح لجلب عنصر وحيد من شجرة DOM بناءً على خاصية id الفريدة المحددة له في HTML.",
    "const notificationModal = document.getElementById('userAlertModal');\nif (notificationModal) {\n  notificationModal.style.display = 'block';\n}",
    "document.getElementById(idString)",
    "عنصر Element من نوع DOM، أو null إن لم يوجد",
    "جميع متصفحات الويب بلا استثناء",
    [
      "الوصول المباشر إلى حاويات التطبيق الجذرية مثل #app",
      "التحكم الفوري في عناصر النماذج أو مشغلات الفيديو القديمة",
      "ربط مكتبات رسوم خارجية غير تابعة لـ Vue بعنصر محدد"
    ],
    "js_event_listener",
    "const el = document.getElementById('myCard');\nel.classList.add('active');",
    "// في Vue 3 نستخدم مراجع القوالب (Template Refs) بدلاً من معرّفات DOM المباشرة:\nconst myCard = ref<HTMLElement | null>(null);\n// وفي القالب: <div ref=\"myCard\">",
    "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById"
  ],
  [
    "js",
    "if / else",
    "التفرع الشرطي المنطقي",
    "if else conditional branch منطق تفرع شرط إذا تحقق",
    "أداة التحكم الأساسية في مسار تنفيذ البرنامج؛ تقوم باختبار شرط منطقي وتنفيذ كتلة كود معينة إذا كان صحيحاً (truthy) وكتلة أخرى بديلة إن كان خاطئاً (falsy).",
    "const userRole = 'admin';\n\nif (userRole === 'admin') {\n  console.log('مرحباً بك في لوحة الإدارة الكاملة');\n} else if (userRole === 'editor') {\n  console.log('مرحباً بك في قسم تحرير المحتوى');\n} else {\n  console.log('صلاحيات القراءة فقط');\n}",
    "if (condition) { ... } else if (other) { ... } else { ... }",
    "void (تحكم في التدفق)",
    "كافة بيئات تشغيل JavaScript",
    [
      "التحقق من صحة مدخلات المستخدم قبل إرسال النماذج",
      "التحقق من حالة تسجيل الدخول وتحديد الصلاحيات المتاحة",
      "تبديل واجهات العرض بناءً على وصول البيانات أو فشل الاتصال"
    ],
    "vue_alert",
    "if (isLoggedIn) {\n  showDashboard();\n} else {\n  showLoginForm();\n}",
    "<template>\n  <!-- في قوالب Vue نستخدم توجيه v-if / v-else الشجري -->\n  <Dashboard v-if=\"isLoggedIn\" />\n  <LoginForm v-else />\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else"
  ],
  [
    "js",
    "includes()",
    "فحص الاحتواء للمصفوفات والنصوص",
    "includes search array string مطابقة احتواء تحقق وجود نص مصفوفة",
    "دالة تختبر ما إذا كانت المصفوفة تحتوي على عنصر معين، أو ما إذا كانت السلسلة النصية تحتوي على نص فرعي، وتُعيد true أو false بدقة دون الحاجة للتعامل مع الفهارس -1.",
    "// فحص مصفوفة\nconst allowedRoles = ['admin', 'manager', 'editor'];\nconst hasAccess = allowedRoles.includes('manager'); // true\n\n// فحص نص\nconst filename = 'document_2026.pdf';\nconst isPdf = filename.includes('.pdf'); // true",
    "array.includes(valueToFind[, fromIndex]) | string.includes(searchString[, position])",
    "قيمة منطقية boolean (true / false)",
    "ES6+ (Array) و ES6+ (String) كافة البيئات الحديثة",
    [
      "التحقق السريع من صلاحيات المستخدمين",
      "فحص امتدادات الملفات وأنواعها قبل رفعها",
      "التحقق من وجود كلمة مفتاحية ضمن نص البحث"
    ],
    "js_find",
    "if (str.indexOf('keyword') !== -1) { /* قديمة */ }",
    "const matches = computed(() => term.name.toLowerCase().includes(search.value.toLowerCase()));",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes"
  ],
  [
    "js",
    "JSON.stringify / parse",
    "تحويل وتفكيك بيانات JSON",
    "json stringify parse serialization تحويل كائن سلسلة نصية تسلسل",
    "أداتان قياسيتان في كائن JSON: تقوم stringify بتحويل أي كائن أو مصفوفة JavaScript إلى نص JSON قياسي، بينما تقوم parse بتحويل نص JSON إلى كائن برمجي حي.",
    "const userProfile = { id: 42, name: 'زيد', active: true };\n\n// تحويل الكائن إلى نص للتخزين أو الإرسال\nconst jsonString = JSON.stringify(userProfile);\nconsole.log(typeof jsonString); // 'string'\n\n// فك النص واستعادته ككائن برمجي\nconst restoredObject = JSON.parse(jsonString);\nconsole.log(restoredObject.name); // 'زيد'",
    "JSON.stringify(value[, replacer[, space]]) | JSON.parse(text[, reviver])",
    "stringify: سلسلة نصية، parse: كائن أو قيمة JavaScript",
    "جميع بيئات تشغيل JavaScript القياسية",
    [
      "حفظ الكائنات التفاعلية في localStorage بالمتصفح",
      "تجهيز الحزم والبيانات لإرسالها عبر HTTP POST إلى الخوادم",
      "النسخ العميق السريع (Deep Clone) للكائنات البسيطة"
    ],
    "js_json",
    "localStorage.setItem('cfg', JSON.stringify(config));\nconst cfg = JSON.parse(localStorage.getItem('cfg'));",
    "// في Vue / Nuxt، أدوات مثل useCookie و useLocalStorage تقوم بالتحويل والفك تلقائياً!\nconst userCookie = useCookie('user_profile');",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON"
  ],
  [
    "js",
    "let",
    "المتغيرات المرنة محددة النطاق",
    "let variable reassign block scope متغير إعادة تعيين نطاق محلي",
    "الوسيلة القياسية الحديثة للتصريح عن متغيرات يمكن إعادة إسناد قيمتها في أي وقت، وتلتزم بنطاق الكتل (Block Scope {}) وتمنع مشاكل التسريب الناتجة عن var.",
    "let counter = 0;\ncounter += 1; // مسموح: تعديل القيمة\n\nif (true) {\n  let blockScoped = 'مرئي هنا فقط';\n}\n// console.log(blockScoped); // ReferenceError أمان تام",
    "let identifier [= value];",
    "إنشاء متغير قابل للتغيير",
    "ES6+ المتصفحات و Node.js",
    [
      "عدادات الحلقات والتكرار مثل for (let i = 0; ...)",
      "المتغيرات المساعدة التي تخضع لحسابات وتعديلات تدريجية في الدوال",
      "حفظ الحالات المؤقتة داخل نطاق الدالة قبل إعادتها"
    ],
    "vue_counter",
    "var count = 0; // قد تتسرب وتحدث تضارباً في النطاق العام",
    "// في Vue 3 نستخدم ref بدلاً من let إذا كنا نريد للواجهة أن تتحدث تلقائياً:\nconst count = ref(0);\ncount.value++;",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let"
  ],
  [
    "js",
    "localStorage",
    "التخزين المحلي الدائم بالمتصفح",
    "localStorage storage persistence حفظ دائم متصفح تخزين مفتاح قيمة",
    "واجهة تخزين في المتصفح تسمح بحفظ بيانات مفتاح-قيمة (Key-Value) على جهاز العميل بشكل دائم دون تاريخ انتهاء حتى بعد إغلاق المتصفح وإعادة فتحه.",
    "// حفظ قيمة\nlocalStorage.setItem('vuelexicon_theme', 'dark');\n\n// استرجاع القيمة\nconst savedTheme = localStorage.getItem('vuelexicon_theme');\n\n// حذف عنصر أو مسح الكل\nlocalStorage.removeItem('old_key');\n// localStorage.clear();",
    "localStorage.setItem(k, v) | localStorage.getItem(k) | localStorage.removeItem(k)",
    "سلسلة نصية string، أو null إذا لم يكن المفتاح موجوداً",
    "جميع متصفحات الويب الحديثة (Client-Side Only)",
    [
      "حفظ تفضيلات المستخدم مثل الوضع الليلي المظلم أو اللغة المفضلة",
      "تخزين الرموز المميزة (Auth Tokens) للجلسات البسيطة",
      "حفظ مسودات النماذج لمنع ضياع محتوى المستخدم عند انقطاع الاتصال"
    ],
    "js_localstorage",
    "const theme = localStorage.getItem('theme') || 'light';\nlocalStorage.setItem('theme', 'dark');",
    "// في VueUse أو Nuxt نستخدم useLocalStorage التفاعلي:\nconst theme = useLocalStorage('app-theme', 'dark');",
    "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
  ],
  [
    "js",
    "map()",
    "تحويل وإعادة تشكيل عناصر المصفوفات",
    "map array transform تحويل مصفوفة إعادة تشكيل خرائط دالة",
    "دالة مصفوفية مكررة تُنشئ مصفوفة جديدة بنفس الطول بعد تطبيق دالة تحويل محددة على كل عنصر من عناصر المصفوفة الأصلية دون تعديل الأصل.",
    "const pricesInUSD = [10, 25, 50, 100];\nconst exchangeRate = 3.75; // SAR\n\nconst pricesInSAR = pricesInUSD.map(price => price * exchangeRate);\nconsole.log(pricesInSAR); // [37.5, 93.75, 187.5, 375]",
    "array.map((element, index, array) => newElement)",
    "مصفوفة جديدة بنفس حجم المصفوفة الأصلية تحتوي على النتائج المحولة",
    "ES5+ كافة بيئات تشغيل JavaScript",
    [
      "استخراج قائمة أسماء أو معرّفات فقط من مصفوفة كائنات معقدة",
      "تنسيق البيانات الخام القادمة من API قبل عرضها في الجداول",
      "تحويل مصفوفات البيانات إلى عناصر أو وسوم جاهزة للعرض"
    ],
    "js_map",
    "const names = [];\nfor (let i = 0; i < users.length; i++) {\n  names.push(users[i].name);\n}",
    "const userNames = computed(() => users.value.map(user => user.name));",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map"
  ],
  [
    "js",
    "Nullish Coalescing (??)",
    "عامل الدمج مع القيم المعدومة",
    "nullish coalescing operator دمج انعدام افتراضي صفر قيمة",
    "معامل منطقي يُعيد المعامل الأيمن فقط إذا كان المعامل الأيسر null أو undefined، متفوقاً على || الذي يعتبر القيمة 0 أو النص الفارغ '' قيماً زائفة.",
    "const userSettings = {\n  pageSize: 0, // المستخدم اختار صراحة الحجم 0\n  title: ''\n};\n\n// المعامل || سيتجاهل الصفر خطأً:\nconst wrongSize = userSettings.pageSize || 20; // 20 ❌\n\n// المعامل ?? يحترم الصفر والنص الفارغ:\nconst correctSize = userSettings.pageSize ?? 20; // 0 ✅",
    "leftExpression ?? fallbackExpression",
    "قيمة المعامل الأيسر إن لم تكن null/undefined، وإلا قيمة الأيمن",
    "ES2020+ المتصفحات و Node.js الحديثة",
    [
      "تعيين قيم افتراضية دقيقة لخصائص props والأرقام التي قد تكون 0",
      "تأمين استخراج الإعدادات التي تحتوي على قيم منطقية false",
      "التعامل الأنيق مع البيانات المفقودة القادمة من قواعد البيانات"
    ],
    "js_nullish",
    "const limit = (options.limit !== null && options.limit !== undefined) ? options.limit : 10;",
    "const limit = options.limit ?? 10;",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing"
  ],
  [
    "js",
    "Object.keys/entries",
    "استخراج مفاتيح وقيم الكائنات",
    "object keys entries values استخراج مفاتيح قيم كائن مصفوفة",
    "دوال مساعدة في كائن Object: تُعيد Object.keys مصفوفة من أسماء المفاتيح، بينما تُعيد Object.entries مصفوفة من مصفوفات الأزواج [key, value] لتمكين التكرار المباشر.",
    "const userStats = { views: 1200, likes: 450, shares: 89 };\n\n// جلب المفاتيح\nconsole.log(Object.keys(userStats)); // ['views', 'likes', 'shares']\n\n// المرور على المفتاح والقيمة معاً\nfor (const [metric, count] of Object.entries(userStats)) {\n  console.log(`${metric}: ${count}`);\n}",
    "Object.keys(obj) | Object.values(obj) | Object.entries(obj)",
    "مصفوفة سلاسل نصية أو مصفوفة أزواج [key, value]",
    "ES6+ كافة بيئات تشغيل JavaScript",
    [
      "فحص ما إذا كان الكائن فارغاً عبر Object.keys(obj).length === 0",
      "تحويل الكائنات إلى مصفوفات يمكن تمريرها لتوابع map و filter",
      "توليد خيارات القوائم المنسدلة ديناميكياً من كائنات القواميس"
    ],
    "js_object_keys",
    "for (var key in obj) {\n  if (obj.hasOwnProperty(key)) {\n    console.log(key, obj[key]);\n  }\n}",
    "const metricsList = computed(() => Object.entries(stats.value).map(([k, v]) => ({ key: k, value: v })));",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries"
  ],
  [
    "js",
    "Optional Chaining (?.)",
    "السلسلة الاختيارية الآمنة",
    "optional chaining safe navigation سلسلة اختيارية أمان كائن متداخل خالي",
    "معامل برمجي يسمح بقراءة قيمة خاصية متداخلة داخل سلسلة كائنات دون التسبب في خطأ برمجي (TypeError) قاتل إذا كان أحد المراجع الوسيطة null أو undefined.",
    "const order = {\n  id: 554,\n  customer: null // العميل غير مسجل بعد\n};\n\n// الطريقة الآمنة الحديثة\nconst city = order.customer?.address?.city; // يعيد undefined دون انهيار التطبيق ✅\n\n// استدعاء الدوال المشروطة بأمان\norder.onCancel?.();",
    "object?.prop | object?.[expr] | func?.(...args)",
    "القيمة المطلوبة إن وُجدت، أو undefined عند انقطاع السلسلة",
    "ES2020+ المتصفحات و Node.js الحديثة",
    [
      "قراءة الخصائص العميقة من استجابات API قبل اكتمال تحميلها",
      "استدعاء دوال رد الاتصال الاختيارية الممررة في props المكونات",
      "فحص عناصر المصفوفات المتداخلة بأمان"
    ],
    "js_optional_chain",
    "var city = (order && order.customer && order.customer.address) ? order.customer.address.city : undefined;",
    "const city = order?.customer?.address?.city;",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining"
  ],
  [
    "js",
    "Promise",
    "الوعود المستقبلية للعمليات غير المتزامنة",
    "promise then catch async وعد غير متزامن تسلسل نجاح فشل",
    "كائن يمثل الإنجاز المستقبلي النهائي (أو الفشل) لعملية غير متزامنة، ويتنقل بين ثلاث حالات: قيد الانتظار (Pending)، تم النجاح (Fulfilled)، أو تم الرفض (Rejected).",
    "const checkServerStatus = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    const isOnline = true;\n    if (isOnline) resolve('الخادم يعمل بكفاءة 🟢');\n    else reject('تعذر الاتصال بالخادم 🔴');\n  }, 1000);\n});\n\ncheckServerStatus\n  .then(status => console.log(status))\n  .catch(err => console.error(err));",
    "new Promise((resolve, reject) => { ... })",
    "كائن Promise يدعم ربط .then() و .catch() و .finally()",
    "ES6+ كافة بيئات تشغيل JavaScript",
    [
      "بناء دوال تأخير زمني مخصصة مثل delay(ms)",
      "تغليف واجهات برمجة التطبيقات القديمة القائمة على Callbacks لتصبح عصرية",
      "تنسيق طلبات متعددة بالتوازي باستخدام Promise.all([p1, p2])"
    ],
    "js_promise",
    "function loadData(cb) {\n  oldAsyncCall((err, data) => {\n    if (err) return cb(err);\n    cb(null, data);\n  });\n}",
    "const delay = (ms: number) => new Promise(res => setTimeout(res, ms));\nawait delay(1000);",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
  ],
  [
    "js",
    "push() / splice()",
    "تعديل وتحديث عناصر المصفوفات",
    "push splice array mutation مصفوفة إضافة حذف إدراج تعديل",
    "دوال مصفوفية لتعديل محتوى المصفوفة في مكانها (In-Place Mutation): تقوم push بإضافة عنصر أو أكثر إلى نهاية المصفوفة، بينما تقوم splice بحذف أو إدراج أو استبدال عناصر عند فهرس محدد.",
    "const tasks = ['مراجعة الكود', 'كتابة الاختبارات'];\n\n// إضافة للنهاية\ntasks.push('نشر التحديث');\n\n// حذف عنصر عند الفهرس 1 وإدراج بديل مكانه\ntasks.splice(1, 1, 'كتابة اختبارات E2E');\nconsole.log(tasks);",
    "array.push(...elements) | array.splice(start[, deleteCount[, ...items]])",
    "push: طول المصفوفة الجديد، splice: مصفوفة العناصر المحذوفة",
    "كافة بيئات تشغيل JavaScript القياسية",
    [
      "إضافة إشعارات وتنبيهات جديدة إلى مصفوفة الإشعارات المعروضة",
      "حذف سجل محدد من جدول البيانات عبر موقعه (index)",
      "تحديث عناصر السلة وإعادة ترتيبها"
    ],
    "js_array_push",
    "list.push(newItem);\nlist.splice(index, 1);",
    "// في Vue 3 تكتشف مصفوفات ref تلقائياً استدعاء push و splice وتحدث القالب فوراً!\nconst list = ref(['أ', 'ب']);\nlist.value.push('ج');",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice"
  ],
  [
    "js",
    "querySelector()",
    "استهداف العناصر بمحددات CSS الحديثة",
    "querySelector querySelectorAll dom selector محدد استهداف عنصر",
    "واجهة برمجية فائقة القوة لجلب أول عنصر في شجرة DOM يطابق محدد CSS معين (مثل الفئات .class، المعرفات #id، أو الخصائص [data-type]).",
    "// استهداف عبر الصنف وزر فرعي\nconst submitButton = document.querySelector('.checkout-card button.primary');\nif (submitButton) {\n  submitButton.disabled = true;\n}",
    "document.querySelector(cssSelectorString)",
    "أول عنصر Element مطابق في DOM، أو null إذا لم يتطابق شيء",
    "كافة المتصفحات الحديثة (DOM API)",
    [
      "تحديد الأزرار والعناصر المعقدة ذات التراكيب المتشعبة",
      "التقاط النماذج بناءً على خصائص البيانات المخصصة data-attributes",
      "تنفيذ التعديلات المباشرة على الأكواد التراثية غير التفاعلية"
    ],
    "js_event_listener",
    "const btn = document.querySelector('.btn-primary');\nbtn.classList.toggle('active');",
    "// في Vue نستخدم مراجع القوالب أو نربط الفئات تفاعلياً:\n<button :class=\"{ 'btn-primary': isPrimary, active: isActive }\">",
    "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector"
  ],
  [
    "js",
    "reduce()",
    "تراكم واختزال عناصر المصفوفة",
    "reduce array accumulator اختزال تراكم مجموع مصفوفة تلخيص",
    "واحدة من أقوى دوال المصفوفات في البرمجة الوظيفية؛ تقوم بالمرور على جميع عناصر المصفوفة واختزالها تدريجياً إلى قيمة نهائية مفردة (مثل مجموع الأرقام أو تجميع كائن مخصص).",
    "const cartItems = [\n  { title: 'كتاب Vue 3', price: 45, qty: 2 },\n  { title: 'دورة Nuxt', price: 120, qty: 1 }\n];\n\n// حساب المجموع الكلي للفاتورة\nconst totalBill = cartItems.reduce((acc, item) => {\n  return acc + (item.price * item.qty);\n}, 0);\n\nconsole.log(`إجمالي الفاتورة: ${totalBill}$`); // 210$",
    "array.reduce((accumulator, currentValue, index, array) => newAccumulator, initialValue)",
    "القيمة النهائية المتراكمة من أي نوع (رقم، كائن، مصفوفة)",
    "ES5+ كافة بيئات تشغيل JavaScript",
    [
      "حساب المجاميع والضرائب والخصومات في سلة التسوق",
      "تجميع مصفوفة كائنات وتصنيفها حسب حقل معين (Grouping)",
      "تسطيح المصفوفات المتعددة الأبعاد (Flattening) في الأكواد الكلاسيكية"
    ],
    "js_reduce",
    "let total = 0;\nfor (let i = 0; i < cart.length; i++) {\n  total += cart[i].price;\n}",
    "const total = computed(() => items.value.reduce((sum, item) => sum + item.price, 0));",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"
  ],
  [
    "js",
    "return",
    "إعادة القيمة وإنهاء تنفيذ الدالة",
    "return statement exit function إرجاع قيمة إنهاء دالة مخرجات",
    "التعليمة الأساسية التي توقف فوراً تنفيذ الدالة وتُعيد القيمة المحددة بعدها إلى المكان الذي استدعى الدالة؛ إذا تُركت فارغة تُعيد undefined.",
    "function isStrongPassword(pwd) {\n  if (!pwd) return false; // خروج مبكر (Early Return)\n  if (pwd.length < 8) return false;\n  return /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);\n}",
    "return [expression];",
    "يحدد مخرجات الدالة ويوقف تنفيذها فوراً",
    "كافة بيئات تشغيل JavaScript",
    [
      "تطبيق نمط الحراسة والخروج المبكر (Guard Clauses / Early Return) لتقليل تداخل الأقواس",
      "إعادة كائنات الحالة والدوال من داخل Vue Composables",
      "إرجاع القيم المحسوبة في دوال computed و getters"
    ],
    "vue_counter",
    "function getDiscount(price) {\n  return price * 0.9;\n}",
    "export function useCounter() {\n  const count = ref(0);\n  return { count }; // إرجاع الحالة للاستخدام في المكونات\n}",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return"
  ],
  [
    "js",
    "Set / Map",
    "هياكل البيانات المتقدمة للمجموعات والخرائط",
    "set map unique collection هيكل بيانات عناصر فريدة خريطة مفاتيح",
    "هياكل بيانات متطورة مدمجة في ES6: يضمن Set تخزين عناصر فريدة بدون أي تكرار، بينما يسمح Map بتخزين أزواج مفتاح-قيمة حيث يمكن أن يكون المفتاح كائناً أو أي نوع آخر.",
    "// استخدام Set لحذف التكرار فوراً\nconst numbersWithDuplicates = [1, 2, 2, 3, 4, 4, 5];\nconst uniqueNumbers = [...new Set(numbersWithDuplicates)];\nconsole.log(uniqueNumbers); // [1, 2, 3, 4, 5]\n\n// استخدام Map لربط الكائنات بقيم\nconst userRoles = new Map();\nconst adminObj = { id: 1 };\nuserRoles.set(adminObj, 'SuperAdmin');",
    "new Set([iterable]) | new Map([iterable])",
    "كائن من نوع Set أو Map بميثودز خاصة (add, has, delete, set, get)",
    "ES6+ المتصفحات و Node.js",
    [
      "تجريد المصفوفات من العناصر المكررة بلمح البصر",
      "تخزين التخزين المؤقت (Cache) بربط كائنات الطلبات بنتائجها",
      "إدارة مجموعات وسوم التصنيفات المحددة في واجهات التصفية"
    ],
    "js_array_push",
    "const unique = [];\nfor (let i = 0; i < arr.length; i++) {\n  if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);\n}",
    "const selectedTags = ref(new Set<string>());\nconst toggleTag = (tag) => selectedTags.value.has(tag) ? selectedTags.value.delete(tag) : selectedTags.value.add(tag);",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set"
  ],
  [
    "js",
    "setTimeout()",
    "المؤقتات وتأخير تنفيذ الكود",
    "setTimeout timer async delay مؤقت تأخير زمني تنفيذ بعد وقت",
    "دالة واجهة برمجة تطبيقات المتصفح و Node.js لجدولة تشغيل دالة معينة لمرة واحدة بعد انقضاء فترة زمنية محددة بالملي ثانية (ms).",
    "console.log('بداية العملية');\n\nconst timerId = setTimeout(() => {\n  console.log('نُفذت بعد انقضاء ثانية ونصف (1500ms)');\n}, 1500);\n\n// يمكن إلغاؤها قبل وقت التنفيذ عبر clearTimeout(timerId);",
    "setTimeout(functionRef, delayInMs, ...paramArgs)",
    "معرف رقمي فريد للمؤقت (timeoutID) لإلغائه",
    "جميع بيئات تشغيل JavaScript",
    [
      "تنفيذ استراتيجية تأخير البحث المتقطع (Debouncing) أثناء كتابة المستخدم",
      "إخفاء رسائل التنبيه والنجاح تلقائياً بعد مرور 3 ثوانٍ",
      "تأخير بدء الرسوم المتحركة أو التركيز على حقول الإدخال"
    ],
    "js_settimeout",
    "setTimeout(function() {\n  hideToast();\n}, 3000);",
    "// في Vue 3 يجب تنظيف المؤقتات داخل onUnmounted لتجنب تسريب الذاكرة:\nonUnmounted(() => clearTimeout(timerId));",
    "https://developer.mozilla.org/en-US/docs/Web/API/setTimeout"
  ],
  [
    "js",
    "Spread (...)",
    "معامل النشر والتوزيع",
    "spread operator rest توزيع نشر نسخ كائن مصفوفة دمج",
    "معامل الأسطر الثلاثية (...) الذي يسمح بتفكيك وتوسيع عناصر المصفوفات أو خصائص الكائنات ونسخها أو دمجها في مصفوفة أو كائن جديد بأسلوب غير مدمر (Immutable).",
    "// دمج ونسخ المصفوفات\nconst base = ['HTML', 'CSS'];\nconst fullStack = [...base, 'JavaScript', 'Vue.js'];\n\n// دمج الكائنات مع تعديل خاصية محددة\nconst defaultSettings = { theme: 'dark', sound: true };\nconst customSettings = { ...defaultSettings, sound: false };",
    "...iterableObject | ...object",
    "توزيع العناصر أو الخصائص في الموضع الحالي",
    "ES6+ المتصفحات و Node.js",
    [
      "إنشاء نسخ سطحية جديدة من الكائنات لتجنب تعديل الأصل مباشرة",
      "دمج خيارات الإعدادات الافتراضية مع إعدادات المستخدم المخصصة",
      "تمرير عناصر مصفوفة كمعاملات منفصلة لدوال مثل Math.max(...numbers)"
    ],
    "js_array_push",
    "var combined = arr1.concat(arr2);\nvar clone = Object.assign({}, original, { extra: true });",
    "const state = ref({ count: 0 });\nconst updated = { ...state.value, count: state.value.count + 1 };",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"
  ],
  [
    "js",
    "switch",
    "التبديل بين الحالات المتعددة",
    "switch case break default تبديل حالات فحص قيمة متعددة",
    "بنية تحكم شرطية تفحص قيمة تعبير ما وتقارنها بسلسلة من حالات case الثابتة؛ تُعد بديلاً أكثر تنظيماً وقراءة لسلاسل if / else if المتشعبة الطويلة.",
    "const status = 'pending';\n\nswitch (status) {\n  case 'active':\n    console.log('الحساب مفعل ومتاح');\n    break;\n  case 'pending':\n    console.log('الحساب قيد المراجعة والتدقيق');\n    break;\n  case 'suspended':\n    console.log('الحساب موقوف مؤقتاً');\n    break;\n  default:\n    console.log('حالة غير معروفة');\n}",
    "switch (expression) { case value1: ... break; default: ... }",
    "void (تحكم في التدفق)",
    "كافة بيئات تشغيل JavaScript",
    [
      "معالجة أنواع الأحداث في نمط Redux / Pinia Actions",
      "تحديد رسائل الخطأ ورموز الاستجابة لطلبات HTTP المختلفة",
      "تبديل المكونات الحركية بناءً على خيار الخطوة الحالية في المعالج (Wizard)"
    ],
    "vue_switch",
    "if (tab === 'home') showHome();\nelse if (tab === 'profile') showProfile();\nelse showDefault();",
    "// غالباً ما نستبدل switch في قوالب Vue بمكون ديناميكي أنيق:\n<component :is=\"currentTabComponent\" />",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch"
  ],
  [
    "js",
    "Template Literals",
    "النصوص القالبية وحقن المتغيرات",
    "template literals backticks interpolation نص قالبي دمج متغيرات علامات مائلة",
    "سلاسل نصية محاطة بعلامات النبرة المائلة (Backticks ``) تسمح بدمج المتغيرات والتعبيرات البرمجية مباشرة باستخدام `${expression}` وكتابة نصوص متعددة الأسطر دون \\n.",
    "const developer = 'حيدر';\nconst tech = 'Nuxt 3';\nconst experience = 5;\n\n// دمج سلس ومتعدد الأسطر\nconst bio = `المطور: ${developer}\nالمكتبة الرئيسية: ${tech}\nسنوات الخبرة: ${experience > 3 ? 'خبير متقدم' : 'متوسط'}`;\n\nconsole.log(bio);",
    "`string text ${expression} string text`",
    "سلسلة نصية string مدمجة وجاهزة",
    "ES6+ المتصفحات و Node.js",
    [
      "توليد رسائل مخصصة وسلاسل الإشعارات التي تحتوي على بيانات المستخدم",
      "صياغة روابط URL المعقدة التي تحتوي على معلمات البحث والاستعلام",
      "كتابة قوالب HTML و CSS متعددة الأسطر داخل نصوص JavaScript"
    ],
    "js_date_intl",
    "var msg = 'مرحباً بك يا ' + user + '، رصيدك هو: ' + balance + ' ريال.';",
    "const msg = computed(() => `مرحباً بك يا ${user.value}، رصيدك هو: ${balance.value} ريال.`);",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals"
  ],
  [
    "js",
    "try / catch",
    "اصطياد ومعالجة الاستثناءات",
    "try catch finally error handling معالجة أخطاء استثناء اصطياد فشل",
    "بناء برمجي لحماية التطبيق من الانهيار عند حدوث أخطاء غير متوقعة أثناء وقت التشغيل، مما يسمح بالتعامل مع الخطأ بمرونة وعرض رسائل ودية للمستخدم.",
    "try {\n  // محاولة تفكيك نص قد يكون غير صالح\n  const rawData = '{\"valid\": false, missingBrace';\n  const result = JSON.parse(rawData);\n  console.log(result);\n} catch (error) {\n  console.error('تم اصطياد خطأ ومنع انهيار البرنامج:', error.message);\n} finally {\n  console.log('تُنفذ هذه الكتلة دائماً سواء نجحت العملية أو فشلت');\n}",
    "try { ... } catch (error) { ... } [finally { ... }]",
    "void (معالجة تدفق الأخطاء)",
    "كافة بيئات تشغيل JavaScript",
    [
      "تأمين عمليات قراءة وتفكيك نصوص JSON الواردة من مصادر خارجية",
      "حماية طلبات الشبكة async/await من قطع تدفق واجهة المستخدم",
      "تسجيل الأخطاء البرمجية إلى خدمات المراقبة مثل Sentry"
    ],
    "vue_alert",
    "try { riskyOperation(); } catch (e) { alert(e.message); }",
    "// في Vue 3 يمكن استخدام onErrorCaptured لالتقاط أخطاء المكونات الفرعية بالكامل:\nonErrorCaptured((err) => { errorLog.value = err.message; return false; });",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch"
  ],
  [
    "js",
    "typeof",
    "فحص وتحديد أنواع المتغيرات",
    "typeof operator type check فحص نوع متغير نوع بيانات رقم نص",
    "معامل أحادي يُعيد سلسلة نصية توضح نوع بيانات المعامل غير المقيم، مثل 'string' أو 'number' أو 'boolean' أو 'object' أو 'function' أو 'undefined'.",
    "console.log(typeof 'VueLexicon'); // 'string'\nconsole.log(typeof 2026);         // 'number'\nconsole.log(typeof true);         // 'boolean'\nconsole.log(typeof (() => {}));   // 'function'\nconsole.log(typeof undefined);    // 'undefined'\nconsole.log(typeof null);         // 'object' (سلوك تراثي شهير)",
    "typeof operand",
    "سلسلة نصية تمثل النوع ('string', 'number', 'boolean', 'object', 'function', ...)",
    "كافة بيئات تشغيل JavaScript",
    [
      "التحقق من صحة أنواع المدخلات داخل الدوال قبل تنفيذ العمليات الحسابية",
      "التحقق مما إذا كان المتغير معرفاً بالفعل أم غير معرف في البيئة",
      "التمييز بين الدوال والكائنات في أدوات المساعدة البرمجية"
    ],
    "js_json",
    "if (typeof callback === 'function') { callback(); }",
    "// في Vue 3 مع TypeScript، نعتمد على النوع الثابت في وقت الترجمة بالإضافة لـ typeof وقت التشغيل:\nconst isValid = computed(() => typeof props.modelValue === 'string');",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof"
  ],
  [
    "js",
    "var",
    "التصريح التراثي بالنطاق الدالي",
    "var variable legacy function scope متغير تراثي نطاق دالي رفع",
    "الوسيلة التراثية لتعريف المتغيرات في JavaScript قبل ES6؛ تتميز بنطاق دالي (Function Scope) بدلاً من نطاق الكتل وتخضع للرفع (Hoisting)، وينصح بتجنبها واستبدالها بـ const و let.",
    "function legacyExample() {\n  var message = 'أهلاً بالعالم';\n  if (true) {\n    var message = 'تمت الكتابة فوق المتغير وتسريبه!';\n  }\n  console.log(message); // سيطبع النص المسرب داخل الشرط!\n}\nlegacyExample();",
    "var identifier [= value];",
    "إنشاء متغير بنطاق دالي أو عام",
    "كافة بيئات تشغيل JavaScript (Legacy)",
    [
      "فهم وصيانة الأكواد القديمة والمشاريع التراثية المكتوبة قبل عام 2015",
      "التعرف على أسباب أخطاء تداخل النطاقات وتجنب تكرارها",
      "استبدالها دائماً بـ const للقيم الثابتة أو let للمتغيرات المؤقتة"
    ],
    "vue_counter",
    "var count = 0; // قد يسبب تسريباً في النطاق العام للنافذة window",
    "const count = ref(0); // نطاق محلي آمن وتفاعلي بنسبة 100%",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var"
  ],
  [
    "js",
    "WeakMap / WeakSet",
    "المجموعات والخرائط ذات المراجع الضعيفة",
    "weakmap weakset memory garbage collection مراجع ضعيفة إدارة ذاكرة كائنات",
    "هياكل بيانات متخصصة تقبل حصرياً الكائنات كمفاتيح وتحتفظ بمراجع ضعيفة (Weak References) لها، مما يتيح لمحرك JavaScript تنظيفها من الذاكرة تلقائياً (Garbage Collection) عند زوالها.",
    "const privateData = new WeakMap();\n\nclass Widget {\n  constructor(name) {\n    // تخزين بيانات خاصة بالكائن دون منع تنظيف الذاكرة\n    privateData.set(this, { internalId: Math.random(), name });\n  }\n  getId() {\n    return privateData.get(this).internalId;\n  }\n}",
    "new WeakMap() | new WeakSet()",
    "كائن إدارة مراجع ضعيفة (get, set, has, delete)",
    "ES6+ المتصفحات و Node.js",
    [
      "تخزين البيانات والخصائص الخاصة للكائنات بشكل آمن",
      "منع تسريب الذاكرة (Memory Leaks) في التطبيقات الضخمة طويلة المدى",
      "الربط المؤقت بين عناصر DOM ومعلومات التتبع البرمجية"
    ],
    "js_json",
    "// الكائنات العادية تحتفظ بالمرجع وتمنع تنظيف الذاكرة حتى لو حُذف العنصر من الصفحة!",
    "// يعتمد نظام التفاعل Reactivity الداخلي في Vue 3 على WeakMap لربط الكائنات بالمشتركين فيها بكفاءة فائقة!",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap"
  ],
  [
    "js",
    "XMLHttpRequest",
    "العميل التراثي لطلبات AJAX",
    "xmlhttprequest xhr ajax legacy طلب قديم تراثي خادم شبكة",
    "الواجهة البرمجية الأصلية التي أطلقت ثورة AJAX في المتصفحات؛ تتيح إرسال طلبات HTTP غير المتزامنة وتعتمد على الأحداث القديمة، واستبدلت اليوم بـ fetch الحديثة.",
    "const xhr = new XMLHttpRequest();\nxhr.open('GET', 'https://api.example.com/data', true);\nxhr.onreadystatechange = function () {\n  if (xhr.readyState === 4 && xhr.status === 200) {\n    console.log('البيانات المستلمة:', JSON.parse(xhr.responseText));\n  }\n};\nxhr.send();",
    "new XMLHttpRequest()",
    "كائن XHR لإدارة الطلب ومراقبة الحالات",
    "المتصفحات القديمة والحديثة للتوافقية التراثية",
    [
      "مراقبة تقدم رفع وتحميل الملفات خطوة بخطوة في المتصفحات التراثية",
      "التعامل مع المشاريع القديمة التي لا تستخدم fetch أو axios",
      "إلغاء الطلبات القديمة قبل ظهور واجهة AbortController"
    ],
    "js_fetch",
    "var req = new XMLHttpRequest();\nreq.open('GET', '/data');\nreq.send();",
    "// في Nuxt 3 و Vue 3 نستخدم useFetch النظيف جداً:\nconst { data } = await useFetch('/data');",
    "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest"
  ],
  [
    "js",
    "yield",
    "إيقاف واستئناف دوال المولدات (Generators)",
    "yield generator function مولدات إيقاف استئناف مكرر تدفق تسلسل",
    "كلمة محجوزة تُستخدم حصرياً داخل دوال المولدات (function*) لإيقاف تنفيذ الدالة مؤقتاً وإرجاع قيمة محددة، مع إمكانية استئناف التنفيذ من نفس النقطة لاحقاً.",
    "function* idSequenceGenerator() {\n  let id = 100;\n  while (true) {\n    yield `ID_${id++}`;\n  }\n}\n\nconst gen = idSequenceGenerator();\nconsole.log(gen.next().value); // 'ID_100'\nconsole.log(gen.next().value); // 'ID_101'",
    "yield [expression];",
    "كائن { value: any, done: boolean }",
    "ES6+ المتصفحات و Node.js",
    [
      "توليد سلاسل أرقام ومعرفات لا نهائية دون استهلاك الذاكرة مسبقاً",
      "بناء خوارزميات التنقل المتدرج والتحكم في تدفق العمليات المعقدة",
      "إدارة سلاسل التأثيرات الجانبية في مكتبات مثل Redux-Saga"
    ],
    "vue_counter",
    "function getNext() { return ++counter; }",
    "// نستخدم التفاعل السحابي والتكرار المنطقي بأسلوب Vue الحديث بدلاً من المولدات المعقدة",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield"
  ],
  [
    "js",
    "Array.from() / Array.isArray()",
    "تحويل وفحص الكائنات المصفوفية",
    "array from isarray iterable nodelist تحويل فحص مصفوفة كائن مكرر",
    "تقوم Array.from بتحويل أي كائن شبيه بالمصفوفات (Array-like مثل NodeList من DOM أو Set) إلى مصفوفة JavaScript حقيقية مع إمكانية تطبيق دالة تحويل سريعة، بينما تفحص Array.isArray بدقة ما إذا كانت القيمة مصفوفة حقيقية دون الاعتماد على typeof الزائف.",
    "// فحص مصفوفة بدقة\nconst isList = Array.isArray([1, 2, 3]); // true\n\n// تحويل NodeList من المتصفح إلى مصفوفة حقيقية\nconst domNodes = document.querySelectorAll('.card');\nconst cardsArray = Array.from(domNodes, node => node.textContent.trim());\n\n// توليد مصفوفة أرقام متسلسلة بسرعة\nconst numbers = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]",
    "Array.from(arrayLike[, mapFn]) | Array.isArray(value)",
    "Array.from: مصفوفة جديدة | Array.isArray: boolean",
    "ES6+ كافة المتصفحات وبيئات Node.js",
    [
      "تحويل عناصر DOM الناتجة عن querySelectorAll إلى مصفوفة لتشغيل map و filter عليها",
      "فحص الاستجابات الواردة من APIs للتأكد من أنها مصفوفة قبل تكرارها بـ v-for",
      "توليد سلاسل الأرقام المخصصة لأرقام الصفحات (Pagination) في الواجهات"
    ],
    "js_array_methods",
    "// قديماً في JavaScript:\nvar isArr = Object.prototype.toString.call(val) === '[object Array]';\nvar arr = Array.prototype.slice.call(nodeList);",
    "// حديثاً في Vue 3:\nconst isList = Array.isArray(props.items);\nconst tags = computed(() => Array.from(selectedTags.value));",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from"
  ],
  [
    "js",
    "String.split() / join()",
    "تقسيم ودمج السلاسل النصية والمصفوفات",
    "split join string array تقسيم دمج نصوص مصفوفة وسوم كلمات",
    "ثنائي تحويل النصوص إلى مصفوفات والعكس: تقوم split بتقسيم النص إلى مصفوفة عناصر بناءً على فاصل محدد (مثل فاصلة أو مسافة)، بينما تقوم join بتجميع عناصر المصفوفة في نص واحد مع فاصل اختياري.",
    "// تقسيم نص وسوم مفصولة بفواصل\nconst tagsString = 'Vue,Nuxt,Tailwind,JavaScript';\nconst tagsArray = tagsString.split(',');\nconsole.log(tagsArray); // ['Vue', 'Nuxt', 'Tailwind', 'JavaScript']\n\n// دمج المصفوفة في عنوان URL أو مسار\nconst slug = ['articles', '2026', 'vue-lexicon'].join('/');\nconsole.log(slug); // 'articles/2026/vue-lexicon'",
    "str.split(separator[, limit]) | arr.join([separator])",
    "split: Array<string> | join: string",
    "كافة إصدارات JavaScript القياسية",
    [
      "تحويل حقول إدخال الكلمات المفتاحية والوسوم إلى مصفوفة شارات معروضة",
      "بناء الروابط الثابتة (Slugs) والمسارات البرمجية النظيفة",
      "عكس الكلمات والجمل في الواجهة عبر str.split('').reverse().join('')"
    ],
    "js_string_split",
    "var words = text.split(' ');\nvar sentence = words.join(' ');",
    "<template>\n  <!-- تحويل النص المدخل إلى شارات ملونة حية -->\n  <span v-for=\"tag in inputTags.split(',')\" :key=\"tag\" class=\"badge\">{{ tag.trim() }}</span>\n</template>",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split"
  ],
  [
    "js",
    "String.replace() / replaceAll()",
    "استبدال النصوص والتعبيرات الذكية",
    "replace replaceall regex string استبدال نصوص تعبيرات مطابقة تبديل كلمات",
    "دوال استبدال الأنماط النصية: تقوم replace باستبدال أول مطابقة للنمط أو كل المطابقات مع تعبير منتظم /g، بينما تقدم replaceAll في ES2021 حلاً مباشراً لاستبدال كافة التكرارات لنص محدد دون الحاجة لكتابة Regex.",
    "const sentence = 'تعلم Vue مع VueLexicon واستمتع ببرمجة Vue 3';\n\n// استبدال كافة التكرارات بسلاسة في ES2021\nconst updated = sentence.replaceAll('Vue', 'Nuxt');\nconsole.log(updated);\n// 'تعلم Nuxt مع NuxtLexicon واستمتع ببرمجة Nuxt 3'",
    "str.replace(pattern, replacement) | str.replaceAll(pattern, replacement)",
    "سلسلة نصية جديدة بالقيم المستبدلة",
    "replace: كافة البيئات | replaceAll: ES2021+ المتصفحات الحديثة",
    [
      "تنظيف وتطهير مدخلات المستخدم من الأحرف غير المرغوبة والمسافات الزائدة",
      "استبدال الكلمات المحظورة أو تلوين الكلمات المبحوث عنها في واجهة البحث",
      "صياغة الروابط وتحويل المسافات إلى شرطات URL slug generator"
    ],
    "js_string_replace",
    "// قديماً كانت تتطلب RegExp مع علم g:\nvar res = text.replace(/oldWord/g, 'newWord');",
    "const cleanSlug = computed(() => title.value.trim().toLowerCase().replaceAll(' ', '-'));",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll"
  ],
  [
    "js",
    "Math.random() / Math.floor()",
    "توليد الأرقام العشوائية والتقريب الرياضي",
    "math random floor round توليد أرقام عشوائي تقريب نرد سحب محاكاة",
    "تُعيد Math.random() رقماً عشرياً عشوائياً بين 0 و 1، وتُستخدم مع Math.floor() (التقريب للأسفل) لتوليد أرقام صحيحة عشوائية ضمن أي مدى محدد (مثل توليد رقم سري أو محاكاة رمي نرد).",
    "// دالة توليد رقم صحيح عشوائي بين حدين (min و max)\nfunction getRandomInt(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\n// رقم نرد بين 1 و 6\nconst diceRoll = getRandomInt(1, 6);\n\n// اختيار عنصر عشوائي من مصفوفة\nconst colors = ['#00DC82', '#38BDF8', '#FBBF24', '#F43F5E'];\nconst randomColor = colors[Math.floor(Math.random() * colors.length)];",
    "Math.random() | Math.floor(number) | Math.round(number)",
    "رقم عادي Number",
    "كافة بيئات تشغيل JavaScript القياسية",
    [
      "توليد معرفات عشوائية مؤقتة لعناصر النماذج والبطاقات",
      "اختيار الفائزين أو توليد ألوان عشوائية للرسوم البيانية والشارات",
      "بناء ألعاب التخمين، النرد، وتأثيرات التحريك المتفرقة"
    ],
    "js_math_random",
    "var rand = Math.floor(Math.random() * 100);",
    "const luckyNumber = ref(Math.floor(Math.random() * 100));\nconst reroll = () => luckyNumber.value = Math.floor(Math.random() * 100);",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random"
  ],
  [
    "js",
    "Date & Intl.DateTimeFormat",
    "التواريخ والأوقات وتنسيقها باللغة العربية",
    "date intl datetimeformat تاريخ وقت تنسيق عربي هجري تقويم",
    "كائن التاريخ الأصلي Date مع واجهة التدويل العالمية Intl؛ تتيح تحويل وتنسيق التواريخ والأوقات تلقائياً بحسب لغة المستخدم (مثل التقويم الهجري أو الميلادي وتنسيق 'منذ 5 دقائق') دون مكتبات ثقيلة كـ Moment.js.",
    "const today = new Date();\n\n// تنسيق عربي فائق الأناقة بواسطة معيار Intl المدمج\nconst arabicFormatter = new Intl.DateTimeFormat('ar-SA', {\n  dateStyle: 'full',\n  timeStyle: 'short'\n});\n\nconsole.log(arabicFormatter.format(today));\n// مثال: 'الثلاثاء، 20 أكتوبر 2026 في 8:30 ص'",
    "new Date([value]) | new Intl.DateTimeFormat([locales, options]).format(date)",
    "Date: كائن تاريخ | Intl: سلسلة نصية منسقة محلياً",
    "كافة المتصفحات وبيئات Node.js الحديثة",
    [
      "عرض تواريخ نشر المقالات والمصطلحات البرمجية باللغة العربية الفصحى",
      "تنسيق الأوقات في غرف الدردشة والتنبيهات المباشرة",
      "الاستغناء الكامل عن مكتبات التواريخ الخارجية وتوفير حجم الحزمة"
    ],
    "js_date_intl",
    "// قديماً: استدعاء مكتبات ضخمة مثل moment.js تزيد حجم الموقع بمئات الكيلوبايتات!",
    "const formattedDate = computed(() => {\n  return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' }).format(new Date());\n});",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat"
  ],
  [
    "js",
    "RegExp (test / match)",
    "التعبيرات المنتظمة وفحص الأنماط المعقدة",
    "regexp regex test match تعبير منتظم فحص تحقق بريد كلمة سر أنماط",
    "كائنات التعبيرات المنتظمة (Regular Expressions) لمطابقة سلاسل الأحرف مع أنماط نصية معقدة؛ تقوم test() بفحص تحقق النمط وإرجاع boolean، بينما تقوم match() باستخراج الأجزاء المطابقة.",
    "// نمط التحقق من صحة البريد الإلكتروني\nconst emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\nconsole.log(emailRegex.test('haidar@example.com')); // true\n\n// نمط فحص كلمة سر قوية (8 خانات، حرف كبير، ورقم)\nconst passwordRegex = /^(?=.*[A-Z])(?=.*\\d).{8,}$/;\nconsole.log(passwordRegex.test('VuePro2026')); // true",
    "regex.test(string) | string.match(regex)",
    "test: boolean | match: RegExpMatchArray | null",
    "كافة بيئات تشغيل JavaScript",
    [
      "التحقق المباشر من صحة البريد الإلكتروني وأرقام الهواتف في النماذج",
      "مؤشرات قوة كلمات المرور (Password Strength Meters) في الواجهات",
      "استخراج وسوم الهاشتاج أو الكلمات المسبوقة بـ @ من التغريدات والتعليقات"
    ],
    "js_regex",
    "if (!/^[0-9]+$/.test(inputVal)) { alert('يرجى إدخال أرقام فقط!'); }",
    "const isValidEmail = computed(() => /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(email.value));",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp"
  ],
  [
    "js",
    "Debounce & Throttle",
    "ضبط وتيرة الاستدعاءات وتأخير البحث",
    "debounce throttle performance تأخير وتيرة تخفيف استدعاء بحث فوري تحسين أداء",
    "تقنيتان برمجيتان لتحسين الأداء: يقوم Debounce بتأخير تنفيذ الدالة حتى يتوقف المستخدم عن الكتابة لفترة محددة (مثل البحث الفوري)، بينما يقوم Throttle بضمان عدم تنفيذ الدالة أكثر من مرة كل فترة زمنية (مثل أحداث التمرير Scroll).",
    "// دالة Debounce قياسية خفيفة\nfunction debounce(fn, delay = 300) {\n  let timerId;\n  return (...args) => {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn(...args), delay);\n  };\n}\n\n// استخدامها لمنع إرسال طلب خادم مع كل حرف يكتبه المستخدم:\nconst handleSearch = debounce((query) => {\n  console.log('إرسال طلب البحث الفعلي إلى الخادم:', query);\n}, 400);",
    "debounce(callback, delayInMs) | throttle(callback, intervalInMs)",
    "دالة جديدة مغلفة بآلية تحكم زمني في التدفق",
    "جميع بيئات تشغيل JavaScript المتصفح و Node.js",
    [
      "منع إغراق الخادم بطلبات البحث الفوري أثناء كتابة المستخدم السريعة",
      "تخفيف استهلاك المعالج عند مراقبة تمرير الصفحة window.onscroll",
      "منع النقر المزدوج السريع العرضي على أزرار الدفع وإرسال النماذج"
    ],
    "js_debounce",
    "// في Vanilla: كتابة متغير timerId يدوي وتنظيفه في كل حدث input!",
    "// في VueUse / Nuxt: نستخدم useDebounceFn التفاعلي المباشر:\nconst onSearch = useDebounceFn((q) => fetchResults(q), 300);",
    "https://developer.mozilla.org/en-US/docs/Web/API/setTimeout"
  ],
  [
    "js",
    "IntersectionObserver",
    "مراقبة ظهور العناصر في نافذة العرض",
    "intersectionobserver lazy loading scroll مراقبة ظهور نافذة عرض تحميل كسول تمرير مرئي",
    "واجهة برمجية فائقة الكفاءة في المتصفح لمراقبة تقاطع العنصر مع نافذة العرض (Viewport)؛ تتيح تفعيل التحميل الكسول للصور وإطلاق حركات الظهور بدقة دون إبطاء الصفحة بمستمعات التمرير scroll.",
    "const observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.classList.add('fade-in-visible');\n      console.log('العنصر مرئي الآن أمام عين المستخدم!');\n    }\n  });\n}, { threshold: 0.2 });\n\n// مراقبة بطاقات المعجم\ndocument.querySelectorAll('.term-card').forEach(card => observer.observe(card));",
    "new IntersectionObserver(callback[, options])",
    "كائن IntersectionObserver (observe, unobserve, disconnect)",
    "كافة المتصفحات الحديثة (Chromium, Firefox, Safari)",
    [
      "التحميل الكسول (Lazy Loading) للصور والمكونات فقط عند اقتراب ظهورها",
      "تفعيل حركات ورسوم الظهور الانسيابية عند التمرير",
      "تنفيذ التمرير اللانهائي (Infinite Scroll) عند وصول المستخدم لنهاية الصفحة"
    ],
    "js_intersection",
    "// قديماً: حساب window.scrollY مع element.offsetTop في حلقة تستهلك موارد البطارية والمعالج!",
    "// في VueUse: نستخدم useIntersectionObserver السلس:\nconst { stop } = useIntersectionObserver(targetRef, ([{ isIntersecting }]) => isVisible.value = isIntersecting);",
    "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"
  ],
  [
    "js",
    "AbortController",
    "إلغاء طلبات الشبكة والمهام غير المتزامنة",
    "abortcontroller cancel fetch طلب إلغاء إيقاف اتصال شبكة أمان مقاطعة",
    "كائن متصفح قياسي يسمح بإلغاء طلبات fetch والعمليات غير المتزامنة برمجياً في أي لحظة عبر تمرير controller.signal؛ يُعد ضرورياً لإلغاء طلبات البحث القديمة عند كتابة استعلام جديد.",
    "const controller = new AbortController();\n\n// تمرير إشارة الإلغاء للطلب\nfetch('/api/heavy-data', { signal: controller.signal })\n  .then(res => res.json())\n  .catch(err => {\n    if (err.name === 'AbortError') console.log('تم إلغاء الطلب بنجاح ومنع هدر الشبكة 🛑');\n  });\n\n// زر لإلغاء العملية فوراً عند رغبة المستخدم\nfunction cancelRequest() {\n  controller.abort();\n}",
    "const controller = new AbortController(); controller.abort();",
    "كائن تحكم بإشارة { signal, abort() }",
    "كافة المتصفحات الحديثة و Node.js v15+",
    [
      "إلغاء طلبات البحث السابقة فور قيام المستخدم بكتابة حرف جديد لمنع تضارب النتائج",
      "توفير زر 'إلغاء التحميل' للمستخدم عند بطء الاتصال",
      "إلغاء الطلبات غير المكتملة تلقائياً عند مغادرة الصفحة في onUnmounted"
    ],
    "js_fetch",
    "// في XHR القديم: xhr.abort(); أما مع الوعود العادية فلا يمكن إلغاؤها بدون AbortController!",
    "// في Nuxt 3: useFetch يلغي الطلبات غير المكتملة تلقائياً عند تغيير المعلمات التفاعلية!",
    "https://developer.mozilla.org/en-US/docs/Web/API/AbortController"
  ],
  [
    "js",
    "structuredClone()",
    "النسخ العميق الحقيقي للكائنات والبيانات",
    "structuredclone deep clone copy نسخ عميق كائن حقيقي حماية مراجع",
    "دالة متصفح و Node.js قياسية حديثة لإنشاء نسخة عميقة حقيقية (Deep Clone) من أي كائن أو مصفوفة مع دعم التراكيب المعقدة (Dates, Sets, Maps) دون القيود والمشاكل التراثية لـ JSON.parse(JSON.stringify).",
    "const originalProfile = {\n  username: 'haidar',\n  settings: { theme: 'dark', tags: new Set(['vue', 'nuxt']) },\n  createdAt: new Date()\n};\n\n// نسخ عميق حقيقي ومثالي بسطر واحد\nconst clonedProfile = structuredClone(originalProfile);\n\n// تعديل النسخة لا يؤثر نهائياً على الأصل!\nclonedProfile.settings.theme = 'emerald';\nconsole.log(originalProfile.settings.theme); // 'dark' محمي تماماً ✓",
    "structuredClone(value[, { transfer }])",
    "نسخة عميقة ومستقلة بالكامل من الكائن الممرر",
    "كافة المتصفحات الحديثة و Node.js v17+",
    [
      "إنشاء نسخ مسودة من البيانات لتعديلها في النماذج مع إمكانية التراجع بأمان",
      "منع التعديلات العرضية غير المقصودة على الحالات العامة للكائنات التفاعلية",
      "نسخ المصفوفات المتداخلة التي تحتوي على كائنات تواريخ Date أو Set"
    ],
    "js_clone",
    "// الحيلة القديمة كانت تفقد كائنات التاريخ والـ Set:\nvar clone = JSON.parse(JSON.stringify(obj));",
    "const formDraft = ref(structuredClone(props.initialData));",
    "https://developer.mozilla.org/en-US/docs/Web/API/structuredClone"
  ],
  [
    "js",
    "URL & URLSearchParams",
    "إدارة وتحليل الروابط ومعلمات البحث",
    "url urlsearchparams query string روابط معلمات بحث استعلام معالجة مسار",
    "واجهات قياسية متطورة للتعامل مع روابط الإنترنت وتحليل معلمات البحث في شريط العنوان (?category=vue&page=2)؛ تتيح إضافة وحذف وتعديل معلمات الاستعلام برمجياً دون تلاعب يدوي بالنصوص.",
    "const currentUrl = new URL(window.location.href);\n\n// إضافة أو تحديث معلمة بحث في الرابط\ncurrentUrl.searchParams.set('category', 'nuxt');\ncurrentUrl.searchParams.set('tab', 'code');\n\nconsole.log(currentUrl.toString());\n// '?category=nuxt&tab=code'\n\n// قراءة قيمة معلمة استعلام محددة\nconst cat = currentUrl.searchParams.get('category'); // 'nuxt'",
    "new URL(url[, base]) | urlObj.searchParams.get(key) | set(key, val)",
    "كائن URL وكائن URLSearchParams",
    "كافة المتصفحات وبيئات Node.js الحديثة",
    [
      "مزامنة خيارات التصفية والبحث في VueLexicon Pro مع شريط العنوان لتمكين مشاركة الروابط",
      "بناء وتوليد روابط الـ API المعقدة بدقة وأمان لتجنب أخطاء الترميز (Encoding)",
      "استخراج معلمات التوثيق (Tokens) ومعرفات الجلسات من روابط التفعيل"
    ],
    "js_url_params",
    "// قديماً: تفكيك الرابط عبر split('&') وتشفير النصوص يدوياً عبر encodeURIComponent!",
    "// في Vue Router / Nuxt: نستخدم useRoute().query لقراءة المعلمات تفاعلياً:\nconst route = useRoute();\nconst activeTab = computed(() => route.query.tab || 'all');",
    "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams"
  ],
  [
    "js",
    "Clipboard API (navigator.clipboard)",
    "النسخ والقراءة من حافظة المتصفح",
    "clipboard copy paste حافظة نسخ لصق نصوص زر برمجي أمان",
    "الواجهة البرمجية غير المتزامنة والآمنة للتعامل مع حافظة جهاز المستخدم (System Clipboard)؛ تتيح نسخ النصوص والأكواد بلمسة واحدة عبر writeText()، وقراءتها عبر readText().",
    "async function copySnippetToClipboard(text) {\n  try {\n    await navigator.clipboard.writeText(text);\n    console.log('تم نسخ الكود للحافظة بنجاح 📋');\n  } catch (err) {\n    console.error('فشل الوصول للحافظة:', err);\n  }\n}",
    "navigator.clipboard.writeText(stringText) | navigator.clipboard.readText()",
    "Promise<void> عند النسخ | Promise<string> عند القراءة",
    "كافة المتصفحات الحديثة (بيئات HTTPS الآمنة)",
    [
      "تفعيل أزرار 'نسخ الكود' في مربعات الأكواد بلمسة واحدة مع إشعار توست",
      "نسخ روابط المشاركة والمفاتيح السرية (API Keys) بنقرة واحدة",
      "استقبال ولصق أكواد التفعيل مباشرة في حقول الإدخال"
    ],
    "js_clipboard",
    "// قديماً: إنشاء عنصر textarea مخفي واختيار النص واستدعاء document.execCommand('copy') المتقادم!",
    "<button @click=\"copyCode(item.code)\" class=\"btn-copy\">نسخ الكود</button>",
    "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API"
  ]
]
