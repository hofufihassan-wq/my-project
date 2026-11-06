<template>
  <section class="lesson"><p>مرر المؤشر على الزر لتقوية الظل.</p><button class="nuxt-glow-button">مرر المؤشر هنا</button></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.nuxt-glow-button { padding: 16px 24px; margin: 24px; color: #ecfdf5; background: #064e3b; border: 1px solid #00dc82; border-radius: 12px; box-shadow: 0 0 25px -5px rgba(0, 220, 130, .4); transition: box-shadow .3s ease; cursor: pointer; }
.nuxt-glow-button:hover { box-shadow: 0 0 35px 2px rgba(0, 220, 130, .6); }
</style>
