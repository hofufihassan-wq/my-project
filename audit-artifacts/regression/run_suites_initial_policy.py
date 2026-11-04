#!/usr/bin/env python3
"""Run unchanged historical suites in a disposable source snapshot, preserving exit status/logs."""
import concurrent.futures, datetime, json, os, pathlib, re, signal, subprocess, sys, time
root=pathlib.Path(sys.argv[1] if len(sys.argv)>1 else '/tmp/vuelexicon-audit-base')
phase=sys.argv[2] if len(sys.argv)>2 else 'baseline'
selected=set(sys.argv[3:])
out=pathlib.Path('/workspace/my-progect/audit-artifacts/regression')/phase
out.mkdir(parents=True,exist_ok=True)
env=os.environ.copy(); env.update(GIT_DIR='/workspace/my-progect/.git',GIT_WORK_TREE=str(root),VUE_TEST_RUNTIME=str(root/'assets/vendor/vue-3.4.21.global.prod.js'))
files=[f for f in sorted(root.glob('run_*.js')) if not selected or f.name in selected]
# First attempts hit harness deadlines under shared Chromium load; retries use a larger bound without changing assertions.
def run(file):
 name=file.stem; folder=out/name;folder.mkdir(exist_ok=True)
 e=env.copy()
 for key in ['VLP_TEST_OUTPUT','VLP_PHASE5B_OUTPUT','VLP_PHASE5B1_OUTPUT','VLP_TECH_OUTPUT','VLP_BETA_OUTPUT','VLP_BETA_EXTRA_OUTPUT','VLP_BETA_UNIT_OUTPUT','VLP_COMPLETION_OUTPUT','VLP_COMPLETION_UNIT_OUTPUT','VLP_AMBIENT_STORAGE_OUTPUT','VLP_FINAL_OUTPUT']: e[key]=str(folder)
 start=time.monotonic(); status='completed'; timeout=300 if 'inventory' in name else 180
 with (folder/'stdout.log').open('wb') as stdout, (folder/'stderr.log').open('wb') as stderr:
  p=subprocess.Popen(['node',file.name],cwd=root,env=e,stdout=stdout,stderr=stderr,start_new_session=True)
  try: code=p.wait(timeout=timeout)
  except subprocess.TimeoutExpired:
   status='timeout';os.killpg(p.pid,signal.SIGTERM)
   try:p.wait(timeout=5)
   except subprocess.TimeoutExpired:os.killpg(p.pid,signal.SIGKILL);p.wait()
   code=p.returncode
 logs=(folder/'stdout.log').read_text(errors='replace')+'\n'+(folder/'stderr.log').read_text(errors='replace')
 row=dict(command=['node',file.name],cwd=str(root),status=status,exit_code=code,seconds=round(time.monotonic()-start,2),timestamp=datetime.datetime.now(datetime.timezone.utc).isoformat(),reported_ratios=re.findall(r'\b\d+/\d+\b',logs)[-8:],pass_lines=len(re.findall(r'^(?:PASS|✓ PASS)',logs,re.M)),fail_lines=len(re.findall(r'^(?:FAIL|✗ FAIL)',logs,re.M)))
 print(json.dumps(row),flush=True)
 return row
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
 result=list(pool.map(run,files))
(out/'summary.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('SUMMARY',sum(r['exit_code']==0 for r in result),'/',len(result),flush=True)
