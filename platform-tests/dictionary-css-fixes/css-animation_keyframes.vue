<template>
  <section class="lesson"><p>الحركة تمر بثلاث مراحل: حجم عادي، تكبير بسيط، ثم رجوع.</p><div class="pulse-card">راقب النبض حول البطاقة</div></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.pulse-card { margin: 24px; padding: 24px; background: #064e3b; border-radius: 16px; animation: pulseGlow 2s infinite ease-in-out; }
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(0, 220, 130, .2); transform: scale(1); }
  50% { box-shadow: 0 0 30px rgba(0, 220, 130, .6); transform: scale(1.03); }
}
/* احترام تفضيل تقليل الحركة عند المستخدم */
@media (prefers-reduced-motion: reduce) { .pulse-card { animation: none; } }
</style>
