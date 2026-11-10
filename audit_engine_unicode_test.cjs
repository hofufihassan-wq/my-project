const assert = require('node:assert/strict');
const fs = require('node:fs');
const {inspectBlocks, updateBlock} = require('./simulator-beta.js');
const results=[];
for (const [name,source,kind,expected] of [
 ['Unicode before script','<p>İ</p><script>console.log(1)</script>','js','console.log(1)'],
 ['Unicode within script','<script>const label="İ";console.log(label)</script>','js','const label="İ";console.log(label)'],
 ['Unicode within CSS','<style>p::before{content:"İ"}</style>','css','p::before{content:"İ"}'],
 ['Repeated expansion and uppercase closing','<p>İİ</p><STYLE>.box{content:"İ"}</STYLE><p>tail</p>','css','.box{content:"İ"}'],
 ['Raw closing boundary remains exact','<script>const text="</scripted>";</script>','js','const text="</scripted>";'],
 ['Trailing source is preserved','<style>p{color:red}</style><p>İ tail</p>','css','p{color:red}']
]) {
 try {const v=inspectBlocks(source,kind);assert.equal(v.editable,true);assert.equal(v.code,expected);assert.equal(source.slice(v.start,v.end),expected);
 const changed=updateBlock(source,kind,'/* changed */',expected);assert.equal(changed.ok,true);assert.equal(changed.source,source.replace(expected,'/* changed */'));
 results.push({name,passed:true});console.log('PASS',name)}catch(e){results.push({name,passed:false,error:e.message});console.log('FAIL',name,e.message)}
}
const report={timestamp:new Date().toISOString(),passed:results.filter(x=>x.passed).length,total:results.length,results};
if(process.env.AUDIT_ENGINE_OUTPUT)fs.writeFileSync(process.env.AUDIT_ENGINE_OUTPUT,JSON.stringify(report,null,2)+'\n');
if(report.passed!==report.total)process.exitCode=1;
