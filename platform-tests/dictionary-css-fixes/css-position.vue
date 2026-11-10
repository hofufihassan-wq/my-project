<template>
  <section class="lesson"><p>الأيقونة تتموضع بالنسبة لحاوية البحث، وليس الصفحة.</p><div class="search-wrapper"><input aria-label="حقل بحث" placeholder="اكتب مصطلحًا" /><span class="search-glass-icon" aria-hidden="true">⌕</span></div></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.search-wrapper { position: relative; width: 280px; max-width: 100%; }
.search-wrapper input { width: 100%; height: 56px; box-sizing: border-box; padding: 12px 48px 12px 12px; background: #0f172a; color: white; border: 1px solid #34d399; border-radius: 8px; }
.search-glass-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); font-size: 28px; line-height: 1; }
</style>
