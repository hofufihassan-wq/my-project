const assert=require('node:assert/strict');
const api=require('../../learning-dashboard.js');
const results=[];
function test(name,fn){fn();results.push({name,passed:true});console.log('PASS',name)}
test('calendar accepts real leap date and rejects overflow',()=>{assert(api.validDate('2028-02-29'));assert(!api.validDate('2026-02-29'));assert(!api.validDate('2026-04-31'));assert(!api.validDate('2026-13-01'))});
test('calendar42 includes adjacent month and correct weekdays',()=>{const days=api.calendarDays(2026,10);assert.equal(days.length,42);assert.equal(new Set(days.map(d=>d.key)).size,42);assert.equal(days.filter(d=>d.currentMonth).length,30);assert.equal(days[0].key,'2026-11-01');assert.equal(days[41].key,'2026-12-12')});
test('task validation rejects blank title bad status and impossible date',()=>{assert(api.validate('tasks',{title:' ',status:'todo'}));assert(api.validate('tasks',{title:'real',status:'wrong'}));assert(api.validate('tasks',{title:'real',status:'todo',due:'2026-02-30'}));assert.equal(api.validate('tasks',{title:'real',status:'doing',due:'2026-11-04'}),'')});
test('event validation rejects bad local time and missing date',()=>{assert(api.validate('events',{title:'review',date:'2026-11-04',time:'25:00'}));assert(api.validate('events',{title:'review',date:''}));assert.equal(api.validate('events',{title:'review',date:'2026-11-04',time:'23:59'}),'')});
test('oversized note is refused without truncation',()=>{assert(api.validate('notes',{title:'note',body:'x'.repeat(12001)}));assert.equal(api.validate('notes',{title:'note',body:'x'.repeat(12000)}),'')});
require('fs').writeFileSync(__dirname+'/unit-results.json',JSON.stringify({passed:results.length,total:results.length,results},null,2));
