<template>
  <section class="lesson"><p>في صف الأزرار الفاصل 12px.</p><div class="buttons-group"><button>أول</button><button>ثانٍ</button><button>ثالث</button></div><p>في الشبكة: 24px بين الصفوف و32px بين الأعمدة.</p><div class="cards-grid"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.buttons-group { display: flex; gap: 12px; }
.cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px 32px; }
.buttons-group button, .cards-grid > div { padding: 12px; color: white; border: 0; background: #065f46; }
</style>
