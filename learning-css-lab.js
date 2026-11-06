/* V Lex Pro — local CSS workbench. No user source is executed in the parent. */
(function (root) {
  'use strict';
  const START = '/* VLEX-LAB:START */';
  const END = '/* VLEX-LAB:END */';
  const MAX_SOURCE = 100000;
  const metrics = [
    { key: 'margin', label: 'الهامش الخارجي', property: 'margin', samples: [16, 1, 2], limits: [[-64,120],[-4,8],[-10,20]] },
    { key: 'padding', label: 'المسافة الداخلية', property: 'padding', samples: [24, 1.5, 3], limits: [[0,120],[0,8],[0,20]] },
    { key: 'fontSize', label: 'حجم الخط', property: 'font-size', samples: [18, 1.125, 110], limits: [[8,72],[0.5,4],[50,300]] },
    { key: 'width', label: 'العرض', property: 'width', samples: [480, 30, 90], limits: [[120,1200],[8,75],[10,100]] },
    { key: 'height', label: 'الارتفاع', property: 'height', samples: [240, 15, 40], limits: [[100,1000],[6,60],[10,100]] },
    { key: 'gap', label: 'المسافة بين العناصر', property: 'gap', samples: [12, 0.75, 2], limits: [[0,80],[0,5],[0,20]] },
    { key: 'radius', label: 'استدارة الزوايا', property: 'border-radius', samples: [12, 0.75, 3], limits: [[0,120],[0,8],[0,50]] }
  ];
  const units = ['px','rem','%'];
  const choices = {
    display:['flex','grid','block'], direction:['row','column','row-reverse','column-reverse'],
    justify:['flex-start','center','flex-end','space-between','space-around','space-evenly'],
    align:['stretch','flex-start','center','flex-end','baseline'], wrap:['wrap','nowrap','wrap-reverse']
  };
  const defaultHTML = '<main id="lab-target">\n  <div class="lab-item">HTML يبني المحتوى</div>\n  <div class="lab-item">CSS يغيّر المظهر</div>\n  <div class="lab-item">جرّب بنفسك</div>\n</main>';
  const baseCSS = '/* هذا قسمك الحر. غيّره وجرب النتيجة. */\nhtml { font-size: 16px; }\nhtml, body { margin: 0; min-height: 100%; }\nbody { font-family: system-ui, sans-serif; background: #f6f8fb; padding: 12px; }\n.lab-item { padding: 14px; background: #d1fae5; border: 1px solid #6ee7b7; border-radius: 8px; }\n';
  function defaults() {
    const controls = {background:'#ecfdf5',foreground:'#12312b',display:'flex',direction:'row',justify:'flex-start',align:'stretch',wrap:'wrap',columns:2};
    for(const m of metrics) controls[m.key]={value:m.samples[0],unit:'px'};
    return controls;
  }
  function limits(key, unit) { const m=metrics.find(m=>m.key===key);return m && units.includes(unit) ? m.limits[units.indexOf(unit)] : null; }
  function validate(c) {
    if (!c || typeof c !== 'object') return 'إعدادات الأدوات غير صالحة.';
    for (const m of metrics) {
      const value=c[m.key], bound=value && limits(m.key,value.unit);
      if (!bound || typeof value.value !== 'number' || !Number.isFinite(value.value) || value.value<bound[0] || value.value>bound[1]) return 'قيمة '+m.label+' خارج المجال المتاح؛ لم تتغير المعاينة.';
    }
    for(const [key,values] of Object.entries(choices)) if(!values.includes(c[key])) return 'قيمة '+key+' غير مدعومة.';
    if(!Number.isInteger(c.columns)||c.columns<1||c.columns>6) return 'عدد الأعمدة من 1 إلى 6.';
    if(!/^#[0-9a-f]{6}$/i.test(c.background)||!/^#[0-9a-f]{6}$/i.test(c.foreground)) return 'اللون يجب أن يكون بصيغة HEX من ست خانات.';
    return '';
  }
  function rule(c) {
    const error=validate(c);if(error)throw new Error(error);
    const rows=['#lab-target {','  box-sizing: border-box;'];
    for(const m of metrics) rows.push('  '+m.property+': '+c[m.key].value+c[m.key].unit+';');
    rows.push('  background-color: '+c.background+';','  color: '+c.foreground+';','  display: '+c.display+';','  flex-direction: '+c.direction+';','  justify-content: '+c.justify+';','  align-items: '+c.align+';','  flex-wrap: '+c.wrap+';','  grid-template-columns: repeat('+c.columns+', minmax(0, 1fr));','}');
    return START+'\n'+rows.join('\n')+'\n'+END;
  }
  function updateManagedCSS(css,c) {
    const generated=rule(c), start=css.indexOf(START),end=css.indexOf(END,start<0?0:start+START.length);
    if(start>=0 && end>=start) return css.slice(0,start)+generated+css.slice(end+END.length);
    return css+(css.endsWith('\n')?'':'\n')+'\n'+generated+'\n';
  }
  function previewDocument(html,css) {
    if(typeof html!=='string'||typeof css!=='string'||html.length>MAX_SOURCE||css.length>MAX_SOURCE)throw new Error('حجم HTML أو CSS يتجاوز 100 ألف محرف؛ لم تُقص مسودتك.');
    const safeCSS=css.replace(/<\/style/gi,'<\\/style');
    // A detached template is inert: source never enters the application DOM.
    // CSP blocks resources, but cannot reliably block an anchor's own-frame
    // navigation in every browser. Disable navigation in the preview copy only.
    let safeHTML=html;
    if(root.document?.createElement){
      const template=root.document.createElement('template');template.innerHTML=html;
      const clean=fragment=>{for(const el of fragment.querySelectorAll('*')){
        if(['a','area'].includes(el.localName)){el.removeAttribute('href');el.removeAttribute('xlink:href');el.removeAttribute('target');el.removeAttribute('download');}
        if(el.localName==='meta'&&el.getAttribute('http-equiv')?.toLowerCase()==='refresh')el.remove();
        if(el.localName==='template'&&el.content)clean(el.content);
      }};
      clean(template.content);safeHTML=template.innerHTML;
    }
    return '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'none\'; style-src \'unsafe-inline\'; img-src data:; font-src \'none\'; connect-src \'none\'; form-action \'none\'; base-uri \'none\';"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+safeCSS+'</style></head><body>'+safeHTML+'</body></html>';
  }
  const api={metrics,units,choices,defaults,limits,validate,rule,updateManagedCSS,previewDocument,MAX_SOURCE,START,END};
  root.VLexCSSLab=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(!root.Vue)return;
  const component={
    name:'VLexCSSLab',
    setup(){
      const {ref,computed,watch,onBeforeUnmount}=root.Vue;
      const store=root.VLexLearningStore;
      let saved;try{saved=store?.getSection('cssLab',null);}catch(_){}
      const controls=ref(saved?.controls && !validate(saved.controls)?JSON.parse(JSON.stringify(saved.controls)):defaults());
      const html=ref(typeof saved?.html==='string'?saved.html:defaultHTML);
      const css=ref(typeof saved?.css==='string'?saved.css:baseCSS+'\n'+rule(controls.value)+'\n');
      const autoRun=ref(saved?.autoRun!==false),status=ref(''),error=ref(''),storageWarning=ref(''),frameDoc=ref(''),loaded=ref(false),savedRevision=ref(0),previewRevision=ref(-1);
      const currentCSS= computed(()=>css.value), stale=computed(()=>savedRevision.value!==previewRevision.value);
      const managedMatches= computed(()=>{try{return css.value.includes(rule(controls.value));}catch(_){return false;}});
      let timer=null,restoring=false,composing=false,lastSection=JSON.stringify(saved||{});
      const draftState=()=>({version:1,html:html.value,css:css.value,controls:JSON.parse(JSON.stringify(controls.value)),autoRun:autoRun.value});
      function persist(){
        const state=draftState();lastSection=JSON.stringify(state);
        try { const ok=store?.setSection('cssLab',state); storageWarning.value=ok===false?'تعذر الحفظ الدائم؛ مسودتك في الجلسة فقط. انسخ HTML وCSS قبل الإغلاق.':store?'':'الحفظ المشترك غير متاح؛ انسخ مسودتك قبل الإغلاق.'; }
        catch(_){ storageWarning.value='تعذر الحفظ الدائم؛ انسخ مسودتك قبل الإغلاق.'; }
      }
      function run(){
        if(timer){clearTimeout(timer);timer=null;}
        try{frameDoc.value=previewDocument(html.value,css.value);previewRevision.value=savedRevision.value;loaded.value=false;error.value='';status.value='تُحدّث المعاينة داخل إطار معزول.';}
        catch(e){error.value=e.message;}
      }
      function schedule(){if(restoring)return;savedRevision.value++;persist();if(timer)clearTimeout(timer);if(autoRun.value&&!composing)timer=setTimeout(run,220);}
      function compositionStart(){composing=true;if(timer){clearTimeout(timer);timer=null;}}
      function compositionEnd(){composing=false;if(autoRun.value){if(timer)clearTimeout(timer);timer=setTimeout(run,220);}}
      function updateControls(){
        const problem=validate(controls.value);if(problem){error.value=problem;return;}
        error.value='';css.value=updateManagedCSS(css.value,controls.value);
      }
      function setUnit(key,unit){const m=metrics.find(m=>m.key===key);if(!m||!units.includes(unit))return;controls.value[key]={value:m.samples[units.indexOf(unit)],unit};updateControls();}
      function metricLimit(key,unit,edge){return limits(key,unit)?.[edge];}
      function frameLoaded(){loaded.value=true;status.value='تحميل المعاينة تم. غيّر أداة ولاحظ العنصر #lab-target؛ التحميل وحده لا يثبت أن CSS يحقق قصدك.';}
      async function copyCSS(){
        try{if(!root.navigator?.clipboard?.writeText)throw new Error('unavailable');await root.navigator.clipboard.writeText(css.value);status.value='نُسخ CSS الحالي كاملًا.';}
        catch(_){status.value='تعذر النسخ التلقائي. حدد النص في محرر CSS وانسخه يدويًا.';}
      }
      function exportCSS(){const blob=new Blob([css.value],{type:'text/css;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='vlex-css-lab.css';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.value='طُلب تنزيل CSS الحالي. احتفظ أيضًا بـHTML إذا غيرت بنية العناصر.';}
      watch([html,css,autoRun],schedule,{flush:'sync'});
      const unsubscribe=store?.subscribe?.(state=>{const incoming=state.cssLab;if(!incoming||JSON.stringify(incoming)===lastSection)return;lastSection=JSON.stringify(incoming);restoring=true;try{html.value=typeof incoming.html==='string'?incoming.html:defaultHTML;controls.value=incoming.controls&&!validate(incoming.controls)?JSON.parse(JSON.stringify(incoming.controls)):defaults();css.value=typeof incoming.css==='string'?incoming.css:baseCSS+'\n'+rule(controls.value)+'\n';autoRun.value=incoming.autoRun!==false;savedRevision.value++;if(timer){clearTimeout(timer);timer=null;}status.value='استُعيدت مسودة CSS من النسخة المستوردة. اضغط تطبيق المعاينة لعرضها.';}finally{restoring=false;}});
      onBeforeUnmount(()=>{if(timer)clearTimeout(timer);unsubscribe?.();});
      // Initial restored sources are never scripts; the iframe forbids scripts and network.
      run();
      return{metrics,units,choices,controls,html,css,currentCSS,autoRun,status,error,storageWarning,frameDoc,loaded,stale,managedMatches,run,updateControls,setUnit,metricLimit,frameLoaded,copyCSS,exportCSS,compositionStart,compositionEnd};
    },
    template:`<section class="vlex-css-lab" dir="rtl" aria-labelledby="vlex-css-title">
      <header class="vlex-css-heading"><div><p class="vlex-css-eyebrow">تعلم بالتجربة</p><h2 id="vlex-css-title">مختبر CSS</h2><p>HTML يعطي الصفحة عناصرها، وCSS يحدد شكلها. غيّر قيمة واحدة، ثم لاحظ الفرق.</p></div><div class="vlex-css-actions"><button type="button" @click="run" data-testid="css-lab-run">تطبيق المعاينة</button><label><input type="checkbox" v-model="autoRun" aria-label="التحديث التلقائي لمختبر CSS"> تحديث تلقائي</label></div></header>
      <p class="vlex-css-notice">الأدوات تؤثر في العنصر <code dir="ltr">#lab-target</code>. نكتب قواعدها في القسم المحدد من CSS؛ عند تغيير أداة نعيد توليد هذا القسم فقط، ونحافظ على كودك خارجه. التنسيق الحر الأقوى مثل <code>!important</code> قد يتغلب على الأداة. JavaScript والموارد الخارجية وروابط التنقل معطلة في نسخة المعاينة؛ نص محررك يبقى كما كتبته.</p>
      <p v-if="error" role="alert" class="vlex-css-error">{{error}}</p><p v-if="storageWarning" role="alert" class="vlex-css-error">{{storageWarning}}</p>
      <div class="vlex-css-grid"><aside class="vlex-css-controls" aria-label="أدوات تنسيق CSS">
        <h3>غيّر القيم وشاهد النتيجة</h3>
        <div v-for="metric in metrics" :key="metric.key" class="vlex-css-metric"><label :for="'css-lab-'+metric.key">{{metric.label}}</label><div><input :id="'css-lab-'+metric.key" type="number" :min="metricLimit(metric.key,controls[metric.key].unit,0)" :max="metricLimit(metric.key,controls[metric.key].unit,1)" step="any" v-model.number="controls[metric.key].value" @input="updateControls" :aria-label="metric.label" :data-testid="'css-lab-'+metric.key"><select :value="controls[metric.key].unit" @change="setUnit(metric.key,$event.target.value)" :aria-label="'وحدة '+metric.label" :data-testid="'css-lab-'+metric.key+'-unit'"><option v-for="unit in units" :key="unit" :value="unit">{{unit}}</option></select></div></div>
        <div class="vlex-css-metric"><label for="css-lab-bg">لون الخلفية</label><input id="css-lab-bg" type="color" v-model="controls.background" @input="updateControls" data-testid="css-lab-background"></div>
        <div class="vlex-css-metric"><label for="css-lab-fg">لون النص</label><input id="css-lab-fg" type="color" v-model="controls.foreground" @input="updateControls" data-testid="css-lab-foreground"></div>
        <label class="vlex-css-select">نوع التخطيط <select v-model="controls.display" @change="updateControls" aria-label="نوع التخطيط" data-testid="css-lab-display"><option v-for="option in choices.display" :value="option">{{option}}</option></select></label>
        <template v-if="controls.display==='flex'"><label class="vlex-css-select">اتجاه Flex <select v-model="controls.direction" @change="updateControls" aria-label="اتجاه Flex" data-testid="css-lab-direction"><option v-for="option in choices.direction" :value="option">{{option}}</option></select></label><label class="vlex-css-select">التفاف Flex <select v-model="controls.wrap" @change="updateControls" aria-label="التفاف Flex" data-testid="css-lab-wrap"><option v-for="option in choices.wrap" :value="option">{{option}}</option></select></label></template>
        <label v-if="controls.display==='grid'" class="vlex-css-select">أعمدة Grid <input type="number" min="1" max="6" v-model.number="controls.columns" @input="updateControls" aria-label="أعمدة Grid" data-testid="css-lab-columns"></label>
        <label class="vlex-css-select">التوزيع الرئيسي <select v-model="controls.justify" @change="updateControls" aria-label="التوزيع الرئيسي" data-testid="css-lab-justify"><option v-for="option in choices.justify" :value="option">{{option}}</option></select></label>
        <label class="vlex-css-select">المحاذاة العرضية <select v-model="controls.align" @change="updateControls" aria-label="المحاذاة العرضية" data-testid="css-lab-align"><option v-for="option in choices.align" :value="option">{{option}}</option></select></label>
        <p class="vlex-css-small">px حجم ثابت، rem نسبة إلى خط جذر المعاينة (16px افتراضيًا)، و% تعتمد على العنصر الحاوي. ارتفاع % يحتاج ارتفاعًا محددًا للحاوي. تغيير الوحدة يضع قيمة بداية مناسبة؛ ليس تحويلًا حسابيًا للقيمة السابقة.</p>
      </aside><div class="vlex-css-workspace"><div class="vlex-css-editors"><label>كود HTML<textarea v-model="html" @compositionstart="compositionStart" @compositionend="compositionEnd" spellcheck="false" dir="ltr" aria-label="كود HTML لمختبر CSS" data-testid="css-lab-html"></textarea></label><label>كود CSS الكامل<textarea v-model="css" @compositionstart="compositionStart" @compositionend="compositionEnd" spellcheck="false" dir="ltr" aria-label="كود CSS لمختبر CSS" data-testid="css-lab-css"></textarea></label></div>
        <div class="vlex-css-toolbar"><button type="button" @click="copyCSS" data-testid="css-lab-copy">نسخ CSS الحالي</button><button type="button" @click="exportCSS" data-testid="css-lab-export">تنزيل CSS</button><span v-if="stale">عندك تغييرات لم تُطبَّق بعد</span><span v-else>المعاينة تعرض الكود الحالي</span></div>
        <p v-if="!managedMatches" class="vlex-css-small">عدلت القسم المدار أو حذفته يدويًا؛ المعاينة تطبق CSS كما كتبته. تغيير أي أداة يعيد توليد قاعدتها.</p>
        <div class="vlex-css-preview"><iframe :srcdoc="frameDoc" sandbox="" title="معاينة CSS معزولة" @load="frameLoaded" data-testid="css-lab-preview"></iframe></div>
        <p role="status" aria-live="polite" class="vlex-css-status">{{status}}</p>
        <details class="vlex-css-help"><summary>ليش أحيانًا ما أشوف تأثير الأداة؟</summary><p>تأكد أن HTML فيه عنصر بالمعرّف lab-target. بعض الخصائص تعتمد على التخطيط: gap يظهر بين أكثر من عنصر في Flex أو Grid؛ align-items:stretch يحتاج أن يكون المقاس العرضي لأبنائه تلقائيًا. لو كتبت قاعدة أقوى أو !important فهي قد تتغلب على القسم المولد. استخدم المعاينة لتفهم السبب بدل اعتبار تحميلها علامة صحة.</p></details>
      </div></div>
    </section>`
  };
  (root.VLexPlatformComponents=root.VLexPlatformComponents||[]).push({name:'vlex-css-lab',component});
})(typeof window!=='undefined'?window:globalThis);
