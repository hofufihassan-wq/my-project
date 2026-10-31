"""Run every pre-final regression in an isolated source snapshot.
No deploy, Git write, user-data reuse or old-report replacement is performed.
"""
from pathlib import Path
import os, subprocess, json, hashlib, shutil, time
SRC = Path(__file__).resolve().parents[1]
OUT = Path(os.environ.get('VLP_FINAL_REGRESSION_OUTPUT', SRC / 'simulator-final-artifacts/regression')).resolve()
SNAP = Path(os.environ.get('VLP_FINAL_SNAPSHOT', '/tmp/vuelexicon-final-regression')).resolve()
if SNAP == SRC or SRC in SNAP.parents:
    raise SystemExit('Snapshot must be outside the source checkout.')
if SNAP.exists():
    raise SystemExit('Use a fresh snapshot path; prior evidence is never overwritten.')
def ignore(directory, names):
    return {n for n in names if n in {'.git', 'node_modules', '__pycache__'} or n.endswith('-artifacts') or n.endswith('_screenshots')}
shutil.copytree(SRC, SNAP, ignore=ignore)
if (SRC / 'node_modules').exists():
    (SNAP / 'node_modules').symlink_to(SRC / 'node_modules', target_is_directory=True)
OUT.mkdir(parents=True, exist_ok=True)
gitdir = subprocess.check_output(['git', 'rev-parse', '--absolute-git-dir'], cwd=SRC, text=True).strip()
env = {**os.environ, 'GIT_DIR': gitdir, 'GIT_WORK_TREE': str(SNAP),
       'VUE_TEST_RUNTIME': str(SNAP / 'assets/vendor/vue-3.4.21.global.prod.js')}
commands = [('build_compiler', ['npm', 'run', 'build:compiler']), ('build_css', ['npm', 'run', 'build:css']),
            ('verify', ['python3', 'scripts/assets.py', 'verify'])]
commands += [(n, ['node', n + '.js']) for n in [
    'run_preview_protocol_tests', 'run_data_safety_tests', 'run_json_import_test', 'run_curriculum_tests',
    'run_content_integrity_test', 'run_legacy_validator_tests', 'run_simulator_reference_review',
    'run_dictionary_preview_tests', 'run_phase0a_browser_tests', 'run_dictionary_inventory',
    'run_simulator_browser_tests', 'run_runtime_assets_tests', 'run_stability_browser_tests',
    'run_phase5b_browser_tests', 'run_phase5b1_browser_tests', 'run_hands_on_verification',
    'run_simulator_beta_unit_tests', 'run_simulator_beta_browser_tests', 'run_simulator_beta_extra_tests',
    'run_simulator_completion_unit_tests', 'run_simulator_completion_browser_tests', 'run_simulator_ambient_storage_tests']]
files = ['app.js','index.html','simulator-beta.js','simulator-reference.css','simulator-final.css','assets/vendor/manifest.json']
def hashes(folder):
    return {f: hashlib.sha256((folder / f).read_bytes()).hexdigest() for f in files}
report = {'baseline': '5d05acf', 'sourceHashes': hashes(SRC), 'results': []}
for label, command in commands:
    target = OUT / label
    target.mkdir(exist_ok=True)
    testenv = {**env, 'VLP_TEST_OUTPUT': str(target), 'VLP_PHASE5B_OUTPUT': str(target),
        'VLP_PHASE5B1_OUTPUT': str(target), 'VLP_TECH_OUTPUT': str(target),
        'PHASE4_SCREENSHOTS': str(target / 'screenshots'), 'VLP_BETA_OUTPUT': str(target),
        'VLP_BETA_EXTRA_OUTPUT': str(target), 'VLP_BETA_UNIT_OUTPUT': str(target), 'VLP_BETA_BASELINE': '5d05acf', 'VLP_COMPLETION_UNIT_OUTPUT': str(target),
        'VLP_COMPLETION_OUTPUT': str(target), 'VLP_AMBIENT_STORAGE_OUTPUT': str(target)}
    started = time.monotonic()
    log = OUT / (label + '.log')
    with log.open('w') as handle:
        try:
            completed = subprocess.run(command, cwd=SNAP, env=testenv, stdout=handle,
                                       stderr=subprocess.STDOUT, timeout=300)
            code = completed.returncode
        except subprocess.TimeoutExpired:
            code = 'timeout300'
    if label == 'run_dictionary_inventory' and (SNAP / 'phase4-artifacts/dictionary-inventory.json').exists():
        shutil.copy2(SNAP / 'phase4-artifacts/dictionary-inventory.json', target / 'dictionary-inventory.json')
    report['results'].append({'label': label, 'command': command, 'exitCode': code,
        'seconds': round(time.monotonic() - started, 2), 'log': log.name})
    report['timestamp'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    report['finalSnapshotHashes'] = hashes(SNAP)
    (OUT / 'checks.json').write_text(json.dumps(report, indent=2) + '\n')
    print(label, code, log.read_text()[-150:], flush=True)
assert hashes(SRC) == report['sourceHashes'], 'Source changed during regression.'
assert hashes(SNAP) == report['sourceHashes'], 'Built snapshot differs from tested source.'
report['passedCommands'] = sum(r['exitCode'] == 0 for r in report['results'])
report['totalCommands'] = len(commands)
(OUT / 'checks.json').write_text(json.dumps(report, indent=2) + '\n')
raise SystemExit(0 if report['passedCommands'] == report['totalCommands'] else 1)
