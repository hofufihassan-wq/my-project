#!/usr/bin/env python3
"""Fresh final regression and diagnosis retries; unchanged test files, maximum two suites."""
import concurrent.futures,datetime,json,os,pathlib,re,signal,subprocess,sys,time,shutil
OUT=pathlib.Path('/workspace/my-progect/audit-artifacts/regression')
FINAL=pathlib.Path(sys.argv[1]);BASE=pathlib.Path('/tmp/vuelexicon-audit-base')
# Keep successful prior final-units as separate evidence; rerun current final snapshot completely.
jobs=[('final',FINAL,f.name) for f in sorted(FINAL.glob('run_*.js'))]
jobs += [('baseline-retry',BASE,x) for x in ['run_dictionary_inventory.js','run_phase5b1_browser_tests.js','run_phase5b_browser_tests.js','run_runtime_assets_tests.js']]
def run(job):
 phase,root,name=job;dest=OUT/phase/pathlib.Path(name).stem;dest.mkdir(parents=True,exist_ok=True)
 env=os.environ.copy();env.update(GIT_DIR='/workspace/my-progect/.git',GIT_WORK_TREE=str(root),VUE_TEST_RUNTIME=str(root/'assets/vendor/vue-3.4.21.global.prod.js'))
 for k in ['VLP_TEST_OUTPUT','VLP_PHASE5B_OUTPUT','VLP_PHASE5B1_OUTPUT','VLP_TECH_OUTPUT','VLP_BETA_OUTPUT','VLP_BETA_EXTRA_OUTPUT','VLP_BETA_UNIT_OUTPUT','VLP_COMPLETION_OUTPUT','VLP_COMPLETION_UNIT_OUTPUT','VLP_AMBIENT_STORAGE_OUTPUT','VLP_FINAL_OUTPUT']:env[k]=str(dest)
 started=time.monotonic();status='completed';timestamp=datetime.datetime.now(datetime.timezone.utc).isoformat()
 with (dest/'stdout.log').open('wb') as stdout,(dest/'stderr.log').open('wb') as stderr:
  p=subprocess.Popen(['node',name],cwd=root,env=env,stdout=stdout,stderr=stderr,start_new_session=True)
  try:code=p.wait(timeout=600)
  except subprocess.TimeoutExpired:
   status='timeout';os.killpg(p.pid,signal.SIGTERM)
   try:p.wait(timeout=5)
   except subprocess.TimeoutExpired:os.killpg(p.pid,signal.SIGKILL);p.wait()
   code=p.returncode
 logs=(dest/'stdout.log').read_text(errors='replace')+'\n'+(dest/'stderr.log').read_text(errors='replace')
 row=dict(phase=phase,command=['node',name],cwd=str(root),status=status,exit_code=code,seconds=round(time.monotonic()-started,2),timestamp=timestamp,reported_ratios=re.findall(r'\b\d+/\d+\b',logs)[-6:],pass_lines=len(re.findall(r'^(?:PASS|✓ PASS)',logs,re.M)),fail_lines=len(re.findall(r'^(?:FAIL|✗ FAIL)',logs,re.M)))
 if name=='run_dictionary_inventory.js' and status=='completed' and code==0:
  src=root/'phase4-artifacts/dictionary-inventory.json'
  r=json.loads(src.read_text())
  if r.get('total')==360 and r.get('timestamp','')>=timestamp[:19]:shutil.copy2(src,dest/'dictionary-inventory.json')
  else:row['report_freshness_error']='Missing fresh 360-source inventory report'
 (dest/'outcome.json').write_text(json.dumps(row,indent=2)+'\n');print(json.dumps(row),flush=True);return row
results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
 for r in pool.map(run,jobs):
  results.append(r);(OUT/'matrix-summary.json').write_text(json.dumps(results,indent=2)+'\n')
for phase in ['final','baseline-retry']:
 rows=[r for r in results if r['phase']==phase];(OUT/phase/'summary.json').write_text(json.dumps(rows,indent=2)+'\n')
print('MATRIX COMPLETE',flush=True)
