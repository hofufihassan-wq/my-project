/**
 * VueLexicon Pro 4.0 - Core Application Logic
 * Integrates Vue 3 Composition API, Highlight.js, iOS Glassmorphism, Safe Storage,
 * Code Timeline Sandbox (مسرح تنفيذ الكود), Interactive Practice Quiz,
 * Nuxt Component Studio, and Live Scratchpad Sandbox.
 */

const { createApp, ref, computed, watch, onMounted, onUnmounted, nextTick } = Vue;

const app = createApp({
  setup() {

    // ==========================================
    // 0. Resilient SafeStorage System (P0 Safe)
    // ==========================================
    const storageWarnings = [];
    const recoveryRecords = [];
    const protectedStorageKeys = new Set();
    let recoverySequence = 0;
    const SafeStorage = {
      _mem: new Map(),
      getItem(key) {
        try { return localStorage.getItem(key); } catch (_) {}
        return this._mem.has(key) ? this._mem.get(key) : null;
      },
      writeDurably(key, val) {
        try {
          localStorage.setItem(key, val);
          return localStorage.getItem(key) === val;
        } catch (_) { return false; }
      },
      setItem(key, val) {
        if (protectedStorageKeys.has(key)) {
          triggerToast('تعذر الحفظ: احتفظنا بالسجل الأصلي. صدّر بيانات الاسترجاع أولاً؛ النسخة الحالية في الذاكرة فقط.', 'warning');
          return false;
        }
        if (this.writeDurably(key, val)) return true;
        this._mem.set(key, val);
        triggerToast('تعذر الحفظ الدائم (مساحة التخزين أو الإذن). التعديلات في هذه الجلسة فقط؛ صدّرها قبل الإغلاق.', 'warning');
        return false;
      },
      removeItem(key) {
        if (protectedStorageKeys.has(key)) return false;
        try { localStorage.removeItem(key); this._mem.delete(key); return true; }
        catch (_) { triggerToast('تعذر حذف السجل من التخزين الدائم.', 'warning'); return false; }
      },
      commitBatch(entries) {
        if (entries.some(([key]) => protectedStorageKeys.has(key))) throw new Error('سجل محلي يحتاج إلى استرجاع؛ لم يُستبدل');
        const before = Object.fromEntries(entries.map(([key]) => [key, this.getItem(key)]));
        const backupKey = unusedRecoveryKey('vuelexicon_recovery_import_');
        if (!this.writeDurably(backupKey, JSON.stringify(before))) throw new Error('تعذر حفظ نسخة استرجاع قبل الاستيراد؛ تحقق من مساحة التخزين');
        for (const [key, value] of entries) {
          if (!this.writeDurably(key, value)) {
            let restored = true;
            for (const [originalKey, raw] of Object.entries(before)) {
              try {
                if (raw === null) localStorage.removeItem(originalKey);
                else if (!this.writeDurably(originalKey, raw)) restored = false;
              } catch (_) { restored = false; }
            }
            if (!restored) throw new Error('فشل الحفظ والاسترجاع التلقائي؛ الأصل محفوظ في ' + backupKey);
            throw new Error('فشل الحفظ؛ أُعيدت البيانات الأصلية');
          }
        }
      }
    };

    // ==========================================
    // 1. Data Hydration & Stable IDs (P1 Safe)
    // ==========================================
    function generateSlug(cat, term) {
      const clean = term.toLowerCase().replace(/[^a-z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      return `${cat}-${clean || 'item'}`;
    }

    function hydrateItem(tuple, index) {
      const [
        category,
        term,
        arabicTitle,
        keywords,
        description,
        vueSfcCode,
        syntaxInfo,
        returnProps,
        env,
        useCases,
        previewType,
        vanillaCode,
        compareNotes,
        docUrl,
        codeBreakdown,
        pitfall,
        keyProps,
        relatedTerms
      ] = tuple;

      const catLabels = {
        js: 'JavaScript',
        ts: 'TypeScript',
        vue: 'Vue.js 3',
        nuxt: 'Nuxt UI',
        html: 'HTML5',
        css: 'CSS3'
      };

      const catColors = {
        js: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
        ts: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
        vue: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
        nuxt: { bg: 'bg-[#00DC82]/10', text: 'text-[#00DC82]', border: 'border-[#00DC82]/30' },
        html: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
        css: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' }
      };

      const clean = term.replace(/^[<:@\.\(\)\s]+/, '');
      const match = clean.match(/[a-zA-Z]/);
      const letter = match ? match[0].toUpperCase() : 'A';
      const stableId = generateSlug(category, term);

      return {
        id: stableId,
        legacyId: `term-${index}`,
        index,
        category,
        categoryLabel: catLabels[category] || category,
        catBadgeColor: catColors[category] || catColors.js,
        term,
        letter,
        arabicTitle,
        keywords,
        description,
        vueSfcCode: vueSfcCode || '',
        syntaxInfo,
        returnProps,
        env,
        useCases: Array.isArray(useCases) ? useCases : [useCases],
        previewType: previewType || 'generic',
        vanillaCode: vanillaCode || '',
        compareNotes: compareNotes || '',
        docUrl: docUrl || '',
        codeBreakdown: Array.isArray(codeBreakdown) ? codeBreakdown : [],
        pitfall: pitfall || '',
        keyProps: Array.isArray(keyProps) ? keyProps : [],
        relatedTerms: Array.isArray(relatedTerms) ? relatedTerms : []
      };
    }

    const rawLexiconData = ref([]);
    if (window.RAW_LEXICON_TUPLES && Array.isArray(window.RAW_LEXICON_TUPLES)) {
      rawLexiconData.value = window.RAW_LEXICON_TUPLES.map((t, idx) => hydrateItem(t, idx));
    }

    function unusedRecoveryKey(prefix) {
      let key;
      do { key = prefix + Date.now() + '_' + (++recoverySequence); } while (SafeStorage.getItem(key) !== null);
      return key;
    }

    const dataSchema = window.VueLexiconData.createSchema(rawLexiconData.value, window.PRACTICE_CURRICULUM?.lessons || []);

    function normalizeLocalField(name, value) {
      if (name === 'practiceProgress') {
        for (const id of ['JS-101', 'HTML-101', 'CSS-101', 'TS-101', 'VUE-101']) {
          if (!value[id]) value[id] = { status: 'unlocked', codeDraft: null };
          else if (value[id].status === 'locked') value[id].status = 'unlocked';
        }
      }
      return value;
    }

    function loadLocalField(name, key, fallback) {
      const raw = SafeStorage.getItem(key);
      if (raw === null) return normalizeLocalField(name, fallback);
      let parsed;
      let repaired;
      let reason = 'توحيد المعرفات القديمة';
      try {
        parsed = JSON.parse(raw);
        repaired = normalizeLocalField(name, dataSchema.field(name, parsed));
        if (JSON.stringify(repaired) === JSON.stringify(parsed)) return repaired;
      } catch (err) {
        reason = err.message;
        repaired = normalizeLocalField(name, dataSchema.salvage(name, parsed));
      }
      const backupKey = unusedRecoveryKey('vuelexicon_recovery_' + key + '_');
      const backedUp = SafeStorage.writeDurably(backupKey, raw);
      recoveryRecords.push({ key, backupKey: backedUp ? backupKey : null, reason, raw });
      if (backedUp) {
        if (!SafeStorage.writeDurably(key, JSON.stringify(repaired))) protectedStorageKeys.add(key);
        storageWarnings.push('عُزلت بيانات محلية غير متوافقة أو رُحّلت معرفاتها. الأصل الكامل محفوظ ويمكن تنزيله بزر «بيانات الاسترجاع»؛ لم تُقص المسودات.');
      } else {
        protectedStorageKeys.add(key);
        storageWarnings.push('تعذر حفظ نسخة استرجاع دائمة؛ أبقينا السجل الأصلي دون تعديل وأوقفنا الكتابة عليه. نزّل بيانات الاسترجاع قبل الإغلاق.');
      }
      return repaired;
    }

    function exportRecoveryData() {
      const records = recoveryRecords.slice();
      // Include retained backups from earlier sessions as well.
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith('vuelexicon_recovery_') && !records.some(r => r.backupKey === key)) {
            records.push({ backupKey: key, raw: localStorage.getItem(key) });
          }
        }
      } catch (_) {}
      const blob = new Blob([JSON.stringify({ app: 'VueLexicon recovery', records }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vuelexicon-recovery-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
      triggerToast('تم تنزيل سجلات الاسترجاع الأصلية دون قص. هذا ملف استرجاع خام وليس ملف تقدم للاستيراد المباشر.', 'info');
    }

    // ==========================================
    // 2. Navigation & View State
    // ==========================================
    // Visible workspaces: 'lexicon' | 'practice' (the practical simulator)
    const appMode = ref('home');
    const practiceSurface = ref('simulator');
    // Theme selection is session-only in 5B; existing persisted records are untouched.
    const theme = ref('petroleum');
    // Vue compiles the mount element's contents; sync attributes on the mount itself.
    watch([theme, appMode, practiceSurface], ([appearance, mode, surface]) => {
      const root = document.getElementById('app');
      root?.setAttribute('data-theme', appearance);
      root?.setAttribute('data-workspace', mode === 'practice' && surface === 'training' ? 'training' : mode);
    }, { immediate: true, flush: 'sync' });
    const foundationSection = ref('projects');
    const foundationSections = [
      { id: 'projects', title: 'المشاريع', icon: 'folder', description: 'مساحة مشاريعك وروابطها. إدارة المشاريع وحفظها ضمن دفعة التنظيم القادمة.' },
      { id: 'kanban', title: 'لوحة المهام', icon: 'grid', description: 'أساس بصري للوحة Kanban. إنشاء المهام وربطها بالمشاريع لم يُنفذ بعد.' },
      { id: 'notes', title: 'الملاحظات', icon: 'note', description: 'مساحة الملاحظات المخططة. المحرر والحفظ والاسترجاع ضمن دفعة التنظيم القادمة.' },
      { id: 'calendar', title: 'التقويم', icon: 'calendar', description: 'تنظيم أنشطة التعلم في الدفعة القادمة. لا توجد أحداث أو مواعيد محفوظة حاليًا.' },
      { id: 'explain', title: 'شرح الأكواد', icon: 'code', description: 'الشرح العام سطرًا بسطر لم يُنفذ بعد. شروح المصطلحات ومسرح التنفيذ التعليمي متاحان داخل القاموس.' }
    ];
    const activeFoundation = computed(() => foundationSections.find(s => s.id === foundationSection.value));
    function openFoundation(id) {
      if (!foundationSections.some(s => s.id === id)) return;
      foundationSection.value = id;
      setAppMode('foundation');
    }
    function setTheme(value) {
      if (['petroleum', 'light', 'purple'].includes(value)) theme.value = value;
    }
    function openVisualSimulator() {
      setAppMode('practice');
      if (selectedTrack.value === null) selectLesson(selectedLessonId.value, true);
    }
    function openTraining() {
      setAppMode('training');
      backToTracks();
    }
    const activeCategory = ref('all');
    const selectedLetter = ref('ALL');
    const selectedTerm = ref(rawLexiconData.value[0] || null);
    const searchQuery = ref('');
    const searchFocused = ref(false);
    const searchInputRef = ref(null);
    const highlightedDropdownIndex = ref(0);
    watch(searchQuery, () => { highlightedDropdownIndex.value = 0; }, { flush: 'sync' });
    const showShortcutsModal = ref(false);
    const showProgressModal = ref(false);
    const activeCodeFormat = ref('vue'); // 'vue' | 'vanilla'

    function setCodeFormat(fmt) {
      activeCodeFormat.value = fmt;
    }

    // ==========================================
    // 3. Highlight.js Helper & Code Formatting
    // ==========================================
    function highlightCode(code, lang) {
      if (!code) return '';
      if (window.hljs) {
        try {
          let validLang = 'xml';
          if (lang === 'typescript' || lang === 'ts') {
            validLang = window.hljs.getLanguage('typescript') ? 'typescript' : 'javascript';
          } else if (lang && window.hljs.getLanguage(lang)) {
            validLang = lang;
          }
          return window.hljs.highlight(code, { language: validLang }).value;
        } catch (e) {
          return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
      }
      return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    const currentCode = computed(() => {
      if (!selectedTerm.value) return '';
      return activeCodeFormat.value === 'vue' ? selectedTerm.value.vueSfcCode : selectedTerm.value.vanillaCode;
    });

    const currentLang = computed(() => {
      if (activeCodeFormat.value === 'vue') return 'xml';
      if (!selectedTerm.value) return 'javascript';
      if (selectedTerm.value.category === 'css') return 'css';
      if (selectedTerm.value.category === 'html') return 'xml';
      if (selectedTerm.value.category === 'ts') return 'typescript';
      return 'javascript';
    });

    const highlightedCurrentCode = computed(() => {
      return highlightCode(currentCode.value, currentLang.value);
    });

    // Related terms navigation
    function selectRelatedTerm(termName) {
      if (!termName) return;
      const target = rawLexiconData.value.find(item => {
        return item.term.toLowerCase() === termName.toLowerCase() ||
          item.arabicTitle.includes(termName) ||
          item.term.toLowerCase().includes(termName.toLowerCase());
      });
      if (target) {
        selectTerm(target);
        triggerToast(`انتقلت إلى: ${target.term}`, 'info');
      } else {
        searchQuery.value = termName;
        activeCategory.value = 'all';
        selectedLetter.value = 'ALL';
        triggerToast(`تم البحث عن المصطلح ذي الصلة: "${termName}"`, 'info');
      }
    }

    // Nuxt Component Inspector in Lab
    const inspectedNuxtComp = ref(null);
    function inspectNuxtComponent(comp) {
      inspectedNuxtComp.value = comp;
    }
    function goToLexiconDetailedView(comp) {
      inspectedNuxtComp.value = null;
      appMode.value = 'lexicon';
      selectTerm(comp);
    }

    // ==========================================
    // 4. Bookmarks System (Safe & Migrated)
    // ==========================================
    const bookmarkedIds = ref(new Set(loadLocalField('bookmarks', 'vuelexicon_bookmarks_v3', [])));

    function saveBookmarks() {
      return SafeStorage.setItem('vuelexicon_bookmarks_v3', JSON.stringify(Array.from(bookmarkedIds.value)));
    }

    function isBookmarked(termOrId) {
      if (!termOrId) return false;
      const id = typeof termOrId === 'object' ? termOrId.id : termOrId;
      const legacyId = typeof termOrId === 'object' ? termOrId.legacyId : null;
      return bookmarkedIds.value.has(id) || (legacyId && bookmarkedIds.value.has(legacyId));
    }

    function toggleBookmark(termOrId) {
      const inputId = typeof termOrId === 'string' ? termOrId : termOrId?.id;
      const term = rawLexiconData.value.find(item => item.id === inputId || item.legacyId === inputId);
      if (!term) {
        triggerToast('تعذر تحديث المفضلة: معرف المصطلح غير صالح؛ لم تتغير البيانات.', 'error');
        return;
      }
      const id = term.id;
      const removing = isBookmarked(term);
      if (removing) {
        bookmarkedIds.value.delete(id);
        if (term.legacyId) bookmarkedIds.value.delete(term.legacyId);
      } else bookmarkedIds.value.add(id);
      if (saveBookmarks()) triggerToast(removing ? 'تمت الإزالة من المفضلة' : 'تم الحفظ في المفضلة ★', removing ? 'info' : 'success');
    }

    // ==========================================
    // 5. Toast System with Status Types
    // ==========================================
    const toastMessage = ref('');
    const toastVisible = ref(false);
    const toastType = ref('success'); // 'success' | 'error' | 'info'
    let toastTimer = null;

    function triggerToast(msg, type = 'success') {
      toastMessage.value = msg;
      toastType.value = type;
      toastVisible.value = true;
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastVisible.value = false;
      }, 2800);
    }

    // ==========================================
    // 6. Recently Viewed & Mastery Levels
    // ==========================================
    const recentViewedIds = ref(loadLocalField('recent', 'vuelexicon_recent_v3', []));
    const termMastery = ref(loadLocalField('mastery', 'vuelexicon_mastery_v3', {}));

    function getTermMastery(termId) {
      return termMastery.value[termId] || 'new'; // 'new' | 'learning' | 'mastered'
    }

    function setTermMastery(termId, level) {
      termMastery.value[termId] = level;
      const saved = SafeStorage.setItem('vuelexicon_mastery_v3', JSON.stringify(termMastery.value));
      const labels = { new: 'جديد ⚪', learning: 'أتعلم 🟡', mastered: 'أتقنته 🟢' };
      if (saved) triggerToast(`تم تحديث مستوى الإتقان: ${labels[level] || level}`, 'success');
    }

    function recordRecentView(term) {
      if (!term || !term.id) return;
      const list = recentViewedIds.value.filter(id => id !== term.id && id !== term.legacyId);
      list.unshift(term.id);
      recentViewedIds.value = list.slice(0, 12);
      SafeStorage.setItem('vuelexicon_recent_v3', JSON.stringify(recentViewedIds.value));
    }

    function clearRecentHistory() {
      recentViewedIds.value = [];
      if (SafeStorage.removeItem('vuelexicon_recent_v3')) triggerToast('تم مسح سجل المصطلحات المشاهدة مؤخراً', 'info');
    }

    const recentlyViewedTerms = computed(() => {
      return recentViewedIds.value
        .map(id => rawLexiconData.value.find(t => t.id === id || t.legacyId === id))
        .filter(Boolean);
    });

    // Backup & Restore Progress
    function userDataPayload(overrides = {}) {
      return {
        app: 'VueLexicon Pro',
        version: '4.0.0',
        exportDate: new Date().toISOString(),
        bookmarks: Array.from(bookmarkedIds.value),
        mastery: termMastery.value,
        recent: recentViewedIds.value,
        practiceProgress: practiceProgress.value,
        ...overrides
      };
    }

    function exportUserData() {
      const payload = userDataPayload();
      // Compact JSON keeps the file size equal to the validated representation.
      // Oversized/invalid edits are still downloadable in full, explicitly as recovery.
      const text = JSON.stringify(payload);
      let recovery = false;
      try { dataSchema.parseImport(text); } catch (_) { recovery = true; }
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vuelexicon-${recovery ? 'raw-recovery' : 'progress'}-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      triggerToast(recovery
        ? 'نُزّلت البيانات كاملة كملف استرجاع خام؛ تتجاوز حدود الاستيراد أو تتضمن مسودة غير مدعومة، فلا يمكن استيرادها مباشرة. لم يُقص أي نص.'
        : 'تم تصدير نسخة احتياطية قابلة للاستيراد من تقدمك بنجاح ✓', recovery ? 'warning' : 'success');
    }

    let importRequestSequence = 0;
    function importUserData(event) {
      const file = event.target?.files?.[0];
      if (!file) return;
      const requestId = ++importRequestSequence;
      if (file.size > window.VueLexiconData.MAX_FILE_BYTES) {
        triggerToast('تعذر الاستيراد: حجم الملف يتجاوز 1 MiB. لم يتم تعديل أي بيانات.', 'error');
        event.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => {
        if (requestId === importRequestSequence) triggerToast('تعذر قراءة الملف. لم يتم تعديل بياناتك.', 'error');
      };
      reader.onload = (e) => {
        // Selection order defines intent, not the order asynchronous reads finish.
        if (requestId !== importRequestSequence) return;
        try {
          // Validate the entire payload BEFORE touching reactive state or storage.
          const data = dataSchema.parseImport(e.target.result);
          const next = {};
          const entries = [];
          if (data.bookmarks !== undefined) {
            next.bookmarks = [...new Set([...bookmarkedIds.value, ...data.bookmarks])];
            entries.push(['vuelexicon_bookmarks_v3', JSON.stringify(next.bookmarks)]);
          }
          if (data.mastery !== undefined) {
            next.mastery = { ...termMastery.value, ...data.mastery };
            entries.push(['vuelexicon_mastery_v3', JSON.stringify(next.mastery)]);
          }
          if (data.recent !== undefined) {
            next.recent = [...new Set([...data.recent, ...recentViewedIds.value])].slice(0, 12);
            entries.push(['vuelexicon_recent_v3', JSON.stringify(next.recent)]);
          }
          if (data.practiceProgress !== undefined) {
            next.practiceProgress = { ...practiceProgress.value };
            for (const [id, record] of Object.entries(data.practiceProgress)) {
              next.practiceProgress[id] = { ...next.practiceProgress[id], ...record };
            }
            entries.push(['vuelexicon_practice_progress', JSON.stringify(next.practiceProgress)]);
          }
          // The merged result must also fit the same import/export boundary.
          dataSchema.parseImport(JSON.stringify(userDataPayload(next)));
          SafeStorage.commitBatch(entries);
          if (next.bookmarks) bookmarkedIds.value = new Set(next.bookmarks);
          if (next.mastery) termMastery.value = next.mastery;
          if (next.recent) recentViewedIds.value = next.recent;
          if (next.practiceProgress) {
            practiceProgress.value = next.practiceProgress;
            const imported = data.practiceProgress[currentLesson.value?.id];
            // Hydrate only an explicitly imported draft, after durable commit succeeds.
            // Do not run imported code or let the editor watcher rewrite null as starter text.
            if (imported && Object.hasOwn(imported, 'codeDraft')) {
              stopPracticeExecution();
              simulatorReferenceVisible.value = false;
              simulatorExternalExample.value = null;
              autocompleteVisible.value = false;
              restoreEditorDraft(imported.codeDraft ?? currentLesson.value.initialCode);
            }
          }
          triggerToast('تم استيراد البيانات المدعومة ودمجها بنجاح؛ النسخة السابقة محفوظة للاسترجاع ✓', 'success');
        } catch (err) {
          triggerToast('تعذر الاستيراد: ' + err.message, 'error');
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    }

    // ==========================================
    // 7. Category Tabs & Counts
    // ==========================================
    const categoriesList = [
      { id: 'all', label: 'الكل', icon: '🌐' },
      { id: 'html', label: 'HTML5', icon: '📄' },
      { id: 'css', label: 'CSS3', icon: '🎨' },
      { id: 'js', label: 'JavaScript', icon: '⚡' },
      { id: 'ts', label: 'TypeScript', icon: '🔷' },
      { id: 'vue', label: 'Vue.js 3', icon: '💚' },
      { id: 'nuxt', label: 'Nuxt UI', icon: '🚀' },
      { id: 'bookmarks', label: 'المفضلة', icon: '★' }
    ];

    function getCategoryCount(catId) {
      if (catId === 'all') return rawLexiconData.value.length;
      if (catId === 'bookmarks') return bookmarkedIds.value.size;
      return rawLexiconData.value.filter(i => i.category === catId).length;
    }

    // Alphabetical filter
    const alphabetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    function hasTermsForLetter(letter) {
      return rawLexiconData.value.some(i => {
        const matchesCategory = activeCategory.value === 'all' ||
          (activeCategory.value === 'bookmarks' ? isBookmarked(i.id) : i.category === activeCategory.value);
        return matchesCategory && i.letter === letter;
      });
    }

    // ==========================================
    // 8. Smart Relevance Search & Filters
    // ==========================================
    function calculateRelevanceScore(item, q) {
      let score = 0;
      const termLower = item.term.toLowerCase();
      const arTitleLower = item.arabicTitle.toLowerCase();
      const kwLower = (item.keywords || '').toLowerCase();
      const descLower = item.description.toLowerCase();

      if (termLower === q) score += 100;
      else if (termLower.startsWith(q)) score += 80;
      else if (termLower.includes(q)) score += 50;

      if (arTitleLower.startsWith(q)) score += 45;
      else if (arTitleLower.includes(q)) score += 30;

      if (kwLower.includes(q)) score += 20;
      if (descLower.includes(q)) score += 10;

      return score;
    }

    const filteredTermsList = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      let list = rawLexiconData.value.filter(item => {
        if (activeCategory.value === 'bookmarks') {
          if (!isBookmarked(item.id)) return false;
        } else if (activeCategory.value !== 'all' && item.category !== activeCategory.value) {
          return false;
        }

        if (selectedLetter.value !== 'ALL' && item.letter !== selectedLetter.value) {
          return false;
        }

        if (q) {
          const matchTerm = item.term.toLowerCase().includes(q);
          const matchArabic = item.arabicTitle.toLowerCase().includes(q);
          const matchKeywords = (item.keywords || '').toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          if (!matchTerm && !matchArabic && !matchKeywords && !matchDesc) {
            return false;
          }
        }
        return true;
      });

      if (q) {
        list = [...list].sort((a, b) => {
          return calculateRelevanceScore(b, q) - calculateRelevanceScore(a, q);
        });
      }

      return list;
    });

    // Keep selectedTerm in sync with filtered list (P0 Clean State)
    watch(filteredTermsList, (newList) => {
      if (newList.length === 0) {
        selectedTerm.value = null;
      } else if (!selectedTerm.value || !newList.some(item => item.id === selectedTerm.value.id)) {
        selectedTerm.value = newList[0];
      }
    });

    // Autocomplete Dropdown Suggestions with Ranking
    const dropdownSuggestions = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (!q) return [];
      return [...rawLexiconData.value]
        .map(item => ({ item, score: calculateRelevanceScore(item, q) }))
        .filter(entry => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map(entry => entry.item);
    });

    const showDropdown = computed(() => {
      return searchFocused.value && dropdownSuggestions.value.length > 0;
    });

    function handleSearchBlur() {
      setTimeout(() => {
        // A delayed blur must not close suggestions after the field is refocused.
        if (document.activeElement !== searchInputRef.value) searchFocused.value = false;
      }, 250);
    }

    function navigateDropdown(e) {
      if (!showDropdown.value) {
        if (e.key === 'Enter') {
          if (filteredTermsList.value.length > 0) {
            selectTerm(filteredTermsList.value[0]);
          }
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightedDropdownIndex.value = (highlightedDropdownIndex.value + 1) % dropdownSuggestions.value.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightedDropdownIndex.value = (highlightedDropdownIndex.value - 1 + dropdownSuggestions.value.length) % dropdownSuggestions.value.length;
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = dropdownSuggestions.value[highlightedDropdownIndex.value];
        if (selected) selectDropdownItem(selected);
      } else if (e.key === 'Escape') {
        searchFocused.value = false;
      }
    }

    function selectDropdownItem(item) {
      // Suggestions search the whole dictionary. Release only filters that would
      // immediately hide the explicitly selected result when the query clears.
      if (activeCategory.value === 'bookmarks' ? !isBookmarked(item) :
          activeCategory.value !== 'all' && activeCategory.value !== item.category) activeCategory.value = 'all';
      if (selectedLetter.value !== 'ALL' && selectedLetter.value !== item.letter) selectedLetter.value = 'ALL';
      selectTerm(item);
      searchQuery.value = '';
      searchFocused.value = false;
    }

    function selectTerm(item) {
      selectedTerm.value = item;
      activeCodeFormat.value = 'vue';
      recordRecentView(item);
      nextTick(() => {
        const el = document.getElementById('detailed-term-view');
        if (el && window.innerWidth < 1024) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    function clearSearch() {
      searchQuery.value = '';
      if (searchInputRef.value) searchInputRef.value.focus();
    }

    function setCategory(catId) {
      activeCategory.value = catId;
      selectedLetter.value = 'ALL';
    }

    function setLetter(lettr) {
      selectedLetter.value = lettr;
    }

    function setAppMode(mode) {
      if (!['home', 'lexicon', 'practice', 'training', 'quiz', 'settings', 'foundation'].includes(mode)) return;
      if (mode === 'training' || mode === 'practice' || mode === 'quiz') {
        const surface = mode === 'training' ? 'training' : 'simulator';
        if (practiceSurface.value !== surface) stopPracticeExecution();
        practiceSurface.value = surface;
      }
      appMode.value = ['quiz', 'training'].includes(mode) ? 'practice' : mode;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function resetFilters() {
      activeCategory.value = 'all';
      selectedLetter.value = 'ALL';
      searchQuery.value = '';
      if (rawLexiconData.value.length > 0) {
        selectedTerm.value = rawLexiconData.value[0];
      }
      triggerToast('تمت إعادة ضبط جميع الفلاتر والبحث', 'info');
    }

    // ==========================================
    // 9. Honest Copy to Clipboard (P0 Safe)
    // ==========================================
    async function copyCode(code) {
      if (!code) {
        triggerToast('لا يوجد كود برمجي لنسخه!', 'error');
        return false;
      }
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(code);
          triggerToast('تم نسخ الكود البرمجي إلى الحافظة بنجاح ✓', 'success');
          return true;
        }
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(ta);
        if (successful) {
          triggerToast('تم نسخ الكود البرمجي إلى الحافظة بنجاح ✓', 'success');
          return true;
        } else {
          throw new Error('execCommand returned false');
        }
      } catch (err) {
        triggerToast('لم يتم النسخ: تعذّر الوصول إلى حافظة المتصفح', 'error');
        return false;
      }
    }

    // ==========================================
    // 10. CSS Studio State (Preserved 100%)
    // ==========================================
    const cssColorText = ref('#00DC82');
    const cssOpacityVal = ref(85);
    const cssBlurVal = ref(12);
    const cssFlexDir = ref('row');
    const cssFlexJustify = ref('space-between');
    const cssFlexAlign = ref('center');
    const cssGridCols = ref(3);
    const cssGridGap = ref(12);
    const cssMarginVal = ref(16);
    const cssPaddingVal = ref(16);
    const cssBorderRadiusVal = ref(16);
    const cssBorderWidthVal = ref(2);
    const cssBorderStyleVal = ref('solid');
    const cssBorderColorVal = ref('#00DC82');
    const cssShadowX = ref(0);
    const cssShadowY = ref(8);
    const cssShadowBlur = ref(24);
    const cssShadowSpread = ref(-4);
    const cssRotateDeg = ref(12);
    const cssScaleVal = ref(1.05);
    const cssAnimationType = ref('pulse');
    const cssAspectRatio = ref('16/9');
    const cssOverflowVal = ref('auto');
    const cssZIndexActive = ref(2);
    const cssFilterBlur = ref(0);
    const cssFilterBrightness = ref(110);
    const cssFilterContrast = ref(100);
    const cssFilterGrayscale = ref(0);

    // ==========================================
    // 11. HTML5 Studio State (P0: Empty Password)
    // ==========================================
    const htmlDialogOpen = ref(false);
    const htmlTableSearch = ref('');
    const htmlCanvasRef = ref(null);
    const htmlInputText = ref('مطور واجهات محترف');
    const htmlInputPassword = ref(''); // P0 Fix: No default credential
    const htmlShowPassword = ref(false);
    const htmlProgressVal = ref(60);
    const htmlSelectVal = ref('nuxt');

    function decreaseProgress() {
      if (htmlProgressVal.value > 0) htmlProgressVal.value -= 10;
    }
    function increaseProgress() {
      if (htmlProgressVal.value < 100) htmlProgressVal.value += 10;
    }

    const htmlTableRows = [
      { id: '01', name: 'Vue.js 3', cat: 'Frontend' },
      { id: '02', name: 'Nuxt UI v3', cat: 'UI Library' },
      { id: '03', name: 'TypeScript 5', cat: 'Language' },
      { id: '04', name: 'Tailwind CSS', cat: 'Styling' },
      { id: '05', name: 'Vite & Nitro', cat: 'Build Tools' }
    ];

    const filteredHtmlTableRows = computed(() => {
      const q = htmlTableSearch.value.trim().toLowerCase();
      if (!q) return htmlTableRows;
      return htmlTableRows.filter(r => r.name.toLowerCase().includes(q) || r.cat.toLowerCase().includes(q));
    });

    function drawOnHtmlCanvas() {
      const canvas = htmlCanvasRef.value;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#00DC82');
      grad.addColorStop(1, '#38BDF8');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(80, 65, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(200, 65, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#EC4899';
      ctx.lineWidth = 4;
      ctx.strokeRect(270, 35, 60, 60);

      triggerToast('تم الرسم على لوحة Canvas بنجاح!', 'success');
    }

    function clearHtmlCanvas() {
      const canvas = htmlCanvasRef.value;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      triggerToast('تم مسح لوحة الرسم', 'info');
    }

    // ==========================================
    // 12. JavaScript Demos State (P0 Honest Network)
    // ==========================================
    const jsFilterUsersList = [
      { id: 1, name: 'سارة المنصور', role: 'مطور واجهات', exp: 4 },
      { id: 2, name: 'أحمد التميمي', role: 'مصمم UI', exp: 6 },
      { id: 3, name: 'خالد الهاشمي', role: 'مدير تقني', exp: 8 },
      { id: 4, name: 'نورة السعيد', role: 'مطور واجهات', exp: 3 },
      { id: 5, name: 'عمر القحطاني', role: 'مصمم UI', exp: 5 },
      { id: 6, name: 'فاطمة الدوسري', role: 'مطور واجهات', exp: 7 }
    ];

    const jsFindQuery = ref('سارة');
    const jsFoundUser = computed(() => {
      const q = jsFindQuery.value.trim().toLowerCase();
      if (!q) return null;
      return jsFilterUsersList.find(u => u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));
    });

    const jsFilterRole = ref('الكل');
    const jsFilterSearch = ref('');
    const filteredJsUsers = computed(() => {
      return jsFilterUsersList.filter(u => {
        const matchesRole = jsFilterRole.value === 'الكل' || u.role === jsFilterRole.value;
        const matchesSearch = !jsFilterSearch.value.trim() || u.name.includes(jsFilterSearch.value.trim());
        return matchesRole && matchesSearch;
      });
    });

    const jsMapCurrency = ref('USD');
    const baseProducts = [
      { name: 'اشتراك برو السنوي', priceUSD: 120 },
      { name: 'حزمة قوالب Nuxt UI', priceUSD: 45 },
      { name: 'دورة هندسة الواجهات', priceUSD: 80 }
    ];
    const mappedProducts = computed(() => {
      const rate = 3.75;
      return baseProducts.map(p => {
        const finalPrice = jsMapCurrency.value === 'SAR' ? (p.priceUSD * rate).toFixed(0) : p.priceUSD;
        return {
          ...p,
          formattedPrice: jsMapCurrency.value === 'SAR' ? `${finalPrice} ر.س` : `$${finalPrice}`
        };
      });
    });

    const jsCartItems = ref([
      { id: 1, title: 'اشتراك VueLexicon', price: 29, qty: 1 },
      { id: 2, title: 'مكونات Nuxt Pro', price: 49, qty: 2 }
    ]);
    function decreaseCartQty(item) {
      if (item && item.qty > 0) item.qty--;
    }
    const jsCartTotal = computed(() => {
      return jsCartItems.value.reduce((acc, item) => acc + item.price * item.qty, 0);
    });

    const jsClickCount = ref(0);
    const jsEventLog = ref({ type: '', x: 0, y: 0, time: '' });
    function handleJsButtonClick(e) {
      jsClickCount.value++;
      jsEventLog.value = {
        type: e.type,
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
        time: new Date().toLocaleTimeString('ar-SA')
      };
      triggerToast('تم التقاط الحدث وتنفيذ المستمع بنجاح!', 'success');
    }

    // P0 Honest Network Request: Simulation vs Real Fetch Toggle
    const jsFetchLoading = ref(false);
    const jsFetchedUser = ref(null);
    const jsFetchMode = ref('simulation'); // 'simulation' | 'real'
    const jsFetchError = ref(null);

    async function triggerJsFetch() {
      jsFetchLoading.value = true;
      jsFetchError.value = null;

      if (jsFetchMode.value === 'simulation') {
        setTimeout(() => {
          jsFetchLoading.value = false;
          const names = ['حيدر المعماري', 'سارة العتيبي', 'فهد الدوسري', 'ريما الشهراني'];
          const randomName = names[Math.floor(Math.random() * names.length)];
          const randomId = Math.floor(Math.random() * 80) + 10;
          jsFetchedUser.value = {
            name: randomName,
            email: `${randomName.split(' ')[0].toLowerCase()}${randomId}@example.com`,
            avatar: `https://images.unsplash.com/photo-${1534528741775 + randomId}?w=150&auto=format&fit=crop&q=80`,
            mode: 'محاكاة تعليمية (Simulated Response)',
            status: 200
          };
          triggerToast('تم جلب بيانات المستخدم تجريبياً (محاكاة)!', 'info');
        }, 500);
      } else {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        try {
          const randId = Math.floor(Math.random() * 10) + 1;
          const res = await fetch(`https://jsonplaceholder.typicode.com/users/${randId}`, {
            signal: controller.signal
          });
          clearTimeout(timeoutId);
          if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
          const data = await res.json();
          jsFetchedUser.value = {
            name: data.name,
            email: data.email.toLowerCase(),
            avatar: `https://images.unsplash.com/photo-1534528741775?w=150&auto=format&fit=crop&q=80`,
            mode: 'طلب شبكي حقيقي عبر jsonplaceholder',
            status: res.status
          };
          triggerToast('تم جلب البيانات بنجاح من الخادم الحقيقي ✓', 'success');
        } catch (err) {
          clearTimeout(timeoutId);
          const isTimeout = err.name === 'AbortError';
          jsFetchError.value = isTimeout ? 'انتهت المهلة الزمنية للطلب الشبكي (Timeout 6s)' : `تعذر الاتصال بالشبكة: ${err.message || 'خطأ'}`;
          triggerToast(jsFetchError.value, 'error');
        } finally {
          jsFetchLoading.value = false;
        }
      }
    }

    const jsNewTaskText = ref('');
    const jsTaskList = ref(['مراجعة تفرع Git', 'كتابة مكونات Nuxt UI', 'اختبار ميزة filter']);
    function jsAddTask() {
      if (!jsNewTaskText.value.trim()) return;
      jsTaskList.value.push(jsNewTaskText.value.trim());
      jsNewTaskText.value = '';
      triggerToast('تم إدراج المهمة في المصفوفة عبر push()!', 'success');
    }
    function removeJsTask(idx) {
      if (idx >= 0 && idx < jsTaskList.value.length) {
        jsTaskList.value.splice(idx, 1);
        triggerToast('تم الحذف بواسطة splice()', 'info');
      }
    }

    const jsThemePref = ref(SafeStorage.getItem('app_demo_theme_v3') || 'emerald');
    function saveThemePref(pref) {
      jsThemePref.value = pref;
      SafeStorage.setItem('app_demo_theme_v3', pref);
      triggerToast(`تم حفظ التفضيل (${pref}) في التخزين المحلي الآمن!`, 'success');
    }

    const jsTimerRunning = ref(false);
    const jsTimerFinished = ref(false);
    function startJsTimer() {
      if (jsTimerRunning.value) return;
      jsTimerRunning.value = true;
      jsTimerFinished.value = false;
      setTimeout(() => {
        jsTimerRunning.value = false;
        jsTimerFinished.value = true;
        triggerToast('انتهى مؤقت setTimeout بنجاح!', 'success');
      }, 2000);
    }

    const jsRegexInput = ref('NuxtPro2026');
    const jsRandomNumber = ref(42);
    const jsRandomBgColor = ref('#064E3B');
    function rollRandomNumber() {
      jsRandomNumber.value = Math.floor(Math.random() * 100) + 1;
      const colors = ['#064E3B', '#0f766e', '#1e3a8a', '#581c87', '#831843', '#1e293b'];
      jsRandomBgColor.value = colors[Math.floor(Math.random() * colors.length)];
      triggerToast(`رقم عشوائي جديد: ${jsRandomNumber.value}`, 'info');
    }

    const jsFormattedDate = ref('');
    const jsCurrentTime = ref('');
    let clockInterval = null;
    function updateJsDateTime() {
      const now = new Date();
      jsFormattedDate.value = new Intl.DateTimeFormat('ar-SA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(now);
      jsCurrentTime.value = now.toLocaleTimeString('ar-SA');
    }
    updateJsDateTime();
    clockInterval = setInterval(updateJsDateTime, 1000);

    const jsTagsInput = ref('Vue, Nuxt, Tailwind, CSS3, JavaScript, TypeScript');
    const jsTagsArray = computed(() => {
      return jsTagsInput.value.split(',').filter(t => t.trim().length > 0);
    });

    const jsUserData = ref({ name: 'حيدر', role: 'مهندس واجهات أمامي' });
    const jsKeystrokeCount = ref(0);
    const jsDebounceTriggerCount = ref(0);
    let debounceTimer = null;
    function handleDebounceInput() {
      jsKeystrokeCount.value++;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        jsDebounceTriggerCount.value++;
      }, 400);
    }

    // Vue 3 Standard Demos
    const demoCounter = ref(0);
    const demoInputText = ref('تطبيق متكامل');
    const demoAlertVisible = ref(true);
    const demoSwitchVal = ref(true);
    const demoModalOpen = ref(false);

    // ==========================================
    // 13. Nuxt UI Component Studio State
    // ==========================================
    const studioSelectedComponent = ref('UButton');
    const nuxtButtonColor = ref('primary');
    const nuxtButtonVariant = ref('solid');
    const nuxtButtonSize = ref('md');
    const nuxtButtonLabel = ref('ابدأ الآن مع Nuxt UI');
    const nuxtButtonIcon = ref('sparkles');
    const nuxtButtonTrailing = ref(false);
    const nuxtButtonLoading = ref(false);
    const nuxtButtonDisabled = ref(false);
    const nuxtButtonBlock = ref(false);
    const playgroundClickCount = ref(0);
    const playgroundButtonPulsing = ref(false);

    const studioCardTitle = ref('لوحة تحكم المشرف');
    const studioCardDesc = ref('بطاقة عصرية مبنية بأعلى معايير Nuxt UI v3 مع دعم كامل للـ Dark Mode والحدود الزجاجية.');
    const studioInputPlaceholder = ref('اكتب بريدك الإلكتروني...');
    const studioAlertTitle = ref('تم حفظ التغييرات بنجاح!');
    const studioAlertDesc = ref('تمت مزامنة كافة إعدادات المكونات مع الخادم السحابي.');
    const studioAlertVisible = ref(true); // P0 Fix: Alert dismiss capability
    const studioBadgeLabel = ref('موصى به للمشاريع');
    const studioSwitchVal = ref(true);
    const studioModalOpen = ref(false);

    function selectNuxtColor(colorId) {
      nuxtButtonColor.value = colorId;
      triggerToast('تم تغيير اللون إلى ' + colorId, 'info');
    }

    function selectNuxtVariant(variant) {
      nuxtButtonVariant.value = variant;
      triggerToast('تم تغيير التنوع إلى ' + variant, 'info');
    }

    function selectNuxtSize(size) {
      nuxtButtonSize.value = size;
      triggerToast('تم تغيير المقاس إلى ' + size, 'info');
    }

    function selectNuxtIcon(iconId) {
      nuxtButtonIcon.value = iconId;
      triggerToast('تم اختيار الأيقونة', 'info');
    }

    function handlePlaygroundButtonClick() {
      playgroundClickCount.value++;
      playgroundButtonPulsing.value = true;
      setTimeout(() => playgroundButtonPulsing.value = false, 200);
      triggerToast(`تم النقر على زر Nuxt UI التفاعلي! (النقرة #${playgroundClickCount.value})`, 'success');
    }

    function applyButtonPreset(preset) {
      if (preset === 'primary') {
        nuxtButtonColor.value = 'primary';
        nuxtButtonVariant.value = 'solid';
        nuxtButtonIcon.value = 'sparkles';
        nuxtButtonLabel.value = 'تأكيد وحفظ البيانات';
        nuxtButtonLoading.value = false;
        nuxtButtonDisabled.value = false;
        nuxtButtonTrailing.value = false;
      } else if (preset === 'warning') {
        nuxtButtonColor.value = 'warning';
        nuxtButtonVariant.value = 'soft';
        nuxtButtonIcon.value = 'sparkles';
        nuxtButtonLabel.value = 'تحذير: تحقق من المدخلات';
        nuxtButtonLoading.value = false;
        nuxtButtonDisabled.value = false;
      } else if (preset === 'success') {
        nuxtButtonColor.value = 'success';
        nuxtButtonVariant.value = 'solid';
        nuxtButtonIcon.value = 'sparkles';
        nuxtButtonLabel.value = 'تمت العملية بنجاح';
        nuxtButtonLoading.value = false;
      } else if (preset === 'ghost') {
        nuxtButtonColor.value = 'neutral';
        nuxtButtonVariant.value = 'ghost';
        nuxtButtonLabel.value = 'زر شفاف جانبي';
      }
      triggerToast(`تم تطبيق القالب: ${preset}`, 'info');
    }

    function getPlaygroundButtonClass() {
      const sizeClasses = {
        xs: 'px-2.5 py-1 text-xs',
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
        xl: 'px-6 py-3 text-lg'
      };

      const color = nuxtButtonColor.value;
      const variant = nuxtButtonVariant.value;

      let styleClasses = 'bg-[#00DC82] text-slate-950 hover:bg-[#00b86b]';

      if (variant === 'solid') {
        if (color === 'primary') styleClasses = 'bg-[#00DC82] text-slate-950 hover:bg-[#00b86b] shadow-lg shadow-[#00DC82]/25';
        else if (color === 'neutral') styleClasses = 'bg-slate-700 text-white hover:bg-slate-600';
        else if (color === 'success') styleClasses = 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/25';
        else if (color === 'warning') styleClasses = 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-lg shadow-amber-400/25';
        else if (color === 'error') styleClasses = 'bg-rose-500 text-white hover:bg-rose-400 shadow-lg shadow-rose-500/25';
      } else if (variant === 'outline') {
        if (color === 'primary') styleClasses = 'border-2 border-[#00DC82] text-[#00DC82] hover:bg-[#00DC82]/10';
        else if (color === 'neutral') styleClasses = 'border-2 border-slate-600 text-slate-200 hover:bg-slate-800';
        else if (color === 'success') styleClasses = 'border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10';
        else if (color === 'warning') styleClasses = 'border-2 border-amber-400 text-amber-400 hover:bg-amber-400/10';
        else if (color === 'error') styleClasses = 'border-2 border-rose-500 text-rose-400 hover:bg-rose-500/10';
      } else if (variant === 'soft') {
        if (color === 'primary') styleClasses = 'bg-[#00DC82]/15 text-[#00DC82] hover:bg-[#00DC82]/25';
        else if (color === 'neutral') styleClasses = 'bg-slate-800 text-slate-300 hover:bg-slate-700';
        else if (color === 'success') styleClasses = 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25';
        else if (color === 'warning') styleClasses = 'bg-amber-400/15 text-amber-300 hover:bg-amber-400/25';
        else if (color === 'error') styleClasses = 'bg-rose-500/15 text-rose-300 hover:bg-rose-500/25';
      } else if (variant === 'ghost') {
        if (color === 'primary') styleClasses = 'text-[#00DC82] hover:bg-[#00DC82]/10';
        else if (color === 'neutral') styleClasses = 'text-slate-300 hover:bg-slate-800';
        else if (color === 'success') styleClasses = 'text-emerald-400 hover:bg-emerald-500/10';
        else if (color === 'warning') styleClasses = 'text-amber-400 hover:bg-amber-400/10';
        else if (color === 'error') styleClasses = 'text-rose-400 hover:bg-rose-500/10';
      }

      return `${sizeClasses[nuxtButtonSize.value] || sizeClasses.md} ${styleClasses}`;
    }

    const generatedNuxtStudioCode = computed(() => {
      const comp = studioSelectedComponent.value;
      if (comp === 'UButton') {
        let code = `<UButton`;
        if (nuxtButtonColor.value !== 'primary') code += `\n  color="${nuxtButtonColor.value}"`;
        if (nuxtButtonVariant.value !== 'solid') code += `\n  variant="${nuxtButtonVariant.value}"`;
        if (nuxtButtonSize.value !== 'md') code += `\n  size="${nuxtButtonSize.value}"`;
        if (nuxtButtonIcon.value) code += `\n  icon="${nuxtButtonIcon.value}"`;
        if (nuxtButtonTrailing.value) code += `\n  trailing`;
        if (nuxtButtonLoading.value) code += `\n  :loading="true"`;
        if (nuxtButtonDisabled.value) code += `\n  :disabled="true"`;
        if (nuxtButtonBlock.value) code += `\n  block`;
        code += `\n  label="${nuxtButtonLabel.value}"\n  @click="handleClick"\n/>`;
        return code;
      } else if (comp === 'UCard') {
        return `<UCard :ui="{ ring: 'ring-1 ring-white/10', divide: 'divide-y divide-white/5' }">\n  <template #header>\n    <h3 class="text-base font-bold text-white">${studioCardTitle.value}</h3>\n  </template>\n\n  <p class="text-xs text-slate-300 leading-relaxed">\n    ${studioCardDesc.value}\n  </p>\n\n  <template #footer>\n    <div class="flex justify-end gap-2">\n      <UButton color="${nuxtButtonColor.value}" variant="${nuxtButtonVariant.value}" label="إجراء رئيسي" />\n    </div>\n  </template>\n</UCard>`;
      } else if (comp === 'UInput') {
        return `<UInput\n  color="${nuxtButtonColor.value}"\n  variant="${nuxtButtonVariant.value}"\n  size="${nuxtButtonSize.value}"\n  placeholder="${studioInputPlaceholder.value}"\n  icon="i-heroicons-envelope"\n  trailing\n/>`;
      } else if (comp === 'UAlert') {
        return `<UAlert\n  color="${nuxtButtonColor.value}"\n  variant="${nuxtButtonVariant.value}"\n  title="${studioAlertTitle.value}"\n  description="${studioAlertDesc.value}"\n  icon="i-heroicons-check-circle"\n  :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link' }"\n/>`;
      } else if (comp === 'UBadge') {
        return `<UBadge\n  color="${nuxtButtonColor.value}"\n  variant="${nuxtButtonVariant.value}"\n  size="${nuxtButtonSize.value}"\n  label="${studioBadgeLabel.value}"\n/>`;
      } else if (comp === 'USwitch') {
        return `<USwitch\n  v-model="switchValue"\n  color="${nuxtButtonColor.value}"\n  label="تفعيل الوضع المتقدم"\n/>`;
      } else if (comp === 'UModal') {
        return `<UModal v-model="isOpen">\n  <UCard>\n    <template #header>\n      <h3 class="font-bold text-white">عنوان النافذة</h3>\n    </template>\n    <p class="text-sm text-gray-300">محتوى النافذة المنبثقة من Nuxt UI v3.</p>\n    <template #footer>\n      <UButton label="حفظ وإغلاق" @click="isOpen = false" />\n    </template>\n  </UCard>\n</UModal>`;
      }
      return `<UButton label="Nuxt UI Component" />`;
    });

    const nuxtUiCatalog = computed(() => {
      return rawLexiconData.value.filter(i => i.category === 'nuxt');
    });

    // ==========================================
    // 14. Hands-on Practice Tracks Engine (وضع التدريب العملي المتقدم)
    // ==========================================
    
    // Autocomplete dictionary with language keywords, methods, and snippets
    const AUTOCOMPLETE_DICTIONARY = [
      // JavaScript
      { label: 'map()', kind: 'دالة مصفوفة', insert: '.map(item => `${item}`)', doc: 'توليد مصفوفة جديدة بتطبيق دالة على كل عنصر' },
      { label: 'const', kind: 'كلمة محجوزة', insert: 'const ', doc: 'تعريف متغير ثابت القيمة' },
      { label: 'let', kind: 'كلمة محجوزة', insert: 'let ', doc: 'تعريف متغير قابل لإعادة التعيين' },
      { label: 'if / else', kind: 'شرط منطقي', insert: 'if (condition) {\n  \n} else {\n  \n}', doc: 'تفرع شرطي لتنفيذ أكواد مختلفة' },
      { label: 'console.log()', kind: 'دالة طباعة', insert: 'console.log();', doc: 'طباعة المخرجات والرسائل للكونسول' },
      { label: 'filter()', kind: 'دالة مصفوفة', insert: '.filter(item => item)', doc: 'تصفية العناصر وفق شرط محدد' },
      { label: 'join()', kind: 'دالة مصفوفة', insert: '.join(\'\')', doc: 'دمج عناصر المصفوفة في نص متصل' },
      { label: 'document.getElementById()', kind: 'دالة DOM', insert: 'document.getElementById(\'\')', doc: 'جلب عنصر DOM بواسطة المعرف id' },
      { label: 'addEventListener()', kind: 'مستمع أحداث', insert: '.addEventListener(\'click\', (e) => {\n  \n});', doc: 'ربط تفاعل المستخدم مع عنصر الصفحة' },
      // HTML
      { label: '<h1>', kind: 'وسم HTML', insert: '<h1>عنوان رئيسي</h1>', doc: 'عنوان رئيسي للمستوى الأول في الصفحة' },
      { label: '<p>', kind: 'وسم HTML', insert: '<p>فقرة نصية توضيحية</p>', doc: 'عنصر الفقرة النصية' },
      { label: '<article>', kind: 'وسم دلالي', insert: '<article>\n  \n</article>', doc: 'عنصر دلالي لاحتواء محتوى مستقل' },
      { label: '<form>', kind: 'نموذج إدخال', insert: '<form onsubmit="event.preventDefault();">\n  \n</form>', doc: 'حاوية حقول إدخال البيانات' },
      { label: '<input>', kind: 'حقل إدخال', insert: '<input type="text" placeholder="" required>', doc: 'حقل إدخال بيانات المستخدم' },
      { label: '<label>', kind: 'تسمية حقل', insert: '<label for="">التسمية:</label>', doc: 'تسمية مقترنة بحقل إدخال' },
      { label: '<button>', kind: 'زر تفاعلي', insert: '<button type="submit">إرسال</button>', doc: 'زر تنفيذ أو إرسال نموذج' },
      // CSS
      { label: 'display: flex;', kind: 'تنسيق CSS', insert: 'display: flex;\njustify-content: space-between;\nalign-items: center;', doc: 'تفعيل نظام Flexbox المرن' },
      { label: 'display: grid;', kind: 'تنسيق CSS', insert: 'display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\ngap: 16px;', doc: 'تفعيل شبكة CSS Grid المتجاوبة' },
      { label: 'padding', kind: 'تنسيق CSS', insert: 'padding: 24px;', doc: 'الحشوة الداخلية داخل حدود الصندوق' },
      { label: 'margin', kind: 'تنسيق CSS', insert: 'margin: 0 auto;', doc: 'الهامش الخارجي وتوسيط الصندوق' },
      { label: 'border-radius', kind: 'تنسيق CSS', insert: 'border-radius: 12px;', doc: 'تدوير حواف العنصر' },
      // TypeScript
      { label: 'interface', kind: 'TypeScript', insert: 'interface User {\n  id: number;\n  name: string;\n}', doc: 'تعريف عقد هيكل البيانات والواجهات' },
      { label: 'type', kind: 'TypeScript', insert: 'type ID = string | number;', doc: 'تعريف نوع مخصص أو اتحاد أنواع' },
      { label: 'typeof', kind: 'TypeScript', insert: 'typeof val === \'string\'', doc: 'تضييق النوع بالتحقق في زمن التشغيل' },
      { label: 'unknown', kind: 'TypeScript', insert: 'unknown', doc: 'النوع العلوي الآمن المقيد' },
      // Vue 3
      { label: 'ref()', kind: 'Vue 3', insert: 'const count = ref(0);', doc: 'إنشاء متغير تفاعلي في Vue 3' },
      { label: 'v-if', kind: 'توجيه Vue', insert: 'v-if="isLoggedIn"', doc: 'التحكم بالظهور الشرطي للعنصر' },
      { label: 'v-else', kind: 'توجيه Vue', insert: 'v-else', doc: 'كتلة الشرط البديل في قوالب Vue' },
      { label: 'v-for', kind: 'توجيه Vue', insert: 'v-for="item in items" :key="item.id"', doc: 'تكرار قائمة عناصر بكفاءة' },
      { label: '@click', kind: 'توجيه Vue', insert: '@click="handleClick"', doc: 'ربط حدث النقر بمكونات Vue' },
      { label: 'defineProps', kind: 'دالة Vue', insert: 'defineProps({\n  title: String\n})', doc: 'تعريف خصائص المكون المستقبلة' }
    ];

    // Practice Curriculum data references
    const practiceCurriculum = computed(() => window.PRACTICE_CURRICULUM || { tracks: [], lessons: [] });
    const practiceTracks = computed(() => practiceCurriculum.value.tracks || []);
    const practiceLessons = computed(() => practiceCurriculum.value.lessons || []);

    // Active practice track & lesson
    const selectedTrack = ref(null); // null = Track Selection View ("وش تحب تتدرّب اليوم؟")
    const selectedLessonId = ref('JS-101');
    const practiceCode = ref('');
    const practiceIframeKey = ref(1);
    const practiceIframeRef = ref(null);
    const practiceIframeDoc = ref('<!doctype html><p>اضغط تشغيل الكود لبدء المعاينة.</p>');
    const submittedPracticeCode = ref(null);
    const activeRun = ref(null);
    let autoRunTimer = null;
    let runSequence = 0;
    const practiceAutoRun = ref(false);
    const simulatorReferenceVisible = ref(false);
    const simulatorExternalExample = ref(null);
    const simulatorReferenceCode = computed(() => simulatorExternalExample.value?.code ?? currentLesson.value?.solution ?? '');
    const simulatorReferenceTitle = computed(() => simulatorExternalExample.value?.title ?? 'المثال المرجعي للدرس');
    let sourceRevision = 0;
    let applyingImportedDraft = false;
    function restoreEditorDraft(code) {
      const wasRestoring = applyingImportedDraft;
      applyingImportedDraft = true;
      try { practiceCode.value = code; }
      finally { applyingImportedDraft = wasRestoring; }
    }

    // Readiness is not completion: timers and event handlers may still run.
    const executionState = ref('ready');
    const lastDomSnapshot = ref({});
    const practiceLogs = ref([
      { type: 'info', msg: 'بيئة التدريب المعزولة جاهزة لتشغيل الأكواد والتحقق من الشروط.', time: new Date().toLocaleTimeString('ar-SA') }
    ]);

    // Validation & hints & solution reveal
    const validationFeedback = ref(null);
    const revealedHintsCount = ref(0);
    const solutionRevealed = ref(false);

    // Code Editor helpers
    const cursorLine = ref(1);
    const cursorCol = ref(1);
    const editorLineCount = computed(() => {
      return (practiceCode.value || '').split('\n').length;
    });

    // Autocomplete & Tab switch toggle
    const tabAcceptsAutocomplete = ref(SafeStorage.getItem('vuelexicon_tab_autocomplete') !== 'false');
    const autocompleteVisible = ref(false);
    const autocompleteSuggestions = ref([]);
    const selectedAutocompleteIndex = ref(0);
    const autocompleteQuery = ref('');

    // Educational Step-by-step Trace Modal (مسرح تتبّع الكود التعليمي)
    const showLessonTimelineModal = ref(false);
    const timelineStepIndex = ref(0);

    // Practice Progress Persistence
    const initialPractice = loadLocalField('practiceProgress', 'vuelexicon_practice_progress', {});

    const practiceProgress = ref(initialPractice);

    function savePracticeProgress() {
      try {
        dataSchema.parseImport(JSON.stringify(userDataPayload()));
        return SafeStorage.setItem('vuelexicon_practice_progress', JSON.stringify(practiceProgress.value));
      } catch (err) {
        triggerToast('لم تُحفظ المسودة: ' + err.message + '. بقيت كاملة في المحرر؛ انسخها أو صدّرها قبل الإغلاق.', 'warning');
        return false;
      }
    }

    const currentLesson = computed(() => {
      return practiceLessons.value.find(l => l.id === selectedLessonId.value) || practiceLessons.value[0] || null;
    });

    // Helper: Track progress stats
    function getTrackProgress(trackId) {
      const tLessons = practiceLessons.value.filter(l => l.track === trackId);
      if (tLessons.length === 0) return { completed: 0, total: 0, percent: 0 };
      const completedCount = tLessons.filter(l => {
        const s = practiceProgress.value[l.id]?.status;
        return s === 'passed' || s === 'solution_viewed';
      }).length;
      const percent = Math.round((completedCount / tLessons.length) * 100);
      return { completed: completedCount, total: tLessons.length, percent };
    }

    function getLessonStatus(lessonId) {
      return practiceProgress.value[lessonId]?.status || 'locked';
    }

    // Toggle Tab switch
    function toggleTabAutocomplete() {
      tabAcceptsAutocomplete.value = !tabAcceptsAutocomplete.value;
      SafeStorage.setItem('vuelexicon_tab_autocomplete', String(tabAcceptsAutocomplete.value));
      triggerToast(
        tabAcceptsAutocomplete.value 
          ? 'تم تفعيل استخدام Tab لقبول الاقتراح المحدد' 
          : 'تم إيقاف استخدام Tab للاقتراحات (يُدرج الآن مسافة بادئة)',
        'info'
      );
    }

    // Navigation methods
    function selectTrack(trackId, referenceOnly = false) {
      selectedTrack.value = trackId;
      const tLessons = practiceLessons.value.filter(l => l.track === trackId);
      if (tLessons.length > 0) {
        // Every experiment is accessible; historical grades never gate navigation.
        const target = tLessons.find(l => typeof practiceProgress.value[l.id]?.codeDraft === 'string') || tLessons[0];
        selectLesson(target.id, referenceOnly);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function backToTracks() {
      stopPracticeExecution();
      selectedTrack.value = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function selectLesson(lessonId, referenceOnly = false) {
      const lesson = practiceLessons.value.find(l => l.id === lessonId);
      if (!lesson) return;
      stopPracticeExecution();
      selectedTrack.value = lesson.track;
      selectedLessonId.value = lessonId;
      simulatorReferenceVisible.value = false;
      simulatorExternalExample.value = null;
      revealedHintsCount.value = 0;
      solutionRevealed.value = false;
      validationFeedback.value = null;
      autocompleteVisible.value = false;

      // Load saved code draft or initial starter code
      const draft = practiceProgress.value[lessonId]?.codeDraft;
      // Loading a draft is a read: never save the starter over null/absence.
      // Dictionary navigation also avoids submitting an imported user draft.
      restoreEditorDraft(draft ?? lesson.initialCode);

      if (!referenceOnly) runPracticeCode();
    }

    function goToNextLesson() {
      if (!currentLesson.value) return;
      const trackLessons = practiceLessons.value.filter(l => l.track === currentLesson.value.track);
      const currIdx = trackLessons.findIndex(l => l.id === currentLesson.value.id);
      if (currIdx !== -1 && currIdx < trackLessons.length - 1) {
        const nextL = trackLessons[currIdx + 1];
        selectLesson(nextL.id);
      }
    }

    function goToPrevLesson() {
      if (!currentLesson.value) return;
      const trackLessons = practiceLessons.value.filter(l => l.track === currentLesson.value.track);
      const currIdx = trackLessons.findIndex(l => l.id === currentLesson.value.id);
      if (currIdx > 0) {
        selectLesson(trackLessons[currIdx - 1].id);
      }
    }

    // Editor Handlers & Autocomplete
    function handleEditorInput(event) {
      const textarea = event.target;
      const val = textarea.value;
      practiceCode.value = val;

      // Cursor position
      const selStart = textarea.selectionStart;
      const beforeCursor = val.slice(0, selStart);
      const lines = beforeCursor.split('\n');
      cursorLine.value = lines.length;
      cursorCol.value = lines[lines.length - 1].length + 1;

      // Find token before cursor
      const match = /[a-zA-Z0-9_@<:.-]+$/.exec(beforeCursor);
      if (match && match[0].length >= 1) {
        const q = match[0].toLowerCase();
        autocompleteQuery.value = match[0];
        const matched = AUTOCOMPLETE_DICTIONARY.filter(item => 
          item.label.toLowerCase().includes(q) || item.insert.toLowerCase().includes(q)
        );
        if (matched.length > 0) {
          autocompleteSuggestions.value = matched.slice(0, 6);
          selectedAutocompleteIndex.value = 0;
          autocompleteVisible.value = true;
          return;
        }
      }
      autocompleteVisible.value = false;

    }

    function handleEditorKeydown(event) {
      if (autocompleteVisible.value && autocompleteSuggestions.value.length > 0) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          selectedAutocompleteIndex.value = (selectedAutocompleteIndex.value + 1) % autocompleteSuggestions.value.length;
          return;
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          selectedAutocompleteIndex.value = (selectedAutocompleteIndex.value - 1 + autocompleteSuggestions.value.length) % autocompleteSuggestions.value.length;
          return;
        }
        if (event.key === 'Enter') {
          event.preventDefault();
          acceptAutocompleteSuggestion(autocompleteSuggestions.value[selectedAutocompleteIndex.value]);
          return;
        }
        if (event.key === 'Tab') {
          if (tabAcceptsAutocomplete.value) {
            event.preventDefault();
            acceptAutocompleteSuggestion(autocompleteSuggestions.value[selectedAutocompleteIndex.value]);
            return;
          }
        }
        if (event.key === 'Escape') {
          autocompleteVisible.value = false;
          return;
        }
      }

      // Standard Tab indentation (2 spaces)
      if (event.key === 'Tab') {
        event.preventDefault();
        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const val = practiceCode.value;
        practiceCode.value = val.substring(0, start) + '  ' + val.substring(end);
        nextTick(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        });
      }
    }

    function acceptAutocompleteSuggestion(item) {
      if (!item) return;
      const textarea = document.querySelector('.editor-textarea');
      if (!textarea) return;
      const selStart = textarea.selectionStart;
      const val = practiceCode.value;
      const beforeCursor = val.slice(0, selStart);
      const afterCursor = val.slice(selStart);
      const match = /[a-zA-Z0-9_@<:.-]+$/.exec(beforeCursor);
      const prefixLen = match ? match[0].length : 0;

      const newBefore = beforeCursor.slice(0, beforeCursor.length - prefixLen) + item.insert;
      practiceCode.value = newBefore + afterCursor;
      autocompleteVisible.value = false;

      nextTick(() => {
        textarea.focus();
        const newPos = newBefore.length;
        textarea.selectionStart = textarea.selectionEnd = newPos;
        const lines = newBefore.split('\n');
        cursorLine.value = lines.length;
        cursorCol.value = lines[lines.length - 1].length + 1;
      });
    }

    // Draft text never determines srcdoc. Only an explicit submission does.
    function clearRunEvidence() {
      lastDomSnapshot.value = {};
      validationFeedback.value = null;
    }

    function cancelAutoRun() {
      if (autoRunTimer !== null) clearTimeout(autoRunTimer);
      autoRunTimer = null;
    }

    function sourceChanged() {
      sourceRevision++;
      clearRunEvidence();
      cancelAutoRun();
      if (applyingImportedDraft) return;
      if (currentLesson.value) {
        const id = currentLesson.value.id;
        if (!practiceProgress.value[id]) practiceProgress.value[id] = { status: 'unlocked' };
        practiceProgress.value[id].codeDraft = practiceCode.value;
        savePracticeProgress();
      }
      if (practiceAutoRun.value && appMode.value === 'practice') autoRunTimer = setTimeout(runPracticeCode, 300);
    }
    // flush:sync also invalidates checks for autocomplete, Tab and programmatic edits.
    watch(practiceCode, sourceChanged, { flush: 'sync' });
    watch(practiceAutoRun, enabled => {
      cancelAutoRun();
      if (enabled && appMode.value === 'practice') autoRunTimer = setTimeout(runPracticeCode, 300);
    }, { flush: 'sync' });

    function addPracticeLog(type, msg, lineno) {
      practiceLogs.value.unshift({ type, msg, lineno, time: new Date().toLocaleTimeString('ar-SA') });
      practiceLogs.value = practiceLogs.value.slice(0, 30);
    }

    function runPracticeCode() {
      submitSimulatorCode(practiceCode.value, 'draft');
    }

    function submitSimulatorCode(code, kind, example = null) {
      cancelAutoRun();
      clearRunEvidence();
      activeRun.value = null; // Invalidate the old session before replacing its frame.
      practiceLogs.value = [];
      if (!currentLesson.value || typeof code !== 'string') return;
      if (window.VueLexiconData.bytes(code) > window.VueLexiconData.MAX_DRAFT_BYTES) {
        stopPracticeExecution();
        triggerToast('المسودة أكبر من حد التشغيل. لم تُقص؛ احتفظ بنسخة منها.', 'error');
        return;
      }
      const session = {
        runId: String(Date.now()) + '-' + (++runSequence) + '-' + Math.random().toString(36).slice(2),
        lessonId: currentLesson.value.id,
        code,
        kind,
        sourceRevision,
        previewReady: false,
        received: 0
      };
      submittedPracticeCode.value = code;
      activeRun.value = session;
      const localAsset = path => typeof document.baseURI === 'string' ? new URL(path, document.baseURI).href : undefined;
      const assets = {
        vueRuntimeUrl: localAsset('assets/vendor/vue-3.4.21.global.prod.js'),
        vueCompilerUrl: localAsset('assets/vendor/compiler-sfc-3.4.21.global.min.js'),
        previewCssUrl: localAsset('assets/tailwind-3.4.17.min.css'),
        dictionaryAdapterUrl: localAsset('dictionary-preview.js')
      };
      practiceIframeDoc.value = example
        ? window.VueLexiconRunner.buildDictionaryDocument(example, session, assets)
        : window.VueLexiconRunner.buildDocument(code, session, assets);
      practiceIframeKey.value++;
      executionState.value = 'running';
      addPracticeLog('info', kind === 'reference' ? 'تعمل معاينة المثال المرجعي؛ مسودتك لم تتغير.' : 'أُرسلت نسخة مسودتك الحالية إلى إطار معزول جديد.');
    }

    function stopPracticeExecution() {
      cancelAutoRun();
      activeRun.value = null;
      submittedPracticeCode.value = null;
      clearRunEvidence();
      practiceLogs.value = [];
      executionState.value = 'stopped';
      practiceIframeDoc.value = '<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><body style="font-family:system-ui;background:#070d1e;color:#cbd5e1;padding:24px">أُعيد ضبط إطار المعاينة. تنتهي مؤقتات الإطار السابق عند إزالته، وتُرفض رسائله المتأخرة. لا نضمن مقاطعة حلقة لا نهائية تحجب المتصفح.</body></html>';
      practiceIframeKey.value++;
      addPracticeLog('info', 'أُعيد ضبط المعاينة وأُبطلت جلسة التشغيل السابقة.');
    }

    function resetLessonCode() {
      if (!currentLesson.value) return;
      practiceCode.value = currentLesson.value.initialCode;
      revealedHintsCount.value = 0;
      solutionRevealed.value = false;
      validationFeedback.value = null;

      // Update draft
      if (!practiceProgress.value[currentLesson.value.id]) {
        practiceProgress.value[currentLesson.value.id] = { status: 'unlocked' };
      }
      practiceProgress.value[currentLesson.value.id].codeDraft = practiceCode.value;
      savePracticeProgress();

      runPracticeCode();
      triggerToast('تمت إعادة التمرين للحالة الأصلية بنجاح ✓', 'info');
    }

    function checkPracticeSolution() {
      if (!currentLesson.value) return;
      const lesson = currentLesson.value;
      const session = activeRun.value;
      if (!session || session.kind !== 'draft' || session.lessonId !== lesson.id || session.code !== practiceCode.value ||
          !session.previewReady || executionState.value === 'error') {
        validationFeedback.value = null;
        triggerToast('شغّل المصدر الحالي وانتظر جاهزية المعاينة دون أخطاء قبل الفحص.', 'warning');
        return;
      }

      let iframeDoc = null;
      try {
        if (practiceIframeRef.value && practiceIframeRef.value.contentDocument) {
          iframeDoc = practiceIframeRef.value.contentDocument;
        }
      } catch(e) {}

      const domContext = {
        doc: iframeDoc,
        snapshot: lastDomSnapshot.value || {},
        getElementById: (id) => {
          if (iframeDoc) {
            try { return iframeDoc.getElementById(id); } catch(e) {}
          }
          return null;
        },
        querySelector: (sel) => {
          if (iframeDoc) {
            try { return iframeDoc.querySelector(sel); } catch(e) {}
          }
          return null;
        },
        querySelectorAll: (sel) => {
          if (iframeDoc) {
            try { return iframeDoc.querySelectorAll(sel); } catch(e) {}
          }
          return [];
        }
      };

      try {
        const result = lesson.validator(practiceCode.value, domContext, practiceLogs.value);
        validationFeedback.value = result;

        if (result.passed) {
          const isViewed = solutionRevealed.value;
          const statusToSave = isViewed ? 'solution_viewed' : 'passed';

          if (!practiceProgress.value[lesson.id]) practiceProgress.value[lesson.id] = {};
          practiceProgress.value[lesson.id].status = statusToSave;
          practiceProgress.value[lesson.id].codeDraft = practiceCode.value;
          practiceProgress.value[lesson.id].updatedAt = new Date().toISOString();

          // Unlock next lesson in current track
          const trackLessons = practiceLessons.value.filter(l => l.track === lesson.track);
          const currIdx = trackLessons.findIndex(l => l.id === lesson.id);
          if (currIdx !== -1 && currIdx < trackLessons.length - 1) {
            const nextL = trackLessons[currIdx + 1];
            if (!practiceProgress.value[nextL.id] || practiceProgress.value[nextL.id].status === 'locked') {
              if (!practiceProgress.value[nextL.id]) practiceProgress.value[nextL.id] = {};
              practiceProgress.value[nextL.id].status = 'unlocked';
            }
          }

          if (!savePracticeProgress()) return;

          if (isViewed) {
            triggerToast('تم اجتياز التمرين! (سُجلت حالتك: اطلعت على الحل) ✓', 'info');
          } else {
            triggerToast('أحسنت صنعاً! أتقنت متطلبات التمرين بنجاح 🎉', 'success');
          }
        } else {
          triggerToast('بعض الشروط لم تكتمل بعد. راجع شروط النجاح أدناه.', 'error');
        }
      } catch (err) {
        validationFeedback.value = {
          passed: false,
          message: 'حدث خطأ أثناء فحص الكود: ' + err.message,
          criteriaResults: []
        };
        triggerToast('حدث خطأ أثناء الفحص، تحقق من خلو الكود من الأخطاء', 'error');
      }
    }

    function revealHint() {
      if (revealedHintsCount.value < 2) {
        revealedHintsCount.value++;
        triggerToast(`تم إظهار التلميح ${revealedHintsCount.value} 💡`, 'info');
      }
    }

    function revealSolution() {
      if (!currentLesson.value) return;
      solutionRevealed.value = true;
      practiceCode.value = currentLesson.value.solution;
      runPracticeCode();
      triggerToast('تم عرض الحل المرجعي. سيُسجّل الإنجاز كـ (اطلعت على الحل) وليس (أتقنت).', 'warning');
    }

    // Step-by-step Timeline simulation helper
    function openLessonTimeline() {
      if (!currentLesson.value?.timelineExample) return;
      timelineStepIndex.value = 0;
      showLessonTimelineModal.value = true;
    }

    function closeLessonTimeline() {
      showLessonTimelineModal.value = false;
    }

    function nextLessonTimelineStep() {
      if (!currentLesson.value?.timelineExample) return;
      const steps = currentLesson.value.timelineExample.steps;
      if (timelineStepIndex.value < steps.length - 1) {
        timelineStepIndex.value++;
      }
    }

    function prevLessonTimelineStep() {
      if (timelineStepIndex.value > 0) {
        timelineStepIndex.value--;
      }
    }

    function clearPracticeLogs() {
      practiceLogs.value = [];
    }

    // Lexicon integration: a separate reference, never a replacement draft.
    function sendTermToScratchpad(term) {
      if (!term) return;
      const example = window.VueLexiconRunner.selectDictionaryExample(term, activeCodeFormat.value);
      if (!example) return;
      openSimulator();
      selectTrack(['js', 'html', 'css', 'ts', 'vue'].includes(term.category) ? term.category : 'js', true);
      simulatorExternalExample.value = { title: 'مثال المعجم: ' + term.term, ...example };
      runSimulatorReference();
      triggerToast(`فُتحت معاينة «${term.term}» دون استبدال مسودتك.`, 'info');
    }

    // A sandbox origin of "null" is not identity. Match WindowProxy AND session.
    function handleWindowMessage(e) {
      const session = activeRun.value;
      const message = window.VueLexiconRunner.validateMessage(e, practiceIframeRef.value?.contentWindow, session);
      if (!message || session.lessonId !== currentLesson.value?.id || session.received >= 2000) return;
      session.received++;
      const { type, payload } = message;
      if (type === 'CONSOLE_LOG') {
        addPracticeLog(payload.level, payload.msg);
      } else if (type === 'PREVIEW_READY') {
        session.previewReady = true;
        // A late load notification can never erase a runtime error.
        if (executionState.value === 'running') executionState.value = 'preview_ready';
      } else if (type === 'DOM_SNAPSHOT') {
        if (session.sourceRevision === sourceRevision &&
            (session.kind === 'reference' || session.code === practiceCode.value)) lastDomSnapshot.value = payload;
      } else if (type === 'EXECUTION_ERROR') {
        executionState.value = 'error';
        validationFeedback.value = null;
        addPracticeLog('error', payload.msg, payload.lineno);
      }
    }

    // Practical exploration: observations are data, never marks or completion claims.
    const simulatorGuide = computed(() => window.SIMULATOR_GUIDES?.[currentLesson.value?.id] || null);
    const simulatorObservation = computed(() => {
      const session = activeRun.value;
      if (!session || !session.previewReady || session.lessonId !== currentLesson.value?.id ||
          session.sourceRevision !== sourceRevision || !Object.hasOwn(lastDomSnapshot.value, 'bodyText')) return null;
      return lastDomSnapshot.value;
    });
    function getSimulatorDraftCount(trackId) {
      return practiceLessons.value.filter(lesson => lesson.track === trackId &&
        typeof practiceProgress.value[lesson.id]?.codeDraft === 'string').length;
    }
    function openSimulator() { setAppMode('practice'); }
    function toggleSimulatorReference() {
      simulatorReferenceVisible.value = !simulatorReferenceVisible.value;
    }
    function runSimulatorReference() {
      if (!currentLesson.value) return;
      simulatorReferenceVisible.value = true;
      submitSimulatorCode(simulatorReferenceCode.value, 'reference', simulatorExternalExample.value);
    }
    watch(appMode, (mode, previous) => {
      if (previous === 'practice' && mode !== 'practice') stopPracticeExecution();
    }, { flush: 'sync' });

    // Dashboard values are derived from actual local records, never concept-art stats.
    const dashboardStats = computed(() => ({
      mastered: rawLexiconData.value.filter(t => termMastery.value[t.id] === 'mastered').length,
      learning: rawLexiconData.value.filter(t => termMastery.value[t.id] === 'learning').length,
      drafts: practiceLessons.value.filter(l => typeof practiceProgress.value[l.id]?.codeDraft === 'string').length,
      totalLessons: practiceLessons.value.length
    }));
    const dashboardMasteryPercent = computed(() => rawLexiconData.value.length ? Math.round(dashboardStats.value.mastered / rawLexiconData.value.length * 100) : 0);
    const dictionaryRelated = computed(() => {
      if (!selectedTerm.value) return [];
      return rawLexiconData.value.filter(t => t.id !== selectedTerm.value.id &&
        selectedTerm.value.relatedTerms.some(name => t.term.toLowerCase() === String(name).toLowerCase())).slice(0, 5);
    });
    function openDashboardTerm(term) { setAppMode('lexicon'); selectTerm(term); }

    // ==========================================
    // 17. Lifecycle & Listeners Cleanup (P0 Safe)
    // ==========================================
    onMounted(() => {
      const handleGlobalKeys = (e) => {
        const editing = e.target?.isContentEditable || e.target?.closest?.('input, textarea, select');
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          if (appMode.value !== 'lexicon') appMode.value = 'lexicon';
          nextTick(() => {
            if (searchInputRef.value) searchInputRef.value.focus();
          });
        } else if (e.key === '?' && !editing && !e.ctrlKey && !e.metaKey && !e.altKey) {
          showShortcutsModal.value = !showShortcutsModal.value;
        } else if (e.key === 'Escape') {
          showShortcutsModal.value = false;
          showProgressModal.value = false;
          showLessonTimelineModal.value = false;
          autocompleteVisible.value = false;
          inspectedNuxtComp.value = null;
          studioModalOpen.value = false;
        }
      };

      window.addEventListener('keydown', handleGlobalKeys);
      window.addEventListener('message', handleWindowMessage);
      if (storageWarnings.length) triggerToast(storageWarnings.join(' '), 'warning');

      // Auto initialize practice code for first lesson
      if (currentLesson.value) {
        restoreEditorDraft(practiceProgress.value[currentLesson.value.id]?.codeDraft ?? currentLesson.value.initialCode);
      }

      onUnmounted(() => {
        window.removeEventListener('keydown', handleGlobalKeys);
        window.removeEventListener('message', handleWindowMessage);
        if (clockInterval) clearInterval(clockInterval);
        if (debounceTimer) clearTimeout(debounceTimer);
        if (toastTimer) clearTimeout(toastTimer);
        cancelAutoRun();
        activeRun.value = null;
      });
    });

    // ==========================================
    // 18. Returned Setup Scope (Complete Expose)
    // ==========================================
    return {
      theme, setTheme, practiceSurface, openVisualSimulator, openTraining,
      foundationSections, activeFoundation, openFoundation,
      dashboardStats, dashboardMasteryPercent, dictionaryRelated, openDashboardTerm,
      // Core Lexicon State
      rawLexiconData,
      appMode,
      setAppMode,
      activeCategory,
      setCategory,
      categoriesList,
      getCategoryCount,
      selectedLetter,
      setLetter,
      alphabetLetters,
      hasTermsForLetter,
      filteredTermsList,
      selectedTerm,
      selectTerm,
      searchQuery,
      searchFocused,
      searchInputRef,
      dropdownSuggestions,
      showDropdown,
      highlightedDropdownIndex,
      handleSearchBlur,
      navigateDropdown,
      selectDropdownItem,
      clearSearch,
      resetFilters,
      copyCode,
      bookmarkedIds,
      isBookmarked,
      toggleBookmark,
      toastMessage,
      toastVisible,
      toastType,
      triggerToast,
      showShortcutsModal,
      showProgressModal,

      // Recently Viewed & Mastery & Export/Import
      recentViewedIds,
      recentlyViewedTerms,
      clearRecentHistory,
      termMastery,
      getTermMastery,
      setTermMastery,
      exportUserData,
      importUserData,
      exportRecoveryData,
      storageWarnings,

      // Code Formatting & Highlight
      activeCodeFormat,
      setCodeFormat,
      highlightCode,
      currentCode,
      currentLang,
      highlightedCurrentCode,
      selectRelatedTerm,

      // Nuxt Component Inspector in Lab
      inspectedNuxtComp,
      inspectNuxtComponent,
      goToLexiconDetailedView,

      // Nuxt UI Component Studio
      studioSelectedComponent,
      nuxtButtonColor,
      nuxtButtonVariant,
      nuxtButtonSize,
      nuxtButtonLabel,
      nuxtButtonIcon,
      nuxtButtonTrailing,
      nuxtButtonLoading,
      nuxtButtonDisabled,
      nuxtButtonBlock,
      playgroundClickCount,
      playgroundButtonPulsing,
      selectNuxtColor,
      selectNuxtVariant,
      selectNuxtSize,
      selectNuxtIcon,
      handlePlaygroundButtonClick,
      applyButtonPreset,
      getPlaygroundButtonClass,
      generatedNuxtStudioCode,
      studioCardTitle,
      studioCardDesc,
      studioInputPlaceholder,
      studioAlertTitle,
      studioAlertDesc,
      studioAlertVisible,
      studioBadgeLabel,
      studioSwitchVal,
      studioModalOpen,
      nuxtUiCatalog,

      // CSS Studio State
      cssColorText,
      cssOpacityVal,
      cssBlurVal,
      cssFlexDir,
      cssFlexJustify,
      cssFlexAlign,
      cssGridCols,
      cssGridGap,
      cssMarginVal,
      cssPaddingVal,
      cssBorderRadiusVal,
      cssBorderWidthVal,
      cssBorderStyleVal,
      cssBorderColorVal,
      cssShadowX,
      cssShadowY,
      cssShadowBlur,
      cssShadowSpread,
      cssRotateDeg,
      cssScaleVal,
      cssAnimationType,
      cssAspectRatio,
      cssOverflowVal,
      cssZIndexActive,
      cssFilterBlur,
      cssFilterBrightness,
      cssFilterContrast,
      cssFilterGrayscale,

      // HTML Studio State
      htmlDialogOpen,
      htmlTableSearch,
      filteredHtmlTableRows,
      htmlCanvasRef,
      drawOnHtmlCanvas,
      clearHtmlCanvas,
      htmlInputText,
      htmlInputPassword,
      htmlShowPassword,
      htmlProgressVal,
      decreaseProgress,
      increaseProgress,
      htmlSelectVal,

      // JavaScript Demos State
      jsFilterUsersList,
      jsFindQuery,
      jsFoundUser,
      jsFilterRole,
      jsFilterSearch,
      filteredJsUsers,
      jsMapCurrency,
      mappedProducts,
      jsCartItems,
      decreaseCartQty,
      jsCartTotal,
      jsClickCount,
      jsEventLog,
      handleJsButtonClick,
      jsFetchLoading,
      jsFetchedUser,
      jsFetchMode,
      jsFetchError,
      triggerJsFetch,
      jsNewTaskText,
      jsTaskList,
      jsAddTask,
      removeJsTask,
      jsThemePref,
      saveThemePref,
      jsTimerRunning,
      jsTimerFinished,
      startJsTimer,
      jsRegexInput,
      jsRandomNumber,
      jsRandomBgColor,
      rollRandomNumber,
      jsFormattedDate,
      jsCurrentTime,
      jsTagsInput,
      jsTagsArray,
      jsUserData,
      jsKeystrokeCount,
      jsDebounceTriggerCount,
      handleDebounceInput,

      // Standard Demos
      demoCounter,
      demoInputText,
      demoAlertVisible,
      demoSwitchVal,
      demoModalOpen,

      // Hands-on Practice Mode
      practiceTracks,
      practiceLessons,
      selectedTrack,
      selectedLessonId,
      currentLesson,
      practiceCode,
      submittedPracticeCode,
      activeRun,
      lastDomSnapshot,
      editorLineCount,
      cursorLine,
      cursorCol,
      tabAcceptsAutocomplete,
      autocompleteVisible,
      autocompleteSuggestions,
      selectedAutocompleteIndex,
      executionState,
      practiceIframeKey,
      practiceIframeRef,
      practiceIframeDoc,
      practiceLogs,
      validationFeedback,
      revealedHintsCount,
      solutionRevealed,
      practiceProgress,
      practiceAutoRun,
      showLessonTimelineModal,
      timelineStepIndex,
      selectTrack,
      backToTracks,
      selectLesson,
      goToNextLesson,
      goToPrevLesson,
      runPracticeCode,
      stopPracticeExecution,
      resetLessonCode,
      checkPracticeSolution,
      revealHint,
      revealSolution,
      openLessonTimeline,
      closeLessonTimeline,
      nextLessonTimelineStep,
      prevLessonTimelineStep,
      handleEditorInput,
      handleEditorKeydown,
      acceptAutocompleteSuggestion,
      toggleTabAutocomplete,
      getTrackProgress,
      getLessonStatus,
      clearPracticeLogs,
      sendTermToScratchpad,

      // The simulator retains legacy progress for backup compatibility, without scoring UI.
      simulatorReferenceVisible,
      simulatorReferenceCode,
      simulatorReferenceTitle,
      simulatorGuide,
      simulatorObservation,
      getSimulatorDraftCount,
      openSimulator,
      toggleSimulatorReference,
      runSimulatorReference
    };
  }
});

window.vueLexiconApp = app.mount('#app');
