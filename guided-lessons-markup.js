/* Reviewed HTML/CSS groups; reuse original lesson identifiers where present. */
(function(root){
'use strict';
const entries=[
  {
    "id": "html-attributes",
    "language": "html",
    "title": "الخصائص والروابط الداخلية",
    "level": "beginner",
    "prerequisites": [
      "html-structure"
    ],
    "goal": "أنشئ رابطًا href=\"#plan\" نصه «خطتي»، وعنوان h2 معرفه plan.",
    "explanation": "تضيف الخصائص معلومات إلى العنصر. يحدد href وجهة الرابط، ويشير href الذي يبدأ بـ# إلى عنصر له id مطابق في المستند نفسه. يجب أن يكون id فريدًا في الصفحة. يمكن للنص داخل الرابط وصف وجهته بدل عبارة مبهمة مثل «هنا».",
    "example": "<a href=\"#goal\">انتقل إلى الهدف</a>\n<h2 id=\"goal\">هدفي</h2>",
    "prediction": {
      "question": "إلى أي عنصر يشير #goal؟",
      "choices": [
        "عنصر id=\"goal\"",
        "أي عنصر class=\"goal\"",
        "موقع خارجي"
      ],
      "correct": 0,
      "why": "تشير علامة # في رابط داخلي إلى معرف عنصر."
    },
    "understanding": {
      "question": "ما شرط id في المستند؟",
      "choices": [
        "أن يتكرر في كل فقرة",
        "أن يكون فريدًا",
        "أن يكون رقمًا فقط"
      ],
      "correct": 1,
      "why": "المعرف يميز عنصرًا واحدًا داخل المستند."
    },
    "output": {
      "question": "هل ينشئ href=\"#goal\" صفحة جديدة؟",
      "choices": [
        "نعم دائمًا",
        "يحذف الصفحة",
        "لا، ينتقل إلى هدف في الصفحة"
      ],
      "correct": 2,
      "why": "هذا رابط جزء داخل المستند."
    },
    "exercise": {
      "goal": "أنشئ رابطًا href=\"#plan\" نصه «خطتي»، وعنوان h2 معرفه plan.",
      "starter": "<!-- اكتب البنية المطلوبة -->",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "a",
            "kind": "attr",
            "expected": "#plan",
            "label": "الوجهة",
            "property": "href"
          },
          {
            "selector": "a",
            "kind": "text",
            "expected": "خطتي",
            "label": "وصف الرابط"
          },
          {
            "selector": "h2#plan",
            "kind": "count",
            "expected": 1,
            "label": "الهدف موجود"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح وجهة الرابط ومعرف الهدف وفق متطلبات التمرين.",
      "starter": "<a href=\"#other\">خطتي</a><h2 id=\"goal\">الهدف</h2>",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "a",
            "kind": "attr",
            "expected": "#plan",
            "label": "الوجهة",
            "property": "href"
          },
          {
            "selector": "a",
            "kind": "text",
            "expected": "خطتي",
            "label": "وصف الرابط"
          },
          {
            "selector": "h2#plan",
            "kind": "count",
            "expected": 1,
            "label": "الهدف موجود"
          }
        ]
      }
    },
    "mastery": {
      "goal": "أنشئ رابطًا نصه «الملخص» إلى #summary، وعنصر section معرفه summary.",
      "starter": "",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "a",
            "kind": "attr",
            "expected": "#summary",
            "label": "الوجهة الجديدة",
            "property": "href"
          },
          {
            "selector": "a",
            "kind": "text",
            "expected": "الملخص",
            "label": "نص الرابط"
          },
          {
            "selector": "section#summary",
            "kind": "count",
            "expected": 1,
            "label": "قسم الهدف"
          }
        ]
      }
    },
    "hints": [
      "href خاصية الرابط، وid خاصية الهدف.",
      "لا تكتب # داخل قيمة id نفسها.",
      "طابق الحروف في href بعد # مع قيمة id."
    ],
    "predictionHints": [
      "إلى أي عنصر يشير #goal؟",
      "اقرأ اسم العنصر والخصائص في المثال قبل اختيار الإجابة.",
      "تشير علامة # في رابط داخلي إلى معرف عنصر."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a"
    ]
  },
  {
    "id": "html-images",
    "language": "html",
    "title": "الصور والنص البديل",
    "level": "beginner",
    "prerequisites": [
      "html-attributes"
    ],
    "goal": "أنشئ img واحدًا له alt=\"شعار مشروعي\" ومصدر صورة بيانات محلي يبدأ بـdata:image/.",
    "explanation": "يحدد src مورد الصورة، ويصف alt بديلًا نصيًا لوظيفتها عند تعذر رؤيتها. تصف الصورة المعلوماتية بإيجاز، أما الزخرفية التي لا تضيف معنى فتأخذ alt فارغًا. لا يكفي اسم الملف وصفًا للصورة. يستخدم هذا التمرين صورة بيانات محلية صغيرة كي لا يعتمد على الشبكة.",
    "example": "<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==\" alt=\"مؤشر الإنجاز\">",
    "prediction": {
      "question": "ما دور alt في المثال؟",
      "choices": [
        "تكبير الصورة",
        "بديل نصي للصورة",
        "تنزيل ملف"
      ],
      "correct": 1,
      "why": "يوفر alt بديلًا نصيًا يؤدي غرض الصورة."
    },
    "understanding": {
      "question": "ما alt المناسب لصورة زخرفية فقط؟",
      "choices": [
        "اسم الملف دائمًا",
        "وصف طويل إلزامي",
        "قيمة فارغة alt=\"\""
      ],
      "correct": 2,
      "why": "القيمة الفارغة تساعد تقنيات المساعدة على تجاوز الزخرفة."
    },
    "output": {
      "question": "ما الخاصية التي تحدد مورد الصورة؟",
      "choices": [
        "src",
        "href دائمًا",
        "class"
      ],
      "correct": 0,
      "why": "يحدد src مصدر الصورة."
    },
    "exercise": {
      "goal": "أنشئ img واحدًا له alt=\"شعار مشروعي\" ومصدر صورة بيانات محلي يبدأ بـdata:image/.",
      "starter": "<!-- اكتب البنية المطلوبة -->",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "img",
            "kind": "count",
            "expected": 1,
            "label": "صورة واحدة"
          },
          {
            "selector": "img",
            "kind": "attr",
            "expected": "شعار مشروعي",
            "label": "البديل",
            "property": "alt"
          },
          {
            "selector": "img[src^=\"data:image/\"]",
            "kind": "count",
            "expected": 1,
            "label": "مصدر محلي"
          },
          {
            "selector": "img",
            "kind": "imageLoaded",
            "expected": true,
            "label": "صورة قابلة للتحميل"
          }
        ]
      }
    },
    "fix": {
      "goal": "أضف الوصف البديل المطلوب إلى الصورة.",
      "starter": "<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==\">",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "img",
            "kind": "count",
            "expected": 1,
            "label": "صورة واحدة"
          },
          {
            "selector": "img",
            "kind": "attr",
            "expected": "شعار مشروعي",
            "label": "البديل",
            "property": "alt"
          },
          {
            "selector": "img[src^=\"data:image/\"]",
            "kind": "count",
            "expected": 1,
            "label": "مصدر محلي"
          },
          {
            "selector": "img",
            "kind": "imageLoaded",
            "expected": true,
            "label": "صورة قابلة للتحميل"
          }
        ]
      }
    },
    "mastery": {
      "goal": "أنشئ صورة زخرفية واحدة لها alt فارغ ومصدر بيانات محلي.",
      "starter": "",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "img",
            "kind": "count",
            "expected": 1,
            "label": "الصورة"
          },
          {
            "selector": "img",
            "kind": "attr",
            "expected": "",
            "label": "بديل زخرفي",
            "property": "alt"
          },
          {
            "selector": "img[src^=\"data:image/\"]",
            "kind": "count",
            "expected": 1,
            "label": "المصدر"
          },
          {
            "selector": "img",
            "kind": "imageLoaded",
            "expected": true,
            "label": "صورة قابلة للتحميل"
          }
        ]
      }
    },
    "hints": [
      "اختر img بدل عنصر رابط.",
      "اكتب alt بين علامتي اقتباس.",
      "الفرق مهم بين غياب alt ووجوده بقيمة فارغة."
    ],
    "predictionHints": [
      "ما دور alt في المثال؟",
      "اقرأ اسم العنصر والخصائص في المثال قبل اختيار الإجابة.",
      "يوفر alt بديلًا نصيًا يؤدي غرض الصورة."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img"
    ]
  },
  {
    "id": "html-lists",
    "language": "html",
    "title": "القوائم المرتبة وغير المرتبة",
    "level": "beginner",
    "prerequisites": [
      "html-structure"
    ],
    "goal": "أنشئ ul واحدًا له ثلاثة أبناء li نصوصهم تختارها.",
    "explanation": "تجمع ul عناصر لا يعتمد معناها على ترتيب رقمي، وتجمع ol خطوات يكون ترتيبها مهمًا. يمثل li عنصرًا داخل قائمة. لا تنشئ الفواصل أو الأرقام المكتوبة يدويًا البنية الدلالية نفسها. يمكن تنسيق المظهر لاحقًا دون تغيير نوع القائمة.",
    "example": "<ol>\n  <li>اقرأ المطلوب</li>\n  <li>طبّق الحل</li>\n</ol>",
    "prediction": {
      "question": "كم عنصر قائمة في المثال؟",
      "choices": [
        "واحد",
        "اثنان",
        "ثلاثة"
      ],
      "correct": 1,
      "why": "كل li يمثل عنصرًا واحدًا."
    },
    "understanding": {
      "question": "ما الأنسب لخطوات لها ترتيب ضروري؟",
      "choices": [
        "ol",
        "img",
        "p وحده"
      ],
      "correct": 0,
      "why": "تمثل ol قائمة مرتبة."
    },
    "output": {
      "question": "أين يوضع li في هذا الاستخدام؟",
      "choices": [
        "داخل script",
        "خارج كل قائمة",
        "داخل ul أو ol"
      ],
      "correct": 2,
      "why": "عناصر القائمة أبناء للحاوية المناسبة."
    },
    "exercise": {
      "goal": "أنشئ ul واحدًا له ثلاثة أبناء li نصوصهم تختارها.",
      "starter": "<!-- اكتب البنية المطلوبة -->",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "ul",
            "kind": "count",
            "expected": 1,
            "label": "قائمة غير مرتبة"
          },
          {
            "selector": "ul > li",
            "kind": "count",
            "expected": 3,
            "label": "ثلاثة عناصر"
          },
          {
            "selector": "li",
            "kind": "nonempty",
            "expected": true,
            "label": "بنود لها محتوى"
          }
        ]
      }
    },
    "fix": {
      "goal": "حوّل هذه الفقرات إلى قائمة غير مرتبة بثلاثة عناصر.",
      "starter": "<p>قراءة</p><p>تطبيق</p><p>مراجعة</p>",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "ul",
            "kind": "count",
            "expected": 1,
            "label": "قائمة غير مرتبة"
          },
          {
            "selector": "ul > li",
            "kind": "count",
            "expected": 3,
            "label": "ثلاثة عناصر"
          },
          {
            "selector": "li",
            "kind": "nonempty",
            "expected": true,
            "label": "بنود لها محتوى"
          }
        ]
      }
    },
    "mastery": {
      "goal": "أنشئ ol واحدًا يتكون من خطوتين li.",
      "starter": "",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "ol",
            "kind": "count",
            "expected": 1,
            "label": "قائمة مرتبة"
          },
          {
            "selector": "ol > li",
            "kind": "count",
            "expected": 2,
            "label": "خطوتان"
          },
          {
            "selector": "li",
            "kind": "nonempty",
            "expected": true,
            "label": "بنود لها محتوى"
          }
        ]
      }
    },
    "hints": [
      "ابدأ بحاوية القائمة المناسبة.",
      "ضع كل بند داخل li مستقل.",
      "تأكد أن li أبناء مباشرون للقائمة المطلوبة."
    ],
    "predictionHints": [
      "كم عنصر قائمة في المثال؟",
      "اقرأ اسم العنصر والخصائص في المثال قبل اختيار الإجابة.",
      "كل li يمثل عنصرًا واحدًا."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul"
    ]
  },
  {
    "id": "html-table",
    "language": "html",
    "title": "الجداول ورؤوس الأعمدة",
    "level": "beginner",
    "prerequisites": [
      "html-lists"
    ],
    "goal": "أنشئ table له caption نصه «نتائجي»، وصف رؤوس فيه خليتا th بكل منهما scope=\"col\"، وصف بيانات فيه خليتا td.",
    "explanation": "يستخدم table للبيانات الجدولية، وليس لتخطيط واجهة الصفحة. يوضح caption موضوع الجدول. يجمع tr خلايا صف، وتحدد th خلية رأس بينما تحتوي td بيانات. يساعد scope=\"col\" على بيان أن الرأس يخص عمودًا.",
    "example": "<table>\n<caption>نتائج الأسبوع</caption>\n<tr><th scope=\"col\">المهارة</th><th scope=\"col\">النتيجة</th></tr>\n<tr><td>HTML</td><td>متقن</td></tr>\n</table>",
    "prediction": {
      "question": "ما العنصر الذي يصف موضوع الجدول؟",
      "choices": [
        "caption",
        "div",
        "input"
      ],
      "correct": 0,
      "why": "يوفر caption عنوانًا للجدول."
    },
    "understanding": {
      "question": "ما معنى scope=\"col\"؟",
      "choices": [
        "خلية مخفية",
        "رأس لعمود",
        "عرض عمود ثابت"
      ],
      "correct": 1,
      "why": "توضح الصفة علاقة الرأس بالعمود."
    },
    "output": {
      "question": "هل table مناسب لتخطيط بطاقات الصفحة؟",
      "choices": [
        "نعم دائمًا",
        "لا توجد بدائل",
        "لا؛ خصصه للبيانات الجدولية"
      ],
      "correct": 2,
      "why": "التخطيط البصري يستخدم CSS."
    },
    "exercise": {
      "goal": "أنشئ table له caption نصه «نتائجي»، وصف رؤوس فيه خليتا th بكل منهما scope=\"col\"، وصف بيانات فيه خليتا td.",
      "starter": "<!-- اكتب البنية المطلوبة -->",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "table",
            "kind": "count",
            "expected": 1,
            "label": "جدول"
          },
          {
            "selector": "table caption",
            "kind": "text",
            "expected": "نتائجي",
            "label": "عنوان"
          },
          {
            "selector": "table th[scope=\"col\"]",
            "kind": "count",
            "expected": 2,
            "label": "رأسا عمودين"
          },
          {
            "selector": "table td",
            "kind": "count",
            "expected": 2,
            "label": "خليتا بيانات"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح رؤوس الأعمدة وأضف عنوان الجدول وصف البيانات حسب المطلوب.",
      "starter": "<table><tr><td>مهارة</td><td>حالة</td></tr></table>",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "table",
            "kind": "count",
            "expected": 1,
            "label": "جدول"
          },
          {
            "selector": "table caption",
            "kind": "text",
            "expected": "نتائجي",
            "label": "عنوان"
          },
          {
            "selector": "table th[scope=\"col\"]",
            "kind": "count",
            "expected": 2,
            "label": "رأسا عمودين"
          },
          {
            "selector": "table td",
            "kind": "count",
            "expected": 2,
            "label": "خليتا بيانات"
          }
        ]
      }
    },
    "mastery": {
      "goal": "أنشئ جدولًا بعنوان «أيامي»، فيه رأس عمود واحد scope=\"col\" وخليتا بيانات td في صفين.",
      "starter": "",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "caption",
            "kind": "text",
            "expected": "أيامي",
            "label": "العنوان"
          },
          {
            "selector": "th[scope=\"col\"]",
            "kind": "count",
            "expected": 1,
            "label": "رأس عمود"
          },
          {
            "selector": "td",
            "kind": "count",
            "expected": 2,
            "label": "بيانات اليومين"
          },
          {
            "selector": "tr",
            "kind": "count",
            "expected": 3,
            "label": "ثلاثة صفوف"
          }
        ]
      }
    },
    "hints": [
      "ابدأ بالعنوان caption داخل table.",
      "استخدم th للرؤوس وtd للبيانات.",
      "لا تنس scope=\"col\" في كل رأس عمود."
    ],
    "predictionHints": [
      "ما العنصر الذي يصف موضوع الجدول؟",
      "اقرأ اسم العنصر والخصائص في المثال قبل اختيار الإجابة.",
      "يوفر caption عنوانًا للجدول."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Table_accessibility"
    ]
  },
  {
    "id": "html-form",
    "language": "html",
    "title": "التسميات والمدخلات",
    "level": "beginner",
    "prerequisites": [
      "html-attributes"
    ],
    "goal": "أضف label نصها «بريدي» تربط for=\"email\" بحقل input id=\"email\" وname=\"email\" وtype=\"email\".",
    "explanation": "يربط label تسمية نصية بحقل. في الربط الصريح تطابق for في label قيمة id في input؛ النقر على التسمية يركز الحقل. يحدد name اسم القيمة عند إرسال النموذج، وهو غرض مختلف عن id. يحدد type نوع المدخل، ولا يغني placeholder عن تسمية واضحة.",
    "example": "<label for=\"task\">اسم المهمة</label>\n<input id=\"task\" name=\"task\" type=\"text\">",
    "prediction": {
      "question": "ماذا يربط التسمية بالحقل؟",
      "choices": [
        "تطابق لون العنصرين",
        "تطابق for مع id",
        "حجم النص"
      ],
      "correct": 1,
      "why": "تشير for إلى معرف الحقل."
    },
    "understanding": {
      "question": "ما غرض name؟",
      "choices": [
        "اسم القيمة المرسلة",
        "لون المدخل",
        "إخفاء التسمية"
      ],
      "correct": 0,
      "why": "يستعمل النموذج name مفتاحًا للقيمة."
    },
    "output": {
      "question": "ما النتيجة المعتادة للنقر على label المرتبطة بحقل نصي؟",
      "choices": [
        "حذف النص",
        "فتح موقع خارجي",
        "انتقال التركيز إلى الحقل"
      ],
      "correct": 2,
      "why": "يمكن تفعيل الحقل عبر التسمية."
    },
    "exercise": {
      "goal": "أضف label نصها «بريدي» تربط for=\"email\" بحقل input id=\"email\" وname=\"email\" وtype=\"email\".",
      "starter": "<!-- اكتب البنية المطلوبة -->",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "label",
            "kind": "text",
            "expected": "بريدي",
            "label": "تسمية واضحة"
          },
          {
            "selector": "label",
            "kind": "attr",
            "expected": "email",
            "label": "ربط التسمية",
            "property": "for"
          },
          {
            "selector": "input#email",
            "kind": "attr",
            "expected": "email",
            "label": "نوع المدخل",
            "property": "type"
          },
          {
            "selector": "input#email",
            "kind": "attr",
            "expected": "email",
            "label": "اسم القيمة",
            "property": "name"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الربط والنوع واسم القيمة.",
      "starter": "<label for=\"wrong\">بريدي</label><input id=\"email\" type=\"text\">",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "label",
            "kind": "text",
            "expected": "بريدي",
            "label": "تسمية واضحة"
          },
          {
            "selector": "label",
            "kind": "attr",
            "expected": "email",
            "label": "ربط التسمية",
            "property": "for"
          },
          {
            "selector": "input#email",
            "kind": "attr",
            "expected": "email",
            "label": "نوع المدخل",
            "property": "type"
          },
          {
            "selector": "input#email",
            "kind": "attr",
            "expected": "email",
            "label": "اسم القيمة",
            "property": "name"
          }
        ]
      }
    },
    "mastery": {
      "goal": "أنشئ label نصها «اسمي» لحقل input id=\"user\" وname=\"user\" من النوع text.",
      "starter": "",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "label",
            "kind": "text",
            "expected": "اسمي",
            "label": "التسمية"
          },
          {
            "selector": "label",
            "kind": "attr",
            "expected": "user",
            "label": "الارتباط",
            "property": "for"
          },
          {
            "selector": "input#user",
            "kind": "attr",
            "expected": "user",
            "label": "اسم القيمة",
            "property": "name"
          },
          {
            "selector": "input#user",
            "kind": "attr",
            "expected": "text",
            "label": "حقل نصي",
            "property": "type"
          }
        ]
      }
    },
    "hints": [
      "اعط الحقل id واضحًا.",
      "اكتب id نفسه داخل for.",
      "للنوع والبريد name وtype مطلوبان كل لغرضه."
    ],
    "predictionHints": [
      "ماذا يربط التسمية بالحقل؟",
      "اقرأ اسم العنصر والخصائص في المثال قبل اختيار الإجابة.",
      "تشير for إلى معرف الحقل."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label"
    ]
  },
  {
    "id": "html-semantics",
    "language": "html",
    "title": "العناصر الدلالية وإمكانية الوصول",
    "level": "intermediate",
    "prerequisites": [
      "html-lists",
      "html-attributes"
    ],
    "goal": "أنشئ main واحدًا فيه h1، وnav لها aria-label=\"التنقل\" ورابط، وزر button من النوع button داخل main.",
    "explanation": "يعبر main عن المحتوى الرئيسي للمستند، وتجمع nav روابط تنقل مهمة. تستخدم button لتنفيذ فعل، وa للانتقال إلى وجهة. توفر العناصر الأصلية دلالات وتفاعل لوحة مفاتيح لا يوفرهما div وحده. لا تعالج ARIA اختيار عنصر غير مناسب تلقائيًا.",
    "example": "<nav aria-label=\"الرئيسية\"><a href=\"#content\">المحتوى</a></nav>\n<main id=\"content\"><h1>صفحتي</h1><button type=\"button\">إضافة</button></main>",
    "prediction": {
      "question": "ما العنصر الأنسب لفعل يضغطه المستخدم؟",
      "choices": [
        "button",
        "p",
        "h1"
      ],
      "correct": 0,
      "why": "الزر يمثل فعلًا ويدعم لوحة المفاتيح."
    },
    "understanding": {
      "question": "ما غرض nav؟",
      "choices": [
        "حفظ كلمة مرور",
        "تجميع روابط التنقل المهمة",
        "عرض صورة"
      ],
      "correct": 1,
      "why": "يمثل nav منطقة تنقل."
    },
    "output": {
      "question": "ما غرض main؟",
      "choices": [
        "تلوين الخلفية",
        "كتابة CSS",
        "المحتوى الرئيسي للصفحة"
      ],
      "correct": 2,
      "why": "يعبر main عن المحتوى الرئيسي."
    },
    "exercise": {
      "goal": "أنشئ main واحدًا فيه h1، وnav لها aria-label=\"التنقل\" ورابط، وزر button من النوع button داخل main.",
      "starter": "<!-- اكتب البنية المطلوبة -->",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "main",
            "kind": "count",
            "expected": 1,
            "label": "منطقة رئيسية"
          },
          {
            "selector": "main h1",
            "kind": "count",
            "expected": 1,
            "label": "عنوان داخل المحتوى"
          },
          {
            "selector": "nav",
            "kind": "attr",
            "expected": "التنقل",
            "label": "تسمية المنطقة",
            "property": "aria-label"
          },
          {
            "selector": "nav a",
            "kind": "count",
            "expected": 1,
            "label": "رابط تنقل"
          },
          {
            "selector": "main button",
            "kind": "attr",
            "expected": "button",
            "label": "نوع الزر",
            "property": "type"
          }
        ]
      }
    },
    "fix": {
      "goal": "استبدل الحاويات العامة بالعناصر الدلالية المطلوبة.",
      "starter": "<div>التنقل</div><div><h1>صفحتي</h1><div>إضافة</div></div>",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "main",
            "kind": "count",
            "expected": 1,
            "label": "منطقة رئيسية"
          },
          {
            "selector": "main h1",
            "kind": "count",
            "expected": 1,
            "label": "عنوان داخل المحتوى"
          },
          {
            "selector": "nav",
            "kind": "attr",
            "expected": "التنقل",
            "label": "تسمية المنطقة",
            "property": "aria-label"
          },
          {
            "selector": "nav a",
            "kind": "count",
            "expected": 1,
            "label": "رابط تنقل"
          },
          {
            "selector": "main button",
            "kind": "attr",
            "expected": "button",
            "label": "نوع الزر",
            "property": "type"
          }
        ]
      }
    },
    "mastery": {
      "goal": "أنشئ article بداخله h2 وزر button نصه «اقرأ»، وأضفه داخل main واحد.",
      "starter": "",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "main",
            "kind": "count",
            "expected": 1,
            "label": "رئيسي"
          },
          {
            "selector": "main article h2",
            "kind": "count",
            "expected": 1,
            "label": "عنوان المقال"
          },
          {
            "selector": "main article button",
            "kind": "text",
            "expected": "اقرأ",
            "label": "زر أصلي"
          }
        ]
      }
    },
    "hints": [
      "اختر العنصر بحسب وظيفته.",
      "اكتب aria-label على nav لتمييزها.",
      "لا تستبدل الزر بعنصر div يحمل النص نفسه."
    ],
    "predictionHints": [
      "ما العنصر الأنسب لفعل يضغطه المستخدم؟",
      "اقرأ اسم العنصر والخصائص في المثال قبل اختيار الإجابة.",
      "الزر يمثل فعلًا ويدعم لوحة المفاتيح."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
    ]
  },
  {
    "id": "html-form-validation",
    "language": "html",
    "title": "التحقق الأصلي من النماذج",
    "level": "beginner",
    "prerequisites": [
      "html-form"
    ],
    "goal": "اكتب input id=\"mail\" من نوع email ومطلوبًا؛ يفحص المصحح الفراغ وبريدًا غير صالح ثم بريدًا صالح الصياغة.",
    "explanation": "يجعل required الحقل مطلوبًا. يجري type=\"email\" تحقق صياغة أوليًا للبريد، ولا يثبت وجود العنوان أو ملكيته. تعيد checkValidity في JavaScript صلاحية قيود الحقل. تحقق المتصفح مساعد للمستخدم؛ يحتاج الخادم إلى التحقق أيضًا عند إرسال البيانات إليه.",
    "example": "<label for=\"mail\">البريد</label>\n<input id=\"mail\" type=\"email\" required>",
    "prediction": {
      "question": "هل يثبت type=\"email\" وجود البريد؟",
      "choices": [
        "نعم",
        "لا؛ يفحص صياغة أولية",
        "يرسل رسالة تلقائيًا"
      ],
      "correct": 1,
      "why": "الفحص لا يتحقق من وجود البريد أو ملكيته."
    },
    "understanding": {
      "question": "ما معنى required؟",
      "choices": [
        "الحقل مطلوب",
        "حقل مخفي",
        "إلغاء التحقق"
      ],
      "correct": 0,
      "why": "يجب إدخال قيمة مناسبة ليجتاز الحقل القيود."
    },
    "output": {
      "question": "هل يكفي تحقق المتصفح لحماية الخادم؟",
      "choices": [
        "نعم",
        "فقط على الجوال",
        "لا؛ يعاد التحقق في الخادم"
      ],
      "correct": 2,
      "why": "يمكن تجاوز التحقق في المتصفح."
    },
    "exercise": {
      "goal": "اكتب input id=\"mail\" من نوع email ومطلوبًا؛ يفحص المصحح الفراغ وبريدًا غير صالح ثم بريدًا صالح الصياغة.",
      "starter": "<!-- اكتب البنية المطلوبة -->",
      "spec": {
        "language": "html",
        "phases": [
          {
            "rules": [
              {
                "selector": "#mail",
                "kind": "valid",
                "expected": false,
                "label": "الفارغ غير صالح"
              },
              {
                "selector": "#mail",
                "kind": "attr",
                "expected": "email",
                "label": "نوع البريد",
                "property": "type"
              },
              {
                "selector": "#mail[required]",
                "kind": "count",
                "expected": 1,
                "label": "مطلوب"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "value",
                "selector": "#mail",
                "value": "invalid"
              }
            ],
            "rules": [
              {
                "selector": "#mail",
                "kind": "valid",
                "expected": false,
                "label": "صياغة غير صالحة"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "value",
                "selector": "#mail",
                "value": "student@example.com"
              }
            ],
            "rules": [
              {
                "selector": "#mail",
                "kind": "valid",
                "expected": true,
                "label": "صياغة بريد صالحة"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "أضف القيود التي تمنع قبول حقل فارغ.",
      "starter": "<input id=\"mail\" type=\"text\">",
      "spec": {
        "language": "html",
        "phases": [
          {
            "rules": [
              {
                "selector": "#mail",
                "kind": "valid",
                "expected": false,
                "label": "الفارغ غير صالح"
              },
              {
                "selector": "#mail",
                "kind": "attr",
                "expected": "email",
                "label": "نوع البريد",
                "property": "type"
              },
              {
                "selector": "#mail[required]",
                "kind": "count",
                "expected": 1,
                "label": "مطلوب"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "value",
                "selector": "#mail",
                "value": "invalid"
              }
            ],
            "rules": [
              {
                "selector": "#mail",
                "kind": "valid",
                "expected": false,
                "label": "صياغة غير صالحة"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "value",
                "selector": "#mail",
                "value": "student@example.com"
              }
            ],
            "rules": [
              {
                "selector": "#mail",
                "kind": "valid",
                "expected": true,
                "label": "صياغة بريد صالحة"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "أنشئ input id=\"age\" من النوع number بحد أدنى 18 ومطلوب.",
      "starter": "",
      "spec": {
        "language": "html",
        "phases": [
          {
            "rules": [
              {
                "selector": "#age",
                "kind": "attr",
                "expected": "number",
                "label": "عددي",
                "property": "type"
              },
              {
                "selector": "#age",
                "kind": "attr",
                "expected": "18",
                "label": "الحد الأدنى",
                "property": "min"
              },
              {
                "selector": "#age",
                "kind": "valid",
                "expected": false,
                "label": "الفراغ غير صالح"
              },
              {
                "selector": "#age[required]",
                "kind": "count",
                "expected": 1,
                "label": "مطلوب"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "value",
                "selector": "#age",
                "value": "17"
              }
            ],
            "rules": [
              {
                "selector": "#age",
                "kind": "valid",
                "expected": false,
                "label": "دون الحد"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "value",
                "selector": "#age",
                "value": "18"
              }
            ],
            "rules": [
              {
                "selector": "#age",
                "kind": "valid",
                "expected": true,
                "label": "عند الحد"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "required يضيف قيد عدم الفراغ.",
      "type يحدد تحقق الصياغة المتاح.",
      "التقييم يستخدم checkValidity الفعلي، ولا يبحث عن النص فقط."
    ],
    "predictionHints": [
      "هل يثبت type=\"email\" وجود البريد؟",
      "اقرأ اسم العنصر والخصائص في المثال قبل اختيار الإجابة.",
      "الفحص لا يتحقق من وجود البريد أو ملكيته."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation"
    ]
  },
  {
    "id": "html-form-feedback",
    "language": "html",
    "title": "وصف الحقل ورسائل المساعدة",
    "level": "intermediate",
    "prerequisites": [
      "html-form",
      "html-semantics"
    ],
    "goal": "أنشئ label لحقل id=\"name\"، واربطه بالوصف id=\"help\" باستخدام aria-describedby. اكتب في الوصف «الاسم مطلوب».",
    "explanation": "تربط aria-describedby الحقل بنص مساعدة موجود عبر معرفه. تبقى label مسؤولة عن اسم الحقل. عند وجود خطأ فعلي يمكن تعيين aria-invalid=\"true\" مع رسالة تشرح كيفية الإصلاح. الصفة لا تتحقق من القيمة بنفسها؛ لا تضع حالة خطأ وهمية على حقل صحيح.",
    "example": "<label for=\"code\">رمز الدخول</label>\n<input id=\"code\" aria-describedby=\"help\">\n<p id=\"help\">اكتب ستة أرقام.</p>",
    "prediction": {
      "question": "ما وظيفة aria-describedby؟",
      "choices": [
        "تربط الحقل بوصف إضافي",
        "تخفي التسمية",
        "تختبر طول النص تلقائيًا"
      ],
      "correct": 0,
      "why": "تشير الصفة إلى عنصر وصف موجود."
    },
    "understanding": {
      "question": "هل تغني رسالة المساعدة عن label؟",
      "choices": [
        "نعم دائمًا",
        "لا؛ لكل منهما دور",
        "تحذف الحقل"
      ],
      "correct": 1,
      "why": "اسم الحقل ووصفه معلومات مختلفة."
    },
    "output": {
      "question": "متى نستخدم aria-invalid=\"true\"؟",
      "choices": [
        "عند فتح أي صفحة",
        "على كل عنوان",
        "عند وجود خطأ فعلي"
      ],
      "correct": 2,
      "why": "يجب أن تعبر الصفة عن الحالة الحقيقية."
    },
    "exercise": {
      "goal": "أنشئ label لحقل id=\"name\"، واربطه بالوصف id=\"help\" باستخدام aria-describedby. اكتب في الوصف «الاسم مطلوب».",
      "starter": "<!-- اكتب البنية المطلوبة -->",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "label",
            "kind": "attr",
            "expected": "name",
            "label": "اسم الحقل",
            "property": "for"
          },
          {
            "selector": "input#name",
            "kind": "attr",
            "expected": "help",
            "label": "وصف مرتبط",
            "property": "aria-describedby"
          },
          {
            "selector": "#help",
            "kind": "text",
            "expected": "الاسم مطلوب",
            "label": "رسالة المساعدة"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح معرف الوصف المشار إليه من الحقل وأضف التسمية.",
      "starter": "<input id=\"name\" aria-describedby=\"wrong\"><p id=\"help\">الاسم مطلوب</p>",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "label",
            "kind": "attr",
            "expected": "name",
            "label": "اسم الحقل",
            "property": "for"
          },
          {
            "selector": "input#name",
            "kind": "attr",
            "expected": "help",
            "label": "وصف مرتبط",
            "property": "aria-describedby"
          },
          {
            "selector": "#help",
            "kind": "text",
            "expected": "الاسم مطلوب",
            "label": "رسالة المساعدة"
          }
        ]
      }
    },
    "mastery": {
      "goal": "أنشئ input id=\"pin\" مع label مرتبطة، ووصف id=\"pin-help\" نصه «ستة أرقام»، واربط الوصف بالحقل.",
      "starter": "",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "label",
            "kind": "attr",
            "expected": "pin",
            "label": "تسمية الرمز",
            "property": "for"
          },
          {
            "selector": "input#pin",
            "kind": "attr",
            "expected": "pin-help",
            "label": "مرجع الوصف",
            "property": "aria-describedby"
          },
          {
            "selector": "#pin-help",
            "kind": "text",
            "expected": "ستة أرقام",
            "label": "وصف موجود"
          }
        ]
      }
    },
    "hints": [
      "احتفظ بتسمية label مستقلة.",
      "اجعل معرف الوصف موجودًا مرة واحدة.",
      "aria-describedby تأخذ id دون علامة #."
    ],
    "predictionHints": [
      "ما وظيفة aria-describedby؟",
      "اقرأ اسم العنصر والخصائص في المثال قبل اختيار الإجابة.",
      "تشير الصفة إلى عنصر وصف موجود."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby"
    ]
  },
  {
    "id": "html-details",
    "language": "html",
    "title": "تفاصيل قابلة للفتح دون JavaScript",
    "level": "beginner",
    "prerequisites": [
      "html-semantics"
    ],
    "goal": "أنشئ details مفتوحًا بداخله summary نصها «مساعدة» وفقرة واحدة.",
    "explanation": "يقدم details منطقة تفاصيل يمكن فتحها وإغلاقها، ويكون summary تسميتها القابلة للتفعيل. وجود open يفتحها مبدئيًا؛ هي صفة منطقية، لذلك open=\"false\" ما زال يعني وجودها وفتحها. لا تحتاج هذه الوظيفة إلى معالج JavaScript.",
    "example": "<details>\n<summary>ما الخطوة التالية؟</summary>\n<p>جرّب مثالًا صغيرًا.</p>\n</details>",
    "prediction": {
      "question": "هل المثال مفتوح في البداية؟",
      "choices": [
        "نعم دائمًا",
        "لا؛ لا توجد open",
        "لا يمكن إغلاقه"
      ],
      "correct": 1,
      "why": "يغيب open، فتبدأ التفاصيل مغلقة."
    },
    "understanding": {
      "question": "ما دور summary؟",
      "choices": [
        "تسمية منطقة التفاصيل وتفعيلها",
        "حفظ البيانات",
        "تشغيل مكتبة"
      ],
      "correct": 0,
      "why": "ينشط المستخدم summary لفتح التفاصيل."
    },
    "output": {
      "question": "هل open=\"false\" يغلق details؟",
      "choices": [
        "نعم",
        "فقط في CSS",
        "لا؛ وجود الصفة يعني الفتح"
      ],
      "correct": 2,
      "why": "open صفة منطقية يعتمد معناها على وجودها."
    },
    "exercise": {
      "goal": "أنشئ details مفتوحًا بداخله summary نصها «مساعدة» وفقرة واحدة.",
      "starter": "<!-- اكتب البنية المطلوبة -->",
      "spec": {
        "language": "html",
        "phases": [
          {
            "rules": [
              {
                "selector": "details[open]",
                "kind": "count",
                "expected": 1,
                "label": "مفتوح"
              },
              {
                "selector": "details > summary",
                "kind": "text",
                "expected": "مساعدة",
                "label": "تسمية"
              },
              {
                "selector": "details > p",
                "kind": "count",
                "expected": 1,
                "label": "شرح"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "click",
                "selector": "summary"
              }
            ],
            "rules": [
              {
                "selector": "details[open]",
                "kind": "count",
                "expected": 0,
                "label": "الإغلاق بالنقر"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "افتح التفاصيل عند البداية وأكمل المحتوى المطلوب.",
      "starter": "<details><summary>مساعدة</summary></details>",
      "spec": {
        "language": "html",
        "phases": [
          {
            "rules": [
              {
                "selector": "details[open]",
                "kind": "count",
                "expected": 1,
                "label": "مفتوح"
              },
              {
                "selector": "details > summary",
                "kind": "text",
                "expected": "مساعدة",
                "label": "تسمية"
              },
              {
                "selector": "details > p",
                "kind": "count",
                "expected": 1,
                "label": "شرح"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "click",
                "selector": "summary"
              }
            ],
            "rules": [
              {
                "selector": "details[open]",
                "kind": "count",
                "expected": 0,
                "label": "الإغلاق بالنقر"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "أنشئ details مغلقًا في البداية، وsummary نصها «تلميح» وفقرة.",
      "starter": "",
      "spec": {
        "language": "html",
        "rules": [
          {
            "selector": "details",
            "kind": "count",
            "expected": 1,
            "label": "تفاصيل واحدة"
          },
          {
            "selector": "details[open]",
            "kind": "count",
            "expected": 0,
            "label": "مغلق مبدئيًا"
          },
          {
            "selector": "summary",
            "kind": "text",
            "expected": "تلميح",
            "label": "التسمية"
          },
          {
            "selector": "details p",
            "kind": "count",
            "expected": 1,
            "label": "المحتوى"
          }
        ]
      }
    },
    "hints": [
      "ضع summary أول عنصر داخل details.",
      "للفتح أضف open دون قيمة.",
      "للإغلاق احذف open؛ لا تكتب false."
    ],
    "predictionHints": [
      "هل المثال مفتوح في البداية؟",
      "اقرأ اسم العنصر والخصائص في المثال قبل اختيار الإجابة.",
      "يغيب open، فتبدأ التفاصيل مغلقة."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details"
    ]
  },
  {
    "id": "css-spacing",
    "language": "css",
    "title": "Box Model والمسافات",
    "level": "intermediate",
    "prerequisites": [
      "css-selectors"
    ],
    "goal": "اجعل .card بعرض خارجي 240px، وpadding قدره 16px، وحدود 2px solid، مستخدمًا border-box.",
    "explanation": "يتكون الصندوق من المحتوى والحشو والحدود والهامش. padding داخل الحدود، وmargin خارجها. مع border-box يشمل width المحتوى والحشو والحدود، ولا يشمل الهامش. يختبر التمرين العرض الفعلي حتى تقبل الصيغ المكافئة التي تعطي القياس المطلوب.",
    "example": ".card { box-sizing: border-box; width: 200px; padding: 20px; border: 2px solid; }",
    "fixture": "<div class=\"card\">بطاقة</div>",
    "prediction": {
      "question": "ما العرض الخارجي دون الهامش في المثال؟",
      "choices": [
        "200 بكسل",
        "244 بكسل",
        "160 بكسل"
      ],
      "correct": 0,
      "why": "يشمل width الحشو والحدود مع border-box."
    },
    "understanding": {
      "question": "أي خاصية تبعد النص عن الحدود من الداخل؟",
      "choices": [
        "margin",
        "padding",
        "position"
      ],
      "correct": 1,
      "why": "الحشو مساحة داخلية."
    },
    "output": {
      "question": "هل يشمل border-box قيمة margin؟",
      "choices": [
        "نعم",
        "حسب اللون",
        "لا"
      ],
      "correct": 2,
      "why": "يبقى الهامش خارج الصندوق."
    },
    "exercise": {
      "goal": "اجعل .card بعرض خارجي 240px، وpadding قدره 16px، وحدود 2px solid، مستخدمًا border-box.",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">بطاقة</div>",
        "rules": [
          {
            "selector": ".card",
            "kind": "width",
            "expected": 240,
            "label": "العرض الفعلي"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "16px",
            "label": "الحشو",
            "property": "padding-top"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "2px",
            "label": "الحد",
            "property": "border-top-width"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "border-box",
            "label": "نموذج الصندوق",
            "property": "box-sizing"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: اجعل .card بعرض خارجي 240px، وpadding قدره 16px، وحدود 2px solid، مستخدمًا border-box.",
      "starter": ".card{width:240px;padding:16px;border:2px solid}",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">بطاقة</div>",
        "rules": [
          {
            "selector": ".card",
            "kind": "width",
            "expected": 240,
            "label": "العرض الفعلي"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "16px",
            "label": "الحشو",
            "property": "padding-top"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "2px",
            "label": "الحد",
            "property": "border-top-width"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "border-box",
            "label": "نموذج الصندوق",
            "property": "box-sizing"
          }
        ]
      }
    },
    "mastery": {
      "goal": "غيّر العرض الخارجي إلى 180px، والحشو إلى 8px، مع حدود 2px وborder-box.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">بطاقة</div>",
        "rules": [
          {
            "selector": ".card",
            "kind": "width",
            "expected": 180,
            "label": "عرض جديد"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "8px",
            "label": "حشو جديد",
            "property": "padding-left"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "2px",
            "label": "الحد",
            "property": "border-left-width"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "border-box",
            "label": "الصندوق",
            "property": "box-sizing"
          }
        ]
      }
    },
    "hints": [
      "ميّز المساحة الداخلية من الخارجية.",
      "حدد box-sizing قبل حساب العرض.",
      "افحص العرض النهائي؛ لا تكتف بكتابة width."
    ],
    "predictionHints": [
      "ما العرض الخارجي دون الهامش في المثال؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "يشمل width الحشو والحدود مع border-box."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model"
    ]
  },
  {
    "id": "css-flex",
    "language": "css",
    "title": "Flexbox والمحاور",
    "level": "intermediate",
    "prerequisites": [
      "css-spacing"
    ],
    "goal": "اجعل .row حاوية flex عمودية مع gap:12px والتفاف wrap.",
    "explanation": "يرتب display:flex الأبناء المباشرين لحاوية. يحدد flex-direction المحور الرئيسي، وتوزع justify-content العناصر عليه، بينما تتحكم align-items بمحورها المتقاطع. تنشئ gap مسافة بين العناصر، ويسمح flex-wrap بالالتفاف عند الحاجة.",
    "example": ".row { display: flex; gap: 12px; flex-wrap: wrap; }",
    "fixture": "<div class=\"row\"><span>أ</span><span>ب</span><span>ج</span></div>",
    "prediction": {
      "question": "أي عناصر تتأثر بتخطيط flex هنا؟",
      "choices": [
        "كل عناصر الموقع",
        "أبناء .row المباشرون",
        "عنصر style"
      ],
      "correct": 1,
      "why": "تتولى الحاوية تخطيط أبنائها المباشرين."
    },
    "understanding": {
      "question": "أي خاصية تحدد المسافة بين العناصر؟",
      "choices": [
        "gap",
        "color",
        "href"
      ],
      "correct": 0,
      "why": "تضيف gap فراغًا بين العناصر."
    },
    "output": {
      "question": "كيف يتحول المحور الرئيسي إلى عمودي؟",
      "choices": [
        "بتغيير color",
        "بحذف الأبناء",
        "باستخدام flex-direction:column"
      ],
      "correct": 2,
      "why": "يحدد flex-direction اتجاه المحور الرئيسي."
    },
    "exercise": {
      "goal": "اجعل .row حاوية flex عمودية مع gap:12px والتفاف wrap.",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"row\"><span>أ</span><span>ب</span><span>ج</span></div>",
        "rules": [
          {
            "selector": ".row",
            "kind": "style",
            "expected": "flex",
            "label": "تفعيل التخطيط",
            "property": "display"
          },
          {
            "selector": ".row",
            "kind": "style",
            "expected": "column",
            "label": "اتجاه عمودي",
            "property": "flex-direction"
          },
          {
            "selector": ".row",
            "kind": "style",
            "expected": "12px",
            "label": "المسافة",
            "property": "row-gap"
          },
          {
            "selector": ".row",
            "kind": "style",
            "expected": "wrap",
            "label": "الالتفاف",
            "property": "flex-wrap"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: اجعل .row حاوية flex عمودية مع gap:12px والتفاف wrap.",
      "starter": ".row{display:block;gap:12px}",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"row\"><span>أ</span><span>ب</span><span>ج</span></div>",
        "rules": [
          {
            "selector": ".row",
            "kind": "style",
            "expected": "flex",
            "label": "تفعيل التخطيط",
            "property": "display"
          },
          {
            "selector": ".row",
            "kind": "style",
            "expected": "column",
            "label": "اتجاه عمودي",
            "property": "flex-direction"
          },
          {
            "selector": ".row",
            "kind": "style",
            "expected": "12px",
            "label": "المسافة",
            "property": "row-gap"
          },
          {
            "selector": ".row",
            "kind": "style",
            "expected": "wrap",
            "label": "الالتفاف",
            "property": "flex-wrap"
          }
        ]
      }
    },
    "mastery": {
      "goal": "اجعل .row حاوية flex أفقية، والمسافة 8px، ومحاذاة العناصر إلى الوسط على المحور المتقاطع.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"row\"><span>أ</span><span>ب</span><span>ج</span></div>",
        "rules": [
          {
            "selector": ".row",
            "kind": "style",
            "expected": "flex",
            "label": "flex",
            "property": "display"
          },
          {
            "selector": ".row",
            "kind": "style",
            "expected": "row",
            "label": "أفقي",
            "property": "flex-direction"
          },
          {
            "selector": ".row",
            "kind": "style",
            "expected": "8px",
            "label": "المسافة",
            "property": "column-gap"
          },
          {
            "selector": ".row",
            "kind": "style",
            "expected": "center",
            "label": "المحاذاة",
            "property": "align-items"
          }
        ]
      }
    },
    "hints": [
      "طبّق display على الحاوية.",
      "غيّر flex-direction للمحور.",
      "gap وflex-wrap مستقلتان عن الاتجاه."
    ],
    "predictionHints": [
      "أي عناصر تتأثر بتخطيط flex هنا؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "تتولى الحاوية تخطيط أبنائها المباشرين."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox"
    ]
  },
  {
    "id": "css-grid",
    "language": "css",
    "title": "Grid والصفوف والأعمدة",
    "level": "intermediate",
    "prerequisites": [
      "css-flex"
    ],
    "goal": "اجعل .board شبكة بعرض 300px وعمودين متساويين بلا gap؛ يجب أن يصبح عرض كل article هو 150px.",
    "explanation": "ينظم Grid العناصر في صفوف وأعمدة معًا. يحدد grid-template-columns مسارات الأعمدة، وتتقاسم fr المساحة الحرة ضمن الشبكة بعد حساب المسافات والمسارات الثابتة. لا تعني 1fr عرضًا ثابتًا بالبكسل.",
    "example": ".board { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }",
    "fixture": "<div class=\"board\"><article>أ</article><article>ب</article></div>",
    "prediction": {
      "question": "كم عمودًا يعرّف المثال؟",
      "choices": [
        "واحد",
        "اثنان",
        "عشرة"
      ],
      "correct": 1,
      "why": "توجد قيمتا 1fr فتتكون خانتا أعمدة."
    },
    "understanding": {
      "question": "ما وظيفة fr؟",
      "choices": [
        "حصة من المساحة الحرة",
        "عدد الصور",
        "وحدة زمن"
      ],
      "correct": 0,
      "why": "توزع fr المساحة الحرة في الشبكة."
    },
    "output": {
      "question": "هل يحتاج display:grid إلى الأب أم كل ابن؟",
      "choices": [
        "كل صورة فقط",
        "آخر ابن",
        "الحاوية الأب"
      ],
      "correct": 2,
      "why": "يصبح الأب حاوية الشبكة."
    },
    "exercise": {
      "goal": "اجعل .board شبكة بعرض 300px وعمودين متساويين بلا gap؛ يجب أن يصبح عرض كل article هو 150px.",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"board\"><article>أ</article><article>ب</article></div>",
        "rules": [
          {
            "selector": ".board",
            "kind": "style",
            "expected": "grid",
            "label": "شبكة",
            "property": "display"
          },
          {
            "selector": ".board article",
            "kind": "width",
            "expected": 150,
            "label": "نصف العرض"
          },
          {
            "selector": ".board",
            "kind": "width",
            "expected": 300,
            "label": "عرض الحاوية"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: اجعل .board شبكة بعرض 300px وعمودين متساويين بلا gap؛ يجب أن يصبح عرض كل article هو 150px.",
      "starter": ".board{display:block;width:300px}",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"board\"><article>أ</article><article>ب</article></div>",
        "rules": [
          {
            "selector": ".board",
            "kind": "style",
            "expected": "grid",
            "label": "شبكة",
            "property": "display"
          },
          {
            "selector": ".board article",
            "kind": "width",
            "expected": 150,
            "label": "نصف العرض"
          },
          {
            "selector": ".board",
            "kind": "width",
            "expected": 300,
            "label": "عرض الحاوية"
          }
        ]
      }
    },
    "mastery": {
      "goal": "اجعل .board شبكة بعرض 240px وعمودين: 80px ثم المساحة الباقية 160px.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"board\"><article>أ</article><article>ب</article></div>",
        "rules": [
          {
            "selector": ".board",
            "kind": "style",
            "expected": "grid",
            "label": "تفعيل",
            "property": "display"
          },
          {
            "selector": ".board article:first-child",
            "kind": "width",
            "expected": 80,
            "label": "عمود ثابت"
          },
          {
            "selector": ".board article:last-child",
            "kind": "width",
            "expected": 160,
            "label": "المساحة المتبقية"
          }
        ]
      }
    },
    "hints": [
      "اكتب display:grid أولًا.",
      "استخدم قيمتين أو repeat لإنشاء عمودين.",
      "غياب gap يجعل الحساب هنا مباشرًا."
    ],
    "predictionHints": [
      "كم عمودًا يعرّف المثال؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "توجد قيمتا 1fr فتتكون خانتا أعمدة."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids"
    ]
  },
  {
    "id": "css-responsive",
    "language": "css",
    "title": "التصميم المتجاوب واستعلامات الوسائط",
    "level": "intermediate",
    "prerequisites": [
      "css-grid"
    ],
    "goal": "اجعل .board بعرض 300px وشبكة عمودين فوق 600px وعمود واحد عند 600px أو أقل.",
    "explanation": "تطبق media query قواعد عندما يتحقق شرط بيئة العرض. تقيس width في استعلامات العرض عرض نافذة المعاينة، ولا تعني عرض بطاقة منفردة. تجعل الشبكة ذات العمودين عمودًا واحدًا في المساحات الصغيرة. يبدأ التطبيق هنا من نمط بسيط ويتغير عند حد معلوم.",
    "example": ".board{display:grid;grid-template-columns:1fr 1fr} @media(max-width:600px){.board{grid-template-columns:1fr}}",
    "fixture": "<div class=\"board\"><article>أ</article><article>ب</article></div>",
    "prediction": {
      "question": "عند عرض نافذة 390px، كم عمودًا؟",
      "choices": [
        "عمود واحد",
        "عمودان",
        "لا عناصر"
      ],
      "correct": 0,
      "why": "يتحقق شرط max-width:600px."
    },
    "understanding": {
      "question": "ما الذي يقيسه شرط width هنا؟",
      "choices": [
        "طول النص",
        "عرض نافذة المعاينة",
        "ارتفاع المقال"
      ],
      "correct": 1,
      "why": "يقيس الاستعلام عرض viewport."
    },
    "output": {
      "question": "هل تستلزم media query JavaScript؟",
      "choices": [
        "نعم",
        "خادمًا خاصًا",
        "لا"
      ],
      "correct": 2,
      "why": "المتصفح يطبق CSS عند تحقق الشرط."
    },
    "exercise": {
      "goal": "اجعل .board بعرض 300px وشبكة عمودين فوق 600px وعمود واحد عند 600px أو أقل.",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"board\"><article>أ</article><article>ب</article></div>",
        "phases": [
          {
            "width": 800,
            "rules": [
              {
                "selector": ".board",
                "kind": "style",
                "expected": "grid",
                "label": "شبكة",
                "property": "display"
              },
              {
                "selector": ".board",
                "kind": "width",
                "expected": 300,
                "label": "عرض الحاوية"
              },
              {
                "selector": ".board article",
                "kind": "width",
                "expected": 150,
                "label": "عرض العنصر عند 800"
              }
            ]
          },
          {
            "width": 390,
            "rules": [
              {
                "selector": ".board",
                "kind": "style",
                "expected": "grid",
                "label": "شبكة",
                "property": "display"
              },
              {
                "selector": ".board",
                "kind": "width",
                "expected": 300,
                "label": "عرض الحاوية"
              },
              {
                "selector": ".board article",
                "kind": "width",
                "expected": 300,
                "label": "عرض العنصر عند 390"
              }
            ]
          },
          {
            "width": 600,
            "rules": [
              {
                "selector": ".board",
                "kind": "style",
                "expected": "grid",
                "label": "شبكة",
                "property": "display"
              },
              {
                "selector": ".board",
                "kind": "width",
                "expected": 300,
                "label": "عرض الحاوية"
              },
              {
                "selector": ".board article",
                "kind": "width",
                "expected": 300,
                "label": "عرض العنصر عند 600"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: اجعل .board بعرض 300px وشبكة عمودين فوق 600px وعمود واحد عند 600px أو أقل.",
      "starter": ".board{display:grid;width:300px;grid-template-columns:1fr 1fr}",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"board\"><article>أ</article><article>ب</article></div>",
        "phases": [
          {
            "width": 800,
            "rules": [
              {
                "selector": ".board",
                "kind": "style",
                "expected": "grid",
                "label": "شبكة",
                "property": "display"
              },
              {
                "selector": ".board",
                "kind": "width",
                "expected": 300,
                "label": "عرض الحاوية"
              },
              {
                "selector": ".board article",
                "kind": "width",
                "expected": 150,
                "label": "عرض العنصر عند 800"
              }
            ]
          },
          {
            "width": 390,
            "rules": [
              {
                "selector": ".board",
                "kind": "style",
                "expected": "grid",
                "label": "شبكة",
                "property": "display"
              },
              {
                "selector": ".board",
                "kind": "width",
                "expected": 300,
                "label": "عرض الحاوية"
              },
              {
                "selector": ".board article",
                "kind": "width",
                "expected": 300,
                "label": "عرض العنصر عند 390"
              }
            ]
          },
          {
            "width": 600,
            "rules": [
              {
                "selector": ".board",
                "kind": "style",
                "expected": "grid",
                "label": "شبكة",
                "property": "display"
              },
              {
                "selector": ".board",
                "kind": "width",
                "expected": 300,
                "label": "عرض الحاوية"
              },
              {
                "selector": ".board article",
                "kind": "width",
                "expected": 300,
                "label": "عرض العنصر عند 600"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "اعكس التخطيط: عمود واحد افتراضيًا، وعمودان بدءًا من 700px، مع عرض حاوية 280px.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"board\"><article>أ</article><article>ب</article></div>",
        "phases": [
          {
            "width": 800,
            "rules": [
              {
                "selector": ".board",
                "kind": "style",
                "expected": "grid",
                "label": "شبكة",
                "property": "display"
              },
              {
                "selector": ".board",
                "kind": "width",
                "expected": 280,
                "label": "عرض الحاوية"
              },
              {
                "selector": ".board article",
                "kind": "width",
                "expected": 140,
                "label": "عرض العنصر عند 800"
              }
            ]
          },
          {
            "width": 390,
            "rules": [
              {
                "selector": ".board",
                "kind": "style",
                "expected": "grid",
                "label": "شبكة",
                "property": "display"
              },
              {
                "selector": ".board",
                "kind": "width",
                "expected": 280,
                "label": "عرض الحاوية"
              },
              {
                "selector": ".board article",
                "kind": "width",
                "expected": 280,
                "label": "عرض العنصر عند 390"
              }
            ]
          },
          {
            "width": 700,
            "rules": [
              {
                "selector": ".board",
                "kind": "style",
                "expected": "grid",
                "label": "شبكة",
                "property": "display"
              },
              {
                "selector": ".board",
                "kind": "width",
                "expected": 280,
                "label": "عرض الحاوية"
              },
              {
                "selector": ".board article",
                "kind": "width",
                "expected": 140,
                "label": "عرض العنصر عند 700"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "ابدأ بتخطيط الشاشة الواسعة.",
      "اكتب شرط max-width بالنقطة الفاصلة الصحيحة بين الاسم والقيمة.",
      "اختبر عرضين، ولا تثبت عدد الأعمدة لكل الشاشات."
    ],
    "predictionHints": [
      "عند عرض نافذة 390px، كم عمودًا؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "يتحقق شرط max-width:600px."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries"
    ]
  },
  {
    "id": "css-position",
    "language": "css",
    "title": "Position والمرجع المكاني",
    "level": "intermediate",
    "prerequisites": [
      "css-spacing"
    ],
    "goal": "اجعل .card نسبي الموضع، و.badge مطلقة الموضع عند top:8px وright:12px.",
    "explanation": "يزيح position:relative العنصر عن موضعه مع إبقاء مكانه في التدفق. يخرج absolute العنصر من التدفق، ويعتمد موضعه على أقرب حاوية تنشئ كتلة احتواء مناسبة، مثل أب له position:relative. تملك fixed وsticky قواعد مختلفة، فلا تستخدمها بديلًا آليًا.",
    "example": ".card{position:relative}.badge{position:absolute;top:8px;right:8px}",
    "fixture": "<div class=\"card\"><span class=\"badge\">جديد</span></div>",
    "prediction": {
      "question": "ما المرجع المقصود للشارة في المثال؟",
      "choices": [
        "عنصر .card النسبي",
        "نافذة خارجية",
        "الفقرة السابقة"
      ],
      "correct": 0,
      "why": "الأب النسبي يوفر كتلة الاحتواء هنا."
    },
    "understanding": {
      "question": "هل يحتفظ absolute بمساحة في التدفق العادي؟",
      "choices": [
        "نعم دائمًا",
        "لا",
        "فقط في RTL"
      ],
      "correct": 1,
      "why": "يخرج التموضع المطلق من التدفق."
    },
    "output": {
      "question": "ما الفرق المهم لـrelative؟",
      "choices": [
        "يمنع ظهور العنصر",
        "يحذف الأب",
        "يبقي موضعه الأصلي في التدفق"
      ],
      "correct": 2,
      "why": "الإزاحة النسبية لا تحذف مساحة التدفق."
    },
    "exercise": {
      "goal": "اجعل .card نسبي الموضع، و.badge مطلقة الموضع عند top:8px وright:12px.",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\"><span class=\"badge\">جديد</span></div>",
        "rules": [
          {
            "selector": ".card",
            "kind": "style",
            "expected": "relative",
            "label": "الأب المرجعي",
            "property": "position"
          },
          {
            "selector": ".badge",
            "kind": "style",
            "expected": "absolute",
            "label": "موضع الشارة",
            "property": "position"
          },
          {
            "selector": ".badge",
            "kind": "style",
            "expected": "8px",
            "label": "من الأعلى",
            "property": "top"
          },
          {
            "selector": ".badge",
            "kind": "style",
            "expected": "12px",
            "label": "من اليمين",
            "property": "right"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: اجعل .card نسبي الموضع، و.badge مطلقة الموضع عند top:8px وright:12px.",
      "starter": ".badge{position:relative;top:8px;right:12px}",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\"><span class=\"badge\">جديد</span></div>",
        "rules": [
          {
            "selector": ".card",
            "kind": "style",
            "expected": "relative",
            "label": "الأب المرجعي",
            "property": "position"
          },
          {
            "selector": ".badge",
            "kind": "style",
            "expected": "absolute",
            "label": "موضع الشارة",
            "property": "position"
          },
          {
            "selector": ".badge",
            "kind": "style",
            "expected": "8px",
            "label": "من الأعلى",
            "property": "top"
          },
          {
            "selector": ".badge",
            "kind": "style",
            "expected": "12px",
            "label": "من اليمين",
            "property": "right"
          }
        ]
      }
    },
    "mastery": {
      "goal": "انقل الشارة إلى bottom:4px وleft:6px مع الأب النسبي والشارة المطلقة.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\"><span class=\"badge\">جديد</span></div>",
        "rules": [
          {
            "selector": ".card",
            "kind": "style",
            "expected": "relative",
            "label": "المرجع",
            "property": "position"
          },
          {
            "selector": ".badge",
            "kind": "style",
            "expected": "absolute",
            "label": "النوع",
            "property": "position"
          },
          {
            "selector": ".badge",
            "kind": "style",
            "expected": "4px",
            "label": "من الأسفل",
            "property": "bottom"
          },
          {
            "selector": ".badge",
            "kind": "style",
            "expected": "6px",
            "label": "من اليسار",
            "property": "left"
          }
        ]
      }
    },
    "hints": [
      "حدد الأب المرجعي أولًا.",
      "ضع absolute على الشارة فقط.",
      "top وright خواص تموضع وليستا هامشًا."
    ],
    "predictionHints": [
      "ما المرجع المقصود للشارة في المثال؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "الأب النسبي يوفر كتلة الاحتواء هنا."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/CSS/position"
    ]
  },
  {
    "id": "css-themes",
    "language": "css",
    "title": "الخصائص المخصصة والثيمات",
    "level": "intermediate",
    "prerequisites": [
      "css-selectors"
    ],
    "goal": "عرّف --accent باللون الأزرق على .theme، واجعل .card تقرأه في color.",
    "explanation": "تعرف الخاصية المخصصة باسم يبدأ بـ--، وتقرأ قيمتها باستخدام var(). تدخل هذه الخواص في التوارث والتتالي؛ إعادة تعريفها على حاوية تؤثر في أبنائها المستهلكين للقيمة. يمكن توفير قيمة احتياطية عندما تكون الخاصية غير معرفة أو غير صالحة وفق قواعد var.",
    "example": ".card{--accent:#008000;color:var(--accent)}",
    "fixture": "<section class=\"theme\"><p class=\"card\">بطاقة</p></section>",
    "prediction": {
      "question": "ما لون نص البطاقة في المثال؟",
      "choices": [
        "الأحمر",
        "الأخضر",
        "بلا لون"
      ],
      "correct": 1,
      "why": "تقرأ color قيمة --accent الخضراء."
    },
    "understanding": {
      "question": "كيف نقرأ --accent؟",
      "choices": [
        "var(--accent)",
        "--accent()",
        "href(--accent)"
      ],
      "correct": 0,
      "why": "تستخدم var لقراءة الخاصية المخصصة."
    },
    "output": {
      "question": "هل يمكن تعريفها على حاوية وتوريثها للأبناء؟",
      "choices": [
        "لا أبدًا",
        "للصور فقط",
        "نعم"
      ],
      "correct": 2,
      "why": "الخصائص المخصصة المعرفة بصيغتها المعتادة تتوارث."
    },
    "exercise": {
      "goal": "عرّف --accent باللون الأزرق على .theme، واجعل .card تقرأه في color.",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<section class=\"theme\"><p class=\"card\">بطاقة</p></section>",
        "phases": [
          {
            "rules": [
              {
                "selector": ".theme",
                "kind": "styleDefined",
                "property": "--accent",
                "expected": true,
                "label": "خاصية مخصصة معرفة"
              },
              {
                "selector": ".card",
                "kind": "style",
                "property": "color",
                "expected": "rgb(0, 0, 255)",
                "label": "اللون الابتدائي"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "style",
                "selector": ".theme",
                "property": "--accent",
                "value": "red"
              }
            ],
            "rules": [
              {
                "selector": ".card",
                "kind": "style",
                "property": "color",
                "expected": "rgb(255, 0, 0)",
                "label": "تتبع تغيير الخاصية الموروثة"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: عرّف --accent باللون الأزرق على .theme، واجعل .card تقرأه في color.",
      "starter": ".theme{--accent:blue}.card{color:--accent}",
      "spec": {
        "language": "css",
        "fixture": "<section class=\"theme\"><p class=\"card\">بطاقة</p></section>",
        "phases": [
          {
            "rules": [
              {
                "selector": ".theme",
                "kind": "styleDefined",
                "property": "--accent",
                "expected": true,
                "label": "خاصية مخصصة معرفة"
              },
              {
                "selector": ".card",
                "kind": "style",
                "property": "color",
                "expected": "rgb(0, 0, 255)",
                "label": "اللون الابتدائي"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "style",
                "selector": ".theme",
                "property": "--accent",
                "value": "red"
              }
            ],
            "rules": [
              {
                "selector": ".card",
                "kind": "style",
                "property": "color",
                "expected": "rgb(255, 0, 0)",
                "label": "تتبع تغيير الخاصية الموروثة"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "عرّف --surface باللون الأسود على .theme، واجعل خلفية .card تقرأه.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<section class=\"theme\"><p class=\"card\">بطاقة</p></section>",
        "phases": [
          {
            "rules": [
              {
                "selector": ".theme",
                "kind": "styleDefined",
                "property": "--surface",
                "expected": true,
                "label": "خاصية مخصصة معرفة"
              },
              {
                "selector": ".card",
                "kind": "style",
                "property": "background-color",
                "expected": "rgb(0, 0, 0)",
                "label": "اللون الابتدائي"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "style",
                "selector": ".theme",
                "property": "--surface",
                "value": "white"
              }
            ],
            "rules": [
              {
                "selector": ".card",
                "kind": "style",
                "property": "background-color",
                "expected": "rgb(255, 255, 255)",
                "label": "تتبع تغيير الخاصية الموروثة"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "ابدأ الاسم بشرطتين.",
      "لا تكتب اسم الخاصية مباشرة بدل قيمة color.",
      "استخدم var مع أقواس واسم الخاصية كاملًا."
    ],
    "predictionHints": [
      "ما لون نص البطاقة في المثال؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "تقرأ color قيمة --accent الخضراء."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"
    ]
  },
  {
    "id": "css-animations",
    "language": "css",
    "title": "الحركات ومدتها",
    "level": "intermediate",
    "prerequisites": [
      "css-selectors"
    ],
    "goal": "أنشئ keyframes باسم fade وطبّقها على .card بمدة 2s وعدد تكرارات 1.",
    "explanation": "تصف @keyframes مراحل الحركة، ويربط animation-name العنصر بها. يحدد animation-duration زمن الدورة؛ القيمة الافتراضية صفر فلا تظهر حركة زمنية دون مدة مناسبة. يمكن ضبط عدد التكرارات والتوقيت، ويجب مراعاة تفضيل تقليل الحركة في الدرس اللاحق.",
    "example": "@keyframes fade{from{opacity:0}to{opacity:1}} .card{animation:fade 2s linear}",
    "fixture": "<div class=\"card\">بطاقة متحركة</div>",
    "prediction": {
      "question": "ما مدة الدورة في المثال؟",
      "choices": [
        "2 ثانية",
        "2 بكسل",
        "بلا مدة"
      ],
      "correct": 0,
      "why": "s وحدة زمن بالثواني."
    },
    "understanding": {
      "question": "ما الذي يربط العنصر باسم @keyframes؟",
      "choices": [
        "color",
        "animation-name",
        "width"
      ],
      "correct": 1,
      "why": "يحدد animation-name مجموعة الإطارات."
    },
    "output": {
      "question": "ماذا تعني مدة 0s؟",
      "choices": [
        "حركة بطيئة",
        "خطأ HTML",
        "لا تستغرق الحركة زمنًا مرئيًا"
      ],
      "correct": 2,
      "why": "لا تظهر دورة زمنية بمدة صفر."
    },
    "exercise": {
      "goal": "أنشئ keyframes باسم fade وطبّقها على .card بمدة 2s وعدد تكرارات 1.",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">بطاقة متحركة</div>",
        "rules": [
          {
            "selector": ".card",
            "kind": "style",
            "expected": "fade",
            "label": "اسم الحركة",
            "property": "animation-name"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "2s",
            "label": "المدة",
            "property": "animation-duration"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "1",
            "label": "التكرار",
            "property": "animation-iteration-count"
          },
          {
            "selector": "",
            "kind": "keyframes",
            "expected": true,
            "label": "إطارات معرفة",
            "property": "fade"
          },
          {
            "selector": "",
            "kind": "keyframes",
            "expected": true,
            "label": "إطارات معرفة",
            "property": "fade"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: أنشئ keyframes باسم fade وطبّقها على .card بمدة 2s وعدد تكرارات 1.",
      "starter": ".card{animation-name:fade}",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">بطاقة متحركة</div>",
        "rules": [
          {
            "selector": ".card",
            "kind": "style",
            "expected": "fade",
            "label": "اسم الحركة",
            "property": "animation-name"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "2s",
            "label": "المدة",
            "property": "animation-duration"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "1",
            "label": "التكرار",
            "property": "animation-iteration-count"
          },
          {
            "selector": "",
            "kind": "keyframes",
            "expected": true,
            "label": "إطارات معرفة",
            "property": "fade"
          },
          {
            "selector": "",
            "kind": "keyframes",
            "expected": true,
            "label": "إطارات معرفة",
            "property": "fade"
          }
        ]
      }
    },
    "mastery": {
      "goal": "أنشئ keyframes باسم slide وطبّقها على .card بمدة 0.5s وتكرار 2.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">بطاقة متحركة</div>",
        "rules": [
          {
            "selector": ".card",
            "kind": "style",
            "expected": "slide",
            "label": "اسم جديد",
            "property": "animation-name"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "0.5s",
            "label": "المدة",
            "property": "animation-duration"
          },
          {
            "selector": ".card",
            "kind": "style",
            "expected": "2",
            "label": "الدورات",
            "property": "animation-iteration-count"
          },
          {
            "selector": "",
            "kind": "keyframes",
            "expected": true,
            "label": "إطارات معرفة",
            "property": "slide"
          }
        ]
      }
    },
    "hints": [
      "اكتب @keyframes بالاسم المطلوب.",
      "اربط الاسم بالعنصر مع مدة بوحدة s.",
      "اسم الحركة وحده لا ينشئ إطارات أو مدة."
    ],
    "predictionHints": [
      "ما مدة الدورة في المثال؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "s وحدة زمن بالثواني."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations"
    ]
  },
  {
    "id": "css-grid-minmax",
    "language": "css",
    "title": "minmax ومنع تجاوز الشبكة",
    "level": "intermediate",
    "prerequisites": [
      "css-grid"
    ],
    "goal": "اجعل .board شبكة بعرض 240px وعمودين minmax(0,1fr)، بحيث يصبح عرض كل article 120px رغم النص الطويل.",
    "explanation": "يمكن أن يمنع الحد الأدنى التلقائي لمسار 1fr انكماشه أمام محتوى طويل. تجعل minmax(0,1fr) الحد الأدنى صفرًا، وتوزع المساحة المتبقية بالوحدة المرنة. عالج أيضًا التفاف النص أو قصه حسب حاجة المحتوى، بدل افتراض أن قياس المسار يحل كل مشكلة نصية.",
    "example": ".board{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}",
    "fixture": "<div class=\"board\"><article>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</article><article>محتوى</article></div>",
    "prediction": {
      "question": "ما الحد الأدنى في minmax(0,1fr)؟",
      "choices": [
        "صفر",
        "1 بكسل",
        "حجم النص دائمًا"
      ],
      "correct": 0,
      "why": "الصفر يسمح للمسار بالانكماش."
    },
    "understanding": {
      "question": "هل حل قياس المسار يقرر طريقة التفاف النص؟",
      "choices": [
        "نعم دائمًا",
        "لا؛ قد تحتاج قاعدة للمحتوى",
        "يخفي كل النص"
      ],
      "correct": 1,
      "why": "يمكن معالجة النص بـoverflow-wrap أو خيارات مناسبة."
    },
    "output": {
      "question": "ما دور 1fr هنا؟",
      "choices": [
        "حجم خط",
        "لون",
        "حصة من المساحة الحرة"
      ],
      "correct": 2,
      "why": "تعبر fr عن حصة مرنة."
    },
    "exercise": {
      "goal": "اجعل .board شبكة بعرض 240px وعمودين minmax(0,1fr)، بحيث يصبح عرض كل article 120px رغم النص الطويل.",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"board\"><article>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</article><article>محتوى</article></div>",
        "rules": [
          {
            "selector": ".board",
            "kind": "style",
            "expected": "grid",
            "label": "Grid",
            "property": "display"
          },
          {
            "selector": ".board",
            "kind": "width",
            "expected": 240,
            "label": "عرض الشبكة"
          },
          {
            "selector": "article",
            "kind": "width",
            "expected": 120,
            "label": "انكماش المسار"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: اجعل .board شبكة بعرض 240px وعمودين minmax(0,1fr)، بحيث يصبح عرض كل article 120px رغم النص الطويل.",
      "starter": ".board{display:grid;width:240px;grid-template-columns:1fr 1fr}",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"board\"><article>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</article><article>محتوى</article></div>",
        "rules": [
          {
            "selector": ".board",
            "kind": "style",
            "expected": "grid",
            "label": "Grid",
            "property": "display"
          },
          {
            "selector": ".board",
            "kind": "width",
            "expected": 240,
            "label": "عرض الشبكة"
          },
          {
            "selector": "article",
            "kind": "width",
            "expected": 120,
            "label": "انكماش المسار"
          }
        ]
      }
    },
    "mastery": {
      "goal": "اجعل العرض 200px والعمودين منكمشين إلى 100px لكل عنصر.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"board\"><article>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</article><article>محتوى</article></div>",
        "rules": [
          {
            "selector": ".board",
            "kind": "width",
            "expected": 200,
            "label": "عرض جديد"
          },
          {
            "selector": "article",
            "kind": "width",
            "expected": 100,
            "label": "مسار منكمش"
          }
        ]
      }
    },
    "hints": [
      "اختبر مع نص طويل بلا مسافات.",
      "استخدم حدًا أدنى صفرًا للمسار.",
      "يمكن استخدام repeat أو كتابة المسارين صراحة."
    ],
    "predictionHints": [
      "ما الحد الأدنى في minmax(0,1fr)؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "الصفر يسمح للمسار بالانكماش."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/CSS/minmax"
    ]
  },
  {
    "id": "css-flex-minwidth",
    "language": "css",
    "title": "الانكماش داخل Flexbox",
    "level": "intermediate",
    "prerequisites": [
      "css-flex"
    ],
    "goal": "اجعل .row flex بعرض 240px، واجعل aside بعرض ثابت 60px و.content مرنة بعرض ناتج 180px رغم النص الطويل.",
    "explanation": "يكون الحد الأدنى التلقائي لعنصر flex مرتبطًا بالمحتوى في حالات شائعة. قد يمنع نص طويل العنصر من الانكماش. تتيح min-width:0 تقليل العرض دون حد المحتوى؛ ثم تختار قص النص أو التفافه. لا تفترض أن flex:1 وحدها تحل تجاوز كل محتوى.",
    "example": ".content{flex:1;min-width:0;overflow-wrap:anywhere}",
    "fixture": "<div class=\"row\"><aside>قائمة</aside><article class=\"content\">BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB</article></div>",
    "prediction": {
      "question": "ماذا تسمح min-width:0 هنا؟",
      "choices": [
        "تغيير اللون",
        "انكماش العنصر",
        "حذف النص"
      ],
      "correct": 1,
      "why": "تزيل حد العرض الأدنى المرتبط بالمحتوى هنا."
    },
    "understanding": {
      "question": "هل flex:1 يمنع تجاوز كل نص طويل وحده؟",
      "choices": [
        "نعم",
        "فقط في RTL",
        "لا"
      ],
      "correct": 2,
      "why": "قد تحتاج الحد الأدنى ومعالجة النص."
    },
    "output": {
      "question": "ما معالجة مناسبة للحفاظ على النص مع السماح بكسره؟",
      "choices": [
        "overflow-wrap:anywhere",
        "opacity:0",
        "display:none"
      ],
      "correct": 0,
      "why": "تسمح الخاصية بقطع الكلمات عند الحاجة."
    },
    "exercise": {
      "goal": "اجعل .row flex بعرض 240px، واجعل aside بعرض ثابت 60px و.content مرنة بعرض ناتج 180px رغم النص الطويل.",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"row\"><aside>قائمة</aside><article class=\"content\">BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB</article></div>",
        "rules": [
          {
            "selector": ".row",
            "kind": "style",
            "expected": "flex",
            "label": "الحاوية",
            "property": "display"
          },
          {
            "selector": "aside",
            "kind": "width",
            "expected": 60,
            "label": "الجزء الثابت"
          },
          {
            "selector": ".content",
            "kind": "width",
            "expected": 180,
            "label": "الجزء المنكمش"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: اجعل .row flex بعرض 240px، واجعل aside بعرض ثابت 60px و.content مرنة بعرض ناتج 180px رغم النص الطويل.",
      "starter": ".row{display:flex;width:240px}aside{width:60px}.content{flex:1}",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"row\"><aside>قائمة</aside><article class=\"content\">BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB</article></div>",
        "rules": [
          {
            "selector": ".row",
            "kind": "style",
            "expected": "flex",
            "label": "الحاوية",
            "property": "display"
          },
          {
            "selector": "aside",
            "kind": "width",
            "expected": 60,
            "label": "الجزء الثابت"
          },
          {
            "selector": ".content",
            "kind": "width",
            "expected": 180,
            "label": "الجزء المنكمش"
          }
        ]
      }
    },
    "mastery": {
      "goal": "اجعل عرض .row يساوي 200px، والجزء الثابت 50px، والمحتوى ينكمش إلى 150px.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"row\"><aside>قائمة</aside><article class=\"content\">BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB</article></div>",
        "rules": [
          {
            "selector": ".row",
            "kind": "style",
            "expected": "flex",
            "label": "حاوية flex",
            "property": "display"
          },
          {
            "selector": "aside",
            "kind": "width",
            "expected": 50,
            "label": "الثابت"
          },
          {
            "selector": ".content",
            "kind": "width",
            "expected": 150,
            "label": "المحتوى"
          }
        ]
      }
    },
    "hints": [
      "ثبّت الجزء الجانبي دون انكماش.",
      "اسمح للمحتوى المرن بالنزول إلى min-width:0.",
      "ثم اختر التفاف النص بدل إخفائه بلا سبب."
    ],
    "predictionHints": [
      "ماذا تسمح min-width:0 هنا؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "تزيل حد العرض الأدنى المرتبط بالمحتوى هنا."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/CSS/min-width"
    ]
  },
  {
    "id": "css-fluid-tokens",
    "language": "css",
    "title": "clamp والقياسات المرنة",
    "level": "intermediate",
    "prerequisites": [
      "css-themes",
      "css-responsive"
    ],
    "goal": "اضبط عرض .card بـclamp(100px,50vw,300px): نختبر نافذة 800px و390px.",
    "explanation": "تحدد clamp حدًا أدنى وقيمة مفضلة وحدًا أعلى. مع قيم صحيحة وحد أدنى لا يتجاوز الأعلى، تبقى النتيجة ضمن الحدين، وتتغير القيمة المفضلة بحسب الوحدة المستخدمة. تستخدم vw نسبة من عرض النافذة؛ 10vw تعادل عُشر عرضها.",
    "example": ".card{width:clamp(100px,10vw,200px)}",
    "fixture": "<div class=\"card\">قياس مرن</div>",
    "prediction": {
      "question": "عند viewport عرضه 800px، ما نتيجة clamp(100px,10vw,200px)؟",
      "choices": [
        "100px",
        "80px",
        "200px"
      ],
      "correct": 0,
      "why": "القيمة المفضلة 80px، لكنها دون الحد الأدنى 100px."
    },
    "understanding": {
      "question": "ما ترتيب معاملات clamp؟",
      "choices": [
        "لون،عرض،ارتفاع",
        "حد أدنى،مفضل،حد أعلى",
        "مفضل،مفضل،مفضل"
      ],
      "correct": 1,
      "why": "تحد القيود القيمة المفضلة."
    },
    "output": {
      "question": "هل vw نسبة من عرض العنصر؟",
      "choices": [
        "نعم",
        "من حجم الخط",
        "لا؛ من عرض viewport"
      ],
      "correct": 2,
      "why": "vw مرتبطة بنافذة العرض."
    },
    "exercise": {
      "goal": "اضبط عرض .card بـclamp(100px,50vw,300px): نختبر نافذة 800px و390px.",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">قياس مرن</div>",
        "phases": [
          {
            "width": 800,
            "rules": [
              {
                "selector": ".card",
                "kind": "width",
                "expected": 300,
                "label": "حد أعلى"
              }
            ]
          },
          {
            "width": 390,
            "rules": [
              {
                "selector": ".card",
                "kind": "width",
                "expected": 195,
                "label": "عرض متوسط"
              }
            ]
          },
          {
            "width": 180,
            "rules": [
              {
                "selector": ".card",
                "kind": "width",
                "expected": 100,
                "label": "حد أدنى"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: اضبط عرض .card بـclamp(100px,50vw,300px): نختبر نافذة 800px و390px.",
      "starter": ".card{width:300px}",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">قياس مرن</div>",
        "phases": [
          {
            "width": 800,
            "rules": [
              {
                "selector": ".card",
                "kind": "width",
                "expected": 300,
                "label": "حد أعلى"
              }
            ]
          },
          {
            "width": 390,
            "rules": [
              {
                "selector": ".card",
                "kind": "width",
                "expected": 195,
                "label": "عرض متوسط"
              }
            ]
          },
          {
            "width": 180,
            "rules": [
              {
                "selector": ".card",
                "kind": "width",
                "expected": 100,
                "label": "حد أدنى"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "اجعل العرض clamp(80px,25vw,200px)، بحيث يعطي 200px عند 1000px و100px عند 400px.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">قياس مرن</div>",
        "phases": [
          {
            "width": 1000,
            "rules": [
              {
                "selector": ".card",
                "kind": "width",
                "expected": 200,
                "label": "حد أعلى"
              }
            ]
          },
          {
            "width": 400,
            "rules": [
              {
                "selector": ".card",
                "kind": "width",
                "expected": 100,
                "label": "قيمة مفضلة"
              }
            ]
          },
          {
            "width": 200,
            "rules": [
              {
                "selector": ".card",
                "kind": "width",
                "expected": 80,
                "label": "حد أدنى"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "احسب النسبة من عرض النافذة.",
      "طبّق الحد الأدنى والأعلى على القيمة المفضلة.",
      "لا تستبدل السلوك بعرض ثابت ينجح في حالة واحدة."
    ],
    "predictionHints": [
      "عند viewport عرضه 800px، ما نتيجة clamp(100px,10vw,200px)؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "القيمة المفضلة 80px، لكنها دون الحد الأدنى 100px."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp"
    ]
  },
  {
    "id": "css-reduced-motion",
    "language": "css",
    "title": "احترام تفضيل تقليل الحركة",
    "level": "intermediate",
    "prerequisites": [
      "css-animations",
      "css-responsive"
    ],
    "goal": "عرّف fade واجعل مدة حركة .card تساوي 2s افتراضيًا و0s في @media(prefers-reduced-motion:reduce).",
    "explanation": "يكشف prefers-reduced-motion:reduce طلب المستخدم تقليل الحركة غير الضرورية. يمكن إيقاف الحركة أو تقديم بديل مناسب، مع الحفاظ على المعلومة والوظيفة. لا تجعل الوصول إلى المحتوى يعتمد على حركة لا يمكن إيقافها. يفحص التقييم فرعي الاستعلام بتفعيل الشرط وتعطيله، وتراعي المعاينة تفضيل المتصفح نفسه.",
    "example": "@keyframes fade{from{opacity:0}to{opacity:1}}.card{animation:fade 2s}@media(prefers-reduced-motion:reduce){.card{animation-duration:0s}}",
    "fixture": "<div class=\"card\">المحتوى متاح</div>",
    "prediction": {
      "question": "ماذا يطلب reduce؟",
      "choices": [
        "تسريع كل الحركات",
        "تقليل الحركة غير الضرورية",
        "إخفاء المحتوى"
      ],
      "correct": 1,
      "why": "التفضيل متعلق بالحركة، لا بإزالة الوظيفة."
    },
    "understanding": {
      "question": "هل نزيل المعلومات المهمة عند تقليل الحركة؟",
      "choices": [
        "لا؛ نحافظ عليها",
        "نعم دائمًا",
        "نحذف الصفحة"
      ],
      "correct": 0,
      "why": "يجب أن تبقى المعلومة والوظيفة متاحتين."
    },
    "output": {
      "question": "أي شرط يقرأ هذا التفضيل؟",
      "choices": [
        "max-height فقط",
        "hover فقط",
        "prefers-reduced-motion:reduce"
      ],
      "correct": 2,
      "why": "هذا الاستعلام يراعي إعداد المستخدم."
    },
    "exercise": {
      "goal": "عرّف fade واجعل مدة حركة .card تساوي 2s افتراضيًا و0s في @media(prefers-reduced-motion:reduce).",
      "starter": "/* اكتب القواعد هنا */",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">المحتوى متاح</div>",
        "phases": [
          {
            "media": "(prefers-reduced-motion: reduce)",
            "active": false,
            "rules": [
              {
                "selector": ".card",
                "kind": "style",
                "expected": "2s",
                "label": "الحالة العادية",
                "property": "animation-duration"
              },
              {
                "selector": "",
                "kind": "keyframes",
                "expected": true,
                "label": "إطارات موجودة",
                "property": "fade"
              }
            ]
          },
          {
            "media": "(prefers-reduced-motion: reduce)",
            "active": true,
            "rules": [
              {
                "selector": ".card",
                "kind": "style",
                "expected": "0s",
                "label": "تقليل الحركة",
                "property": "animation-duration"
              },
              {
                "selector": ".card",
                "kind": "style",
                "expected": "block",
                "label": "المحتوى متاح",
                "property": "display"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح القواعد لتتحقق متطلبات التطبيق السابقة: عرّف fade واجعل مدة حركة .card تساوي 2s افتراضيًا و0s في @media(prefers-reduced-motion:reduce).",
      "starter": ".card{animation:fade 2s}",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">المحتوى متاح</div>",
        "phases": [
          {
            "media": "(prefers-reduced-motion: reduce)",
            "active": false,
            "rules": [
              {
                "selector": ".card",
                "kind": "style",
                "expected": "2s",
                "label": "الحالة العادية",
                "property": "animation-duration"
              },
              {
                "selector": "",
                "kind": "keyframes",
                "expected": true,
                "label": "إطارات موجودة",
                "property": "fade"
              }
            ]
          },
          {
            "media": "(prefers-reduced-motion: reduce)",
            "active": true,
            "rules": [
              {
                "selector": ".card",
                "kind": "style",
                "expected": "0s",
                "label": "تقليل الحركة",
                "property": "animation-duration"
              },
              {
                "selector": ".card",
                "kind": "style",
                "expected": "block",
                "label": "المحتوى متاح",
                "property": "display"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "اجعل مدة fade تساوي 1s افتراضيًا و0s عند طلب تقليل الحركة.",
      "starter": "",
      "spec": {
        "language": "css",
        "fixture": "<div class=\"card\">المحتوى متاح</div>",
        "phases": [
          {
            "media": "(prefers-reduced-motion: reduce)",
            "active": false,
            "rules": [
              {
                "selector": ".card",
                "kind": "style",
                "expected": "1s",
                "label": "الحالة العادية",
                "property": "animation-duration"
              },
              {
                "selector": "",
                "kind": "keyframes",
                "expected": true,
                "label": "إطارات موجودة",
                "property": "fade"
              }
            ]
          },
          {
            "media": "(prefers-reduced-motion: reduce)",
            "active": true,
            "rules": [
              {
                "selector": ".card",
                "kind": "style",
                "expected": "0s",
                "label": "تقليل الحركة",
                "property": "animation-duration"
              },
              {
                "selector": ".card",
                "kind": "style",
                "expected": "block",
                "label": "المحتوى متاح",
                "property": "display"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "حدد الحركة الافتراضية أولًا.",
      "أضف استعلام التفضيل بالقيمة reduce.",
      "عند تحقق الشرط غيّر مدة الحركة، ولا تخف المحتوى."
    ],
    "predictionHints": [
      "ماذا يطلب reduce؟",
      "حدد العنصر المختار والخاصية المؤثرة في المثال.",
      "التفضيل متعلق بالحركة، لا بإزالة الوظيفة."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion"
    ]
  }
];
for(const lesson of entries)root.VLexGuidedLessons.add(lesson);
})(typeof window!=='undefined'?window:globalThis);
