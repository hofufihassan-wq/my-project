const assert = require('node:assert/strict');
module.exports = {
  'html-accessible-feedback': {selector:'#name-help',text:'حرفين',interact:async frame=>{
    await frame.locator('#check-name').click();
    assert.equal(await frame.locator('#display-name').getAttribute('aria-invalid'),'true');
    assert((await frame.locator('#name-status').innerText()).includes('اكتب'));
    await frame.locator('#display-name').fill('أحمد');await frame.locator('#check-name').click();
    assert.equal(await frame.locator('#display-name').getAttribute('aria-invalid'),'false');
    assert.equal(await frame.locator('#name-status').innerText(),'الاسم جاهز');
    await frame.locator('label').click();assert(await frame.locator('#display-name').evaluate(e=>document.activeElement===e));
  }},
  'html-native-validation': {selector:'#signup input[required][type=email]',count:1,interact:async frame=>{
    await frame.locator('#validate-form').click();assert.equal(await frame.locator('#form-result').innerText(),'راجع البريد المطلوب');
    await frame.locator('#email').fill('wrong');await frame.locator('#validate-form').click();
    assert.equal(await frame.locator('#email').evaluate(e=>e.checkValidity()),false);
    await frame.locator('#email').fill('learner@example.com');await frame.locator('#validate-form').click();
    assert((await frame.locator('#form-result').innerText()).includes('learner@example.com — لم يُرسل'));
  }},
  'html-details-disclosure': {selector:'details',count:2,interact:async frame=>{
    assert.equal(await frame.locator('#lesson-details').evaluate(e=>e.open),false);
    await frame.locator('#lesson-details summary').click();assert.equal(await frame.locator('#lesson-details').evaluate(e=>e.open),true);
    await frame.locator('#lesson-details summary').press('Enter');assert.equal(await frame.locator('#lesson-details').evaluate(e=>e.open),false);
  }},
  'html-table-relations': {selector:'table caption',text:'مراجعة الأسبوع',interact:async frame=>{
    assert.equal(await frame.locator('thead th[scope=col]').count(),2);assert.equal(await frame.locator('tbody th[scope=row]').count(),2);
    assert.deepEqual(await frame.locator('tbody td').allTextContents(),['20','30']);
  }},
  'css-grid-minmax': {selector:'.cards article',count:3,interact:async frame=>{
    const result=await frame.locator('.cards').evaluate(e=>({display:getComputedStyle(e).display,columns:getComputedStyle(e).gridTemplateColumns.split(' ').length,gap:getComputedStyle(e).gap}));
    assert.equal(result.display,'grid');assert.equal(result.columns,3);assert.equal(result.gap,'12px');
  }},
  'css-flex-min-width': {selector:'.task-title',text:'JavaScript',interact:async frame=>{
    assert(await frame.locator('.task-title').evaluate(e=>getComputedStyle(e).minWidth==='0px'&&getComputedStyle(e).textOverflow==='ellipsis'&&e.scrollWidth>e.clientWidth));
    assert(await frame.locator('.task-row').evaluate(e=>e.scrollWidth<=e.clientWidth));
  }},
  'css-custom-properties-clamp': {selector:'.fluid-card h1',text:'تدريب يومي',interact:async frame=>{
    assert.equal(await frame.locator('.fluid-card').evaluate(e=>getComputedStyle(e).borderTopColor),'rgb(21, 128, 61)');
    await frame.locator('#change-accent').click();
    assert.deepEqual(await frame.locator('.fluid-card').evaluate(e=>[getComputedStyle(e).color,getComputedStyle(e).borderTopColor]),['rgb(29, 78, 216)','rgb(29, 78, 216)']);
    const size=await frame.locator('h1').evaluate(e=>parseFloat(getComputedStyle(e).fontSize));assert(size>=20&&size<=38);
  }},
  'css-transition-reduced-motion': {selector:'.motion-card',text:'بطاقتي',interact:async frame=>{
    await frame.locator('#toggle-motion').click();assert.equal(await frame.locator('#toggle-motion').getAttribute('aria-pressed'),'true');
    await frame.locator('.motion-card').evaluate(e=>new Promise(resolve=>setTimeout(()=>resolve(),220)));
    assert.equal(await frame.locator('.motion-card').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(187, 247, 208)');
    assert.equal(await frame.locator('.motion-card').evaluate(e=>getComputedStyle(e).transform),'matrix(1, 0, 0, 1, -12, 0)');
  }},
  'js-closure-counters': {selector:'#value-a',text:'0',interact:async frame=>{
    await frame.locator('#counter-a').click();await frame.locator('#counter-a').click();await frame.locator('#counter-b').click();
    assert.equal(await frame.locator('#value-a').innerText(),'2');assert.equal(await frame.locator('#value-b').innerText(),'1');
  }},
  'js-async-error-handling': {selector:'#async-result',text:'جاهز',interact:async frame=>{
    await frame.locator('#load-ok').click();await frame.locator('#async-result').filter({hasText:'جاهز: HTML، CSS'}).waitFor();
    assert.equal(await frame.locator('#load-ok').isDisabled(),false);
    await frame.locator('#load-fail').click();await frame.locator('#async-result').filter({hasText:'خطأ معالج: تعذر تجهيز البيانات المحلية'}).waitFor();
    assert.equal(await frame.locator('#load-fail').isDisabled(),false);
  }},
  'js-reduce-summary': {selector:'#summary',text:'أنجزت 2 مهام في 35 دقيقة',interact:async frame=>{
    assert.equal(await frame.locator('#original-length').innerText(),'القائمة الأصلية: 3');
  }},
  'js-event-delegation': {selector:'#delegated-tasks li',count:1,interact:async frame=>{
    await frame.locator('#add-task').click();await frame.locator('#add-task').click();assert.equal(await frame.locator('li').count(),3);
    await frame.locator('li').last().locator('button').click();assert.equal(await frame.locator('li').count(),2);
    await frame.locator('li').first().locator('button span').click();assert.equal(await frame.locator('li').count(),1);
    assert((await frame.locator('li').innerText()).includes('تجربة جديدة'));
  }},
  'vue-computed-filter': {selector:'li',count:3,interact:async frame=>{
    await frame.locator('#task-search').fill('cSs');await frame.locator('#filtered-count').filter({hasText:'الظاهر: 1'}).waitFor();
    assert.equal(await frame.locator('li').innerText(),'CSS');await frame.locator('#task-search').fill('');
    await frame.locator('#filtered-count').filter({hasText:'الظاهر: 3'}).waitFor();
  }},
  'vue-watch-side-effect': {selector:'#watch-count',text:'تغييرات المراقب: 0',interact:async frame=>{
    await frame.locator('#watch-name').fill('أحمد');await frame.locator('#watch-change').filter({hasText:'تغير من سارة إلى أحمد'}).waitFor();
    assert.equal(await frame.locator('#watch-count').innerText(),'تغييرات المراقب: 1');
  }},
  'vue-props-emits': {selector:'#owner-state',text:'حالة الأب: مفتوحة',interact:async frame=>{
    await frame.locator('#toggle-task').click();await frame.locator('#owner-state').filter({hasText:'حالة الأب: منجزة'}).waitFor();
    assert.equal(await frame.locator('#toggle-task').getAttribute('aria-pressed'),'true');
    await frame.locator('#toggle-task').click();await frame.locator('#owner-state').filter({hasText:'حالة الأب: مفتوحة'}).waitFor();
  }},
  'vue-keyed-component-state': {selector:'#keyed-rows article',count:2,interact:async frame=>{
    await frame.getByRole('textbox',{name:'HTML',exact:true}).fill('ملاحظتي');
    await frame.locator('#reverse-rows').click();await frame.locator('#keyed-rows article').first().filter({hasText:'CSS'}).waitFor();
    assert.equal(await frame.getByRole('textbox',{name:'HTML',exact:true}).inputValue(),'ملاحظتي');
    assert.equal(await frame.getByRole('textbox',{name:'CSS',exact:true}).inputValue(),'');
  }}
};
