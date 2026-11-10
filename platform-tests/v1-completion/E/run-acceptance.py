#!/usr/bin/env python3
"""Sequential acceptance in an independent snapshot; preserve inherited reports."""
from pathlib import Path
import argparse,datetime as dt,hashlib,importlib.util,json,os,shutil,subprocess,time
ROOT=Path(__file__).resolve().parents[3]
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--output',type=Path);args=parser.parse_args();stamp=dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%SZ');out=(args.output or ROOT/'platform-tests/v1-completion/E'/('run-'+stamp)).resolve();out.mkdir(parents=True,exist_ok=True);snapshot=Path('/tmp')/('vlex-v1-acceptance-'+stamp)
 def ignored(folder,names):return{n for n in names if n in ['.git','node_modules','dist','downloads','__pycache__'] or n.startswith(('final-20','run-20'))}
 shutil.copytree(ROOT,snapshot,ignore=ignored)
 (snapshot/'.git').symlink_to(ROOT/'.git')
 if (ROOT/'node_modules').exists():(snapshot/'node_modules').symlink_to(ROOT/'node_modules',target_is_directory=True)
 runtime={p.relative_to(ROOT).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in ROOT.iterdir() if p.is_file() and p.suffix in ['.js','.css','.html'] and not p.name.startswith(('run_','test_','audit_','test-'))}
 spec=importlib.util.spec_from_file_location('old_review',ROOT/'platform-tests/final-review/run-final-review.py');old=importlib.util.module_from_spec(spec);spec.loader.exec_module(old)
 groups=[]
 for name,command in old.UNITS+old.BROWSERS:
  command=[str(Path(v).relative_to(ROOT)) if str(v).startswith(str(ROOT)+'/') else v for v in command];groups.append(('legacy-'+name,command))
 for name,script in [
 ('full-backup-unit','A/full-backup-unit.cjs'),('navigation-A1','A/browser.cjs'),('full-backup-browser','A/full-backup-browser.cjs'),('recovery-browser','A/recovery-browser.cjs'),('guided-state','B/state-unit.cjs'),('guided-evaluator','B/evaluator-browser.cjs'),('guided-ui','B/guided-browser.cjs'),('html-css-curriculum','C/markup-browser.cjs'),('javascript-curriculum','C/javascript-browser.cjs'),('extended-tools','C/extended-evaluator-browser.cjs'),('environment-persistence','C/environments-ui.cjs'),('vue-curriculum-unit','C3/curriculum-unit.cjs'),('vue-tools','C3/vue-tools-browser.cjs'),('vue-curriculum','C3/vue-browser.cjs'),('vue-persistence','C3/vue-ui.cjs'),('project-state','D/project-state.cjs'),('project-curriculum','D/project-browser.cjs'),('project-native-parity','D/native-parity.cjs'),('project-persistence','D/project-ui.cjs')]:groups.append((name,['node','platform-tests/v1-completion/'+script]))
 groups += [('arrow-unit',['node','platform-tests/guided-arrow/unit.cjs']),('arrow-ui',['node','platform-tests/guided-arrow/browser.cjs']),('arrow-backup',['node','platform-tests/guided-arrow/backup-ui.cjs']),('arrow-visual-unit',['node','platform-tests/guided-arrow/visual/unit.cjs']),('arrow-visual-ui',['node','platform-tests/guided-arrow/visual/browser.cjs']),('simulator-completion',['node','run_simulator_completion_browser_tests.js']),('simulator-unit',['node','run_simulator_beta_unit_tests.js']),('release-build',['npm','run','build']),('release-browser',['node','platform-tests/v1-completion/E/static-browser.cjs']),('all-sections',['node','platform-tests/v1-completion/E/site-browser.cjs'])]
 rows=[]
 for name,command in groups:
  started=time.time();artifact=out/name;artifact.mkdir(exist_ok=True);env=dict(os.environ,PLAYWRIGHT_BROWSERS_PATH=os.environ.get('PLAYWRIGHT_BROWSERS_PATH','/workspace/.playwright-browsers'),VLEX_REVIEW_ROOT=str(snapshot),VLEX_REVIEW_OUTPUT=str(artifact/'results.json') if name in ['legacy-js-private-channel','legacy-explainer-transfer'] else str(artifact),VLP_TEST_OUTPUT=str(artifact),VLP_COMPLETION_OUTPUT=str(artifact),VLP_ROOT=str(snapshot))
  with (out/(name+'.log')).open('w') as log:
   try:code=subprocess.run(command,cwd=snapshot,env=env,stdout=log,stderr=subprocess.STDOUT,timeout=300).returncode
   except subprocess.TimeoutExpired:code=124
  row={'suite':name,'command':command,'exitCode':code,'seconds':round(time.time()-started,2)};rows.append(row);print(json.dumps(row),flush=True)
  summary={'sourceHead':subprocess.check_output(['git','-C',str(ROOT),'rev-parse','HEAD'],text=True).strip(),'snapshot':str(snapshot),'browserConcurrency':1,'passed':sum(r['exitCode']==0 for r in rows),'total':len(rows),'planned':len(groups),'results':rows,'runtimeHashes':runtime};(out/'results.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
 summary['runtimeUnchanged']=all((ROOT/name).exists() and hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==sha for name,sha in runtime.items());(out/'results.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n');print('ACCEPTANCE_REPORT',out/'results.json',flush=True)
 if summary['passed']!=len(groups) or not summary['runtimeUnchanged']:raise SystemExit(1)
if __name__=='__main__':main()
