// Phase 0A intentionally preserves curriculum, term content/IDs, styles and backups.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const expectedHashes = {
  'lexicon-data.js': 'aa0e5a8cfb73e41887badf7f79cd2ab2c2641ec34bede05a4481278beaae60ba',
  'practice-curriculum.js': 'ab16ad9a3a033144ea174a1075f1f6d0167c306a758c15b02a14dc325fc403ab',
  'styles.css': '5cf7359e924e4329eb05ce292cc1e264d9a05cb9639e51ada7f6aca2f4286cce'
};
for (const [file, hash] of Object.entries(expectedHashes)) {
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'), hash, file + ' must preserve original content');
}
const context = { window: {} };
vm.createContext(context);
for (const file of ['lexicon-data.js', 'practice-curriculum.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
const { RAW_LEXICON_TUPLES: terms, PRACTICE_CURRICULUM: curriculum } = context.window;
const termIds = terms.map(t => `${t[0]}-${t[1].toLowerCase().replace(/[^a-z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'item'}`);
assert.equal(terms.length, 180);
assert.equal(new Set(termIds).size, 180);
assert.equal(curriculum.lessons.length, 15);
assert.equal(new Set(curriculum.lessons.map(l => l.id)).size, 15);
assert.equal(curriculum.tracks.length, 5);
for (const track of curriculum.tracks) assert.equal(curriculum.lessons.filter(l => l.track === track.id).length, 3);
console.log('PASS: original content SHA-256 hashes; 180 unique terms; 15 unique lessons across 5 tracks, 3 each.');
