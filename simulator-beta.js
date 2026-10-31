/* Simulator beta helpers: isolated preferences, gesture-gated audio, source views.
 * No user source is evaluated here. This module never changes lesson data/storage.
 */
(function (root) {
  'use strict';
  const PREFERENCE_KEY = 'vuelexicon_simulator_preferences_v1';
  const DEFAULTS = Object.freeze({ version: 1, muted: true, volume: 0.25, animations: true });
  const AMBIENT_PREFERENCE_KEY = 'vuelexicon_simulator_ambient_v1';
  const AMBIENT_DEFAULTS = Object.freeze({ version: 1, enabled: false, volume: 0.18 });
  const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
  const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  function parsePreferences(raw) {
    if (typeof raw !== 'string' || raw.length > 2048) throw new TypeError('حجم إعدادات المحاكي غير صالح.');
    const value = JSON.parse(raw);
    if (!record(value) || Object.keys(value).sort().join(',') !== 'animations,muted,version,volume' ||
        value.version !== 1 || typeof value.muted !== 'boolean' || typeof value.animations !== 'boolean' ||
        typeof value.volume !== 'number' || !Number.isFinite(value.volume) || value.volume < 0 || value.volume > 1) {
      throw new TypeError('إعدادات المحاكي غير متوافقة مع المخطط الحالي.');
    }
    return { version: 1, muted: value.muted, volume: value.volume, animations: value.animations };
  }

  function parseAmbientPreferences(raw) {
    if (typeof raw !== 'string' || raw.length > 2048) throw new TypeError('حجم إعدادات الصوت المحيطي غير صالح.');
    const value = JSON.parse(raw);
    if (!record(value) || Object.keys(value).sort().join(',') !== 'enabled,version,volume' ||
        value.version !== 1 || typeof value.enabled !== 'boolean' ||
        typeof value.volume !== 'number' || !Number.isFinite(value.volume) || value.volume < 0 || value.volume > 1) {
      throw new TypeError('إعدادات الصوت المحيطي غير متوافقة.');
    }
    return { version: 1, enabled: value.enabled, volume: value.volume };
  }

  // A separate opt-in record keeps existing alert/motion preferences byte-compatible.
  function ambientPreferences(storage, ref, warn) {
    let values = { ...AMBIENT_DEFAULTS }, protectedOriginal = false, raw = null;
    const status = ref('ready'), recoveryKey = ref(null);
    const write = (key, value) => {
      try { storage.setItem(key, value); return storage.getItem(key) === value; } catch (_) { return false; }
    };
    try { raw = storage.getItem(AMBIENT_PREFERENCE_KEY); }
    catch (_) {
      protectedOriginal = true; status.value = 'protected';
      warn('تعذر قراءة إعدادات الصوت المحيطي؛ أبقينا الأصل دون استبدال، والتفضيل لهذه الجلسة فقط.');
    }
    if (raw !== null) {
      try { values = parseAmbientPreferences(raw); }
      catch (_) {
        let key = null;
        try {
          for (let i = 1; i <= 50; i++) {
            const candidate = 'vuelexicon_recovery_simulator_ambient_v1_' + Date.now() + '_' + i;
            if (storage.getItem(candidate) === null) { key = candidate; break; }
          }
        } catch (_) {}
        if (key && write(key, raw)) {
          recoveryKey.value = key;
          status.value = write(AMBIENT_PREFERENCE_KEY, JSON.stringify(values)) ? 'recovered' : 'memory';
          warn('حُفظ أصل إعدادات الصوت المحيطي كاملًا في نسخة استرجاع، واستُخدمت القيم الافتراضية.');
        } else {
          protectedOriginal = true; status.value = 'protected';
          warn('تعذر حفظ نسخة استرجاع للصوت المحيطي؛ لم نستبدل الأصل، والتفضيل لهذه الجلسة فقط.');
        }
      }
    }
    const enabled = ref(values.enabled), volume = ref(values.volume);
    const snapshot = () => ({ version: 1, enabled: enabled.value, volume: volume.value });
    function persist() {
      if (!protectedOriginal && write(AMBIENT_PREFERENCE_KEY, JSON.stringify(snapshot()))) {
        status.value = 'ready'; return true;
      }
      status.value = protectedOriginal ? 'protected' : 'memory';
      warn('لم يُحفظ تفضيل الصوت المحيطي؛ أبقينا إعداداته الأصلية، والاختيار الحالي مؤقت.');
      return false;
    }
    return { enabled, volume, status, recoveryKey, snapshot, persist };
  }

  function createController(options) {
    if (!options?.Vue?.ref) throw new TypeError('Vue.ref is required');
    const { ref } = options.Vue;
    let storage;
    try { storage = own(options, 'storage') ? options.storage : root.localStorage; } catch (_) {}
    const warnings = ref([]);
    const storageStatus = ref('ready');
    const recoveryKey = ref(null);
    const audioStatus = ref('muted');
    const hiddenPanels = ref([]);
    let protectedOriginal = false;
    let sequence = 0;
    let values = { ...DEFAULTS };
    function warn(message) {
      if (warnings.value.includes(message)) return;
      warnings.value = [...warnings.value, message];
      try { options.onWarning?.(message); } catch (_) {}
    }
    function write(key, value) {
      if (!storage) return false;
      try { storage.setItem(key, value); return storage.getItem(key) === value; } catch (_) { return false; }
    }
    let raw = null;
    try {
      if (!storage) throw new Error('storage unavailable');
      raw = storage.getItem(PREFERENCE_KEY);
    } catch (_) {
      // An unreadable existing record must never be replaced without a recovery copy.
      protectedOriginal = true;
      storageStatus.value = 'memory';
      warn('تعذر قراءة إعدادات المحاكي؛ الصوت مكتوم افتراضيًا والتفضيلات لهذه الجلسة فقط.');
    }
    if (raw !== null) {
      try { values = parsePreferences(raw); }
      catch (_) {
        let key = null;
        try {
          // Use a fresh key; never replace an existing recovery record.
          do { key = 'vuelexicon_recovery_simulator_preferences_v1_' + Date.now() + '_' + (++sequence); }
          while (storage.getItem(key) !== null);
        } catch (_) { key = null; }
        if (key && write(key, raw)) {
          recoveryKey.value = key;
          if (write(PREFERENCE_KEY, JSON.stringify(values))) {
            storageStatus.value = 'recovered';
            warn('استُرجعت إعدادات المحاكي الافتراضية؛ النص السابق كاملًا محفوظ في نسخة استرجاع مستقلة.');
          } else {
            storageStatus.value = 'memory';
            warn('حُفظ أصل إعدادات المحاكي في نسخة استرجاع، لكن تعذر حفظ الإعدادات الجديدة؛ التفضيلات في هذه الجلسة فقط.');
          }
        } else {
          protectedOriginal = true;
          storageStatus.value = 'protected';
          warn('تعذر حفظ نسخة استرجاع لإعدادات المحاكي؛ أبقينا النص الأصلي دون استبدال، والتفضيلات في هذه الجلسة فقط.');
        }
      }
    }
    const muted = ref(values.muted);
    const volume = ref(values.volume);
    const animations = ref(values.animations);
    const ambient = ambientPreferences(storage, ref, warn);
    const ambientStatus = ref(ambient.enabled.value ? 'gesture-required' : 'off');
    audioStatus.value = muted.value ? 'muted' : 'gesture-required';
    let context = null;
    let masterGain = null;
    let ambientGraph = null;
    let disposed = false;
    let scheduledCues = 0;
    const tones = new Set();
    // Bound parent audio work when a valid child emits a burst of error events.
    // This cooldown concerns feedback cues only, never execution timing.
    const lastCueAt = new Map();
    const maxActiveCues = 4;
    const cueCooldownSeconds = 0.12;
    const active = () => {
      try { return !disposed && root.document?.visibilityState !== 'hidden' &&
        (typeof options.isActive !== 'function' || options.isActive() === true); }
      catch (_) { return false; }
    };
    function snapshot() { return { version: 1, muted: muted.value, volume: volume.value, animations: animations.value }; }
    function persist() {
      if (!protectedOriginal && write(PREFERENCE_KEY, JSON.stringify(snapshot()))) {
        storageStatus.value = 'ready'; return true;
      }
      storageStatus.value = protectedOriginal ? 'protected' : 'memory';
      warn(protectedOriginal ? 'لم تُستبدل إعدادات المحاكي الأصلية غير القابلة للاسترجاع؛ التفضيل مؤقت.' : 'تعذر حفظ إعدادات المحاكي؛ التفضيل الحالي مؤقت لهذه الجلسة.');
      return false;
    }
    function silence() {
      stopAmbient();
      silenceAlerts();
      audioStatus.value = muted.value || volume.value === 0 ? 'muted' : 'gesture-required';
    }
    function silenceAlerts() {
      if (masterGain && context) {
        try { masterGain.gain.cancelScheduledValues(context.currentTime); masterGain.gain.setValueAtTime(0, context.currentTime); } catch (_) {}
      }
      for (const oscillator of tones) { try { oscillator.stop(); } catch (_) {} }
      tones.clear();
      lastCueAt.clear();
    }

    function stopAmbient() {
      const graph = ambientGraph;
      ambientGraph = null;
      if (graph) {
        // Disconnect first: no residual tone survives navigation, hiding or disposal.
        try { graph.gain.disconnect(); } catch (_) {}
        for (const source of graph.sources) { try { source.stop(); source.disconnect(); } catch (_) {} }
        for (const node of graph.nodes) { try { node.disconnect(); } catch (_) {} }
      }
      ambientStatus.value = !ambient.enabled.value ? 'off' : ambient.volume.value === 0 ? 'silent' : 'paused';
    }
    function startAmbient() {
      if (!active() || !ambient.enabled.value || ambient.volume.value === 0 || context?.state !== 'running') return false;
      if (ambientGraph) { updateAmbientGain(); ambientStatus.value = 'playing'; return true; }
      const sources = [], nodes = [];
      try {
        const gain = context.createGain(), filter = context.createBiquadFilter();
        nodes.push(gain, filter);
        filter.type = 'lowpass'; filter.frequency.value = 650; filter.Q.value = 0.3;
        gain.gain.value = 0; filter.connect(gain); gain.connect(context.destination);
        // Three quiet consonant sine tones, gently breathed by one slow LFO.
        // Fixed-size native graph: no timers, loops, external files or worklets.
        for (const frequency of [130.8128, 196, 261.6256]) {
          const oscillator = context.createOscillator(), voiceGain = context.createGain();
          sources.push(oscillator); nodes.push(voiceGain);
          oscillator.type = 'sine'; oscillator.frequency.value = frequency; voiceGain.gain.value = 0.025;
          oscillator.connect(voiceGain); voiceGain.connect(filter); oscillator.start();
        }
        const breath = context.createOscillator(), depth = context.createGain();
        sources.push(breath); nodes.push(depth);
        breath.frequency.value = 0.07; depth.gain.value = ambient.volume.value * 0.12;
        breath.connect(depth); depth.connect(gain.gain); breath.start();
        ambientGraph = { gain, depth, sources, nodes };
        updateAmbientGain(); ambientStatus.value = 'playing'; return true;
      } catch (_) {
        for (const source of sources) { try { source.stop(); source.disconnect(); } catch (_) {} }
        for (const node of nodes) { try { node.disconnect(); } catch (_) {} }
        ambientStatus.value = 'error';
        warn('تعذر تشغيل الصوت المحيطي؛ تنبيهات الأخطاء والمعاينة مستقلتان عنه.'); return false;
      }
    }
    function updateAmbientGain() {
      if (!ambientGraph || !context) return;
      try {
        ambientGraph.gain.gain.setTargetAtTime(ambient.volume.value, context.currentTime, 0.35);
        ambientGraph.depth.gain.setTargetAtTime(ambient.volume.value * 0.12, context.currentTime, 0.35);
      } catch (_) {}
    }
    function updateGain() {
      if (masterGain && context) {
        try { masterGain.gain.setValueAtTime(muted.value || !active() ? 0 : volume.value, context.currentTime); } catch (_) {}
      }
    }
    async function prepareAudio(event) {
      const wantsAlerts = !muted.value && volume.value > 0;
      const wantsAmbient = ambient.enabled.value && ambient.volume.value > 0;
      if (disposed || !active() || (!wantsAlerts && !wantsAmbient)) {
        audioStatus.value = muted.value || volume.value === 0 ? 'muted' : 'inactive'; return false;
      }
      if (context?.state === 'running') {
        updateGain(); startAmbient(); audioStatus.value = wantsAlerts ? 'ready' : 'muted'; return true;
      }
      // Native clicks/keys are required. Reloaded saved consent does not autoplay.
      if (!event || event.isTrusted !== true || root.navigator?.userActivation?.isActive === false) {
        audioStatus.value = 'gesture-required'; return false;
      }
      try {
        if (!context) {
          const Audio = options.AudioContext || root.AudioContext || root.webkitAudioContext;
          if (typeof Audio !== 'function') {
            audioStatus.value = 'unsupported';
            ambientStatus.value = 'unsupported';
            warn('الصوت غير متاح في هذا المتصفح؛ التشغيل والمعاينة يعملان دون صوت.'); return false;
          }
          context = new Audio();
          masterGain = context.createGain(); masterGain.gain.value = 0; masterGain.connect(context.destination);
          context.onstatechange = () => {
            if (disposed) return;
            audioStatus.value = muted.value || volume.value === 0 ? 'muted' : context.state === 'running' ? 'ready' : 'suspended';
            if (ambient.enabled.value) ambientStatus.value = context.state === 'running' && ambientGraph ? 'playing' : 'paused';
          };
        }
        if (context.state !== 'running') await context.resume();
        if (disposed || !active()) { silence(); return false; }
        updateGain();
        startAmbient();
        audioStatus.value = muted.value || volume.value === 0 ? 'muted' : context.state === 'running' ? 'ready' : 'suspended';
        return context.state === 'running';
      } catch (_) {
        audioStatus.value = 'error';
        if (ambient.enabled.value) ambientStatus.value = 'error';
        warn('تعذر تفعيل الصوت؛ لا يؤثر ذلك على تشغيل الأكواد أو حفظ المسودة.'); return false;
      }
    }
    function playCue(kind) {
      if (!active() || muted.value || volume.value === 0 || !context || context.state !== 'running' || !masterGain) return false;
      const cue = ({ start: [440, 660, 0.09], ready: [660, 880, 0.13], error: [220, 140, 0.16], stop: [330, 220, 0.09], enabled: [520, 740, 0.09] })[kind];
      if (!cue) return false;
      try {
        const now = context.currentTime;
        if (tones.size >= maxActiveCues ||
            (lastCueAt.has(kind) && now - lastCueAt.get(kind) < cueCooldownSeconds)) return false;
        updateGain();
        const oscillator = context.createOscillator();
        const envelope = context.createGain();
        oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(cue[0], now);
        oscillator.frequency.exponentialRampToValueAtTime(cue[1], now + cue[2]);
        envelope.gain.setValueAtTime(0, now); envelope.gain.linearRampToValueAtTime(0.10, now + 0.009);
        envelope.gain.exponentialRampToValueAtTime(0.0001, now + cue[2]);
        oscillator.connect(envelope); envelope.connect(masterGain); tones.add(oscillator);
        oscillator.onended = () => { tones.delete(oscillator); try { oscillator.disconnect(); envelope.disconnect(); } catch (_) {} };
        oscillator.start(now); oscillator.stop(now + cue[2] + 0.02);
        lastCueAt.set(kind, now); scheduledCues++; return true;
      } catch (_) { audioStatus.value = 'error'; return false; }
    }
    function setMuted(value, event) {
      if (typeof value !== 'boolean') return false;
      muted.value = value;
      if (value) {
        // Alerts and ambience are separate buses; muting alerts keeps ambience.
        silenceAlerts(); audioStatus.value = 'muted';
      }
      else { audioStatus.value = 'gesture-required'; void prepareAudio(event); }
      return persist();
    }
    function setVolume(value) {
      if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1) return false;
      volume.value = value;
      if (value === 0) { silenceAlerts(); audioStatus.value = 'muted'; }
      else { updateGain(); audioStatus.value = muted.value ? 'muted' : context?.state === 'running' ? 'ready' : 'gesture-required'; }
      return persist();
    }
    function setAmbientEnabled(value, event) {
      if (typeof value !== 'boolean') return false;
      ambient.enabled.value = value;
      if (!value) stopAmbient();
      else { ambientStatus.value = 'gesture-required'; void prepareAudio(event); }
      return ambient.persist();
    }
    function setAmbientVolume(value, event) {
      if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1) return false;
      ambient.volume.value = value;
      if (value === 0) stopAmbient();
      else if (ambient.enabled.value) {
        if (ambientGraph) updateAmbientGain();
        else void prepareAudio(event);
      }
      return ambient.persist();
    }
    function setAnimations(value) {
      if (typeof value !== 'boolean') return false;
      animations.value = value; return persist();
    }
    const panels = ['editor', 'preview', 'console', 'stages', 'notes'];
    function setPanelVisible(panel, visible) {
      if (!panels.includes(panel) || typeof visible !== 'boolean') return false;
      hiddenPanels.value = visible ? hiddenPanels.value.filter(p => p !== panel) : [...new Set([...hiddenPanels.value, panel])];
      return true;
    }
    function resetLayout() { hiddenPanels.value = []; }
    function diagnostics() { return { contextState: context?.state || 'not-created', scheduledCues, activeTones: tones.size,
      ambientPlaying: !!ambientGraph, ambientSources: ambientGraph?.sources.length || 0 }; }
    function dispose() {
      silence(); disposed = true;
      if (context) { context.onstatechange = null; try { void context.close(); } catch (_) {} }
      audioStatus.value = 'closed';
      ambientStatus.value = 'closed';
    }
    return Object.freeze({ muted, volume, animations, storageStatus, recoveryKey, warnings, hiddenPanels,
      audioStatus, snapshot, setMuted, setVolume, setAnimations, prepareAudio, playCue, silence,
      ambientEnabled: ambient.enabled, ambientVolume: ambient.volume, ambientStatus,
      ambientStorageStatus: ambient.status, ambientRecoveryKey: ambient.recoveryKey, ambientSnapshot: ambient.snapshot,
      setAmbientEnabled, setAmbientVolume,
      setPanelVisible, resetLayout, diagnostics, dispose });
  }

  // This is source navigation, not JavaScript/CSS analysis. Raw text elements are
  // skipped with HTML's closing-tag boundary; a string containing <style> inside
  // an actual script cannot become an editable CSS block.
  function readTag(source, start) {
    const matcher = /<(\/?)([A-Za-z][\w:-]*)/y;
    matcher.lastIndex = start;
    const match = matcher.exec(source);
    if (!match) return null;
    let quote = '', index = start + match[0].length;
    for (; index < source.length; index++) {
      const ch = source[index];
      if (quote) { if (ch === quote) quote = ''; }
      else if (ch === '"' || ch === "'") quote = ch;
      else if (ch === '>') return { start, end: index + 1, name: match[2].toLowerCase(), closing: !!match[1], text: source.slice(start, index + 1), nameEnd: start + match[0].length };
    }
    return { start, end: source.length, name: match[2].toLowerCase(), closing: !!match[1], incomplete: true, text: source.slice(start), nameEnd: start + match[0].length };
  }
  function attributes(tag) {
    const attrs = Object.create(null);
    const text = tag.text.slice(tag.nameEnd - tag.start, -1);
    const token = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    let match;
    while ((match = token.exec(text))) {
      const key = match[1].toLowerCase();
      if (!own(attrs, key)) attrs[key] = match[2] ?? match[3] ?? match[4] ?? '';
    }
    return attrs;
  }
  function closeRaw(source, tag, from, lowerSource) {
    const lower = lowerSource || source.toLowerCase();
    const needle = '</' + tag;
    let cursor = from;
    while ((cursor = lower.indexOf(needle, cursor)) >= 0) {
      const boundary = lower[cursor + needle.length];
      if (boundary && !/[\s/>]/.test(boundary)) { cursor += needle.length; continue; }
      const closing = readTag(source, cursor);
      if (closing && closing.closing && closing.name === tag && !closing.incomplete) return closing;
      cursor += needle.length;
    }
    return null;
  }
  function scanBlocks(source) {
    if (typeof source !== 'string') throw new TypeError('Source must be a string');
    const blocks = [];
    const lowerSource = source.toLowerCase();
    const raw = new Set(['script', 'style', 'textarea', 'title', 'xmp', 'iframe', 'noembed', 'noframes']);
    let cursor = 0;
    while (cursor < source.length) {
      const start = source.indexOf('<', cursor);
      if (start < 0) break;
      if (source.startsWith('<!--', start)) {
        const end = source.indexOf('-->', start + 4); cursor = end < 0 ? source.length : end + 3; continue;
      }
      if (source.startsWith('<![CDATA[', start)) {
        const end = source.indexOf(']]>', start + 9); cursor = end < 0 ? source.length : end + 3; continue;
      }
      if (/^<!|^<\?/.test(source.slice(start, start + 2))) {
        let end = start + 2, quote = '';
        for (; end < source.length; end++) {
          const ch = source[end];
          if (quote) { if (ch === quote) quote = ''; }
          else if (ch === '\"' || ch === "'") quote = ch;
          else if (ch === '>') break;
        }
        cursor = end >= source.length ? source.length : end + 1; continue;
      }
      const tag = readTag(source, start);
      if (!tag) { cursor = start + 1; continue; }
      cursor = tag.end;
      if (tag.closing) continue;
      if (tag.name === 'plaintext') break;
      if (!raw.has(tag.name)) continue;
      const closing = tag.incomplete ? null : closeRaw(source, tag.name, tag.end, lowerSource);
      if (tag.name === 'script' || tag.name === 'style') {
        blocks.push({ kind: tag.name, start: tag.end, end: closing?.start ?? source.length, openStart: tag.start,
          closeEnd: closing?.end ?? source.length, code: source.slice(tag.end, closing?.start ?? source.length),
          attributes: attributes(tag), complete: !tag.incomplete && !!closing });
      }
      cursor = closing ? closing.end : source.length;
    }
    return blocks;
  }
  function inspectBlocks(source, kind) {
    if (typeof source !== 'string') throw new TypeError('Source must be a string');
    if (kind === 'source' || kind === 'html') return { kind: 'source', language: 'html', code: source, editable: true, start: 0, end: source.length, reason: '' };
    const name = kind === 'css' || kind === 'style' ? 'style' : kind === 'js' || kind === 'javascript' || kind === 'script' ? 'script' : null;
    if (!name) return { kind, code: '', editable: false, reason: 'هذا العرض غير مدعوم.' };
    const blocks = scanBlocks(source).filter(b => b.kind === name);
    const language = name === 'style' ? 'css' : 'javascript';
    if (!blocks.length) return { kind: name, language, code: '', editable: false, count: 0, reason: name === 'style' ? 'لا توجد كتلة style داخلية؛ عدّل المصدر الكامل لإضافتها.' : 'لا توجد كتلة script داخلية؛ عدّل المصدر الكامل لإضافتها.' };
    if (blocks.length !== 1) return { kind: name, language, code: blocks.map(b => b.code).join('\n\n'), editable: false, count: blocks.length, reason: 'توجد عدة كتل؛ استخدم المصدر الكامل لتحريرها دون دمجها أو تغيير ترتيبها.' };
    const block = blocks[0], attrs = block.attributes;
    let reason = '';
    if (!block.complete) reason = 'الكتلة غير مكتملة؛ استخدم المصدر الكامل لإصلاح الوسوم دون إكمال تلقائي.';
    else if (own(attrs, 'src')) reason = 'هذه الكتلة تشير إلى ملف خارجي؛ لا نغيّر ملفًا غير مرفق.';
    else if (name === 'style' && attrs.type && attrs.type.toLowerCase() !== 'text/css') reason = 'هذه الكتلة لا تعلن CSS عاديًا؛ حرّرها من المصدر الكامل.';
    else if (name === 'style' && attrs.lang && attrs.lang.toLowerCase() !== 'css') reason = 'لغة CSS المرفقة تحتاج محولًا غير متاح؛ استخدم CSS عاديًا ضمن نطاق المشغّل.';
    else if (name === 'script' && attrs.lang && !['js', 'javascript'].includes(attrs.lang.toLowerCase())) reason = 'المشغّل يدعم JavaScript؛ لا يوجد مترجم TypeScript أو JSX هنا.';
    else if (name === 'script' && attrs.type && !['module', 'text/javascript', 'application/javascript', 'application/ecmascript', 'text/ecmascript'].includes(attrs.type.toLowerCase())) reason = 'هذه كتلة بيانات أو لغة غير JavaScript؛ حرّرها من المصدر الكامل.';
    return { kind: name, language, code: block.code, editable: !reason, count: 1, start: block.start, end: block.end, reason };
  }
  function updateBlock(source, kind, replacement, expectedCode) {
    if (typeof replacement !== 'string') return { ok: false, source, reason: 'Replacement must be text' };
    const view = inspectBlocks(source, kind);
    if (!view.editable) return { ok: false, source, reason: view.reason };
    if (typeof expectedCode === 'string' && view.code !== expectedCode) return { ok: false, source, reason: 'تغير المصدر قبل التحرير؛ لم تُستبدل النسخة الأحدث.' };
    return { ok: true, source: source.slice(0, view.start) + replacement + source.slice(view.end), changed: view.code !== replacement, reason: '' };
  }
  function actionForShortcut(event) {
    if (!event || event.isComposing || event.altKey) return null;
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') return 'run';
    if (!event.ctrlKey && !event.metaKey && event.key === 'F8') return 'run';
    if (!event.ctrlKey && !event.metaKey && event.key === 'F9') return 'stop';
    return null;
  }
  const api = Object.freeze({ PREFERENCE_KEY, DEFAULTS, AMBIENT_PREFERENCE_KEY, AMBIENT_DEFAULTS, parsePreferences, parseAmbientPreferences,
    createController, scanBlocks, inspectBlocks, updateBlock, actionForShortcut });
  root.VueLexiconSimulatorBeta = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
