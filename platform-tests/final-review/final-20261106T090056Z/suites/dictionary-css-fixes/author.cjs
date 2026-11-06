const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync('lexicon-data.js','utf8'),c);
const id=t=>t[0]+'-'+(t[1].toLowerCase().replace(/[^a-z0-9_-]/g,'_').replace(/_+/g,'_').replace(/^_|_$/g,'')||'item');
const previousPath=path.join(__dirname,'patches.json');
const previous=fs.existsSync(previousPath)?JSON.parse(fs.readFileSync(previousPath,'utf8')):[];
const examples={};
function add(key,html,css,expected){examples['css-'+key]={html,css,expected};}
add('animation_keyframes',`<section class="lesson"><p>الحركة تمر بثلاث مراحل: حجم عادي، تكبير بسيط، ثم رجوع.</p><div class="pulse-card">راقب النبض حول البطاقة</div></section>`,`.pulse-card { margin: 24px; padding: 24px; background: #064e3b; border-radius: 16px; animation: pulseGlow 2s infinite ease-in-out; }
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(0, 220, 130, .2); transform: scale(1); }
  50% { box-shadow: 0 0 30px rgba(0, 220, 130, .6); transform: scale(1.03); }
}
/* احترام تفضيل تقليل الحركة عند المستخدم */
@media (prefers-reduced-motion: reduce) { .pulse-card { animation: none; } }`,`تتحرك البطاقة فعليًا بين scale(1) وscale(1.03) كل ثانيتين؛ تتوقف مع تفضيل تقليل الحركة.`);
add('aspect-ratio',`<section class="lesson"><p>نفس العرض يعطي ارتفاعًا محسوبًا من النسبة.</p><div class="video-wrapper">فيديو 16 : 9</div><div class="avatar-square">1 : 1</div></section>`,`.video-wrapper { width: 100%; max-width: 320px; aspect-ratio: 16 / 9; background: #164e63; border-radius: 16px; display: grid; place-items: center; }
.avatar-square { width: 64px; aspect-ratio: 1 / 1; margin-top: 16px; background: #065f46; display: grid; place-items: center; }`,`مستطيل 320×180 عند توفر العرض ومربع 64×64؛ تحافظ النسب عند تضييق الحاوية.`);
add('background',`<section class="lesson"><div class="nuxt-hero-surface"><h2>خلفية متعددة الخصائص</h2><p>تدرج شعاعي فوق لون احتياطي؛ لا تحتاج صورة خارجية.</p></div></section>`,`.nuxt-hero-surface { padding: 32px 20px; min-height: 140px; background: radial-gradient(circle at 50% 0%, rgba(0, 220, 130, .45) 0%, #020420 70%); background-color: #020420; background-size: cover; border-radius: 16px; }`,`خلفية radial-gradient بمركز علوي ولون احتياطي rgb(2,4,32) وحجم cover.`);
add('border_border-radius',`<section class="lesson"><div class="emerald-card"><h2>إطار وزوايا ناعمة</h2><p>الإطار 2px، ونصف قطر الزاوية 16px.</p></div></section>`,`.emerald-card { border: 2px solid #00dc82; border-radius: 16px; padding: 24px; background-color: #0f172a; }`,`إطار أخضر solid بسماكة 2px وزوايا 16px حول محتوى فعلي.`);
add('box-shadow',`<section class="lesson"><p>مرر المؤشر على الزر لتقوية الظل.</p><button class="nuxt-glow-button">مرر المؤشر هنا</button></section>`,`.nuxt-glow-button { padding: 16px 24px; margin: 24px; color: #ecfdf5; background: #064e3b; border: 1px solid #00dc82; border-radius: 12px; box-shadow: 0 0 25px -5px rgba(0, 220, 130, .4); transition: box-shadow .3s ease; cursor: pointer; }
.nuxt-glow-button:hover { box-shadow: 0 0 35px 2px rgba(0, 220, 130, .6); }`,`الظل 25px وانتشار -5px قبل التحويم، ثم 35px وانتشار 2px بعده.`);
add('color',`<section class="lesson"><h2 class="brand-accent-text">هذا النص أخضر</h2><p class="muted-caption">هذا الوصف رمادي هادئ.</p><p>color يغيّر لون النص، وليس الخلفية.</p></section>`,`.brand-accent-text { color: #00dc82; }
.muted-caption { color: #94a3b8; }`,`لون العنوان rgb(0,220,130)، والوصف rgb(148,163,184).`);
add('cursor',`<section class="lesson"><p>مرر المؤشر على العنصرين وقارن شكله.</p><details class="clickable-card"><summary>افتح الملاحظة: مؤشر يد</summary><p>cursor يغيّر شكل المؤشر؛ details هو الذي يفتح الملاحظة عند النقر.</p></details><button class="disabled-button" disabled>زر معطل: مؤشر منع</button><p>disabled هو الذي يعطّل الزر، وليس شكل المؤشر.</p></section>`,`.clickable-card, .disabled-button { display: inline-block; margin: 8px; padding: 16px; border: 1px solid #34d399; border-radius: 8px; background: #064e3b; color: white; }
.clickable-card { cursor: pointer; }
.disabled-button { cursor: not-allowed; opacity: .6; }`,`بطاقة details بمؤشر pointer تفتح وتغلق فعليًا؛ زر disabled مع cursor:not-allowed وشفافية .6.`);
add('display',`<section class="lesson"><p>العناصر الظاهرة مرتبة في صف Flex؛ العنصر الثالث موجود في HTML لكنه مخفي.</p><div class="custom-flex-row"><span>الأول</span><span>الثاني</span><span class="hidden-element">هذا النص مخفي</span></div></section>`,`.custom-flex-row { display: flex; align-items: center; gap: 16px; }
.custom-flex-row span { padding: 16px; background: #065f46; }
.hidden-element { display: none; }`,`عنصران بمحاذاة أفقية وفاصل 16px؛ العنصر الثالث display:none ولا يملك صندوق عرض.`);
add('filter_blur_drop-shadow',`<section class="lesson"><p>قارن النص المموه بالنجمة ذات الظل الذي يتبع شكلها.</p><div class="blurred-backdrop">نص عليه blur(3px)</div><svg class="glowing-logo" viewBox="0 0 100 100" width="100" height="100" aria-label="نجمة بظل أخضر" role="img"><polygon points="50,5 61,35 95,35 68,55 79,90 50,69 21,90 32,55 5,35 39,35" fill="#00dc82" /></svg></section>`,`.blurred-backdrop { padding: 20px; font-size: 24px; filter: blur(3px); }
.glowing-logo { margin: 20px; filter: drop-shadow(0 0 12px rgba(0, 220, 130, .6)); }`,`نص filter:blur(3px) وSVG نجمة فعلية بظل drop-shadow نصف قطره 12px.`);
add('flex_flexbox',`<section class="lesson"><p>Flex يوزّع المساحة الحرة بين الشعار والروابط.</p><nav class="header-navbar" aria-label="مثال شريط تنقل"><strong>شعار</strong><span>دروس</span><span>قاموس</span></nav></section>`,`.header-navbar { display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 24px; padding: 16px; background: #064e3b; }
.header-navbar > * { padding: 8px; background: #0f172a; }`,`ثلاثة عناصر في صف واحد، space-between على المحور الرئيسي وcenter على المتعامد وفاصل أدنى 24px.`);
add('gap',`<section class="lesson"><p>في صف الأزرار الفاصل 12px.</p><div class="buttons-group"><button>أول</button><button>ثانٍ</button><button>ثالث</button></div><p>في الشبكة: 24px بين الصفوف و32px بين الأعمدة.</p><div class="cards-grid"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div></section>`,`.buttons-group { display: flex; gap: 12px; }
.cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px 32px; }
.buttons-group button, .cards-grid > div { padding: 12px; color: white; border: 0; background: #065f46; }`,`Flex بفجوة فعلية 12px؛ شبكة من 3 أعمدة بفواصل صفوف 24px وأعمدة 32px.`);
add('grid_css_grid',`<section class="lesson"><p>فوق 600px: عمود للقائمة وضعف عرضه للمحتوى؛ تحتها عمود واحد.</p><div class="app-workspace"><aside>قائمة الدروس</aside><article>تفاصيل الدرس في العمود الأوسع</article></div></section>`,`.app-workspace { display: grid; grid-template-columns: 4fr 8fr; gap: 24px; }
.app-workspace > * { min-width: 0; padding: 16px; background: #064e3b; }
@media (max-width: 600px) { .app-workspace { grid-template-columns: 1fr; } }`,`عمودان بنسبة 1:2 بعد طرح الفاصل 24px؛ يصيران صفين عند عرض نافذة معاينة 600px أو أقل.`);
add('hover_focus',`<section class="lesson"><p>مرر المؤشر على الزر، ثم اضغط Tab للوصول إلى الحقل.</p><button class="nav-pill">مرر المؤشر هنا</button><label for="search-term">مصطلح البحث</label><input id="search-term" class="search-input" placeholder="اضغط هنا أو استخدم Tab" /></section>`,`.nav-pill { padding: 12px 18px; color: white; background: #0f172a; border: 2px solid #475569; border-radius: 24px; }
.nav-pill:hover { background-color: rgba(0, 220, 130, .15); border-color: #00dc82; }
label { display: block; margin: 20px 0 8px; }
.search-input { padding: 12px; max-width: 100%; box-sizing: border-box; color: white; background: #0f172a; border: 2px solid #475569; border-radius: 8px; }
.search-input:focus { outline: none; border-color: #00dc82; box-shadow: 0 0 0 3px rgba(0, 220, 130, .25); }`,`التحويم يغيّر حد الزر إلى الأخضر؛ التركيز الحقيقي على الحقل يضيف الحد الأخضر وحلقة 3px.`);
add('justify-content_align-items',`<section class="lesson"><p>المربع يتوسّط أفقيًا ورأسيًا داخل الحاوية.</p><div class="center-everything"><div class="centered-item">في الوسط</div></div></section>`,`.center-everything { display: flex; justify-content: center; align-items: center; min-height: 200px; background: #164e63; }
.centered-item { padding: 16px; background: #064e3b; }`,`مركز صندوق العنصر يطابق مركز الحاوية ذات الارتفاع 200px على المحورين.`);
add('linear-gradient',`<section class="lesson"><p>تدرج بزاوية 135 درجة بين لونين، وليس لونًا واحدًا.</p><span class="emerald-gradient-badge">من الأخضر الفاتح إلى الداكن</span></section>`,`.emerald-gradient-badge { display: inline-block; background: linear-gradient(135deg, #00dc82 0%, #064e3b 100%); color: white; padding: 12px 20px; border-radius: 9999px; }`,`background-image يحوي linear-gradient(135deg) من rgb(0,220,130) إلى rgb(6,78,59).`);
add('margin_padding',`<section class="lesson"><p>الخلفية الزرقاء تكشف الفراغ الخارجي بين البطاقتين.</p><div class="cards-area"><div class="term-card"><span>المحتوى يبتعد عن الإطار 24px من الداخل.</span></div><div class="term-card">البطاقة الثانية تبدأ بعد هامش16px.</div></div></section>`,`.cards-area { background: #155e75; padding: 1px; }
.term-card { margin-bottom: 16px; padding: 24px; background-color: #0f172a; border: 1px solid #34d399; }`,`padding بقيمة 24px داخل البطاقة؛ margin-bottom بقيمة 16px يفصل فعليًا بين صندوقي البطاقتين.`);
add('media',`<section class="lesson"><p>غيّر عرض نافذة المعاينة: تحت600px عمود، وابتداءً منها صف.</p><div class="sidebar-layout"><aside>القائمة</aside><main>محتوى الدرس</main></div></section>`,`.sidebar-layout { display: flex; flex-direction: column; gap: 16px; }
.sidebar-layout > * { padding: 20px; background: #065f46; flex: 1; }
@media (min-width: 600px) { .sidebar-layout { flex-direction: row; } }`,`flex-direction:column عند عرض 500px، وrow عند 800px مع تغير موضع العنصرين فعليًا.`);
add('opacity_backdrop-filter',`<section class="lesson"><p>اللوحة الزجاجية تموّه الخلفية؛ opacity يشفّف العنصر ومحتوياته معًا.</p><div class="glass-scene"><div class="scene-pattern">خلفية خلف الزجاج</div><div class="nuxt-glass-header">backdrop-filter: blur(16px)</div></div><p class="faded-note">هذا النص مع صندوقه بشفافية50%</p></section>`,`.glass-scene { position: relative; min-height: 160px; background: repeating-linear-gradient(45deg, #00dc82 0 12px, #164e63 12px 24px); }
.scene-pattern { padding: 20px; color: #020420; font-size: 24px; font-weight: bold; }
.nuxt-glass-header { position: absolute; left: 16px; right: 16px; bottom: 16px; padding: 20px; background-color: rgba(2, 4, 32, .55); backdrop-filter: blur(16px); border: 1px solid rgba(0, 220, 130, .4); }
.faded-note { padding: 16px; background: #065f46; opacity: .5; }`,`لوحة فوق خلفية مخططة حقيقية مع backdrop-filter:blur(16px) وخلفية rgba شفافة؛ نص مستقل بشفافية opacity:.5.`);
add('overflow_overflow-x_y',`<section class="lesson"><p>اسحب شريط التمرير لرؤية بقية القائمة؛ العرض الأفقي مقصوص.</p><div class="terms-scroll-list" tabindex="0" aria-label="قائمة قابلة للتمرير"><p>HTML: هيكل الصفحة</p><p>CSS: شكل الصفحة</p><p>JavaScript: التفاعل</p><p>Vue: بناء الواجهات</p><p>DOM: عناصر المستند</p><p>Flexbox: ترتيب العناصر</p></div></section>`,`.terms-scroll-list { height: 120px; width: 240px; max-width: 100%; overflow-y: auto; overflow-x: hidden; scrollbar-width: thin; background: #064e3b; }
.terms-scroll-list p { width: 360px; padding: 12px; margin: 0; border-bottom: 1px solid #34d399; }`,`قائمة scrollHeight أكبر من clientHeight؛ يتغير scrollTop مع التمرير الرأسي، ويقص overflow-x:hidden المحتوى العريض.`);
add('position',`<section class="lesson"><p>الأيقونة تتموضع بالنسبة لحاوية البحث، وليس الصفحة.</p><div class="search-wrapper"><input aria-label="حقل بحث" placeholder="اكتب مصطلحًا" /><span class="search-glass-icon" aria-hidden="true">⌕</span></div></section>`,`.search-wrapper { position: relative; width: 280px; max-width: 100%; }
.search-wrapper input { width: 100%; height: 56px; box-sizing: border-box; padding: 12px 48px 12px 12px; background: #0f172a; color: white; border: 1px solid #34d399; border-radius: 8px; }
.search-glass-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); font-size: 28px; line-height: 1; }`,`position:relative على الحاوية وabsolute على الأيقونة؛ تبعد 16px عن اليمين وتتمركز رأسيًا عند 50% ناقص نصف ارتفاعها.`);
add('scroll-behavior',`<section class="lesson"><p>اضغط الزر؛ حاوية الدروس تتحرك بسلاسة إلى القسم الثاني.</p><button type="button" class="chapter-link" @click="$refs.chapters.scrollTo({ top: 320 })">انتقل للقسم الثاني</button><div ref="chapters" class="lexicon-container" tabindex="0"><section class="chapter"><h2>القسم الأول</h2><p>هذه مساحة قابلة للتمرير داخل المثال.</p></section><section id="chapter-two" class="chapter"><h2>القسم الثاني</h2><p>وصلت هنا باستخدام scrollTo، وCSS حدّد سلاسة الحركة.</p></section></div></section>`,`.chapter-link { color: #6ee7b7; background: #064e3b; border: 1px solid #34d399; border-radius: 8px; padding: 8px 12px; cursor: pointer; display: inline-block; margin-bottom: 12px; }
.lexicon-container { height: 160px; overflow-y: auto; scroll-behavior: smooth; border: 1px solid #34d399; }
.chapter { min-height: 320px; padding: 16px; box-sizing: border-box; background: #164e63; }
.chapter + .chapter { background: #064e3b; }
@media (prefers-reduced-motion: reduce) { .lexicon-container { scroll-behavior: auto; } }`,`يتقدم scrollTop بين 0 و320 أثناء التمرير الناعم ثم يستقر عند 320؛ تقليل الحركة يعيد السلوك إلى auto.`);
add('transform_transition',`<section class="lesson"><p>مرر المؤشر لتكبير الزر ورفعه؛ اضغط مطولًا لتصغيره.</p><button class="interactive-btn">مرر المؤشر ثم اضغط</button></section>`,`.interactive-btn { margin: 24px; padding: 20px; color: white; background: #065f46; border: 1px solid #34d399; border-radius: 12px; cursor: pointer; transition: transform .2s cubic-bezier(.4, 0, .2, 1); }
.interactive-btn:hover { transform: translateY(-2px) scale(1.02); }
.interactive-btn:active { transform: translateY(0) scale(.98); }
@media (prefers-reduced-motion: reduce) { .interactive-btn { transition: none; } }`,`بعد التحويم scale(1.02) وtranslateY(-2px)؛ أثناء الضغط scale(.98)، والانتقال مدته .2s.`);
add('user-select',`<section class="lesson"><p>جرّب تحديد النص: الزر يمنع التحديد، وسطر الكود يحدد كله بنقرة.</p><button class="no-select-btn">لا يمكن تحديد نص الزر</button><pre class="code-block">const score = 100;</pre><p class="normal-text">وهذا نص عادي يمكن تحديد جزء منه.</p></section>`,`.no-select-btn { user-select: none; -webkit-user-select: none; padding: 16px; color: white; background: #065f46; border: 1px solid #34d399; }
.code-block { user-select: all; direction: ltr; padding: 16px; background: #0f172a; }
.normal-text { user-select: text; }`,`user-select:none على الزر، وall على الكود، وtext على النص؛ النقر على الكود يحدد const score = 100; كاملًا.`);
add('width_height',`<section class="lesson"><p>الحاوية تأخذ100% حتى سقف320px؛ ارتفاعها الأدنى120px. المربع80×80.</p><div class="container-responsive"><div class="fixed-square">80×80</div></div></section>`,`.container-responsive { width: 100%; max-width: 320px; min-height: 120px; margin: 0 auto; background: #164e63; }
.fixed-square { width: 80px; height: 80px; background: #065f46; display: grid; place-items: center; }`,`الحاوية بعرض 320px أو العرض المتاح الأصغر وارتفاع 120px؛ المربع 80×80، ويعمل الحد الأقصى مع العرض النسبي.`);
add('z-index',`<section class="lesson"><p>القائمة z-index:50 داخل سياق40؛ تغطي اللوحة التي في سياق10.</p><div class="stack-demo"><div class="search-section">البحث<div class="search-dropdown-menu">نتائج البحث فوق اللوحة</div></div><div class="tabs-filter-section">لوحة المحتوى في الخلف</div></div></section>`,`.stack-demo { position: relative; height: 200px; isolation: isolate; }
.search-section { position: relative; z-index: 40; height: 48px; padding: 12px; box-sizing: border-box; background: #164e63; }
.search-dropdown-menu { position: absolute; z-index: 50; top: 40px; left: 16px; right: 16px; height: 80px; padding: 12px; box-sizing: border-box; background: #047857; border: 2px solid #6ee7b7; }
.tabs-filter-section { position: relative; z-index: 10; height: 120px; padding: 24px; background: #7f1d1d; }`,`في منطقة التداخل تعيد elementFromPoint القائمة الأمامية؛ قيم z-index هي 40/50/10 ضمن سياقات صحيحة.`);
const common=`.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }`;
const patches=[];
for(const t of Array.from(c.window.RAW_LEXICON_TUPLES).filter(t=>t[0]==='css')){
const key=id(t),e=examples[key];if(!e)throw Error(key);
const after=`<template>\n  ${e.html}\n</template>\n\n<style scoped>\n${common}\n\n${e.css}\n</style>`;
patches.push({id:key,field:5,before:(previous.find(p=>p.id===key)||{}).before||t[5],after,reason:'إصلاح مصدر Vue مستقل: إنشاء عناصر HTML الحقيقية التي تستهدفها القواعد، وإخراج قواعد CSS من .target-element غير المطابقة، وإزالة كتلة script الفارغة ذات الإغلاق الموروث. لا تعتمد المعاينة على Tailwind أو Nuxt UI.',expected:e.expected,officialReference:t[13]});
fs.writeFileSync(path.join(__dirname,key+'.vue'),after+'\n');
}
if(patches.length!==25)throw Error('Expected 25');
fs.writeFileSync(path.join(__dirname,'patches.json'),JSON.stringify(patches,null,2)+'\n');
console.log('Authored',patches.length,'CSS SFC patches');
