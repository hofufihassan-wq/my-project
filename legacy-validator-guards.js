/* Phase 4: internal legacy checks only. No grading UI or content changes. */
(function (root) {
  'use strict';
  if (root.VueLexiconLegacyGuards) return;
  const lessons = root.PRACTICE_CURRICULUM?.lessons || [];
  function targetText(preview, id, field) {
    try {
      const element = preview?.getElementById?.(id);
      if (element && typeof element.textContent === 'string') return element.textContent;
      return typeof preview?.snapshot?.[field] === 'string' ? preview.snapshot[field] : '';
    } catch (_) { return ''; }
  }
  for (const id of ['JS-101', 'TS-101']) {
    const lesson = lessons.find(item => item.id === id);
    if (!lesson) continue;
    const original = lesson.validator;
    lesson.validator = function (code, preview, logs) {
      const result = original.call(this, code, preview, logs);
      let rendered;
      const criterion = id === 'JS-101' ? 'crit_render' : 'crit_run';
      if (id === 'JS-101') {
        const user = /userName\s*=\s*['"`]([^'"`]+)['"`]/.exec(code)?.[1];
        const message = /welcomeMsg\s*=\s*['"`]([^'"`]+)['"`]/.exec(code)?.[1];
        const text = targetText(preview, 'card', 'cardText');
        rendered = !!(user?.trim() && message?.trim() && text.trim().length > 10 &&
          text.includes(user) && text.includes(message) && !text.includes('بانتظار تحديد المتغيرات'));
      } else {
        const text = targetText(preview, 'output', 'outputText');
        rendered = text.includes('VueLexicon Pro') && text.includes('3.6');
      }
      const criteriaResults = result.criteriaResults.map(item => item.id === criterion
        ? { ...item, passed: rendered, msg: rendered ? 'توجد نتيجة في عنصر المعاينة المطلوب.' : 'لا يوجد دليل عرض مطابق في عنصر المعاينة المطلوب؛ النص وحده لا يكفي.' }
        : item);
      const passed = result.passed && rendered;
      return { ...result, passed, criteriaResults,
        message: passed ? result.message : 'الفحص الداخلي يحتاج الشروط الأصلية ونتيجة فعلية مطابقة داخل المعاينة.' };
    };
  }
  root.VueLexiconLegacyGuards = Object.freeze({ guardedIds: Object.freeze(['JS-101', 'TS-101']) });
})(window);
