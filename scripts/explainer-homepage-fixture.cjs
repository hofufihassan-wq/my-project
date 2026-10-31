/* Update only the expected availability badge for the newly implemented page.
 * All other homepage pixels, and the exact submission/message handlers, stay pinned.
 */
const assert=require('node:assert/strict');
module.exports=async function expectedExplainerBadge(current,baseline){
 const selector='.dashboard-sidebar > button';
 const live=current.locator(selector).filter({hasText:'شرح الأكواد'}).locator('small');
 assert.equal(await live.textContent(),'متاح');
 await baseline.locator(selector).filter({hasText:'شرح الأكواد'}).locator('small').evaluate(e=>e.textContent='متاح');
};
