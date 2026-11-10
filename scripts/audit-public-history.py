#!/usr/bin/env python3
"""Read every reachable Git blob; emit counts and redacted review locations only.
No history edits, uploads, credential verification requests, or user-data writes.
"""
from pathlib import Path
import argparse,json,re,subprocess

def main():
 p=argparse.ArgumentParser();p.add_argument('--output',type=Path,required=True);p.add_argument('--gitleaks',type=Path);a=p.parse_args();a.output.mkdir(parents=True,exist_ok=True)
 rows=subprocess.check_output(['git','rev-list','--objects','--all'],text=True).splitlines();objects={row.split(' ',1)[0]:row.partition(' ')[2] for row in rows};checked=subprocess.check_output(['git','cat-file','--batch-check=%(objectname) %(objecttype) %(objectsize)'],input='\n'.join(objects)+'\n',text=True).splitlines();blobs=[(r.split()[0],int(r.split()[2]),objects[r.split()[0]]) for r in checked if r.split()[1]=='blob']
 authors=set(subprocess.check_output(['git','log','--all','--format=%ae%n%ce'],text=True).splitlines());personal=[e for e in authors if e.lower().endswith(('@gmail.com','@hotmail.com','@outlook.com','@yahoo.com','@icloud.com'))];pii=[];candidates=[];binary=0;texts=0;archives={};scan=None;log=None
 if a.gitleaks:
  log=(a.output/'full-blobs.log').open('w');scan=subprocess.Popen([str(a.gitleaks.resolve()),'stdin','--redact=100','--no-banner','--ignore-gitleaks-allow','--max-decode-depth','5','--report-format','json','--report-path',str((a.output/'full-blobs-redacted.json').resolve())],stdin=subprocess.PIPE,stdout=log,stderr=subprocess.STDOUT)
 git=subprocess.Popen(['git','cat-file','--batch'],stdin=subprocess.PIPE,stdout=subprocess.PIPE)
 for sha,size,name in blobs:
  git.stdin.write((sha+'\n').encode());git.stdin.flush();git.stdout.readline();content=git.stdout.read(size);assert git.stdout.read(1)==b'\n'
  if name.endswith(('.zip','.tar','.tgz','.tar.gz','.7z')):
   archives[sha]=name
   if scan:
    folder=a.output/'historical-archives';folder.mkdir(exist_ok=True);suffix='.tar.gz' if name.endswith('.tar.gz') else Path(name).suffix;(folder/(sha+suffix)).write_bytes(content)
  if b'\x00' in content[:8000]:binary+=1;continue
  texts+=1
  if scan:scan.stdin.write(('\n/* reachable Git blob '+sha+' '+name+' */\n').encode()+content+b'\n')
  if any(e.encode() in content for e in personal):pii.append({'blob':sha,'path':name,'valueRedacted':True})
  for m in re.finditer(rb'''(?i)\b(?:password|passwd|api_key|apikey|access_token|auth_token|secret_key)\b["']?\s*[:=]\s*["']([^"'\r\n]{3,200})["']''',content):
   selector=m.group(1)==b'[type=password]' and name.startswith(('assets/vendor/','scripts/vendor/'))
   candidates.append({'blob':sha,'path':name,'line':content[:m.start()].count(b'\n')+1,'classification':'CSS input-type selector, not a credential' if selector else 'manual review required','valueRedacted':True})
 git.stdin.close();assert git.wait()==0
 code=None
 archive_code=None
 if scan:
  scan.stdin.write(b'\n/* Commit messages */\n'+subprocess.check_output(['git','log','--all','--format=%H%n%B']));scan.stdin.close();code=scan.wait();log.close()
  if archives:
   with (a.output/'historical-archives.log').open('w') as archive_log:
    archive_code=subprocess.run([str(a.gitleaks.resolve()),'dir',str(a.output/'historical-archives'),'--redact=100','--no-banner','--ignore-gitleaks-allow','--max-decode-depth','5','--max-archive-depth','3','--report-format','json','--report-path',str((a.output/'historical-archives-redacted.json').resolve())],stdout=archive_log,stderr=subprocess.STDOUT).returncode
 d={'commit':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'reachableCommits':int(subprocess.check_output(['git','rev-list','--all','--count'],text=True)),'uniqueBlobs':len(blobs),'textBlobsReadInFull':texts,'binaryBlobs':binary,'fullTextSecretScannerExitCode':code,'historicalArchiveSecretScannerExitCode':archive_code,'uniqueHistoricalArchives':archives,'personalAuthorEmailCount':len(personal),'personalAuthorsNeedOwnerApprovalForPublicHistory':bool(personal),'personalAuthorEmailsInTextBlobs':pii,'credentialAssignmentCandidates':candidates,'limitations':['Pattern-based secret scanning is not proof of absence.','Binary images/video are not OCR-scanned; tracked archives are scanned separately with Gitleaks.','Commit author identities are reviewed separately; values are never printed.']};(a.output/'privacy-and-blobs.json').write_text(json.dumps(d,indent=2)+'\n');print(json.dumps({k:v for k,v in d.items() if not isinstance(v,(dict,list))}))
 if code not in (None,0) or archive_code not in (None,0) or any(c['classification']=='manual review required' for c in candidates):raise SystemExit(1)
if __name__=='__main__':main()
