/**
 * VueLexicon Pro v3.5 - Core Application Logic
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
    const SafeStorage = {
      isAvailable: (() => {
        try {
          const testKey = '__vlp_test_storage__';
          localStorage.setItem(testKey, testKey);
          localStorage.removeItem(testKey);
          return true;
        } catch (e) {
          return false;
        }
      })(),
      _mem: new Map(),
      getItem(key) {
        if (this.isAvailable) {
          try {
            return localStorage.getItem(key);
          } catch (e) {}
        }
        return this._mem.has(key) ? this._mem.get(key) : null;
      },
      setItem(key, val) {
        if (this.isAvailable) {
          try {
            localStorage.setItem(key, val);
            return true;
          } catch (e) {}
        }
        this._mem.set(key, val);
        return true;
      },
      removeItem(key) {
        if (this.isAvailable) {
          try {
            localStorage.removeItem(key);
          } catch (e) {}
        }
        this._mem.delete(key);
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

    // ==========================================
    // 2. Navigation & View State
    // ==========================================
    // 'lexicon' | 'timeline' | 'quiz' | 'nuxt-lab' | 'scratchpad'
    const appMode = ref('lexicon');
    const activeCategory = ref('all');
    const selectedLetter = ref('ALL');
    const selectedTerm = ref(rawLexiconData.value[0] || null);
    const searchQuery = ref('');
    const searchFocused = ref(false);
    const searchInputRef = ref(null);
    const highlightedDropdownIndex = ref(0);
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
    const bookmarkedIds = ref(new Set());
    try {
      const saved = SafeStorage.getItem('vuelexicon_bookmarks_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed.forEach(storedId => {
            if (typeof storedId === 'string' && storedId.startsWith('term-')) {
              const matchItem = rawLexiconData.value.find(i => i.legacyId === storedId);
              if (matchItem) {
                bookmarkedIds.value.add(matchItem.id);
              } else {
                bookmarkedIds.value.add(storedId);
              }
            } else {
              bookmarkedIds.value.add(storedId);
            }
          });
        }
      }
    } catch (e) {}

    function saveBookmarks() {
      SafeStorage.setItem('vuelexicon_bookmarks_v3', JSON.stringify(Array.from(bookmarkedIds.value)));
    }

    function isBookmarked(termOrId) {
      if (!termOrId) return false;
      const id = typeof termOrId === 'object' ? termOrId.id : termOrId;
      const legacyId = typeof termOrId === 'object' ? termOrId.legacyId : null;
      return bookmarkedIds.value.has(id) || (legacyId && bookmarkedIds.value.has(legacyId));
    }

    function toggleBookmark(term) {
      if (!term) return;
      const id = term.id;
      if (isBookmarked(term)) {
        bookmarkedIds.value.delete(id);
        if (term.legacyId) bookmarkedIds.value.delete(term.legacyId);
        triggerToast('تمت الإزالة من المفضلة', 'info');
      } else {
        bookmarkedIds.value.add(id);
        triggerToast('تم الحفظ في المفضلة ★', 'success');
      }
      saveBookmarks();
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
    const recentViewedIds = ref([]);
    try {
      const savedRecent = SafeStorage.getItem('vuelexicon_recent_v3');
      if (savedRecent) {
        const parsed = JSON.parse(savedRecent);
        if (Array.isArray(parsed)) recentViewedIds.value = parsed.slice(0, 12);
      }
    } catch (e) {}

    const termMastery = ref({});
    try {
      const savedMastery = SafeStorage.getItem('vuelexicon_mastery_v3');
      if (savedMastery) {
        const parsed = JSON.parse(savedMastery);
        if (typeof parsed === 'object' && parsed !== null) termMastery.value = parsed;
      }
    } catch (e) {}

    function getTermMastery(termId) {
      return termMastery.value[termId] || 'new'; // 'new' | 'learning' | 'mastered'
    }

    function setTermMastery(termId, level) {
      termMastery.value[termId] = level;
      SafeStorage.setItem('vuelexicon_mastery_v3', JSON.stringify(termMastery.value));
      const labels = { new: 'جديد ⚪', learning: 'أتعلم 🟡', mastered: 'أتقنته 🟢' };
      triggerToast(`تم تحديث مستوى الإتقان: ${labels[level] || level}`, 'success');
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
      SafeStorage.removeItem('vuelexicon_recent_v3');
      triggerToast('تم مسح سجل المصطلحات المشاهدة مؤخراً', 'info');
    }

    const recentlyViewedTerms = computed(() => {
      return recentViewedIds.value
        .map(id => rawLexiconData.value.find(t => t.id === id || t.legacyId === id))
        .filter(Boolean);
    });

    // Backup & Restore Progress
    function exportUserData() {
      const payload = {
        app: 'VueLexicon Pro',
        version: '3.5.0',
        exportDate: new Date().toISOString(),
        bookmarks: Array.from(bookmarkedIds.value),
        mastery: termMastery.value,
        recent: recentViewedIds.value
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vuelexicon-progress-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      triggerToast('تم تصدير نسخة احتياطية من تقدمك بنجاح ✓', 'success');
    }

    function importUserData(event) {
      const file = event.target?.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (!data || typeof data !== 'object') throw new Error('الملف غير صالح');
          if (Array.isArray(data.bookmarks)) {
            data.bookmarks.forEach(id => bookmarkedIds.value.add(id));
            saveBookmarks();
          }
          if (data.mastery && typeof data.mastery === 'object') {
            termMastery.value = { ...termMastery.value, ...data.mastery };
            SafeStorage.setItem('vuelexicon_mastery_v3', JSON.stringify(termMastery.value));
          }
          if (Array.isArray(data.recent)) {
            recentViewedIds.value = Array.from(new Set([...data.recent, ...recentViewedIds.value])).slice(0, 12);
            SafeStorage.setItem('vuelexicon_recent_v3', JSON.stringify(recentViewedIds.value));
          }
          triggerToast('تم استيراد بياناتك بنجاح ودمجها مع سجلك ✓', 'success');
        } catch (err) {
          triggerToast('تعذر استيراد الملف: صيغة JSON غير صالحة', 'error');
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
        searchFocused.value = false;
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
      appMode.value = mode;
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
    // 14. Scratchpad Live Sandbox Studio (P0 Secure)
    // ==========================================
    const savedScratch = SafeStorage.getItem('vuelexicon_scratchpad_v3');
    const defaultScratchCode = savedScratch || `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    body { font-family: sans-serif; background: #020420; color: #f8fafc; padding: 24px; min-height: 100vh; }
  </style>
</head>
<body class="flex flex-col items-center justify-center gap-4">
  <div class="p-6 rounded-2xl bg-[#081022] border border-emerald-500/30 text-center shadow-xl">
    <h1 class="text-xl font-bold text-[#00DC82]">مرحباً بك في مساحة تجربة الأكواد</h1>
    <p class="text-xs text-gray-400 mt-1">اكتب كودك واضغط تشغيل لمعاينة النتيجة فورياً في بيئة آمنة</p>
    <button onclick="console.log('مرحباً من كونسول المتصفح!'); alert('يعمل بنجاح!');" class="mt-4 px-4 py-2 rounded-xl bg-[#00DC82] text-slate-950 font-bold text-xs shadow-lg hover:bg-emerald-400 transition-all">
      اختبر التفاعل و console.log
    </button>
  </div>
</body>
</html>`;

    const scratchpadCode = ref(defaultScratchCode);
    const scratchpadAutoRun = ref(true);
    const scratchpadIframeKey = ref(1);
    const scratchpadIframeRef = ref(null);
    const scratchpadIsRunning = ref(false);
    const scratchpadConsoleLogs = ref([
      { level: 'info', msg: 'جاهز لتشغيل الأكواد واستقبال مخرجات console.log بأمان.', time: new Date().toLocaleTimeString('ar-SA') }
    ]);

    watch(scratchpadCode, (newVal) => {
      SafeStorage.setItem('vuelexicon_scratchpad_v3', newVal);
    });

    const scratchpadIframeDoc = computed(() => {
      const interceptor = `<script>
        (function() {
          function postMsg(level, text) {
            try {
              window.parent.postMessage({ type: 'CONSOLE_LOG', level: level, msg: text }, '*');
            } catch(e) {}
          }
          const oldLog = console.log;
          console.log = function(...args) {
            postMsg('log', args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
            oldLog.apply(console, args);
          };
          const oldWarn = console.warn;
          console.warn = function(...args) {
            postMsg('warn', args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
            oldWarn.apply(console, args);
          };
          const oldError = console.error;
          console.error = function(...args) {
            postMsg('error', args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
            oldError.apply(console, args);
          };
          window.onerror = function(message, source, lineno) {
            postMsg('error', 'خطأ في الكود: ' + message + (lineno ? ' (سطر: ' + lineno + ')' : ''));
          };
          window.onunhandledrejection = function(e) {
            postMsg('error', 'Promise Rejection: ' + (e.reason?.message || e.reason || 'خطأ غير معالج'));
          };
        })();
      <\\/script>`;

      let code = scratchpadCode.value || '';
      if (code.includes('<head>')) {
        return code.replace('<head>', '<head>' + interceptor);
      } else {
        return interceptor + code;
      }
    });

    let runTimeoutTimer = null;
    function runScratchpadCode() {
      scratchpadIframeKey.value++;
      scratchpadIsRunning.value = true;
      triggerToast('تم تشغيل الكود في البيئة المعزولة!', 'success');
      if (runTimeoutTimer) clearTimeout(runTimeoutTimer);
      runTimeoutTimer = setTimeout(() => {
        scratchpadIsRunning.value = false;
      }, 1500);
    }

    function stopScratchpadCode() {
      scratchpadIframeKey.value++;
      scratchpadIsRunning.value = false;
      triggerToast('تم إيقاف تنفيذ الكود وتنظيف الإطار', 'info');
    }

    function handleScratchpadInput() {
      if (scratchpadAutoRun.value) {
        runScratchpadCode();
      }
    }

    function sendTermToScratchpad(term) {
      if (!term) return;
      const codeToLoad = term.vueSfcCode || term.vanillaCode || '';
      let template = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${term.term}</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    body { font-family: sans-serif; background: #020420; color: #f8fafc; padding: 24px; min-height: 100vh; }
  </style>
</head>
<body class="p-6">
  <div class="max-w-xl mx-auto p-6 rounded-2xl bg-[#081022] border border-emerald-500/30 space-y-3">
    <h2 class="text-lg font-bold text-[#00DC82]">${term.term}</h2>
    <p class="text-xs text-gray-300 leading-relaxed">${term.description}</p>
    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300" dir="ltr">
      ${codeToLoad.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
    </div>
  </div>
</body>
</html>`;

      scratchpadCode.value = template;
      appMode.value = 'scratchpad';
      runScratchpadCode();
      triggerToast(`تم تحميل كود "${term.term}" في مساحة الأكواد!`, 'success');
    }

    function loadScratchpadPreset(presetId) {
      if (presetId === 'vue_counter') {
        scratchpadCode.value = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.21/vue.global.prod.min.js"><\/script>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>body { background: #020420; color: #f8fafc; padding: 32px; font-family: sans-serif; }</style>
</head>
<body class="flex items-center justify-center min-h-[80vh]">
  <div id="demo-app" class="p-6 rounded-3xl bg-[#081022] border-2 border-[#00DC82] shadow-2xl text-center space-y-4 max-w-sm w-full">
    <h2 class="text-base font-bold text-[#00DC82]">عداد Vue 3 تفاعلي كامل</h2>
    <div class="text-5xl font-black font-mono text-white">{{ count }}</div>
    <div class="flex gap-2 justify-center">
      <button @click="count++" class="px-5 py-2.5 rounded-xl bg-[#00DC82] text-slate-950 font-bold text-sm hover:scale-105 active:scale-95 transition-all">زيادة (+)</button>
      <button @click="count > 0 ? count-- : null" class="px-5 py-2.5 rounded-xl bg-slate-800 text-gray-300 hover:text-white font-bold text-sm">نقصان (-)</button>
      <button @click="count = 0" class="px-3 py-2.5 rounded-xl bg-slate-800 text-rose-400 font-bold text-xs">تصفير</button>
    </div>
  </div>
  <script>
    Vue.createApp({
      setup() {
        const count = Vue.ref(5);
        return { count };
      }
    }).mount('#demo-app');
  <\/script>
</body>
</html>`;
      } else if (presetId === 'tailwind_button') {
        scratchpadCode.value = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>body { background: #020420; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; }</style>
</head>
<body class="space-y-4 text-center">
  <button class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-slate-950 rounded-2xl group bg-gradient-to-br from-[#00DC82] to-[#38BDF8] group-hover:from-[#00DC82] group-hover:to-[#38BDF8] hover:text-white shadow-xl shadow-[#00DC82]/20 hover:scale-105 transition-all">
    <span class="relative px-6 py-3 transition-all ease-in duration-150 bg-[#00DC82] rounded-2xl group-hover:bg-opacity-0">
      ⚡ زر Tailwind نيون تفاعلي
    </span>
  </button>
</body>
</html>`;
      } else if (presetId === 'glass_card') {
        scratchpadCode.value = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    body { background: linear-gradient(135deg, #020420, #064E3B); min-height: 100vh; padding: 40px; font-family: sans-serif; color: #f8fafc; display: flex; align-items: center; justify-content: center; }
    .glass { background: rgba(8, 16, 34, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); }
  </style>
</head>
<body>
  <div class="glass p-8 rounded-3xl max-w-sm w-full space-y-3 shadow-2xl">
    <div class="w-10 h-10 rounded-2xl bg-[#00DC82]/20 border border-[#00DC82] flex items-center justify-center text-xl">💎</div>
    <h3 class="font-bold text-white text-base">بطاقة زجاجية iOS</h3>
    <p class="text-xs text-slate-300 leading-relaxed">تأثير Glassmorphism مع خلفية متدرجة وتعتيم بصري فائق الأناقة.</p>
  </div>
</body>
</html>`;
      } else if (presetId === 'js_cart') {
        scratchpadCode.value = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>body { background: #020420; color: #f8fafc; font-family: sans-serif; padding: 24px; }</style>
</head>
<body class="max-w-md mx-auto space-y-4">
  <h2 class="text-lg font-bold text-[#00DC82]">سلة المشتريات (JS Reduce)</h2>
  <div class="space-y-2" id="cart-container"></div>
  <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between font-bold">
    <span>المجموع الإجمالي:</span>
    <span class="text-[#00DC82] font-mono" id="total-val">$0</span>
  </div>
  <script>
    const items = [
      { name: 'اشتراك Pro', price: 49, qty: 1 },
      { name: 'حزمة أيقونات', price: 19, qty: 2 }
    ];
    function render() {
      const container = document.getElementById('cart-container');
      container.innerHTML = '';
      items.forEach((it, idx) => {
        container.innerHTML += '<div class="p-3 rounded-xl bg-[#081022] border border-slate-800 flex justify-between items-center"><span>' + it.name + ' ($' + it.price + ')</span><div><button onclick="items[' + idx + '].qty++; render();" class="px-2 py-1 bg-emerald-500 rounded text-slate-950 font-bold">+</button> <span class="px-2 font-mono">' + it.qty + '</span> <button onclick="if(items[' + idx + '].qty>1) items[' + idx + '].qty--; render();" class="px-2 py-1 bg-slate-800 rounded">-</button></div></div>';
      });
      const total = items.reduce((acc, it) => acc + (it.price * it.qty), 0);
      document.getElementById('total-val').innerText = '$' + total;
      console.log('تم حساب المجموع الإجمالي: $' + total);
    }
    render();
  <\/script>
</body>
</html>`;
      } else if (presetId === 'js_clock') {
        scratchpadCode.value = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>body { background: #020420; color: #f8fafc; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }</style>
</head>
<body class="text-center space-y-3">
  <div class="p-8 rounded-3xl bg-[#081022] border-2 border-[#00DC82] shadow-2xl">
    <div id="clock" class="text-4xl font-mono font-black text-[#00DC82] tracking-wider">--:--:--</div>
    <div id="date" class="text-xs text-gray-300 mt-2 font-bold">جاري تحميل التاريخ...</div>
  </div>
  <script>
    function tick() {
      const d = new Date();
      document.getElementById('clock').innerText = d.toLocaleTimeString('ar-SA');
      document.getElementById('date').innerText = d.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    tick();
    setInterval(tick, 1000);
  <\/script>
</body>
</html>`;
      }
      runScratchpadCode();
      triggerToast('تم تحميل القالب الجاهز!', 'info');
    }

    // Safe message receiver with sender validation
    function handleWindowMessage(e) {
      if (scratchpadIframeRef.value && e.source !== scratchpadIframeRef.value.contentWindow) {
        return; // Reject messages not originating from scratchpad iframe
      }
      if (e.data && e.data.type === 'CONSOLE_LOG') {
        scratchpadConsoleLogs.value.unshift({
          level: e.data.level || 'log',
          msg: e.data.msg,
          time: new Date().toLocaleTimeString('ar-SA')
        });
        if (scratchpadConsoleLogs.value.length > 30) {
          scratchpadConsoleLogs.value.pop();
        }
      }
    }

    // ==========================================
    // 15. FEATURE HIGHLIGHT: Code Timeline (مسرح تنفيذ الكود)
    // ==========================================
    const timelineExamples = [
      {
        id: 'vars_scope',
        title: 'المتغيرات والنطاق (Variables & Scope)',
        cat: 'js',
        termRef: 'let',
        code: `// مثال تتبع المتغيرات وإعادة التعيين
let count = 0;
let multiplier = 2;
count = count + 5;
let result = count * multiplier;
console.log("الناتج النهائي:", result);`,
        steps: [
          {
            line: 2,
            action: 'تم تعريف المتغير count وتهيئته بالقيمة الأولية 0.',
            scope: [{ name: 'count', type: 'number', val: '0', changed: true }],
            logs: []
          },
          {
            line: 3,
            action: 'تم تعريف المتغير multiplier وإسناد القيمة 2 له.',
            scope: [
              { name: 'count', type: 'number', val: '0', changed: false },
              { name: 'multiplier', type: 'number', val: '2', changed: true }
            ],
            logs: []
          },
          {
            line: 4,
            action: 'تمت قراءة قيمة count (0) وإضافة 5 إليها، ثم إعادة إسناد 5 إلى count.',
            scope: [
              { name: 'count', type: 'number', val: '5', changed: true },
              { name: 'multiplier', type: 'number', val: '2', changed: false }
            ],
            logs: []
          },
          {
            line: 5,
            action: 'حساب حاصل الضرب (5 * 2) وتعريف متغير النتيجة result بالقيمة 10.',
            scope: [
              { name: 'count', type: 'number', val: '5', changed: false },
              { name: 'multiplier', type: 'number', val: '2', changed: false },
              { name: 'result', type: 'number', val: '10', changed: true }
            ],
            logs: []
          },
          {
            line: 6,
            action: 'طباعة نص النتيجة في كونسول المتصفح.',
            scope: [
              { name: 'count', type: 'number', val: '5', changed: false },
              { name: 'multiplier', type: 'number', val: '2', changed: false },
              { name: 'result', type: 'number', val: '10', changed: false }
            ],
            logs: ['الناتج النهائي: 10']
          }
        ]
      },
      {
        id: 'if_branch',
        title: 'الشروط والتفرع (If / Else Branching)',
        cat: 'js',
        termRef: 'if...else',
        code: `// فحص الشروط والتفرع
const score = 85;
let grade = 'غير محدد';
if (score >= 90) {
  grade = 'ممتاز (A)';
} else if (score >= 80) {
  grade = 'جيد جداً (B)';
} else {
  grade = 'مقبول';
}
console.log("التقدير:", grade);`,
        steps: [
          {
            line: 2,
            action: 'تعريف ثابت الدرجة score بالقيمة 85.',
            scope: [{ name: 'score', type: 'number', val: '85', changed: true }],
            logs: []
          },
          {
            line: 3,
            action: 'تهيئة متغير التقدير grade بنص "غير محدد".',
            scope: [
              { name: 'score', type: 'number', val: '85', changed: false },
              { name: 'grade', type: 'string', val: '"غير محدد"', changed: true }
            ],
            logs: []
          },
          {
            line: 4,
            action: 'فحص الشرط الأول (score >= 90): الشرط غير محقق (85 < 90 = false).',
            scope: [
              { name: 'score', type: 'number', val: '85', changed: false },
              { name: 'grade', type: 'string', val: '"غير محدد"', changed: false }
            ],
            logs: []
          },
          {
            line: 6,
            action: 'الانتقال للشرط الثاني (score >= 80): الشرط محقق بنجاح (85 >= 80 = true).',
            scope: [
              { name: 'score', type: 'number', val: '85', changed: false },
              { name: 'grade', type: 'string', val: '"غير محدد"', changed: false }
            ],
            logs: []
          },
          {
            line: 7,
            action: 'تم تنفيذ كتلة الشرط المحقق وتعيين grade إلى "جيد جداً (B)".',
            scope: [
              { name: 'score', type: 'number', val: '85', changed: false },
              { name: 'grade', type: 'string', val: '"جيد جداً (B)"', changed: true }
            ],
            logs: []
          },
          {
            line: 11,
            action: 'طباعة النتيجة في الكونسول وتخطي كتلة else المتبقية.',
            scope: [
              { name: 'score', type: 'number', val: '85', changed: false },
              { name: 'grade', type: 'string', val: '"جيد جداً (B)"', changed: false }
            ],
            logs: ['التقدير: جيد جداً (B)']
          }
        ]
      },
      {
        id: 'loop_accumulator',
        title: 'حلقات التكرار والمراكم (Loops & Accumulator)',
        cat: 'js',
        termRef: 'for...of',
        code: `// حساب مجموع الأرقام داخل حلقة
const numbers = [10, 20, 30];
let total = 0;
for (const num of numbers) {
  total += num;
  console.log("تمت إضافة:", num, "المجموع:", total);
}`,
        steps: [
          {
            line: 2,
            action: 'تعريف مصفوفة الأرقام [10, 20, 30].',
            scope: [
              { name: 'numbers', type: 'Array', val: '[10, 20, 30]', changed: true },
              { name: 'total', type: 'number', val: 'undefined', changed: false }
            ],
            logs: []
          },
          {
            line: 3,
            action: 'تهيئة مراكم المجموع total بالقيمة 0.',
            scope: [
              { name: 'numbers', type: 'Array', val: '[10, 20, 30]', changed: false },
              { name: 'total', type: 'number', val: '0', changed: true }
            ],
            logs: []
          },
          {
            line: 4,
            action: 'دخول الحلقة: الدورة الأولى، num = 10.',
            scope: [
              { name: 'total', type: 'number', val: '0', changed: false },
              { name: 'num', type: 'number', val: '10', changed: true }
            ],
            logs: []
          },
          {
            line: 5,
            action: 'إضافة 10 إلى total ليصبح 10.',
            scope: [
              { name: 'total', type: 'number', val: '10', changed: true },
              { name: 'num', type: 'number', val: '10', changed: false }
            ],
            logs: ['تمت إضافة: 10 المجموع: 10']
          },
          {
            line: 4,
            action: 'الدورة الثانية للحلقة: التقاط العنصر التالي num = 20.',
            scope: [
              { name: 'total', type: 'number', val: '10', changed: false },
              { name: 'num', type: 'number', val: '20', changed: true }
            ],
            logs: ['تمت إضافة: 10 المجموع: 10']
          },
          {
            line: 5,
            action: 'إضافة 20 إلى total ليصبح 30.',
            scope: [
              { name: 'total', type: 'number', val: '30', changed: true },
              { name: 'num', type: 'number', val: '20', changed: false }
            ],
            logs: ['تمت إضافة: 10 المجموع: 10', 'تمت إضافة: 20 المجموع: 30']
          },
          {
            line: 4,
            action: 'الدورة الثالثة والأخيرة: التقاط num = 30.',
            scope: [
              { name: 'total', type: 'number', val: '30', changed: false },
              { name: 'num', type: 'number', val: '30', changed: true }
            ],
            logs: ['تمت إضافة: 10 المجموع: 10', 'تمت إضافة: 20 المجموع: 30']
          },
          {
            line: 5,
            action: 'إضافة 30 إلى total ليصبح المجموع النهائي 60 واكتمال الحلقة.',
            scope: [
              { name: 'total', type: 'number', val: '60', changed: true },
              { name: 'num', type: 'number', val: '30', changed: false }
            ],
            logs: ['تمت إضافة: 10 المجموع: 10', 'تمت إضافة: 20 المجموع: 30', 'تمت إضافة: 30 المجموع: 60']
          }
        ]
      },
      {
        id: 'vue_reactivity',
        title: 'التفاعلية في Vue 3 (ref() & Reactivity)',
        cat: 'vue',
        termRef: 'ref()',
        code: `// تتبع تفاعلية Vue 3 Composition API
const count = ref(0);
const doubleCount = computed(() => count.value * 2);

console.log("قبل التغيير:", count.value, "الضعف:", doubleCount.value);
count.value++;
console.log("بعد التغيير:", count.value, "الضعف تلقائياً:", doubleCount.value);`,
        steps: [
          {
            line: 2,
            action: 'إنشاء مرجع تفاعلي (Ref) بالقيمة 0 عبر ref(0).',
            scope: [{ name: 'count.value', type: 'Ref<number>', val: '0', changed: true }],
            logs: []
          },
          {
            line: 3,
            action: 'إنشاء خاصية محسوبة (computed) تراقب count وتضاعف قيمته.',
            scope: [
              { name: 'count.value', type: 'Ref<number>', val: '0', changed: false },
              { name: 'doubleCount.value', type: 'ComputedRef', val: '0', changed: true }
            ],
            logs: []
          },
          {
            line: 5,
            action: 'قراءة القيم الحالية وطباعتها في الكونسول.',
            scope: [
              { name: 'count.value', type: 'Ref<number>', val: '0', changed: false },
              { name: 'doubleCount.value', type: 'ComputedRef', val: '0', changed: false }
            ],
            logs: ['قبل التغيير: 0 الضعف: 0']
          },
          {
            line: 6,
            action: 'تعديل count.value إلى 1 -> استشعر نظام التفاعلية التغيير وأعاد حساب doubleCount فورياً إلى 2!',
            scope: [
              { name: 'count.value', type: 'Ref<number>', val: '1', changed: true },
              { name: 'doubleCount.value', type: 'ComputedRef', val: '2', changed: true }
            ],
            logs: ['قبل التغيير: 0 الضعف: 0']
          },
          {
            line: 7,
            action: 'طباعة الحالة المحدثة في الكونسول بعد إعادة الحساب التفاعلي.',
            scope: [
              { name: 'count.value', type: 'Ref<number>', val: '1', changed: false },
              { name: 'doubleCount.value', type: 'ComputedRef', val: '2', changed: false }
            ],
            logs: ['قبل التغيير: 0 الضعف: 0', 'بعد التغيير: 1 الضعف تلقائياً: 2']
          }
        ]
      },
      {
        id: 'ts_narrowing_scene',
        title: 'تضييق الأنواع في TypeScript (Type Narrowing)',
        cat: 'ts',
        termRef: 'Type Narrowing & Guards',
        code: `// فحص الأنواع الصارم في مسار التنفيذ
function formatInput(val: string | number) {
  if (typeof val === "string") {
    return val.toUpperCase();
  } else {
    return val.toFixed(2);
  }
}
const res = formatInput("vuelexicon");
console.log("النتيجة:", res);`,
        steps: [
          {
            line: 9,
            action: 'استدعاء الدالة formatInput وتمرير النص "vuelexicon".',
            scope: [{ name: 'val', type: 'string | number', val: '"vuelexicon"', changed: true }],
            logs: []
          },
          {
            line: 3,
            action: 'فحص حارس النمط typeof val === "string" -> محقق (true).',
            scope: [{ name: 'val (مضيق إلى)', type: 'string', val: '"vuelexicon"', changed: true }],
            logs: []
          },
          {
            line: 4,
            action: 'تنفيذ دالة .toUpperCase() المتاحة فقط للنصوص وإرجاع "VUELEXICON".',
            scope: [
              { name: 'val', type: 'string', val: '"vuelexicon"', changed: false },
              { name: 'returned', type: 'string', val: '"VUELEXICON"', changed: true }
            ],
            logs: []
          },
          {
            line: 10,
            action: 'طباعة النتيجة النهائية المفحوصة بأمان في الكونسول.',
            scope: [
              { name: 'res', type: 'string', val: '"VUELEXICON"', changed: true }
            ],
            logs: ['النتيجة: VUELEXICON']
          }
        ]
      }
    ];

    const activeTimelineIndex = ref(0);
    const timelineStepIndex = ref(0);
    const timelineIsPlaying = ref(false);
    let timelinePlayTimer = null;

    const currentTimelineExample = computed(() => {
      return timelineExamples[activeTimelineIndex.value] || timelineExamples[0];
    });

    const currentTimelineStep = computed(() => {
      const ex = currentTimelineExample.value;
      return ex.steps[timelineStepIndex.value] || ex.steps[0];
    });

    function selectTimelineExample(idx) {
      if (idx >= 0 && idx < timelineExamples.length) {
        activeTimelineIndex.value = idx;
        timelineStepIndex.value = 0;
        stopTimelineAutoPlay();
        triggerToast(`تم تحميل مثال: ${timelineExamples[idx].title}`, 'info');
      }
    }

    function nextTimelineStep() {
      const ex = currentTimelineExample.value;
      if (timelineStepIndex.value < ex.steps.length - 1) {
        timelineStepIndex.value++;
      } else {
        stopTimelineAutoPlay();
      }
    }

    function prevTimelineStep() {
      if (timelineStepIndex.value > 0) {
        timelineStepIndex.value--;
      }
    }

    function resetTimeline() {
      timelineStepIndex.value = 0;
      stopTimelineAutoPlay();
    }

    function toggleTimelinePlay() {
      if (timelineIsPlaying.value) {
        stopTimelineAutoPlay();
      } else {
        timelineIsPlaying.value = true;
        const ex = currentTimelineExample.value;
        if (timelineStepIndex.value >= ex.steps.length - 1) {
          timelineStepIndex.value = 0;
        }
        timelinePlayTimer = setInterval(() => {
          if (timelineStepIndex.value < ex.steps.length - 1) {
            timelineStepIndex.value++;
          } else {
            stopTimelineAutoPlay();
          }
        }, 1800);
      }
    }

    function stopTimelineAutoPlay() {
      timelineIsPlaying.value = false;
      if (timelinePlayTimer) {
        clearInterval(timelinePlayTimer);
        timelinePlayTimer = null;
      }
    }

    function openTermFromTimeline() {
      const ex = currentTimelineExample.value;
      if (!ex.termRef) return;
      const term = rawLexiconData.value.find(t => t.term === ex.termRef || t.arabicTitle.includes(ex.termRef));
      if (term) {
        appMode.value = 'lexicon';
        selectTerm(term);
      }
    }

    function launchTermInTimeline(term) {
      if (!term) return;
      // Match term to closest timeline example
      const matchIdx = timelineExamples.findIndex(ex => {
        return ex.termRef === term.term ||
          term.term.toLowerCase().includes(ex.cat) ||
          ex.title.includes(term.term);
      });
      activeTimelineIndex.value = matchIdx !== -1 ? matchIdx : 0;
      timelineStepIndex.value = 0;
      appMode.value = 'timeline';
      triggerToast(`انتقلت إلى مسرح التنفيذ لمفهوم: ${term.term}`, 'info');
    }

    // ==========================================
    // 16. FEATURE: Practice Quiz Mode (وضع التدريب)
    // ==========================================
    const quizCategoryFilter = ref('all');
    const quizIndex = ref(0);
    const quizScore = ref(0);
    const quizSelectedOption = ref(null);
    const quizAnswerSubmitted = ref(false);
    const quizCompleted = ref(false);

    const quizQuestions = computed(() => {
      // Curated verified questions pool covering all disciplines
      const pool = [
        {
          id: 'q1',
          category: 'TypeScript',
          question: 'ما هو الفرق الجوهري بين unknown و any في لغة TypeScript؟',
          options: [
            { text: 'unknown يلزمك بفحص النوع وتضييقه قبل استخدامه، بينما any تعطل فحص الأمان كلياً', correct: true },
            { text: 'unknown لا تقبل سوى الأرقام بينما any تقبل النصوص فقط', correct: false },
            { text: 'any أحدث وتمت إضافتها في TypeScript 5.0 كبديل لـ unknown', correct: false },
            { text: 'كلاهما متطابقان تماماً ولا يوجد أي فرق في السلوك البرمجي', correct: false }
          ],
          explanation: 'النوع unknown هو الـ Safe Top Type في TypeScript، حيث يقبل أي قيمة ولكنه يمنع استدعاء دوالها أو خصائصها قبل التأكد من نوعها بواسطة Type Narrowing، بخلاف any التي توقف المترجم تماماً.'
        },
        {
          id: 'q2',
          category: 'Vue.js 3',
          question: 'كيف نقرأ أو نعدل قيمة المرجع التفاعلي المنشأ بـ ref(0) داخل كتلة <script setup>؟',
          options: [
            { text: 'عبر الخاصية .value مثل: count.value++', correct: true },
            { text: 'مباشرة بدون أي خاصية مثل: count++', correct: false },
            { text: 'عبر دالة count.get() و count.set()', correct: false },
            { text: 'عبر الكائن الخاص this.count', correct: false }
          ],
          explanation: 'في Vue 3 Composition API، الكائنات المنشأة بـ ref() تُغلف القيمة داخل كائن يحمل الخاصية .value لتتبع التفاعلية. في القالب (<template>) يتم تفكيكها تلقائياً بدون كتابة .value.'
        },
        {
          id: 'q3',
          category: 'Nuxt UI',
          question: 'ما الغرض من الخاصية :loading="true" في مكون UButton الخاص بـ Nuxt UI v3؟',
          options: [
            { text: 'عرض مؤشر دوران (Spinner) تلقائي وتعطيل الزر أثناء انتظار معالجة الطلب', correct: true },
            { text: 'تحميل الخطوط والألوان من الخادم السحابي', correct: false },
            { text: 'إخفاء الزر كلياً من الشاشة', correct: false },
            { text: 'تغيير شكل الزر إلى مربع اختيار Checkbox', correct: false }
          ],
          explanation: 'خاصية loading في UButton توفر تجربة مستخدم ممتازة بإظهار Spinner مدمج مع تعطيل النقرات المتكررة أثناء تنفيذ العمليات غير المتزامنة.'
        },
        {
          id: 'q4',
          category: 'JavaScript',
          question: 'ما هي النتيجة المعادة من الدالة Array.prototype.map() في JavaScript؟',
          options: [
            { text: 'مصفوفة جديدة بنفس الطول تحوي نواتج تحويل كل عنصر دون تعديل المصفوفة الأصلية', correct: true },
            { text: 'تعديل مباشر على المصفوفة الأصلية دون إرجاع قيمة', correct: false },
            { text: 'رقم واحد يمثل مجموع العناصر فقط', correct: false },
            { text: 'قيمة منطقية true أو false', correct: false }
          ],
          explanation: 'الدالة map() تعد من دوال البرمجة الوظيفية غير المسببة للأعراض الجانبية (Pure/Immutable)، حيث تعيد مصفوفة جديدة كلياً بنواتج التحويل وتحافظ على المصفوفة الأصلية سالمة.'
        },
        {
          id: 'q5',
          category: 'CSS3',
          question: 'ما الخاصية التي تجعل العنصر يتقيد بحدود الشاشة أثناء التمرير بعد وصوله لنقطة معينة؟',
          options: [
            { text: 'position: sticky مع تحديد top أو bottom', correct: true },
            { text: 'position: absolute فقط', correct: false },
            { text: 'display: flex', correct: false },
            { text: 'overflow: hidden', correct: false }
          ],
          explanation: 'خاصية position: sticky تجمع بين السلوك النسبي (relative) والسلوك الثابت (fixed) عندما يصل العنصر للحد المحدد في العرض مثل top: 0.'
        },
        {
          id: 'q6',
          category: 'TypeScript',
          question: 'ما هو دور ماكرو defineProps<Props>() في Vue 3 مع TypeScript؟',
          options: [
            { text: 'تعريف خصائص المكون (Props) بالاعتماد على واجهة TypeScript مع التحقق الصارم وقت الترجمة', correct: true },
            { text: 'إنشاء اتصال مع قاعدة بيانات خارجية', correct: false },
            { text: 'إرسال أحداث مخصصة للمكون الأب فقط', correct: false },
            { text: 'تنسيق نصوص الـ HTML تلقائياً', correct: false }
          ],
          explanation: 'الماكرو defineProps<Props>() يتيح الاستفادة من واجهات TypeScript لتوثيق وتأكيد نمط الخصائص، وتوليد كود فحص الخصائص في Vue وقت التشغيل بدون تكرار الكود.'
        }
      ];

      if (quizCategoryFilter.value === 'all') return pool;
      return pool.filter(q => q.category.toLowerCase().includes(quizCategoryFilter.value.toLowerCase()));
    });

    const currentQuizQuestion = computed(() => {
      return quizQuestions.value[quizIndex.value] || quizQuestions.value[0];
    });

    function selectQuizOption(optIndex) {
      if (quizAnswerSubmitted.value) return;
      quizSelectedOption.value = optIndex;
    }

    function submitQuizAnswer() {
      if (quizSelectedOption.value === null || quizAnswerSubmitted.value) return;
      quizAnswerSubmitted.value = true;
      const currentQ = currentQuizQuestion.value;
      const isCorrect = currentQ.options[quizSelectedOption.value]?.correct;
      if (isCorrect) {
        quizScore.value++;
        triggerToast('إجابة صحيحة ومتقنة! أحسنت ✓', 'success');
      } else {
        triggerToast('إجابة غير صحيحة، راجع الشرح التعليمي أدناه', 'info');
      }
    }

    function nextQuizQuestion() {
      if (quizIndex.value < quizQuestions.value.length - 1) {
        quizIndex.value++;
        quizSelectedOption.value = null;
        quizAnswerSubmitted.value = false;
      } else {
        quizCompleted.value = true;
        triggerToast(`اكتمل الاختبار! نتيجتك: ${quizScore.value} من ${quizQuestions.value.length}`, 'success');
      }
    }

    function restartQuiz() {
      quizIndex.value = 0;
      quizScore.value = 0;
      quizSelectedOption.value = null;
      quizAnswerSubmitted.value = false;
      quizCompleted.value = false;
      triggerToast('تمت إعادة بدء الاختبار', 'info');
    }

    // ==========================================
    // 17. Lifecycle & Listeners Cleanup (P0 Safe)
    // ==========================================
    onMounted(() => {
      const handleGlobalKeys = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          if (appMode.value !== 'lexicon') appMode.value = 'lexicon';
          nextTick(() => {
            if (searchInputRef.value) searchInputRef.value.focus();
          });
        } else if (e.key === '?') {
          showShortcutsModal.value = !showShortcutsModal.value;
        } else if (e.key === 'Escape') {
          showShortcutsModal.value = false;
          inspectedNuxtComp.value = null;
          studioModalOpen.value = false;
        }
      };

      window.addEventListener('keydown', handleGlobalKeys);
      window.addEventListener('message', handleWindowMessage);

      onUnmounted(() => {
        window.removeEventListener('keydown', handleGlobalKeys);
        window.removeEventListener('message', handleWindowMessage);
        if (clockInterval) clearInterval(clockInterval);
        if (debounceTimer) clearTimeout(debounceTimer);
        if (toastTimer) clearTimeout(toastTimer);
        if (runTimeoutTimer) clearTimeout(runTimeoutTimer);
        stopTimelineAutoPlay();
      });
    });

    // ==========================================
    // 18. Returned Setup Scope (Complete Expose)
    // ==========================================
    return {
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

      // Scratchpad Studio
      scratchpadCode,
      scratchpadAutoRun,
      scratchpadIframeKey,
      scratchpadIframeRef,
      scratchpadIframeDoc,
      scratchpadIsRunning,
      scratchpadConsoleLogs,
      runScratchpadCode,
      stopScratchpadCode,
      handleScratchpadInput,
      sendTermToScratchpad,
      loadScratchpadPreset,

      // Feature: Code Timeline
      timelineExamples,
      activeTimelineIndex,
      currentTimelineExample,
      timelineStepIndex,
      currentTimelineStep,
      timelineIsPlaying,
      selectTimelineExample,
      nextTimelineStep,
      prevTimelineStep,
      resetTimeline,
      toggleTimelinePlay,
      openTermFromTimeline,
      launchTermInTimeline,

      // Feature: Practice Quiz Mode
      quizCategoryFilter,
      quizIndex,
      quizScore,
      quizQuestions,
      currentQuizQuestion,
      quizSelectedOption,
      quizAnswerSubmitted,
      quizCompleted,
      selectQuizOption,
      submitQuizAnswer,
      nextQuizQuestion,
      restartQuiz
    };
  }
});

app.mount('#app');
