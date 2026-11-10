<template>
  <section class="lesson"><p>فوق 600px: عمود للقائمة وضعف عرضه للمحتوى؛ تحتها عمود واحد.</p><div class="app-workspace"><aside>قائمة الدروس</aside><article>تفاصيل الدرس في العمود الأوسع</article></div></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.app-workspace { display: grid; grid-template-columns: 4fr 8fr; gap: 24px; }
.app-workspace > * { min-width: 0; padding: 16px; background: #064e3b; }
@media (max-width: 600px) { .app-workspace { grid-template-columns: 1fr; } }
</style>
