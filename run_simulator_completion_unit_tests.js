/* Storage and audio lifecycle tests. Real audio samples are checked in browser tests. */
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const api = require('./simulator-beta.js');
const results = [];
async function test(name, fn) {
  try { await fn(); results.push({ name, passed: true }); console.log('PASS', name); }
  catch (error) { results.push({ name, passed: false, error: error.stack }); console.error('FAIL', name, error.message); }
}
function memory(seed = {}) {
  const data = new Map(Object.entries(seed));
  return { data, getItem: key => data.has(key) ? data.get(key) : null, setItem: (key, value) => data.set(key, String(value)) };
}
class Param {
  setValueAtTime(value) { this.value = value; }
  setTargetAtTime(value) { this.value = value; }
  cancelScheduledValues() {}
  linearRampToValueAtTime(value) { this.value = value; }
  exponentialRampToValueAtTime(value) { this.value = value; }
}
class Audio {
  constructor() { this.state = 'suspended'; this.currentTime = 0; this.destination = {}; this.nodes = []; }
  node(props = {}) { const node = { connect() {}, disconnect() { this.disconnected = true; }, ...props }; this.nodes.push(node); return node; }
  createGain() { return this.node({ gain: new Param() }); }
  createBiquadFilter() { return this.node({ frequency: new Param(), Q: new Param() }); }
  createOscillator() { return this.node({ frequency: new Param(), start() { this.started = true; }, stop() { this.stopped = true; } }); }
  async resume() { this.state = 'running'; }
  async close() { this.state = 'closed'; }
}
const make = (storage = memory(), options = {}) => api.createController({ Vue: { ref: value => ({ value }) }, storage, AudioContext: Audio, isActive: () => true, ...options });
const key = api.AMBIENT_PREFERENCE_KEY;
const enabled = JSON.stringify({ ...api.AMBIENT_DEFAULTS, enabled: true });
const gesture = { isTrusted: true };
const settle = () => Promise.resolve().then(() => Promise.resolve());
(async () => {
  await test('new ambience is opt-in silent and does not write either preference record on entry', () => {
    const s = memory({ sentinel: 'untouched' }), c = make(s);
    assert.deepEqual(c.ambientSnapshot(), api.AMBIENT_DEFAULTS);
    assert.equal(c.ambientStatus.value, 'off'); assert.equal(c.diagnostics().contextState, 'not-created');
    assert.deepEqual([...s.data], [['sentinel', 'untouched']]); c.dispose();
  });
  await test('ambient parser rejects invalid shape version volume and extra fields', () => {
    for (const value of [null, [], {}, { ...api.AMBIENT_DEFAULTS, version: 2 }, { ...api.AMBIENT_DEFAULTS, volume: -1 },
      { ...api.AMBIENT_DEFAULTS, volume: 1.1 }, { ...api.AMBIENT_DEFAULTS, enabled: 1 }, { ...api.AMBIENT_DEFAULTS, extra: true }]) {
      assert.throws(() => api.parseAmbientPreferences(JSON.stringify(value)));
    }
    assert.throws(() => api.parseAmbientPreferences(' '.repeat(2049)));
  });
  await test('enabling ambience leaves original alert preferences and unrelated user records byte-identical', async () => {
    const raw = JSON.stringify({ ...api.DEFAULTS, volume: 0.4 }), s = memory({ [api.PREFERENCE_KEY]: raw, draft: 'original' }), c = make(s);
    assert(c.setAmbientEnabled(true, gesture)); await settle();
    assert.equal(c.diagnostics().ambientSources, 4); assert.equal(c.muted.value, true);
    assert.equal(s.getItem(api.PREFERENCE_KEY), raw); assert.equal(s.getItem('draft'), 'original'); c.dispose();
  });
  await test('persisted enabled ambience waits for a fresh trusted gesture after reload', async () => {
    const c = make(memory({ [key]: enabled }));
    assert.equal(c.ambientStatus.value, 'gesture-required'); assert.equal(await c.prepareAudio(), false);
    assert.equal(await c.prepareAudio({ isTrusted: false }), false); assert.equal(c.diagnostics().contextState, 'not-created');
    assert(await c.prepareAudio(gesture)); assert.equal(c.ambientStatus.value, 'playing'); c.dispose();
  });
  await test('repeated preparation and gain changes reuse a fixed ambient graph', async () => {
    let audio; const c = make(memory({ [key]: enabled }), { AudioContext: class extends Audio { constructor() { super(); audio = this; } } });
    await c.prepareAudio(gesture); const count = audio.nodes.length;
    for (let i = 0; i < 100; i++) { c.setAmbientVolume((i % 10 + 1) / 10); await c.prepareAudio(gesture); }
    assert.equal(audio.nodes.length, count); assert.equal(c.diagnostics().ambientSources, 4); c.dispose();
  });
  await test('muting alerts or zeroing their volume never stops ambience', async () => {
    const c = make(memory({ [key]: enabled, [api.PREFERENCE_KEY]: JSON.stringify({ ...api.DEFAULTS, muted: false }) }));
    await c.prepareAudio(gesture); assert(c.playCue('error')); c.setMuted(true);
    assert.equal(c.diagnostics().ambientPlaying, true); assert.equal(c.diagnostics().activeTones, 0);
    c.setVolume(0); assert.equal(c.diagnostics().ambientPlaying, true); c.dispose();
  });
  await test('zero ambient volume stops its graph while real error cues remain available', async () => {
    const c = make(memory({ [key]: enabled, [api.PREFERENCE_KEY]: JSON.stringify({ ...api.DEFAULTS, muted: false }) }));
    await c.prepareAudio(gesture); c.setAmbientVolume(0); assert.equal(c.ambientStatus.value, 'silent');
    assert.equal(c.diagnostics().ambientSources, 0); assert(c.playCue('error'));
    c.setAmbientVolume(0.2, gesture); await settle(); assert(c.diagnostics().ambientPlaying); c.dispose();
  });
  await test('leaving simulator stops and disconnects all ambient resources without changing preference', async () => {
    let active = true, audio;
    const c = make(memory({ [key]: enabled }), { isActive: () => active, AudioContext: class extends Audio { constructor() { super(); audio = this; } } });
    await c.prepareAudio(gesture); active = false; c.silence();
    assert.equal(c.diagnostics().ambientSources, 0); assert.equal(c.ambientEnabled.value, true);
    assert(audio.nodes.filter(n => n.started).every(n => n.stopped && n.disconnected));
    assert.equal(await c.prepareAudio(gesture), false); active = true; assert(await c.prepareAudio(gesture)); c.dispose();
    assert.equal(c.ambientStatus.value, 'closed'); assert.equal(c.diagnostics().contextState, 'closed');
  });
  await test('corrupted ambience keeps an exact raw recovery before replacing defaults', () => {
    const raw = '{ "original": broken', s = memory({ [key]: raw }), c = make(s);
    assert.equal(s.getItem(c.ambientRecoveryKey.value), raw);
    assert.deepEqual(api.parseAmbientPreferences(s.getItem(key)), api.AMBIENT_DEFAULTS); c.dispose();
  });
  await test('failed recovery prevents every later overwrite of the original ambience record', () => {
    const raw = '[original', s = memory({ [key]: raw }); let writes = 0;
    s.setItem = () => { writes++; throw Error('quota'); }; const c = make(s); const before = writes;
    c.setAmbientVolume(0.6); assert.equal(writes, before); assert.equal(s.getItem(key), raw); c.dispose();
  });
  await test('transient ambient read failure protects the unknown original even after storage recovers', () => {
    const raw = enabled, s = memory({ [key]: raw }); let failed = false, writes = 0; const read = s.getItem;
    s.getItem = k => { if (k === key && !failed) { failed = true; throw Error('read'); } return read(k); };
    const write = s.setItem; s.setItem = (k, v) => { writes++; write(k, v); }; const c = make(s);
    assert.equal(c.setAmbientVolume(0.8), false); assert.equal(writes, 0); assert.equal(s.getItem(key), raw); c.dispose();
  });
  await test('ambient setters reject invalid values without writing or creating contexts', () => {
    const s = memory(), c = make(s);
    for (const v of [NaN, Infinity, -1, 2, '0.5', null]) assert.equal(c.setAmbientVolume(v), false);
    for (const v of [0, 'true', null]) assert.equal(c.setAmbientEnabled(v), false);
    assert.equal(s.data.size, 0); assert.equal(c.diagnostics().contextState, 'not-created'); c.dispose();
  });
  await test('rapid ambient toggling cleans every replaced source and leaves no graph on disable', async () => {
    let audio; const c = make(memory(), { AudioContext: class extends Audio { constructor() { super(); audio = this; } } });
    for (let i = 0; i < 40; i++) { c.setAmbientEnabled(true, gesture); await settle(); c.setAmbientEnabled(false); }
    assert.equal(c.diagnostics().ambientSources, 0); assert(audio.nodes.filter(n => n.started).every(n => n.stopped && n.disconnected)); c.dispose();
  });
  const output = process.env.VLP_COMPLETION_UNIT_OUTPUT || path.join(__dirname, 'simulator-completion-artifacts/unit');
  fs.mkdirSync(output, { recursive: true });
  const report = { passed: results.filter(r => r.passed).length, total: results.length, limitation: 'Lifecycle test double only; browser waveform samples are recorded separately.', results };
  fs.writeFileSync(path.join(output, 'completion-unit-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(report.passed + '/' + report.total); if (report.passed !== report.total) process.exitCode = 1;
})();
