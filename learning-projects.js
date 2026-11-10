/* Read-only catalogue; projects use the existing guided engine and backup store. */
(function(root){
'use strict';if(!root.Vue)return;
const component={emits:['open'],setup(_,{emit}){
 const {ref,computed,onUnmounted}=root.Vue,store=root.VLexLearningStore;
 const projects=root.VLexGuidedLessons.projects;
 const saved=ref(store.getSection('guided',{})),unsubscribe=store.subscribe(()=>saved.value=store.getSection('guided',{}));onUnmounted(()=>unsubscribe());
 const ready=p=>{const state=saved.value.lessons?.[p.id];return !!state&&root.VLexGuided.ready(p,state)};
 const titles=Object.fromEntries(root.VLexGuidedLessons.units.map(l=>[l.id,l.title]));
 return{projects,saved,ready,titles,emit};
},template:`<section class="vlex-learning-projects" aria-labelledby="learning-projects-title" data-testid="learning-projects"><header><h2 id="learning-projects-title">المشاريع العملية الستة</h2><p>من صفحة شخصية إلى تطبيق Vue: خطوات واضحة، كود وتجربة حقيقية، تلميحات وفحوص وحفظ تلقائي.</p></header><div class="vlp-project-grid"><article v-for="(project,index) in projects" :key="project.id" class="vlp-record-card" :data-learning-project="project.id"><p class="vlc-eyebrow">المشروع {{index+1}} · {{project.language==='javascript'?'JavaScript':project.language==='vue'?'Vue 3':'HTML + CSS'}}</p><h3>{{project.title}}</h3><p>{{project.skills.join(' · ')}}</p><p :class="{'guided-project-passed':ready(project)}">{{ready(project)?'✓ اجتاز الكود الحالي الفحوص والأسئلة':saved.lessons?.[project.id]?'مسودة محفوظة · المرحلة '+((saved.lessons[project.id].step||0)+1)+' من 8':'جاهز للبدء'}}</p><button type="button" @click="emit('open',project.id)" :data-testid="'open-'+project.id">{{saved.lessons?.[project.id]?'استكمل المشروع':'ابدأ المشروع'}}</button><details><summary>الدروس والمهارات المرتبطة</summary><button type="button" v-for="id in project.prerequisites" :key="id" @click="emit('open',id)">{{titles[id]||id}}</button></details></article></div></section>`};
(root.VLexPlatformComponents=root.VLexPlatformComponents||[]).push({name:'vlex-learning-projects',component});
})(typeof window!=='undefined'?window:globalThis);
