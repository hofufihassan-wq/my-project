const vm = require('vm');
const fs = require('fs');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('practice-curriculum.js', 'utf8'), sandbox);
const curr = sandbox.window.PRACTICE_CURRICULUM;

const domContext = {
  doc: null,
  snapshot: {},
  getElementById: (id) => null,
  querySelector: (sel) => null,
  querySelectorAll: (sel) => []
};

console.log('Testing each lesson against its reference solution:');
let allPassed = true;
let passedCount = 0;

curr.lessons.forEach(l => {
  try {
    const res = l.validator(l.solution, domContext, []);
    const ok = res && res.passed === true;
    if (ok) passedCount++;
    else allPassed = false;
    console.log(`[${ok ? '✓ PASS' : '✗ FAIL'}] ${l.id} (${l.track}): ${res.message}`);
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

console.log(`\nCurriculum Solutions Verification: ${passedCount}/${curr.lessons.length} lessons PASSED.`);
if (!allPassed) {
  process.exit(1);
}
