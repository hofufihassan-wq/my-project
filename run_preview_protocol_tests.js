const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('preview-runner.js', 'utf8'), sandbox);
const runner = sandbox.window.VueLexiconRunner;
const frame = {}, otherWindow = {};
const session = { runId: 'run-a', lessonId: 'JS-101' };
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('PASS:', name); }
const message = (type, payload, extra = {}) => ({ source: frame, data: {
  source: 'VUELEXICON_SANDBOX', runId: session.runId, lessonId: session.lessonId, type, payload, ...extra
} });
const validate = event => runner.validateMessage(event, frame, session);
const snapshot = { bodyText: 'a', cardText: '', appViewText: '', cardsContainerCount: 0, cardElementsCount: 0 };

test('valid ready/log/error/snapshot messages accepted', () => {
  for (const [type, payload] of [['PREVIEW_READY', {}], ['CONSOLE_LOG', { level: 'log', msg: 'ok' }],
    ['EXECUTION_ERROR', { msg: 'bad', lineno: 10 }], ['DOM_SNAPSHOT', snapshot]]) {
    assert.equal(validate(message(type, payload)).type, type);
  }
});
test('null origin alone never grants sender identity', () => {
  assert.equal(validate({ ...message('PREVIEW_READY', {}), source: otherWindow, origin: 'null' }), null);
  assert.ok(validate({ ...message('PREVIEW_READY', {}), origin: 'null' }));
});
test('old run/foreign lesson/source ignored', () => {
  for (const change of [{ runId: 'run-old' }, { lessonId: 'HTML-101' }, { source: 'OTHER' }]) {
    assert.equal(validate(message('PREVIEW_READY', {}, change)), null);
  }
});
test('non-record ready payloads are rejected', () => {
  for (const payload of [new Date(), /x/, new Map(), new Set()]) assert.equal(validate(message('PREVIEW_READY', payload)), null);
});
test('bootstrap precedes all user scripts without matching literal head strings', () => {
  for (const code of [
    '<script>throw new Error("early")</script><head></head>',
    '<!doctype html><script>const x="<head>";</script>'
  ]) {
    const output = runner.buildDocument(code, session);
    const firstScript = /<script>([\s\S]*?)<\/script>/.exec(output)[1];
    assert.match(firstScript, /function childBootstrap/);
    assert.ok(output.includes(code.replace(/^<!doctype html>/, '')));
  }
});
test('stopped/missing frame ignores every message', () => {
  assert.equal(runner.validateMessage(message('PREVIEW_READY', {}), frame, null), null);
  assert.equal(runner.validateMessage(message('PREVIEW_READY', {}), null, session), null);
});
test('null/arrays/scalars/unknown or missing envelope fields rejected', () => {
  for (const data of [null, [], 'message', {}, { source: 'VUELEXICON_SANDBOX' }]) assert.equal(validate({ source: frame, data }), null);
  assert.equal(validate(message('PREVIEW_READY', {}, { unexpected: 1 })), null);
  assert.equal(validate(message('EXECUTION_STATUS', { status: 'completed' })), null);
});
test('malformed payloads rejected without throwing', () => {
  for (const type of ['PREVIEW_READY', 'CONSOLE_LOG', 'EXECUTION_ERROR', 'DOM_SNAPSHOT']) {
    for (const payload of [null, [], 'bad', 1, { unexpected: true }]) assert.equal(validate(message(type, payload)), null);
  }
  assert.equal(validate(message('CONSOLE_LOG', { level: 'fatal', msg: 'bad' })), null);
  assert.equal(validate(message('CONSOLE_LOG', { level: 'log', msg: {} })), null);
  assert.equal(validate(message('EXECUTION_ERROR', { msg: 'bad', lineno: -1 })), null);
  assert.equal(validate(message('EXECUTION_ERROR', { msg: 'bad', lineno: 1.5 })), null);
  assert.equal(validate(message('DOM_SNAPSHOT', { ...snapshot, cardElementsCount: Infinity })), null);
});
test('oversized text/snapshots/counts rejected at protocol boundary', () => {
  assert.equal(validate(message('CONSOLE_LOG', { level: 'log', msg: 'x'.repeat(4001) })), null);
  assert.equal(validate(message('EXECUTION_ERROR', { msg: 'x'.repeat(4001), lineno: 0 })), null);
  assert.equal(validate(message('DOM_SNAPSHOT', { ...snapshot, bodyText: 'x'.repeat(16001) })), null);
  assert.equal(validate(message('DOM_SNAPSHOT', { ...snapshot, cardElementsCount: 10001 })), null);
});
test('payload is copied rather than retained', () => {
  const p = { level: 'info', msg: 'original' };
  const accepted = validate(message('CONSOLE_LOG', p));
  p.msg = 'mutated'; assert.equal(accepted.payload.msg, 'original');
});
test('malicious getter is ignored without exception', () => {
  const event = { source: frame, get data() { throw new Error('foreign'); } };
  assert.equal(validate(event), null);
});
test('instrumented child console accepts circular, BigInt, deep and throwing objects', () => {
  const output = [], listeners = {};
  const doc = runner.buildDocument('<!doctype html><html><head></head><body></body></html>', session);
  const script = /<script>([\s\S]*?)<\/script>/.exec(doc)[1];
  const child = {
    parent: { postMessage: data => output.push(data) },
    console: Object.fromEntries(['log', 'info', 'warn', 'error', 'debug'].map(k => [k, () => {}])),
    addEventListener: (name, fn) => { listeners[name] = fn; }
  };
  vm.createContext(child); vm.runInContext(script, child);
  vm.runInContext(`
    const circular={name:'test'}; circular.self=circular;
    const deep={a:{b:{c:{d:1}}}};
    const unreadable=new Proxy({}, {ownKeys(){throw new Error('getter')}});
    console.log(circular, 100n, deep, unreadable);
    console.warn('x'.repeat(20000));
    for(let i=0;i<1100;i++) console.debug(i);
  `, child);
  assert.match(output[0].payload.msg, /Circular/);
  assert.match(output[0].payload.msg, /100n/);
  assert.match(output[0].payload.msg, /\[Object\]/);
  assert.match(output[0].payload.msg, /Unreadable/);
  assert.ok(output.every(x => x.payload.msg.length <= 4000));
  assert.ok(output.length <= 1000);
  assert.ok(output.every(x => x.runId === session.runId && x.lessonId === session.lessonId));
});
test('child error reporter survives circular unhandled rejection', () => {
  const output = [], listeners = {};
  const doc = runner.buildDocument('<html><head></head></html>', session);
  const script = /<script>([\s\S]*?)<\/script>/.exec(doc)[1];
  const child = { parent: { postMessage: m => output.push(m) }, console: {}, addEventListener: (n, f) => listeners[n] = f };
  vm.createContext(child); vm.runInContext(script, child);
  const reason = {}; reason.self = reason;
  listeners.unhandledrejection({ reason });
  assert.equal(output[0].type, 'EXECUTION_ERROR');
  assert.match(output[0].payload.msg, /Circular/);
});
test('local Vue resolver changes only actual known script src attributes', () => {
  const cdn = 'https://unpkg.com/vue@3/dist/vue.global.prod.js';
  const local = 'http://localhost/nested/assets/vendor/vue-3.4.21.global.prod.js';
  for (const src of [`src="${cdn}"`, `src='${cdn}'`, `SRC=${cdn}`]) {
    const code = `<script ${src}></script><p>unchanged</p>`;
    const html = runner.buildDocument(code, session, {vueRuntimeUrl:local});
    assert.ok(html.includes(local));
    assert.ok(!html.includes(cdn));
    assert.ok(html.includes('<p>unchanged</p>'));
  }
});
test('local dependency resolution preserves scripts, comments and quoted content', () => {
  const cdn = 'https://unpkg.com/vue@3/dist/vue.global.prod.js';
  const code = `<!-- <script src="${cdn}"></script> --><div data-example='<script src="${cdn}"></script>'></div><textarea><script src="${cdn}"></script></textarea><script>const example = '<script src="${cdn}">';</script><script data-example=' src="${cdn}"'></script>`;
  const html = runner.buildDocument(code, session, {vueRuntimeUrl:'http://localhost/local-vue.js'});
  assert.ok(html.endsWith(code));
});
test('dictionary selection respects the active tab and its declared language', () => {
  const term = {category:'css',vueSfcCode:'<template>Vue</template>',vanillaCode:'p{color:red}'};
  assert.equal(runner.selectDictionaryExample(term,'vue').type,'vue');
  assert.equal(runner.selectDictionaryExample(term,'vanilla').code,term.vanillaCode);
  assert.equal(runner.selectDictionaryExample(term,'vanilla').type,'css');
  assert.equal(runner.selectDictionaryExample({...term,category:'html'},'vanilla').type,'html');
  assert.equal(runner.selectDictionaryExample({...term,category:'js'},'vanilla').type,'javascript');
  assert.equal(runner.selectDictionaryExample({...term,vanillaCode:''},'vanilla').code,'');
  assert.equal(runner.selectDictionaryExample(null,'vue'),null);
});
test('dictionary source is JSON encoded instead of interpolated into a script or markup', () => {
  const code = `console.log('</script><script>throw new Error("injected")</script>')`;
  const html = runner.buildDictionaryDocument({code,type:'javascript'},session,{
    dictionaryAdapterUrl:'https://example.test/nested/dictionary-preview.js',
    vueRuntimeUrl:'https://example.test/nested/vue.js',vueCompilerUrl:'https://example.test/nested/compiler.js'
  });
  assert(!html.includes(code));
  assert(html.includes('\\u003c/script>'));
  assert(html.includes('"deferReady":true'));
  assert(!html.includes('allow-same-origin'));
});
console.log(`\nPreview protocol and child console: ${passed}/${passed} passed.`);
