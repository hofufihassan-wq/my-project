/* Phase 0A data tests: real schema and app setup; no browser claims. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
let count = 0;
function test(name, fn) { fn(); count++; console.log('PASS ' + name); }
function start(seed = {}, failWrite = () => false) {
  const storage = { ...seed };
  const mounted = [];
  const downloads = [];
  let lastBlob;
  const w = { addEventListener() {}, removeEventListener() {}, scrollTo() {} };
  const context = {
    window: w, document: { addEventListener() {}, removeEventListener() {}, querySelector() { return null; }, createElement() { const a = { click() { downloads.push({ filename: a.download, text: lastBlob.parts.join('') }); } }; return a; } },
    Blob: class { constructor(parts) { this.parts = parts; } }, URL: { createObjectURL(blob) { lastBlob = blob; return 'blob:test'; }, revokeObjectURL() {} },
    navigator: {}, console, crypto: require('node:crypto').webcrypto,
    setTimeout() { return 1; }, clearTimeout() {}, setInterval() { return 1; }, clearInterval() {},
    FileReader: class { readAsText(file) { this.onload({ target: { result: file._text } }); } },
    localStorage: {
      getItem(key) { return storage[key] ?? null; },
      setItem(key, value) { if (failWrite(key, value)) throw new Error('quota'); storage[key] = value; },
      removeItem(key) { delete storage[key]; },
      key(i) { return Object.keys(storage)[i]; }, get length() { return Object.keys(storage).length; }
    },
    Vue: {
      createApp(opts) { w.scope = opts.setup(); return { mount() { return w.scope; } }; },
      ref(value) { return { value }; }, computed(fn) { return { get value() { return fn(); } }; },
      reactive(value) { return value; }, watch() {}, onMounted(fn) { mounted.push(fn); }, onUnmounted() {}, nextTick(fn) { return fn?.(); }
    }
  };
  vm.createContext(context);
  for (const file of ['lexicon-data.js', 'practice-curriculum.js', 'progress-data.js', 'preview-runner.js', 'app.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  return { storage, scope: w.scope, w, mounted, downloads, import(value) {
    const text = typeof value === 'string' ? value : JSON.stringify(value);
    w.scope.importUserData({ target: { files: [{ size: Buffer.byteLength(text), _text: text }], value: 'input.json' } });
    return w.scope.toastType.value;
  } };
}
const key = 'vuelexicon_practice_progress';
test('Starter unlock/default normalization backs up a valid older record before writing', () => {
  const raw = JSON.stringify({ 'JS-101': { status: 'locked', codeDraft: 'keep the old draft' } });
  const x = start({ [key]: raw });
  assert.equal(x.scope.practiceProgress.value['JS-101'].status, 'unlocked');
  assert.equal(x.scope.practiceProgress.value['JS-101'].codeDraft, 'keep the old draft');
  assert(Object.entries(x.storage).some(([k,v]) => k.startsWith('vuelexicon_recovery_') && v === raw));
});
test('JSON null startup preserves exact raw recovery then initializes safely', () => {
  const x = start({ [key]: 'null' });
  assert.equal(x.scope.practiceProgress.value['JS-101'].status, 'unlocked');
  assert(Object.entries(x.storage).some(([k,v]) => k.startsWith('vuelexicon_recovery_') && v === 'null'));
});
test('Malformed local JSON, array, null item and draft object do not crash startup', () => {
  for (const raw of ['{bad', '[]', '{"JS-101":null}', '{"JS-101":{"status":"passed","codeDraft":{}}}']) {
    const x = start({ [key]: raw });
    assert.equal(x.scope.practiceProgress.value['JS-101'].status, 'unlocked');
    assert(Object.entries(x.storage).some(([k,v]) => k.startsWith('vuelexicon_recovery_') && v === raw));
  }
});
test('Invalid import rejected before changing storage or any existing progress', () => {
  const x = start();
  const id = x.scope.rawLexiconData.value[0].id;
  assert.equal(x.import({ bookmarks: [id], practiceProgress: { 'JS-101': { status: 'passed', codeDraft: 'keep this draft' } } }), 'success');
  for (const bad of [
    'null', '{}', '{"unrelated":"file"}',
    { bookmarks: [], practiceProgress: { 'JS-101': { status: 'passed', codeDraft: {} } } },
    { practiceProgress: null }, { practiceProgress: { 'JS-101': null } },
    { practiceProgress: { 'JS-101': { status: 'passed', codeDraft: [] } } },
    { practiceProgress: { 'JS-101': { status: 'passed', extra: true } } },
    { practiceProgress: { 'JS-101': { status: 'passed', codeDraft: 'x'.repeat(131073) } } },
    { practiceProgress: { 'JS-101': { status: 'passed', updatedAt: 'not a date' } } },
    { practiceProgress: { 'UNKNOWN': { status: 'passed' } } },
    { practiceProgress: { 'JS-101': { status: 'invalid' } } },
    { mastery: null }, { version: '9.0.0', bookmarks: [] },
    { app: 'unrelated', bookmarks: [] }, { bookmarks: [], futureField: {} }
  ]) {
    const before = JSON.stringify(x.storage);
    const progress = JSON.stringify(x.scope.practiceProgress.value);
    assert.equal(x.import(bad), 'error', JSON.stringify(bad).slice(0, 80));
    assert.equal(JSON.stringify(x.storage), before);
    assert.equal(JSON.stringify(x.scope.practiceProgress.value), progress);
  }
});
test('Legacy, 3.5.0, 3.6.0 and 4.0.0 valid shapes import; empty draft retained', () => {
  for (const version of [undefined, '3.5.0', '3.6.0', '4.0.0']) {
    const x = start();
    const data = { bookmarks: ['term-0'], practiceProgress: { 'JS-101': { status: 'passed', codeDraft: '' } } };
    if (version) Object.assign(data, { app: 'VueLexicon Pro', version, exportDate: '2026-10-29T09:00:00.000Z' });
    assert.equal(x.import(data), 'success');
    assert.equal(x.scope.practiceProgress.value['JS-101'].codeDraft, '');
    assert(x.scope.bookmarkedIds.value.has(x.scope.rawLexiconData.value[0].id));
  }
});
test('Status-only legacy import merges without erasing current draft', () => {
  const x = start({ [key]: '{"JS-101":{"status":"unlocked","codeDraft":"saved"}}' });
  assert.equal(x.import({ practiceProgress: { 'JS-101': { status: 'passed' } } }), 'success');
  assert.equal(x.scope.practiceProgress.value['JS-101'].codeDraft, 'saved');
});
test('Failure to back up local data preserves original and blocks later writes', () => {
  const raw = '{"JS-101":{"status":"passed","codeDraft":{}}}';
  const x = start({ [key]: raw }, () => true);
  assert.equal(x.storage[key], raw);
  const before = JSON.stringify(x.storage);
  assert.equal(x.import({ practiceProgress: { 'JS-101': { status: 'passed', codeDraft: 'replacement' } } }), 'error');
  assert.equal(JSON.stringify(x.storage), before);
});
test('Partial storage write failure restores preceding keys and keeps reactive state', () => {
  const id = start().scope.rawLexiconData.value[0].id;
  const x = start({ vuelexicon_bookmarks_v3: '[]' }, (k,v) => k === key && v.includes('new imported draft'));
  assert.equal(x.import({ bookmarks: [id], practiceProgress: { 'JS-101': { status: 'passed', codeDraft: 'new imported draft' } } }), 'error');
  assert.equal(x.storage.vuelexicon_bookmarks_v3, '[]');
  assert.equal(x.storage[key], undefined);
  assert.equal(x.scope.bookmarkedIds.value.size, 0);
});
test('Oversized local draft is retained whole in recovery, valid sibling kept', () => {
  const raw = JSON.stringify({ 'JS-101': { status: 'passed', codeDraft: 'ا'.repeat(131073) }, 'CSS-101': { status: 'passed', codeDraft: 'valid' } });
  const x = start({ [key]: raw });
  assert(Object.entries(x.storage).some(([k,v]) => k.startsWith('vuelexicon_recovery_') && v === raw));
  assert.equal(x.scope.practiceProgress.value['CSS-101'].codeDraft, 'valid');
});
test('UTF8 bytes measured consistently and JSON file max enforced', () => {
  const x = start();
  assert.equal(x.w.VueLexiconData.bytes('ا😀'), 6);
  assert.equal(x.import('x'.repeat(1024 * 1024 + 1)), 'error');
});
test('Quota warnings survive bookmark and mastery actions', () => {
  const x = start({}, () => true);
  const term = x.scope.rawLexiconData.value[0];
  x.scope.toggleBookmark(term);
  assert.equal(x.scope.toastType.value, 'warning');
  x.scope.setTermMastery(term.id, 'mastered');
  assert.equal(x.scope.toastType.value, 'warning');
});
test('Merged imported data cannot cross aggregate byte boundary; rejection is atomic', () => {
  const x = start();
  const code = '\0'.repeat(100000); // Valid draft bytes; JSON escaping expands it sixfold.
  assert.equal(x.import({ practiceProgress: { 'JS-101': { status: 'passed', codeDraft: code } } }), 'success');
  const before = JSON.stringify(x.storage);
  const progress = JSON.stringify(x.scope.practiceProgress.value);
  assert.equal(x.import({ practiceProgress: { 'CSS-101': { status: 'passed', codeDraft: code } } }), 'error');
  assert.equal(JSON.stringify(x.storage), before);
  assert.equal(JSON.stringify(x.scope.practiceProgress.value), progress);
});
test('Normal export roundtrips; oversized current draft exports intact as warned raw recovery', () => {
  const x = start();
  x.scope.exportUserData();
  assert.equal(x.scope.toastType.value, 'success');
  assert.equal(x.import(x.downloads.at(-1).text), 'success');
  const code = 'full user draft '.repeat(10000);
  x.scope.practiceProgress.value['JS-101'].codeDraft = code;
  x.scope.exportUserData();
  assert.equal(x.scope.toastType.value, 'warning');
  assert(x.downloads.at(-1).filename.includes('raw-recovery'));
  assert.equal(JSON.parse(x.downloads.at(-1).text).practiceProgress['JS-101'].codeDraft, code);
});
console.log(`Data safety: ${count}/${count} tests passed.`);
