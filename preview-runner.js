/* Phase 0A: the protocol validates a session, never trusts origin === "null". */
(function (root) {
  'use strict';
  const MAX_TEXT = 4000;
  const isRecord = value => value !== null && typeof value === 'object' &&
    Object.prototype.toString.call(value) === '[object Object]';
  const exactKeys = (value, keys) => isRecord(value) && Object.keys(value).every(key => keys.includes(key));

  // Runs only in the child iframe. No eval/Function is used in the parent.
  function childBootstrap(session) {
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
    addEventListener('error', event => {
      send('EXECUTION_ERROR', { msg: stringify(event.message || 'Resource error'),
        lineno: Number.isInteger(event.lineno) ? event.lineno : 0 });
    });
    addEventListener('unhandledrejection', event => {
      send('EXECUTION_ERROR', { msg: stringify(event.reason), lineno: 0 });
    });
    function snapshot() {
      try {
        const text = id => (document.getElementById(id)?.innerText || '').slice(0, 16000);
        send('DOM_SNAPSHOT', {
          bodyText: (document.body?.innerText || '').slice(0, 16000),
          cardText: text('card'), appViewText: text('app-view'),
          cardsContainerCount: Math.min(document.getElementById('cards-container')?.children.length || 0, 10000),
          cardElementsCount: Math.min(document.querySelectorAll('.card').length, 10000)
        });
      } catch (_) {}
    }
    addEventListener('DOMContentLoaded', () => {
      send('PREVIEW_READY', {});
      snapshot();
      // Observe async DOM updates; readiness never claims all timers/events completed.
      let timer;
      new MutationObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(snapshot, 80);
      }).observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true });
    }, { once: true });
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
    const interceptor = '<script>(' + childBootstrap.toString() + ')(' + data + ');<\/script>';
    // Prefix before ALL user scripts; never match a literal <head> inside JS text.
    const doctype = /^\s*<!doctype[^>]*>/i;
    if (doctype.test(code)) return code.replace(doctype, match => match + interceptor);
    return interceptor + code;
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
        if (!exactKeys(p, ['bodyText', 'cardText', 'appViewText', 'cardsContainerCount', 'cardElementsCount'])) return null;
        for (const key of ['bodyText', 'cardText', 'appViewText']) {
          if (typeof p[key] !== 'string' || p[key].length > 16000) return null;
        }
        for (const key of ['cardsContainerCount', 'cardElementsCount']) {
          if (!Number.isInteger(p[key]) || p[key] < 0 || p[key] > 10000) return null;
        }
      } else return null;
      // Copy only the schema above; no foreign object is retained in reactive state.
      return { type: data.type, payload: { ...p } };
    } catch (_) { return null; }
  }
  root.VueLexiconRunner = Object.freeze({ buildDocument, validateMessage });
})(window);
