<template>
  <section class="lesson"><p>قارن النص المموه بالنجمة ذات الظل الذي يتبع شكلها.</p><div class="blurred-backdrop">نص عليه blur(3px)</div><svg class="glowing-logo" viewBox="0 0 100 100" width="100" height="100" aria-label="نجمة بظل أخضر" role="img"><polygon points="50,5 61,35 95,35 68,55 79,90 50,69 21,90 32,55 5,35 39,35" fill="#00dc82" /></svg></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.blurred-backdrop { padding: 20px; font-size: 24px; filter: blur(3px); }
.glowing-logo { margin: 20px; filter: drop-shadow(0 0 12px rgba(0, 220, 130, .6)); }
</style>
