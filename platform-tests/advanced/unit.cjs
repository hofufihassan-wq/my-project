const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const lessons=require('../../learning-course-advanced.js');
const expectations=require('./expectations.cjs');
assert.equal(lessons.length,16);assert.equal(new Set(lessons.map(x=>x.id)).size,16);
for(const topic of ['html','css','js','vue'])assert.equal(lessons.filter(x=>x.topic===topic).length,4);
for(const lesson of lessons){
  for(const key of ['id','topic','title','term','explanation','example','experiment','question','why','alternate','reference'])assert(lesson[key]&&typeof lesson[key]==='string',lesson.id+':'+key);
  assert.equal(lesson.choices.length,3);assert(lesson.correct>=0&&lesson.correct<3);assert(['intermediate','advanced'].includes(lesson.level));
  assert(lesson.example.startsWith('<!doctype html>'));assert(/^https:\/\/(developer.mozilla.org|vuejs.org)\//.test(lesson.reference));assert(expectations[lesson.id]);
  assert(!/<script[^>]+src=(?!["']https:\/\/unpkg.com\/vue@3\/dist\/vue.global.prod.js)/.test(lesson.example));
}
const original=require('../../learning-course.js').lessons;
const context={window:{VLexCourse:{lessons:[...original]}}};vm.createContext(context);
const source=fs.readFileSync(path.resolve(__dirname,'../../learning-course-advanced.js'),'utf8');vm.runInContext(source,context);
assert.equal(context.window.VLexCourse.lessons.length,32);vm.runInContext(source,context);assert.equal(context.window.VLexCourse.lessons.length,32);
assert.deepEqual(context.window.VLexCourse.lessons.slice(0,16).map(x=>x.id),original.map(x=>x.id));
console.log('PASS16sources and official references;4per topic;32unique preserved IDs;duplicate inclusion is idempotent');
