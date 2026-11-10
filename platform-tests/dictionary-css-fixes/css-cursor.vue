<template>
  <section class="lesson"><p>مرر المؤشر على العنصرين وقارن شكله.</p><details class="clickable-card"><summary>افتح الملاحظة: مؤشر يد</summary><p>cursor يغيّر شكل المؤشر؛ details هو الذي يفتح الملاحظة عند النقر.</p></details><button class="disabled-button" disabled>زر معطل: مؤشر منع</button><p>disabled هو الذي يعطّل الزر، وليس شكل المؤشر.</p></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.clickable-card, .disabled-button { display: inline-block; margin: 8px; padding: 16px; border: 1px solid #34d399; border-radius: 8px; background: #064e3b; color: white; }
.clickable-card { cursor: pointer; }
.disabled-button { cursor: not-allowed; opacity: .6; }
</style>
