<template>
  <section class="lesson"><p>غيّر عرض نافذة المعاينة: تحت600px عمود، وابتداءً منها صف.</p><div class="sidebar-layout"><aside>القائمة</aside><main>محتوى الدرس</main></div></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.sidebar-layout { display: flex; flex-direction: column; gap: 16px; }
.sidebar-layout > * { padding: 20px; background: #065f46; flex: 1; }
@media (min-width: 600px) { .sidebar-layout { flex-direction: row; } }
</style>
