/* Reproducible build of upstream LinkeDOM's browser/Worker distribution. */
const fs=require('fs'),crypto=require('crypto'),path=require('path'),esbuild=require('esbuild');process.chdir(path.resolve(__dirname,'..'));
const source='scripts/vendor/linkedom-0.18.12.worker.esm.js',output='assets/vendor/linkedom-0.18.12.global.min.js',manifestPath='assets/vendor/manifest.json',manifest=JSON.parse(fs.readFileSync(manifestPath)),hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
if(esbuild.version!=='0.25.12')throw Error('Use pinned esbuild 0.25.12');const locked=manifest.packages.find(p=>p.name==='linkedom').files.find(f=>f.path===source);if(hash(source)!==locked.sha256)throw Error('DOM source integrity mismatch');
esbuild.buildSync({entryPoints:[source],outfile:output,format:'iife',globalName:'VLexDOM',bundle:true,minify:true,legalComments:'inline',target:'es2020'});
manifest.generated_dom={path:output,sha256:hash(output),tool:'esbuild@0.25.12',inputs_sha256:{[source]:hash(source),'scripts/build-guided-dom.cjs':hash('scripts/build-guided-dom.cjs')}};
fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');console.log('Built isolated DOM: '+fs.statSync(output).size+' bytes');
