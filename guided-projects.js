/* Six approved practical projects, sharing the existing graded and saved learning flow. */
(function(root){
"use strict";
const entries=[
  {
    "id": "project-profile",
    "kind": "project",
    "language": "html",
    "title": "صفحة شخصية متجاوبة",
    "level": "beginner",
    "prerequisites": [
      "html-semantics",
      "css-grid",
      "css-responsive"
    ],
    "goal": "أنشئ main واحدًا وعنوان h1 غير فارغ وثلاثة أقسام #about/#work/#contact لكل منها h2. nav فيه ثلاثة روابط بهذه المعرفات، وثلاث article.work داخل .projects-grid. المطلوب 3 أعمدة عند 1100px وعمود عند 390px دون تجاوز الشاشة.",
    "explanation": "ابن صفحة شخصية ذات بنية دلالية وروابط داخلية وبطاقات أعمال متجاوبة. اكتب HTML وCSS معًا في المحرر. نصوصك حرة؛ يفحص المقيم البنية والروابط وعدد الأعمدة والاحتواء بعروض فعلية. لا تضف معلومات اتصال شخصية إلى أمثلة المراجعة العامة.",
    "plan": [
      "حدد أقسام النبذة والأعمال والتواصل بعناوين واضحة.",
      "أنشئ روابط داخلية صحيحة من nav إلى الأقسام.",
      "ابن ثلاث بطاقات أعمال دون صور شبكية مطلوبة.",
      "استخدم Grid وثلاثة أعمدة على الواسع وعمودًا على الجوال.",
      "أضف عرضًا متوسطًا بعمودين واختبر 320px قبل الإتقان."
    ],
    "skills": [
      "بنية دلالية وروابط صحيحة",
      "CSS Grid متجاوب",
      "منع تجاوز الشاشة"
    ],
    "example": "<main><h1>مساحتي الأولى</h1><p>ابدأ ببنية HTML واضحة ثم أضف التنسيق.</p></main>",
    "exampleSpec": {
      "language": "html",
      "rules": [
        {
          "selector": "h1",
          "kind": "nonempty",
          "expected": true,
          "label": "nonempty h1"
        }
      ]
    },
    "exercise": {
      "goal": "أنشئ main واحدًا وعنوان h1 غير فارغ وثلاثة أقسام #about/#work/#contact لكل منها h2. nav فيه ثلاثة روابط بهذه المعرفات، وثلاث article.work داخل .projects-grid. المطلوب 3 أعمدة عند 1100px وعمود عند 390px دون تجاوز الشاشة.",
      "starter": "<style>/* اكتب تنسيقك المتجاوب */</style>\n<main>\n<!-- ابن أقسامك وبطاقاتك هنا -->\n</main>",
      "spec": {
        "language": "html",
        "phases": [
          {
            "rules": [
              {
                "selector": "main",
                "kind": "count",
                "expected": 1,
                "label": "count main"
              },
              {
                "selector": "h1",
                "kind": "count",
                "expected": 1,
                "label": "count h1"
              },
              {
                "selector": "h1",
                "kind": "nonempty",
                "expected": true,
                "label": "nonempty h1"
              },
              {
                "selector": "nav a",
                "kind": "count",
                "expected": 3,
                "label": "count nav a"
              },
              {
                "selector": "nav a:nth-child(1)",
                "kind": "attr",
                "expected": "#about",
                "label": "attr href",
                "property": "href"
              },
              {
                "selector": "nav a:nth-child(2)",
                "kind": "attr",
                "expected": "#work",
                "label": "attr href",
                "property": "href"
              },
              {
                "selector": "nav a:nth-child(3)",
                "kind": "attr",
                "expected": "#contact",
                "label": "attr href",
                "property": "href"
              },
              {
                "selector": "section h2",
                "kind": "count",
                "expected": 3,
                "label": "count section h2"
              },
              {
                "selector": ".work",
                "kind": "count",
                "expected": 3,
                "label": "count .work"
              },
              {
                "selector": ".work",
                "kind": "nonempty",
                "expected": true,
                "label": "nonempty .work"
              },
              {
                "selector": ".projects-grid",
                "kind": "columns",
                "expected": 3,
                "label": "columns .projects-grid"
              },
              {
                "selector": "main",
                "kind": "fitsViewport",
                "expected": true,
                "label": "fitsViewport main"
              }
            ],
            "width": 1100
          },
          {
            "rules": [
              {
                "selector": ".projects-grid",
                "kind": "columns",
                "expected": 1,
                "label": "columns .projects-grid"
              },
              {
                "selector": "main",
                "kind": "fitsViewport",
                "expected": true,
                "label": "fitsViewport main"
              }
            ],
            "width": 390
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح استعلام الجوال المقلوب؛ يجب أن تبقى البنية والروابط وتظهر 3 أعمدة عند 1100 وعمود عند 390.",
      "starter": "<style>\n*{box-sizing:border-box}body{margin:0;font:18px system-ui;background:#f6faf8;color:#17362a}.profile{max-width:960px;margin:auto;padding:24px}nav{display:flex;gap:16px;flex-wrap:wrap}.projects-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.work{padding:20px;border:1px solid #6d8e7d;border-radius:12px}section{margin-block:24px}@media(max-width:800px){.projects-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(min-width:500px){.projects-grid{grid-template-columns:minmax(0,1fr)}}\n</style><main class=\"profile\"><header><h1>صفحتي الشخصية</h1><nav aria-label=\"أقسام الصفحة\"><a href=\"#about\">نبذة</a><a href=\"#work\">أعمالي</a><a href=\"#contact\">تواصل</a></nav></header><section id=\"about\"><h2>نبذة عني</h2><p>أتعلم تطوير الويب وأوثق تجاربي.</p></section><section id=\"work\"><h2>أعمالي</h2><div class=\"projects-grid\"><article class=\"work\"><h3>مشروع أول</h3><p>صفحة دلالية</p></article><article class=\"work\"><h3>مشروع ثان</h3><p>تنسيق متجاوب</p></article><article class=\"work\"><h3>مشروع ثالث</h3><p>تجربة تفاعلية</p></article></div></section><section id=\"contact\"><h2>تواصل معي</h2><p>يمكنك وضع وسيلة التواصل التي تختارها هنا دون بيانات شخصية فعلية في أمثلة الاختبار.</p></section></main>",
      "spec": {
        "language": "html",
        "phases": [
          {
            "rules": [
              {
                "selector": "main",
                "kind": "count",
                "expected": 1,
                "label": "count main"
              },
              {
                "selector": "h1",
                "kind": "count",
                "expected": 1,
                "label": "count h1"
              },
              {
                "selector": "h1",
                "kind": "nonempty",
                "expected": true,
                "label": "nonempty h1"
              },
              {
                "selector": "nav a",
                "kind": "count",
                "expected": 3,
                "label": "count nav a"
              },
              {
                "selector": "nav a:nth-child(1)",
                "kind": "attr",
                "expected": "#about",
                "label": "attr href",
                "property": "href"
              },
              {
                "selector": "nav a:nth-child(2)",
                "kind": "attr",
                "expected": "#work",
                "label": "attr href",
                "property": "href"
              },
              {
                "selector": "nav a:nth-child(3)",
                "kind": "attr",
                "expected": "#contact",
                "label": "attr href",
                "property": "href"
              },
              {
                "selector": "section h2",
                "kind": "count",
                "expected": 3,
                "label": "count section h2"
              },
              {
                "selector": ".work",
                "kind": "count",
                "expected": 3,
                "label": "count .work"
              },
              {
                "selector": ".work",
                "kind": "nonempty",
                "expected": true,
                "label": "nonempty .work"
              },
              {
                "selector": ".projects-grid",
                "kind": "columns",
                "expected": 3,
                "label": "columns .projects-grid"
              },
              {
                "selector": "main",
                "kind": "fitsViewport",
                "expected": true,
                "label": "fitsViewport main"
              }
            ],
            "width": 1100
          },
          {
            "rules": [
              {
                "selector": ".projects-grid",
                "kind": "columns",
                "expected": 1,
                "label": "columns .projects-grid"
              },
              {
                "selector": "main",
                "kind": "fitsViewport",
                "expected": true,
                "label": "fitsViewport main"
              }
            ],
            "width": 390
          }
        ]
      }
    },
    "mastery": {
      "goal": "أعد بناء الصفحة بالمواصفات نفسها، وأضف عمودين عند 700px واحتواء صحيحًا عند 320px أيضًا. النصوص من اختيارك.",
      "starter": "",
      "spec": {
        "language": "html",
        "phases": [
          {
            "rules": [
              {
                "selector": "main",
                "kind": "count",
                "expected": 1,
                "label": "count main"
              },
              {
                "selector": "h1",
                "kind": "count",
                "expected": 1,
                "label": "count h1"
              },
              {
                "selector": "h1",
                "kind": "nonempty",
                "expected": true,
                "label": "nonempty h1"
              },
              {
                "selector": "nav a",
                "kind": "count",
                "expected": 3,
                "label": "count nav a"
              },
              {
                "selector": "nav a:nth-child(1)",
                "kind": "attr",
                "expected": "#about",
                "label": "attr href",
                "property": "href"
              },
              {
                "selector": "nav a:nth-child(2)",
                "kind": "attr",
                "expected": "#work",
                "label": "attr href",
                "property": "href"
              },
              {
                "selector": "nav a:nth-child(3)",
                "kind": "attr",
                "expected": "#contact",
                "label": "attr href",
                "property": "href"
              },
              {
                "selector": "section h2",
                "kind": "count",
                "expected": 3,
                "label": "count section h2"
              },
              {
                "selector": ".work",
                "kind": "count",
                "expected": 3,
                "label": "count .work"
              },
              {
                "selector": ".work",
                "kind": "nonempty",
                "expected": true,
                "label": "nonempty .work"
              },
              {
                "selector": ".projects-grid",
                "kind": "columns",
                "expected": 3,
                "label": "columns .projects-grid"
              },
              {
                "selector": "main",
                "kind": "fitsViewport",
                "expected": true,
                "label": "fitsViewport main"
              }
            ],
            "width": 1100
          },
          {
            "rules": [
              {
                "selector": ".projects-grid",
                "kind": "columns",
                "expected": 1,
                "label": "columns .projects-grid"
              },
              {
                "selector": "main",
                "kind": "fitsViewport",
                "expected": true,
                "label": "fitsViewport main"
              }
            ],
            "width": 390
          },
          {
            "rules": [
              {
                "selector": ".projects-grid",
                "kind": "columns",
                "expected": 2,
                "label": "columns .projects-grid"
              },
              {
                "selector": "main",
                "kind": "fitsViewport",
                "expected": true,
                "label": "fitsViewport main"
              }
            ],
            "width": 700
          },
          {
            "rules": [
              {
                "selector": ".projects-grid",
                "kind": "columns",
                "expected": 1,
                "label": "columns .projects-grid"
              },
              {
                "selector": "main",
                "kind": "fitsViewport",
                "expected": true,
                "label": "fitsViewport main"
              }
            ],
            "width": 320
          }
        ]
      }
    },
    "hints": [
      "ابدأ بهيكل main وheader وnav وثلاثة section.",
      "ضع البطاقات داخل حاوية grid، واستعمل minmax(0,1fr).",
      "اكتب قواعد max-width للجوال، وافحص القيم على عرض فعلي لا تصغير خط فقط."
    ],
    "predictionHints": [
      "ابن صفحة شخصية ذات بنية دلالية وروابط داخلية وبطاقات أعمال متجاوبة",
      "ابدأ بهيكل main وheader وnav وثلاثة section.",
      "ضع البطاقات داخل حاوية grid، واستعمل minmax(0,1fr)."
    ],
    "prediction": {
      "question": "كم عمودًا مطلوبًا عند عرض 390px؟",
      "choices": [
        "عمود واحد",
        "ثلاثة دائمًا",
        "لا بطاقات"
      ],
      "correct": 0,
      "why": "استعلام الجوال يغير Grid إلى عمود واحد."
    },
    "understanding": {
      "question": "ما فائدة الرابط href=\"#about\"؟",
      "choices": [
        "تشغيل كود خارجي",
        "إنشاء قسم دون id",
        "الانتقال لقسم معرفه about"
      ],
      "correct": 2,
      "why": "يربط المرجع الداخلي بمعرف موجود."
    },
    "output": {
      "question": "ما عدد الأعمدة في اختبار الإتقان عند 700px؟",
      "choices": [
        "أربعة",
        "عمودان",
        "عمود واحد دائمًا"
      ],
      "correct": 1,
      "why": "يضيف الإتقان حالة العرض المتوسط."
    },
    "trial": {
      "inputs": [],
      "actions": [
        {
          "id": "desktop",
          "label": "معاينة 1100px",
          "actions": [],
          "width": 1100
        },
        {
          "id": "mobile",
          "label": "معاينة 390px",
          "actions": [],
          "width": 390
        }
      ],
      "rules": [
        {
          "selector": "main",
          "kind": "count",
          "expected": 1,
          "label": "count main"
        }
      ]
    },
    "references": [
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design"
    ],
    "languages": [
      "html",
      "css"
    ]
  },
  {
    "id": "project-tasks",
    "kind": "project",
    "language": "javascript",
    "title": "قائمة مهام تفاعلية",
    "level": "beginner",
    "prerequisites": [
      "js-dom",
      "js-events",
      "js-storage"
    ],
    "goal": "نفذ setup كما تصف البنية الثابتة: أضف عنوانًا غير فارغ بعد trim، حدّث #completed و#remaining، واجعل زر .toggle لكل مهمة يبدّل done وزر .remove يحذفها. احفظ تحت tasks مصفوفة سجلات {title,done}، واقرأها عند البداية.",
    "explanation": "اكتب setup لربط هيكل HTML الثابت بإضافة المهام وإكمالها وحذفها. البيانات في localStorage تدريبية مستقلة لكل مشروع؛ لا تمس مخزن المنصة. يفحص المقيم الإدخال الفارغ وتقليم النص والإحصاء والحذف والحفظ وإعادة القراءة. لا تستعمل innerHTML لنص المستخدم.",
    "plan": [
      "اقرأ قائمة tasks من المخزن التدريبي بدلالات نصية.",
      "ابن العناصر باستخدام createElement وtextContent.",
      "اربط الإضافة وحذف العنصر وتبديل اكتماله.",
      "اشتق عدادي المكتمل والمتبقي من القائمة نفسها.",
      "اكتب JSON بعد كل تغيير، ثم اختبر البدء ببيانات محفوظة."
    ],
    "skills": [
      "إضافة/تبديل/حذف حقيقي",
      "Web Storage معزول",
      "معالجة نصوص المستخدم بأمان"
    ],
    "example": "function setup(){\n let tasks=[];try{const saved=JSON.parse(localStorage.getItem('tasks')||'[]');if(Array.isArray(saved))tasks=saved.filter(t=>typeof t.title==='string'&&typeof t.done==='boolean')}catch{}\n const input=document.querySelector('#new-task'),list=document.querySelector('#tasks');\n function save(){localStorage.setItem('tasks',JSON.stringify(tasks))}\n function render(){list.textContent='';for(const [index,t]of tasks.entries()){\n  const li=document.createElement('li');li.className='task';const title=document.createElement('span');title.className='task-title';title.textContent=t.title;\n  const toggle=document.createElement('button');toggle.className='toggle';toggle.textContent=t.done?'أعد فتحها':'تم';toggle.addEventListener('click',()=>{t.done=!t.done;save();render()});\n  const remove=document.createElement('button');remove.className='remove';remove.textContent='احذف';remove.addEventListener('click',()=>{tasks.splice(index,1);save();render()});li.append(title,toggle,remove);list.append(li)\n }document.querySelector('#completed').textContent=String(tasks.filter(t=>t.done).length);document.querySelector('#remaining').textContent=String(tasks.filter(t=>!t.done).length)}\n document.querySelector('#add-task').addEventListener('click',()=>{const title=input.value.trim();if(!title)return;tasks.push({title,done:false});input.value='';save();render()});render();\n}",
    "exampleSpec": {
      "language": "javascript",
      "environment": "dom",
      "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>قائمة مهامي</h1><label>المهمة<input id=\"new-task\"></label><button id=\"add-task\">أضف</button><p>المكتمل: <span id=\"completed\">0</span></p><p>المتبقي: <span id=\"remaining\">0</span></p><ul id=\"tasks\"></ul><p id=\"status\"></p></main>",
      "entry": "setup",
      "phases": [
        {
          "rules": [
            {
              "selector": "#tasks",
              "kind": "count",
              "expected": 1,
              "label": "count #tasks"
            }
          ]
        }
      ],
      "storage": true,
      "storageData": {}
    },
    "exercise": {
      "goal": "نفذ setup كما تصف البنية الثابتة: أضف عنوانًا غير فارغ بعد trim، حدّث #completed و#remaining، واجعل زر .toggle لكل مهمة يبدّل done وزر .remove يحذفها. احفظ تحت tasks مصفوفة سجلات {title,done}، واقرأها عند البداية.",
      "starter": "function setup(){\n // اقرأ tasks، ثم اربط الحقول والأزرار وابن القائمة.\n}",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>قائمة مهامي</h1><label>المهمة<input id=\"new-task\"></label><button id=\"add-task\">أضف</button><p>المكتمل: <span id=\"completed\">0</span></p><p>المتبقي: <span id=\"remaining\">0</span></p><ul id=\"tasks\"></ul><p id=\"status\"></p></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 0,
                "label": "count .task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 0,
                "label": "count .task"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": "   "
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 1,
                "label": "count .task"
              },
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "قراءة",
                "label": "text .task-title"
              },
              {
                "selector": "#new-task",
                "kind": "value",
                "expected": "",
                "label": "value #new-task"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": "  قراءة  "
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 2,
                "label": "count .task"
              },
              {
                "selector": "#remaining",
                "kind": "text",
                "expected": "2",
                "label": "text #remaining"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": "مراجعة"
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#completed",
                "kind": "text",
                "expected": "1",
                "label": "text #completed"
              },
              {
                "selector": "#remaining",
                "kind": "text",
                "expected": "1",
                "label": "text #remaining"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".toggle"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 1,
                "label": "count .task"
              },
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "مراجعة",
                "label": "text .task-title"
              },
              {
                "selector": "#completed",
                "kind": "text",
                "expected": "0",
                "label": "text #completed"
              },
              {
                "selector": "",
                "kind": "storageJSON",
                "expected": [
                  {
                    "title": "مراجعة",
                    "done": false
                  }
                ],
                "label": "البيانات المحفوظة الفعلية",
                "property": "tasks",
                "fields": [
                  "title",
                  "done"
                ]
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".remove"
              }
            ]
          }
        ],
        "storage": true,
        "storageData": {}
      }
    },
    "fix": {
      "goal": "أصلح تسلسل الحفظ: المصدر التالي يحفظ title منفردًا بدل مصفوفة المهام؛ استعد JSON صالحًا للقراءة التالية.",
      "starter": "function setup(){\n let tasks=[];try{const saved=JSON.parse(localStorage.getItem('tasks')||'[]');if(Array.isArray(saved))tasks=saved.filter(t=>typeof t.title==='string'&&typeof t.done==='boolean')}catch{}\n const input=document.querySelector('#new-task'),list=document.querySelector('#tasks');\n function save(){localStorage.setItem('tasks',JSON.stringify(tasks[0]?.title||''))}\n function render(){list.textContent='';for(const [index,t]of tasks.entries()){\n  const li=document.createElement('li');li.className='task';const title=document.createElement('span');title.className='task-title';title.textContent=t.title;\n  const toggle=document.createElement('button');toggle.className='toggle';toggle.textContent=t.done?'أعد فتحها':'تم';toggle.addEventListener('click',()=>{t.done=!t.done;save();render()});\n  const remove=document.createElement('button');remove.className='remove';remove.textContent='احذف';remove.addEventListener('click',()=>{tasks.splice(index,1);save();render()});li.append(title,toggle,remove);list.append(li)\n }document.querySelector('#completed').textContent=String(tasks.filter(t=>t.done).length);document.querySelector('#remaining').textContent=String(tasks.filter(t=>!t.done).length)}\n document.querySelector('#add-task').addEventListener('click',()=>{const title=input.value.trim();if(!title)return;tasks.push({title,done:false});input.value='';save();render()});render();\n}",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>قائمة مهامي</h1><label>المهمة<input id=\"new-task\"></label><button id=\"add-task\">أضف</button><p>المكتمل: <span id=\"completed\">0</span></p><p>المتبقي: <span id=\"remaining\">0</span></p><ul id=\"tasks\"></ul><p id=\"status\"></p></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 0,
                "label": "count .task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 0,
                "label": "count .task"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": "   "
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 1,
                "label": "count .task"
              },
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "قراءة",
                "label": "text .task-title"
              },
              {
                "selector": "#new-task",
                "kind": "value",
                "expected": "",
                "label": "value #new-task"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": "  قراءة  "
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 2,
                "label": "count .task"
              },
              {
                "selector": "#remaining",
                "kind": "text",
                "expected": "2",
                "label": "text #remaining"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": "مراجعة"
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#completed",
                "kind": "text",
                "expected": "1",
                "label": "text #completed"
              },
              {
                "selector": "#remaining",
                "kind": "text",
                "expected": "1",
                "label": "text #remaining"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".toggle"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 1,
                "label": "count .task"
              },
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "مراجعة",
                "label": "text .task-title"
              },
              {
                "selector": "#completed",
                "kind": "text",
                "expected": "0",
                "label": "text #completed"
              },
              {
                "selector": "",
                "kind": "storageJSON",
                "expected": [
                  {
                    "title": "مراجعة",
                    "done": false
                  }
                ],
                "label": "البيانات المحفوظة الفعلية",
                "property": "tasks",
                "fields": [
                  "title",
                  "done"
                ]
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".remove"
              }
            ]
          }
        ],
        "storage": true,
        "storageData": {}
      }
    },
    "mastery": {
      "goal": "أعد إنشاء التطبيق بحيث يستعيد مهمة محفوظة ومكتملة، ثم يقبل تقليبها وإضافة نص يشبه HTML كنص آمن دون عنصر img. احتفظ بالشكل {title,done} في التخزين.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>قائمة مهامي</h1><label>المهمة<input id=\"new-task\"></label><button id=\"add-task\">أضف</button><p>المكتمل: <span id=\"completed\">0</span></p><p>المتبقي: <span id=\"remaining\">0</span></p><ul id=\"tasks\"></ul><p id=\"status\"></p></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 1,
                "label": "count .task"
              },
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "محفوظة",
                "label": "text .task-title"
              },
              {
                "selector": "#completed",
                "kind": "text",
                "expected": "1",
                "label": "text #completed"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#completed",
                "kind": "text",
                "expected": "0",
                "label": "text #completed"
              },
              {
                "selector": "#remaining",
                "kind": "text",
                "expected": "1",
                "label": "text #remaining"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".toggle"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 2,
                "label": "count .task"
              },
              {
                "selector": "img",
                "kind": "count",
                "expected": 0,
                "label": "count img"
              },
              {
                "selector": "",
                "kind": "storageJSON",
                "expected": [
                  {
                    "title": "محفوظة",
                    "done": false
                  },
                  {
                    "title": "<img src=x onerror=alert(1)>",
                    "done": false
                  }
                ],
                "label": "البيانات المحفوظة الفعلية",
                "property": "tasks",
                "fields": [
                  "title",
                  "done"
                ]
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": "<img src=x onerror=alert(1)>"
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          }
        ],
        "storage": true,
        "storageData": {
          "tasks": "[{\"title\": \"محفوظة\", \"done\": true}]"
        }
      }
    },
    "hints": [
      "اقرأ JSON داخل try/catch وتحقق من أن القيمة مصفوفة.",
      "أعد بناء العرض من الحالة بعد كل عملية، ولا تعتمد على عدد ثابت.",
      "احفظ JSON للمصفوفة كاملة، واستعمل textContent للنصوص."
    ],
    "predictionHints": [
      "اكتب setup لربط هيكل HTML الثابت بإضافة المهام وإكمالها وحذفها",
      "اقرأ JSON داخل try/catch وتحقق من أن القيمة مصفوفة.",
      "أعد بناء العرض من الحالة بعد كل عملية، ولا تعتمد على عدد ثابت."
    ],
    "prediction": {
      "question": "أضفت مهمتين وأكملت إحداهما؛ ما عدد المتبقي؟",
      "choices": [
        "2",
        "0",
        "1"
      ],
      "correct": 2,
      "why": "المتبقي مشتق من المهام غير المكتملة."
    },
    "understanding": {
      "question": "كيف تعرض عنوانًا يشبه وسم HTML بأمان؟",
      "choices": [
        "eval",
        "textContent",
        "innerHTML لنص المستخدم"
      ],
      "correct": 1,
      "why": "textContent يعامل المدخل كنص ولا ينشئ وسمًا."
    },
    "output": {
      "question": "حذفت المهمة المكتملة وبقيت أخرى؛ ما عدد المكتمل؟",
      "choices": [
        "0",
        "1",
        "2"
      ],
      "correct": 0,
      "why": "الحذف يزيل المهمة من مصدر العد أيضًا."
    },
    "trial": {
      "inputs": [
        {
          "key": "title",
          "label": "عنوان المهمة",
          "value": "",
          "type": "text"
        }
      ],
      "actions": [
        {
          "id": "add",
          "label": "أضف المهمة فعليًا",
          "actions": [
            {
              "kind": "input",
              "selector": "#new-task",
              "valueFrom": "title"
            },
            {
              "kind": "click",
              "selector": "#add-task"
            }
          ]
        },
        {
          "id": "toggle",
          "label": "بدّل أول مهمة",
          "actions": [
            {
              "kind": "click",
              "selector": ".toggle"
            }
          ],
          "requires": ".toggle"
        },
        {
          "id": "remove",
          "label": "احذف أول مهمة",
          "actions": [
            {
              "kind": "click",
              "selector": ".remove"
            }
          ],
          "requires": ".remove"
        },
        {
          "id": "reload",
          "label": "أعد قراءة البيانات",
          "actions": []
        }
      ],
      "rules": [
        {
          "selector": "#tasks",
          "kind": "count",
          "expected": 1,
          "label": "count #tasks"
        }
      ]
    },
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
      "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
    ],
    "languages": [
      "javascript"
    ]
  },
  {
    "id": "project-expenses",
    "kind": "project",
    "language": "javascript",
    "title": "متتبع مصروفات محفوظ",
    "level": "intermediate",
    "prerequisites": [
      "js-storage",
      "js-reduce",
      "project-tasks"
    ],
    "goal": "نفذ setup للإضافة والحذف وإجمالي عشري بمنزلتين في #total والعدد في #count. ارفض الوصف الفارغ والمبلغ الفارغ وغير المنتهي و<=0. احفظ expenses كسجلات {title,amount} واقرأها أولًا.",
    "explanation": "اجمع مصروفات موجبة ذات وصف، مع إجمالي وعدد وحذف وحفظ محلي تدريبي. لا يكفي parseFloat لأن نصًا مثل 2bad يجب أن يرفض. نفحص الأعداد العشرية والفراغ والصفر والسالب وغير المنتهي، وقراءة بيانات محفوظة بعد إعادة التشغيل. هذه أداة تدريب وليست نظام محاسبة أو معالجة مالية إنتاجية.",
    "plan": [
      "حدد سجل المصروف {title,amount} وأسماء مفاتيح التخزين.",
      "تحقق من الوصف والمبلغ قبل تغيير الحالة.",
      "احسب الإجمالي من السجلات ولا تحفظه كحقيقة منفصلة.",
      "احفظ بعد الإضافة والحذف وأعد القراءة عند setup.",
      "أضف ميزانية مشتقة واختبر عجزًا سالبًا دون NaN."
    ],
    "skills": [
      "إدخال عددي صالح وتجميع صحيح",
      "تخزين واستعادة JSON",
      "حذف وإعادة اشتقاق النتائج"
    ],
    "example": "function setup(){\n let expenses=[];try{const raw=JSON.parse(localStorage.getItem('expenses')||'[]');if(Array.isArray(raw))expenses=raw.filter(x=>typeof x.title==='string'&&Number.isFinite(x.amount)&&x.amount>0)}catch{}\n const title=document.querySelector('#expense-title'),amount=document.querySelector('#expense-amount'),budget=document.querySelector('#budget'),list=document.querySelector('#expenses');\n function save(){localStorage.setItem('expenses',JSON.stringify(expenses))}\n function render(){list.textContent='';for(const[index,e]of expenses.entries()){const li=document.createElement('li');li.className='expense';const label=document.createElement('span');label.className='expense-title';label.textContent=e.title;const remove=document.createElement('button');remove.className='remove';remove.textContent='حذف';remove.addEventListener('click',()=>{expenses.splice(index,1);save();render()});li.append(label,document.createTextNode(' '+e.amount.toFixed(2)+' '),remove);list.append(li)}const total=expenses.reduce((sum,e)=>sum+e.amount,0);document.querySelector('#total').textContent=total.toFixed(2);document.querySelector('#count').textContent=String(expenses.length);const limit=Number(budget.value);document.querySelector('#remaining-budget').textContent=(Number.isFinite(limit)?limit-total:0).toFixed(2)}\n document.querySelector('#add-expense').addEventListener('click',()=>{const name=title.value.trim(),value=Number(amount.value);if(!name||!amount.value.trim()||!Number.isFinite(value)||value<=0)return;expenses.push({title:name,amount:value});title.value='';amount.value='';save();render()});budget.addEventListener('input',render);render();\n}",
    "exampleSpec": {
      "language": "javascript",
      "environment": "dom",
      "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>مصروفاتي</h1><label>الوصف<input id=\"expense-title\"></label><label>المبلغ<input id=\"expense-amount\" type=\"text\" inputmode=\"decimal\"></label><button id=\"add-expense\">أضف مصروفًا</button><p>الإجمالي: <span id=\"total\">0.00</span></p><p>عدد المصروفات: <span id=\"count\">0</span></p><label>الميزانية<input id=\"budget\" value=\"100\"></label><p>المتبقي: <span id=\"remaining-budget\"></span></p><ul id=\"expenses\"></ul><p id=\"status\"></p></main>",
      "entry": "setup",
      "phases": [
        {
          "rules": [
            {
              "selector": "#expenses",
              "kind": "count",
              "expected": 1,
              "label": "count #expenses"
            },
            {
              "selector": "#total",
              "kind": "count",
              "expected": 1,
              "label": "count #total"
            }
          ]
        }
      ],
      "storage": true,
      "storageData": {}
    },
    "exercise": {
      "goal": "نفذ setup للإضافة والحذف وإجمالي عشري بمنزلتين في #total والعدد في #count. ارفض الوصف الفارغ والمبلغ الفارغ وغير المنتهي و<=0. احفظ expenses كسجلات {title,amount} واقرأها أولًا.",
      "starter": "function setup(){\n // تحقق من المدخلات، وابن العرض من expenses المحفوظة.\n}",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>مصروفاتي</h1><label>الوصف<input id=\"expense-title\"></label><label>المبلغ<input id=\"expense-amount\" type=\"text\" inputmode=\"decimal\"></label><button id=\"add-expense\">أضف مصروفًا</button><p>الإجمالي: <span id=\"total\">0.00</span></p><p>عدد المصروفات: <span id=\"count\">0</span></p><label>الميزانية<input id=\"budget\" value=\"100\"></label><p>المتبقي: <span id=\"remaining-budget\"></span></p><ul id=\"expenses\"></ul><p id=\"status\"></p></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "0.00",
                "label": "text #total"
              },
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "غير صالح"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": ""
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "غير صالح"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "0"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "غير صالح"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "-2"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "غير صالح"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "Infinity"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "غير صالح"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "2bad"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "5.50",
                "label": "text #total"
              },
              {
                "selector": ".expense-title",
                "kind": "text",
                "expected": "قهوة",
                "label": "text .expense-title"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": " قهوة "
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "5.50"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "7.50",
                "label": "text #total"
              },
              {
                "selector": "#count",
                "kind": "text",
                "expected": "2",
                "label": "text #count"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "ماء"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "2"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "2.00",
                "label": "text #total"
              },
              {
                "selector": "",
                "kind": "storageJSON",
                "expected": [
                  {
                    "title": "ماء",
                    "amount": 2
                  }
                ],
                "label": "البيانات المحفوظة الفعلية",
                "property": "expenses",
                "fields": [
                  "title",
                  "amount"
                ]
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".remove"
              }
            ]
          }
        ],
        "storage": true,
        "storageData": {}
      }
    },
    "fix": {
      "goal": "أصلح تحقق العدد؛ قبول السالب والصفر وغير المنتهي يؤدي إلى إجماليات خاطئة.",
      "starter": "function setup(){\n let expenses=[];try{const raw=JSON.parse(localStorage.getItem('expenses')||'[]');if(Array.isArray(raw))expenses=raw.filter(x=>typeof x.title==='string'&&Number.isFinite(x.amount)&&x.amount>0)}catch{}\n const title=document.querySelector('#expense-title'),amount=document.querySelector('#expense-amount'),budget=document.querySelector('#budget'),list=document.querySelector('#expenses');\n function save(){localStorage.setItem('expenses',JSON.stringify(expenses))}\n function render(){list.textContent='';for(const[index,e]of expenses.entries()){const li=document.createElement('li');li.className='expense';const label=document.createElement('span');label.className='expense-title';label.textContent=e.title;const remove=document.createElement('button');remove.className='remove';remove.textContent='حذف';remove.addEventListener('click',()=>{expenses.splice(index,1);save();render()});li.append(label,document.createTextNode(' '+e.amount.toFixed(2)+' '),remove);list.append(li)}const total=expenses.reduce((sum,e)=>sum+e.amount,0);document.querySelector('#total').textContent=total.toFixed(2);document.querySelector('#count').textContent=String(expenses.length);const limit=Number(budget.value);document.querySelector('#remaining-budget').textContent=(Number.isFinite(limit)?limit-total:0).toFixed(2)}\n document.querySelector('#add-expense').addEventListener('click',()=>{const name=title.value.trim(),value=Number(amount.value);if(!name||!amount.value.trim()||false)return;expenses.push({title:name,amount:value});title.value='';amount.value='';save();render()});budget.addEventListener('input',render);render();\n}",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>مصروفاتي</h1><label>الوصف<input id=\"expense-title\"></label><label>المبلغ<input id=\"expense-amount\" type=\"text\" inputmode=\"decimal\"></label><button id=\"add-expense\">أضف مصروفًا</button><p>الإجمالي: <span id=\"total\">0.00</span></p><p>عدد المصروفات: <span id=\"count\">0</span></p><label>الميزانية<input id=\"budget\" value=\"100\"></label><p>المتبقي: <span id=\"remaining-budget\"></span></p><ul id=\"expenses\"></ul><p id=\"status\"></p></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "0.00",
                "label": "text #total"
              },
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "غير صالح"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": ""
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "غير صالح"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "0"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "غير صالح"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "-2"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "غير صالح"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "Infinity"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".expense",
                "kind": "count",
                "expected": 0,
                "label": "count .expense"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "غير صالح"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "2bad"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "5.50",
                "label": "text #total"
              },
              {
                "selector": ".expense-title",
                "kind": "text",
                "expected": "قهوة",
                "label": "text .expense-title"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": " قهوة "
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "5.50"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "7.50",
                "label": "text #total"
              },
              {
                "selector": "#count",
                "kind": "text",
                "expected": "2",
                "label": "text #count"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#expense-title",
                "value": "ماء"
              },
              {
                "kind": "input",
                "selector": "#expense-amount",
                "value": "2"
              },
              {
                "kind": "click",
                "selector": "#add-expense"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "2.00",
                "label": "text #total"
              },
              {
                "selector": "",
                "kind": "storageJSON",
                "expected": [
                  {
                    "title": "ماء",
                    "amount": 2
                  }
                ],
                "label": "البيانات المحفوظة الفعلية",
                "property": "expenses",
                "fields": [
                  "title",
                  "amount"
                ]
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".remove"
              }
            ]
          }
        ],
        "storage": true,
        "storageData": {}
      }
    },
    "mastery": {
      "goal": "استعد المصروف القديم 3.25، واحسب #remaining-budget من قيمة #budget ناقص الإجمالي، مع دعم عجز سالب والحذف والحفظ.",
      "starter": "",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>مصروفاتي</h1><label>الوصف<input id=\"expense-title\"></label><label>المبلغ<input id=\"expense-amount\" type=\"text\" inputmode=\"decimal\"></label><button id=\"add-expense\">أضف مصروفًا</button><p>الإجمالي: <span id=\"total\">0.00</span></p><p>عدد المصروفات: <span id=\"count\">0</span></p><label>الميزانية<input id=\"budget\" value=\"100\"></label><p>المتبقي: <span id=\"remaining-budget\"></span></p><ul id=\"expenses\"></ul><p id=\"status\"></p></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "3.25",
                "label": "text #total"
              },
              {
                "selector": "#count",
                "kind": "text",
                "expected": "1",
                "label": "text #count"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#remaining-budget",
                "kind": "text",
                "expected": "-1.25",
                "label": "text #remaining-budget"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#budget",
                "value": "2"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#total",
                "kind": "text",
                "expected": "0.00",
                "label": "text #total"
              },
              {
                "selector": "#remaining-budget",
                "kind": "text",
                "expected": "2.00",
                "label": "text #remaining-budget"
              },
              {
                "selector": "",
                "kind": "storageJSON",
                "expected": [],
                "label": "البيانات المحفوظة الفعلية",
                "property": "expenses",
                "fields": [
                  "title",
                  "amount"
                ]
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".remove"
              }
            ]
          }
        ],
        "storage": true,
        "storageData": {
          "expenses": "[{\"title\": \"قديم\", \"amount\": 3.25}]"
        }
      }
    },
    "hints": [
      "استعمل Number بعد فحص النص الفارغ، ثم Number.isFinite وشرط موجب.",
      "اشتق الإجمالي بـreduce، واعرضه بمنزلتين.",
      "احفظ مصفوفة السجلات بعد كل تعديل، لا النص المعروض في الإجمالي."
    ],
    "predictionHints": [
      "اجمع مصروفات موجبة ذات وصف، مع إجمالي وعدد وحذف وحفظ محلي تدريبي",
      "استعمل Number بعد فحص النص الفارغ، ثم Number.isFinite وشرط موجب.",
      "اشتق الإجمالي بـreduce، واعرضه بمنزلتين."
    ],
    "prediction": {
      "question": "ما إجمالي 5.50 و2؟",
      "choices": [
        "2.00",
        "7.50",
        "5.502"
      ],
      "correct": 1,
      "why": "الجمع عددي ثم العرض بمنزلتين."
    },
    "understanding": {
      "question": "لماذا نفحص الفراغ قبل Number؟",
      "choices": [
        "Number للنص الفارغ يعطي صفرًا",
        "لأن Number لا تقبل أرقامًا",
        "لأن الفراغ يساوي Infinity"
      ],
      "correct": 0,
      "why": "نرفض الفراغ صراحة بدل قبوله مبلغًا."
    },
    "output": {
      "question": "ميزانية 2 ومصروف 3.25؛ ما المتبقي؟",
      "choices": [
        "1.25",
        "5.25",
        "-1.25"
      ],
      "correct": 2,
      "why": "المتبقي هو الميزانية ناقص المصروف."
    },
    "trial": {
      "inputs": [
        {
          "key": "title",
          "label": "وصف المصروف",
          "value": "",
          "type": "text"
        },
        {
          "key": "amount",
          "label": "المبلغ",
          "value": "",
          "type": "number"
        },
        {
          "key": "budget",
          "label": "الميزانية",
          "value": "100",
          "type": "number"
        }
      ],
      "actions": [
        {
          "id": "add",
          "label": "أضف المصروف",
          "actions": [
            {
              "kind": "input",
              "selector": "#budget",
              "valueFrom": "budget"
            },
            {
              "kind": "input",
              "selector": "#expense-title",
              "valueFrom": "title"
            },
            {
              "kind": "input",
              "selector": "#expense-amount",
              "valueFrom": "amount"
            },
            {
              "kind": "click",
              "selector": "#add-expense"
            }
          ]
        },
        {
          "id": "remove",
          "label": "احذف أول مصروف",
          "actions": [
            {
              "kind": "input",
              "selector": "#budget",
              "valueFrom": "budget"
            },
            {
              "kind": "click",
              "selector": ".remove"
            }
          ],
          "requires": ".remove"
        },
        {
          "id": "budget",
          "label": "طبّق الميزانية",
          "actions": [
            {
              "kind": "input",
              "selector": "#budget",
              "valueFrom": "budget"
            }
          ]
        },
        {
          "id": "reload",
          "label": "أعد قراءة المحفوظ",
          "actions": [
            {
              "kind": "input",
              "selector": "#budget",
              "valueFrom": "budget"
            }
          ]
        }
      ],
      "rules": [
        {
          "selector": "#total",
          "kind": "count",
          "expected": 1,
          "label": "count #total"
        }
      ]
    },
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite",
      "https://developer.mozilla.org/en-US/docs/Web/API/Storage"
    ],
    "languages": [
      "javascript"
    ]
  },
  {
    "id": "project-catalog",
    "kind": "project",
    "language": "javascript",
    "title": "كتالوج ببحث وتصفية",
    "level": "intermediate",
    "prerequisites": [
      "js-map-filter",
      "js-dom",
      "js-events"
    ],
    "goal": "استخدم مصفوفة products المقدمة. اعرض li.product وبداخلها .product-name، وحدّث #matches و#catalog-empty. البحث عبر #catalog-query بعد trim ودون حساسية أحرف، والفئة عبر #catalog-category.",
    "explanation": "اعرض مجموعة المنتجات المحلية الواضحة في بادئة المصدر؛ لا Fetch ولا منتجات وهمية من خادم غير موجود. يجب أن يجتمع البحث مع الفئة، مع تجاهل حالة الأحرف والفراغ المحيط، وإظهار عدد ونتيجة فارغة. في الإتقان أضف ترتيب السعر دون تعديل مصفوفة المصدر.",
    "plan": [
      "اقرأ مصفوفة products المقدمة دون تغيير بياناتها.",
      "اكتب دالة عرض واحدة تعتمد على الحقل والفئة.",
      "ادمج الشروط بدل جعل كل مرشح يلغي الآخر.",
      "حدّث عدد النتائج وحالة الفراغ.",
      "أضف فرز نسخة من النتائج واختبر تداخل المرشحات."
    ],
    "skills": [
      "بحث وفئة يعملان معًا",
      "عرض نتائج وحالة فارغة",
      "فرز قائمة مشتقة"
    ],
    "example": "const products=[{\"id\": 1, \"name\": \"قلم Pen\", \"category\": \"office\", \"price\": 5}, {\"id\": 2, \"name\": \"كتاب\", \"category\": \"books\", \"price\": 20}, {\"id\": 3, \"name\": \"دفتر\", \"category\": \"office\", \"price\": 10}, {\"id\": 4, \"name\": \"سماعة\", \"category\": \"tech\", \"price\": 50}];\nfunction setup(){const input=document.querySelector('#catalog-query'),category=document.querySelector('#catalog-category'),sort=document.querySelector('#catalog-sort'),list=document.querySelector('#products');function render(){let visible=products.filter(p=>p.name.toLocaleLowerCase().includes(input.value.trim().toLocaleLowerCase())&&(category.value==='all'||p.category===category.value));if(sort.value==='asc')visible=[...visible].sort((a,b)=>a.price-b.price);list.textContent='';for(const p of visible){const li=document.createElement('li');li.className='product';const name=document.createElement('span');name.className='product-name';name.textContent=p.name;li.append(name,document.createTextNode(' '+p.price));list.append(li)}document.querySelector('#matches').textContent=String(visible.length);document.querySelector('#catalog-empty').textContent=visible.length?'':'لا توجد نتائج'}input.addEventListener('input',render);category.addEventListener('change',render);sort.addEventListener('change',render);render()}\n",
    "exampleSpec": {
      "language": "javascript",
      "environment": "dom",
      "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>كتالوج محلي</h1><label>بحث<input id=\"catalog-query\"></label><label>الفئة<select id=\"catalog-category\"><option value=\"all\">الكل</option><option value=\"office\">مكتبية</option><option value=\"books\">كتب</option><option value=\"tech\">تقنية</option></select></label><label>الترتيب<select id=\"catalog-sort\"><option value=\"default\">الأصلي</option><option value=\"asc\">السعر تصاعديًا</option></select></label><p>النتائج: <span id=\"matches\"></span></p><p id=\"catalog-empty\"></p><ul id=\"products\"></ul></main>",
      "entry": "setup",
      "phases": [
        {
          "rules": [
            {
              "selector": "#products",
              "kind": "count",
              "expected": 1,
              "label": "count #products"
            }
          ]
        }
      ]
    },
    "exercise": {
      "goal": "استخدم مصفوفة products المقدمة. اعرض li.product وبداخلها .product-name، وحدّث #matches و#catalog-empty. البحث عبر #catalog-query بعد trim ودون حساسية أحرف، والفئة عبر #catalog-category.",
      "starter": "const products=[{\"id\": 1, \"name\": \"قلم Pen\", \"category\": \"office\", \"price\": 5}, {\"id\": 2, \"name\": \"كتاب\", \"category\": \"books\", \"price\": 20}, {\"id\": 3, \"name\": \"دفتر\", \"category\": \"office\", \"price\": 10}, {\"id\": 4, \"name\": \"سماعة\", \"category\": \"tech\", \"price\": 50}];\nfunction setup(){\n // اربط البحث والفئة بعرض واحد.\n}",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>كتالوج محلي</h1><label>بحث<input id=\"catalog-query\"></label><label>الفئة<select id=\"catalog-category\"><option value=\"all\">الكل</option><option value=\"office\">مكتبية</option><option value=\"books\">كتب</option><option value=\"tech\">تقنية</option></select></label><label>الترتيب<select id=\"catalog-sort\"><option value=\"default\">الأصلي</option><option value=\"asc\">السعر تصاعديًا</option></select></label><p>النتائج: <span id=\"matches\"></span></p><p id=\"catalog-empty\"></p><ul id=\"products\"></ul></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 4,
                "label": "count .product"
              },
              {
                "selector": "#matches",
                "kind": "text",
                "expected": "4",
                "label": "text #matches"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 1,
                "label": "count .product"
              },
              {
                "selector": ".product-name",
                "kind": "text",
                "expected": "قلم Pen",
                "label": "text .product-name"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#catalog-query",
                "value": "PEN"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 0,
                "label": "count .product"
              },
              {
                "selector": "#catalog-empty",
                "kind": "text",
                "expected": "لا توجد نتائج",
                "label": "text #catalog-empty"
              }
            ],
            "actions": [
              {
                "kind": "change",
                "selector": "#catalog-category",
                "value": "books"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 1,
                "label": "count .product"
              },
              {
                "selector": ".product-name",
                "kind": "text",
                "expected": "كتاب",
                "label": "text .product-name"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#catalog-query",
                "value": ""
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 0,
                "label": "count .product"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#catalog-query",
                "value": "غير موجود"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "أصلح ربط حدث البحث؛ الحقل يتغير لكن المصدر التالي لا يعيد العرض عند إدخال النص.",
      "starter": "const products=[{\"id\": 1, \"name\": \"قلم Pen\", \"category\": \"office\", \"price\": 5}, {\"id\": 2, \"name\": \"كتاب\", \"category\": \"books\", \"price\": 20}, {\"id\": 3, \"name\": \"دفتر\", \"category\": \"office\", \"price\": 10}, {\"id\": 4, \"name\": \"سماعة\", \"category\": \"tech\", \"price\": 50}];\nfunction setup(){const input=document.querySelector('#catalog-query'),category=document.querySelector('#catalog-category'),sort=document.querySelector('#catalog-sort'),list=document.querySelector('#products');function render(){let visible=products.filter(p=>p.name.toLocaleLowerCase().includes(input.value.trim().toLocaleLowerCase())&&(category.value==='all'||p.category===category.value));if(sort.value==='asc')visible=[...visible].sort((a,b)=>a.price-b.price);list.textContent='';for(const p of visible){const li=document.createElement('li');li.className='product';const name=document.createElement('span');name.className='product-name';name.textContent=p.name;li.append(name,document.createTextNode(' '+p.price));list.append(li)}document.querySelector('#matches').textContent=String(visible.length);document.querySelector('#catalog-empty').textContent=visible.length?'':'لا توجد نتائج'}category.addEventListener('change',render);sort.addEventListener('change',render);render()}\n",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>كتالوج محلي</h1><label>بحث<input id=\"catalog-query\"></label><label>الفئة<select id=\"catalog-category\"><option value=\"all\">الكل</option><option value=\"office\">مكتبية</option><option value=\"books\">كتب</option><option value=\"tech\">تقنية</option></select></label><label>الترتيب<select id=\"catalog-sort\"><option value=\"default\">الأصلي</option><option value=\"asc\">السعر تصاعديًا</option></select></label><p>النتائج: <span id=\"matches\"></span></p><p id=\"catalog-empty\"></p><ul id=\"products\"></ul></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 4,
                "label": "count .product"
              },
              {
                "selector": "#matches",
                "kind": "text",
                "expected": "4",
                "label": "text #matches"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 1,
                "label": "count .product"
              },
              {
                "selector": ".product-name",
                "kind": "text",
                "expected": "قلم Pen",
                "label": "text .product-name"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#catalog-query",
                "value": "PEN"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 0,
                "label": "count .product"
              },
              {
                "selector": "#catalog-empty",
                "kind": "text",
                "expected": "لا توجد نتائج",
                "label": "text #catalog-empty"
              }
            ],
            "actions": [
              {
                "kind": "change",
                "selector": "#catalog-category",
                "value": "books"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 1,
                "label": "count .product"
              },
              {
                "selector": ".product-name",
                "kind": "text",
                "expected": "كتاب",
                "label": "text .product-name"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#catalog-query",
                "value": ""
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 0,
                "label": "count .product"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#catalog-query",
                "value": "غير موجود"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "أضف #catalog-sort: الخيار asc يرتب السعر تصاعديًا بعد البحث والفئة. احتفظ بالعدد وحالة الفراغ وبمصفوفة المصدر دون ترتيبها موضعيًا.",
      "starter": "const products=[{\"id\": 1, \"name\": \"قلم Pen\", \"category\": \"office\", \"price\": 5}, {\"id\": 2, \"name\": \"كتاب\", \"category\": \"books\", \"price\": 20}, {\"id\": 3, \"name\": \"دفتر\", \"category\": \"office\", \"price\": 10}, {\"id\": 4, \"name\": \"سماعة\", \"category\": \"tech\", \"price\": 50}];\nfunction setup(){}",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>كتالوج محلي</h1><label>بحث<input id=\"catalog-query\"></label><label>الفئة<select id=\"catalog-category\"><option value=\"all\">الكل</option><option value=\"office\">مكتبية</option><option value=\"books\">كتب</option><option value=\"tech\">تقنية</option></select></label><label>الترتيب<select id=\"catalog-sort\"><option value=\"default\">الأصلي</option><option value=\"asc\">السعر تصاعديًا</option></select></label><p>النتائج: <span id=\"matches\"></span></p><p id=\"catalog-empty\"></p><ul id=\"products\"></ul></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 2,
                "label": "count .product"
              },
              {
                "selector": ".product-name",
                "kind": "text",
                "expected": "قلم Pen",
                "label": "text .product-name"
              }
            ],
            "actions": [
              {
                "kind": "change",
                "selector": "#catalog-category",
                "value": "office"
              },
              {
                "kind": "change",
                "selector": "#catalog-sort",
                "value": "asc"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 1,
                "label": "count .product"
              },
              {
                "selector": ".product-name",
                "kind": "text",
                "expected": "دفتر",
                "label": "text .product-name"
              },
              {
                "selector": "#matches",
                "kind": "text",
                "expected": "1",
                "label": "text #matches"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#catalog-query",
                "value": "  دفتر  "
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".product",
                "kind": "count",
                "expected": 1,
                "label": "count .product"
              },
              {
                "selector": ".product-name",
                "kind": "text",
                "expected": "سماعة",
                "label": "text .product-name"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#catalog-query",
                "value": ""
              },
              {
                "kind": "change",
                "selector": "#catalog-category",
                "value": "tech"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#products .product:nth-child(2) .product-name",
                "kind": "text",
                "expected": "كتاب",
                "label": "text #products .product:nth-child(2) .product-name"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#catalog-query",
                "value": ""
              },
              {
                "kind": "change",
                "selector": "#catalog-category",
                "value": "all"
              },
              {
                "kind": "change",
                "selector": "#catalog-sort",
                "value": "default"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "اشتق النتائج من products في كل مرة.",
      "اجمع شرط الاسم والفئة بـ&&.",
      "رتب نسخة من visible ولا ترتب products الأصلية."
    ],
    "predictionHints": [
      "اعرض مجموعة المنتجات المحلية الواضحة في بادئة المصدر؛ لا Fetch ولا منتجات وهمية من خادم غير موجود",
      "اشتق النتائج من products في كل مرة.",
      "اجمع شرط الاسم والفئة بـ&&."
    ],
    "prediction": {
      "question": "بحث PEN مع فئة books؛ كم نتيجة من البيانات المعطاة؟",
      "choices": [
        "0",
        "1",
        "4"
      ],
      "correct": 0,
      "why": "لا يوجد منتج يطابق الاسم والفئة معًا."
    },
    "understanding": {
      "question": "كيف نجمع مرشحي الاسم والفئة؟",
      "choices": [
        "بتجاهل الفئة عند البحث",
        "بتثبيت العدد",
        "بشرطين مرتبطين بـ&&"
      ],
      "correct": 2,
      "why": "يجب أن تتحقق الشروط معًا."
    },
    "output": {
      "question": "أول منتج مكتبي بالفرز التصاعدي للسعر؟",
      "choices": [
        "سماعة",
        "قلم Pen",
        "دفتر"
      ],
      "correct": 1,
      "why": "سعر القلم 5 والدفتر 10."
    },
    "trial": {
      "inputs": [
        {
          "key": "query",
          "label": "البحث",
          "value": "",
          "type": "text"
        },
        {
          "key": "category",
          "label": "الفئة",
          "value": "all",
          "type": "text",
          "options": [
            {
              "value": "all",
              "label": "الكل"
            },
            {
              "value": "office",
              "label": "مكتبية"
            },
            {
              "value": "books",
              "label": "كتب"
            },
            {
              "value": "tech",
              "label": "تقنية"
            }
          ]
        },
        {
          "key": "sort",
          "label": "الترتيب",
          "value": "default",
          "type": "text",
          "options": [
            {
              "value": "default",
              "label": "الأصلي"
            },
            {
              "value": "asc",
              "label": "السعر"
            }
          ]
        }
      ],
      "actions": [
        {
          "id": "filter",
          "label": "طبّق البحث والتصفية",
          "actions": [
            {
              "kind": "input",
              "selector": "#catalog-query",
              "valueFrom": "query"
            },
            {
              "kind": "change",
              "selector": "#catalog-category",
              "valueFrom": "category"
            },
            {
              "kind": "change",
              "selector": "#catalog-sort",
              "valueFrom": "sort"
            }
          ]
        }
      ],
      "rules": [
        {
          "selector": "#products",
          "kind": "count",
          "expected": 1,
          "label": "count #products"
        }
      ]
    },
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"
    ],
    "languages": [
      "javascript"
    ]
  },
  {
    "id": "project-dashboard",
    "kind": "project",
    "language": "javascript",
    "title": "لوحة بيانات تفاعلية",
    "level": "advanced",
    "prerequisites": [
      "js-reduce",
      "js-map-filter",
      "project-catalog"
    ],
    "goal": "باستخدام records المقدمة، اربط #region واحسب #revenue بمنزلتين و#orders و#average للإيراد/عدد الطلبات و#rows. اعرض .chart-bar لكل سجل مصفى مع data-value للإيراد. المجموعة الفارغة تعطي 0.00 و0 دون NaN.",
    "explanation": "اشتق مؤشرات الإيراد وعدد الطلبات والمتوسط من السجلات المحلية نفسها. المنطقة والحد الأدنى يغيران مجموعة البيانات المعروضة، ويجب أن يتبع الرسم والعدادات المجموعة نفسها. لا نجلب إحصاءات خارجية ولا نعرض أرقامًا تقديرية على أنها نشاط مستخدم حقيقي.",
    "plan": [
      "حدد معنى كل مؤشر ومصدر سجلاته.",
      "رشّح السجلات بالمنطقة قبل حساب أي إجمالي.",
      "احسب المتوسط للإيراد لكل طلب، لا متوسط الصفوف غير الموزون.",
      "ابن تمثيل الأعمدة من البيانات المصفاة نفسها.",
      "عالج المجموعة الفارغة ثم أضف مرشح الحد الأدنى للإتقان."
    ],
    "skills": [
      "اشتقاق إحصائيات صحيحة",
      "حالة فارغة دون NaN",
      "تزامن العرض مع مرشحاته"
    ],
    "example": "const records=[{\"region\": \"east\", \"revenue\": 120, \"orders\": 3}, {\"region\": \"west\", \"revenue\": 90, \"orders\": 3}, {\"region\": \"east\", \"revenue\": 40, \"orders\": 1}];\nfunction setup(){const region=document.querySelector('#region'),minimum=document.querySelector('#min-revenue');function render(){const min=Number(minimum.value)||0;const rows=records.filter(r=>(region.value==='all'||r.region===region.value)&&r.revenue>=min);const revenue=rows.reduce((s,r)=>s+r.revenue,0),orders=rows.reduce((s,r)=>s+r.orders,0);document.querySelector('#revenue').textContent=revenue.toFixed(2);document.querySelector('#orders').textContent=String(orders);document.querySelector('#average').textContent=(orders?revenue/orders:0).toFixed(2);document.querySelector('#rows').textContent=String(rows.length);const chart=document.querySelector('#chart');chart.textContent='';for(const r of rows){const bar=document.createElement('p');bar.className='chart-bar';bar.setAttribute('data-value',String(r.revenue));bar.style.cssText='background:#b7ddc8;padding:8px;width:'+r.revenue/120*100+'%;max-width:100%';bar.textContent=r.region+': '+r.revenue;chart.append(bar)}}region.addEventListener('change',render);minimum.addEventListener('input',render);render()}\n",
    "exampleSpec": {
      "language": "javascript",
      "environment": "dom",
      "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>لوحة بيانات محلية</h1><label>المنطقة<select id=\"region\"><option value=\"all\">الكل</option><option value=\"east\">الشرق</option><option value=\"west\">الغرب</option><option value=\"none\">بلا بيانات</option></select></label><label>أقل إيراد<input id=\"min-revenue\" value=\"0\"></label><section class=\"metrics\"><p>الإيراد <strong id=\"revenue\"></strong></p><p>الطلبات <strong id=\"orders\"></strong></p><p>المتوسط للطلب <strong id=\"average\"></strong></p><p>السجلات <strong id=\"rows\"></strong></p></section><div id=\"chart\"></div></main>",
      "entry": "setup",
      "phases": [
        {
          "rules": [
            {
              "selector": "#chart",
              "kind": "count",
              "expected": 1,
              "label": "count #chart"
            }
          ]
        }
      ]
    },
    "exercise": {
      "goal": "باستخدام records المقدمة، اربط #region واحسب #revenue بمنزلتين و#orders و#average للإيراد/عدد الطلبات و#rows. اعرض .chart-bar لكل سجل مصفى مع data-value للإيراد. المجموعة الفارغة تعطي 0.00 و0 دون NaN.",
      "starter": "const records=[{\"region\": \"east\", \"revenue\": 120, \"orders\": 3}, {\"region\": \"west\", \"revenue\": 90, \"orders\": 3}, {\"region\": \"east\", \"revenue\": 40, \"orders\": 1}];\nfunction setup(){\n // رشّح ثم اجمع، ولا تكتب المؤشرات ثابتة.\n}",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>لوحة بيانات محلية</h1><label>المنطقة<select id=\"region\"><option value=\"all\">الكل</option><option value=\"east\">الشرق</option><option value=\"west\">الغرب</option><option value=\"none\">بلا بيانات</option></select></label><label>أقل إيراد<input id=\"min-revenue\" value=\"0\"></label><section class=\"metrics\"><p>الإيراد <strong id=\"revenue\"></strong></p><p>الطلبات <strong id=\"orders\"></strong></p><p>المتوسط للطلب <strong id=\"average\"></strong></p><p>السجلات <strong id=\"rows\"></strong></p></section><div id=\"chart\"></div></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": "#revenue",
                "kind": "text",
                "expected": "250.00",
                "label": "text #revenue"
              },
              {
                "selector": "#orders",
                "kind": "text",
                "expected": "7",
                "label": "text #orders"
              },
              {
                "selector": "#average",
                "kind": "text",
                "expected": "35.71",
                "label": "text #average"
              },
              {
                "selector": ".chart-bar",
                "kind": "count",
                "expected": 3,
                "label": "count .chart-bar"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#revenue",
                "kind": "text",
                "expected": "160.00",
                "label": "text #revenue"
              },
              {
                "selector": "#orders",
                "kind": "text",
                "expected": "4",
                "label": "text #orders"
              },
              {
                "selector": "#average",
                "kind": "text",
                "expected": "40.00",
                "label": "text #average"
              },
              {
                "selector": ".chart-bar",
                "kind": "count",
                "expected": 2,
                "label": "count .chart-bar"
              }
            ],
            "actions": [
              {
                "kind": "change",
                "selector": "#region",
                "value": "east"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#revenue",
                "kind": "text",
                "expected": "90.00",
                "label": "text #revenue"
              },
              {
                "selector": "#orders",
                "kind": "text",
                "expected": "3",
                "label": "text #orders"
              },
              {
                "selector": "#average",
                "kind": "text",
                "expected": "30.00",
                "label": "text #average"
              }
            ],
            "actions": [
              {
                "kind": "change",
                "selector": "#region",
                "value": "west"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#revenue",
                "kind": "text",
                "expected": "0.00",
                "label": "text #revenue"
              },
              {
                "selector": "#orders",
                "kind": "text",
                "expected": "0",
                "label": "text #orders"
              },
              {
                "selector": "#average",
                "kind": "text",
                "expected": "0.00",
                "label": "text #average"
              },
              {
                "selector": ".chart-bar",
                "kind": "count",
                "expected": 0,
                "label": "count .chart-bar"
              }
            ],
            "actions": [
              {
                "kind": "change",
                "selector": "#region",
                "value": "none"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح المتوسط: القسمة على عدد الصفوف بدل عدد الطلبات تعطي مؤشرًا غير صحيح.",
      "starter": "const records=[{\"region\": \"east\", \"revenue\": 120, \"orders\": 3}, {\"region\": \"west\", \"revenue\": 90, \"orders\": 3}, {\"region\": \"east\", \"revenue\": 40, \"orders\": 1}];\nfunction setup(){const region=document.querySelector('#region'),minimum=document.querySelector('#min-revenue');function render(){const min=Number(minimum.value)||0;const rows=records.filter(r=>(region.value==='all'||r.region===region.value)&&r.revenue>=min);const revenue=rows.reduce((s,r)=>s+r.revenue,0),orders=rows.reduce((s,r)=>s+r.orders,0);document.querySelector('#revenue').textContent=revenue.toFixed(2);document.querySelector('#orders').textContent=String(orders);document.querySelector('#average').textContent=(rows.length?revenue/rows.length:0).toFixed(2);document.querySelector('#rows').textContent=String(rows.length);const chart=document.querySelector('#chart');chart.textContent='';for(const r of rows){const bar=document.createElement('p');bar.className='chart-bar';bar.setAttribute('data-value',String(r.revenue));bar.style.cssText='background:#b7ddc8;padding:8px;width:'+r.revenue/120*100+'%;max-width:100%';bar.textContent=r.region+': '+r.revenue;chart.append(bar)}}region.addEventListener('change',render);minimum.addEventListener('input',render);render()}\n",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>لوحة بيانات محلية</h1><label>المنطقة<select id=\"region\"><option value=\"all\">الكل</option><option value=\"east\">الشرق</option><option value=\"west\">الغرب</option><option value=\"none\">بلا بيانات</option></select></label><label>أقل إيراد<input id=\"min-revenue\" value=\"0\"></label><section class=\"metrics\"><p>الإيراد <strong id=\"revenue\"></strong></p><p>الطلبات <strong id=\"orders\"></strong></p><p>المتوسط للطلب <strong id=\"average\"></strong></p><p>السجلات <strong id=\"rows\"></strong></p></section><div id=\"chart\"></div></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": "#revenue",
                "kind": "text",
                "expected": "250.00",
                "label": "text #revenue"
              },
              {
                "selector": "#orders",
                "kind": "text",
                "expected": "7",
                "label": "text #orders"
              },
              {
                "selector": "#average",
                "kind": "text",
                "expected": "35.71",
                "label": "text #average"
              },
              {
                "selector": ".chart-bar",
                "kind": "count",
                "expected": 3,
                "label": "count .chart-bar"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#revenue",
                "kind": "text",
                "expected": "160.00",
                "label": "text #revenue"
              },
              {
                "selector": "#orders",
                "kind": "text",
                "expected": "4",
                "label": "text #orders"
              },
              {
                "selector": "#average",
                "kind": "text",
                "expected": "40.00",
                "label": "text #average"
              },
              {
                "selector": ".chart-bar",
                "kind": "count",
                "expected": 2,
                "label": "count .chart-bar"
              }
            ],
            "actions": [
              {
                "kind": "change",
                "selector": "#region",
                "value": "east"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#revenue",
                "kind": "text",
                "expected": "90.00",
                "label": "text #revenue"
              },
              {
                "selector": "#orders",
                "kind": "text",
                "expected": "3",
                "label": "text #orders"
              },
              {
                "selector": "#average",
                "kind": "text",
                "expected": "30.00",
                "label": "text #average"
              }
            ],
            "actions": [
              {
                "kind": "change",
                "selector": "#region",
                "value": "west"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#revenue",
                "kind": "text",
                "expected": "0.00",
                "label": "text #revenue"
              },
              {
                "selector": "#orders",
                "kind": "text",
                "expected": "0",
                "label": "text #orders"
              },
              {
                "selector": "#average",
                "kind": "text",
                "expected": "0.00",
                "label": "text #average"
              },
              {
                "selector": ".chart-bar",
                "kind": "count",
                "expected": 0,
                "label": "count .chart-bar"
              }
            ],
            "actions": [
              {
                "kind": "change",
                "selector": "#region",
                "value": "none"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "أضف مرشح #min-revenue ليعمل مع المنطقة. يجب أن تتغير السجلات والرسم والإجماليات معًا، وأن تتحمل نتيجة فارغة.",
      "starter": "const records=[{\"region\": \"east\", \"revenue\": 120, \"orders\": 3}, {\"region\": \"west\", \"revenue\": 90, \"orders\": 3}, {\"region\": \"east\", \"revenue\": 40, \"orders\": 1}];\nfunction setup(){}",
      "spec": {
        "language": "javascript",
        "environment": "dom",
        "fixture": "<style>body{font:17px system-ui;padding:20px;background:#f4faf6;color:#17372a}input,select,button{font:inherit;padding:8px;margin:4px}li{padding:8px;border-bottom:1px solid #bbd2c5}.muted{color:#52695e}.metrics{display:flex;gap:20px;flex-wrap:wrap}</style><main><h1>لوحة بيانات محلية</h1><label>المنطقة<select id=\"region\"><option value=\"all\">الكل</option><option value=\"east\">الشرق</option><option value=\"west\">الغرب</option><option value=\"none\">بلا بيانات</option></select></label><label>أقل إيراد<input id=\"min-revenue\" value=\"0\"></label><section class=\"metrics\"><p>الإيراد <strong id=\"revenue\"></strong></p><p>الطلبات <strong id=\"orders\"></strong></p><p>المتوسط للطلب <strong id=\"average\"></strong></p><p>السجلات <strong id=\"rows\"></strong></p></section><div id=\"chart\"></div></main>",
        "entry": "setup",
        "phases": [
          {
            "rules": [
              {
                "selector": "#revenue",
                "kind": "text",
                "expected": "120.00",
                "label": "text #revenue"
              },
              {
                "selector": "#orders",
                "kind": "text",
                "expected": "3",
                "label": "text #orders"
              },
              {
                "selector": "#rows",
                "kind": "text",
                "expected": "1",
                "label": "text #rows"
              },
              {
                "selector": ".chart-bar",
                "kind": "attr",
                "expected": "120",
                "label": "attr data-value",
                "property": "data-value"
              }
            ],
            "actions": [
              {
                "kind": "change",
                "selector": "#region",
                "value": "east"
              },
              {
                "kind": "input",
                "selector": "#min-revenue",
                "value": "60"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#rows",
                "kind": "text",
                "expected": "0",
                "label": "text #rows"
              },
              {
                "selector": "#average",
                "kind": "text",
                "expected": "0.00",
                "label": "text #average"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#min-revenue",
                "value": "200"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "استعمل قائمة مشتقة واحدة لجميع المؤشرات.",
      "متوسط الطلب هو مجموع الإيرادات مقسومًا على مجموع الطلبات.",
      "احم القسمة عندما لا توجد طلبات، ثم ارسم السجلات المصفاة."
    ],
    "predictionHints": [
      "اشتق مؤشرات الإيراد وعدد الطلبات والمتوسط من السجلات المحلية نفسها",
      "استعمل قائمة مشتقة واحدة لجميع المؤشرات.",
      "متوسط الطلب هو مجموع الإيرادات مقسومًا على مجموع الطلبات."
    ],
    "prediction": {
      "question": "ما المتوسط للإيراد 250 مع 7 طلبات بمنزلتين؟",
      "choices": [
        "83.33",
        "250.00",
        "35.71"
      ],
      "correct": 2,
      "why": "نقسم على عدد الطلبات لا عدد السجلات."
    },
    "understanding": {
      "question": "هل متوسط الصفوف يساوي متوسط الإيراد لكل طلب دائمًا؟",
      "choices": [
        "لا يمكن حسابه",
        "لا؛ نزن بعدد الطلبات",
        "نعم دائمًا"
      ],
      "correct": 1,
      "why": "يختلف عدد الطلبات بين السجلات."
    },
    "output": {
      "question": "في الشرق ومع حد أدنى 60؛ ما الإيراد؟",
      "choices": [
        "120.00",
        "160.00",
        "0.00"
      ],
      "correct": 0,
      "why": "يستبعد السجل 40 ويبقى السجل 120."
    },
    "trial": {
      "inputs": [
        {
          "key": "region",
          "label": "المنطقة",
          "value": "all",
          "type": "text",
          "options": [
            {
              "value": "all",
              "label": "الكل"
            },
            {
              "value": "east",
              "label": "الشرق"
            },
            {
              "value": "west",
              "label": "الغرب"
            },
            {
              "value": "none",
              "label": "بلا بيانات"
            }
          ]
        },
        {
          "key": "minimum",
          "label": "أقل إيراد",
          "value": "0",
          "type": "number"
        }
      ],
      "actions": [
        {
          "id": "filter",
          "label": "حدّث اللوحة فعليًا",
          "actions": [
            {
              "kind": "change",
              "selector": "#region",
              "valueFrom": "region"
            },
            {
              "kind": "input",
              "selector": "#min-revenue",
              "valueFrom": "minimum"
            }
          ]
        }
      ],
      "rules": [
        {
          "selector": "#chart",
          "kind": "count",
          "expected": 1,
          "label": "count #chart"
        }
      ]
    },
    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"
    ],
    "languages": [
      "javascript"
    ]
  },
  {
    "id": "project-vue-workspace",
    "kind": "project",
    "language": "vue",
    "title": "تطبيق Vue للمكونات والحالة",
    "level": "advanced",
    "prerequisites": [
      "vue-composition-app",
      "vue-emits",
      "vue-composable",
      "project-tasks"
    ],
    "goal": "أنشئ SFC واحدًا باسمَي مكونين فعليين Summary وTaskRow (خياري name). Summary يعرض #summary بالشكل مكتمل/إجمالي، وTaskRow يرسم li.task و.task-title وزري .toggle و.remove. الأب يملك الإضافة #new-task/#add-task ومرشحي #show-done/#show-all، ويرسل الأحداث بين المكونات. احفظ تحت workspace-tasks سجلات {id,title,done}.",
    "explanation": "اجمع مكوني Summary وTaskRow المحليين مع أب يملك الحالة والأحداث والتصفية. احفظ مهام المشروع في مخزن تدريبي مستقل. يفحص المقيم سلوك الإضافة والحذف والتبديل، ويعد المكونات المركبة فعليًا، ويستعيد الحالة في تشغيل جديد؛ لا تكفي أسماء مكونات في تعليق. التنفيذ SFC واحد وVue 3.4 مع عارض معزول، وليس مشروع npm متعدد الملفات.",
    "plan": [
      "ابن حالة المهام والمدخل والمرشح في الأب.",
      "اشتق الملخص والقائمة المرئية من الحالة نفسها.",
      "عرّف Summary وTaskRow محليين بأسماء معلنة.",
      "مرر props وأرسل toggle/remove ليحدّث الأب الحالة.",
      "احفظ الحالة عبر watch ثم افحص الاستعادة والنصوص الآمنة."
    ],
    "skills": [
      "مكونات مركبة وتفاعل فعلي",
      "حالة مشتقة وأحداث أب/ابن",
      "حفظ واستعادة مستقلان"
    ],
    "example": "<script setup>\nimport {ref,computed,watch,defineComponent,h} from 'vue';\nlet saved=[];try{const raw=JSON.parse(localStorage.getItem('workspace-tasks')||'[]');if(Array.isArray(raw))saved=raw.filter(t=>typeof t.title==='string'&&typeof t.done==='boolean'&&Number.isFinite(t.id))}catch{}\nconst tasks=ref(saved),title=ref(''),filter=ref(localStorage.getItem('workspace-filter')||'all');\nconst visible=computed(()=>filter.value==='done'?tasks.value.filter(t=>t.done):tasks.value);\nconst completed=computed(()=>tasks.value.filter(t=>t.done).length);\nwatch(tasks,()=>localStorage.setItem('workspace-tasks',JSON.stringify(tasks.value)),{deep:true});watch(filter,()=>localStorage.setItem('workspace-filter',filter.value));\nfunction add(){const text=title.value.trim();if(!text)return;tasks.value.push({id:Math.max(0,...tasks.value.map(t=>t.id))+1,title:text,done:false});title.value=''}\nfunction toggle(id){const task=tasks.value.find(t=>t.id===id);if(task)task.done=!task.done}\nfunction remove(id){tasks.value=tasks.value.filter(t=>t.id!==id)}\nconst Summary=defineComponent({name:'Summary',props:{total:Number,completed:Number},setup:p=>()=>h('p',{id:'summary'},p.completed+'/'+p.total)});\nconst TaskRow=defineComponent({name:'TaskRow',props:{task:Object},emits:['toggle','remove'],setup(p,{emit}){return()=>h('li',{class:'task'},[h('span',{class:'task-title'},p.task.title),h('button',{class:'toggle',onClick:()=>emit('toggle',p.task.id)},p.task.done?'أعد فتحها':'تم'),h('button',{class:'remove',onClick:()=>emit('remove',p.task.id)},'احذف')])}});\n</script>\n<template><main id=\"workspace\"><h1>مساحة عملي</h1><label>المهمة<input id=\"new-task\" v-model=\"title\"></label><button id=\"add-task\" @click=\"add\">أضف</button><button id=\"show-done\" @click=\"filter='done'\">المكتمل</button><button id=\"show-all\" @click=\"filter='all'\">الكل</button><Summary :total=\"tasks.length\" :completed=\"completed\"/><ul><TaskRow v-for=\"task in visible\" :key=\"task.id\" :task=\"task\" @toggle=\"toggle\" @remove=\"remove\"/></ul></main></template>\n<style>main{font:17px system-ui;padding:20px;color:#17362a;background:#eef8f1}button,input{font:inherit;padding:8px;margin:4px}li{padding:10px;border-bottom:1px solid #b5cdbf}</style>",
    "exampleSpec": {
      "language": "vue",
      "storage": true,
      "storageData": {},
      "phases": [
        {
          "rules": [
            {
              "selector": "#workspace",
              "kind": "count",
              "expected": 1,
              "label": "count #workspace"
            }
          ]
        }
      ]
    },
    "exercise": {
      "goal": "أنشئ SFC واحدًا باسمَي مكونين فعليين Summary وTaskRow (خياري name). Summary يعرض #summary بالشكل مكتمل/إجمالي، وTaskRow يرسم li.task و.task-title وزري .toggle و.remove. الأب يملك الإضافة #new-task/#add-task ومرشحي #show-done/#show-all، ويرسل الأحداث بين المكونات. احفظ تحت workspace-tasks سجلات {id,title,done}.",
      "starter": "<script setup>\nimport{ref,computed,watch,defineComponent,h}from\"vue\";\n// أنشئ الحالة والمكونات وربط الأحداث.\n</script>\n<template><main id=\"workspace\"></main></template>",
      "spec": {
        "language": "vue",
        "storage": true,
        "storageData": {},
        "phases": [
          {
            "rules": [
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "0/0",
                "label": "text #summary"
              },
              {
                "selector": "",
                "kind": "componentCount",
                "expected": 1,
                "label": "مكون ملخص فعلي",
                "property": "Summary"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 0,
                "label": "count .task"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": " "
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "قراءة",
                "label": "text .task-title"
              },
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "0/1",
                "label": "text #summary"
              },
              {
                "selector": "",
                "kind": "componentCount",
                "expected": 1,
                "label": "مكون صف فعلي",
                "property": "TaskRow"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": " قراءة "
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "0/2",
                "label": "text #summary"
              },
              {
                "selector": "",
                "kind": "componentCount",
                "expected": 2,
                "label": "صفان بمكونين فعليين",
                "property": "TaskRow"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": "تطبيق"
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "1/2",
                "label": "text #summary"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".toggle"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 1,
                "label": "count .task"
              },
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "قراءة",
                "label": "text .task-title"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#show-done"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 0,
                "label": "count .task"
              },
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "0/1",
                "label": "text #summary"
              },
              {
                "selector": "",
                "kind": "storageJSON",
                "expected": [
                  {
                    "title": "تطبيق",
                    "done": false
                  }
                ],
                "label": "البيانات المحفوظة الفعلية",
                "property": "workspace-tasks",
                "fields": [
                  "title",
                  "done"
                ]
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".remove"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "تطبيق",
                "label": "text .task-title"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#show-all"
              }
            ]
          }
        ]
      }
    },
    "fix": {
      "goal": "صحّح الربط بين الابن والأب: اسم الحدث المرسل عند التبديل لا يطابق المستمع، فلا تتغير حالة الإكمال.",
      "starter": "<script setup>\nimport {ref,computed,watch,defineComponent,h} from 'vue';\nlet saved=[];try{const raw=JSON.parse(localStorage.getItem('workspace-tasks')||'[]');if(Array.isArray(raw))saved=raw.filter(t=>typeof t.title==='string'&&typeof t.done==='boolean'&&Number.isFinite(t.id))}catch{}\nconst tasks=ref(saved),title=ref(''),filter=ref(localStorage.getItem('workspace-filter')||'all');\nconst visible=computed(()=>filter.value==='done'?tasks.value.filter(t=>t.done):tasks.value);\nconst completed=computed(()=>tasks.value.filter(t=>t.done).length);\nwatch(tasks,()=>localStorage.setItem('workspace-tasks',JSON.stringify(tasks.value)),{deep:true});watch(filter,()=>localStorage.setItem('workspace-filter',filter.value));\nfunction add(){const text=title.value.trim();if(!text)return;tasks.value.push({id:Math.max(0,...tasks.value.map(t=>t.id))+1,title:text,done:false});title.value=''}\nfunction toggle(id){const task=tasks.value.find(t=>t.id===id);if(task)task.done=!task.done}\nfunction remove(id){tasks.value=tasks.value.filter(t=>t.id!==id)}\nconst Summary=defineComponent({name:'Summary',props:{total:Number,completed:Number},setup:p=>()=>h('p',{id:'summary'},p.completed+'/'+p.total)});\nconst TaskRow=defineComponent({name:'TaskRow',props:{task:Object},emits:['toggle','remove'],setup(p,{emit}){return()=>h('li',{class:'task'},[h('span',{class:'task-title'},p.task.title),h('button',{class:'toggle',onClick:()=>emit('wrong-toggle',p.task.id)},p.task.done?'أعد فتحها':'تم'),h('button',{class:'remove',onClick:()=>emit('remove',p.task.id)},'احذف')])}});\n</script>\n<template><main id=\"workspace\"><h1>مساحة عملي</h1><label>المهمة<input id=\"new-task\" v-model=\"title\"></label><button id=\"add-task\" @click=\"add\">أضف</button><button id=\"show-done\" @click=\"filter='done'\">المكتمل</button><button id=\"show-all\" @click=\"filter='all'\">الكل</button><Summary :total=\"tasks.length\" :completed=\"completed\"/><ul><TaskRow v-for=\"task in visible\" :key=\"task.id\" :task=\"task\" @toggle=\"toggle\" @remove=\"remove\"/></ul></main></template>\n<style>main{font:17px system-ui;padding:20px;color:#17362a;background:#eef8f1}button,input{font:inherit;padding:8px;margin:4px}li{padding:10px;border-bottom:1px solid #b5cdbf}</style>",
      "spec": {
        "language": "vue",
        "storage": true,
        "storageData": {},
        "phases": [
          {
            "rules": [
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "0/0",
                "label": "text #summary"
              },
              {
                "selector": "",
                "kind": "componentCount",
                "expected": 1,
                "label": "مكون ملخص فعلي",
                "property": "Summary"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 0,
                "label": "count .task"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": " "
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "قراءة",
                "label": "text .task-title"
              },
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "0/1",
                "label": "text #summary"
              },
              {
                "selector": "",
                "kind": "componentCount",
                "expected": 1,
                "label": "مكون صف فعلي",
                "property": "TaskRow"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": " قراءة "
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "0/2",
                "label": "text #summary"
              },
              {
                "selector": "",
                "kind": "componentCount",
                "expected": 2,
                "label": "صفان بمكونين فعليين",
                "property": "TaskRow"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": "تطبيق"
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "1/2",
                "label": "text #summary"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".toggle"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 1,
                "label": "count .task"
              },
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "قراءة",
                "label": "text .task-title"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#show-done"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 0,
                "label": "count .task"
              },
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "0/1",
                "label": "text #summary"
              },
              {
                "selector": "",
                "kind": "storageJSON",
                "expected": [
                  {
                    "title": "تطبيق",
                    "done": false
                  }
                ],
                "label": "البيانات المحفوظة الفعلية",
                "property": "workspace-tasks",
                "fields": [
                  "title",
                  "done"
                ]
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".remove"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "تطبيق",
                "label": "text .task-title"
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": "#show-all"
              }
            ]
          }
        ]
      }
    },
    "mastery": {
      "goal": "أعد بناء التطبيق مع استعادة مهمة مكتملة id=5، واستقبال نص يشبه HTML كنص دون عنصر img، وحفظ تغيير الإكمال للمهام كلها. احتفظ بتكوين المكونات الحقيقي.",
      "starter": "",
      "spec": {
        "language": "vue",
        "storage": true,
        "storageData": {
          "workspace-tasks": "[{\"id\": 5, \"title\": \"محفوظة\", \"done\": true}]"
        },
        "phases": [
          {
            "rules": [
              {
                "selector": ".task-title",
                "kind": "text",
                "expected": "محفوظة",
                "label": "text .task-title"
              },
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "1/1",
                "label": "text #summary"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": ".task",
                "kind": "count",
                "expected": 2,
                "label": "count .task"
              },
              {
                "selector": "img",
                "kind": "count",
                "expected": 0,
                "label": "count img"
              },
              {
                "selector": "",
                "kind": "componentCount",
                "expected": 2,
                "label": "مكونان فعليان",
                "property": "TaskRow"
              }
            ],
            "actions": [
              {
                "kind": "input",
                "selector": "#new-task",
                "value": "<img src=x>"
              },
              {
                "kind": "click",
                "selector": "#add-task"
              }
            ]
          },
          {
            "rules": [
              {
                "selector": "#summary",
                "kind": "text",
                "expected": "0/2",
                "label": "text #summary"
              },
              {
                "selector": "",
                "kind": "storageJSON",
                "expected": [
                  {
                    "title": "محفوظة",
                    "done": false
                  },
                  {
                    "title": "<img src=x>",
                    "done": false
                  }
                ],
                "label": "البيانات المحفوظة الفعلية",
                "property": "workspace-tasks",
                "fields": [
                  "title",
                  "done"
                ]
              }
            ],
            "actions": [
              {
                "kind": "click",
                "selector": ".toggle"
              }
            ]
          }
        ]
      }
    },
    "hints": [
      "استخدم computed للقائمة والملخص، وref للمصدر.",
      "عرّف name في كل مكون، وأرسل معرف العنصر إلى الأب.",
      "اقرأ JSON المحفوظ أولًا، ثم احفظ التعديلات في watch عميق دون مسح الحالة عند الترشيح."
    ],
    "predictionHints": [
      "اجمع مكوني Summary وTaskRow المحليين مع أب يملك الحالة والأحداث والتصفية",
      "استخدم computed للقائمة والملخص، وref للمصدر.",
      "عرّف name في كل مكون، وأرسل معرف العنصر إلى الأب."
    ],
    "prediction": {
      "question": "مهمتان إحداهما مكتملة مع مرشح المكتمل؛ ما الملخص؟",
      "choices": [
        "0/2",
        "1/2",
        "1/1"
      ],
      "correct": 1,
      "why": "الملخص من كل المهام، والقائمة المرئية من المرشح."
    },
    "understanding": {
      "question": "من يملك تغيير المهمة في تصميم الأب والابن؟",
      "choices": [
        "الأب بعد حدث الابن",
        "الابن بتعديل prop مباشرة",
        "CSS"
      ],
      "correct": 0,
      "why": "ينقل الابن الطلب ويغير الأب المصدر."
    },
    "output": {
      "question": "أزيلت المكتملة من مهمتين؛ كم مهمة تبقى؟",
      "choices": [
        "0",
        "2",
        "1"
      ],
      "correct": 2,
      "why": "يتحدث المصدر والملخص والقائمة معًا."
    },
    "trial": {
      "inputs": [
        {
          "key": "title",
          "label": "عنوان المهمة",
          "value": "",
          "type": "text"
        }
      ],
      "actions": [
        {
          "id": "add",
          "label": "أضف من كود Vue",
          "actions": [
            {
              "kind": "input",
              "selector": "#new-task",
              "valueFrom": "title"
            },
            {
              "kind": "click",
              "selector": "#add-task"
            }
          ]
        },
        {
          "id": "toggle",
          "label": "بدّل أول عنصر",
          "actions": [
            {
              "kind": "click",
              "selector": ".toggle"
            }
          ],
          "requires": ".toggle"
        },
        {
          "id": "remove",
          "label": "احذف أول عنصر",
          "actions": [
            {
              "kind": "click",
              "selector": ".remove"
            }
          ],
          "requires": ".remove"
        },
        {
          "id": "done",
          "label": "اعرض المكتمل",
          "actions": [
            {
              "kind": "click",
              "selector": "#show-done"
            }
          ]
        },
        {
          "id": "all",
          "label": "اعرض الكل",
          "actions": [
            {
              "kind": "click",
              "selector": "#show-all"
            }
          ]
        },
        {
          "id": "reload",
          "label": "أعد تركيب المشروع من بياناته",
          "actions": []
        }
      ],
      "rules": [
        {
          "selector": "#workspace",
          "kind": "count",
          "expected": 1,
          "label": "count #workspace"
        }
      ]
    },
    "references": [
      "https://vuejs.org/guide/essentials/component-basics.html",
      "https://vuejs.org/guide/components/events.html",
      "https://vuejs.org/guide/essentials/watchers.html"
    ],
    "languages": [
      "vue"
    ]
  }
];
for(const project of entries)root.VLexGuidedLessons.addProject(project);
})(typeof window!=='undefined'?window:globalThis);
