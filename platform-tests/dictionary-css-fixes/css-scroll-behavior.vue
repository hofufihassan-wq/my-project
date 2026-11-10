<template>
  <section class="lesson"><p>اضغط الزر؛ حاوية الدروس تتحرك بسلاسة إلى القسم الثاني.</p><button type="button" class="chapter-link" @click="$refs.chapters.scrollTo({ top: 320 })">انتقل للقسم الثاني</button><div ref="chapters" class="lexicon-container" tabindex="0"><section class="chapter"><h2>القسم الأول</h2><p>هذه مساحة قابلة للتمرير داخل المثال.</p></section><section id="chapter-two" class="chapter"><h2>القسم الثاني</h2><p>وصلت هنا باستخدام scrollTo، وCSS حدّد سلاسة الحركة.</p></section></div></section>
</template>

<style scoped>
.lesson { direction: rtl; color: #e2e8f0; background: #020617; padding: 20px; font: 16px/1.6 Arial, sans-serif; }
.lesson p { margin: 0 0 16px; }
.lesson h2 { margin: 0 0 12px; font-size: 20px; }

.chapter-link { color: #6ee7b7; background: #064e3b; border: 1px solid #34d399; border-radius: 8px; padding: 8px 12px; cursor: pointer; display: inline-block; margin-bottom: 12px; }
.lexicon-container { height: 160px; overflow-y: auto; scroll-behavior: smooth; border: 1px solid #34d399; }
.chapter { min-height: 320px; padding: 16px; box-sizing: border-box; background: #164e63; }
.chapter + .chapter { background: #064e3b; }
@media (prefers-reduced-motion: reduce) { .lexicon-container { scroll-behavior: auto; } }
</style>
