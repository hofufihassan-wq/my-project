/**
 * VueLexicon Pro 4.0 - Core Application Logic
 * Integrates Vue 3 Composition API, Highlight.js, iOS Glassmorphism, Safe Storage,
 * Code Timeline Sandbox (مسرح تنفيذ الكود), Interactive Practice Quiz,
 * Nuxt Component Studio, and Live Scratchpad Sandbox.
 */

const { createApp, ref, computed, watch, onMounted, onUnmounted, nextTick } = Vue;

const app = createApp({
  components: Object.fromEntries((window.VLexPlatformComponents || []).map(entry => [entry.name, entry.component])),
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
        try { if(window.VLexFullBackupRecovery?.blocked)throw Error('استرجاع معلق');return localStorage.getItem(key); } catch (_) {
          // A failed read is not evidence of an absent record. Never replace
          // an unread original with the empty in-memory fallback later on.
          if (!protectedStorageKeys.has(key)) {
            protectedStorageKeys.add(key);
            storageWarnings.push('تعذرت قراءة سجل محلي؛ أبقيناه دون استبدال وأوقفنا الكتابة عليه لهذه الجلسة. صدّر تعديلات الجلسة قبل الإغلاق، ثم أعد فتح الصفحة لاستعادة القراءة.');
          }
        }
        return this._mem.has(key) ? this._mem.get(key) : null;
      },
      writeDurably(key, val) {
        try {
          window.VLexFullBackup?.assertWritable(localStorage,key);
          localStorage.setItem(key, val);
          return localStorage.getItem(key) === val;
        } catch (_) { return false; }
      },
      setItem(key, val) {
        if (protectedStorageKeys.has(key)) {
          triggerToast('تعذر الحفظ: احتفظنا بالسجل الأصلي دون استبدال. صدّر بيانات الجلسة قبل الإغلاق؛ التعديلات الحالية في الذاكرة فقط.', 'warning');
          return false;
        }
        if (this.writeDurably(key, val)) return true;
        this._mem.set(key, val);
        triggerToast('تعذر الحفظ الدائم (مساحة التخزين أو الإذن). التعديلات في هذه الجلسة فقط؛ صدّرها قبل الإغلاق.', 'warning');
        return false;
      },
      removeItem(key) {
        if (protectedStorageKeys.has(key)) return false;
        try { window.VLexFullBackup?.assertWritable(localStorage,key);localStorage.removeItem(key); this._mem.delete(key); return true; }
        catch (_) { triggerToast('تعذر حذف السجل من التخزين الدائم.', 'warning'); return false; }
      },
      commitBatch(entries) {
        if (entries.some(([key]) => protectedStorageKeys.has(key))) throw new Error('سجل محلي يحتاج إلى استرجاع؛ لم يُستبدل');
        const before = Object.fromEntries(entries.map(([key]) => [key, this.getItem(key)]));
        if (entries.some(([key]) => protectedStorageKeys.has(key))) throw new Error('تعذرت قراءة سجل محلي قبل الاستيراد؛ لم يُستبدل الأصل');
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
    const savedNavigation = window.VLexLearningStore?.getSection('navigation', {}) || {};
    const appMode = ref(window.location?.hash === '#arrow-functions' ? 'arrow' : savedNavigation.workspace || 'home');
    const learningReturnToArrow = ref(false);
    const practiceSurface = ref('simulator');
    // Theme selection is session-only in 5B; existing persisted records are untouched.
    const theme = ref(window.VLexLearningStore?.getSection('preferences', {}).theme || 'petroleum');
    const learningRevision = ref(0), explainSource = ref(''), explainKey = ref(0);
    const learningStatus = computed(() => { learningRevision.value; return window.VLexLearningStore?.status() || { mode: 'protected', message: 'التخزين الجديد غير متاح', persistent: false }; });
    let learningUnsubscribe = null;
    // Vue compiles the mount element's contents; sync attributes on the mount itself.
    watch([theme, appMode, practiceSurface], ([appearance, mode, surface]) => {
      const root = document.getElementById('app');
      root?.setAttribute('data-theme', appearance);
      root?.setAttribute('data-workspace', mode === 'practice' && surface === 'training' ? 'training' : mode);
    }, { immediate: true, flush: 'sync' });
    const foundationSection = ref(savedNavigation.section || 'projects');
    watch([appMode,foundationSection],([workspace,section])=>{if(workspace!=='practice')window.VLexLearningStore?.setSection('navigation',{...window.VLexLearningStore.getSection('navigation',{}),workspace,section});},{flush:'sync'});
    const foundationSections = [
      { id: 'projects', title: 'المشاريع', icon: 'folder', description: 'مشاريعك المحلية ومهامها، مع مسار عملي لبناء مدير مهام.' },
      { id: 'kanban', title: 'لوحة المهام', icon: 'grid', description: 'رتب مهامك بين قيد الانتظار والعمل والمنجزة.' },
      { id: 'notes', title: 'الملاحظات', icon: 'note', description: 'اكتب ملاحظاتك وعدّلها واحتفظ بها محليًا.' },
      { id: 'calendar', title: 'التقويم', icon: 'calendar', description: 'مواعيدك وتواريخ مهامك، دون اشتراك أو مزامنة خارجية.' },
      { id: 'explain', title: 'شرح الأكواد', icon: 'code', description: 'شرح محلي للبنية والكلمات والرموز المعروفة، مع توضيح الحدود.' }
    ];
    const activeFoundation = computed(() => foundationSections.find(s => s.id === foundationSection.value));
    function openFoundation(id) {
      if (id === 'explain') { openLearning('explain'); return; }
      if (!foundationSections.some(s => s.id === id)) return;
      foundationSection.value = id;
      setAppMode('foundation');
    }
    function setTheme(value) {
      if (!['petroleum', 'light', 'purple', 'green', 'glass'].includes(value)) return;
      theme.value = value;
      const store = window.VLexLearningStore;
      if (store && !store.setSection('preferences', { ...store.getSection('preferences', {}), theme: value })) triggerToast(store.status().message, 'warning');
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
    const savedDictionary=window.VLexLearningStore?.getSection('dictionary',{})||{};
    const selectedTerm = ref(rawLexiconData.value.find(t=>t.id===savedDictionary.selectedId)||rawLexiconData.value[0]||null);
    const searchQuery = ref('');
    const searchFocused = ref(false);
    const searchInputRef = ref(null);
    const highlightedDropdownIndex = ref(0);
    watch(searchQuery, () => { highlightedDropdownIndex.value = 0; }, { flush: 'sync' });
    const showShortcutsModal = ref(false);
    const showProgressModal = ref(false);
    const activeCodeFormat = ref(savedDictionary.format||'vue'); // 'vue' | 'vanilla'

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

    // Separate local exploration drafts never replace audited sources or lesson drafts.
    const dictionaryTab = ref('meaning');
    const dictionaryEdits = ref(savedDictionary.drafts||{});
    const dictionarySaveWarning=ref('');
    watch([dictionaryEdits,selectedTerm,activeCodeFormat],()=>{if(window.VLexLearningStore){const ok=window.VLexLearningStore.setSection('dictionary',{drafts:dictionaryEdits.value,selectedId:selectedTerm.value?.id||'',format:activeCodeFormat.value});dictionarySaveWarning.value=ok?'':'تعذر حفظ مسودة القاموس؛ تبقى في هذه الجلسة. نزّل بيانات الاسترجاع قبل الإغلاق.'}},{deep:true,flush:'sync'});
    const dictionaryEditorKey = computed(() => (selectedTerm.value?.id || '') + ':' + activeCodeFormat.value);
    const dictionaryEditorCode = computed(() => Object.hasOwn(dictionaryEdits.value, dictionaryEditorKey.value)
      ? dictionaryEdits.value[dictionaryEditorKey.value] : currentCode.value);
    const dictionaryEditorChanged = computed(() => dictionaryEditorCode.value !== currentCode.value);
    const dictionaryAudit = computed(() => {
      const code = dictionaryEditorCode.value;
      const record = window.VLexDictionaryAudit?.terms[selectedTerm.value?.id]?.[activeCodeFormat.value === 'vanilla' ? 'vanilla' : 'vue'];
      if (!record) return { status: 'لم يُتحقق منه بعد', reason: 'شغّل المثال واقرأ نتيجته الفعلية؛ الجاهزية ليست إثباتًا للفهم أو الصحة.' };
      let fingerprint = 2166136261;
      for (let i = 0; i < code.length; i++) fingerprint = Math.imul(fingerprint ^ code.charCodeAt(i), 16777619);
      if ((fingerprint >>> 0).toString(16) !== record.fingerprint) return { status: 'نسخة معدلة', reason: 'تغير المصدر منذ الفحص المسجل؛ لا تنطبق نتيجة النسخة الأصلية تلقائيًا.' };
      return record;
    });

    function updateDictionaryEditor(event) {
      dictionaryEdits.value = { ...dictionaryEdits.value, [dictionaryEditorKey.value]: event.target.value };
    }
    function handleDictionaryTabKeydown(event, id) {
      const tabs = ['meaning', 'example', 'usage', 'compare', 'pitfalls'];
      let index = tabs.indexOf(id);
      if (event.key === 'ArrowLeft') index = (index + 1) % tabs.length;
      else if (event.key === 'ArrowRight') index = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = tabs.length - 1;
      else return;
      event.preventDefault();
      dictionaryTab.value = tabs[index];
      nextTick(() => document.getElementById('dictionary-tab-' + tabs[index])?.focus());
    }
    function resetDictionaryEditor() {
      const next = { ...dictionaryEdits.value };
      delete next[dictionaryEditorKey.value];
      dictionaryEdits.value = next;
    }
    watch(() => selectedTerm.value?.id, () => { dictionaryTab.value = 'meaning'; });

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
      if (!['home', 'lexicon', 'practice', 'training', 'quiz', 'settings', 'foundation', 'explain', 'course', 'arrow', 'cssLab', 'jsLab'].includes(mode)) return;
      if (mode === 'training' || mode === 'practice' || mode === 'quiz') {
        const surface = mode === 'training' ? 'training' : 'simulator';
        if (practiceSurface.value !== surface) stopPracticeExecution();
        practiceSurface.value = surface;
      }
      appMode.value = ['quiz', 'training'].includes(mode) ? 'practice' : mode;
      if (mode === 'arrow') window.history?.replaceState?.(null, '', '#arrow-functions');
      else if (window.location?.hash === '#arrow-functions') window.history?.replaceState?.(null, '', window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, behavior: 'instant' });
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
    const savedSimulatorLesson=(window.PRACTICE_CURRICULUM?.lessons||[]).find(l=>l.id===savedNavigation.simulatorLesson);
    const selectedTrack = ref(savedSimulatorLesson?.track||null); // null = Track Selection View ("وش تحب تتدرّب اليوم؟")
    const selectedLessonId = ref(savedSimulatorLesson?.id||'JS-101');
    watch(selectedLessonId,id=>{const store=window.VLexLearningStore;if(store)store.setSection('navigation',{...store.getSection('navigation',{}),simulatorLesson:id});},{flush:'sync'});
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
    // Receipt history in the parent: these events are not a line/variable trace.
    const techRunEvents = ref([]);
    const techSignalFacts = ref({ runId: null });
    const techLatestError = ref(null);
    const techEvidenceRevision = ref(sourceRevision);
    let techEventSequence = 0;
    function recordTechRunEvent(type, session, detail = '') {
      // Keep current-session facts even when the bounded history evicts old entries.
      if (type === 'submitted' && session) techSignalFacts.value = { runId: session.runId, submitted: true };
      else if (session && techSignalFacts.value.runId === session.runId &&
          ['preview_ready', 'dom_snapshot', 'execution_error'].includes(type)) {
        techSignalFacts.value = { ...techSignalFacts.value, [type]: true };
      }
      const labels = {
        submitted: 'إرسال المصدر إلى إطار جديد',
        preview_ready: 'وصول إشعار جاهزية الإطار',
        dom_snapshot: 'وصول لقطة DOM مطابقة',
        execution_error: 'وصول خطأ من الإطار',
        invalidated: 'إبطال جلسة سابقة',
        source_changed: 'تغير المصدر بعد التشغيل',
        stopped: 'إيقاف وإعادة ضبط الإطار',
        rejected: 'رفض المصدر قبل التشغيل'
      };
      techRunEvents.value = [...techRunEvents.value, {
        sequence: ++techEventSequence, type, label: labels[type] || type,
        // Wall-clock receipt time, never presented as execution duration.
        recordedAt: new Date().toISOString(),
        runId: session?.runId ?? null,
        lessonId: session?.lessonId ?? currentLesson.value?.id ?? null,
        sourceRevision: session?.sourceRevision ?? sourceRevision,
        detail
      }].slice(-120);
    }
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
        if(window.VLexFullBackup)window.VLexFullBackup.validateLegacy(userDataPayload(),dataSchema);else dataSchema.parseImport(JSON.stringify(userDataPayload()));
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
      if (event.isComposing || event.keyCode === 229) return;
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
      techEvidenceRevision.value = sourceRevision;
      if (activeRun.value) recordTechRunEvent('source_changed', activeRun.value, 'المعاينة الحالية تخص النسخة المرسلة سابقًا؛ التعديل لا يعيد التشغيل وحده.');
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
      if (activeRun.value) recordTechRunEvent('invalidated', activeRun.value, 'بدأ طلب تشغيل جديد؛ لن تُقبل رسائل الجلسة السابقة.');
      techLatestError.value = null;
      activeRun.value = null; // Invalidate the old session before replacing its frame.
      practiceLogs.value = [];
      if (!currentLesson.value || typeof code !== 'string') return;
      if (window.VueLexiconData.bytes(code) > window.VueLexiconData.MAX_DRAFT_BYTES) {
        stopPracticeExecution();
        recordTechRunEvent('rejected', null, 'تجاوز النص حد التشغيل؛ لم يُرسل ولم يُقص.');
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
      recordTechRunEvent('submitted', session, kind === 'reference' ? 'أُرسل المثال المرجعي دون استبدال المسودة.' : 'أُرسلت نسخة المسودة الحالية؛ تشغيلها داخل الإطار فقط.');
      addPracticeLog('info', kind === 'reference' ? 'تعمل معاينة المثال المرجعي؛ مسودتك لم تتغير.' : 'أُرسلت نسخة مسودتك الحالية إلى إطار معزول جديد.');
    }

    function stopPracticeExecution() {
      cancelAutoRun();
      recordTechRunEvent('stopped', activeRun.value, 'أُعيد تركيب إطار فارغ وأُبطلت هوية الجلسة؛ لا ضمان لمقاطعة حلقة تحجب المتصفح.');
      techSignalFacts.value = { runId: null };
      techLatestError.value = null;
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

    // An independent dictionary session uses the same opaque-frame protocol.
    // It cannot write into a practice draft or borrow a simulator run's identity.
    const dictionaryPreviewRef = ref(null);
    const dictionaryPreviewKey = ref(0);
    const dictionaryPreviewState = ref('ready');
    const dictionaryPreviewLogs = ref([]);
    const dictionaryPreviewDoc = ref('<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><body style="background:#071416;color:#cbd5e1;font-family:system-ui;padding:24px">شغّل المثال لعرضه هنا. الكود الناقص أو غير المدعوم سيظهر بتشخيصه الأصلي.</body></html>');
    const dictionaryPreviewSession = ref(null);
    const dictionaryPreviewStale = computed(() => !!dictionaryPreviewSession.value && dictionaryPreviewSession.value.code !== dictionaryEditorCode.value);
    let dictionaryRunSequence = 0;
    function addDictionaryLog(type, msg) {
      dictionaryPreviewLogs.value.unshift({ type, msg });
      dictionaryPreviewLogs.value = dictionaryPreviewLogs.value.slice(0, 30);
    }
    function stopDictionaryPreview() {
      dictionaryPreviewSession.value = null;
      dictionaryPreviewState.value = 'stopped';
      dictionaryPreviewLogs.value = [];
      dictionaryPreviewDoc.value = '<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><body style="background:#071416;color:#cbd5e1;font-family:system-ui;padding:24px">المعاينة متوقفة. اضغط تشغيل المثال لفتح جلسة معزولة جديدة.</body></html>';
      dictionaryPreviewKey.value++;
    }
    function runDictionaryPreview() {
      if (!selectedTerm.value || appMode.value !== 'lexicon') return;
      stopDictionaryPreview();
      const code = dictionaryEditorCode.value;
      if (window.VueLexiconData.bytes(code) > window.VueLexiconData.MAX_DRAFT_BYTES) {
        dictionaryPreviewState.value = 'error';
        addDictionaryLog('error', 'النص أكبر من حد التشغيل 128 KiB؛ بقي كاملًا في المحرر ولم يُقص.');
        return;
      }
      const selected = window.VueLexiconRunner.selectDictionaryExample(selectedTerm.value, activeCodeFormat.value);
      if (!selected) { dictionaryPreviewState.value = 'error'; addDictionaryLog('error', 'لا يوجد مثال مدعوم في هذا التبويب.'); return; }
      const session = {
        runId: 'dictionary-' + Date.now() + '-' + (++dictionaryRunSequence) + '-' + Math.random().toString(36).slice(2),
        lessonId: selectedTerm.value.id, code, received: 0, previewReady: false
      };
      dictionaryPreviewSession.value = session;
      const localAsset = path => new URL(path, document.baseURI).href;
      try {
        dictionaryPreviewDoc.value = window.VueLexiconRunner.buildDictionaryDocument({ ...selected, code }, session, {
          vueRuntimeUrl: localAsset('assets/vendor/vue-3.4.21.global.prod.js'),
          vueCompilerUrl: localAsset('assets/vendor/compiler-sfc-3.4.21.global.min.js'),
          previewCssUrl: localAsset('assets/tailwind-3.4.17.min.css'),
          dictionaryAdapterUrl: localAsset('dictionary-preview.js')
        });
        dictionaryPreviewKey.value++;
        dictionaryPreviewState.value = 'running';
      } catch (error) {
        dictionaryPreviewSession.value = null;
        dictionaryPreviewState.value = 'error';
        addDictionaryLog('error', String(error.message || error));
      }
    }
    function handleDictionaryMessage(event) {
      const session = dictionaryPreviewSession.value;
      const message = window.VueLexiconRunner.validateMessage(event, dictionaryPreviewRef.value?.contentWindow, session);
      if (!message || appMode.value !== 'lexicon' || session.lessonId !== selectedTerm.value?.id || session.received >= 2000) return;
      session.received++;
      if (message.type === 'CONSOLE_LOG') addDictionaryLog(message.payload.level, message.payload.msg);
      else if (message.type === 'EXECUTION_ERROR') {
        dictionaryPreviewState.value = 'error';
        addDictionaryLog('error', message.payload.msg);
      } else if (message.type === 'PREVIEW_READY') {
        session.previewReady = true;
        if (dictionaryPreviewState.value === 'running') dictionaryPreviewState.value = 'preview_ready';
      }
    }
    watch([selectedTerm, activeCodeFormat], () => {
      if (dictionaryPreviewSession.value) stopDictionaryPreview();
    }, { flush: 'sync' });
    watch(appMode, (mode, previous) => {
      if (previous === 'lexicon' && mode !== 'lexicon') stopDictionaryPreview();
    }, { flush: 'sync' });

    // A sandbox origin of "null" is not identity. Match WindowProxy AND session.
    function handleWindowMessage(e) {
      handleDictionaryMessage(e);
      const session = activeRun.value;
      const message = window.VueLexiconRunner.validateMessage(e, practiceIframeRef.value?.contentWindow, session);
      if (!message || session.lessonId !== currentLesson.value?.id || session.received >= 2000) return;
      session.received++;
      const { type, payload } = message;
      if (type === 'CONSOLE_LOG') {
        addPracticeLog(payload.level, payload.msg);
      } else if (type === 'PREVIEW_READY') {
        recordTechRunEvent('preview_ready', session, 'أرسل الإطار إشعار الجاهزية؛ قد تستمر الأحداث والمؤقتات.');
        session.previewReady = true;
        // A late load notification can never erase a runtime error.
        if (executionState.value === 'running') executionState.value = 'preview_ready';
      } else if (type === 'DOM_SNAPSHOT') {
        if (session.sourceRevision === sourceRevision &&
            (session.kind === 'reference' || session.code === practiceCode.value)) {
          lastDomSnapshot.value = payload;
          recordTechRunEvent('dom_snapshot', session, 'نصوص الصفحة والعدادات المحدودة أُرسلت من الإطار المعزول لهذه النسخة.');
        }
      } else if (type === 'EXECUTION_ERROR') {
        techLatestError.value = {
          runId: session.runId, lessonId: session.lessonId, sourceRevision: session.sourceRevision,
          message: payload.msg, documentLine: payload.lineno > 0 ? payload.lineno : null,
          locationNote: payload.lineno > 0 ? 'السطر داخل مستند المعاينة المولّد، وقد يشمل تمهيد المشغّل؛ ليس موضعًا مؤكدًا في المحرر.' : 'لم يوفّر المتصفح موضعًا صالحًا للخطأ.'
        };
        recordTechRunEvent('execution_error', session, payload.msg);
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
    const techCurrentRunEvents = computed(() => activeRun.value
      ? techRunEvents.value.filter(event => event.runId === activeRun.value.runId) : []);
    const techErrorIsCurrent = computed(() => !!techLatestError.value &&
      techLatestError.value.runId === activeRun.value?.runId &&
      techLatestError.value.lessonId === currentLesson.value?.id &&
      techLatestError.value.sourceRevision === techEvidenceRevision.value);
    const techDOMFields = computed(() => {
      const snapshot = simulatorObservation.value;
      if (!snapshot) return [];
      return [
        { key: 'bodyText', label: 'النص الظاهر في body', kind: 'text', value: snapshot.bodyText },
        { key: 'cardText', label: 'نص العنصر #card', kind: 'text', value: snapshot.cardText },
        { key: 'appViewText', label: 'نص العنصر #app-view', kind: 'text', value: snapshot.appViewText },
        { key: 'outputText', label: 'نص العنصر #output', kind: 'text', value: snapshot.outputText ?? '' },
        { key: 'cardsContainerCount', label: 'أبناء #cards-container', kind: 'count', value: snapshot.cardsContainerCount },
        { key: 'cardElementsCount', label: 'العناصر ذات الصنف .card', kind: 'count', value: snapshot.cardElementsCount }
      ];
    });
    const techStageSignals = computed(() => {
      const session = activeRun.value;
      const has = type => !!session && techSignalFacts.value.runId === session.runId && techSignalFacts.value[type] === true;
      return [
        { id: 'source', icon: '</>', label: 'نسخة المصدر', state: has('submitted') ? 'received' : 'pending', detail: session ? (session.kind === 'reference' ? 'مثال مرجعي مرسل' : 'نسخة المسودة المرسلة') : 'لم تُرسل نسخة بعد' },
        { id: 'sent', icon: '↗', label: 'إرسال إلى الإطار', state: has('submitted') ? 'received' : 'pending', detail: has('submitted') ? 'سجل التطبيق إرسال مستند جديد' : 'بانتظار تشغيل يدوي أو تلقائي مفعّل' },
        { id: 'ready', icon: '◇', label: 'إشعار الجاهزية', state: has('execution_error') ? 'error' : has('preview_ready') ? 'received' : 'pending', detail: has('execution_error') ? 'وصل خطأ؛ راجع الرسالة الفعلية' : has('preview_ready') ? 'وصل PREVIEW_READY من الإطار' : 'لم يصل إشعار جاهزية' },
        { id: 'observation', icon: '◉', label: 'لقطة DOM', state: simulatorObservation.value && has('dom_snapshot') ? 'received' : 'pending', detail: simulatorObservation.value ? 'بيانات محدودة من الصفحة لهذه النسخة' : 'لا توجد لقطة مطابقة للمصدر الحالي' }
      ];
    });
    const techTraceLimitation = 'لا يدعم المشغّل الحالي تتبعًا عامًا لقيم المتغيرات أو تنفيذ الأسطر. المراحل إشارات جلسة حقيقية، وليست تحليلًا لمسارات الكود أو قياسًا لمدته.';
    const techFlowSummary = computed(() => {
      const session = activeRun.value;
      if (!session) return executionState.value === 'stopped'
        ? 'أُوقفت المعاينة وأُبطلت الجلسة. شغّل الكود لبدء اتصال جديد.'
        : 'اكتب أو اختر مثالًا، ثم شغّله. ستضيء المراحل عند استلام إشاراته الفعلية.';
      if (session.sourceRevision !== techEvidenceRevision.value) return 'تغيّر المصدر بعد التشغيل؛ هذه إشارات النسخة السابقة. شغّل التعديل لتحديث النتيجة.';
      if (executionState.value === 'error') return 'أبلغ الإطار عن خطأ. راجع Console ورسالة الخطأ؛ الجاهزية لا تعني صحة البرنامج.';
      if (simulatorObservation.value) return 'وصلت جاهزية الإطار ولقطة صفحته. جرّب التفاعل في المعاينة؛ اللقطة تتحدث عند تغير DOM.';
      return 'أُرسلت نسخة معزولة. ننتظر إشارات الإطار؛ لا نستنتج خطوات أو قيمًا من الكود.';
    });

    // Visual workbench controls are session-only and never touch drafts or sessions.
    const simulatorReferenceReading = ref(false);
    const simulatorExpandedPanel = ref('');
    const simulatorEditorShare = ref(55);
    function toggleSimulatorPanel(panel) {
      if (!['editor', 'preview'].includes(panel)) return;
      simulatorExpandedPanel.value = simulatorExpandedPanel.value === panel ? '' : panel;
    }
    const simulatorStages = computed(() => {
      const session = activeRun.value;
      return [
        { id: 'source', icon: '</>', label: 'مصدر الكود', detail: session?.kind === 'reference' ? 'نسخة المثال المرجعي' : 'مسودة المحرر', state: 'received' },
        { id: 'sent', icon: '↗', label: 'إرسال نسخة معزولة', detail: session ? 'أُرسلت نسخة إلى إطار المعاينة' : 'لم تبدأ جلسة تشغيل', state: session ? 'received' : 'pending' },
        { id: 'ready', icon: '◇', label: 'جاهزية المعاينة', detail: executionState.value === 'error' ? 'راجع الخطأ الفعلي في Console' : session?.previewReady ? 'استُقبل إشعار الجاهزية من الإطار' : 'بانتظار إشعار الإطار', state: executionState.value === 'error' ? 'error' : session?.previewReady ? 'received' : 'pending' },
        { id: 'observation', icon: '◉', label: 'ملاحظة الصفحة', detail: simulatorObservation.value ? 'وصلت لقطة DOM لهذه النسخة' : 'لا توجد لقطة مطابقة للمصدر الحالي', state: simulatorObservation.value ? 'received' : 'pending' }
      ];
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

    // Presentation state only. All execution still uses the unchanged simulator.
    const techPreviewTab = ref('result');
    const techEditorView = ref('draft');
    const techFocusPanel = ref('');
    const techMotion = ref(true);
    const techSource = computed(() => submittedPracticeCode.value ?? practiceCode.value);
    const techEditorCode = computed(() => techBlockView.value.code);
    const techHighlightedCode = computed(() => highlightCode(techEditorCode.value, techLanguage.value === 'css' ? 'css' : techLanguage.value === 'js' ? 'javascript' : 'xml'));
    const techSourceCSS = computed(() => window.VueLexiconSimulatorBeta.inspectBlocks(techSource.value, 'css').code);
    const techStatusLabel = computed(() => ({ ready: 'بانتظار التشغيل', running: 'جارٍ التشغيل', preview_ready: 'المعاينة جاهزة', error: 'خطأ في التشغيل', stopped: 'متوقفة' }[executionState.value] || 'بانتظار التشغيل'));
    function techRunReference(event) {
      techPrepareRunSound(event);
      techEditorView.value = 'submitted';
      techPreviewTab.value = 'result';
      runSimulatorReference();
    }
    function techRunDraft(event) { techPrepareRunSound(event); techEditorView.value = 'draft'; techPreviewTab.value = 'result'; runPracticeCode(); }
    function techSyncEditorScroll(event) {
      const surface = event.target.closest('.tech-code-surface');
      const mirror = surface?.querySelector('.tech-highlight');
      if (mirror && mirror !== event.target) { mirror.scrollTop = event.target.scrollTop; mirror.scrollLeft = event.target.scrollLeft; }
      const gutter = surface?.querySelector('.tech-line-numbers');
      if (gutter) gutter.scrollTop = event.target.scrollTop;
    }
    function techJumpToScript() {
      const code = techEditorCode.value;
      const start = code.search(/<script\b/i);
      if (start < 0) return;
      const line = code.slice(0, start).split('\n').length - 1;
      nextTick(() => {
        const surface = document.querySelector('.tech-code-surface');
        const editor = surface?.querySelector(!techEditorReadonly.value ? 'textarea' : '.tech-reference-code');
        if (editor) { editor.scrollTop = Math.max(0, line * 22 - 12); techSyncEditorScroll({ target: editor }); }
      });
    }
    function techToggleFocus(panel) {
      if (!['editor', 'preview'].includes(panel)) return;
      techBeta.setPanelVisible(panel, true);
      techFocusPanel.value = techFocusPanel.value === panel ? '' : panel;
    }

    // S3: session layout and strict, separate simulator preferences.
    const techBeta = window.VueLexiconSimulatorBeta.createController({
      Vue, storage: { getItem: key => {if(window.VLexFullBackupRecovery?.blocked)throw Error('استرجاع معلق');return localStorage.getItem(key)}, setItem: (key, value) => {window.VLexFullBackup?.assertWritable(localStorage,key);localStorage.setItem(key, value)} },
      isActive: () => appMode.value === 'practice' && practiceSurface.value === 'simulator'
    });
    const betaMuted = techBeta.muted, betaVolume = techBeta.volume, betaAudioStatus = techBeta.audioStatus;
    const betaAmbientEnabled = techBeta.ambientEnabled, betaAmbientVolume = techBeta.ambientVolume, betaAmbientStatus = techBeta.ambientStatus;
    const betaAmbientLabel = computed(() => ({ off: 'متوقف', playing: 'يعمل بهدوء', silent: 'المستوى صفر', paused: 'متوقف مؤقتًا', 'gesture-required': 'بانتظار التفعيل', unsupported: 'غير متاح', error: 'تعذر التفعيل', closed: 'مغلق' }[betaAmbientStatus.value] || 'متوقف'));
    const betaWarnings = techBeta.warnings, betaStorageStatus = techBeta.storageStatus;
    const techLanguage = ref('source');
    const techViewport = ref('desktop');
    const techEditorHeight = ref(412), techPreviewHeight = ref(586), techEditorWidth = ref(36);
    const techHiddenPanels = techBeta.hiddenPanels;
    const techBlockView = computed(() => window.VueLexiconSimulatorBeta.inspectBlocks(techEditorView.value === 'submitted' ? techSource.value : practiceCode.value, techLanguage.value));
    const techEditorReadonly = computed(() => techEditorView.value === 'submitted' || !techBlockView.value.editable);
    const techAnyHidden = computed(() => techHiddenPanels.value.length > 0);
    const techCustomWidth = ref(1024), techCustomHeight = ref(640), techPreviewZoom = ref(1);
    const techDimensionDraft = ref({ width: 1024, height: 640 }), techDimensionError = ref('');
    const techConsoleHeight = ref(162), techCompactPanel = ref('editor');
    const savedLayout=window.VLexLearningStore?.getSection('simulatorLayout',{})||{};
    if(savedLayout.version===1){for(const[key,field]of Object.entries({editorHeight:techEditorHeight,previewHeight:techPreviewHeight,editorWidth:techEditorWidth,consoleHeight:techConsoleHeight,customWidth:techCustomWidth,customHeight:techCustomHeight,zoom:techPreviewZoom,language:techLanguage,viewport:techViewport,compactPanel:techCompactPanel,previewTab:techPreviewTab}))if(Object.hasOwn(savedLayout,key))field.value=savedLayout[key];for(const panel of savedLayout.hiddenPanels||[])techBeta.setPanelVisible(panel,false);techDimensionDraft.value={width:techCustomWidth.value,height:techCustomHeight.value};}
    watch([techEditorHeight,techPreviewHeight,techEditorWidth,techConsoleHeight,techCustomWidth,techCustomHeight,techPreviewZoom,techLanguage,techViewport,techCompactPanel,techPreviewTab,techHiddenPanels],()=>{window.VLexLearningStore?.setSection('simulatorLayout',{version:1,editorHeight:techEditorHeight.value,previewHeight:techPreviewHeight.value,editorWidth:techEditorWidth.value,consoleHeight:techConsoleHeight.value,customWidth:techCustomWidth.value,customHeight:techCustomHeight.value,zoom:techPreviewZoom.value,language:techLanguage.value,viewport:techViewport.value,compactPanel:techCompactPanel.value,previewTab:techPreviewTab.value,hiddenPanels:techHiddenPanels.value});},{deep:true,flush:'sync'});
    const techDragging = ref('');
    const techPreviewWidth = computed(() => techViewport.value === 'custom' ? techCustomWidth.value + 'px'
      : ({ desktop: '100%', tablet: '768px', mobile: '390px' }[techViewport.value] || '100%'));
    const techPreviewCanvasStyle = computed(() => techViewport.value === 'custom'
      ? { width: techCustomWidth.value + 'px', height: techCustomHeight.value + 'px', transform: 'scale(' + techPreviewZoom.value + ')' }
      : { width: techPreviewWidth.value, height: '100%' });
    const techPreviewCarrierStyle = computed(() => techViewport.value === 'custom'
      ? { width: techCustomWidth.value * techPreviewZoom.value + 'px', height: techCustomHeight.value * techPreviewZoom.value + 'px' }
      : { width: techPreviewWidth.value, height: '100%' });
    function techPanelVisible(panel) { return !techHiddenPanels.value.includes(panel); }
    function techSetPanel(panel, visible) { techBeta.setPanelVisible(panel, visible); techFocusPanel.value = ''; }
    function techResetLayout() {
      techBeta.resetLayout(); techFocusPanel.value = ''; techEditorHeight.value = 412; techPreviewHeight.value = 586; techEditorWidth.value = 36;
      techConsoleHeight.value = 162; techCompactPanel.value = 'all'; techEndResize();
    }
    function techSelectCompact(panel) {
      if (!['all', 'editor', 'stages', 'preview', 'console'].includes(panel)) return;
      techCompactPanel.value = panel; techFocusPanel.value = '';
      if (panel !== 'all') techBeta.setPanelVisible(panel, true);
      nextTick(() => document.querySelector('.final-compact-tabs')?.scrollIntoView({ block: 'start', behavior: 'auto' }));
    }
    function techSetViewport(device) {
      if (!['desktop', 'tablet', 'mobile'].includes(device)) return;
      techViewport.value = device; techPreviewZoom.value = 1; techDimensionError.value = '';
    }
    function techApplyDimensions() {
      const width = Number(techDimensionDraft.value.width), height = Number(techDimensionDraft.value.height);
      if (!Number.isInteger(width) || width < 240 || width > 1920 || !Number.isInteger(height) || height < 160 || height > 1200) {
        techDimensionError.value = 'العرض من240 إلى1920، والارتفاع من160 إلى1200 بكسل صحيح. لم يتغير المقاس.'; return false;
      }
      techCustomWidth.value = width; techCustomHeight.value = height; techPreviewZoom.value = 1;
      techViewport.value = 'custom'; techDimensionError.value = ''; return true;
    }
    function techCaptureViewport() {
      if (techViewport.value !== 'custom' && practiceIframeRef.value) {
        techCustomWidth.value = Math.max(240, Math.round(practiceIframeRef.value.clientWidth));
        techCustomHeight.value = Math.max(160, Math.round(practiceIframeRef.value.clientHeight));
        techDimensionDraft.value = { width: techCustomWidth.value, height: techCustomHeight.value };
      }
      techViewport.value = 'custom';
    }
    function techZoomPreview(delta) {
      if (!Number.isFinite(delta)) return;
      techPreviewTab.value = 'result';
      nextTick(() => {
        techCaptureViewport();
        techPreviewZoom.value = Math.min(1.5, Math.max(0.1, Math.round((techPreviewZoom.value + delta) * 10) / 10));
      });
    }
    function techFitPreview() {
      techPreviewTab.value = 'result';
      nextTick(() => {
        techCaptureViewport();
        const holder = document.querySelector('.beta-device-scroll');
        if (!holder) return;
        techPreviewZoom.value = Math.min(1.5, Math.max(0.1, Math.floor(Math.min(holder.clientWidth / techCustomWidth.value,
          holder.clientHeight / techCustomHeight.value) * 100) / 100));
      });
    }
    const techResizeLimits = { editor: [340, 650, 10], preview: [400, 740, 10], console: [100, 360, 10], width: [29, 44, 1] };
    const techResizeRefs = { editor: techEditorHeight, preview: techPreviewHeight, console: techConsoleHeight, width: techEditorWidth };
    function techResizeValue(kind, value) {
      const limits = techResizeLimits[kind];
      if (!limits || !Number.isFinite(value)) return;
      techResizeRefs[kind].value = Math.min(limits[1], Math.max(limits[0], Math.round(value)));
    }
    let techDrag = null, techDragFrame = null;
    function techBeginResize(event, kind) {
      if (!techResizeLimits[kind] || event.button !== 0 || !event.isPrimary) return;
      event.preventDefault();
      techEndResize();
      const grid = event.currentTarget.closest('.tech-main-grid');
      techDrag = { kind, pointerId: event.pointerId, target: event.currentTarget, x: event.clientX, y: event.clientY,
        initial: techResizeRefs[kind].value, width: grid?.clientWidth || 1, next: techResizeRefs[kind].value };
      techDragging.value = kind;
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
    function techMoveResize(event) {
      if (!techDrag || event.pointerId !== techDrag.pointerId) return;
      const drag = techDrag;
      drag.next = drag.initial + (drag.kind === 'width' ? (event.clientX - drag.x) / drag.width * 100 : event.clientY - drag.y);
      if (techDragFrame !== null) return;
      techDragFrame = requestAnimationFrame(() => {
        techDragFrame = null;
        if (techDrag === drag) techResizeValue(drag.kind, drag.next);
      });
    }
    function techEndResize(event) {
      if (event && techDrag && event.pointerId !== undefined && event.pointerId !== techDrag.pointerId) return;
      const drag = techDrag; techDrag = null; techDragging.value = '';
      if (techDragFrame !== null) { cancelAnimationFrame(techDragFrame); techDragFrame = null; }
      if (drag) {
        techResizeValue(drag.kind, drag.next);
        try { if (drag.target.hasPointerCapture?.(drag.pointerId)) drag.target.releasePointerCapture(drag.pointerId); } catch (_) {}
      }
    }
    function techResizeKey(event, kind) {
      const limits = techResizeLimits[kind];
      if (!limits || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;
      let value = techResizeRefs[kind].value;
      if (event.key === 'Home') value = limits[0];
      else if (event.key === 'End') value = limits[1];
      else if (['ArrowRight', 'ArrowDown'].includes(event.key)) value += limits[2];
      else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) value -= limits[2];
      else return;
      event.preventDefault(); event.stopPropagation(); techResizeValue(kind, value);
    }
    const techSelectedStage = ref('source');
    const techStageExplanations = {
      source: 'هذه نسخة المصدر التي أُرسلت آخر مرة، لا تحليلًا لأسطره. تشغيل المرجع لا يستبدل مسودة الدرس.',
      sent: 'يُنشئ المشغّل مستندًا داخل iframe معزول بصلاحية allow-scripts فقط. لا ينفذ كودك في التطبيق الأم.',
      ready: 'إشعار PREVIEW_READY يعني وصول جاهزية الإطار. لا يثبت صحة منطق البرنامج أو انتهاء جميع المؤقتات؛ الخطأ المبلغ يظل ظاهرًا.',
      error: 'هذا الفرع يضيء فقط عند وصول EXECUTION_ERROR من الإطار المطابق. قد يصل خطأ بعد إشعار الجاهزية؛ ليس تحليلًا لشرط if/else أو مسار بديل مفترض.',
      observation: 'نصوص وعدّادات DOM محدودة استلمناها من الإطار المطابق. ليست شجرة كاملة أو قيم متغيرات أو تتبع أسطر.'
    };
    const techStageExplanation = computed(() => techStageExplanations[techSelectedStage.value]);
    function techSelectStage(stage) { if (Object.hasOwn(techStageExplanations, stage)) techSelectedStage.value = stage; }
    // A bounded session journal of real attempts, separate from educational progress.
    const techAttempts = ref([]);
    const techActivityWindow = ref(10);
    const techVisibleAttempts = computed(() => techAttempts.value.slice(-techActivityWindow.value));
    const techActivity = computed(() => ({ total: techVisibleAttempts.value.length,
      ready: techVisibleAttempts.value.filter(a => a.ready && !a.error).length,
      errors: techVisibleAttempts.value.filter(a => a.error).length,
      pending: techVisibleAttempts.value.filter(a => !a.ready && !a.error).length }));
    const techReadyRatio = computed(() => techActivity.value.total ? Math.round(techActivity.value.ready / techActivity.value.total * 100) : 0);
    const techAttemptChart = computed(() => {
      let readyCount = 0;
      const rows = techVisibleAttempts.value.map((attempt, index) => ({ ...attempt,
        x: 30 + index * (520 / Math.max(1, techVisibleAttempts.value.length)),
        index: index + 1, readyCount: (readyCount += attempt.ready && !attempt.error ? 1 : 0) }));
      const maximum = Math.max(1, readyCount);
      return { rows, maximum, width: Math.min(26, 210 / Math.max(1, rows.length)),
        line: rows.map(row => (row.x + 12) + ',' + (144 - row.readyCount / maximum * 116)).join(' ') };
    });
    const techEventCells = computed(() => {
      const events = techRunEvents.value.slice(-60);
      return Array.from({ length: 60 }, (_, index) => events[index] || null);
    });
    function techInspectEvents() {
      nextTick(() => {
        const journal = document.querySelector('[data-testid="beta-events"]');
        if (journal) { journal.open = true; journal.scrollIntoView({ block: 'nearest', behavior: 'auto' }); }
      });
    }
    watch(techRunEvents, events => {
      const event = events[events.length - 1];
      if (!event?.runId) return;
      if (event.type === 'submitted') techAttempts.value = [...techAttempts.value, {
        id: event.runId, lessonId: event.lessonId, at: event.recordedAt, ready: false, error: false, stopped: false, message: ''
      }].slice(-100);
      else {
        const attempt = techAttempts.value.find(a => a.id === event.runId);
        if (!attempt) return;
        if (event.type === 'preview_ready') attempt.ready = true;
        if (event.type === 'execution_error') { attempt.error = true; attempt.message = event.detail; }
        if (['stopped', 'invalidated'].includes(event.type)) attempt.stopped = true;
      }
    }, { flush: 'sync' });
    function techSetLanguage(language) {
      if (!['source', 'css', 'js'].includes(language)) return;
      techLanguage.value = language; autocompleteVisible.value = false;
    }
    function techPreviewKeydown(event) {
      const tabs = ['result', 'html', 'css', 'console'];
      const index = tabs.indexOf(techPreviewTab.value);
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;
      event.preventDefault(); event.stopPropagation();
      techPreviewTab.value = tabs[target];
      event.currentTarget.querySelectorAll('[role="tab"]')[target]?.focus();
    }
    function techUpdateEditor(event) {
      if (techEditorReadonly.value) return;
      if (techLanguage.value === 'source') handleEditorInput(event);
      else {
        const result = window.VueLexiconSimulatorBeta.updateBlock(practiceCode.value, techLanguage.value, event.target.value, techBlockView.value.code);
        if (!result.ok) { triggerToast(result.reason, 'warning'); return; }
        practiceCode.value = result.source; autocompleteVisible.value = false;
        const lines = event.target.value.slice(0, event.target.selectionStart).split('\n');
        cursorLine.value = lines.length; cursorCol.value = lines[lines.length - 1].length + 1;
      }
    }
    function techEditorKeydown(event) {
      if (event.isComposing || event.keyCode === 229) return;
      if (window.VueLexiconSimulatorBeta.actionForShortcut(event)) return;
      if (techLanguage.value === 'source') { handleEditorKeydown(event); return; }
      if (event.key === 'Tab' && !techEditorReadonly.value) {
        event.preventDefault();
        const element = event.target, start = element.selectionStart, end = element.selectionEnd;
        element.value = element.value.slice(0, start) + '  ' + element.value.slice(end);
        techUpdateEditor({ target: element });
        nextTick(() => { element.selectionStart = element.selectionEnd = start + 2; });
      }
    }
    function techToggleMotion() { techBeta.setAnimations(!techBeta.animations.value); }
    function techToggleSound(event) {
      techBeta.setMuted(!techBeta.muted.value, event);
      if (!techBeta.muted.value) void techBeta.prepareAudio(event).then(ok => { if (ok) techBeta.playCue('enabled'); });
    }
    function techToggleAmbient(event) { techBeta.setAmbientEnabled(!betaAmbientEnabled.value, event); }
    function techPrepareRunSound(event) { void techBeta.prepareAudio(event).then(ok => { if (ok) techBeta.playCue('start'); }); }
    function techStopManual() { stopPracticeExecution(); techBeta.playCue('stop'); }
    function techResetManual(event) { techPrepareRunSound(event); techEditorView.value = 'draft'; resetLessonCode(); }
    watch(techBeta.animations, value => { techMotion.value = value; }, { immediate: true, flush: 'sync' });
    watch(techRunEvents, events => {
      const event = events[events.length - 1];
      if (event?.type === 'preview_ready') techBeta.playCue('ready');
      else if (event?.type === 'execution_error') techBeta.playCue('error');
    }, { flush: 'sync' });
    watch([appMode, practiceSurface], ([mode, surface]) => { if (mode !== 'practice' || surface !== 'simulator') techBeta.silence(); }, { flush: 'sync' });
    watch([techLanguage, techEditorView], () => nextTick(() => {
      const surface = document.querySelector('.tech-code-surface');
      if (!surface) return;
      for (const element of surface.querySelectorAll('pre,textarea,.tech-line-numbers')) { element.scrollTop = 0; element.scrollLeft = 0; }
    }));

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

    const termSpeechStatus = ref('');
    let termUtterance = null;
    function speakTerm() {
      if (!selectedTerm.value) return;
      if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) { termSpeechStatus.value = 'النطق غير متاح في هذا المتصفح. الترجمة والشرح النصي متاحان.'; return; }
      const voice = window.speechSynthesis.getVoices().find(v => v.localService && /^en(?:-|_)/i.test(v.lang));
      if (!voice) { termSpeechStatus.value = 'لا يوجد صوت إنجليزي محلي جاهز. ثبّت صوتًا إنجليزيًا من إعدادات Windows ثم أعد المحاولة؛ لا نرسل المصطلح لخدمة خارجية.'; return; }
      try {
        window.speechSynthesis.cancel();
        termUtterance = new window.SpeechSynthesisUtterance(selectedTerm.value.term.replace(/[<>]/g, ''));
        termUtterance.voice = voice; termUtterance.lang = voice.lang; termUtterance.rate = 0.8;
        termUtterance.onend = () => { termSpeechStatus.value = 'انتهى النطق.'; };
        termUtterance.onerror = () => { termSpeechStatus.value = 'تعذر تشغيل الصوت المحلي؛ جرّب إعدادات الصوت في النظام.'; };
        termSpeechStatus.value = 'جارٍ النطق بالإنجليزية…'; window.speechSynthesis.speak(termUtterance);
      } catch (_) { termSpeechStatus.value = 'تعذر تشغيل الصوت المحلي.'; }
    }
    function openLearning(mode, source) {
      if (!['explain', 'course', 'arrow', 'cssLab', 'jsLab'].includes(mode)) return;
      if (mode === 'explain') { explainSource.value = typeof source === 'string' ? source : ''; explainKey.value++; }
      setAppMode(mode);
    }
    function openLearningTerm(id) {
      const term = rawLexiconData.value.find(item => item.id === id);
      if (term) { setAppMode('lexicon'); selectTerm(term); }
    }
    function openArrowPrerequisite(id) {
      const store = window.VLexLearningStore;
      if (store && window.VLexCourse.lessons.some(l => l.id === id)) {
        const course = store.getSection('course', {}); store.setSection('course', { ...course, selected: id });
      }
      learningReturnToArrow.value = true; openLearning('course');
    }
    function practiceFromLearning(payload) {
      if (!payload || typeof payload.code !== 'string' || window.VueLexiconData.bytes(payload.code) > window.VueLexiconData.MAX_DRAFT_BYTES) {
        triggerToast('مصدر التجربة غير صالح أو كبير جدًا؛ لم تتغير مسوداتك.', 'error'); return;
      }
      learningReturnToArrow.value = payload.returnTo === 'arrow';
      openSimulator(); stopPracticeExecution(); practiceAutoRun.value = false; selectTrack('js', true);
      simulatorExternalExample.value = { title: 'تجربة مسار التعلّم', code: payload.code, type: payload.type === 'vue' ? 'vue' : 'html', legacyClosers: false };
      simulatorReferenceVisible.value = true;
      triggerToast('تجربتك محفوظة في المثال المرجعي؛ اقرأها ثم اضغط تشغيل المرجع لتجربتها. مسودة الدرس لم تتغير.', 'info');
    }
    function navigateLearningSection(section) {
      if (['projects', 'kanban', 'notes', 'calendar'].includes(section)) openFoundation(section);
      else if (section === 'tasks') openFoundation('kanban');
      else openLearning('course');
    }
    function exportLearningData() {
      const store = window.VLexLearningStore;
      if (!store) return;
      const blob = new Blob([store.exportData()], { type: 'application/json' });
      const url = URL.createObjectURL(blob), link = document.createElement('a');
      link.href = url; link.download = 'vlex-learning-' + new Date().toISOString().slice(0, 10) + '.json'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      triggerToast('نُزّلت بيانات التعلّم والتنظيم. بيانات القاموس والدروس القديمة لها زر تصدير مستقل.', 'success');
    }
    const fullBackupMessage=ref(window.VLexFullBackupRecovery?.message||'');
    const fullDependencies=()=>({learning:window.VLexLearning,legacy:dataSchema,simulator:window.VueLexiconSimulatorBeta});
    function exportFullBackup(){try{
      if(window.VLexLearningStore.status().mode==='protected'||protectedStorageKeys.size)throw Error('يوجد سجل محمي؛ نزّل بيانات الاسترجاع دون استبدال الأصل');
      if(dictionarySaveWarning.value)throw Error('مسودة قاموس غير محفوظة؛ نزّل بيانات الاسترجاع أولًا');
      if(window.VLexFullBackupRecovery?.blocked)throw Error('يوجد استرجاع معلق؛ لا نصدر حالة مؤقتة كنسخة سليمة. احتفظ بالأصل وبيانات الاسترجاع.');
      const text=window.VLexFullBackup.serialize({app:window.VLexFullBackup.APP,version:1,createdAt:new Date().toISOString(),learning:window.VLexLearningStore.read(),legacy:userDataPayload(),preferences:{simulator:{version:1,muted:betaMuted.value,volume:betaVolume.value,animations:techBeta.animations.value},ambient:{version:1,enabled:betaAmbientEnabled.value,volume:betaAmbientVolume.value},tabAutocomplete:tabAcceptsAutocomplete.value,demoTheme:jsThemePref.value}},fullDependencies());
      const url=URL.createObjectURL(new Blob([text],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download='vlex-full-'+new Date().toISOString().slice(0,10)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);fullBackupMessage.value='أُعد ملف النسخة الشاملة للتنزيل؛ تحقق من تنزيله.';
    }catch(e){fullBackupMessage.value='تعذر تصدير نسخة قابلة للاستيراد دون قص البيانات: '+e.message}}
    function exportFullRecovery(){try{const records={};for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(window.VLexFullBackup.KEYS.includes(key)||key===window.VLexFullBackup.PENDING||key?.startsWith('vlex_full_recovery_')||key?.startsWith('vlex_learning_recovery_')||key?.startsWith('vuelexicon_recovery_'))records[key]=localStorage.getItem(key)}const url=URL.createObjectURL(new Blob([JSON.stringify({app:'V Lex Pro Full Recovery',version:1,records,sessionDictionaryEdits:dictionaryEdits.value,sessionLearning:window.VLexLearningStore.read(),sessionLegacy:userDataPayload()})],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download='vlex-full-recovery.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);fullBackupMessage.value='أُعد ملف الاسترجاع الخام؛ ليس ملفًا للاستيراد المباشر.'}catch(e){fullBackupMessage.value='تعذر تنزيل بيانات الاسترجاع: '+e.message}}
    let fullImportSequence=0;
    async function importFullBackup(event){const request=++fullImportSequence,file=event.target?.files?.[0];if(!file)return;try{
      if(file.size>window.VLexFullBackup.LIMIT)throw Error('النسخة أكبر من 8 MiB');const text=await file.text();if(request!==fullImportSequence)return;
      window.VLexFullBackup.parse(text,fullDependencies());
      if(!window.confirm('استبدال جميع البيانات المدعومة بالنسخة الشاملة؟ سنحفظ الأصل أولًا، ولن يُشغّل أي كود مستورد.'))return;
      stopPracticeExecution();stopDictionaryPreview();
      const result=window.VLexFullBackup.restore(text,localStorage,fullDependencies());
      fullBackupMessage.value='حُفظت النسخة كاملة وتحققنا منها؛ الأصل محفوظ في '+result.backupKey+' . جارٍ إعادة تحميل البيانات.';
      window.location.reload();
    }catch(e){fullBackupMessage.value='تعذر استيراد النسخة الشاملة: '+e.message;try{if(localStorage.getItem(window.VLexFullBackup.PENDING)!==null){window.VLexFullBackupRecovery={blocked:true,message:fullBackupMessage.value};window.VLexLearningStore.reload()}}catch(_){}}finally{event.target.value=''}}
    let learningImportSequence = 0;
    async function importLearningData(event) {
      const requestId = ++learningImportSequence;
      const file = event.target?.files?.[0]; if (!file) return;
      try {
        if (file.size > 2 * 1024 * 1024) throw new Error('الملف أكبر من 2 MiB');
        const text = await file.text();
        if (requestId !== learningImportSequence) return;
        window.VLexLearningStore.parseBackup(text);
        if (!window.confirm('استبدال بيانات التعلّم والتنظيم بالنسخة المختارة؟ سنحفظ نسخة استرجاع من الأصل. لا تتغير بيانات القاموس أو مسودات الدروس القديمة.')) return;
        window.VLexLearningStore.importData(text);
        triggerToast('تم استيراد بيانات التعلّم وحفظ نسخة استرجاع؛ لم يُشغّل أي كود.', 'success');
      } catch (error) { triggerToast('تعذر الاستيراد: ' + error.message, 'error'); }
      finally { event.target.value = ''; }
    }

    // ==========================================
    // 17. Lifecycle & Listeners Cleanup (P0 Safe)
    // ==========================================
    onMounted(() => {
      if (window.VLexLearningStore) learningUnsubscribe = window.VLexLearningStore.subscribe(() => {
        learningRevision.value++;
        const restoredTheme = window.VLexLearningStore.getSection('preferences', {}).theme;
        if (['petroleum', 'light', 'purple', 'green', 'glass'].includes(restoredTheme)) theme.value = restoredTheme;
      });
      const handleGlobalKeys = (e) => {
        if (e.isComposing || e.keyCode === 229) return;
        if (appMode.value === 'practice' && practiceSurface.value === 'simulator') {
          const action = window.VueLexiconSimulatorBeta.actionForShortcut(e);
          if (action) { e.preventDefault(); if (action === 'run') techRunDraft(e); else techStopManual(); return; }
        }
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
          document.querySelectorAll('.tech-simulator .beta-layout-menu[open], .tech-simulator .final-custom-dimensions[open], .tech-simulator .beta-shortcuts[open]').forEach(detail => { detail.open = false; });
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
      const handleAudioVisibility = () => { if (document.visibilityState === 'hidden') techBeta.silence(); };
      document.addEventListener('visibilitychange', handleAudioVisibility);
      window.addEventListener('pagehide', techBeta.silence);
      window.addEventListener('blur', techEndResize);
      if (storageWarnings.length) triggerToast(storageWarnings.join(' '), 'warning');

      // Auto initialize practice code for first lesson
      if (currentLesson.value) {
        restoreEditorDraft(practiceProgress.value[currentLesson.value.id]?.codeDraft ?? currentLesson.value.initialCode);
      }

      onUnmounted(() => {
        learningUnsubscribe?.();
        if (termUtterance) window.speechSynthesis?.cancel();
        window.removeEventListener('keydown', handleGlobalKeys);
        window.removeEventListener('message', handleWindowMessage);
        document.removeEventListener('visibilitychange', handleAudioVisibility);
        window.removeEventListener('pagehide', techBeta.silence);
        window.removeEventListener('blur', techEndResize); techEndResize();
        if (clockInterval) clearInterval(clockInterval);
        if (debounceTimer) clearTimeout(debounceTimer);
        if (toastTimer) clearTimeout(toastTimer);
        cancelAutoRun();
        activeRun.value = null;
        dictionaryPreviewSession.value = null;
        techBeta.dispose();
      });
    });

    // ==========================================
    // 18. Returned Setup Scope (Complete Expose)
    // ==========================================
    return {
      dictionarySaveWarning, exportFullBackup, exportFullRecovery, importFullBackup, fullBackupMessage, learningReturnToArrow, openArrowPrerequisite, termSpeechStatus, speakTerm, learningStatus, explainSource, explainKey, openLearning, openLearningTerm, practiceFromLearning, navigateLearningSection, exportLearningData, importLearningData,
      techBeta, betaMuted, betaVolume, betaAudioStatus, betaAmbientEnabled, betaAmbientVolume, betaAmbientStatus, betaAmbientLabel, techToggleAmbient, betaWarnings, betaStorageStatus, techLanguage, techViewport, techEditorHeight, techPreviewHeight, techEditorWidth, techHiddenPanels, techAnyHidden, techPreviewWidth, techPanelVisible, techSetPanel, techResetLayout, techSetLanguage, techUpdateEditor, techEditorKeydown, techEditorReadonly, techBlockView, techToggleMotion, techToggleSound, techStopManual, techResetManual,
      techRunEvents, techCurrentRunEvents, techLatestError, techErrorIsCurrent, techDOMFields, techStageSignals, techTraceLimitation, techFlowSummary,
      techCustomWidth, techCustomHeight, techPreviewZoom, techDimensionDraft, techDimensionError, techConsoleHeight, techCompactPanel, techDragging,
      techPreviewCanvasStyle, techPreviewCarrierStyle, techSelectCompact, techSetViewport, techApplyDimensions, techZoomPreview, techFitPreview,
      techBeginResize, techMoveResize, techEndResize, techResizeKey, techResizeValue, techSelectedStage, techSelectStage, techStageExplanation, techAttempts, techActivity,
      techActivityWindow, techVisibleAttempts, techReadyRatio, techAttemptChart, techEventCells, techInspectEvents,
      techPreviewTab, techEditorView, techFocusPanel, techMotion, techSource, techEditorCode, techHighlightedCode, techSourceCSS, techStatusLabel, techRunReference, techRunDraft, techSyncEditorScroll, techJumpToScript, techToggleFocus, techPreviewKeydown,
      simulatorReferenceReading, simulatorExpandedPanel, simulatorEditorShare, toggleSimulatorPanel, simulatorStages,
      theme, setTheme, practiceSurface, openVisualSimulator, openTraining,
      foundationSection, foundationSections, activeFoundation, openFoundation,
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

      dictionaryPreviewRef, dictionaryPreviewKey, dictionaryPreviewState, dictionaryPreviewLogs, dictionaryPreviewDoc,
      dictionaryPreviewSession, dictionaryPreviewStale, runDictionaryPreview, stopDictionaryPreview,
      handleDictionaryTabKeydown, dictionaryTab, dictionaryAudit, dictionaryEditorCode, dictionaryEditorChanged, updateDictionaryEditor, resetDictionaryEditor,
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

if (window.VLexCodePresentation && app.directive) {
  app.directive('code-editor', window.VLexCodePresentation.editor);
  app.directive('code-view', window.VLexCodePresentation.view);
}
window.vueLexiconApp = app.mount('#app');
