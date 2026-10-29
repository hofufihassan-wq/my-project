# -*- coding: utf-8 -*-
"""
Generate lexicon-data.js with complete 160 items formatted as:
[
  category,
  term,
  arabicTitle,
  keywords,
  description,
  vueSfcCode,     # Primary code: Vue 3 Single File Component (<template>, <script setup>)
  syntaxInfo,
  returnProps,
  env,
  useCases,
  previewType,
  vanillaCode,    # UNO Reverse code: Vanilla JS / HTML / CSS
  compareNotes,
  docUrl
]
"""
import json
import sys

from lexicon_data_js import JS_ITEMS
from lexicon_data_vue import VUE_ITEMS
from lexicon_data_nuxt import NUXT_ITEMS
from lexicon_data_html import HTML_ITEMS
from lexicon_data_css import CSS_ITEMS

def format_vue_sfc(term, cat, vue_code, base_code):
    """Ensure the code is formatted as a true Vue 3 SFC"""
    code = (vue_code or "").strip()
    if not code or "<template>" not in code:
        if cat == 'js':
            code = f"""<template>
  <div class="demo-card p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-white">
    <h3 class="font-bold text-sm text-[#00DC82]">{term}</h3>
    <button @click="execute" class="mt-2 px-4 py-2 rounded-lg bg-[#00DC82] text-slate-950 font-bold text-xs">
      تشغيل الدالة تفاعلياً
    </button>
    <p v-if="result" class="mt-2 text-xs font-mono text-emerald-300">النتيجة: {{{{ result }}}}</p>
  </div>
</template>

<script setup>
import {{ ref }} from 'vue'

const result = ref('')

function execute() {{
  // كود Vue 3 التفاعلي لـ {term}:
  {base_code.strip()}
  result.value = 'تم التنفيذ بنجاح ✓'
}}
<\\/script>"""
        elif cat == 'css':
            code = f"""<template>
  <div class="css-demo-wrapper p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
    <div class="target-element p-4 rounded-xl font-bold text-white shadow-lg">
      معاينة خاصية {term}
    </div>
  </div>
</template>

<script setup>
// يتم تطبيق تنسيق {term} بنمط Scoped CSS أو Tailwind CSS
<\\/script>

<style scoped>
.target-element {{
  {base_code.strip()}
}}
</style>"""
        elif cat == 'html':
            code = f"""<template>
  <div class="html-demo p-4 rounded-xl bg-slate-900 border border-slate-800 text-white">
    {base_code.strip()}
  </div>
</template>

<script setup>
import {{ ref }} from 'vue'
const status = ref('نشط')
<\\/script>"""
        else:
            code = f"""<template>
  <div class="component-demo">
    {base_code.strip()}
  </div>
</template>

<script setup>
import {{ ref }} from 'vue'
<\\/script>"""
    return code

def format_vanilla(term, cat, vanilla_code, base_code):
    """Ensure vanilla code is clean and complete"""
    code = (vanilla_code or "").strip()
    if not code:
        code = (base_code or "").strip()
    return code

all_formatted_items = []

# Process JS Items (54)
for item in JS_ITEMS:
    cat, term, arTitle, kw, desc, codeEx, syntax, ret, env, useCases, pType, compJs, compVue, doc = item
    vue_sfc = format_vue_sfc(term, cat, compVue, codeEx)
    vanilla = format_vanilla(term, cat, compJs, codeEx)
    all_formatted_items.append([
        cat, term, arTitle, kw, desc, vue_sfc, syntax, ret, env, useCases, pType, vanilla,
        "التحويل من أسلوب Vue 3 SFC التفاعلي إلى Vanilla JS & DOM التقليدي", doc
    ])

# Process Vue Items (30)
for item in VUE_ITEMS:
    cat, term, arTitle, kw, desc, codeEx, syntax, ret, env, useCases, pType, compJs, compVue, doc = item
    vue_sfc = format_vue_sfc(term, cat, codeEx, compVue)
    vanilla = format_vanilla(term, cat, compJs, codeEx)
    all_formatted_items.append([
        cat, term, arTitle, kw, desc, vue_sfc, syntax, ret, env, useCases, pType, vanilla,
        "مقارنة بين Vue 3 Composition API وأسلوب DOM المباشر القديم", doc
    ])

# Process Nuxt Items (25)
for item in NUXT_ITEMS:
    cat, term, arTitle, kw, desc, codeEx, syntax, ret, env, useCases, pType, compJs, compVue, doc = item
    vue_sfc = format_vue_sfc(term, cat, codeEx, compVue)
    vanilla = format_vanilla(term, cat, compJs, codeEx)
    all_formatted_items.append([
        cat, term, arTitle, kw, desc, vue_sfc, syntax, ret, env, useCases, pType, vanilla,
        "مقارنة بين مكون Nuxt UI v3 الجاهز وعنصر HTML/CSS التقليدي المصنوع يدوياً", doc
    ])

# Process HTML Items (26)
for item in HTML_ITEMS:
    cat, term, arTitle, kw, desc, codeEx, syntax, ret, env, useCases, pType, compJs, compVue, doc = item
    vue_sfc = format_vue_sfc(term, cat, compVue, codeEx)
    vanilla = format_vanilla(term, cat, codeEx, compJs)
    all_formatted_items.append([
        cat, term, arTitle, kw, desc, vue_sfc, syntax, ret, env, useCases, pType, vanilla,
        "مقارنة بين استخدام التاق داخل مكون Vue 3 واستخدامه كعنصر HTML5 تقليدي نقي", doc
    ])

# Process CSS Items (25)
for item in CSS_ITEMS:
    cat, term, arTitle, kw, desc, codeEx, syntax, ret, env, useCases, pType, compJs, compVue, doc = item
    vue_sfc = format_vue_sfc(term, cat, compVue, codeEx)
    vanilla = format_vanilla(term, cat, codeEx, compJs)
    all_formatted_items.append([
        cat, term, arTitle, kw, desc, vue_sfc, syntax, ret, env, useCases, pType, vanilla,
        "مقارنة بين تطبيق التنسيق عبر Vue Scoped CSS/Tailwind وتطبيقه عبر ملف CSS تقليدي", doc
    ])

print(f"Total formatted items: {len(all_formatted_items)}")

# Convert to JSON with safe script escaping
json_str = json.dumps(all_formatted_items, ensure_ascii=False, indent=2)
safe_json = json_str.replace("</script>", "<\\/script>")

file_content = f"""/**
 * VueLexicon Pro v3 - Comprehensive Web Developer Lexicon Database
 * Total Items: {len(all_formatted_items)} terms (HTML5: 26, CSS3: 25, JS: 54, Vue 3: 30, Nuxt UI: 25)
 * Format:
 * [category, term, arabicTitle, keywords, description, vueSfcCode, syntaxInfo, returnProps, env, useCases, previewType, vanillaCode, compareNotes, docUrl]
 */

window.RAW_LEXICON_TUPLES = {safe_json};
"""

with open('lexicon-data.js', 'w', encoding='utf-8') as f:
    f.write(file_content)

print("lexicon-data.js successfully written!")
