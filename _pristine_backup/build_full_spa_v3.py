# -*- coding: utf-8 -*-
"""
Builder for VueLexicon Pro V3
"""
import json
import sys

from lexicon_data_js import JS_ITEMS
from lexicon_data_vue import VUE_ITEMS
from lexicon_data_nuxt import NUXT_ITEMS
from lexicon_data_html import HTML_ITEMS
from lexicon_data_css import CSS_ITEMS

all_items = JS_ITEMS + VUE_ITEMS + NUXT_ITEMS + HTML_ITEMS + CSS_ITEMS
raw_json = json.dumps(all_items, ensure_ascii=False)
safe_raw_json = raw_json.replace("</script>", "<\\/script>")

print(f"Total items loaded: {len(all_items)}")
