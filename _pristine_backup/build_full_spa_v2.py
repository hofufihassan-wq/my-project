# -*- coding: utf-8 -*-
"""
Full SPA generator for VueLexicon Pro V2
"""
import json

from lexicon_data_js import JS_ITEMS
from lexicon_data_vue import VUE_ITEMS
from lexicon_data_nuxt import NUXT_ITEMS
from lexicon_data_html import HTML_ITEMS
from lexicon_data_css import CSS_ITEMS

all_items = JS_ITEMS + VUE_ITEMS + NUXT_ITEMS + HTML_ITEMS + CSS_ITEMS
raw_json = json.dumps(all_items, ensure_ascii=False)
safe_raw_json = raw_json.replace("</script>", "<\\/script>")

print(f"Total items loaded: {len(all_items)}")

html_template = """<!DOCTYPE html>
<html lang="ar" dir="rtl" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VueLexicon Pro — المترجم، القاموس، ومستشار Nuxt UI الشامل</title>
  <meta name="description" content="تطبيق ويب متكامل وتفاعلي يعمل كقاموس، مترجم، ومساعد ذكي شامل لمطوري الويب ومستشار لمكتبة Nuxt UI v3 و Vue 3">
  <meta name="theme-color" content="#020420">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300DC82'><path d='M12 2L2 19.5h5l5-9 5 9h5z'/></svg>">

  <!-- Google Fonts: Strictly 2 Elegant Fonts: IBM Plex Sans Arabic + JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#ecfdf5',
              100: '#d1fae5',
              400: '#34d399',
              500: '#00DC82',
              600: '#00b86b',
              700: '#047857',
              800: '#065f46',
              900: '#064e3b',
            },
            nuxt: {
              DEFAULT: '#00DC82',
              hover: '#00b86b',
              dark: '#064E3B',
              border: '#1e332c',
              bg: '#020420',
              surface: '#081022',
              card: '#0F172A',
              cardHover: '#131F37',
            }
          },
          fontFamily: {
            arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          boxShadow: {
            'nuxt-glow': '0 0 30px -5px rgba(0, 220, 130, 0.25)',
            'nuxt-glow-lg': '0 0 45px -5px rgba(0, 220, 130, 0.45)',
          }
        }
      }
    }
  </script>

  <!-- Vue 3 CDN (Production Global) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.21/vue.global.prod.min.js"></script>
  <script>
    if (typeof Vue === 'undefined') {
      document.write('<scr' + 'ipt src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></scr' + 'ipt>');
    }
  </script>
  <script>
    if (typeof Vue === 'undefined') {
      document.write('<scr' + 'ipt src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></scr' + 'ipt>');
    }
  </script>

  <style>
    [v-cloak] { display: none !important; }
    
    body {
      font-family: 'IBM Plex Sans Arabic', sans-serif;
      background-color: #020420;
      color: #F8FAFC;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #020420;
    }
    ::-webkit-scrollbar-thumb {
      background: #1e332c;
      border-radius: 9999px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #00DC82;
    }

    /* Search Input Alignment Requirement */
    .search-input-field {
      direction: ltr;
      text-align: right;
      unicode-bidi: plaintext;
    }

    /* Pulsing & Glowing Animation */
    @keyframes nuxtPulse {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.05); }
    }
    .animate-nuxt-pulse {
      animation: nuxtPulse 6s ease-in-out infinite;
    }

    /* Subtle ripple */
    @keyframes rippleAnim {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    .btn-ripple {
      position: relative;
      overflow: hidden;
    }
  </style>
</head>
<body class="bg-[#020420] text-slate-100 antialiased selection:bg-[#00DC82]/30 selection:text-white">

<div id="app" v-cloak class="min-h-screen flex flex-col relative overflow-x-hidden">

  <!-- Ambient Glowing Background Accents -->
  <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-[#00DC82]/15 via-[#00DC82]/5 to-transparent blur-3xl pointer-events-none -z-10 animate-nuxt-pulse"></div>
  <div class="fixed -bottom-40 -right-40 w-96 h-96 bg-[#064E3B]/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
  <div class="fixed -top-40 -left-40 w-96 h-96 bg-[#00DC82]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

  <!-- ========================================== -->
  <!-- 1. HEADER (الهيدر والشعار وشريط الإجراءات) -->
  <!-- ========================================== -->
  <header class="sticky top-0 z-40 backdrop-blur-xl bg-[#020420]/85 border-b border-[#1e332c] transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
      
      <!-- Brand Logo + Title -->
      <div class="flex items-center gap-3.5 cursor-pointer" @click="setAppMode('lexicon')">
        <div class="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#081022] to-[#0F172A] border border-[#1e332c] shadow-lg shadow-[#00DC82]/10 group hover:border-[#00DC82]/60 transition-all">
          <svg class="w-8 h-8 transition-transform group-hover:scale-105 duration-300" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="64,14 118,108 86,108 64,68 42,108 10,108" fill="url(#outerGrad)" />
            <polygon points="64,52 86,92 72,92 64,76 56,92 42,92" fill="#020420" />
            <text x="64" y="86" font-family="'JetBrains Mono', monospace" font-size="20" font-weight="bold" fill="#00DC82" text-anchor="middle">&lt;V/&gt;</text>
            <defs>
              <linearGradient id="outerGrad" x1="10" y1="14" x2="118" y2="108" gradientUnits="userSpaceOnUse">
                <stop stop-color="#00DC82"/>
                <stop offset="1" stop-color="#064E3B"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#00DC82] rounded-full shadow-[0_0_8px_#00DC82]"></div>
        </div>

        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span>VueLexicon</span>
              <span class="text-xs px-2 py-0.5 rounded-md bg-gradient-to-r from-[#00DC82] to-emerald-600 text-slate-950 font-extrabold uppercase shadow-sm">Pro</span>
            </h1>
            <span class="hidden md:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#00DC82]/10 text-[#00DC82] border border-[#00DC82]/30">
              <span class="w-1.5 h-1.5 rounded-full bg-[#00DC82] animate-ping"></span>
              +{{ rawLexiconData.length }} مصطلح ومكون
            </span>
          </div>
          <p class="text-xs text-gray-400 font-medium hidden sm:block">المرجع والمستشار الشامل لمطوري Vue 3 & Nuxt UI v3</p>
        </div>
      </div>

      <!-- Navigation & Mode Tabs -->
      <nav class="flex items-center gap-1 sm:gap-2">
        
        <!-- Mode: Lexicon -->
        <button
          @click="setAppMode('lexicon')"
          :class="appMode === 'lexicon' ? 'bg-[#00DC82]/15 text-[#00DC82] border-[#00DC82]/50 shadow-sm shadow-[#00DC82]/20' : 'text-gray-300 hover:text-white hover:bg-slate-800/60 border-transparent'"
          class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          <span class="hidden md:inline">المعجم والقاموس</span>
          <span class="md:hidden">المعجم</span>
        </button>

        <!-- Mode: Nuxt UI Advisor & Playground -->
        <button
          @click="setAppMode('nuxt-lab')"
          :class="appMode === 'nuxt-lab' ? 'bg-[#00DC82] text-slate-950 font-bold border-[#00DC82] shadow-lg shadow-[#00DC82]/30' : 'text-gray-300 hover:text-white hover:bg-slate-800/60 border-transparent'"
          class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all group"
        >
          <svg class="w-4 h-4" :class="appMode === 'nuxt-lab' ? 'text-slate-950' : 'text-emerald-400 group-hover:text-emerald-300'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
          <span>معمل ومستشار Nuxt UI</span>
          <span class="relative flex h-2 w-2 mr-1">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DC82] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-[#00DC82]"></span>
          </span>
        </button>

        <!-- Mode: Quiz Challenge -->
        <button
          @click="setAppMode('quiz')"
          :class="appMode === 'quiz' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : 'text-gray-300 hover:text-white hover:bg-slate-800/60 border-transparent'"
          class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all"
        >
          <span class="text-sm">🎯</span>
          <span class="hidden lg:inline">كويز المطورين</span>
        </button>

        <!-- Mode: Live Scratchpad -->
        <button
          @click="setAppMode('scratchpad')"
          :class="appMode === 'scratchpad' ? 'bg-sky-500/20 text-sky-400 border-sky-500/50' : 'text-gray-300 hover:text-white hover:bg-slate-800/60 border-transparent'"
          class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all"
        >
          <span class="text-sm">💻</span>
          <span class="hidden lg:inline">المحرر التجريبي</span>
        </button>

        <!-- Keyboard Shortcuts Help -->
        <button
          @click="showShortcutsModal = true"
          title="اختصارات لوحة المفاتيح (?)"
          class="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-gray-400 hover:text-white hover:border-[#00DC82]/50 transition-all text-xs font-mono"
        >
          ?
        </button>

      </nav>
    </div>
  </header>

  <!-- ==================================================== -->
  <!-- 2. HERO & SMART SEARCH SECTION (نسبة z-40 والأمان) -->
  <!-- ==================================================== -->
  <section class="relative z-40 pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    
    <div class="text-center max-w-3xl mx-auto mb-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/30 text-[#00DC82] text-xs font-medium mb-3">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path></svg>
        <span>محرك الإكمال التلقائي الذكي باللغتين العربية والإنجليزية</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
        ابحث عن أي دالة، تاق، أو مكون في <span class="text-[#00DC82] underline decoration-[#00DC82]/40 underline-offset-8">Vue 3 و Nuxt UI و JavaScript</span>
      </h2>
      <p class="text-sm sm:text-base text-gray-400 mt-2">
        اكتب بالإنجليزية مثل <code class="font-mono text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded">filter</code> أو <code class="font-mono text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded">&lt;UButton&gt;</code>، أو بالعربية مثل "دالة"، "تصفية"، "زر"، "جدول"
      </p>
    </div>

    <!-- Central Search Input Box -->
    <div class="max-w-3xl mx-auto relative">
      <div class="relative flex items-center">
        
        <!-- Magnifying Glass Icon (Fixed at Far Right) -->
        <div class="absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#00DC82] flex items-center justify-center">
          <svg class="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <!-- The Strict Input Field -->
        <input
          ref="searchInputRef"
          type="text"
          v-model="searchQuery"
          @focus="searchFocused = true"
          @blur="handleSearchBlur"
          @keydown.down.prevent="navigateDropdown(1)"
          @keydown.up.prevent="navigateDropdown(-1)"
          @keydown.enter.prevent="selectHighlightedDropdown"
          @keydown.esc="closeDropdown"
          placeholder="ابحث بالإنجليزية أو بالعربية (e.g. filter, computed, v-model, UButton, زر، مصفوفة)..."
          class="search-input-field w-full h-15 pr-14 pl-32 bg-[#081022] border-2 border-[#1e332c] focus:border-[#00DC82] focus:ring-4 focus:ring-[#00DC82]/20 rounded-2xl text-white placeholder-gray-500 text-base font-medium transition-all shadow-xl shadow-black/40 outline-none"
        />

        <!-- Left Controls (Clear button + Ctrl + K badge) -->
        <div class="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            v-if="searchQuery"
            @click="clearSearch"
            title="مسح البحث"
            class="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 transition-all text-xs font-bold"
          >
            ✕
          </button>

          <div class="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#020420] border border-slate-700 text-gray-400 text-xs font-mono select-none">
            <span class="text-[10px]">Ctrl</span>
            <span>+</span>
            <span class="text-[#00DC82] font-bold">K</span>
          </div>
        </div>

      </div>

      <!-- Instant Dropdown Menu (z-50 Opaque Hierarchy) -->
      <div
        v-if="showDropdown"
        class="absolute top-full mt-2 w-full z-50 bg-[#081022] border-2 border-[#1e332c] rounded-2xl shadow-2xl shadow-[#00DC82]/10 overflow-hidden backdrop-blur-2xl"
      >
        <div class="p-2 border-b border-[#1e332c] flex items-center justify-between text-xs text-gray-400 bg-[#020420]/60">
          <span>نتائج الإكمال التلقائي الفورية ({{ dropdownSuggestions.length }})</span>
          <span class="font-mono text-[11px]">استخدم الأسهم ↑ ↓ و Enter للاختيار</span>
        </div>

        <ul class="max-h-80 overflow-y-auto divide-y divide-slate-800/60" ref="dropdownListRef">
          
          <li
            v-for="(item, idx) in dropdownSuggestions"
            :key="item.id"
            @mouseenter="highlightedDropdownIndex = idx"
            @click="selectDropdownItem(item)"
            :class="highlightedDropdownIndex === idx ? 'bg-[#00DC82]/15 border-r-4 border-[#00DC82] text-white' : 'hover:bg-slate-800/40 text-gray-300'"
            class="px-4 py-3 flex items-center justify-between gap-3 cursor-pointer transition-colors"
          >
            <div class="flex items-center gap-3 min-w-0">
              <span :class="item.catColor.bg + ' ' + item.catColor.text + ' ' + item.catColor.border" class="text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold shrink-0">
                {{ item.categoryLabel }}
              </span>
              <div class="truncate">
                <span class="font-mono font-bold text-sm text-white tracking-wide" dir="ltr">{{ item.term }}</span>
                <span class="text-xs text-gray-400 mr-2">— {{ item.arabicTitle }}</span>
              </div>
            </div>

            <div class="shrink-0 flex items-center gap-2 text-xs text-gray-500">
              <span class="font-mono text-[11px] text-emerald-400/80">{{ item.letter }}</span>
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </li>

          <!-- Smart Dynamic Fallback Option if no direct match -->
          <li
            v-if="dropdownSuggestions.length === 0"
            @click="activateDynamicFallback"
            class="px-4 py-4 bg-emerald-950/20 hover:bg-emerald-950/40 cursor-pointer border-r-4 border-emerald-500 flex items-center justify-between"
          >
            <div>
              <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>⚡</span>
                <span>المترجم الذكي الاحتياطي: استكشف "{{ searchQuery }}"</span>
              </div>
              <p class="text-xs text-gray-400 mt-1">توليد بطاقة شرح ذكية وروابط توثيق رسمية للمصطلح فوراً</p>
            </div>
            <span class="text-xs font-mono text-emerald-400 bg-[#00DC82]/10 px-2.5 py-1 rounded-md border border-[#00DC82]/30">تحليل فوري ↗</span>
          </li>

        </ul>
      </div>

    </div>

  </section>

  <!-- ======================================================== -->
  <!-- 3. CATEGORY TABS & A-Z DIRECTORY (نسبة z-10 لمنع التداخل) -->
  <!-- ======================================================== -->
  <section v-if="appMode === 'lexicon'" class="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-6">
    
    <!-- Category Tabs -->
    <div class="flex flex-wrap items-center gap-2 border-b border-[#1e332c] pb-4">
      
      <button
        v-for="cat in categoriesList"
        :key="cat.id"
        @click="setCategory(cat.id)"
        :class="activeCategory === cat.id ? 'bg-[#00DC82] text-slate-950 font-bold shadow-lg shadow-[#00DC82]/20' : 'bg-slate-900/80 text-gray-300 hover:text-white hover:bg-slate-800 border border-slate-800'"
        class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all"
      >
        <span>{{ cat.name }}</span>
        <span
          :class="activeCategory === cat.id ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-gray-400'"
          class="text-[11px] font-mono px-2 py-0.5 rounded-full font-bold"
        >
          {{ getCategoryCount(cat.id) }}
        </span>
      </button>

    </div>

    <!-- A-Z Alphabetical Bar (LTR direction) -->
    <div class="mt-4 flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none" dir="ltr">
      
      <button
        @click="setLetter('ALL')"
        :class="selectedLetter === 'ALL' ? 'bg-[#00DC82] text-slate-950 font-bold' : 'bg-slate-900 text-gray-400 hover:text-white hover:bg-slate-800 border border-slate-800'"
        class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold shrink-0 transition-all"
      >
        ALL
      </button>

      <div class="flex items-center gap-1">
        <button
          v-for="letter in alphabetLetters"
          :key="letter"
          @click="setLetter(letter)"
          :disabled="!hasTermsForLetter(letter)"
          :class="[
            selectedLetter === letter ? 'bg-[#00DC82] text-slate-950 font-extrabold shadow-md shadow-[#00DC82]/30' : '',
            hasTermsForLetter(letter) && selectedLetter !== letter ? 'bg-slate-900/90 text-gray-300 hover:text-white hover:bg-slate-800 border border-slate-800' : '',
            !hasTermsForLetter(letter) ? 'opacity-30 cursor-not-allowed bg-slate-950/50 text-gray-600 border border-transparent' : ''
          ]"
          class="relative w-8 h-8 rounded-lg text-xs font-mono font-bold flex flex-col items-center justify-center transition-all shrink-0"
        >
          <span>{{ letter }}</span>
          <span
            v-if="hasTermsForLetter(letter) && selectedLetter !== letter"
            class="absolute bottom-1 w-1 h-1 rounded-full bg-[#00DC82] shadow-[0_0_4px_#00DC82]"
          ></span>
        </button>
      </div>

    </div>

  </section>

  <!-- ==================================================== -->
  <!-- 4. MASTER-DETAIL SPLIT VIEW (وضع المعجم الأساسي) -->
  <!-- ==================================================== -->
  <main v-if="appMode === 'lexicon'" class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- MASTER SIDEBAR (4 أعمدة يميناً في الواجهة العربية) -->
      <div class="lg:col-span-4 bg-[#081022]/90 border border-[#1e332c] rounded-2xl p-4 shadow-xl backdrop-blur-xl lg:sticky lg:top-24 max-h-[calc(100vh-140px)] flex flex-col">
        
        <!-- Sidebar Header with Count -->
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#1e332c]">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#00DC82]"></span>
            <span class="font-bold text-sm text-white">قائمة المصطلحات</span>
          </div>
          <span class="text-xs font-mono text-gray-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
            {{ filteredTermsList.length }} مصطلح
          </span>
        </div>

        <!-- Scrollable Term List -->
        <div class="flex-1 overflow-y-auto space-y-2 pr-1" style="max-height: calc(100vh - 240px);">
          
          <div
            v-for="item in filteredTermsList"
            :key="item.id"
            @click="selectTerm(item)"
            :class="selectedTerm?.id === item.id ? 'bg-[#0F172A] border-[#00DC82] shadow-md shadow-[#00DC82]/10 ring-1 ring-[#00DC82]' : 'bg-[#0B1324]/60 hover:bg-[#0F172A] border-[#1e332c] hover:border-slate-700'"
            class="p-3 rounded-xl border transition-all cursor-pointer group relative"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <span class="font-mono font-bold text-sm text-white group-hover:text-[#00DC82] transition-colors" dir="ltr">
                    {{ item.term }}
                  </span>
                </div>
                <p class="text-xs text-gray-400 truncate mt-1">{{ item.arabicTitle }}</p>
              </div>

              <!-- Category Badge + Bookmark Star -->
              <div class="flex items-center gap-1.5 shrink-0">
                <span :class="item.catColor.bg + ' ' + item.catColor.text + ' ' + item.catColor.border" class="text-[10px] font-mono px-1.5 py-0.5 rounded border">
                  {{ item.category.toUpperCase() }}
                </span>
                
                <button
                  @click.stop="toggleBookmark(item.id)"
                  :title="isBookmarked(item.id) ? 'إزالة من المفضلة' : 'حفظ في المفضلة'"
                  :class="isBookmarked(item.id) ? 'text-amber-400' : 'text-gray-600 hover:text-amber-400'"
                  class="p-1 rounded-md transition-colors"
                >
                  ★
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredTermsList.length === 0" class="py-12 text-center text-gray-400">
            <div class="text-4xl mb-3">🔍</div>
            <p class="font-bold text-white text-sm">لا توجد مصطلحات مطابقة لهذا الفلتر</p>
            <button @click="resetFilters" class="mt-3 text-xs text-[#00DC82] hover:underline">إعادة تعيين كافة الفلاتر</button>
          </div>

        </div>

      </div>

      <!-- DETAILED TERM VIEW (8 أعمدة يساراً - بطاقة الشرح المكتملة) -->
      <div v-if="selectedTerm" id="detailed-term-view" class="lg:col-span-8 bg-[#081022]/90 border border-[#1e332c] rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
        
        <!-- 1. Header of Detail View -->
        <div class="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#1e332c]">
          
          <div class="space-y-2">
            
            <div class="flex flex-wrap items-center gap-2.5">
              <span :class="selectedTerm.catColor.bg + ' ' + selectedTerm.catColor.text + ' ' + selectedTerm.catColor.border" class="text-xs font-mono px-2.5 py-1 rounded-lg border font-bold">
                {{ selectedTerm.categoryLabel }}
              </span>
              <span class="text-xs font-mono px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-gray-400">
                الحرف: <strong class="text-white">{{ selectedTerm.letter }}</strong>
              </span>
            </div>

            <!-- Code Term Name + Audio Pronunciation Button -->
            <div class="flex items-center gap-3">
              <h2 class="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-wide" dir="ltr">
                {{ selectedTerm.term }}
              </h2>

              <!-- Text-to-Speech Pronunciation Button -->
              <button
                @click="pronounceTerm(selectedTerm.term)"
                :title="'استمع لنطق ' + selectedTerm.term"
                class="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-[#1e332c] hover:border-[#00DC82]/60 text-gray-300 hover:text-[#00DC82] transition-all flex items-center justify-center group"
              >
                <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                </svg>
              </button>
            </div>

            <p class="text-lg text-[#00DC82] font-semibold">{{ selectedTerm.arabicTitle }}</p>
          </div>

          <!-- Actions: Favorite Toggle + Official Docs Link -->
          <div class="flex items-center gap-2">
            
            <button
              @click="toggleBookmark(selectedTerm.id)"
              :class="isBookmarked(selectedTerm.id) ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : 'bg-slate-900 text-gray-300 hover:text-white border-slate-700'"
              class="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all"
            >
              <span>{{ isBookmarked(selectedTerm.id) ? '★ في المفضلة' : '☆ حفظ بالمفضلة' }}</span>
            </button>

            <a
              :href="selectedTerm.docUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#00DC82]/10 hover:bg-[#00DC82]/20 text-[#00DC82] border border-[#00DC82]/40 text-xs font-semibold transition-all"
            >
              <span>التوثيق الرسمي</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>

          </div>

        </div>

        <!-- 2. Cheat Sheet Badges (3 بطاقات مصغرة) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div class="p-3 rounded-xl bg-[#0F172A] border border-[#1e332c]">
            <span class="text-[11px] text-gray-400 font-medium block">الصيغة ونوع التصريح:</span>
            <span class="text-xs font-mono font-bold text-white mt-1 block truncate" dir="ltr">{{ selectedTerm.syntaxInfo }}</span>
          </div>

          <div class="p-3 rounded-xl bg-[#0F172A] border border-[#1e332c]">
            <span class="text-[11px] text-gray-400 font-medium block">القيمة المرجعة / الخصائص:</span>
            <span class="text-xs font-mono font-bold text-emerald-400 mt-1 block truncate" dir="ltr">{{ selectedTerm.returnProps }}</span>
          </div>

          <div class="p-3 rounded-xl bg-[#0F172A] border border-[#1e332c]">
            <span class="text-[11px] text-gray-400 font-medium block">بيئة العمل والتوافق:</span>
            <span class="text-xs font-medium text-gray-200 mt-1 block truncate">{{ selectedTerm.env }}</span>
          </div>

        </div>

        <!-- 3. Translation & Functional Meaning -->
        <div class="space-y-2">
          <h3 class="text-sm font-bold text-gray-300 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#00DC82]"></span>
            <span>الشرح الوافي والمعنى الوظيفي</span>
          </h3>
          <p class="text-sm sm:text-base text-gray-300 leading-relaxed bg-[#0B1324]/60 p-4 rounded-xl border border-slate-800">
            {{ selectedTerm.description }}
          </p>
        </div>

        <!-- 4. Practical Use Cases (متى نستخدمها في المشاريع؟) -->
        <div class="space-y-2">
          <h3 class="text-sm font-bold text-gray-300 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>متى نستخدمها في المشاريع الحقيقية؟</span>
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div
              v-for="(useCase, idx) in selectedTerm.useCases"
              :key="idx"
              class="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-gray-300"
            >
              <span class="text-[#00DC82] font-bold">✓</span>
              <span>{{ useCase }}</span>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- 5. THE DUAL PRESENTATION BOXES (الكود + ما يراه المستخدم) -->
        <!-- ======================================================== -->
        <div class="space-y-6 pt-2">
          
          <div class="border-t border-[#1e332c] pt-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-extrabold text-white flex items-center gap-2">
                <span>⚡</span>
                <span>التطبيق العملي: كود المصدر مقابل ما يراه المستخدم في الويب</span>
              </h3>
              <div class="flex items-center gap-2 text-xs font-mono">
                <button
                  @click="detailTab = 'code'"
                  :class="detailTab === 'code' ? 'bg-[#00DC82] text-slate-950 font-bold' : 'bg-slate-800 text-gray-300 hover:text-white'"
                  class="px-3 py-1 rounded-lg transition-all"
                >
                  المعاينة التفاعلية
                </button>
                <button
                  @click="detailTab = 'compare'"
                  :class="detailTab === 'compare' ? 'bg-[#00DC82] text-slate-950 font-bold' : 'bg-slate-800 text-gray-300 hover:text-white'"
                  class="px-3 py-1 rounded-lg transition-all"
                >
                  مقارنة Vanilla vs Vue 3
                </button>
              </div>
            </div>

            <!-- Tab 1: Practical Code + Frontend Visual Result (ما يراه المستخدم في المتصفح) -->
            <div v-if="detailTab === 'code'" class="space-y-5">
              
              <!-- BOX 1: The Code Snippet Box (سطر/صندوق كتابة الكود) -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs text-gray-400">
                  <span class="font-bold flex items-center gap-1.5 text-emerald-400">
                    <span>📝</span>
                    <span>1. كود المصدر (Source Code):</span>
                  </span>
                  <span class="font-mono text-[11px] text-gray-500" dir="ltr">example.js / component.vue</span>
                </div>

                <div class="relative rounded-2xl bg-[#020420] border-2 border-[#1e332c] overflow-hidden shadow-inner">
                  <div class="px-4 py-2.5 bg-[#081022] border-b border-[#1e332c] flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                      <span class="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                      <span class="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                      <span class="text-xs font-mono text-gray-400 mr-2" dir="ltr">script.js</span>
                    </div>

                    <button
                      @click="copyCode(selectedTerm.codeExample)"
                      class="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-slate-800 hover:bg-[#00DC82] text-gray-300 hover:text-slate-950 transition-all font-semibold"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      <span>نسخ الكود</span>
                    </button>
                  </div>

                  <pre class="p-4 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed" dir="ltr"><code>{{ selectedTerm.codeExample }}</code></pre>
                </div>
              </div>

              <!-- BOX 2: The Rendered Frontend Box (ما يراه المستخدم في شاشة المتصفح والواجهة) -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold flex items-center gap-1.5 text-[#00DC82]">
                    <span>🖥️</span>
                    <span>2. ما يراه المستخدم في المتصفح والواجهة (Frontend Rendered View):</span>
                  </span>
                  <span class="inline-flex items-center gap-1 text-[11px] font-mono text-[#00DC82] bg-[#00DC82]/10 px-2 py-0.5 rounded border border-[#00DC82]/30">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#00DC82] animate-ping"></span>
                    معاينة حية تفاعلية
                  </span>
                </div>

                <div class="p-5 rounded-2xl bg-gradient-to-br from-[#0B1324] to-[#0F172A] border-2 border-[#1e332c] shadow-2xl relative overflow-hidden">
                  
                  <!-- Explanatory Header of Frontend Widget -->
                  <div class="pb-3 mb-3 border-b border-slate-800 text-xs text-gray-400 flex items-center justify-between">
                    <span>جرّب التفاعل مع العنصر بالأسفل لمشاهدة كيف يغير هذا الكود شكل الواجهة:</span>
                    <span class="font-mono text-emerald-400 text-[11px]">User Interface Result</span>
                  </div>

                  <!-- WIDGET 1: JS Filter Demo (تصفية حية) -->
                  <div v-if="selectedTerm.previewType === 'js_filter'" class="space-y-3">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs text-gray-400">تصفية حسب الدور:</span>
                        <button
                          v-for="role in ['الكل', 'مطور واجهات', 'مصمم UI', 'مدير تقني']"
                          :key="role"
                          @click="jsFilterRole = role"
                          :class="jsFilterRole === role ? 'bg-[#00DC82] text-slate-950 font-bold' : 'bg-slate-800 text-gray-300 hover:text-white'"
                          class="px-2.5 py-1 rounded-lg text-xs transition-all"
                        >
                          {{ role }}
                        </button>
                      </div>
                      <input
                        type="text"
                        v-model="jsFilterSearch"
                        placeholder="بحث بالاسم..."
                        class="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white outline-none focus:border-[#00DC82]"
                      />
                    </div>

                    <!-- Filtered Cards Output -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                      <div
                        v-for="user in filteredJsUsers"
                        :key="user.id"
                        class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 transition-all hover:border-[#00DC82]/50"
                      >
                        <div class="flex items-center justify-between">
                          <span class="font-bold text-white">{{ user.name }}</span>
                          <span class="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">{{ user.role }}</span>
                        </div>
                        <p class="text-gray-400 text-[11px]">خبرة: {{ user.exp }} سنوات</p>
                      </div>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: تختفي الكروت غير المطابقة وتظهر فقط الكروت الناتجة عن مصفوفة filter() فوراً في الصفحة!</p>
                  </div>

                  <!-- WIDGET 2: JS Map Demo (تحويل عملة ديناميكي) -->
                  <div v-else-if="selectedTerm.previewType === 'js_map'" class="space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-300 font-bold">قائمة المنتجات (تحويل الأسعار بدالة map):</span>
                      <button
                        @click="jsMapCurrency = jsMapCurrency === 'USD' ? 'SAR' : 'USD'"
                        class="px-3 py-1.5 rounded-xl bg-[#00DC82] text-slate-950 text-xs font-bold hover:bg-[#00b86b] transition-all flex items-center gap-1.5"
                      >
                        <span>تبديل العملة: {{ jsMapCurrency === 'USD' ? 'إلى ريال سعودي (SAR)' : 'إلى دولار (USD)' }}</span>
                        <span>🔄</span>
                      </button>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div
                        v-for="prod in mappedProducts"
                        :key="prod.name"
                        class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5"
                      >
                        <span class="font-bold text-white block">{{ prod.name }}</span>
                        <div class="flex items-center justify-between pt-1">
                          <span class="text-gray-400 text-[11px]">السعر النهائي:</span>
                          <span class="font-mono font-bold text-emerald-400 text-sm">{{ prod.formattedPrice }}</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: تطبيق دالة map() يقوم بإعادة حساب السعر وتعديل النصوص الظاهرة داخل كافة البطاقات بلمح البصر!</p>
                  </div>

                  <!-- WIDGET 3: JS Reduce Demo (سلة التسوق وحساب الفاتورة) -->
                  <div v-else-if="selectedTerm.previewType === 'js_reduce'" class="space-y-3">
                    <div class="space-y-2">
                      <div
                        v-for="item in jsCartItems"
                        :key="item.id"
                        class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                      >
                        <div class="flex items-center gap-2">
                          <span class="font-bold text-white">{{ item.title }}</span>
                          <span class="text-gray-400 font-mono">({{ item.price }}$)</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <button @click="decreaseCartQty(item)" class="w-6 h-6 rounded bg-slate-800 text-white font-bold hover:bg-slate-700">-</button>
                          <span class="font-mono font-bold text-white w-4 text-center">{{ item.qty }}</span>
                          <button @click="item.qty++" class="w-6 h-6 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400">+</button>
                        </div>
                      </div>
                    </div>

                    <!-- Total Invoice Box calculated with reduce() -->
                    <div class="flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm">
                      <span class="font-bold text-white">إجمالي الفاتورة المحسوب بواسطة reduce():</span>
                      <span class="text-lg font-mono font-black text-[#00DC82]">${{ jsCartTotal }}</span>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: دالة reduce() تجمع الكميات والأسعار وتُخرج رقماً نهائياً يُعرض داخل صندوق الإجمالي لحظة النقر!</p>
                  </div>

                  <!-- WIDGET 4: JS Event Listener Demo (مستمع الأحداث التفاعلي) -->
                  <div v-else-if="selectedTerm.previewType === 'js_event_listener'" class="space-y-3">
                    <div class="flex flex-wrap items-center gap-3">
                      <button
                        @click="handleJsButtonClick($event)"
                        class="px-5 py-2.5 rounded-xl bg-[#00DC82] hover:bg-[#00b86b] text-slate-950 font-bold text-sm shadow-lg shadow-[#00DC82]/20 active:scale-95 transition-all flex items-center gap-2"
                      >
                        <span>⚡ انقر لتجربة addEventListener</span>
                      </button>
                      <span class="text-xs text-gray-400">إجمالي النقرات المسجلة: <strong class="text-white font-mono">{{ jsClickCount }}</strong></span>
                    </div>

                    <!-- Event Terminal Log -->
                    <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1 text-gray-300">
                      <div class="text-[#00DC82] font-bold">سجل الحدث الحي (Event Object Inspector):</div>
                      <div>النوع (type): <span class="text-yellow-400">{{ jsEventLog.type || 'لم يتم النقر بعد' }}</span></div>
                      <div>إحداثيات الفأرة: <span class="text-sky-400">X: {{ jsEventLog.x }}, Y: {{ jsEventLog.y }}</span></div>
                      <div>الوقت: <span class="text-emerald-300">{{ jsEventLog.time || '--:--:--' }}</span></div>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: عند النقر، يلتقط المتصفح الحدث وينفذ الدالة ويرسم الاستجابة ويزيد العداد فوراً!</p>
                  </div>

                  <!-- WIDGET 5: JS Fetch & API Demo (جلب البيانات غير المتزامن) -->
                  <div v-else-if="selectedTerm.previewType === 'js_fetch'" class="space-y-3">
                    <div class="flex items-center justify-between">
                      <button
                        @click="triggerJsFetch"
                        :disabled="jsFetchLoading"
                        class="px-4 py-2 rounded-xl bg-[#00DC82] text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-[#00b86b] disabled:opacity-50"
                      >
                        <svg v-if="jsFetchLoading" class="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" class="opacity-75"></path></svg>
                        <span>{{ jsFetchLoading ? 'جاري الاتصال بالسيرفر...' : 'طلب بيانات مستخدم جديد (Fetch)' }}</span>
                      </button>
                      <span class="text-xs text-gray-400">محاكاة استجابة حقيقية</span>
                    </div>

                    <!-- Resulting User Profile Card -->
                    <div v-if="jsFetchedUser" class="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 flex items-center gap-4">
                      <img :src="jsFetchedUser.avatar" class="w-12 h-12 rounded-full border-2 border-[#00DC82]" alt="User Avatar" />
                      <div class="text-xs space-y-1">
                        <span class="font-bold text-white text-sm block">{{ jsFetchedUser.name }}</span>
                        <span class="text-gray-400 block font-mono">{{ jsFetchedUser.email }}</span>
                        <span class="text-[#00DC82] font-mono text-[10px]">الحالة: مسجل وموثق ✓</span>
                      </div>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: يظهر مؤشر تحميل دوار، ثم تتبدل الواجهة فجأة لتظهر بيانات المستخدم القادمة من السيرفر!</p>
                  </div>

                  <!-- WIDGET 6: JS Array Push / Splice Demo (مدير المهام الحي) -->
                  <div v-else-if="selectedTerm.previewType === 'js_array_push'" class="space-y-3">
                    <div class="flex items-center gap-2">
                      <input
                        type="text"
                        v-model="jsNewTaskText"
                        @keyup.enter="jsAddTask"
                        placeholder="اكتب مهمة جديدة ثم اضغط Enter..."
                        class="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#00DC82]"
                      />
                      <button @click="jsAddTask" class="px-4 py-2 bg-[#00DC82] text-slate-950 font-bold text-xs rounded-xl hover:bg-[#00b86b]">
                        إضافة (push) +
                      </button>
                    </div>

                    <ul class="space-y-1.5 max-h-36 overflow-y-auto">
                      <li
                        v-for="(task, idx) in jsTaskList"
                        :key="task"
                        class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs"
                      >
                        <span class="text-gray-300">#{{ idx + 1 }} {{ task }}</span>
                        <button @click="removeJsTask(idx)" class="text-red-400 hover:text-red-300 text-xs px-2 py-0.5 rounded bg-red-500/10">
                          حذف (splice) ✕
                        </button>
                      </li>
                    </ul>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: استخدام push() يضيف صفاً جديداً للقائمة أمام عينه، واستخدام splice() يحذف الصف المحدد فوراً!</p>
                  </div>

                  <!-- WIDGET 7: JS LocalStorage Demo (الحفظ الدائم) -->
                  <div v-else-if="selectedTerm.previewType === 'js_localstorage'" class="space-y-3">
                    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-300 font-bold">تفضيل سمة التطبيق المحفوظة محلياً:</span>
                        <div class="flex gap-2">
                          <button
                            @click="saveThemePref('emerald')"
                            :class="jsThemePref === 'emerald' ? 'bg-[#00DC82] text-slate-950 font-bold' : 'bg-slate-800 text-gray-300'"
                            class="px-3 py-1 rounded-lg text-xs"
                          >
                            زمردي Nuxt
                          </button>
                          <button
                            @click="saveThemePref('midnight')"
                            :class="jsThemePref === 'midnight' ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-gray-300'"
                            class="px-3 py-1 rounded-lg text-xs"
                          >
                            ليلي أزرق
                          </button>
                        </div>
                      </div>
                      <div class="text-[11px] text-[#00DC82] font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                        <span>القيمة المخزنة في المتصفح: <strong>{{ jsThemePref }}</strong></span>
                        <span>localStorage.getItem('app_theme')</span>
                      </div>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: حتى لو أغلقت الصفحة وأعدت فتحها، سيتذكر المتصفح اختيارك المخزن في localStorage!</p>
                  </div>

                  <!-- WIDGET 8: JS SetTimeout Demo (المؤقت التفاعلي) -->
                  <div v-else-if="selectedTerm.previewType === 'js_settimeout'" class="space-y-3">
                    <div class="flex items-center justify-between">
                      <button
                        @click="startJsTimer"
                        :disabled="jsTimerRunning"
                        class="px-4 py-2 rounded-xl bg-[#00DC82] text-slate-950 font-bold text-xs hover:bg-[#00b86b] disabled:opacity-50"
                      >
                        {{ jsTimerRunning ? 'المؤقت قيد التشغيل (انتظر 2 ثانية)...' : 'تشغيل setTimeout (تأخير 2 ثانية)' }}
                      </button>
                      <span class="text-xs font-mono text-gray-400">{{ jsTimerFinished ? 'اكتمل بنجاح ✓' : 'في الانتظار' }}</span>
                    </div>

                    <div v-if="jsTimerRunning" class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div class="bg-[#00DC82] h-full transition-all duration-[2000ms] w-full"></div>
                    </div>

                    <div v-if="jsTimerFinished" class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between animate-bounce">
                      <span>🎉 ظهرت هذه الرسالة للمستخدم بعد مرور 2000ms تماماً عبر setTimeout!</span>
                      <button @click="jsTimerFinished = false" class="text-gray-400">✕</button>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: لا يتجمد المتصفح، وبعد انقضاء الوقت المحدد بدقة، ينبثق التنبيه أو تكتمل العملية!</p>
                  </div>

                  <!-- WIDGET 9: JS Regex Demo (فاحص الأنماط) -->
                  <div v-else-if="selectedTerm.previewType === 'js_regex'" class="space-y-3">
                    <label class="text-xs text-gray-300 block">اكتب كلمة مرور لتجربة فحص RegExp.test():</label>
                    <input
                      type="text"
                      v-model="jsRegexInput"
                      placeholder="اكتب كلمة مرور (مثال: VuePro2026)..."
                      class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#00DC82]"
                    />
                    
                    <div class="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                      <span :class="jsRegexInput.length >= 8 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-800 text-gray-500 border-slate-700'" class="p-2 rounded-lg border text-center">
                        {{ jsRegexInput.length >= 8 ? '✓' : '○' }} 8 خانات على الأقل
                      </span>
                      <span :class="/[A-Z]/.test(jsRegexInput) ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-800 text-gray-500 border-slate-700'" class="p-2 rounded-lg border text-center">
                        {{ /[A-Z]/.test(jsRegexInput) ? '✓' : '○' }} حرف كبير (A-Z)
                      </span>
                      <span :class="/[0-9]/.test(jsRegexInput) ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-800 text-gray-500 border-slate-700'" class="p-2 rounded-lg border text-center">
                        {{ /[0-9]/.test(jsRegexInput) ? '✓' : '○' }} رقم واحد على الأقل
                      </span>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: تضيء الشارات باللون الأخضر فور تطابق النص مع التعبير النمطي RegExp!</p>
                  </div>

                  <!-- WIDGET 10: JS Math Random Demo (توليد رقم ولون عشوائي) -->
                  <div v-else-if="selectedTerm.previewType === 'js_math_random'" class="space-y-3">
                    <div class="flex items-center justify-between">
                      <button
                        @click="rollRandomNumber"
                        class="px-4 py-2 rounded-xl bg-[#00DC82] text-slate-950 font-bold text-xs hover:bg-[#00b86b] transition-all"
                      >
                        🎲 رمي النرد وتوليد رقم عشوائي
                      </button>
                      <span class="text-xs text-gray-400">المدى: من 1 إلى 100</span>
                    </div>

                    <div
                      :style="{ backgroundColor: jsRandomBgColor }"
                      class="h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-inner"
                    >
                      <span class="text-4xl font-mono font-black text-white drop-shadow-md">{{ jsRandomNumber }}</span>
                      <span class="text-[10px] text-white/80 font-mono mt-1">كود اللون: {{ jsRandomBgColor }}</span>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: كل نقرة تولد قيمة جديدة تتغير معها أرقام وألوان الواجهة فوراً!</p>
                  </div>

                  <!-- WIDGET 11: JS Date & Intl Demo (الساعة والتقويم العربي) -->
                  <div v-else-if="selectedTerm.previewType === 'js_date_intl'" class="space-y-3">
                    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
                      <span class="text-xs text-gray-400 block">التاريخ والوقت بتنسيق عربي عبر Intl.DateTimeFormat:</span>
                      <div class="text-lg sm:text-xl font-bold text-emerald-400">{{ jsFormattedDate }}</div>
                      <div class="text-xs font-mono text-gray-400">{{ jsCurrentTime }}</div>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: تاريخ عربي فصيح منسق محلياً مع تحديث الثواني بدقة!</p>
                  </div>

                  <!-- WIDGET 12: JS String Split / Join Demo (صانع الوسوم) -->
                  <div v-else-if="selectedTerm.previewType === 'js_string_split'" class="space-y-3">
                    <label class="text-xs text-gray-300 block">اكتب كلمات مفصولة بفاصلة لتجربة split():</label>
                    <input
                      type="text"
                      v-model="jsTagsInput"
                      placeholder="Vue, Nuxt, Tailwind, JavaScript..."
                      class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#00DC82]"
                    />
                    
                    <div class="flex flex-wrap gap-2 pt-1">
                      <span
                        v-for="tag in jsTagsArray"
                        :key="tag"
                        class="px-2.5 py-1 rounded-lg bg-[#00DC82]/15 border border-[#00DC82]/40 text-[#00DC82] text-xs font-mono font-bold"
                      >
                        🏷️ {{ tag.trim() }}
                      </span>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: يتحول النص المكتوب تلقائياً إلى شارات ووسوم ملونة مصفوفة في الصفحة!</p>
                  </div>

                  <!-- WIDGET 13: JS JSON Stringify & Parse Demo -->
                  <div v-else-if="selectedTerm.previewType === 'js_json'" class="space-y-3">
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="text-[11px] text-gray-400 block mb-1">اسم المطور:</label>
                        <input type="text" v-model="jsUserData.name" class="w-full p-2 bg-slate-800 rounded-lg text-xs text-white border border-slate-700 outline-none" />
                      </div>
                      <div>
                        <label class="text-[11px] text-gray-400 block mb-1">المكتبة المفضلة:</label>
                        <input type="text" v-model="jsUserData.role" class="w-full p-2 bg-slate-800 rounded-lg text-xs text-white border border-slate-700 outline-none" />
                      </div>
                    </div>

                    <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto" dir="ltr">
                      {{ JSON.stringify(jsUserData, null, 2) }}
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: مدخلات الحقول تتحول مباشرة إلى كائن JSON وتُرسل أو تُستعاد دون تأخير!</p>
                  </div>

                  <!-- WIDGET 14: JS Debounce Demo -->
                  <div v-else-if="selectedTerm.previewType === 'js_debounce'" class="space-y-3">
                    <label class="text-xs text-gray-300 block">اكتب بسرعة لملاحظة الفرق بين النبضات والاستدعاء الفعلي:</label>
                    <input
                      type="text"
                      @input="handleDebounceInput"
                      placeholder="اكتب أي نص بسرعة..."
                      class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#00DC82]"
                    />
                    <div class="grid grid-cols-2 gap-3 pt-1">
                      <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span class="text-xs text-gray-400 block">ضربات المفاتيح (Keystrokes):</span>
                        <span class="text-xl font-mono font-bold text-amber-400">{{ jsKeystrokeCount }}</span>
                      </div>
                      <div class="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-center">
                        <span class="text-xs text-gray-400 block">طلبات البحث الفعلية (Debounced):</span>
                        <span class="text-xl font-mono font-bold text-[#00DC82]">{{ jsDebounceTriggerCount }}</span>
                      </div>
                    </div>
                    <p class="text-[11px] text-gray-400 italic">💡 ما يراه المستخدم: رغم كتابة 20 حرفاً، ينتظر المتصفح حتى تتوقف ثم يرسل طلباً واحداً موفراً الموارد!</p>
                  </div>

                  <!-- WIDGET 15: Vue Counter Demo -->
                  <div v-else-if="selectedTerm.previewType === 'vue_counter' || selectedTerm.previewType === 'counter'" class="flex flex-wrap items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <button @click="demoCounter--" class="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg">-</button>
                    <div class="text-center px-4">
                      <span class="text-2xl font-mono font-black text-[#00DC82]">{{ demoCounter }}</span>
                      <span class="block text-[11px] text-gray-400">القيمة التفاعلية (Ref)</span>
                    </div>
                    <button @click="demoCounter++" class="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg">+</button>
                    <div class="mr-auto text-xs font-mono text-gray-300">
                      الحالة: <span class="text-[#00DC82] font-bold">{{ demoCounter % 2 === 0 ? 'العدد زوجي ✓' : 'العدد فردي ✗' }}</span>
                    </div>
                  </div>

                  <!-- WIDGET 16: Vue Model / Input Demo -->
                  <div v-else-if="selectedTerm.previewType === 'vue_model' || selectedTerm.previewType === 'input'" class="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <input
                      type="text"
                      v-model="demoInputText"
                      placeholder="اكتب لتجربة الربط التفاعلي v-model..."
                      class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:border-[#00DC82] outline-none"
                    />
                    <div class="p-3 bg-slate-950 rounded-lg text-xs font-mono flex items-center justify-between text-gray-300">
                      <span>المعكوس: <strong class="text-emerald-400" dir="ltr">{{ demoInputText.split('').reverse().join('') }}</strong></span>
                      <span>طول النص: <strong class="text-[#00DC82]">{{ demoInputText.length }}</strong></span>
                    </div>
                  </div>

                  <!-- WIDGET 17: Vue Alert Demo -->
                  <div v-else-if="selectedTerm.previewType === 'vue_alert' || selectedTerm.previewType === 'alert'" class="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-400">حالة التنبيه المشروط:</span>
                      <button @click="demoAlertVisible = !demoAlertVisible" class="text-xs px-3 py-1 rounded bg-[#00DC82]/20 text-[#00DC82]">
                        {{ demoAlertVisible ? 'إخفاء التنبيه' : 'إظهار التنبيه' }}
                      </button>
                    </div>
                    <div v-if="demoAlertVisible" class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-emerald-300 text-xs sm:text-sm">
                      <div class="flex items-center gap-2">
                        <span>✓</span>
                        <span>تنبيه شرطي تفاعلي ظاهر في DOM بنجاح!</span>
                      </div>
                      <button @click="demoAlertVisible = false" class="text-gray-400 hover:text-white">✕</button>
                    </div>
                  </div>

                  <!-- WIDGET 18: Vue Switch Demo -->
                  <div v-else-if="selectedTerm.previewType === 'vue_switch' || selectedTerm.previewType === 'switch'" class="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <div>
                      <span class="text-sm font-bold text-white block">مفتاح التبديل التفاعلي</span>
                      <span class="text-xs text-gray-400">الحالة: {{ demoSwitchVal ? 'مفعل (True)' : 'معطل (False)' }}</span>
                    </div>
                    <button
                      @click="demoSwitchVal = !demoSwitchVal"
                      :class="demoSwitchVal ? 'bg-[#00DC82]' : 'bg-slate-700'"
                      class="w-14 h-8 rounded-full p-1 transition-colors relative"
                    >
                      <div
                        :class="demoSwitchVal ? '-translate-x-6' : 'translate-x-0'"
                        class="w-6 h-6 rounded-full bg-slate-950 transition-transform shadow-md"
                      ></div>
                    </button>
                  </div>

                  <!-- WIDGET 19: Modal Demo -->
                  <div v-else-if="selectedTerm.previewType === 'vue_modal' || selectedTerm.previewType === 'modal'" class="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <button @click="demoModalOpen = true" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-[#00DC82] text-white hover:text-slate-950 text-xs font-bold transition-all">
                      فتح النافذة المنبثقة (UModal / Dialog)
                    </button>
                    <div v-if="demoModalOpen" class="p-4 rounded-xl bg-[#020420] border-2 border-[#00DC82] shadow-2xl space-y-2">
                      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span class="font-bold text-white text-xs">معاينة النافذة المنبثقة</span>
                        <button @click="demoModalOpen = false" class="text-gray-400 hover:text-white">✕</button>
                      </div>
                      <p class="text-xs text-gray-300">محتوى يظهر فوق الصفحة مع تعتيم ضبابي خلفي.</p>
                    </div>
                  </div>

                  <!-- WIDGET 20: CSS Sliders Demo -->
                  <div v-else-if="selectedTerm.previewType === 'slider' || selectedTerm.previewType.startsWith('css_')" class="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="text-[11px] text-gray-400 block mb-1">الاستدارة (border-radius): {{ demoBorderRadius }}px</label>
                        <input type="range" min="0" max="40" v-model="demoBorderRadius" class="w-full accent-[#00DC82]">
                      </div>
                      <div>
                        <label class="text-[11px] text-gray-400 block mb-1">التوهج (box-shadow): {{ demoBoxShadowBlur }}px</label>
                        <input type="range" min="0" max="60" v-model="demoBoxShadowBlur" class="w-full accent-[#00DC82]">
                      </div>
                    </div>
                    
                    <div class="flex justify-center p-4">
                      <div
                        :style="{
                          borderRadius: demoBorderRadius + 'px',
                          boxShadow: '0 0 ' + demoBoxShadowBlur + 'px rgba(0, 220, 130, 0.5)'
                        }"
                        class="w-52 h-16 bg-gradient-to-r from-emerald-950 to-slate-900 border border-[#00DC82] flex items-center justify-center text-xs font-mono text-[#00DC82] transition-all"
                      >
                        عنصر CSS حي متكيف
                      </div>
                    </div>
                  </div>

                  <!-- Default Fallback Widget -->
                  <div v-else class="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs text-gray-300">
                    <span>مخرجات قياسية عالية التوافق تعمل بسلاسة في متصفحات الويب الحديثة.</span>
                    <button @click="setAppMode('scratchpad')" class="px-3 py-1.5 rounded-lg bg-[#00DC82]/10 text-[#00DC82] font-semibold hover:bg-[#00DC82]/20">
                      تشغيل في المحرر ↗
                    </button>
                  </div>

                </div>
              </div>

            </div>

            <!-- Tab 2: Comparison (Vanilla JS vs Vue 3 / Nuxt UI) -->
            <div v-if="detailTab === 'compare'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div class="p-4 rounded-2xl bg-[#0F172A] border border-amber-500/30 space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span class="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <span>⏳</span>
                    <span>الأسلوب التقليدي (Vanilla JS & DOM)</span>
                  </span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Imperative</span>
                </div>
                <pre class="p-3 bg-[#020420] rounded-xl text-xs font-mono text-amber-200/90 overflow-x-auto leading-relaxed" dir="ltr"><code>{{ selectedTerm.compareJs }}</code></pre>
                <p class="text-xs text-gray-400">يتطلب استهداف عناصر DOM يدوياً، كتابة مستمعات أحداث متفرقة، وتحديث الحالة يدوياً مما يزيد الأخطاء.</p>
              </div>

              <div class="p-4 rounded-2xl bg-[#0F172A] border border-[#00DC82]/40 space-y-3 shadow-lg shadow-[#00DC82]/5">
                <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span class="text-xs font-bold text-[#00DC82] flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>أسلوب Vue 3 الحديث (Composition API & Nuxt UI)</span>
                  </span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00DC82]/10 text-[#00DC82] border border-[#00DC82]/30">Declarative</span>
                </div>
                <pre class="p-3 bg-[#020420] rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed" dir="ltr"><code>{{ selectedTerm.compareVue }}</code></pre>
                <p class="text-xs text-gray-400">تفاعلي بالكامل (Reactive)؛ بمجرد تعديل الحالة تتحدث الواجهة ذاتياً دون سطر كود DOM واحد.</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </main>

  <!-- ==================================================== -->
  <!-- 5. NUXT UI ADVISOR & PLAYGROUND MODE (معمل مستشار Nuxt UI) -->
  <!-- ==================================================== -->
  <main v-if="appMode === 'nuxt-lab'" class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 space-y-8">
    
    <!-- Hero Banner for Nuxt UI Advisor -->
    <div class="p-6 rounded-3xl bg-gradient-to-r from-[#064E3B]/40 via-[#020420] to-[#081022] border-2 border-[#1e332c] shadow-2xl flex flex-wrap items-center justify-between gap-6">
      <div class="space-y-2 max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00DC82]/10 border border-[#00DC82]/30 text-[#00DC82] text-xs font-bold">
          <span>✨ مستشار ومعمل Nuxt UI v3 التفاعلي المتكامل</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white">معمل تجربة مكونات Nuxt UI وتوليد الأكواد حياً</h2>
        <p class="text-sm text-gray-300">
          اختر خصائص المكون بالأزرار التفاعلية المباشرة وشاهد مظهر الزر والمكون يتغير في نفس اللحظة مع توليد كود نظيف جاهز للنسخ.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <a href="https://ui.nuxt.com" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-[#00DC82] text-slate-950 font-bold text-sm hover:bg-[#00b86b] shadow-lg shadow-[#00DC82]/20 flex items-center gap-2">
          <span>التوثيق الرسمي لـ Nuxt UI ↗</span>
        </a>
      </div>
    </div>

    <!-- Interactive Button Prop Playground -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- Controls Panel with VISUAL BUTTONS (6 cols) -->
      <div class="lg:col-span-6 bg-[#081022] border border-[#1e332c] rounded-2xl p-6 shadow-xl space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-[#1e332c]">
          <h3 class="font-bold text-white text-base flex items-center gap-2">
            <span>⚙</span>
            <span>لوحة تخصيص الخصائص (أزرار تفاعلية فورية)</span>
          </h3>
          <span class="text-xs font-mono text-[#00DC82]">&lt;UButton&gt;</span>
        </div>

        <!-- Quick Presets -->
        <div class="space-y-1.5">
          <label class="text-xs text-gray-400 block font-medium">نماذج مسبقة سريعة (Quick Presets):</label>
          <div class="flex flex-wrap gap-1.5">
            <button
              @click="applyButtonPreset('primary')"
              class="px-2.5 py-1 rounded-lg text-xs bg-[#00DC82]/20 text-[#00DC82] border border-[#00DC82]/40 hover:bg-[#00DC82]/30 font-medium"
            >
              زر تأكيد زمردي
            </button>
            <button
              @click="applyButtonPreset('danger')"
              class="px-2.5 py-1 rounded-lg text-xs bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30 font-medium"
            >
              زر حذف خطر
            </button>
            <button
              @click="applyButtonPreset('loading')"
              class="px-2.5 py-1 rounded-lg text-xs bg-sky-500/20 text-sky-400 border border-sky-500/40 hover:bg-sky-500/30 font-medium"
            >
              زر تحميل غير متزامن
            </button>
            <button
              @click="applyButtonPreset('outline')"
              class="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-gray-300 border border-slate-700 hover:text-white font-medium"
            >
              زر إطاري شفاف
            </button>
          </div>
        </div>

        <div class="space-y-4 pt-1">
          
          <!-- 1. Color Selector as VISUAL BUTTONS -->
          <div>
            <label class="text-xs text-gray-400 block mb-1.5 font-medium">اللون (Color):</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="c in [
                  { id: 'primary', label: 'الزمردي (Primary)', bg: 'bg-[#00DC82]', text: 'text-slate-950' },
                  { id: 'neutral', label: 'المحايد (Neutral)', bg: 'bg-slate-700', text: 'text-white' },
                  { id: 'success', label: 'النجاح (Success)', bg: 'bg-emerald-600', text: 'text-white' },
                  { id: 'warning', label: 'التحذير (Warning)', bg: 'bg-amber-500', text: 'text-slate-950' },
                  { id: 'error', label: 'الخطأ (Error)', bg: 'bg-rose-600', text: 'text-white' }
                ]"
                :key="c.id"
                @click="selectNuxtColor(c.id)"
                :class="nuxtButtonColor === c.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#081022] font-bold shadow-md' : 'opacity-70 hover:opacity-100'"
                class="px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all"
                :class="c.bg + ' ' + c.text"
              >
                <span>●</span>
                <span>{{ c.label }}</span>
              </button>
            </div>
          </div>

          <!-- 2. Variant Selector as VISUAL BUTTONS -->
          <div>
            <label class="text-xs text-gray-400 block mb-1.5 font-medium">التنوع البصري (Variant):</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="v in ['solid', 'outline', 'soft', 'subtle', 'ghost']"
                :key="v"
                @click="selectNuxtVariant(v)"
                :class="nuxtButtonVariant === v ? 'bg-[#00DC82] text-slate-950 font-bold border-[#00DC82]' : 'bg-[#0F172A] text-gray-300 border-slate-700 hover:text-white'"
                class="px-3 py-1.5 rounded-xl text-xs border transition-all font-mono"
              >
                {{ v }}
              </button>
            </div>
          </div>

          <!-- 3. Size Selector as VISUAL BUTTONS -->
          <div>
            <label class="text-xs text-gray-400 block mb-1.5 font-medium">المقاس (Size):</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="s in ['xs', 'sm', 'md', 'lg', 'xl']"
                :key="s"
                @click="selectNuxtSize(s)"
                :class="nuxtButtonSize === s ? 'bg-[#00DC82] text-slate-950 font-bold border-[#00DC82]' : 'bg-[#0F172A] text-gray-300 border-slate-700 hover:text-white'"
                class="w-10 h-8 rounded-xl text-xs border font-mono font-bold transition-all"
              >
                {{ s }}
              </button>
            </div>
          </div>

          <!-- 4. Icon Selector as VISUAL BUTTONS -->
          <div>
            <label class="text-xs text-gray-400 block mb-1.5 font-medium">الأيقونة (Icon):</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="ic in [
                  { id: 'i-heroicons-sparkles', label: '✨ Sparkles' },
                  { id: 'i-heroicons-rocket-launch', label: '🚀 Rocket' },
                  { id: 'i-heroicons-check-circle', label: '✓ Check' },
                  { id: 'i-heroicons-arrow-right', label: '→ Arrow' },
                  { id: 'none', label: 'بدون' }
                ]"
                :key="ic.id"
                @click="selectNuxtIcon(ic.id)"
                :class="nuxtButtonIcon === ic.id ? 'bg-[#00DC82] text-slate-950 font-bold border-[#00DC82]' : 'bg-[#0F172A] text-gray-300 border-slate-700 hover:text-white'"
                class="px-3 py-1.5 rounded-xl text-xs border transition-all font-mono"
              >
                {{ ic.label }}
              </button>
            </div>
          </div>

          <!-- Prop: Label text -->
          <div>
            <label class="text-xs text-gray-400 block mb-1.5 font-medium">نص الزر (Label):</label>
            <input v-model="nuxtButtonLabel" type="text" class="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#00DC82]" />
          </div>

        </div>

        <!-- Boolean Toggles -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
          <label class="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
            <input type="checkbox" v-model="nuxtButtonLoading" class="accent-[#00DC82]">
            <span>تحميل :loading</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
            <input type="checkbox" v-model="nuxtButtonDisabled" class="accent-[#00DC82]">
            <span>معطل :disabled</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
            <input type="checkbox" v-model="nuxtButtonTrailing" class="accent-[#00DC82]">
            <span>أيقونة خلفية</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
            <input type="checkbox" v-model="nuxtButtonBlock" class="accent-[#00DC82]">
            <span>عريض كامل block</span>
          </label>
        </div>

      </div>

      <!-- Live Canvas & Generated Code (6 cols) -->
      <div class="lg:col-span-6 space-y-4">
        
        <!-- Live Preview Canvas with INTERACTIVE CLICK COUNTER & RIPPLE -->
        <div class="bg-[#081022] border border-[#1e332c] rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden">
          <span class="absolute top-3 right-3 text-[11px] font-mono text-gray-500 uppercase">Live Render Canvas</span>

          <!-- The Rendered Interactive Button -->
          <button
            @click="handlePlaygroundButtonClick"
            :disabled="nuxtButtonDisabled || nuxtButtonLoading"
            :class="[
              getPlaygroundButtonClass(),
              nuxtButtonBlock ? 'w-full' : '',
              playgroundButtonPulsing ? 'scale-105' : ''
            ]"
            class="transition-all flex items-center justify-center gap-2 active:scale-95 btn-ripple cursor-pointer"
          >
            <!-- Leading Loading Spinner or Icon -->
            <svg v-if="nuxtButtonLoading" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" class="opacity-75"></path></svg>
            <span v-else-if="nuxtButtonIcon !== 'none' && !nuxtButtonTrailing">✦</span>

            <span>{{ nuxtButtonLabel }}</span>

            <span v-if="nuxtButtonIcon !== 'none' && nuxtButtonTrailing">✦</span>
          </button>

          <!-- Interactive Click Feedback Counter -->
          <div class="mt-4 text-xs font-mono text-gray-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#00DC82]"></span>
            <span>انقر الزر للتجربة! عدد النقرات: <strong class="text-white">{{ playgroundClickCount }}</strong></span>
          </div>
        </div>

        <!-- Generated Template Code Box -->
        <div class="bg-[#020420] border border-[#1e332c] rounded-2xl overflow-hidden shadow-inner">
          <div class="px-4 py-2.5 bg-[#081022] border-b border-[#1e332c] flex items-center justify-between">
            <span class="text-xs font-mono text-emerald-400 font-bold">الكود المولد تلقائياً (Generated Code)</span>
            <button
              @click="copyCode(generatedNuxtButtonCode)"
              class="text-xs font-mono px-3 py-1 rounded bg-[#00DC82] text-slate-950 font-bold hover:bg-[#00b86b] transition-all"
            >
              نسخ الكود
            </button>
          </div>
          <pre class="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed" dir="ltr"><code>{{ generatedNuxtButtonCode }}</code></pre>
        </div>

      </div>

    </div>

    <!-- Nuxt UI Catalog Component Grid (مع حل مشكلة الرجوع للصفحة الرئيسية) -->
    <div class="space-y-4 pt-6">
      <div class="flex items-center justify-between border-b border-[#1e332c] pb-3">
        <h3 class="text-xl font-bold text-white flex items-center gap-2">
          <span>📦</span>
          <span>دليل مكونات Nuxt UI v3 الكامل (25 مكوناً أساسياً)</span>
        </h3>
        <span class="text-xs text-gray-400 font-mono">انقر لعرض الشرح والمعاينة المباشرة فوراً دون مغادرة المعمل</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="comp in nuxtUiCatalog"
          :key="comp.term"
          @click="inspectNuxtComponent(comp)"
          class="p-4 rounded-xl bg-[#081022] hover:bg-[#0F172A] border border-[#1e332c] hover:border-[#00DC82]/60 transition-all cursor-pointer group shadow-md flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between">
              <span class="font-mono font-bold text-sm text-white group-hover:text-[#00DC82] transition-colors" dir="ltr">
                {{ comp.term }}
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-[#00DC82]/10 text-[#00DC82] font-mono">v3</span>
            </div>
            <p class="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{{ comp.arabicTitle }}</p>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-[#00DC82]">
            <span>عرض الشرح والمعاينة ←</span>
          </div>
        </div>
      </div>
    </div>

    <!-- NUXT COMPONENT INSPECTOR MODAL (يفتح داخل المعمل دون الرجوع للرئيسية) -->
    <div v-if="inspectedNuxtComp" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" @click.self="inspectedNuxtComp = null">
      <div class="bg-[#081022] border-2 border-[#00DC82] rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        <div class="flex items-start justify-between pb-3 border-b border-[#1e332c]">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-mono font-bold text-2xl text-white tracking-wide" dir="ltr">{{ inspectedNuxtComp.term }}</h3>
              <span class="text-xs font-mono px-2 py-0.5 rounded bg-[#00DC82]/10 text-[#00DC82] border border-[#00DC82]/30">Nuxt UI v3</span>
            </div>
            <p class="text-sm text-[#00DC82] font-semibold mt-1">{{ inspectedNuxtComp.arabicTitle }}</p>
          </div>
          <button @click="inspectedNuxtComp = null" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white flex items-center justify-center">✕</button>
        </div>

        <p class="text-xs sm:text-sm text-gray-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          {{ inspectedNuxtComp.description }}
        </p>

        <!-- Template Code Box in Modal -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>كود الاستخدام:</span>
            <button @click="copyCode(inspectedNuxtComp.codeExample)" class="text-[#00DC82] hover:underline">نسخ الكود</button>
          </div>
          <pre class="p-3 bg-[#020420] border border-[#1e332c] rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed" dir="ltr"><code>{{ inspectedNuxtComp.codeExample }}</code></pre>
        </div>

        <!-- Footer Actions: Direct Detailed View or Docs -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1e332c]">
          <a :href="inspectedNuxtComp.docUrl" target="_blank" rel="noopener noreferrer" class="text-xs text-gray-400 hover:text-[#00DC82] flex items-center gap-1">
            <span>التوثيق الرسمي ↗</span>
          </a>
          <div class="flex items-center gap-2">
            <button @click="inspectedNuxtComp = null" class="px-4 py-2 rounded-xl bg-slate-800 text-gray-300 hover:text-white text-xs font-medium">إغلاق</button>
            <button @click="goToLexiconDetailedView(inspectedNuxtComp)" class="px-5 py-2 rounded-xl bg-[#00DC82] hover:bg-[#00b86b] text-slate-950 font-bold text-xs shadow-lg shadow-[#00DC82]/20 flex items-center gap-1.5">
              <span>فتح في المعجم المفصل ←</span>
            </button>
          </div>
        </div>

      </div>
    </div>

  </main>

  <!-- ==================================================== -->
  <!-- 6. DEVELOPER QUIZ CHALLENGE MODE (كويز المطورين) -->
  <!-- ==================================================== -->
  <main v-if="appMode === 'quiz'" class="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 space-y-6">
    
    <div class="p-6 rounded-3xl bg-[#081022] border-2 border-[#1e332c] shadow-2xl text-center space-y-3">
      <span class="text-4xl">🎯</span>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white">كويز وتحدي المفاهيم البرمجية لمطوري Vue & Nuxt</h2>
      <p class="text-sm text-gray-400 max-w-xl mx-auto">
        اختبر معلوماتك في JavaScript الحديثة ومفاهيم Vue 3 وخصائص Nuxt UI عبر أسئلة سريعة وتفاعلية مع تصحيح فوري.
      </p>
    </div>

    <!-- Quiz Question Card -->
    <div v-if="!quizCompleted" class="p-6 rounded-2xl bg-[#081022] border border-[#1e332c] shadow-xl space-y-6">
      <div class="flex items-center justify-between text-xs font-mono text-gray-400 pb-2 border-b border-slate-800">
        <span>السؤال {{ quizIndex + 1 }} من {{ quizQuestions.length }}</span>
        <span>النتيجة الحالية: <strong class="text-[#00DC82]">{{ quizScore }}</strong> نقطة</span>
      </div>

      <div class="space-y-2">
        <span class="text-xs font-mono text-[#00DC82] font-bold">{{ currentQuizQuestion.category }}</span>
        <h3 class="text-lg sm:text-xl font-bold text-white leading-relaxed">{{ currentQuizQuestion.question }}</h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          v-for="(option, idx) in currentQuizQuestion.options"
          :key="idx"
          @click="answerQuiz(idx)"
          :disabled="quizAnswered"
          :class="getQuizOptionClass(idx)"
          class="p-4 rounded-xl border text-sm font-semibold text-right transition-all flex items-center justify-between"
        >
          <span dir="ltr" class="font-mono">{{ option }}</span>
          <span v-if="quizAnswered && idx === currentQuizQuestion.correctIdx" class="text-emerald-400 font-bold">✓</span>
          <span v-if="quizAnswered && quizSelectedIdx === idx && idx !== currentQuizQuestion.correctIdx" class="text-red-400 font-bold">✕</span>
        </button>
      </div>

      <div v-if="quizAnswered" class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <p class="text-xs sm:text-sm text-gray-300">{{ currentQuizQuestion.explanation }}</p>
        <button
          @click="nextQuizQuestion"
          class="px-5 py-2.5 rounded-xl bg-[#00DC82] hover:bg-[#00b86b] text-slate-950 font-bold text-xs"
        >
          {{ quizIndex + 1 < quizQuestions.length ? 'السؤال التالي ←' : 'عرض النتيجة النهائية 🏆' }}
        </button>
      </div>
    </div>

    <!-- Quiz Completed Summary -->
    <div v-else class="p-8 rounded-3xl bg-[#081022] border-2 border-[#00DC82] text-center space-y-4">
      <div class="text-5xl">🏆</div>
      <h3 class="text-2xl font-black text-white">تهانينا! أكملت التحدي بنجاح</h3>
      <p class="text-base text-gray-300">
        نتيجتك النهائية هي: <span class="text-[#00DC82] font-mono font-black text-2xl">{{ quizScore }} / {{ quizQuestions.length }}</span>
      </p>
      <div class="pt-4 flex justify-center gap-3">
        <button @click="restartQuiz" class="px-5 py-2.5 rounded-xl bg-[#00DC82] text-slate-950 font-bold text-sm">إعادة المحاولة بأسئلة جديدة</button>
        <button @click="setAppMode('lexicon')" class="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-sm">العودة للمعجم</button>
      </div>
    </div>

  </main>

  <!-- ==================================================== -->
  <!-- 7. LIVE CODE SCRATCHPAD MODE (المحرر التجريبي) -->
  <!-- ==================================================== -->
  <main v-if="appMode === 'scratchpad'" class="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 space-y-6">
    <div class="p-6 rounded-2xl bg-[#081022] border border-[#1e332c] shadow-xl space-y-4">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 class="text-lg font-bold text-white flex items-center gap-2">
            <span>💻</span>
            <span>محرر JavaScript & HTML التجريبي الحي</span>
          </h3>
          <p class="text-xs text-gray-400">جرب دوال المصفوفات، الحسابات، وصيغ التفاعل فوراً</p>
        </div>
        <button @click="runScratchpad" class="px-5 py-2 rounded-xl bg-[#00DC82] hover:bg-[#00b86b] text-slate-950 font-bold text-xs shadow-md">
          تشغيل الكود (Run) ▶
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-xs text-gray-400 block mb-1 font-mono">Input JavaScript:</label>
          <textarea
            v-model="scratchpadInput"
            rows="10"
            class="w-full p-3 rounded-xl bg-[#020420] border border-slate-700 font-mono text-xs text-emerald-300 outline-none focus:border-[#00DC82]"
            dir="ltr"
          ></textarea>
        </div>

        <div>
          <label class="text-xs text-gray-400 block mb-1 font-mono">Console Output:</label>
          <pre class="w-full h-[220px] p-3 rounded-xl bg-[#020420] border border-slate-800 font-mono text-xs text-slate-200 overflow-y-auto leading-relaxed" dir="ltr"><code>{{ scratchpadOutput || 'انقر على تشغيل الكود لمشاهدة المخرجات هنا...' }}</code></pre>
        </div>
      </div>
    </div>
  </main>

  <!-- ==================================================== -->
  <!-- 8. KEYBOARD SHORTCUTS MODAL (? أو Ctrl + /) -->
  <!-- ==================================================== -->
  <div v-if="showShortcutsModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
    <div class="bg-[#081022] border-2 border-[#1e332c] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4" @click.stop>
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 class="font-bold text-white text-base flex items-center gap-2">
          <span>⌨</span>
          <span>اختصارات لوحة المفاتيح</span>
        </h3>
        <button @click="showShortcutsModal = false" class="text-gray-400 hover:text-white text-lg">✕</button>
      </div>

      <ul class="space-y-2.5 text-xs">
        <li class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
          <span class="text-gray-300">التركيز على شريط البحث</span>
          <span class="font-mono text-[#00DC82] bg-slate-950 px-2 py-0.5 rounded border border-slate-700">Ctrl + K</span>
        </li>
        <li class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
          <span class="text-gray-300">إغلاق القوائم المنسدلة</span>
          <span class="font-mono text-[#00DC82] bg-slate-950 px-2 py-0.5 rounded border border-slate-700">Esc</span>
        </li>
        <li class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
          <span class="text-gray-300">التنقل بين اقتراحات البحث</span>
          <span class="font-mono text-[#00DC82] bg-slate-950 px-2 py-0.5 rounded border border-slate-700">↑ / ↓</span>
        </li>
        <li class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
          <span class="text-gray-300">اختيار المصطلح المحدد</span>
          <span class="font-mono text-[#00DC82] bg-slate-950 px-2 py-0.5 rounded border border-slate-700">Enter</span>
        </li>
        <li class="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
          <span class="text-gray-300">فتح هذه النافذة الإرشادية</span>
          <span class="font-mono text-[#00DC82] bg-slate-950 px-2 py-0.5 rounded border border-slate-700">?</span>
        </li>
      </ul>

      <button @click="showShortcutsModal = false" class="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all">
        إغلاق النافذة
      </button>
    </div>
  </div>

  <!-- ==================================================== -->
  <!-- 9. TOAST NOTIFICATION SYSTEM (إشعارات النسخ والمفضلة) -->
  <!-- ==================================================== -->
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-4 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-4 opacity-0"
  >
    <div
      v-if="toastVisible"
      class="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#081022] border-2 border-[#00DC82] shadow-2xl shadow-[#00DC82]/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-xl"
    >
      <span class="w-2 h-2 rounded-full bg-[#00DC82] animate-ping"></span>
      <span>{{ toastMessage }}</span>
    </div>
  </transition>

  <!-- ==================================================== -->
  <!-- 10. FOOTER (تذييل الموقع) -->
  <!-- ==================================================== -->
  <footer class="mt-auto border-t border-[#1e332c] bg-[#020420]/90 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="font-bold text-gray-300">VueLexicon Pro</span>
        <span>— منصة ومعجم مطوري الويب المتقدم</span>
      </div>
      <p class="font-mono text-[11px] text-gray-400">
        مستوحى من هوية <span class="text-[#00DC82]">Nuxt UI v3</span> و <span class="text-[#42B883]">Vue.js 3</span> • {{ rawLexiconData.length }} مصطلح متكامل
      </p>
    </div>
  </footer>

</div>

<!-- ==================================================== -->
<!-- 11. VUE 3 APPLICATION CORE LOGIC (التطبيق التفاعلي) -->
<!-- ==================================================== -->
<script>
const RAW_LEXICON_TUPLES = __RAW_LEXICON_JSON__;

const { createApp, ref, computed, watch, onMounted, onUnmounted, nextTick } = Vue;

const app = createApp({
  setup() {
    
    // 1. Data Hydration from Tuples
    function hydrateItem(tuple, index) {
      const [
        category,
        term,
        arabicTitle,
        keywords,
        description,
        codeExample,
        syntaxInfo,
        returnProps,
        env,
        useCases,
        previewType,
        compareJs,
        compareVue,
        docUrl
      ] = tuple;

      const catLabels = {
        js: 'JavaScript',
        vue: 'Vue.js 3',
        nuxt: 'Nuxt UI',
        html: 'HTML5',
        css: 'CSS3'
      };

      const catColors = {
        js: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
        vue: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
        nuxt: { bg: 'bg-[#00DC82]/10', text: 'text-[#00DC82]', border: 'border-[#00DC82]/30' },
        html: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
        css: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' }
      };

      const clean = term.replace(/^[<:@\.\(\)\s]+/, '');
      const match = clean.match(/[a-zA-Z]/);
      const letter = match ? match[0].toUpperCase() : 'A';

      return {
        id: `term-${index}`,
        category,
        categoryLabel: catLabels[category] || category,
        catColor: catColors[category] || catColors.vue,
        term,
        arabicTitle,
        keywords: `${term} ${arabicTitle} ${keywords}`.toLowerCase(),
        description,
        codeExample,
        syntaxInfo,
        returnProps,
        env,
        useCases: Array.isArray(useCases) ? useCases : [useCases],
        previewType: previewType || 'generic',
        compareJs: compareJs || '',
        compareVue: compareVue || '',
        docUrl: docUrl || '#',
        letter
      };
    }

    const rawLexiconData = ref(RAW_LEXICON_TUPLES.map((t, idx) => hydrateItem(t, idx)));

    // 2. Navigation & View State
    const appMode = ref('lexicon'); // 'lexicon' | 'nuxt-lab' | 'quiz' | 'scratchpad'
    const activeCategory = ref('all');
    const selectedLetter = ref('ALL');
    const selectedTerm = ref(rawLexiconData.value[0]);
    const detailTab = ref('code'); // 'code' | 'compare'
    const searchQuery = ref('');
    const searchFocused = ref(false);
    const searchInputRef = ref(null);
    const highlightedDropdownIndex = ref(0);
    const showShortcutsModal = ref(false);

    // Nuxt UI Lab Inspector Modal State
    const inspectedNuxtComp = ref(null);

    function inspectNuxtComponent(comp) {
      inspectedNuxtComp.value = comp;
    }

    function goToLexiconDetailedView(comp) {
      inspectedNuxtComp.value = null;
      activeCategory.value = 'nuxt';
      selectedTerm.value = comp;
      appMode.value = 'lexicon';
      detailTab.value = 'code';
      nextTick(() => {
        const el = document.getElementById('detailed-term-view');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      triggerToast(`تم فتح تفاصيل ${comp.term} في المعجم الشامل`);
    }

    // 3. Bookmarks Management (localStorage)
    const bookmarkedIds = ref(new Set());
    try {
      const saved = localStorage.getItem('vuelexicon_bookmarks_v1');
      if (saved) {
        JSON.parse(saved).forEach(id => bookmarkedIds.value.add(id));
      }
    } catch (e) {}

    function saveBookmarks() {
      try {
        localStorage.setItem('vuelexicon_bookmarks_v1', JSON.stringify([...bookmarkedIds.value]));
      } catch (e) {}
    }

    function isBookmarked(id) {
      return bookmarkedIds.value.has(id);
    }

    function toggleBookmark(id) {
      if (bookmarkedIds.value.has(id)) {
        bookmarkedIds.value.delete(id);
        triggerToast('تمت الإزالة من المفضلة');
      } else {
        bookmarkedIds.value.add(id);
        triggerToast('تم الحفظ في المفضلة ★');
      }
      saveBookmarks();
    }

    // Toast Notification
    const toastMessage = ref('');
    const toastVisible = ref(false);
    let toastTimeout = null;

    function triggerToast(msg) {
      toastMessage.value = msg;
      toastVisible.value = true;
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toastVisible.value = false;
      }, 2600);
    }

    // Categories List
    const categoriesList = [
      { id: 'all', name: 'الكل' },
      { id: 'js', name: 'JavaScript (ES6+)' },
      { id: 'vue', name: 'Vue.js 3' },
      { id: 'nuxt', name: 'Nuxt UI' },
      { id: 'html', name: 'HTML5' },
      { id: 'css', name: 'CSS3' },
      { id: 'bookmarks', name: '★ المفضلة' }
    ];

    function getCategoryCount(catId) {
      if (catId === 'all') return rawLexiconData.value.length;
      if (catId === 'bookmarks') return bookmarkedIds.value.size;
      return rawLexiconData.value.filter(i => i.category === catId).length;
    }

    // A-Z Alphabet Letters
    const alphabetLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    function hasTermsForLetter(letter) {
      return rawLexiconData.value.some(i => {
        const catMatch = activeCategory.value === 'all' 
          ? true 
          : activeCategory.value === 'bookmarks' 
            ? bookmarkedIds.value.has(i.id) 
            : i.category === activeCategory.value;
        return catMatch && i.letter === letter;
      });
    }

    // Filtered Terms List for Master View
    const filteredTermsList = computed(() => {
      const query = searchQuery.value.trim().toLowerCase();

      return rawLexiconData.value.filter(item => {
        let catMatch = true;
        if (activeCategory.value === 'bookmarks') {
          catMatch = bookmarkedIds.value.has(item.id);
        } else if (activeCategory.value !== 'all') {
          catMatch = item.category === activeCategory.value;
        }

        let letterMatch = true;
        if (selectedLetter.value !== 'ALL') {
          letterMatch = item.letter === selectedLetter.value;
        }

        let searchMatch = true;
        if (query) {
          searchMatch = item.keywords.includes(query) || item.term.toLowerCase().includes(query) || item.arabicTitle.includes(query);
        }

        return catMatch && letterMatch && searchMatch;
      });
    });

    // Dropdown suggestions
    const dropdownSuggestions = computed(() => {
      const query = searchQuery.value.trim().toLowerCase();
      if (!query) return [];

      return rawLexiconData.value
        .filter(item => item.keywords.includes(query) || item.term.toLowerCase().includes(query) || item.arabicTitle.includes(query))
        .slice(0, 8);
    });

    const showDropdown = computed(() => {
      return searchFocused.value && searchQuery.value.trim().length > 0;
    });

    function handleSearchBlur() {
      setTimeout(() => {
        searchFocused.value = false;
      }, 250);
    }

    function navigateDropdown(step) {
      if (!dropdownSuggestions.value.length) return;
      highlightedDropdownIndex.value = (highlightedDropdownIndex.value + step + dropdownSuggestions.value.length) % dropdownSuggestions.value.length;
    }

    function selectHighlightedDropdown() {
      if (dropdownSuggestions.value.length > 0) {
        selectDropdownItem(dropdownSuggestions.value[highlightedDropdownIndex.value]);
      } else if (searchQuery.value.trim().length > 0) {
        activateDynamicFallback();
      }
    }

    function selectDropdownItem(item) {
      selectedTerm.value = item;
      searchFocused.value = false;
      appMode.value = 'lexicon';
      detailTab.value = 'code';
    }

    function closeDropdown() {
      searchFocused.value = false;
    }

    function clearSearch() {
      searchQuery.value = '';
      if (searchInputRef.value) searchInputRef.value.focus();
    }

    // Dynamic Smart Fallback Generator (never show 0 results!)
    function activateDynamicFallback() {
      const q = searchQuery.value.trim();
      if (!q) return;

      let detectedCat = 'js';
      let syntaxType = 'JavaScript Expression / Web API';
      if (q.startsWith('U') || q.startsWith('<U')) {
        detectedCat = 'nuxt';
        syntaxType = 'Nuxt UI v3 Component';
      } else if (q.startsWith('use') || q.startsWith('v-') || q.startsWith('define')) {
        detectedCat = 'vue';
        syntaxType = 'Vue 3 Composition API';
      } else if (q.includes('-') || ['flex', 'grid', 'color', 'background'].some(k => q.includes(k))) {
        detectedCat = 'css';
        syntaxType = 'CSS3 Property';
      } else if (q.startsWith('<') || q.endsWith('>')) {
        detectedCat = 'html';
        syntaxType = 'HTML5 Element';
      }

      const fallbackItem = {
        id: 'dynamic-fallback',
        category: detectedCat,
        categoryLabel: detectedCat === 'nuxt' ? 'Nuxt UI' : detectedCat === 'vue' ? 'Vue.js 3' : detectedCat === 'css' ? 'CSS3' : detectedCat === 'html' ? 'HTML5' : 'JavaScript',
        catColor: { bg: 'bg-[#00DC82]/10', text: 'text-[#00DC82]', border: 'border-[#00DC82]/30' },
        term: q,
        arabicTitle: `استكشاف ذكي ومباشر لمصطلح: "${q}"`,
        keywords: q.toLowerCase(),
        description: `لم نجد هذا المصطلح في القائمة الأساسية، ولكن قام محرك VueLexicon الذكي بتحليله تلقائياً كـ (${syntaxType}). يمكنك استكشاف التوثيق الرسمي ومخرجاته فوراً.`,
        codeExample: `// مثال تجريبي تم إنشاؤه تلقائياً لـ ${q}\\nconsole.log('Testing ${q} in VueLexicon Pro...');`,
        syntaxInfo: syntaxType,
        returnProps: 'ديناميكي / وقت التشغيل',
        env: 'البيئة الحديثة للمتصفح',
        useCases: [
          `البحث عن أحدث مواصفات ${q} في التوثيق الرسمي`,
          `استخدامه في مشاريع Vue 3 و Nuxt 3 الحديثة`,
          `تجربة خصائصه عبر المحرر التجريبي المدمج`
        ],
        previewType: 'js_filter',
        compareJs: `// Vanilla JS implementation for ${q}`,
        compareVue: `// Vue 3 Composition API implementation for ${q}`,
        docUrl: `https://www.google.com/search?q=${encodeURIComponent(q + ' MDN Vue Nuxt documentation')}`,
        letter: q[0]?.toUpperCase() || 'A'
      };

      selectedTerm.value = fallbackItem;
      searchFocused.value = false;
      appMode.value = 'lexicon';
      detailTab.value = 'code';
      triggerToast(`تم توليد بطاقة تحليل ذكية لـ "${q}"`);
    }

    function selectTerm(item) {
      selectedTerm.value = item;
      detailTab.value = 'code';
    }

    function setCategory(catId) {
      activeCategory.value = catId;
      selectedLetter.value = 'ALL';
      if (filteredTermsList.value.length > 0) {
        selectedTerm.value = filteredTermsList.value[0];
      }
    }

    function setLetter(letter) {
      selectedLetter.value = letter;
      if (filteredTermsList.value.length > 0) {
        selectedTerm.value = filteredTermsList.value[0];
      }
    }

    function resetFilters() {
      activeCategory.value = 'all';
      selectedLetter.value = 'ALL';
      searchQuery.value = '';
      if (rawLexiconData.value.length > 0) {
        selectedTerm.value = rawLexiconData.value[0];
      }
    }

    function setAppMode(mode) {
      appMode.value = mode;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Text to Speech Pronunciation
    function pronounceTerm(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const clean = text.replace(/[<>\\/:\(\)]/g, ' ').trim();
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
        triggerToast(`🔊 استمع لنطق: "${clean}"`);
      } else {
        triggerToast('ميزة النطق الصوتي غير مدعومة في هذا المتصفح');
      }
    }

    // Clipboard Copy
    async function copyCode(code) {
      try {
        await navigator.clipboard.writeText(code);
        triggerToast('تم نسخ الكود البرمجي إلى الحافظة بنجاح ✓');
      } catch (err) {
        triggerToast('تعذر النسخ التلقائي');
      }
    }

    // ==========================================
    // SPECIALIZED INTERACTIVE FRONTEND WIDGETS
    // ==========================================

    // 1. JS Filter Widget
    const jsFilterRole = ref('الكل');
    const jsFilterSearch = ref('');
    const jsRawUsers = [
      { id: 1, name: 'حيدر علي', role: 'مطور واجهات', exp: 6 },
      { id: 2, name: 'سارة أحمد', role: 'مصمم UI', exp: 4 },
      { id: 3, name: 'عمر طارق', role: 'مدير تقني', exp: 9 },
      { id: 4, name: 'زيد خالد', role: 'مطور واجهات', exp: 3 },
      { id: 5, name: 'مريم سعيد', role: 'مصمم UI', exp: 5 },
      { id: 6, name: 'يوسف كمال', role: 'مطور واجهات', exp: 7 }
    ];
    const filteredJsUsers = computed(() => {
      return jsRawUsers.filter(u => {
        const matchesRole = jsFilterRole.value === 'الكل' || u.role === jsFilterRole.value;
        const matchesSearch = !jsFilterSearch.value || u.name.includes(jsFilterSearch.value);
        return matchesRole && matchesSearch;
      });
    });

    // 2. JS Map Widget
    const jsMapCurrency = ref('USD');
    const jsRawProducts = [
      { name: 'دورة Nuxt UI v3 الاحترافية', priceUsd: 89 },
      { name: 'كتاب تعلم Vue 3 Composition API', priceUsd: 35 },
      { name: 'قوالب Tailwind CSS المظلمة', priceUsd: 49 }
    ];
    const mappedProducts = computed(() => {
      const rate = 3.75;
      return jsRawProducts.map(p => {
        const isSar = jsMapCurrency.value === 'SAR';
        const finalPrice = isSar ? (p.priceUsd * rate).toFixed(0) + ' ر.س' : '$' + p.priceUsd;
        return {
          name: p.name,
          formattedPrice: finalPrice
        };
      });
    });

    // 3. JS Reduce Widget
    const jsCartItems = ref([
      { id: 1, title: 'اشتراك رخصة VueLexicon Pro', price: 99, qty: 1 },
      { id: 2, title: 'حزمة أيقونات Heroicons المدمجة', price: 29, qty: 2 },
      { id: 3, title: 'جلسة استشارية مع مهندس واجهات', price: 150, qty: 1 }
    ]);
        function decreaseCartQty(item) {
      if (item && item.qty > 0) {
        item.qty--;
      }
    }

    const jsCartTotal = computed(() => {
      return jsCartItems.value.reduce((total, item) => total + (item.price * item.qty), 0);
    });

    // 4. JS Event Listener Widget
    const jsClickCount = ref(0);
    const jsEventLog = ref({ type: '', x: 0, y: 0, time: '' });
    function handleJsButtonClick(e) {
      jsClickCount.value++;
      jsEventLog.value = {
        type: e.type,
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
        time: new Date().toLocaleTimeString()
      };
      triggerToast(`التقط addEventListener الحدث! النقر رقم ${jsClickCount.value}`);
    }

    // 5. JS Fetch Widget
    const jsFetchLoading = ref(false);
    const jsFetchedUser = ref({
      name: 'طارق عبد الله',
      email: 'tariq.frontend@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    });
    const dummyNames = ['أحمد المنصوري', 'فاطمة الزهراء', 'سلطان الدوسري', 'نورة العتيبي', 'خالد الحربي'];
    function triggerJsFetch() {
      jsFetchLoading.value = true;
      setTimeout(() => {
        jsFetchLoading.value = false;
        const randomName = dummyNames[Math.floor(Math.random() * dummyNames.length)];
        const randomId = Math.floor(Math.random() * 90) + 10;
        jsFetchedUser.value = {
          name: randomName,
          email: `${randomName.split(' ')[0].toLowerCase()}${randomId}@example.com`,
          avatar: `https://images.unsplash.com/photo-${1500000000000 + randomId * 1000000}?w=150&auto=format&fit=crop&q=80` || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
        };
        triggerToast('تم جلب بيانات مستخدم جديد بنجاح عبر fetch()!');
      }, 550);
    }

    // 6. JS Task List (Push / Splice) Widget
    const jsNewTaskText = ref('');
    const jsTaskList = ref(['مراجعة تفرع Git', 'كتابة مكونات Nuxt UI', 'اختبار ميزة filter']);
    function removeJsTask(idx) {
      if (idx >= 0 && idx < jsTaskList.value.length) {
        jsTaskList.value.splice(idx, 1);
        triggerToast('تم الحذف بواسطة splice()');
      }
    }

    function jsAddTask() {
      if (!jsNewTaskText.value.trim()) return;
      jsTaskList.value.push(jsNewTaskText.value.trim());
      jsNewTaskText.value = '';
      triggerToast('تم إدراج المهمة في المصفوفة عبر push()!');
    }

    // 7. JS LocalStorage Widget
    const jsThemePref = ref(localStorage.getItem('app_demo_theme') || 'emerald');
    function saveThemePref(pref) {
      jsThemePref.value = pref;
      try {
        localStorage.setItem('app_demo_theme', pref);
      } catch(e){}
      triggerToast(`تم حفظ التفضيل (${pref}) في localStorage بالمتصفح!`);
    }

    // 8. JS SetTimeout Widget
    const jsTimerRunning = ref(false);
    const jsTimerFinished = ref(false);
    function startJsTimer() {
      jsTimerRunning.value = true;
      jsTimerFinished.value = false;
      setTimeout(() => {
        jsTimerRunning.value = false;
        jsTimerFinished.value = true;
        triggerToast('انتهى مؤقت setTimeout (2000ms) بنجاح!');
      }, 2000);
    }

    // 9. JS Regex Widget
    const jsRegexInput = ref('VuePro2026');

    // 10. JS Math.random Widget
    const jsRandomNumber = ref(42);
    const jsRandomBgColor = ref('#064E3B');
    function rollRandomNumber() {
      jsRandomNumber.value = Math.floor(Math.random() * 100) + 1;
      const palette = ['#064E3B', '#1E3A8A', '#4C1D95', '#831843', '#701A75', '#14532D'];
      jsRandomBgColor.value = palette[Math.floor(Math.random() * palette.length)];
      triggerToast(`تم توليد الرقم: ${jsRandomNumber.value}`);
    }

    // 11. JS Date & Intl Widget
    const jsFormattedDate = ref('');
    const jsCurrentTime = ref('');
    function updateLiveClock() {
      const now = new Date();
      jsFormattedDate.value = new Intl.DateTimeFormat('ar-SA', { dateStyle: 'full' }).format(now);
      jsCurrentTime.value = now.toLocaleTimeString();
    }
    updateLiveClock();

    // 12. JS String Split Widget
    const jsTagsInput = ref('Vue.js, Nuxt UI, Tailwind CSS, TypeScript');
    const jsTagsArray = computed(() => {
      return jsTagsInput.value.split(',').filter(t => t.trim().length > 0);
    });

    // 13. JS JSON Widget
    const jsUserData = ref({ name: 'حيدر علي', role: 'Senior Frontend Architect', status: 'نشط' });

    // 14. JS Debounce Widget
    const jsKeystrokeCount = ref(0);
    const jsDebounceTriggerCount = ref(0);
    let debounceTimer = null;
    function handleDebounceInput() {
      jsKeystrokeCount.value++;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        jsDebounceTriggerCount.value++;
        triggerToast('تم إرسال طلب البحث بعد توقف الكتابة (Debounced)!');
      }, 450);
    }

    // Standard Demos
    const demoCounter = ref(0);
    const demoInputText = ref('VueLexicon Pro');
    const demoAlertVisible = ref(true);
    const demoSwitchVal = ref(true);
    const demoModalOpen = ref(false);
    const demoBorderRadius = ref(16);
    const demoBoxShadowBlur = ref(25);

    // ==========================================
    // Nuxt UI Playground & Advisor State
    // ==========================================
    const nuxtButtonColor = ref('primary');
    const nuxtButtonVariant = ref('solid');
    const nuxtButtonSize = ref('md');
    const nuxtButtonLabel = ref('ابدأ الآن مع Nuxt UI');
    const nuxtButtonIcon = ref('i-heroicons-sparkles');
    const nuxtButtonTrailing = ref(false);
    const nuxtButtonLoading = ref(false);
    const nuxtButtonDisabled = ref(false);
    const nuxtButtonBlock = ref(false);
    const playgroundClickCount = ref(0);
    const playgroundButtonPulsing = ref(false);

    function selectNuxtColor(colorId) {
      nuxtButtonColor.value = colorId;
      triggerToast('تم تغيير اللون إلى ' + colorId);
    }

    function selectNuxtVariant(variant) {
      nuxtButtonVariant.value = variant;
      triggerToast('تم تغيير التنوع إلى ' + variant);
    }

    function selectNuxtSize(size) {
      nuxtButtonSize.value = size;
      triggerToast('تم تغيير المقاس إلى ' + size);
    }

    function selectNuxtIcon(iconId) {
      nuxtButtonIcon.value = iconId;
      triggerToast('تم اختيار الأيقونة');
    }

    function handlePlaygroundButtonClick() {
      playgroundClickCount.value++;
      playgroundButtonPulsing.value = true;
      setTimeout(() => playgroundButtonPulsing.value = false, 200);
      triggerToast(`تم النقر على زر Nuxt UI التفاعلي! (النقرة #${playgroundClickCount.value})`);
    }

    function applyButtonPreset(preset) {
      if (preset === 'primary') {
        nuxtButtonColor.value = 'primary';
        nuxtButtonVariant.value = 'solid';
        nuxtButtonIcon.value = 'i-heroicons-sparkles';
        nuxtButtonLabel.value = 'تأكيد وحفظ البيانات';
        nuxtButtonLoading.value = false;
        nuxtButtonDisabled.value = false;
      } else if (preset === 'danger') {
        nuxtButtonColor.value = 'error';
        nuxtButtonVariant.value = 'solid';
        nuxtButtonIcon.value = 'none';
        nuxtButtonLabel.value = 'حذف الحساب نهائياً';
        nuxtButtonLoading.value = false;
        nuxtButtonDisabled.value = false;
      } else if (preset === 'loading') {
        nuxtButtonColor.value = 'primary';
        nuxtButtonVariant.value = 'solid';
        nuxtButtonLoading.value = true;
        nuxtButtonLabel.value = 'جاري معالجة الطلب...';
      } else if (preset === 'outline') {
        nuxtButtonColor.value = 'neutral';
        nuxtButtonVariant.value = 'outline';
        nuxtButtonIcon.value = 'i-heroicons-arrow-right';
        nuxtButtonLabel.value = 'عرض التوثيق';
        nuxtButtonLoading.value = false;
        nuxtButtonDisabled.value = false;
      }
      triggerToast(`تم تطبيق القالب المسبق: ${preset}`);
    }

    function getPlaygroundButtonClass() {
      const colorMap = {
        primary: {
          solid: 'bg-[#00DC82] text-slate-950 hover:bg-[#00b86b] shadow-lg shadow-[#00DC82]/25 font-bold',
          outline: 'border-2 border-[#00DC82] text-[#00DC82] hover:bg-[#00DC82]/10 font-bold',
          soft: 'bg-[#00DC82]/15 text-[#00DC82] hover:bg-[#00DC82]/25 font-bold',
          subtle: 'bg-[#00DC82]/10 text-[#00DC82] hover:bg-[#00DC82]/20 border border-[#00DC82]/30 font-bold',
          ghost: 'text-[#00DC82] hover:bg-[#00DC82]/10 font-bold'
        },
        neutral: {
          solid: 'bg-slate-700 text-white hover:bg-slate-600 font-bold',
          outline: 'border-2 border-slate-600 text-slate-300 hover:bg-slate-800 font-bold',
          soft: 'bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold',
          subtle: 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700 font-bold',
          ghost: 'text-slate-300 hover:bg-slate-800 font-bold'
        },
        success: {
          solid: 'bg-emerald-600 text-white hover:bg-emerald-500 font-bold',
          outline: 'border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-bold',
          soft: 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 font-bold',
          subtle: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold',
          ghost: 'text-emerald-400 hover:bg-emerald-500/10 font-bold'
        },
        warning: {
          solid: 'bg-amber-500 text-slate-950 font-black hover:bg-amber-400',
          outline: 'border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 font-bold',
          soft: 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 font-bold',
          subtle: 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold',
          ghost: 'text-amber-400 hover:bg-amber-500/10 font-bold'
        },
        error: {
          solid: 'bg-rose-600 text-white hover:bg-rose-500 font-bold',
          outline: 'border-2 border-rose-500 text-rose-400 hover:bg-rose-500/10 font-bold',
          soft: 'bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 font-bold',
          subtle: 'bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold',
          ghost: 'text-rose-400 hover:bg-rose-500/10 font-bold'
        }
      };

      const sizeMap = {
        xs: 'px-2.5 py-1 text-xs rounded-lg',
        sm: 'px-3 py-1.5 text-xs rounded-xl',
        md: 'px-4 py-2 text-sm rounded-xl',
        lg: 'px-5 py-2.5 text-base rounded-2xl',
        xl: 'px-6 py-3.5 text-lg rounded-2xl'
      };

      const colorClasses = colorMap[nuxtButtonColor.value]?.[nuxtButtonVariant.value] || colorMap.primary.solid;
      const sizeClasses = sizeMap[nuxtButtonSize.value] || sizeMap.md;
      const disabledClass = nuxtButtonDisabled.value ? 'opacity-50 cursor-not-allowed' : '';

      return `${colorClasses} ${sizeClasses} ${disabledClass}`;
    }

    const generatedNuxtButtonCode = computed(() => {
      let props = [];
      if (nuxtButtonColor.value !== 'primary') props.push(`color="${nuxtButtonColor.value}"`);
      if (nuxtButtonVariant.value !== 'solid') props.push(`variant="${nuxtButtonVariant.value}"`);
      if (nuxtButtonSize.value !== 'md') props.push(`size="${nuxtButtonSize.value}"`);
      if (nuxtButtonIcon.value !== 'none') props.push(`icon="${nuxtButtonIcon.value}"`);
      if (nuxtButtonTrailing.value) props.push(':trailing="true"');
      if (nuxtButtonLoading.value) props.push(':loading="true"');
      if (nuxtButtonDisabled.value) props.push(':disabled="true"');
      if (nuxtButtonBlock.value) props.push('block');
      props.push(`label="${nuxtButtonLabel.value}"`);

      if (props.length <= 2) {
        return `<UButton ${props.join(' ')} />`;
      }
      return `<UButton\n  ${props.join('\\n  ')}\n/>`;
    });

    const nuxtUiCatalog = computed(() => {
      return rawLexiconData.value.filter(i => i.category === 'nuxt');
    });

    // ==========================================
    // Developer Quiz State & Questions
    // ==========================================
    const quizQuestions = [
      {
        category: 'Vue.js 3 Composition API',
        question: 'ما هو الفرق الجوهري بين ref() و reactive() في التفاعل؟',
        options: [
          'ref يقبل كافة القيم ويلفها في كائن .value، بينما reactive مخصص للكائنات',
          'ref لا يدعم التفاعل في القوالب بينما reactive يدعمه',
          'reactive أسرع من ref بعشر مرات في المتصفح',
          'لا يوجد أي فرق بينهما وهما متطابقان تماماً'
        ],
        correctIdx: 0,
        explanation: 'ref() يُنشئ مرجعاً يقبل القيم الفردية والكائنات مع خاصية .value، بينما reactive() مخصص للكائنات والمصفوفات عبر JavaScript Proxy مباشرة.'
      },
      {
        category: 'Nuxt UI v3',
        question: 'أي مكون من مكونات Nuxt UI يُستخدم لتشغيل البحث السريع بأوامر لوحة المفاتيح (Ctrl + K)؟',
        options: [
          '<UCommandPalette>',
          '<USearchBar>',
          '<USelectMenu>',
          '<UModalPrompt>'
        ],
        correctIdx: 0,
        explanation: '<UCommandPalette> هو المكون المخصص للبحث والأوامر العالمية بنمط Spotlight ومفتاح Ctrl + K.'
      },
      {
        category: 'JavaScript (ES6+)',
        question: 'ماذا يُرجع المعامل (Nullish Coalescing ??) في التعبير: (0 ?? 20)؟',
        options: [
          '0',
          '20',
          'undefined',
          'null'
        ],
        correctIdx: 0,
        explanation: 'المعامل ?? يتحقق حصرياً من null أو undefined، ولأن 0 رقم صالح وليس معدوماً، فإنه يُعيد 0 بخلاف ||.'
      },
      {
        category: 'CSS3 Layouts',
        question: 'أي خاصية تُستخدم لتحديد المسافات البينية بين عناصر Flexbox و CSS Grid بدون هوامش خارجية؟',
        options: [
          'gap',
          'spacing',
          'margin-between',
          'grid-distance'
        ],
        correctIdx: 0,
        explanation: 'خاصية gap هي المعيار الحديث لتحديد الفواصل بين الصفوف والأعمدة بسهولة.'
      },
      {
        category: 'JavaScript Performance',
        question: 'ما هي الفائدة الأساسية من استخدام تقنية Debounce مع حقول البحث؟',
        options: [
          'تأخير تنفيذ طلب البحث حتى يتوقف المستخدم عن الكتابة لمنع إغراق السيرفر',
          'تسريع سرعة الإنترنت للمتصفح تلقائياً',
          'تشفير كلمات البحث وحمايتها من القرصنة',
          'تحويل النصوص إلى لغات أخرى تلقائياً'
        ],
        correctIdx: 0,
        explanation: 'تقوم تقنية Debounce بتأخير استدعاء الدالة حتى يمر وقت محدد دون نقرات جديدة، مما يوفر موارد الشبكة والمعالج.'
      }
    ];

    const quizIndex = ref(0);
    const quizScore = ref(0);
    const quizAnswered = ref(false);
    const quizSelectedIdx = ref(null);
    const quizCompleted = ref(false);

    const currentQuizQuestion = computed(() => quizQuestions[quizIndex.value]);

    function answerQuiz(optionIdx) {
      if (quizAnswered.value) return;
      quizSelectedIdx.value = optionIdx;
      quizAnswered.value = true;
      if (optionIdx === currentQuizQuestion.value.correctIdx) {
        quizScore.value++;
        triggerToast('إجابة صحيحة وممتازة! 🎉');
      } else {
        triggerToast('إجابة خاطئة! راجع الشرح بالأسفل');
      }
    }

    function getQuizOptionClass(idx) {
      if (!quizAnswered.value) {
        return 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-gray-200';
      }
      if (idx === currentQuizQuestion.value.correctIdx) {
        return 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold';
      }
      if (quizSelectedIdx.value === idx && idx !== currentQuizQuestion.value.correctIdx) {
        return 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold';
      }
      return 'bg-slate-900/40 border-slate-800 text-gray-500 opacity-60';
    }

    function nextQuizQuestion() {
      if (quizIndex.value + 1 < quizQuestions.length) {
        quizIndex.value++;
        quizAnswered.value = false;
        quizSelectedIdx.value = null;
      } else {
        quizCompleted.value = true;
      }
    }

    function restartQuiz() {
      quizIndex.value = 0;
      quizScore.value = 0;
      quizAnswered.value = false;
      quizSelectedIdx.value = null;
      quizCompleted.value = false;
    }

    // ==========================================
    // Scratchpad Console State
    // ==========================================
    const scratchpadInput = ref(`// جرب أي كود JavaScript هنا\\nconst list = [10, 20, 30, 40];\\nconst doubled = list.map(n => n * 2);\\nconsole.log('Doubled Array:', doubled);\\nreturn doubled.reduce((a, b) => a + b, 0);`);
    const scratchpadOutput = ref('');

    function runScratchpad() {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '));
        originalLog(...args);
      };

      try {
        const fn = new Function(scratchpadInput.value);
        const result = fn();
        if (result !== undefined) {
          logs.push(`=> Return Value: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : result}`);
        }
        scratchpadOutput.value = logs.join('\\n');
        triggerToast('تم تشغيل الكود بنجاح ✓');
      } catch (err) {
        scratchpadOutput.value = `❌ Error: ${err.message}`;
      } finally {
        console.log = originalLog;
      }
    }

    // Keyboard Shortcuts Listener (Ctrl + K, ?, Esc)
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInputRef.value) {
          searchInputRef.value.focus();
          searchInputRef.value.select();
        }
      }
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        showShortcutsModal.value = !showShortcutsModal.value;
      }
      if (e.key === 'Escape') {
        showDropdown.value = false;
        showShortcutsModal.value = false;
        demoModalOpen.value = false;
        inspectedNuxtComp.value = null;
      }
    }

    let clockInterval = null;
    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
      clockInterval = setInterval(updateLiveClock, 1000);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
      if (clockInterval) clearInterval(clockInterval);
    });

    return {
      rawLexiconData,
      appMode,
      setAppMode,
      activeCategory,
      setCategory,
      categoriesList,
      getCategoryCount,
      selectedLetter,
      setLetter,
      alphabetLetters,
      hasTermsForLetter,
      filteredTermsList,
      selectedTerm,
      selectTerm,
      detailTab,
      searchQuery,
      searchFocused,
      searchInputRef,
      dropdownSuggestions,
      showDropdown,
      highlightedDropdownIndex,
      handleSearchBlur,
      navigateDropdown,
      selectHighlightedDropdown,
      selectDropdownItem,
      closeDropdown,
      clearSearch,
      activateDynamicFallback,
      resetFilters,
      pronounceTerm,
      copyCode,
      bookmarkedIds,
      isBookmarked,
      toggleBookmark,
      toastMessage,
      toastVisible,
      triggerToast,
      showShortcutsModal,
      // Nuxt Component Inspector Modal in Lab
      inspectedNuxtComp,
      inspectNuxtComponent,
      goToLexiconDetailedView,
      // Nuxt UI Playground
      nuxtButtonColor,
      nuxtButtonVariant,
      nuxtButtonSize,
      nuxtButtonLabel,
      nuxtButtonIcon,
      nuxtButtonTrailing,
      nuxtButtonLoading,
      nuxtButtonDisabled,
      nuxtButtonBlock,
      playgroundClickCount,
      playgroundButtonPulsing,
      handlePlaygroundButtonClick,
      applyButtonPreset,
      getPlaygroundButtonClass,
      decreaseCartQty,
      removeJsTask,
      selectNuxtColor,
      selectNuxtVariant,
      selectNuxtSize,
      selectNuxtIcon,
      generatedNuxtButtonCode,
      nuxtUiCatalog,
      // Rich Frontend Demos
      jsFilterRole,
      jsFilterSearch,
      filteredJsUsers,
      jsMapCurrency,
      mappedProducts,
      jsCartItems,
      jsCartTotal,
      jsClickCount,
      jsEventLog,
      handleJsButtonClick,
      jsFetchLoading,
      jsFetchedUser,
      triggerJsFetch,
      jsNewTaskText,
      jsTaskList,
      jsAddTask,
      jsThemePref,
      saveThemePref,
      jsTimerRunning,
      jsTimerFinished,
      startJsTimer,
      jsRegexInput,
      jsRandomNumber,
      jsRandomBgColor,
      rollRandomNumber,
      jsFormattedDate,
      jsCurrentTime,
      jsTagsInput,
      jsTagsArray,
      jsUserData,
      jsKeystrokeCount,
      jsDebounceTriggerCount,
      handleDebounceInput,
      // Standard Demos
      demoCounter,
      demoInputText,
      demoAlertVisible,
      demoSwitchVal,
      demoModalOpen,
      demoBorderRadius,
      demoBoxShadowBlur,
      // Quiz
      quizQuestions,
      quizIndex,
      quizScore,
      quizAnswered,
      quizSelectedIdx,
      quizCompleted,
      currentQuizQuestion,
      answerQuiz,
      getQuizOptionClass,
      nextQuizQuestion,
      restartQuiz,
      // Scratchpad
      scratchpadInput,
      scratchpadOutput,
      runScratchpad
    };
  }
}).mount('#app');
<\\/script>
</body>
</html>
"""

final_html = html_template.replace("__RAW_LEXICON_JSON__", safe_raw_json)
final_html = final_html.replace("<\\/script>", "</script>")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(final_html)

print(f"index.html successfully updated! File size: {len(final_html):,} bytes")
