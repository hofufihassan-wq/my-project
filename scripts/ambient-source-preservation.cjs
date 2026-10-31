/* The owner authorized changing ambient synthesis only; protect everything else. */
const assert = require('node:assert/strict');
function withoutAmbientSynthesis(source) {
  return source
    .replace(/  \/\/ Soft procedural surf buffer\.[\s\S]*?(?=  function createController\(options\))/, '')
    .replace(/^    let ambientBuffer = null;\n/m, '')
    .replace(/^      ambientBuffer = null;\n/m, '')
    .replace(/    function startAmbient\(\) \{[\s\S]*?(?=    function updateGain\(\))/, '    /* owner-authorized ambient generator */\n');
}
function assertAmbientOnlyChange(current, approved) {
  assert(withoutAmbientSynthesis(current) === withoutAmbientSynthesis(approved),
    'Only ambient synthesis and its cached buffer lifecycle may change. Alerts, preferences, source editing and shortcuts must stay exact.');
}
module.exports = { assertAmbientOnlyChange };
