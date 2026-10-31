/* Trusted local parsers only; pasted code is data, never imported or executed. */
'use strict';
importScripts('assets/vendor/compiler-sfc-3.4.21.global.min.js','simulator-beta.js','code-explainer-rules-ar.js');
self.onmessage=event=>{const m=event.data;if(!m||!Number.isSafeInteger(m.id)||typeof m.source!=='string')return;try{const result=VueLexiconExplainerRules.analyze(VueLexiconCompiler,m.source,m.language);self.postMessage({id:m.id,result});}catch(e){self.postMessage({id:m.id,error:String(e.message||e).slice(0,1000)});}};
