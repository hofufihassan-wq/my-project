/* Build trusted vendor code only. User examples are compiled inside the iframe. */
const fs = require('node:fs');
const crypto = require('node:crypto');
const esbuild = require('esbuild');
const path = require('node:path');
process.chdir(path.resolve(__dirname, '..'));
const source = 'assets/vendor/compiler-sfc-3.4.21.esm-browser.js';
const output = 'assets/vendor/compiler-sfc-3.4.21.global.min.js';
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const manifestPath = 'assets/vendor/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const locked = manifest.packages.find(p => p.name === '@vue/compiler-sfc').files.find(f => f.path === source);
if (hash(source) !== locked.sha256) throw new Error('Compiler source integrity mismatch');
if (esbuild.version !== '0.25.12') throw new Error('Use pinned esbuild 0.25.12');
esbuild.buildSync({entryPoints:[source],outfile:output,bundle:true,format:'iife',globalName:'VueLexiconCompiler',
  minify:true,legalComments:'inline',target:['es2020'],charset:'utf8'});
manifest.generated_compiler = {path:output,sha256:hash(output),tool:'esbuild@0.25.12',
  inputs_sha256:{[source]:hash(source),'scripts/build-sfc-compiler.cjs':hash('scripts/build-sfc-compiler.cjs')}};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Local compiler built: ${fs.statSync(output).size} bytes`);
