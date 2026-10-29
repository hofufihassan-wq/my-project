const { createApp, ref, computed, watch, onMounted, onUnmounted, nextTick } = Vue;

const app = createApp({
  setup() {
    
    // 1. Data Hydration from Tuples
    function hydrateItem(tuple, index) {
      const [
        category,
        term,
        arabicTitle,
        keywords,
        description,
        codeExample,
        syntaxInfo,
        returnProps,
        env,
        useCases,
        previewType,
        compareJs,
        compareVue,
        docUrl
      ] = tuple;

      const catLabels = {
        js: 'JavaScript',
        vue: 'Vue.js 3',
        nuxt: 'Nuxt UI',
        html: 'HTML5',
        css: 'CSS3'
      };

      const catColors = {
        js: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
        vue: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
        nuxt: { bg: 'bg-[#00DC82]/10', text: 'text-[#00DC82]', border: 'border-[#00DC82]/30' },
        html: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
        css: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' }
      };

      const clean = term.replace(/^[<:@\.\(\)\s]+/, '');
      const match = clean.match(/[a-zA-Z]/);
      const letter = match ? match[0].toUpperCase() : 'A';

      return {
        id: `term-${index}`,
        category,
        categoryLabel: catLabels[category] || category,
        catBadgeColor: catColors[category] || catColors.js,
        term,
        letter,
        arabicTitle,
        keywords,
        description,
        codeExample,
        syntaxInfo,
        returnProps,
        env,
        useCases: Array.isArray(useCases) ? useCases : [useCases],
        previewType: previewType || 'generic',
        compareJs: compareJs || '// كود تقليدي',
        compareVue: compareVue || '// كود تفاعلي بأسلوب حديث',
        docUrl: docUrl || ''
      };
    }

    const rawLexiconData = ref(RAW_LEXICON_TUPLES.map((t, idx) => hydrateItem(t, idx)));

    // 2. Navigation & View State
    const appMode = ref('lexicon'); // 'lexicon' | 'nuxt-lab' | 'scratchpad' | 'quiz'
    const activeCategory = ref('all');
    const selectedLetter = ref('ALL');
    const selectedTerm = ref(rawLexiconData.value[0]);
    const detailTab = ref('code'); // 'code' | 'compare'
    const searchQuery = ref('');
    const searchFocused = ref(false);
    const searchInputRef = ref(null);
    const highlightedDropdownIndex = ref(0);
    const showShortcutsModal = ref(false);

    // Nuxt UI Lab Inspector Modal State
    const inspectedNuxtComp = ref(null);

    function inspectNuxtComponent(comp) {
      inspectedNuxtComp.value = comp;
    }

    function goToLexiconDetailedView(comp) {
      inspectedNuxtComp.value = null;
      activeCategory.value = 'nuxt';
      selectedTerm.value = comp;
      appMode.value = 'lexicon';
      detailTab.value = 'code';
      nextTick(() => {
        const el = document.getElementById('detailed-term-view');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      triggerToast(`تم فتح تفاصيل ${comp.term} في المعجم الشامل`);
    }

    // 3. Bookmarks Management (localStorage)
    const bookmarkedIds = ref(new Set());
    try {
      const saved = localStorage.getItem('vuelexicon_bookmarks_v3');
      if (saved) {
        JSON.parse(saved).forEach(id => bookmarkedIds.value.add(id));
      }
    } catch (e) {}

    function saveBookmarks() {
      try {
        localStorage.setItem('vuelexicon_bookmarks_v3', JSON.stringify(Array.from(bookmarkedIds.value)));
      } catch (e) {}
    }

    function isBookmarked(id) {
      return bookmarkedIds.value.has(id);
    }

    function toggleBookmark(id) {
      if (bookmarkedIds.value.has(id)) {
        bookmarkedIds.value.delete(id);
        triggerToast('تمت الإزالة من المفضلة');
      } else {
        bookmarkedIds.value.add(id);
        triggerToast('تم الحفظ في المفضلة ★');
      }
      saveBookmarks();
    }

    // 4. Toast System
    const toastMessage = ref('');
    const toastVisible = ref(false);
    let toastTimer = null;

    function triggerToast(msg) {
      toastMessage.value = msg;
      toastVisible.value = true;
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastVisible.value = false;
      }, 2500);
    }

    // 5. Category Tabs Configuration
    const categoriesList = [
      { id: 'all', label: 'الكل', icon: '🌐' },
      { id: 'html', label: 'HTML5', icon: '📄' },
      { id: 'css', label: 'CSS3', icon: '🎨' },
      { id: 'js', label: 'JavaScript', icon: '⚡' },
      { id: 'vue', label: 'Vue.js 3', icon: '💚' },
      { id: 'nuxt', label: 'Nuxt UI', icon: '🚀' },
      { id: 'bookmarks', label: 'المفضلة', icon: '★' }
    ];

    function getCategoryCount(catId) {
      if (catId === 'all') return rawLexiconData.value.length;
      if (catId === 'bookmarks') return bookmarkedIds.value.size;
      return rawLexiconData.value.filter(i => i.category === catId).length;
    }

    // 6. Alphabetical Letters
    const alphabetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    function hasTermsForLetter(letter) {
      return rawLexiconData.value.some(i => {
        const matchesCategory = activeCategory.value === 'all' ||
          (activeCategory.value === 'bookmarks' ? isBookmarked(i.id) : i.category === activeCategory.value);
        return matchesCategory && i.letter === letter;
      });
    }

    // 7. Filtered Terms List
    const filteredTermsList = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      return rawLexiconData.value.filter(item => {
        // Category filter
        if (activeCategory.value === 'bookmarks') {
          if (!isBookmarked(item.id)) return false;
        } else if (activeCategory.value !== 'all' && item.category !== activeCategory.value) {
          return false;
        }

        // Letter filter
        if (selectedLetter.value !== 'ALL' && item.letter !== selectedLetter.value) {
          return false;
        }

        // Search query
        if (q) {
          const matchTerm = item.term.toLowerCase().includes(q);
          const matchArabic = item.arabicTitle.toLowerCase().includes(q);
          const matchKeywords = item.keywords.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          if (!matchTerm && !matchArabic && !matchKeywords && !matchDesc) {
            return false;
          }
        }

        return true;
      });
    });

    // 8. Autocomplete Dropdown Suggestions
    const dropdownSuggestions = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (!q) return [];
      return rawLexiconData.value
        .filter(item => {
          return item.term.toLowerCase().includes(q) ||
            item.arabicTitle.toLowerCase().includes(q) ||
            item.keywords.toLowerCase().includes(q);
        })
        .slice(0, 8);
    });

    const showDropdown = computed(() => {
      return searchFocused.value && dropdownSuggestions.value.length > 0;
    });

    function handleSearchBlur() {
      setTimeout(() => {
        searchFocused.value = false;
      }, 200);
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
      if (filteredTermsList.value.length > 0) {
        selectedTerm.value = filteredTermsList.value[0];
      }
    }

    function setLetter(lettr) {
      selectedLetter.value = lettr;
      if (filteredTermsList.value.length > 0) {
        selectedTerm.value = filteredTermsList.value[0];
      }
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
    }

    function copyCode(code) {
      if (!code) return;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          triggerToast('تم نسخ الكود البرمجي إلى الحافظة بنجاح ✓');
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        triggerToast('تم نسخ الكود البرمجي إلى الحافظة بنجاح ✓');
      }
    }

    // ==========================================
    // CSS Studio State
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
    // HTML5 Studio State
    // ==========================================
    const htmlDialogOpen = ref(false);
    const htmlTableSearch = ref('');
    const htmlCanvasRef = ref(null);
    const htmlInputText = ref('مطور واجهات محترف');
    const htmlInputPassword = ref('NuxtUI_2026');
    const htmlShowPassword = ref(false);
    const htmlProgressVal = ref(60);
    function decreaseProgress() {
      if (htmlProgressVal.value > 0) htmlProgressVal.value -= 10;
    }
    function increaseProgress() {
      if (htmlProgressVal.value < 100) htmlProgressVal.value += 10;
    }
    const htmlSelectVal = ref('nuxt');

    const htmlTableRows = [
      { id: '01', name: 'Vue.js 3', cat: 'Frontend' },
      { id: '02', name: 'Nuxt UI v3', cat: 'UI Library' },
      { id: '03', name: 'Tailwind CSS', cat: 'Styling' },
      { id: '04', name: 'Vite & Nitro', cat: 'Build Tools' }
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
      
      // Draw modern gradient circles and polygon
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

      triggerToast('تم الرسم على لوحة Canvas بنجاح!');
    }

    function clearHtmlCanvas() {
      const canvas = htmlCanvasRef.value;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      triggerToast('تم مسح لوحة الرسم');
    }

    // ==========================================
    // JavaScript Demos State
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
      triggerToast('تم التقاط الحدث وتنفيذ المستمع بنجاح!');
    }

    const jsFetchLoading = ref(false);
    const jsFetchedUser = ref(null);
    function triggerJsFetch() {
      jsFetchLoading.value = true;
      setTimeout(() => {
        jsFetchLoading.value = false;
        const names = ['حيدر المعماري', 'سارة العتيبي', 'فهد الدوسري', 'ريما الشهراني'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomId = Math.floor(Math.random() * 80) + 10;
        jsFetchedUser.value = {
          name: randomName,
          email: `${randomName.split(' ')[0].toLowerCase()}${randomId}@example.com`,
          avatar: `https://images.unsplash.com/photo-${1534528741775 + randomId}?w=150&auto=format&fit=crop&q=80`
        };
        triggerToast('تم جلب بيانات مستخدم جديد بنجاح عبر fetch()!');
      }, 500);
    }

    const jsNewTaskText = ref('');
    const jsTaskList = ref(['مراجعة تفرع Git', 'كتابة مكونات Nuxt UI', 'اختبار ميزة filter']);
    function jsAddTask() {
      if (!jsNewTaskText.value.trim()) return;
      jsTaskList.value.push(jsNewTaskText.value.trim());
      jsNewTaskText.value = '';
      triggerToast('تم إدراج المهمة في المصفوفة عبر push()!');
    }
    function removeJsTask(idx) {
      if (idx >= 0 && idx < jsTaskList.value.length) {
        jsTaskList.value.splice(idx, 1);
        triggerToast('تم الحذف بواسطة splice()');
      }
    }

    const jsThemePref = ref(localStorage.getItem('app_demo_theme_v3') || 'emerald');
    function saveThemePref(pref) {
      jsThemePref.value = pref;
      try {
        localStorage.setItem('app_demo_theme_v3', pref);
      } catch(e){}
      triggerToast(`تم حفظ التفضيل (${pref}) في localStorage!`);
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
        triggerToast('انتهى مؤقت setTimeout!');
      }, 2000);
    }

    const jsRegexInput = ref('NuxtPro2026');
    const jsRandomNumber = ref(42);
    const jsRandomBgColor = ref('#064E3B');
    function rollRandomNumber() {
      jsRandomNumber.value = Math.floor(Math.random() * 100) + 1;
      const colors = ['#064E3B', '#0f766e', '#1e3a8a', '#581c87', '#831843', '#1e293b'];
      jsRandomBgColor.value = colors[Math.floor(Math.random() * colors.length)];
      triggerToast(`رقم عشوائي جديد: ${jsRandomNumber.value}`);
    }

    const jsFormattedDate = ref('');
    const jsCurrentTime = ref('');
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
    setInterval(updateJsDateTime, 1000);

    const jsTagsInput = ref('Vue, Nuxt, Tailwind, CSS3, JavaScript');
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

    // Standard Demos (Vue Counter / Model / Alert / Switch / Modal)
    const demoCounter = ref(0);
    const demoInputText = ref('تطبيق متكامل');
    const demoAlertVisible = ref(true);
    const demoSwitchVal = ref(true);
    const demoModalOpen = ref(false);

    // ==========================================
    // Nuxt UI Playground & Advisor State
    // ==========================================
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

    function selectNuxtColor(colorId) {
      nuxtButtonColor.value = colorId;
      triggerToast('تم تغيير اللون إلى ' + colorId);
    }

    function selectNuxtVariant(variant) {
      nuxtButtonVariant.value = variant;
      triggerToast('تم تغيير التنوع إلى ' + variant);
    }

    function selectNuxtSize(size) {
      nuxtButtonSize.value = size;
      triggerToast('تم تغيير المقاس إلى ' + size);
    }

    function selectNuxtIcon(iconId) {
      nuxtButtonIcon.value = iconId;
      triggerToast('تم اختيار الأيقونة');
    }

    function handlePlaygroundButtonClick() {
      playgroundClickCount.value++;
      playgroundButtonPulsing.value = true;
      setTimeout(() => playgroundButtonPulsing.value = false, 200);
      triggerToast(`تم النقر على زر Nuxt UI التفاعلي! (النقرة #${playgroundClickCount.value})`);
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
      triggerToast(`تم تطبيق القالب: ${preset}`);
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
      } else if (variant === 'link') {
        if (color === 'primary') styleClasses = 'text-[#00DC82] hover:underline p-0';
        else styleClasses = 'text-sky-400 hover:underline p-0';
      }

      return `${sizeClasses[nuxtButtonSize.value] || sizeClasses.md} ${styleClasses}`;
    }

    const generatedNuxtButtonCode = computed(() => {
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
    });

    const nuxtUiCatalog = computed(() => {
      return rawLexiconData.value.filter(i => i.category === 'nuxt');
    });

    // ==========================================
    // Scratchpad Live Code Playground Studio
    // ==========================================
    const defaultScratchCode = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    body { font-family: sans-serif; background: #020420; color: #fff; padding: 24px; }
  </style>
</head>
<body class="flex flex-col items-center justify-center min-h-[300px] gap-4">
  <div class="p-6 rounded-2xl bg-[#081022] border-2 border-[#00DC82] shadow-2xl text-center space-y-3">
    <h1 class="text-xl font-bold text-[#00DC82]">مرحباً بك في المحرر التجريبي الحي! 🚀</h1>
    <p class="text-xs text-gray-300">عدّل هذا الكود وشاهد التغييرات تتحدث مباشرة أمامك</p>
    <button onclick="console.log('نقرة زر!'); alert('أهلاً بك في مختبر الأكواد!');" class="px-5 py-2.5 rounded-xl bg-[#00DC82] text-slate-950 font-bold text-xs hover:bg-[#00b86b] transition-all">
      انقر لتجربة التفاعل ✨
    </button>
  </div>
</body>
</html>`;

    const scratchpadCode = ref(defaultScratchCode);
    const scratchpadAutoRun = ref(true);
    const scratchpadIframeKey = ref(1);
    const scratchpadConsoleLogs = ref(['تم تهيئة المحرر التجريبي بنجاح. اكتب الأكواد وشاهد النتيجة حياً!']);

    const scratchpadIframeDoc = computed(() => {
      // Inject console interceptor into iframe code
      const interceptor = `<script>
        (function() {
          const oldLog = console.log;
          console.log = function(...args) {
            window.parent.postMessage({ type: 'CONSOLE_LOG', msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
            oldLog.apply(console, args);
          };
        })();
      <\\/script>`;

      let code = scratchpadCode.value;
      if (code.includes('<head>')) {
        return code.replace('<head>', '<head>' + interceptor);
      } else {
        return interceptor + code;
      }
    });

    function handleScratchpadInput() {
      if (scratchpadAutoRun.value) {
        runScratchpadCode();
      }
    }

    function runScratchpadCode() {
      scratchpadIframeKey.value++;
      triggerToast('تم تحديث وتشغيل الكود في المعاينة الحية!');
    }

    function sendTermToScratchpad(term) {
      if (!term || !term.codeExample) return;
      let template = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${term.term}</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    body { font-family: sans-serif; background: #020420; color: #fff; padding: 24px; }
  </style>
</head>
<body class="space-y-4">
  <div class="p-4 rounded-xl bg-[#081022] border border-[#00DC82]">
    <h2 class="text-lg font-bold text-[#00DC82]">${term.term}</h2>
    <p class="text-xs text-gray-400 mb-3">${term.arabicTitle}</p>
    <!-- تجربة الكود أدناه: -->
    <div id="demo-root"></div>
  </div>
  <script>
    // كود ${term.term}:
    ${term.category === 'js' ? term.codeExample : 'console.log("كود جاهز للتجربة");'}
  <\\/script>
</body>
</html>`;

      if (term.category === 'html') {
        template = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    body { font-family: sans-serif; background: #020420; color: #fff; padding: 24px; }
  </style>
</head>
<body class="p-6">
  ${term.codeExample}
</body>
</html>`;
      }

      scratchpadCode.value = template;
      appMode.value = 'scratchpad';
      runScratchpadCode();
      triggerToast(`تم تحميل كود ${term.term} في المحرر التجريبي!`);
    }

    function loadScratchpadPreset(presetId) {
      if (presetId === 'nuxt_btn') {
        scratchpadCode.value = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>body { background: #020420; color: #fff; font-family: sans-serif; padding: 30px; }</style>
</head>
<body class="flex flex-col items-center justify-center gap-4">
  <button onclick="console.log('تم النقر!'); this.classList.toggle('scale-110');" class="px-6 py-3 rounded-2xl bg-[#00DC82] hover:bg-[#00b86b] text-slate-950 font-black text-sm shadow-xl shadow-[#00DC82]/30 transition-transform active:scale-95 flex items-center gap-2">
    <span>✨</span>
    <span>زر Nuxt UI v3 الفاخر</span>
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
    body { background: linear-gradient(135deg, #020420, #064E3B); min-h: 100vh; padding: 40px; font-family: sans-serif; }
    .glass { background: rgba(8, 16, 34, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(0, 220, 130, 0.3); }
  </style>
</head>
<body class="flex items-center justify-center">
  <div class="glass p-8 rounded-3xl shadow-2xl max-w-sm text-center space-y-4">
    <div class="w-12 h-12 rounded-full bg-[#00DC82] text-slate-950 font-bold flex items-center justify-center mx-auto text-xl shadow-lg">⚡</div>
    <h3 class="text-xl font-bold text-white">بطاقة زجاجية Glassmorphic</h3>
    <p class="text-xs text-gray-300">تصميم زجاجي عصري يعتمد على backdrop-filter و borders ناعمة.</p>
  </div>
</body>
</html>`;
      } else if (presetId === 'js_cart') {
        scratchpadCode.value = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>body { background: #020420; color: #fff; font-family: sans-serif; padding: 24px; }</style>
</head>
<body class="max-w-md mx-auto space-y-4">
  <h2 class="text-lg font-bold text-[#00DC82]">🛒 سلة التسوق التفاعلية (JS Reduce)</h2>
  <div class="space-y-2" id="cart-container"></div>
  <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between font-bold">
    <span>إجمالي الفاتورة:</span>
    <span id="total-price" class="text-[#00DC82] font-mono text-lg">$0</span>
  </div>
  <script>
    const items = [
      { name: 'Vue 3 Course', price: 40, qty: 1 },
      { name: 'Nuxt Template', price: 60, qty: 1 }
    ];
    function render() {
      const container = document.getElementById('cart-container');
      container.innerHTML = '';
      items.forEach((it, idx) => {
        container.innerHTML += '<div class=\"p-3 rounded-xl bg-[#081022] border border-slate-800 flex justify-between items-center\"><span>' + it.name + ' ($' + it.price + ')</span><div><button onclick=\"items[' + idx + '].qty++; render();\" class=\"px-2 py-1 bg-emerald-500 rounded text-slate-950 font-bold\">+</button> <span class=\"px-2\">' + it.qty + '</span> <button onclick=\"if(items[' + idx + '].qty>1) items[' + idx + '].qty--; render();\" class=\"px-2 py-1 bg-slate-800 rounded\">-</button></div></div>';
      });
      const total = items.reduce((acc, it) => acc + (it.price * it.qty), 0);
      document.getElementById('total-price').innerText = '$' + total;
      console.log('تم تحديث الفاتورة: $' + total);
    }
    render();
  <\\/script>
</body>
</html>`;
      } else if (presetId === 'css_animation') {
        scratchpadCode.value = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    body { background: #020420; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    @keyframes floatSpin {
      0% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
      100% { transform: translateY(0) rotate(360deg); }
    }
    .spin-box { animation: floatSpin 4s ease-in-out infinite; }
  </style>
</head>
<body>
  <div class="spin-box w-28 h-28 rounded-3xl bg-gradient-to-tr from-[#00DC82] to-sky-400 shadow-2xl shadow-[#00DC82]/40 flex items-center justify-center font-bold text-slate-950 text-xl">
    CSS 3D
  </div>
</body>
</html>`;
      } else if (presetId === 'js_clock') {
        scratchpadCode.value = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>body { background: #020420; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }</style>
</head>
<body class="text-center space-y-3">
  <div class="p-8 rounded-3xl bg-[#081022] border-2 border-[#00DC82] shadow-2xl">
    <div id="clock" class="text-4xl font-mono font-black text-[#00DC82] tracking-wider">--:--:--</div>
    <div id="date" class="text-xs text-gray-400 mt-2 font-bold">جاري تحميل التاريخ...</div>
  </div>
  <script>
    function tick() {
      const now = new Date();
      document.getElementById('clock').innerText = now.toLocaleTimeString('ar-SA');
      document.getElementById('date').innerText = new Intl.DateTimeFormat('ar-SA', { dateStyle: 'full' }).format(now);
    }
    setInterval(tick, 1000);
    tick();
    console.log('الساعة قيد العمل!');
  <\\/script>
</body>
</html>`;
      }
      runScratchpadCode();
      triggerToast('تم تحميل القالب الجاهز!');
    }

    // Message listener for iframe console logs
    window.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'CONSOLE_LOG') {
        scratchpadConsoleLogs.value.unshift(e.data.msg);
        if (scratchpadConsoleLogs.value.length > 20) {
          scratchpadConsoleLogs.value.pop();
        }
      }
    });

    // ==========================================
    // Dev Quiz System State
    // ==========================================
    const quizQuestions = [
      {
        question: 'ما هو المفهوم الأساسي للـ Composition API في Vue.js 3؟',
        category: 'Vue.js 3',
        options: [
          'تنظيم الأكواد حسب وظائف المنطق البرمجي بدلاً من Options المنفصلة',
          'استبدال محرك قوالب HTML بالكامل بكود C++',
          'إلغاء الحاجة لملفات .vue نهائياً',
          'تسريع تحميل الصور فقط'
        ],
        correct: 0,
        explanation: 'الـ Composition API تتيح تجميع المتغيرات والدوال المتعلقة بنفس الميزة الوظيفية معاً، مما يسهل إعادة استخدام الكود وصيانته.'
      },
      {
        question: 'ما هي الخاصية المسؤولة عن محاذاة عناصر Flexbox على المحور الرئيسي (Main Axis)؟',
        category: 'CSS3',
        options: ['align-items', 'justify-content', 'flex-direction', 'align-content'],
        correct: 1,
        explanation: 'خاصية justify-content تتحكم في توزيع ومحاذاة العناصر على المحور الرئيسي، بينما align-items تتحكم في المحور العرضي.'
      },
      {
        question: 'ما الفرق الجوهري بين دالة map() ودالة forEach() في JavaScript؟',
        category: 'JavaScript',
        options: [
          'map() تعيد مصفوفة جديدة معدلة، بينما forEach() تعيد undefined',
          'forEach() أسرع بنسبة 1000%',
          'map() تحذف العناصر الأصلية',
          'لا يوجد أي فرق بينهما'
        ],
        correct: 0,
        explanation: 'دالة map() تنشئ وترجع مصفوفة جديدة تماماً تحتوي نتائج تطبيق الدالة على كل عنصر، بينما forEach() مخصصة للآثار الجانبية وتعيد undefined.'
      },
      {
        question: 'في مكتبة Nuxt UI v3، ما هو اسم المكون المستخدم لإنشاء الأزرار التفاعلية؟',
        category: 'Nuxt UI',
        options: ['<NButton>', '<UButton>', '<VButton>', '<ButtonUI>'],
        correct: 1,
        explanation: 'كافة مكونات Nuxt UI تبدأ بالبادئة حرف U، واسم مكون الزر هو <UButton>.'
      },
      {
        question: 'أي من وسوم HTML5 التالية يوفر نافذة منبثقة أصلية مدمجة تدعم showModal()؟',
        category: 'HTML5',
        options: ['<popup>', '<modal>', '<dialog>', '<window>'],
        correct: 2,
        explanation: 'وسم <dialog> هو العنصر القياسي في HTML5 للنوافذ المنبثقة، ويدعم showModal() و close() والـ Backdrop تلقائياً.'
      },
      {
        question: 'ما هي وظيفة دالة structuredClone() في JavaScript الحديثة؟',
        category: 'JavaScript',
        options: [
          'إنشاء نسخة عميقة حقيقية (Deep Clone) للكائنات والمصفوفات',
          'تحويل الكائنات إلى نصوص XML',
          'تدمير الكائنات القديمة لتحرير الذاكرة',
          'فحص المساواة بين مصفوفتين'
        ],
        correct: 0,
        explanation: 'دالة structuredClone() هي واجهة متصفح قياسية للنسخ العميق للكائنات المعقدة دون مشاكل الدوال والـ Date التي تحدث مع JSON.parse.'
      },
      {
        question: 'ما هي خاصية CSS المستخدمة لتطبيق تأثير الزجاج الضبابي (Glassmorphism) على ما خلف العنصر؟',
        category: 'CSS3',
        options: ['filter: blur()', 'backdrop-filter: blur()', 'opacity: 0.5', 'background-blur'],
        correct: 1,
        explanation: 'خاصية backdrop-filter تطبق المؤثرات (كالضبابية والسطوع) على المحتوى الكائن خلف العنصر مباشرة، وهي أساس تأثير Glassmorphism.'
      },
      {
        question: 'في Vue 3، ما الموجه (Directive) المستخدم للربط التفاعلي ثنائي الاتجاه بين حقول الإدخال والحالة؟',
        category: 'Vue.js 3',
        options: ['v-bind', 'v-model', 'v-on', 'v-sync'],
        correct: 1,
        explanation: 'الموجه v-model يقوم بربط القيمة والاستماع لأحداث الإدخال تلقائياً (Two-way Data Binding).'
      },
      {
        question: 'ما وظيفة المعامل Nullish Coalescing (??) في JavaScript؟',
        category: 'JavaScript',
        options: [
          'يرجع القيمة البديلة فقط إذا كانت القيمة الأولى null أو undefined',
          'يرجع القيمة البديلة إذا كانت القيمة الأولى false أو 0',
          'يحذف المتغير من الذاكرة',
          'يقوم بحساب الجذور التربيعية'
        ],
        correct: 0,
        explanation: 'معامل ?? يتجاهل الصفر 0 والنص الفارغ "" ويعتبرهما قيماً صالحة، ويرجع البديل فقط في حالة null أو undefined.'
      },
      {
        question: 'أي وسم HTML5 يُستخدم لعرض محتوى قابل للطي والفتح (Accordion) بدون أي كود JS؟',
        category: 'HTML5',
        options: ['<accordion>', '<details> مع <summary>', '<collapse>', '<toggle>'],
        correct: 1,
        explanation: 'وسم <details> بالتكامل مع <summary> يوفر قائمة قابلة للطي والفتح بتنسيق وسلوك أصيل في المتصفح دون جافاسكريبت.'
      }
    ];

    const quizIndex = ref(0);
    const quizScore = ref(0);
    const quizAnswered = ref(false);
    const quizSelectedIdx = ref(null);
    const quizCompleted = ref(false);

    const currentQuizQuestion = computed(() => {
      return quizQuestions[quizIndex.value] || quizQuestions[0];
    });

    function answerQuiz(idx) {
      if (quizAnswered.value) return;
      quizAnswered.value = true;
      quizSelectedIdx.value = idx;
      if (idx === currentQuizQuestion.value.correct) {
        quizScore.value++;
        triggerToast('إجابة صحيحة! أحسنت 🎯');
      } else {
        triggerToast('إجابة غير صحيحة، راجع الشرح التوضيحي');
      }
    }

    function getQuizOptionClass(idx) {
      if (!quizAnswered.value) {
        return 'bg-slate-900 hover:bg-[#00DC82]/10 border-slate-800 hover:border-[#00DC82]/50 text-gray-300';
      }
      if (idx === currentQuizQuestion.value.correct) {
        return 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
      }
      if (idx === quizSelectedIdx.value) {
        return 'bg-rose-500/20 border-rose-500 text-rose-300';
      }
      return 'bg-slate-900 border-slate-800 text-gray-500 opacity-50';
    }

    function nextQuizQuestion() {
      if (quizIndex.value + 1 < quizQuestions.length) {
        quizIndex.value++;
        quizAnswered.value = false;
        quizSelectedIdx.value = null;
      } else {
        quizCompleted.value = true;
      }
    }

    function restartQuiz() {
      quizIndex.value = 0;
      quizScore.value = 0;
      quizAnswered.value = false;
      quizSelectedIdx.value = null;
      quizCompleted.value = false;
    }

    // Keyboard shortcuts listener
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
        }
      };
      window.addEventListener('keydown', handleGlobalKeys);
      onUnmounted(() => {
        window.removeEventListener('keydown', handleGlobalKeys);
      });
    });

    return {
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
      detailTab,
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
      triggerToast,
      showShortcutsModal,
      // Nuxt Component Inspector Modal in Lab
      inspectedNuxtComp,
      inspectNuxtComponent,
      goToLexiconDetailedView,
      // Nuxt UI Playground
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
      generatedNuxtButtonCode,
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
      handleScratchpadInput,
      htmlSelectVal,
      // JS Demos State
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
      scratchpadIframeDoc,
      scratchpadConsoleLogs,
      runScratchpadCode,
      sendTermToScratchpad,
      loadScratchpadPreset,
      // Dev Quiz
      quizQuestions,
      quizIndex,
      quizScore,
      quizAnswered,
      quizSelectedIdx,
      quizCompleted,
      currentQuizQuestion,
      answerQuiz,
      getQuizOptionClass,
      nextQuizQuestion,
      restartQuiz
    };
  }
});

app.mount('#app');
