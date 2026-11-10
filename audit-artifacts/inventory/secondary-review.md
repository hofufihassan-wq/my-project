# المراجعة الثانوية للمحتوى

قراءة مستقلة لـ74 مصطلحًا (JavaScript وTypeScript)؛ لا تدعي هذه القراءة وحدها نجاح المتصفح. تفاصيل كل مصطلح في secondary-review.json.

## العيوب ذات الأولوية المتوسطة

- export/import داخل دالة execute في Vue خطأ صياغة، إضافةً إلى احتياجه ملفات خارجية.
- Blob/FileReader يبحث عن حقل file غير موجود.
- Type Narrowing: return في المستوى الأعلى في Vanilla غير صالح.
- tsconfig.json: JSON معروض في تبويب JavaScript ويُحاول تشغيله كموديول.
- Arrow/async/debounce/clipboard وغيرها تعرض نجاحًا ثابتًا دون تنفيذ الدالة المقصودة؛ يجب عدم اعتباره نجاحًا تعليميًا.
- قوالب for/if وsplit تعتمد بيانات أو مكونات غير موجودة؛ Vanilla أغلبها مقتطفات للمقارنة وليست برامج مستقلة.
- أمثلة TypeScript الـ20 تحمل lang=ts؛ لا يمكن تسميتها قيد الفحص النوعي أو التشغيل في المشغل الحالي.

## الدقة التعليمية

- **2. Arrow Function (=>)**: التحذير عن استدعاء Arrow Function بعد null عام وغير متخصص؛ لا يوضح lexical this وعدم وجود arguments أو new.
- **12. filter()**: filter callback يكفي truthy ولا يلزم boolean؛ وقد تعدل callback الكائنات؛ نفس ملاحظة الآثار الجانبية تنطبق على map.
- **17. getElementById()**: وصف getElementById بأنها الأسرع حكم أداء مطلق لا يثبته معيار API.
- **20. JSON.stringify / parse**: stringify ليست لجميع القيم: دوائر وBigInt قد ترمي، وparse قد يعيد primitive لا كائنًا فقط.
- **22. localStorage**: لا توجد مدة انتهاء تلقائية، لكن المستخدم والخصوصية وسياسات التخزين قد تمحو البيانات؛ ليس ضمان دوام.
- **23. map()**: map لا تعدل الأصل بنفسها؛ callback تستطيع التعديل، والمصفوفة الجديدة سطحية.
- **24. Nullish Coalescing (??)**: ?? ليس أفضل دائمًا من ||؛ يختلف قصد fallback للقيم falsy حسب الحاجة.
- **33. setTimeout()**: المهلة حد أدنى/جدولة لا موعد تنفيذ دقيق؛ thread قد يؤخرها.
- **34. Spread (...)**: Spread نسخ سطحي، وليس immutability للكائنات المتداخلة.
- **38. typeof**: typeof عادة يقيم التعبير؛ الادعاء العام غير المقيم غير صحيح.
- **40. WeakMap / WeakSet**: WeakMap/WeakSet الحديثة تقبل الرموز غير المسجلة عالميًا، لا الكائنات فقط.
- **43. Array.from() / Array.isArray()**: Set iterable وليس array-like؛ Array.from تدعم كليهما.
- **46. Math.random() / Math.floor()**: توليد رقم سري بـMath.random ممارسة غير آمنة؛ يجب crypto للمعلومات الأمنية.
- **47. Date & Intl.DateTimeFormat**: منذ5دقائق تحتاج Intl.RelativeTimeFormat مع فرق محسوب؛ DateTimeFormat لا تفعلها.
- **52. structuredClone()**: structuredClone ليست لأي قيمة؛ الدوال وDOM وغير المدعوم ترمي DataCloneError.
- **161. Primitive Types**: الأنواع البدائية في TS تشمل أيضًا null/undefined؛ المثال لا يثبت فحصًا وقت التشغيل.
- **163. Type Inference**: عبارة JS لا يستنتج أنواعًا تبسط أكثر من اللازم: أدوات المحرر قد تستنتج وتفحص ملفات JS. لا يوجد فحص Runtime للأنواع في اللغتين.
- **164. interface**: readonly قيد أثناء الفحص، لا يمنع تعديل كائن runtime من JavaScript ولا عبر alias قابل للتعديل.
- **169. Type Narrowing & Guards**: مثال Vanilla يحتوي return خارج دالة؛ خطأ صياغة مستقل عن عدم وجود TS.
- **173. unknown vs any vs never**: unknown لا يمنع أخطاء runtime تلقائيًا؛ يتطلب فحوصًا حقيقية. JS ليست نوع TS any حرفيًا.
- **175. Tuples & Readonly Arrays**: as const على كائن يعطي خصائص readonly، وليس Tuple؛ readonly في TS لا يجمد الكائن عند runtime.
- **176. Enums (Numeric & String)**: const enum قد يحتفظ بكائن runtime عند preserveConstEnums؛ الوصف المطلق يحتاج تقييدًا.
- **177. defineProps<Props>()**: استنتاج runtime validation من أنواع props له قيود ويختلف dev/prod؛ لا فاحص TS في هذا المشغل.
- **178. defineEmits<Emits>()**: defineEmits typing يتحقق وقت أدوات التطوير لا يمنع event خاطئ runtime تلقائيًا؛ يحتاج validator لتوثيق فحص runtime.
- **179. Ref<T> & reactive typing**: المحرر قد يستنتج أن ref(null) من Vue API؛ generic يجب لتمثيل User|null وليس لتعطيل كل inference.
- **180. tsconfig.json**: tsconfig ليس JavaScript يُشغل؛ الحقل Vanilla ينبغي عرضه كملف إعدادات لا زر تنفيذ JS.

المراجعة لا تقترح إضافة سياقات مصطنعة لتجميل النتائج. تعريف دالة صحيح بلا استدعاء ليس خطأ صياغة، لكنه لا يثبت ناتجًا تفاعليًا. تخزين localStorage داخل الإطار المعزول غير متاح بحكم الأمن ولا ينبغي تخفيف sandbox لتشغيله.
