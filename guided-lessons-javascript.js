/* Reviewed JavaScript learning groups and explicit isolated environments. */
(function(root){
'use strict';
const entries=[
  {
    "id": "js-types",
    "language": "javascript",
    "title": "الأنواع والتحويل العددي",
    "level": "beginner",
    "prerequisites": [
      "js-values"
    ],
    "goal": "اكتب toNumber(text) لتحويل النص إلى عدد منتهٍ، وإعادة null للفراغ أو النص غير العددي.",
    "explanation": "يختلف العدد 2 عن النص \"2\". يمكن أن تجمع + نصوصًا عند وجود معامل نصي؛ لذلك حوّل المدخل بوضوح عند الحاجة. تميز === القيم دون تحويل النوع. تعيد Number.isFinite false للقيم غير العددية أو غير المنتهية. نرفض هنا النص الفارغ قبل Number لأن Number(\"\") يساوي صفرًا.",
    "example": "function parseScore(text) {\n if (text.trim() === \"\") return null;\n const score = Number(text);\n return Number.isFinite(score) ? score : null;\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "parseScore",
      "cases": [
        {
          "args": [
            " 2 "
          ],
          "expected": 2,
          "label": "مدخل [\" 2 \"]"
        },
        {
          "args": [
            ""
          ],
          "expected": null,
          "label": "مدخل [\"\"]"
        }
      ]
    },
    "prediction": {
      "question": "ما ناتج parseScore(\" 2 \")؟",
      "choices": [
        "2 كعدد",
        "\"2\" كنص",
        "null"
      ],
      "correct": 0,
      "why": "يزيل الفحص احتمال الفراغ ثم تحول Number النص إلى عدد."
    },
    "understanding": {
      "question": "ما نتيجة 2 === \"2\"؟",
      "choices": [
        "true",
        "false",
        "خطأ صياغة"
      ],
      "correct": 1,
      "why": "النوعان مختلفان ولا تجري === تحويلًا."
    },
    "output": {
      "question": "لماذا نفحص النص الفارغ أولًا؟",
      "choices": [
        "لأن trim تجمع الأعداد",
        "لإضافة لون",
        "لأن Number(\"\") يحوله إلى 0"
      ],
      "correct": 2,
      "why": "الصفر قد لا يمثل مدخلًا فارغًا صالحًا للتطبيق."
    },
    "exercise": {
      "goal": "اكتب toNumber(text) لتحويل النص إلى عدد منتهٍ، وإعادة null للفراغ أو النص غير العددي.",
      "starter": "function toNumber(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "toNumber",
        "cases": [
          {
            "args": [
              "12"
            ],
            "expected": 12,
            "label": "مدخل [\"12\"]"
          },
          {
            "args": [
              " -3 "
            ],
            "expected": -3,
            "label": "مدخل [\" -3 \"]"
          },
          {
            "args": [
              ""
            ],
            "expected": null,
            "label": "مدخل [\"\"]"
          },
          {
            "args": [
              "   "
            ],
            "expected": null,
            "label": "مدخل [\"   \"]"
          },
          {
            "args": [
              "abc"
            ],
            "expected": null,
            "label": "مدخل [\"abc\"]"
          },
          {
            "args": [
              "Infinity"
            ],
            "expected": null,
            "label": "مدخل [\"Infinity\"]"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب toNumber(text) لتحويل النص إلى عدد منتهٍ، وإعادة null للفراغ أو النص غير العددي.",
      "starter": "function toNumber(text){return Number(text)}",
      "spec": {
        "language": "javascript",
        "entry": "toNumber",
        "cases": [
          {
            "args": [
              "12"
            ],
            "expected": 12,
            "label": "مدخل [\"12\"]"
          },
          {
            "args": [
              " -3 "
            ],
            "expected": -3,
            "label": "مدخل [\" -3 \"]"
          },
          {
            "args": [
              ""
            ],
            "expected": null,
            "label": "مدخل [\"\"]"
          },
          {
            "args": [
              "   "
            ],
            "expected": null,
            "label": "مدخل [\"   \"]"
          },
          {
            "args": [
              "abc"
            ],
            "expected": null,
            "label": "مدخل [\"abc\"]"
          },
          {
            "args": [
              "Infinity"
            ],
            "expected": null,
            "label": "مدخل [\"Infinity\"]"
          }
        ]
      }
    },
    "mastery": {
      "goal": "اكتب incrementText(text) تعيد العدد المحول زائد 1، أو null للفراغ أو غير العددي.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "incrementText",
        "cases": [
          {
            "args": [
              "2"
            ],
            "expected": 3,
            "label": "مدخل [\"2\"]"
          },
          {
            "args": [
              "0"
            ],
            "expected": 1,
            "label": "مدخل [\"0\"]"
          },
          {
            "args": [
              "-4"
            ],
            "expected": -3,
            "label": "مدخل [\"-4\"]"
          },
          {
            "args": [
              ""
            ],
            "expected": null,
            "label": "مدخل [\"\"]"
          },
          {
            "args": [
              "bad"
            ],
            "expected": null,
            "label": "مدخل [\"bad\"]"
          }
        ]
      }
    },
    "hints": [
      "افحص الفراغ بعد trim.",
      "حوّل بـNumber ثم افحص Number.isFinite.",
      "لا تسمح للجمع النصي بتحويل 2 إلى 21."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما ناتج parseScore(\" 2 \")؟",
      "يزيل الفحص احتمال الفراغ ثم تحول Number النص إلى عدد."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings"
    ]
  },
  {
    "id": "js-conditions",
    "language": "javascript",
    "title": "الشروط والمقارنات والحدود",
    "level": "beginner",
    "prerequisites": [
      "js-types"
    ],
    "goal": "اكتب category(age) تعيد \"طفل\" إذا كان العمر أقل من 13، و\"يافع\" من 13 إلى أقل من 18، و\"بالغ\" من 18 فأكثر. المدخل عدد غير سالب.",
    "explanation": "تنفذ if فرعًا عند تحقق شرطه، وتختار else الفرع البديل. ترتب المقارنات بحيث تعالج الحدود دون تداخل أو فجوات. تعني >= تضمين الحد نفسه، وتختلف عن >. نحدد مجال التمرين بوضوح حتى لا نفترض كيفية التعامل مع قيم غير مطلوبة.",
    "example": "function status(score) {\n if (score >= 50) return \"ناجح\";\n return \"راجع\";\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "status",
      "cases": [
        {
          "args": [
            50
          ],
          "expected": "ناجح",
          "label": "مدخل [50]"
        }
      ]
    },
    "prediction": {
      "question": "ما نتيجة status(50)؟",
      "choices": [
        "راجع",
        "ناجح",
        "undefined"
      ],
      "correct": 1,
      "why": "تشمل >= العدد 50 نفسه."
    },
    "understanding": {
      "question": "ما الفرق بين > و>=؟",
      "choices": [
        "الثانية تشمل المساواة",
        "الأولى تجمع",
        "لا فرق"
      ],
      "correct": 0,
      "why": "اختبار الحد يكشف الفرق."
    },
    "output": {
      "question": "كم فرعًا من if/else ينفذ في الاختيار الواحد؟",
      "choices": [
        "كلاهما دائمًا",
        "صفر دائمًا",
        "فرع واحد"
      ],
      "correct": 2,
      "why": "يختار الشرط أحد الفرعين."
    },
    "exercise": {
      "goal": "اكتب category(age) تعيد \"طفل\" إذا كان العمر أقل من 13، و\"يافع\" من 13 إلى أقل من 18، و\"بالغ\" من 18 فأكثر. المدخل عدد غير سالب.",
      "starter": "function category(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "category",
        "cases": [
          {
            "args": [
              0
            ],
            "expected": "طفل",
            "label": "مدخل [0]"
          },
          {
            "args": [
              12
            ],
            "expected": "طفل",
            "label": "مدخل [12]"
          },
          {
            "args": [
              13
            ],
            "expected": "يافع",
            "label": "مدخل [13]"
          },
          {
            "args": [
              17
            ],
            "expected": "يافع",
            "label": "مدخل [17]"
          },
          {
            "args": [
              18
            ],
            "expected": "بالغ",
            "label": "مدخل [18]"
          },
          {
            "args": [
              80
            ],
            "expected": "بالغ",
            "label": "مدخل [80]"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب category(age) تعيد \"طفل\" إذا كان العمر أقل من 13، و\"يافع\" من 13 إلى أقل من 18، و\"بالغ\" من 18 فأكثر. المدخل عدد غير سالب.",
      "starter": "function category(age){if(age<=13)return \"طفل\";if(age<=18)return \"يافع\";return \"بالغ\"}",
      "spec": {
        "language": "javascript",
        "entry": "category",
        "cases": [
          {
            "args": [
              0
            ],
            "expected": "طفل",
            "label": "مدخل [0]"
          },
          {
            "args": [
              12
            ],
            "expected": "طفل",
            "label": "مدخل [12]"
          },
          {
            "args": [
              13
            ],
            "expected": "يافع",
            "label": "مدخل [13]"
          },
          {
            "args": [
              17
            ],
            "expected": "يافع",
            "label": "مدخل [17]"
          },
          {
            "args": [
              18
            ],
            "expected": "بالغ",
            "label": "مدخل [18]"
          },
          {
            "args": [
              80
            ],
            "expected": "بالغ",
            "label": "مدخل [80]"
          }
        ]
      }
    },
    "mastery": {
      "goal": "اكتب shipping(total) تعيد 0 بدءًا من 100، و10 لما دون 100.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "shipping",
        "cases": [
          {
            "args": [
              0
            ],
            "expected": 10,
            "label": "مدخل [0]"
          },
          {
            "args": [
              99
            ],
            "expected": 10,
            "label": "مدخل [99]"
          },
          {
            "args": [
              100
            ],
            "expected": 0,
            "label": "مدخل [100]"
          },
          {
            "args": [
              101
            ],
            "expected": 0,
            "label": "مدخل [101]"
          }
        ]
      }
    },
    "hints": [
      "ابدأ بأصغر مجال ثم انتقل للأكبر.",
      "اختبر 12 و13، ثم 17 و18.",
      "إذا غطى الفرع الأول الأعمار الصغيرة، فشرط الفرع الثاني لا يحتاج تكرار الحد الأدنى."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة status(50)؟",
      "تشمل >= العدد 50 نفسه."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling"
    ]
  },
  {
    "id": "js-loops",
    "language": "javascript",
    "title": "الحلقات وتجميع النتائج",
    "level": "beginner",
    "prerequisites": [
      "js-conditions"
    ],
    "goal": "اكتب sumItems(values) باستعمال حلقة تعيد مجموع الأعداد دون تغيير المصفوفة.",
    "explanation": "تكرر الحلقة تعليمة لكل عنصر أو ما دام شرطها صحيحًا. تبدأ نتيجة التجميع بقيمة محايدة مثل صفر للجمع. ينبغي أن تتقدم الحلقة نحو التوقف؛ نختبر أيضًا المصفوفة الفارغة. يقبل هذا التمرين for وfor...of وwhile مع التحقق الوظيفي نفسه.",
    "example": "function total(values) {\n let result = 0;\n for (const value of values) result += value;\n return result;\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "total",
      "cases": [
        {
          "args": [
            [
              2,
              3
            ]
          ],
          "expected": 5,
          "label": "مدخل [[2, 3]]"
        }
      ]
    },
    "prediction": {
      "question": "ما نتيجة total([2,3])؟",
      "choices": [
        "2",
        "3",
        "5"
      ],
      "correct": 2,
      "why": "تبدأ النتيجة بصفر وتجمع كل عنصر."
    },
    "understanding": {
      "question": "لماذا تحتاج while إلى شرط يتجه للتوقف؟",
      "choices": [
        "لتجنب حلقة غير منتهية",
        "لتغيير اللون",
        "لإلغاء return"
      ],
      "correct": 0,
      "why": "استمرار الشرط دون تقدم يمنع انتهاء الحلقة."
    },
    "output": {
      "question": "ما ناتج الجمع للمصفوفة الفارغة في المثال؟",
      "choices": [
        "undefined",
        "0",
        "خطأ دائمًا"
      ],
      "correct": 1,
      "why": "تبقى القيمة الابتدائية صفرًا."
    },
    "exercise": {
      "goal": "اكتب sumItems(values) باستعمال حلقة تعيد مجموع الأعداد دون تغيير المصفوفة.",
      "starter": "function sumItems(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "sumItems",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": 0,
            "label": "مدخل [[]]"
          },
          {
            "args": [
              [
                1,
                2,
                3
              ]
            ],
            "expected": 6,
            "label": "مدخل [[1, 2, 3]]"
          },
          {
            "args": [
              [
                -3,
                0,
                2
              ]
            ],
            "expected": -1,
            "label": "مدخل [[-3, 0, 2]]"
          }
        ],
        "requireNodes": [
          [
            "ForStatement",
            "ForOfStatement",
            "WhileStatement",
            "DoWhileStatement"
          ]
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب sumItems(values) باستعمال حلقة تعيد مجموع الأعداد دون تغيير المصفوفة.",
      "starter": "function sumItems(values){let sum=0;for(let i=1;i<values.length;i++)sum+=values[i];return sum}",
      "spec": {
        "language": "javascript",
        "entry": "sumItems",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": 0,
            "label": "مدخل [[]]"
          },
          {
            "args": [
              [
                1,
                2,
                3
              ]
            ],
            "expected": 6,
            "label": "مدخل [[1, 2, 3]]"
          },
          {
            "args": [
              [
                -3,
                0,
                2
              ]
            ],
            "expected": -1,
            "label": "مدخل [[-3, 0, 2]]"
          }
        ],
        "requireNodes": [
          [
            "ForStatement",
            "ForOfStatement",
            "WhileStatement",
            "DoWhileStatement"
          ]
        ]
      }
    },
    "mastery": {
      "goal": "اكتب countPositive(values) باستعمال حلقة تعد الأعداد الأكبر من صفر.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "countPositive",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": 0,
            "label": "مدخل [[]]"
          },
          {
            "args": [
              [
                -1,
                0,
                2,
                3
              ]
            ],
            "expected": 2,
            "label": "مدخل [[-1, 0, 2, 3]]"
          },
          {
            "args": [
              [
                0,
                0
              ]
            ],
            "expected": 0,
            "label": "مدخل [[0, 0]]"
          }
        ],
        "requireNodes": [
          [
            "ForStatement",
            "ForOfStatement",
            "WhileStatement",
            "DoWhileStatement"
          ]
        ]
      }
    },
    "hints": [
      "ابدأ متغير التجميع بصفر.",
      "لا تتجاوز length ولا تتخط العنصر الأول.",
      "تحقق من المصفوفة الفارغة والقيم السالبة."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة total([2,3])؟",
      "تبدأ النتيجة بصفر وتجمع كل عنصر."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration"
    ]
  },
  {
    "id": "js-functions",
    "language": "javascript",
    "title": "الدوال والمعاملات والقيم الافتراضية",
    "level": "beginner",
    "prerequisites": [
      "js-loops"
    ],
    "goal": "اكتب multiply(a,b=1) لتعيد حاصل الضرب، مع احترام b=0.",
    "explanation": "تجمع الدالة سلوكًا قابلًا للاستدعاء. تستقبل المعاملات قيم الاستدعاء، ويعيد return نتيجة. تستخدم القيمة الافتراضية عند غياب المعامل أو تمرير undefined، ولا تستبدل تلقائيًا كل قيمة falsy مثل صفر. ينتهي تنفيذ الدالة عند return.",
    "example": "function area(width, height = 1) {\n return width * height;\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "area",
      "cases": [
        {
          "args": [
            4
          ],
          "expected": 4,
          "label": "مدخل [4]"
        }
      ]
    },
    "prediction": {
      "question": "ما نتيجة area(4)؟",
      "choices": [
        "4",
        "0",
        "undefined"
      ],
      "correct": 0,
      "why": "تأخذ height القيمة الافتراضية 1."
    },
    "understanding": {
      "question": "هل تستبدل القيمة الافتراضية 0 تلقائيًا؟",
      "choices": [
        "نعم",
        "لا",
        "فقط في function"
      ],
      "correct": 1,
      "why": "الصفر قيمة ممررة؛ الافتراضي لغياب القيمة أو undefined."
    },
    "output": {
      "question": "ما الذي يصل للمستدعي دون return صريح في دالة عادية؟",
      "choices": [
        "آخر عملية دائمًا",
        "null دائمًا",
        "undefined"
      ],
      "correct": 2,
      "why": "عدم إعادة قيمة ينتج undefined."
    },
    "exercise": {
      "goal": "اكتب multiply(a,b=1) لتعيد حاصل الضرب، مع احترام b=0.",
      "starter": "function multiply(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "multiply",
        "cases": [
          {
            "args": [
              5
            ],
            "expected": 5,
            "label": "مدخل [5]"
          },
          {
            "args": [
              5,
              0
            ],
            "expected": 0,
            "label": "مدخل [5, 0]"
          },
          {
            "args": [
              -2,
              3
            ],
            "expected": -6,
            "label": "مدخل [-2, 3]"
          },
          {
            "args": [
              0,
              8
            ],
            "expected": 0,
            "label": "مدخل [0, 8]"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب multiply(a,b=1) لتعيد حاصل الضرب، مع احترام b=0.",
      "starter": "function multiply(a,b){b=b||1;return a*b}",
      "spec": {
        "language": "javascript",
        "entry": "multiply",
        "cases": [
          {
            "args": [
              5
            ],
            "expected": 5,
            "label": "مدخل [5]"
          },
          {
            "args": [
              5,
              0
            ],
            "expected": 0,
            "label": "مدخل [5, 0]"
          },
          {
            "args": [
              -2,
              3
            ],
            "expected": -6,
            "label": "مدخل [-2, 3]"
          },
          {
            "args": [
              0,
              8
            ],
            "expected": 0,
            "label": "مدخل [0, 8]"
          }
        ]
      }
    },
    "mastery": {
      "goal": "اكتب greet(name=\"متعلم\") لتعطي \"مرحبًا \" متبوعة بالاسم، واحتفظ بالنص الفارغ إذا مرر صراحة.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "greet",
        "cases": [
          {
            "args": [],
            "expected": "مرحبًا متعلم",
            "label": "مدخل []"
          },
          {
            "args": [
              "سارة"
            ],
            "expected": "مرحبًا سارة",
            "label": "مدخل [\"سارة\"]"
          },
          {
            "args": [
              ""
            ],
            "expected": "مرحبًا ",
            "label": "مدخل [\"\"]"
          }
        ]
      }
    },
    "hints": [
      "ضع القيمة الافتراضية في تعريف المعامل.",
      "لا تستعمل || لاستبدال كل قيم falsy.",
      "اختبر حذف المعامل، ثم تمرير صفر صراحة."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة area(4)؟",
      "تأخذ height القيمة الافتراضية 1."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters"
    ]
  },
  {
    "id": "js-arrays",
    "language": "javascript",
    "title": "المصفوفات والفهارس والنسخ",
    "level": "beginner",
    "prerequisites": [
      "js-functions"
    ],
    "goal": "اكتب last(values) تعيد آخر عنصر، أو null إذا كانت فارغة، دون تعديل الأصل.",
    "explanation": "تجمع المصفوفة قيمًا مرتبة، ويبدأ فهرسها بصفر. تعطي length عدد العناصر. تنشئ slice نسخة سطحية من المدى المطلوب دون تعديل الأصل، بينما تغير push وpop المصفوفة نفسها. النسخة السطحية لا تنسخ الكائنات المتداخلة نسخًا عميقًا.",
    "example": "function first(values) {\n return values.length ? values[0] : null;\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "first",
      "cases": [
        {
          "args": [
            [
              8,
              9
            ]
          ],
          "expected": 8,
          "label": "مدخل [[8, 9]]"
        }
      ]
    },
    "prediction": {
      "question": "ما نتيجة first([8,9])؟",
      "choices": [
        "9",
        "8",
        "2"
      ],
      "correct": 1,
      "why": "الفهرس صفر يشير إلى أول عنصر."
    },
    "understanding": {
      "question": "هل slice تعدل المصفوفة الأصلية؟",
      "choices": [
        "لا",
        "نعم دائمًا",
        "تحذفها"
      ],
      "correct": 0,
      "why": "ترجع slice مصفوفة جديدة."
    },
    "output": {
      "question": "ما length للمصفوفة الفارغة؟",
      "choices": [
        "1",
        "undefined",
        "0"
      ],
      "correct": 2,
      "why": "لا تحتوي عناصر."
    },
    "exercise": {
      "goal": "اكتب last(values) تعيد آخر عنصر، أو null إذا كانت فارغة، دون تعديل الأصل.",
      "starter": "function last(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "last",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": null,
            "label": "مدخل [[]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                1
              ]
            ],
            "expected": 1,
            "label": "مدخل [[1]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                2,
                5,
                9
              ]
            ],
            "expected": 9,
            "label": "مدخل [[2, 5, 9]]",
            "preserveInputs": true
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب last(values) تعيد آخر عنصر، أو null إذا كانت فارغة، دون تعديل الأصل.",
      "starter": "function last(values){return values[values.length]}",
      "spec": {
        "language": "javascript",
        "entry": "last",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": null,
            "label": "مدخل [[]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                1
              ]
            ],
            "expected": 1,
            "label": "مدخل [[1]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                2,
                5,
                9
              ]
            ],
            "expected": 9,
            "label": "مدخل [[2, 5, 9]]",
            "preserveInputs": true
          }
        ]
      }
    },
    "mastery": {
      "goal": "اكتب withoutFirst(values) تعيد مصفوفة جديدة دون أول عنصر، وتحافظ على الأصل.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "withoutFirst",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": [],
            "label": "مدخل [[]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                4
              ]
            ],
            "expected": [],
            "label": "مدخل [[4]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                1,
                2,
                3
              ]
            ],
            "expected": [
              2,
              3
            ],
            "label": "مدخل [[1, 2, 3]]",
            "preserveInputs": true
          }
        ]
      }
    },
    "hints": [
      "استعمل length لاختبار الفراغ.",
      "فهرس آخر عنصر أقل من length بواحد.",
      "تجنب pop إذا كان المطلوب حفظ المصفوفة الأصلية."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة first([8,9])؟",
      "الفهرس صفر يشير إلى أول عنصر."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections"
    ]
  },
  {
    "id": "js-objects",
    "language": "javascript",
    "title": "الكائنات والخصائص والنسخ",
    "level": "beginner",
    "prerequisites": [
      "js-arrays"
    ],
    "goal": "اكتب rename(user,name) تعيد نسخة من user بالاسم الجديد دون تعديل الأصل، مع الاحتفاظ ببقية خصائصه.",
    "explanation": "يمثل الكائن خصائص مسماة. يمكن قراءة user.name أو استخدام تفكيك الكائن. تنشئ {...user} نسخة سطحية، ويمكن إضافة خاصية أو استبدالها في النسخة. لا تغير النسخة السطحية هوية الكائنات المتداخلة. تستخدم ?? بديلًا فقط عند null أو undefined.",
    "example": "function nameOf(user) {\n return user.name ?? \"زائر\";\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "nameOf",
      "cases": [
        {
          "args": [
            {
              "name": "ليلى"
            }
          ],
          "expected": "ليلى",
          "label": "مدخل [{\"name\": \"ليلى\"}]"
        }
      ]
    },
    "prediction": {
      "question": "ما نتيجة nameOf({name:\"ليلى\"})؟",
      "choices": [
        "زائر",
        "undefined",
        "ليلى"
      ],
      "correct": 2,
      "why": "الخاصية تحمل الاسم المعروض."
    },
    "understanding": {
      "question": "هل ?? تستبدل النص الفارغ؟",
      "choices": [
        "لا",
        "نعم دائمًا",
        "تطرح العدد"
      ],
      "correct": 0,
      "why": "النص الفارغ ليس null أو undefined."
    },
    "output": {
      "question": "ما نوع نسخ spread لكائن بسيط؟",
      "choices": [
        "عميق دائمًا",
        "سطحي",
        "لا ينشئ كائنًا"
      ],
      "correct": 1,
      "why": "تبقى القيم المتداخلة مراجع مشتركة."
    },
    "exercise": {
      "goal": "اكتب rename(user,name) تعيد نسخة من user بالاسم الجديد دون تعديل الأصل، مع الاحتفاظ ببقية خصائصه.",
      "starter": "function rename(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "rename",
        "cases": [
          {
            "args": [
              {
                "name": "أ",
                "age": 2
              },
              "ب"
            ],
            "expected": {
              "name": "ب",
              "age": 2
            },
            "label": "مدخل [{\"name\": \"أ\", \"age\": 2}, \"ب\"]",
            "preserveInputs": true
          },
          {
            "args": [
              {},
              "س"
            ],
            "expected": {
              "name": "س"
            },
            "label": "مدخل [{}, \"س\"]",
            "preserveInputs": true
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب rename(user,name) تعيد نسخة من user بالاسم الجديد دون تعديل الأصل، مع الاحتفاظ ببقية خصائصه.",
      "starter": "function rename(user,name){user.name=name;return user}",
      "spec": {
        "language": "javascript",
        "entry": "rename",
        "cases": [
          {
            "args": [
              {
                "name": "أ",
                "age": 2
              },
              "ب"
            ],
            "expected": {
              "name": "ب",
              "age": 2
            },
            "label": "مدخل [{\"name\": \"أ\", \"age\": 2}, \"ب\"]",
            "preserveInputs": true
          },
          {
            "args": [
              {},
              "س"
            ],
            "expected": {
              "name": "س"
            },
            "label": "مدخل [{}, \"س\"]",
            "preserveInputs": true
          }
        ]
      }
    },
    "mastery": {
      "goal": "اكتب doneTask(task) تعيد نسخة بخصيصة done:true وتحتفظ ببقية البيانات دون تعديل الأصل.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "doneTask",
        "cases": [
          {
            "args": [
              {
                "title": "درس",
                "done": false
              }
            ],
            "expected": {
              "title": "درس",
              "done": true
            },
            "label": "مدخل [{\"title\": \"درس\", \"done\": false}]",
            "preserveInputs": true
          },
          {
            "args": [
              {
                "id": 3
              }
            ],
            "expected": {
              "id": 3,
              "done": true
            },
            "label": "مدخل [{\"id\": 3}]",
            "preserveInputs": true
          }
        ]
      }
    },
    "hints": [
      "أنشئ كائنًا جديدًا.",
      "انسخ الخصائص قبل كتابة الاسم الجديد.",
      "ترتيب spread ثم الخاصية الجديدة يحدد أي قيمة تستقر في النسخة."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة nameOf({name:\"ليلى\"})؟",
      "الخاصية تحمل الاسم المعروض."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects"
    ]
  },
  {
    "id": "js-map-filter",
    "language": "javascript",
    "title": "map وfilter والدوال المستقبلة",
    "level": "intermediate",
    "prerequisites": [
      "js-arrays",
      "js-functions"
    ],
    "goal": "اكتب evenNumbers(values) تعيد الأعداد الزوجية بترتيبها دون تعديل الأصل.",
    "explanation": "تستدعي map دالة لكل عنصر وتنتج مصفوفة بالقيم المعادة. تختار filter العناصر التي يكون ناتج دالتها truthy. لا تغير الطريقتان مصفوفة المصدر بذاتهما، لكن قد تعدل دالة الاستدعاء كائنات أو بيانات مشتركة. الصيغة n=>n*2 دالة سهمية تعيد التعبير؛ تستطيع مراجعة نموذج Arrow المعتمد من الزر أعلى الصفحة.",
    "example": "function doubled(values) {\n return values.map(n => n * 2);\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "doubled",
      "cases": [
        {
          "args": [
            [
              1,
              3
            ]
          ],
          "expected": [
            2,
            6
          ],
          "label": "مدخل [[1, 3]]"
        }
      ]
    },
    "prediction": {
      "question": "ما نتيجة doubled([1,3])؟",
      "choices": [
        "[2,6]",
        "[1,3]",
        "6"
      ],
      "correct": 0,
      "why": "تعيد map قيمة مضاعفة لكل عنصر."
    },
    "understanding": {
      "question": "أي دالة تختار عناصر بدل تحويل كل القيم؟",
      "choices": [
        "map",
        "filter",
        "console.log"
      ],
      "correct": 1,
      "why": "تحتفظ filter بالعناصر التي تحقق الشرط."
    },
    "output": {
      "question": "هل يمنع استخدام map تعديل كائن داخل callback؟",
      "choices": [
        "نعم دائمًا",
        "تلغي كل المراجع",
        "لا؛ مسؤولية callback ألا تعدله"
      ],
      "correct": 2,
      "why": "إنشاء مصفوفة جديدة لا يعني نسخ الكائنات عميقًا."
    },
    "exercise": {
      "goal": "اكتب evenNumbers(values) تعيد الأعداد الزوجية بترتيبها دون تعديل الأصل.",
      "starter": "function evenNumbers(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "evenNumbers",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": [],
            "label": "مدخل [[]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                1,
                2,
                0,
                -4,
                3
              ]
            ],
            "expected": [
              2,
              0,
              -4
            ],
            "label": "مدخل [[1, 2, 0, -4, 3]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                5,
                7
              ]
            ],
            "expected": [],
            "label": "مدخل [[5, 7]]",
            "preserveInputs": true
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب evenNumbers(values) تعيد الأعداد الزوجية بترتيبها دون تعديل الأصل.",
      "starter": "function evenNumbers(values){return values.filter(n=>n>0)}",
      "spec": {
        "language": "javascript",
        "entry": "evenNumbers",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": [],
            "label": "مدخل [[]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                1,
                2,
                0,
                -4,
                3
              ]
            ],
            "expected": [
              2,
              0,
              -4
            ],
            "label": "مدخل [[1, 2, 0, -4, 3]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                5,
                7
              ]
            ],
            "expected": [],
            "label": "مدخل [[5, 7]]",
            "preserveInputs": true
          }
        ]
      }
    },
    "mastery": {
      "goal": "اكتب names(users) تعيد مصفوفة أسماء المستخدمين بترتيبهم دون تعديلهم.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "names",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": [],
            "label": "مدخل [[]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                {
                  "name": "أ"
                },
                {
                  "name": "ب"
                }
              ]
            ],
            "expected": [
              "أ",
              "ب"
            ],
            "label": "مدخل [[{\"name\": \"أ\"}, {\"name\": \"ب\"}]]",
            "preserveInputs": true
          }
        ]
      }
    },
    "hints": [
      "زوجية العدد تعني أن باقي قسمته على 2 صفر.",
      "الصفر والأعداد السالبة قد تكون زوجية.",
      "أعد المصفوفة الناتجة ولا تطبعها فقط."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة doubled([1,3])؟",
      "تعيد map قيمة مضاعفة لكل عنصر."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"
    ]
  },
  {
    "id": "js-reduce",
    "language": "javascript",
    "title": "reduce والقيمة الابتدائية",
    "level": "intermediate",
    "prerequisites": [
      "js-map-filter",
      "js-objects"
    ],
    "goal": "اكتب totalPrices(items) باستخدام reduce لجمع price لكل عنصر، مع صفر للمصفوفة الفارغة.",
    "explanation": "تجمع reduce عناصر المصفوفة في نتيجة واحدة يحددها التمرين. تمرر دالتها المجمّع والعنصر الحالي، ويصبح ما تعيده المجمّع التالي. توفير قيمة ابتدائية مثل صفر يسمح بجمع مصفوفة فارغة دون خطأ. لا تخلط بين عدد العناصر ومجموع قيمها.",
    "example": "function total(values) {\n return values.reduce((sum, n) => sum + n, 0);\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "total",
      "cases": [
        {
          "args": [
            []
          ],
          "expected": 0,
          "label": "مدخل [[]]"
        }
      ]
    },
    "prediction": {
      "question": "ما نتيجة total([])؟",
      "choices": [
        "خطأ",
        "0",
        "undefined"
      ],
      "correct": 1,
      "why": "ترجع القيمة الابتدائية عند غياب العناصر."
    },
    "understanding": {
      "question": "ما الذي تعيده callback في reduce؟",
      "choices": [
        "المجمّع التالي",
        "اسم المكتبة",
        "عدد الحروف دائمًا"
      ],
      "correct": 0,
      "why": "تصبح القيمة المعادة نتيجة المرحلة التالية."
    },
    "output": {
      "question": "ماذا قد يحدث لـ[].reduce(fn) دون قيمة ابتدائية؟",
      "choices": [
        "تعيد صفرًا تلقائيًا",
        "تعيد [] دائمًا",
        "ترمي TypeError"
      ],
      "correct": 2,
      "why": "لا توجد قيمة تبدأ بها عملية الاختزال."
    },
    "exercise": {
      "goal": "اكتب totalPrices(items) باستخدام reduce لجمع price لكل عنصر، مع صفر للمصفوفة الفارغة.",
      "starter": "function totalPrices(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "totalPrices",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": 0,
            "label": "مدخل [[]]"
          },
          {
            "args": [
              [
                {
                  "price": 2
                },
                {
                  "price": 3
                }
              ]
            ],
            "expected": 5,
            "label": "مدخل [[{\"price\": 2}, {\"price\": 3}]]"
          },
          {
            "args": [
              [
                {
                  "price": 0
                },
                {
                  "price": -1
                }
              ]
            ],
            "expected": -1,
            "label": "مدخل [[{\"price\": 0}, {\"price\": -1}]]"
          }
        ],
        "requiredCalls": [
          "reduce"
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب totalPrices(items) باستخدام reduce لجمع price لكل عنصر، مع صفر للمصفوفة الفارغة.",
      "starter": "function totalPrices(items){return items.reduce((sum,item)=>sum+item.price)}",
      "spec": {
        "language": "javascript",
        "entry": "totalPrices",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": 0,
            "label": "مدخل [[]]"
          },
          {
            "args": [
              [
                {
                  "price": 2
                },
                {
                  "price": 3
                }
              ]
            ],
            "expected": 5,
            "label": "مدخل [[{\"price\": 2}, {\"price\": 3}]]"
          },
          {
            "args": [
              [
                {
                  "price": 0
                },
                {
                  "price": -1
                }
              ]
            ],
            "expected": -1,
            "label": "مدخل [[{\"price\": 0}, {\"price\": -1}]]"
          }
        ],
        "requiredCalls": [
          "reduce"
        ]
      }
    },
    "mastery": {
      "goal": "اكتب totalQuantity(items) لجمع qty باستخدام reduce، مع صفر للفراغ.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "totalQuantity",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": 0,
            "label": "مدخل [[]]"
          },
          {
            "args": [
              [
                {
                  "qty": 2
                },
                {
                  "qty": 0
                },
                {
                  "qty": 5
                }
              ]
            ],
            "expected": 7,
            "label": "مدخل [[{\"qty\": 2}, {\"qty\": 0}, {\"qty\": 5}]]"
          }
        ],
        "requiredCalls": [
          "reduce"
        ]
      }
    },
    "hints": [
      "ابدأ من الصفر بدل أول كائن.",
      "أعد العدد الناتج في كل استدعاء.",
      "اختبر الفراغ قبل الاكتفاء بحالة ذات عنصرين."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة total([])؟",
      "ترجع القيمة الابتدائية عند غياب العناصر."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"
    ]
  },
  {
    "id": "js-closure",
    "language": "javascript",
    "title": "Scope والإغلاق وحفظ الحالة",
    "level": "advanced",
    "prerequisites": [
      "js-loops",
      "js-functions"
    ],
    "goal": "اكتب countFrom(start,count) تنشئ دالة داخلية تزيد حالة محلية 1، وتعيد قائمة نتائج استدعائها count مرة.",
    "explanation": "يحدد النطاق أين يمكن الوصول إلى ارتباط. تستطيع الدالة الداخلية الاحتفاظ بالوصول إلى ارتباطات الدالة الخارجية بعد انتهاء استدعائها؛ يسمى ذلك closure. تستقل حالة كل استدعاء منشئ عن الآخر. لا تحتاج إلى متغير عام لحفظ هذه الحالة.",
    "example": "function sequence(start, count) {\n let value = start;\n const next = () => ++value;\n const out = [];\n for (let i=0; i<count; i++) out.push(next());\n return out;\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "sequence",
      "cases": [
        {
          "args": [
            3,
            2
          ],
          "expected": [
            4,
            5
          ],
          "label": "مدخل [3, 2]"
        }
      ]
    },
    "prediction": {
      "question": "ما نتيجة sequence(3,2)؟",
      "choices": [
        "[3,4]",
        "[4,5]",
        "[5,5]"
      ],
      "correct": 1,
      "why": "تزيد next الحالة قبل إعادة كل قيمة."
    },
    "understanding": {
      "question": "إلى ماذا تصل الدالة الداخلية هنا؟",
      "choices": [
        "value في نطاقها الخارجي",
        "بيانات أي صفحة",
        "متغير غير معرف"
      ],
      "correct": 0,
      "why": "يحتفظ الإغلاق بالارتباط الخارجي."
    },
    "output": {
      "question": "هل يجب أن تتشارك استدعاءات sequence متغيرًا عامًا؟",
      "choices": [
        "نعم",
        "فقط في Vue",
        "لا؛ لكل استدعاء نطاق مستقل"
      ],
      "correct": 2,
      "why": "يمكن لكل استدعاء إنشاء حالة مستقلة."
    },
    "exercise": {
      "goal": "اكتب countFrom(start,count) تنشئ دالة داخلية تزيد حالة محلية 1، وتعيد قائمة نتائج استدعائها count مرة.",
      "starter": "function countFrom(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "countFrom",
        "cases": [
          {
            "args": [
              0,
              3
            ],
            "expected": [
              1,
              2,
              3
            ],
            "label": "مدخل [0, 3]"
          },
          {
            "args": [
              5,
              0
            ],
            "expected": [],
            "label": "مدخل [5, 0]"
          },
          {
            "args": [
              -2,
              3
            ],
            "expected": [
              -1,
              0,
              1
            ],
            "label": "مدخل [-2, 3]"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب countFrom(start,count) تنشئ دالة داخلية تزيد حالة محلية 1، وتعيد قائمة نتائج استدعائها count مرة.",
      "starter": "let current=0;function countFrom(start,count){const next=()=>++current;return Array.from({length:count},next)}",
      "spec": {
        "language": "javascript",
        "entry": "countFrom",
        "cases": [
          {
            "args": [
              0,
              3
            ],
            "expected": [
              1,
              2,
              3
            ],
            "label": "مدخل [0, 3]"
          },
          {
            "args": [
              5,
              0
            ],
            "expected": [],
            "label": "مدخل [5, 0]"
          },
          {
            "args": [
              -2,
              3
            ],
            "expected": [
              -1,
              0,
              1
            ],
            "label": "مدخل [-2, 3]"
          }
        ]
      }
    },
    "mastery": {
      "goal": "اكتب accumulate(start,values) مع دالة داخلية تضيف كل قيمة إلى حالة وتعيد النتائج المتتابعة.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "accumulate",
        "cases": [
          {
            "args": [
              0,
              [
                2,
                3
              ]
            ],
            "expected": [
              2,
              5
            ],
            "label": "مدخل [0, [2, 3]]"
          },
          {
            "args": [
              5,
              []
            ],
            "expected": [],
            "label": "مدخل [5, []]"
          },
          {
            "args": [
              1,
              [
                -1,
                4
              ]
            ],
            "expected": [
              0,
              4
            ],
            "label": "مدخل [1, [-1, 4]]"
          }
        ]
      }
    },
    "hints": [
      "ضع الحالة داخل الدالة الخارجية.",
      "أنشئ دالة داخلية تصل إلى الحالة.",
      "لا تجعل استدعاء جديد يرث حالة الاستدعاء السابق."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة sequence(3,2)؟",
      "تزيد next الحالة قبل إعادة كل قيمة."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures"
    ]
  },
  {
    "id": "js-promises",
    "language": "javascript",
    "title": "Promises والنتيجة المؤجلة",
    "level": "intermediate",
    "prerequisites": [
      "js-functions"
    ],
    "goal": "اكتب addLater(a,b) تعيد Promise يتحقق بمجموع العددين.",
    "explanation": "يمثل Promise نتيجة قد تتحقق أو ترفض لاحقًا. يعيد then وعدًا جديدًا بنتيجة معالج النجاح أو رفضه، ويمكن إرجاع قيمة من المعالج لتصبح نتيجة السلسلة. لا يعيد console.log قيمة العملية. يستخدم المصحح await لمراقبة النتيجة الفعلية ويتحقق من أن الدالة تعيد وعدًا.",
    "example": "function doubleLater(value) {\n return Promise.resolve(value).then(n => n * 2);\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "doubleLater",
      "cases": [
        {
          "args": [
            3
          ],
          "expected": 6,
          "label": "مدخل [3]"
        }
      ],
      "requirePromise": true
    },
    "prediction": {
      "question": "ما القيمة التي يتحقق بها الوعد عند doubleLater(3)؟",
      "choices": [
        "3",
        "undefined",
        "6"
      ],
      "correct": 2,
      "why": "يعيد معالج then العدد مضروبًا في 2."
    },
    "understanding": {
      "question": "ما الذي تعيده then؟",
      "choices": [
        "Promise جديدًا",
        "نصًا دائمًا",
        "توقف الصفحة"
      ],
      "correct": 0,
      "why": "تسمح القيمة المعادة ببناء سلسلة."
    },
    "output": {
      "question": "هل الطباعة داخل then وحدها تعيد نتيجة حسابية؟",
      "choices": [
        "نعم دائمًا",
        "لا؛ يجب إرجاعها",
        "فقط للعدد صفر"
      ],
      "correct": 1,
      "why": "الطباعة ليست return للحساب."
    },
    "exercise": {
      "goal": "اكتب addLater(a,b) تعيد Promise يتحقق بمجموع العددين.",
      "starter": "function addLater(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "addLater",
        "cases": [
          {
            "args": [
              2,
              3
            ],
            "expected": 5,
            "label": "مدخل [2, 3]"
          },
          {
            "args": [
              0,
              0
            ],
            "expected": 0,
            "label": "مدخل [0, 0]"
          },
          {
            "args": [
              -2,
              1
            ],
            "expected": -1,
            "label": "مدخل [-2, 1]"
          }
        ],
        "requirePromise": true
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب addLater(a,b) تعيد Promise يتحقق بمجموع العددين.",
      "starter": "function addLater(a,b){return a+b}",
      "spec": {
        "language": "javascript",
        "entry": "addLater",
        "cases": [
          {
            "args": [
              2,
              3
            ],
            "expected": 5,
            "label": "مدخل [2, 3]"
          },
          {
            "args": [
              0,
              0
            ],
            "expected": 0,
            "label": "مدخل [0, 0]"
          },
          {
            "args": [
              -2,
              1
            ],
            "expected": -1,
            "label": "مدخل [-2, 1]"
          }
        ],
        "requirePromise": true
      }
    },
    "mastery": {
      "goal": "اكتب squareLater(n) تعيد Promise يتحقق بمربع العدد.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "squareLater",
        "cases": [
          {
            "args": [
              3
            ],
            "expected": 9,
            "label": "مدخل [3]"
          },
          {
            "args": [
              0
            ],
            "expected": 0,
            "label": "مدخل [0]"
          },
          {
            "args": [
              -2
            ],
            "expected": 4,
            "label": "مدخل [-2]"
          }
        ],
        "requirePromise": true
      }
    },
    "hints": [
      "أعد Promise نفسه من الدالة.",
      "Promise.resolve ينشئ وعدًا متحققًا بالقيمة.",
      "إذا حسبت داخل then، أعد الحساب من المعالج."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما القيمة التي يتحقق بها الوعد عند doubleLater(3)؟",
      "يعيد معالج then العدد مضروبًا في 2."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises"
    ]
  },
  {
    "id": "js-async-errors",
    "language": "javascript",
    "title": "async/await ومعالجة الرفض",
    "level": "advanced",
    "prerequisites": [
      "js-promises"
    ],
    "goal": "اكتب parseSafe(text) كدالة async تعيد قيمة JSON المحللة، أو null للنص غير الصالح.",
    "explanation": "تعيد الدالة async وعدًا حتى عندما تعيد قيمة عادية. توقف await متابعة هذه الدالة حتى يستقر الوعد؛ لا توقف واجهة التطبيق كلها. يلتقط try/catch رفضًا تنتظره داخل try. نحدد بديلًا مقصودًا للخطأ بدل إخفاء كل مشكلة دون معنى.",
    "example": "async function parseLater(text) {\n try { return JSON.parse(await Promise.resolve(text)); }\n catch { return null; }\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "parseLater",
      "cases": [
        {
          "args": [
            "bad"
          ],
          "expected": null,
          "label": "مدخل [\"bad\"]"
        }
      ],
      "requirePromise": true
    },
    "prediction": {
      "question": "ما نتيجة انتظار parseLater(\"bad\")؟",
      "choices": [
        "null",
        "bad",
        "تتعطل الصفحة"
      ],
      "correct": 0,
      "why": "يفشل JSON.parse فيلتقط catch الخطأ ويعيد null."
    },
    "understanding": {
      "question": "ما نوع ما تعيده async؟",
      "choices": [
        "عنصر HTML",
        "Promise",
        "عدد دائمًا"
      ],
      "correct": 1,
      "why": "تغلف async القيمة المعادة في وعد."
    },
    "output": {
      "question": "هل await توقف التطبيق كله؟",
      "choices": [
        "نعم دائمًا",
        "تلغي المتصفح",
        "لا؛ توقف متابعة الدالة الحالية"
      ],
      "correct": 2,
      "why": "تستأنف الدالة بعد استقرار الوعد."
    },
    "exercise": {
      "goal": "اكتب parseSafe(text) كدالة async تعيد قيمة JSON المحللة، أو null للنص غير الصالح.",
      "starter": "function parseSafe(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "parseSafe",
        "cases": [
          {
            "args": [
              "{\"n\":2}"
            ],
            "expected": {
              "n": 2
            },
            "label": "مدخل [\"{\\\"n\\\":2}\"]"
          },
          {
            "args": [
              "[1,2]"
            ],
            "expected": [
              1,
              2
            ],
            "label": "مدخل [\"[1,2]\"]"
          },
          {
            "args": [
              "broken"
            ],
            "expected": null,
            "label": "مدخل [\"broken\"]"
          },
          {
            "args": [
              "0"
            ],
            "expected": 0,
            "label": "مدخل [\"0\"]"
          }
        ],
        "requirePromise": true,
        "requireNodes": [
          [
            "AwaitExpression"
          ]
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب parseSafe(text) كدالة async تعيد قيمة JSON المحللة، أو null للنص غير الصالح.",
      "starter": "async function parseSafe(text){return JSON.parse(text)}",
      "spec": {
        "language": "javascript",
        "entry": "parseSafe",
        "cases": [
          {
            "args": [
              "{\"n\":2}"
            ],
            "expected": {
              "n": 2
            },
            "label": "مدخل [\"{\\\"n\\\":2}\"]"
          },
          {
            "args": [
              "[1,2]"
            ],
            "expected": [
              1,
              2
            ],
            "label": "مدخل [\"[1,2]\"]"
          },
          {
            "args": [
              "broken"
            ],
            "expected": null,
            "label": "مدخل [\"broken\"]"
          },
          {
            "args": [
              "0"
            ],
            "expected": 0,
            "label": "مدخل [\"0\"]"
          }
        ],
        "requirePromise": true,
        "requireNodes": [
          [
            "AwaitExpression"
          ]
        ]
      }
    },
    "mastery": {
      "goal": "اكتب waitValue(value) كدالة async تعيد قيمة الوعد المتحقق؛ استخدم await داخلها.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "waitValue",
        "cases": [
          {
            "args": [
              0
            ],
            "expected": 0,
            "label": "مدخل [0]"
          },
          {
            "args": [
              "نص"
            ],
            "expected": "نص",
            "label": "مدخل [\"نص\"]"
          },
          {
            "args": [
              {
                "id": 1
              }
            ],
            "expected": {
              "id": 1
            },
            "label": "مدخل [{\"id\": 1}]"
          }
        ],
        "requirePromise": true,
        "requireNodes": [
          [
            "AwaitExpression"
          ]
        ]
      }
    },
    "hints": [
      "اكتب async قبل تعريف الدالة.",
      "ضع العملية التي قد ترمي داخل try.",
      "أعد null في catch دون استبدال صفر أو false الصالحين."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة انتظار parseLater(\"bad\")؟",
      "يفشل JSON.parse فيلتقط catch الخطأ ويعيد null."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"
    ]
  },
  {
    "id": "js-modules",
    "language": "javascript",
    "title": "ES Modules والاستيراد والتصدير",
    "level": "advanced",
    "prerequisites": [
      "js-functions",
      "js-promises"
    ],
    "goal": "استورد add من ./math.js وصدّر دالة total(a,b) التي تعيد مجموعهما.",
    "explanation": "تعرف export واجهة الوحدة، وتستورد import ارتباطات معلنة من وحدة أخرى. تعمل الوحدة في نطاقها الخاص وبالوضع الصارم. يوفر هذا المختبر وحدة محلية ./math.js تصدر add وtriple، وينفذ ملفات التمرين كوحدات ES حقيقية معزولة. لا يدعم هنا حزم npm أو استيرادات شبكية أو دورات وحدات متعددة.",
    "example": "import { add } from \"./math.js\";\nexport function total(a,b) { return add(a,b); }",
    "exampleSpec": {
      "language": "javascript",
      "entry": "total",
      "cases": [
        {
          "args": [
            2,
            3
          ],
          "expected": 5,
          "label": "مدخل [2, 3]"
        }
      ],
      "module": true,
      "modules": {
        "./math.js": "export const add=(a,b)=>a+b;export const triple=n=>n*3;"
      },
      "requiredImports": [
        "./math.js"
      ]
    },
    "prediction": {
      "question": "ما ناتج total(2,3) بعد الاستيراد؟",
      "choices": [
        "2",
        "5",
        "undefined"
      ],
      "correct": 1,
      "why": "تستدعي الدالة add المستوردة."
    },
    "understanding": {
      "question": "كيف نعلن قيمة ليستوردها ملف آخر؟",
      "choices": [
        "export",
        "console.log",
        "label"
      ],
      "correct": 0,
      "why": "تحدد export واجهة الوحدة."
    },
    "output": {
      "question": "هل يجب أن يستطيع كل ملف رؤية متغيرات وحدة أخرى بلا import؟",
      "choices": [
        "نعم",
        "للمصفوفات فقط",
        "لا؛ للوحدة نطاق مستقل"
      ],
      "correct": 2,
      "why": "تحتاج الواجهة المعلنة إلى استيراد صريح."
    },
    "exercise": {
      "goal": "استورد add من ./math.js وصدّر دالة total(a,b) التي تعيد مجموعهما.",
      "starter": "import { add } from \"./math.js\";\nexport function total(a,b) {\n  // أعد الناتج\n}",
      "spec": {
        "language": "javascript",
        "entry": "total",
        "cases": [
          {
            "args": [
              2,
              3
            ],
            "expected": 5,
            "label": "مدخل [2, 3]"
          },
          {
            "args": [
              0,
              0
            ],
            "expected": 0,
            "label": "مدخل [0, 0]"
          },
          {
            "args": [
              -3,
              1
            ],
            "expected": -2,
            "label": "مدخل [-3, 1]"
          }
        ],
        "module": true,
        "modules": {
          "./math.js": "export const add=(a,b)=>a+b;export const triple=n=>n*3;"
        },
        "requiredImports": [
          "./math.js"
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: استورد add من ./math.js وصدّر دالة total(a,b) التي تعيد مجموعهما.",
      "starter": "import {add} from \"./math.js\";export function total(a,b){add(a,b)}",
      "spec": {
        "language": "javascript",
        "entry": "total",
        "cases": [
          {
            "args": [
              2,
              3
            ],
            "expected": 5,
            "label": "مدخل [2, 3]"
          },
          {
            "args": [
              0,
              0
            ],
            "expected": 0,
            "label": "مدخل [0, 0]"
          },
          {
            "args": [
              -3,
              1
            ],
            "expected": -2,
            "label": "مدخل [-3, 1]"
          }
        ],
        "module": true,
        "modules": {
          "./math.js": "export const add=(a,b)=>a+b;export const triple=n=>n*3;"
        },
        "requiredImports": [
          "./math.js"
        ]
      }
    },
    "mastery": {
      "goal": "استورد triple من ./math.js وصدّر scaled(n) التي تعيد ثلاثة أمثال العدد.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "scaled",
        "cases": [
          {
            "args": [
              2
            ],
            "expected": 6,
            "label": "مدخل [2]"
          },
          {
            "args": [
              0
            ],
            "expected": 0,
            "label": "مدخل [0]"
          },
          {
            "args": [
              -2
            ],
            "expected": -6,
            "label": "مدخل [-2]"
          }
        ],
        "module": true,
        "modules": {
          "./math.js": "export const add=(a,b)=>a+b;export const triple=n=>n*3;"
        },
        "requiredImports": [
          "./math.js"
        ]
      }
    },
    "hints": [
      "احترم اسم التصدير في الوحدة.",
      "يمكن تغيير الاسم المحلي باستخدام as.",
      "أضف export إلى دالة الحل المطلوبة أيضًا."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما ناتج total(2,3) بعد الاستيراد؟",
      "تستدعي الدالة add المستوردة."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
    ]
  },
  {
    "id": "js-debugging",
    "language": "javascript",
    "title": "تحديد سبب الخطأ واختبار الحدود",
    "level": "intermediate",
    "prerequisites": [
      "js-types",
      "js-conditions"
    ],
    "goal": "اكتب nextNumber(text) تعيد العدد المحول زائد 1، أو null للنص الفارغ أو غير العددي أو غير المنتهي.",
    "explanation": "ابدأ التصحيح بتحديد السلوك المتوقع ومدخل يعيد المشكلة. يمكن أن يكون الكود صحيح الصياغة لكنه يجمع نصوصًا بدل أعداد. اختبر الحالة العادية والحدية وغير الصالحة، ثم أعد الاختبار بعد الإصلاح. لا تخمن رقم سطر من مكدس مولّد؛ يعرض المحرر موضع المحلل عندما يكون موثوقًا.",
    "example": "function next(text) {\n const value = Number(text);\n return value + 1;\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "next",
      "cases": [
        {
          "args": [
            "2"
          ],
          "expected": 3,
          "label": "مدخل [\"2\"]"
        }
      ]
    },
    "prediction": {
      "question": "ما نتيجة next(\"2\")؟",
      "choices": [
        "\"21\"",
        "2",
        "3"
      ],
      "correct": 2,
      "why": "يجري التحويل قبل الجمع العددي."
    },
    "understanding": {
      "question": "هل نجاح الصياغة يكفي لإثبات صحة السلوك؟",
      "choices": [
        "لا",
        "نعم دائمًا",
        "فقط في Vue"
      ],
      "correct": 0,
      "why": "قد يكون الخطأ منطقيًا."
    },
    "output": {
      "question": "لماذا نختبر الصفر والفراغ؟",
      "choices": [
        "لتغيير الخط",
        "لكشف افتراضات المدخلات",
        "لإبطاء الموقع"
      ],
      "correct": 1,
      "why": "الحالات الحدية تكشف أخطاء مثل || أو التحويل غير المقصود."
    },
    "exercise": {
      "goal": "اكتب nextNumber(text) تعيد العدد المحول زائد 1، أو null للنص الفارغ أو غير العددي أو غير المنتهي.",
      "starter": "function nextNumber(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "nextNumber",
        "cases": [
          {
            "args": [
              "2"
            ],
            "expected": 3,
            "label": "مدخل [\"2\"]"
          },
          {
            "args": [
              "0"
            ],
            "expected": 1,
            "label": "مدخل [\"0\"]"
          },
          {
            "args": [
              "-1"
            ],
            "expected": 0,
            "label": "مدخل [\"-1\"]"
          },
          {
            "args": [
              ""
            ],
            "expected": null,
            "label": "مدخل [\"\"]"
          },
          {
            "args": [
              "bad"
            ],
            "expected": null,
            "label": "مدخل [\"bad\"]"
          },
          {
            "args": [
              "Infinity"
            ],
            "expected": null,
            "label": "مدخل [\"Infinity\"]"
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب nextNumber(text) تعيد العدد المحول زائد 1، أو null للنص الفارغ أو غير العددي أو غير المنتهي.",
      "starter": "function nextNumber(text){return text+1}",
      "spec": {
        "language": "javascript",
        "entry": "nextNumber",
        "cases": [
          {
            "args": [
              "2"
            ],
            "expected": 3,
            "label": "مدخل [\"2\"]"
          },
          {
            "args": [
              "0"
            ],
            "expected": 1,
            "label": "مدخل [\"0\"]"
          },
          {
            "args": [
              "-1"
            ],
            "expected": 0,
            "label": "مدخل [\"-1\"]"
          },
          {
            "args": [
              ""
            ],
            "expected": null,
            "label": "مدخل [\"\"]"
          },
          {
            "args": [
              "bad"
            ],
            "expected": null,
            "label": "مدخل [\"bad\"]"
          },
          {
            "args": [
              "Infinity"
            ],
            "expected": null,
            "label": "مدخل [\"Infinity\"]"
          }
        ]
      }
    },
    "mastery": {
      "goal": "اكتب previousNumber(text) بنفس قواعد التحقق، لكن اطرح 1.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "previousNumber",
        "cases": [
          {
            "args": [
              "2"
            ],
            "expected": 1,
            "label": "مدخل [\"2\"]"
          },
          {
            "args": [
              "0"
            ],
            "expected": -1,
            "label": "مدخل [\"0\"]"
          },
          {
            "args": [
              ""
            ],
            "expected": null,
            "label": "مدخل [\"\"]"
          },
          {
            "args": [
              "bad"
            ],
            "expected": null,
            "label": "مدخل [\"bad\"]"
          }
        ]
      }
    },
    "hints": [
      "أعد إنتاج مشكلة الجمع بالنص \"2\".",
      "افصل التحقق والتحويل عن الحساب.",
      "احتفظ بالصفر كمدخل صالح."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة next(\"2\")؟",
      "يجري التحويل قبل الجمع العددي."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong"
    ]
  },
  {
    "id": "js-dom",
    "language": "javascript",
    "title": "DOM وإنشاء العناصر",
    "level": "intermediate",
    "prerequisites": [
      "js-objects",
      "html-semantics"
    ],
    "goal": "اكتب setup() لتنشئ h1 نصه «مهامي» وتلحقه داخل #app.",
    "explanation": "تمثل DOM المستند كشجرة عناصر. تختار querySelector أول عنصر يطابق محددًا أو تعيد null. ينشئ createElement عنصرًا، ويضع textContent نصًا دون تفسيره كترميز HTML. تلحق append العنصر بالأب. تقدم الأداة DOM معزولة تدعم هذه العمليات والأحداث؛ القياسات والتصفح من اختصاص المتصفح في المحاكي.",
    "example": "function setup(){\n const p=document.createElement(\"p\");\n p.textContent=\"مرحبا\";\n document.querySelector(\"#app\").append(p);\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "setup",
      "environment": "dom",
      "fixture": "<main id=\"app\"></main>",
      "phases": [
        {
          "rules": [
            {
              "selector": "#app p",
              "kind": "text",
              "expected": "مرحبا",
              "label": "النص الناتج"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما الذي يضاف إلى #app في المثال؟",
      "choices": [
        "فقرة نصها مرحبا",
        "صورة",
        "رابط"
      ],
      "correct": 0,
      "why": "ينشئ createElement فقرة ويكتب textContent ثم يلحقها."
    },
    "understanding": {
      "question": "ماذا تعيد querySelector إذا لم تجد عنصرًا؟",
      "choices": [
        "[] دائمًا",
        "null",
        "أول متغير"
      ],
      "correct": 1,
      "why": "يجب التعامل مع غياب العنصر."
    },
    "output": {
      "question": "أي اختيار مناسب لعرض نص غير موثوق دون تفسير HTML؟",
      "choices": [
        "innerHTML دائمًا",
        "eval",
        "textContent"
      ],
      "correct": 2,
      "why": "تتعامل textContent مع المدخل كنص."
    },
    "exercise": {
      "goal": "اكتب setup() لتنشئ h1 نصه «مهامي» وتلحقه داخل #app.",
      "starter": "function setup(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "setup",
        "cases": [],
        "environment": "dom",
        "fixture": "<main id=\"app\"></main>",
        "phases": [
          {
            "rules": [
              {
                "selector": "#app > h1",
                "kind": "count",
                "expected": 1,
                "label": "إنشاء عنوان"
              },
              {
                "selector": "#app > h1",
                "kind": "text",
                "expected": "مهامي",
                "label": "نص العنوان"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب setup() لتنشئ h1 نصه «مهامي» وتلحقه داخل #app.",
      "starter": "function setup(){document.querySelector(\"#app\").textContent=\"مهامي\"}",
      "spec": {
        "language": "javascript",
        "entry": "setup",
        "cases": [],
        "environment": "dom",
        "fixture": "<main id=\"app\"></main>",
        "phases": [
          {
            "rules": [
              {
                "selector": "#app > h1",
                "kind": "count",
                "expected": 1,
                "label": "إنشاء عنوان"
              },
              {
                "selector": "#app > h1",
                "kind": "text",
                "expected": "مهامي",
                "label": "نص العنوان"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "اكتب setup() لتنشئ ul داخل #app، وفيها li نصها «قراءة» وli نصها «تطبيق».",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "setup",
        "environment": "dom",
        "fixture": "<main id=\"app\"></main>",
        "phases": [
          {
            "rules": [
              {
                "selector": "#app ul > li",
                "kind": "count",
                "expected": 2,
                "label": "عنصران"
              },
              {
                "selector": "li:first-child",
                "kind": "text",
                "expected": "قراءة",
                "label": "الأول"
              },
              {
                "selector": "li:last-child",
                "kind": "text",
                "expected": "تطبيق",
                "label": "الثاني"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "اختر الحاوية الموجودة أولًا.",
      "أنشئ عنصر h1 بدل الاكتفاء بتغيير نص الأب.",
      "عيّن النص ثم ألحق العنصر."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما الذي يضاف إلى #app في المثال؟",
      "ينشئ createElement فقرة ويكتب textContent ثم يلحقها."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"
    ],
    "environment": "dom",
    "fixture": "<main id=\"app\"></main>"
  },
  {
    "id": "js-events",
    "language": "javascript",
    "title": "الأحداث والاستجابة للإدخال",
    "level": "intermediate",
    "prerequisites": [
      "js-dom",
      "js-closure"
    ],
    "goal": "اكتب setup() لتزيد output بمقدار 2 عند كل نقرة على button، بدءًا من النص 0 الموجود.",
    "explanation": "يسجل addEventListener دالة تستدعى عند الحدث، ولا يستدعيها فور التسجيل. تحمل event.target العنصر الذي بدأ منه الحدث. يمكن للحالة المحلية في الإغلاق تسجيل عدد النقرات. لا تعتمد هذه الأداة على النص داخل المصدر؛ ترسل أحداثًا إلى عناصر DOM وتفحص التغيّر الفعلي.",
    "example": "function setup(){\n let count=0;\n document.querySelector(\"button\").addEventListener(\"click\",()=>{\n  document.querySelector(\"output\").textContent=String(++count);\n });\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "setup",
      "environment": "dom",
      "fixture": "<button>زد</button><output>0</output>",
      "phases": [
        {
          "actions": [
            {
              "kind": "click",
              "selector": "button"
            }
          ],
          "rules": [
            {
              "selector": "output",
              "kind": "text",
              "expected": "1",
              "label": "النقرة الأولى"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ماذا يحدث بعد نقرة واحدة في المثال؟",
      "choices": [
        "يظل صفرًا",
        "يصبح output هو 1",
        "يحذف الزر"
      ],
      "correct": 1,
      "why": "تزيد الدالة الحالة عند وقوع الحدث."
    },
    "understanding": {
      "question": "هل addEventListener يستدعي المعالج فور التسجيل؟",
      "choices": [
        "لا",
        "نعم",
        "للنصوص فقط"
      ],
      "correct": 0,
      "why": "يسجل المعالج ليعمل عند الحدث."
    },
    "output": {
      "question": "ما event.target؟",
      "choices": [
        "رقم السطر",
        "نوع الملف",
        "العنصر الذي بدأ منه الحدث"
      ],
      "correct": 2,
      "why": "قد يختلف عن currentTarget عند الفقاعات."
    },
    "exercise": {
      "goal": "اكتب setup() لتزيد output بمقدار 2 عند كل نقرة على button، بدءًا من النص 0 الموجود.",
      "starter": "function setup(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "setup",
        "cases": [],
        "environment": "dom",
        "fixture": "<button>زد</button><output>0</output>",
        "phases": [
          {
            "rules": [
              {
                "selector": "output",
                "kind": "text",
                "expected": "0",
                "label": "بداية"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "click",
                "selector": "button"
              }
            ],
            "rules": [
              {
                "selector": "output",
                "kind": "text",
                "expected": "2",
                "label": "نقرة"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "click",
                "selector": "button"
              }
            ],
            "rules": [
              {
                "selector": "output",
                "kind": "text",
                "expected": "4",
                "label": "نقرتان"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب setup() لتزيد output بمقدار 2 عند كل نقرة على button، بدءًا من النص 0 الموجود.",
      "starter": "function setup(){document.querySelector(\"output\").textContent=\"2\"}",
      "spec": {
        "language": "javascript",
        "entry": "setup",
        "cases": [],
        "environment": "dom",
        "fixture": "<button>زد</button><output>0</output>",
        "phases": [
          {
            "rules": [
              {
                "selector": "output",
                "kind": "text",
                "expected": "0",
                "label": "بداية"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "click",
                "selector": "button"
              }
            ],
            "rules": [
              {
                "selector": "output",
                "kind": "text",
                "expected": "2",
                "label": "نقرة"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "click",
                "selector": "button"
              }
            ],
            "rules": [
              {
                "selector": "output",
                "kind": "text",
                "expected": "4",
                "label": "نقرتان"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "اربط input بحدث input ليعرض output النص المكتوب بعد trim؛ اختبر الفراغ والمسافات.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "setup",
        "environment": "dom",
        "fixture": "<input><output></output>",
        "phases": [
          {
            "actions": [
              {
                "kind": "input",
                "selector": "input",
                "value": "  مرحبا  "
              }
            ],
            "rules": [
              {
                "selector": "output",
                "kind": "text",
                "expected": "مرحبا",
                "label": "تنظيف النص"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "input",
                "selector": "input",
                "value": "   "
              }
            ],
            "rules": [
              {
                "selector": "output",
                "kind": "text",
                "expected": "",
                "label": "الفراغ"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "سجل دالة، ولا تنفذها عند التسجيل.",
      "احتفظ بالعداد خارج المعالج وداخل setup.",
      "تتحقق الحالات من البداية ومن نقرات متتالية."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ماذا يحدث بعد نقرة واحدة في المثال؟",
      "تزيد الدالة الحالة عند وقوع الحدث."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"
    ],
    "environment": "dom",
    "fixture": "<button>زد</button><output>0</output>"
  },
  {
    "id": "js-delegation",
    "language": "javascript",
    "title": "تفويض الأحداث والعناصر المضافة لاحقًا",
    "level": "advanced",
    "prerequisites": [
      "js-events",
      "js-arrays"
    ],
    "goal": "اكتب setup() بمعالج click على ul يحذف li عند نقر button أو span داخله، حتى لعناصر تضاف لاحقًا.",
    "explanation": "تصعد كثير من أحداث DOM عبر الأسلاف. يمكن تسجيل معالج على القائمة بدل كل زر. تحدد closest أقرب عنصر يطابق محددًا بدءًا من العنصر نفسه؛ لذلك تعمل النقرة على span داخل الزر أيضًا. افحص أن الهدف يخص القائمة المطلوبة. يشمل الاختبار عنصرًا يضاف بعد تسجيل المعالج.",
    "example": "function setup(){\n document.querySelector(\"ul\").addEventListener(\"click\",event=>{\n  const button=event.target.closest(\"button\");\n  if(button)button.closest(\"li\").remove();\n });\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "setup",
      "environment": "dom",
      "fixture": "<ul><li><button><span>حذف</span></button></li></ul>",
      "phases": [
        {
          "actions": [
            {
              "kind": "click",
              "selector": "span"
            }
          ],
          "rules": [
            {
              "selector": "li",
              "kind": "count",
              "expected": 0,
              "label": "الحذف"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "لماذا تعمل النقرة على span في المثال؟",
      "choices": [
        "تبحث closest عن button في السلسلة الصاعدة",
        "لأن span زر دائمًا",
        "لأن CSS تحذف li"
      ],
      "correct": 0,
      "why": "تجد closest الزر الذي يحتوي العنصر الداخلي."
    },
    "understanding": {
      "question": "أين نسجل معالج التفويض؟",
      "choices": [
        "داخل كل صورة",
        "على الحاوية الأب",
        "في localStorage"
      ],
      "correct": 1,
      "why": "يستقبل الأب الأحداث التي تصل إليه."
    },
    "output": {
      "question": "هل تفويض مناسب يستجيب لابن أضيف لاحقًا؟",
      "choices": [
        "لا",
        "فقط بعد تحديث الصفحة",
        "نعم"
      ],
      "correct": 2,
      "why": "المعالج على الأب الموجود، لا قائمة أزرار قديمة."
    },
    "exercise": {
      "goal": "اكتب setup() بمعالج click على ul يحذف li عند نقر button أو span داخله، حتى لعناصر تضاف لاحقًا.",
      "starter": "function setup(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "setup",
        "cases": [],
        "environment": "dom",
        "fixture": "<ul><li><button><span>حذف</span></button></li></ul>",
        "phases": [
          {
            "actions": [
              {
                "kind": "click",
                "selector": "span"
              }
            ],
            "rules": [
              {
                "selector": "li",
                "kind": "count",
                "expected": 0,
                "label": "حذف من عنصر داخلي"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "append",
                "selector": "ul",
                "html": "<li><button><span>جديد</span></button></li>"
              },
              {
                "kind": "click",
                "selector": "span"
              }
            ],
            "rules": [
              {
                "selector": "li",
                "kind": "count",
                "expected": 0,
                "label": "عنصر أضيف لاحقًا"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب setup() بمعالج click على ul يحذف li عند نقر button أو span داخله، حتى لعناصر تضاف لاحقًا.",
      "starter": "function setup(){document.querySelectorAll(\"button\").forEach(b=>b.addEventListener(\"click\",()=>b.closest(\"li\").remove()))}",
      "spec": {
        "language": "javascript",
        "entry": "setup",
        "cases": [],
        "environment": "dom",
        "fixture": "<ul><li><button><span>حذف</span></button></li></ul>",
        "phases": [
          {
            "actions": [
              {
                "kind": "click",
                "selector": "span"
              }
            ],
            "rules": [
              {
                "selector": "li",
                "kind": "count",
                "expected": 0,
                "label": "حذف من عنصر داخلي"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "append",
                "selector": "ul",
                "html": "<li><button><span>جديد</span></button></li>"
              },
              {
                "kind": "click",
                "selector": "span"
              }
            ],
            "rules": [
              {
                "selector": "li",
                "kind": "count",
                "expected": 0,
                "label": "عنصر أضيف لاحقًا"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "فوّض click على #list لتغيير نص button المنقور إلى «تم»، حتى عند نقر span داخل زر جديد.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "setup",
        "environment": "dom",
        "fixture": "<section id=\"list\"><button><span>أنجز</span></button></section>",
        "phases": [
          {
            "actions": [
              {
                "kind": "click",
                "selector": "span"
              }
            ],
            "rules": [
              {
                "selector": "button",
                "kind": "text",
                "expected": "تم",
                "label": "الزر الأول"
              }
            ]
          },
          {
            "actions": [
              {
                "kind": "append",
                "selector": "#list",
                "html": "<button id=\"new\"><span>جديد</span></button>"
              },
              {
                "kind": "click",
                "selector": "#new span"
              }
            ],
            "rules": [
              {
                "selector": "#new",
                "kind": "text",
                "expected": "تم",
                "label": "زر أضيف لاحقًا"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "راقب click على الحاوية بدل الأزرار الأولى فقط.",
      "استخدم closest عند احتمال وجود عنصر داخلي.",
      "لا يكفي نجاح النقر على عنصر واحد قبل إضافة عناصر جديدة."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "لماذا تعمل النقرة على span في المثال؟",
      "تجد closest الزر الذي يحتوي العنصر الداخلي."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling"
    ],
    "environment": "dom",
    "fixture": "<ul><li><button><span>حذف</span></button></li></ul>"
  },
  {
    "id": "js-storage",
    "language": "javascript",
    "title": "Local Storage وJSON والاستعادة الآمنة",
    "level": "intermediate",
    "prerequisites": [
      "js-objects",
      "js-async-errors"
    ],
    "goal": "اكتب saveNote(value) لحفظ القيمة تحت note وإعادة النص المقروء من المساحة.",
    "explanation": "تخزن Web Storage مفاتيح وقيمًا نصية، وتعطي getItem قيمة null للمفتاح الغائب. استخدم JSON.stringify وJSON.parse للكائنات، وتحقق من نوع البيانات بعد التحليل. قد يفشل الوصول أو الحفظ، فلا تعرض نجاحًا وهميًا. مساحة التمرين منفصلة، وتُحفظ تجربة التشغيل ضمن تقدم الدرس؛ لا تضع فيها أسرارًا.",
    "example": "function note(value){\n localStorage.setItem(\"note\",value);\n return localStorage.getItem(\"note\");\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "note",
      "cases": [
        {
          "args": [
            "مسودتي"
          ],
          "expected": "مسودتي",
          "label": "مدخل [\"مسودتي\"]"
        }
      ],
      "storage": true,
      "persistStorage": true
    },
    "prediction": {
      "question": "ما نتيجة note(\"مسودتي\")؟",
      "choices": [
        "null",
        "نص مسودتي",
        "كائن جديد"
      ],
      "correct": 1,
      "why": "تعيد getItem النص المحفوظ."
    },
    "understanding": {
      "question": "ماذا تعيد getItem لمفتاح غائب؟",
      "choices": [
        "null",
        "false دائمًا",
        "{}"
      ],
      "correct": 0,
      "why": "الغياب مميز عن النص الفارغ."
    },
    "output": {
      "question": "هل JSON.parse كاف لضمان مخطط بيانات صحيح؟",
      "choices": [
        "نعم",
        "يكفي اسم المفتاح",
        "لا؛ افحص نوع البنية بعده"
      ],
      "correct": 2,
      "why": "قد يكون JSON صحيحًا لكنه من نوع غير متوقع."
    },
    "exercise": {
      "goal": "اكتب saveNote(value) لحفظ القيمة تحت note وإعادة النص المقروء من المساحة.",
      "starter": "function saveNote(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "saveNote",
        "cases": [
          {
            "args": [
              "درس"
            ],
            "expected": "درس",
            "label": "مدخل [\"درس\"]"
          },
          {
            "args": [
              0
            ],
            "expected": "0",
            "label": "مدخل [0]"
          },
          {
            "args": [
              ""
            ],
            "expected": "",
            "label": "مدخل [\"\"]"
          }
        ],
        "storage": true,
        "expectStorage": {
          "note": "$arg0"
        }
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب saveNote(value) لحفظ القيمة تحت note وإعادة النص المقروء من المساحة.",
      "starter": "function saveNote(value){return value}",
      "spec": {
        "language": "javascript",
        "entry": "saveNote",
        "cases": [
          {
            "args": [
              "درس"
            ],
            "expected": "درس",
            "label": "مدخل [\"درس\"]"
          },
          {
            "args": [
              0
            ],
            "expected": "0",
            "label": "مدخل [0]"
          },
          {
            "args": [
              ""
            ],
            "expected": "",
            "label": "مدخل [\"\"]"
          }
        ],
        "storage": true,
        "expectStorage": {
          "note": "$arg0"
        }
      }
    },
    "mastery": {
      "goal": "اكتب loadTasks() تعيد مصفوفة JSON تحت tasks، أو [] عند الغياب أو التلف أو نوع غير مصفوفة.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "loadTasks",
        "cases": [
          {
            "args": [],
            "expected": [],
            "label": "غياب",
            "storageData": {}
          },
          {
            "args": [],
            "expected": [],
            "label": "تالف",
            "storageData": {
              "tasks": "bad"
            }
          },
          {
            "args": [],
            "expected": [],
            "label": "نوع خاطئ",
            "storageData": {
              "tasks": "{\"a\":1}"
            }
          },
          {
            "args": [],
            "expected": [
              "قراءة"
            ],
            "label": "مصفوفة صالحة",
            "storageData": {
              "tasks": "[\"قراءة\"]"
            }
          }
        ],
        "storage": true
      }
    },
    "hints": [
      "احفظ باستخدام setItem ثم اقرأ باستخدام getItem.",
      "لا تفترض أن القيم أعداد أو كائنات دون تحويل.",
      "تعامل مع غياب النص وتلف JSON ونوع الجذر غير المتوقع."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة note(\"مسودتي\")؟",
      "تعيد getItem النص المحفوظ."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API"
    ],
    "storage": true
  },
  {
    "id": "js-fetch",
    "language": "javascript",
    "title": "Fetch وفشل HTTP وفشل الشبكة",
    "level": "advanced",
    "prerequisites": [
      "js-async-errors",
      "js-arrays"
    ],
    "goal": "اكتب loadTasks() تطلب /tasks وتعيد مصفوفة JSON فقط، أو [] لحالة HTTP فاشلة أو رفض طلب أو JSON غير صالح/نوع غير مصفوفة.",
    "explanation": "يعيد fetch وعدًا باستجابة HTTP. لا يرفض عادة لمجرد حالة 404؛ افحص response.ok قبل قراءة البيانات. تعيد response.json وعدًا وقد تفشل في تحليل جسم غير صالح. تستعمل الحالات Response الحقيقي ببيانات مضبوطة دون شبكة، لتختبر النجاح وأخطاء HTTP ورفض الطلب بصورة مستقلة عن خادم خارجي.",
    "example": "async function load(){\n try {\n  const response=await fetch(\"/tasks\");\n  if(!response.ok)return [];\n  const data=await response.json();\n  return Array.isArray(data)?data:[];\n } catch { return []; }\n}",
    "exampleSpec": {
      "language": "javascript",
      "entry": "load",
      "mockFetch": true,
      "requestURL": "/tasks",
      "cases": [
        {
          "args": [],
          "response": {
            "status": 200,
            "body": [
              "قراءة"
            ]
          },
          "expected": [
            "قراءة"
          ],
          "label": "استجابة محلية"
        }
      ]
    },
    "prediction": {
      "question": "هل تؤدي حالة 404 وحدها إلى رفض fetch عادة؟",
      "choices": [
        "نعم دائمًا",
        "لا؛ افحص ok",
        "تعيد مصفوفة تلقائيًا"
      ],
      "correct": 1,
      "why": "تمثل 404 استجابة HTTP، لا رفض شبكة بالضرورة."
    },
    "understanding": {
      "question": "ما نوع response.json()؟",
      "choices": [
        "Promise للتحليل",
        "نص متزامن دائمًا",
        "عنصر DOM"
      ],
      "correct": 0,
      "why": "يجب انتظار القراءة والتحليل."
    },
    "output": {
      "question": "هل تثبت هذه الحالات المحلية عمل خادم خارجي؟",
      "choices": [
        "نعم",
        "كل المواقع",
        "لا"
      ],
      "correct": 2,
      "why": "تتحقق من منطق التعامل مع الاستجابة فقط."
    },
    "exercise": {
      "goal": "اكتب loadTasks() تطلب /tasks وتعيد مصفوفة JSON فقط، أو [] لحالة HTTP فاشلة أو رفض طلب أو JSON غير صالح/نوع غير مصفوفة.",
      "starter": "function loadTasks(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "loadTasks",
        "cases": [
          {
            "args": [],
            "response": {
              "status": 200,
              "body": [
                "أ",
                "ب"
              ]
            },
            "expected": [
              "أ",
              "ب"
            ],
            "label": "بيانات"
          },
          {
            "args": [],
            "response": {
              "status": 200,
              "body": []
            },
            "expected": [],
            "label": "فارغة"
          },
          {
            "args": [],
            "response": {
              "status": 404,
              "body": [
                "يجب تجاهلها"
              ]
            },
            "expected": [],
            "label": "HTTP فاشل"
          },
          {
            "args": [],
            "response": {
              "reject": "offline"
            },
            "expected": [],
            "label": "رفض شبكة"
          },
          {
            "args": [],
            "response": {
              "status": 200,
              "body": "broken"
            },
            "expected": [],
            "label": "JSON تالف"
          },
          {
            "args": [],
            "response": {
              "status": 200,
              "body": {
                "a": 1
              }
            },
            "expected": [],
            "label": "نوع غير مصفوفة"
          }
        ],
        "mockFetch": true,
        "requestURL": "/tasks",
        "requirePromise": true
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: اكتب loadTasks() تطلب /tasks وتعيد مصفوفة JSON فقط، أو [] لحالة HTTP فاشلة أو رفض طلب أو JSON غير صالح/نوع غير مصفوفة.",
      "starter": "async function loadTasks(){const r=await fetch(\"/tasks\");return r.json()}",
      "spec": {
        "language": "javascript",
        "entry": "loadTasks",
        "cases": [
          {
            "args": [],
            "response": {
              "status": 200,
              "body": [
                "أ",
                "ب"
              ]
            },
            "expected": [
              "أ",
              "ب"
            ],
            "label": "بيانات"
          },
          {
            "args": [],
            "response": {
              "status": 200,
              "body": []
            },
            "expected": [],
            "label": "فارغة"
          },
          {
            "args": [],
            "response": {
              "status": 404,
              "body": [
                "يجب تجاهلها"
              ]
            },
            "expected": [],
            "label": "HTTP فاشل"
          },
          {
            "args": [],
            "response": {
              "reject": "offline"
            },
            "expected": [],
            "label": "رفض شبكة"
          },
          {
            "args": [],
            "response": {
              "status": 200,
              "body": "broken"
            },
            "expected": [],
            "label": "JSON تالف"
          },
          {
            "args": [],
            "response": {
              "status": 200,
              "body": {
                "a": 1
              }
            },
            "expected": [],
            "label": "نوع غير مصفوفة"
          }
        ],
        "mockFetch": true,
        "requestURL": "/tasks",
        "requirePromise": true
      }
    },
    "mastery": {
      "goal": "اكتب loadTitle() تطلب /tasks وتعيد title النصية من كائن الاستجابة، أو \"غير متاح\" عند فشل HTTP/الشبكة أو غياب title النصية.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "loadTitle",
        "cases": [
          {
            "args": [],
            "response": {
              "status": 200,
              "body": {
                "title": "مرحبا"
              }
            },
            "expected": "مرحبا",
            "label": "نجاح"
          },
          {
            "args": [],
            "response": {
              "status": 404,
              "body": {
                "title": "لا تقبلها"
              }
            },
            "expected": "غير متاح",
            "label": "HTTP فاشل"
          },
          {
            "args": [],
            "response": {
              "reject": "offline"
            },
            "expected": "غير متاح",
            "label": "شبكة"
          },
          {
            "args": [],
            "response": {
              "status": 200,
              "body": {
                "title": 0
              }
            },
            "expected": "غير متاح",
            "label": "نوع خاطئ"
          },
          {
            "args": [],
            "response": {
              "status": 200,
              "body": {
                "title": ""
              }
            },
            "expected": "",
            "label": "نص فارغ صالح"
          }
        ],
        "mockFetch": true,
        "requestURL": "/tasks",
        "requirePromise": true
      }
    },
    "hints": [
      "تحقق من ok بعد await fetch.",
      "انتظر json ثم افحص نوع القيمة.",
      "ضع القراءة في try/catch لمعالجة رفض الشبكة أو التحليل."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "هل تؤدي حالة 404 وحدها إلى رفض fetch عادة؟",
      "تمثل 404 استجابة HTTP، لا رفض شبكة بالضرورة."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
    ],
    "mockFetch": true
  },
  {
    "id": "js-project-organization",
    "language": "javascript",
    "title": "تنظيم منطق المشروع في وحدات",
    "level": "advanced",
    "prerequisites": [
      "js-modules",
      "js-map-filter",
      "js-reduce"
    ],
    "goal": "استورد done من ./selectors.js وصدّر summary(tasks) لتعطي {total:عدد الكل, completed:عدد المنجز}. لا تعدل البيانات.",
    "explanation": "افصل منطق البيانات عن العرض ليصبح قابلًا للاختبار وإعادة الاستخدام. تعلن وحدة صغيرة وظائف ذات غرض محدد وتستوردها وحدة التجميع. تبقى دالة التلخيص مستقلة عن DOM وتقدم كائنًا يمكن للواجهة عرضه. تتضمن وحدة التمرين ./selectors.js الدالتين done وnames؛ الأولى تختار المنجز والثانية تستخرج العناوين.",
    "example": "import { done } from \"./selectors.js\";\nexport function completedCount(tasks){ return done(tasks).length; }",
    "exampleSpec": {
      "language": "javascript",
      "entry": "completedCount",
      "cases": [
        {
          "args": [
            [
              {
                "done": true
              },
              {
                "done": false
              }
            ]
          ],
          "expected": 1,
          "label": "مدخل [[{\"done\": true}, {\"done\": false}]]"
        }
      ],
      "module": true,
      "modules": {
        "./selectors.js": "export const done=tasks=>tasks.filter(task=>task.done);export const names=tasks=>tasks.map(task=>task.title);"
      },
      "requiredImports": [
        "./selectors.js"
      ]
    },
    "prediction": {
      "question": "ما نتيجة completedCount لمهمة منجزة وأخرى غير منجزة؟",
      "choices": [
        "2",
        "0",
        "1"
      ],
      "correct": 2,
      "why": "تختار done المنجزة ثم نقرأ العدد."
    },
    "understanding": {
      "question": "ما فائدة فصل منطق البيانات عن DOM؟",
      "choices": [
        "يسهل اختباره دون واجهة",
        "يمنع كل خطأ",
        "يلغي الحاجة للمتطلبات"
      ],
      "correct": 0,
      "why": "يمكن اختبار المدخلات والمخرجات مستقلة."
    },
    "output": {
      "question": "هل أسماء الملفات وحدها تعني أن المشروع منظم؟",
      "choices": [
        "نعم",
        "لا؛ يلزم توزيع مسؤوليات واضح",
        "فقط في Vue"
      ],
      "correct": 1,
      "why": "يخدم الفصل غرضًا سلوكيًا قابلًا للفهم."
    },
    "exercise": {
      "goal": "استورد done من ./selectors.js وصدّر summary(tasks) لتعطي {total:عدد الكل, completed:عدد المنجز}. لا تعدل البيانات.",
      "starter": "function summary(...args) {\n  // اكتب الحل\n}",
      "spec": {
        "language": "javascript",
        "entry": "summary",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": {
              "total": 0,
              "completed": 0
            },
            "label": "مدخل [[]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                {
                  "title": "أ",
                  "done": true
                },
                {
                  "title": "ب",
                  "done": false
                }
              ]
            ],
            "expected": {
              "total": 2,
              "completed": 1
            },
            "label": "مدخل [[{\"title\": \"أ\", \"done\": true}, {\"title\": \"ب\", \"done\": false}]]",
            "preserveInputs": true
          }
        ],
        "module": true,
        "modules": {
          "./selectors.js": "export const done=tasks=>tasks.filter(task=>task.done);export const names=tasks=>tasks.map(task=>task.title);"
        },
        "requiredImports": [
          "./selectors.js"
        ]
      }
    },
    "fix": {
      "goal": "أصلح الخطأ ليحقق الكود متطلبات التطبيق: استورد done من ./selectors.js وصدّر summary(tasks) لتعطي {total:عدد الكل, completed:عدد المنجز}. لا تعدل البيانات.",
      "starter": "import {done} from \"./selectors.js\";export function summary(tasks){return {total:tasks.length,completed:tasks.length}}",
      "spec": {
        "language": "javascript",
        "entry": "summary",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": {
              "total": 0,
              "completed": 0
            },
            "label": "مدخل [[]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                {
                  "title": "أ",
                  "done": true
                },
                {
                  "title": "ب",
                  "done": false
                }
              ]
            ],
            "expected": {
              "total": 2,
              "completed": 1
            },
            "label": "مدخل [[{\"title\": \"أ\", \"done\": true}, {\"title\": \"ب\", \"done\": false}]]",
            "preserveInputs": true
          }
        ],
        "module": true,
        "modules": {
          "./selectors.js": "export const done=tasks=>tasks.filter(task=>task.done);export const names=tasks=>tasks.map(task=>task.title);"
        },
        "requiredImports": [
          "./selectors.js"
        ]
      }
    },
    "mastery": {
      "goal": "استورد done وnames وصدّر completedTitles(tasks) لتعطي عناوين المهام المنجزة فقط بترتيبها.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "entry": "completedTitles",
        "cases": [
          {
            "args": [
              []
            ],
            "expected": [],
            "label": "مدخل [[]]",
            "preserveInputs": true
          },
          {
            "args": [
              [
                {
                  "title": "أ",
                  "done": false
                },
                {
                  "title": "ب",
                  "done": true
                },
                {
                  "title": "ج",
                  "done": true
                }
              ]
            ],
            "expected": [
              "ب",
              "ج"
            ],
            "label": "مدخل [[{\"title\": \"أ\", \"done\": false}, {\"title\": \"ب\", \"done\": true}, {\"title\": \"ج\", \"done\": true}]]",
            "preserveInputs": true
          }
        ],
        "module": true,
        "modules": {
          "./selectors.js": "export const done=tasks=>tasks.filter(task=>task.done);export const names=tasks=>tasks.map(task=>task.title);"
        },
        "requiredImports": [
          "./selectors.js"
        ]
      }
    },
    "hints": [
      "اجعل التلخيص دالة لا تحتاج DOM.",
      "استعمل وظائف الوحدة الموثقة بدل بيانات تجريبية ثابتة.",
      "تحقق من قائمة فارغة وأخرى مختلطة الحالة."
    ],
    "predictionHints": [
      "تتبّع المدخل في المثال قبل اختيار الإجابة.",
      "ما نتيجة completedCount لمهمة منجزة وأخرى غير منجزة؟",
      "تختار done المنجزة ثم نقرأ العدد."
    ],
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
    ]
  }
];
for(const lesson of entries)root.VLexGuidedLessons.add(lesson);
})(typeof window!=='undefined'?window:globalThis);
