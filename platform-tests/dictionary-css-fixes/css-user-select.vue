<template>
  <section class="lesson"><p>جرّب تحديد النص: الزر يمنع التحديد، وسطر الكود يحدد كله بنقرة.</p><button class="no-select-btn">لا يمكن تحديد نص الزر</button><pre class="code-block">const score = 100;</pre><p class="normal-text">وهذا نص عادي يمكن تحديد جزء منه.</p></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.no-select-btn { user-select: none; -webkit-user-select: none; padding: 16px; color: white; background: #065f46; border: 1px solid #34d399; }
.code-block { user-select: all; direction: ltr; padding: 16px; background: #0f172a; }
.normal-text { user-select: text; }
</style>
