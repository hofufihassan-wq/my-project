<template>
  <section class="lesson"><p>القائمة z-index:50 داخل سياق40؛ تغطي اللوحة التي في سياق10.</p><div class="stack-demo"><div class="search-section">البحث<div class="search-dropdown-menu">نتائج البحث فوق اللوحة</div></div><div class="tabs-filter-section">لوحة المحتوى في الخلف</div></div></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.stack-demo { position: relative; height: 200px; isolation: isolate; }
.search-section { position: relative; z-index: 40; height: 48px; padding: 12px; box-sizing: border-box; background: #164e63; }
.search-dropdown-menu { position: absolute; z-index: 50; top: 40px; left: 16px; right: 16px; height: 80px; padding: 12px; box-sizing: border-box; background: #047857; border: 2px solid #6ee7b7; }
.tabs-filter-section { position: relative; z-index: 10; height: 120px; padding: 24px; background: #7f1d1d; }
</style>
