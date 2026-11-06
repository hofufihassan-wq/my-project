/* V Lex Pro: bounded local source explanation. Never evaluates pasted source. */
(function (root) {
  'use strict';
  const LIMITS = Object.freeze({ chars: 20000, lines: 300, tokens: 10000 });
  const ENTRY = (arabic, why, example, pronunciation) => ({ arabic, why, example, pronunciation: pronunciation || '' });
  const js = {
    const: ENTRY('متغير لا نعيد إسناده', 'نحفظ اسمًا لقيمة ونمنع استبدال ربطه؛ محتوى الكائن نفسه قد يتغير.', 'const name = "نورة";', 'كونست'),
    let: ENTRY('متغير قابل لإعادة الإسناد', 'نستخدمه لما تتغير القيمة لاحقًا.', 'let count = 0; count += 1;', 'لِت'),
    var: ENTRY('تعريف متغير بنطاق دالة', 'صياغة قديمة؛ للمبتدئ let وconst أوضح في تحديد نطاق الكتلة.', 'var count = 0;', 'ڤار'),
    function: ENTRY('تعريف دالة', 'نجمع تعليمات باسم ونستدعيها عند الحاجة؛ مجرد التعريف لا يشغّل جسمها.', 'function greet(name) { return "أهلًا " + name; }', 'فَنكشَن'),
    return: ENTRY('إرجاع نتيجة', 'ينهي الاستدعاء الحالي للدالة ويرجع القيمة التي تليه.', 'return total * 2;', 'رِتِرن'),
    if: ENTRY('شرط', 'ينفذ الكتلة فقط عندما تتحول قيمة الشرط إلى true.', 'if (count > 0) { console.log(count); }', 'إِف'),
    else: ENTRY('البديل', 'فرع ينفذ عندما يكون شرط if غير متحقق.', 'if (ok) { start(); } else { retry(); }', 'إِلس'),
    for: ENTRY('حلقة تكرار', 'تكرر التعليمات؛ انتبه إلى شرط التوقف حتى لا يتجمد البرنامج.', 'for (let i = 0; i < 3; i++) { console.log(i); }', 'فور'),
    of: ENTRY('قراءة قيم مجموعة', 'في for...of نمر على القيم القابلة للتكرار مثل عناصر المصفوفة.', 'for (const item of items) { console.log(item); }', 'أوف'),
    in: ENTRY('فحص خاصية أو المرور على مفاتيح', 'مع كائن يفحص وجود خاصية، ومع for...in يمر على مفاتيح enumerable؛ ليس بديلًا عامًا لـfor...of.', '"name" in user', 'إِن'),
    while: ENTRY('تكرار بشرط', 'يعيد تنفيذ الجسم ما دام الشرط truthy؛ يجب أن يتغير سبب الاستمرار.', 'while (count < 3) { count++; }', 'وايل'),
    do: ENTRY('ابدأ جسم الحلقة أولًا', 'في do...while يعمل الجسم مرة واحدة على الأقل ثم يُفحص الشرط.', 'do { count++; } while (count < 3);', 'دو'),
    break: ENTRY('الخروج من الحلقة أو switch', 'يوقف أقرب حلقة أو switch؛ لا ينهي الدالة تلقائيًا.', 'if (found) break;', 'بريك'),
    continue: ENTRY('انتقل للتكرار التالي', 'يتجاوز بقية التكرار الحالي في الحلقة.', 'if (item === null) continue;', 'كونتينيو'),
    switch: ENTRY('اختيار فرع حسب قيمة', 'يقارن التعبير بحالات case.', 'switch (role) { case "admin": break; }', 'سويتش'),
    case: ENTRY('حالة داخل switch', 'يحدد قيمة يبدأ عند تطابقها فرع معين.', 'case "admin": showPanel(); break;', 'كيس'),
    default: ENTRY('حالة افتراضية أو تصدير افتراضي', 'يتحدد معناها بالسياق: fallback في switch أو export default في الوحدة.', 'export default { name: "Card" };', 'ديفولت'),
    true: ENTRY('قيمة منطقية صحيحة', 'نستعملها لتمثيل حالة واضحة مثل تفعيل خيار.', 'const enabled = true;', 'ترو'),
    false: ENTRY('قيمة منطقية خاطئة', 'نستعملها مثلًا لإيقاف خيار أو وصف عدم تحقق شرط.', 'const enabled = false;', 'فولس'),
    null: ENTRY('غياب قيمة مقصود', 'نضعها عندما نريد التعبير صراحة عن عدم وجود قيمة.', 'let selected = null;', 'نَل'),
    undefined: ENTRY('قيمة غير محددة', 'تظهر مثلًا عند قراءة خاصية مفقودة أو متغير عُرّف بلا تهيئة.', 'let selected;', 'أنديفايند'),
    console: ENTRY('كائن سجل المطور', 'نستعمله لرؤية قيم ورسائل أثناء التجربة؛ لا يعرض محتوى داخل صفحة HTML.', 'console.log("أهلًا");', 'كونسول'),
    log: ENTRY('كتابة رسالة في Console', 'عندما تُستدعى عبر console.log تطبع القيم الممررة.', 'console.log(count);', 'لوغ'),
    warn: ENTRY('تحذير في Console', 'عادة مع console.warn لتمييز التحذير عن الرسالة العادية.', 'console.warn("تحقق من القيمة");', 'وورن'),
    error: ENTRY('رسالة خطأ أو اسم خاصية', 'مع console.error تطبع رسالة؛ الكلمة وحدها قد تكون اسمًا يختاره المبرمج.', 'console.error("فشل التحميل");', 'إيرَر'),
    document: ENTRY('واجهة مستند HTML', 'من خلالها نقرأ عناصر الصفحة ونغيّرها داخل سياق المتصفح.', 'document.querySelector("button");', 'دوكيومنت'),
    querySelector: ENTRY('اختيار أول عنصر يطابق CSS', 'يستقبل selector ويرجع عنصرًا أو null؛ تحقق من وجود العنصر قبل استعماله.', 'const button = document.querySelector("button");', 'كويري سِلِكتور'),
    getElementById: ENTRY('اختيار عنصر بمعرّفه', 'يرجع العنصر ذي id المحدد أو null إن لم يوجد.', 'document.getElementById("result");', 'گِت إلِمِنت باي آي دي'),
    textContent: ENTRY('محتوى العنصر النصي', 'يعرض النص كما هو، دون تفسيره كوسوم HTML.', 'result.textContent = "تم";', 'تِكست كونتِنت'),
    innerHTML: ENTRY('HTML داخل عنصر', 'يفسّر النص كـHTML؛ لا تضع فيه نصًا غير موثوق دون معالجة مناسبة.', 'box.innerHTML = "<strong>عنوان ثابت</strong>";', 'إِنَر إتش تي إم إل'),
    addEventListener: ENTRY('الاستماع لحدث', 'يربط حدثًا بدالة تنفذ عند وصوله، مثل نقرة المستخدم.', 'button.addEventListener("click", () => console.log("نقرة"));', 'آد إيفِنت لِسِنَر'),
    preventDefault: ENTRY('إلغاء السلوك الافتراضي', 'يوقف الفعل الافتراضي لحدث قابل للإلغاء، لا كل انتشار للحدث.', 'event.preventDefault();', 'بريڤِنت ديفولت'),
    value: ENTRY('قيمة حقل أو قيمة ref', 'في input هي قيمة الحقل، وفي ref داخل JavaScript نقرأ القيمة عبر .value. قد يكون أيضًا اسم خاصية عاديًا.', 'count.value += 1;', 'ڤاليو'),
    map: ENTRY('تحويل عناصر مصفوفة', 'عند استعمال Array.map يرجع مصفوفة جديدة بنتيجة الدالة لكل عنصر.', 'const doubled = [1, 2].map(n => n * 2);', 'ماب'),
    filter: ENTRY('ترشيح عناصر مصفوفة', 'يبقي العنصر عندما ترجع الدالة قيمة truthy، ولا يلزم boolean صريح.', 'const positive = values.filter(n => n > 0);', 'فِلتر'),
    push: ENTRY('إضافة لنهاية مصفوفة', 'يغيّر المصفوفة نفسها ويرجع طولها الجديد.', 'items.push("جديد");', 'بُش'),
    length: ENTRY('الطول', 'للمصفوفات هو خاصية الطول، وللنص عدد وحدات UTF-16؛ ليست عدد الرموز المرئية دائمًا.', 'items.length', 'لِنث'),
    async: ENTRY('دالة غير متزامنة', 'تعيد Promise وتسمح عادة باستخدام await داخلها؛ لا تجعل كل العمل متوازيًا تلقائيًا.', 'async function load() { return 1; }', 'إيسِنك'),
    await: ENTRY('انتظار نتيجة Promise', 'يوقف متابعة السياق غير المتزامن الحالي إلى أن تستقر القيمة؛ ليس تجميدًا لكل المتصفح.', 'const response = await fetch(url);', 'أويت'),
    Promise: ENTRY('نتيجة قد تتوفر لاحقًا', 'تمثل نجاح عملية غير متزامنة أو فشلها.', 'Promise.resolve(42).then(console.log);', 'برومِس'),
    fetch: ENTRY('طلب مورد عبر الشبكة', 'يعيد Promise لاستجابة؛ يحتاج شبكة وإذنًا، ولا يعد كل HTTP خطأ رفضًا للـPromise.', 'const response = await fetch("/data.json");', 'فِتش'),
    try: ENTRY('ابدأ كتلة معالجة خطأ', 'تجرب كودًا يمكن أن يرمي استثناءً ثم تتعامل معه عبر catch.', 'try { JSON.parse(text); } catch (error) { console.error(error); }', 'تراي'),
    catch: ENTRY('التقاط استثناء', 'يعالج الاستثناء الصادر من try المقابلة.', 'catch (error) { console.error(error.message); }', 'كاتش'),
    throw: ENTRY('رمي استثناء', 'يوقف المسار الحالي وينقل التحكم إلى معالج مناسب أو يظهر خطأ غير معالج.', 'throw new Error("قيمة غير صالحة");', 'ثرو'),
    new: ENTRY('إنشاء عبر مُنشئ', 'يستدعي الدالة كـconstructor؛ بعض الأنواع لا تحتاجه.', 'const date = new Date();', 'نيو'),
    class: ENTRY('تعريف صنف', 'ينظم بنية كائنات تُنشأ منه؛ لا ينشئ instance بمجرد التعريف.', 'class User { constructor(name) { this.name = name; } }', 'كلاس'),
    this: ENTRY('السياق الحالي للدالة', 'قيمته تعتمد على طريقة الاستدعاء؛ الدالة السهمية تلتقط this المحيط.', 'this.name = name;', 'ذِس'),
    typeof: ENTRY('اسم نوع قيمة', 'يرجع نصًا يصف النوع؛ typeof null يعيد object، ولا يتجاوز TDZ.', 'typeof 42 // "number"', 'تايب أوف'),
    import: ENTRY('استيراد من وحدة', 'يربط أسماء بتصديرات وحدة؛ توفر الملف أو الحزمة يعتمد على بيئة التشغيل.', 'import { ref } from "vue";', 'إِمبورت'),
    export: ENTRY('تصدير من وحدة', 'يجعل تعريفًا متاحًا لاستيراده من ملف آخر.', 'export const name = "V Lex Pro";', 'إكسبورت'),
    ref: ENTRY('قيمة تفاعلية في Vue', 'ترجع حاوية تفاعلية؛ نستخدم .value في JavaScript، ويفك Vue مراجع المستوى الأعلى عادة في القالب.', 'const count = ref(0);', 'رِف'),
    computed: ENTRY('قيمة مشتقة في Vue', 'تعيد ref تُحسب من تبعيات تفاعلية؛ نستخدمها لقيمة تعتمد على قيم أخرى.', 'const doubled = computed(() => count.value * 2);', 'كَمبيوتِد'),
    reactive: ENTRY('كائن تفاعلي في Vue', 'تعيد Proxy للكائن؛ لا تستعمل للقيم الأولية مباشرة.', 'const state = reactive({ count: 0 });', 'ريأكتِڤ'),
    watch: ENTRY('مراقبة تغير تفاعلي', 'لتنفيذ أثر جانبي عندما يتغير المصدر؛ ليست بديلًا عامًا للقيمة computed.', 'watch(count, value => console.log(value));', 'ووتش'),
    onMounted: ENTRY('عندما يُركّب مكون Vue', 'ينفذ callback بعد تركيب المكون في DOM.', 'onMounted(() => console.log("ركّبنا المكون"));', 'أون ماونتِد'),
    defineProps: ENTRY('إعلان props في script setup', 'ماكرو SFC يحدد المدخلات القادمة من الأب، وليس دالة JavaScript عالمية.', 'const props = defineProps({ title: String });', 'ديفاين بروبس'),
    defineEmits: ENTRY('إعلان أحداث المكون', 'ماكرو في script setup يوضح الأحداث التي يرسلها المكون للأب.', 'const emit = defineEmits(["save"]);', 'ديفاين إيمِتس')
  };
  const tags = {
    html:'جذر مستند HTML', head:'معلومات المستند', title:'عنوان تبويب المتصفح', meta:'بيانات وصفية', body:'محتوى الصفحة المرئي',
    div:'حاوية عامة بلا معنى دلالي خاص', span:'حاوية نصية عامة', p:'فقرة نصية', h1:'عنوان رئيسي', h2:'عنوان قسم', h3:'عنوان فرعي',
    button:'زر تفاعلي؛ في form حدّد type المناسب', input:'حقل إدخال', label:'تسمية حقل؛ تربط عادة عبر for وid', form:'نموذج بيانات',
    ul:'قائمة غير مرتبة', ol:'قائمة مرتبة', li:'عنصر قائمة', a:'رابط تنقل', img:'صورة؛ صف معناها عبر alt',
    main:'المحتوى الرئيسي', nav:'روابط تنقل', header:'ترويسة', footer:'تذييل', article:'محتوى مستقل', section:'قسم موضوعي',
    strong:'أهمية قوية للنص', em:'تشديد معنى النص', style:'قواعد CSS داخلية', script:'مصدر JavaScript أو بيانات حسب type',
    template:'قالب؛ في Vue يمثل بنية واجهة المكون', textarea:'حقل نص متعدد الأسطر', select:'قائمة اختيار', option:'خيار داخل select',
    table:'جدول بيانات', tr:'صف جدول', td:'خلية بيانات', th:'خلية عنوان', br:'فاصل سطر', hr:'فاصل موضوعي'
  };
  const attrs = {
    id:'معرّف للعنصر داخل المستند؛ يجب أن يكون فريدًا', class:'أسماء فئات نستخدمها في CSS وJavaScript', href:'وجهة الرابط',
    src:'عنوان المورد مثل الصورة أو ملف script', alt:'بديل نصي للصورة', type:'نوع العنصر أو المورد؛ يتحدد بالوسم',
    name:'اسم الحقل عند إرسال نموذج', placeholder:'تلميح يظهر في الحقل الفارغ ولا يغني عن label', for:'يربط label بمعرّف حقل',
    disabled:'صفة منطقية تمنع تفاعل حقل أو زر مدعوم', required:'يفرض قيمة في التحقق الأصلي من النموذج', value:'قيمة العنصر أو الخيار',
    'v-model':'يربط الإدخال بالحالة التفاعلية باتجاهين ضمن قواعد العنصر أو المكون',
    'v-if':'يركب/يزيل فرع القالب بحسب الشرط', 'v-else':'الفرع المقابل لـv-if السابق', 'v-for':'ينشئ عناصر من مجموعة؛ اختر key ثابتًا ومناسبًا',
    'v-bind':'يربط صفة بقيمة JavaScript؛ الصيغة المختصرة هي :', 'v-on':'يربط حدثًا بمعالج؛ الصيغة المختصرة هي @',
    'v-show':'يبدل display مع إبقاء العنصر مركبًا', key:'هوية Vue للعقد أثناء التحديث، وليست صفة DOM عادية'
  };
  const css = {
    color:ENTRY('لون النص','نغير لون المقدمة؛ لون الخلفية له خاصية مستقلة.','color: #0f766e;','كَلَر'),
    'background-color':ENTRY('لون الخلفية','يلون خلفية العنصر دون تغيير لون النص.','background-color: #ecfdf5;','باكگراوند كَلَر'),
    background:ENTRY('اختصار خصائص الخلفية','قد يضبط اللون والصورة والموضع والتكرار معًا؛ قد يعيد خصائص أخرى للقيمة الافتراضية.','background: linear-gradient(90deg, #065f46, #0f766e);','باكگراوند'),
    margin:ENTRY('مسافة خارج الحدود','تفصل العنصر عن جيرانه؛ قد تنهار هوامش الكتل الرأسية في بعض التخطيطات.','margin: 16px;','مارجِن'),
    padding:ENTRY('مسافة داخل الحدود','تبعد المحتوى عن حواف العنصر.','padding: 12px 20px;','بادِنگ'),
    width:ENTRY('العرض','يضبط عرض الصندوق وفق box-sizing والقيود المحيطة.','width: 80%;','وِدث'),
    height:ENTRY('الارتفاع','يضبط ارتفاع الصندوق؛ راقب المحتوى الزائد.','height: 200px;','هايت'),
    'max-width':ENTRY('أقصى عرض','يمنع تمدد العنصر أكثر من قيمة محددة.','max-width: 60rem;','ماكس وِدث'),
    display:ENTRY('نظام العرض','يحدد كيف يشارك الصندوق في التخطيط وكيف ينظم أبناءه.','display: flex;','دِسبلاي'),
    flex:ENTRY('اختصار نمو وانكماش وحجم Flex','يطبق على عنصر داخل حاوية flex.','flex: 1 1 200px;','فليكس'),
    'flex-direction':ENTRY('اتجاه المحور الرئيسي','row وcolumn يغيران اتجاه توزيع أبناء flex.','flex-direction: column;','فليكس دايرِكشَن'),
    'justify-content':ENTRY('توزيع على المحور الرئيسي','يوزع المساحة المتاحة بعد حساب أحجام العناصر؛ المعنى الدقيق يعتمد على التخطيط.','justify-content: space-between;','جَستِفاي كونتِنت'),
    'align-items':ENTRY('محاذاة على المحور المتقاطع','في flex تضبط محاذاة الأبناء، وقد لا يظهر stretch إذا كان الحجم المتقاطع ثابتًا.','align-items: center;','ألاين آيتِمز'),
    gap:ENTRY('فجوة بين العناصر','تفصل أبناء grid/flex ولا تضيف هامشًا خارجيًا للحاوية.','gap: 12px;','گاب'),
    grid:ENTRY('اختصار تخطيط Grid','لشبكات الصفوف والأعمدة؛ يبدأ عادة بـdisplay:grid.','display: grid; grid-template-columns: 1fr 1fr;','گريد'),
    'grid-template-columns':ENTRY('أعمدة Grid','تحدد مسارات الأعمدة؛ fr حصة من المساحة المتاحة.','grid-template-columns: repeat(3, 1fr);','گريد تِمبلِت كولَمز'),
    'font-size':ENTRY('حجم الخط','يمكن استعمال rem للحجم النسبي أو px لقيمة CSS بكسلية.','font-size: 1rem;','فونت سايز'),
    'font-family':ENTRY('عائلة الخط','قائمة خطوط يحاول المتصفح استعمالها بالترتيب.','font-family: system-ui, sans-serif;','فونت فامِلي'),
    'line-height':ENTRY('ارتفاع السطر','قيمة بلا وحدة تكون نسبة إلى حجم الخط وتناسب النص غالبًا.','line-height: 1.8;','لاين هايت'),
    border:ENTRY('حدود الصندوق','اختصار العرض والنمط واللون.','border: 1px solid #64748b;','بوردر'),
    'border-radius':ENTRY('استدارة الزوايا','تغير شكل الزوايا؛ لا تغير التخطيط المستطيل للصندوق.','border-radius: 12px;','بوردر ريديوس'),
    'box-shadow':ENTRY('ظل الصندوق','إزاحة أفقية ورأسية ثم blur وspread ولون.','box-shadow: 0 4px 12px #0003;','بوكس شادو'),
    opacity:ENTRY('شفافية العنصر كله','من0 إلى1، وتؤثر على الأبناء أيضًا.','opacity: .7;','أوباسِتي'),
    position:ENTRY('طريقة التموضع','تحدد المشاركة في التدفق وسلوك top/left؛ ليست إحداثيات وحدها.','position: relative;','بوزِشَن'),
    transform:ENTRY('تحويل بصري','ينقل أو يدور أو يكبر العنصر دون إعادة حساب تخطيط الجيران بالطريقة نفسها.','transform: rotate(10deg);','ترانسفورم'),
    transition:ENTRY('انتقال بين قيم خصائص','ينعم تغير خاصية قابلة للتحريك بين حالتين.','transition: color .2s;','ترانزِشَن'),
    animation:ENTRY('حركة مبنية على keyframes','ترتبط باسم @keyframes ومدة وتكرار.','animation: pulse 2s infinite;','أنِميشَن'),
    'box-sizing':ENTRY('طريقة حساب حجم الصندوق','border-box يدخل padding وborder ضمن width وheight.','box-sizing: border-box;','بوكس سايزِنگ'),
    overflow:ENTRY('معالجة المحتوى الزائد','مثل auto للتمرير عند الحاجة وhidden للقص.','overflow: auto;','أوڤرفلو')
  };
  const operators = {
    '=':['إسناد','يحفظ القيمة اليمنى في المتغير أو الخاصية اليسرى؛ ليس مقارنة.'], '==':['مقارنة مع تحويل أنواع','قد يحول النوعين قبل المقارنة؛ === أوضح غالبًا للمبتدئ.'], '===':['مقارنة صارمة','تقارن بلا تحويل نوع ضمن قواعد strict equality.'],
    '!=':['عدم مساواة مع تحويل','المقابل غير الصارم لـ==.'], '!==':['عدم مساواة صارمة','المقابل الصارم لـ===.'], '+':['جمع أو ربط نصوص','النتيجة تعتمد على أنواع القيم؛ لا يمكن الجزم بها من الرمز وحده.'], '-':['طرح أو نفي عددي','المعنى يعتمد على وجود قيمة قبله.'], '*':['ضرب أو رمز آخر بحسب السياق','في تعبير JS ضرب؛ في CSS قد يكون selector عامًا.'],
    '/':['قسمة أو جزء من صياغة أخرى','في JavaScript قسمة أو جزء من RegExp؛ في HTML قد يغلق وسمًا.'], '%':['باقي القسمة أو نسبة CSS','المعنى حسب اللغة والسياق، وليست دائمًا نسبة مئوية.'], '**':['أس','يرفع العدد لقوة مثل2 ** 3.'],
    '++':['زيادة بواحد','قيمة التعبير تختلف بين ++n وn++.'], '--':['نقص بواحد','قيمة التعبير تختلف بين --n وn--.'], '+=':['إسناد بعد جمع أو ربط','اختصار شائع مثلcount += 1.'], '-=':['إسناد بعد طرح','مثلcount -= 1.'],
    '&&':['AND قصير التقييم','يرجع إحدى القيمتين ولا يرجع boolean بالضرورة.'], '||':['OR قصير التقييم','يرجع القيمة اليمنى عندما تكون اليسرى falsy.'], '??':['بديل null أو undefined','لا يستبدل0 أو النص الفارغ أوfalse.'], '!':['نفي منطقي','يحول إلى boolean ثم يعكسها.'], '?':['شرط مختصر أو جزء من صيغة أخرى','في x ? a : b يختار التعبير حسب الشرط.'], '?.':['وصول اختياري','يعيدundefined إذا كان الطرف الأيسر null أوundefined.'],
    '=>':['دالة سهمية','تفصل المعاملات عن جسم الدالة، وتلتقط this المحيط.'], '.':['وصول لخاصية','مثلuser.name؛ في CSS يسبق اسم class.'], ',':['فصل عناصر','يفصل معاملات أو قيمًا؛ وقد يكون comma operator في تعبير JavaScript.'], ';':['فاصل تعليمات أو تصريحات CSS','ينهي declaration في CSS؛ فيJS قد يفصل تعليمات أو أجزاء for.'],
    ':':['قيمة خاصية أو صياغة سياقية','فيCSS بين الخاصية والقيمة؛ فيJS فيobject أو ternary؛ وفيVue اختصارv-bind.'], '...':['نشر أو rest','ينشر عناصر أو يجمع معاملات حسب موقعه.'], '(':['بداية مجموعة أو معاملات','قد يكون استدعاء دالة أو شرطًا أو تجميع تعبير.'], ')':['نهاية مجموعة أو معاملات','يغلق القوس الموافق؛ ليس دليلًا وحده على صحة الصياغة.'], '[':['بداية مصفوفة أو وصول محسوب','مثل[1,2] أوuser[key].'], ']':['نهاية مصفوفة أو وصول محسوب','يغلق القوس الموافق.'], '{':['بداية كتلة أو كائن','المعنى تحدده البنية المحيطة.'], '}':['نهاية كتلة أو كائن','يغلق الأقواس المعقوفة.'], '<':['أصغر من أو بداية وسم','فيJS مقارنة؛ فيHTML بداية وسم.'], '>':['أكبر من أو نهاية وسم','فيJS مقارنة؛ فيHTML نهاية وسم.'], '<=':['أصغر من أو يساوي','مقارنة بين قيمتين.'], '>=':['أكبر من أو يساوي','مقارنة بين قيمتين.'], '@':['حدث Vue أو قاعدة CSS','فيVue @click اختصارv-on:click، وفيCSS يبدأ قواعد مثل@media.'], '#':['معرّف أو لون أو slot بحسب السياق','فيCSS #app selector و#fff لون؛ وفيVue قد يختصرv-slot.']
  };
  const samples = {
    javascript: 'const name = "نورة";\nlet count = 2;\nfunction greet(person) {\n  return "أهلًا " + person;\n}\nconsole.log(greet(name));',
    html: '<main>\n  <h1>أول صفحة لي</h1>\n  <p class="intro">أتعلم خطوة بخطوة.</p>\n  <button type="button">جرّب</button>\n</main>',
    css: '.card {\n  display: flex;\n  gap: 12px;\n  padding: 16px;\n  background-color: #ecfdf5;\n  color: #064e3b;\n}',
    vue: '<script setup>\nimport { ref, computed } from "vue";\nconst count = ref(0);\nconst doubled = computed(() => count.value * 2);\n</script>\n<template>\n  <button @click="count++">{{ count }} — {{ doubled }}</button>\n</template>'
  };
  function knownToken(text, language, prev, next) {
    if (language === 'css' && next === ':' && css[text]) return { kind:'known', ...css[text] };
    if ((language === 'javascript' || language === 'vue-expression') && js[text]) return { kind:'known', ...js[text] };
    if (language === 'html' && attrs[text]) return { kind:'known', ...ENTRY(text, attrs[text], text === 'v-model' ? '<input v-model="name">' : text + '="..."') };
    if (language === 'html' && tags[text] && (prev === '<' || prev === '</')) return { kind:'known', ...ENTRY('وسم ' + text, tags[text], '<' + text + '>...</' + text + '>') };
    if (operators[text]) return { kind:'symbol', ...ENTRY(operators[text][0], operators[text][1], '') };
    return null;
  }
  // A lexical scanner, deliberately not a semantic compiler. Regex literals,
  // nested template interpolation and malformed markup are reported as limits.
  function scanLine(line, language, state) {
    const list = []; let i = 0;
    const token = (text, type) => { list.push({ text, type }); i += text.length; };
    while (i < line.length) {
      const rest = line.slice(i);
      if (state.comment) {
        const end = rest.indexOf(state.comment);
        if (end < 0) { token(rest, 'comment'); break; }
        token(rest.slice(0, end + state.comment.length), 'comment'); state.comment = ''; continue;
      }
      if (/^\s/.test(rest)) { const m=rest.match(/^\s+/)[0]; i+=m.length; continue; }
      if (language === 'html' && rest.startsWith('<!--')) { state.comment='-->'; continue; }
      if (language !== 'html' && rest.startsWith('/*')) { state.comment='*/'; continue; }
      if ((language === 'javascript' || language === 'vue-expression') && rest.startsWith('//')) { token(rest,'comment'); break; }
      const q=rest[0];
      if (q==='"' || q==="'" || q==='`') {
        let n=1,closed=false;for(;n<rest.length;n++){if(rest[n]==='\\'){n++;continue;}if(rest[n]===q){n++;closed=true;break;}}
        token(rest.slice(0,n),'string');if(!closed)state.unclosedString=true;continue;
      }
      if(language==='css'){const color=rest.match(/^#[\da-f]{3,8}(?![\w-])/i);if(color){token(color[0],'color');continue;}}
      const number=rest.match(language==='css'?/^(?:0x[\da-f]+|(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(?:px|rem|em|vh|vw|%|deg|ms|s)?/i:/^(?:0x[\da-f]+|(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)/i);
      if(number){token(number[0],'number');continue;}
      const word=rest.match(language==='javascript'||language==='vue-expression'?/^[\p{L}_$][\p{L}\p{N}_$]*/u:/^(?:--)?[\p{L}_$][\p{L}\p{N}_$-]*/u);
      if(word){token(word[0],'word');continue;}
      const op=rest.match(/^(?:===|!==|=>|\?\.|\?\?|\*\*|\+\+|--|\+=|-=|==|!=|<=|>=|&&|\|\||\.\.\.|<\/|\/>|\{\{|\}\})/);
      token(op?op[0]:rest[0],'symbol');
    }
    return list;
  }
  function summary(line, language) {
    const s=line.trim();
    if(!s)return 'سطر فارغ لتنظيم القراءة؛ لا يضيف تعليمة.';
    if(/^(?:\/\/|\/\*|\*|<!--)/.test(s))return 'تعليق يشرح الكود للقارئ؛ ليس تعليمة تنفيذية.';
    if(language==='html'){
      if(/v-model/.test(s))return 'هنا ربط بين إدخال المستخدم وحالة Vue؛ تغير الحقل يحدّث القيمة وفق قواعد الربط.';
      if(/v-for/.test(s))return 'هنا تكرار لعناصر القالب من مجموعة؛ أسماء item وindex يحددها هذا التعبير.';
      if(/v-if/.test(s))return 'هذا الجزء من القالب مشروط بقيمة؛ لا نستنتج قيمة الشرط دون تنفيذ البرنامج.';
      if(/@\w|v-on/.test(s))return 'هنا حدث مربوط بدالة أو تعبير؛ المعالج يعمل عند وقوع الحدث، لا لمجرد كتابة السطر.';
      if(/^<\//.test(s))return 'إغلاق عنصر سابق في بنية HTML؛ طابق اسمه مع الوسم المفتوح.';
      if(/^</.test(s))return 'يصف عنصرًا أو جزءًا من بنية الواجهة؛ الصفات تحدد خصائصه.';
      return 'محتوى نصي أو تعبير قالب؛ النص العادي يظهر للمستخدم، و{{ }} فيVue تعرض تعبيرًا.';
    }
    if(language==='css')return /:/.test(s)?'قاعدة خاصية وقيمة داخل تنسيق CSS؛ يظهر أثرها فقط إذا طابق selector عنصرًا وتغلبت على القواعد المتعارضة.':/[{}]/.test(s)?'بنية مجموعة قواعد CSS؛ selector قبل { يحدد العناصر المستهدفة.':'جزء من CSS؛ نحتاج سياق القاعدة لتحديد أثره المرئي.';
    if(/^(const|let|var)\b/.test(s))return 'تعريف اسم وربطه بقيمة. القيم الناتجة وقت التشغيل لا يقرأها هذا الشرح الثابت.';
    if(/(?:^|\s)function\b/.test(s))return 'تعريف دالة نجمع فيها عملًا؛ لن يعمل جسم الدالة إلا عند استدعائها.';
    if(/^return\b/.test(s))return 'ترجع هذه العبارة نتيجة من الدالة الحالية وتنهي مسار الاستدعاء.';
    if(/^if\b|^}\s*else\b/.test(s))return 'تفريع حسب شرط؛ لا يمكن إعلان الفرع الذي سيعمل من النص وحده.';
    if(/^for\b|^while\b/.test(s))return 'حلقة تكرار؛ راقب مصدر القيم وشرط النهاية لتجنب حلقة لا تنتهي.';
    if(/^import\b/.test(s))return 'استيراد أسماء من وحدة. وجود الاسم هنا لا يثبت توفر المكتبة في المشغل.';
    if(/console\.(log|warn|error)\s*\(/.test(s))return 'استدعاء لعرض قيمة أو رسالة فيConsole عندما يصل التنفيذ لهذا السطر.';
    return 'عبارة أو جزء من عبارة JavaScript؛ الكلمات والرموز أدناه تشرح الصياغة، لا تثبت صحة منطق البرنامج.';
  }
  function analyze(source, language, terms) {
    source=String(source==null?'':source);language=['html','css','javascript','vue'].includes(language)?language:'javascript';
    if(source.length>LIMITS.chars)return {ok:false,error:'الكود أكبر من20,000 محرف. قسّمه إلى أجزاء أصغر حتى يبقى الشرح واضحًا وسريعًا.',lines:[],relationships:[],warnings:[]};
    const raw=source.replace(/\r\n?/g,'\n').split('\n');
    if(raw.length>LIMITS.lines)return {ok:false,error:'الحد300 سطر في كل شرح. جرّب شرح جزء أصغر.',lines:[],relationships:[],warnings:[]};
    if(!source.trim())return {ok:false,error:'الصق كودًا أولًا، ثم اضغط «اشرح لي».',lines:[],relationships:[],warnings:[]};
    const declared=new Map(),relationships=[],warnings=[],state={comment:''};let active=language==='vue'?'html':language,total=0;
    // Declarations are source relationships, not resolved values or scope checks.
    const declarationState={comment:''};let declarationLanguage=language==='vue'?'html':language;
    raw.forEach((line,index)=>{
      if((language==='html'||language==='vue')&&/^\s*<\/script\b/i.test(line))declarationLanguage='html';
      if(declarationLanguage==='javascript'){
        const parts=scanLine(line,'javascript',declarationState);
        for(let i=0;i<parts.length-1;i++)if(parts[i].type==='word'&&['const','let','var','function','class'].includes(parts[i].text)&&parts[i+1].type==='word'&&!declared.has(parts[i+1].text))declared.set(parts[i+1].text,index+1);
      }
      if((language==='html'||language==='vue')&&/<script\b[^>]*>/i.test(line)&&!/<\/script\s*>/i.test(line))declarationLanguage='javascript';
    });
    const lines=[];
    for(let index=0;index<raw.length;index++){
      const line=raw[index];
      if((language==='html'||language==='vue')&&/^\s*<\/script\b/i.test(line))active='html';
      if((language==='html'||language==='vue')&&/^\s*<\/style\b/i.test(line))active='html';
      const tokens=scanLine(line,active,state),explained=[];let prev='';
      for(let tokenIndex=0;tokenIndex<tokens.length;tokenIndex++){
        const t=tokens[tokenIndex];
        if(++total>LIMITS.tokens)return {ok:false,error:'عدد أجزاء الكود كبير جدًا. قسّم المصدر إلى مقاطع أصغر.',lines:[],relationships:[],warnings:[]};
        let detail;
        if(t.type==='comment')detail={kind:'comment',...ENTRY('تعليق','هذا نص للتوضيح ولا ينفذ كتعليمة.','')};
        else if(t.type==='string')detail={kind:'literal',...ENTRY('قيمة نصية أو قيمة صفة','المحتوى بين علامات الاقتباس. القالب النصي `...` قد يحوي${...}؛ هذا المحلل لا يفصل تعبيراته الداخلية.','')};
        else if(t.type==='color')detail={kind:'literal',...ENTRY('لون CSS بصيغة HEX','قيمة لون تبدأ بـ#؛ قد تتضمن شفافية حسب طول الصيغة.','color: #0f766e;')};
        else if(active==='css'&&t.text.startsWith('--'))detail={kind:'identifier',...ENTRY('خاصية CSS مخصصة','اسم يبدأ بشرطتين؛ تعرفه مثل--accent:green وتقرأه عادة عبرvar(--accent).','--accent: #0f766e; color: var(--accent);')};
        else if(t.type==='number')detail={kind:'literal',...ENTRY(active==='css'?'قيمة عددية ووحدتها':'قيمة عددية','القيمة المكتوبة كما هي؛ الوحدة إن وجدت تحدد القياس فيCSS.','')};
        else if(t.text==='</')detail={kind:'symbol',...ENTRY('بداية وسم إغلاق','يغلق عنصرًا مفتوحًا من قبل، مثل</p>.','')};
        else if(t.text==='/>')detail={kind:'symbol',...ENTRY('نهاية وسم بصيغة ذاتية الإغلاق','تستعمل في XML وSFC؛ فيHTML لا تجعل العنصر العادي ذاتي الإغلاق.','')};
        else if(t.text==='{{'||t.text==='}}')detail={kind:'symbol',...ENTRY('حد تعبير قالب Vue','ما بين{{ و}} تعبير يُعرض كنص؛ لا تكتب فيه تعليمات متعددة.','{{ count }}')};
        else detail=knownToken(t.text,active,prev,tokens[tokenIndex+1]?.text);
        if(!detail&&t.type==='word'){
          if(active==='html'&&(/^aria-|^data-/.test(t.text)))detail={kind:'known',...ENTRY('صفة HTML إضافية',t.text.startsWith('aria-')?'تصف معنى أو حالة لوسائل المساعدة؛ يلزم اختيار الصفة المناسبة.':'حقل بيانات مخصص على العنصر؛ معناه يختاره التطبيق.','')};
          else if(declared.has(t.text)){const at=declared.get(t.text);detail={kind:'identifier',...ENTRY('اسم يختاره المبرمج','رُصد تعريف بهذا الاسم في السطر'+at+'؛ هذا ربط نصي لا يثبت النطاق أو القيمة الفعلية.','')};if(at!==index+1&&!relationships.some(r=>r.name===t.text&&r.to===index+1))relationships.push({name:t.text,from:at,to:index+1});}
          else detail={kind:'unknown',...ENTRY(active==='html'?'اسم عنصر/صفة أو نص بحسب موضعه':'اسم/قيمة تحتاج سياقًا','لا أستطيع تحديد معناها من هذه الكلمة وحدها. قد تكون اسمًا عرّفته أنت أو مكتبة أو جزءًا من قيمة؛ راجع التعريف والسياق.','')};
        }
        if(!detail)detail={kind:'unknown',...ENTRY('رمز يحتاج سياقًا','لا يوجد شرح موثوق خاص بهذا الرمز في القاموس المحلي؛ لا نفترض معناه.','')};
        const matches=Array.isArray(terms)?terms.filter(term=>{
          const label=String(term.term||'').toLowerCase(),word=t.text.toLowerCase();
          return word.length>1&&(label===word||label===word+'()'||label.split(/\s*\/\s*|\s*&\s*/).includes(word));
        }).slice(0,2).map(term=>({id:term.id,term:term.term})):[];
        explained.push({...t,...detail,references:matches});prev=t.text;
      }
      lines.push({number:index+1,source:line,language:active,summary:summary(line,active),tokens:explained});
      if((language==='html'||language==='vue')&&/<script\b[^>]*>/i.test(line)&&!/<\/script\s*>/i.test(line))active='javascript';
      if((language==='html'||language==='vue')&&/<style\b[^>]*>/i.test(line)&&!/<\/style\s*>/i.test(line))active='css';
    }
    if(state.comment)warnings.push('يوجد تعليق لم تُرصد نهايته؛ قد تكون لصقت جزءًا من ملف.');
    if(state.unclosedString)warnings.push('يوجد اقتباس لم يُغلق في سطر، أو نص متعدد الأسطر؛ تقسيمه هنا تقريبي.');
    if(language==='vue'||language==='html')warnings.push('محتوى script/style على السطر نفسه، وصفات Vue المعقدة والتعبيرات داخل القالب لا تُحلل دلاليًا بالكامل؛ اختر اللغة أو افصلها لشرح أدق.');
    if(/\b(?:interface|type\s+\w+\s*=|enum|namespace)\b/.test(source))warnings.push('قد توجد صياغة TypeScript؛ لا يوجد فاحص أنواع هنا، ولا يصح وصفها بأنها JavaScript منفّذة.');
    if(/\/(?![/*])(?:\\.|[^/\n])+\/[dgimsuvy]*\b/.test(source))warnings.push('قد يوجد RegExp؛ فصله عن عامل القسمة يحتاج محللًا نحويًا كاملًا، فلا تعتمد فصل رموزه هنا.');
    return {ok:true,language,lines,relationships,warnings,unknownCount:lines.reduce((n,l)=>n+l.tokens.filter(t=>t.kind==='unknown').length,0),note:'شرح محلي للصياغة والكلمات المعروفة، وليس تشغيلًا للكود أو فهمًا كاملًا لمعناه أو فحصًا لصحة البرنامج.'};
  }
  const component={
    props:{terms:{type:Array,default:()=>[]},initialCode:{type:String,default:''}},emits:['open-term','draft-change'],
    setup(props,{emit}){
      const{ref,computed,onUnmounted}=root.Vue;
      const saved=root.VLexLearningStore?.getSection('explainer',{})||{};
      const source=ref(props.initialCode|| (typeof saved.source==='string'?saved.source:'')),language=ref(['html','css','javascript','vue'].includes(saved.language)?saved.language:'javascript'),automatic=ref(false),result=ref(null),status=ref(''),selected=ref(null),speech=ref(''),composing=ref(false);let timer=null,utterance=null;
      const stale=computed(()=>!!result.value&&result.value.source!==source.value);
      function explain(){clearTimeout(timer);result.value={...analyze(source.value,language.value,props.terms),source:source.value};selected.value=null;status.value=result.value.ok?'تم شرح البنية؛ اختر كلمة أو رمزًا للتفصيل.':result.value.error;}
      function queue(){clearTimeout(timer);if(automatic.value&&!composing.value)timer=setTimeout(explain,650);}
      function persist(){if(root.VLexLearningStore)root.VLexLearningStore.setSection('explainer',{source:source.value,language:language.value});}
      function edited(){emit('draft-change',source.value);persist();queue();}
      function autoChanged(){queue();}
      function compositionStarted(){composing.value=true;clearTimeout(timer);}
      function languageChanged(){clearTimeout(timer);result.value=null;selected.value=null;persist();queue();}
      function sample(){source.value=samples[language.value];emit('draft-change',source.value);result.value=null;selected.value=null;persist();queue();}
      function speak(token){
        if(!root.speechSynthesis||!root.SpeechSynthesisUtterance){speech.value='النطق غير متاح في هذا المتصفح. التهجئة العربية التقريبية تظهر مع المصطلح.';return;}
        try{const voices=root.speechSynthesis.getVoices();const english=voices.find(v=>v.localService&&/^en(?:-|_)/i.test(v.lang));if(!english){speech.value='لا يوجد صوت إنجليزي محلي جاهز في نظامك الآن. ثبّت صوتًا إنجليزيًا محليًا من إعدادات النظام أو أعد المحاولة بعد تحميل الأصوات؛ لا نرسل الكلمة لخدمة نطق خارجية، والنص العربي تقريب للنطق.';return;}root.speechSynthesis.cancel();utterance=new root.SpeechSynthesisUtterance(token.text);utterance.voice=english;utterance.lang=english.lang;utterance.rate=.8;utterance.onstart=()=>{speech.value='جارٍ النطق بالإنجليزية.';};utterance.onend=()=>{speech.value='انتهى النطق.';};utterance.onerror=()=>{speech.value='تعذر النطق؛ تأكد من وجود صوت إنجليزي في نظامك. قد يحتاج تنزيل الصوت اتصالًا.';};speech.value='بانتظار الصوت الإنجليزي المتاح في نظامك…';root.speechSynthesis.speak(utterance);}catch(_){speech.value='تعذر تشغيل النطق في هذا المتصفح.';}
      }
      function stopSpeech(){if(root.speechSynthesis)root.speechSynthesis.cancel();speech.value='توقف النطق.';}
      onUnmounted(()=>{clearTimeout(timer);if(utterance&&root.speechSynthesis)root.speechSynthesis.cancel();});
      return{source,language,automatic,result,status,selected,speech,stale,composing,explain,edited,autoChanged,compositionStarted,languageChanged,sample,speak,stopSpeech,openTerm:id=>emit('open-term',id)};
    },
    template:`<section class="vlex-explainer" dir="rtl" aria-labelledby="vlex-explain-title">
      <div class="vlex-explain-heading"><div><p class="vlex-explain-eyebrow">افهم قبل ما تنسخ</p><h2 id="vlex-explain-title">اشرح لي الكود</h2></div><span class="vlex-explain-badge">محلي • بلا إرسال الكود لخدمة خارجية</span></div>
      <p class="vlex-explain-intro">الصق الكود، ثم اضغط «اشرح لي». نفكك السطور والكلمات والرموز المعروفة ونربط الأسماء بتعريفاتها. هذا شرح ثابت؛ ما يشغّل الكود ولا يضمن صحة البرنامج. الأسماء المجهولة تظهر بوضوح.</p>
      <div class="vlex-explain-toolbar"><label>لغة المصدر <select data-testid="explain-language" v-model="language" @change="languageChanged"><option value="javascript">JavaScript</option><option value="html">HTML</option><option value="css">CSS</option><option value="vue">Vue SFC</option></select></label><button type="button" @click="sample" data-testid="explain-sample">حمّل مثالًا للتعلم</button><label class="vlex-explain-auto"><input type="checkbox" v-model="automatic" @change="autoChanged" data-testid="explain-auto"> شرح تلقائي بعد توقف الكتابة</label></div>
      <label class="vlex-explain-source-label" for="vlex-explain-source">الكود المراد فهمه <small>حتى300 سطر و20,000 محرف؛ نسخة الشرح لا تعدل مصدر التطبيق.</small></label>
      <textarea id="vlex-explain-source" data-testid="explain-source" dir="ltr" spellcheck="false" v-model="source" @input="edited" @compositionstart="compositionStarted" @compositionend="composing=false; edited()" placeholder="const count = 1;\nconsole.log(count);"></textarea>
      <div class="vlex-explain-toolbar"><button type="button" class="vlex-explain-primary" @click="explain" data-testid="explain-run">اشرح لي</button><p class="vlex-explain-status" role="status" data-testid="explain-status">{{ status }}</p></div>
      <p v-if="stale" class="vlex-explain-warning" role="status">الشرح المعروض لنسخة سابقة. اضغط «اشرح لي» لتحديثه.</p>
      <div v-if="result && result.ok" class="vlex-explain-results" data-testid="explain-results">
        <aside class="vlex-explain-limits"><strong>كيف نقرأ هذا الشرح؟</strong><p>{{ result.note }}</p><p>أجزاء تحتاج سياقًا: {{ result.unknownCount }}. «اسم يختاره المبرمج» ليس قيمة متغير مراقبة.</p><p v-for="warning in result.warnings" :key="warning">{{ warning }}</p></aside>
        <div class="vlex-explain-workspace"><div class="vlex-explain-lines"><article v-for="line in result.lines" :key="line.number" class="vlex-explain-line"><header><span>السطر {{ line.number }}</span><small>{{ line.language }}</small></header><pre dir="ltr"><code>{{ line.source || ' ' }}</code></pre><p>{{ line.summary }}</p><div class="vlex-explain-tokens"><button v-for="(token,index) in line.tokens" :key="index" type="button" :class="['vlex-token', 'vlex-token-'+token.kind]" @click="selected={...token,line:line.number}" :aria-label="'شرح ' + token.text" :title="token.arabic"><code dir="ltr">{{ token.text }}</code></button></div><small v-if="!line.tokens.length">لا توجد كلمة أو رمز لتحليله في هذا السطر.</small></article></div>
        <aside class="vlex-token-detail" aria-live="polite"><template v-if="selected"><p class="vlex-explain-eyebrow">من السطر {{ selected.line }}</p><h3 dir="auto">{{ selected.text }}</h3><strong>{{ selected.arabic }}</strong><p>{{ selected.why }}</p><p v-if="selected.pronunciation">نطق تقريبي: {{ selected.pronunciation }}</p><pre v-if="selected.example" dir="ltr"><code>{{ selected.example }}</code></pre><div class="vlex-explain-toolbar"><button type="button" @click="speak(selected)">انطق بالإنجليزية</button><button type="button" @click="stopSpeech">إيقاف النطق</button></div><p role="status">{{ speech }}</p><button v-for="term in selected.references" :key="term.id" type="button" @click="openTerm(term.id)">افتح {{ term.term }} في القاموس ←</button></template><p v-else>اضغط أي كلمة أو رمز من السطر، وتشوف معناها وليش نستخدمها ومثالًا عليها. الأجزاء غير المعروفة ما نعطيها معنى مفترضًا.</p></aside></div>
        <section v-if="result.relationships.length" class="vlex-explain-relations"><h3>الربط بين أجزاء الكود</h3><p>مطابقة أسماء نصية للتعريف، وليست حلًا لنطاقات JavaScript أو تتبعًا للتنفيذ.</p><ul><li v-for="relation in result.relationships" :key="relation.name+'-'+relation.to"><code>{{ relation.name }}</code>: تعريف مرصود في السطر{{ relation.from }}، واستعمال الاسم في السطر{{ relation.to }}.</li></ul></section>
        <section class="vlex-explain-check"><h3>جرّب تتأكد من فهمك</h3><p>اختر اسم متغير أو قيمة في المثال، وتوقّع وش يتغير قبل التشغيل. بعدين جرّبه في المختبر المناسب وقارن النتيجة. ما نعطي حكم نجاح للكود من مجرد وجود شرح.</p></section>
      </div>
    </section>`
  };
  const api={analyze,limits:LIMITS,samples,component};
  root.VLexExplainer=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(root.document){root.VLexPlatformComponents=root.VLexPlatformComponents||[];root.VLexPlatformComponents.push({name:'vlex-explainer',component});}
})(typeof window!=='undefined'?window:globalThis);
