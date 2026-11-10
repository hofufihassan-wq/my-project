<template>
  <section class="lesson"><p>اسحب شريط التمرير لرؤية بقية القائمة؛ العرض الأفقي مقصوص.</p><div class="terms-scroll-list" tabindex="0" aria-label="قائمة قابلة للتمرير"><p>HTML: هيكل الصفحة</p><p>CSS: شكل الصفحة</p><p>JavaScript: التفاعل</p><p>Vue: بناء الواجهات</p><p>DOM: عناصر المستند</p><p>Flexbox: ترتيب العناصر</p></div></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.terms-scroll-list { height: 120px; width: 240px; max-width: 100%; overflow-y: auto; overflow-x: hidden; scrollbar-width: thin; background: #064e3b; }
.terms-scroll-list p { width: 360px; padding: 12px; margin: 0; border-bottom: 1px solid #34d399; }
</style>
