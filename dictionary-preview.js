/* Loaded only inside sandbox="allow-scripts". No user code runs in the parent. */
(function (root) {
  'use strict';

  function problem(message) { throw new Error(message); }
  const details = error => String(error?.message || error).slice(0, 2400);
  function checkErrors(errors, kind) {
    if (errors?.length) problem('تعذر تحويل ' + kind + ': ' + details(errors[0]));
  }
  function compiler() {
    const value = root.VueLexiconCompiler;
    if (!value || value.version !== '3.4.21' || root.Vue?.version !== '3.4.21') {
      problem('مترجم Vue أو مكتبة Vue المحلية غير متوفرين بالإصدار 3.4.21. تحقق من اكتمال ملفات النسخة.');
    }
    return value;
  }

  function parseJS(C, code) {
    try { return C.babelParse(code, { sourceType: 'module' }); }
    catch (error) { problem('صيغة JavaScript غير صالحة. لا يدعم هذا المشغل TypeScript أو JSX: ' + details(error)); }
  }

  // Walk the official parser's AST, not regular expressions over JavaScript.
  function walk(node, visit, functionDepth = 0) {
    if (!node || typeof node.type !== 'string') return;
    visit(node, functionDepth);
    const depth = functionDepth + (/Function|Method/.test(node.type) ? 1 : 0);
    for (const [key, value] of Object.entries(node)) {
      if (key === 'loc' || key === 'comments' || key === 'tokens') continue;
      if (Array.isArray(value)) { for (const child of value) walk(child, visit, depth); }
      else if (value && typeof value === 'object') walk(value, visit, depth);
    }
  }

  function validateJS(C, code, sfc) {
    const ast = parseJS(C, code);
    walk(ast, (node, depth) => {
      if (node.type === 'ImportExpression' || (node.type === 'CallExpression' && node.callee.type === 'Import') ||
          (node.type === 'MetaProperty' && node.meta.name === 'import')) {
        problem('الاستيراد الديناميكي وimport.meta غير مدعومين في معاينة مكوّن مستقل.');
      }
      if (node.type === 'ImportDeclaration') {
        if (node.source.value !== 'vue') problem('المكتبة أو الملف «' + node.source.value.slice(0, 200) + '» غير متوفر محليًا. الاستيراد المدعوم هنا من vue فقط.');
        for (const specifier of node.specifiers) {
          if (specifier.type === 'ImportDefaultSpecifier') problem('Vue 3 لا يوفر default import. استخدم import { ref } from "vue" أو import * as Vue from "vue".');
          if (specifier.type === 'ImportSpecifier' && !Object.hasOwn(root.Vue, specifier.imported.name ?? specifier.imported.value)) {
            problem('هذا التصدير غير متوفر في Vue 3.4.21: ' + (specifier.imported.name ?? specifier.imported.value));
          }
        }
      }
      if ((node.type === 'ExportNamedDeclaration' || node.type === 'ExportAllDeclaration') && node.source) {
        problem('إعادة التصدير من ملف أو مكتبة أخرى تحتاج مشروعًا متعدد الملفات، وهو غير مدعوم هنا.');
      }
      if (sfc && ['ObjectMethod', 'ObjectProperty'].includes(node.type) &&
          (node.key?.name ?? node.key?.value) === 'setup' && (node.async || node.value?.async)) {
        problem('async setup يحتاج إدارة Suspense؛ غير مدعوم هنا. استخدم setup متزامنًا وأحداثًا async عند الحاجة.');
      }
      if (sfc && depth === 0 && (node.type === 'AwaitExpression' || (node.type === 'ForOfStatement' && node.await))) {
        problem('await في المستوى الأعلى وasync setup يحتاجان إدارة Suspense؛ غير مدعومين في هذا المشغل. الدوال والأحداث async مدعومة.');
      }
    });
    return ast;
  }

  function normalizeLegacyClosers(C, source, enabled) {
    if (!enabled) return source;
    // Some original dictionary strings store a backslash in the closing tag.
    // Only repair a real unclosed SFC script, after a complete parsed JS block.
    // A candidate inside a string/comment with an unfinished prefix is rejected.
    for (let pass = 0; pass < 2; pass++) {
      const parsed = C.parse(source, { filename: 'DictionaryExample.vue' });
      if (!parsed.errors.length) break;
      let repaired = false;
      for (const block of [parsed.descriptor.script, parsed.descriptor.scriptSetup]) {
        if (!block || block.content || !Number.isInteger(block.loc.start.offset)) continue;
        const start = block.loc.start.offset;
        const candidates = /^[\t ]*<\\\/script>[\t ]*$/gm;
        candidates.lastIndex = start;
        let match;
        while ((match = candidates.exec(source))) {
          try {
            C.babelParse(source.slice(start, match.index), { sourceType: 'module',
              plugins: block.lang === 'ts' ? ['typescript'] : [] });
          } catch (_) { continue; }
          source = source.slice(0, match.index) + match[0].replace('<\\/script>', '</script>') + source.slice(match.index + match[0].length);
          repaired = true;
          break;
        }
        if (repaired) break;
      }
      if (!repaired) break;
    }
    return source;
  }

  function compileSfc(C, example) {
    const source = normalizeLegacyClosers(C, example.code, example.legacyClosers === true);
    const parsed = C.parse(source, { filename: 'DictionaryExample.vue' });
    checkErrors(parsed.errors, 'مكوّن Vue');
    const d = parsed.descriptor;
    if (!d.template) problem('مثال Vue يحتاج كتلة <template> مستقلة. لا يكفي لصق جزء من مشروع متعدد الملفات.');
    if (d.customBlocks.length) problem('كتل SFC المخصصة غير مدعومة في معاينة مكوّن مستقل.');
    for (const block of [d.template, d.script, d.scriptSetup, ...d.styles].filter(Boolean)) {
      if (Object.hasOwn(block.attrs, 'src')) problem('كتل src الخارجية تحتاج ملفات غير مرفقة؛ استخدم مكوّنًا مستقلًا.');
      if (block.lang && block.lang !== (block.type === 'script' ? 'js' : block.type === 'style' ? 'css' : 'html')) {
        problem('لغة ' + block.lang + ' غير مدعومة هنا. المدعوم JavaScript وHTML وCSS؛ TypeScript وJSX وSass تحتاج أدوات إضافية.');
      }
      if (Object.hasOwn(block.attrs, 'module')) problem('CSS Modules تحتاج ربطًا إضافيًا؛ المدعوم style وstyle scoped فقط.');
      if (block.type === 'script') validateJS(C, block.content, true);
    }
    const id = 'data-v-lexicon-preview'; // Each run lives in a fresh iframe.
    const script = d.script || d.scriptSetup ? C.compileScript(d, { id }) : { content: 'export default {}', bindings: {} };
    const template = C.compileTemplate({ source: d.template.content, filename: 'DictionaryExample.vue', id,
      scoped: d.styles.some(style => style.scoped), compilerOptions: { bindingMetadata: script.bindings } });
    checkErrors(template.errors, 'قالب Vue');
    const styles = d.styles.map(style => {
      const result = C.compileStyle({ source: style.content, filename: 'DictionaryExample.vue', id, scoped: !!style.scoped });
      checkErrors(result.errors, 'CSS');
      result.rawResult.root.walkAtRules(rule => {
        if (rule.name.toLowerCase() === 'import') problem('استيراد CSS خارجي غير مدعوم؛ يجب توفير التنسيق داخل المثال.');
      });
      return result.code;
    });
    // Validate generated modules too, before any example code is evaluated.
    validateJS(C, script.content, false);
    validateJS(C, template.code, false);
    return { script: script.content, template: template.code, styles, scoped: d.styles.some(style => style.scoped), id };
  }

  function vueBridgeSource() {
    // Official Vue exports retain native ES module semantics. Strict resolvers
    // turn missing Nuxt/custom dependencies into a visible, honest failure.
    const keys = Object.keys(root.Vue).filter(key => /^[A-Za-z_$][\w$]*$/.test(key));
    return 'const v=globalThis.Vue;\n' + keys.map(key => {
      if (key === 'resolveComponent') return `export const resolveComponent=(...args)=>{const c=v.resolveComponent(...args);if(typeof c==='string')throw new Error('المكوّن «'+args[0]+'» غير متوفر. قد يحتاج Nuxt أو مكتبة أو ملفًا آخر.');return c};`;
      if (key === 'resolveDirective') return `export const resolveDirective=(...args)=>{const d=v.resolveDirective(...args);if(!d)throw new Error('التوجيه «'+args[0]+'» غير متوفر في المثال المستقل.');return d};`;
      if (key === 'resolveDynamicComponent') return `export const resolveDynamicComponent=(name)=>{const c=v.resolveDynamicComponent(name);if(typeof c==='string'&&document.createElement(c) instanceof HTMLUnknownElement)throw new Error('المكوّن الديناميكي «'+c+'» غير متوفر.');return c};`;
      return 'export const ' + key + '=v.' + key + ';';
    }).join('\n');
  }

  function linkVue(C, code, bridgeUrl) {
    const ast = parseJS(C, code);
    const replacements = ast.program.body.filter(node => node.type === 'ImportDeclaration').map(node => ({
      start: node.source.start, end: node.source.end, value: JSON.stringify(bridgeUrl)
    }));
    for (const change of replacements.sort((a,b) => b.start - a.start)) {
      code = code.slice(0, change.start) + change.value + code.slice(change.end);
    }
    return code;
  }

  function addStyle(text) {
    const style = document.createElement('style');
    style.textContent = text; // Never interpolate source into HTML/script tags.
    document.head.append(style);
    return style;
  }

  function guardContext(ctx) {
    return new Proxy(ctx, {
      get(target, key) {
        if (typeof key === 'string' && !Reflect.has(target, key)) {
          problem('المتغير «' + key + '» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية.');
        }
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        if (typeof key === 'string' && !Reflect.has(target, key)) problem('المتغير «' + key + '» غير معرّف في المثال.');
        return Reflect.set(target, key, value);
      }
    });
  }

  async function run(example) {
    const host = root.VueLexiconPreviewHost;
    const urls = [];
    const moduleUrl = source => {
      const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
      urls.push(url); return url;
    };
    try {
      if (!example || typeof example.code !== 'string' || !example.code.trim()) problem('لا يحتوي التبويب المختار على كود قابل للمعاينة.');
      const target = document.getElementById('vuelexicon-example');
      if (example.type === 'css') {
        if (/@import\b/i.test(example.code)) problem('استيراد CSS خارجي غير مدعوم؛ يجب توفير التنسيق داخل المثال.');
        target.innerHTML = '<p>معاينة CSS على عناصر تجريبية؛ بعض المحددات تحتاج HTML مطابقًا من مشروعك.</p><div class="preview-sample"><p>عنصر تجريبي</p><button type="button">زر تجريبي</button></div>';
        const style = addStyle(example.code);
        if (!style.sheet?.cssRules.length) problem('لم يتعرف المتصفح على قواعد CSS صالحة في هذا المثال.');
        host.ready();
        return;
      }
      if (!['vue', 'javascript'].includes(example.type)) problem('نوع هذا المثال غير مدعوم.');
      const C = compiler();
      const compiled = example.type === 'vue' ? compileSfc(C, example) : null;
      if (!compiled) validateJS(C, example.code, false);
      const bridge = moduleUrl(vueBridgeSource());
      if (!compiled) {
        target.textContent = 'مثال JavaScript: راقب رسائل Console. قد يحتاج هذا الجزء HTML أو بيانات من مشروعه الأصلي.';
        await import(moduleUrl(linkVue(C, example.code, bridge)));
      } else {
        const [script, template] = await Promise.all([
          import(moduleUrl(linkVue(C, compiled.script, bridge))),
          import(moduleUrl(linkVue(C, compiled.template, bridge)))
        ]);
        if (!script.default || typeof script.default !== 'object') problem('يجب أن يصدر المثال مكوّن Vue صالحًا باستخدام export default أو script setup.');
        const component = script.default;
        if (typeof component.setup === 'function') {
          const setup = component.setup;
          // Vue uses setup.length to decide whether to supply the context.
          // Keep two declared parameters so compiled script setup gets expose.
          component.setup = function (props, context) {
            const result = setup.call(this, props, context);
            if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
              Promise.resolve(result).catch(() => {});
              problem('setup أعاد Promise ويحتاج إدارة Suspense؛ غير مدعوم في المعاينة المستقلة.');
            }
            return result;
          };
        }
        component.render = (ctx, ...args) => template.render(guardContext(ctx), ...args);
        if (compiled.scoped) component.__scopeId = compiled.id;
        for (const style of compiled.styles) addStyle(style);
        const app = root.Vue.createApp(component);
        app.config.errorHandler = error => host.fail('خطأ في مثال Vue: ' + details(error));
        app.mount(target);
        await root.Vue.nextTick();
      }
      host.ready(); // Mounted/loaded, never a claim that timers/events finished.
    } catch (error) {
      host.fail(details(error));
    } finally {
      for (const url of urls) URL.revokeObjectURL(url);
    }
  }
  root.VueLexiconDictionaryPreview = Object.freeze({ run });
})(window);
