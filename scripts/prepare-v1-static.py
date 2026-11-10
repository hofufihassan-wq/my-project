#!/usr/bin/env python3
"""Build only the public runtime into a directory. Never deploy or include user data."""
from pathlib import Path
import argparse
import hashlib
import importlib.util
import json

ROOT=Path(__file__).resolve().parents[1]
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--output',type=Path,default=ROOT/'dist');args=parser.parse_args();output=args.output.resolve()
 # Refuse to overwrite source or an unrelated pre-existing output. A clean build
 # is atomic per file; stale output is an explicit error, never silently shipped.
 if output==ROOT or ROOT.is_relative_to(output):raise SystemExit('Output cannot contain the source checkout.')
 spec=importlib.util.spec_from_file_location('vlex_static_package',ROOT/'scripts/package-static.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
 files=module.runtime_files();module.verify_runtime(files);files['_headers']=(ROOT/'_headers').read_bytes()
 if output.exists():
  extra=[str(p.relative_to(output)) for p in output.rglob('*') if p.is_file() and p.relative_to(output).as_posix() not in files and p.name!='release-manifest.json']
  if extra:raise SystemExit('Output contains unrelated/stale files; choose a fresh directory: '+', '.join(extra[:8]))
 output.mkdir(parents=True,exist_ok=True)
 entries=[]
 for name,data in files.items():
  if any(part.startswith('.') or part in ['node_modules','docs','platform-tests'] for part in Path(name).parts):raise SystemExit('Private path refused: '+name)
  path=output/name;path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(data);entries.append({'path':name,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
 manifest={'product':'V Lex Pro','version':json.loads((ROOT/'package.json').read_text())['version'],'files':sorted(entries,key=lambda r:r['path']),'totalBytes':sum(r['bytes'] for r in entries),'deploymentPerformed':False}
 (output/'release-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'output':str(output),'files':len(entries),'bytes':manifest['totalBytes'],'version':manifest['version'],'deployed':False},ensure_ascii=False))
if __name__=='__main__':main()
