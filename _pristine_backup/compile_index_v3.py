# -*- coding: utf-8 -*-
"""
Compiler script to assemble index.html from v3_parts
"""
import json
import os

from lexicon_data_js import JS_ITEMS
from lexicon_data_vue import VUE_ITEMS
from lexicon_data_nuxt import NUXT_ITEMS
from lexicon_data_html import HTML_ITEMS
from lexicon_data_css import CSS_ITEMS

all_items = JS_ITEMS + VUE_ITEMS + NUXT_ITEMS + HTML_ITEMS + CSS_ITEMS
raw_json = json.dumps(all_items, ensure_ascii=False)
safe_raw_json = raw_json.replace("</script>", "<\\/script>")

print(f"Total items loaded: {len(all_items)}")

part_files = [
    'v3_parts/1_head_and_styles.html',
    'v3_parts/2_header_and_nav.html',
    'v3_parts/3_search_and_filters.html',
    'v3_parts/4_master_detail_head.html',
    'v3_parts/5_css_widgets.html',
    'v3_parts/6_html_widgets.html',
    'v3_parts/7_js_vue_nuxt_widgets.html',
    'v3_parts/8_nuxt_lab.html',
    'v3_parts/9_scratchpad_studio.html',
    'v3_parts/10_quiz_and_footer.html'
]

html_parts = []
for pf in part_files:
    with open(pf, 'r', encoding='utf-8') as f:
        html_parts.append(f.read())

html_body = '\n'.join(html_parts)

with open('v3_parts/11_app_script.js', 'r', encoding='utf-8') as f:
    app_script = f.read()

full_html = f"""{html_body}

<!-- ==================================================== -->
<!-- APPLICATION LOGIC & DATA INJECTION                   -->
<!-- ==================================================== -->
<script>
const RAW_LEXICON_TUPLES = {safe_raw_json};

{app_script}
</script>
</body>
</html>"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(full_html)

print(f"index.html successfully compiled! File size: {len(full_html):,} bytes")
