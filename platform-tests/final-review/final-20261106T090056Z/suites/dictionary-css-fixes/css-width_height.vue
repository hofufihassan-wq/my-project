<template>
  <section class="lesson"><p>الحاوية تأخذ100% حتى سقف320px؛ ارتفاعها الأدنى120px. المربع80×80.</p><div class="container-responsive"><div class="fixed-square">80×80</div></div></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.container-responsive { width: 100%; max-width: 320px; min-height: 120px; margin: 0 auto; background: #164e63; }
.fixed-square { width: 80px; height: 80px; background: #065f46; display: grid; place-items: center; }
</style>
