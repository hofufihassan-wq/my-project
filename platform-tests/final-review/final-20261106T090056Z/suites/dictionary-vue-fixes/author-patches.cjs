const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'lexicon-data.js'), 'utf8'), context);
const slug = term => term.toLowerCase().replace(/[^a-z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'item';
const tuples = new Map(context.window.RAW_LEXICON_TUPLES.map(t => [t[0] + '-' + slug(t[1]), t]));
const patches = [];
const existingFile = path.join(__dirname, 'patches.json');
const existing = fs.existsSync(existingFile) ? JSON.parse(fs.readFileSync(existingFile, 'utf8')) : [];
function original(id, field) {
  const current = tuples.get(id)[field];
  const saved = existing.find(p => p.id === id && p.field === field);
  if (!saved) return current;
  if (current !== saved.before && current !== saved.after) throw Error('Unexpected source change: ' + id);
  return saved.before;
}
function sfc(template, script, setup = true) {
  return `<template>\n  <main dir="rtl" style="padding:20px;font-family:Arial,sans-serif;line-height:1.8">\n${template}\n  </main>\n</template>\n\n<script${setup ? ' setup' : ''}>\n${script}\n</script>`;
}
function add(id, after, expected, extra = {}) {
  patches.push({ id, field: 5, before: original(id, 5), after,
    reason: 'المصدر السابق وضع الشيفرة كنص داخل template أو داخل موضع غير صالح؛ استُبدل بمثال مستقل حقيقي يعمل بمكتبة Vue المحلية، دون استيراد ملفات أو بيانات وهمية.',
    expected, statusIfContextRequired: null, ...extra });
}
add('vue-computed', sfc(`    <h3>computed: قيمة مشتقة من حالة تفاعلية</h3>
    <button data-testid="increment" @click="count++">زِد العدد</button>
    <p data-testid="count">العدد: {{ count }}</p>
    <p data-testid="doubled">الضعف: {{ doubled }}</p>`,
`import { ref, computed } from 'vue'
const count = ref(0)
// computed تتحدث تلقائيًا عندما تتغير count.
const doubled = computed(() => count.value * 2)`), 'يظهر العدد 0 والضعف 0؛ بعد النقر يظهر 1 و2.');
add('vue-defineasynccomponent', sfc(`    <h3>مكوّن يُحمّل عند الحاجة</h3>
    <p>المثال محلي؛ لا يطلب ملفًا خارجيًا.</p>
    <AsyncCounter />`,
`import { defineAsyncComponent, defineComponent, h, ref } from 'vue'
// يعيد loader مكوّنًا حقيقيًا. في مشروع متعدد الملفات قد يستورد ملفًا آخر.
// استيراد ملفات خارجية ليس مدعومًا في هذا المشغّل المستقل.
const AsyncCounter = defineAsyncComponent(() => Promise.resolve(defineComponent({
  setup() {
    const count = ref(0)
    return () => h('button', { 'data-testid': 'async-counter', onClick: () => count.value++ },
      'عداد المكوّن المحمّل: ' + count.value)
  }
})))`), 'يحل loader الوعد إلى مكوّن حقيقي؛ النقر يغيّر عداده من 0 إلى 1 دون شبكة.');
add('vue-defineexpose', sfc(`    <h3>defineExpose: واجهة المكوّن للأب</h3>
    <p>زر التجربة يعمل داخل المكوّن. وصول الأب إلى الدوال المكشوفة يحتاج مكوّن أب وtemplate ref في مشروع أكبر.</p>
    <input ref="inputEl" data-testid="exposed-input" v-model="name" aria-label="الاسم" />
    <button data-testid="clear" @click="resetForm">امسح النموذج</button>
    <button data-testid="focus" @click="focusInput">ركّز حقل الاسم</button>
    <p data-testid="name">الاسم: {{ name }}</p>`,
`import { ref } from 'vue'
const name = ref('سارة')
const inputEl = ref(null)
function resetForm() { name.value = '' }
function focusInput() { inputEl.value?.focus() }
// هذه واجهة يقرأها الأب عبر template ref، وليست آلية حماية أمنية.
defineExpose({ resetForm, focusInput })`), 'الحقل يبدأ بسارة؛ المسح يفرّغه والتركيز يركّزه. اختبار استدعاء الأب للدوال المكشوفة يحتاج سياق مكوّن أب.', { statusIfContextRequired: 'needs_context' });
add('vue-nexttick', sfc(`    <h3>nextTick: انتظر تحديث DOM</h3>
    <button data-testid="increment" @click="incrementAndRead">زِد واقرأ DOM</button>
    <p ref="outputEl" data-testid="count">{{ count }}</p>
    <p data-testid="observed">{{ observed }}</p>`,
`import { ref, nextTick } from 'vue'
const count = ref(0)
const outputEl = ref(null)
const observed = ref('لم نقرأ DOM بعد')
async function incrementAndRead() {
  const before = outputEl.value.textContent
  count.value++
  await nextTick()
  observed.value = 'قبل=' + before + '؛ بعد=' + outputEl.value.textContent
}`), 'عند النقر ينتقل النص إلى 1 ويسجل القراءة الفعلية: قبل=0؛ بعد=1.');
add('vue-onmounted', sfc(`    <h3>onMounted: العنصر صار موجودًا</h3>
    <p ref="messageEl" data-testid="element">عنصر جاهز</p>
    <p data-testid="mounted">{{ mountedMessage }}</p>`,
`import { ref, onMounted } from 'vue'
const messageEl = ref(null)
const mountedMessage = ref('ننتظر التركيب')
onMounted(() => {
  mountedMessage.value = 'قرأنا من DOM بعد التركيب: ' + messageEl.value.textContent
})`), 'تقرأ onMounted النص من العنصر الفعلي وتعرض: قرأنا من DOM بعد التركيب: عنصر جاهز.');
add('vue-onunmounted', sfc(`    <h3>onUnmounted: نظّف المؤقت عند إزالة المكوّن</h3>
    <TimerChild v-if="visible" @tick="ticks = $event" @stopped="stopped = true" />
    <button data-testid="remove" @click="visible = false">أزل المكوّن</button>
    <p data-testid="ticks">{{ ticks }}</p>
    <p data-testid="cleanup">{{ stopped ? 'تم تنظيف المؤقت' : 'المؤقت يعمل' }}</p>`,
`import { ref, defineComponent, h, onMounted, onUnmounted } from 'vue'
const visible = ref(true)
const ticks = ref(0)
const stopped = ref(false)
const TimerChild = defineComponent({
  emits: ['tick', 'stopped'],
  setup(_, { emit }) {
    let timerId
    let count = 0
    onMounted(() => { timerId = setInterval(() => emit('tick', ++count), 100) })
    onUnmounted(() => { clearInterval(timerId); emit('stopped') })
    return () => h('p', { 'data-testid': 'timer-child' }, 'مكوّن له مؤقت حقيقي')
  }
})`), 'يزداد عداد مؤقت حقيقي؛ إزالة الطفل تشغّل onUnmounted، وتحذف عنصره وتوقف العداد.');
add('vue-provide_inject', sfc(`    <h3>provide / inject: مشاركة مرجع مع مكوّن ابن</h3>
    <button data-testid="rename" @click="session = 'ليان'">غيّر الجلسة إلى ليان</button>
    <SessionChild />`,
`import { ref, provide, inject, defineComponent, h } from 'vue'
const session = ref('سارة')
const sessionKey = Symbol('userSession')
provide(sessionKey, session)
const SessionChild = defineComponent({
  setup() {
    const inheritedSession = inject(sessionKey)
    return () => h('p', { 'data-testid': 'session' }, 'جلسة الابن: ' + inheritedSession.value)
  }
})`), 'يعرض ابن حقيقي المرجع المحقون باسم سارة ثم يتحدث إلى ليان بعد النقر.');
add('vue-reactive', sfc(`    <h3>reactive: كائن تفاعلي</h3>
    <button data-testid="increment" @click="state.count++">زِد العدد</button>
    <p data-testid="count">{{ state.count }}</p>`,
`import { reactive } from 'vue'
const state = reactive({ count: 0 })`), 'تغيير state.count عبر الزر يحدث DOM من 0 إلى 1.');
add('vue-shallowref_shallowreactive', sfc(`    <h3>التفاعل السطحي: راقب المستوى الأول</h3>
    <button data-testid="nested" @click="mutateNested">غيّر الخاصية المتداخلة فقط</button>
    <button data-testid="replace" @click="replaceRoots">استبدل المستوى الأول</button>
    <p>الأول لا يطلب تحديث DOM. الثاني يطلبه ويظهر القيم الحالية.</p>
    <p data-testid="shallow-ref">shallowRef: {{ item.count }}</p>
    <p data-testid="shallow-reactive">shallowReactive: {{ state.info.count }}</p>`,
`import { shallowRef, shallowReactive } from 'vue'
const item = shallowRef({ count: 0 })
const state = shallowReactive({ info: { count: 0 } })
function mutateNested() {
  item.value.count++
  state.info.count++
}
function replaceRoots() {
  item.value = { count: item.value.count + 1 }
  state.info = { count: state.info.count + 1 }
}`), 'بعد تعديل المتداخل تبقى القيم المعروضة 0؛ بعد استبدال الجذر تظهر 2 لكليهما.');
add('vue-toref_torefs', sfc(`    <h3>toRef / toRefs: مرجع متصل بالكائن</h3>
    <input data-testid="name-input" v-model="name" aria-label="الاسم" />
    <button data-testid="increment" @click="count++">زِد عبر المرجع</button>
    <p data-testid="state">{{ state.name }}: {{ state.count }}</p>
    <p data-testid="refs">{{ name }}: {{ count }}</p>`,
`import { reactive, toRef, toRefs } from 'vue'
const state = reactive({ name: 'سارة', count: 0 })
const name = toRef(state, 'name')
const { count } = toRefs(state)
// name وcount متصلان بالكائن الأصلي؛ تعديل أيهما يحدث state.`), 'تعديل name والعداد عبر refs يتطابق فورًا مع state الأصلي.');
add('vue-useslots_useattrs', sfc(`    <h3>useSlots / useAttrs في مكوّن حقيقي</h3>
    <input data-testid="title-input" v-model="title" aria-label="عنوان البطاقة" />
    <LocalCard :title="title" aria-label="بطاقة محلية">
      <p data-testid="default-slot">محتوى الفتحة الأساسية</p>
      <template #footer><small data-testid="footer-slot">تذييل من المكوّن الأب</small></template>
    </LocalCard>`,
`import { ref, defineComponent, h, useSlots, useAttrs } from 'vue'
const title = ref('عنوان أول')
const LocalCard = defineComponent({
  inheritAttrs: false,
  setup() {
    const slots = useSlots()
    const attrs = useAttrs()
    return () => h('section', { ...attrs, 'data-testid': 'attrs-card' }, [
      h('strong', { 'data-testid': 'card-title' }, attrs.title),
      slots.default?.(),
      slots.footer?.()
    ])
  }
})`), 'يعرض الطفل الفتحتين ويطبق attrs على section؛ تعديل العنوان يحدث title ومحتوى strong.');
add('vue-watch_watcheffect', sfc(`    <h3>watch وwatchEffect</h3>
    <button data-testid="increment" @click="count++">زِد العدد</button>
    <p data-testid="effect">{{ effectMessage }}</p>
    <p data-testid="watch">{{ watchMessage }}</p>`,
`import { ref, watch, watchEffect } from 'vue'
const count = ref(0)
const effectMessage = ref('')
const watchMessage = ref('watch ينتظر أول تغيير')
watchEffect(() => { effectMessage.value = 'watchEffect: ' + count.value })
watch(count, (value, oldValue) => {
  watchMessage.value = 'watch: ' + oldValue + ' → ' + value
})`), 'watchEffect يعرض 0 عند التركيب؛ بعد النقر يعرض 1 ويسجل watch الانتقال 0 → 1.');
add('vue-watchposteffect', sfc(`    <h3>watchPostEffect: اقرأ DOM بعد تحديثه</h3>
    <button data-testid="increment" @click="count++">زِد العدد</button>
    <p ref="outputEl" data-testid="count">{{ count }}</p>
    <p data-testid="observed">{{ observed }}</p>`,
`import { ref, watchPostEffect } from 'vue'
const count = ref(0)
const outputEl = ref(null)
const observed = ref('')
watchPostEffect(() => {
  const expectedCount = count.value // اعتماد تفاعلي لكي يعمل بعد كل تغيير.
  observed.value = 'DOM بعد التحديث: ' + outputEl.value.textContent + '؛ الحالة: ' + expectedCount
})`), 'تطابق قراءة DOM الحالة 0 عند البدء و1 بعد النقر، داخل watchPostEffect.');
add('js-export_import', sfc(`    <h3>import وexport في مستوى الوحدة</h3>
    <p>استوردنا ref من Vue ثم صدّرنا تعريف المكوّن. استيراد ملفات مشروع أخرى خارج دعم هذه المعاينة.</p>
    <button data-testid="increment" @click="count++">زِد العدد</button>
    <p data-testid="count">{{ count }}</p>`,
`// import وexport في مستوى الوحدة، وليسا داخل دالة.
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  }
}`, false), 'import من Vue المحلي وexport default لتعريف المكوّن صالحان؛ الزر يغيّر العدد من 0 إلى 1.', { reason: 'المصدر السابق يحوي import وexport داخل execute ويشير إلى helpers.js غير موجود. المصدر الجديد يوضح مستوى الوحدة باستخدام استيراد Vue المدعوم وتصدير مكوّن حقيقي دون ملفات خارجية.' });
patches.push({ id: 'ts-type_narrowing_guards', field: 11, before: original('ts-type_narrowing_guards', 11),
  after: `// JavaScript فعلي: typeof يحدد المسار وقت التشغيل؛ لا يوجد هنا مترجم TypeScript.
function processInput(val) {
  if (typeof val === 'string') {
    return val.toUpperCase();
  }
  if (typeof val === 'number') {
    return val.toFixed(2);
  }
  throw new TypeError('المطلوب نص أو رقم');
}
console.log(processInput('vuelexicon')); // VUELEXICON
console.log(processInput(42.856)); // 42.86`,
  reason: 'المصدر السابق يحوي return خارج دالة ويستخدم val دون تعريف؛ أصبحت الحراسة داخل دالة ذات مدخلات ونتائج صريحة، دون الادعاء بدعم TypeScript.',
  expected: 'يسجل Console الناتجين VUELEXICON و42.86؛ الدالة ترفض نوعًا آخر بخطأ TypeError صريح.', statusIfContextRequired: null });
fs.writeFileSync(path.join(__dirname, 'patches.json'), JSON.stringify(patches, null, 2) + '\n');
fs.writeFileSync(path.join(__dirname, 'reclassifications.json'), JSON.stringify([{
  id: 'ts-tsconfig_json', format: 'vanilla', status: 'unsupported',
  reason: 'هذا ملف إعداد JSON يقرأه TypeScript/المحرر ضمن مشروع، وليس برنامج JavaScript قابلًا للتنفيذ. المشغّل المستقل لا يشغّل مترجم TypeScript أو إعداداته. يبقى المصدر كما هو؛ لا نحوله لبرنامج وهمي لإخفاء الفشل.'
}], null, 2) + '\n');
console.log(JSON.stringify({patches: patches.length, ids: patches.map(p => p.id), sourceEdits: false}));
