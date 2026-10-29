/**
 * VueLexicon Pro - Comprehensive Web Developer Lexicon Database
 * Total Items: 180 terms (HTML5: 26, CSS3: 25, JS: 54, Vue 3: 30, Nuxt UI: 25, TypeScript: 20)
 * Format:
 * [category, term, arabicTitle, keywords, description, vueSfcCode, syntaxInfo, returnProps, env, useCases, previewType, vanillaCode, compareNotes, docUrl, codeBreakdown, pitfall, keyProps, relatedTerms]
 */

window.RAW_LEXICON_TUPLES = [
  [
    "js",
    "addEventListener()",
    "مُنصت ومُستمع الأحداث",
    "event listener click hover scroll dom حدث استماع مراقبة",
    "دالة متصفح قياسية تُستخدم لربط دالة معالجة (Handler) بحدث معين يقع على عنصر في شجرة DOM، مثل النقر، التمرير، أو إدخال نص.",
    "<template>\n  <button @click=\"handleClick\">نقر تفاعلي بأسلوب Vue</button>\n</template>\n<script setup>\nconst handleClick = () => alert('تم النقر!');\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
    [
      "element.addEventListener(\"click\", fn): تسجيل دالة معالجة للحدث على عنصر DOM.",
      "fn(event): استقبال كائن الحدث للتحكم به مثل e.preventDefault() و e.stopPropagation().",
      "دعم كائن خيارات مثل { once: true } للتشغيل لمرة واحدة فقط."
    ],
    "⚠️ تسرب الذاكرة (Memory Leak) الناتج عن تسجيل مستمعات على window أو document دون إزالتها عبر removeEventListener عند مغادرة الصفحة أو تدمير المكون.",
    [
      {
        "name": "type",
        "type": "string",
        "desc": "نوع الحدث مثل click, keydown, scroll"
      },
      {
        "name": "listener",
        "type": "Function",
        "desc": "الدالة المنفذة عند وقوع الحدث"
      },
      {
        "name": "options",
        "type": "Object | boolean",
        "desc": "خيارات مثل { once, passive, capture }"
      }
    ],
    [
      "v-on (@)",
      "Arrow Function (=>)",
      "Debounce & Throttle",
      "AbortController"
    ]
  ],
  [
    "js",
    "Arrow Function (=>)",
    "الدوال السهمية المختصرة",
    "arrow function lambda es6 دالة سهمية مختصر هذا this context",
    "صيغة مختصرة لكتابة الدوال تم تقديمها في ES6، تتميز بعدم امتلاكها لسياق this خاص بها، بل ترث this من النطاق المعجمي المحيط بها (Lexical this).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Arrow Function (=>)</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Arrow Function (=>):\n  // دالة سهمية من سطر واحد تعيد القيمة تلقائياً\nconst multiply = (a, b) => a * b;\n\n// دالة سهمية متعددة الأسطر\nconst greetUser = (name) => {\n  const message = `مرحباً بك يا ${name}!`;\n  return message;\n};\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
    [
      "Arrow Function (=>): الدوال السهمية المختصرة - يُستخدم في بيئة Node.js وجميع المتصفحات الحديثة (ES6+).",
      "الاستخدام النموذجي: كتابة دوال رد الاتصال (Callbacks) الممررة لمصفوفات map و filter",
      "الصيغة العامة: (param1, param2) => expression | { statements }."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Arrow Function (=>).",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "(param1, param2) => expression | { statements }"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "تُرجع التعبير مباشرة أو القيمة المحددة بـ return"
      }
    ],
    [
      "Destructuring",
      "IntersectionObserver",
      "URL & URLSearchParams",
      "Blob / FileReader"
    ]
  ],
  [
    "js",
    "async / await",
    "المعالجة غير المتزامنة الأنيقة",
    "async await promise fetch asynchronous تزامن غير متزامن انتظار",
    "بناء تركيبي يجعل التعامل مع الوعود (Promises) يبدو ككود متزامن تسلسلي وسهل القراءة مع إمكانية اصطياد الأخطاء بسهولة باستخدام try/catch.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">async / await</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ async / await:\n  async function fetchUserData(userId) {\n  try {\n    const response = await fetch(`https://api.example.com/users/${userId}`);\n    if (!response.ok) throw new Error('فشل جلب البيانات');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('حدث خطأ أثناء الاتصال:', error);\n  }\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
    [
      "async function: دالة غير متزامنة ترجع Promise تلقائياً.",
      "await promise: إيقاف تنفيذ الدالة حتى يكتمل الوعد دون حظر الخيط الرئيسي (Main Thread).",
      "تسمح بكتابة الكود غير المتزامن بنمط تزامني بديهي وسهل التتبع."
    ],
    "⚠️ نسيان تغليف استدعاءات await داخل try/catch، مما يسبب Unhandled Promise Rejection عند فشل الطلب وربما يوقف تشغيل التطبيق.",
    [
      {
        "name": "promise",
        "type": "Promise",
        "desc": "الوعد المراد انتظار نتيجته"
      }
    ],
    [
      "Promise",
      "fetch()",
      "try / catch",
      "useFetch()"
    ]
  ],
  [
    "js",
    "bind() / call() / apply()",
    "تحديد سياق التنفيذ (this)",
    "bind call apply this context ربط استدعاء سياق دالة",
    "دوال كائنية في JavaScript تُستخدم للتحكم الصريح في قيمة this داخل أي دالة وتمرير الوسائط إما متفرقة (call) أو في مصفوفة (apply) أو إنشاء دالة جديدة بربط دائم (bind).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">bind() / call() / apply()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ bind() / call() / apply():\n  const user = { name: 'طارق' };\nfunction introduce(greeting, title) {\n  return `${greeting} ${title} ${this.name}`;\n}\n\n// استدعاء مباشر بتمرير this\nintroduce.call(user, 'أهلاً', 'المهندس');\n\n// ربط دائم لدالة جديدة\nconst boundIntro = introduce.bind(user);\nconsole.log(boundIntro('مرحباً', 'الأستاذ'));\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind",
    [
      "bind() / call() / apply(): تحديد سياق التنفيذ (this) - يُستخدم في بيئة جميع بيئات JavaScript القياسية.",
      "الاستخدام النموذجي: استعارة دوال كائنات أخرى (Method Borrowing)",
      "الصيغة العامة: fn.call(thisArg, ...args) | fn.apply(thisArg, [args]) | fn.bind(thisArg, ...args)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء bind() / call() / apply().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "fn.call(thisArg, ...args) | fn.apply(thisArg, [args]) | fn.bind(thisArg, ...args)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "call/apply: نتيجة الدالة، bind: دالة جديدة مرتبطة"
      }
    ],
    [
      "IntersectionObserver",
      "setTimeout()",
      "class",
      "typeof"
    ]
  ],
  [
    "js",
    "Blob / FileReader",
    "معالجة البيانات الثنائية والملفات",
    "blob filereader binary file upload صورة رفع ملفات ثنائي",
    "واجهات برمجية في المتصفح لتمثيل وقراءة البيانات الثنائية للملفات الخام (مثل الصور، الصوتيات، أو مستندات PDF) وتحويلها إلى Base64 أو Data URLs للمعاينة.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Blob / FileReader</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Blob / FileReader:\n  const input = document.querySelector('input[type=\"file\"]');\ninput.addEventListener('change', (e) => {\n  const file = e.target.files[0];\n  if (file) {\n    const reader = new FileReader();\n    reader.onload = (event) => {\n      console.log('بيانات الصورة كـ URL:', event.target.result);\n    };\n    reader.readAsDataURL(file);\n  }\n});\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/FileReader",
    [
      "Blob / FileReader: معالجة البيانات الثنائية والملفات - يُستخدم في بيئة بيئة المتصفح القياسية (Web APIs).",
      "الاستخدام النموذجي: المعاينة الفورية للصور المرفوعة قبل رفعها إلى الخادم",
      "الصيغة العامة: new FileReader() / reader.readAsDataURL(blob)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Blob / FileReader.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "new FileReader() / reader.readAsDataURL(blob)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "كائن FileReader وقراءة غير متزامنة للبيانات"
      }
    ],
    [
      "Set / Map",
      "export / import",
      "for / for...of",
      "Spread (...)"
    ]
  ],
  [
    "js",
    "class",
    "الأصناف والبرمجة كائنية التوجه",
    "class oop constructor extends super كلاس كائن وراثة أصناف",
    "صيغة حديثة (Syntactic Sugar) لبناء الكائنات وتطبيق مبادئ البرمجة كائنية التوجه (OOP) والوراثة في JavaScript بطريقة واضحة ومألوفة لمطوري اللغات الأخرى.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">class</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ class:\n  class UserAccount {\n  constructor(username, email) {\n    this.username = username;\n    this.email = email;\n    this.createdAt = new Date();\n  }\n\n  displayInfo() {\n    return `${this.username} (${this.email})`;\n  }\n}\n\nconst user = new UserAccount('haidar_dev', 'haidar@example.com');\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
    [
      "class: الأصناف والبرمجة كائنية التوجه - يُستخدم في بيئة ES6+ المتصفحات و Node.js.",
      "الاستخدام النموذجي: بناء نماذج البيانات ومخدمات الخدمات (Service Classes)",
      "الصيغة العامة: class ClassName [extends Parent] { constructor() {} methods() {} }."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء class.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "class ClassName [extends Parent] { constructor() {} methods() {} }"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "مخطط هيكلي (Constructor Function) لإنشاء كائنات جديدة"
      }
    ],
    [
      "Nullish Coalescing (??)",
      "localStorage",
      "Destructuring",
      "filter()"
    ]
  ],
  [
    "js",
    "console.log",
    "سجل التصحيح والمراقبة",
    "console log debug warn error طباعة سجل كونسول مراقبة فحص",
    "دالة الفحص الأساسية في المتصفح و Node.js لطباعة القيم، النصوص، والكائنات في نافذة الكونسول للمطورين لمراقبة تدفق التطبيق واكتشاف الأخطاء.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">console.log</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ console.log:\n  const score = 95;\nconsole.log('النتيجة الحالية:', score);\nconsole.table([\n  { id: 1, name: 'سارة' },\n  { id: 2, name: 'عمر' }\n]);\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/console/log",
    [
      "console.log: سجل التصحيح والمراقبة - يُستخدم في بيئة جميع بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: فحص قيم المتغيرات أثناء تشغيل الكود وتتبع الأخطاء",
      "الصيغة العامة: console.log(data1, [data2, ...])."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء console.log.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "console.log(data1, [data2, ...])"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "undefined (طباعة في الكونسول)"
      }
    ],
    [
      "String.replace() / replaceAll()",
      "push() / splice()",
      "Object.keys/entries",
      "async / await"
    ]
  ],
  [
    "js",
    "const",
    "التصريح بالثوابت المحمية",
    "const variable immutable block scope متغير ثابت نطاق كتل",
    "كلمة محجوزة للتصريح عن متغيرات ذات نطاق كتل (Block Scope) لا يمكن إعادة تعيين قيمتها (Reassignment) بعد إسنادها الأول، مما يضمن أمان تدفق البيانات.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">const</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ const:\n  const API_BASE_URL = 'https://api.vuelexicon.dev/v1';\n// API_BASE_URL = 'other'; // يُسبب TypeError حماية للقيمة\n\nconst settings = { theme: 'dark' };\nsettings.theme = 'emerald'; // مسموح: محتوى الكائن قابل للتعديل\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const",
    [
      "const: التصريح بالثوابت المحمية - يُستخدم في بيئة ES6+ المتصفحات و Node.js.",
      "الاستخدام النموذجي: تعريف مراجع Vue التفاعلية مثل const count = ref(0)",
      "الصيغة العامة: const identifier = initialValue;."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء const.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "const identifier = initialValue;"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "لا تُرجع قيمة؛ تقوم بإنشاء مرجع ثابت"
      }
    ],
    [
      "class",
      "let",
      "Optional Chaining (?.)",
      "getElementById()"
    ]
  ],
  [
    "js",
    "Destructuring",
    "تفكيك الكائنات والمصفوفات",
    "destructuring unpacking es6 تفكيك استخراج كائن مصفوفة خصائص",
    "صيغة تعبيرية مبتكرة تسمح باستخراج الخصائص من الكائنات أو العناصر من المصفوفات وإسنادها إلى متغيرات فردية بأسلوب شديد الإيجاز والأناقة.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Destructuring</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Destructuring:\n  // تفكيك الكائنات\nconst user = { id: 101, username: 'ahmed', role: 'admin' };\nconst { username, role } = user;\n\n// تفكيك المصفوفات مع قيم افتراضية\nconst [firstColor = 'emerald', secondColor] = ['#00DC82', '#064E3B'];\n\n// تفكيك وسائط الدوال\nfunction printCard({ title, badge }) {\n  console.log(`${title} [${badge}]`);\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
    [
      "Destructuring: تفكيك الكائنات والمصفوفات - يُستخدم في بيئة ES6+ المتصفحات و Node.js.",
      "الاستخدام النموذجي: استخراج الحقول المهمة مباشرة من استجابات API أو كائنات التكوين",
      "الصيغة العامة: const { prop1, prop2 } = object; | const [item1, item2] = array;."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Destructuring.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "const { prop1, prop2 } = object; | const [item1, item2] = array;"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "توليد متغيرات جديدة من الكائن أو المصفوفة"
      }
    ],
    [
      "Template Literals",
      "function",
      "Date & Intl.DateTimeFormat",
      "yield"
    ]
  ],
  [
    "js",
    "export / import",
    "نظام الوحدات البرمجية النمطي (ES Modules)",
    "export import esm modules نمطية تصدير استيراد حزم وحدات",
    "المعيار القياسي الرسمي في JavaScript لتصدير المتغيرات، الدوال، والأصناف من ملف برمجيات (Module) واستيرادها في ملفات أخرى لتنظيم الكود ومنع التداخل.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">export / import</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ export / import:\n  // ملف helpers.js\nexport const formatCurrency = (val) => `$${val.toFixed(2)}`;\nexport default class CartService { /* ... */ }\n\n// ملف main.js\nimport CartService, { formatCurrency } from './helpers.js';\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
    [
      "export / import: نظام الوحدات البرمجية النمطي (ES Modules) - يُستخدم في بيئة جميع المتصفحات الحديثة و Node.js (type: module).",
      "الاستخدام النموذجي: تقسيم مشاريع الواجهات الكبيرة إلى وحدات Composables ومكونات صغيرة",
      "الصيغة العامة: export const name = ...; | export default ... | import { name } from 'path';."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء export / import.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "export const name = ...; | export default ... | import { name } from 'path';"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "مشاركة النطاقات واستيراد الكائنات بين الوحدات البرمجية"
      }
    ],
    [
      "addEventListener()",
      "AbortController",
      "String.replace() / replaceAll()",
      "typeof"
    ]
  ],
  [
    "js",
    "fetch()",
    "جلب البيانات والاتصال الشبكي",
    "fetch api http request ajax جلب بيانات شبكة استعلام خادم",
    "دالة واجهة برمجة تطبيقات الويب الحديثة (Web API) لإرسال طلبات HTTP غير المتزامنة واستقبال الموارد من الخوادم، وتعتمد على نظام الوعود (Promises).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">fetch()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ fetch():\n  fetch('https://jsonplaceholder.typicode.com/posts/1')\n  .then(response => {\n    if (!response.ok) throw new Error('خطأ في استجابة الخادم');\n    return response.json();\n  })\n  .then(post => console.log('تم استلام المنشور:', post))\n  .catch(error => console.error('خطأ الاتصال:', error));\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
    [
      "fetch(url, options): إرسال طلب شبكة غير متزامن يرجع Promise.",
      "await res.json(): تحويل استجابة الخادم إلى كائن جافاسكريبت قابل للقراءة.",
      "دعم إرسال ترويسات Headers وجسم الطلب Body للطلبات من نوع POST و PUT."
    ],
    "⚠️ الاعتقاد بأن fetch ترمي استثناءً عند استجابات الخطأ 404 أو 500؛ في الواقع الـ Promise ينجح دائماً إلا في حالة انقطاع الاتصال. افحص دائماً if (!res.ok).",
    [
      {
        "name": "resource",
        "type": "string | Request",
        "desc": "عنوان الـ URL أو كائن الطلب"
      },
      {
        "name": "init",
        "type": "Object",
        "desc": "خيارات الطلب (method, headers, body, signal)"
      }
    ],
    [
      "async / await",
      "Promise",
      "try / catch",
      "useFetch()"
    ]
  ],
  [
    "js",
    "filter()",
    "تصفية وترشيح المصفوفات",
    "filter array تصفية فلترة استخراج عناصر مصفوفة شروط",
    "دالة كائنية مصفوفية مكررة تُنشئ مصفوفة جديدة تحتوي حصرياً على كافة العناصر التي حققت شرط الاختبار المُعطى في دالة رد الاتصال الممررة.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">filter()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ filter():\n  const products = [\n  { name: 'لوحة مفاتيح', price: 120, inStock: true },\n  { name: 'شاشة 4K', price: 800, inStock: false },\n  { name: 'فأرة ميكانيكية', price: 60, inStock: true }\n];\n\n// تصفية المنتجات المتوفرة فقط\nconst available = products.filter(item => item.inStock);\nconsole.log(available);\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
    [
      "arr.filter(item => condition): ترشيح عناصر المصفوفة وإنتاج مصفوفة جديدة كلياً.",
      "طريقة نقية (Immutable) لا تغير المصفوفة الأصلية إطلاقاً.",
      "الدالة يجب أن تُرجع قيمة منطقية (true للإبقاء على العنصر، و false لاستبعاده)."
    ],
    "⚠️ محاولة تعديل عناصر المصفوفة الأصلية داخل دالة filter. استخدم map() لتعديل البيانات، واجعل filter() مخصصة للترشيح فقط.",
    [
      {
        "name": "callback",
        "type": "Function",
        "desc": "دالة الاختبار (element, index, array)"
      }
    ],
    [
      "map()",
      "find()",
      "reduce()",
      "includes()"
    ]
  ],
  [
    "js",
    "find()",
    "البحث عن عنصر فردي في مصفوفة",
    "find array search بحث إيجاد عنصر أول مطابقة مصفوفة",
    "دالة مصفوفية تُعيد أول عنصر يُحقق شرط الفحص المحدد مباشرة، وإذا لم يتطابق أي عنصر مع الشرط، فإنها تُعيد undefined دون متابعة باقي العناصر.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">find()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ find():\n  const members = [\n  { id: 'u1', name: 'أحمد' },\n  { id: 'u2', name: 'سارة' },\n  { id: 'u3', name: 'زياد' }\n];\n\n// إيجاد العضو صاحب المعرف المحدد\nconst target = members.find(m => m.id === 'u2');\nconsole.log(target); // { id: 'u2', name: 'سارة' }\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",
    [
      "find(): البحث عن عنصر فردي في مصفوفة - يُستخدم في بيئة ES6+ المتصفحات و Node.js.",
      "الاستخدام النموذجي: استخراج بيانات السجل النشط المختار من قائمة جداول أو بطاقات",
      "الصيغة العامة: array.find((element, index, array) => booleanCondition)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء find().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "array.find((element, index, array) => booleanCondition)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "العنصر المطابق الأول، أو undefined عند عدم العثور عليه"
      }
    ],
    [
      "getElementById()",
      "Promise",
      "String.split() / join()",
      "Array.from() / Array.isArray()"
    ]
  ],
  [
    "js",
    "for / for...of",
    "حلقات التكرار والدوران",
    "for loop for of iteration تكرار دوران مصفوفة كائنات حلقة",
    "بُنى تحكم أساسية لتنفيذ كود محدد عدة مرات؛ تمثل for...of الطريقة الأحدث والأنقى للتكرار على العناصر القابلة للتكرار (Iterables) مثل المصفوفات والسلاسل النصية.",
    "<template>\n  <!-- في قوالب Vue نستخدم توجيه v-for بدلاً من حلقات الكود اليدوية -->\n  <li v-for=\"item in items\" :key=\"item.id\">{{ item.name }}</li>\n</template>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of",
    [
      "for / for...of: حلقات التكرار والدوران - يُستخدم في بيئة جميع بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: معالجة عناصر المصفوفات الضخمة بكفاءة وسرعة أداء عالية",
      "الصيغة العامة: for (const item of iterable) { ... } | for (let i = 0; i < n; i++) { ... }."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء for / for...of.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "for (const item of iterable) { ... } | for (let i = 0; i < n; i++) { ... }"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "void (تحكم في مسار التنفيذ)"
      }
    ],
    [
      "addEventListener()",
      "return",
      "filter()",
      "Promise"
    ]
  ],
  [
    "js",
    "forEach()",
    "المرور الإجرائي على عناصر المصفوفة",
    "forEach array loop iterate مرور تنفيذ دالة مصفوفة استدعاء",
    "دالة مصفوفية تُنفذ دالة رد اتصال (Callback) معطاة مرة واحدة لكل عنصر من عناصر المصفوفة بالترتيب؛ تُستخدم لتنفيذ تأثيرات جانبية دون إنتاج مصفوفة جديدة.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">forEach()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ forEach():\n  const tags = ['Vue', 'Nuxt', 'JavaScript'];\n\ntags.forEach((tag, index) => {\n  console.log(`[#${index + 1}] تقنية: ${tag}`);\n});\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
    [
      "forEach(): المرور الإجرائي على عناصر المصفوفة - يُستخدم في بيئة ES5+ جميع المتصفحات و Node.js.",
      "الاستخدام النموذجي: إرسال تنبيهات أو إحصائيات تحليلية لكل عنصر في القائمة",
      "الصيغة العامة: array.forEach((currentValue, index, array) => { ... })."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء forEach().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "array.forEach((currentValue, index, array) => { ... })"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "undefined دائماً"
      }
    ],
    [
      "Math.random() / Math.floor()",
      "querySelector()",
      "Date & Intl.DateTimeFormat",
      "push() / splice()"
    ]
  ],
  [
    "js",
    "function",
    "التصريح بالدوال الكلاسيكية",
    "function declaration statement دالة اقتران استدعاء بارامترات",
    "الوسيلة الكلاسيكية لتعريف الدوال القابلة لإعادة الاستخدام في JavaScript؛ تتميز بخاصية الرفع (Hoisting) وامتلاكها لكائن arguments وسياق this الديناميكي.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">function</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ function:\n  function calculateDiscount(price, percentage = 10) {\n  const discountAmount = price * (percentage / 100);\n  return price - discountAmount;\n}\n\nconst finalPrice = calculateDiscount(200, 15); // 170\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function",
    [
      "function: التصريح بالدوال الكلاسيكية - يُستخدم في بيئة كافة إصدارات وبيئات JavaScript.",
      "الاستخدام النموذجي: بناء الدوال العامة والمساعدة في ملفات المشروع",
      "الصيغة العامة: function name([param[, ...param]]) { statements }."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء function.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "function name([param[, ...param]]) { statements }"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "تُرجع القيمة المحددة في return، أو undefined"
      }
    ],
    [
      "Debounce & Throttle",
      "console.log",
      "const",
      "forEach()"
    ]
  ],
  [
    "js",
    "getElementById()",
    "الوصول السريع للعنصر بالمعرف",
    "getElementById dom selector عنصر معرف وصول استهداف",
    "أسرع وأقدم دالة في كائن document بالمتصفح لجلب عنصر وحيد من شجرة DOM بناءً على خاصية id الفريدة المحددة له في HTML.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">getElementById()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ getElementById():\n  const notificationModal = document.getElementById('userAlertModal');\nif (notificationModal) {\n  notificationModal.style.display = 'block';\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById",
    [
      "getElementById(): الوصول السريع للعنصر بالمعرف - يُستخدم في بيئة جميع متصفحات الويب بلا استثناء.",
      "الاستخدام النموذجي: الوصول المباشر إلى حاويات التطبيق الجذرية مثل #app",
      "الصيغة العامة: document.getElementById(idString)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء getElementById().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "document.getElementById(idString)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "عنصر Element من نوع DOM، أو null إن لم يوجد"
      }
    ],
    [
      "Set / Map",
      "const",
      "includes()",
      "function"
    ]
  ],
  [
    "js",
    "if / else",
    "التفرع الشرطي المنطقي",
    "if else conditional branch منطق تفرع شرط إذا تحقق",
    "أداة التحكم الأساسية في مسار تنفيذ البرنامج؛ تقوم باختبار شرط منطقي وتنفيذ كتلة كود معينة إذا كان صحيحاً (truthy) وكتلة أخرى بديلة إن كان خاطئاً (falsy).",
    "<template>\n  <!-- في قوالب Vue نستخدم توجيه v-if / v-else الشجري -->\n  <Dashboard v-if=\"isLoggedIn\" />\n  <LoginForm v-else />\n</template>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
    [
      "if / else: التفرع الشرطي المنطقي - يُستخدم في بيئة كافة بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: التحقق من صحة مدخلات المستخدم قبل إرسال النماذج",
      "الصيغة العامة: if (condition) { ... } else if (other) { ... } else { ... }."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء if / else.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "if (condition) { ... } else if (other) { ... } else { ... }"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "void (تحكم في التدفق)"
      }
    ],
    [
      "Promise",
      "Arrow Function (=>)",
      "Object.keys/entries",
      "Set / Map"
    ]
  ],
  [
    "js",
    "includes()",
    "فحص الاحتواء للمصفوفات والنصوص",
    "includes search array string مطابقة احتواء تحقق وجود نص مصفوفة",
    "دالة تختبر ما إذا كانت المصفوفة تحتوي على عنصر معين، أو ما إذا كانت السلسلة النصية تحتوي على نص فرعي، وتُعيد true أو false بدقة دون الحاجة للتعامل مع الفهارس -1.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">includes()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ includes():\n  // فحص مصفوفة\nconst allowedRoles = ['admin', 'manager', 'editor'];\nconst hasAccess = allowedRoles.includes('manager'); // true\n\n// فحص نص\nconst filename = 'document_2026.pdf';\nconst isPdf = filename.includes('.pdf'); // true\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
    [
      "includes(): فحص الاحتواء للمصفوفات والنصوص - يُستخدم في بيئة ES6+ (Array) و ES6+ (String) كافة البيئات الحديثة.",
      "الاستخدام النموذجي: التحقق السريع من صلاحيات المستخدمين",
      "الصيغة العامة: array.includes(valueToFind[, fromIndex]) | string.includes(searchString[, position])."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء includes().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "array.includes(valueToFind[, fromIndex]) | string.includes(searchString[, position])"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "قيمة منطقية boolean (true / false)"
      }
    ],
    [
      "Destructuring",
      "AbortController",
      "find()",
      "Nullish Coalescing (??)"
    ]
  ],
  [
    "js",
    "JSON.stringify / parse",
    "تحويل وتفكيك بيانات JSON",
    "json stringify parse serialization تحويل كائن سلسلة نصية تسلسل",
    "أداتان قياسيتان في كائن JSON: تقوم stringify بتحويل أي كائن أو مصفوفة JavaScript إلى نص JSON قياسي، بينما تقوم parse بتحويل نص JSON إلى كائن برمجي حي.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">JSON.stringify / parse</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ JSON.stringify / parse:\n  const userProfile = { id: 42, name: 'زيد', active: true };\n\n// تحويل الكائن إلى نص للتخزين أو الإرسال\nconst jsonString = JSON.stringify(userProfile);\nconsole.log(typeof jsonString); // 'string'\n\n// فك النص واستعادته ككائن برمجي\nconst restoredObject = JSON.parse(jsonString);\nconsole.log(restoredObject.name); // 'زيد'\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
    [
      "JSON.stringify / parse: تحويل وتفكيك بيانات JSON - يُستخدم في بيئة جميع بيئات تشغيل JavaScript القياسية.",
      "الاستخدام النموذجي: حفظ الكائنات التفاعلية في localStorage بالمتصفح",
      "الصيغة العامة: JSON.stringify(value[, replacer[, space]]) | JSON.parse(text[, reviver])."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء JSON.stringify / parse.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "JSON.stringify(value[, replacer[, space]]) | JSON.parse(text[, reviver])"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "stringify: سلسلة نصية، parse: كائن أو قيمة JavaScript"
      }
    ],
    [
      "async / await",
      "Blob / FileReader",
      "function",
      "Destructuring"
    ]
  ],
  [
    "js",
    "let",
    "المتغيرات المرنة محددة النطاق",
    "let variable reassign block scope متغير إعادة تعيين نطاق محلي",
    "الوسيلة القياسية الحديثة للتصريح عن متغيرات يمكن إعادة إسناد قيمتها في أي وقت، وتلتزم بنطاق الكتل (Block Scope {}) وتمنع مشاكل التسريب الناتجة عن var.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">let</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ let:\n  let counter = 0;\ncounter += 1; // مسموح: تعديل القيمة\n\nif (true) {\n  let blockScoped = 'مرئي هنا فقط';\n}\n// console.log(blockScoped); // ReferenceError أمان تام\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
    [
      "let: المتغيرات المرنة محددة النطاق - يُستخدم في بيئة ES6+ المتصفحات و Node.js.",
      "الاستخدام النموذجي: عدادات الحلقات والتكرار مثل for (let i = 0; ...)",
      "الصيغة العامة: let identifier [= value];."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء let.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "let identifier [= value];"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "إنشاء متغير قابل للتغيير"
      }
    ],
    [
      "async / await",
      "Arrow Function (=>)",
      "IntersectionObserver",
      "if / else"
    ]
  ],
  [
    "js",
    "localStorage",
    "التخزين المحلي الدائم بالمتصفح",
    "localStorage storage persistence حفظ دائم متصفح تخزين مفتاح قيمة",
    "واجهة تخزين في المتصفح تسمح بحفظ بيانات مفتاح-قيمة (Key-Value) على جهاز العميل بشكل دائم دون تاريخ انتهاء حتى بعد إغلاق المتصفح وإعادة فتحه.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">localStorage</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ localStorage:\n  // حفظ قيمة\nlocalStorage.setItem('vuelexicon_theme', 'dark');\n\n// استرجاع القيمة\nconst savedTheme = localStorage.getItem('vuelexicon_theme');\n\n// حذف عنصر أو مسح الكل\nlocalStorage.removeItem('old_key');\n// localStorage.clear();\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
    [
      "localStorage: التخزين المحلي الدائم بالمتصفح - يُستخدم في بيئة جميع متصفحات الويب الحديثة (Client-Side Only).",
      "الاستخدام النموذجي: حفظ تفضيلات المستخدم مثل الوضع الليلي المظلم أو اللغة المفضلة",
      "الصيغة العامة: localStorage.setItem(k, v) | localStorage.getItem(k) | localStorage.removeItem(k)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء localStorage.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "localStorage.setItem(k, v) | localStorage.getItem(k) | localStorage.removeItem(k)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "سلسلة نصية string، أو null إذا لم يكن المفتاح موجوداً"
      }
    ],
    [
      "const",
      "for / for...of",
      "WeakMap / WeakSet",
      "Destructuring"
    ]
  ],
  [
    "js",
    "map()",
    "تحويل وإعادة تشكيل عناصر المصفوفات",
    "map array transform تحويل مصفوفة إعادة تشكيل خرائط دالة",
    "دالة مصفوفية مكررة تُنشئ مصفوفة جديدة بنفس الطول بعد تطبيق دالة تحويل محددة على كل عنصر من عناصر المصفوفة الأصلية دون تعديل الأصل.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">map()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ map():\n  const pricesInUSD = [10, 25, 50, 100];\nconst exchangeRate = 3.75; // SAR\n\nconst pricesInSAR = pricesInUSD.map(price => price * exchangeRate);\nconsole.log(pricesInSAR); // [37.5, 93.75, 187.5, 375]\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
    [
      "arr.map(item => transform(item)): تحويل كل عنصر في المصفوفة لمخرجات جديدة بنفس الطول.",
      "تُرجع مصفوفة جديدة تماماً دون التعديل على المصفوفة الأصلية.",
      "تُعد الركيزة الأساسية لتحويل البيانات وتجهيزها للعرض في واجهات الويب الحديثة."
    ],
    "⚠️ استخدام map() دون إرجاع قيمة (نسيان كلمة return داخل الدالة)، مما ينتج مصفوفة مليئة بقيم undefined.",
    [
      {
        "name": "callback",
        "type": "Function",
        "desc": "دالة التحويل المنفذة على كل عنصر"
      }
    ],
    [
      "filter()",
      "reduce()",
      "forEach()",
      "Array.from() / Array.isArray()"
    ]
  ],
  [
    "js",
    "Nullish Coalescing (??)",
    "عامل الدمج مع القيم المعدومة",
    "nullish coalescing operator دمج انعدام افتراضي صفر قيمة",
    "معامل منطقي يُعيد المعامل الأيمن فقط إذا كان المعامل الأيسر null أو undefined، متفوقاً على || الذي يعتبر القيمة 0 أو النص الفارغ '' قيماً زائفة.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Nullish Coalescing (??)</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Nullish Coalescing (??):\n  const userSettings = {\n  pageSize: 0, // المستخدم اختار صراحة الحجم 0\n  title: ''\n};\n\n// المعامل || سيتجاهل الصفر خطأً:\nconst wrongSize = userSettings.pageSize || 20; // 20 ❌\n\n// المعامل ?? يحترم الصفر والنص الفارغ:\nconst correctSize = userSettings.pageSize ?? 20; // 0 ✅\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing",
    [
      "Nullish Coalescing (??): عامل الدمج مع القيم المعدومة - يُستخدم في بيئة ES2020+ المتصفحات و Node.js الحديثة.",
      "الاستخدام النموذجي: تعيين قيم افتراضية دقيقة لخصائص props والأرقام التي قد تكون 0",
      "الصيغة العامة: leftExpression ?? fallbackExpression."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Nullish Coalescing (??).",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "leftExpression ?? fallbackExpression"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "قيمة المعامل الأيسر إن لم تكن null/undefined، وإلا قيمة الأيمن"
      }
    ],
    [
      "JSON.stringify / parse",
      "Spread (...)",
      "reduce()",
      "AbortController"
    ]
  ],
  [
    "js",
    "Object.keys/entries",
    "استخراج مفاتيح وقيم الكائنات",
    "object keys entries values استخراج مفاتيح قيم كائن مصفوفة",
    "دوال مساعدة في كائن Object: تُعيد Object.keys مصفوفة من أسماء المفاتيح، بينما تُعيد Object.entries مصفوفة من مصفوفات الأزواج [key, value] لتمكين التكرار المباشر.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Object.keys/entries</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Object.keys/entries:\n  const userStats = { views: 1200, likes: 450, shares: 89 };\n\n// جلب المفاتيح\nconsole.log(Object.keys(userStats)); // ['views', 'likes', 'shares']\n\n// المرور على المفتاح والقيمة معاً\nfor (const [metric, count] of Object.entries(userStats)) {\n  console.log(`${metric}: ${count}`);\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries",
    [
      "Object.keys/entries: استخراج مفاتيح وقيم الكائنات - يُستخدم في بيئة ES6+ كافة بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: فحص ما إذا كان الكائن فارغاً عبر Object.keys(obj).length === 0",
      "الصيغة العامة: Object.keys(obj) | Object.values(obj) | Object.entries(obj)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Object.keys/entries.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "Object.keys(obj) | Object.values(obj) | Object.entries(obj)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "مصفوفة سلاسل نصية أو مصفوفة أزواج [key, value]"
      }
    ],
    [
      "Arrow Function (=>)",
      "function",
      "return",
      "Spread (...)"
    ]
  ],
  [
    "js",
    "Optional Chaining (?.)",
    "السلسلة الاختيارية الآمنة",
    "optional chaining safe navigation سلسلة اختيارية أمان كائن متداخل خالي",
    "معامل برمجي يسمح بقراءة قيمة خاصية متداخلة داخل سلسلة كائنات دون التسبب في خطأ برمجي (TypeError) قاتل إذا كان أحد المراجع الوسيطة null أو undefined.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Optional Chaining (?.)</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Optional Chaining (?.):\n  const order = {\n  id: 554,\n  customer: null // العميل غير مسجل بعد\n};\n\n// الطريقة الآمنة الحديثة\nconst city = order.customer?.address?.city; // يعيد undefined دون انهيار التطبيق ✅\n\n// استدعاء الدوال المشروطة بأمان\norder.onCancel?.();\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
    [
      "Optional Chaining (?.): السلسلة الاختيارية الآمنة - يُستخدم في بيئة ES2020+ المتصفحات و Node.js الحديثة.",
      "الاستخدام النموذجي: قراءة الخصائص العميقة من استجابات API قبل اكتمال تحميلها",
      "الصيغة العامة: object?.prop | object?.[expr] | func?.(...args)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Optional Chaining (?.).",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "object?.prop | object?.[expr] | func?.(...args)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "القيمة المطلوبة إن وُجدت، أو undefined عند انقطاع السلسلة"
      }
    ],
    [
      "String.replace() / replaceAll()",
      "console.log",
      "class",
      "URL & URLSearchParams"
    ]
  ],
  [
    "js",
    "Promise",
    "الوعود المستقبلية للعمليات غير المتزامنة",
    "promise then catch async وعد غير متزامن تسلسل نجاح فشل",
    "كائن يمثل الإنجاز المستقبلي النهائي (أو الفشل) لعملية غير متزامنة، ويتنقل بين ثلاث حالات: قيد الانتظار (Pending)، تم النجاح (Fulfilled)، أو تم الرفض (Rejected).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Promise</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Promise:\n  const checkServerStatus = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    const isOnline = true;\n    if (isOnline) resolve('الخادم يعمل بكفاءة 🟢');\n    else reject('تعذر الاتصال بالخادم 🔴');\n  }, 1000);\n});\n\ncheckServerStatus\n  .then(status => console.log(status))\n  .catch(err => console.error(err));\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    [
      "Promise: الوعود المستقبلية للعمليات غير المتزامنة - يُستخدم في بيئة ES6+ كافة بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: بناء دوال تأخير زمني مخصصة مثل delay(ms)",
      "الصيغة العامة: new Promise((resolve, reject) => { ... })."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Promise.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "new Promise((resolve, reject) => { ... })"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "كائن Promise يدعم ربط .then() و .catch() و .finally()"
      }
    ],
    [
      "Math.random() / Math.floor()",
      "Spread (...)",
      "async / await",
      "IntersectionObserver"
    ]
  ],
  [
    "js",
    "push() / splice()",
    "تعديل وتحديث عناصر المصفوفات",
    "push splice array mutation مصفوفة إضافة حذف إدراج تعديل",
    "دوال مصفوفية لتعديل محتوى المصفوفة في مكانها (In-Place Mutation): تقوم push بإضافة عنصر أو أكثر إلى نهاية المصفوفة، بينما تقوم splice بحذف أو إدراج أو استبدال عناصر عند فهرس محدد.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">push() / splice()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ push() / splice():\n  const tasks = ['مراجعة الكود', 'كتابة الاختبارات'];\n\n// إضافة للنهاية\ntasks.push('نشر التحديث');\n\n// حذف عنصر عند الفهرس 1 وإدراج بديل مكانه\ntasks.splice(1, 1, 'كتابة اختبارات E2E');\nconsole.log(tasks);\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
    [
      "push() / splice(): تعديل وتحديث عناصر المصفوفات - يُستخدم في بيئة كافة بيئات تشغيل JavaScript القياسية.",
      "الاستخدام النموذجي: إضافة إشعارات وتنبيهات جديدة إلى مصفوفة الإشعارات المعروضة",
      "الصيغة العامة: array.push(...elements) | array.splice(start[, deleteCount[, ...items]])."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء push() / splice().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "array.push(...elements) | array.splice(start[, deleteCount[, ...items]])"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "push: طول المصفوفة الجديد، splice: مصفوفة العناصر المحذوفة"
      }
    ],
    [
      "Destructuring",
      "if / else",
      "Array.from() / Array.isArray()",
      "String.split() / join()"
    ]
  ],
  [
    "js",
    "querySelector()",
    "استهداف العناصر بمحددات CSS الحديثة",
    "querySelector querySelectorAll dom selector محدد استهداف عنصر",
    "واجهة برمجية فائقة القوة لجلب أول عنصر في شجرة DOM يطابق محدد CSS معين (مثل الفئات .class، المعرفات #id، أو الخصائص [data-type]).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">querySelector()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ querySelector():\n  // استهداف عبر الصنف وزر فرعي\nconst submitButton = document.querySelector('.checkout-card button.primary');\nif (submitButton) {\n  submitButton.disabled = true;\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
    [
      "querySelector(): استهداف العناصر بمحددات CSS الحديثة - يُستخدم في بيئة كافة المتصفحات الحديثة (DOM API).",
      "الاستخدام النموذجي: تحديد الأزرار والعناصر المعقدة ذات التراكيب المتشعبة",
      "الصيغة العامة: document.querySelector(cssSelectorString)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء querySelector().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "document.querySelector(cssSelectorString)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "أول عنصر Element مطابق في DOM، أو null إذا لم يتطابق شيء"
      }
    ],
    [
      "Set / Map",
      "function",
      "try / catch",
      "bind() / call() / apply()"
    ]
  ],
  [
    "js",
    "reduce()",
    "تراكم واختزال عناصر المصفوفة",
    "reduce array accumulator اختزال تراكم مجموع مصفوفة تلخيص",
    "واحدة من أقوى دوال المصفوفات في البرمجة الوظيفية؛ تقوم بالمرور على جميع عناصر المصفوفة واختزالها تدريجياً إلى قيمة نهائية مفردة (مثل مجموع الأرقام أو تجميع كائن مخصص).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">reduce()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ reduce():\n  const cartItems = [\n  { title: 'كتاب Vue 3', price: 45, qty: 2 },\n  { title: 'دورة Nuxt', price: 120, qty: 1 }\n];\n\n// حساب المجموع الكلي للفاتورة\nconst totalBill = cartItems.reduce((acc, item) => {\n  return acc + (item.price * item.qty);\n}, 0);\n\nconsole.log(`إجمالي الفاتورة: ${totalBill}$`); // 210$\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
    [
      "reduce(): تراكم واختزال عناصر المصفوفة - يُستخدم في بيئة ES5+ كافة بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: حساب المجاميع والضرائب والخصومات في سلة التسوق",
      "الصيغة العامة: array.reduce((accumulator, currentValue, index, array) => newAccumulator, initialValue)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء reduce().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "array.reduce((accumulator, currentValue, index, array) => newAccumulator, initialValue)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "القيمة النهائية المتراكمة من أي نوع (رقم، كائن، مصفوفة)"
      }
    ],
    [
      "bind() / call() / apply()",
      "class",
      "var",
      "console.log"
    ]
  ],
  [
    "js",
    "return",
    "إعادة القيمة وإنهاء تنفيذ الدالة",
    "return statement exit function إرجاع قيمة إنهاء دالة مخرجات",
    "التعليمة الأساسية التي توقف فوراً تنفيذ الدالة وتُعيد القيمة المحددة بعدها إلى المكان الذي استدعى الدالة؛ إذا تُركت فارغة تُعيد undefined.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">return</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ return:\n  function isStrongPassword(pwd) {\n  if (!pwd) return false; // خروج مبكر (Early Return)\n  if (pwd.length < 8) return false;\n  return /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return",
    [
      "return: إعادة القيمة وإنهاء تنفيذ الدالة - يُستخدم في بيئة كافة بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: تطبيق نمط الحراسة والخروج المبكر (Guard Clauses / Early Return) لتقليل تداخل الأقواس",
      "الصيغة العامة: return [expression];."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء return.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "return [expression];"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "يحدد مخرجات الدالة ويوقف تنفيذها فوراً"
      }
    ],
    [
      "Promise",
      "async / await",
      "addEventListener()",
      "for / for...of"
    ]
  ],
  [
    "js",
    "Set / Map",
    "هياكل البيانات المتقدمة للمجموعات والخرائط",
    "set map unique collection هيكل بيانات عناصر فريدة خريطة مفاتيح",
    "هياكل بيانات متطورة مدمجة في ES6: يضمن Set تخزين عناصر فريدة بدون أي تكرار، بينما يسمح Map بتخزين أزواج مفتاح-قيمة حيث يمكن أن يكون المفتاح كائناً أو أي نوع آخر.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Set / Map</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Set / Map:\n  // استخدام Set لحذف التكرار فوراً\nconst numbersWithDuplicates = [1, 2, 2, 3, 4, 4, 5];\nconst uniqueNumbers = [...new Set(numbersWithDuplicates)];\nconsole.log(uniqueNumbers); // [1, 2, 3, 4, 5]\n\n// استخدام Map لربط الكائنات بقيم\nconst userRoles = new Map();\nconst adminObj = { id: 1 };\nuserRoles.set(adminObj, 'SuperAdmin');\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
    [
      "Set / Map: هياكل البيانات المتقدمة للمجموعات والخرائط - يُستخدم في بيئة ES6+ المتصفحات و Node.js.",
      "الاستخدام النموذجي: تجريد المصفوفات من العناصر المكررة بلمح البصر",
      "الصيغة العامة: new Set([iterable]) | new Map([iterable])."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Set / Map.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "new Set([iterable]) | new Map([iterable])"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "كائن من نوع Set أو Map بميثودز خاصة (add, has, delete, set, get)"
      }
    ],
    [
      "export / import",
      "Blob / FileReader",
      "Spread (...)",
      "querySelector()"
    ]
  ],
  [
    "js",
    "setTimeout()",
    "المؤقتات وتأخير تنفيذ الكود",
    "setTimeout timer async delay مؤقت تأخير زمني تنفيذ بعد وقت",
    "دالة واجهة برمجة تطبيقات المتصفح و Node.js لجدولة تشغيل دالة معينة لمرة واحدة بعد انقضاء فترة زمنية محددة بالملي ثانية (ms).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">setTimeout()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ setTimeout():\n  console.log('بداية العملية');\n\nconst timerId = setTimeout(() => {\n  console.log('نُفذت بعد انقضاء ثانية ونصف (1500ms)');\n}, 1500);\n\n// يمكن إلغاؤها قبل وقت التنفيذ عبر clearTimeout(timerId);\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/setTimeout",
    [
      "setTimeout(): المؤقتات وتأخير تنفيذ الكود - يُستخدم في بيئة جميع بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: تنفيذ استراتيجية تأخير البحث المتقطع (Debouncing) أثناء كتابة المستخدم",
      "الصيغة العامة: setTimeout(functionRef, delayInMs, ...paramArgs)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء setTimeout().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "setTimeout(functionRef, delayInMs, ...paramArgs)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "معرف رقمي فريد للمؤقت (timeoutID) لإلغائه"
      }
    ],
    [
      "Date & Intl.DateTimeFormat",
      "Set / Map",
      "Nullish Coalescing (??)",
      "XMLHttpRequest"
    ]
  ],
  [
    "js",
    "Spread (...)",
    "معامل النشر والتوزيع",
    "spread operator rest توزيع نشر نسخ كائن مصفوفة دمج",
    "معامل الأسطر الثلاثية (...) الذي يسمح بتفكيك وتوسيع عناصر المصفوفات أو خصائص الكائنات ونسخها أو دمجها في مصفوفة أو كائن جديد بأسلوب غير مدمر (Immutable).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Spread (...)</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Spread (...):\n  // دمج ونسخ المصفوفات\nconst base = ['HTML', 'CSS'];\nconst fullStack = [...base, 'JavaScript', 'Vue.js'];\n\n// دمج الكائنات مع تعديل خاصية محددة\nconst defaultSettings = { theme: 'dark', sound: true };\nconst customSettings = { ...defaultSettings, sound: false };\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
    [
      "Spread (...): معامل النشر والتوزيع - يُستخدم في بيئة ES6+ المتصفحات و Node.js.",
      "الاستخدام النموذجي: إنشاء نسخ سطحية جديدة من الكائنات لتجنب تعديل الأصل مباشرة",
      "الصيغة العامة: ...iterableObject | ...object."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Spread (...).",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "...iterableObject | ...object"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "توزيع العناصر أو الخصائص في الموضع الحالي"
      }
    ],
    [
      "String.replace() / replaceAll()",
      "String.split() / join()",
      "if / else",
      "addEventListener()"
    ]
  ],
  [
    "js",
    "switch",
    "التبديل بين الحالات المتعددة",
    "switch case break default تبديل حالات فحص قيمة متعددة",
    "بنية تحكم شرطية تفحص قيمة تعبير ما وتقارنها بسلسلة من حالات case الثابتة؛ تُعد بديلاً أكثر تنظيماً وقراءة لسلاسل if / else if المتشعبة الطويلة.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">switch</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ switch:\n  const status = 'pending';\n\nswitch (status) {\n  case 'active':\n    console.log('الحساب مفعل ومتاح');\n    break;\n  case 'pending':\n    console.log('الحساب قيد المراجعة والتدقيق');\n    break;\n  case 'suspended':\n    console.log('الحساب موقوف مؤقتاً');\n    break;\n  default:\n    console.log('حالة غير معروفة');\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch",
    [
      "switch: التبديل بين الحالات المتعددة - يُستخدم في بيئة كافة بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: معالجة أنواع الأحداث في نمط Redux / Pinia Actions",
      "الصيغة العامة: switch (expression) { case value1: ... break; default: ... }."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء switch.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "switch (expression) { case value1: ... break; default: ... }"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "void (تحكم في التدفق)"
      }
    ],
    [
      "String.split() / join()",
      "Date & Intl.DateTimeFormat",
      "function",
      "Set / Map"
    ]
  ],
  [
    "js",
    "Template Literals",
    "النصوص القالبية وحقن المتغيرات",
    "template literals backticks interpolation نص قالبي دمج متغيرات علامات مائلة",
    "سلاسل نصية محاطة بعلامات النبرة المائلة (Backticks ``) تسمح بدمج المتغيرات والتعبيرات البرمجية مباشرة باستخدام `${expression}` وكتابة نصوص متعددة الأسطر دون \\n.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Template Literals</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Template Literals:\n  const developer = 'حيدر';\nconst tech = 'Nuxt 3';\nconst experience = 5;\n\n// دمج سلس ومتعدد الأسطر\nconst bio = `المطور: ${developer}\nالمكتبة الرئيسية: ${tech}\nسنوات الخبرة: ${experience > 3 ? 'خبير متقدم' : 'متوسط'}`;\n\nconsole.log(bio);\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
    [
      "Template Literals: النصوص القالبية وحقن المتغيرات - يُستخدم في بيئة ES6+ المتصفحات و Node.js.",
      "الاستخدام النموذجي: توليد رسائل مخصصة وسلاسل الإشعارات التي تحتوي على بيانات المستخدم",
      "الصيغة العامة: `string text ${expression} string text`."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Template Literals.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "`string text ${expression} string text`"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "سلسلة نصية string مدمجة وجاهزة"
      }
    ],
    [
      "Clipboard API (navigator.clipboard)",
      "Date & Intl.DateTimeFormat",
      "addEventListener()",
      "Arrow Function (=>)"
    ]
  ],
  [
    "js",
    "try / catch",
    "اصطياد ومعالجة الاستثناءات",
    "try catch finally error handling معالجة أخطاء استثناء اصطياد فشل",
    "بناء برمجي لحماية التطبيق من الانهيار عند حدوث أخطاء غير متوقعة أثناء وقت التشغيل، مما يسمح بالتعامل مع الخطأ بمرونة وعرض رسائل ودية للمستخدم.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">try / catch</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ try / catch:\n  try {\n  // محاولة تفكيك نص قد يكون غير صالح\n  const rawData = '{\"valid\": false, missingBrace';\n  const result = JSON.parse(rawData);\n  console.log(result);\n} catch (error) {\n  console.error('تم اصطياد خطأ ومنع انهيار البرنامج:', error.message);\n} finally {\n  console.log('تُنفذ هذه الكتلة دائماً سواء نجحت العملية أو فشلت');\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
    [
      "try / catch: اصطياد ومعالجة الاستثناءات - يُستخدم في بيئة كافة بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: تأمين عمليات قراءة وتفكيك نصوص JSON الواردة من مصادر خارجية",
      "الصيغة العامة: try { ... } catch (error) { ... } [finally { ... }]."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء try / catch.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "try { ... } catch (error) { ... } [finally { ... }]"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "void (معالجة تدفق الأخطاء)"
      }
    ],
    [
      "Blob / FileReader",
      "Set / Map",
      "bind() / call() / apply()",
      "Template Literals"
    ]
  ],
  [
    "js",
    "typeof",
    "فحص وتحديد أنواع المتغيرات",
    "typeof operator type check فحص نوع متغير نوع بيانات رقم نص",
    "معامل أحادي يُعيد سلسلة نصية توضح نوع بيانات المعامل غير المقيم، مثل 'string' أو 'number' أو 'boolean' أو 'object' أو 'function' أو 'undefined'.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">typeof</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ typeof:\n  console.log(typeof 'VueLexicon'); // 'string'\nconsole.log(typeof 2026);         // 'number'\nconsole.log(typeof true);         // 'boolean'\nconsole.log(typeof (() => {}));   // 'function'\nconsole.log(typeof undefined);    // 'undefined'\nconsole.log(typeof null);         // 'object' (سلوك تراثي شهير)\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof",
    [
      "typeof: فحص وتحديد أنواع المتغيرات - يُستخدم في بيئة كافة بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: التحقق من صحة أنواع المدخلات داخل الدوال قبل تنفيذ العمليات الحسابية",
      "الصيغة العامة: typeof operand."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء typeof.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "typeof operand"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "سلسلة نصية تمثل النوع ('string', 'number', 'boolean', 'object', 'function', ...)"
      }
    ],
    [
      "forEach()",
      "export / import",
      "try / catch",
      "Optional Chaining (?.)"
    ]
  ],
  [
    "js",
    "var",
    "التصريح التراثي بالنطاق الدالي",
    "var variable legacy function scope متغير تراثي نطاق دالي رفع",
    "الوسيلة التراثية لتعريف المتغيرات في JavaScript قبل ES6؛ تتميز بنطاق دالي (Function Scope) بدلاً من نطاق الكتل وتخضع للرفع (Hoisting)، وينصح بتجنبها واستبدالها بـ const و let.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">var</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ var:\n  function legacyExample() {\n  var message = 'أهلاً بالعالم';\n  if (true) {\n    var message = 'تمت الكتابة فوق المتغير وتسريبه!';\n  }\n  console.log(message); // سيطبع النص المسرب داخل الشرط!\n}\nlegacyExample();\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var",
    [
      "var: التصريح التراثي بالنطاق الدالي - يُستخدم في بيئة كافة بيئات تشغيل JavaScript (Legacy).",
      "الاستخدام النموذجي: فهم وصيانة الأكواد القديمة والمشاريع التراثية المكتوبة قبل عام 2015",
      "الصيغة العامة: var identifier [= value];."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء var.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "var identifier [= value];"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "إنشاء متغير بنطاق دالي أو عام"
      }
    ],
    [
      "Blob / FileReader",
      "return",
      "Nullish Coalescing (??)",
      "map()"
    ]
  ],
  [
    "js",
    "WeakMap / WeakSet",
    "المجموعات والخرائط ذات المراجع الضعيفة",
    "weakmap weakset memory garbage collection مراجع ضعيفة إدارة ذاكرة كائنات",
    "هياكل بيانات متخصصة تقبل حصرياً الكائنات كمفاتيح وتحتفظ بمراجع ضعيفة (Weak References) لها، مما يتيح لمحرك JavaScript تنظيفها من الذاكرة تلقائياً (Garbage Collection) عند زوالها.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">WeakMap / WeakSet</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ WeakMap / WeakSet:\n  const privateData = new WeakMap();\n\nclass Widget {\n  constructor(name) {\n    // تخزين بيانات خاصة بالكائن دون منع تنظيف الذاكرة\n    privateData.set(this, { internalId: Math.random(), name });\n  }\n  getId() {\n    return privateData.get(this).internalId;\n  }\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
    [
      "WeakMap / WeakSet: المجموعات والخرائط ذات المراجع الضعيفة - يُستخدم في بيئة ES6+ المتصفحات و Node.js.",
      "الاستخدام النموذجي: تخزين البيانات والخصائص الخاصة للكائنات بشكل آمن",
      "الصيغة العامة: new WeakMap() | new WeakSet()."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء WeakMap / WeakSet.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "new WeakMap() | new WeakSet()"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "كائن إدارة مراجع ضعيفة (get, set, has, delete)"
      }
    ],
    [
      "Optional Chaining (?.)",
      "return",
      "String.split() / join()",
      "reduce()"
    ]
  ],
  [
    "js",
    "XMLHttpRequest",
    "العميل التراثي لطلبات AJAX",
    "xmlhttprequest xhr ajax legacy طلب قديم تراثي خادم شبكة",
    "الواجهة البرمجية الأصلية التي أطلقت ثورة AJAX في المتصفحات؛ تتيح إرسال طلبات HTTP غير المتزامنة وتعتمد على الأحداث القديمة، واستبدلت اليوم بـ fetch الحديثة.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">XMLHttpRequest</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ XMLHttpRequest:\n  const xhr = new XMLHttpRequest();\nxhr.open('GET', 'https://api.example.com/data', true);\nxhr.onreadystatechange = function () {\n  if (xhr.readyState === 4 && xhr.status === 200) {\n    console.log('البيانات المستلمة:', JSON.parse(xhr.responseText));\n  }\n};\nxhr.send();\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest",
    [
      "XMLHttpRequest: العميل التراثي لطلبات AJAX - يُستخدم في بيئة المتصفحات القديمة والحديثة للتوافقية التراثية.",
      "الاستخدام النموذجي: مراقبة تقدم رفع وتحميل الملفات خطوة بخطوة في المتصفحات التراثية",
      "الصيغة العامة: new XMLHttpRequest()."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء XMLHttpRequest.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "new XMLHttpRequest()"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "كائن XHR لإدارة الطلب ومراقبة الحالات"
      }
    ],
    [
      "forEach()",
      "IntersectionObserver",
      "addEventListener()",
      "querySelector()"
    ]
  ],
  [
    "js",
    "yield",
    "إيقاف واستئناف دوال المولدات (Generators)",
    "yield generator function مولدات إيقاف استئناف مكرر تدفق تسلسل",
    "كلمة محجوزة تُستخدم حصرياً داخل دوال المولدات (function*) لإيقاف تنفيذ الدالة مؤقتاً وإرجاع قيمة محددة، مع إمكانية استئناف التنفيذ من نفس النقطة لاحقاً.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">yield</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ yield:\n  function* idSequenceGenerator() {\n  let id = 100;\n  while (true) {\n    yield `ID_${id++}`;\n  }\n}\n\nconst gen = idSequenceGenerator();\nconsole.log(gen.next().value); // 'ID_100'\nconsole.log(gen.next().value); // 'ID_101'\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield",
    [
      "yield: إيقاف واستئناف دوال المولدات (Generators) - يُستخدم في بيئة ES6+ المتصفحات و Node.js.",
      "الاستخدام النموذجي: توليد سلاسل أرقام ومعرفات لا نهائية دون استهلاك الذاكرة مسبقاً",
      "الصيغة العامة: yield [expression];."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء yield.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "yield [expression];"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "كائن { value: any, done: boolean }"
      }
    ],
    [
      "class",
      "filter()",
      "switch",
      "function"
    ]
  ],
  [
    "js",
    "Array.from() / Array.isArray()",
    "تحويل وفحص الكائنات المصفوفية",
    "array from isarray iterable nodelist تحويل فحص مصفوفة كائن مكرر",
    "تقوم Array.from بتحويل أي كائن شبيه بالمصفوفات (Array-like مثل NodeList من DOM أو Set) إلى مصفوفة JavaScript حقيقية مع إمكانية تطبيق دالة تحويل سريعة، بينما تفحص Array.isArray بدقة ما إذا كانت القيمة مصفوفة حقيقية دون الاعتماد على typeof الزائف.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Array.from() / Array.isArray()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Array.from() / Array.isArray():\n  // فحص مصفوفة بدقة\nconst isList = Array.isArray([1, 2, 3]); // true\n\n// تحويل NodeList من المتصفح إلى مصفوفة حقيقية\nconst domNodes = document.querySelectorAll('.card');\nconst cardsArray = Array.from(domNodes, node => node.textContent.trim());\n\n// توليد مصفوفة أرقام متسلسلة بسرعة\nconst numbers = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
    [
      "Array.from() / Array.isArray(): تحويل وفحص الكائنات المصفوفية - يُستخدم في بيئة ES6+ كافة المتصفحات وبيئات Node.js.",
      "الاستخدام النموذجي: تحويل عناصر DOM الناتجة عن querySelectorAll إلى مصفوفة لتشغيل map و filter عليها",
      "الصيغة العامة: Array.from(arrayLike[, mapFn]) | Array.isArray(value)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Array.from() / Array.isArray().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "Array.from(arrayLike[, mapFn]) | Array.isArray(value)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "Array.from: مصفوفة جديدة | Array.isArray: boolean"
      }
    ],
    [
      "Optional Chaining (?.)",
      "addEventListener()",
      "function",
      "Spread (...)"
    ]
  ],
  [
    "js",
    "String.split() / join()",
    "تقسيم ودمج السلاسل النصية والمصفوفات",
    "split join string array تقسيم دمج نصوص مصفوفة وسوم كلمات",
    "ثنائي تحويل النصوص إلى مصفوفات والعكس: تقوم split بتقسيم النص إلى مصفوفة عناصر بناءً على فاصل محدد (مثل فاصلة أو مسافة)، بينما تقوم join بتجميع عناصر المصفوفة في نص واحد مع فاصل اختياري.",
    "<template>\n  <!-- تحويل النص المدخل إلى شارات ملونة حية -->\n  <span v-for=\"tag in inputTags.split(',')\" :key=\"tag\" class=\"badge\">{{ tag.trim() }}</span>\n</template>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
    [
      "String.split() / join(): تقسيم ودمج السلاسل النصية والمصفوفات - يُستخدم في بيئة كافة إصدارات JavaScript القياسية.",
      "الاستخدام النموذجي: تحويل حقول إدخال الكلمات المفتاحية والوسوم إلى مصفوفة شارات معروضة",
      "الصيغة العامة: str.split(separator[, limit]) | arr.join([separator])."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء String.split() / join().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "str.split(separator[, limit]) | arr.join([separator])"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "split: Array<string> | join: string"
      }
    ],
    [
      "try / catch",
      "Template Literals",
      "fetch()",
      "switch"
    ]
  ],
  [
    "js",
    "String.replace() / replaceAll()",
    "استبدال النصوص والتعبيرات الذكية",
    "replace replaceall regex string استبدال نصوص تعبيرات مطابقة تبديل كلمات",
    "دوال استبدال الأنماط النصية: تقوم replace باستبدال أول مطابقة للنمط أو كل المطابقات مع تعبير منتظم /g، بينما تقدم replaceAll في ES2021 حلاً مباشراً لاستبدال كافة التكرارات لنص محدد دون الحاجة لكتابة Regex.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">String.replace() / replaceAll()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ String.replace() / replaceAll():\n  const sentence = 'تعلم Vue مع VueLexicon واستمتع ببرمجة Vue 3';\n\n// استبدال كافة التكرارات بسلاسة في ES2021\nconst updated = sentence.replaceAll('Vue', 'Nuxt');\nconsole.log(updated);\n// 'تعلم Nuxt مع NuxtLexicon واستمتع ببرمجة Nuxt 3'\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll",
    [
      "String.replace() / replaceAll(): استبدال النصوص والتعبيرات الذكية - يُستخدم في بيئة replace: كافة البيئات | replaceAll: ES2021+ المتصفحات الحديثة.",
      "الاستخدام النموذجي: تنظيف وتطهير مدخلات المستخدم من الأحرف غير المرغوبة والمسافات الزائدة",
      "الصيغة العامة: str.replace(pattern, replacement) | str.replaceAll(pattern, replacement)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء String.replace() / replaceAll().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "str.replace(pattern, replacement) | str.replaceAll(pattern, replacement)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "سلسلة نصية جديدة بالقيم المستبدلة"
      }
    ],
    [
      "const",
      "addEventListener()",
      "if / else",
      "Date & Intl.DateTimeFormat"
    ]
  ],
  [
    "js",
    "Math.random() / Math.floor()",
    "توليد الأرقام العشوائية والتقريب الرياضي",
    "math random floor round توليد أرقام عشوائي تقريب نرد سحب محاكاة",
    "تُعيد Math.random() رقماً عشرياً عشوائياً بين 0 و 1، وتُستخدم مع Math.floor() (التقريب للأسفل) لتوليد أرقام صحيحة عشوائية ضمن أي مدى محدد (مثل توليد رقم سري أو محاكاة رمي نرد).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Math.random() / Math.floor()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Math.random() / Math.floor():\n  // دالة توليد رقم صحيح عشوائي بين حدين (min و max)\nfunction getRandomInt(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\n// رقم نرد بين 1 و 6\nconst diceRoll = getRandomInt(1, 6);\n\n// اختيار عنصر عشوائي من مصفوفة\nconst colors = ['#00DC82', '#38BDF8', '#FBBF24', '#F43F5E'];\nconst randomColor = colors[Math.floor(Math.random() * colors.length)];\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random",
    [
      "Math.random() / Math.floor(): توليد الأرقام العشوائية والتقريب الرياضي - يُستخدم في بيئة كافة بيئات تشغيل JavaScript القياسية.",
      "الاستخدام النموذجي: توليد معرفات عشوائية مؤقتة لعناصر النماذج والبطاقات",
      "الصيغة العامة: Math.random() | Math.floor(number) | Math.round(number)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Math.random() / Math.floor().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "Math.random() | Math.floor(number) | Math.round(number)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "رقم عادي Number"
      }
    ],
    [
      "Arrow Function (=>)",
      "class",
      "Optional Chaining (?.)",
      "typeof"
    ]
  ],
  [
    "js",
    "Date & Intl.DateTimeFormat",
    "التواريخ والأوقات وتنسيقها باللغة العربية",
    "date intl datetimeformat تاريخ وقت تنسيق عربي هجري تقويم",
    "كائن التاريخ الأصلي Date مع واجهة التدويل العالمية Intl؛ تتيح تحويل وتنسيق التواريخ والأوقات تلقائياً بحسب لغة المستخدم (مثل التقويم الهجري أو الميلادي وتنسيق 'منذ 5 دقائق') دون مكتبات ثقيلة كـ Moment.js.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Date & Intl.DateTimeFormat</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Date & Intl.DateTimeFormat:\n  const today = new Date();\n\n// تنسيق عربي فائق الأناقة بواسطة معيار Intl المدمج\nconst arabicFormatter = new Intl.DateTimeFormat('ar-SA', {\n  dateStyle: 'full',\n  timeStyle: 'short'\n});\n\nconsole.log(arabicFormatter.format(today));\n// مثال: 'الثلاثاء، 20 أكتوبر 2026 في 8:30 ص'\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat",
    [
      "Date & Intl.DateTimeFormat: التواريخ والأوقات وتنسيقها باللغة العربية - يُستخدم في بيئة كافة المتصفحات وبيئات Node.js الحديثة.",
      "الاستخدام النموذجي: عرض تواريخ نشر المقالات والمصطلحات البرمجية باللغة العربية الفصحى",
      "الصيغة العامة: new Date([value]) | new Intl.DateTimeFormat([locales, options]).format(date)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Date & Intl.DateTimeFormat.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "new Date([value]) | new Intl.DateTimeFormat([locales, options]).format(date)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "Date: كائن تاريخ | Intl: سلسلة نصية منسقة محلياً"
      }
    ],
    [
      "reduce()",
      "Set / Map",
      "yield",
      "addEventListener()"
    ]
  ],
  [
    "js",
    "RegExp (test / match)",
    "التعبيرات المنتظمة وفحص الأنماط المعقدة",
    "regexp regex test match تعبير منتظم فحص تحقق بريد كلمة سر أنماط",
    "كائنات التعبيرات المنتظمة (Regular Expressions) لمطابقة سلاسل الأحرف مع أنماط نصية معقدة؛ تقوم test() بفحص تحقق النمط وإرجاع boolean، بينما تقوم match() باستخراج الأجزاء المطابقة.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">RegExp (test / match)</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ RegExp (test / match):\n  // نمط التحقق من صحة البريد الإلكتروني\nconst emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\nconsole.log(emailRegex.test('haidar@example.com')); // true\n\n// نمط فحص كلمة سر قوية (8 خانات، حرف كبير، ورقم)\nconst passwordRegex = /^(?=.*[A-Z])(?=.*\\d).{8,}$/;\nconsole.log(passwordRegex.test('VuePro2026')); // true\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp",
    [
      "RegExp (test / match): التعبيرات المنتظمة وفحص الأنماط المعقدة - يُستخدم في بيئة كافة بيئات تشغيل JavaScript.",
      "الاستخدام النموذجي: التحقق المباشر من صحة البريد الإلكتروني وأرقام الهواتف في النماذج",
      "الصيغة العامة: regex.test(string) | string.match(regex)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء RegExp (test / match).",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "regex.test(string) | string.match(regex)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "test: boolean | match: RegExpMatchArray | null"
      }
    ],
    [
      "typeof",
      "map()",
      "Arrow Function (=>)",
      "let"
    ]
  ],
  [
    "js",
    "Debounce & Throttle",
    "ضبط وتيرة الاستدعاءات وتأخير البحث",
    "debounce throttle performance تأخير وتيرة تخفيف استدعاء بحث فوري تحسين أداء",
    "تقنيتان برمجيتان لتحسين الأداء: يقوم Debounce بتأخير تنفيذ الدالة حتى يتوقف المستخدم عن الكتابة لفترة محددة (مثل البحث الفوري)، بينما يقوم Throttle بضمان عدم تنفيذ الدالة أكثر من مرة كل فترة زمنية (مثل أحداث التمرير Scroll).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Debounce & Throttle</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Debounce & Throttle:\n  // دالة Debounce قياسية خفيفة\nfunction debounce(fn, delay = 300) {\n  let timerId;\n  return (...args) => {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn(...args), delay);\n  };\n}\n\n// استخدامها لمنع إرسال طلب خادم مع كل حرف يكتبه المستخدم:\nconst handleSearch = debounce((query) => {\n  console.log('إرسال طلب البحث الفعلي إلى الخادم:', query);\n}, 400);\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/setTimeout",
    [
      "Debounce & Throttle: ضبط وتيرة الاستدعاءات وتأخير البحث - يُستخدم في بيئة جميع بيئات تشغيل JavaScript المتصفح و Node.js.",
      "الاستخدام النموذجي: منع إغراق الخادم بطلبات البحث الفوري أثناء كتابة المستخدم السريعة",
      "الصيغة العامة: debounce(callback, delayInMs) | throttle(callback, intervalInMs)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Debounce & Throttle.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "debounce(callback, delayInMs) | throttle(callback, intervalInMs)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "دالة جديدة مغلفة بآلية تحكم زمني في التدفق"
      }
    ],
    [
      "getElementById()",
      "push() / splice()",
      "Spread (...)",
      "function"
    ]
  ],
  [
    "js",
    "IntersectionObserver",
    "مراقبة ظهور العناصر في نافذة العرض",
    "intersectionobserver lazy loading scroll مراقبة ظهور نافذة عرض تحميل كسول تمرير مرئي",
    "واجهة برمجية فائقة الكفاءة في المتصفح لمراقبة تقاطع العنصر مع نافذة العرض (Viewport)؛ تتيح تفعيل التحميل الكسول للصور وإطلاق حركات الظهور بدقة دون إبطاء الصفحة بمستمعات التمرير scroll.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">IntersectionObserver</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ IntersectionObserver:\n  const observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.classList.add('fade-in-visible');\n      console.log('العنصر مرئي الآن أمام عين المستخدم!');\n    }\n  });\n}, { threshold: 0.2 });\n\n// مراقبة بطاقات المعجم\ndocument.querySelectorAll('.term-card').forEach(card => observer.observe(card));\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
    [
      "IntersectionObserver: مراقبة ظهور العناصر في نافذة العرض - يُستخدم في بيئة كافة المتصفحات الحديثة (Chromium, Firefox, Safari).",
      "الاستخدام النموذجي: التحميل الكسول (Lazy Loading) للصور والمكونات فقط عند اقتراب ظهورها",
      "الصيغة العامة: new IntersectionObserver(callback[, options])."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء IntersectionObserver.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "new IntersectionObserver(callback[, options])"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "كائن IntersectionObserver (observe, unobserve, disconnect)"
      }
    ],
    [
      "const",
      "push() / splice()",
      "console.log",
      "try / catch"
    ]
  ],
  [
    "js",
    "AbortController",
    "إلغاء طلبات الشبكة والمهام غير المتزامنة",
    "abortcontroller cancel fetch طلب إلغاء إيقاف اتصال شبكة أمان مقاطعة",
    "كائن متصفح قياسي يسمح بإلغاء طلبات fetch والعمليات غير المتزامنة برمجياً في أي لحظة عبر تمرير controller.signal؛ يُعد ضرورياً لإلغاء طلبات البحث القديمة عند كتابة استعلام جديد.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">AbortController</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ AbortController:\n  const controller = new AbortController();\n\n// تمرير إشارة الإلغاء للطلب\nfetch('/api/heavy-data', { signal: controller.signal })\n  .then(res => res.json())\n  .catch(err => {\n    if (err.name === 'AbortError') console.log('تم إلغاء الطلب بنجاح ومنع هدر الشبكة 🛑');\n  });\n\n// زر لإلغاء العملية فوراً عند رغبة المستخدم\nfunction cancelRequest() {\n  controller.abort();\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
    [
      "AbortController: إلغاء طلبات الشبكة والمهام غير المتزامنة - يُستخدم في بيئة كافة المتصفحات الحديثة و Node.js v15+.",
      "الاستخدام النموذجي: إلغاء طلبات البحث السابقة فور قيام المستخدم بكتابة حرف جديد لمنع تضارب النتائج",
      "الصيغة العامة: const controller = new AbortController(); controller.abort();."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء AbortController.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "const controller = new AbortController(); controller.abort();"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "كائن تحكم بإشارة { signal, abort() }"
      }
    ],
    [
      "RegExp (test / match)",
      "URL & URLSearchParams",
      "Set / Map",
      "Nullish Coalescing (??)"
    ]
  ],
  [
    "js",
    "structuredClone()",
    "النسخ العميق الحقيقي للكائنات والبيانات",
    "structuredclone deep clone copy نسخ عميق كائن حقيقي حماية مراجع",
    "دالة متصفح و Node.js قياسية حديثة لإنشاء نسخة عميقة حقيقية (Deep Clone) من أي كائن أو مصفوفة مع دعم التراكيب المعقدة (Dates, Sets, Maps) دون القيود والمشاكل التراثية لـ JSON.parse(JSON.stringify).",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">structuredClone()</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ structuredClone():\n  const originalProfile = {\n  username: 'haidar',\n  settings: { theme: 'dark', tags: new Set(['vue', 'nuxt']) },\n  createdAt: new Date()\n};\n\n// نسخ عميق حقيقي ومثالي بسطر واحد\nconst clonedProfile = structuredClone(originalProfile);\n\n// تعديل النسخة لا يؤثر نهائياً على الأصل!\nclonedProfile.settings.theme = 'emerald';\nconsole.log(originalProfile.settings.theme); // 'dark' محمي تماماً ✓\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/structuredClone",
    [
      "structuredClone(): النسخ العميق الحقيقي للكائنات والبيانات - يُستخدم في بيئة كافة المتصفحات الحديثة و Node.js v17+.",
      "الاستخدام النموذجي: إنشاء نسخ مسودة من البيانات لتعديلها في النماذج مع إمكانية التراجع بأمان",
      "الصيغة العامة: structuredClone(value[, { transfer }])."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء structuredClone().",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "structuredClone(value[, { transfer }])"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "نسخة عميقة ومستقلة بالكامل من الكائن الممرر"
      }
    ],
    [
      "Clipboard API (navigator.clipboard)",
      "Template Literals",
      "filter()",
      "switch"
    ]
  ],
  [
    "js",
    "URL & URLSearchParams",
    "إدارة وتحليل الروابط ومعلمات البحث",
    "url urlsearchparams query string روابط معلمات بحث استعلام معالجة مسار",
    "واجهات قياسية متطورة للتعامل مع روابط الإنترنت وتحليل معلمات البحث في شريط العنوان (?category=vue&page=2)؛ تتيح إضافة وحذف وتعديل معلمات الاستعلام برمجياً دون تلاعب يدوي بالنصوص.",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">URL & URLSearchParams</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ URL & URLSearchParams:\n  const currentUrl = new URL(window.location.href);\n\n// إضافة أو تحديث معلمة بحث في الرابط\ncurrentUrl.searchParams.set('category', 'nuxt');\ncurrentUrl.searchParams.set('tab', 'code');\n\nconsole.log(currentUrl.toString());\n// '?category=nuxt&tab=code'\n\n// قراءة قيمة معلمة استعلام محددة\nconst cat = currentUrl.searchParams.get('category'); // 'nuxt'\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams",
    [
      "URL & URLSearchParams: إدارة وتحليل الروابط ومعلمات البحث - يُستخدم في بيئة كافة المتصفحات وبيئات Node.js الحديثة.",
      "الاستخدام النموذجي: مزامنة خيارات التصفية والبحث في VueLexicon Pro مع شريط العنوان لتمكين مشاركة الروابط",
      "الصيغة العامة: new URL(url[, base]) | urlObj.searchParams.get(key) | set(key, val)."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء URL & URLSearchParams.",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "new URL(url[, base]) | urlObj.searchParams.get(key) | set(key, val)"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "كائن URL وكائن URLSearchParams"
      }
    ],
    [
      "Destructuring",
      "for / for...of",
      "JSON.stringify / parse",
      "filter()"
    ]
  ],
  [
    "js",
    "Clipboard API (navigator.clipboard)",
    "النسخ والقراءة من حافظة المتصفح",
    "clipboard copy paste حافظة نسخ لصق نصوص زر برمجي أمان",
    "الواجهة البرمجية غير المتزامنة والآمنة للتعامل مع حافظة جهاز المستخدم (System Clipboard)؛ تتيح نسخ النصوص والأكواد بلمسة واحدة عبر writeText()، وقراءتها عبر readText().",
    "<template>\n  <div class=\"demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white\">\n    <h3 class=\"font-bold text-sm text-[#00DC82]\">Clipboard API (navigator.clipboard)</h3>\n    <button @click=\"execute\" class=\"mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs\">\n      تشغيل الدالة تفاعلياً\n    </button>\n    <p v-if=\"result\" class=\"mt-2 text-xs font-mono text-emerald-300\">النتيجة: {{ result }}</p>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n\nconst result = ref('')\n\nfunction execute() {\n  // كود Vue 3 التفاعلي لـ Clipboard API (navigator.clipboard):\n  async function copySnippetToClipboard(text) {\n  try {\n    await navigator.clipboard.writeText(text);\n    console.log('تم نسخ الكود للحافظة بنجاح 📋');\n  } catch (err) {\n    console.error('فشل الوصول للحافظة:', err);\n  }\n}\n  result.value = 'تم التنفيذ بنجاح ✓'\n}\n<\\/script>",
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
    "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API",
    [
      "Clipboard API (navigator.clipboard): النسخ والقراءة من حافظة المتصفح - يُستخدم في بيئة كافة المتصفحات الحديثة (بيئات HTTPS الآمنة).",
      "الاستخدام النموذجي: تفعيل أزرار 'نسخ الكود' في مربعات الأكواد بلمسة واحدة مع إشعار توست",
      "الصيغة العامة: navigator.clipboard.writeText(stringText) | navigator.clipboard.readText()."
    ],
    "⚠️ تعامل دائماً مع الحالات الخاصة (Edge Cases) مثل القيم الفارغة null أو undefined قبل استدعاء Clipboard API (navigator.clipboard).",
    [
      {
        "name": "arguments",
        "type": "Params",
        "desc": "navigator.clipboard.writeText(stringText) | navigator.clipboard.readText()"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "Promise<void> عند النسخ | Promise<string> عند القراءة"
      }
    ],
    [
      "Blob / FileReader",
      "IntersectionObserver",
      "if / else",
      "Object.keys/entries"
    ]
  ],
  [
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/built-in-special-attributes.html#key",
    [
      ":key=\"id\": سمة خاصة تُعلم محرك Virtual DOM بهوية العنصر الحقيقية.",
      "تمنع إعادة بناء العناصر المتطابقة وتكتفي بتحديث البيانات المتغيرة فقط.",
      "عند وضعها على مكون مع تغير قيمتها، تُجبر Vue على إعادة بناء المكون وتنفيذ دورة حياته من جديد."
    ],
    "⚠️ استخدام قيم عشوائية مثل Math.random() كـ key، مما يجبر Vue على هدم وإعادة بناء العنصر في كل دورة تصيير ويدمر الأداء والتركيز.",
    [
      {
        "name": "key",
        "type": "string | number",
        "desc": "معرف ثابت وفريد عبر قائمة العناصر المتكررة"
      }
    ],
    [
      "v-for",
      "<Transition>",
      "<KeepAlive>"
    ]
  ],
  [
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/built-ins/keep-alive.html",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "<KeepAlive>: مكون مدمج في Vue يقوم بحفظ وتخزين المكونات الديناميكية غير النشطة مؤقتاً في الذا...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "مكون بنيوي يقوم بتغليف المكونات الديناميكية"
      }
    ],
    [
      "nextTick()",
      "v-on (@)",
      "watch() / watchEffect()",
      "v-if / v-else"
    ]
  ],
  [
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/components/slots.html",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "<slot>: عنصر توزيع المحتوى الرسمي في قوالب Vue؛ يسمح للمكون الأب بتمرير عناصر وقوالب برم...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "عنصر توزيع قوالب (Template Outlet)"
      }
    ],
    [
      ":key",
      "defineProps()",
      "nextTick()",
      "ref()"
    ]
  ],
  [
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/built-ins/teleport.html",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "<Teleport>: مكون مدمج مذهل في Vue 3 يتيح لك نقل وإسقاط جزء من قالب المكون إلى أي مكان آخر في...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "مكون تقني لنقل فروع DOM الافتراضية"
      }
    ],
    [
      "computed()",
      "onMounted()",
      "useSlots() / useAttrs()",
      "reactive()"
    ]
  ],
  [
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/built-ins/transition.html",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "<Transition>: مكون مدمج في Vue لتطبيق تأثيرات حركية تلقائية عند ظهور العناصر أو اختفائها (عبر ...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "مكون انتقالي يدير فئات CSS وأحداث JavaScript الانتقالية"
      }
    ],
    [
      "v-model",
      "defineAsyncComponent()",
      "reactive()",
      "defineExpose()"
    ]
  ],
  [
    "vue",
    "computed()",
    "الخصائص المحسوبة التفاعلية ذات التخزين المؤقت",
    "computed getter derived reactivity خاصية محسوبة كاش تتبع مشتق حالة",
    "دالة تنشئ مرجعاً تفاعلياً مشتقاً من حالات أخرى؛ تتميز بخاصية التخزين المؤقت الذكي (Caching) حيث لا تعيد تنفيذ الحساب إلا إذا تغيرت إحدى الحالات التفاعلية التي تعتمد عليها.",
    "<template>\n  <div class=\"component-demo\">\n    const fullName = computed(() => `${first.value} ${last.value}`);\n// يتم التحديث فوراً في كل مكان يُعرض فيه fullName دون أي تدخل يدوي!\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/essentials/computed.html",
    [
      "const double = computed(() => ...): خاصية محسوبة ذات تخزين مؤقت ذكي (Cached).",
      "تُعاد حساباتها فقط عند تغير المتغيرات المتفاعلة المعتمدة عليها داخل الدالة.",
      "تُعامل كـ Read-only ref بالافتراضي ولا يُسمح بتعديل قيمتها مباشرة."
    ],
    "⚠️ إحداث تأثيرات جانبية (Side Effects) مثل طلبات الشبكة أو تعديل حالة خارجية داخل دالة computed. يجب أن تكون الدالة نقية (Pure) ترجع قيمة مشتقة فقط.",
    [
      {
        "name": "getter",
        "type": "Function",
        "desc": "دالة الحساب الخالية من التأثيرات الجانبية"
      },
      {
        "name": "setter (اختياري)",
        "type": "Function",
        "desc": "دالة لمعالجة التعديل في حالة Writable Computed"
      }
    ],
    [
      "ref()",
      "reactive()",
      "watch() / watchEffect()"
    ]
  ],
  [
    "vue",
    "defineAsyncComponent()",
    "التحميل الكسول للمكونات الكبيرة",
    "defineAsyncComponent lazy loading code splitting تحميل كسول تقسيم كود مكونات",
    "دالة في Vue 3 لتعريف مكونات يتم جلب كودها من الخادم فقط عند الحاجة إليها (Lazy Loading)، مما يقلل حجم الحزمة الأولية (Initial Bundle Size) ويسرع التحميل الأولي للموقع.",
    "<template>\n  <div class=\"component-demo\">\n    const HeavyEditor = defineAsyncComponent(() => import('./Editor.vue'));\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/components/async.html",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "defineAsyncComponent(): دالة في Vue 3 لتعريف مكونات يتم جلب كودها من الخادم فقط عند الحاجة إليها (Lazy L...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "مكون Vue يتم حله بشكل غير متزامن"
      }
    ],
    [
      "defineModel()",
      "<Transition>",
      "useState()",
      "<Teleport>"
    ]
  ],
  [
    "vue",
    "defineEmits()",
    "التصريح بأحداث المكون الموجهة للأب",
    "defineEmits emit events custom events تصريح أحداث إرسال للأب مكون",
    "ماكرو برمجي (Compiler Macro) في <script setup> يُستخدم للتصريح عن الأحداث المخصصة التي يمكن للمكون الابن إطلاقها وإرسالها إلى المكون الأب مع تمرير البيانات (Payload).",
    "<script setup>\n// التصريح عن الأحداث المقبولة ونوع بياناتها\nconst emit = defineEmits(['save', 'delete']);\n\nfunction handleSave() {\n  emit('save', { id: 101, status: 'completed' });\n}\n<\\/script>\n\n<template>\n  <button @click=\"handleSave\">حفظ وإرسال للأب</button>\n</template>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits",
    [
      "const emit = defineEmits([...]): الإعلان المسبق عن الأحداث المخصصة التي يطلقها المكون.",
      "emit(\"event-name\", payload): إرسال حدث مع بيانات مصاحبة إلى المكون الأب.",
      "يُمكّن محرر الأكواد وTypeScript من الإكمال التلقائي والتحقق من صحة الأحداث."
    ],
    "⚠️ نسيان الإعلان عن اسم الحدث داخل defineEmits، مما قد يسبب معالجة الحدث كـ Native DOM Listener وتكرار تشغيله.",
    [
      {
        "name": "event",
        "type": "string",
        "desc": "اسم الحدث مثل change, submit, select"
      },
      {
        "name": "payload",
        "type": "any",
        "desc": "البيانات المرسلة مع الحدث"
      }
    ],
    [
      "defineProps()",
      "defineModel()",
      "v-on (@)"
    ]
  ],
  [
    "vue",
    "defineExpose()",
    "تحديد الخصائص المكشوفة للمكون عبر المراجع",
    "defineExpose expose template ref كشف خصائص دوال مرجع مكون ابن",
    "ماكرو برمجي داخل <script setup> يُستخدم لتحديد الخصائص والدوال التي يسمح بكشفها وإتاحتها للمكون الأب عند استخدامه مراجع القوالب (Template Refs)، لأن المكونات تكون مغلقة افتراضياً.",
    "<template>\n  <div class=\"component-demo\">\n    // في Vue 3 مغلق افتراضياً ومحمي تماماً، ونكشف ما نريد صراحة:\ndefineExpose({ resetForm, focusInput });\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/sfc-script-setup.html#defineexpose",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "defineExpose(): ماكرو برمجي داخل <script setup> يُستخدم لتحديد الخصائص والدوال التي يسمح بكشفها ...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "void (كشف للواجهة الخارجية)"
      }
    ],
    [
      "watch() / watchEffect()",
      ":key",
      "ref()",
      "useSlots() / useAttrs()"
    ]
  ],
  [
    "vue",
    "defineModel()",
    "الربط التفاعلي ثنائي الاتجاه المباشر",
    "defineModel v-model two-way binding ربط ثنائي اتجاه ماكرو تحديث تلقائي",
    "ميزة حديثة تم اعتمادها رسمياً في Vue 3.4 لتبسيط الربط ثنائي الاتجاه v-model داخل المكونات؛ تُغني عن كتابة defineProps و defineEmits التقليدية بسطر واحد فائق الأناقة.",
    "<!-- مكون CustomInput.vue الابن -->\n<script setup>\n// سطر واحد يوفر خاصية modelValue وحدث update:modelValue معاً!\nconst model = defineModel({ default: '' });\n<\\/script>\n\n<template>\n  <input v-model=\"model\" class=\"border p-2 rounded bg-slate-800 text-white\" />\n</template>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/components/v-model.html#v-model-arguments",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "defineModel(): ميزة حديثة تم اعتمادها رسمياً في Vue 3.4 لتبسيط الربط ثنائي الاتجاه v-model داخل...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "Ref تفاعلي ثنائي الاتجاه متصل مباشرة بـ v-model الأب"
      }
    ],
    [
      "defineExpose()",
      "onUnmounted()",
      ":key",
      "nextTick()"
    ]
  ],
  [
    "vue",
    "defineProps()",
    "التصريح بخصائص ومداخل المكون الواردة من الأب",
    "defineProps props input properties مداخل خصائص واردة مكون أب",
    "الماكرو البرمجي الأساسي في <script setup> لاستقبال الخصائص والبيانات الممررة من المكون الأب، مع دعم كامل للتحقق من الأنواع والقيم الافتراضية الصارمة.",
    "<script setup>\n// تعريف الخصائص مع أنواعها وقيمها الافتراضية\nconst props = withDefaults(defineProps<{\n  title: string;\n  count?: number;\n  variant?: 'solid' | 'outline';\n}>(), {\n  count: 0,\n  variant: 'solid'\n});\n<\\/script>\n\n<template>\n  <div :class=\"variant\">{{ title }} ({{ count }})</div>\n</template>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/components/props.html",
    [
      "const props = defineProps({...}): استقبال البيانات القادمة من المكون الأب.",
      "ماكرو مدمج في مترجم <script setup> لا يتطلب استيراده من vue.",
      "يدعم تحديد النوع والافتراضي والإلزام والتحقق المخصص."
    ],
    "⚠️ محاولة تعديل الـ props مباشرة داخل المكون الفرعي؛ الـ Props للقراءة فقط (One-way Data Flow). لإرسال تعديل استخدم defineEmits أو defineModel.",
    [
      {
        "name": "type",
        "type": "Constructor",
        "desc": "نوع الخاصية مثل String, Number, Boolean, Object"
      },
      {
        "name": "default",
        "type": "any | Function",
        "desc": "القيمة الافتراضية إذا لم تُمرر"
      },
      {
        "name": "required",
        "type": "boolean",
        "desc": "هل الخاصية إلزامية أم اختيارية"
      }
    ],
    [
      "defineEmits()",
      "defineModel()",
      "defineExpose()"
    ]
  ],
  [
    "vue",
    "nextTick()",
    "الانتظار حتى اكتمال تحديث شجرة DOM",
    "nextTick dom update queue tick انتظار تحديث شجرة افتراضية دورة",
    "دالة مساعدة تُعيد وعداً (Promise) يحل فور انتهاء Vue من معالجة كافة التغييرات التفاعلية وتحديث شجرة DOM الحقيقية بالمتصفح، مما يضمن قراءة الأبعاد الحقيقية بدقة.",
    "<template>\n  <div class=\"component-demo\">\n    await nextTick();\ninputEl.value?.focus();\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/general.html#nexttick",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "nextTick(): دالة مساعدة تُعيد وعداً (Promise) يحل فور انتهاء Vue من معالجة كافة التغييرات ال...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "Promise<void>"
      }
    ],
    [
      "<KeepAlive>",
      "v-for",
      "defineEmits()",
      "watch() / watchEffect()"
    ]
  ],
  [
    "vue",
    "onMounted()",
    "خطاف اكتمال تحميل وتركيب المكون في DOM",
    "onMounted lifecycle mounted hook تحميل تركيب عنصر بدء شجرة استدعاء",
    "أهم خطافات دورة حياة المكون (Lifecycle Hook) في Composition API؛ يُنفذ كود الدالة الممررة له فور اكتمال تركيب المكون وإنشاء كافة عناصر DOM التابعة له وجاهزيتها للتفاعل.",
    "<template>\n  <div class=\"component-demo\">\n    <script setup>\nonMounted(async () => {\n  await loadDashboardData();\n});\n<\\/script>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/composition-api-lifecycle.html#onmounted",
    [
      "onMounted(() => ...): خطاف دورة حياة يُنفذ بعد تصيير المكون بالكامل ودمجه بشجرة DOM.",
      "المكان المثالي للوصول إلى عناصر DOM عبر Template Refs.",
      "يُستخدم لتهيئة مكتبات الرسوم والخرائط الخارجية والبدء بطلبات الشبكة الأولية."
    ],
    "⚠️ محاولة الوصول إلى عناصر DOM عبر الـ Refs قبل دورة Mounted (في السكربت المباشر)، مما يُرجع قيمة null لأن الـ DOM لم يُبن بعد.",
    [
      {
        "name": "callback",
        "type": "Function",
        "desc": "الدالة التي ستعمل تلقائياً فور جاهزية الـ DOM"
      }
    ],
    [
      "onUnmounted()",
      "nextTick()",
      "ref()"
    ]
  ],
  [
    "vue",
    "onUnmounted()",
    "خطاف تفكيك وتنظيف المكون والذاكرة",
    "onUnmounted cleanup destroy lifecycle تفكيك تنظيف ذاكرة إلغاء مؤقتات",
    "خطاف دورة الحياة الذي يُستدعى بعد تفكيك المكون بالكامل وإزالته من شجرة DOM؛ هو المكان الأساسي لتنظيف الموارد، إلغاء المؤقتات، وإلغاء مستمعات الأحداث لمنع تسريب الذاكرة.",
    "<template>\n  <div class=\"component-demo\">\n    <script setup>\nonUnmounted(() => clearInterval(timerId));\n<\\/script>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/composition-api-lifecycle.html#onunmounted",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "onUnmounted(): خطاف دورة الحياة الذي يُستدعى بعد تفكيك المكون بالكامل وإزالته من شجرة DOM؛ هو ا...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "void"
      }
    ],
    [
      "<KeepAlive>",
      "ref()",
      "v-bind (:)",
      "<Transition>"
    ]
  ],
  [
    "vue",
    "provide() / inject()",
    "حقن وتوفير الحالات عبر شجرة المكونات العميقة",
    "provide inject dependency injection حقن تبعيات مشاركة حالة عميقة شجرة",
    "آلية حقن التبعيات الرسمية في Vue؛ تتيح للمكون الجد (Ancestor) توفير حالة أو دالة عبر provide، ليتمكن أي مكون حفيد على أي عمق من حقنها وقراءتها عبر inject دون الحاجة لتمرير props يدوياً.",
    "<template>\n  <div class=\"component-demo\">\n    provide('userSession', sessionRef);\n// الحفيد يستقبلها مباشرة:\nconst session = inject('userSession');\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/components/provide-inject.html",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "provide() / inject(): آلية حقن التبعيات الرسمية في Vue؛ تتيح للمكون الجد (Ancestor) توفير حالة أو دالة...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "قيمة الخاصية المحقونة"
      }
    ],
    [
      "onMounted()",
      "defineExpose()",
      "v-bind (:)",
      "v-on (@)"
    ]
  ],
  [
    "vue",
    "reactive()",
    "تغليف الكائنات بالتفاعل العميق",
    "reactive state proxy reactivity كائن تفاعلي بروكسي تتبع عميق حالة",
    "دالة تحول كائناً أو مصفوفة JavaScript عادية إلى نسخة تفاعلية بعمق (Deep Reactivity) باستخدام JavaScript Proxies، بحيث يُمكن قراءة وتعديل خصائصه مباشرة دون الحاجة لـ .value.",
    "<template>\n  <div class=\"component-demo\">\n    const state = reactive({ count: 0 });\nstate.count++; // الواجهة تتحدث ذاتياً!\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/essentials/reactivity-fundamentals.html#reactive",
    [
      "const state = reactive({...}): إنشاء كائن متفاعل عميق (Deep Reactive Proxy).",
      "state.count++: تعديل الخصائص مباشرة ككائن جافاسكريبت عادي بدون .value.",
      "يعمل فقط مع الكائنات (Objects) والمصفوفات والـ Collections (Set, Map)."
    ],
    "⚠️ إعادة تعيين الكائن بالكامل (مثل state = {...}) يكسر رابط الوكيل (Proxy) والتفاعلية، وكذلك تفكيك الخصائص المباشر. للقيم الأولية استخدم ref() دائماً.",
    [
      {
        "name": "target",
        "type": "Object",
        "desc": "الكائن الأصلي المراد تحويله إلى وكيل متفاعل"
      }
    ],
    [
      "ref()",
      "computed()",
      "shallowRef() / shallowReactive()"
    ]
  ],
  [
    "vue",
    "ref()",
    "المرجع التفاعلي الأساسي للقيم الفردية والكائنات",
    "ref reactivity value reactive reference مرجع تفاعلي قيمة وحيد غلاف",
    "حجر الزاوية الأساسي لنظام التفاعل في Vue 3؛ يأخذ أي قيمة أولية (رقم، نص، منطقي) أو كائن، ويُعيد كائناً تفاعلياً يحمل القيمة في خاصية .value في الكود، ويفكها تلقائياً داخل القوالب.",
    "<script setup>\nimport { ref } from 'vue';\n\nconst count = ref(0); // تعريف مرجع تفاعلي برقم أولي\n\nfunction increment() {\n  count.value++; // في JavaScript نصل لها عبر .value\n}\n<\\/script>\n\n<template>\n  <!-- في القالب نكتب count مباشرة بدون .value! -->\n  <button @click=\"increment\">العدد: {{ count }}</button>\n</template>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/reactivity-core.html#ref",
    [
      "const count = ref(0): إنشاء قيمة أولية متفاعلة ومغلفة داخل كائن Reactive Ref.",
      "count.value++: الوصول للقيمة وقراءتها أو تعديلها يتطلب استخدام خاصية .value في السكربت.",
      "{{ count }}: في قالب <template> يقوم Vue بفك التغليف (Unwrapping) تلقائياً دون كتابة .value."
    ],
    "⚠️ نسيان كتابة .value عند القراءة أو التعديل داخل <script setup>، أو محاولة عمل تفكيك (Destructuring) لكائن ref مما يفقده التفاعلية فوراً. استخدم toRefs() للفك الآمن.",
    [
      {
        "name": "initialValue",
        "type": "any",
        "desc": "القيمة البدائية للمتغير (نص، رقم، مصفوفة، كائن)"
      },
      {
        "name": ".value",
        "type": "T",
        "desc": "خاصية القراءة والتعديل المباشر للقيمة داخل السكربت"
      }
    ],
    [
      "reactive()",
      "computed()",
      "shallowRef() / shallowReactive()",
      "toRef() / toRefs()"
    ]
  ],
  [
    "vue",
    "shallowRef() / shallowReactive()",
    "المراجع التفاعلية السطحية فائقة السرعة",
    "shallowRef shallowReactive performance تحسين أداء تفاعل سطحي خفيف",
    "بدائل محسنة الأداء لـ ref و reactive العادية؛ تقوم بتتبع التغييرات السطحية فقط (مثل إعادة إسناد .value بالكامل) دون مراقبة الخصائص العميقة داخلياً، مما يوفر استهلاك الذاكرة بشكل هائل.",
    "<template>\n  <div class=\"component-demo\">\n    const heavyData = shallowRef(hugeJsonData); // سرعة فائقة وحفظ للذاكرة!\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/reactivity-advanced.html#shallowref",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "shallowRef() / shallowReactive(): بدائل محسنة الأداء لـ ref و reactive العادية؛ تقوم بتتبع التغييرات السطحية فقط (...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "ShallowRef<T> مرجع سطحي خفيف"
      }
    ],
    [
      "<KeepAlive>",
      "v-bind (:)",
      "watchPostEffect()",
      "v-model"
    ]
  ],
  [
    "vue",
    "toRef() / toRefs()",
    "تحويل خصائص الكائنات التفاعلية إلى مراجع فردية",
    "toRef toRefs destructuring reactive تحويل خصائص مراجع تفكيك الحفاظ على التفاعل",
    "أدوات مساعدة لحل مشكلة فقدان التفاعل عند تفكيك (Destructuring) كائنات reactive؛ تقوم بتحويل الخصائص إلى مراجع ref منفصلة تظل متصلة ومتزامنة تماماً مع الكائن التفاعلي الأصلي.",
    "<template>\n  <div class=\"component-demo\">\n    const { count } = toRefs(reactiveState); // count يظل مرجعاً تفاعلياً فعالاً!\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/reactivity-utilities.html#torefs",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "toRef() / toRefs(): أدوات مساعدة لحل مشكلة فقدان التفاعل عند تفكيك (Destructuring) كائنات reactive؛ ...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "Refs فردية متصلة برباط تفاعلي ثنائي مع الكائن الأصلي"
      }
    ],
    [
      "defineAsyncComponent()",
      "defineModel()",
      "defineProps()",
      "provide() / inject()"
    ]
  ],
  [
    "vue",
    "useFetch()",
    "جلب البيانات التفاعلي المتقدم في Nuxt و Vue",
    "useFetch nuxt composable async data جلب بيانات تفاعلي متقدم خادم عميل",
    "أداة جلب البيانات المتكاملة المدمجة في Nuxt 3 (والمتوفرة عبر مكتبة VueUse)؛ تدير دورة جلب البيانات بالكامل، وتوفر مراجع تلقائية لـ data و pending و error و refresh مع منع تكرار الطلبات.",
    "<script setup>\n// جلب بيانات تفاعلي بسطر واحد مع دعم SSR التلقائي في Nuxt 3\nconst { data: users, pending, error, refresh } = await useFetch('/api/users', {\n  query: { role: 'admin' },\n  lazy: false\n});\n<\\/script>\n\n<template>\n  <div v-if=\"pending\">جاري التحميل...</div>\n  <ul v-else>\n    <li v-for=\"u in users\" :key=\"u.id\">{{ u.name }}</li>\n  </ul>\n</template>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://nuxt.com/docs/api/composables/use-fetch",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "useFetch(): أداة جلب البيانات المتكاملة المدمجة في Nuxt 3 (والمتوفرة عبر مكتبة VueUse)؛ تدير...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "{ data: Ref<T>, pending: Ref<boolean>, error: Ref<Error>, refresh: Function }"
      }
    ],
    [
      "reactive()",
      "<Transition>",
      "v-bind (:)",
      "<slot>"
    ]
  ],
  [
    "vue",
    "useSlots() / useAttrs()",
    "الوصول البرمجي للمنافذ والخصائص غير المعلنة",
    "useSlots useAttrs programmatic slots attrs وصول برمجي منافذ خصائص",
    "أدوات مساعدة في Composition API تسمح بالوصول البرمجي المباشر إلى المنافذ (Slots) الممررة للمكون وخصائص السقوط الحر (Fallthrough Attributes) التي لم يتم التصريح عنها في defineProps.",
    "<template>\n  <div class=\"component-demo\">\n    <script setup>\nconst slots = useSlots();\nconst hasFooter = computed(() => !!slots.footer);\n<\\/script>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/composition-api-setup.html#useslots-useattrs",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "useSlots() / useAttrs(): أدوات مساعدة في Composition API تسمح بالوصول البرمجي المباشر إلى المنافذ (Slots)...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "كائنات كشف برمجية للمنافذ والخصائص"
      }
    ],
    [
      "useFetch()",
      ":key",
      "v-for",
      "defineAsyncComponent()"
    ]
  ],
  [
    "vue",
    "useState()",
    "إدارة الحالة التفاعلية المتوافقة مع SSR في Nuxt",
    "useState nuxt ssr global state إدارة حالة شاملة تزامن خادم عميل",
    "الأداة الرسمية في Nuxt 3 لإنشاء حالة تفاعلية عامة مشتركة عبر المكونات؛ تتميز بتوافقها المطلق مع العرض من طرف الخادم (SSR) ونقل الحالة المحلولة إلى المتصفح دون إعادة استدعائها.",
    "<script setup>\n// تعريف حالة عامة مشتركة بمفتاح فريد 'cartCount'\nconst cartCount = useState('cartCount', () => 0);\n\nfunction addToCart() {\n  cartCount.value++;\n}\n<\\/script>\n\n<template>\n  <div class=\"badge\">سلة التسوق: {{ cartCount }}</div>\n</template>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://nuxt.com/docs/api/composables/use-state",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "useState(): الأداة الرسمية في Nuxt 3 لإنشاء حالة تفاعلية عامة مشتركة عبر المكونات؛ تتميز بتو...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "Ref تفاعلي متزامن بين الخادم والمتصفح"
      }
    ],
    [
      "defineAsyncComponent()",
      ":key",
      "shallowRef() / shallowReactive()",
      "onMounted()"
    ]
  ],
  [
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/built-in-directives.html#v-bind",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "v-bind (:): توجيه القوالب الأساسي في Vue لربط أي خاصية من خصائص HTML أو خصائص المكونات (prop...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "توجيه ربط خصائص في القالب"
      }
    ],
    [
      "<Teleport>",
      ":key",
      "useFetch()",
      "provide() / inject()"
    ]
  ],
  [
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/essentials/list.html",
    [
      "v-for=\"(item, index) in items\": التكرار البرمجي على مصفوفة أو كائن لإنشاء عناصر متكررة.",
      ":key=\"item.id\": ربط معرف فريد ثابت لكل عنصر لتمكين خوارزمية Virtual DOM من التتبع الفعال.",
      "يدعم التكرار على أرقام v-for=\"n in 10\" أو على كائنات (val, key) in obj."
    ],
    "⚠️ استخدام الـ index كـ :key عند إضافة عناصر جديدة في البداية أو إعادة الترتيب، مما يؤدي لأخطاء في حالة الحقول وإعادة تصيير غير ضرورية. استخدم دائماً id فريد.",
    [
      {
        "name": ":key",
        "type": "string | number",
        "desc": "مفتاح فريد وإلزامي لضمان تتبع العناصر واستقرار حالتها"
      },
      {
        "name": "in / of",
        "type": "Iterable",
        "desc": "المصفوفة أو القائمة المراد التكرار عليها"
      }
    ],
    [
      ":key",
      "v-if / v-else",
      "v-bind (:)"
    ]
  ],
  [
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/essentials/conditional.html",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "v-if / v-else: توجيه العرض الشرطي في قوالب Vue؛ يقوم بإضافة العنصر فعلياً إلى شجرة DOM أو إزالت...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "توجيه تحكم بنيوي في شجرة القالب"
      }
    ],
    [
      "defineProps()",
      "ref()",
      "v-model",
      "v-for"
    ]
  ],
  [
    "vue",
    "v-model",
    "الربط التفاعلي ثنائي الاتجاه لحقول الإدخال",
    "v-model two way data binding ربط ثنائي اتجاه حقول إدخال نموذج تزامن فوري",
    "أشهر توجيه في Vue على الإطلاق؛ ينشئ ربطاً ثنائياً فورياً ومتبادلاً بين قيمة حالة المتغير في JavaScript وقيمة حقل الإدخال في القالب، بحيث ينعكس أي تغيير في أحدهما على الآخر فوراً.",
    "<script setup>\nimport { ref } from 'vue';\nconst searchKeyword = ref('');\n<\\/script>\n\n<template>\n  <div>\n    <input\n      v-model=\"searchKeyword\"\n      placeholder=\"اكتب مصطلحك البرمجي...\"\n      class=\"border p-2 rounded bg-slate-900 text-white\"\n    />\n    <p class=\"mt-2 text-emerald-400\">أنت تبحث عن: {{ searchKeyword }}</p>\n  </div>\n</template>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/essentials/forms.html",
    [
      "v-model=\"text\": ربط بيانات ثنائي الاتجاه (Two-way Data Binding).",
      "يجمع تلقائياً بين تمرير القيمة :modelValue والاستماع لحدث التحديث @update:modelValue.",
      "يدعم مُعدلات مدمجة مثل .trim (حذف المسافات) و .number (تحويل لرقم) و .lazy (التحديث عند blur)."
    ],
    "⚠️ تعديل الخاصية المستقبلة من المكون الأب مباشرة (Mutating Props). في Vue 3.4+ استخدم دائماً ماكرو defineModel() للربط المعياري داخل المكونات الفرعية.",
    [
      {
        "name": "modelValue",
        "type": "any",
        "desc": "القيمة المربوطة افتراضياً"
      },
      {
        "name": "modifiers",
        "type": "Object",
        "desc": "المُعدلات المخصصة مثل .trim و .lazy"
      }
    ],
    [
      "defineModel()",
      "v-bind (:)",
      "v-on (@)",
      "defineProps()"
    ]
  ],
  [
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/essentials/event-handling.html",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "v-on (@): التوجيه المخصص لربط أحداث DOM (مثل النقر، الإرسال، ضغط المفاتيح) بدوال المعالجة ...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "توجيه منصت أحداث في القالب"
      }
    ],
    [
      "provide() / inject()",
      "ref()",
      "useSlots() / useAttrs()",
      "watchPostEffect()"
    ]
  ],
  [
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/essentials/conditional.html#v-show",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "v-show: توجيه شرطي يتحكم في ظهور العنصر على الشاشة؛ بخلاف v-if، يظل العنصر موجوداً دائما...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "توجيه تبديل مظهري عبر نمط CSS"
      }
    ],
    [
      "reactive()",
      ":key",
      "defineEmits()",
      "<KeepAlive>"
    ]
  ],
  [
    "vue",
    "watch() / watchEffect()",
    "مراقبة التغيرات التفاعلية وتنفيذ التأثيرات الجانبية",
    "watch watchEffect reactive watcher مراقبة تتبع تغيرات تأثير جانبي استماع",
    "دوال مراقبة الحالات في Vue 3؛ تتيح لك تشغيل دالة تأثير جانبي (Side Effect) استجابة لتغير حالة تفاعلية محددة؛ يقوم watchEffect بتتبع كافة الاعتمادات التفاعلية المستخدمة داخله تلقائياً وبدء التشغيل فوراً.",
    "<template>\n  <div class=\"component-demo\">\n    <script setup>\nwatch(activeFilter, () => {\n  fetchData();\n});\n<\\/script>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/guide/essentials/watchers.html",
    [
      "watch(source, (newVal, oldVal) => ...): مراقبة صريحة لمصدر محدد مع مقارنة القديم والجديد.",
      "watchEffect(): تتبع تلقائي لأي متغير متفاعل يُقرأ بداخلها وتشغيله فوراً (Immediate).",
      "تدعم خيار { deep: true } لمراقبة الكائنات العميقة و { immediate: true } للتشغيل الأولي."
    ],
    "⚠️ إحداث حلقة لا نهائية (Infinite Loop) عبر تعديل نفس المتغير المراقب داخل دالة المعالجة، أو نسيان تمرير { deep: true } عند مراقبة كائنات متداخلة.",
    [
      {
        "name": "source",
        "type": "Ref | Function",
        "desc": "المصدر المراد مراقبته بدقة"
      },
      {
        "name": "options",
        "type": "Object",
        "desc": "خيارات مثل { deep, immediate, once }"
      }
    ],
    [
      "computed()",
      "ref()",
      "watchPostEffect()"
    ]
  ],
  [
    "vue",
    "watchPostEffect()",
    "المراقبة بعد اكتمال تحديث شجرة DOM",
    "watchPostEffect post watcher مراقبة بعد التحديث اكتمال شجرة",
    "نسخة متخصصة من watchEffect تُشغّل دالة التأثير الجانبي حصرياً بعد أن يقوم Vue بتحديث شجرة DOM الحقيقية، وهي مفيدة جداً عند الحاجة لقراءة أبعاد العناصر أو التعامل مع عناصر DOM المحدثة.",
    "<template>\n  <div class=\"component-demo\">\n    watchPostEffect(() => {\n  chatEl.value.scrollTop = chatEl.value.scrollHeight;\n});\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\n<\\/script>",
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
    "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم",
    "https://vuejs.org/api/reactivity-core.html#watchposteffect",
    [
      "<template>: يعرض الواجهة التفاعلية بأسلوب Vue 3 التصريحي.",
      "watchPostEffect(): نسخة متخصصة من watchEffect تُشغّل دالة التأثير الجانبي حصرياً بعد أن يقوم Vue بت...",
      "<script setup>: منطق المكون الحديث باستخدام Composition API."
    ],
    "⚠️ انتبه لعدم كسر قواعد التفاعلية (Reactivity Rules) أو التأثيرات الجانبية داخل القوالب؛ اجعل المتغيرات معرفة بوضوح في <script setup>.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "دالة stopHandle لإلغاء المراقبة"
      }
    ],
    [
      "useState()",
      "<KeepAlive>",
      "v-if / v-else",
      "watch() / watchEffect()"
    ]
  ],
  [
    "nuxt",
    "<UAccordion>",
    "القوائم القابلة للطي والتوسيع (الأكورديون)",
    "UAccordion nuxt ui accordion collapse أكورديون طي توسيع أسئلة شائعة",
    "مكون متكامل لعرض الأقسام القابلة للطي والتوسيع بشكل انسيابي، وهو مثالي لصفحات الأسئلة الشائعة (FAQ) وتفاصيل الحسابات، مع دعم التوسيع المفرد أو المتعدد والتحكم بحالات الفتح.",
    "<template>\n  <UAccordion\n    :items=\"faqItems\"\n    color=\"primary\"\n    variant=\"soft\"\n    :ui=\"{ wrapper: 'space-y-2' }\"\n  />\n</template>\n\n<script setup>\nconst faqItems = [\n  { label: 'ما هو VueLexicon Pro؟', content: 'قاموس ومساعد تفاعلي شامل لمطوري الويب.' },\n  { label: 'كيف أستخدم مكتبة Nuxt UI؟', content: 'عبر تثبيت @nuxt/ui في مشروع Nuxt 3.' }\n];\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/accordion",
    [
      "<UAccordion>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { items, color, variant, multiple, openIcon, closeIcon }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { items, color, variant, multiple, openIcon, closeIcon }"
      }
    ],
    [
      "<UCommandPalette>",
      "<UAlert>",
      "<UTextarea>",
      "<USwitch>"
    ]
  ],
  [
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/alert",
    [
      "<UAlert>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { title, description, color, variant, icon, actions, closeButton }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { title, description, color, variant, icon, actions, closeButton }"
      }
    ],
    [
      "<UButton>",
      "<UPagination>",
      "<UInput>",
      "<USelect>"
    ]
  ],
  [
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/avatar",
    [
      "<UAvatar>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { src, alt, text, size, chipColor, chipPosition, icon }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { src, alt, text, size, chipColor, chipPosition, icon }"
      }
    ],
    [
      "<UTable>",
      "<UCard>",
      "<UPagination>",
      "<USkeleton>"
    ]
  ],
  [
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/badge",
    [
      "<UBadge>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { color, variant, size, label }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { color, variant, size, label }"
      }
    ],
    [
      "<UProgress>",
      "<UCheckbox>",
      "<UModal>",
      "<UBreadcrumb>"
    ]
  ],
  [
    "nuxt",
    "<UBreadcrumb>",
    "مسار التنقل الهرمي (فتات الخبز)",
    "UBreadcrumb nuxt ui breadcrumb navigation مسار تنقل هرمي صفحات شجرة",
    "مكون ملاحة هرمي يوضح للمستخدم موقعه الحالي داخل هيكلية الموقع، ويوفر مساراً سريعاً للعودة إلى الصفحات العليا السابقة، مع دعم كامل لروابط NuxtLink التلقائية.",
    "<template>\n  <UBreadcrumb :links=\"breadcrumbLinks\" />\n</template>\n\n<script setup>\nconst breadcrumbLinks = [\n  { label: 'الرئيسية', icon: 'i-heroicons-home', to: '/' },\n  { label: 'المعجم البرمجي', icon: 'i-heroicons-book-open', to: '/lexicon' },\n  { label: 'مكتبة Nuxt UI', icon: 'i-heroicons-cube' }\n];\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/breadcrumb",
    [
      "<UBreadcrumb>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { links, divider, ui }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { links, divider, ui }"
      }
    ],
    [
      "<UInput>",
      "<UCommandPalette>",
      "<UBadge>",
      "<USkeleton>"
    ]
  ],
  [
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/button",
    [
      "<UButton>: زر Nuxt UI v3 متكامل يدعم الألوان والثيمات والأيقونات وحالات التحميل.",
      "color=\"primary\": تطبيق ألوان الثيم الزمردي المتوافقة تلقائياً مع النمط الداكن.",
      ":loading=\"isLoading\": إظهار مؤشر التحميل الدائري تلقائياً وتعطيل النقر لمنع التكرار."
    ],
    "⚠️ تكرار الفئات المخصصة في class مع الخصائص الافتراضية دون استخدام ui prop المخصص لتجاوز الأنماط بدقة.",
    [
      {
        "name": "color",
        "type": "string",
        "desc": "اللون (primary, neutral, success, warning, error)"
      },
      {
        "name": "variant",
        "type": "string",
        "desc": "النمط (solid, outline, soft, ghost, link)"
      },
      {
        "name": "icon",
        "type": "string",
        "desc": "أيقونة Lucide المدمجة مثل i-heroicons-sparkles"
      },
      {
        "name": "loading",
        "type": "boolean",
        "desc": "تفعيل حالة الانتظار الدائرية"
      }
    ],
    [
      "<UBadge>",
      "<UCard>",
      "<UInput>",
      "<USwitch>"
    ]
  ],
  [
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/card",
    [
      "<UCard>: حاوية بطاقة زجاجية منظمة مقسمة إلى header و body و footer.",
      "<template #header>: تخصيص رأس البطاقة عبر سلوت مسمى نظيف.",
      "متوافقة تماماً مع التصميم الداكن والحدود المضيئة."
    ],
    "⚠️ نسيان تخصيص تباعدات السلوتات عبر ui=\"{ body: { padding: \"p-4\" } }\"، مما قد يؤدي لتباعدات داخلية مفرطة على الشاشات الصغيرة.",
    [
      {
        "name": "ui",
        "type": "Object",
        "desc": "تخصيص أنماط الحاوية والرأس والقاعدة"
      },
      {
        "name": "#header, #footer",
        "type": "Slot",
        "desc": "سلوتات لتخصيص محتوى الرأس والتذييل"
      }
    ],
    [
      "<UButton>",
      "<UModal>",
      "<UDrawer>"
    ]
  ],
  [
    "nuxt",
    "<UCheckbox>",
    "مربعات الاختيار والتحقق التفاعلية",
    "UCheckbox nuxt ui checkbox check مربع اختيار تحقق تأكيد موافقة",
    "مكون حديث لمربعات الاختيار يدعم الربط ثنائي الاتجاه عبر v-model، ويقدم تسميات مدمجة، وحالات غير محددة (indeterminate)، وتنسيقاً سلساً يتوافق مع أنظمة الألوان.",
    "<template>\n  <UCheckbox\n    v-model=\"agreeTerms\"\n    name=\"terms\"\n    label=\"أوافق على جميع الشروط والأحكام\"\n    help=\"تأكد من قراءة سياسة الخصوصية بعناية.\"\n    color=\"primary\"\n  />\n</template>\n\n<script setup>\nconst agreeTerms = ref(false);\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/checkbox",
    [
      "<UCheckbox>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { modelValue, label, help, color, disabled, indeterminate }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { modelValue, label, help, color, disabled, indeterminate }"
      }
    ],
    [
      "<UInput>",
      "<UTextarea>",
      "<UForm>",
      "<UAccordion>"
    ]
  ],
  [
    "nuxt",
    "<UCommandPalette>",
    "لوحة الأوامر والبحث السريع العالمية (Ctrl + K)",
    "UCommandPalette nuxt ui command palette search spotlight أوامر بحث شامل نافذة ذكية",
    "مكون بحث وأوامر خارق مستوحى من Spotlight و MacOS Raycast؛ يتيح للمستخدمين البحث السريع، تشغيل الإجراءات، والتنقل في الموقع بالكامل عبر اختصار لوحة المفاتيح Ctrl + K.",
    "<template>\n  <UCommandPalette\n    :groups=\"commandGroups\"\n    :autoselect=\"true\"\n    placeholder=\"ابحث عن أمر أو مصطلح...\"\n    @update:model-value=\"onSelectCommand\"\n  />\n</template>\n\n<script setup>\nconst commandGroups = [\n  {\n    key: 'terms',\n    commands: [\n      { id: 1, label: 'computed()', icon: 'i-heroicons-code-bracket' },\n      { id: 2, label: '<UButton>', icon: 'i-heroicons-cube' }\n    ]\n  }\n];\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/command-palette",
    [
      "<UCommandPalette>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { groups, placeholder, autoselect, closeButton }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { groups, placeholder, autoselect, closeButton }"
      }
    ],
    [
      "<UBadge>",
      "<UAvatar>",
      "<UDrawer>",
      "<UProgress>"
    ]
  ],
  [
    "nuxt",
    "<UDrawer>",
    "الألواح السفلية والجانبية المنزلقة",
    "UDrawer nuxt ui drawer slide bottom sheet لوح منزلق جانبي سفلي شاشة جوال",
    "مكون لوح منزلق مخصص للأجهزة الذكية (Bottom Sheet) والشاشات الكبيرة؛ ينزلق بنعومة من الأسفل أو الجوانب لعرض التفاصيل الإضافية والقوائم الفرعية دون مغادرة الصفحة.",
    "<template>\n  <UButton label=\"فتح اللوح السفلي\" @click=\"isOpen = true\" />\n\n  <UDrawer v-model=\"isOpen\">\n    <div class=\"p-6 max-w-md mx-auto\">\n      <h3 class=\"text-xl font-bold text-white\">تفاصيل المصطلح</h3>\n      <p class=\"mt-2 text-gray-400\">محتوى إضافي منزلق من أسفل الشاشة بتجربة لمس مذهلة.</p>\n    </div>\n  </UDrawer>\n</template>\n\n<script setup>\nconst isOpen = ref(false);\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/drawer",
    [
      "<UDrawer>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { modelValue, direction, handle }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { modelValue, direction, handle }"
      }
    ],
    [
      "<UDropdownMenu>",
      "<UBadge>",
      "<UFormField>",
      "<UCard>"
    ]
  ],
  [
    "nuxt",
    "<UDropdownMenu>",
    "القوائم المنسدلة التفاعلية الغنية",
    "UDropdownMenu nuxt ui dropdown menu سياق قائمة منسدلة إجراءات خيارات",
    "مكون قوائم سياقية متطور ينبثق عند النقر على عنصر أو تمرير الفأرة فوقه؛ يدعم تجميع العناصر، الأيقونات، الاختصارات السريعة (Kbd)، وعناصر التحديد المشروطة.",
    "<template>\n  <UDropdownMenu :items=\"menuItems\">\n    <UButton icon=\"i-heroicons-ellipsis-vertical\" color=\"gray\" variant=\"ghost\" />\n  </UDrawerMenu>\n</template>\n\n<script setup>\nconst menuItems = [\n  [\n    { label: 'تعديل الملف', icon: 'i-heroicons-pencil-square' },\n    { label: 'تكرار السجل', icon: 'i-heroicons-document-duplicate' }\n  ],\n  [\n    { label: 'حذف نهائي', icon: 'i-heroicons-trash', color: 'red' }\n  ]\n];\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/dropdown-menu",
    [
      "<UDropdownMenu>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { items, mode, popper, disabled }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { items, mode, popper, disabled }"
      }
    ],
    [
      "<UKbd>",
      "<UAccordion>",
      "<UAlert>",
      "<UCommandPalette>"
    ]
  ],
  [
    "nuxt",
    "<UForm>",
    "إدارة النماذج والتحقق المتكامل بالأنواع",
    "UForm nuxt ui form validation zod نموذج تحقق استمارة مخطط بيانات أمان",
    "مكون إدارة النماذج الشامل في Nuxt UI؛ يتكامل بسلاسة مع مكتبات التحقق مثل Zod و Yup، ويقوم بفحص كافة الحقول تلقائياً وعرض رسائل الخطأ عند الإرسال بدقة متناهية.",
    "<template>\n  <UForm :schema=\"loginSchema\" :state=\"formState\" @submit=\"onSubmit\" class=\"space-y-4\">\n    <UFormField label=\"البريد الإلكتروني\" name=\"email\">\n      <UInput v-model=\"formState.email\" type=\"email\" />\n    </UFormField>\n\n    <UButton type=\"submit\" color=\"primary\" label=\"تسجيل الدخول\" />\n  </UForm>\n</template>\n\n<script setup>\nimport { z } from 'zod';\nconst loginSchema = z.object({\n  email: z.string().email('صيغة البريد الإلكتروني غير صحيحة')\n});\nconst formState = reactive({ email: '' });\nconst onSubmit = (event) => console.log('البيانات صحيحة:', event.data);\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/form",
    [
      "<UForm>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { schema, state, validateOn }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { schema, state, validateOn }"
      }
    ],
    [
      "<UTable>",
      "<UDropdownMenu>",
      "<UBreadcrumb>",
      "<UProgress>"
    ]
  ],
  [
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/form-field",
    [
      "<UFormField>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { label, name, description, help, error, required }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { label, name, description, help, error, required }"
      }
    ],
    [
      "<UProgress>",
      "<UBadge>",
      "<UModal>",
      "<UAvatar>"
    ]
  ],
  [
    "nuxt",
    "<UInput>",
    "حقل الإدخال النصي الذكي متعدد الإمكانيات",
    "UInput nuxt ui input textfield إدخال نص حقل بحث أيقونة مسح",
    "حقل إدخال عالي التخصيص يدعم الأيقونات في البداية والنهاية، زر مسح النص الفوري، حالات التحميل، أنواع الإدخال المختلفة، ومطابقة ثيم المشروع بدون أي تنسيق إضافي.",
    "<template>\n  <UInput\n    v-model=\"search\"\n    placeholder=\"ابحث عن دالة أو مكون...\"\n    icon=\"i-heroicons-magnifying-glass\"\n    color=\"primary\"\n    variant=\"outline\"\n    size=\"md\"\n    :trailing=\"true\"\n  />\n</template>\n\n<script setup>\nconst search = ref('');\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/input",
    [
      "<UInput v-model=\"val\">: حقل إدخال ذكي يدعم الأيقونات والتنبيهات وحالات الخطأ.",
      "icon=\"i-heroicons-magnifying-glass\": دمج أيقونة جانبية بخطوة واحدة.",
      "color=\"primary\": تناسق فوري مع هوية التطبيق البصرية."
    ],
    "⚠️ ربط v-model بمتغير غير معرف أو نسيان تهيئة القيمة بسلسلة نصية فارغة مما ينتج تحذير uncontrolled input.",
    [
      {
        "name": "type",
        "type": "string",
        "desc": "نوع الحقل (text, password, email, number)"
      },
      {
        "name": "placeholder",
        "type": "string",
        "desc": "النص التلميحي داخل الحقل"
      },
      {
        "name": "icon",
        "type": "string",
        "desc": "أيقونة مدمجة على الجانب"
      }
    ],
    [
      "<UFormField>",
      "<UForm>",
      "<UTextarea>",
      "<USelect>"
    ]
  ],
  [
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/kbd",
    [
      "<UKbd>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { size, value }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { size, value }"
      }
    ],
    [
      "<UAlert>",
      "<UInput>",
      "<UProgress>",
      "<UPagination>"
    ]
  ],
  [
    "nuxt",
    "<UModal>",
    "النوافذ المنبثقة والطبقات الحوارية",
    "UModal nuxt ui modal dialog popup نافذة منبثقة حوار خلفية معتمة تراكب",
    "مكون نوافذ منبثقة احترافي ينبثق فوق الصفحة مع طبقة تعتيم ضبابية خلفية (Backdrop)؛ يدعم الإغلاق بمفتاح Escape، النقر خارج النافذة، ومنع تمرير الصفحة الخلفية.",
    "<template>\n  <UButton label=\"فتح النافذة الإرشادية\" @click=\"isOpen = true\" />\n\n  <UModal v-model=\"isOpen\">\n    <UCard>\n      <template #header>\n        <h3 class=\"font-bold text-white\">مستشار Nuxt UI</h3>\n      </template>\n      <p class=\"text-gray-300\">استفد من مكونات Nuxt UI v3 لبناء واجهات فائقة السرعة والجمال.</p>\n      <template #footer>\n        <UButton color=\"primary\" label=\"فهمت ذلك\" @click=\"isOpen = false\" />\n      </template>\n    </UCard>\n  </UModal>\n</template>\n\n<script setup>\nconst isOpen = ref(false);\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/modal",
    [
      "<UModal v-model=\"isOpen\">: نافذة حوارية منبثقة مع تحكم كامل بالتركيز وخلفية ضبابية.",
      "تغلق تلقائياً عند الضغط على مفتاح Esc أو النقر على الخلفية المعتمة.",
      "تمنع تمرير الصفحة الخلفية تلقائياً أثناء الفتح لضمان تجربة مستخدم نقية."
    ],
    "⚠️ وضع محتوى تفاعلي ثقيل داخل Modal دون تدميره عند الإغلاق. استخدم v-if داخل المودال لتنظيف المحتوى وتوفير الذاكرة.",
    [
      {
        "name": "v-model",
        "type": "boolean",
        "desc": "التحكم في ظهور أو إخفاء النافذة"
      },
      {
        "name": "prevent-close",
        "type": "boolean",
        "desc": "منع الإغلاق عند النقر بالخارج"
      }
    ],
    [
      "<UDrawer>",
      "<UAlert>",
      "<UCard>",
      "<dialog>"
    ]
  ],
  [
    "nuxt",
    "<UPagination>",
    "شريط تقسيم وتصفح الصفحات الرقمي",
    "UPagination nuxt ui pagination pages تصفح صفحات أرقام تقسيم تنقل",
    "مكون تنقل بين الصفحات يقوم بحساب عدد الأزرار الرقمية ومؤشرات الحذف (...) تلقائياً بناءً على إجمالي العناصر والعدد في كل صفحة مع أزرار السابق والتالي.",
    "<template>\n  <UPagination\n    v-model=\"currentPage\"\n    :page-count=\"10\"\n    :total=\"150\"\n    :max=\"5\"\n    color=\"primary\"\n  />\n</template>\n\n<script setup>\nconst currentPage = ref(1);\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/pagination",
    [
      "<UPagination>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { modelValue, total, pageCount, max, color }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { modelValue, total, pageCount, max, color }"
      }
    ],
    [
      "<UTooltip>",
      "<UBadge>",
      "<UAccordion>",
      "<UTabs>"
    ]
  ],
  [
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/progress",
    [
      "<UProgress>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { value, max, color, size, animation }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { value, max, color, size, animation }"
      }
    ],
    [
      "<UBreadcrumb>",
      "<UPagination>",
      "<UAlert>",
      "<UBadge>"
    ]
  ],
  [
    "nuxt",
    "<USelect>",
    "القوائم المنسدلة لاختيار القيم",
    "USelect nuxt ui select dropdown اختيار قائمة منسدلة خيارات تحديد",
    "مكون متناسق لاختيار قيمة مفردة من قائمة خيارات ممررة؛ يدعم تمرير مصفوفات نصوص بسيطة أو كائنات مخصصة بقيم وتسميات وأيقونات محددة.",
    "<template>\n  <USelect\n    v-model=\"selectedRole\"\n    :options=\"roleOptions\"\n    placeholder=\"اختر نوع الصلاحية...\"\n    color=\"primary\"\n    icon=\"i-heroicons-user-group\"\n  />\n</template>\n\n<script setup>\nconst selectedRole = ref('');\nconst roleOptions = [\n  { label: 'مدير النظام (Admin)', value: 'admin' },\n  { label: 'مطور واجهات (Frontend)', value: 'frontend' },\n  { label: 'زائر (Guest)', value: 'guest' }\n];\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/select",
    [
      "<USelect>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { modelValue, options, placeholder, icon, color, disabled }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { modelValue, options, placeholder, icon, color, disabled }"
      }
    ],
    [
      "<UCheckbox>",
      "<UFormField>",
      "<UDropdownMenu>",
      "<UTooltip>"
    ]
  ],
  [
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/skeleton",
    [
      "<USkeleton>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: عنصر واجهة شكلي يقبل فئات Tailwind لتحديد الحجم."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "عنصر واجهة شكلي يقبل فئات Tailwind لتحديد الحجم"
      }
    ],
    [
      "<UTooltip>",
      "<UKbd>",
      "<UFormField>",
      "<UAvatar>"
    ]
  ],
  [
    "nuxt",
    "<USwitch>",
    "مفاتيح التبديل السريع (Toggle Switch)",
    "USwitch nuxt ui switch toggle مفتاح تبديل تشغيل إيقاف وضع ليلي زر",
    "مكون مفتاح تبديل عصري وانسيابي بديل لمربعات الاختيار؛ مثالي لتفعيل أو تعطيل الميزات الفردية، مع دعم كامل للربط بـ v-model وأيقونات داخل زر التبديل.",
    "<template>\n  <USwitch\n    v-model=\"isDarkMode\"\n    color=\"primary\"\n    label=\"الوضع الليلي الزمردي\"\n    checked-icon=\"i-heroicons-moon\"\n    unchecked-icon=\"i-heroicons-sun\"\n  />\n</template>\n\n<script setup>\nconst isDarkMode = ref(true);\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/switch",
    [
      "<USwitch>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { modelValue, label, color, checkedIcon, uncheckedIcon, disabled }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { modelValue, label, color, checkedIcon, uncheckedIcon, disabled }"
      }
    ],
    [
      "<UProgress>",
      "<UModal>",
      "<UButton>",
      "<UInput>"
    ]
  ],
  [
    "nuxt",
    "<UTable>",
    "جداول البيانات المتقدمة وسريعة التفاعل",
    "UTable nuxt ui table data grid جدول بيانات صفوف أعمدة ترتيب تصفية",
    "مكون جداول بيانات متكامل؛ يدعم تحديد الأعمدة، الترتيب (Sorting) التصاعدي والتنازلي، التحديد المتعدد، والتحكم بمحتوى الخلايا عبر الفتحات المخصصة (Slots).",
    "<template>\n  <UTable :rows=\"userRows\" :columns=\"tableColumns\">\n    <!-- تخصيص عرض عمود الحالة بشارة ملونة -->\n    <template #status-data=\"{ row }\">\n      <UBadge :color=\"row.status === 'نشط' ? 'emerald' : 'gray'\">{{ row.status }}</UBadge>\n    </template>\n  </UTable>\n</template>\n\n<script setup>\nconst tableColumns = [\n  { key: 'name', label: 'اسم المطور', sortable: true },\n  { key: 'role', label: 'المكتبة المفضلة' },\n  { key: 'status', label: 'الحالة' }\n];\nconst userRows = [\n  { name: 'حيدر', role: 'Nuxt 3 & Vue', status: 'نشط' },\n  { name: 'سارة', role: 'Tailwind CSS', status: 'نشط' }\n];\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/table",
    [
      "<UTable>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { rows, columns, sort, loading, emptyState }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { rows, columns, sort, loading, emptyState }"
      }
    ],
    [
      "<UAvatar>",
      "<UInput>",
      "<UKbd>",
      "<USkeleton>"
    ]
  ],
  [
    "nuxt",
    "<UTabs>",
    "أشرطة التبويبات والتنقل الأفقي السلس",
    "UTabs nuxt ui tabs navigation تبويبات تنقل أفقي أقسام تبديل محتوى",
    "مكون تبويبات أنيق يفصل المحتوى إلى أقسام فرعية قابلة للتبديل بنقرة واحدة، مع شريط مؤشر متحرك يتبع التبويب النشط بسلاسة ودعم كامل للأيقونات.",
    "<template>\n  <UTabs :items=\"tabItems\" class=\"w-full\">\n    <template #item=\"{ item }\">\n      <div class=\"p-4 bg-slate-900 rounded-xl mt-2 border border-slate-800\">\n        <p>{{ item.content }}</p>\n      </div>\n    </template>\n  </UTabs>\n</template>\n\n<script setup>\nconst tabItems = [\n  { label: 'الكود العملي', icon: 'i-heroicons-code-bracket', content: 'أكواد Vue 3 واضحة ومباشرة.' },\n  { label: 'المقارنة', icon: 'i-heroicons-arrows-right-left', content: 'مقارنة بين Vanilla JS و Vue 3.' }\n];\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/tabs",
    [
      "<UTabs>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { items, defaultIndex, orientation }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { items, defaultIndex, orientation }"
      }
    ],
    [
      "<UAvatar>",
      "<UForm>",
      "<UAlert>",
      "<UCommandPalette>"
    ]
  ],
  [
    "nuxt",
    "<UTextarea>",
    "صناديق النصوص متعددة الأسطر",
    "UTextarea nuxt ui textarea multiline صندوق نص متعدد أسطر تعليق وصف",
    "مكون حقول نصوص متعددة الأسطر يدعم التمدد التلقائي التكيفي (Autoresize) مع كتابة المستخدم، مع تنسيقات حدود وألوان تتناغم تماماً مع حقول UInput.",
    "<template>\n  <UTextarea\n    v-model=\"userNotes\"\n    placeholder=\"اكتب ملاحظاتك البرمجية حول هذا المكون...\"\n    :rows=\"4\"\n    :autoresize=\"true\"\n    color=\"primary\"\n  />\n</template>\n\n<script setup>\nconst userNotes = ref('');\n<\\/script>",
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/textarea",
    [
      "<UTextarea>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { modelValue, rows, autoresize, color, placeholder }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { modelValue, rows, autoresize, color, placeholder }"
      }
    ],
    [
      "<UCommandPalette>",
      "<UButton>",
      "<UProgress>",
      "<UAccordion>"
    ]
  ],
  [
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
    "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً",
    "https://ui.nuxt.com/components/tooltip",
    [
      "<UTooltip>: مكون واجهة مدمج من مكتبة Nuxt UI v3.",
      "يدعم التخصيص عبر الخصائص (Props) والتوافق الكامل مع التصميم الداكن.",
      "القيمة الراجعة والخصائص: props: { text, popper, shortcuts }."
    ],
    "⚠️ تأكد من تمرير الخصائص (Props) بأنواعها الصحيحة، واستخدم ui prop المخصص عند الحاجة لتجاوز أنماط Tailwind المدمجة.",
    [
      {
        "name": "modelValue / prop",
        "type": "any",
        "desc": "البيانات أو الحالة الممررة للمكون"
      },
      {
        "name": "return",
        "type": "Output",
        "desc": "props: { text, popper, shortcuts }"
      }
    ],
    [
      "<UAccordion>",
      "<UBadge>",
      "<UFormField>",
      "<UKbd>"
    ]
  ],
  [
    "html",
    "<a>",
    "روابط التشعب والارتباطات الفائقة",
    "a anchor link href رابط تشعبي صفحة ملاحة انتقال موقع",
    "العنصر الأساسي لشبكة الويب العالمية؛ يُستخدم لإنشاء الروابط التشعبية التي تنقل المستخدم إلى صفحات أخرى، أقسام داخل نفس الصفحة، ملفات للتنزيل، أو روابط بريد إلكتروني.",
    "<template>\n  <div class=\"html-demo p-4 rounded-xl bg-slate-900 border border-slate-800 text-white\">\n    <!-- رابط تشعبي لصفحة خارجية مع معايير الأمان الحديثة -->\n<a\n  href=\"https://ui.nuxt.com\"\n  target=\"_blank\"\n  rel=\"noopener noreferrer\"\n  class=\"text-emerald-400 underline hover:text-emerald-300\"\n>\n  زيارة توثيق Nuxt UI الرسمي ↗\n</a>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst status = ref('نشط')\n<\\/script>",
    "<a href=\"url\" [target=\"_blank\"] [rel=\"...\"]>نص الرابط</a>",
    "وسم مزدوج <a>...</a> يحتاج إغلاقاً صريحاً",
    "جميع المتصفحات (معيار HTML الأصلي)",
    [
      "التنقل بين الصفحات والمسارات في المواقع والمنصات",
      "إنشاء أزرار تحميل الملفات المباشرة download=\"filename.pdf\"",
      "القفز إلى عناوين وأقسام محددة داخل نفس الصفحة عبر href=\"#sectionId\""
    ],
    "html_link",
    "<!-- رابط تشعبي لصفحة خارجية مع معايير الأمان الحديثة -->\n<a\n  href=\"https://ui.nuxt.com\"\n  target=\"_blank\"\n  rel=\"noopener noreferrer\"\n  class=\"text-emerald-400 underline hover:text-emerald-300\"\n>\n  زيارة توثيق Nuxt UI الرسمي ↗\n</a>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a",
    [
      "<a>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<a href=\"url\" [target=\"_blank\"] [rel=\"...\"]>نص الرابط</a>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <a>...</a> يحتاج إغلاقاً صريحاً"
      }
    ],
    [
      "<video>",
      "<audio>",
      "<details> / <summary>",
      "<label>"
    ]
  ],
  [
    "html",
    "<audio>",
    "تضمين وتشغيل المقاطع الصوتية",
    "audio sound player mp3 صوت مقطع مشغل استماع وسائط",
    "عنصر HTML5 القياسي لتضمين وتشغيل الملفات والمقاطع الصوتية مباشرة في المتصفح دون الحاجة لمشغلات فلاش قديمة، مع دعم خيارات التحكم (controls) والتشغيل التلقائي والتكرار.",
    "<template>\n  <audio ref=\"audioRef\" :src=\"currentTrackUrl\" @ended=\"nextTrack\" controls />\n</template>",
    "<audio controls [autoplay] [loop] [muted]> <source src=\"...\" type=\"...\" /> </audio>",
    "وسم مزدوج <audio>...</audio> يتضمن وسوم <source>",
    "جميع المتصفحات الحديثة",
    [
      "تشغيل النطق الصوتي الصحيح للمصطلحات البرمجية باللغة الإنجليزية",
      "تضمين حلقات البودكاست والمؤثرات الصوتية للألعاب التفاعلية",
      "تطوير مشغلات موسيقى مخصصة عبر JavaScript Audio API"
    ],
    "html_audio",
    "<audio controls class=\"w-full max-w-md\">\n  <source src=\"https://example.com/audio/pronunciation.mp3\" type=\"audio/mpeg\">\n  <source src=\"https://example.com/audio/pronunciation.ogg\" type=\"audio/ogg\">\n  متصفحك لا يدعم مشغل الصوت المدمج.\n</audio>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio",
    [
      "<audio>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<audio controls [autoplay] [loop] [muted]> <source src=\"...\" type=\"...\" /> </audio>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <audio>...</audio> يتضمن وسوم <source>"
      }
    ],
    [
      "<video>",
      "class",
      "<button>",
      "<details> / <summary>"
    ]
  ],
  [
    "html",
    "<button>",
    "أزرار الإجراءات التفاعلية القياسية",
    "button click form submit زر إجراء نقر إرسال تنفيذ أمر",
    "العنصر الدلالي الأساسي لإطلاق الإجراءات التفاعلية وإرسال النماذج؛ يتميز بدعمه التلقائي لإمكانية الوصول (Accessibility)، والتنقل عبر زر Tab، وتنشيطه بمفتاحي المسافة و Enter.",
    "<template>\n  <button @click=\"count++\" class=\"btn-emerald\">العدد: {{ count }}</button>\n</template>",
    "<button type=\"button|submit|reset\" [disabled]>نص الزر</button>",
    "وسم مزدوج <button>...</button> يحتاج إغلاقاً صريحاً",
    "كافة المتصفحات العالمية",
    [
      "إرسال استمارات تسجيل الدخول والدفع type=\"submit\"",
      "فتح وإغلاق النوافذ المنبثقة والقوائم المنسدلة",
      "تشغيل العمليات الحسابية وتعديل الحالات في واجهات المستخدم"
    ],
    "html_button",
    "<!-- زر إرسال مع حالات التعطيل والأمان الدلالي -->\n<button\n  type=\"button\"\n  onclick=\"alert('تم تفعيل الزر!')\"\n  class=\"px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:bg-emerald-400\"\n>\n  تنفيذ الأمر التفاعلي\n</button>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button",
    [
      "<button>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<button type=\"button|submit|reset\" [disabled]>نص الزر</button>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <button>...</button> يحتاج إغلاقاً صريحاً"
      }
    ],
    [
      "<details> / <summary>",
      "<div>",
      "<img>",
      "class"
    ]
  ],
  [
    "html",
    "<canvas>",
    "مساحة الرسم النقطي ثنائي وثلاثي الأبعاد",
    "canvas 2d 3d webgl graphics رسم نقطي جرافيكس مخططات ألعاب رسومات",
    "عنصر رائع يوفر لوحة رسم فارغة يمكن التحكم في كل بكسل فيها برمجياً عبر JavaScript لإنشاء المخططات البيانية، الرسوم المتحركة، الألعاب، ومعالجة الصور في الوقت الفعلي (WebGL).",
    "<template>\n  <canvas ref=\"chartCanvas\"></canvas>\n</template>\n<script setup>\nconst chartCanvas = ref(null);\nonMounted(() => initChart(chartCanvas.value));\n<\\/script>",
    "<canvas width=\"pixelWidth\" height=\"pixelHeight\">رسالة بديلة</canvas>",
    "وسم مزدوج <canvas>...</canvas> يتطلب إغلاقاً",
    "كافة المتصفحات الحديثة",
    [
      "رسم المخططات البيانية المعقدة والمؤشرات الحية (مثل Chart.js)",
      "بناء ألعاب المتصفح التفاعلية والتطبيقات ثنائية وثلاثية الأبعاد",
      "تطبيق الفلاتر وقص وضغط الصور محلياً داخل المتصفح"
    ],
    "html_canvas",
    "<canvas id=\"myCanvas\" width=\"300\" height=\"150\" class=\"border border-emerald-500 rounded\"></canvas>\n\n<script>\nconst canvas = document.getElementById('myCanvas');\nif (canvas) {\n  const ctx = canvas.getContext('2d');\n  ctx.fillStyle = '#00DC82';\n  ctx.fillRect(20, 20, 100, 80);\n}\n<\\/script>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas",
    [
      "<canvas>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<canvas width=\"pixelWidth\" height=\"pixelHeight\">رسالة بديلة</canvas>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <canvas>...</canvas> يتطلب إغلاقاً"
      }
    ],
    [
      "<a>",
      "<iframe>",
      "<audio>",
      "<span>"
    ]
  ],
  [
    "html",
    "class",
    "سمة التجميع والتنسيق الفئوية",
    "class attribute styling selector فئة صنف تنسيق محدد تجميع سمة",
    "السمة الأكثر استخداماً في HTML عالمياً؛ تسمح بتعيين اسم فئة أو أكثر لعنصر ما لاستهدافه عبر محددات CSS (.className) أو تفعيل فئات أطر العمل مثل Tailwind CSS وربطه بـ JavaScript.",
    "<template>\n  <div :class=\"{ 'bg-emerald-500': isPrimary, 'opacity-50': isDisabled }\">محتوى</div>\n</template>",
    "class=\"class1 class2 class3\"",
    "سمة عامة (Global Attribute) يمكن تطبيقها على أي وسم HTML",
    "جميع المتصفحات وأطر عمل الويب",
    [
      "تطبيق تنسيقات CSS ومكتبات الأنماط الخدمية مثل Tailwind CSS",
      "استهداف العناصر وتجميعها في JavaScript عبر getElementsByClassName و querySelectorAll",
      "تبديل الحالات البصرية (مثل .active و .dark و .hidden)"
    ],
    "html_class",
    "<!-- تطبيق أصناف متعددة من Tailwind CSS -->\n<div class=\"p-4 rounded-xl bg-slate-900 border border-emerald-500/20 shadow-lg\">\n  <h4 class=\"text-emerald-400 font-bold\">بطاقة منسقة عبر سمة class</h4>\n</div>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class",
    [
      "class: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "class=\"class1 class2 class3\""
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "سمة عامة (Global Attribute) يمكن تطبيقها على أي وسم HTML"
      }
    ],
    [
      "<input>",
      "<table>",
      "<h1>-<h6>",
      "<dialog>"
    ]
  ],
  [
    "html",
    "<details> / <summary>",
    "الأكورديون الدلالي الأصيل بدون جافاسكريبت",
    "details summary accordion collapse كشف طي توسيع أصيل بدون كود دلالي",
    "وسم HTML5 دلالي متألق يسمح بإنشاء أقسام قابلة للطي والتوسيع (Native Accordion) وتتفاعل ذاتياً بالكامل بنقرة واحدة من المستخدم دون الحاجة لكتابة سطر واحد من JavaScript.",
    "<template>\n  <!-- يعمل بشكل طبيعي وتلقائي 100% -->\n  <details :open=\"isOpen\">\n    <summary>عرض التفاصيل</summary>\n    <p>المحتوى</p>\n  </details>\n</template>",
    "<details [open]> <summary>عنوان القسم</summary> المحتوى المخفي </details>",
    "وسوم مزدوجة <details> و <summary> تتطلب إغلاقاً",
    "جميع المتصفحات الحديثة",
    [
      "إنشاء أقسام تفاصيل الدفع والشروط دون الحاجة لمكتبات واجهة إضافية",
      "بناء الأسئلة الشائعة الخفيفة والسريعة الصديقة لمحركات البحث (SEO)",
      "عرض التفاصيل التقنية للأخطاء وتفاصيل الاستجابات في أدوات المطورين"
    ],
    "html_details",
    "<details class=\"p-3 bg-slate-900 rounded-lg border border-slate-800 text-gray-200\">\n  <summary class=\"font-bold cursor-pointer text-emerald-400 select-none\">\n    ما هي ميزة VueLexicon Pro الكبرى؟\n  </summary>\n  <p class=\"mt-2 text-sm text-gray-400 leading-relaxed\">\n    توفير قاعدة بيانات شاملة لأكثر من 150 مصطلحاً ومكوناً مع تجارب حية فورية ومقارنات عملية.\n  </p>\n</details>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details",
    [
      "<details> / <summary>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<details [open]> <summary>عنوان القسم</summary> المحتوى المخفي </details>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسوم مزدوجة <details> و <summary> تتطلب إغلاقاً"
      }
    ],
    [
      "<option>",
      "<a>",
      "<section>",
      "class"
    ]
  ],
  [
    "html",
    "<dialog>",
    "النوافذ الحوارية الدلالية الأصلية بالمتصفح",
    "dialog modal popup native نافذة حوارية أصيلة منبثقة دلالية متصفح طبقة",
    "العنصر القياسي الرسمي في HTML5 لإنشاء النوافذ المنبثقة والحوارية؛ يوفر دوال متصفح مدمجة مثل showModal() و close() مع تعتيم خلفي أصلي (::backdrop) دون أي مكتبات مساعدة.",
    "<template>\n  <dialog ref=\"nativeDialog\">\n    <button @click=\"nativeDialog?.close()\">إغلاق</button>\n  </dialog>\n</template>",
    "<dialog [open]> ... </dialog>",
    "وسم مزدوج <dialog>...</dialog> يوفر واجهات DOM برمجية (showModal, close)",
    "جميع المتصفحات الحديثة (Chromium, Firefox, Safari)",
    [
      "إنشاء نوافذ التحقق من العمليات الحساسة دون الاعتماد على مكتبات خارجية",
      "الاستفادة من إغلاق النافذة التلقائي بمفتاح Escape وإدارة التركيز المدمجة",
      "بناء نماذج سريعة منبثقة وتأكيدات الحذف"
    ],
    "html_dialog",
    "<dialog id=\"demoDialog\" class=\"p-6 rounded-2xl bg-slate-900 text-white border border-emerald-500 backdrop:bg-black/70\">\n  <h3 class=\"text-lg font-bold text-emerald-400\">نافذة حوار أصلية بالمتصفح!</h3>\n  <p class=\"mt-2 text-gray-300\">تُغلق تلقائياً عند الضغط على Escape.</p>\n  <button onclick=\"document.getElementById('demoDialog').close()\" class=\"mt-4 text-sm text-emerald-300\">\n    إغلاق النافذة\n  </button>\n</dialog>\n\n<button onclick=\"document.getElementById('demoDialog').showModal()\">فتح الحوار</button>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog",
    [
      "<dialog ref=\"el\">: عنصر HTML5 أصلي للنوافذ المنبثقة المشروطة (Modals).",
      "el.showModal(): فتح النافذة في الطبقة العليا (Top Layer) مع تعتيم تلقائي للخلفية عبر ::backdrop.",
      "el.close(): إغلاق النافذة برمجياً مع دعم زر Escape من لوحة المفاتيح افتراضياً."
    ],
    "⚠️ استخدام el.show() بدلاً من el.showModal(). الطريقة show() تفتح النافذة كعنصر عادي دون خلفية معتمة ولا تحبس التركيز (Focus Trap).",
    [
      {
        "name": "open",
        "type": "boolean",
        "desc": "خاصية تحدد حالة الظهور"
      }
    ],
    [
      "<UModal>",
      "<div>",
      "<button>",
      "<form>"
    ]
  ],
  [
    "html",
    "<div>",
    "الحاوية العامة لتقسيم الكتل وتجميع العناصر",
    "div division container wrapper حاوية عامة تجميع كتلة تقسيم هيكل",
    "العنصر الأكثر استخداماً لتقسيم الكتل وتجميع العناصر في مستند HTML؛ لا يحمل أي معنى دلالي خاص بذاته، ويُستخدم كحاوية لتطبيق التنسيقات بواسطة CSS وشبكات Flexbox و Grid.",
    "<template>\n  <div class=\"grid grid-cols-2 gap-4\">...</div>\n</template>",
    "<div>محتوى الحاوية</div>",
    "وسم مزدوج <div>...</div> يحتاج إغلاقاً صريحاً",
    "كافة المتصفحات بدون استثناء",
    [
      "تجميع عناصر الواجهة لتطبيق تخطيطات Flexbox و CSS Grid عليها",
      "إنشاء البطاقات، الألواح، والأسطح الزجاجية في التصاميم الحديثة",
      "تغليف العناصر لتطبيق تأثيرات التدرج والظلال عليها"
    ],
    "html_div",
    "<div class=\"flex items-center justify-between p-4 bg-slate-800 rounded-xl\">\n  <span class=\"text-white font-medium\">إجمالي المصطلحات:</span>\n  <span class=\"text-emerald-400 font-bold\">+150</span>\n</div>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
    [
      "<div>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<div>محتوى الحاوية</div>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <div>...</div> يحتاج إغلاقاً صريحاً"
      }
    ],
    [
      "<audio>",
      "<canvas>",
      "<main>",
      "<template>"
    ]
  ],
  [
    "html",
    "<form>",
    "حاويات النماذج والاستمارات التفاعلية",
    "form submit input action نموذج استمارة إرسال حقول بيانات تحقق",
    "عنصر تجميع حقول الإدخال والتحكم؛ يدير آلية إرسال البيانات (Submit) إلى الخادم أو التعامل معها محلياً في تطبيقات SPA مع دعم تفعيل الفحص التلقائي لمدخلات المستخدم.",
    "<template>\n  <form @submit.prevent=\"handleSubmit\">\n    <input v-model=\"formData.name\" />\n    <button type=\"submit\">حفظ</button>\n  </form>\n</template>",
    "<form [action=\"url\"] [method=\"POST|GET\"]> ... </form>",
    "وسم مزدوج <form>...</form> يحتاج إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "إرسال نماذج تسجيل الدخول، إنشاء الحساب، والاتصال بنا",
      "تمكين إرسال النموذج بالضغط على مفتاح Enter من أي حقل إدخال بداخله",
      "تطبيق قواعد التحقق من الصحة (HTML5 Form Validation)"
    ],
    "html_form",
    "<form onsubmit=\"event.preventDefault(); alert('تم إرسال النموذج!');\" class=\"space-y-3\">\n  <input type=\"text\" placeholder=\"اسمك الكريم\" required class=\"p-2 rounded bg-slate-900 border text-white\" />\n  <button type=\"submit\" class=\"px-4 py-2 bg-emerald-500 rounded font-bold text-slate-950\">إرسال</button>\n</form>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
    [
      "<form @submit.prevent=\"save\">: نموذج تجميع ومعالجة مدخلات المستخدم.",
      "@submit.prevent: منع إعادة تحميل الصفحة الافتراضية في تطبيقات الصفحة الواحدة (SPA).",
      "تفعيل التحقق التلقائي المدمج في المتصفح لسمات required و type و pattern."
    ],
    "⚠️ نسيان كتابة type=\"button\" على الأزرار العادية داخل النموذج، مما يجعل المتصفح يعتبرها submit بالافتراضي ويرسل النموذج عن طريق الخطأ.",
    [
      {
        "name": "action",
        "type": "string",
        "desc": "رابط الخادم المستهدف"
      },
      {
        "name": "method",
        "type": "string",
        "desc": "طريقة الإرسال (GET أو POST)"
      }
    ],
    [
      "<input>",
      "<button>",
      "<select>",
      "<UForm>"
    ]
  ],
  [
    "html",
    "<h1>-<h6>",
    "عناوين المستند الهرمية والتنظيمية",
    "h1 h2 h3 h4 h5 h6 headings عناوين هرمية سيو ترتيب نصوص مستند",
    "ستة مستويات من العناوين الهيكلية للدلالة على الأهمية النسبية لأقسام الصفحة (h1 هو العنوان الرئيسي الأهم، يليه h2 فالأصغر)، وتلعب دوراً حاسماً في إمكانية الوصول وتهيئة محركات البحث (SEO).",
    "<template>\n  <h1 class=\"text-4xl font-black text-emerald-400\">{{ pageTitle }}</h1>\n</template>",
    "<h1>العنوان الرئيسي</h1> ... <h6>العنوان الفرعي الأدنى</h6>",
    "وسوم مزدوجة <hX>...</hX> تتطلب إغلاقاً صريحاً",
    "كافة المتصفحات والأجهزة القارئة للشاشة",
    [
      "تعريف عنوان الصفحة الرئيسي والفريد h1 لتعزيز نتائج محركات البحث",
      "تنظيم المقالات الطويلة وتسهيل قراءتها على المستخدمين",
      "مساعدة قارئات الشاشة في بناء جدول محتويات صوتي للمستخدمين ذوي الإعاقة"
    ],
    "html_heading",
    "<h1 class=\"text-3xl font-extrabold text-emerald-400\">VueLexicon Pro</h1>\n<h2 class=\"text-xl font-bold text-white mt-2\">المعجم الشامل لمطوري الويب</h2>\n<h3 class=\"text-base font-semibold text-gray-300\">مكتبة Nuxt UI و Vue 3</h3>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
    [
      "<h1>-<h6>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<h1>العنوان الرئيسي</h1> ... <h6>العنوان الفرعي الأدنى</h6>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسوم مزدوجة <hX>...</hX> تتطلب إغلاقاً صريحاً"
      }
    ],
    [
      "<form>",
      "<audio>",
      "<nav>",
      "<main>"
    ]
  ],
  [
    "html",
    "<header> / <footer>",
    "الترويسة والذيل الدلاليان للمستند والأقسام",
    "header footer semantic ترويسة ذيل رأس صفحة تذييل دلالي",
    "وسمان دلاليان يعبران عن مقدمة المستند أو القسم (header، وعادة ما يحتوي على الشعار وشريط التنقل) ونهايته (footer، ويحتوي على حقوق النشر، روابط الخصوصية، ومعلومات الاتصال).",
    "<template>\n  <header class=\"sticky top-0 z-40 backdrop-blur\">...</header>\n</template>",
    "<header> ... </header> | <footer> ... </footer>",
    "وسوم دلالية مزدوجة تحتاج إغلاقاً",
    "كافة المتصفحات الحديثة",
    [
      "تنظيم الهيكل العام للموقع وتحسين قراءته من قبل محركات البحث",
      "تثبيت شريط الهيدر أعلى الشاشة (Sticky Header) أثناء التمرير",
      "تضمين شروط الاستخدام وروابط التواصل الاجتماعي داخل الذيل"
    ],
    "html_layout",
    "<header class=\"border-b border-emerald-500/20 p-4 flex justify-between items-center bg-slate-950/80\">\n  <h1 class=\"text-emerald-400 font-bold\">VueLexicon Pro</h1>\n  <nav class=\"space-x-4 space-x-reverse text-sm text-gray-300\">\n    <a href=\"#\">الرئيسية</a>\n    <a href=\"#\">المصطلحات</a>\n  </nav>\n</header>\n\n<footer class=\"p-4 text-center text-xs text-gray-500\">\n  © 2026 VueLexicon Pro. جميع الحقوق محفوظة.\n</footer>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header",
    [
      "<header> / <footer>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<header> ... </header> | <footer> ... </footer>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسوم دلالية مزدوجة تحتاج إغلاقاً"
      }
    ],
    [
      "<audio>",
      "<canvas>",
      "<template>",
      "<option>"
    ]
  ],
  [
    "html",
    "<iframe>",
    "تضمين صفحات ومستندات الويب المتداخلة",
    "iframe embed sandbox تضمين إطار متداخل فيديو صفحة خارجية",
    "عنصر يسمح بتضمين مستند HTML خارجي كامل داخل الصفحة الحالية، مثل تضمين مقاطع YouTube، الخرائط التفاعلية لـ Google Maps، أو مساحات تجربة الأكواد التفاعلية.",
    "<template>\n  <iframe :src=\"externalPreviewUrl\" class=\"w-full h-96\" />\n</template>",
    "<iframe src=\"url\" title=\"description\" [sandbox=\"...\"]></iframe>",
    "وسم مزدوج <iframe></iframe> يتطلب إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "تضمين مقاطع الفيديو من منصات البث مثل Vimeo و YouTube",
      "عرض المعاينات الحية المعزولة للأكواد وتجارب المستخدمين",
      "دمج بوابات الدفع الإلكترونية المصرفية الآمنة"
    ],
    "html_iframe",
    "<iframe\n  src=\"https://www.wikipedia.org\"\n  title=\"ويكيبيديا\"\n  width=\"100%\"\n  height=\"200\"\n  sandbox=\"allow-scripts allow-same-origin\"\n  class=\"rounded-xl border border-slate-700\"\n></iframe>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe",
    [
      "<iframe>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<iframe src=\"url\" title=\"description\" [sandbox=\"...\"]></iframe>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <iframe></iframe> يتطلب إغلاقاً"
      }
    ],
    [
      "<ul> / <li>",
      "<main>",
      "<div>",
      "<form>"
    ]
  ],
  [
    "html",
    "<img>",
    "تضمين وعرض الصور والرسومات",
    "img image src alt صورة تضمين رسومات وسائط تحميل",
    "عنصر ذاتي الإغلاق مخصص لعرض الصور في الصفحة؛ يُعد تحديد خاصية alt إلزامياً لضمان إمكانية الوصول ولتوضيح محتوى الصورة في حال تعذر تحميلها أو لمحركات البحث.",
    "<template>\n  <img :src=\"item.imageUrl\" :alt=\"item.title\" loading=\"lazy\" />\n</template>",
    "<img src=\"imageUrl\" alt=\"alternativeText\" [loading=\"lazy\"] />",
    "وسم ذاتي الإغلاق (Void Element) لا يحتاج وسم إغلاق منفصل",
    "كافة المتصفحات بلا استثناء",
    [
      "عرض الصور التوضيحية والشعارات وصور المنتجات في المتاجر",
      "استخدام خاصية loading=\"lazy\" لتأخير تحميل الصور حتى يقترب تمريرها",
      "توفير صور متجاوبة عبر srcset لمختلف أحجام الشاشات"
    ],
    "html_image",
    "<img\n  src=\"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400\"\n  alt=\"خلفية فنية متدرجة بألوان داكنة\"\n  loading=\"lazy\"\n  class=\"w-full max-w-xs rounded-xl shadow-lg border border-emerald-500/30\"\n/>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img",
    [
      "<img>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<img src=\"imageUrl\" alt=\"alternativeText\" [loading=\"lazy\"] />"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم ذاتي الإغلاق (Void Element) لا يحتاج وسم إغلاق منفصل"
      }
    ],
    [
      "<video>",
      "<details> / <summary>",
      "<iframe>",
      "<canvas>"
    ]
  ],
  [
    "html",
    "<input>",
    "حقول الإدخال والتقاط بيانات المستخدم",
    "input form text number checkbox حقل إدخال نص رقم مربع نموذج",
    "العنصر الأكثر مرونة وتنوعاً في بناء النماذج؛ يتحول سلوكه ومظهره بالكامل بناءً على قيمة خاصية type المحددة له (مثل text, number, email, password, checkbox, radio, file, date).",
    "<template>\n  <input v-model=\"searchTerm\" placeholder=\"ابحث...\" />\n</template>",
    "<input type=\"text|email|password|...\" [placeholder=\"...\"] [value=\"...\"] />",
    "وسم ذاتي الإغلاق (Void Element)",
    "كافة المتصفحات العالمية",
    [
      "استقبال مدخلات المستخدم في محركات البحث والتصفية",
      "إدخال البيانات المالية والأرقام بدقة مع type=\"number\"",
      "رفع الملفات والمستندات عبر المتصفح باستخدام type=\"file\""
    ],
    "html_input",
    "<!-- حقل إدخال نصي مع خاصية الإكمال التلقائي -->\n<input\n  type=\"text\"\n  placeholder=\"اكتب مصطلحك هنا...\"\n  class=\"px-4 py-2 bg-slate-900 border border-emerald-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400\"\n/>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
    [
      "<input>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<input type=\"text|email|password|...\" [placeholder=\"...\"] [value=\"...\"] />"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم ذاتي الإغلاق (Void Element)"
      }
    ],
    [
      "<a>",
      "<nav>",
      "<header> / <footer>",
      "<img>"
    ]
  ],
  [
    "html",
    "<label>",
    "العناوين التوضيحية لحقول الإدخال",
    "label form accessibility تسمية وسم حقل توضيح سهولة وصول نقر",
    "عنصر دلالي يمثل تسمية توضيحية لعنصر إدخال في النموذج؛ يزيد من مساحة النقر المفيدة بحيث يؤدي النقر على النص داخل label إلى تنشيط حقل الإدخال المقترن به تلقائياً.",
    "<template>\n  <label :for=\"fieldId\">{{ labelText }}</label>\n</template>",
    "<label for=\"inputId\">النص التوضيحي</label>",
    "وسم مزدوج <label>...</label> يحتاج إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "تحسين تجربة الاستخدام بتوسيع مساحة النقر على مربعات الاختيار الصغيرة",
      "تمكين قارئات الشاشة للمكفوفين من نطق وصف الحقل فور الوقوف عليه",
      "تنظيم وتنسيق عناصر استمارات تسجيل البيانات"
    ],
    "html_label",
    "<!-- ربط التسمية بالحقل عبر خاصية for المطابقة لـ id الحقل -->\n<div class=\"flex items-center gap-2\">\n  <input type=\"checkbox\" id=\"termsCheck\" class=\"accent-emerald-500\" />\n  <label for=\"termsCheck\" class=\"text-sm text-gray-300 cursor-pointer select-none\">\n    أوافق على الشروط والأحكام (انقر على النص للتفعيل)\n  </label>\n</div>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
    [
      "<label>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<label for=\"inputId\">النص التوضيحي</label>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <label>...</label> يحتاج إغلاقاً"
      }
    ],
    [
      "<audio>",
      "<a>",
      "<option>",
      "<table>"
    ]
  ],
  [
    "html",
    "<main>",
    "المحتوى الجوهري الأساسي للمستند",
    "main semantic accessibility محتوى أساسي جوهري مستند صفحة دلالي",
    "عنصر دلالي مخصص لاحتواء المحتوى الرئيسي والفريد لصفحة الويب؛ يجب ألا يتكرر في نفس المستند أكثر من مرة واحدة، ويستثني المحتويات المكررة كالأشرطة الجانبية وقوائم الهيدر والفوتر.",
    "<template>\n  <main class=\"flex-1\">\n    <router-view />\n  </main>\n</template>",
    "<main> المحتوى الأساسي </main>",
    "وسم دلالي مزدوج يتطلب إغلاقاً",
    "كافة المتصفحات الحديثة",
    [
      "توجيه محركات البحث بدقة إلى المحتوى الفريد الذي تمثله الصفحة",
      "تسهيل قفز قارئات الشاشة مباشرة للمحتوى الأساسي (Skip to main content)",
      "فصل الهيكل الجوهري عن الأشرطة الثابتة في التصميم"
    ],
    "html_main",
    "<main class=\"container mx-auto px-4 py-8\">\n  <h1 class=\"text-2xl font-bold text-white\">لوحة التحكم التفاعلية</h1>\n  <p class=\"text-gray-400 mt-2\">المحتوى الجوهري الخاص بهذه الصفحة تحديداً.</p>\n</main>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main",
    [
      "<main>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<main> المحتوى الأساسي </main>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم دلالي مزدوج يتطلب إغلاقاً"
      }
    ],
    [
      "<canvas>",
      "<button>",
      "<select>",
      "<iframe>"
    ]
  ],
  [
    "html",
    "<nav>",
    "أشرطة وروابط الملاحة والتنقل",
    "nav navigation links ملاحة تنقل قائمة روابط هيدر",
    "عنصر دلالي يحدد قسماً في الصفحة يحتوي على روابط الملاحة الأساسية للتنقل بين صفحات الموقع أو الانتقال بين أقسام الصفحة الطويلة.",
    "<template>\n  <nav class=\"flex items-center space-x-2\">\n    <NuxtLink to=\"/\">الرئيسية</NuxtLink>\n  </nav>\n</template>",
    "<nav> <a href=\"...\">...</a> </nav>",
    "وسم دلالي مزدوج يتطلب إغلاقاً",
    "كافة المتصفحات الحديثة",
    [
      "بناء القوائم الرئيسية وأشرطة الهيدر للتنقل",
      "إنشاء أشرطة الحروف الأبجدية A-Z للتصفية الملاحية",
      "تحسين فهم محركات البحث للروابط الهيكلية الأهم في موقعك"
    ],
    "html_nav",
    "<nav class=\"flex gap-4 p-3 bg-slate-900 rounded-lg text-sm text-gray-300\">\n  <a href=\"#\" class=\"text-emerald-400 font-bold\">الرئيسية</a>\n  <a href=\"#\" class=\"hover:text-white\">المصطلحات</a>\n  <a href=\"#\" class=\"hover:text-white\">معمل Nuxt UI</a>\n</nav>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav",
    [
      "<nav>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<nav> <a href=\"...\">...</a> </nav>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم دلالي مزدوج يتطلب إغلاقاً"
      }
    ],
    [
      "<canvas>",
      "<label>",
      "<audio>",
      "<ul> / <li>"
    ]
  ],
  [
    "html",
    "<option>",
    "خيارات القوائم المنسدلة",
    "option select dropdown خيار قائمة منسدلة عنصر تحديد قيمة",
    "يُستخدم داخل عناصر <select> أو <datalist> لتمثيل خيار فردي متاح يمكن للمستخدم اختياره، مع تحديد قيمة value التي تُرسل برمجياً والنص المقروء للمستخدم.",
    "<template>\n  <option v-for=\"opt in options\" :key=\"opt.val\" :value=\"opt.val\">\n    {{ opt.label }}\n  </option>\n</template>",
    "<option value=\"val\" [selected] [disabled]>نص الخيار</option>",
    "وسم مزدوج <option>...</option>",
    "كافة المتصفحات العالمية",
    [
      "توفير عناصر اختيار اللغات والبلدان في النماذج",
      "تحديد خيارات الفلترة والتصنيف في القوائم المنسدلة",
      "تزويد قوائم الإكمال التلقائي datalist بالخيارات المقترحة"
    ],
    "html_select",
    "<select class=\"bg-slate-900 text-white p-2 rounded border border-slate-700\">\n  <option value=\"\" disabled selected>اختر لغة البرمجة المفضلة...</option>\n  <option value=\"js\">JavaScript (ES6+)</option>\n  <option value=\"vue\">Vue.js 3</option>\n  <option value=\"nuxt\">Nuxt UI</option>\n</select>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option",
    [
      "<option>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<option value=\"val\" [selected] [disabled]>نص الخيار</option>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <option>...</option>"
      }
    ],
    [
      "<main>",
      "<template>",
      "<audio>",
      "<ul> / <li>"
    ]
  ],
  [
    "html",
    "<p>",
    "الفقرات النصية الإنشائية",
    "p paragraph text فقرة نصية نص شرح وصف مقال",
    "العنصر الدلالي القياسي لكتابة الفقرات النصية في الويب؛ يوفر افتراضياً هوامش علوية وسفلية مناسبة للقراءة ويفصل الكتل النصية بوضوح وفق معايير الطباعة.",
    "<template>\n  <p class=\"text-slate-300\">{{ item.description }}</p>\n</template>",
    "<p>نص الفقرة هنا...</p>",
    "وسم مزدوج <p>...</p> يتطلب إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "كتابة شروحات المصطلحات والفقرات التوضيحية للمكونات",
      "عرض نصوص المقالات والمشاركات والتعليقات",
      "عرض رسائل المساعدة والإرشادات التوجيهية في النماذج"
    ],
    "html_paragraph",
    "<p class=\"text-gray-300 leading-relaxed text-sm\">\n  يُعد VueLexicon Pro بوابتك الذكية لفهم أدق تفاصيل منظومة Vue و Nuxt ومفاهيم JavaScript الحديثة.\n</p>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p",
    [
      "<p>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<p>نص الفقرة هنا...</p>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <p>...</p> يتطلب إغلاقاً"
      }
    ],
    [
      "<a>",
      "<button>",
      "<div>",
      "<nav>"
    ]
  ],
  [
    "html",
    "<section>",
    "الأقسام الدلالية المستقلة ذات الموضوع الموحد",
    "section semantic division قسم مستقل موضوع موحد دلالي جزء صفحة",
    "عنصر دلالي يعبر عن قسم مستقل موضوعياً في المستند (مثل قسم من نحن، قسم الميزات، أو قسم شريط البحث الذكي) وعادة ما يبدأ بعنوان h2-h6 خاص به.",
    "<template>\n  <section aria-labelledby=\"section-title\">...</section>\n</template>",
    "<section> <h2>عنوان القسم</h2> ... </section>",
    "وسم دلالي مزدوج يتطلب إغلاقاً",
    "كافة المتصفحات الحديثة",
    [
      "تقسيم صفحات الهبوط (Landing Pages) إلى قطاعات موضوعية متناسقة",
      "فصل مناطق العمل الرئيسية في التطبيق (قسم البحث، قسم الفهرس، قسم التفاصيل)",
      "تحسين دلالات السيو والتسلسل المنطقي لصفحات الويب"
    ],
    "html_section",
    "<section class=\"py-6 px-4 bg-slate-900/50 rounded-2xl border border-slate-800\">\n  <h2 class=\"text-xl font-bold text-emerald-400 mb-2\">قسم مستشار Nuxt UI</h2>\n  <p class=\"text-gray-400 text-sm\">استكشف مكونات مكتبة واجهة المستخدم الأكثر تطوراً.</p>\n</section>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section",
    [
      "<section>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<section> <h2>عنوان القسم</h2> ... </section>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم دلالي مزدوج يتطلب إغلاقاً"
      }
    ],
    [
      "<audio>",
      "<main>",
      "<div>",
      "<dialog>"
    ]
  ],
  [
    "html",
    "<select>",
    "القوائم المنسدلة القياسية للاختيار",
    "select dropdown form اختيار قائمة منسدلة نموذج تحديد خيارات",
    "عنصر نموذج أصيل يتيح للمستخدم اختيار قيمة واحدة أو أكثر من قائمة خيارات منسدلة باستخدام وسوم <option> الداخلية، ويدعم التخصيص الكامل لحدث onChange.",
    "<template>\n  <select v-model=\"activeCategory\">\n    <option value=\"all\">الكل</option>\n  </select>\n</template>",
    "<select [name=\"...\"] [multiple]> <option ...>...</option> </select>",
    "وسم مزدوج <select>...</select> يحتاج إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "اختيار العملات واللغات في شريط الهيدر",
      "تصفية وفرز البيانات حسب الأحدث أو الأعلى تقييماً",
      "اختيار الفئات الرئيسية في استمارات إنشاء المحتوى"
    ],
    "html_select",
    "<select class=\"px-3 py-2 bg-slate-900 border border-emerald-500/40 rounded-lg text-white\">\n  <option value=\"all\">عرض جميع الأقسام</option>\n  <option value=\"vue\">Vue.js 3</option>\n  <option value=\"nuxt\">Nuxt UI</option>\n</select>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select",
    [
      "<select>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<select [name=\"...\"] [multiple]> <option ...>...</option> </select>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <select>...</select> يحتاج إغلاقاً"
      }
    ],
    [
      "<canvas>",
      "<a>",
      "<section>",
      "<img>"
    ]
  ],
  [
    "html",
    "<span>",
    "الحاوية النصية السطرية المدمجة (Inline)",
    "span inline container حاوية سطرية نص مدمج تلوين جزء نص",
    "حاوية نصية سطرية (Inline) لا تحمل دلالة خاصة؛ تُستخدم لعزل وتنسيق كلمة أو جزء صغير من النص داخل فقرة دون كسر السطر وتوليد سطر جديد مثل div.",
    "<template>\n  <span :class=\"badgeClass\">{{ count }}</span>\n</template>",
    "<span>نص مدمج</span>",
    "وسم مزدوج <span>...</span> يتطلب إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "تمييز وتلوين كلمات مفتاحية معينة داخل النصوص والشروحات",
      "احتواء الأيقونات الصغيرة والشارات والأرقام التوضيحية",
      "تطبيق تأثيرات بصرية خاصة على أحرف معينة"
    ],
    "html_span",
    "<p class=\"text-gray-300\">\n  يتألق التصميم بلمسات من اللون\n  <span class=\"text-[#00DC82] font-bold\">الأخضر الزمردي</span>\n  المستوحى من هوية Nuxt.\n</p>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span",
    [
      "<span>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<span>نص مدمج</span>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <span>...</span> يتطلب إغلاقاً"
      }
    ],
    [
      "<main>",
      "class",
      "<div>",
      "<button>"
    ]
  ],
  [
    "html",
    "<table>",
    "جداول البيانات الهيكلية المنظمة",
    "table thead tbody tr th td جدول بيانات خلايا صفوف أعمدة هيكلي",
    "العنصر الرسمي لعرض البيانات المجدولة ثنائية الأبعاد (صفوف وأعمدة)؛ يتكامل مع <thead> للعناوين، و <tbody> للبيانات، و <tr> للصفوف، و <td> للخلايا.",
    "<template>\n  <table>\n    <tr v-for=\"row in rows\" :key=\"row.id\"><td>{{ row.text }}</td></tr>\n  </table>\n</template>",
    "<table> <thead><tr><th>...</th></tr></thead> <tbody><tr><td>...</td></tr></tbody> </table>",
    "وسم مزدوج <table>...</table> يحتاج إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "عرض جداول المقارنة البرمجية بين Vanilla JS و Vue 3",
      "عرض فواتير الشراء وسجلات النشاط المالي للمستخدمين",
      "جداول مقارنة الخطط والأسعار في منصات SaaS"
    ],
    "html_table",
    "<table class=\"w-full text-sm text-right text-gray-300 border border-slate-800\">\n  <thead class=\"bg-slate-900 text-emerald-400\">\n    <tr>\n      <th class=\"p-2\">المصطلح</th>\n      <th class=\"p-2\">القسم</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class=\"border-t border-slate-800\">\n      <td class=\"p-2 font-mono\">computed()</td>\n      <td class=\"p-2\">Vue.js 3</td>\n    </tr>\n  </tbody>\n</table>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table",
    [
      "<table>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<table> <thead><tr><th>...</th></tr></thead> <tbody><tr><td>...</td></tr></tbody> </table>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <table>...</table> يحتاج إغلاقاً"
      }
    ],
    [
      "<a>",
      "<audio>",
      "<nav>",
      "<details> / <summary>"
    ]
  ],
  [
    "html",
    "<template>",
    "حاويات القوالب الخاملة في المتصفح",
    "template fragment virtual dom قالب خامل شظية حاوية افتراضية هيكل",
    "وسم حاوية فريد في HTML5 لا يُعرض محتواه نهائياً عند تحميل الصفحة؛ في Vue.js يلعب دوراً جوهرياً كحاوية لكتل القوالب وكشظية افتراضية (Fragment) لتطبيق التوجيهات دون توليد وسم div زائد في DOM.",
    "<template>\n  <template v-for=\"n in 3\" :key=\"n\">...</template>\n</template>",
    "<template> محتوى القالب غير المرئي </template>",
    "وسم مزدوج <template>...</template> خامل في المتصفح ونشط في محرك Vue",
    "كافة المتصفحات الحديثة ومحركات قوالب الويب",
    [
      "تطبيق v-if أو v-for على عدة عناصر معاً دون إضافة وسم div غير مرغوب فيه إلى DOM",
      "تسمية وتمرير فتحات المكونات المخصصة <template #header>",
      "حفظ قوالب HTML الأصلية بالمتصفح لاستنساخها برمجياً عبر cloneNode"
    ],
    "html_template",
    "<template>\n  <!-- حاوية قالب لا تولد وسماً حقيقياً في شجرة DOM -->\n  <div class=\"card\">\n    <h3 class=\"text-emerald-400\">مكون Vue Lexicon</h3>\n    <template v-if=\"isLoaded\">\n      <span>المحتوى جاهز</span>\n      <span>بيانات إضافية</span>\n    </template>\n  </div>\n</template>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template",
    [
      "<template>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<template> محتوى القالب غير المرئي </template>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <template>...</template> خامل في المتصفح ونشط في محرك Vue"
      }
    ],
    [
      "<canvas>",
      "<iframe>",
      "<div>",
      "<input>"
    ]
  ],
  [
    "html",
    "<ul> / <li>",
    "القوائم غير المرتبة والعناصر النقطية",
    "ul li unordered list bullet قائمة غير مرتبة عناصر نقطية تعداد",
    "العنصر القياسي لإنشاء القوائم النقطية غير المرتبة؛ يمثل <ul> الحاوية العامة للقائمة، ويمثل <li> كل عنصر فردي بداخلها؛ يُستخدم على نطاق واسع في بناء أشرطة التنقل وقوائم الميزات.",
    "<template>\n  <ul>\n    <li v-for=\"item in list\" :key=\"item\">{{ item }}</li>\n  </ul>\n</template>",
    "<ul> <li>عنصر 1</li> <li>عنصر 2</li> </ul>",
    "وسوم مزدوجة <ul> و <li> تتطلب إغلاقاً",
    "كافة المتصفحات العالمية",
    [
      "بناء أشرطة القوائم الجانبية وقوائم التنقل في الهيدر",
      "عرض حالات الاستخدام (Use Cases) النقطية في بطاقة تفاصيل المصطلح",
      "سرد ميزات وخصائص المنتجات في صفحات الهبوط"
    ],
    "html_list",
    "<ul class=\"space-y-2 text-sm text-gray-300\">\n  <li class=\"flex items-center gap-2\">\n    <span class=\"text-emerald-400\">✓</span> أكثر من 150 مصطلح ومكون\n  </li>\n  <li class=\"flex items-center gap-2\">\n    <span class=\"text-emerald-400\">✓</span> معمل تفاعلي حي لمكتبة Nuxt UI\n  </li>\n</ul>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul",
    [
      "<ul> / <li>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<ul> <li>عنصر 1</li> <li>عنصر 2</li> </ul>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسوم مزدوجة <ul> و <li> تتطلب إغلاقاً"
      }
    ],
    [
      "<img>",
      "<label>",
      "<select>",
      "<main>"
    ]
  ],
  [
    "html",
    "<video>",
    "تضمين وتشغيل مقاطع الفيديو الأصلية",
    "video media player mp4 فيديو مقطع مشغل وسائط مرئي متصفح",
    "عنصر HTML5 المدمج لتشغيل وتضمين مقاطع الفيديو الرقمية في المتصفح بجودة عالية، مع خيارات التحكم الكاملة (controls)، التشغيل التلقائي (autoplay)، وكتم الصوت (muted).",
    "<template>\n  <video ref=\"videoEl\" :src=\"src\" controls @play=\"onPlay\" />\n</template>",
    "<video controls [poster=\"...\"] [autoplay] [muted] [loop]> <source ...> </video>",
    "وسم مزدوج <video>...</video> يتضمن وسوم <source>",
    "كافة المتصفحات الحديثة",
    [
      "عرض الفيديوهات التعريفية للمنتجات ودورات الشرح التعليمية",
      "تشغيل خلفيات الفيديو المتحركة الصامتة (muted autoplay loop) في واجهات الهبوط",
      "تطوير مشغلات فيديو مخصصة للتدريب عن بعد"
    ],
    "html_video",
    "<video\n  controls\n  poster=\"https://example.com/poster.jpg\"\n  class=\"w-full max-w-md rounded-xl border border-emerald-500/30 shadow-lg\"\n>\n  <source src=\"https://example.com/video/intro.mp4\" type=\"video/mp4\">\n  متصفحك لا يدعم مشغل الفيديو المدمج.\n</video>",
    "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video",
    [
      "<video>: وسم دلالي قياسي (Semantic HTML5).",
      "المتصفح يمنحه سلوكاً مدمجاً وإمكانية وصول (Accessibility) افتراضية.",
      "يُربط في Vue عبر التوجيهات مثل v-bind و v-on."
    ],
    "⚠️ احرص على استخدام الوسم لغرضه الدلالي الحقيقي لتحسين محركات البحث (SEO) وقارئات الشاشة بدلاً من استخدام <div> لكل شيء.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "<video controls [poster=\"...\"] [autoplay] [muted] [loop]> <source ...> </video>"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "وسم مزدوج <video>...</video> يتضمن وسوم <source>"
      }
    ],
    [
      "<details> / <summary>",
      "<h1>-<h6>",
      "<option>",
      "<section>"
    ]
  ],
  [
    "css",
    "animation & @keyframes",
    "الرسوم المتحركة والإطارات المفتاحية",
    "animation keyframes transition css حركة رسوم متحركة إطارات انسياب تدفق",
    "ميزة CSS3 القوية لتصميم حركات ورسوم متحركة معقدة عبر تعريف مراحل التغيير في إطارات مفتاحية (@keyframes) مثل 0% و 50% و 100% دون كتابة كود JavaScript.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية animation & @keyframes\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق animation & @keyframes بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  @keyframes pulseGlow {\n  0%, 100% {\n    box-shadow: 0 0 15px rgba(0, 220, 130, 0.2);\n    transform: scale(1);\n  }\n  50% {\n    box-shadow: 0 0 30px rgba(0, 220, 130, 0.6);\n    transform: scale(1.03);\n  }\n}\n\n.pulse-card {\n  animation: pulseGlow 2s infinite ease-in-out;\n}\n}\n</style>",
    "animation: name duration timing-function delay iteration-count direction; @keyframes name { ... }",
    "قاعدة أنماط CSS ومحدد إطارات مفتاحية",
    "جميع المتصفحات الحديثة",
    [
      "تطبيق النبضات الضوئية المتوهجة حول الأزرار والشارات النشطة",
      "تحريك مؤشرات التحميل الدوارة (Spinners)",
      "بناء التأثيرات الجذابة لصفحات الهبوط وبطاقات المنتجات"
    ],
    "css_animation",
    "@keyframes pulseGlow {\n  0%, 100% {\n    box-shadow: 0 0 15px rgba(0, 220, 130, 0.2);\n    transform: scale(1);\n  }\n  50% {\n    box-shadow: 0 0 30px rgba(0, 220, 130, 0.6);\n    transform: scale(1.03);\n  }\n}\n\n.pulse-card {\n  animation: pulseGlow 2s infinite ease-in-out;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/animation",
    [
      "animation & @keyframes: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: animation: name duration timing-function delay iteration-count direction; @keyframes name { ... }",
      "تُستخدم لضبط: تطبيق النبضات الضوئية المتوهجة حول الأزرار والشارات النشطة."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "animation: name duration timing-function delay iteration-count direction; @keyframes name { ... }"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "قاعدة أنماط CSS ومحدد إطارات مفتاحية"
      }
    ],
    [
      "box-shadow",
      "position",
      "@media",
      "cursor"
    ]
  ],
  [
    "css",
    "aspect-ratio",
    "تثبيت وتحديد نسبة الأبعاد التناسبية",
    "aspect-ratio ratio responsive أبعاد نسبة تناسبية شاشة عرض ارتفاع",
    "خاصية CSS عصرية فائقة الفائدة تتيح تحديد نسبة ثابتة بين العرض والارتفاع للعنصر (مثل 16 / 9 للفيديو أو 1 / 1 للمربعات والصور الشخصية) لمنع القفزات التخطيطية (Layout Shift).",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية aspect-ratio\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق aspect-ratio بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .video-wrapper {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  background-color: #0F172A;\n  border-radius: 1rem;\n}\n\n.avatar-square {\n  width: 64px;\n  aspect-ratio: 1 / 1;\n}\n}\n</style>",
    "aspect-ratio: width / height;",
    "خاصية CSS تحدد أبعاد النسبة الرياضية",
    "كافة المتصفحات الحديثة",
    [
      "حجز مساحة مقاطع الفيديو والصور المتجاوبة قبل تحميلها لتجنب وميض CLS",
      "إنشاء بطاقات مربعة متناسقة تماماً aspect-ratio: 1/1",
      "بناء حاويات الخرائط ومخططات الرسوم البيانية المتجاوبة"
    ],
    "css_aspect_ratio",
    ".video-wrapper {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  background-color: #0F172A;\n  border-radius: 1rem;\n}\n\n.avatar-square {\n  width: 64px;\n  aspect-ratio: 1 / 1;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio",
    [
      "aspect-ratio: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: aspect-ratio: width / height;",
      "تُستخدم لضبط: حجز مساحة مقاطع الفيديو والصور المتجاوبة قبل تحميلها لتجنب وميض CLS."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "aspect-ratio: width / height;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية CSS تحدد أبعاد النسبة الرياضية"
      }
    ],
    [
      "linear-gradient",
      "display",
      "filter (blur, drop-shadow)",
      "grid (CSS Grid)"
    ]
  ],
  [
    "css",
    "background",
    "تنسيق الخلفيات والتدرجات اللونية",
    "background color image gradient خلفية تدرج لوني صورة تغطية تكرار",
    "خاصية مجمعة (Shorthand) تتيح تحديد لون الخلفية، الصور، التدرجات الخطية والشعاعية، تكرارها، موقعها، وحجمها (cover, contain) داخل عنصر التصميم.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية background\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق background بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .nuxt-hero-surface {\n  background: radial-gradient(circle at 50% 0%, rgba(0, 220, 130, 0.15) 0%, #020420 70%);\n  background-color: #020420;\n  background-size: cover;\n}\n}\n</style>",
    "background: [color] [image] [repeat] [position] / [size];",
    "خاصية CSS تنسيقية مجمعة",
    "كافة المتصفحات العالمية",
    [
      "تصميم خلفية التطبيق الداكنة العميقة المستوحاة من Nuxt UI (#020420)",
      "إنشاء التدرجات اللونية المتوهجة (Gradients) للبطاقات والأزرار",
      "ضبط صور الهيدر لملء المساحة بالكامل باستخدام background-size: cover"
    ],
    "css_background",
    ".nuxt-hero-surface {\n  background: radial-gradient(circle at 50% 0%, rgba(0, 220, 130, 0.15) 0%, #020420 70%);\n  background-color: #020420;\n  background-size: cover;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/background",
    [
      "background: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: background: [color] [image] [repeat] [position] / [size];",
      "تُستخدم لضبط: تصميم خلفية التطبيق الداكنة العميقة المستوحاة من Nuxt UI (#020420)."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "background: [color] [image] [repeat] [position] / [size];"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية CSS تنسيقية مجمعة"
      }
    ],
    [
      "flex (Flexbox)",
      "color",
      "filter (blur, drop-shadow)",
      ":hover & :focus"
    ]
  ],
  [
    "css",
    "border & border-radius",
    "الحدود وحواف الزوايا المستديرة",
    "border border-radius rounded حدود حواف زوايا مستديرة إطار بطاقة",
    "تحدد خاصية border سُمك ونمط ولون الإطار الخارجي للعنصر، بينما تحدد border-radius درجة انحناء واستدارة زواياه، وهي أساسية لخلق لغة التصميم الحديثة للبطاقات والأزرار.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية border & border-radius\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق border & border-radius بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .emerald-card {\n  border: 1px solid rgba(0, 220, 130, 0.25);\n  border-radius: 1rem; /* 16px زوايا ناعمة */\n  background-color: #0F172A;\n}\n}\n</style>",
    "border: width style color; border-radius: radiusValue;",
    "خصائص CSS هيكلية ومظهرية",
    "كافة المتصفحات العالمية",
    [
      "إنشاء الحواف المتوهجة الرقيقة (#1e332c) الخاصة بثيم Nuxt UI",
      "صياغة الأزرار الدائرية وأزرار الحبوب (Pills) باستخدام border-radius: 9999px",
      "فصل عناصر القوائم بحدود سفلية خفيفة border-b border-slate-800"
    ],
    "css_border_radius",
    ".emerald-card {\n  border: 1px solid rgba(0, 220, 130, 0.25);\n  border-radius: 1rem; /* 16px زوايا ناعمة */\n  background-color: #0F172A;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius",
    [
      "border & border-radius: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: border: width style color; border-radius: radiusValue;",
      "تُستخدم لضبط: إنشاء الحواف المتوهجة الرقيقة (#1e332c) الخاصة بثيم Nuxt UI."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "border: width style color; border-radius: radiusValue;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خصائص CSS هيكلية ومظهرية"
      }
    ],
    [
      "box-shadow",
      "flex (Flexbox)",
      ":hover & :focus",
      "color"
    ]
  ],
  [
    "css",
    "box-shadow",
    "الظلال والتأثيرات الضوئية المتوهجة",
    "box-shadow glow shadow ظلال إضاءة توهج عمق بصري هالة",
    "خاصية تضفي عمقاً بصرياً واقعياً أو هالات توهج ضوئية (Glow Effects) حول العناصر، وتأخذ إزاحة X، إزاحة Y، درجة التمويه (Blur)، درجة الانتشار (Spread)، واللون.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية box-shadow\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق box-shadow بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .nuxt-glow-button {\n  /* توهج زمردي ناعم مستوحى من Nuxt UI */\n  box-shadow: 0 0 25px -5px rgba(0, 220, 130, 0.4);\n  transition: box-shadow 0.3s ease;\n}\n\n.nuxt-glow-button:hover {\n  box-shadow: 0 0 35px 2px rgba(0, 220, 130, 0.6);\n}\n}\n</style>",
    "box-shadow: [inset] offsetX offsetY blurRadius spreadRadius color;",
    "خاصية CSS بصرية للعمق والإضاءة",
    "كافة المتصفحات العالمية",
    [
      "إنشاء تأثير التوهج الأخضر الزمردي المميز لهوية VueLexicon Pro",
      "رفع البطاقات بصرياً عن الخلفية لإظهار الترتيب الهرمي للطبقات",
      "إبراز حقول الإدخال النشطة عند التركيز (Focus Ring)"
    ],
    "css_box_shadow",
    ".nuxt-glow-button {\n  /* توهج زمردي ناعم مستوحى من Nuxt UI */\n  box-shadow: 0 0 25px -5px rgba(0, 220, 130, 0.4);\n  transition: box-shadow 0.3s ease;\n}\n\n.nuxt-glow-button:hover {\n  box-shadow: 0 0 35px 2px rgba(0, 220, 130, 0.6);\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow",
    [
      "box-shadow: 0 10px 25px -5px rgba(0, 220, 130, 0.3): إضافة عمق وظلال واقعية.",
      "ترتيب القيم: الإزاحة الأفقية X، الإزاحة الرأسية Y، مقدار الضبابية Blur، مقدار التمدد Spread، واللون.",
      "يدعم الكلمة المفتاحية inset لإنشاء ظلال داخلية مجوفة."
    ],
    "⚠️ استخدام ظلال سوداء صريحة داكنة تجعل التصميم يبدو قديماً وقاسياً. الظلال العصرية تكون ذات ضبابية واسعة وشفافية ناعمة ومنسجمة مع لون الخلفية.",
    [
      {
        "name": "offset-x / y",
        "type": "px | rem",
        "desc": "الإزاحة الأفقية والرأسية للظل"
      },
      {
        "name": "blur-radius",
        "type": "px",
        "desc": "مدى نعومة وضبابية الظل"
      },
      {
        "name": "color",
        "type": "Color",
        "desc": "لون الظل مع قناة الشفافية Alpha"
      }
    ],
    [
      "border & border-radius",
      "opacity & backdrop-filter",
      "filter (blur, drop-shadow)"
    ]
  ],
  [
    "css",
    "color",
    "ألوان النصوص والمحتوى الأمامي",
    "color text typography لون نص طباعة ألوان وسم خطوط",
    "الخاصية الأساسية لتحديد لون النصوص والأيقونات المعتمدة على الخطوط (Font Icons) ولون مؤشر الكتابة في عناصر HTML، وتدعم أسماء الألوان، Hex، RGB، و HSL.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية color\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق color بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .brand-accent-text {\n  color: #00DC82; /* اللون الأخضر الزمردي الرسمي لـ Nuxt */\n}\n\n.muted-caption {\n  color: #94A3B8; /* رمادي خافت للقراءات الهادئة */\n}\n}\n</style>",
    "color: colorValue;",
    "خاصية CSS توريثية (Inherited Property)",
    "كافة المتصفحات العالمية",
    [
      "تلوين أسماء المصطلحات البرمجية باللون الأخضر الفاتح لسهولة القراءة",
      "تطبيق تباين ألوان عالي ومريح للعين في الوضع الليلي المظلم",
      "تمييز حالات الأخطاء باللون الأحمر وحالات النجاح بالأخضر"
    ],
    "css_color",
    ".brand-accent-text {\n  color: #00DC82; /* اللون الأخضر الزمردي الرسمي لـ Nuxt */\n}\n\n.muted-caption {\n  color: #94A3B8; /* رمادي خافت للقراءات الهادئة */\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/color",
    [
      "color: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: color: colorValue;",
      "تُستخدم لضبط: تلوين أسماء المصطلحات البرمجية باللون الأخضر الفاتح لسهولة القراءة."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "color: colorValue;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية CSS توريثية (Inherited Property)"
      }
    ],
    [
      "background",
      "gap",
      "border & border-radius",
      "justify-content & align-items"
    ]
  ],
  [
    "css",
    "cursor",
    "شكل مؤشر الفأرة التفاعلي",
    "cursor pointer mouse مؤشر فأرة يد سهم تفاعل تخصيص",
    "تحدد شكل وحركة مؤشر الفأرة عند التحويم فوق العنصر، مثل تحويله إلى يد (pointer) للإشارة إلى قابلية النقر، أو علامة ممنوع (not-allowed) للأزرار المعطلة، أو صليب (crosshair).",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية cursor\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق cursor بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .clickable-card {\n  cursor: pointer; /* مؤشر اليد للإشارة لقابلية النقر */\n}\n\n.disabled-button {\n  cursor: not-allowed; /* مؤشر المنع للحالات المعطلة */\n  opacity: 0.6;\n}\n}\n</style>",
    "cursor: auto | default | pointer | not-allowed | wait | text | ...;",
    "خاصية CSS تفاعلية لتحسين تجربة المستخدم",
    "كافة المتصفحات العالمية",
    [
      "إشعار المستخدم بأن البطاقة أو النص قابل للنقر والتفاعل",
      "منع حيرة المستخدم بتوضيح أن الزر معطل أو قيد الانتظار cursor: wait",
      "تحديد مؤشر السحب والتحريك grab / grabbing في القوائم القابلة لإعادة الترتيب"
    ],
    "css_cursor",
    ".clickable-card {\n  cursor: pointer; /* مؤشر اليد للإشارة لقابلية النقر */\n}\n\n.disabled-button {\n  cursor: not-allowed; /* مؤشر المنع للحالات المعطلة */\n  opacity: 0.6;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/cursor",
    [
      "cursor: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: cursor: auto | default | pointer | not-allowed | wait | text | ...;",
      "تُستخدم لضبط: إشعار المستخدم بأن البطاقة أو النص قابل للنقر والتفاعل."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "cursor: auto | default | pointer | not-allowed | wait | text | ...;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية CSS تفاعلية لتحسين تجربة المستخدم"
      }
    ],
    [
      "@media",
      "opacity & backdrop-filter",
      "user-select",
      "width & height"
    ]
  ],
  [
    "css",
    "display",
    "نوع التخطيط وتوليد صناديق العناصر",
    "display block inline flex grid none نوع تخطيط صندوق إظهار إخفاء",
    "أهم خاصية تخطيطية في CSS ككل؛ تحدد ما إذا كان العنصر يُعامل ككتلة (block)، أم كعنصر سطري (inline)، أم حاوية مرنة (flex)، أم شبكية (grid)، أو إخفائه تماماً من التدفق (none).",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية display\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق display بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .custom-flex-row {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.hidden-element {\n  display: none; /* إخفاء العنصر بالكامل من شجرة العرض */\n}\n}\n</style>",
    "display: block | inline | inline-block | flex | grid | none | contents;",
    "خاصية CSS جوهرية لتحديد بنية الصندوق",
    "كافة المتصفحات العالمية",
    [
      "تفعيل أنظمة التخطيط الحديثة Flexbox و CSS Grid على الحاويات",
      "إخفاء العناصر المشروطة دون حجز مساحة فارغة في الصفحة display: none",
      "تحويل الروابط من عناصر سطرية إلى أزرار كتلية قابلة لتحديد الأبعاد"
    ],
    "css_display",
    ".custom-flex-row {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.hidden-element {\n  display: none; /* إخفاء العنصر بالكامل من شجرة العرض */\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
    [
      "display: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: display: block | inline | inline-block | flex | grid | none | contents;",
      "تُستخدم لضبط: تفعيل أنظمة التخطيط الحديثة Flexbox و CSS Grid على الحاويات."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "display: block | inline | inline-block | flex | grid | none | contents;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية CSS جوهرية لتحديد بنية الصندوق"
      }
    ],
    [
      "margin & padding",
      "transform & transition",
      "border & border-radius",
      "box-shadow"
    ]
  ],
  [
    "css",
    "filter (blur, drop-shadow)",
    "المؤثرات البصرية والمرشحات الرقمية",
    "filter blur drop-shadow مرشحات فلاتر تمويه ظبابية تأثيرات بصرية",
    "خاصية تطبق تأثيرات رسومية رقمية متقدمة على العناصر ومحتوياتها، مثل التمويه (blur)، وتعديل التباين، والسطوع، وتحويل الألوان إلى درجات الرمادي، أو إسقاط الظلال الذكية.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية filter (blur, drop-shadow)\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق filter (blur, drop-shadow) بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .blurred-backdrop {\n  filter: blur(8px);\n}\n\n.glowing-logo {\n  /* إسقاط ظل يتبع بالضبط منحنيات وتفريغ وسم SVG */\n  filter: drop-shadow(0 0 12px rgba(0, 220, 130, 0.6));\n}\n}\n</style>",
    "filter: blur(px) | brightness(%) | contrast(%) | drop-shadow(...) | grayscale(%);",
    "خاصية CSS لمعالجة الصور والرسوميات",
    "جميع المتصفحات الحديثة",
    [
      "إضافة هالات ضوئية تتبع تفريغ شعار SVG بدقة متناهية عبر drop-shadow",
      "تمويه المحتوى الخلفي للنوافذ المنبثقة لإبراز التركيز",
      "تحويل صور الرعاة والشركاء إلى الرمادي وتلوينها عند التحويم grayscale"
    ],
    "css_filter",
    ".blurred-backdrop {\n  filter: blur(8px);\n}\n\n.glowing-logo {\n  /* إسقاط ظل يتبع بالضبط منحنيات وتفريغ وسم SVG */\n  filter: drop-shadow(0 0 12px rgba(0, 220, 130, 0.6));\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/filter",
    [
      "filter (blur, drop-shadow): خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: filter: blur(px) | brightness(%) | contrast(%) | drop-shadow(...) | grayscale(%);",
      "تُستخدم لضبط: إضافة هالات ضوئية تتبع تفريغ شعار SVG بدقة متناهية عبر drop-shadow."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "filter: blur(px) | brightness(%) | contrast(%) | drop-shadow(...) | grayscale(%);"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية CSS لمعالجة الصور والرسوميات"
      }
    ],
    [
      "@media",
      "color",
      "linear-gradient",
      "width & height"
    ]
  ],
  [
    "css",
    "flex (Flexbox)",
    "نظام التخطيط المرن أحادي البعد",
    "flex flexbox layout تخطيط مرن توزيع عناصر محاذاة أبعاد صف عمود",
    "نظام تخطيط ثوري أحادي البعد (صف أو عمود) يتيح توزيع المساحات بين العناصر ومحاذاتها تلقائياً بسهولة بالغة والتكيف مع مختلف مقاسات الشاشات دون الحاجة للعوامات (Floats).",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية flex (Flexbox)\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق flex (Flexbox) بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .header-navbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.5rem;\n}\n}\n</style>",
    "display: flex; flex-direction: row|column; flex-wrap: nowrap|wrap;",
    "نظام تخطيط CSS مدمج",
    "كافة المتصفحات العالمية الحديثة",
    [
      "توزيع عناصر أشرطة التنقل ومحاذاة الشعار والأزرار أفقياً",
      "محاذاة الأيقونات بدقة في منتصف الأزرار عمودياً align-items: center",
      "تصميم بطاقات وقوائم متجاوبة تلتف تلقائياً مع الشاشات الصغيرة flex-wrap"
    ],
    "css_flexbox",
    ".header-navbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.5rem;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
    [
      "display: flex: تحويل الحاوية إلى نظام تخطيط مرن أحادي البعد.",
      "justify-content: محاذاة وتوزيع العناصر على المحور الأساسي (Main Axis).",
      "align-items: محاذاة العناصر على المحور العمودي (Cross Axis).",
      "gap: تحديد مسافات متناسقة بين العناصر دون الحاجة لهوامش margins متداخلة."
    ],
    "⚠️ حدوث انكماش مفاجئ للعناصر الفرعية لأن flex-shrink الافتراضي هو 1. لمنع العنصر من الانكماش أضف flex-shrink: 0.",
    [
      {
        "name": "flex-direction",
        "type": "row | column",
        "desc": "اتجاه المحور الأساسي"
      },
      {
        "name": "justify-content",
        "type": "string",
        "desc": "توزيع العناصر على المحور الرئيسي"
      },
      {
        "name": "align-items",
        "type": "string",
        "desc": "محاذاة العناصر على المحور العمودي"
      }
    ],
    [
      "justify-content & align-items",
      "gap",
      "grid (CSS Grid)",
      "display"
    ]
  ],
  [
    "css",
    "gap",
    "الفواصل والمسافات البينية بين العناصر",
    "gap spacing flex grid فواصل مسافات بينية شبكة تباعد أبعاد",
    "خاصية حديثة وعملية جداً تحدد المسافة الفاصلة بين الصفوف والأعمدة داخل حاويات Flexbox و CSS Grid دون الحاجة لإضافة هوامش (margin) يدوية على كل عنصر.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية gap\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق gap بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .buttons-group {\n  display: flex;\n  gap: 0.75rem; /* 12px مسافة نظيفة بين جميع الأزرار */\n}\n\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.5rem 2rem; /* فواصل مختلفة للصفوف والأعمدة */\n}\n}\n</style>",
    "gap: [rowGap] [columnGap];",
    "خاصية تباعد مدمجة لأنظمة التخطيط",
    "كافة المتصفحات الحديثة",
    [
      "إنشاء مسافات منتظمة بين بطاقات المصطلحات في الشبكة",
      "الفصل بين أزرار أشرطة الأدوات وحقول الإدخال بسهولة",
      "الاستغناء النهائي عن محددات الهوامش القديمة مثل :last-child { margin-right: 0 }"
    ],
    "css_gap",
    ".buttons-group {\n  display: flex;\n  gap: 0.75rem; /* 12px مسافة نظيفة بين جميع الأزرار */\n}\n\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.5rem 2rem; /* فواصل مختلفة للصفوف والأعمدة */\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/gap",
    [
      "gap: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: gap: [rowGap] [columnGap];",
      "تُستخدم لضبط: إنشاء مسافات منتظمة بين بطاقات المصطلحات في الشبكة."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "gap: [rowGap] [columnGap];"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية تباعد مدمجة لأنظمة التخطيط"
      }
    ],
    [
      "box-shadow",
      "position",
      "border & border-radius",
      "filter (blur, drop-shadow)"
    ]
  ],
  [
    "css",
    "grid (CSS Grid)",
    "نظام التخطيط الشبكي ثنائي الأبعاد",
    "grid css grid layout شبكة تخطيط ثنائي أبعاد صفوف أعمدة تقسيم",
    "أقوى نظام تخطيط في CSS على الإطلاق؛ يتعامل مع بُعدين في نفس الوقت (صفوف وأعمدة معاً) لبناء هياكل الصفحات الأكثر تعقيداً بتقسيمات دقيقة ونسب مرنة (fr units).",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية grid (CSS Grid)\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق grid (CSS Grid) بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .app-workspace {\n  display: grid;\n  grid-template-columns: 4fr 8fr; /* تقسيم 12 عمود: 4 للقائمة و 8 للتفاصيل */\n  gap: 1.5rem;\n}\n\n@media (max-width: 1024px) {\n  .app-workspace {\n    grid-template-columns: 1fr; /* عمود واحد في شاشات الجوال */\n  }\n}\n}\n</style>",
    "display: grid; grid-template-columns: repeat(n, size);",
    "نظام تخطيط شبكي ثنائي الأبعاد مدمج",
    "كافة المتصفحات الحديثة",
    [
      "تقسيم واجهة VueLexicon Pro إلى 4 أعمدة للقائمة الجانبية و 8 أعمدة لبطاقة الشرح",
      "بناء معارض البطاقات المتجاوبة auto-fit minmax(280px, 1fr)",
      "تخطيط لوحات التحكم الكاملة (Header, Sidebar, Main, Widgets)"
    ],
    "css_grid",
    ".app-workspace {\n  display: grid;\n  grid-template-columns: 4fr 8fr; /* تقسيم 12 عمود: 4 للقائمة و 8 للتفاصيل */\n  gap: 1.5rem;\n}\n\n@media (max-width: 1024px) {\n  .app-workspace {\n    grid-template-columns: 1fr; /* عمود واحد في شاشات الجوال */\n  }\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
    [
      "display: grid: بناء شبكة تخطيط ثنائية الأبعاد (صفوف وأعمدة).",
      "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)): شبكة متجاوبة بالكامل دون أي Media Queries!",
      "gap: تحديد الفراغات الفاصلة بين صفوف وأعمدة الشبكة بدقة."
    ],
    "⚠️ الخلط بين auto-fit و auto-fill في repeat(). مع auto-fit تتمدد العناصر لملء كامل السطر، بينما auto-fill تحافظ على أحجامها وتترك فراغاً.",
    [
      {
        "name": "grid-template-columns",
        "type": "string",
        "desc": "تحديد عرض وعدد الأعمدة"
      },
      {
        "name": "gap",
        "type": "string",
        "desc": "المسافة بين الصفوف والأعمدة"
      }
    ],
    [
      "flex (Flexbox)",
      "gap",
      "aspect-ratio",
      "display"
    ]
  ],
  [
    "css",
    ":hover & :focus",
    "الفئات الزائفة للتحويم والتركيز التفاعلي",
    "hover focus pseudo class فئات زائفة تحويم تركيز مفاتيح تفاعل فأرة",
    "فئات زائفة أساسية (Pseudo-classes) للتفاعل؛ تُفعل :hover عند مرور مؤشر الفأرة فوق العنصر، بينما تُفعل :focus عند التركيز عليه عبر النقر أو التنقل بلوحة المفاتيح بمفتاح Tab.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية :hover & :focus\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق :hover & :focus بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .nav-pill:hover {\n  background-color: rgba(0, 220, 130, 0.15);\n  border-color: #00DC82;\n}\n\n.search-input:focus {\n  outline: none;\n  border-color: #00DC82;\n  box-shadow: 0 0 0 3px rgba(0, 220, 130, 0.25);\n}\n}\n</style>",
    "selector:hover { ... } | selector:focus { ... } | selector:focus-visible { ... }",
    "فئات تحديد سلوكية في CSS",
    "كافة المتصفحات العالمية",
    [
      "تغيير خلفيات وألوان البطاقات والأزرار عند تمرير الفأرة فوقها",
      "إبراز حقول البحث بإطار مضيء زمردي عند الكتابة بداخلها",
      "تحسين إمكانية الوصول والتنقل لمستخدمي لوحة المفاتيح عبر :focus-visible"
    ],
    "css_hover_focus",
    ".nav-pill:hover {\n  background-color: rgba(0, 220, 130, 0.15);\n  border-color: #00DC82;\n}\n\n.search-input:focus {\n  outline: none;\n  border-color: #00DC82;\n  box-shadow: 0 0 0 3px rgba(0, 220, 130, 0.25);\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/:hover",
    [
      ":hover & :focus: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: selector:hover { ... } | selector:focus { ... } | selector:focus-visible { ... }",
      "تُستخدم لضبط: تغيير خلفيات وألوان البطاقات والأزرار عند تمرير الفأرة فوقها."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "selector:hover { ... } | selector:focus { ... } | selector:focus-visible { ... }"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "فئات تحديد سلوكية في CSS"
      }
    ],
    [
      "z-index",
      "animation & @keyframes",
      "background",
      "box-shadow"
    ]
  ],
  [
    "css",
    "justify-content & align-items",
    "محاذاة وتوزيع العناصر على المحاور",
    "justify-content align-items alignment محاذاة توزيع محاور توسيط منتصف",
    "خصائص المحاذاة في Flexbox و Grid؛ تتحكم justify-content في توزيع العناصر على المحور الرئيسي (Main Axis)، بينما تتحكم align-items في المحاذاة على المحور المتعامد (Cross Axis).",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية justify-content & align-items\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق justify-content & align-items بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .center-everything {\n  display: flex;\n  justify-content: center; /* توسيط أفقي على المحور الرئيسي */\n  align-items: center;     /* توسيط عمودي على المحور المتعامد */\n  min-height: 200px;\n}\n}\n</style>",
    "justify-content: start|end|center|between|around|evenly; align-items: start|end|center|stretch;",
    "خصائص محاذاة وتوزيع مساحات",
    "كافة المتصفحات الحديثة",
    [
      "توسيط العناصر تماماً في منتصف الشاشة (Centering in CSS)",
      "فصل الشعار عن روابط الحساب في الهيدر عبر justify-content: space-between",
      "محاذاة الأيقونات والنصوص في نفس السطر بدقة رأسية مثالية"
    ],
    "css_alignment",
    ".center-everything {\n  display: flex;\n  justify-content: center; /* توسيط أفقي على المحور الرئيسي */\n  align-items: center;     /* توسيط عمودي على المحور المتعامد */\n  min-height: 200px;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content",
    [
      "justify-content & align-items: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: justify-content: start|end|center|between|around|evenly; align-items: start|end|center|stretch;",
      "تُستخدم لضبط: توسيط العناصر تماماً في منتصف الشاشة (Centering in CSS)."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "justify-content: start|end|center|between|around|evenly; align-items: start|end|center|stretch;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خصائص محاذاة وتوزيع مساحات"
      }
    ],
    [
      "transform & transition",
      "margin & padding",
      "animation & @keyframes",
      "linear-gradient"
    ]
  ],
  [
    "css",
    "linear-gradient",
    "التدرجات اللونية الخطية الاحترافية",
    "linear-gradient gradient تدرج لوني خطي زوايا ألوان خلفية",
    "دالة CSS تنشئ صورة خلفية بتدرج لوني خطي سلس بين لونين أو أكثر في اتجاه محدد (زاوية بالدرجات deg أو اتجاهات مثل to right و to bottom).",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية linear-gradient\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق linear-gradient بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .emerald-gradient-badge {\n  background: linear-gradient(135deg, #00DC82 0%, #064E3B 100%);\n  color: #FFFFFF;\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n}\n}\n</style>",
    "background: linear-gradient([angle|direction], color1 [stop1], color2 [stop2], ...);",
    "دالة إنتاج صور CSS ديناميكية",
    "كافة المتصفحات العالمية",
    [
      "تصميم الشعار المدمج والحدود المضيئة لتطبيق VueLexicon Pro",
      "إنشاء نصوص بتدرج لوني عبر background-clip: text وتلوين العناوين",
      "خلق تأثيرات أزرار الدعوة للإجراء (CTA) الجذابة والحديثة"
    ],
    "css_gradient",
    ".emerald-gradient-badge {\n  background: linear-gradient(135deg, #00DC82 0%, #064E3B 100%);\n  color: #FFFFFF;\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient",
    [
      "linear-gradient: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: background: linear-gradient([angle|direction], color1 [stop1], color2 [stop2], ...);",
      "تُستخدم لضبط: تصميم الشعار المدمج والحدود المضيئة لتطبيق VueLexicon Pro."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "background: linear-gradient([angle|direction], color1 [stop1], color2 [stop2], ...);"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "دالة إنتاج صور CSS ديناميكية"
      }
    ],
    [
      "border & border-radius",
      "z-index",
      ":hover & :focus",
      "justify-content & align-items"
    ]
  ],
  [
    "css",
    "margin & padding",
    "الهوامش الخارجية والحشوات الداخلية للصناديق",
    "margin padding spacing هوامش حشوة داخلية خارجية تباعد صندوق أبعاد",
    "ركنان أساسيان في نموذج الصندوق (Box Model)؛ تمثل margin المساحة الفارغة الخارجية المحيطة بالعنصر لفصله عن جيرانه، بينما تمثل padding الحشوة الداخلية بين محتوى العنصر وإطاره.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية margin & padding\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق margin & padding بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .term-card {\n  margin-bottom: 1rem; /* هامش خارجي سفلي لفصل البطاقات */\n  padding: 1.5rem;      /* حشوة داخلية مريحة لمنع التصاق النصوص بالحدود */\n  background-color: #0F172A;\n}\n}\n</style>",
    "margin: [top] [right] [bottom] [left]; padding: [top] [right] [bottom] [left];",
    "خصائص المسافات في نموذج الصندوق",
    "كافة المتصفحات بلا استثناء",
    [
      "توسيط الحاويات ذات العرض الثابت تلقائياً عبر margin: 0 auto",
      "توفير مساحات قراءة مريحة وغير مضغوطة داخل البطاقات وحقول الإدخال",
      "ضبط هوامش الفقرات والعناوين لمنع تداخل النصوص"
    ],
    "css_box_model",
    ".term-card {\n  margin-bottom: 1rem; /* هامش خارجي سفلي لفصل البطاقات */\n  padding: 1.5rem;      /* حشوة داخلية مريحة لمنع التصاق النصوص بالحدود */\n  background-color: #0F172A;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/margin",
    [
      "margin & padding: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: margin: [top] [right] [bottom] [left]; padding: [top] [right] [bottom] [left];",
      "تُستخدم لضبط: توسيط الحاويات ذات العرض الثابت تلقائياً عبر margin: 0 auto."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "margin: [top] [right] [bottom] [left]; padding: [top] [right] [bottom] [left];"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خصائص المسافات في نموذج الصندوق"
      }
    ],
    [
      "z-index",
      "linear-gradient",
      "color",
      "width & height"
    ]
  ],
  [
    "css",
    "@media",
    "استعلامات الوسائط والتصميم المتجاوب",
    "media queries responsive breakpoints تصميم متجاوب شاشات جوال حاسوب استعلامات",
    "القاعدة الأساسية لتطبيق التصميم المتجاوب (Responsive Web Design)؛ تتيح تطبيق قواعد CSS مختلفة بناءً على حجم الشاشة، دقة العرض، أو تفضيل الوضع الليلي للنظام.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية @media\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق @media بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  /* تنسيق افتراضي للهواتف الذكية */\n.sidebar-layout {\n  flex-direction: column;\n}\n\n/* تطبيق التنسيق الأفقي للشاشات الكبيرة ابتداءً من 1024px */\n@media (min-width: 1024px) {\n  .sidebar-layout {\n    flex-direction: row;\n  }\n}\n}\n</style>",
    "@media (media-feature-rule) { /* قواعد التنسيق هنا */ }",
    "قاعدة شرطية عليا (At-rule) في CSS",
    "كافة المتصفحات العالمية",
    [
      "تحويل شبكة العرض من عمود واحد في شاشات الجوال إلى عمودين في الحواسيب",
      "إخفاء الأشرطة الجانبية وإظهار أزرار القائمة المنزلقة في الشاشات الصغيرة",
      "اكتشاف الوضع الليلي للنظام عبر @media (prefers-color-scheme: dark)"
    ],
    "css_media_query",
    "/* تنسيق افتراضي للهواتف الذكية */\n.sidebar-layout {\n  flex-direction: column;\n}\n\n/* تطبيق التنسيق الأفقي للشاشات الكبيرة ابتداءً من 1024px */\n@media (min-width: 1024px) {\n  .sidebar-layout {\n    flex-direction: row;\n  }\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/@media",
    [
      "@media: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: @media (media-feature-rule) { /* قواعد التنسيق هنا */ }",
      "تُستخدم لضبط: تحويل شبكة العرض من عمود واحد في شاشات الجوال إلى عمودين في الحواسيب."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "@media (media-feature-rule) { /* قواعد التنسيق هنا */ }"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "قاعدة شرطية عليا (At-rule) في CSS"
      }
    ],
    [
      "display",
      "background",
      "aspect-ratio",
      "justify-content & align-items"
    ]
  ],
  [
    "css",
    "opacity & backdrop-filter",
    "الشفافية والتأثيرات الزجاجية الضبابية",
    "opacity backdrop-filter glassmorphism شفافية زجاجي ضبابي خلفية بلور",
    "تحدد opacity شفافية العنصر بكافة محتوياته، بينما تطبق backdrop-filter تأثيرات رسومية (مثل blur) على المنطقة والطبقات الواقعة خلف العنصر مباشرة، وهو أساس تصميم الزجاج الضبابي (Glassmorphism).",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية opacity & backdrop-filter\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق opacity & backdrop-filter بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .nuxt-glass-header {\n  background-color: rgba(2, 4, 32, 0.75); /* خلفية داكنة شبه شفافة */\n  backdrop-filter: blur(16px);             /* تمويه محتوى الصفحة المار خلف الهيدر */\n  border-bottom: 1px solid rgba(0, 220, 130, 0.15);\n}\n}\n</style>",
    "opacity: 0 to 1; backdrop-filter: blur(px) ...;",
    "خصائص بصرية للشفافية ومعالجة الخلفيات",
    "جميع المتصفحات الحديثة",
    [
      "إنشاء الهيدر الزجاجي الضبابي الفاخر (Glassmorphic Sticky Header)",
      "تعتيم الأزرار المعطلة لبيان عدم قابليتها للنقر opacity: 0.5",
      "تطبيق خلفيات ضبابية ناعمة خلف النوافذ المنبثقة والقوائم المنسدلة"
    ],
    "css_opacity_blur",
    ".nuxt-glass-header {\n  background-color: rgba(2, 4, 32, 0.75); /* خلفية داكنة شبه شفافة */\n  backdrop-filter: blur(16px);             /* تمويه محتوى الصفحة المار خلف الهيدر */\n  border-bottom: 1px solid rgba(0, 220, 130, 0.15);\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter",
    [
      "opacity & backdrop-filter: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: opacity: 0 to 1; backdrop-filter: blur(px) ...;",
      "تُستخدم لضبط: إنشاء الهيدر الزجاجي الضبابي الفاخر (Glassmorphic Sticky Header)."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "opacity: 0 to 1; backdrop-filter: blur(px) ...;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خصائص بصرية للشفافية ومعالجة الخلفيات"
      }
    ],
    [
      "background",
      "aspect-ratio",
      "cursor",
      "border & border-radius"
    ]
  ],
  [
    "css",
    "overflow / overflow-x / y",
    "التحكم في فيضان المحتوى وشرائط التمرير",
    "overflow scroll hidden شريط تمرير فيضان إخفاء محتوى تجاوز",
    "تحدد كيفية التعامل مع المحتوى الذي يتجاوز حجم صندوق العنصر المخصص له؛ تتيح إخفاء الزوائد (hidden)، إظهار شرائط تمرير تلقائية (auto / scroll)، أو السماح له بالتدفق (visible).",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية overflow / overflow-x / y\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق overflow / overflow-x / y بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .terms-scroll-list {\n  max-height: calc(100vh - 280px);\n  overflow-y: auto;  /* شريط تمرير عمودي مخصص عند زيادة المصطلحات */\n  overflow-x: hidden;/* منع التمرير الأفقي غير المرغوب */\n  scrollbar-width: thin;\n}\n}\n</style>",
    "overflow: visible | hidden | clip | scroll | auto;",
    "خاصية إدارة مساحات المحتوى الفائض",
    "كافة المتصفحات العالمية",
    [
      "تمكين التمرير الداخلي المنفصل للقائمة الجانبية للمصطلحات في VueLexicon Pro",
      "قص الحواف الدائرية للبطاقات ومنع خروج الصور منها overflow: hidden",
      "بناء أشرطة التنقل الأفقية القابلة للتمرير على الجوال overflow-x: auto"
    ],
    "css_overflow",
    ".terms-scroll-list {\n  max-height: calc(100vh - 280px);\n  overflow-y: auto;  /* شريط تمرير عمودي مخصص عند زيادة المصطلحات */\n  overflow-x: hidden;/* منع التمرير الأفقي غير المرغوب */\n  scrollbar-width: thin;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/overflow",
    [
      "overflow / overflow-x / y: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: overflow: visible | hidden | clip | scroll | auto;",
      "تُستخدم لضبط: تمكين التمرير الداخلي المنفصل للقائمة الجانبية للمصطلحات في VueLexicon Pro."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "overflow: visible | hidden | clip | scroll | auto;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية إدارة مساحات المحتوى الفائض"
      }
    ],
    [
      "justify-content & align-items",
      "opacity & backdrop-filter",
      "color",
      ":hover & :focus"
    ]
  ],
  [
    "css",
    "position",
    "أنظمة التموضع الجغرافي والطبقات",
    "position relative absolute fixed sticky تموضع موقع نسبي مطلق ثابت لزج",
    "تحدد طريقة تموضع وحساب موقع العنصر في المستند؛ تشمل التموضع النسبي (relative)، المطلق (absolute) بالنسبة لأقرب أب متموضع، الثابت (fixed) بالنسبة لنافذة العرض، واللزج (sticky).",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية position\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق position بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .search-wrapper {\n  position: relative; /* نقطة مرجعية لأيقونة البحث وأزرار المسح */\n}\n\n.search-glass-icon {\n  position: absolute;\n  right: 1rem;\n  top: 50%;\n  transform: translateY(-50%); /* محاذاة في المنتصف الرأسي تماماً */\n}\n}\n</style>",
    "position: static | relative | absolute | fixed | sticky;",
    "خاصية تحديد الموقع الهيكلي",
    "كافة المتصفحات العالمية",
    [
      "تثبيت شريط الهيدر أعلى الصفحة أثناء التمرير position: sticky; top: 0",
      "وضع أيقونة العدسة وأزرار مسح النص داخل حقل البحث التفاعلي",
      "تثبيت أزرار العودة للأعلى والتنبيهات العائمة position: fixed"
    ],
    "css_position",
    ".search-wrapper {\n  position: relative; /* نقطة مرجعية لأيقونة البحث وأزرار المسح */\n}\n\n.search-glass-icon {\n  position: absolute;\n  right: 1rem;\n  top: 50%;\n  transform: translateY(-50%); /* محاذاة في المنتصف الرأسي تماماً */\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/position",
    [
      "position: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: position: static | relative | absolute | fixed | sticky;",
      "تُستخدم لضبط: تثبيت شريط الهيدر أعلى الصفحة أثناء التمرير position: sticky; top: 0."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "position: static | relative | absolute | fixed | sticky;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية تحديد الموقع الهيكلي"
      }
    ],
    [
      "grid (CSS Grid)",
      "animation & @keyframes",
      "@media",
      "display"
    ]
  ],
  [
    "css",
    "scroll-behavior",
    "انسيابية ونعومة التمرير",
    "scroll-behavior smooth scrolling تمرير انسيابي ناعم قفز صفحات",
    "تحدد نمط انتقال التمرير عند النقر على روابط القفز الداخلية (#hash)؛ تتيح تفعيل التمرير الانسيابي والناعم (smooth) بدلاً من القفز الفوري المزعج للمستخدم.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية scroll-behavior\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق scroll-behavior بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  html {\n  scroll-behavior: smooth; /* تمرير ناعم ومريح لكافة روابط الصفحة */\n}\n\n.lexicon-container {\n  scroll-behavior: smooth;\n}\n}\n</style>",
    "scroll-behavior: auto | smooth;",
    "خاصية سلوك التمرير بالصفحة",
    "جميع المتصفحات الحديثة",
    [
      "جعل الانتقال بين أقسام الصفحة والوثائق انسيابياً ومريحاً",
      "تحسين تجربة الانتقال لأعلى الصفحة عبر زر Back to top",
      "الاستغناء عن مكتبات jQuery القديمة التي كانت تُستخدم للتحريك التمريري"
    ],
    "css_scroll",
    "html {\n  scroll-behavior: smooth; /* تمرير ناعم ومريح لكافة روابط الصفحة */\n}\n\n.lexicon-container {\n  scroll-behavior: smooth;\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior",
    [
      "scroll-behavior: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: scroll-behavior: auto | smooth;",
      "تُستخدم لضبط: جعل الانتقال بين أقسام الصفحة والوثائق انسيابياً ومريحاً."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "scroll-behavior: auto | smooth;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية سلوك التمرير بالصفحة"
      }
    ],
    [
      "justify-content & align-items",
      "background",
      "border & border-radius",
      "grid (CSS Grid)"
    ]
  ],
  [
    "css",
    "transform & transition",
    "التحويلات الهندسية والانتقالات الحركية",
    "transform transition scale rotate translate حركة تحويل هندسي انسياب تكبير دوران",
    "ثنائي صناعة التفاعل البصري؛ تتيح transform تغيير حجم العنصر (scale)، وتدويره (rotate)، ونقله (translate)، بينما تضمن transition تحول هذه التغييرات بنعومة عبر فترة زمنية محددة بدلاً من التحول المفاجئ.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية transform & transition\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق transform & transition بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .interactive-btn {\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.interactive-btn:hover {\n  transform: translateY(-2px) scale(1.02);\n}\n\n.interactive-btn:active {\n  transform: translateY(0) scale(0.98);\n}\n}\n</style>",
    "transform: scale() | rotate() | translate(); transition: property duration timing-function;",
    "خصائص التحريك والتحويلات الهندسية في CSS",
    "كافة المتصفحات العالمية",
    [
      "إعطاء شعور بالعمق والاستجابة الفيزيائية للأزرار عند النقر والتحويم",
      "تحريك أسهم القوائم المنسدلة والدوران بزاوية 180 درجة rotate(180deg)",
      "بناء التأثيرات الانتقالية السلسة لظهور النوافذ المنبثقة"
    ],
    "css_transform",
    ".interactive-btn {\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.interactive-btn:hover {\n  transform: translateY(-2px) scale(1.02);\n}\n\n.interactive-btn:active {\n  transform: translateY(0) scale(0.98);\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/transform",
    [
      "transform & transition: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: transform: scale() | rotate() | translate(); transition: property duration timing-function;",
      "تُستخدم لضبط: إعطاء شعور بالعمق والاستجابة الفيزيائية للأزرار عند النقر والتحويم."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "transform: scale() | rotate() | translate(); transition: property duration timing-function;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خصائص التحريك والتحويلات الهندسية في CSS"
      }
    ],
    [
      "linear-gradient",
      "justify-content & align-items",
      "filter (blur, drop-shadow)",
      "overflow / overflow-x / y"
    ]
  ],
  [
    "css",
    "user-select",
    "التحكم في تحديد ونسخ النصوص",
    "user-select text selection منع تحديد نسخ نصوص واجهة أزرار",
    "تحدد ما إذا كان يمكن للمستخدم تحديد ونسخ النصوص داخل العنصر؛ تُستخدم user-select: none لمنع تحديد نصوص الأزرار والشارات بطريق الخطأ أثناء النقر السريع المتكرر.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية user-select\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق user-select بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .no-select-btn {\n  user-select: none; /* منع تحديد النص باللون الأزرق أثناء النقر */\n  -webkit-user-select: none;\n}\n\n.code-block {\n  user-select: all;  /* تحديد الكود بالكامل بنقرة واحدة لتسهيل النسخ */\n}\n}\n</style>",
    "user-select: none | auto | text | all | contain;",
    "خاصية تحكم في تفاعل المؤشر مع النصوص",
    "كافة المتصفحات الحديثة",
    [
      "منع تظليل نصوص الأزرار والتبويبات عند النقر المتكرر السريع",
      "تسهيل نسخ الأكواد البرمجية والمفاتيح بنقرة واحدة عبر user-select: all",
      "حماية أجزاء معينة من واجهة المستخدم من التحديد العرضي"
    ],
    "css_user_select",
    ".no-select-btn {\n  user-select: none; /* منع تحديد النص باللون الأزرق أثناء النقر */\n  -webkit-user-select: none;\n}\n\n.code-block {\n  user-select: all;  /* تحديد الكود بالكامل بنقرة واحدة لتسهيل النسخ */\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/user-select",
    [
      "user-select: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: user-select: none | auto | text | all | contain;",
      "تُستخدم لضبط: منع تظليل نصوص الأزرار والتبويبات عند النقر المتكرر السريع."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "user-select: none | auto | text | all | contain;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية تحكم في تفاعل المؤشر مع النصوص"
      }
    ],
    [
      "transform & transition",
      "scroll-behavior",
      "linear-gradient",
      "box-shadow"
    ]
  ],
  [
    "css",
    "width & height",
    "أبعاد العرض والارتفاع ومقاييس الحدود",
    "width height min-width max-width أبعاد عرض ارتفاع مقاييس حدود شاشة",
    "الخصائص الأساسية للتحكم في الأبعاد الفيزيائية للعناصر، مع دعم خصائص الحدود القصوى والدنيا (min-width, max-width, min-height, max-height) لضمان التجاوب ومنع انكسار التصميم.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية width & height\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق width & height بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  .container-responsive {\n  width: 100%;\n  max-width: 1400px; /* سقف عرض أقصى لمنع تمدد الصفحة المفرط في الشاشات العريضة */\n  margin: 0 auto;\n  min-height: 100vh; /* ملء ارتفاع الشاشة بالكامل على الأقل */\n}\n}\n</style>",
    "width: value; height: value; min-width: ...; max-width: ...;",
    "خصائص الأبعاد الصندوقية الأساسية",
    "كافة المتصفحات بلا استثناء",
    [
      "ضبط حاوية التطبيق المركزية بحد أقصى max-w-7xl",
      "ضمان تغطية خلفية التطبيق لكامل ارتفاع نافذة المتصفح min-h-screen",
      "تحديد أحجام حقول البحث والأزرار والصور الرمزية"
    ],
    "css_dimensions",
    ".container-responsive {\n  width: 100%;\n  max-width: 1400px; /* سقف عرض أقصى لمنع تمدد الصفحة المفرط في الشاشات العريضة */\n  margin: 0 auto;\n  min-height: 100vh; /* ملء ارتفاع الشاشة بالكامل على الأقل */\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/width",
    [
      "width & height: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: width: value; height: value; min-width: ...; max-width: ...;",
      "تُستخدم لضبط: ضبط حاوية التطبيق المركزية بحد أقصى max-w-7xl."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "width: value; height: value; min-width: ...; max-width: ...;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خصائص الأبعاد الصندوقية الأساسية"
      }
    ],
    [
      ":hover & :focus",
      "z-index",
      "linear-gradient",
      "background"
    ]
  ],
  [
    "css",
    "z-index",
    "ترتيب الطبقات والعمق على المحور العمودي (Z)",
    "z-index stacking context layers طبقات ترتيب عمودي تراكب تداخل نوافذ",
    "تحدد ترتيب تكديس العناصر المتموضعة (Positioned Elements) على المحور العمودي المتجه نحو المستخدم؛ العنصر ذو القيمة الأعلى يظهر فوق العناصر ذات القيم الأقل.",
    "<template>\n  <div class=\"css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center\">\n    <div class=\"target-element p-4 rounded-xl font-bold text-white shadow-lg\">\n      معاينة خاصية z-index\n    </div>\n  </div>\n</template>\n\n<script setup>\n// يتم تطبيق تنسيق z-index بنمط Scoped CSS أو Tailwind CSS\n<\\/script>\n\n<style scoped>\n.target-element {\n  /* هيكلية z-index الصارمة في VueLexicon Pro */\n.search-section {\n  position: relative;\n  z-index: 40; /* قسم البحث */\n}\n\n.search-dropdown-menu {\n  position: absolute;\n  z-index: 50; /* القائمة المنسدلة تعلو كافة المحتويات بالأسفل */\n}\n\n.tabs-filter-section {\n  position: relative;\n  z-index: 10; /* قسم التبويبات بالأسفل لمنع التداخل نهائياً */\n}\n}\n</style>",
    "z-index: auto | integerNumber;",
    "خاصية إدارة سياق التكديس (Stacking Context)",
    "كافة المتصفحات العالمية",
    [
      "منع تداخل القائمة المنسدلة للبحث الفوري مع أزرار الفلاتر والأقسام التي تليها",
      "ضمان ظهور النوافذ المنبثقة (Modals) فوق كافة عناصر التطبيق z-50",
      "تثبيت شريط الهيدر فوق المحتوى المتدفق أثناء التمرير z-40"
    ],
    "css_zindex",
    "/* هيكلية z-index الصارمة في VueLexicon Pro */\n.search-section {\n  position: relative;\n  z-index: 40; /* قسم البحث */\n}\n\n.search-dropdown-menu {\n  position: absolute;\n  z-index: 50; /* القائمة المنسدلة تعلو كافة المحتويات بالأسفل */\n}\n\n.tabs-filter-section {\n  position: relative;\n  z-index: 10; /* قسم التبويبات بالأسفل لمنع التداخل نهائياً */\n}",
    "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/z-index",
    [
      "z-index: خاصية تنسيق بصرية في محرك المتصفح.",
      "الصيغة: z-index: auto | integerNumber;",
      "تُستخدم لضبط: منع تداخل القائمة المنسدلة للبحث الفوري مع أزرار الفلاتر والأقسام التي تليها."
    ],
    "⚠️ انتبه لتأثير الـ Specificity ومحاذاة الصناديق في Box-Sizing؛ يفضل دائماً استخدام الفئات المنظمة بدلاً من التنسيق العشوائي.",
    [
      {
        "name": "syntax",
        "type": "Syntax",
        "desc": "z-index: auto | integerNumber;"
      },
      {
        "name": "returns",
        "type": "Type",
        "desc": "خاصية إدارة سياق التكديس (Stacking Context)"
      }
    ],
    [
      "user-select",
      "width & height",
      "position",
      "linear-gradient"
    ]
  ],
  [
    "ts",
    "Primitive Types",
    "الأنواع البدائية في TypeScript (string, number, boolean)",
    "primitive types string number boolean symbol bigint typescript نوع أولي بدائي نصوص أرقام منطقي",
    "الأنواع الأساسية المدمجة في لغة TypeScript لتمثيل القيم البسيطة: النصوص (string)، الأرقام (number وتشمل الصحيحة والعشرية)، القيم المنطقية (boolean)، الرموز (symbol)، والأعداد الكبيرة (bigint). توفر أماناً للنوع وقت الكتابة والترجمة.",
    "<template>\n  <div class=\"space-y-3 p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white\">\n    <div class=\"flex items-center justify-between\">\n      <span class=\"text-xs font-mono text-blue-400 font-bold\">Primitive Types Demo</span>\n      <span class=\"text-[10px] text-gray-400\">TypeScript 5.x</span>\n    </div>\n    <div class=\"grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono\">\n      <div class=\"p-2.5 rounded-lg bg-slate-800 border border-slate-700\">\n        <span class=\"text-gray-400 block text-[10px]\">string:</span>\n        <span class=\"text-emerald-400 font-bold\">{{ username }}</span>\n      </div>\n      <div class=\"p-2.5 rounded-lg bg-slate-800 border border-slate-700\">\n        <span class=\"text-gray-400 block text-[10px]\">number:</span>\n        <span class=\"text-amber-400 font-bold\">{{ userAge }} سنة</span>\n      </div>\n      <div class=\"p-2.5 rounded-lg bg-slate-800 border border-slate-700\">\n        <span class=\"text-gray-400 block text-[10px]\">boolean:</span>\n        <span :class=\"isActive ? 'text-emerald-400' : 'text-rose-400'\">{{ isActive ? 'نشط (true)' : 'معطل' }}</span>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref } from 'vue';\n\nconst username = ref<string>('حيدر');\nconst userAge = ref<number>(27);\nconst isActive = ref<boolean>(true);\n<\\/script>",
    "let name: string = \"Ali\"; let count: number = 42; let ok: boolean = true;",
    "قيمة من النوع البدائي المحدد (Type-checked value)",
    "TypeScript 4.x / 5.x / متصفحات الويب",
    [
      "حماية المتغيرات من تخزين أنواع غير متوقعة مثل وضع نص في متغير عددي",
      "توفير الإكمال التلقائي الذكي (IntelliSense) لخصائص النوع في المحرر",
      "منع أخطاء وقت التشغيل الشائعة مثل TypeError: undefined is not a function"
    ],
    "ts_primitive",
    "// في JavaScript العادي: الأنواع ديناميكية وقابلة للتغيير المفاجئ\nlet username = 'حيدر';\nusername = 123; // جائز في JS ولكنه يسبب أخطاء خفية!",
    "في JavaScript النوع يتبع القيمة وقت التشغيل، بينما في TypeScript يتم فحص النوع ثابتاً (Static Checking) قبل التشغيل لمنع الخلل.",
    "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean",
    [
      "let x: string: يمنع المترجم إسناد أي قيمة غير نصية للمتغير.",
      "number: يشمل الأعداد الصحيحة والفواصل العشرية و NaN و Infinity.",
      "boolean: يقبل فقط true أو false دون تحويل ضمني للأنماط الأخرى."
    ],
    "⚠️ استخدام الأنواع الكائنية بحرف كبير مثل String أو Number بدل الأنواع البدائية string و number هو خطأ شائع؛ حيث تشير الأحرف الكبيرة إلى كائنات التغليف (Wrapper Objects).",
    [
      {
        "name": "string",
        "type": "primitive",
        "desc": "يمثل النصوص والسلاسل المحرفية"
      },
      {
        "name": "number",
        "type": "primitive",
        "desc": "يمثل الأعداد الحسابية بكافة أنواعها"
      },
      {
        "name": "boolean",
        "type": "primitive",
        "desc": "يمثل الحالات المنطقية الثنائية"
      }
    ],
    [
      "Type Annotations",
      "Type Inference",
      "Tuples & Readonly Arrays",
      "unknown vs any vs never"
    ]
  ],
  [
    "ts",
    "Type Annotations",
    "تصريح وتعيين الأنواع (Type Annotations)",
    "type annotation explicit typing typescript توضيح تصريح تحديد نوع المتغيرات والمعاملات",
    "الصيغة الصريحة لإخبار مترجم TypeScript بنوع المتغير أو معامل الدالة أو القيمة المعادة باستخدام النقطتين الرأسيتين (: Type). تضمن وضوح القصد البرمجي وتمنع الانحراف عن النمط المقصود.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2\">\n    <div class=\"text-xs font-mono text-blue-400 font-bold\">Type Annotations Demo</div>\n    <div class=\"text-xs text-slate-300\">\n      حساب السعر مع الضريبة: <span class=\"font-mono text-emerald-400 font-bold\">{{ calculateTotal(100, 0.15) }} ر.س</span>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nfunction calculateTotal(price: number, taxRate: number): number {\n  return price * (1 + taxRate);\n}\n<\\/script>",
    "const identifier: Type = value; function fn(arg: Type): ReturnType",
    "تطبيق قيود صارمة على المعرف (Strict Type Enforcement)",
    "TypeScript 4.x / 5.x",
    [
      "توثيق دوال الـ API وتوضيح المعاملات المطلوبة للمطورين الآخرين",
      "تحديد نوع المتغير عند تعريفه دون إسناد قيمة فورية له",
      "إلزام الدوال بإرجاع النمط المتوقع بدقة"
    ],
    "ts_interactive",
    "// في JavaScript العادي: لا توجد تصريحات أنواع\nfunction calculateTotal(price, taxRate) {\n  return price * (1 + taxRate);\n}",
    "تزيل Type Annotations الغموض تماماً عن كود JavaScript، وتتيح للمحرر فحص الأخطاء أثناء كتابة المعاملات مباشرة.",
    "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-annotations-on-variables",
    [
      "price: number: يلزم الممرر بأن يكون عدداً صحيحاً أو عشرياً.",
      ": number بعد القوسين: يحدد نوع القيمة المعادة من الدالة ويمنع نسيان return.",
      "عدم كتابة نوع يؤدي لاعتماد Type Inference أو الوقوع في any إذا تعذر الاستنتاج."
    ],
    "⚠️ الإفراط في كتابة Annotations حيث يكون الاستنتاج التلقائي جلياً (مثل const x: number = 5) يزيد التكرار دون فائدة حقيقية.",
    [
      {
        "name": ": Type",
        "type": "Syntax",
        "desc": "رمز تعيين النوع الصريح للمتغير أو المعامل"
      },
      {
        "name": ": ReturnType",
        "type": "Syntax",
        "desc": "رمز تعيين نمط ناتج الدالة"
      }
    ],
    [
      "Primitive Types",
      "Type Inference",
      "Function Typing & Signatures",
      "interface"
    ]
  ],
  [
    "ts",
    "Type Inference",
    "الاستنتاج التلقائي للأنواع (Type Inference)",
    "type inference automatic deduce typescript استنتاج تخمين تلقائي ذكي نوع",
    "قدرة محرك ومترجم TypeScript على استنتاج نوع المتغير أو ناتج الدالة تلقائياً من القيمة المسندة أو سياق الاستخدام دون الحاجة لكتابة نوع صريح يدوياً، مما يحافظ على الكود نظيفاً دون التضحية بالأمان.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">Type Inference Demo</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg font-mono text-emerald-400\">\n      {{ siteName }} (الإصدار {{ version }})\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref } from 'vue';\n\n// استنتاج تلقائي: siteName مستنتج كـ string و version كـ number\nconst siteName = ref('VueLexicon Pro');\nconst version = ref(3.5);\n<\\/script>",
    "let x = 10; // x: number مستنتج تلقائياً",
    "النوع المستنتج تلقائياً (Inferred Type)",
    "TypeScript 4.x / 5.x",
    [
      "كتابة كود نظيف ومختصر شبيه بـ JavaScript مع الحفاظ على كامل أمان TypeScript",
      "استنتاج أنواع القيم المعادة من الدوال المعقدة تلقائياً",
      "الاستنتاج السياقي (Contextual Typing) في دوال معالجة الأحداث"
    ],
    "ts_interactive",
    "// في JS: لا يتم استنتاج أنواع ولا يوجد حظر\nlet count = 0;\ncount = \"غير رقم\"; // يعمل في JS ويؤدي لأخطاء لاحقة",
    "الاستنتاج في TypeScript يعطي نفس قوة الأمان الصريحة بالضبط مع كتابة كود أقل.",
    "https://www.typescriptlang.org/docs/handbook/2/type-inference.html",
    [
      "let msg = \"مرحباً\": المترجم يسند لها نوع string نهائياً.",
      "const pi = 3.14: يستنتج Literal Type للقيمة 3.14 تحديداً لأنها ثابتة.",
      "دوال المصفوفات مثل [1, 2, 3].map(n => n * 2): يستنتج تلقائياً أن n هو number."
    ],
    "⚠️ إذا لم تسند قيمة للمتغير عند تعريفه ولم تضع نوعاً (مثل let data;)، سيستنتج المترجم نوعه كـ any مما يعطل فحص الأمان.",
    [
      {
        "name": "Literal Inference",
        "type": "Feature",
        "desc": "استنتاج القيمة المحددة بدقة مع const"
      },
      {
        "name": "Contextual Typing",
        "type": "Algorithm",
        "desc": "استنتاج النوع بناءً على موقع الكود في الشجرة"
      }
    ],
    [
      "Type Annotations",
      "Primitive Types",
      "unknown vs any vs never",
      "Generics (<T>)"
    ]
  ],
  [
    "ts",
    "interface",
    "واجهات هيكل الكائنات (interface)",
    "interface object contract typescript واجهة كائن عقد هيكل خصائص",
    "الأداة الأساسية في TypeScript لتعريف شكل وهيكل الكائنات (Object Shape) والتعاقدات البرمجية. تتيح تحديد الخصائص الإلزامية والاختيارية وتدعم الوراثة والتوسعة (extends) والدمج التلقائي للتصريحات (Declaration Merging).",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-3\">\n    <div class=\"flex items-center justify-between\">\n      <span class=\"text-xs font-mono text-blue-400 font-bold\">User Card (Interface Typed)</span>\n      <span class=\"text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded\">Strict Interface</span>\n    </div>\n    <div class=\"p-3 bg-slate-950 rounded-lg text-xs font-mono space-y-1\">\n      <div>الاسم: <span class=\"text-emerald-400\">{{ user.name }}</span></div>\n      <div>البريد: <span class=\"text-sky-400\">{{ user.email }}</span></div>\n      <div>الدور: <span class=\"text-amber-400\">{{ user.role || 'عضو عادي' }}</span></div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\ninterface UserProfile {\n  id: number;\n  name: string;\n  email: string;\n  role?: 'admin' | 'editor' | 'viewer';\n  readonly createdAt: Date;\n}\n\nconst user: UserProfile = {\n  id: 101,\n  name: 'سارة العتيبي',\n  email: 'sara@example.com',\n  role: 'admin',\n  createdAt: new Date()\n};\n<\\/script>",
    "interface Name { prop: Type; optional?: Type; readonly id: number; }",
    "نوع كائن مجرد (Interface Contract Type)",
    "TypeScript 3.x+ / 5.x",
    [
      "تحديد بنية استجابات واجهات برمجة التطبيقات (API Responses) بدقة",
      "تعريف خصائص Props لمكونات واجهات المستخدم في Vue و React",
      "تطبيق مبادئ البرمجة كائنية التوجه (OOP) وتوسيع الهياكل بـ extends"
    ],
    "ts_interface",
    "// في JavaScript: كائنات بدون واجهات ملزمة\nconst user = {\n  id: 101,\n  name: 'سارة العتيبي',\n  email: 'sara@example.com'\n};",
    "تمنع interface الأخطاء الشائعة مثل user.emial وتكشفها أثناء الكتابة، وتختفي تماماً بعد التحويل إلى JS.",
    "https://www.typescriptlang.org/docs/handbook/2/objects.html#interfaces",
    [
      "prop?: Type: علامة الاستفهام تجعل الخاصية اختيارية.",
      "readonly prop: Type: تمنع تعديل قيمة الخاصية بعد الإنشاء الأولي.",
      "extends: تتيح لواجهة أن ترث وتضيف على واجهة سابقة."
    ],
    "⚠️ الواجهات لا تملك تمثيلاً وقت التشغيل (Runtime Overhead = 0)؛ فهي تنعدم تماماً في ملف JavaScript الناتج ولا يمكن فحصها بـ instanceof.",
    [
      {
        "name": "extends",
        "type": "Keyword",
        "desc": "وراثة وتوسيع واجهة أخرى"
      },
      {
        "name": "readonly",
        "type": "Modifier",
        "desc": "قفل الخاصية ضد التعديل بعد التهيئة"
      },
      {
        "name": "?",
        "type": "Modifier",
        "desc": "جعل الخاصية اختيارية"
      }
    ],
    [
      "type (Type Alias)",
      "Intersection Types (&)",
      "defineProps<Props>()",
      "Generics (<T>)"
    ]
  ],
  [
    "ts",
    "type (Type Alias)",
    "الأسماء المستعارة للأنواع (Type Aliases)",
    "type alias union primitive tuple typescript نوع مستعار بديل اسم مخصص",
    "تتيح الكلمة المفتاحية `type` إنشاء اسم مخصص لأي نوع بيانات في TypeScript، سواء كان كائناً أو اتحاداً بين أنواع متعددة (Union)، أو نوعاً بدائياً، أو Tuple، أو دالة. تعد الأكثر مرونة للتعامل مع الأنواع المركبة والمعقدة.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-3\">\n    <div class=\"text-xs font-mono text-blue-400 font-bold\">Type Alias: Status Badge</div>\n    <div class=\"flex items-center gap-2\">\n      <span class=\"text-xs text-gray-400\">الحالة الحالية:</span>\n      <span :class=\"statusBadgeClass\" class=\"px-2.5 py-1 rounded text-xs font-mono font-bold\">\n        {{ currentStatus }}\n      </span>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, computed } from 'vue';\n\ntype Status = 'idle' | 'loading' | 'success' | 'error';\ntype ID = string | number;\n\nconst currentStatus = ref<Status>('success');\n\nconst statusBadgeClass = computed(() => {\n  switch (currentStatus.value) {\n    case 'success': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';\n    case 'loading': return 'bg-amber-500/20 text-amber-400 border border-amber-500/40';\n    case 'error': return 'bg-rose-500/20 text-rose-400 border border-rose-500/40';\n    default: return 'bg-slate-800 text-gray-300';\n  }\n});\n<\\/script>",
    "type Status = \"success\" | \"error\"; type UserID = string | number;",
    "اسم نمط بديل (Type Alias Definition)",
    "TypeScript 3.x+ / 5.x",
    [
      "إنشاء Union Types محددة لقيم الحالات (مثل أنواع أزرار أو أحداث)",
      "تسمية الهياكل المعقدة مثل الدوال والمصفوفات المركبة",
      "تطبيق أدوات التحويل البرمجي للأنواع (Mapped Types)"
    ],
    "ts_interactive",
    "// في JS: تمثيل الحالات عبر نصوص عشوائية أو كائنات تجميد\nconst STATUS = { SUCCESS: 'success', ERROR: 'error' };",
    "الـ type في TypeScript يسمح بتمثيل Primitives و Unions، في حين أن interface مخصصة بشكل أساسي لهياكل الكائنات القابلة للتوسيع.",
    "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases",
    [
      "type Name = ...: يعرّف اسماً مستعاراً يمكن استخدامه في أي مكان يُطلب فيه نوع.",
      "لا يمكن إعادة فتح type لإضافة خصائص جديدة كما في interface declaration merging.",
      "يدعم دمج الأنواع عبر تقاطع & والاتحاد |."
    ],
    "⚠️ الخطأ في كتابة علامة المساوي = بعد اسم النوع؛ interface لا تحتاج = بينما type تتطلب علامة المساواة = دائماً.",
    [
      {
        "name": "=",
        "type": "Syntax",
        "desc": "رمز تعيين القيمة للنوع المستعار"
      },
      {
        "name": "|",
        "type": "Operator",
        "desc": "الاتحاد بين أنواع متعددة"
      }
    ],
    [
      "interface",
      "Union Types (|)",
      "Intersection Types (&)",
      "Utility Types: Pick<T> & Omit<T>"
    ]
  ],
  [
    "ts",
    "Union Types (|)",
    "الاتحاد بين الأنواع المتعددة (Union Types)",
    "union types pipe typescript اتحاد تعدد احتمالات خيارات قيم بديلة",
    "نمط يتيح للمتغير أو المعامل قبول واحدة من بين عدة خيارات للأنواع باستخدام الرمز العمودي (|). يعبر عن أن القيمة يمكن أن تكون من النوع A أو النوع B، ويتطلب تضييق النمط (Type Narrowing) قبل استخدام خصائص فريدة لكل نوع.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">Union Types Demo</div>\n    <div>المعرف المنسق: <span class=\"font-mono text-emerald-400\">{{ formatId(1024) }}</span></div>\n    <div>المعرف النصي: <span class=\"font-mono text-amber-400\">{{ formatId('usr_988') }}</span></div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\ntype Identifier = string | number;\n\nfunction formatId(id: Identifier): string {\n  // تضييق النوع للتعامل مع الرقم أو النص بأمان\n  if (typeof id === 'number') {\n    return 'ID-' + id.toFixed(0);\n  }\n  return id.toUpperCase();\n}\n<\\/script>",
    "type Result = Success | Failure; let id: string | number;",
    "نوع مركب متعدد الاحتمالات (Union Type)",
    "TypeScript 3.x+ / 5.x",
    [
      "استقبال معاملات تقبل رقماً أو نصاً دون اللجوء لـ any",
      "تحديد مجموعة قيم نصية حصرية (Discriminated String Literals)",
      "تمثيل حالات النجاح والفشل في استجابات الشبكة"
    ],
    "ts_interactive",
    "// في JS: لا يتم التحقق من صحة القيمة إلا داخل المنطق اليدوي\nfunction formatId(id) {\n  return typeof id === 'number' ? 'ID-' + id : id.toUpperCase();\n}",
    "يمنع TypeScript تشغيل دوال غير مشتركة بين النمطين حتى يتأكد المترجم من نوع المتغير عبر typeof أو حارس نمط.",
    "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types",
    [
      "A | B: تعني أن المتغير يقبل إما النوع A أو النوع B.",
      "فقط الخصائص المشتركة بين A و B متاحة مباشرة قبل تضييق النوع.",
      "يستخدم بكثرة مع Discriminated Unions للتمييز بحقل مشترك مثل kind أو type."
    ],
    "⚠️ محاولة استدعاء دالة خاصة بأحد الأنواع (مثل .toFixed() على string | number) قبل التضييق سينتج عنه خطأ ترجمة فوري.",
    [
      {
        "name": "|",
        "type": "Operator",
        "desc": "رمز الفصل بين أنواع الاتحاد"
      }
    ],
    [
      "Intersection Types (&)",
      "Type Narrowing & Guards",
      "type (Type Alias)",
      "unknown vs any vs never"
    ]
  ],
  [
    "ts",
    "Intersection Types (&)",
    "تقاطع ودمج الأنواع (Intersection Types)",
    "intersection types ampersand combine merge typescript تقاطع دمج تجميع كائنات",
    "طريقة لدمج عدة أنواع في نوع واحد يجمع جميع خصائص الأنواع المتقاطعة معاً باستخدام الرمز (&). الكائن المتوافق مع هذا النوع يجب أن يحتوي على كل الحقول المعرفة في كافة الأنواع المشتركة.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">Intersection Types (&) Demo</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg space-y-1\">\n      <div>المسؤول: <span class=\"text-emerald-400\">{{ admin.name }}</span> (مستوى الصلاحية: {{ admin.level }})</div>\n      <div>الصلاحيات: <span class=\"font-mono text-amber-300\">{{ admin.permissions.join(', ') }}</span></div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\ntype Person = { name: string; age: number; };\ntype AdminStaff = { level: number; permissions: string[]; };\n\n// دمج النوعين معاً في كائن واحد متكامل\ntype SuperAdmin = Person & AdminStaff;\n\nconst admin: SuperAdmin = {\n  name: 'أحمد الصالح',\n  age: 32,\n  level: 1,\n  permissions: ['MANAGE_USERS', 'DEPLOY_PROD']\n};\n<\\/script>",
    "type Combined = TypeA & TypeB;",
    "نوع مدمج موحد (Intersection Type)",
    "TypeScript 3.x+ / 5.x",
    [
      "تركيب نماذج البيانات وتوريث الخصائص بمرونة بدون كلاسات تقليدية",
      "دمج تكوينات المكونات مع خيارات افتراضية",
      "توسيع أنواع مكتبات الطرف الثالث بإضافة حقول مخصصة"
    ],
    "ts_interactive",
    "// في JS: دمج كائنات بـ Object.assign دون فحص تكاملي\nconst admin = Object.assign({}, person, adminStaff);",
    "يضمن تقاطع الأنواع اكتمال كل الحقول من كافة الأطراف المدمجة وقت الترجمة.",
    "https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types",
    [
      "A & B: الكائن الناتج يحوي جميع خصائص A بالإضافة لجميع خصائص B.",
      "إذا تعارض نوع نفس الخاصية (مثل id: string & number)، يتحول نوع الحقل إلى never لأنه يستحيل تحقيقه."
    ],
    "⚠️ تعارض الأنواع على نفس الخاصية قد ينتج عنه نوع never مستحيل الإسناد دون خطأ فوري في سطر التعريف.",
    [
      {
        "name": "&",
        "type": "Operator",
        "desc": "رمز دمج وتقاطع الأنواع"
      }
    ],
    [
      "Union Types (|)",
      "interface",
      "type (Type Alias)",
      "Utility Types: Record<K, T>"
    ]
  ],
  [
    "ts",
    "Generics (<T>)",
    "الأنماط والقوالب العامة المعممة (Generics)",
    "generics type parameter reusable dynamic typescript قوالب عامة مرنة معاملات أنماط",
    "أداة برمجية تسمح بإنشاء دوال وواجهات وفئات قابلة لإعادة الاستخدام مع أنواع بيانات مختلفة دون التضحية بأمان النوع. تعمل كمعاملات للأنواع (Type Variables)، حيث يمرر النوع كمتغير مثل `<T>`.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">Generics &lt;T&gt; Demo</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg font-mono space-y-1\">\n      <div>العنصر الأول في النصوص: <span class=\"text-emerald-400\">{{ firstString }}</span></div>\n      <div>العنصر الأول في الأرقام: <span class=\"text-amber-400\">{{ firstNumber }}</span></div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\n// دالة عامة تحتفظ بالنوع الممرر أياً كان\nfunction getFirstItem<T>(items: T[]): T | undefined {\n  return items[0];\n}\n\nconst firstString = getFirstItem(['Vue', 'Nuxt', 'TypeScript']); // T مستنتج كـ string\nconst firstNumber = getFirstItem([10, 20, 30]); // T مستنتج كـ number\n<\\/script>",
    "function identity<T>(arg: T): T; interface Box<T> { content: T; }",
    "نمط مرن مشروط بالقالب (Generic Type)",
    "TypeScript 3.x+ / 5.x",
    [
      "بناء واجهات API ومغلفات HTTP عامة مثل ApiResponse<T>",
      "دوال المعالجة المتقدمة للمصفوفات والكائنات دون فقدان نوع الحقول",
      "تغليف الحالة التفاعلية في Vue مثل ref<T>() و computed<T>()"
    ],
    "ts_generic",
    "// في JS: لا توجد قوالب عامة، الدوال تعود بقيم مجهولة النمط\nfunction getFirstItem(items) {\n  return items[0];\n}",
    "تمنح Generics أماناً تاماً للنوع الراجع بالاعتماد على النوع المدخل دون تكرار كتابة الدوال لكل نوع.",
    "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    [
      "<T>: تصريح معامل النوع العام.",
      "<T extends Lengthwise>: تقييد القالب العام بأن يشترط وجود خصائص معينة.",
      "<T = string>: تعيين نوع افتراضي للقالب إذا لم يُحدد."
    ],
    "⚠️ استخدام any بدلاً من القوالب العامة يلغي تماماً قدرة TypeScript على التحقق من صحة ناتج الدالة واستنتاجه في الكود اللاحق.",
    [
      {
        "name": "<T>",
        "type": "Type Parameter",
        "desc": "معامل النوع العام المخصص"
      },
      {
        "name": "extends",
        "type": "Constraint",
        "desc": "تقييد النوع العام بشروط محددة"
      }
    ],
    [
      "Ref<T> & reactive typing",
      "Utility Types: Record<K, T>",
      "Function Typing & Signatures",
      "interface"
    ]
  ],
  [
    "ts",
    "Type Narrowing & Guards",
    "تضييق نطاق الأنواع وحراس النمط (Type Narrowing)",
    "type narrowing type guards typeof instanceof in typescript تضييق فحص حراس نمط شروط",
    "العملية التي يقوم بها TypeScript لتحويل نوع عام أو متعدد (مثل union) إلى نوع أكثر تحديداً ودقة داخل كتل الشروط البرمجية، اعتماداً على فحوص مثل typeof و instanceof والمعامل in وحراس النمط المخصصة (Custom Type Guards).",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">Type Narrowing Demo</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg space-y-1\">\n      <div>الناتج عند تمرير نص: <span class=\"font-mono text-emerald-400\">{{ processInput('vuelexicon') }}</span></div>\n      <div>الناتج عند تمرير رقم: <span class=\"font-mono text-amber-400\">{{ processInput(42.856) }}</span></div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nfunction processInput(val: string | number): string {\n  // تضييق النوع بواسطة typeof guard\n  if (typeof val === 'string') {\n    // داخل هذا البلوك: val هو string مؤكد ومتاح له .toUpperCase()\n    return val.toUpperCase();\n  } else {\n    // داخل هذا البلوك: val هو number مؤكد ومتاح له .toFixed()\n    return val.toFixed(2);\n  }\n}\n<\\/script>",
    "if (typeof x === \"string\") { ... } if (\"role\" in user) { ... }",
    "تضييق النطاق السياقي للمتغير (Narrowed Type Scope)",
    "TypeScript 3.x+ / 5.x",
    [
      "معالجة استجابات الخادم التي قد تعود ببيانات أو رسالة خطأ",
      "فحص كائنات الأحداث والـ DOM Elements بدقة",
      "تأكيد أنواع النماذج والمدخلات قبل الحفظ أو الإرسال"
    ],
    "ts_interactive",
    "// في JS: الفحص اليدوي يعمل ولكن المحرر لا يعلم بتغير النمط\nif (typeof val === 'string') {\n  return val.toUpperCase();\n}",
    "يدرك محلل TypeScript مسارات الكود (Control Flow Analysis) ويغير نوع المتغير في كل مسار شرطي بدقة متناهية.",
    "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
    [
      "typeof val === \"string\": حارس لأنواع JS البدائية.",
      "val instanceof Date: حارس للكائنات المنشأة بكلاسات أو دوال بناء.",
      "\"property\" in obj: حارس للتأكد من وجود خاصية معينة في الكائن.",
      "value is Type: دالة حارس نمط مخصصة (Custom Type Predicate)."
    ],
    "⚠️ الاعتماد على typeof null يعود بـ \"object\" في JavaScript؛ لذا يجب الحذر عند فحص الكائنات المحتمل أن تكون فارغة.",
    [
      {
        "name": "typeof",
        "type": "Guard",
        "desc": "فحص الأنواع البدائية الأساسية"
      },
      {
        "name": "instanceof",
        "type": "Guard",
        "desc": "فحص صنف الكائن المرجعي"
      },
      {
        "name": "in",
        "type": "Guard",
        "desc": "التحقق من وجود مفتاح داخل الكائن"
      }
    ],
    [
      "Union Types (|)",
      "unknown vs any vs never",
      "Primitive Types",
      "type (Type Alias)"
    ]
  ],
  [
    "ts",
    "Utility Types: Partial<T> & Required<T>",
    "أنواع الأدوات المساعدة: الجزئي والإلزامي (Partial & Required)",
    "utility types partial required optional typescript أدوات مساعدة جزئي إلزامي اختياري",
    "أدوات مدمجة في TypeScript لتوليد أنواع مشتقة: `Partial<T>` يجعل جميع خصائص النوع T اختيارية، بينما `Required<T>` يعكس العملية ويجعل جميع الخصائص إلزامية حتى لو كانت معرفة بعلامة الاستفهام (?) مسبقاً.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">Partial&lt;T&gt; Update Demo</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg\">\n      <div>المستخدم الأصلي: <span class=\"text-gray-300\">{{ originalUser.name }} ({{ originalUser.email }})</span></div>\n      <div class=\"mt-1 text-emerald-400\">تحديث حقل واحد مسموح عبر Partial&lt;User&gt; ✓</div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst originalUser: User = { id: 1, name: 'سارة', email: 'sara@example.com' };\n\n// دالة تحديث تقبل فقط الحقول المراد تعديلها\nfunction updateUser(user: User, patch: Partial<User>): User {\n  return { ...user, ...patch };\n}\n\nconst updated = updateUser(originalUser, { email: 'new_sara@example.com' });\n<\\/script>",
    "type OptionalUser = Partial<User>; type StrictUser = Required<User>;",
    "نوع محول مشتق (Transformed Mapped Type)",
    "TypeScript 3.x+ / 5.x",
    [
      "دوال تحديث النماذج وتعديل البيانات الجزئي (PATCH APIs)",
      "تجهيز إعدادات افتراضية مدمجة مع خيارات المستخدم الاختيارية",
      "إلزام المكونات بتمرير كافة الخصائص الممكنة في وضع الإعداد الصارم"
    ],
    "ts_interactive",
    "// في JS: لا يوجد تمييز بين الكائن الكامل وجزئياته\nfunction updateUser(user, patch) {\n  return Object.assign({}, user, patch);\n}",
    "Partial<T> يمنع الحاجة لإعادة كتابة واجهة ثانية بكل خصائصها بعلامة الاستفهام، مما يمنع تكرار الكود.",
    "https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype",
    [
      "Partial<T>: يضيف علامة ؟ لكل خاصية في النوع T.",
      "Required<T>: يزيل علامة ؟ من كل خاصية ليجعلها إلزامية حتماً.",
      "يعملان بعمق مستوى واحد (Shallow) وليس بعمق الكائنات المتداخلة (Deep)."
    ],
    "⚠️ Partial لا تجعل القيم undefined صراحة، بل تجعل المفتاح اختيارياً في الكائن.",
    [
      {
        "name": "Partial<T>",
        "type": "Utility Type",
        "desc": "جعل جميع الخصائص اختيارية"
      },
      {
        "name": "Required<T>",
        "type": "Utility Type",
        "desc": "جعل جميع الخصائص إلزامية"
      }
    ],
    [
      "Utility Types: Pick<T> & Omit<T>",
      "interface",
      "type (Type Alias)",
      "Generics (<T>)"
    ]
  ],
  [
    "ts",
    "Utility Types: Pick<T> & Omit<T>",
    "أنواع الأدوات: انتقاء واستبعاد الخصائص (Pick & Omit)",
    "utility types pick omit extract filter keys typescript انتقاء استبعاد اختيار حقول",
    "أداتان متكاملتان لتخصيص الكائنات: `Pick<T, Keys>` تُنشئ نوعاً جديداً عن طريق انتقاء مجموعة محددة من المفاتيح من النوع T، بينما `Omit<T, Keys>` تُنشئ نوعاً جديداً باستبعاد مفاتيح معينة والإبقاء على الباقي.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">Pick &amp; Omit Demo</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg space-y-1\">\n      <div>بطاقة المعاينة (Pick): <span class=\"font-mono text-emerald-400\">{{ previewCard.title }}</span></div>\n      <div>بيانات الإنشاء بدون المعرف (Omit): <span class=\"font-mono text-sky-400\">{{ newArticle.title }}</span></div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\ninterface Article {\n  id: number;\n  title: string;\n  content: string;\n  author: string;\n  publishedAt: Date;\n}\n\n// انتقاء العنوان والمؤلف فقط لبطاقة العرض\ntype ArticlePreview = Pick<Article, 'title' | 'author'>;\n\n// استبعاد الـ id وتاريخ النشر عند إرسال نموذج إنشاء جديد\ntype CreateArticleDto = Omit<Article, 'id' | 'publishedAt'>;\n\nconst previewCard: ArticlePreview = { title: 'مقدمة في Vue 3', author: 'حيدر' };\nconst newArticle: CreateArticleDto = { title: 'دليل TypeScript', content: 'محتوى شامل...', author: 'حيدر' };\n<\\/script>",
    "type Short = Pick<Full, \"id\" | \"name\">; type WithoutSecret = Omit<Full, \"password\">;",
    "نوع مستخلص مخصص (Extracted Subset Type)",
    "TypeScript 3.x+ / 5.x",
    [
      "إنشاء كائنات DTO لإرسال النماذج إلى الخادم دون الحقول المحمية مثل id",
      "تجريد كائنات الواجهة المعقدة لعرض ملخصات وبطاقات سريعة",
      "حذف الحقول الحساسة مثل كلمات المرور والرموز السرية من أنواع واجهات العرض"
    ],
    "ts_interactive",
    "// في JS: استخراج الخصائص عبر تفكيك الكائنات يدparam\nconst { password, ...safeUser } = fullUser;",
    "تمنح Pick و Omit أماناً على مستوى المترجم يضمن بقاء توافق الحقول عند تحديث الواجهة الأصلية.",
    "https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys",
    [
      "Pick<T, K>: يختار فقط المفاتيح K المعرفة في T.",
      "Omit<T, K>: يحذف المفاتيح K ويحتفظ بجميع المفاتيح الأخرى.",
      "K يمكن أن تكون مفتاحاً واحداً أو اتحاد مفاتيح مثل \"a\" | \"b\"."
    ],
    "⚠️ تمرير اسم خاصية غير موجودة في T إلى Pick سيعطي خطأ فوري؛ بينما Omit قد تقبل أسماء غير موجودة دون تحذير في بعض الإصدارات.",
    [
      {
        "name": "Pick<T, K>",
        "type": "Utility Type",
        "desc": "انتقاء مفاتيح محددة"
      },
      {
        "name": "Omit<T, K>",
        "type": "Utility Type",
        "desc": "استبعاد مفاتيح محددة"
      }
    ],
    [
      "Utility Types: Partial<T> & Required<T>",
      "Utility Types: Record<K, T>",
      "interface",
      "type (Type Alias)"
    ]
  ],
  [
    "ts",
    "Utility Types: Record<K, T>",
    "نوع السجل الموجه للمفاتيح والقيم (Record<K, T>)",
    "record dictionary map key value utility typescript قاموس خريطة مفاتيح قيم سجل",
    "أداة لإنشاء نوع كائن بمفاتيح محددة من النوع K وقيم موحدة من النوع T. مثالية لبناء القواميس (Dictionaries)، جداول البحث (Lookup Tables)، وتخطيطات الكائنات المرتبطة بقوائم ثابتة من المفاتيح.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">Record&lt;K, T&gt; Config Demo</div>\n    <div class=\"grid grid-cols-3 gap-2 text-center font-mono\">\n      <div v-for=\"(cfg, role) in roleConfigs\" :key=\"role\" class=\"p-2 rounded bg-slate-800 border border-slate-700\">\n        <span class=\"text-gray-400 text-[10px] block\">{{ role }}</span>\n        <span class=\"font-bold text-[#00DC82]\">{{ cfg.badge }}</span>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\ntype UserRole = 'admin' | 'moderator' | 'user';\n\ninterface RoleMeta {\n  badge: string;\n  canDelete: boolean;\n}\n\n// إلزام الكائن بتغطية كافة الرتب الثلاث بقيم RoleMeta\nconst roleConfigs: Record<UserRole, RoleMeta> = {\n  admin: { badge: '⭐ مسؤول', canDelete: true },\n  moderator: { badge: '🛡️ مشرف', canDelete: false },\n  user: { badge: '👤 عضو', canDelete: false }\n};\n<\\/script>",
    "type Dict = Record<string, number>; type RolesMap = Record<Role, RoleInfo>;",
    "نوع كائن جدول مفاتيح وقيم (Dictionary / Map Type)",
    "TypeScript 3.x+ / 5.x",
    [
      "خرائط التكوين (Configuration Maps) وربط الثوابت بخصائص العرض",
      "جداول الترجمة والنصوص متعددة اللغات Record<Locale, Translations>",
      "تخزين الكائنات المفهرسة بمعرفات رقمية أو نصية Record<string, Item>"
    ],
    "ts_interactive",
    "// في JS: كائنات قواميس دون إلزام بتغطية كافة المفاتيح\nconst configs = {\n  admin: { badge: 'مسؤول' }\n  // نسيان moderator لا يكتشف إلا عند وقت التشغيل!\n};",
    "عند استخدام Union للمفاتيح في Record<Role, Info>، يجبرك المترجم على تعريف كل مفتاح دون نقص.",
    "https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type",
    [
      "K: يجب أن يكون صالحاً كمفتاح كائن (string | number | symbol).",
      "T: أي نوع بيانات يمثل محتوى القيمة المخزنة تحت كل مفتاح."
    ],
    "⚠️ Record<string, T> تسمح بالوصول لأي مفتاح نصي ويعتبر TypeScript القيمة موجودة دوماً، بينما وقت التشغيل قد تكون undefined إذا لم يُفعل خيار noUncheckedIndexedAccess.",
    [
      {
        "name": "Record<K, T>",
        "type": "Utility Type",
        "desc": "تحديد نوع المفاتيح ونوع القيم لكائن"
      }
    ],
    [
      "Utility Types: Pick<T> & Omit<T>",
      "interface",
      "Generics (<T>)",
      "type (Type Alias)"
    ]
  ],
  [
    "ts",
    "unknown vs any vs never",
    "أنواع الأمان القصوى والمستحيلة (unknown, any, never)",
    "unknown any never bottom top type safety typescript أنواع قصوى أمان استثناء فراغ",
    "الأنواع الخاصة الأساسية للتحكم بالأمان: `any` يعطل فحص الأنواع كلياً، بينما `unknown` هو البديل الآمن الذي يلزمك بفحص النوع قبل استخدامه (Top Type)، و`never` يمثل الحالة التي يستحيل وقوعها برمجياً مثل دالة ترمي خطأ دوماً (Bottom Type).",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">unknown vs any vs never Demo</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg space-y-1\">\n      <div>قيمة unknown آمنة بعد الفحص: <span class=\"font-mono text-emerald-400\">{{ safeValue }}</span></div>\n      <div class=\"text-[11px] text-gray-400\">any تسمح بأي خطأ دون تحذير، بينما unknown تمنع الخطأ وتلزم بالتحقق.</div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref } from 'vue';\n\nfunction parsePayload(data: unknown): string {\n  // data.toUpperCase(); // ❌ خطأ ترجمة: unknown محمي!\n  if (typeof data === 'string') {\n    return data.toUpperCase(); // ✓ مسموح بعد التحقق\n  }\n  return 'بيانات غير نصية';\n}\n\nconst safeValue = ref(parsePayload('safe-data'));\n<\\/script>",
    "let a: any; let u: unknown; function fail(): never { throw new Error(); }",
    "أنواع النظام الأساسية (Root / Bottom Types)",
    "TypeScript 3.x+ / 5.x",
    [
      "استقبال استجابات JSON مجهولة بأمان باستخدام unknown بدل any",
      "فحص اكتمال معالجة الحالات (Exhaustive Type Checking) باستخدام never",
      "حظر كتابة كود غير قابل للوصول (Unreachable Code)"
    ],
    "ts_interactive",
    "// في JS: كل المتغيرات تتصرف تماماً مثل any دون أي حماية\nlet data = JSON.parse(str);\ndata.fakeMethod(); // ينهار التطبيق فوراً وقت التشغيل!",
    "استبدال any بـ unknown يمنع الانهيارات المفاجئة ويوفر كوداً آمناً بنسبة 100%.",
    "https://www.typescriptlang.org/docs/handbook/2/functions.html#never",
    [
      "any: يوقف عمل المترجم على المتغير (خطر على استقرار التطبيق).",
      "unknown: يقبل أي قيمة لكنه يمنع استدعاء أي دالة أو خاصية قبل تضييق النوع.",
      "never: نوع فارغ لا يمكن إسناد أي قيمة له إلا never مثله."
    ],
    "⚠️ الاعتماد على any في المشاريع الكبيرة يُفرغ TypeScript من فائدته ويتحول المشروع تدريجياً لكود غير آمن.",
    [
      {
        "name": "unknown",
        "type": "Top Type",
        "desc": "نوع آمن يقبل أي قيمة ولكن يحظر الاستخدام دون فحص"
      },
      {
        "name": "any",
        "type": "Escape Hatch",
        "desc": "تعطيل كامل لفحص الأنواع للمتغير"
      },
      {
        "name": "never",
        "type": "Bottom Type",
        "desc": "يمثل القيم المستحيلة والدوال التي لا تعود أبداً"
      }
    ],
    [
      "Type Narrowing & Guards",
      "Primitive Types",
      "Type Annotations",
      "Function Typing & Signatures"
    ]
  ],
  [
    "ts",
    "Function Typing & Signatures",
    "توصيف وتعيين نمط الدوال والمحددات (Function Typing)",
    "function typing signature callback return parameters typescript دوال وسائط ناتج دوال رد نداء",
    "طريقة تحديد أنواع المعاملات، القيم الافتراضية، المعاملات الاختيارية، ونوع القيمة المعادة في الدوال، بالإضافة لتعريف أنماط دوال رد النداء (Callbacks) وتوقيعات الدوال المتعددة (Function Overloads).",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">Typed Higher-Order Function Demo</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg\">\n      النتيجة: <span class=\"font-mono text-emerald-400 font-bold\">{{ transformedList.join(' - ') }}</span>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\n// تعريف نمط دالة تحويل\ntype Transformer = (val: string, index?: number) => string;\n\nfunction applyTransform(items: string[], fn: Transformer): string[] {\n  return items.map((item, idx) => fn(item, idx));\n}\n\nconst transformedList = applyTransform(\n  ['vue', 'nuxt', 'ts'],\n  (item) => item.toUpperCase() + ' ✓'\n);\n<\\/script>",
    "type MathFn = (a: number, b: number) => number;",
    "توقيع دالة محدد (Function Signature Type)",
    "TypeScript 3.x+ / 5.x",
    [
      "تعريف دوال الأحداث والـ Handlers بدقة لتجنب تمرير وسائط خاطئة",
      "تحديد نمط دوال الـ Composable والخدمات المساعدة في Vue",
      "توثيق متطلبات الدوال المشتركة بين فرق العمل البرمجية"
    ],
    "ts_interactive",
    "// في JS: وسائط الدوال غير مفحوصة\nfunction applyTransform(items, fn) {\n  return items.map(fn);\n}",
    "يلزم TypeScript الدالة الممررة بمطابقة عدد المعاملات وأنواعها بدقة ويمنع استدعاء دوال ناقصة الوسائط.",
    "https://www.typescriptlang.org/docs/handbook/2/functions.html",
    [
      "(x: string) => void: دالة تستقبل نصاً ولا تعيد أي قيمة مفيدة.",
      "arg?: string: معامل اختياري في الدالة.",
      "(...args: number[]): معاملات مجمعة (Rest Parameters) مفحوصة النمط."
    ],
    "⚠️ في توقيع الدوال، كتابة void كقيمة معادة لا تمنع الدالة من إرجاع قيمة، بل تعني أن المستدعي سيتجاهل ناتجها.",
    [
      {
        "name": "=> ReturnType",
        "type": "Syntax",
        "desc": "تحديد نوع ناتج الدالة في التوقيع"
      },
      {
        "name": "void",
        "type": "Type",
        "desc": "إشارة إلى عدم وجود قيمة معادة"
      }
    ],
    [
      "Type Annotations",
      "Generics (<T>)",
      "defineEmits<Emits>()",
      "Primitive Types"
    ]
  ],
  [
    "ts",
    "Tuples & Readonly Arrays",
    "الصفوف المحددة والمصفوفات للقراءة فقط (Tuples & Readonly)",
    "tuples readonly array fixed length order typescript مصفوفات صفوف ثوابت قراءة فقط عناصر مرتبة",
    "الـ Tuple هو مصفوفة ذات طول ثابت وترتيب محدد للأنواع لكل عنصر فيها (مثل [string, number]). بينما `readonly T[]` أو `ReadonlyArray<T>` تمنع تعديل المصفوفة أو إضافة عناصر جديدة إليها عبر دوال مثل push أو splice.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">Tuple &amp; Readonly Demo</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg space-y-1 font-mono\">\n      <div>إحداثيات جغرافية (Tuple): <span class=\"text-emerald-400\">Lat: {{ coords[0] }}, Lng: {{ coords[1] }}</span></div>\n      <div>الحالة النصية: <span class=\"text-amber-400\">{{ coords[2] }}</span></div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\n// صف محدد بدقة: خط العرض (رقم)، خط الطول (رقم)، اسم المدينة (نص)\ntype GeoCoordinate = readonly [lat: number, lng: number, city: string];\n\nconst coords: GeoCoordinate = [24.7136, 46.6753, 'الرياض'];\n// coords[0] = 0; // ❌ خطأ ترجمة: المصفوفة للقراءة فقط ومحمية!\n<\\/script>",
    "type Pair = [string, number]; const fixed: readonly string[] = [\"a\", \"b\"];",
    "مصفوفة مقيدة الترتيب أو ثابتة (Tuple / Readonly Array)",
    "TypeScript 3.x+ / 5.x",
    [
      "تمثيل أزواج المفاتيح والقيم مثل ناتج دوال Object.entries()",
      "إرجاع مصفوفات الحالة المشابهة لـ React Hooks مثل [state, setState]",
      "حماية مصفوفات الثوابت والتكوينات من التعديل العرضي أثناء التشغيل"
    ],
    "ts_interactive",
    "// في JS: لا توجد قيود على أطوال أو أنواع عناصر المصفوفات\nconst coords = [24.7136, 46.6753, 'الرياض'];\ncoords.push('تعديل عشوائي'); // جائز في JS ويخرب الهيكل المتوقع!",
    "تضمن Tuples أن العنصر رقم 0 دائماً من نوع محدد والعنصر رقم 1 من نوع آخر وتمنع تجاوز الطول المحدد.",
    "https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types",
    [
      "[string, number]: مصفوفة تحوي عنصرين فقط بالترتيب المحدد.",
      "readonly [...]: تمنع التعديل وتمنع دوال التغيير المباشر (Mutations).",
      "as const: طريقة سريعة لتحويل مصفوفة أو كائن إلى Tuple ثابت كلياً للقراءة فقط."
    ],
    "⚠️ دوال التعديل مثل .push() كانت مسموحة على Tuples العادية في إصدارات قديمة؛ لذا يوصى دائماً ببادئة readonly لحمايتها.",
    [
      {
        "name": "[T1, T2]",
        "type": "Syntax",
        "desc": "هيكل الصف محدد الأنواع"
      },
      {
        "name": "readonly",
        "type": "Modifier",
        "desc": "حماية المصفوفة من التعديل"
      },
      {
        "name": "as const",
        "type": "Assertion",
        "desc": "تثبيت المصفوفة كـ Tuple حرفي للقراءة فقط"
      }
    ],
    [
      "Primitive Types",
      "Enums (Numeric & String)",
      "type (Type Alias)",
      "interface"
    ]
  ],
  [
    "ts",
    "Enums (Numeric & String)",
    "التعدادات الرقمية والنصية (Enums)",
    "enums enumeration constants typescript تعداد ثوابت مجموعة رموز نصية رقمية",
    "ميزة في TypeScript تتيح تعريف مجموعة من الثوابت المسماة (Named Constants). تدعم التعدادات الرقمية (Numeric Enums مع التعيين التلقائي 0, 1, 2) والتعدادات النصية (String Enums). تولد كود JavaScript فعلي وقت التشغيل بخلاف الواجهات.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">String Enum Demo</div>\n    <div class=\"flex items-center gap-2\">\n      <span class=\"text-gray-400\">الاتجاه المختار:</span>\n      <span class=\"p-1.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold\">{{ currentDirection }}</span>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref } from 'vue';\n\nenum Direction {\n  Up = 'UP',\n  Down = 'DOWN',\n  Left = 'LEFT',\n  Right = 'RIGHT'\n}\n\nconst currentDirection = ref<Direction>(Direction.Up);\n<\\/script>",
    "enum Direction { Up = \"UP\", Down = \"DOWN\" } const enum Fast { A, B }",
    "كائن تعداد ثابت وقت التشغيل (Enum Runtime Object)",
    "TypeScript 2.x+ / 5.x",
    [
      "تمثيل حالات محددة مسبقاً مثل أدوار المستخدمين أو أكواد الخطأ",
      "توفير أسماء ذات معنى بدلاً من الأرقام أو النصوص السحرية المباشرة (Magic Strings)",
      "التنظيم في مشاريع الأنظمة الكبيرة متكاملة الخدمات"
    ],
    "ts_interactive",
    "// في JS: محاكاة التعداد عبر تجميد كائن عادي\nconst Direction = Object.freeze({\n  Up: 'UP',\n  Down: 'DOWN'\n});",
    "الـ Enum في TypeScript هو أحد الميزات القليلة التي تولد كود JS حقيقي ومساحة في الحزمة الناتجة.",
    "https://www.typescriptlang.org/docs/handbook/enums.html",
    [
      "enum Direction { Up, Down }: افتراضياً Up = 0 و Down = 1.",
      "enum Colors { Red = \"#f00\" }: تعداد نصي أكثر وضوحاً في التنقيح.",
      "const enum: يحذف كائن التشغيل ويستبدل القيم بقيمها المباشرة لتقليص حجم الحزمة."
    ],
    "⚠️ التعدادات الرقمية تولد Reverse Mapping في JS؛ ويفضل كثير من مطوري Vue الحديث استخدام Union Strings (مثل type Direction = \"UP\" | \"DOWN\") كبديل أخف وزناً.",
    [
      {
        "name": "enum",
        "type": "Keyword",
        "desc": "تعريف مجموعة ثوابت مسماة"
      },
      {
        "name": "const enum",
        "type": "Optimization",
        "desc": "تعداد مضمن يحذف كائن التشغيل"
      }
    ],
    [
      "Union Types (|)",
      "type (Type Alias)",
      "Tuples & Readonly Arrays",
      "Primitive Types"
    ]
  ],
  [
    "ts",
    "defineProps<Props>()",
    "تعريف Props في Vue 3 بنمط TypeScript الصارم (defineProps)",
    "defineProps vue3 typescript compiler macro sfc خصائص مكون نمط صارم",
    "ماكرو المترجم في Vue 3 Script Setup لتعريف خصائص المكون (Props) باستخدام نمط TypeScript الخالص بدون الحاجة للنمط الكائني القديم. يوفر أماناً وتحققاً صارماً أثناء الكتابة ويُترجم تلقائياً إلى خيارات Props وقت التشغيل.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-emerald-400 font-bold\">defineProps&lt;Props&gt; Demo Component</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg\">\n      <div class=\"font-bold text-sm\">{{ title }}</div>\n      <div class=\"text-gray-400 text-xs\">{{ count }} تفاعل</div>\n      <div v-if=\"featured\" class=\"text-amber-400 text-[10px] mt-1 font-bold\">★ عنصر مميز</div>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\n// تعريف واجهة الخصائص بـ TypeScript خالص\ninterface Props {\n  title: string;\n  count?: number;\n  featured?: boolean;\n}\n\n// استخدام withDefaults لتعيين القيم الافتراضية\nconst props = withDefaults(defineProps<Props>(), {\n  count: 0,\n  featured: false\n});\n<\\/script>",
    "const props = defineProps<{ title: string; count?: number }>();",
    "كائن الخصائص المقروءة للمكون (Component Props Object)",
    "Vue 3.2+ / TypeScript 4.x / 5.x",
    [
      "بناء مكتبات مكونات واجهات المستخدم (UI Libraries) عالية الجودة",
      "ضمان تمرير الخصائص الإلزامية ومنع نسيانها في القوالب الأب",
      "توفير توثيق وإكمال تلقائي في محرر VS Code عبر ملحق Vue Official"
    ],
    "ts_vue",
    "// في JavaScript العادي: تعريف الخصائص عبر خيارات تشغيلية كائنية\nconst props = defineProps({\n  title: { type: String, required: true },\n  count: { type: Number, default: 0 }\n});",
    "صيغة TypeScript أكثر إيجازاً وتسمح باستيراد واجهات Props مشتركة وتوسيعها عبر ملفات متعددة.",
    "https://vuejs.org/guide/typescript/composition-api.html#typing-component-props",
    [
      "defineProps<Props>(): يحلل الواجهة ويولد props runtime validation تلقائياً.",
      "withDefaults: دالة مساعدة لتعيين القيم الافتراضية للخصائص الاختيارية.",
      "في Vue 3.5+: تم دعم تفكيك الخصائص التفاعلي مع القيم الافتراضية مباشرة."
    ],
    "⚠️ لا يمكن تمرير متغيرات محلية ديناميكية داخل معاملات نوع defineProps؛ يجب أن يكون النوع إما واجهة محلية أو نوعاً مستورداً صريحاً.",
    [
      {
        "name": "defineProps<T>()",
        "type": "Compiler Macro",
        "desc": "تعيين نوع الخصائص بأسلوب TypeScript الصارم"
      },
      {
        "name": "withDefaults",
        "type": "Helper Macro",
        "desc": "تحديد القيم الافتراضية للخصائص"
      }
    ],
    [
      "defineEmits<Emits>()",
      "Ref<T> & reactive typing",
      "interface",
      "type (Type Alias)"
    ]
  ],
  [
    "ts",
    "defineEmits<Emits>()",
    "تعريف الأحداث الصادرة من مكون Vue بنمط النوع (defineEmits)",
    "defineEmits events vue3 typescript compiler macro sfc أحداث إطلاق نمط صارم",
    "ماكرو المترجم في Vue 3 لتعريف وتوثيق الأحداث المخصصة التي يطلقها المكون (Emitted Events) والوسائط المرتبطة بكل حدث بنمط TypeScript صارم. يمنع إطلاق أحداث بأسماء خاطئة أو بحمولات غير متوافقة.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white space-y-3 text-xs\">\n    <div class=\"font-mono text-emerald-400 font-bold\">defineEmits&lt;Emits&gt; Demo</div>\n    <div class=\"flex gap-2\">\n      <button\n        @click=\"emit('update', 42)\"\n        class=\"px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400\"\n      >\n        إطلاق حدث update\n      </button>\n      <button\n        @click=\"emit('close')\"\n        class=\"px-3 py-1.5 rounded-lg bg-slate-800 text-gray-300 hover:text-white\"\n      >\n        إطلاق حدث close\n      </button>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\n// تعريف الأحداث وحمولاتها بصيغة الدوال التوقيعية\nconst emit = defineEmits<{\n  (e: 'update', value: number): void;\n  (e: 'close'): void;\n}>();\n<\\/script>",
    "const emit = defineEmits<{ (e: \"change\", id: number): void }>();",
    "دالة إطلاق الأحداث المفحوصة (Typed Emit Function)",
    "Vue 3.3+ / TypeScript 4.x / 5.x",
    [
      "توثيق الأحداث التي يوفرها المكون للمطورين الذين يستعملونه",
      "التحقق من صحة حمولة الحدث (Payload Validation) أثناء استدعاء emit()",
      "التوافق مع v-model المخصص ومكونات النماذج المعقدة"
    ],
    "ts_vue",
    "// في JavaScript العادي: مصفوفة أسماء أحداث دون فحص الوسائط\nconst emit = defineEmits(['update', 'close']);",
    "في TypeScript يمنع المترجم نداء emit(\"update\", \"نص خاطئ\") لأن الحدث يشترط رقم number.",
    "https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits",
    [
      "في Vue 3.3+ أضيفت صيغة مختصرة بديلة: defineEmits<{ update: [value: number], close: [] }>()",
      "تمنع الأخطاء الإملائية في أسماء الأحداث في كود القالب لدى المكون الأب."
    ],
    "⚠️ نسيان تعريف حدث في defineEmits يؤدي لسقوط الحدث كمستمع أصلي على جذر العنصر Fallthrough Attributes.",
    [
      {
        "name": "defineEmits<T>()",
        "type": "Compiler Macro",
        "desc": "تعريف أحداث المكون وأنواع حمولاتها"
      }
    ],
    [
      "defineProps<Props>()",
      "Ref<T> & reactive typing",
      "Function Typing & Signatures",
      "interface"
    ]
  ],
  [
    "ts",
    "Ref<T> & reactive typing",
    "تأطير المراجع والحالة التفاعلية مع TypeScript (Ref Typing)",
    "ref reactive typing generic vue3 typescript حالة تفاعلية مراجع كائنات تفاعلية",
    "طريقة تعيين وتحديد أنواع المراجع التفاعلية (Refs) وكائنات reactive في Vue 3 باستخدام القوالب العامة. في الحالات البسيطة يستنتج TypeScript النوع تلقائياً، بينما يلزم التعيين الصريح `ref<Type>()` للحالات المركبة أو المتغيرات التي تبدأ بقيمة null/undefined.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-emerald-400 font-bold\">Typed Ref Demo</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg\">\n      <div v-if=\"selectedUser\">المستخدم المحدد: <span class=\"text-emerald-400 font-bold\">{{ selectedUser.name }}</span></div>\n      <div v-else class=\"text-gray-500\">لا يوجد مستخدم محدد (null)</div>\n      <button\n        @click=\"loadUser\"\n        class=\"mt-2 px-3 py-1 rounded bg-[#00DC82] text-slate-950 font-bold text-xs\"\n      >\n        تعيين بيانات مستخدم\n      </button>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref } from 'vue';\n\ninterface UserData {\n  id: number;\n  name: string;\n}\n\n// Ref يقبل UserData أو null في البداية\nconst selectedUser = ref<UserData | null>(null);\n\nfunction loadUser() {\n  selectedUser.value = { id: 1, name: 'حيدر المعماري' };\n}\n<\\/script>",
    "const item = ref<ItemType | null>(null); const count = ref(0);",
    "مرجع تفاعلي مؤطر النمط Ref<T>",
    "Vue 3.x / TypeScript 4.x / 5.x",
    [
      "إدارة الحالة التي تبدأ بقيمة فارغة قبل اكتمال طلب الشبكة (Async State)",
      "تحديد نوع عناصر شجرة DOM المرجعية Template Refs مثل ref<HTMLInputElement | null>(null)",
      "حماية قيمة .value من إسناد بيانات غير متوافقة"
    ],
    "ts_vue",
    "// في JS العادي: ref(null) لا يقدم أي إكمال تلقائي للخصائص\nconst selectedUser = ref(null);\n// لا يعلم المحرر ما هي الحقول الموجودة داخل selectedUser.value لاحقاً",
    "يوفر ref<T> فحصاً تلقائياً يمنع قراءة selectedUser.value.name قبل فحص وجود الكائن أولاً.",
    "https://vuejs.org/guide/typescript/composition-api.html#typing-ref",
    [
      "ref<T>(val): تعيين صريح للنوع الداخلي المحتوى في المرجع.",
      "Ref<T>: نوع المرجع التفاعلي الكامل كواجهة برمجية.",
      "reactive<T>(obj): تأطير كائن تفاعلي كامل بنمط T."
    ],
    "⚠️ نسيان وضع | null في النوع عند تهيئة المرجع بـ ref(null) سيؤدي لحصر نوع المرجع في null دائماً ومنع إسناد الكائن الحقيقي له لاحقاً.",
    [
      {
        "name": "ref<T>()",
        "type": "Function",
        "desc": "إنشاء مرجع تفاعلي بنمط محدد"
      },
      {
        "name": "reactive<T>()",
        "type": "Function",
        "desc": "إنشاء كائن تفاعلي بنمط محدد"
      }
    ],
    [
      "defineProps<Props>()",
      "Generics (<T>)",
      "Union Types (|)",
      "unknown vs any vs never"
    ]
  ],
  [
    "ts",
    "tsconfig.json",
    "ملف تكوين مترجم TypeScript وقواعد التحقق (tsconfig.json)",
    "tsconfig compiler options strict target module jsx typescript إعدادات مترجم ضبط قواعد",
    "الملف الجذري المسؤول عن تكوين وإعداد سلوك مترجم TypeScript في المشروع. يحدد إصدار JavaScript المستهدف (target)، نظام الوحدات (module)، مستوى الصرامة (strict)، مسارات الاستيراد البديلة (paths aliases مثل @/*)، ومعالجة كود Vue/JSX.",
    "<template>\n  <div class=\"p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-white space-y-2 text-xs\">\n    <div class=\"font-mono text-blue-400 font-bold\">tsconfig.json Essential Settings</div>\n    <div class=\"p-3 bg-slate-950 rounded-lg font-mono text-[11px] text-gray-300 leading-relaxed overflow-x-auto\" dir=\"ltr\">\n      <pre>{\n  \"compilerOptions\": {\n    \"target\": \"ESNext\",\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"Bundler\",\n    \"strict\": true,\n    \"noImplicitAny\": true,\n    \"paths\": { \"@/*\": [\"./src/*\"] }\n  }\n}</pre>\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\n// ملف الإعدادات tsconfig.json يوجه Vite و Vue TSC لكيفية فحص الملفات\n<\\/script>",
    "// ملف تكوين JSON يوضع في جذر المشروع tsconfig.json",
    "ملف تكوين المترجم (Compiler Configuration)",
    "TypeScript 1.8+ / 5.x",
    [
      "تفعيل وضع الصرامة التام strict: true لحماية المشروع من الأخطاء الخفية",
      "تحديد مسارات الاستيراد المختصرة مثل \"@/components\" لتنظيم الكود",
      "توافق البناء مع أدوات التجميع الحديثة مثل Vite و Nuxt 3"
    ],
    "ts_interactive",
    "// في مشاريع JS العادية: يستخدم jsconfig.json لتوفير إكمال تلقائي خفيف\n{ \"compilerOptions\": { \"checkJs\": true } }",
    "بدون tsconfig.json يعمل مترجم TypeScript بإعدادات افتراضية غير صارمة قد لا تلائم مشاريع Vue الحديثة.",
    "https://www.typescriptlang.org/docs/handbook/tsconfig-json.html",
    [
      "\"strict\": true: تفعيل كافة فحوصات الصرامة بما فيها strictNullChecks.",
      "\"moduleResolution\": \"Bundler\": التوافق الأمثل مع Vite و Rollup في حزم الويب الحديثة.",
      "\"include\": تحديد المجلدات المشمولة بالفحص مثل [\"src/**/*\"]."
    ],
    "⚠️ إيقاف strict: false في المشاريع الجديدة يلغي أهم مزايا TypeScript؛ احرص دائماً على إبقاء الوضع الصارم مفعلاً منذ البداية.",
    [
      {
        "name": "strict",
        "type": "Compiler Option",
        "desc": "تفعيل كامل فحوص الصرامة"
      },
      {
        "name": "target",
        "type": "Compiler Option",
        "desc": "إصدار JavaScript المستهدف في البناء"
      },
      {
        "name": "paths",
        "type": "Compiler Option",
        "desc": "تعيين مسارات الاستيراد المختصرة"
      }
    ],
    [
      "Primitive Types",
      "Type Annotations",
      "Type Inference",
      "interface"
    ]
  ]
];
