/* V Lex Pro: real JavaScript in an opaque sandbox + terminable Worker.
 * The parent parses source only. It never evaluates user JavaScript.
 */
(function (root) {
  'use strict';
  const MAX_SOURCE = 64000, MAX_STEPS = 200, MAX_LOGS = 160, MAX_VARIABLES = 40;
  const DEMO = `let count = 2;\nconst items = [1, 2, 3];\ncount = count + items.length;\nif (count > 3) { console.log('العدد أكبر من ثلاثة'); }\nconsole.log('النتيجة:', count);`;
  function bindings(pattern, out) {
    if (!pattern) return;
    if (pattern.type === 'Identifier') out.push(pattern.name);
    else if (pattern.type === 'RestElement') bindings(pattern.argument, out);
    else if (pattern.type === 'AssignmentPattern') bindings(pattern.left, out);
    else if (pattern.type === 'ArrayPattern') pattern.elements.forEach(p => bindings(p, out));
    else if (pattern.type === 'ObjectPattern') pattern.properties.forEach(p => bindings(p.type === 'RestElement' ? p.argument : p.value, out));
  }
  function prepare(source, parser, tag, continuous = false) {
    if (typeof source !== 'string' || !source.trim()) throw new Error('اكتب كود JavaScript أولًا.');
    if (source.length > MAX_SOURCE) throw new Error('الكود أكبر من 64 ألف محرف. جرّب مقطعًا أصغر.');
    if (typeof parser !== 'function') throw new Error('محلل JavaScript المحلي غير متاح؛ أعد فتح الصفحة مع مجلد assets كاملًا.');
    let ast;
    try { ast = parser(source, { sourceType: 'script', allowAwaitOutsideFunction: false, allowReturnOutsideFunction: false }); }
    catch (e) { throw new Error('خطأ صياغة: ' + String(e.message).slice(0, 500)); }
    // This intentionally supports a strict function body, not arbitrary global scripts.
    // User source cannot name the private instrumentation or dynamically eval in its scope.
    const pending = [ast.program];
    const asyncNames = new Set(['Promise', 'queueMicrotask', 'setTimeout', 'setInterval', 'requestAnimationFrame', 'fetch', 'importScripts', 'Worker', 'MessageChannel']);
    while (pending.length) {
      const node = pending.pop();
      if (!node || typeof node !== 'object') continue;
      if (node.type === 'Identifier' && node.name.startsWith('__vlx_')) throw new Error('الأسماء التي تبدأ بـ __vlx_ محجوزة للمراقبة؛ غيّر الاسم.');
      if (node.type === 'WithStatement' || ((node.type === 'CallExpression' || node.type === 'OptionalCallExpression') && node.callee?.type === 'Identifier' && node.callee.name === 'eval')) throw new Error('eval المباشر وwith غير مدعومين في المختبر المعزول.');
      if (!continuous && (node.type === 'AwaitExpression' || node.type === 'ImportExpression' || (node.type === 'Identifier' && asyncNames.has(node.name)))) throw new Error('خطوة بخطوة مخصصة للكود المتزامن دون Promise أو مؤقتات أو مهام غير متزامنة. استخدم «تشغيل الكود» لهذه التجربة.');
      for (const key of Object.keys(node)) {
        if (key === 'loc' || key === 'tokens' || key === 'comments') continue;
        const value = node[key];
        if (Array.isArray(value)) pending.push(...value);
        else if (value && typeof value === 'object') pending.push(value);
      }
    }
    const nodes = ast.program.body;
    if (nodes.length > MAX_STEPS) throw new Error('عدد التعليمات العليا أكبر من 200. قسّم التجربة.');
    const prefix = '__vlx_' + String(tag || 'lab').replace(/[^a-zA-Z0-9]/g, '') + '_';
    // A directive can change wrapper semantics. Keep directives before instrumentation.
    const directives = (ast.program.directives || []).map(n => source.slice(n.start, n.end)).join('\n');
    const names = [], steps = [], chunks = [directives];
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      if (node.type === 'ImportDeclaration' || node.type.startsWith('Export')) throw new Error('هذا المختبر لتجارب JavaScript المستقلة؛ استيراد الملفات أو تصديرها يحتاج مشروعًا.');
      if (node.type === 'VariableDeclaration') node.declarations.forEach(d => bindings(d.id, names));
      if ((node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration') && node.id) names.push(node.id.name);
      if (names.length > MAX_VARIABLES) throw new Error('مراقبة المتغيرات محدودة بأربعين اسمًا على المستوى الأعلى.');
      const step = { index, line: node.loc.start.line, endLine: node.loc.end.line, kind: node.type, code: source.slice(node.start, node.end) };
      step.names = [...new Set(names)];
      steps.push(step);
      // Node ranges come from the actual parser; no splitting on semicolons/newlines.
      chunks.push(`${continuous ? '' : 'await '}${prefix}gate(${index});\n${step.code}\n;${prefix}capture(${index},[${[...new Set(names)].map(name => `[${JSON.stringify(name)},()=>${name}]`).join(',')}]);`);
    }
    return { body: chunks.join('\n'), steps, parameters: [prefix + 'gate', prefix + 'capture'], names: [...new Set(names)] };
  }
  // This function's text is sent to a Worker; it is never invoked in the parent.
  function workerBootstrap(config) {
    'use strict';
    // Source can clone this Blob Worker and inspect messages from its clone.
    // Telemetry therefore uses only the transferred capability, never the
    // Worker global message channel or a secret embedded in the Blob source.
    let portSend = null;
    const send = (type, payload) => { if (portSend) portSend({ type, payload }); };
    // Capture these before running source: changing global built-ins must not falsify a snapshot.
    const nativeString = String, NativePromise = Promise, nativeIsArray = Array.isArray;
    const slice = Function.prototype.call.bind(String.prototype.slice);
    const NativeFunction = Function, nativeDefineProperty = Object.defineProperty;
    const nativeSetTimeout = setTimeout.bind(self);
    let continuous = config.continuous, waiting = null, logCount = 0, failed = false;
    const format = value => {
      // Do not enumerate/read objects: even descriptors/keys can trigger Proxy traps.
      // Primitives are observed exactly; object contents are deliberately not inspected.
      const kind = typeof value;
      if (value === null) return 'null';
      if (kind === 'object') {
        try { return nativeIsArray(value) ? '[مصفوفة — المحتوى غير مفحوص]' : '[كائن — المحتوى غير مفحوص]'; }
        catch (_) { return '[كائن غير متاح]'; }
      }
      if (kind === 'function') return '[دالة — الجسم غير مفحوص]';
      return slice(nativeString(value), 0, 1000) + (kind === 'bigint' ? 'n' : '');
    };
    for (const level of ['log', 'info', 'warn', 'error', 'debug']) console[level] = (...args) => {
      if (logCount++ >= 160) return;
      let text = '';
      for (let i = 0; i < args.length && i < 10; i++) text += (i ? ' ' : '') + format(args[i]);
      send('log', { level, text: slice(text, 0, 2000) });
    };
    const error = e => { failed = true; let text; try { text = nativeString(e && (e.message || e.reason || e)); } catch (_) { text = 'تعذرت قراءة الخطأ'; } send('error', { text: slice(text, 0, 2000) }); };
    self.addEventListener('error', e => { e.preventDefault(); error(e); });
    self.addEventListener('unhandledrejection', e => { e.preventDefault(); error(e.reason); });
    const gate = index => {
      if (continuous) { send('executing', { index }); return; }
      send('paused', { index });
      return new NativePromise(resolve => { waiting = () => { send('executing', { index }); resolve(); }; });
    };
    const capture = (index, getters) => {
      const variables = [];
      for (let i = 0; i < getters.length; i++) {
        const name = getters[i][0], get = getters[i][1];
        let value;
        try { value = format(get()); } catch (_) { value = '[غير متاح في هذه التعليمة]'; }
        nativeDefineProperty(variables, i, { value: { name, value }, writable: true, enumerable: true, configurable: true });
      }
      send('snapshot', { index, variables });
    };
    function start() {
      // A strict zero-argument function closes over helpers. They are not exposed
      // through the user function's arguments, caller/callee, or global scope.
      // All compilation/execution happens exclusively in this dedicated Worker.
      try {
        const factory = new NativeFunction(...config.parameters, '"use strict"; return async function () {\n' + config.body + '\n};');
        const execute = factory(gate, capture);
        execute().then(() => { if (!failed) send('done', {}); }).catch(error);
      } catch (e) { error(e); }
    }
    function initialize(event) {
      if (!event.data || event.data.type !== 'VLEX_INIT_PORT' || !event.ports[0]) return;
      self.removeEventListener('message', initialize);
      // The only transferred port arrives BEFORE user source runs. Future commands
      // never touch the Worker global message event, so user listeners cannot read it.
      const privatePort = event.ports[0];
      portSend = privatePort.postMessage.bind(privatePort);
      privatePort.onmessage = e => {
        const action = e.data && e.data.action;
        if (action === 'continue') continuous = true;
        if ((action === 'next' || action === 'continue') && waiting) { const go = waiting; waiting = null; go(); }
      };
      nativeSetTimeout(start, 0);
    }
    self.addEventListener('message', initialize);
  }
  // Runs only in the opaque iframe. The frame is a broker, not the execution realm.
  function frameBootstrap(config) {
    const runId = config.runId;
    let worker = null, controlPort = null, timer = null, budget = 0, workerUrl = null;
    const send = (type, payload) => parent.postMessage({ source: 'VLEX_JS_LAB', runId, type, payload }, '*');
    function clear() { if (timer) clearTimeout(timer); timer = null; }
    function stop(reason) { clear(); if (worker) worker.terminate(); worker = null; if (controlPort) controlPort.close(); controlPort = null; if (workerUrl) URL.revokeObjectURL(workerUrl); workerUrl = null; send(reason === 'timeout' ? 'timeout' : 'stopped', {}); }
    function arm() { clear(); timer = setTimeout(() => stop('timeout'), 2500); }
    addEventListener('message', event => {
      if (event.source !== parent || !event.data || event.data.runId !== runId || event.data.source !== 'VLEX_JS_LAB_CONTROL') return;
      const action = event.data.action;
      if (action === 'stop') return stop('user');
      if (worker && controlPort && ['next', 'continue'].includes(action)) { arm(); controlPort.postMessage({ action }); }
    });
    try {
      const data = { continuous: config.continuous, body: config.body, parameters: config.parameters };
      workerUrl = URL.createObjectURL(new Blob(['(' + config.workerBootstrap + ')(' + JSON.stringify(data) + ');'], { type: 'text/javascript' }));
      worker = new Worker(workerUrl);
      const controls = new MessageChannel(); controlPort = controls.port1;
      controlPort.onmessage = event => {
        const message = event.data;
        if (!message || ++budget > 1200) return;
        const type = message.type, p = message.payload;
        if (!p || typeof p !== 'object' || Array.isArray(p)) return;
        if (['paused', 'executing', 'snapshot'].includes(type)) {
          if (!Number.isInteger(p.index) || p.index < 0 || p.index >= config.stepCount) return;
          if (type === 'paused') clear();
          if (type === 'executing') arm();
          if (type === 'snapshot') {
            if (!Array.isArray(p.variables) || p.variables.length > 40 || p.variables.some(v => !v || typeof v.name !== 'string' || v.name.length > 200 || typeof v.value !== 'string' || v.value.length > 2200)) return;
          }
          send(type, p);
        } else if (['log', 'error'].includes(type)) {
          if (typeof p.text !== 'string' || p.text.length > 2200) return;
          if (type === 'error') { clear(); if (worker) worker.terminate(); worker = null; }
          send(type, { text: p.text, level: ['log', 'info', 'warn', 'error', 'debug'].includes(p.level) ? p.level : 'error' });
        } else if (type === 'done') { clear(); send('done', {}); timer = setTimeout(() => { if (worker) worker.terminate(); worker = null; if (workerUrl) URL.revokeObjectURL(workerUrl); workerUrl = null; send('settled', {}); }, 2500); }
      };
      worker.postMessage({ type: 'VLEX_INIT_PORT' }, [controls.port2]);
      worker.onerror = e => { clear(); send('error', { text: String(e.message || 'تعذر بدء Worker').slice(0, 2000), level: 'error' }); };
      arm();
    } catch (e) { clear(); send('unsupported', { text: String(e.message).slice(0, 2000) }); }
    addEventListener('pagehide', () => { clear(); if (worker) worker.terminate(); });
  }
  function documentFor(session) {
    const config = { ...session, workerBootstrap: String(workerBootstrap), stepCount: session.steps.length };
    delete config.steps;
    const json = JSON.stringify(config).replace(/</g, '\\u003c');
    return '<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\' \'unsafe-eval\' blob:; worker-src blob:; connect-src \'none\'"><script>(' + String(frameBootstrap) + ')(' + json + ');<\/script>';
  }
  function validMessage(data, runId, count) {
    if (!data || typeof data !== 'object' || Array.isArray(data) || data.source !== 'VLEX_JS_LAB' || data.runId !== runId || !data.payload || typeof data.payload !== 'object' || Array.isArray(data.payload)) return false;
    if (!['paused', 'executing', 'snapshot', 'log', 'error', 'done', 'stopped', 'timeout', 'unsupported', 'settled'].includes(data.type)) return false;
    const p = data.payload;
    if (['paused', 'executing', 'snapshot'].includes(data.type) && (!Number.isInteger(p.index) || p.index < 0 || p.index >= count)) return false;
    if (data.type === 'snapshot' && (!Array.isArray(p.variables) || p.variables.length > MAX_VARIABLES || p.variables.some(v => !v || typeof v.name !== 'string' || v.name.length > 200 || typeof v.value !== 'string' || v.value.length > 2200))) return false;
    if (['log', 'error', 'unsupported'].includes(data.type) && (typeof p.text !== 'string' || p.text.length > 2200)) return false;
    return true;
  }
  const component = {
    emits: ['practice'],
    setup(_, { emit }) {
      const { ref, computed, watch, onMounted, onBeforeUnmount } = root.Vue;
      const store = root.VLexLearningStore;
      const saved = store?.getSection('jsLab', {}) || {};
      const source = ref(typeof saved.source === 'string' ? saved.source : DEMO), status = ref('idle'), error = ref('');
      const logs = ref([]), snapshots = ref([]), steps = ref([]), activeIndex = ref(-1), frame = ref(null), frameDoc = ref(''), runId = ref('');
      const storageWarning = ref(''), stale = ref(false), submitted = ref('');
      const labels = { idle: 'جاهز للتجربة', starting: 'جارٍ تجهيز العامل المعزول', paused: 'متوقف عند تعليمة — اضغط خطوة', executing: 'جارٍ التنفيذ', done: 'انتهت التعليمات العليا؛ نافذة المؤقتات 2.5 ثانية', settled: 'انتهى التنفيذ وأُغلقت نافذة المؤقتات', stopped: 'توقف التنفيذ', timeout: 'أُوقف العامل بعد تجاوز مهلة التنفيذ', error: 'يوجد خطأ فعلي', unsupported: 'تشغيل العامل غير متاح' };
      const statusLabel = computed(() => labels[status.value] || status.value);
      const variables = computed(() => snapshots.value.at(-1)?.variables || []);
      const currentStep = computed(() => steps.value[activeIndex.value] || null);
      let messages = 0;
      function control(action) {
        if (frame.value?.contentWindow && runId.value) frame.value.contentWindow.postMessage({ source: 'VLEX_JS_LAB_CONTROL', runId: runId.value, action }, '*');
      }
      function stop() { control('stop'); runId.value = ''; frameDoc.value = ''; status.value = 'stopped'; }
      function start(continuous) {
        stop(); error.value = ''; logs.value = []; snapshots.value = []; activeIndex.value = -1; messages = 0;
        const id = crypto.randomUUID();
        let plan;
        try { plan = prepare(source.value, root.VueLexiconCompiler?.babelParse, id, continuous); }
        catch (e) { error.value = e.message; status.value = 'error'; steps.value = []; return; }
        steps.value = plan.steps; submitted.value = source.value; stale.value = false; runId.value = id; status.value = 'starting';
        frameDoc.value = documentFor({ runId: id, continuous, body: plan.body, parameters: plan.parameters, steps: plan.steps });
      }
      function message(event) {
        if (event.source !== frame.value?.contentWindow || !runId.value || !validMessage(event.data, runId.value, steps.value.length) || ++messages > 1200) return;
        const { type, payload } = event.data;
        if (type === 'snapshot' && payload.variables.some(v => !steps.value[payload.index]?.names.includes(v.name))) return;
        if (type === 'log') { logs.value = [...logs.value, { level: payload.level || 'log', text: payload.text }].slice(-MAX_LOGS); }
        else if (type === 'snapshot') snapshots.value = [...snapshots.value, { index: payload.index, line: steps.value[payload.index]?.line, variables: payload.variables }].slice(-MAX_STEPS);
        else if (type === 'error' || type === 'unsupported') { error.value = payload.text; status.value = type; }
        else if (['paused', 'executing'].includes(type)) { if (status.value !== 'error') status.value = type; activeIndex.value = payload.index; }
        else if (['done', 'stopped', 'timeout', 'settled'].includes(type)) { if (status.value !== 'error') status.value = type; }
      }
      watch(source, value => {
        if (runId.value && value !== submitted.value) stale.value = true;
        if (value.length <= MAX_SOURCE && store && !store.setSection('jsLab', { source: value })) storageWarning.value = 'تعذر الحفظ الدائم. انسخ كودك قبل إغلاق الصفحة.';
      });
      function resetExample() { stop(); source.value = DEMO; error.value = ''; logs.value = []; snapshots.value = []; steps.value = []; status.value = 'idle'; }
      function sendDOM() { emit('practice', { code: '<!doctype html><p id="output">افتح Console وشغّل التجربة.</p><script>\n' + source.value.replace(/<\/script/gi, '<\\/script') + '\n<\/script>' }); }
      onMounted(() => root.addEventListener('message', message));
      onBeforeUnmount(() => { stop(); root.removeEventListener('message', message); });
      return { source, status, statusLabel, error, logs, snapshots, steps, variables, currentStep, activeIndex, frame, frameDoc, storageWarning, stale, start, stop, control, resetExample, sendDOM };
    },
    template: `
<section class="vlx-js-lab" aria-labelledby="vlx-js-title">
  <header><p class="vlx-js-eyebrow">مختبر JavaScript محلي</p><h2 id="vlx-js-title">اكتب، شغّل، وراقب القيم فعلًا</h2><p>المتغيرات هنا قيم قُرئت بعد التنفيذ داخل عامل معزول. ليست تخمينًا من نص الكود.</p></header>
  <p class="vlx-js-limits" role="note">«خطوة» تنفّذ تعليمة على المستوى الأعلى؛ جسم الحلقة أو الدالة يُنفّذ كوحدة واحدة. المراقبة للأسماء المعلنة في المستوى الأعلى فقط. ينفّذ المصدر داخل دالة async صارمة ومعزولة؛ ليس سياق script عالميًا. التشغيل المتواصل يحافظ على تعاقب التعليمات المتزامنة؛ وضع الخطوات يغيّر توقيت المهام ويوقف بين التعليمات؛ يرفض واجهات Promise والمؤقتات المباشرة، ولا يصلح لفحص ترتيب مهام async. eval المباشر وwith غير مدعومين. هذا المختبر بلا DOM أو Vue أو ملفات مستوردة؛ استخدم المحاكي لتجارب الصفحة.</p>
  <div class="vlx-js-toolbar">
    <button type="button" data-testid="js-lab-run" @click="start(true)">تشغيل الكود</button>
    <button type="button" data-testid="js-lab-debug" @click="start(false)">ابدأ خطوة بخطوة</button>
    <button type="button" data-testid="js-lab-step" @click="control('next')" :disabled="status !== 'paused'">خطوة</button>
    <button type="button" @click="control('continue')" :disabled="status !== 'paused'">أكمل التشغيل</button>
    <button type="button" data-testid="js-lab-stop" @click="stop">إيقاف</button>
    <button type="button" @click="resetExample">مثال البداية</button>
    <button type="button" @click="sendDOM">افتح في المحاكي</button>
  </div>
  <div class="vlx-js-status" role="status" data-testid="js-lab-status">{{ statusLabel }}</div>
  <p v-if="stale" class="vlx-js-warning">عدّلت المصدر؛ النتائج الحالية تخص النسخة التي شغلتها سابقًا. شغّل الكود لتحديثها.</p>
  <p v-if="storageWarning" class="vlx-js-warning" role="alert">{{ storageWarning }}</p>
  <div class="vlx-js-grid">
    <div class="vlx-js-editor"><label for="vlx-js-source">كود JavaScript</label><div class="vlex-code-shell"><pre class="vlex-code-paint" aria-hidden="true"></pre><textarea v-code-editor="'javascript'" id="vlx-js-source" data-testid="js-lab-source" v-model="source" spellcheck="false" autocapitalize="off" autocomplete="off" dir="ltr" :maxlength="64000"></textarea></div><p>مهلة التنفيذ 2.5 ثانية لكل تعليمة أو تشغيل متواصل؛ يمكنك إيقاف الحلقة المتجمدة لأن العامل منفصل عن الواجهة. الانتظار عند «خطوة» لا يستهلك المهلة.</p></div>
    <section class="vlx-js-observation"><h3>مراقبة المتغيرات</h3><p v-if="!variables.length">شغّل تعليمة تعرّف متغيرًا؛ لا توجد قيم مُشاهدة بعد.</p><table v-else data-testid="js-lab-variables"><thead><tr><th>الاسم</th><th>القيمة المشاهدة</th></tr></thead><tbody><tr v-for="v in variables" :key="v.name"><td><code>{{ v.name }}</code></td><td dir="ltr">{{ v.value }}</td></tr></tbody></table><p v-if="currentStep">التعليمة الحالية من السطر {{ currentStep.line }} إلى {{ currentStep.endLine }}.</p><pre v-if="currentStep" class="vlx-js-current" data-testid="js-lab-current" dir="ltr">{{ currentStep.code }}</pre><p class="vlx-js-small">تظهر القيم الأولية الفعلية فقط؛ المصفوفات والكائنات والدوال تظهر كنوع دون قراءة محتواها، حتى لا تُشغّل getters أو Proxy أثناء المراقبة. مراقبة قيمة لا تثبت صحة منطق البرنامج.</p></section>
  </div>
  <section class="vlx-js-console"><h3>Console</h3><p v-if="!logs.length">لا توجد رسائل فعلية بعد.</p><ol data-testid="js-lab-console"><li v-for="(log, i) in logs" :key="i" :data-level="log.level"><b>{{ log.level }}</b> <code dir="auto">{{ log.text }}</code></li></ol><p v-if="error" role="alert" data-testid="js-lab-error">{{ error }}</p></section>
  <details v-if="snapshots.length"><summary>سجل القيم بعد كل تعليمة ({{ snapshots.length }})</summary><ol class="vlx-js-history"><li v-for="(s, i) in snapshots" :key="i">بعد السطر {{ s.line }}: <span v-for="v in s.variables" :key="v.name"><code>{{ v.name }} = {{ v.value }}</code> </span></li></ol></details>
  <iframe v-if="frameDoc" :key="frameDoc" ref="frame" :srcdoc="frameDoc" sandbox="allow-scripts" title="عامل JavaScript المعزول" data-testid="js-lab-frame" class="vlx-js-worker" aria-hidden="true" tabindex="-1"></iframe>
</section>`
  };
  const api = { prepare, documentFor, validMessage, DEMO, MAX_SOURCE, MAX_STEPS };
  root.VLexJSLab = api;
  (root.VLexPlatformComponents || (root.VLexPlatformComponents = [])).push({ name: 'vlex-js-lab', component });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
