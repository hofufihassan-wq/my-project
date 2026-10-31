const fs = require('fs');
const vm = require('vm');

const lexiconCode = fs.readFileSync('lexicon-data.js', 'utf8');
const curCode = fs.readFileSync('practice-curriculum.js', 'utf8');
const progressDataCode = fs.readFileSync('progress-data.js', 'utf8');
const previewRunnerCode = fs.readFileSync('preview-runner.js', 'utf8');
const betaCode = fs.readFileSync('simulator-beta.js', 'utf8');
const appCode = fs.readFileSync('app.js', 'utf8');

const storage = {};

class MockFileReader {
  readAsText(blob) {
    this.onload({ target: { result: blob._text } });
  }
}

const mockWindow = {
  addEventListener: () => {},
  removeEventListener: () => {},
  scrollTo: () => {}
};

const context = {
  window: mockWindow,
  document: { addEventListener: () => {}, removeEventListener: () => {}, querySelector: () => null },
  navigator: {},
  console: console,
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  FileReader: MockFileReader,
  localStorage: { getItem: key => storage[key] ?? null, setItem: (key, value) => { storage[key] = value; }, removeItem: key => { delete storage[key]; } },
  Vue: {
    createApp: (opts) => {
      mockWindow.vueApp = opts.setup();
      return { mount: () => {} };
    },
    ref: (v) => ({ value: v }),
    reactive: (v) => v,
    computed: (fn) => ({ get value() { return fn(); } }),
    watch: () => {},
    onMounted: () => {},
    onUnmounted: () => {},
    nextTick: (fn) => fn && fn()
  }
};

vm.createContext(context);
vm.runInContext(lexiconCode, context);
vm.runInContext(curCode, context);
vm.runInContext(progressDataCode, context);
vm.runInContext(previewRunnerCode, context);
vm.runInContext(betaCode, context);
vm.runInContext(fs.readFileSync('code-explainer.js', 'utf8'), context);
vm.runInContext(appCode, context);

const setupScope = mockWindow.vueApp;
const rawLexicon = setupScope.rawLexiconData.value;
const sampleValidTermId = rawLexicon[0].id;

const validPayload = {
  bookmarks: [sampleValidTermId],
  mastery: { [sampleValidTermId]: 'mastered' },
  recent: [sampleValidTermId],
  practiceProgress: { 'JS-101': { status: 'passed' } }
};

let passCount = 0;
let totalCount = 0;

function testImport(name, jsonStr, shouldPass) {
  totalCount++;
  setupScope.toastMessage.value = '';
  setupScope.toastType.value = '';

  setupScope.importUserData({
    target: {
      files: [{ size: jsonStr.length, _text: jsonStr }],
      value: 'test.json'
    }
  });

  const toastType = setupScope.toastType.value;
  const toastMsg = setupScope.toastMessage.value;
  const passed = toastType === 'success';
  const ok = (passed === shouldPass);
  if (ok) passCount++;
  console.log((ok ? '✓ PASS' : '✗ FAIL') + ' [' + name + ']: ' + toastType + ' -> ' + toastMsg);
}

console.log('Running Strict JSON Import Unit Tests:');
testImport('Valid payload with real IDs', JSON.stringify(validPayload), true);
testImport('Corrupted JSON syntax', '{ invalid json [', false);
testImport('Root is array instead of object', JSON.stringify(["not", "object"]), false);
testImport('Unknown term ID in bookmarks', JSON.stringify({ bookmarks: ["non_existent_123"] }), false);
testImport('Invalid mastery level value', JSON.stringify({ mastery: { [sampleValidTermId]: "hacker" } }), false);
testImport('Unknown term in mastery', JSON.stringify({ mastery: { "unknown_term_456": "mastered" } }), false);
testImport('Unknown lesson ID in practiceProgress', JSON.stringify({ practiceProgress: { "HACK-999": { status: "passed" } } }), false);
testImport('Invalid status in practiceProgress', JSON.stringify({ practiceProgress: { "JS-101": { status: "unauthorized" } } }), false);
testImport('File size > 1MB', 'X'.repeat(1024 * 1024 + 10), false);

console.log(`\nResult: ${passCount}/${totalCount} unit tests passed.`);
if (passCount !== totalCount) {
  process.exit(1);
}
