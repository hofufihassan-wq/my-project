<template>
  <section class="lesson"><p>Flex يوزّع المساحة الحرة بين الشعار والروابط.</p><nav class="header-navbar" aria-label="مثال شريط تنقل"><strong>شعار</strong><span>دروس</span><span>قاموس</span></nav></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.header-navbar { display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 24px; padding: 16px; background: #064e3b; }
.header-navbar > * { padding: 8px; background: #0f172a; }
</style>
