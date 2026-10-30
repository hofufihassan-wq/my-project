const vm = require('vm');
const fs = require('fs');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('practice-curriculum.js', 'utf8'), sandbox);
vm.runInContext(fs.readFileSync('legacy-validator-guards.js', 'utf8'), sandbox);
const curr = sandbox.window.PRACTICE_CURRICULUM;

const domContext = {
  doc: null,
  snapshot: {},
  getElementById: (id) => null,
  querySelector: (sel) => null,
  querySelectorAll: (sel) => []
};

console.log('Source-only legacy checks: JS-101/TS-101 must reject missing DOM; other reference expectations remain historical.');
let allPassed = true;
let passedCount = 0;

curr.lessons.forEach(l => {
  try {
    const res = l.validator(l.solution, domContext, []);
    const needsDom = ['JS-101', 'TS-101'].includes(l.id);
    const ok = res && res.passed === !needsDom;
    if (ok) passedCount++;
    else allPassed = false;
    console.log(`[${ok ? '✓ PASS' : '✗ FAIL'}] ${l.id} (${l.track}): ${needsDom ? 'requires actual rendered target evidence' : res.message}`);
    if (!ok && res.criteriaResults) {
      res.criteriaResults.forEach(c => {
        if (!c.passed) console.log(`   -> Criteria [${c.id}]: ${c.msg}`);
      });
    }
  } catch (e) {
    allPassed = false;
    console.log(`[✗ FAIL] ${l.id}: ERROR - ${e.message}`);
  }
});

console.log(`\nCurriculum source-only expectations: ${passedCount}/${curr.lessons.length} passed. Real reference execution is covered by run_stability_browser_tests.js.`);
if (!allPassed) {
  process.exit(1);
}
