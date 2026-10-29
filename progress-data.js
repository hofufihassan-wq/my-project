/* VueLexicon Pro 4.0 — data boundary shared by startup, imports and tests. */
(function (root) {
  'use strict';
  const MAX_FILE_BYTES = 1024 * 1024;
  const MAX_DRAFT_BYTES = 128 * 1024;
  const fields = ['bookmarks', 'mastery', 'recent', 'practiceProgress'];
  const statuses = new Set(['locked', 'unlocked', 'passed', 'solution_viewed']);
  const masteryLevels = new Set(['new', 'learning', 'mastered']);
  function bytes(text) {
    let n = 0;
    for (const c of text) { const p = c.codePointAt(0); n += p <= 127 ? 1 : p <= 2047 ? 2 : p <= 65535 ? 3 : 4; }
    return n;
  }
  function object(value, label) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label}: يجب أن يكون كائناً غير null`);
    return value;
  }
  function keys(value, allowed, label) {
    object(value, label);
    if (Object.keys(value).some(k => !allowed.includes(k))) throw new Error(`${label}: يوجد حقل غير مدعوم`);
  }
  function timestamp(value) {
    if (typeof value !== 'string' || value.length > 32 || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(value) || !Number.isFinite(Date.parse(value))) return false;
    return new Date(value).toISOString() === (value.includes('.') ? value : value.replace('Z', '.000Z'));
  }
  function createSchema(terms, lessons) {
    const termIds = new Set(terms.map(t => t.id));
    const legacyIds = new Map(terms.map(t => [t.legacyId, t.id]));
    const lessonIds = new Set(lessons.map(l => l.id));
    function term(id) {
      if (typeof id !== 'string') throw new Error('معرف مصطلح غير صالح');
      const migrated = legacyIds.get(id) || id;
      if (!termIds.has(migrated)) throw new Error('معرف مصطلح غير معروف');
      return migrated;
    }
    function practiceItem(value) {
      keys(value, ['status', 'codeDraft', 'updatedAt'], 'سجل الدرس');
      if (!statuses.has(value.status)) throw new Error('حالة درس غير صالحة');
      const out = { status: value.status };
      if (Object.hasOwn(value, 'codeDraft')) {
        if (value.codeDraft !== null && typeof value.codeDraft !== 'string') throw new Error('codeDraft يجب أن يكون نصاً أو null');
        if (typeof value.codeDraft === 'string' && bytes(value.codeDraft) > MAX_DRAFT_BYTES) throw new Error('المسودة أكبر من 128 KiB؛ لم يتم قصها');
        out.codeDraft = value.codeDraft;
      }
      if (Object.hasOwn(value, 'updatedAt')) {
        if (!timestamp(value.updatedAt)) throw new Error('updatedAt غير صالح');
        out.updatedAt = value.updatedAt;
      }
      return out;
    }
    function field(name, value) {
      if (name === 'bookmarks' || name === 'recent') {
        if (!Array.isArray(value) || value.length > terms.length) throw new Error(`${name}: مصفوفة غير صالحة أو طويلة`);
        return [...new Set(value.map(term))];
      }
      object(value, name);
      const out = {};
      if (name === 'mastery') {
        if (Object.keys(value).length > terms.length) throw new Error('سجل الإتقان طويل');
        for (const [id, level] of Object.entries(value)) {
          if (!masteryLevels.has(level)) throw new Error('مستوى إتقان غير صالح');
          out[term(id)] = level;
        }
      } else if (name === 'practiceProgress') {
        if (Object.keys(value).length > lessons.length) throw new Error('سجل التدريب طويل');
        for (const [id, item] of Object.entries(value)) {
          if (!lessonIds.has(id)) throw new Error('معرف درس غير معروف');
          out[id] = practiceItem(item);
        }
      } else throw new Error('حقل بيانات غير مدعوم');
      return out;
    }
    function parseImport(text) {
      if (typeof text !== 'string' || bytes(text) > MAX_FILE_BYTES) throw new Error('ملف JSON يتجاوز 1 MiB');
      let value;
      try { value = JSON.parse(text); } catch (_) { throw new Error('صيغة JSON غير صالحة'); }
      keys(value, [...fields, 'app', 'version', 'exportDate'], 'النسخة الاحتياطية');
      if (!fields.some(f => Object.hasOwn(value, f))) throw new Error('الملف لا يحتوي على بيانات VueLexicon معروفة');
      if (Object.hasOwn(value, 'app') && value.app !== 'VueLexicon Pro') throw new Error('اسم التطبيق غير متوافق');
      if (Object.hasOwn(value, 'version') && !['3.5.0', '3.6.0', '4.0.0'].includes(value.version)) throw new Error('إصدار نسخة احتياطية غير مدعوم');
      if (Object.hasOwn(value, 'exportDate') && !timestamp(value.exportDate)) throw new Error('تاريخ التصدير غير صالح');
      const out = {};
      for (const f of fields) if (Object.hasOwn(value, f)) out[f] = field(f, value[f]);
      return out;
    }
    // Salvage only independently valid records; original text must be backed up by the caller.
    function salvage(name, value) {
      if (name === 'bookmarks' || name === 'recent') {
        if (!Array.isArray(value)) return [];
        const out = [];
        for (const id of value) { try { const valid = term(id); if (!out.includes(valid)) out.push(valid); } catch (_) {} }
        return out;
      }
      const out = {};
      if (!value || typeof value !== 'object' || Array.isArray(value)) return out;
      for (const [id, record] of Object.entries(value)) {
        try { Object.assign(out, field(name, { [id]: record })); } catch (_) {}
      }
      return out;
    }
    return { field, parseImport, salvage };
  }
  root.VueLexiconData = { MAX_FILE_BYTES, MAX_DRAFT_BYTES, bytes, createSchema };
})(typeof window !== 'undefined' ? window : globalThis);
