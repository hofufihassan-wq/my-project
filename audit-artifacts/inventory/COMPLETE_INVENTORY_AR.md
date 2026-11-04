# جرد القاموس: 180 مصطلحًا / 360 مصدر مثال

الأساس الثابت: `3d4575aeae16c22b6932a6bac5b18a7a4f9cca37`. وقت التشغيل `2026-10-31T13:20:53.270Z`.

النتائج: {"يعمل": 46, "يحتاج سياقًا": 219, "غير مدعوم": 53, "يحتوي خطأً": 42}.

Works is scoped to observable behavior described per row. No claim of complete semantic correctness; declaration-only examples and all context-dependent features are not marked works. Reference URLs supplied for180; only saved official source documents fetched. No context fixtures inserted.

لم يُستخدم Ready كدليل صحة. كل صف يحيل إلى DOM وسجل فعليين في browser-inventory.json؛ expected من قراءة المصدر ولا يساوي ادعاء النتيجة لكل المدخلات.

## جرد جميع المصادر

| المعرف | المصطلح | المصدر | الحالة | الدليل / النقص |
|---|---|---|---|---|
| js-addeventlistener | addEventListener() | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-arrow_function | Arrow Function (=>) | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-async_await | async / await | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-bind_call_apply | bind() / call() / apply() | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-blob_filereader | Blob / FileReader | vue | يحتاج سياقًا | خطأ في مثال Vue: Cannot read properties of null (reading 'addEventListener') |
| js-class | class | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-console_log | console.log | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-const | const | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-destructuring | Destructuring | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-export_import | export / import | vue | يحتوي خطأً | Vue: استيراد وتصدير داخل execute مع خلط ملفين، فلا يجتاز الصياغة. Vanilla: require/module تخص Node CommonJS غير المتوفر في المتصفح. |
| js-fetch | fetch() | vue | يحتاج سياقًا | خطأ الاتصال: {} |
| js-filter | filter() | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-find | find() | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-for_for_of | for / for...of | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «items» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| js-foreach | forEach() | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-function | function | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-getelementbyid | getElementById() | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-if_else | if / else | vue | غير مدعوم | خطأ في مثال Vue: المكوّن «Dashboard» غير متوفر. قد يحتاج Nuxt أو مكتبة أو ملفًا آخر. |
| js-includes | includes() | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-json_stringify_parse | JSON.stringify / parse | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-let | let | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-localstorage | localStorage | vue | غير مدعوم | الوصول للتخزين من إطار opaque ممنوع بسبب sandbox؛ لا ينبغي إضافة allow-same-origin لتشغيل هذا المثال. |
| js-map | map() | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-nullish_coalescing | Nullish Coalescing (??) | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-object_keys_entries | Object.keys/entries | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-optional_chaining | Optional Chaining (?.) | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-promise | Promise | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-push_splice | push() / splice() | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-queryselector | querySelector() | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-reduce | reduce() | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-return | return | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-set_map | Set / Map | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-settimeout | setTimeout() | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-spread | Spread (...) | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-switch | switch | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-template_literals | Template Literals | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-try_catch | try / catch | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-typeof | typeof | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-var | var | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-weakmap_weakset | WeakMap / WeakSet | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-xmlhttprequest | XMLHttpRequest | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-yield | yield | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-array_from_array_isarray | Array.from() / Array.isArray() | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-string_split_join | String.split() / join() | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «inputTags» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| js-string_replace_replaceall | String.replace() / replaceAll() | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-math_random_math_floor | Math.random() / Math.floor() | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-date_intl_datetimeformat | Date & Intl.DateTimeFormat | vue | يعمل | أنتج المنسق تاريخًا عربيًا حقيقيًا في Console. |
| js-regexp_test_match | RegExp (test / match) | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-debounce_throttle | Debounce & Throttle | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-intersectionobserver | IntersectionObserver | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-abortcontroller | AbortController | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-structuredclone | structuredClone() | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-url_urlsearchparams | URL & URLSearchParams | vue | يعمل | طابقت مخرجات Console النتيجة المتوقعة من هذا المصدر الفعلي. |
| js-clipboard_api_navigator_clipboard | Clipboard API (navigator.clipboard) | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-key | :key | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «users» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| vue-keepalive | <KeepAlive> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «currentTab» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| vue-slot | <slot> | vue | يعمل | ظهر محتوى fallback الموجود بالفعل في المصدر. |
| vue-teleport | <Teleport> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «isOpen» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| vue-transition | <Transition> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «show» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| vue-computed | computed() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-defineasynccomponent | defineAsyncComponent() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-defineemits | defineEmits() | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-defineexpose | defineExpose() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-definemodel | defineModel() | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-defineprops | defineProps() | vue | يحتاج سياقًا | تعذر تحويل مكوّن Vue: Element is missing end tag. |
| vue-nexttick | nextTick() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-onmounted | onMounted() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-onunmounted | onUnmounted() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-provide_inject | provide() / inject() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-reactive | reactive() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-ref | ref() | vue | يعمل | نقر العداد حدّث القيمة من 0 إلى 1 في DOM. |
| vue-shallowref_shallowreactive | shallowRef() / shallowReactive() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-toref_torefs | toRef() / toRefs() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-usefetch | useFetch() | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| vue-useslots_useattrs | useSlots() / useAttrs() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-usestate | useState() | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| vue-v-bind | v-bind (:) | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «userAvatarUrl» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| vue-v-for | v-for | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «courses» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| vue-v-if_v-else | v-if / v-else | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «isLoggedIn» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| vue-v-model | v-model | vue | يعمل | إدخال نص فعلي انعكس في الفقرة المرتبطة. |
| vue-v-on | v-on (@) | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «handleSubmit» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| vue-v-show | v-show | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «isVisible» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| vue-watch_watcheffect | watch() / watchEffect() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| vue-watchposteffect | watchPostEffect() | vue | يحتوي خطأً | JavaScript موضوع كنص داخل template بدل script؛ قد يظهر النص أو يسبب تشخيص القالب، ولا ينفذ المفهوم المذكور. |
| nuxt-uaccordion | <UAccordion> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-ualert | <UAlert> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-uavatar | <UAvatar> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-ubadge | <UBadge> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-ubreadcrumb | <UBreadcrumb> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-ubutton | <UButton> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-ucard | <UCard> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-ucheckbox | <UCheckbox> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-ucommandpalette | <UCommandPalette> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-udrawer | <UDrawer> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-udropdownmenu | <UDropdownMenu> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-uform | <UForm> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-uformfield | <UFormField> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-uinput | <UInput> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-ukbd | <UKbd> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-umodal | <UModal> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-upagination | <UPagination> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-uprogress | <UProgress> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-uselect | <USelect> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-uskeleton | <USkeleton> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-uswitch | <USwitch> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-utable | <UTable> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-utabs | <UTabs> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-utextarea | <UTextarea> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| nuxt-utooltip | <UTooltip> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| html-a | <a> | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| html-audio | <audio> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «currentTrackUrl» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-button | <button> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «count» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-canvas | <canvas> | vue | يحتاج سياقًا | خطأ في مثال Vue: ref is not defined |
| html-class | class | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «isPrimary» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-details_summary | <details> / <summary> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «isOpen» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-dialog | <dialog> | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| html-div | <div> | vue | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-form | <form> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «formData» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-h1_-_h6 | <h1>-<h6> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «pageTitle» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-header_footer | <header> / <footer> | vue | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-iframe | <iframe> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «externalPreviewUrl» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-img | <img> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «item» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-input | <input> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «searchTerm» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-label | <label> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «fieldId» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-main | <main> | vue | غير مدعوم | خطأ في مثال Vue: المكوّن «router-view» غير متوفر. قد يحتاج Nuxt أو مكتبة أو ملفًا آخر. |
| html-nav | <nav> | vue | غير مدعوم | خطأ في مثال Vue: المكوّن «NuxtLink» غير متوفر. قد يحتاج Nuxt أو مكتبة أو ملفًا آخر. |
| html-option | <option> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «options» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-p | <p> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «item» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-section | <section> | vue | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-select | <select> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «activeCategory» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-span | <span> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «badgeClass» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-table | <table> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «rows» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-template | <template> | vue | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| html-ul_li | <ul> / <li> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «list» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| html-video | <video> | vue | يحتاج سياقًا | خطأ في مثال Vue: المتغير «src» غير معرّف في المثال. قد يكون هذا جزءًا يحتاج بيانات أو تعريفات إضافية. |
| css-animation_keyframes | animation & @keyframes | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-aspect-ratio | aspect-ratio | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-background | background | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-border_border-radius | border & border-radius | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-box-shadow | box-shadow | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-color | color | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-cursor | cursor | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-display | display | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-filter_blur_drop-shadow | filter (blur, drop-shadow) | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-flex_flexbox | flex (Flexbox) | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-gap | gap | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-grid_css_grid | grid (CSS Grid) | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-hover_focus | :hover & :focus | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-justify-content_align-items | justify-content & align-items | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-linear-gradient | linear-gradient | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-margin_padding | margin & padding | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-media | @media | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-opacity_backdrop-filter | opacity & backdrop-filter | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-overflow_overflow-x_y | overflow / overflow-x / y | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-position | position | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-scroll-behavior | scroll-behavior | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-transform_transition | transform & transition | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-user-select | user-select | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-width_height | width & height | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| css-z-index | z-index | vue | يحتوي خطأً | قواعد CSS متداخلة داخل .target-element وتستهدف أصنافًا لا توجد في القالب؛ عرض عنوان المعاينة ليس تطبيقًا للخاصية. |
| ts-primitive_types | Primitive Types | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-type_annotations | Type Annotations | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-type_inference | Type Inference | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-interface | interface | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-type_type_alias | type (Type Alias) | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-union_types | Union Types (\|) | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-intersection_types | Intersection Types (&) | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-generics_t | Generics (<T>) | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-type_narrowing_guards | Type Narrowing & Guards | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-utility_types_partial_t_required_t | Utility Types: Partial<T> & Required<T> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-utility_types_pick_t_omit_t | Utility Types: Pick<T> & Omit<T> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-utility_types_record_k_t | Utility Types: Record<K, T> | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-unknown_vs_any_vs_never | unknown vs any vs never | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-function_typing_signatures | Function Typing & Signatures | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-tuples_readonly_arrays | Tuples & Readonly Arrays | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-enums_numeric_string | Enums (Numeric & String) | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-defineprops_props | defineProps<Props>() | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-defineemits_emits | defineEmits<Emits>() | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-ref_t_reactive_typing | Ref<T> & reactive typing | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| ts-tsconfig_json | tsconfig.json | vue | غير مدعوم | المصدر يحتاج Nuxt/Nuxt UI أو TypeScript؛ Vue 3.4.21 المستقل ليس هذه البيئة ولا يقوم بفحص أنواع. |
| js-addeventlistener | addEventListener() | vanilla | يحتاج سياقًا | Cannot read properties of null (reading 'addEventListener') |
| js-arrow_function | Arrow Function (=>) | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-async_await | async / await | vanilla | يحتاج سياقًا | {} |
| js-bind_call_apply | bind() / call() / apply() | vanilla | يحتاج سياقًا | Cannot read properties of undefined (reading 'handleClick') |
| js-blob_filereader | Blob / FileReader | vanilla | يحتاج سياقًا | file is not defined |
| js-class | class | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-console_log | console.log | vanilla | يحتاج سياقًا | myVar is not defined |
| js-const | const | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-destructuring | Destructuring | vanilla | يحتاج سياقًا | user is not defined |
| js-export_import | export / import | vanilla | غير مدعوم | Vue: استيراد وتصدير داخل execute مع خلط ملفين، فلا يجتاز الصياغة. Vanilla: require/module تخص Node CommonJS غير المتوفر في المتصفح. |
| js-fetch | fetch() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-filter | filter() | vanilla | يحتاج سياقًا | users is not defined |
| js-find | find() | vanilla | يحتاج سياقًا | list is not defined |
| js-for_for_of | for / for...of | vanilla | يحتاج سياقًا | items is not defined |
| js-foreach | forEach() | vanilla | يحتاج سياقًا | list is not defined |
| js-function | function | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-getelementbyid | getElementById() | vanilla | يحتاج سياقًا | Cannot read properties of null (reading 'classList') |
| js-if_else | if / else | vanilla | يحتاج سياقًا | isLoggedIn is not defined |
| js-includes | includes() | vanilla | يحتاج سياقًا | str is not defined |
| js-json_stringify_parse | JSON.stringify / parse | vanilla | يحتاج سياقًا | Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag. |
| js-let | let | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-localstorage | localStorage | vanilla | غير مدعوم | الوصول للتخزين من إطار opaque ممنوع بسبب sandbox؛ لا ينبغي إضافة allow-same-origin لتشغيل هذا المثال. |
| js-map | map() | vanilla | يحتاج سياقًا | users is not defined |
| js-nullish_coalescing | Nullish Coalescing (??) | vanilla | يحتاج سياقًا | options is not defined |
| js-object_keys_entries | Object.keys/entries | vanilla | يحتاج سياقًا | obj is not defined |
| js-optional_chaining | Optional Chaining (?.) | vanilla | يحتاج سياقًا | order is not defined |
| js-promise | Promise | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-push_splice | push() / splice() | vanilla | يحتاج سياقًا | list is not defined |
| js-queryselector | querySelector() | vanilla | يحتاج سياقًا | Cannot read properties of null (reading 'classList') |
| js-reduce | reduce() | vanilla | يحتاج سياقًا | cart is not defined |
| js-return | return | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-set_map | Set / Map | vanilla | يحتاج سياقًا | arr is not defined |
| js-settimeout | setTimeout() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-spread | Spread (...) | vanilla | يحتاج سياقًا | arr1 is not defined |
| js-switch | switch | vanilla | يحتاج سياقًا | tab is not defined |
| js-template_literals | Template Literals | vanilla | يحتاج سياقًا | user is not defined |
| js-try_catch | try / catch | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-typeof | typeof | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-var | var | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-weakmap_weakset | WeakMap / WeakSet | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-xmlhttprequest | XMLHttpRequest | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-yield | yield | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-array_from_array_isarray | Array.from() / Array.isArray() | vanilla | يحتاج سياقًا | val is not defined |
| js-string_split_join | String.split() / join() | vanilla | يحتاج سياقًا | text is not defined |
| js-string_replace_replaceall | String.replace() / replaceAll() | vanilla | يحتاج سياقًا | text is not defined |
| js-math_random_math_floor | Math.random() / Math.floor() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-date_intl_datetimeformat | Date & Intl.DateTimeFormat | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-regexp_test_match | RegExp (test / match) | vanilla | يحتاج سياقًا | inputVal is not defined |
| js-debounce_throttle | Debounce & Throttle | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-intersectionobserver | IntersectionObserver | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-abortcontroller | AbortController | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-structuredclone | structuredClone() | vanilla | يحتاج سياقًا | obj is not defined |
| js-url_urlsearchparams | URL & URLSearchParams | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| js-clipboard_api_navigator_clipboard | Clipboard API (navigator.clipboard) | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-key | :key | vanilla | يحتاج سياقًا | listEl is not defined |
| vue-keepalive | <KeepAlive> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-slot | <slot> | vanilla | يحتاج سياقًا | renderCard is not defined |
| vue-teleport | <Teleport> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-transition | <Transition> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-computed | computed() | vanilla | يحتاج سياقًا | input is not defined |
| vue-defineasynccomponent | defineAsyncComponent() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-defineemits | defineEmits() | vanilla | يحتاج سياقًا | Cannot read properties of undefined (reading 'dispatchEvent') |
| vue-defineexpose | defineExpose() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-definemodel | defineModel() | vanilla | يحتاج سياقًا | defineProps is not defined |
| vue-defineprops | defineProps() | vanilla | يحتاج سياقًا | صيغة JavaScript غير صالحة. لا يدعم هذا المشغل TypeScript أو JSX: Unexpected token (2:36) |
| vue-nexttick | nextTick() | vanilla | يحتاج سياقًا | Uncaught ReferenceError: input is not defined خطأ متأخر مُسجل في pageerror؛ المثال يحتاج input معرّفًا قبل مؤقته. |
| vue-onmounted | onMounted() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-onunmounted | onUnmounted() | vanilla | يحتاج سياقًا | صيغة JavaScript غير صالحة. لا يدعم هذا المشغل TypeScript أو JSX: Missing semicolon. (2:15) |
| vue-provide_inject | provide() / inject() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-reactive | reactive() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-ref | ref() | vanilla | يحتاج سياقًا | btn is not defined |
| vue-shallowref_shallowreactive | shallowRef() / shallowReactive() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-toref_torefs | toRef() / toRefs() | vanilla | يحتاج سياقًا | reactive is not defined |
| vue-usefetch | useFetch() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-useslots_useattrs | useSlots() / useAttrs() | vanilla | يحتاج سياقًا | Cannot read properties of undefined (reading '$slots') |
| vue-usestate | useState() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-v-bind | v-bind (:) | vanilla | يحتاج سياقًا | img is not defined |
| vue-v-for | v-for | vanilla | يحتاج سياقًا | items is not defined |
| vue-v-if_v-else | v-if / v-else | vanilla | يحتاج سياقًا | loggedIn is not defined |
| vue-v-model | v-model | vanilla | يحتاج سياقًا | input is not defined |
| vue-v-on | v-on (@) | vanilla | يحتاج سياقًا | btn is not defined |
| vue-v-show | v-show | vanilla | يحتاج سياقًا | panel is not defined |
| vue-watch_watcheffect | watch() / watchEffect() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| vue-watchposteffect | watchPostEffect() | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-uaccordion | <UAccordion> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-ualert | <UAlert> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-uavatar | <UAvatar> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-ubadge | <UBadge> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-ubreadcrumb | <UBreadcrumb> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-ubutton | <UButton> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-ucard | <UCard> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-ucheckbox | <UCheckbox> | vanilla | يحتاج سياقًا | Cannot set properties of null (setting 'checked') |
| nuxt-ucommandpalette | <UCommandPalette> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-udrawer | <UDrawer> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-udropdownmenu | <UDropdownMenu> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-uform | <UForm> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-uformfield | <UFormField> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-uinput | <UInput> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-ukbd | <UKbd> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-umodal | <UModal> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-upagination | <UPagination> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-uprogress | <UProgress> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-uselect | <USelect> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-uskeleton | <USkeleton> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-uswitch | <USwitch> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-utable | <UTable> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-utabs | <UTabs> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-utextarea | <UTextarea> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| nuxt-utooltip | <UTooltip> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| html-a | <a> | vanilla | يحتاج سياقًا | عنصر ظاهر لكن مورده/تنقله خارجي أو مقيد بالعزل؛ لم يتحقق تشغيل الوسائط/التنقل الخارجي. |
| html-audio | <audio> | vanilla | يحتاج سياقًا | تعذر تحميل مورد يحتاجه المثال؛ تحقق من توفر ملفاته محليًا. ; تعذر تحميل مورد يحتاجه المثال؛ تحقق من توفر ملفاته محليًا. |
| html-button | <button> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-canvas | <canvas> | vanilla | يحتوي خطأً | إغلاق script مخزن حرفيًا <\/script> غير صالح كإغلاق HTML؛ لم يظهر الرسم المقصود. |
| html-class | class | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-details_summary | <details> / <summary> | vanilla | يحتاج سياقًا | ظهر HTML الأصلي، لكن دورة تفاعله الكاملة لم تُثبت في هذه الجولة؛ template خامَل بطبيعته ويحتاج تهيئة/استخدامًا. |
| html-dialog | <dialog> | vanilla | يحتاج سياقًا | ظهر HTML الأصلي، لكن دورة تفاعله الكاملة لم تُثبت في هذه الجولة؛ template خامَل بطبيعته ويحتاج تهيئة/استخدامًا. |
| html-div | <div> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-form | <form> | vanilla | يحتاج سياقًا | ظهر HTML الأصلي، لكن دورة تفاعله الكاملة لم تُثبت في هذه الجولة؛ template خامَل بطبيعته ويحتاج تهيئة/استخدامًا. |
| html-h1_-_h6 | <h1>-<h6> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-header_footer | <header> / <footer> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-iframe | <iframe> | vanilla | يحتاج سياقًا | عنصر ظاهر لكن مورده/تنقله خارجي أو مقيد بالعزل؛ لم يتحقق تشغيل الوسائط/التنقل الخارجي. |
| html-img | <img> | vanilla | يحتاج سياقًا | تعذر تحميل مورد يحتاجه المثال؛ تحقق من توفر ملفاته محليًا. |
| html-input | <input> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-label | <label> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-main | <main> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-nav | <nav> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-option | <option> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-p | <p> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-section | <section> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-select | <select> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-span | <span> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-table | <table> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-template | <template> | vanilla | يحتاج سياقًا | ظهر HTML الأصلي، لكن دورة تفاعله الكاملة لم تُثبت في هذه الجولة؛ template خامَل بطبيعته ويحتاج تهيئة/استخدامًا. |
| html-ul_li | <ul> / <li> | vanilla | يعمل | وجود العنصر الأصلي ومحتواه الفعلي في DOM بلا تشخيص خطأ. |
| html-video | <video> | vanilla | يحتاج سياقًا | تعذر تحميل مورد يحتاجه المثال؛ تحقق من توفر ملفاته محليًا. |
| css-animation_keyframes | animation & @keyframes | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-aspect-ratio | aspect-ratio | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-background | background | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-border_border-radius | border & border-radius | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-box-shadow | box-shadow | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-color | color | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-cursor | cursor | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-display | display | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-filter_blur_drop-shadow | filter (blur, drop-shadow) | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-flex_flexbox | flex (Flexbox) | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-gap | gap | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-grid_css_grid | grid (CSS Grid) | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-hover_focus | :hover & :focus | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-justify-content_align-items | justify-content & align-items | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-linear-gradient | linear-gradient | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-margin_padding | margin & padding | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-media | @media | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-opacity_backdrop-filter | opacity & backdrop-filter | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-overflow_overflow-x_y | overflow / overflow-x / y | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-position | position | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-scroll-behavior | scroll-behavior | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-transform_transition | transform & transition | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-user-select | user-select | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-width_height | width & height | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| css-z-index | z-index | vanilla | يحتاج سياقًا | CSS يستهدف أصنافًا من مشروع أصلي، ولا يحتوي المشغل على عناصرها المطابقة؛ صحة قواعد CSS وحدها لا تثبت الأثر. |
| ts-primitive_types | Primitive Types | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-type_annotations | Type Annotations | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-type_inference | Type Inference | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-interface | interface | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-type_type_alias | type (Type Alias) | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-union_types | Union Types (\|) | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-intersection_types | Intersection Types (&) | vanilla | يحتاج سياقًا | person is not defined |
| ts-generics_t | Generics (<T>) | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-type_narrowing_guards | Type Narrowing & Guards | vanilla | يحتوي خطأً | return خارج دالة في JavaScript. |
| ts-utility_types_partial_t_required_t | Utility Types: Partial<T> & Required<T> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-utility_types_pick_t_omit_t | Utility Types: Pick<T> & Omit<T> | vanilla | يحتاج سياقًا | fullUser is not defined |
| ts-utility_types_record_k_t | Utility Types: Record<K, T> | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-unknown_vs_any_vs_never | unknown vs any vs never | vanilla | يحتاج سياقًا | str is not defined |
| ts-function_typing_signatures | Function Typing & Signatures | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-tuples_readonly_arrays | Tuples & Readonly Arrays | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-enums_numeric_string | Enums (Numeric & String) | vanilla | يحتاج سياقًا | لم يثبت ناتج خاص بالمفهوم؛ قد يكون مقتطف تعريفات/مقارنة أو يحتاج سياق مشروعه. |
| ts-defineprops_props | defineProps<Props>() | vanilla | يحتاج سياقًا | defineProps is not defined |
| ts-defineemits_emits | defineEmits<Emits>() | vanilla | يحتاج سياقًا | defineEmits is not defined |
| ts-ref_t_reactive_typing | Ref<T> & reactive typing | vanilla | يحتاج سياقًا | ref is not defined |
| ts-tsconfig_json | tsconfig.json | vanilla | يحتوي خطأً | JSON خام يُرسل لمشغل JavaScript؛ ملف إعدادات ليس برنامجًا مستقلاً قابلاً للتنفيذ. |
