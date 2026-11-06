<template>
  <section class="lesson"><p>مرر المؤشر لتكبير الزر ورفعه؛ اضغط مطولًا لتصغيره.</p><button class="interactive-btn">مرر المؤشر ثم اضغط</button></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.interactive-btn { margin: 24px; padding: 20px; color: white; background: #065f46; border: 1px solid #34d399; border-radius: 12px; cursor: pointer; transition: transform .2s cubic-bezier(.4, 0, .2, 1); }
.interactive-btn:hover { transform: translateY(-2px) scale(1.02); }
.interactive-btn:active { transform: translateY(0) scale(.98); }
@media (prefers-reduced-motion: reduce) { .interactive-btn { transition: none; } }
</style>
