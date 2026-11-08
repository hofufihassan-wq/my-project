/* Syntax presentation only. Native editing, events, execution and persistence stay owned by Vue. */
(function () {
  'use strict';
  const states = new WeakMap();
  function highlight(source, language) {
    const aliases = {html:'xml',vue:'xml',typescript:'javascript',js:'javascript'};
    const lang = aliases[language] || language;
    if (window.hljs && hljs.getLanguage(lang || '')) {
      return hljs.highlight(String(source), {language:lang, ignoreIllegals:true}).value;
    }
    return String(source).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function paint(el) {
    const s=states.get(el); if(!s) return;
    // Vue can update a bound native value after the directive's updated hook.
    const css=getComputedStyle(el);
    for(const key of ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','tabSize','paddingTop','paddingRight','paddingBottom','paddingLeft','whiteSpace','overflowWrap','wordBreak']) s.pre.style.setProperty(key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase()),css[key],'important');
    s.pre.innerHTML=highlight(el.value,s.language)+'\n';
    s.pre.scrollTop=el.scrollTop;s.pre.scrollLeft=el.scrollLeft;
    s.pre.style.height=el.clientHeight+'px';
    s.pre.style.width=el.clientWidth+'px';
  }
  function schedule(el) {
    const s=states.get(el);if(!s)return;
    cancelAnimationFrame(s.frame);s.frame=requestAnimationFrame(()=>paint(el));
  }
  const editor={
    mounted(el,binding) {
      const pre=el.parentElement.querySelector('.vlex-code-paint');if(!pre)return;
      const state={pre,language:binding.value,frame:0,refresh:()=>schedule(el),scroll:()=>{pre.scrollTop=el.scrollTop;pre.scrollLeft=el.scrollLeft;}};
      states.set(el,state);
      el.classList.add('vlex-code-input');el.setAttribute('wrap','off');
      el.addEventListener('input',state.refresh);el.addEventListener('scroll',state.scroll);
      state.observer=new ResizeObserver(state.refresh);state.observer.observe(el);schedule(el);
      // Local fonts may load after the first layout.
      document.fonts?.ready.then(()=>schedule(el));
    },
    updated(el,binding){const s=states.get(el);if(s){s.language=binding.value;schedule(el);}},
    beforeUnmount(el){const s=states.get(el);if(!s)return;cancelAnimationFrame(s.frame);s.observer.disconnect();el.removeEventListener('input',s.refresh);el.removeEventListener('scroll',s.scroll);states.delete(el);}
  };
  function render(el,binding){const value=binding.value||{};el.classList.add('vlex-code-view');el.innerHTML=highlight(value.source||'',value.language);}
  window.VLexCodePresentation=Object.freeze({editor,view:{mounted:render,updated:render}});
}());
