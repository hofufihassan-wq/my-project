# ملاحظات مؤجلة إلى المرحلة 0B

هذه أمثلة مؤكدة لمشكلات في مدققات الدروس الأصلية. لم نغيّر `practice-curriculum.js` في المرحلة 0A حفاظاً على محتوى الدروس ونطاق العمل.

- **JS-101:** النص `const userName='a'; const welcomeMsg='b';` ينجح لدى المدقق مع لقطة فارغة ومن دون إنشاء بطاقة DOM إطلاقاً. السبب: المسار البديل `hasUser && hasMsg` يعتبر ظهور أسماء المتغيرات وقيمها إثباتاً للرسم.
- **TS-101:** النص التالي ينجح مع لقطة فارغة ومن دون ناتج في الصفحة:

  ```js
  // appTitle
  function formatAppDetails() {}
  ```

  السبب: البحث النصي عن `appTitle` يقبل وجوده في تعليق، ووجود اسم الدالة يكفي للمسار البديل الذي يفترض نجاح العرض.

لإعادة إظهار هذين المثالين، شغّل من مجلد المشروع:

```sh
node - <<'JS'
const vm = require('node:vm'), fs = require('node:fs');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync('practice-curriculum.js', 'utf8'), context);
const examples = [
  ['JS-101', "const userName='a'; const welcomeMsg='b';"],
  ['TS-101', '// appTitle\nfunction formatAppDetails(){}']
];
for (const [id, code] of examples) {
  const lesson = context.window.PRACTICE_CURRICULUM.lessons.find(l => l.id === id);
  console.log(id, lesson.validator(code, { snapshot: {}, getElementById: () => null }, []).passed);
}
JS
```

النتيجة الحالية `true` لكليهما تكشف الخلل، ولا تعني أن هذين حلّان صحيحان. اختبار الحلول المرجعية المرفق يمرّ **15/15**؛ لكنه يثبت قبول الحلول المرجعية فقط، ولا يختبر رفض الحلول الخاطئة. ولا يصح اعتبار اختبارات المتصفح القديمة دليلاً على اكتمال إصلاح مدققات التدريب؛ بعض حالات نجاحها تعتمد هذه المسارات البديلة.

المطلوب لاحقاً في 0B: تحديد معيار كل درس بدقة، إضافة أمثلة خاطئة ومضللة يجب رفضها، وربط فحص DOM والسلوك الفعلي بمعايير الدرس بدلاً من الاكتفاء بتطابق نص أو تعليق. هذه الأمثلة ليست تدقيقاً شاملاً لجميع المدققات.
