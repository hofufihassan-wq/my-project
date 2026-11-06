<template>
  <section class="lesson"><p>مرر المؤشر على الزر، ثم اضغط Tab للوصول إلى الحقل.</p><button class="nav-pill">مرر المؤشر هنا</button><label for="search-term">مصطلح البحث</label><input id="search-term" class="search-input" placeholder="اضغط هنا أو استخدم Tab" /></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.nav-pill { padding: 12px 18px; color: white; background: #0f172a; border: 2px solid #475569; border-radius: 24px; }
.nav-pill:hover { background-color: rgba(0, 220, 130, .15); border-color: #00dc82; }
label { display: block; margin: 20px 0 8px; }
.search-input { padding: 12px; max-width: 100%; box-sizing: border-box; color: white; background: #0f172a; border: 2px solid #475569; border-radius: 8px; }
.search-input:focus { outline: none; border-color: #00dc82; box-shadow: 0 0 0 3px rgba(0, 220, 130, .25); }
</style>
