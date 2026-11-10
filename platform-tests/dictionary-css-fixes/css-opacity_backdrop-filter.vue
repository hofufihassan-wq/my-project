<template>
  <section class="lesson"><p>اللوحة الزجاجية تموّه الخلفية؛ opacity يشفّف العنصر ومحتوياته معًا.</p><div class="glass-scene"><div class="scene-pattern">خلفية خلف الزجاج</div><div class="nuxt-glass-header">backdrop-filter: blur(16px)</div></div><p class="faded-note">هذا النص مع صندوقه بشفافية50%</p></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.glass-scene { position: relative; min-height: 160px; background: repeating-linear-gradient(45deg, #00dc82 0 12px, #164e63 12px 24px); }
.scene-pattern { padding: 20px; color: #020420; font-size: 24px; font-weight: bold; }
.nuxt-glass-header { position: absolute; left: 16px; right: 16px; bottom: 16px; padding: 20px; background-color: rgba(2, 4, 32, .55); backdrop-filter: blur(16px); border: 1px solid rgba(0, 220, 130, .4); }
.faded-note { padding: 16px; background: #065f46; opacity: .5; }
</style>
