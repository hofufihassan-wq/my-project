<template>
  <section class="lesson"><p>العناصر الظاهرة مرتبة في صف Flex؛ العنصر الثالث موجود في HTML لكنه مخفي.</p><div class="custom-flex-row"><span>الأول</span><span>الثاني</span><span class="hidden-element">هذا النص مخفي</span></div></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.custom-flex-row { display: flex; align-items: center; gap: 16px; }
.custom-flex-row span { padding: 16px; background: #065f46; }
.hidden-element { display: none; }
</style>
