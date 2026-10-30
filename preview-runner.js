/* Phase 0A: the protocol validates a session, never trusts origin === "null". */
(function (root) {
  'use strict';
  const MAX_TEXT = 4000;
  const isRecord = value => value !== null && typeof value === 'object' &&
    Object.prototype.toString.call(value) === '[object Object]';
  const exactKeys = (value, keys) => isRecord(value) && Object.keys(value).every(key => keys.includes(key));

  // Runs only in the child iframe. No eval/Function is used in the parent.
  function childBootstrap(session, options = {}) {
    const stringify = value => {
      const seen = new WeakSet();
      let budget = 80;
      function visit(item, depth) {
        if (--budget < 0) return '…';
        if (typeof item === 'string') return item.slice(0, 4000);
        if (typeof item === 'bigint') return String(item) + 'n';
        if (item === null || typeof item !== 'object') return String(item);
        if (seen.has(item)) return '[Circular]';
        if (depth >= 3) return '[Object]';
        seen.add(item);
        try {
          const keys = Object.keys(item).slice(0, 20);
          return (Array.isArray(item) ? '[' : '{') + keys.map(key => {
            try { return key + ': ' + visit(item[key], depth + 1); }
            catch (_) { return key + ': [Unreadable]'; }
          }).join(', ') + (Array.isArray(item) ? ']' : '}');
        } catch (_) { return '[Unreadable]'; }
      }
      try { return visit(value, 0).slice(0, 4000); }
      catch (_) { return '[Unprintable]'; }
    };
    let logCount = 0;
    function send(type, payload) {
      try { parent.postMessage({ source: 'VUELEXICON_SANDBOX', runId: session.runId,
        lessonId: session.lessonId, type, payload }, '*'); } catch (_) {}
    }
    for (const level of ['log', 'info', 'warn', 'error', 'debug']) {
      const original = console[level];
      console[level] = function (...args) {
        try {
          if (logCount++ < 1000) send('CONSOLE_LOG', { level,
            msg: args.slice(0, 20).map(stringify).join(' ').slice(0, 4000) });
        } catch (_) {}
        try { original.apply(console, args); } catch (_) {}
      };
    }
    let failed = false;
    let failureText = '';
    function showFailure() {
      if (!options.dictionary || !document.body || !failureText) return;
      let note = document.getElementById('vuelexicon-preview-error');
      if (!note) {
        note = document.createElement('p');
        note.id = 'vuelexicon-preview-error';
        note.setAttribute('role', 'alert');
        note.setAttribute('dir', 'rtl');
        note.style.cssText = 'font:14px/1.8 system-ui;color:#fda4af;white-space:pre-wrap;padding:16px';
        document.body.prepend(note);
      }
      note.textContent = 'تعذر تشغيل المثال: ' + failureText;
    }
    function fail(message, lineno = 0) {
      failed = true;
      const msg = stringify(message);
      send('EXECUTION_ERROR', { msg, lineno });
      failureText = msg;
      showFailure();
    }
    addEventListener('error', event => {
      if (!event.message && !options.dictionary) return;
      fail(event.message || 'تعذر تحميل مورد يحتاجه المثال؛ تحقق من توفر ملفاته محليًا.',
        Number.isInteger(event.lineno) ? event.lineno : 0);
    }, options.dictionary ? true : false);
    addEventListener('unhandledrejection', event => {
      fail(event.reason);
    });
    function snapshot() {
      try {
        const text = id => (document.getElementById(id)?.innerText || '').slice(0, 16000);
        send('DOM_SNAPSHOT', {
          bodyText: (document.body?.innerText || '').slice(0, 16000),
          cardText: text('card'), appViewText: text('app-view'), outputText: text('output'),
          cardsContainerCount: Math.min(document.getElementById('cards-container')?.children.length || 0, 10000),
          cardElementsCount: Math.min(document.querySelectorAll('.card').length, 10000)
        });
      } catch (_) {}
    }
    let observing = false;
    function ready() {
      if (failed || observing) return;
      observing = true;
      snapshot();
      send('PREVIEW_READY', {});
      // Observe async DOM updates; readiness never claims all timers/events completed.
      let timer;
      new MutationObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(snapshot, 80);
      }).observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true });
    }
    if (options.dictionary) {
      // This object exists only in the opaque child, never in the app context.
      window.VueLexiconPreviewHost = Object.freeze({ ready, fail });
      addEventListener('DOMContentLoaded', showFailure, { once: true });
    }
    if (!options.deferReady) addEventListener('DOMContentLoaded', ready, { once: true });
  }

  function buildDocument(code, session, assets = {}) {
    if (typeof code !== 'string') throw new TypeError('Code must be text');
    if (typeof assets.vueRuntimeUrl === 'string') {
      // Match real script blocks, skipping comments and raw-text elements. Do not
      // rewrite a CDN URL merely mentioned inside user JS, CSS, or a textarea.
      code = code.replace(/<!--[\s\S]*?(?:-->|$)|<(script|style|textarea|title)\b(?:"[^"]*"|'[^']*'|[^'">])*>(?:[\s\S]*?<\/\1\s*>|[\s\S]*$)|<\/?[a-z][a-z0-9:-]*\b(?:"[^"]*"|'[^']*'|[^'">])*>/gi, block => {
        if (!/^<script\b/i.test(block)) return block;
        const opening = /^<script\b(?:"[^"]*"|'[^']*'|[^'">])*>/i.exec(block)[0];
        const localized = opening.replace(/(\s+)([\w:-]+)(\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g,
          (attribute, space, name, equals, double, single, bare) => {
            if (name.toLowerCase() !== 'src' || (double ?? single ?? bare) !== 'https://unpkg.com/vue@3/dist/vue.global.prod.js') return attribute;
            const quote = single !== undefined ? "'" : '"';
            const url = assets.vueRuntimeUrl.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            return space + name + equals + quote + url + quote;
          });
        return localized + block.slice(opening.length);
      });
    }
    const data = JSON.stringify({ runId: session.runId, lessonId: session.lessonId }).replace(/</g, '\\u003c');
    const interceptor = '<script>(' + childBootstrap.toString() + ')(' + data + ',' +
      JSON.stringify({ dictionary: assets.dictionary === true }) + ');<\/script>';
    // Prefix before ALL user scripts; never match a literal <head> inside JS text.
    const doctype = /^\s*<!doctype[^>]*>/i;
    if (doctype.test(code)) return code.replace(doctype, match => match + interceptor);
    return interceptor + code;
  }

  // Selection is data only. Compilation and execution belong to the child frame.
  function selectDictionaryExample(term, format) {
    if (!term || typeof term !== 'object') return null;
    if (format !== 'vanilla' && typeof term.vueSfcCode === 'string' && term.vueSfcCode.trim()) {
      return { code: term.vueSfcCode, type: 'vue', legacyClosers: true };
    }
    const code = typeof term.vanillaCode === 'string' ? term.vanillaCode : '';
    const type = term.category === 'html' ? 'html' : term.category === 'css' ? 'css' : 'javascript';
    return { code, type, legacyClosers: false };
  }

  function buildDictionaryDocument(example, session, assets) {
    const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
    const attr = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const style = '<style>body{font-family:system-ui,sans-serif;background:#070d1e;color:#f8fafc;padding:24px;min-height:100vh;margin:0}</style>';
    const css = typeof assets.previewCssUrl === 'string' ? '<link rel="stylesheet" href="' + attr(assets.previewCssUrl) + '">' : '';
    if (example.type === 'html' && example.code.trim()) {
      // Preserve complete HTML documents and their native script semantics.
      let code = example.code;
      if (!/^\s*<!doctype|^\s*<html\b/i.test(code)) code = '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">' + css + style + '</head><body>' + code + '</body></html>';
      return buildDocument(code, session, { ...assets, dictionary: true });
    }
    const interceptor = '<script>(' + childBootstrap.toString() + ')(' +
      json({ runId: session.runId, lessonId: session.lessonId }) + ',{"dictionary":true,"deferReady":true});<\/script>';
    const script = url => typeof url === 'string' ? '<script src="' + attr(url) + '"><\/script>' : '';
    // Classic local scripts work in an opaque sandbox without CORS or same-origin.
    return '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">' + interceptor + css + style +
      '</head><body><div id="vuelexicon-example"></div>' +
      (example.type === 'vue' || example.type === 'javascript' ? script(assets.vueRuntimeUrl) + script(assets.vueCompilerUrl) : '') +
      script(assets.dictionaryAdapterUrl) + '<script>if(window.VueLexiconDictionaryPreview){window.VueLexiconDictionaryPreview.run(' + json(example) +
      ')}else{window.VueLexiconPreviewHost.fail("تعذر تحميل مشغل الأمثلة المحلي. تحقق من ملفات النسخة.")}<\/script></body></html>';
  }

  function validateMessage(event, frameWindow, session) {
    try {
      if (!session || !frameWindow || event.source !== frameWindow) return null;
      const data = event.data;
      if (!exactKeys(data, ['source', 'runId', 'lessonId', 'type', 'payload']) ||
          data.source !== 'VUELEXICON_SANDBOX' || data.runId !== session.runId ||
          data.lessonId !== session.lessonId) return null;
      const p = data.payload;
      if (data.type === 'PREVIEW_READY') {
        if (!exactKeys(p, []) ) return null;
      } else if (data.type === 'CONSOLE_LOG') {
        if (!exactKeys(p, ['level', 'msg']) || !['log', 'info', 'warn', 'error', 'debug'].includes(p.level) ||
            typeof p.msg !== 'string' || p.msg.length > MAX_TEXT) return null;
      } else if (data.type === 'EXECUTION_ERROR') {
        if (!exactKeys(p, ['msg', 'lineno']) || typeof p.msg !== 'string' || p.msg.length > MAX_TEXT ||
            !Number.isInteger(p.lineno) || p.lineno < 0 || p.lineno > 10000000) return null;
      } else if (data.type === 'DOM_SNAPSHOT') {
        if (!exactKeys(p, ['bodyText', 'cardText', 'appViewText', 'outputText', 'cardsContainerCount', 'cardElementsCount'])) return null;
        for (const key of ['bodyText', 'cardText', 'appViewText']) {
          if (typeof p[key] !== 'string' || p[key].length > 16000) return null;
        }
        if (Object.hasOwn(p, 'outputText') && (typeof p.outputText !== 'string' || p.outputText.length > 16000)) return null;
        for (const key of ['cardsContainerCount', 'cardElementsCount']) {
          if (!Number.isInteger(p[key]) || p[key] < 0 || p[key] > 10000) return null;
        }
      } else return null;
      // Copy only the schema above; no foreign object is retained in reactive state.
      return { type: data.type, payload: { ...p } };
    } catch (_) { return null; }
  }
  root.VueLexiconRunner = Object.freeze({ buildDocument, buildDictionaryDocument, selectDictionaryExample, validateMessage });
})(window);
