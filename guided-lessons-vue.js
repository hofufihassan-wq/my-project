/* Vue 3.4 learning groups, using real Vue and bounded documented tools. */
(function(root){
"use strict";
const entries=[
  {
    "id": "vue-template",
    "language": "vue",
    "title": "الاستيفاء وربط الخصائص",
    "level": "beginner",
    "prerequisites": [
      "vue-ref"
    ],
    "goal": "اعرض title في p#title واربط tip بخاصية title للعنصر نفسه. السياق يغير القيم من الأب؛ يجب أن يتحدث العرض.",
    "explanation": "تضع {{ }} قيمة نصية في القالب، بينما يربط :title قيمة خاصية. النص الثابت بين علامتي اقتباس لا يتابع المتغير. هنا يستقبل المكون البيانات من أب حقيقي؛ لا تنسخها إلى ثابت إذا أردت متابعة تغيّرها.",
    "example": "<script setup>\nconst message=\"مرحبا\";\n</script>\n<template>\n<p id=\"example\" :title=\"message\">{{message}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "مرحبا",
              "label": "النص الفعلي #example"
            },
            {
              "selector": "#example",
              "kind": "prop",
              "expected": "مرحبا",
              "label": "الخاصية title",
              "property": "title"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما نص المثال؟",
      "choices": [
        "message",
        "فارغ",
        "مرحبا"
      ],
      "correct": 2,
      "why": "يعرض الاستيفاء قيمة message."
    },
    "understanding": {
      "question": "كيف نربط خاصية بقيمة؟",
      "choices": [
        ":title=\"value\"",
        "title=\"value\"",
        "{{title=value}}"
      ],
      "correct": 0,
      "why": "النقطتان اختصار v-bind."
    },
    "output": {
      "question": "هل يتبع النص title=\"tip\" المتغير tip؟",
      "choices": [
        "نعم دائمًا",
        "يحذف الخاصية",
        "لا؛ هو نص ثابت"
      ],
      "correct": 2,
      "why": "تحتاج :title للربط الديناميكي."
    },
    "exercise": {
      "goal": "اعرض title في p#title واربط tip بخاصية title للعنصر نفسه. السياق يغير القيم من الأب؛ يجب أن يتحدث العرض.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#title",
                "kind": "text",
                "expected": "أهلاً",
                "label": "النص الفعلي #title"
              },
              {
                "selector": "#title",
                "kind": "prop",
                "expected": "وصف",
                "label": "الخاصية title",
                "property": "title"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#title",
                "kind": "text",
                "expected": "سلام",
                "label": "النص الفعلي #title"
              },
              {
                "selector": "#title",
                "kind": "prop",
                "expected": "جديد",
                "label": "الخاصية title",
                "property": "title"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "title": "سلام",
                  "tip": "جديد"
                }
              }
            ]
          }
        ],
        "props": {
          "title": "أهلاً",
          "tip": "وصف"
        }
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: اعرض title في p#title واربط tip بخاصية title للعنصر نفسه. السياق يغير القيم من الأب؛ يجب أن يتحدث العرض.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#title",
                "kind": "text",
                "expected": "أهلاً",
                "label": "النص الفعلي #title"
              },
              {
                "selector": "#title",
                "kind": "prop",
                "expected": "وصف",
                "label": "الخاصية title",
                "property": "title"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#title",
                "kind": "text",
                "expected": "سلام",
                "label": "النص الفعلي #title"
              },
              {
                "selector": "#title",
                "kind": "prop",
                "expected": "جديد",
                "label": "الخاصية title",
                "property": "title"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "title": "سلام",
                  "tip": "جديد"
                }
              }
            ]
          }
        ],
        "props": {
          "title": "أهلاً",
          "tip": "وصف"
        }
      }
    },
    "mastery": {
      "goal": "اعرض name في رابط a#profile واربط href بقيمة url من الأب، مع تحديثهما عند تغير الخصائص.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#profile",
                "kind": "text",
                "expected": "نور",
                "label": "النص الفعلي #profile"
              },
              {
                "selector": "#profile",
                "kind": "prop",
                "expected": "#one",
                "label": "الخاصية href",
                "property": "href"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#profile",
                "kind": "text",
                "expected": "سارة",
                "label": "النص الفعلي #profile"
              },
              {
                "selector": "#profile",
                "kind": "prop",
                "expected": "#two",
                "label": "الخاصية href",
                "property": "href"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "name": "سارة",
                  "url": "#two"
                }
              }
            ]
          }
        ],
        "props": {
          "name": "نور",
          "url": "#one"
        }
      }
    },
    "hints": [
      "ابدأ بـ defineProps لاستقبال title وtip.",
      "استعمل الاستيفاء للنص وv-bind للخاصية.",
      "أبق القراءة من props حتى تتبع تحديث الأب."
    ],
    "predictionHints": [
      "يعرض الاستيفاء قيمة message.",
      "ابدأ بـ defineProps لاستقبال title وtip.",
      "استعمل الاستيفاء للنص وv-bind للخاصية."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/template-syntax.html"
    ]
  },
  {
    "id": "vue-events",
    "language": "vue",
    "title": "الأحداث والدوال ومعاملاتها",
    "level": "beginner",
    "prerequisites": [
      "vue-ref",
      "js-functions"
    ],
    "goal": "زر #add يزيد p#total بمقدار 2 من الصفر، وزر #reset يعيده إلى الصفر.",
    "explanation": "يربط @click دالة بحدث النقر. استعمال اسم الدالة يستدعيها عند الحدث؛ تنفيذ تغيير الحالة أثناء إنشاء المكون ليس تسجيل حدث. يمكن تمرير معامل في تعبير القالب، وتحتاج ref.value عند التعديل داخل script.",
    "example": "<script setup>\nimport{ref}from\"vue\";const count=ref(3);function add(amount){count.value+=amount}\n</script>\n<template>\n<button @click=\"add(2)\">أضف</button><p id=\"example\">{{count}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "3",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما القيمة قبل أي نقرة؟",
      "choices": [
        "2",
        "3",
        "5"
      ],
      "correct": 1,
      "why": "لا تُستدعى add قبل النقر."
    },
    "understanding": {
      "question": "أين نعدل ref في script؟",
      "choices": [
        "count.value",
        "count.text",
        "count()"
      ],
      "correct": 0,
      "why": "القيمة في .value."
    },
    "output": {
      "question": "ماذا تفعل دالة reset للحالة؟",
      "choices": [
        "تحذف الدرس",
        "تسند قيمة البداية",
        "تعيد تركيب التطبيق كله"
      ],
      "correct": 1,
      "why": "تغيير الحالة لا يحتاج إعادة تركيب الصفحة."
    },
    "exercise": {
      "goal": "زر #add يزيد p#total بمقدار 2 من الصفر، وزر #reset يعيده إلى الصفر.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #total"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "4",
                "label": "النص الفعلي #total"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#add"
              },
              {
                "kind": "click",
                "selector": "#add"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #total"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#reset"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: زر #add يزيد p#total بمقدار 2 من الصفر، وزر #reset يعيده إلى الصفر.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #total"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "4",
                "label": "النص الفعلي #total"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#add"
              },
              {
                "kind": "click",
                "selector": "#add"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #total"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#reset"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "ابدأ برصيد 5 في #balance. زر #take ينقص 2 وزر #restore يعيد 5، حتى بعد العبور تحت الصفر.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#balance",
                "kind": "text",
                "expected": "5",
                "label": "النص الفعلي #balance"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#balance",
                "kind": "text",
                "expected": "-1",
                "label": "النص الفعلي #balance"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#take"
              },
              {
                "kind": "click",
                "selector": "#take"
              },
              {
                "kind": "click",
                "selector": "#take"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#balance",
                "kind": "text",
                "expected": "5",
                "label": "النص الفعلي #balance"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#restore"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "استخدم ref للحالة.",
      "اربط دالتين مختلفتين بالزرين.",
      "غيّر .value داخل الدالة ولا تطبع الناتج فقط."
    ],
    "predictionHints": [
      "لا تُستدعى add قبل النقر.",
      "استخدم ref للحالة.",
      "اربط دالتين مختلفتين بالزرين."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/event-handling.html"
    ]
  },
  {
    "id": "vue-reactive",
    "language": "vue",
    "title": "كائنات reactive وتحديث خصائصها",
    "level": "beginner",
    "prerequisites": [
      "vue-events",
      "js-objects"
    ],
    "goal": "كائن reactive لبيانات صندوق: يبدأ #qty بالعدد 1 و#label بالنص قلم؛ #more يزيد الكمية و#rename يغير الاسم إلى دفتر.",
    "explanation": "ينشئ reactive وسيطًا للكائن يتتبع قراءة الخصائص وتغييرها. لا تحتاج .value على الكائن نفسه. تفكيك خاصية أولية إلى ثابت قد يقطع صلتها بالتحديث؛ اقرأها من الكائن أو استخدم toRefs عندما تحتاج مراجع مستقلة.",
    "example": "<script setup>\nimport{reactive}from\"vue\";const item=reactive({name:\"كتاب\",qty:2});\n</script>\n<template>\n<p id=\"example\">{{item.name}}:{{item.qty}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "كتاب:2",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما النص الأول؟",
      "choices": [
        "كتاب:0",
        "undefined",
        "كتاب:2"
      ],
      "correct": 2,
      "why": "تقرأ القيم الابتدائية من الكائن."
    },
    "understanding": {
      "question": "هل نكتب item.value.qty مع reactive؟",
      "choices": [
        "نعم دائمًا",
        "نستعمل item()",
        "لا؛ item.qty"
      ],
      "correct": 2,
      "why": "reactive يختلف عن غلاف ref."
    },
    "output": {
      "question": "ماذا يفعل تغيير خاصية متتبعة؟",
      "choices": [
        "يعيد تحميل المتصفح",
        "يمحو التخزين",
        "يحدّث العرض المرتبط"
      ],
      "correct": 2,
      "why": "Vue يحدث العرض دون إعادة تحميل."
    },
    "exercise": {
      "goal": "كائن reactive لبيانات صندوق: يبدأ #qty بالعدد 1 و#label بالنص قلم؛ #more يزيد الكمية و#rename يغير الاسم إلى دفتر.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#qty",
                "kind": "text",
                "expected": "1",
                "label": "النص الفعلي #qty"
              },
              {
                "selector": "#label",
                "kind": "text",
                "expected": "قلم",
                "label": "النص الفعلي #label"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#qty",
                "kind": "text",
                "expected": "3",
                "label": "النص الفعلي #qty"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#more"
              },
              {
                "kind": "click",
                "selector": "#more"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#label",
                "kind": "text",
                "expected": "دفتر",
                "label": "النص الفعلي #label"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#rename"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: كائن reactive لبيانات صندوق: يبدأ #qty بالعدد 1 و#label بالنص قلم؛ #more يزيد الكمية و#rename يغير الاسم إلى دفتر.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#qty",
                "kind": "text",
                "expected": "1",
                "label": "النص الفعلي #qty"
              },
              {
                "selector": "#label",
                "kind": "text",
                "expected": "قلم",
                "label": "النص الفعلي #label"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#qty",
                "kind": "text",
                "expected": "3",
                "label": "النص الفعلي #qty"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#more"
              },
              {
                "kind": "click",
                "selector": "#more"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#label",
                "kind": "text",
                "expected": "دفتر",
                "label": "النص الفعلي #label"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#rename"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "اعرض كائن عضو يبدأ score=2 وactive=false في #score و#active، وزر #advance يزيد score بثلاثة ويقلب active.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#score",
                "kind": "text",
                "expected": "2",
                "label": "النص الفعلي #score"
              },
              {
                "selector": "#active",
                "kind": "text",
                "expected": "false",
                "label": "النص الفعلي #active"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#score",
                "kind": "text",
                "expected": "5",
                "label": "النص الفعلي #score"
              },
              {
                "selector": "#active",
                "kind": "text",
                "expected": "true",
                "label": "النص الفعلي #active"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#advance"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#score",
                "kind": "text",
                "expected": "8",
                "label": "النص الفعلي #score"
              },
              {
                "selector": "#active",
                "kind": "text",
                "expected": "false",
                "label": "النص الفعلي #active"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#advance"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "استخدم reactive لكائن الحالتين.",
      "اقرأ خصائص الكائن في القالب مباشرة.",
      "اربط التعديل بأحداث الأزرار دون نسخ الخصائص إلى ثوابت."
    ],
    "predictionHints": [
      "تقرأ القيم الابتدائية من الكائن.",
      "استخدم reactive لكائن الحالتين.",
      "اقرأ خصائص الكائن في القالب مباشرة."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/reactivity-fundamentals.html"
    ]
  },
  {
    "id": "vue-computed",
    "language": "vue",
    "title": "القيم المشتقة مع computed",
    "level": "beginner",
    "prerequisites": [
      "vue-reactive",
      "js-functions"
    ],
    "goal": "سعر ثابت 7 وكمية ref تبدأ 1. اعرض #total من computed، وزر #increase يزيد الكمية 1.",
    "explanation": "تمثل computed قيمة مشتقة من الحالة ويعاد حسابها عند تغير تبعياتها التفاعلية. اجعل getter دون آثار جانبية؛ لا تحفظ الإجمالي يدويًا كلما تغيرت الكمية. التقييم هنا يفحص الناتج وتغيره، ولا يزعم إثبات كل خصائص التخزين المؤقت من مظهره.",
    "example": "<script setup>\nimport{ref,computed}from\"vue\";const n=ref(2);const doubled=computed(()=>n.value*2);\n</script>\n<template>\n<p id=\"example\">{{doubled}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "4",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما ناتج المثال؟",
      "choices": [
        "4",
        "2",
        "NaN"
      ],
      "correct": 0,
      "why": "تضاعف computed القيمة 2."
    },
    "understanding": {
      "question": "ما المناسب لـcomputed؟",
      "choices": [
        "طلب شبكة في كل قراءة",
        "حذف بيانات المستخدم",
        "قيمة مشتقة دون أثر جانبي"
      ],
      "correct": 2,
      "why": "الـgetter يصف الناتج المشتق."
    },
    "output": {
      "question": "ماذا يحدث عند تغير تبعية؟",
      "choices": [
        "تبقى ثابتة دائمًا",
        "تضيع الحالة كلها",
        "تتحدث القيمة المشتقة"
      ],
      "correct": 2,
      "why": "يتتبع Vue التبعيات التفاعلية."
    },
    "exercise": {
      "goal": "سعر ثابت 7 وكمية ref تبدأ 1. اعرض #total من computed، وزر #increase يزيد الكمية 1.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "7",
                "label": "النص الفعلي #total"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "21",
                "label": "النص الفعلي #total"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#increase"
              },
              {
                "kind": "click",
                "selector": "#increase"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: سعر ثابت 7 وكمية ref تبدأ 1. اعرض #total من computed، وزر #increase يزيد الكمية 1.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "7",
                "label": "النص الفعلي #total"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "21",
                "label": "النص الفعلي #total"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#increase"
              },
              {
                "kind": "click",
                "selector": "#increase"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "كمية تبدأ 2، سعر 4، وشحن 3. اعرض #bill للكمية×السعر+الشحن، وزر #remove ينقص الكمية؛ يجب أن يعمل عند الصفر أيضًا.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#bill",
                "kind": "text",
                "expected": "11",
                "label": "النص الفعلي #bill"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#bill",
                "kind": "text",
                "expected": "7",
                "label": "النص الفعلي #bill"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#remove"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#bill",
                "kind": "text",
                "expected": "3",
                "label": "النص الفعلي #bill"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#remove"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "عرّف الكمية في ref.",
      "اقرأ qty.value داخل computed.",
      "اعرض المرجع المحسوب في القالب ولا تكتب إجماليًا ثابتًا."
    ],
    "predictionHints": [
      "تضاعف computed القيمة 2.",
      "عرّف الكمية في ref.",
      "اقرأ qty.value داخل computed."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/computed.html"
    ]
  },
  {
    "id": "vue-conditional",
    "language": "vue",
    "title": "العرض الشرطي مع v-if وv-else",
    "level": "beginner",
    "prerequisites": [
      "vue-events"
    ],
    "goal": "اعرض p#secret عندما open=true، يبدأ ظاهرًا. زر #toggle يقلب الحالة؛ يجب إزالة العنصر ثم إعادته.",
    "explanation": "ينشئ v-if الفرع عند صحة الشرط ويزيله عند تغيّره. يقابله v-else المجاور. يختلف ذلك عن v-show الذي يغيّر العرض مع بقاء العنصر؛ نفحص هنا وجود العقد الفعلي في شجرة Vue المعزولة، لا قياسات CSS.",
    "example": "<script setup>\nconst available=true;\n</script>\n<template>\n<p v-if=\"available\" id=\"example\">متاح</p><p v-else>غير متاح</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "متاح",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "أي نص يظهر؟",
      "choices": [
        "متاح",
        "غير متاح",
        "النصان دائمًا"
      ],
      "correct": 0,
      "why": "الشرط true يختار الفرع الأول."
    },
    "understanding": {
      "question": "ماذا يفعل v-if عند false؟",
      "choices": [
        "يحفظه في localStorage",
        "يزيل الفرع",
        "يغيّر اللون فقط"
      ],
      "correct": 1,
      "why": "وجود العقدة يتبع الشرط."
    },
    "output": {
      "question": "أين يوضع v-else؟",
      "choices": [
        "في ملف JSON",
        "مجاورًا لفرع v-if",
        "داخل script"
      ],
      "correct": 1,
      "why": "يحتاج إلى فرع شرط مجاور."
    },
    "exercise": {
      "goal": "اعرض p#secret عندما open=true، يبدأ ظاهرًا. زر #toggle يقلب الحالة؛ يجب إزالة العنصر ثم إعادته.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#secret",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر #secret"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#secret",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر #secret"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#toggle"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#secret",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر #secret"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#toggle"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: اعرض p#secret عندما open=true، يبدأ ظاهرًا. زر #toggle يقلب الحالة؛ يجب إزالة العنصر ثم إعادته.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#secret",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر #secret"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#secret",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر #secret"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#toggle"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#secret",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر #secret"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#toggle"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "زر #login يقلب حالة تبدأ false. اعرض #guest فقط عند false و#member فقط عند true، بالتبادل.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#guest",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر #guest"
              },
              {
                "selector": "#member",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر #member"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#guest",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر #guest"
              },
              {
                "selector": "#member",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر #member"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#login"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#guest",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر #guest"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#login"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "احفظ الشرط في ref.",
      "ضع v-if على العنصر المطلوب لا على الزر.",
      "استعمل v-else للبديل وتحقق من غياب الفرع الآخر."
    ],
    "predictionHints": [
      "الشرط true يختار الفرع الأول.",
      "احفظ الشرط في ref.",
      "ضع v-if على العنصر المطلوب لا على الزر."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/conditional.html"
    ]
  },
  {
    "id": "vue-list",
    "language": "vue",
    "title": "القوائم وإضافة العناصر وحذفها",
    "level": "beginner",
    "prerequisites": [
      "vue-conditional",
      "js-arrays"
    ],
    "goal": "قائمة ref تبدأ بعنصرين id=1 و2. اعرض li.row لكل عنصر؛ #add يضيف id=3 و#clear يفرغ القائمة.",
    "explanation": "ينشئ v-for عناصر من مصفوفة. key ثابت يساعد Vue على تتبع هوية كل عنصر عند الإضافة وإعادة الترتيب؛ الفهرس ليس هوية مستقرة للقوائم القابلة للتغيير. نفحص هنا أعداد العناصر ومحتواها بعد تفاعلات حقيقية.",
    "example": "<script setup>\nconst names=[{id:1,name:\"أ\"},{id:2,name:\"ب\"}];\n</script>\n<template>\n<li v-for=\"n in names\" :key=\"n.id\" class=\"example\">{{n.name}}</li>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": ".example",
              "kind": "count",
              "expected": 2,
              "label": "عدد العناصر .example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "كم عنصرًا ينشئ المثال؟",
      "choices": [
        "2",
        "1",
        "0"
      ],
      "correct": 0,
      "why": "ينشأ عنصر لكل عنصر مصفوفة."
    },
    "understanding": {
      "question": "ما key الأنسب لقائمة قابلة لإعادة الترتيب؟",
      "choices": [
        "رقم عشوائي في كل رسم",
        "id ثابت وفريد",
        "index دائمًا"
      ],
      "correct": 1,
      "why": "المفتاح يمثل هوية العنصر لا مكانه المؤقت."
    },
    "output": {
      "question": "ماذا يسبب إفراغ مصفوفة العرض؟",
      "choices": [
        "تكرارها",
        "تغيير معرفات الدروس",
        "اختفاء عناصر القائمة"
      ],
      "correct": 2,
      "why": "يتتبع العرض المصفوفة التفاعلية."
    },
    "exercise": {
      "goal": "قائمة ref تبدأ بعنصرين id=1 و2. اعرض li.row لكل عنصر؛ #add يضيف id=3 و#clear يفرغ القائمة.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": ".row",
                "kind": "count",
                "expected": 2,
                "label": "عدد العناصر .row"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".row",
                "kind": "count",
                "expected": 3,
                "label": "عدد العناصر .row"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#add"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".row",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر .row"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#clear"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: قائمة ref تبدأ بعنصرين id=1 و2. اعرض li.row لكل عنصر؛ #add يضيف id=3 و#clear يفرغ القائمة.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": ".row",
                "kind": "count",
                "expected": 2,
                "label": "عدد العناصر .row"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".row",
                "kind": "count",
                "expected": 3,
                "label": "عدد العناصر .row"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#add"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".row",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر .row"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#clear"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "ابدأ بالأسماء أ، ب، ج في li.member. زر #remove يحذف الأول كل مرة، ويتحمل القائمة الفارغة.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": ".member",
                "kind": "count",
                "expected": 3,
                "label": "عدد العناصر .member"
              },
              {
                "selector": ".member",
                "kind": "text",
                "expected": "أ",
                "label": "النص الفعلي .member"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".member",
                "kind": "count",
                "expected": 2,
                "label": "عدد العناصر .member"
              },
              {
                "selector": ".member",
                "kind": "text",
                "expected": "ب",
                "label": "النص الفعلي .member"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#remove"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".member",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر .member"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#remove"
              },
              {
                "kind": "click",
                "selector": "#remove"
              },
              {
                "kind": "click",
                "selector": "#remove"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "ضع المصفوفة في ref.",
      "اربط v-for بكل عنصر واستعمل id كمفتاح.",
      "نفذ العملية على المصفوفة ثم اترك Vue يحدث الشجرة."
    ],
    "predictionHints": [
      "ينشأ عنصر لكل عنصر مصفوفة.",
      "ضع المصفوفة في ref.",
      "اربط v-for بكل عنصر واستعمل id كمفتاح."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/list.html"
    ]
  },
  {
    "id": "vue-model",
    "language": "vue",
    "title": "المدخل النصي والمزامنة مع v-model",
    "level": "beginner",
    "prerequisites": [
      "vue-events"
    ],
    "goal": "مدخل #name مربوط بنص يبدأ فارغًا، وp#echo يعرض النص. اختبر العربية والفراغ ثم قيمة أخرى.",
    "explanation": "يربط v-model قيمة حقل نصي بالحالة عبر value وحدث input. تغيير الحالة برمجيًا يحدث الحقل أيضًا. هذه مزامنة داخل ذاكرة المكون، وليست حفظًا دائمًا إلا إذا أضفت مخزنًا مناسبًا؛ تقدم الدرس هنا يحفظه التطبيق مستقلًا.",
    "example": "<script setup>\nimport{ref}from\"vue\";const name=ref(\"سارة\");\n</script>\n<template>\n<input v-model=\"name\"><p id=\"example\">{{name}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "سارة",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما النص الأول؟",
      "choices": [
        "name",
        "سارة",
        "فارغ"
      ],
      "correct": 1,
      "why": "يبدأ المرجع بالقيمة سارة."
    },
    "understanding": {
      "question": "هل v-model وحده حفظ دائم؟",
      "choices": [
        "نعم عبر السحابة",
        "نعم في كل متصفح",
        "لا"
      ],
      "correct": 2,
      "why": "الربط لا يضيف تخزينًا دائمًا."
    },
    "output": {
      "question": "ماذا يفعل تغيير المرجع إلى نص فارغ؟",
      "choices": [
        "يعطل ref",
        "يفرغ الحقل المرتبط",
        "يحذف التطبيق"
      ],
      "correct": 1,
      "why": "العلاقة ثنائية الاتجاه داخل المكون."
    },
    "exercise": {
      "goal": "مدخل #name مربوط بنص يبدأ فارغًا، وp#echo يعرض النص. اختبر العربية والفراغ ثم قيمة أخرى.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#echo",
                "kind": "text",
                "expected": "",
                "label": "النص الفعلي #echo"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#echo",
                "kind": "text",
                "expected": "نور",
                "label": "النص الفعلي #echo"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": "نور"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#echo",
                "kind": "text",
                "expected": "",
                "label": "النص الفعلي #echo"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": ""
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#echo",
                "kind": "text",
                "expected": "علي",
                "label": "النص الفعلي #echo"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": "علي"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: مدخل #name مربوط بنص يبدأ فارغًا، وp#echo يعرض النص. اختبر العربية والفراغ ثم قيمة أخرى.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#echo",
                "kind": "text",
                "expected": "",
                "label": "النص الفعلي #echo"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#echo",
                "kind": "text",
                "expected": "نور",
                "label": "النص الفعلي #echo"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": "نور"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#echo",
                "kind": "text",
                "expected": "",
                "label": "النص الفعلي #echo"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": ""
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#echo",
                "kind": "text",
                "expected": "علي",
                "label": "النص الفعلي #echo"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": "علي"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "مدخل #search يبدأ بـVue، ويعرض #summary النص مسبوقًا بـبحث: . زر #reset يفرغ النص والمدخل معًا.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#search",
                "kind": "value",
                "expected": "Vue",
                "label": "قيمة المدخل #search"
              },
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "بحث: Vue",
                "label": "النص الفعلي #summary"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "بحث: CSS",
                "label": "النص الفعلي #summary"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#search",
                "value": "CSS"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#search",
                "kind": "value",
                "expected": "",
                "label": "قيمة المدخل #search"
              },
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "بحث: ",
                "label": "النص الفعلي #summary"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#reset"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "استخدم ref للنص.",
      "ضع v-model على input.",
      "اعرض المرجع نفسه ولا تنشئ متغيرًا ثانيًا غير مرتبط."
    ],
    "predictionHints": [
      "يبدأ المرجع بالقيمة سارة.",
      "استخدم ref للنص.",
      "ضع v-model على input."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/forms.html"
    ]
  },
  {
    "id": "vue-watch",
    "language": "vue",
    "title": "watch والقيمة السابقة والآثار الجانبية",
    "level": "intermediate",
    "prerequisites": [
      "vue-model",
      "vue-computed"
    ],
    "goal": "مدخل #name يبدأ فارغًا. راقب تغير الاسم لتحديث p#changes الذي يبدأ 0؛ إدخال أ ثم ب يجب أن يعطي 2.",
    "explanation": "يراقب watch مصدرًا تفاعليًا ويستدعي callback عند تغيّره؛ الوسيط الثاني هو القيمة السابقة. استعمل computed للحساب المشتق الخالص وwatch للعمل الجانبي. تفحص الأداة التحديث بعد دورة Vue الحقيقية؛ لا تدعي محاكاة شبكة أو زمن حقيقي.",
    "example": "<script setup>\nimport{ref,watch}from\"vue\";const name=ref(\"أ\");const previous=ref(\"\");watch(name,(_,old)=>previous.value=old);\n</script>\n<template>\n<p id=\"example\">{{previous}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما القيمة السابقة قبل تغير المصدر؟",
      "choices": [
        "undefined ظاهرًا",
        "نص فارغ",
        "أ تلقائيًا"
      ],
      "correct": 1,
      "why": "watch غير immediate لا يستدعي callback عند التسجيل."
    },
    "understanding": {
      "question": "أي وسيط هو السابق؟",
      "choices": [
        "الأول",
        "لا يوجد",
        "الثاني"
      ],
      "correct": 2,
      "why": "التوقيع هو newValue ثم oldValue."
    },
    "output": {
      "question": "ما الأفضل لحساب إجمالي خالص؟",
      "choices": [
        "onUnmounted",
        "computed",
        "طلب fetch"
      ],
      "correct": 1,
      "why": "الحساب المشتق لا يحتاج watch يدويًا."
    },
    "exercise": {
      "goal": "مدخل #name يبدأ فارغًا. راقب تغير الاسم لتحديث p#changes الذي يبدأ 0؛ إدخال أ ثم ب يجب أن يعطي 2.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#changes",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #changes"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#changes",
                "kind": "text",
                "expected": "1",
                "label": "النص الفعلي #changes"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": "أ"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#changes",
                "kind": "text",
                "expected": "2",
                "label": "النص الفعلي #changes"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": "ب"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: مدخل #name يبدأ فارغًا. راقب تغير الاسم لتحديث p#changes الذي يبدأ 0؛ إدخال أ ثم ب يجب أن يعطي 2.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#changes",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #changes"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#changes",
                "kind": "text",
                "expected": "1",
                "label": "النص الفعلي #changes"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": "أ"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#changes",
                "kind": "text",
                "expected": "2",
                "label": "النص الفعلي #changes"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": "ب"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "مدخل #query يبدأ فارغًا. watch ينسخ القيمة السابقة في p#previous؛ بعد أ ثم ب يظهر أ، وبعد ب ثم فراغ يظهر ب.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#previous",
                "kind": "text",
                "expected": "",
                "label": "النص الفعلي #previous"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#previous",
                "kind": "text",
                "expected": "",
                "label": "النص الفعلي #previous"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": "أ"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#previous",
                "kind": "text",
                "expected": "أ",
                "label": "النص الفعلي #previous"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": "ب"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#previous",
                "kind": "text",
                "expected": "ب",
                "label": "النص الفعلي #previous"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": ""
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "راقب المرجع نفسه.",
      "لا تفعّل immediate لعد تغييرات لاحقة فقط.",
      "اقرأ الوسيط الثاني للقيمة السابقة."
    ],
    "predictionHints": [
      "watch غير immediate لا يستدعي callback عند التسجيل.",
      "راقب المرجع نفسه.",
      "لا تفعّل immediate لعد تغييرات لاحقة فقط."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/watchers.html"
    ]
  },
  {
    "id": "vue-lifecycle",
    "language": "vue",
    "title": "التركيب والإزالة وتنظيف الموارد",
    "level": "intermediate",
    "prerequisites": [
      "vue-watch"
    ],
    "goal": "أرسل ready مرة من onMounted وcleanup مرة من onUnmounted عبر defineEmits. اعرض p#view ما دام المكون موجودًا.",
    "explanation": "تسجل onMounted وonUnmounted داخل setup. الأول يعمل بعد تركيب المكون والثاني عند إزالته، وهو موضع مناسب لتنظيف مؤقت أو اشتراك أنشأه المكون. نختبر استدعاء الخطاف بإزالة تطبيق Vue الفعلي، دون مؤقتات طويلة أو محاكاة مرور وقت غير مقاس.",
    "example": "<script setup>\nimport{ref,onMounted}from\"vue\";const state=ref(\"قبل\");onMounted(()=>state.value=\"جاهز\");\n</script>\n<template>\n<p id=\"example\">{{state}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "جاهز",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما النص بعد التركيب؟",
      "choices": [
        "قبل",
        "onMounted",
        "جاهز"
      ],
      "correct": 2,
      "why": "يتغير المرجع عند تركيب المكون."
    },
    "understanding": {
      "question": "أين نسجل الخطافات؟",
      "choices": [
        "في CSS",
        "أثناء setup",
        "بعد إغلاق الصفحة"
      ],
      "correct": 1,
      "why": "تحتاج سياق المكون النشط."
    },
    "output": {
      "question": "أين ننظف اشتراك المكون؟",
      "choices": [
        "داخل getter computed",
        "في كل قراءة قالب",
        "onUnmounted"
      ],
      "correct": 2,
      "why": "تنظيف الموارد يمنع بقاء عمل لمكون أزيل."
    },
    "exercise": {
      "goal": "أرسل ready مرة من onMounted وcleanup مرة من onUnmounted عبر defineEmits. اعرض p#view ما دام المكون موجودًا.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  []
                ],
                "label": "الحدث المرسل ready",
                "property": "ready"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  []
                ],
                "label": "الحدث المرسل cleanup",
                "property": "cleanup"
              },
              {
                "selector": "#view",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر #view"
              }
            ],
            "actions": [
              {
                "kind": "unmount"
              }
            ]
          }
        ],
        "events": [
          "ready",
          "cleanup"
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: أرسل ready مرة من onMounted وcleanup مرة من onUnmounted عبر defineEmits. اعرض p#view ما دام المكون موجودًا.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  []
                ],
                "label": "الحدث المرسل ready",
                "property": "ready"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  []
                ],
                "label": "الحدث المرسل cleanup",
                "property": "cleanup"
              },
              {
                "selector": "#view",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر #view"
              }
            ],
            "actions": [
              {
                "kind": "unmount"
              }
            ]
          }
        ],
        "events": [
          "ready",
          "cleanup"
        ]
      }
    },
    "mastery": {
      "goal": "أرسل start بقيمة 1 عند التركيب وstop بقيمة 0 عند الإزالة. لا ترسل stop قبل الإزالة.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  [
                    1
                  ]
                ],
                "label": "الحدث المرسل start",
                "property": "start"
              },
              {
                "selector": "",
                "kind": "event",
                "expected": [],
                "label": "الحدث المرسل stop",
                "property": "stop"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  [
                    0
                  ]
                ],
                "label": "الحدث المرسل stop",
                "property": "stop"
              }
            ],
            "actions": [
              {
                "kind": "unmount"
              }
            ]
          }
        ],
        "events": [
          "start",
          "stop"
        ]
      }
    },
    "hints": [
      "استورد الخطافين من Vue.",
      "مرر callback إلى الخطاف، لا تنفذ emit أثناء التسجيل.",
      "لا ترسل حدث التنظيف حتى إزالة المكون."
    ],
    "predictionHints": [
      "يتغير المرجع عند تركيب المكون.",
      "استورد الخطافين من Vue.",
      "مرر callback إلى الخطاف، لا تنفذ emit أثناء التسجيل."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/lifecycle.html"
    ]
  },
  {
    "id": "vue-props",
    "language": "vue",
    "title": "خصائص المكونات وتدفق البيانات من الأب",
    "level": "intermediate",
    "prerequisites": [
      "vue-computed",
      "vue-template"
    ],
    "goal": "استقبل price وqty من الأب واعرض حاصل ضربهما في #total. يجب متابعة تحديث qty وprice دون تعديل خصائص الأب.",
    "explanation": "تستقبل defineProps البيانات من الأب. الخصائص للقراءة؛ اطلب تغييرها بحدث بدل إسنادها في الابن. القراءة من props داخل computed تحافظ على متابعة التغير في Vue 3.4؛ تفكيك خصائص بدائية دون toRefs لا يضمن التفاعلية في هذه النسخة.",
    "example": "<script setup>\nconst props=defineProps({label:{type:String,default:\"بطاقة\"}});\n</script>\n<template>\n<p id=\"example\">{{props.label}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "بطاقة",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما النص دون تمرير label؟",
      "choices": [
        "بطاقة",
        "فارغ دائمًا",
        "String"
      ],
      "correct": 0,
      "why": "تطبق القيمة الافتراضية عند غياب الخاصية."
    },
    "understanding": {
      "question": "من يملك تغيير الخاصية؟",
      "choices": [
        "الابن بإسناد مباشر",
        "CSS",
        "الأب"
      ],
      "correct": 2,
      "why": "التدفق الأساسي من الأب إلى الابن."
    },
    "output": {
      "question": "كيف نحافظ على قراءة خاصية تتغير في 3.4؟",
      "choices": [
        "قراءتها من props أو toRefs",
        "نسخها إلى ثابت بدائي",
        "تحويلها إلى نص ثابت"
      ],
      "correct": 0,
      "why": "النسخة البدائية لا تتبع الخاصية تلقائيًا."
    },
    "exercise": {
      "goal": "استقبل price وqty من الأب واعرض حاصل ضربهما في #total. يجب متابعة تحديث qty وprice دون تعديل خصائص الأب.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "12",
                "label": "النص الفعلي #total"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "20",
                "label": "النص الفعلي #total"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "qty": 5
                }
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #total"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "price": 0
                }
              }
            ]
          }
        ],
        "props": {
          "price": 4,
          "qty": 3
        }
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: استقبل price وqty من الأب واعرض حاصل ضربهما في #total. يجب متابعة تحديث qty وprice دون تعديل خصائص الأب.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "12",
                "label": "النص الفعلي #total"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "20",
                "label": "النص الفعلي #total"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "qty": 5
                }
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #total"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "price": 0
                }
              }
            ]
          }
        ],
        "props": {
          "price": 4,
          "qty": 3
        }
      }
    },
    "mastery": {
      "goal": "استقبل first وlast واعرض الاسم الكامل في #full؛ تغيّر last ثم first من الأب ينعكس في الاسم.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#full",
                "kind": "text",
                "expected": "نور علي",
                "label": "النص الفعلي #full"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#full",
                "kind": "text",
                "expected": "نور حسن",
                "label": "النص الفعلي #full"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "last": "حسن"
                }
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#full",
                "kind": "text",
                "expected": "سارة حسن",
                "label": "النص الفعلي #full"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "first": "سارة"
                }
              }
            ]
          }
        ],
        "props": {
          "first": "نور",
          "last": "علي"
        }
      }
    },
    "hints": [
      "عرّف الخصائص باستخدام defineProps.",
      "اقرأ القيم من props في الحساب.",
      "لا تنسخ الخاصية إلى ثابت عددي عند البداية."
    ],
    "predictionHints": [
      "تطبق القيمة الافتراضية عند غياب الخاصية.",
      "عرّف الخصائص باستخدام defineProps.",
      "اقرأ القيم من props في الحساب."
    ],
    "references": [
      "https://vuejs.org/guide/components/props.html"
    ]
  },
  {
    "id": "vue-emits",
    "language": "vue",
    "title": "الأحداث المخصصة والحمولات",
    "level": "intermediate",
    "prerequisites": [
      "vue-props",
      "vue-events"
    ],
    "goal": "زر #save يرسل حدث save بقيمة 7 عند كل نقرة؛ لا ترسل الحدث قبل النقر.",
    "explanation": "يرسل الابن حدثًا مخصصًا عبر emit، ويستمع الأب له بمعالج. اسم الحدث والحمولة عقد بين المكونين، ولا يغير emit خاصية الأب تلقائيًا دون معالج. نرصد هنا استدعاء مستمع أب حقيقي ومعاملات الحدث، لا وجود اسم emit في النص.",
    "example": "<script setup>\nconst emit=defineEmits([\"save\"]);\n</script>\n<template>\n<button id=\"example\" @click=\"emit('save',2)\">احفظ</button>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "احفظ",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "هل أرسل المثال الحدث قبل النقر؟",
      "choices": [
        "نعم عند تعريف emit",
        "لا",
        "نعم مرتين"
      ],
      "correct": 1,
      "why": "التعبير في @click مؤجل للحدث."
    },
    "understanding": {
      "question": "ما وظيفة حمولة الحدث؟",
      "choices": [
        "تغيير CSS تلقائيًا",
        "تسجيل دخول",
        "تمرير بيانات للمستمع"
      ],
      "correct": 2,
      "why": "الحمولة معاملات تصل لمعالج الأب."
    },
    "output": {
      "question": "هل emit يغير prop وحده؟",
      "choices": [
        "لا؛ يعالج الأب الطلب",
        "نعم دائمًا",
        "يحذف prop"
      ],
      "correct": 0,
      "why": "لا تغيير تلقائيًا دون ربط الأب."
    },
    "exercise": {
      "goal": "زر #save يرسل حدث save بقيمة 7 عند كل نقرة؛ لا ترسل الحدث قبل النقر.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [],
                "label": "الحدث المرسل save",
                "property": "save"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  [
                    7
                  ]
                ],
                "label": "الحدث المرسل save",
                "property": "save"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#save"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  [
                    7
                  ],
                  [
                    7
                  ]
                ],
                "label": "الحدث المرسل save",
                "property": "save"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#save"
              }
            ]
          }
        ],
        "events": [
          "save"
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: زر #save يرسل حدث save بقيمة 7 عند كل نقرة؛ لا ترسل الحدث قبل النقر.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [],
                "label": "الحدث المرسل save",
                "property": "save"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  [
                    7
                  ]
                ],
                "label": "الحدث المرسل save",
                "property": "save"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#save"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  [
                    7
                  ],
                  [
                    7
                  ]
                ],
                "label": "الحدث المرسل save",
                "property": "save"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#save"
              }
            ]
          }
        ],
        "events": [
          "save"
        ]
      }
    },
    "mastery": {
      "goal": "عداد ref يبدأ صفرًا. كل نقرة #next تزيده ثم ترسل change بقيمته الجديدة 1 ثم 2 ثم 3.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  [
                    1
                  ],
                  [
                    2
                  ],
                  [
                    3
                  ]
                ],
                "label": "الحدث المرسل change",
                "property": "change"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#next"
              },
              {
                "kind": "click",
                "selector": "#next"
              },
              {
                "kind": "click",
                "selector": "#next"
              }
            ]
          }
        ],
        "events": [
          "change"
        ]
      }
    },
    "hints": [
      "أعلن اسم الحدث في defineEmits.",
      "استدع emit داخل معالج النقر.",
      "أرسل القيمة الجديدة بعد التعديل في تمرين الإتقان."
    ],
    "predictionHints": [
      "التعبير في @click مؤجل للحدث.",
      "أعلن اسم الحدث في defineEmits.",
      "استدع emit داخل معالج النقر."
    ],
    "references": [
      "https://vuejs.org/guide/components/events.html"
    ]
  },
  {
    "id": "vue-slots",
    "language": "vue",
    "title": "Slots ومحتوى الأب والقيم البديلة",
    "level": "intermediate",
    "prerequisites": [
      "vue-props"
    ],
    "goal": "اعرض slot مسمى heading وslot افتراضي داخل article#card. الأب يمرر h2#heading ونص جسم p#body.",
    "explanation": "تتيح slots للأب تمرير محتوى إلى موضع في قالب الابن. يميز name الموضع المسمى، ويظهر fallback عندما لا يُمرر محتوى مناسب. تستعمل الأداة دوال slots حقيقية من Vue لمحتوى ثابت موثوق؛ لا ندعي اختبار scoped slots أو ملفات خارجية في هذا الدرس.",
    "example": "<script setup>\nconst name=\"card\";\n</script>\n<template>\n<article><slot><p id=\"example\">بديل</p></slot></article>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "بديل",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما النص دون محتوى slot من الأب؟",
      "choices": [
        "بديل",
        "لا يظهر شيء حتمًا",
        "name"
      ],
      "correct": 0,
      "why": "fallback ظاهر عند غياب محتوى افتراضي."
    },
    "understanding": {
      "question": "كيف نميز موضعًا مسمى؟",
      "choices": [
        "عنوان الصفحة",
        "name للـslot",
        "id للملف"
      ],
      "correct": 1,
      "why": "name يربط موضع المحتوى المسمى."
    },
    "output": {
      "question": "هل props وslots متماثلان؟",
      "choices": [
        "لا؛ بيانات مقابل محتوى قالب",
        "نعم دائمًا",
        "كلاهما تخزين سحابي"
      ],
      "correct": 0,
      "why": "هما أداتان مختلفتان لتكوين المكونات."
    },
    "exercise": {
      "goal": "اعرض slot مسمى heading وslot افتراضي داخل article#card. الأب يمرر h2#heading ونص جسم p#body.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#card",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر #card"
              },
              {
                "selector": "#heading",
                "kind": "text",
                "expected": "عنوان الأب",
                "label": "النص الفعلي #heading"
              },
              {
                "selector": "#body",
                "kind": "text",
                "expected": "محتوى الأب",
                "label": "النص الفعلي #body"
              }
            ]
          }
        ],
        "slots": {
          "heading": {
            "tag": "h2",
            "props": {
              "id": "heading"
            },
            "text": "عنوان الأب"
          },
          "default": {
            "tag": "p",
            "props": {
              "id": "body"
            },
            "text": "محتوى الأب"
          }
        }
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: اعرض slot مسمى heading وslot افتراضي داخل article#card. الأب يمرر h2#heading ونص جسم p#body.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#card",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر #card"
              },
              {
                "selector": "#heading",
                "kind": "text",
                "expected": "عنوان الأب",
                "label": "النص الفعلي #heading"
              },
              {
                "selector": "#body",
                "kind": "text",
                "expected": "محتوى الأب",
                "label": "النص الفعلي #body"
              }
            ]
          }
        ],
        "slots": {
          "heading": {
            "tag": "h2",
            "props": {
              "id": "heading"
            },
            "text": "عنوان الأب"
          },
          "default": {
            "tag": "p",
            "props": {
              "id": "body"
            },
            "text": "محتوى الأب"
          }
        }
      }
    },
    "mastery": {
      "goal": "اعرض slot اسمه actions داخل footer#actions، وfallback p#fallback نصه «لا إجراءات» للـslot الافتراضي عندما لا يمرره الأب.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#fallback",
                "kind": "text",
                "expected": "لا إجراءات",
                "label": "النص الفعلي #fallback"
              },
              {
                "selector": "#action",
                "kind": "text",
                "expected": "تنفيذ",
                "label": "النص الفعلي #action"
              },
              {
                "selector": "#actions",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر #actions"
              }
            ]
          }
        ],
        "slots": {
          "actions": {
            "tag": "button",
            "props": {
              "id": "action"
            },
            "text": "تنفيذ"
          }
        }
      }
    },
    "hints": [
      "استخدم slot لا نصًا ثابتًا بدل محتوى الأب.",
      "طابق اسم heading مع الموضع المسمى.",
      "ضع fallback داخل slot الافتراضي."
    ],
    "predictionHints": [
      "fallback ظاهر عند غياب محتوى افتراضي.",
      "استخدم slot لا نصًا ثابتًا بدل محتوى الأب.",
      "طابق اسم heading مع الموضع المسمى."
    ],
    "references": [
      "https://vuejs.org/guide/components/slots.html"
    ]
  },
  {
    "id": "vue-composable",
    "language": "vue",
    "title": "إعادة استخدام المنطق مع Composables",
    "level": "advanced",
    "prerequisites": [
      "vue-watch",
      "js-closure"
    ],
    "goal": "عرّف useCounter محليًا باستعمال ref داخل الدالة. أنشئ a وb؛ زرا #a و#b يزيدان حالتهما فقط، وتعرض #av و#bv القيم.",
    "explanation": "تجمع composable منطقًا يستعمل Composition API في دالة. إنشاء ref داخل الدالة يعطي حالة مستقلة لكل استدعاء؛ وضعها خارجها قد يشارك الحالة عمدًا. فك ref التلقائي في القالب ليس عامًا لكل خاصية متداخلة؛ نقرأ .value صراحة داخل كائنين عاديين هنا.",
    "example": "<script setup>\nimport{ref}from\"vue\";function useNumber(){return ref(2)}const value=useNumber();\n</script>\n<template>\n<p id=\"example\">{{value}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "2",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما قيمة المثال؟",
      "choices": [
        "2",
        "0",
        "undefined"
      ],
      "correct": 0,
      "why": "تعيد الدالة ref علويًا يفك القالب غلافه."
    },
    "understanding": {
      "question": "كيف ننشئ حالتين مستقلتين؟",
      "choices": [
        "ref مشتركة خارج الدالة دائمًا",
        "إعادة استخدام الاسم نفسه فقط",
        "إنشاء ref داخل كل استدعاء"
      ],
      "correct": 2,
      "why": "موضع إنشاء الحالة يحدد مشاركة المرجع."
    },
    "output": {
      "question": "هل composable تحتاج ملفًا خارجيًا حتمًا؟",
      "choices": [
        "نعم لتعمل ref",
        "تحتاج خادمًا",
        "لا؛ يمكن تعريفها محليًا"
      ],
      "correct": 2,
      "why": "الملف تنظيم؛ الدالة نفسها تعمل محليًا."
    },
    "exercise": {
      "goal": "عرّف useCounter محليًا باستعمال ref داخل الدالة. أنشئ a وb؛ زرا #a و#b يزيدان حالتهما فقط، وتعرض #av و#bv القيم.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#av",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #av"
              },
              {
                "selector": "#bv",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #bv"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#av",
                "kind": "text",
                "expected": "2",
                "label": "النص الفعلي #av"
              },
              {
                "selector": "#bv",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #bv"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#a"
              },
              {
                "kind": "click",
                "selector": "#a"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#av",
                "kind": "text",
                "expected": "2",
                "label": "النص الفعلي #av"
              },
              {
                "selector": "#bv",
                "kind": "text",
                "expected": "1",
                "label": "النص الفعلي #bv"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#b"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: عرّف useCounter محليًا باستعمال ref داخل الدالة. أنشئ a وb؛ زرا #a و#b يزيدان حالتهما فقط، وتعرض #av و#bv القيم.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#av",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #av"
              },
              {
                "selector": "#bv",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #bv"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#av",
                "kind": "text",
                "expected": "2",
                "label": "النص الفعلي #av"
              },
              {
                "selector": "#bv",
                "kind": "text",
                "expected": "0",
                "label": "النص الفعلي #bv"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#a"
              },
              {
                "kind": "click",
                "selector": "#a"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#av",
                "kind": "text",
                "expected": "2",
                "label": "النص الفعلي #av"
              },
              {
                "selector": "#bv",
                "kind": "text",
                "expected": "1",
                "label": "النص الفعلي #bv"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#b"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "دالة useToggle تنشئ ref(false) مستقلة لكل استدعاء. زرا #left و#right يقلبان حالتي #lv و#rv مستقلتين.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#lv",
                "kind": "text",
                "expected": "false",
                "label": "النص الفعلي #lv"
              },
              {
                "selector": "#rv",
                "kind": "text",
                "expected": "false",
                "label": "النص الفعلي #rv"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#lv",
                "kind": "text",
                "expected": "true",
                "label": "النص الفعلي #lv"
              },
              {
                "selector": "#rv",
                "kind": "text",
                "expected": "false",
                "label": "النص الفعلي #rv"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#left"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#lv",
                "kind": "text",
                "expected": "true",
                "label": "النص الفعلي #lv"
              },
              {
                "selector": "#rv",
                "kind": "text",
                "expected": "true",
                "label": "النص الفعلي #rv"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#right"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#lv",
                "kind": "text",
                "expected": "false",
                "label": "النص الفعلي #lv"
              },
              {
                "selector": "#rv",
                "kind": "text",
                "expected": "true",
                "label": "النص الفعلي #rv"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#left"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "أنشئ ref داخل composable.",
      "استدعها مرتين ولا تشارك الكائن المعاد.",
      "الخصائص المتداخلة في الكائن العادي تحتاج .value هنا."
    ],
    "predictionHints": [
      "تعيد الدالة ref علويًا يفك القالب غلافه.",
      "أنشئ ref داخل composable.",
      "استدعها مرتين ولا تشارك الكائن المعاد."
    ],
    "references": [
      "https://vuejs.org/guide/reusability/composables.html"
    ]
  },
  {
    "id": "vue-component-model",
    "language": "vue",
    "title": "v-model بين الأب والابن وdefineModel",
    "level": "advanced",
    "prerequisites": [
      "vue-emits",
      "vue-model"
    ],
    "goal": "استعمل defineModel لربط input#name وp#value بنموذج الأب. البداية «أصل»؛ تغييرات الحقل وتحديث الأب تنعكس في الطرفين.",
    "explanation": "توفر defineModel في Vue 3.4 اختصارًا لـmodelValue وحدث update:modelValue. القيمة مرجع داخل الابن، وتحديثها يطلب من الأب تغيير نموذجه. يستخدم التقييم هنا أبًا تفاعليًا يطبق الربط الحقيقي، ولا يكتفي بإظهار نص تغير محليًا.",
    "example": "<script setup>\nconst model=defineModel({default:\"بداية\"});\n</script>\n<template>\n<p id=\"example\">{{model}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "بداية",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما القيمة دون نموذج من الأب في المثال؟",
      "choices": [
        "بداية",
        "null",
        "defineModel"
      ],
      "correct": 0,
      "why": "تطبق القيمة الافتراضية للمرجع هنا."
    },
    "understanding": {
      "question": "ما الحدث الافتراضي للنموذج؟",
      "choices": [
        "click دائمًا",
        "changeRoute",
        "update:modelValue"
      ],
      "correct": 2,
      "why": "هذا هو عقد v-model الافتراضي للمكون."
    },
    "output": {
      "question": "هل تغير ref محلية يثبت ربط الأب؟",
      "choices": [
        "لا؛ يجب فحص تحديث الأب أيضًا",
        "نعم دائمًا",
        "لا توجد نماذج في Vue"
      ],
      "correct": 0,
      "why": "يلزم التحقق من طرفي العقد."
    },
    "exercise": {
      "goal": "استعمل defineModel لربط input#name وp#value بنموذج الأب. البداية «أصل»؛ تغييرات الحقل وتحديث الأب تنعكس في الطرفين.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#value",
                "kind": "text",
                "expected": "أصل",
                "label": "النص الفعلي #value"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#value",
                "kind": "text",
                "expected": "نور",
                "label": "النص الفعلي #value"
              },
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  [
                    "نور"
                  ]
                ],
                "label": "الحدث المرسل update:modelValue",
                "property": "update:modelValue"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": "نور"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#name",
                "kind": "value",
                "expected": "أب",
                "label": "قيمة المدخل #name"
              },
              {
                "selector": "#value",
                "kind": "text",
                "expected": "أب",
                "label": "النص الفعلي #value"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "modelValue": "أب"
                }
              }
            ]
          }
        ],
        "props": {
          "modelValue": "أصل"
        },
        "events": [
          "update:modelValue"
        ],
        "model": true
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: استعمل defineModel لربط input#name وp#value بنموذج الأب. البداية «أصل»؛ تغييرات الحقل وتحديث الأب تنعكس في الطرفين.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#value",
                "kind": "text",
                "expected": "أصل",
                "label": "النص الفعلي #value"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#value",
                "kind": "text",
                "expected": "نور",
                "label": "النص الفعلي #value"
              },
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  [
                    "نور"
                  ]
                ],
                "label": "الحدث المرسل update:modelValue",
                "property": "update:modelValue"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#name",
                "value": "نور"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#name",
                "kind": "value",
                "expected": "أب",
                "label": "قيمة المدخل #name"
              },
              {
                "selector": "#value",
                "kind": "text",
                "expected": "أب",
                "label": "النص الفعلي #value"
              }
            ],
            "actions": [
              {
                "kind": "setProps",
                "value": {
                  "modelValue": "أب"
                }
              }
            ]
          }
        ],
        "props": {
          "modelValue": "أصل"
        },
        "events": [
          "update:modelValue"
        ],
        "model": true
      }
    },
    "mastery": {
      "goal": "حقل input#query مرتبط بنموذج الأب، وزر #clear يفرغه ويرسل update:modelValue. البداية Vue؛ أدخل CSS ثم امسحه.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#query",
                "kind": "value",
                "expected": "Vue",
                "label": "قيمة المدخل #query"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#query",
                "kind": "value",
                "expected": "CSS",
                "label": "قيمة المدخل #query"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": "CSS"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#query",
                "kind": "value",
                "expected": "",
                "label": "قيمة المدخل #query"
              },
              {
                "selector": "",
                "kind": "event",
                "expected": [
                  [
                    "CSS"
                  ],
                  [
                    ""
                  ]
                ],
                "label": "الحدث المرسل update:modelValue",
                "property": "update:modelValue"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#clear"
              }
            ]
          }
        ],
        "props": {
          "modelValue": "Vue"
        },
        "events": [
          "update:modelValue"
        ],
        "model": true
      }
    },
    "hints": [
      "عرّف المرجع عبر defineModel.",
      "اربط v-model بالحقل، لا :value وحدها.",
      "التغيير البرمجي للمرجع يجب أن يرسل حدث التحديث للأب."
    ],
    "predictionHints": [
      "تطبق القيمة الافتراضية للمرجع هنا.",
      "عرّف المرجع عبر defineModel.",
      "اربط v-model بالحقل، لا :value وحدها."
    ],
    "references": [
      "https://vuejs.org/guide/components/v-model.html"
    ]
  },
  {
    "id": "vue-async-state",
    "language": "vue",
    "title": "الحالة غير المتزامنة ومعالجة الفشل",
    "level": "intermediate",
    "prerequisites": [
      "vue-events",
      "js-async-errors"
    ],
    "goal": "زر #load ينفذ Promise محلية تعيد «تم». #state يبدأ «جاهز»، وبعد النقر يصبح «تم». لا طلبات شبكة.",
    "explanation": "تحدّث الدالة غير المتزامنة الحالة عندما تستقر Promise. عالج الرفض داخل try/catch وأظهر حالة مفهومة بدل خطأ غير معالج. التمرين محلي حتمي ولا يدعي Fetch فعليًا أو قياس زمن شبكة؛ مراقبة حالة تحميل عابرة تحتاج اختبارًا مناسبًا غير موجود في هذه اللقطة.",
    "example": "<script setup>\nimport{ref}from\"vue\";const status=ref(\"جاهز\");\n</script>\n<template>\n<p id=\"example\">{{status}}</p>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "جاهز",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما الحالة قبل التنفيذ؟",
      "choices": [
        "جاهز",
        "تم",
        "تعذر"
      ],
      "correct": 0,
      "why": "القيمة الابتدائية لا تتغير قبل حدث."
    },
    "understanding": {
      "question": "كيف نعالج رفض Promise داخل async؟",
      "choices": [
        "computed دون catch",
        "try/catch حول await",
        "حذف await فقط"
      ],
      "correct": 1,
      "why": "الرفض يحتاج مسار معالجة واضحًا."
    },
    "output": {
      "question": "هل Promise.resolve اختبار شبكة؟",
      "choices": [
        "لا؛ عمل محلي",
        "نعم يثبت الخادم",
        "يثبت السرعة"
      ],
      "correct": 0,
      "why": "لا اتصال خارجي في الأداة."
    },
    "exercise": {
      "goal": "زر #load ينفذ Promise محلية تعيد «تم». #state يبدأ «جاهز»، وبعد النقر يصبح «تم». لا طلبات شبكة.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#state",
                "kind": "text",
                "expected": "جاهز",
                "label": "النص الفعلي #state"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#state",
                "kind": "text",
                "expected": "تم",
                "label": "النص الفعلي #state"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#load"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: زر #load ينفذ Promise محلية تعيد «تم». #state يبدأ «جاهز»، وبعد النقر يصبح «تم». لا طلبات شبكة.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#state",
                "kind": "text",
                "expected": "جاهز",
                "label": "النص الفعلي #state"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#state",
                "kind": "text",
                "expected": "تم",
                "label": "النص الفعلي #state"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#load"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "زر #fail يجرب Promise مرفوضة برسالة «تعذر» ثم يعرضها في #error. يبدأ النص فارغًا؛ عالج الرفض ولا تتركه غير معالج.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#error",
                "kind": "text",
                "expected": "",
                "label": "النص الفعلي #error"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#error",
                "kind": "text",
                "expected": "تعذر",
                "label": "النص الفعلي #error"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#fail"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "اجعل معالج الزر async.",
      "انتظر Promise ثم عدّل ref.",
      "استخدم try/catch لتحديث رسالة الفشل من الخطأ."
    ],
    "predictionHints": [
      "القيمة الابتدائية لا تتغير قبل حدث.",
      "اجعل معالج الزر async.",
      "انتظر Promise ثم عدّل ref."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/watchers.html"
    ]
  },
  {
    "id": "vue-router",
    "language": "vue",
    "title": "Vue Router والتنقل الذاكري المعزول",
    "level": "advanced",
    "prerequisites": [
      "vue-props",
      "vue-emits"
    ],
    "goal": "استخدم RouterLink#about إلى /about وRouterView. اعرض route.path في #path. البداية /؛ الضغط يجب أن يغير المسار والمحتوى إلى حول.",
    "explanation": "يوفر Vue Router الرسمي ربط المسار بالمكون وروابط تنقل دون إعادة تحميل. تستعمل أداة الدرس createMemoryHistory ومسارات ثابتة موثقة: / و/about و/help. لا يتغير عنوان التطبيق أو سجل متصفحه، ولا ندعي معالجة Router للتطبيق الرئيسي أو حراسة مسارات أو ملفات خارجية من هذا التمرين.",
    "example": "<script setup>\nimport{RouterView,useRoute}from\"vue-router\";const route=useRoute();\n</script>\n<template>\n<p id=\"example\">{{route.path}}</p><RouterView/>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "/",
              "label": "النص الفعلي #example"
            },
            {
              "selector": "#route-view",
              "kind": "text",
              "expected": "الرئيسية",
              "label": "النص الفعلي #route-view"
            }
          ]
        },
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "/about",
              "label": "النص الفعلي #example"
            },
            {
              "selector": "#route-view",
              "kind": "text",
              "expected": "حول",
              "label": "النص الفعلي #route-view"
            }
          ],
          "actions": [
            {
              "kind": "route",
              "path": "/about"
            }
          ]
        }
      ],
      "router": {
        "routes": [
          {
            "path": "/",
            "text": "الرئيسية"
          },
          {
            "path": "/about",
            "text": "حول"
          },
          {
            "path": "/help",
            "text": "مساعدة"
          }
        ]
      }
    },
    "prediction": {
      "question": "ما المسار النصي الأول في المثال؟",
      "choices": [
        "/help",
        "/",
        "/about"
      ],
      "correct": 1,
      "why": "يبدأ Router الذاكري في هذا السياق من /."
    },
    "understanding": {
      "question": "هل ذاكرة Router تغيّر URL المتصفح؟",
      "choices": [
        "نعم وتنشر الموقع",
        "تمسح التقدم",
        "لا في هذه الأداة"
      ],
      "correct": 2,
      "why": "memory history معزولة عن سجل التطبيق."
    },
    "output": {
      "question": "من يعرض مكون المسار؟",
      "choices": [
        "computed بلا ربط",
        "RouterView",
        "ref وحدها"
      ],
      "correct": 1,
      "why": "RouterView موضع عرض المكون المطابق."
    },
    "exercise": {
      "goal": "استخدم RouterLink#about إلى /about وRouterView. اعرض route.path في #path. البداية /؛ الضغط يجب أن يغير المسار والمحتوى إلى حول.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#path",
                "kind": "text",
                "expected": "/",
                "label": "النص الفعلي #path"
              },
              {
                "selector": "#route-view",
                "kind": "text",
                "expected": "الرئيسية",
                "label": "النص الفعلي #route-view"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#path",
                "kind": "text",
                "expected": "/about",
                "label": "النص الفعلي #path"
              },
              {
                "selector": "#route-view",
                "kind": "text",
                "expected": "حول",
                "label": "النص الفعلي #route-view"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#about"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#path",
                "kind": "text",
                "expected": "/help",
                "label": "النص الفعلي #path"
              },
              {
                "selector": "#route-view",
                "kind": "text",
                "expected": "مساعدة",
                "label": "النص الفعلي #route-view"
              }
            ],
            "actions": [
              {
                "kind": "route",
                "path": "/help"
              }
            ]
          }
        ],
        "router": {
          "routes": [
            {
              "path": "/",
              "text": "الرئيسية"
            },
            {
              "path": "/about",
              "text": "حول"
            },
            {
              "path": "/help",
              "text": "مساعدة"
            }
          ]
        }
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: استخدم RouterLink#about إلى /about وRouterView. اعرض route.path في #path. البداية /؛ الضغط يجب أن يغير المسار والمحتوى إلى حول.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#path",
                "kind": "text",
                "expected": "/",
                "label": "النص الفعلي #path"
              },
              {
                "selector": "#route-view",
                "kind": "text",
                "expected": "الرئيسية",
                "label": "النص الفعلي #route-view"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#path",
                "kind": "text",
                "expected": "/about",
                "label": "النص الفعلي #path"
              },
              {
                "selector": "#route-view",
                "kind": "text",
                "expected": "حول",
                "label": "النص الفعلي #route-view"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#about"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#path",
                "kind": "text",
                "expected": "/help",
                "label": "النص الفعلي #path"
              },
              {
                "selector": "#route-view",
                "kind": "text",
                "expected": "مساعدة",
                "label": "النص الفعلي #route-view"
              }
            ],
            "actions": [
              {
                "kind": "route",
                "path": "/help"
              }
            ]
          }
        ],
        "router": {
          "routes": [
            {
              "path": "/",
              "text": "الرئيسية"
            },
            {
              "path": "/about",
              "text": "حول"
            },
            {
              "path": "/help",
              "text": "مساعدة"
            }
          ]
        }
      }
    },
    "mastery": {
      "goal": "أنشئ RouterLink#home إلى / وRouterLink#help إلى /help مع RouterView و#path. تبدأ الأداة من /about؛ اختبر الذهاب للمساعدة ثم الرئيسية.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#path",
                "kind": "text",
                "expected": "/about",
                "label": "النص الفعلي #path"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#route-view",
                "kind": "text",
                "expected": "مساعدة",
                "label": "النص الفعلي #route-view"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#help"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#route-view",
                "kind": "text",
                "expected": "الرئيسية",
                "label": "النص الفعلي #route-view"
              },
              {
                "selector": "#path",
                "kind": "text",
                "expected": "/",
                "label": "النص الفعلي #path"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#home"
              }
            ]
          }
        ],
        "router": {
          "routes": [
            {
              "path": "/",
              "text": "الرئيسية"
            },
            {
              "path": "/about",
              "text": "حول"
            },
            {
              "path": "/help",
              "text": "مساعدة"
            }
          ],
          "initial": "/about"
        }
      }
    },
    "hints": [
      "استورد RouterLink وRouterView وuseRoute من vue-router.",
      "استعمل to للمسار، لا href لتغيير صفحة التطبيق.",
      "افحص النص في RouterView مع route.path، لا نصًا ثابتًا فقط."
    ],
    "predictionHints": [
      "القيمة المعروضة /؛ المثال يشرح صيغة المسار قبل أداة Router.",
      "استورد RouterLink وRouterView وuseRoute من vue-router.",
      "استعمل to للمسار، لا href لتغيير صفحة التطبيق."
    ],
    "references": [
      "https://router.vuejs.org/guide/",
      "https://router.vuejs.org/guide/essentials/history-mode.html#Memory-mode"
    ]
  },
  {
    "id": "vue-composition-app",
    "language": "vue",
    "title": "تجميع المكونات والحالة والتصفية",
    "level": "advanced",
    "prerequisites": [
      "vue-composable",
      "vue-props",
      "vue-list",
      "vue-model"
    ],
    "goal": "مدخل #query يرشح أسماء تفاح وموز وعنب في li.product. يبدأ بثلاثة، و«مو» يعرض موز فقط، والنص غير المطابق يعرض صفرًا.",
    "explanation": "نجمع المدخل والحالة المشتقة ومكونًا محليًا صغيرًا. يملك الأب الاستعلام ويشتق النتائج، بينما يستقبل الابن الاسم كخاصية للعرض. تعريف المكون داخل الملف نفسه مناسب لحدود أداة SFC الواحدة؛ ليس محاكاة ملفات npm أو تطبيق بناء كامل.",
    "example": "<script setup>\nimport{defineComponent,h}from\"vue\";const Product=defineComponent({setup:()=>()=>h(\"p\",{id:\"example\"},\"منتج\")});\n</script>\n<template>\n<Product/>\n</template>",
    "exampleSpec": {
      "language": "vue",
      "phases": [
        {
          "rules": [
            {
              "selector": "#example",
              "kind": "text",
              "expected": "منتج",
              "label": "النص الفعلي #example"
            }
          ]
        }
      ]
    },
    "prediction": {
      "question": "ما الذي يرسمه المثال؟",
      "choices": [
        "مصفوفة فارغة",
        "ملف خارجي",
        "فقرة منتج"
      ],
      "correct": 2,
      "why": "المكون المحلي يعيد عنصر p عبر h."
    },
    "understanding": {
      "question": "من يملك استعلام البحث هنا؟",
      "choices": [
        "الأب",
        "كل ابن بنسخة منفصلة",
        "CSS"
      ],
      "correct": 0,
      "why": "الأب يشتق القائمة ويمرر بيانات العرض."
    },
    "output": {
      "question": "كيف نحسب عدد النتائج؟",
      "choices": [
        "رقم ثابت",
        "عدد ملفات الموقع",
        "من القائمة المشتقة"
      ],
      "correct": 2,
      "why": "العدد يتبع نفس مصدر عرض النتائج."
    },
    "exercise": {
      "goal": "مدخل #query يرشح أسماء تفاح وموز وعنب في li.product. يبدأ بثلاثة، و«مو» يعرض موز فقط، والنص غير المطابق يعرض صفرًا.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 3,
                "label": "عدد العناصر .product"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر .product"
              },
              {
                "selector": ".product",
                "kind": "text",
                "expected": "موز",
                "label": "النص الفعلي .product"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": "مو"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر .product"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": "لا يوجد"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 3,
                "label": "عدد العناصر .product"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": ""
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الخطأ: مدخل #query يرشح أسماء تفاح وموز وعنب في li.product. يبدأ بثلاثة، و«مو» يعرض موز فقط، والنص غير المطابق يعرض صفرًا.",
      "starter": "<script setup>\nconst count = 0;\n</script>\n<template>\n<p>المصدر يحتاج تصحيحًا</p>\n</template>",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 3,
                "label": "عدد العناصر .product"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 1,
                "label": "عدد العناصر .product"
              },
              {
                "selector": ".product",
                "kind": "text",
                "expected": "موز",
                "label": "النص الفعلي .product"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": "مو"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 0,
                "label": "عدد العناصر .product"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": "لا يوجد"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 3,
                "label": "عدد العناصر .product"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": ""
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "نفس المنتجات بمكون Product. أضف p#count لعدد النتائج. «ع» يعرض عنب وعدد 1، والفراغ يعيد العدد 3.",
      "starter": "",
      "spec": {
        "language": "vue",
        "phases": [
          {
            "rules": [
              {
                "selector": "#count",
                "kind": "text",
                "expected": "3",
                "label": "النص الفعلي #count"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#count",
                "kind": "text",
                "expected": "1",
                "label": "النص الفعلي #count"
              },
              {
                "selector": ".product",
                "kind": "text",
                "expected": "عنب",
                "label": "النص الفعلي .product"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": "ع"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#count",
                "kind": "text",
                "expected": "3",
                "label": "النص الفعلي #count"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#query",
                "value": ""
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "احفظ الاستعلام في ref.",
      "اشتق filtered من الأسماء والاستعلام.",
      "مرر الاسم إلى مكون محلي ولا تفصل عداد النتائج عن القائمة."
    ],
    "predictionHints": [
      "المكون المحلي يعيد عنصر p عبر h.",
      "احفظ الاستعلام في ref.",
      "اشتق filtered من الأسماء والاستعلام."
    ],
    "references": [
      "https://vuejs.org/guide/essentials/component-basics.html"
    ]
  }
];
for(const lesson of entries)root.VLexGuidedLessons.add(lesson);
})(typeof window!=='undefined'?window:globalThis);
