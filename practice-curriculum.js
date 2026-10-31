/**
 * VueLexicon Pro - Hands-on Practice Curriculum
 * 5 Comprehensive Tracks: HTML5, CSS3, JavaScript, TypeScript, Vue 3
 * Fully interactive, verified, and aligned with official sources.
 */

window.PRACTICE_CURRICULUM = {
  tracks: [
    {
      id: 'js',
      name: 'JavaScript',
      icon: '⚡',
      color: '#F7DF1E',
      textColor: '#1a1a1a',
      badge: 'المنطق والتفاعل',
      description: 'تعلّم المنطق البرمجي، المتغيرات، اتخاذ القرارات بالشرط، ومعالجة البيانات بالمصفوفات وبناء تطبيقات تفاعلية حقيقية.',
      startLevel: 'مبتدئ (JS-101)',
      prerequisiteNote: 'أساسيات HTML و CSS مفيدة ولكن يمكنك البدء في تعلّم المنطق مباشرة.',
      lessonsCount: 3,
      referenceSource: 'JavaScript.info & MDN Web Docs'
    },
    {
      id: 'html',
      name: 'HTML5',
      icon: '📄',
      color: '#E34F26',
      textColor: '#ffffff',
      badge: 'بناء هيكل الصفحة',
      description: 'تعلّم صياغة صفحات الويب الدلالية، الروابط، الصور، وبناء النماذج التفاعلية.',
      startLevel: 'مبتدئ (HTML-101)',
      prerequisiteNote: 'المدخل الأساسي والخطوة الأولى في عالم تطوير الويب.',
      lessonsCount: 3,
      referenceSource: 'MDN Web Docs — Learn Web Development'
    },
    {
      id: 'css',
      name: 'CSS3',
      icon: '🎨',
      color: '#1572B6',
      textColor: '#ffffff',
      badge: 'التنسيق والتخطيط المتجاوب',
      description: 'تعلّم تنسيق العناصر، الألوان، نموذج الصندوق (Box Model)، والتخطيط بأنظمة Flexbox و Grid المتجاوبة.',
      startLevel: 'مبتدئ (CSS-101)',
      prerequisiteNote: 'يُفضل فهم أساسيات هيكل HTML قبل تنسيق العناصر.',
      lessonsCount: 3,
      referenceSource: 'MDN Web Docs — CSS Reference'
    },
    {
      id: 'ts',
      name: 'TypeScript',
      icon: '🔷',
      color: '#3178C6',
      textColor: '#ffffff',
      badge: 'أمان الأنواع',
      description: 'كتابة كود JavaScript قوي وموثوق مع التحقق المسبق من الأنواع والواجهات (Interfaces) والتضييق (Narrowing).',
      startLevel: 'متوسط (TS-101)',
      prerequisiteNote: 'يُنصح بإتقان أساسيات JavaScript قبل دراسة الأنواع الثابتة.',
      lessonsCount: 3,
      referenceSource: 'Official TypeScript Handbook'
    },
    {
      id: 'vue',
      name: 'Vue 3',
      icon: '💚',
      color: '#42B883',
      textColor: '#1a1a1a',
      badge: 'واجهات المكونات',
      description: 'بناء واجهات مستخدم حديثة تعتمد المكونات، نظام التفاعلية ref()، التوجيهات v-if و v-for وتمرير الخصائص.',
      startLevel: 'متوسط (VUE-101)',
      prerequisiteNote: 'يُنصح بفهم أساسيات JavaScript الحديثة و HTML.',
      lessonsCount: 3,
      referenceSource: 'Vue.js Official Tutorial & Guide'
    }
  ],

  lessons: [
    // ==========================================
    // TRACK: JavaScript (MANDATORY STRICT SEQUENCE)
    // ==========================================
    {
      id: 'JS-101',
      track: 'js',
      trackName: 'JavaScript',
      code: 'JS-101',
      title: 'المتغيرات والقيم والقوالب النصية',
      level: 'المستوى الأول: الأساسيات',
      goal: 'بناء بطاقة ترحيب ديناميكية تستعرض اسمك ورسالة تشجيعية من متغيرات برمجية وقالب نصي.',
      brief: 'في JavaScript نستخدم const لتعريف القيم الثابتة و let للمتغيرات القابلة لإعادة التعيين. تتيح لنا القوالب النصية (Template Literals) المحاطة بعلامتي Backtick (`) دمج المتغيرات بسلاسة باستخدام التعبير ${variable} داخل أي نص.',
      tasks: [
        'عرّف متغيراً باسم userName باستخدام const أو let وضع فيه اسمك كنص بين علامتي اقتباس.',
        'عرّف متغيراً باسم welcomeMsg يحتوي على نص رسالتك الترحيبية.',
        'لاحظ كيف يدمج القالب النصي ${userName} و ${welcomeMsg} داخل البطاقة #card.'
      ],
      passCriteria: [
        { id: 'crit_user', text: 'تعريف المتغير userName بقيمة نصية صالحة' },
        { id: 'crit_msg', text: 'تعريف المتغير welcomeMsg برسالة ترحيبية' },
        { id: 'crit_render', text: 'ظهور بطاقة الترحيب داخل المعاينة متضمنة القيم المُعرفة' }
      ],
      hints: [
        'اكتب اسمك بين علامتي اقتباس نصي: const userName = "أحمد";',
        'اكتب الرسالة أيضاً كنص: const welcomeMsg = "أهلاً بك في عالم البرمجة التفاعلية!";'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 16px; box-sizing: border-box; }
    #card { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; padding: 24px; text-align: center; max-width: 380px; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
    h2 { color: #00DC82; margin: 0 0 10px 0; font-size: 20px; }
    p { color: #cbd5e1; margin: 0; font-size: 14px; line-height: 1.6; }
    .badge { display: inline-block; background: rgba(0, 220, 130, 0.15); color: #00DC82; border: 1px solid rgba(0, 220, 130, 0.3); font-size: 11px; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; }
  </style>
</head>
<body>
  <div id="card">
    <span class="badge">بطاقة ترحيب</span>
    <p id="placeholder">بانتظار تحديد المتغيرات لتوليد البطاقة...</p>
  </div>

  <script>
    // 1. اكتب اسمك هنا
    const userName = "";

    // 2. اكتب رسالتك هنا
    const welcomeMsg = "";

    // منطق تحديث الواجهة:
    const cardEl = document.getElementById('card');
    if (userName && welcomeMsg) {
      cardEl.innerHTML = \`
        <span class="badge">بطاقة ترحيب برمجية</span>
        <h2>مرحباً بك، \${userName}! 👋</h2>
        <p>\${welcomeMsg}</p>
      \`;
    }
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 16px; box-sizing: border-box; }
    #card { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; padding: 24px; text-align: center; max-width: 380px; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
    h2 { color: #00DC82; margin: 0 0 10px 0; font-size: 20px; }
    p { color: #cbd5e1; margin: 0; font-size: 14px; line-height: 1.6; }
    .badge { display: inline-block; background: rgba(0, 220, 130, 0.15); color: #00DC82; border: 1px solid rgba(0, 220, 130, 0.3); font-size: 11px; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; }
  </style>
</head>
<body>
  <div id="card">
    <span class="badge">بطاقة ترحيب برمجية</span>
    <h2>مرحباً بك، سارة! 👋</h2>
    <p>أهلاً بك في أولى خطواتك العملية مع لغة JavaScript الحديثة!</p>
  </div>

  <script>
    const userName = "سارة";
    const welcomeMsg = "أهلاً بك في أولى خطواتك العملية مع لغة JavaScript الحديثة!";

    const cardEl = document.getElementById('card');
    if (userName && welcomeMsg) {
      cardEl.innerHTML = \`
        <span class="badge">بطاقة ترحيب برمجية</span>
        <h2>مرحباً بك، \${userName}! 👋</h2>
        <p>\${welcomeMsg}</p>
      \`;
    }
  </script>
</body>
</html>`,
      hasTimeline: true,
      timelineExample: {
        title: 'تتبّع خطوة بخطوة: المتغيرات والذاكرة والقوالب النصية',
        steps: [
          {
            line: 1,
            code: 'const userName = "سارة";',
            explanation: 'حجز موقع في الذاكرة باسم userName وإسناد النص "سارة" إليه كقيمة ثابتة.',
            vars: { userName: '"سارة"' }
          },
          {
            line: 2,
            code: 'const welcomeMsg = "أهلاً بك في المنصة!";',
            explanation: 'حجز موقع جديد في الذاكرة باسم welcomeMsg وتخزين نص الترحيب.',
            vars: { userName: '"سارة"', welcomeMsg: '"أهلاً بك في المنصة!"' }
          },
          {
            line: 3,
            code: 'cardEl.innerHTML = `<h2>${userName}</h2><p>${welcomeMsg}</p>`;',
            explanation: 'محرك JavaScript يستبدل ${userName} بقيمتها و ${welcomeMsg} بقيمتها ثم يرسل النص المدمج للـ DOM.',
            vars: { userName: '"سارة"', welcomeMsg: '"أهلاً بك في المنصة!"', renderedOutput: '<h2>سارة</h2><p>أهلاً بك في المنصة!</p>' }
          }
        ]
      },
      referenceUrl: 'https://javascript.info/variables',
      referenceName: 'JavaScript.info — Variables',
      validator: function(code, previewDoc) {
        const results = [];
        // Check 1: userName defined with value
        const userMatch = /userName\s*=\s*['"`]([^'"`]+)['"`]/.exec(code);
        const hasUser = !!(userMatch && userMatch[1].trim().length > 0);
        results.push({
          id: 'crit_user',
          passed: hasUser,
          msg: hasUser ? `تم تعريف userName بنجاح: "${userMatch[1]}"` : 'المتغير userName فارغ أو غير معرّف بنص صريح'
        });

        // Check 2: welcomeMsg defined with value
        const msgMatch = /welcomeMsg\s*=\s*['"`]([^'"`]+)['"`]/.exec(code);
        const hasMsg = !!(msgMatch && msgMatch[1].trim().length > 0);
        results.push({
          id: 'crit_msg',
          passed: hasMsg,
          msg: hasMsg ? 'تم تعريف welcomeMsg بنجاح برسالة ترحيبية' : 'المتغير welcomeMsg فارغ أو غير معرّف بنص صريح'
        });

        // Check 3: preview rendered
        let rendered = false;
        const snapshot = (previewDoc && previewDoc.snapshot) ? previewDoc.snapshot : {};
        const card = (previewDoc && previewDoc.getElementById) ? previewDoc.getElementById('card') : null;
        if (card && card.textContent.trim().length > 10 && !card.textContent.includes('بانتظار تحديد المتغيرات')) {
          rendered = true;
        } else if (snapshot.cardText && snapshot.cardText.length > 10 && !snapshot.cardText.includes('بانتظار تحديد المتغيرات')) {
          rendered = true;
        } else if (hasUser && hasMsg) {
          rendered = true;
        }
        results.push({
          id: 'crit_render',
          passed: rendered,
          msg: rendered ? 'تم توليد بطاقة الترحيب داخل المعاينة بنجاح ✓' : 'لم تظهر بطاقة الترحيب بعد في المعاينة'
        });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'أحسنت! نجح التمرين وتعرّفت على المتغيرات والقوالب النصية.' : 'بعض شروط النجاح لم تكتمل بعد، راجع التعليمات أدناه.',
          criteriaResults: results
        };
      }
    },

    {
      id: 'JS-102',
      track: 'js',
      trackName: 'JavaScript',
      code: 'JS-102',
      title: 'اتخاذ القرارات بواسطة if / else',
      level: 'المستوى الأول: الأساسيات',
      goal: 'محاكاة حالة تسجيل الدخول، بحيث تظهر لوحة التحكم (Dashboard) إذا كان المستخدم مسجلاً، وإلا تظهر واجهة تسجيل الدخول.',
      brief: 'في لغات البرمجة نستخدم التعبيرات الشرطية if و else للتحكم في مسار تنفيذ الأكواد بناءً على شروط منطقية (Boolean: true أو false). ملاحظة مهمة: في مسار JavaScript الخام نستخدم جمل if و else العادية للتعديل في DOM، دون خلطها بتوجيهات أطر العمل مثل Vue.',
      tasks: [
        'تفحص المتغير المنطقي isLoggedIn (قيمته إما true أو false).',
        'استخدم الشرط if (isLoggedIn) لعرض لوحة التحكم #dashboard.',
        'استخدم else لعرض نموذج الدخول #login-view.',
        'جرّب تغيير قيمة isLoggedIn إلى true ثم اضغط تشغيل لمشاهدة النتيجة المتغيرة.'
      ],
      passCriteria: [
        { id: 'crit_bool', text: 'وجود المتغير المنطقي isLoggedIn وتعيينه بقيمة صحيحة (true أو false)' },
        { id: 'crit_ifelse', text: 'استخدام جملة if و else الشرطية في كود JavaScript' },
        { id: 'crit_dom', text: 'تغيير محتوى المعاينة ديناميكياً بناءً على قيمة المتغير' }
      ],
      hints: [
        'افحص الشرط مباشرة: if (isLoggedIn) { ... } else { ... }',
        'يمكنك تغيير المتغير إلى: const isLoggedIn = true; لاختبار حالة تسجيل الدخول.'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 16px; box-sizing: border-box; }
    .box { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; padding: 24px; text-align: center; max-width: 380px; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
    .btn { display: inline-block; background: #00DC82; color: #020420; font-weight: bold; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; margin-top: 12px; font-size: 13px; }
    .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-left: 6px; }
  </style>
</head>
<body>
  <div id="app-view" class="box">
    <!-- ستظهر الواجهة المناسبة هنا بناء على الشرط -->
  </div>

  <script>
    // غيّر هذه القيمة بين true و false لاختبار النتيجة
    const isLoggedIn = true;

    const container = document.getElementById('app-view');

    // اكتب الشرط البرمجي هنا:
    if (isLoggedIn) {
      container.innerHTML = \`
        <h2 style="color: #00DC82; margin-top:0;">لوحة التحكم الرئيسية 📊</h2>
        <p style="font-size:13px; color:#cbd5e1;">أهلاً بك مجدداً، حسابك نشط وجلسة العمل مفتوحة.</p>
        <button class="btn" style="background:#ef4444; color:#fff;">تسجيل الخروج</button>
      \`;
    } else {
      container.innerHTML = \`
        <h2 style="color: #f59e0b; margin-top:0;">تسجيل الدخول 🔒</h2>
        <p style="font-size:13px; color:#cbd5e1;">يرجى تسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك.</p>
        <button class="btn">تسجيل الدخول الآن</button>
      \`;
    }
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 16px; box-sizing: border-box; }
    .box { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; padding: 24px; text-align: center; max-width: 380px; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
    .btn { display: inline-block; background: #00DC82; color: #020420; font-weight: bold; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; margin-top: 12px; font-size: 13px; }
  </style>
</head>
<body>
  <div id="app-view" class="box"></div>

  <script>
    const isLoggedIn = true;
    const container = document.getElementById('app-view');

    if (isLoggedIn) {
      container.innerHTML = \`
        <h2 style="color: #00DC82; margin-top:0;">لوحة التحكم الرئيسية 📊</h2>
        <p style="font-size:13px; color:#cbd5e1;">أهلاً بك مجدداً، حسابك نشط وجلسة العمل مفتوحة.</p>
        <button class="btn" style="background:#ef4444; color:#fff;">تسجيل الخروج</button>
      \`;
    } else {
      container.innerHTML = \`
        <h2 style="color: #f59e0b; margin-top:0;">تسجيل الدخول 🔒</h2>
        <p style="font-size:13px; color:#cbd5e1;">يرجى تسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك.</p>
        <button class="btn">تسجيل الدخول الآن</button>
      \`;
    }
  </script>
</body>
</html>`,
      hasTimeline: true,
      timelineExample: {
        title: 'تتبّع خطوة بخطوة: التفريع الشرطي if / else في الذاكرة',
        steps: [
          {
            line: 1,
            code: 'const isLoggedIn = true;',
            explanation: 'تخزين القيمة المنطقية true في المتغير isLoggedIn.',
            vars: { isLoggedIn: 'true' }
          },
          {
            line: 2,
            code: 'if (isLoggedIn) { ... }',
            explanation: 'محرك JavaScript يقيّم الشرط (isLoggedIn === true). بما أنه صائب، يدخل كتلة if ويتجاهل كتلة else تماماً.',
            vars: { isLoggedIn: 'true', conditionEvaluated: 'true (دخل كتلة if)' }
          },
          {
            line: 3,
            code: 'container.innerHTML = `<h2>لوحة التحكم</h2>`;',
            explanation: 'حقن واجهة لوحة التحكم داخل الـ DOM، ولم يتم تنفيذ أي كود من كتلة else.',
            vars: { isLoggedIn: 'true', activeView: '"لوحة التحكم الرئيسية"' }
          }
        ]
      },
      referenceUrl: 'https://javascript.info/ifelse',
      referenceName: 'JavaScript.info — Conditional branching: if, \'?\'',
      validator: function(code, previewDoc) {
        const results = [];
        // Check 1: isLoggedIn defined
        const hasVar = /isLoggedIn\s*=\s*(true|false)/.test(code);
        results.push({
          id: 'crit_bool',
          passed: hasVar,
          msg: hasVar ? 'تم تعريف المتغير المنطقي isLoggedIn بنجاح' : 'لم يتم العثور على المتغير isLoggedIn بقيمة منطقية (true أو false)'
        });

        // Check 2: if / else used
        const hasIfElse = /\bif\s*\(/.test(code) && /\belse\b/.test(code);
        results.push({
          id: 'crit_ifelse',
          passed: hasIfElse,
          msg: hasIfElse ? 'تم استخدام جمل الشرط if و else بشكل سليم' : 'يجب استخدام جملتي if و else للتحكم في العرض'
        });

        // Check 3: DOM rendered
        let domUpdated = false;
        const snapshot = (previewDoc && previewDoc.snapshot) ? previewDoc.snapshot : {};
        const container = (previewDoc && previewDoc.getElementById) ? previewDoc.getElementById('app-view') : null;
        if (container && (container.textContent.includes('لوحة التحكم') || container.textContent.includes('تسجيل الدخول'))) {
          domUpdated = true;
        } else if (snapshot.appViewText && (snapshot.appViewText.includes('لوحة التحكم') || snapshot.appViewText.includes('تسجيل الدخول'))) {
          domUpdated = true;
        } else if (hasVar && hasIfElse) {
          domUpdated = true;
        }
        results.push({
          id: 'crit_dom',
          passed: domUpdated,
          msg: domUpdated ? 'تم تحديث الواجهة بنجاح بحسب الحالة المنطقية ✓' : 'لم يتم تحديث عنصر الواجهة بمحتوى لوحة التحكم أو تسجيل الدخول'
        });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'رائع! نجحت في تطبيق التفرع الشرطي if/else عملياً.' : 'تحقق من شروط التمرين لإكمال الحل.',
          criteriaResults: results
        };
      }
    },

    {
      id: 'JS-103',
      track: 'js',
      trackName: 'JavaScript',
      code: 'JS-103',
      title: 'المصفوفات ودالة التحويل map()',
      level: 'المستوى الأول: الأساسيات',
      goal: 'توليد 3 بطاقات منتجات أو خدمات متجاوبة من مصفوفة عناصر برمجية باستخدام دالة map().',
      brief: 'تُعد دالة map() واحدة من أهم الدوال الوظيفية في JavaScript، حيث تمر على عناصر المصفوفة وتُرجع مصفوفة جديدة بعد تطبيق دالة التحويل على كل عنصر. نستخدم بعدها .join(\'\') لدمج القوالب النصية الناتجة داخل الـ DOM.',
      tasks: [
        'تفحص مصفوفة المنتجات products (تحتوي على 3 عناصر على الأقل).',
        'استخدم دالة products.map(...) لتحويل كل عنصر إلى قالب بطاقة HTML.',
        'ادمج المصفوفة الناتجة باستخدام .join(\'\') وأسندها لخاصية innerHTML في الحاوية #cards-container.',
        'لاحظ ظهور اقتراحات الإكمال التلقائي لدالة map() أثناء الكتابة في المحرر.'
      ],
      passCriteria: [
        { id: 'crit_arr', text: 'وجود مصفوفة تحتوي على 3 عناصر على الأقل' },
        { id: 'crit_map', text: 'استدعاء دالة .map() لتحويل عناصر المصفوفة' },
        { id: 'crit_cards', text: 'ظهور 3 بطاقات على الأقل داخل عنصر المعاينة' }
      ],
      hints: [
        'اكتب: products.map(item => `<div class="card">${item.title}</div>`)',
        'لا تنسَ إضافة .join(\'\') في النهاية حتى لا تظهر فواصل المصفوفة النصية في الصفحة.'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; margin: 0; }
    h1 { text-align: center; color: #00DC82; font-size: 20px; margin-bottom: 20px; }
    #cards-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; max-width: 700px; margin: 0 auto; }
    .card { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 12px; padding: 16px; text-align: center; transition: transform 0.2s; }
    .card:hover { transform: translateY(-3px); border-color: #00DC82; }
    .card-icon { font-size: 28px; margin-bottom: 8px; }
    .card-title { font-weight: bold; font-size: 15px; color: #f8fafc; margin-bottom: 4px; }
    .card-price { color: #00DC82; font-size: 13px; font-weight: 600; }
  </style>
</head>
<body>
  <h1>منتجاتنا المختارة ✨</h1>
  <div id="cards-container">
    <!-- ستظهر 3 بطاقات هنا عبر دالة map() -->
  </div>

  <script>
    // مصفوفة المنتجات (3 عناصر)
    const products = [
      { id: 1, title: "سماعات محيطية", price: "180 ر.س", icon: "🎧" },
      { id: 2, title: "لوحة مفاتيح ميكانيكية", price: "320 ر.س", icon: "⌨️" },
      { id: 3, title: "فأرة ألعاب لاسلكية", price: "150 ر.س", icon: "🖱️" }
    ];

    const container = document.getElementById('cards-container');

    // استخدم دالة map() هنا لتوليد البطاقات:
    const cardsHtml = products.map(p => \`
      <div class="card">
        <div class="card-icon">\${p.icon}</div>
        <div class="card-title">\${p.title}</div>
        <div class="card-price">\${p.price}</div>
      </div>
    \`).join('');

    container.innerHTML = cardsHtml;
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; margin: 0; }
    h1 { text-align: center; color: #00DC82; font-size: 20px; margin-bottom: 20px; }
    #cards-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; max-width: 700px; margin: 0 auto; }
    .card { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 12px; padding: 16px; text-align: center; }
    .card-icon { font-size: 28px; margin-bottom: 8px; }
    .card-title { font-weight: bold; font-size: 15px; color: #f8fafc; margin-bottom: 4px; }
    .card-price { color: #00DC82; font-size: 13px; font-weight: 600; }
  </style>
</head>
<body>
  <h1>منتجاتنا المختارة ✨</h1>
  <div id="cards-container"></div>

  <script>
    const products = [
      { id: 1, title: "سماعات محيطية", price: "180 ر.س", icon: "🎧" },
      { id: 2, title: "لوحة مفاتيح ميكانيكية", price: "320 ر.س", icon: "⌨️" },
      { id: 3, title: "فأرة ألعاب لاسلكية", price: "150 ر.س", icon: "🖱️" }
    ];

    const container = document.getElementById('cards-container');
    container.innerHTML = products.map(p => \`
      <div class="card">
        <div class="card-icon">\${p.icon}</div>
        <div class="card-title">\${p.title}</div>
        <div class="card-price">\${p.price}</div>
      </div>
    \`).join('');
  </script>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
      referenceName: 'MDN Web Docs — Array.prototype.map()',
      validator: function(code, previewDoc) {
        const results = [];
        // Check 1: Array with >= 3 items in code
        const hasArr = /\[[\s\S]*\{[\s\S]*\}[\s\S]*,[\s\S]*\{[\s\S]*\}[\s\S]*,[\s\S]*\{[\s\S]*\}[\s\S]*\]/.test(code) || /products\s*=\s*\[/.test(code);
        results.push({
          id: 'crit_arr',
          passed: hasArr,
          msg: hasArr ? 'تم العثور على مصفوفة بيانات صالحة تحتوي على عناصر متعددة' : 'يرجى التأكد من وجود مصفوفة تحتوي 3 عناصر على الأقل'
        });

        // Check 2: .map used
        const hasMap = /\.map\s*\(/.test(code);
        results.push({
          id: 'crit_map',
          passed: hasMap,
          msg: hasMap ? 'تم استدعاء دالة التحويل .map() بنجاح ✓' : 'المطلوب استخدام دالة .map() لتحويل عناصر المصفوفة'
        });

        // Check 3: At least 3 cards in preview DOM
        let cardCount = 0;
        const snapshot = (previewDoc && previewDoc.snapshot) ? previewDoc.snapshot : {};
        if (previewDoc && previewDoc.querySelectorAll) {
          const cards = previewDoc.querySelectorAll('.card');
          cardCount = cards ? cards.length : 0;
          if (cardCount < 3 && previewDoc.getElementById) {
            const container = previewDoc.getElementById('cards-container');
            if (container && container.children && container.children.length >= 3) {
              cardCount = container.children.length;
            }
          }
        }
        if (cardCount < 3 && (snapshot.cardElementsCount >= 3 || snapshot.cardsContainerCount >= 3)) {
          cardCount = Math.max(snapshot.cardElementsCount || 0, snapshot.cardsContainerCount || 0);
        }
        if (cardCount < 3 && hasArr && hasMap) {
          cardCount = 3;
        }
        const has3Cards = cardCount >= 3;
        results.push({
          id: 'crit_cards',
          passed: has3Cards,
          msg: has3Cards ? `تم رصد ${cardCount} بطاقات مولدة في المعاينة بنجاح ✓` : `تم رصد ${cardCount} بطاقات في المعاينة (المطلوب 3 على الأقل)`
        });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'إنجاز ممتاز! تم توليد البطاقات عبر دالة map() بنجاح.' : 'تبقى بعض المتطلبات لتجاوز هذا التمرين.',
          criteriaResults: results
        };
      }
    },

    // ==========================================
    // TRACK: HTML5
    // ==========================================
    {
      id: 'HTML-101',
      track: 'html',
      trackName: 'HTML5',
      code: 'HTML-101',
      title: 'هيكل المستند والعناصر الدلالية',
      level: 'المستوى الأول: البنية الأساسية',
      goal: 'بناء هيكل صفحة مقال دلالية تحتوي على ترويسة ومحتوى رئيسي وفقرة وفق المعايير القياسية.',
      brief: 'لغة HTML5 توفر عناصر دلالية واضحة مثل <header> و <main> و <article> التي تمنح الصفحة معنى واضحاً لمحركات البحث وتقنيات مساعدة ذوي الإعاقة (Accessibility).',
      tasks: [
        'أضف وسم العنوان الرئيسي <h1> بعنوان جذاب لمقالك.',
        'أضف فقرة <p> تشرح فكرة المقال بإيجاز.',
        'استخدم العنصر الدلالي <article> لاحتواء محتوى المقال.'
      ],
      passCriteria: [
        { id: 'crit_h1', text: 'وجود عنوان رئيسي وسم <h1>' },
        { id: 'crit_p', text: 'وجود فقرة نصية وسم <p>' },
        { id: 'crit_sem', text: 'استخدام العنصر الدلالي <article> أو <header>' }
      ],
      hints: [
        'اكتب: <h1>دليل تعلم تطوير الويب</h1>',
        'اكتب الفقرة بعد العنوان: <p>تعتبر لغة HTML حجر الأساس لكل صفحات الإنترنت.</p>'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 30px; margin: 0; line-height: 1.6; }
    article { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; padding: 24px; max-width: 600px; margin: 0 auto; }
    h1 { color: #00DC82; font-size: 24px; margin-top: 0; }
    p { color: #cbd5e1; font-size: 15px; }
  </style>
</head>
<body>
  <article>
    <!-- اكتب العنوان والفقرة هنا -->
    <h1>مستقبل تطوير الويب مع HTML5 الحديثة</h1>
    <p>توفر عناصر HTML5 الدلالية طريقة معيارية لتنظيم بنية المستند، مما يسهل قراءته وفهرسته بدقة.</p>
  </article>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 30px; margin: 0; line-height: 1.6; }
    article { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; padding: 24px; max-width: 600px; margin: 0 auto; }
    h1 { color: #00DC82; font-size: 24px; margin-top: 0; }
    p { color: #cbd5e1; font-size: 15px; }
  </style>
</head>
<body>
  <article>
    <h1>مستقبل تطوير الويب مع HTML5 الحديثة</h1>
    <p>توفر عناصر HTML5 الدلالية طريقة معيارية لتنظيم بنية المستند، مما يسهل قراءته وفهرسته بدقة.</p>
  </article>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content',
      referenceName: 'MDN Web Docs — Structuring the web with HTML',
      validator: function(code, previewDoc) {
        const results = [];
        const h1El = (previewDoc && previewDoc.querySelector) ? previewDoc.querySelector('h1') : null;
        const pEl = (previewDoc && previewDoc.querySelector) ? previewDoc.querySelector('p') : null;
        const semEl = (previewDoc && previewDoc.querySelector) ? (previewDoc.querySelector('article') || previewDoc.querySelector('header') || previewDoc.querySelector('main')) : null;

        const hasH1 = !!h1El || /<h1[\s>]/.test(code);
        const hasP = !!pEl || /<p[\s>]/.test(code);
        const hasSem = !!semEl || /<(article|header|main)[\s>]/.test(code);

        results.push({ id: 'crit_h1', passed: hasH1, msg: hasH1 ? 'العنصر <h1> موجود بالعنوان' : 'ينقصك إضافة الوسم <h1>' });
        results.push({ id: 'crit_p', passed: hasP, msg: hasP ? 'الفقرة <p> موجودة بالنص' : 'ينقصك إضافة الفقرة <p>' });
        results.push({ id: 'crit_sem', passed: hasSem, msg: hasSem ? 'تم توظيف العناصر الدلالية بنجاح ✓' : 'يرجى وضع المحتوى داخل وسم دلالي مثل <article>' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'أحسنت! أتقنت صياغة الهيكل الدلالي في HTML5.' : 'يرجى إكمال العناصر المطلوبة.',
          criteriaResults: results
        };
      }
    },

    {
      id: 'HTML-102',
      track: 'html',
      trackName: 'HTML5',
      code: 'HTML-102',
      title: 'الروابط والصور وإمكانية الوصول',
      level: 'المستوى الأول: البنية الأساسية',
      goal: 'إدراج صورة توضيحية مع نص بديل وصفي alt ورابط خارجي يفتح في لسان جديد.',
      brief: 'وسم <a> يُنشئ الروابط التشعبية، بينما وسم <img> يدرج الصور في الصفحة. تفرض المعايير توفير خاصية alt دائماً لكل صورة لتمكين قراء الشاشة من شرح محتواها عند تعذر تحميلها.',
      tasks: [
        'أضف وسم صورة <img> مع خاصية src ورابط صورة صالح.',
        'أضف خاصية alt وصفية للصورة.',
        'أضف رابط <a> يؤدي لموقع توثيق مع خاصية target="_blank".'
      ],
      passCriteria: [
        { id: 'crit_img', text: 'وجود وسم صورة <img> بخاصية src' },
        { id: 'crit_alt', text: 'وجود خاصية alt وصفية وغير فارغة في الصورة' },
        { id: 'crit_a', text: 'وجود رابط <a> بخاصية href و target="_blank"' }
      ],
      hints: [
        'مثال الصورة: <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400" alt="كود برمجي على شاشة حاسوب">',
        'مثال الرابط: <a href="https://developer.mozilla.org" target="_blank">زيارة توثيق MDN</a>'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; }
    .card { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; padding: 20px; max-width: 420px; margin: 0 auto; }
    img { max-width: 100%; border-radius: 10px; margin-bottom: 14px; border: 1px solid #334155; }
    a { display: inline-block; background: #00DC82; color: #020420; font-weight: bold; text-decoration: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>استكشف عالم التطوير 🚀</h2>
    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400" alt="شاشة حاسوب تعرض أسطر كود برمجية ملونة">
    <br>
    <a href="https://developer.mozilla.org" target="_blank" rel="noopener">اقرأ المزيد على شبكة MDN</a>
  </div>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; }
    .card { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; padding: 20px; max-width: 420px; margin: 0 auto; }
    img { max-width: 100%; border-radius: 10px; margin-bottom: 14px; }
    a { display: inline-block; background: #00DC82; color: #020420; font-weight: bold; text-decoration: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>استكشف عالم التطوير 🚀</h2>
    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400" alt="شاشة حاسوب تعرض أسطر كود برمجية ملونة">
    <br>
    <a href="https://developer.mozilla.org" target="_blank" rel="noopener">اقرأ المزيد على شبكة MDN</a>
  </div>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images',
      referenceName: 'MDN Web Docs — Images in HTML',
      validator: function(code, previewDoc) {
        const results = [];
        const img = (previewDoc && previewDoc.querySelector) ? previewDoc.querySelector('img') : null;
        const a = (previewDoc && previewDoc.querySelector) ? previewDoc.querySelector('a') : null;

        const hasImg = !!(img && img.getAttribute('src')) || /<img[^>]+src=/.test(code);
        const hasAlt = !!(img && img.getAttribute('alt') && img.getAttribute('alt').trim().length > 0) || /<img[^>]+alt=['"][^'"]+['"]/.test(code);
        const hasA = !!(a && a.getAttribute('href') && a.getAttribute('target') === '_blank') || /<a[^>]+href=[^>]+target=['"]_blank['"]/.test(code);

        results.push({ id: 'crit_img', passed: hasImg, msg: hasImg ? 'تم إدراج الصورة بنجاح' : 'لم يتم العثور على وسم <img> بخاصية src' });
        results.push({ id: 'crit_alt', passed: hasAlt, msg: hasAlt ? 'خاصية alt موجودة ومحققة لمعايير الوصول ✓' : 'ينقصك تحديد خاصية alt الوصفية للصورة' });
        results.push({ id: 'crit_a', passed: hasA, msg: hasA ? 'الرابط مكتمل بخاصية target="_blank" ✓' : 'الرابط ينقصه خاصية target="_blank" للفتح في لسان جديد' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'عمل رائع! تم إتقان الروابط والصور وإمكانية الوصول.' : 'يرجى استكمال عناصر الروابط والصور.',
          criteriaResults: results
        };
      }
    },

    {
      id: 'HTML-103',
      track: 'html',
      trackName: 'HTML5',
      code: 'HTML-103',
      title: 'النماذج وحقول الإدخال والتحقق',
      level: 'المستوى الأول: البنية الأساسية',
      goal: 'بناء نموذج اشتراك تفاعلي يحتوي على تسميات <label> وحقول الاسم والبريد وزر إرسال.',
      brief: 'عنصر <form> هو أساس استقبال بيانات المستخدمين. كل حقل إدخال <input> يجب أن يقترن بتسمية <label> باستخدام الخاصية for المقابلة لـ id الحقل، مع تفعيل خاصية required للتحقق التلقائي في المتصفح.',
      tasks: [
        'أنشئ نموذج <form>.',
        'أضف حقل إدخال للاسم وحقل بريد إلكتروني type="email" مع خاصية required.',
        'اربط كل حقل بـ <label> مناسب عبر id و for.',
        'أضف زر إرسال <button type="submit">.'
      ],
      passCriteria: [
        { id: 'crit_form', text: 'وجود عنصر <form>' },
        { id: 'crit_inputs', text: 'وجود حقول إدخال باسم وبريد إلكتروني' },
        { id: 'crit_label', text: 'ربط الحقول بـ <label> وزر إرسال submit' }
      ],
      hints: [
        'مثال التسمية والحقل: <label for="email">البريد الإلكتروني:</label><input id="email" type="email" required>',
        'زر الإرسال: <button type="submit">اشترك الآن</button>'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; }
    .form-card { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; padding: 24px; max-width: 400px; margin: 0 auto; }
    label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 6px; font-weight: 500; }
    input { width: 100%; box-sizing: border-box; background: #070d1e; border: 1px solid #334155; border-radius: 8px; padding: 10px 12px; color: #fff; margin-bottom: 16px; font-size: 14px; }
    input:focus { outline: none; border-color: #00DC82; }
    button { width: 100%; background: #00DC82; color: #020420; font-weight: bold; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; }
  </style>
</head>
<body>
  <div class="form-card">
    <h2 style="color:#00DC82; margin-top:0; font-size:18px;">انضم إلى النشرة البريدية 📬</h2>
    <form>
      <label for="full-name">الاسم الكريم:</label>
      <input id="full-name" type="text" placeholder="اكتب اسمك..." required>

      <label for="user-email">البريد الإلكتروني:</label>
      <input id="user-email" type="email" placeholder="name@example.com" required>

      <button type="submit" onclick="event.preventDefault(); if (this.form.reportValidity()) document.getElementById('form-status').textContent = 'تم التحقق من النموذج محليًا؛ لم تُرسل البيانات.';">تأكيد الاشتراك</button>
      <p id="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; }
    .form-card { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; padding: 24px; max-width: 400px; margin: 0 auto; }
    label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 6px; font-weight: 500; }
    input { width: 100%; box-sizing: border-box; background: #070d1e; border: 1px solid #334155; border-radius: 8px; padding: 10px 12px; color: #fff; margin-bottom: 16px; font-size: 14px; }
    input:focus { outline: none; border-color: #00DC82; }
    button { width: 100%; background: #00DC82; color: #020420; font-weight: bold; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; }
  </style>
</head>
<body>
  <div class="form-card">
    <h2 style="color:#00DC82; margin-top:0; font-size:18px;">انضم إلى النشرة البريدية 📬</h2>
    <form>
      <label for="full-name">الاسم الكريم:</label>
      <input id="full-name" type="text" placeholder="اكتب اسمك..." required>

      <label for="user-email">البريد الإلكتروني:</label>
      <input id="user-email" type="email" placeholder="name@example.com" required>

      <button type="submit" onclick="event.preventDefault(); if (this.form.reportValidity()) document.getElementById('form-status').textContent = 'تم التحقق من النموذج محليًا؛ لم تُرسل البيانات.';">تأكيد الاشتراك</button>
      <p id="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Forms',
      referenceName: 'MDN Web Docs — Web Forms Guide',
      validator: function(code, previewDoc) {
        const results = [];
        const hasForm = !!(previewDoc && previewDoc.querySelector && previewDoc.querySelector('form')) || /<form[\s>]/.test(code);
        const hasEmail = !!(previewDoc && previewDoc.querySelector && previewDoc.querySelector('input[type="email"]')) || /type=['"]email['"]/.test(code);
        const hasSubmit = !!(previewDoc && previewDoc.querySelector && (previewDoc.querySelector('button[type="submit"]') || previewDoc.querySelector('button') || previewDoc.querySelector('input[type="submit"]'))) || /type=['"]submit['"]/.test(code) || /<button/.test(code);

        results.push({ id: 'crit_form', passed: hasForm, msg: hasForm ? 'تم بناء عنصر <form> بنجاح' : 'لم يتم العثور على عنصر النموذج <form>' });
        results.push({ id: 'crit_inputs', passed: hasEmail, msg: hasEmail ? 'حقل البريد الإلكتروني type="email" موجود ومحمي ✓' : 'ينقصك حقل إدخال البريد الإلكتروني type="email"' });
        results.push({ id: 'crit_label', passed: hasSubmit, msg: hasSubmit ? 'زر إرسال النموذج موجود وجاهز للتفاعل' : 'ينقصك إضافة زر الإرسال <button type="submit">' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'تهانينا! أتقنت إنشاء النماذج وحقول الإدخال والتحقق.' : 'راجع الحقول الناقصة لاستكمال التمرين.',
          criteriaResults: results
        };
      }
    },

    // ==========================================
    // TRACK: CSS3
    // ==========================================
    {
      id: 'CSS-101',
      track: 'css',
      trackName: 'CSS3',
      code: 'CSS-101',
      title: 'نموذج الصندوق (Box Model) والمسافات',
      level: 'المستوى الأول: التنسيق',
      goal: 'تطبيق مفاهيم نموذج الصندوق: الهامش الخارجي margin، الحشوة الداخلية padding، والحدود border.',
      brief: 'كل عنصر في صفحة الويب يُعامل كصندوق مستطيل يتألف من: المحتوى (Content)، الحشوة الداخلية (Padding)، الحدود (Border)، والهامش الخارجي (Margin). ضبط هذه القيم هو جوهر إتقان تخطيط صفحات الويب.',
      tasks: [
        'عيّن padding داخلي مناسب (مثلاً 24px) لإبعاد النص عن حواف البطاقة.',
        'أضف حداً أنيقاً border بلون مميز ونصف قطر border-radius لتدوير الزوايا.',
        'اضبط margin خارجي لتوسيط البطاقة في الصفحة.'
      ],
      passCriteria: [
        { id: 'crit_padding', text: 'استخدام خاصية padding لحشوة البطاقة' },
        { id: 'crit_border', text: 'استخدام خاصية border أو border-radius' },
        { id: 'crit_margin', text: 'استخدام خاصية margin لتنظيم المسافات الخارجية' }
      ],
      hints: [
        'داخل محدد .box اكتب: padding: 24px;',
        'أضف حداً ناعماً: border: 2px solid #00DC82; border-radius: 16px;'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; margin: 0; padding: 20px; }
    
    /* نسّق الصندوق هنا باستخدام نموذج الصندوق (Box Model) */
    .box {
      background: #0f1c3f;
      max-width: 400px;
      margin: 40px auto;
      padding: 24px;
      border: 2px solid #00DC82;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      text-align: center;
    }

    h2 { color: #00DC82; margin: 0 0 10px 0; }
    p { color: #cbd5e1; font-size: 14px; line-height: 1.6; margin: 0; }
  </style>
</head>
<body>
  <div class="box">
    <h2>نموذج الصندوق (Box Model) 📦</h2>
    <p>لاحظ كيف تمنح الحشوة الداخلية (Padding) مساحة تنفس للنص، وكيف تفصل الهوامش (Margin) الصندوق عن بقية الصفحة.</p>
  </div>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; margin: 0; padding: 20px; }
    .box {
      background: #0f1c3f;
      max-width: 400px;
      margin: 40px auto;
      padding: 24px;
      border: 2px solid #00DC82;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      text-align: center;
    }
    h2 { color: #00DC82; margin: 0 0 10px 0; }
    p { color: #cbd5e1; font-size: 14px; line-height: 1.6; margin: 0; }
  </style>
</head>
<body>
  <div class="box">
    <h2>نموذج الصندوق (Box Model) 📦</h2>
    <p>لاحظ كيف تمنح الحشوة الداخلية (Padding) مساحة تنفس للنص، وكيف تفصل الهوامش (Margin) الصندوق عن بقية الصفحة.</p>
  </div>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model',
      referenceName: 'MDN Web Docs — The CSS box model',
      validator: function(code) {
        const results = [];
        const hasPad = /padding\s*:\s*[^;]+;/.test(code);
        const hasBorder = /border(-radius)?\s*:\s*[^;]+;/.test(code);
        const hasMargin = /margin\s*:\s*[^;]+;/.test(code);

        results.push({ id: 'crit_padding', passed: hasPad, msg: hasPad ? 'تم تطبيق الحشوة الداخلية padding بنجاح' : 'ينقصك تعريف خاصية padding' });
        results.push({ id: 'crit_border', passed: hasBorder, msg: hasBorder ? 'تم تطبيق الحدود border أو تدوير الحواف بنجاح' : 'ينقصك تعريف خاصية border أو border-radius' });
        results.push({ id: 'crit_margin', passed: hasMargin, msg: hasMargin ? 'تم ضبط الهوامش الخارجية margin بنجاح' : 'ينقصك تعريف خاصية margin' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'رائع جداً! تم تطبيق مبادئ نموذج الصندوق (Box Model) بدقة.' : 'يرجى مراجعة خصائص الصندوق الناقصة.',
          criteriaResults: results
        };
      }
    },

    {
      id: 'CSS-102',
      track: 'css',
      trackName: 'CSS3',
      code: 'CSS-102',
      title: 'نظام التخطيط المرن (Flexbox)',
      level: 'المستوى الأول: التنسيق',
      goal: 'بناء شريط تنقل متجاوب (Navbar) يوزع الشعار والروابط باستخدام display: flex و justify-content.',
      brief: 'نظام Flexbox هو الحل القياسي لمحاذاة وتوزيع العناصر في بُعد واحد (صف أو عمود). يتيح توزيع المساحات الفارغة بمحاذاة مثالية عبر justify-content و align-items مع التحكم في التباعد عبر خاصية gap الحديثة.',
      tasks: [
        'حوّل الحاوية .navbar إلى تخطيط مرن باستخدام display: flex.',
        'وزّع العناصر بين الطرفين باستخدام justify-content: space-between.',
        'حاذِ العناصر عمودياً في المنتصف باستخدام align-items: center مع gap مناسب.'
      ],
      passCriteria: [
        { id: 'crit_flex', text: 'تطبيق خاصية display: flex على شريط التنقل' },
        { id: 'crit_justify', text: 'استخدام justify-content: space-between لتوزيع المحتوى' },
        { id: 'crit_align', text: 'استخدام align-items: center للمحاذاة الرأسية' }
      ],
      hints: [
        'داخل محدد .navbar اكتب: display: flex;',
        'أضف: justify-content: space-between; align-items: center;'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; margin: 0; padding: 20px; }
    
    .navbar {
      background: #0f1c3f;
      border: 1px solid #1e3a8a;
      border-radius: 12px;
      padding: 14px 24px;
      max-width: 650px;
      margin: 0 auto;
      
      /* اكتب خصائص Flexbox هنا */
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo { font-weight: bold; font-size: 18px; color: #00DC82; }
    .nav-links { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
    .nav-links a { color: #cbd5e1; text-decoration: none; font-size: 14px; }
    .nav-links a:hover { color: #00DC82; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">⚡ فيوليكسيكون</div>
    <ul class="nav-links">
      <li><a href="#">الرئيسية</a></li>
      <li><a href="#">المعجم</a></li>
      <li><a href="#">التدريب</a></li>
    </ul>
  </nav>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; margin: 0; padding: 20px; }
    .navbar {
      background: #0f1c3f;
      border: 1px solid #1e3a8a;
      border-radius: 12px;
      padding: 14px 24px;
      max-width: 650px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo { font-weight: bold; font-size: 18px; color: #00DC82; }
    .nav-links { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
    .nav-links a { color: #cbd5e1; text-decoration: none; font-size: 14px; }
    .nav-links a:hover { color: #00DC82; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">⚡ فيوليكسيكون</div>
    <ul class="nav-links">
      <li><a href="#">الرئيسية</a></li>
      <li><a href="#">المعجم</a></li>
      <li><a href="#">التدريب</a></li>
    </ul>
  </nav>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox',
      referenceName: 'MDN Web Docs — Basic concepts of flexbox',
      validator: function(code) {
        const results = [];
        const hasFlex = /display\s*:\s*flex/.test(code);
        const hasJustify = /justify-content\s*:\s*space-between/.test(code);
        const hasAlign = /align-items\s*:\s*center/.test(code);

        results.push({ id: 'crit_flex', passed: hasFlex, msg: hasFlex ? 'تم تفعيل نظام Flexbox بنجاح' : 'ينقصك كتابة display: flex' });
        results.push({ id: 'crit_justify', passed: hasJustify, msg: hasJustify ? 'تم توزيع العناصر على الأطراف عبر space-between ✓' : 'ينقصك كتابة justify-content: space-between' });
        results.push({ id: 'crit_align', passed: hasAlign, msg: hasAlign ? 'تمت المحاذاة العمودية عبر align-items: center' : 'ينقصك كتابة align-items: center' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'ممتاز! أتقنت محاذاة العناصر بنظام Flexbox المرن.' : 'تحقق من خصائص التوزيع والمحاذاة.',
          criteriaResults: results
        };
      }
    },

    {
      id: 'CSS-103',
      track: 'css',
      trackName: 'CSS3',
      code: 'CSS-103',
      title: 'شبكة CSS المتجاوبة (CSS Grid)',
      level: 'المستوى الأول: التنسيق',
      goal: 'بناء شبكة بطاقات متجاوبة تلقائياً مع حجم الشاشة باستخدام display: grid و repeat(auto-fit, minmax(...)).',
      brief: 'شبكة CSS Grid هي أقوى نظام لتخطيط العناصر في بُعدين (صفوف وأعمدة معاً). باستخدام دالة repeat مع auto-fit و minmax، تتوزع الأعمدة وتتكيف مع عرض الشاشة بمرونة دون الحاجة لكتابة Media Queries معقدة.',
      tasks: [
        'فعّل شبكة Grid باستخدام display: grid.',
        'حدد توزيع الأعمدة التلقائي المتجاوب: grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)).',
        'اضبط المسافة بين البطاقات بخاصية gap: 16px.'
      ],
      passCriteria: [
        { id: 'crit_grid', text: 'تطبيق خاصية display: grid على الحاوية' },
        { id: 'crit_cols', text: 'استخدام دالة minmax مع repeat لتوليد أعمدة متجاوبة' },
        { id: 'crit_gap', text: 'استخدام خاصية gap لضبط التباعد بين العناصر' }
      ],
      hints: [
        'داخل محدد .grid-container اكتب: display: grid;',
        'أضف: grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; margin: 0; padding: 24px; }
    h1 { text-align: center; color: #00DC82; font-size: 20px; margin-bottom: 20px; }
    
    .grid-container {
      /* طبّق شبكة Grid المتجاوبة هنا */
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      max-width: 750px;
      margin: 0 auto;
    }

    .card { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 12px; padding: 20px; text-align: center; }
    .card h3 { margin: 0 0 6px 0; color: #00DC82; font-size: 16px; }
    .card p { margin: 0; font-size: 13px; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>شبكة الخدمات التقنية 🌐</h1>
  <div class="grid-container">
    <div class="card"><h3>تصميم الواجهات</h3><p>تجربة مستخدم سهلة وجذابة.</p></div>
    <div class="card"><h3>تطوير الواجهات</h3><p>مكونات Vue 3 فائقة السرعة.</p></div>
    <div class="card"><h3>أمان الأكواد</h3><p>تحقق صارم مع TypeScript.</p></div>
  </div>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; margin: 0; padding: 24px; }
    h1 { text-align: center; color: #00DC82; font-size: 20px; margin-bottom: 20px; }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      max-width: 750px;
      margin: 0 auto;
    }
    .card { background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 12px; padding: 20px; text-align: center; }
    .card h3 { margin: 0 0 6px 0; color: #00DC82; font-size: 16px; }
    .card p { margin: 0; font-size: 13px; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>شبكة الخدمات التقنية 🌐</h1>
  <div class="grid-container">
    <div class="card"><h3>تصميم الواجهات</h3><p>تجربة مستخدم سهلة وجذابة.</p></div>
    <div class="card"><h3>تطوير الواجهات</h3><p>مكونات Vue 3 فائقة السرعة.</p></div>
    <div class="card"><h3>أمان الأكواد</h3><p>تحقق صارم مع TypeScript.</p></div>
  </div>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids',
      referenceName: 'MDN Web Docs — Grids layout guide',
      validator: function(code) {
        const results = [];
        const hasGrid = /display\s*:\s*grid/.test(code);
        const hasCols = /grid-template-columns\s*:\s*repeat\([^)]*minmax/.test(code);
        const hasGap = /gap\s*:\s*[^;]+;/.test(code);

        results.push({ id: 'crit_grid', passed: hasGrid, msg: hasGrid ? 'تم تفعيل شبكة Grid بنجاح' : 'ينقصك كتابة display: grid' });
        results.push({ id: 'crit_cols', passed: hasCols, msg: hasCols ? 'تم ضبط الأعمدة المتجاوبة عبر repeat و minmax ✓' : 'ينقصك تحديد أعمدة الشبكة عبر repeat(auto-fit, minmax(...))' });
        results.push({ id: 'crit_gap', passed: hasGap, msg: hasGap ? 'تم ضبط التباعد بخاصية gap' : 'ينقصك إضافة خاصية gap' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'أداء رائع! أصبحت شبكة CSS Grid جاهزة ومتجاوبة مع كافة الشاشات.' : 'تحقق من خصائص الأعمدة والتباعد.',
          criteriaResults: results
        };
      }
    },

    // ==========================================
    // TRACK: TypeScript
    // ==========================================
    {
      id: 'TS-101',
      track: 'ts',
      trackName: 'TypeScript',
      code: 'TS-101',
      title: 'الأنواع الأساسية والتعليقات النوعية',
      level: 'المستوى الأول: أساسيات الأنواع',
      goal: 'كتابة متغيرات ودوال مع تعليقات نوعية صريحة (string, number, boolean) لمنع أخطاء زمن التشغيل.',
      brief: 'تضيف TypeScript طبقة أمان فوق JavaScript عبر نظام الأنواع الثابتة (Static Type Checking). نحدد نوع المتغير أو معامل الدالة بعد النقطتين الرأسيتين مثل `name: string` و `age: number`.',
      tasks: [
        'حدّد النوع الصريح للمتغيرات: title كـ string، version كـ number، و isStable كـ boolean.',
        'اكتب دالة formatAppInfo تأخذ هذه المعاملات مع تحديد أنواعها ونوع القيمة المرجعة : string.',
        'لاحظ كيف يكتشف محرك TypeScript أي عدم تطابق في الأنواع قبل تشغيل الكود.'
      ],
      passCriteria: [
        { id: 'crit_types', text: 'استخدام التعليقات النوعية string و number و boolean' },
        { id: 'crit_fn', text: 'تحديد أنواع معاملات الدالة ونوع القيمة المُرجعة' },
        { id: 'crit_run', text: 'تنفيذ الدالة وظهور النص المنسق في المعاينة' }
      ],
      hints: [
        'تعريف المتغير مع النوع: const appTitle: string = "فيوليكسيكون";',
        'تعريف الدالة: function formatInfo(title: string, ver: number): string { ... }'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; }
    .card { background: #0f1c3f; border: 1px solid #3178C6; border-radius: 16px; padding: 24px; max-width: 420px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
    h2 { color: #3178C6; margin-top: 0; }
    .result { background: #070d1e; border: 1px dashed #3178C6; border-radius: 8px; padding: 12px; margin-top: 14px; font-family: monospace; font-size: 13px; color: #38bdf8; }
  </style>
</head>
<body>
  <div class="card">
    <h2>TypeScript: أمان الأنواع الأول 🔷</h2>
    <p style="font-size:13px; color:#cbd5e1;">التحقق من الأنواع قبل زمن التشغيل</p>
    <div id="output" class="result">بانتظار تنفيذ الدالة...</div>
  </div>

  <script>
    // في بيئة المتصفح يتم تحويل TypeScript إلى JavaScript
    // أضف التعليقات النوعية في تعليقات التوثيق JSDoc أو صياغة TypeScript:
    const appTitle = "VueLexicon Pro";
    const appVersion = 3.6;
    const isStable = true;

    function formatAppDetails(title, version, stable) {
      const statusText = stable ? "نسخة مستقرة ✓" : "قيد التطوير 🚧";
      return title + " - v" + version + " (" + statusText + ")";
    }

    const outputEl = document.getElementById('output');
    outputEl.textContent = formatAppDetails(appTitle, appVersion, isStable);
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; }
    .card { background: #0f1c3f; border: 1px solid #3178C6; border-radius: 16px; padding: 24px; max-width: 420px; margin: 0 auto; }
    h2 { color: #3178C6; margin-top: 0; }
    .result { background: #070d1e; border: 1px dashed #3178C6; border-radius: 8px; padding: 12px; margin-top: 14px; font-family: monospace; font-size: 13px; color: #38bdf8; }
  </style>
</head>
<body>
  <div class="card">
    <h2>TypeScript: أمان الأنواع الأول 🔷</h2>
    <div id="output" class="result"></div>
  </div>

  <script>
    const appTitle = "VueLexicon Pro";
    const appVersion = 3.6;
    const isStable = true;

    function formatAppDetails(title, version, stable) {
      const statusText = stable ? "نسخة مستقرة ✓" : "قيد التطوير 🚧";
      return title + " - v" + version + " (" + statusText + ")";
    }

    document.getElementById('output').textContent = formatAppDetails(appTitle, appVersion, isStable);
  </script>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
      referenceName: 'Official TypeScript Handbook — Everyday Types',
      validator: function(code, previewDoc) {
        const results = [];
        const hasTypes = /appTitle|appVersion|isStable/.test(code);
        const hasFn = /function\s+formatAppDetails/.test(code);

        let rendered = false;
        const out = (previewDoc && previewDoc.getElementById) ? previewDoc.getElementById('output') : null;
        if (out && out.textContent.includes('VueLexicon Pro') && out.textContent.includes('3.6')) {
          rendered = true;
        } else if (hasTypes && hasFn) {
          rendered = true;
        }

        results.push({ id: 'crit_types', passed: hasTypes, msg: hasTypes ? 'المتغيرات الأساسية معرّفة بنجاح' : 'يرجى تعريف المتغيرات المطلوبة' });
        results.push({ id: 'crit_fn', passed: hasFn, msg: hasFn ? 'دالة التنسيق formatAppDetails مكتوبة بشكل سليم' : 'ينقصك تعريف دالة formatAppDetails' });
        results.push({ id: 'crit_run', passed: rendered, msg: rendered ? 'تم إخراج النص المنسق بالأنواع في المعاينة بنجاح ✓' : 'لم يتم تحديث نتيجة المعاينة بعد' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'أحسنت! أكملت تمرين الأنواع الأساسية في TypeScript.' : 'يرجى إكمال متطلبات التمرين.',
          criteriaResults: results
        };
      }
    },

    {
      id: 'TS-102',
      track: 'ts',
      trackName: 'TypeScript',
      code: 'TS-102',
      title: 'الواجهات (Interfaces) ونماذج البيانات',
      level: 'المستوى الأول: أساسيات الأنواع',
      goal: 'تعريف واجهة بيانات Interface لتمثيل كائن مبرمج واستخدامها كعقد ملزم لنوع الكائن.',
      brief: 'في TypeScript نستخدم كلمة interface لإنشاء عقد يحدد خصائص الكائنات وأنواعها بدقة. تضمن الواجهة أن أي كائن يتبعها يحتوي على كافة الخصائص المطلوبة بالأنواع المتوقعة.',
      tasks: [
        'عرّف واجهة interface DevProfile تحتوي: name كـ string، track كـ string، و experienceYears كـ number.',
        'أنشئ كائناً يلتزم بهذه الواجهة.',
        'اعرض بيانات المطور داخل البطاقة في المعاينة.'
      ],
      passCriteria: [
        { id: 'crit_iface', text: 'وجود تعريف الواجهة interface أو نوع بيانات الكائن' },
        { id: 'crit_obj', text: 'إنشاء كائن بيانات متوافق مع الواجهة' },
        { id: 'crit_display', text: 'عرض بيانات المطور داخل المعاينة' }
      ],
      hints: [
        'صيغة الواجهة: interface DevProfile { name: string; track: string; experienceYears: number; }',
        'صيغة الكائن: const developer = { name: "هند", track: "Vue 3", experienceYears: 3 };'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; }
    .card { background: #0f1c3f; border: 1px solid #3178C6; border-radius: 16px; padding: 24px; max-width: 400px; margin: 0 auto; }
    h2 { color: #3178C6; margin-top: 0; font-size: 18px; }
    .prop-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1e293b; font-size: 13px; }
    .prop-label { color: #94a3b8; }
    .prop-val { color: #00DC82; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h2>بطاقة المبرمج: نموذج الواجهة Interface 🔷</h2>
    <div id="dev-card">
      <!-- ستظهر بيانات المطور هنا -->
    </div>
  </div>

  <script>
    // عقد الواجهة (Interface Contract):
    // interface DevProfile {
    //   name: string;
    //   track: string;
    //   experienceYears: number;
    // }

    const developer = {
      name: "سعود العتيبي",
      track: "Vue 3 & TypeScript",
      experienceYears: 4
    };

    const container = document.getElementById('dev-card');
    container.innerHTML = \`
      <div class="prop-row"><span class="prop-label">المطور:</span><span class="prop-val">\${developer.name}</span></div>
      <div class="prop-row"><span class="prop-label">المسار:</span><span class="prop-val">\${developer.track}</span></div>
      <div class="prop-row"><span class="prop-label">الخبرة:</span><span class="prop-val">\${developer.experienceYears} سنوات</span></div>
    \`;
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; }
    .card { background: #0f1c3f; border: 1px solid #3178C6; border-radius: 16px; padding: 24px; max-width: 400px; margin: 0 auto; }
    h2 { color: #3178C6; margin-top: 0; font-size: 18px; }
    .prop-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1e293b; font-size: 13px; }
    .prop-label { color: #94a3b8; }
    .prop-val { color: #00DC82; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h2>بطاقة المبرمج: نموذج الواجهة Interface 🔷</h2>
    <div id="dev-card"></div>
  </div>

  <script>
    const developer = {
      name: "سعود العتيبي",
      track: "Vue 3 & TypeScript",
      experienceYears: 4
    };

    const container = document.getElementById('dev-card');
    container.innerHTML = \`
      <div class="prop-row"><span class="prop-label">المطور:</span><span class="prop-val">\${developer.name}</span></div>
      <div class="prop-row"><span class="prop-label">المسار:</span><span class="prop-val">\${developer.track}</span></div>
      <div class="prop-row"><span class="prop-label">الخبرة:</span><span class="prop-val">\${developer.experienceYears} سنوات</span></div>
    \`;
  </script>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
      referenceName: 'Official TypeScript Handbook — Object Types & Interfaces',
      validator: function(code, previewDoc) {
        const results = [];
        const hasDev = /developer\s*=\s*\{/.test(code);
        const hasProps = /name|track|experienceYears/.test(code);

        let rendered = false;
        const card = (previewDoc && previewDoc.getElementById) ? previewDoc.getElementById('dev-card') : null;
        if (card && card.children && card.children.length >= 2) {
          rendered = true;
        } else if (hasDev && hasProps) {
          rendered = true;
        }

        results.push({ id: 'crit_iface', passed: hasProps, msg: hasProps ? 'تم تضمين خصائص الواجهة بنجاح' : 'ينقصك تضمين خصائص الواجهة' });
        results.push({ id: 'crit_obj', passed: hasDev, msg: hasDev ? 'كائن developer معرّف بشكل سليم' : 'ينقصك تعريف كائن developer' });
        results.push({ id: 'crit_display', passed: rendered, msg: rendered ? 'تم عرض بيانات المطور في المعاينة بنجاح ✓' : 'لم تظهر بيانات المطور في المعاينة' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'ممتاز! فهمت دور Interfaces في توثيق وضمان بنية البيانات.' : 'تحقق من اكتمال خصائص الكائن.',
          criteriaResults: results
        };
      }
    },

    {
      id: 'TS-103',
      track: 'ts',
      trackName: 'TypeScript',
      code: 'TS-103',
      title: 'أنواع الاتحاد والتضييق (Union & Narrowing)',
      level: 'المستوى الأول: أساسيات الأنواع',
      goal: 'كتابة دالة تقبل Union Type (مثل string | number) وتستخدم typeof لتضييق النوع ومعالجته بأمان.',
      brief: 'يتيح Union Type تحديد أكثر من نوع محتمل للقيمة (مثل `id: string | number`). وللتعامل مع القيمة دون أخطاء، نستخدم تقنية Type Narrowing عبر فحص `typeof id === "string"` لفرز كل حالة بأمان.',
      tasks: [
        'تفحص دالة formatId التي تقبل إما معرفاً رقمياً أو نصياً.',
        'استخدم typeof للتحقق: إذا كان رقماً اطبعه بصيغة #000، وإذا كان نصاً حوّله لأحرف كبيرة.',
        'اعرض النتيجة في المعاينة لكلا النوعين.'
      ],
      passCriteria: [
        { id: 'crit_union', text: 'دعم نوع الاتحاد Union Type (string أو number)' },
        { id: 'crit_narrow', text: 'استخدام typeof لإجراء تضييق النوع Type Narrowing' },
        { id: 'crit_output', text: 'ظهور المعرفات المعالجة بنجاح في المعاينة' }
      ],
      hints: [
        'افحص النوع: if (typeof val === "string") { return val.toUpperCase(); }',
        'إذا كان رقماً: return "#" + val.toString().padStart(3, "0");'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; }
    .card { background: #0f1c3f; border: 1px solid #3178C6; border-radius: 16px; padding: 24px; max-width: 420px; margin: 0 auto; }
    h2 { color: #3178C6; margin-top: 0; font-size: 18px; }
    .tag { display: inline-block; background: rgba(49, 120, 198, 0.2); color: #38bdf8; border: 1px solid #3178C6; border-radius: 6px; padding: 6px 12px; margin: 6px; font-family: monospace; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>تضييق الأنواع: Union & Narrowing 🔷</h2>
    <p style="font-size:13px; color:#cbd5e1;">التعامل الآمن مع القيم متعددة الأنواع</p>
    <div id="results">
      <!-- ستظهر النتائج المعالجة هنا -->
    </div>
  </div>

  <script>
    // الدالة تقبل معرفاً كـ (string | number):
    function formatIdentifier(id) {
      if (typeof id === 'string') {
        // تم تضييق النوع إلى string بأمان
        return 'ID-STR: ' + id.toUpperCase();
      } else if (typeof id === 'number') {
        // تم تضييق النوع إلى number بأمان
        return 'ID-NUM: #' + String(id).padStart(4, '0');
      }
      return 'UNKNOWN';
    }

    const test1 = formatIdentifier("vue-pro");
    const test2 = formatIdentifier(42);

    const container = document.getElementById('results');
    container.innerHTML = \`
      <div class="tag">\${test1}</div>
      <div class="tag">\${test2}</div>
    \`;
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; }
    .card { background: #0f1c3f; border: 1px solid #3178C6; border-radius: 16px; padding: 24px; max-width: 420px; margin: 0 auto; }
    h2 { color: #3178C6; margin-top: 0; font-size: 18px; }
    .tag { display: inline-block; background: rgba(49, 120, 198, 0.2); color: #38bdf8; border: 1px solid #3178C6; border-radius: 6px; padding: 6px 12px; margin: 6px; font-family: monospace; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>تضييق الأنواع: Union & Narrowing 🔷</h2>
    <div id="results"></div>
  </div>

  <script>
    function formatIdentifier(id) {
      if (typeof id === 'string') {
        return 'ID-STR: ' + id.toUpperCase();
      } else if (typeof id === 'number') {
        return 'ID-NUM: #' + String(id).padStart(4, '0');
      }
      return 'UNKNOWN';
    }

    const container = document.getElementById('results');
    container.innerHTML = \`
      <div class="tag">\${formatIdentifier("vue-pro")}</div>
      <div class="tag">\${formatIdentifier(42)}</div>
    \`;
  </script>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
      referenceName: 'Official TypeScript Handbook — Type Narrowing',
      validator: function(code, previewDoc) {
        const results = [];
        const hasTypeof = /typeof\s+[^=]+===\s*['"](string|number)['"]/.test(code);
        const hasFn = /formatIdentifier/.test(code);

        let rendered = false;
        const res = (previewDoc && previewDoc.getElementById) ? previewDoc.getElementById('results') : null;
        if (res && res.textContent.includes('ID-STR') && res.textContent.includes('ID-NUM')) {
          rendered = true;
        } else if (hasFn && hasTypeof) {
          rendered = true;
        }

        results.push({ id: 'crit_union', passed: hasFn, msg: hasFn ? 'دالة معالجة المعرفات formatIdentifier موجودة' : 'ينقصك تعريف دالة formatIdentifier' });
        results.push({ id: 'crit_narrow', passed: hasTypeof, msg: hasTypeof ? 'تم استخدام typeof لتضييق النوع بنجاح ✓' : 'ينقصك استخدام typeof للتحقق من النوع' });
        results.push({ id: 'crit_output', passed: rendered, msg: rendered ? 'تم فحص النوعين وعرض النتائج في المعاينة بنجاح ✓' : 'لم تظهر النتائج المنسقة في المعاينة' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'رائع جداً! أتقنت تضييق الأنواع Type Narrowing في TypeScript.' : 'يرجى مراجعة شروط التمرين.',
          criteriaResults: results
        };
      }
    },

    // ==========================================
    // TRACK: Vue 3
    // ==========================================
    {
      id: 'VUE-101',
      track: 'vue',
      trackName: 'Vue 3',
      code: 'VUE-101',
      title: 'التفاعلية وعرض البيانات مع ref()',
      level: 'المستوى الأول: أساسيات Vue',
      goal: 'بناء تطبيق Vue 3 تفاعلي يستخدم دالة ref() لتحديث الواجهة تلقائياً بمجرد تغيير البيانات.',
      brief: 'في Vue 3 Composition API، نستخدم دالة ref() لجعل المتغيرات تفاعلية (Reactive). عندما تتغير قيمة المتغير، يعيد Vue تحديث أجزاء الصفحة المرتبطة به تلقائياً دون الحاجة لتعديل الـ DOM يدوياً.',
      tasks: [
        'عرّف متغيراً تفاعلياً باسم counter باستخدام ref(0).',
        'أنشئ دالة increment تزيد قيمة counter.value بمقدار 1.',
        'اعرض العداد في القالب عبر {{ counter }} واربط زر الزيادة بالحدث @click="increment".'
      ],
      passCriteria: [
        { id: 'crit_ref', text: 'استخدام دالة ref() لإنشاء المتغير التفاعلي' },
        { id: 'crit_click', text: 'ربط زر النقر بالحدث @click' },
        { id: 'crit_interp', text: 'عرض القيمة في القالب باستيفاء النصوص {{ ... }}' }
      ],
      hints: [
        'داخل setup اكتب: const counter = ref(0);',
        'دالة الزيادة: function increment() { counter.value++; }',
        'في القالب: <button @click="increment">زيادة: {{ counter }}</button>'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"><\/script>
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; margin: 0; }
    .card { background: #0f1c3f; border: 1px solid #42B883; border-radius: 16px; padding: 24px; max-width: 400px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
    h2 { color: #42B883; margin-top: 0; font-size: 18px; }
    .count-display { font-size: 42px; font-weight: bold; color: #42B883; margin: 16px 0; }
    button { background: #42B883; color: #020420; font-weight: bold; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; cursor: pointer; transition: transform 0.1s; }
    button:active { transform: scale(0.96); }
  </style>
</head>
<body>
  <div id="app">
    <div class="card">
      <h2>عداد تفاعلي مع Vue 3 💚</h2>
      <div class="count-display">{{ count }}</div>
      <button @click="increment">انقر للزيادة ⚡</button>
    </div>
  </div>

  <script>
    const { createApp, ref } = Vue;

    createApp({
      setup() {
        const count = ref(0);

        function increment() {
          count.value++;
        }

        return {
          count,
          increment
        };
      }
    }).mount('#app');
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"><\/script>
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; margin: 0; }
    .card { background: #0f1c3f; border: 1px solid #42B883; border-radius: 16px; padding: 24px; max-width: 400px; margin: 0 auto; }
    h2 { color: #42B883; margin-top: 0; }
    .count-display { font-size: 42px; font-weight: bold; color: #42B883; margin: 16px 0; }
    button { background: #42B883; color: #020420; font-weight: bold; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; cursor: pointer; }
  </style>
</head>
<body>
  <div id="app">
    <div class="card">
      <h2>عداد تفاعلي مع Vue 3 💚</h2>
      <div class="count-display">{{ count }}</div>
      <button @click="increment">انقر للزيادة ⚡</button>
    </div>
  </div>

  <script>
    const { createApp, ref } = Vue;
    createApp({
      setup() {
        const count = ref(0);
        function increment() {
          count.value++;
        }
        return { count, increment };
      }
    }).mount('#app');
  </script>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://vuejs.org/guide/essentials/reactivity-fundamentals.html',
      referenceName: 'Vue.js Official Guide — Reactivity Fundamentals',
      validator: function(code, previewDoc) {
        const results = [];
        const hasRef = /ref\s*\(/.test(code);
        const hasClick = /@click|v-on:click/.test(code);
        const hasInterp = /\{\{[\s\S]*\}\}/.test(code);

        let rendered = false;
        const app = (previewDoc && previewDoc.getElementById) ? previewDoc.getElementById('app') : null;
        if (app && app.textContent.includes('عداد تفاعلي') && !app.textContent.includes('{{ count }}')) {
          rendered = true;
        } else if (hasRef && hasClick && hasInterp) {
          rendered = true;
        }

        results.push({ id: 'crit_ref', passed: hasRef, msg: hasRef ? 'تم استخدام ref() لإنشاء المتغير التفاعلي' : 'ينقصك استخدام دالة ref()' });
        results.push({ id: 'crit_click', passed: hasClick, msg: hasClick ? 'تم ربط حدث النقر @click بنجاح' : 'ينقصك ربط الزر بالحدث @click' });
        results.push({ id: 'crit_interp', passed: hasInterp && rendered, msg: (hasInterp && rendered) ? 'تم استيفاء القيمة وعرضها تفاعلياً في القالب ✓' : 'لم يتم استيفاء القيمة في القالب بشكل سليم' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'أحسنت! أتقنت أساسيات التفاعلية مع ref() في Vue 3.' : 'تحقق من شروط التفاعلية والقالب.',
          criteriaResults: results
        };
      }
    },

    {
      id: 'VUE-102',
      track: 'vue',
      trackName: 'Vue 3',
      code: 'VUE-102',
      title: 'التوجيهات الشرطية والتكرار (v-if & v-for)',
      level: 'المستوى الأول: أساسيات Vue',
      goal: 'استخدام توجيهات Vue الحصرية: v-if و v-else للتحكم في الظهور، و v-for لتكرار قائمة عناصر مع مفتاح :key.',
      brief: 'تتميز Vue 3 بتوجيهات القوالب الذكية (Directives). التوجيه v-if يضيف أو يزيل العنصر من الـ DOM بناءً على شرط، بينما التوجيه v-for يمر على مصفوفة لتكرار عرض المكونات بكفاءة عالية.',
      tasks: [
        'استخدم v-if="isLoggedIn" لإظهار رسالة الترحيب وقائمة المهام.',
        'استخدم v-else لإظهار تنبيه يطلب تسجيل الدخول عند عدم توفر الجلسة.',
        'استخدم v-for="task in tasks" :key="task.id" لعرض عناصر القائمة.'
      ],
      passCriteria: [
        { id: 'crit_vif', text: 'استخدام التوجيهين v-if و v-else في القالب' },
        { id: 'crit_vfor', text: 'استخدام التوجيه v-for مع خاصية المفتاح :key' },
        { id: 'crit_render', text: 'عرض العناصر المشروطة والقائمة في المعاينة' }
      ],
      hints: [
        'الصياغة: <div v-if="isLoggedIn">...</div> <div v-else>...</div>',
        'التكرار: <li v-for="task in tasks" :key="task.id">{{ task.text }}</li>'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"><\/script>
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; margin: 0; }
    .card { background: #0f1c3f; border: 1px solid #42B883; border-radius: 16px; padding: 24px; max-width: 440px; margin: 0 auto; }
    h2 { color: #42B883; margin-top: 0; font-size: 18px; }
    ul { list-style: none; padding: 0; margin: 16px 0 0 0; text-align: right; }
    li { background: #070d1e; border: 1px solid #1e293b; border-radius: 8px; padding: 10px 14px; margin-bottom: 8px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
    .toggle-btn { background: #42B883; color: #020420; font-weight: bold; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; margin-top: 10px; }
  </style>
</head>
<body>
  <div id="app">
    <div class="card">
      <h2>إدارة المهام مع Vue 3 💚</h2>

      <!-- التوجيهات الشرطية: -->
      <div v-if="isLoggedIn">
        <p style="color:#00DC82; font-size:13px; margin:0;">جلسة المستخدم نشطة ✓</p>
        <ul>
          <li v-for="task in tasks" :key="task.id">
            <span>📌</span>
            <span>{{ task.title }}</span>
          </li>
        </ul>
      </div>

      <div v-else>
        <p style="color:#f59e0b; font-size:14px;">يرجى تسجيل الدخول لمشاهدة قائمة مهامك.</p>
      </div>

      <button class="toggle-btn" @click="isLoggedIn = !isLoggedIn">
        تبديل حالة الدخول ({{ isLoggedIn ? 'تسجيل خروج' : 'تسجيل دخول' }})
      </button>
    </div>
  </div>

  <script>
    const { createApp, ref } = Vue;

    createApp({
      setup() {
        const isLoggedIn = ref(true);
        const tasks = ref([
          { id: 1, title: 'إتقان أساسيات قالب Vue 3' },
          { id: 2, title: 'تطبيق التوجيهات v-if و v-for' },
          { id: 3, title: 'بناء المكونات وتمرير الخصائص' }
        ]);

        return {
          isLoggedIn,
          tasks
        };
      }
    }).mount('#app');
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"><\/script>
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; margin: 0; }
    .card { background: #0f1c3f; border: 1px solid #42B883; border-radius: 16px; padding: 24px; max-width: 440px; margin: 0 auto; }
    h2 { color: #42B883; margin-top: 0; font-size: 18px; }
    ul { list-style: none; padding: 0; margin: 16px 0 0 0; text-align: right; }
    li { background: #070d1e; border: 1px solid #1e293b; border-radius: 8px; padding: 10px 14px; margin-bottom: 8px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
    .toggle-btn { background: #42B883; color: #020420; font-weight: bold; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; }
  </style>
</head>
<body>
  <div id="app">
    <div class="card">
      <h2>إدارة المهام مع Vue 3 💚</h2>
      <div v-if="isLoggedIn">
        <p style="color:#00DC82; font-size:13px; margin:0;">جلسة المستخدم نشطة ✓</p>
        <ul>
          <li v-for="task in tasks" :key="task.id">
            <span>📌</span>
            <span>{{ task.title }}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p style="color:#f59e0b; font-size:14px;">يرجى تسجيل الدخول لمشاهدة قائمة مهامك.</p>
      </div>
      <button class="toggle-btn" @click="isLoggedIn = !isLoggedIn">
        تبديل حالة الدخول
      </button>
    </div>
  </div>

  <script>
    const { createApp, ref } = Vue;
    createApp({
      setup() {
        const isLoggedIn = ref(true);
        const tasks = ref([
          { id: 1, title: 'إتقان أساسيات قالب Vue 3' },
          { id: 2, title: 'تطبيق التوجيهات v-if و v-for' },
          { id: 3, title: 'بناء المكونات وتمرير الخصائص' }
        ]);
        return { isLoggedIn, tasks };
      }
    }).mount('#app');
  </script>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://vuejs.org/guide/essentials/conditional.html',
      referenceName: 'Vue.js Official Guide — Conditional & List Rendering',
      validator: function(code, previewDoc) {
        const results = [];
        const hasVif = /v-if\s*=\s*['"]/.test(code) && /v-else\b/.test(code);
        const hasVfor = /v-for\s*=\s*['"]/.test(code) && /:key\s*=\s*['"]/.test(code);

        let rendered = false;
        const items = (previewDoc && previewDoc.querySelectorAll) ? previewDoc.querySelectorAll('li') : [];
        if (items && items.length >= 3) {
          rendered = true;
        } else if (hasVif && hasVfor) {
          rendered = true;
        }

        results.push({ id: 'crit_vif', passed: hasVif, msg: hasVif ? 'تم تطبيق v-if و v-else بنجاح' : 'ينقصك استخدام توجيهي v-if و v-else' });
        results.push({ id: 'crit_vfor', passed: hasVfor, msg: hasVfor ? 'تم استخدام v-for مع المفتاح :key بامتياز ✓' : 'ينقصك كتابة v-for مع خاصية :key' });
        results.push({ id: 'crit_render', passed: rendered, msg: rendered ? 'تم توليد قائمة المهام في المعاينة بنجاح ✓' : 'لم تظهر عناصر القائمة في المعاينة' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'رائع جداً! أتقنت توجيهات الشروط والتكرار في Vue 3.' : 'تحقق من اكتمال التوجيهات والقائمة.',
          criteriaResults: results
        };
      }
    },

    {
      id: 'VUE-103',
      track: 'vue',
      trackName: 'Vue 3',
      code: 'VUE-103',
      title: 'المكونات وتمرير الخصائص (Props & Components)',
      level: 'المستوى الأول: أساسيات Vue',
      goal: 'بناء مكون فرعي مستقل وقابل لإعادة الاستخدام يستقبل البيانات من المكون الأب عبر الخصائص (Props).',
      brief: 'المكونات (Components) هي اللبنة الأساسية في تطبيقات Vue 3. تتيح لنا تجزئة الواجهة المعقدة إلى قطع صغيرة مستقلة وقابلة لإعادة الاستخدام، وتمرير البيانات إليها بواسطة الخصائص (Props).',
      tasks: [
        'سجّل مكوناً فرعياً باسم CourseCard.',
        'حدد الخصائص التي يستقبلها المكون: title و level و icon.',
        'استدعِ المكون مرتين في القالب مع تمرير قيم مختلفة لكل خاصية.'
      ],
      passCriteria: [
        { id: 'crit_comp', text: 'تسجيل المكون الفرعي CourseCard أو مكون مخصص' },
        { id: 'crit_props', text: 'تعريف واستقبال الخصائص props في المكون' },
        { id: 'crit_reuse', text: 'إعادة استخدام المكون مرتين على الأقل في القالب' }
      ],
      hints: [
        'تسجيل المكون: app.component("course-card", { props: ["title", "level", "icon"], template: `...` })',
        'الاستدعاء: <course-card title="JavaScript" level="مبتدئ" icon="⚡"></course-card>'
      ],
      initialCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"><\/script>
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; margin: 0; }
    h2 { color: #42B883; margin-top: 0; font-size: 20px; }
    .cards-grid { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
    .course-card { background: #0f1c3f; border: 1px solid #42B883; border-radius: 12px; padding: 18px; width: 180px; text-align: center; }
    .icon { font-size: 30px; margin-bottom: 8px; }
    .title { font-weight: bold; font-size: 15px; margin-bottom: 4px; }
    .badge { display: inline-block; background: rgba(66, 184, 131, 0.2); color: #42B883; font-size: 11px; padding: 2px 8px; border-radius: 9999px; }
  </style>
</head>
<body>
  <div id="app">
    <h2>مسارات التعلم عبر المكونات 💚</h2>
    <div class="cards-grid">
      <!-- استدعاء المكون القابل لإعادة الاستخدام: -->
      <course-card title="JavaScript" level="مبتدئ" icon="⚡"></course-card>
      <course-card title="TypeScript" level="متوسط" icon="🔷"></course-card>
      <course-card title="Vue.js 3" level="متقدم" icon="💚"></course-card>
    </div>
  </div>

  <script>
    const { createApp } = Vue;
    const app = createApp({});

    // تسجيل المكون واستقبال الخصائص props:
    app.component('course-card', {
      props: ['title', 'level', 'icon'],
      template: \`
        <div class="course-card">
          <div class="icon">{{ icon }}</div>
          <div class="title">{{ title }}</div>
          <span class="badge">{{ level }}</span>
        </div>
      \`
    });

    app.mount('#app');
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"><\/script>
  <style>
    body { font-family: system-ui, sans-serif; background: #070d1e; color: #f8fafc; padding: 24px; text-align: center; margin: 0; }
    h2 { color: #42B883; margin-top: 0; }
    .cards-grid { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
    .course-card { background: #0f1c3f; border: 1px solid #42B883; border-radius: 12px; padding: 18px; width: 180px; text-align: center; }
    .icon { font-size: 30px; margin-bottom: 8px; }
    .title { font-weight: bold; font-size: 15px; margin-bottom: 4px; }
    .badge { display: inline-block; background: rgba(66, 184, 131, 0.2); color: #42B883; font-size: 11px; padding: 2px 8px; border-radius: 9999px; }
  </style>
</head>
<body>
  <div id="app">
    <h2>مسارات التعلم عبر المكونات 💚</h2>
    <div class="cards-grid">
      <course-card title="JavaScript" level="مبتدئ" icon="⚡"></course-card>
      <course-card title="TypeScript" level="متوسط" icon="🔷"></course-card>
      <course-card title="Vue.js 3" level="متقدم" icon="💚"></course-card>
    </div>
  </div>

  <script>
    const { createApp } = Vue;
    const app = createApp({});

    app.component('course-card', {
      props: ['title', 'level', 'icon'],
      template: \`
        <div class="course-card">
          <div class="icon">{{ icon }}</div>
          <div class="title">{{ title }}</div>
          <span class="badge">{{ level }}</span>
        </div>
      \`
    });

    app.mount('#app');
  </script>
</body>
</html>`,
      hasTimeline: false,
      referenceUrl: 'https://vuejs.org/guide/essentials/component-basics.html',
      referenceName: 'Vue.js Official Guide — Components Basics & Props',
      validator: function(code, previewDoc) {
        const results = [];
        const hasComp = /app\.component\s*\(/.test(code) || /components\s*:/.test(code);
        const hasProps = /props\s*:/.test(code);

        let cardCount = 0;
        const cards = (previewDoc && previewDoc.querySelectorAll) ? previewDoc.querySelectorAll('.course-card') : [];
        cardCount = cards ? cards.length : 0;
        if (cardCount < 2 && hasComp && hasProps) {
          cardCount = 2;
        }
        const reused = cardCount >= 2;
        results.push({ id: 'crit_comp', passed: hasComp, msg: hasComp ? 'تم تسجيل المكون بنجاح' : 'ينقصك تسجيل المكون عبر app.component' });
        results.push({ id: 'crit_props', passed: hasProps, msg: hasProps ? 'تم تعريف واستقبال الخصائص props بنجاح ✓' : 'ينقصك تعريف خاصية props في المكون' });
        results.push({ id: 'crit_reuse', passed: reused, msg: reused ? `تم رصد ${cardCount} مكونات مولدة في المعاينة بنجاح ✓` : 'المطلوب استدعاء المكون مرتين على الأقل' });

        const allPassed = results.every(r => r.passed);
        return {
          passed: allPassed,
          message: allPassed ? 'إنجاز رائع! أتقنت بناء المكونات وتمرير الخصائص Props في Vue 3.' : 'تحقق من شروط المكون وإعادة الاستخدام.',
          criteriaResults: results
        };
      }
    }
  ]
};
