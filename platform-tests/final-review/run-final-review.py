#!/usr/bin/env python3
"""Run independent checks in a disposable copy; never replace old reports."""
from pathlib import Path
import argparse
import concurrent.futures
import datetime as dt
import hashlib
import json
import os
import shutil
import subprocess
import time

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
UNITS = [
    ('legacy-protocol', ['node', 'run_preview_protocol_tests.js']),
    ('legacy-data', ['node', 'run_data_safety_tests.js']),
    ('legacy-json', ['node', 'run_json_import_test.js']),
    ('dictionary-preservation', ['node', 'platform-tests/dictionary/check-ids.cjs']),
    ('store-unit', ['node', 'platform-tests/store/run.cjs']),
    ('store-schema', ['node', 'platform-tests/store/schema.cjs']),
    ('explainer-unit', ['node', 'platform-tests/explainer/unit.cjs']),
    ('course-unit', ['node', 'platform-tests/course/unit.cjs']),
    ('advanced-unit', ['node', 'platform-tests/advanced/unit.cjs']),
    ('css-lab-unit', ['node', 'platform-tests/css-lab/unit.cjs']),
    ('js-lab-unit', ['node', 'platform-tests/js-lab/unit.cjs']),
    ('dashboard-unit', ['node', 'platform-tests/dashboard/unit.cjs']),
    ('local-unit', ['python3', 'platform-tests/local/test-local.py']),
    ('assets-integrity', ['npm', 'run', 'verify:assets']),
]
BROWSERS = [
    ('legacy-dictionary', ['node', 'run_dictionary_preview_tests.js']),
    ('store-browser', ['node', 'platform-tests/store/schema-browser.cjs']),
    ('explainer-browser', ['node', 'platform-tests/explainer/browser.cjs']),
    ('course-browser', ['node', 'platform-tests/course/browser.cjs']),
    ('advanced-browser', ['node', 'platform-tests/advanced/browser.cjs']),
    ('css-lab-browser', ['node', 'platform-tests/css-lab/browser.cjs']),
    ('js-lab-browser', ['node', 'platform-tests/js-lab/browser.cjs']),
    ('js-lab-peer', ['node', 'platform-tests/course/js-lab-peer-regression.cjs']),
    ('js-private-channel', ['node', str(OUT / 'worker-channel-regression.cjs')]),
    ('explainer-transfer', ['node', str(OUT / 'explainer-transfer-regression.cjs')]),
    ('dashboard-browser', ['node', 'platform-tests/dashboard/browser.cjs']),
    ('dictionary-browser', ['node', 'platform-tests/dictionary/browser.cjs']),
    ('dictionary-css-corrections', ['node', 'platform-tests/dictionary-css-fixes/browser.cjs', '--applied']),
    ('dictionary-vue-corrections', ['node', 'platform-tests/dictionary-vue-fixes/browser.cjs']),
    ('integration-browser', ['node', 'platform-tests/integration-smoke.cjs']),
    ('root-backups-browser', ['node', 'platform-tests/integration/backups.cjs']),
]


def ignored(directory, names):
    return {n for n in names if n in {'.git', 'node_modules', 'downloads', 'final-review', '__pycache__'} or n.endswith('-artifacts')}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--snapshot', type=Path)
    args = parser.parse_args()
    stamp = dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    snapshot = args.snapshot or Path('/tmp') / ('vlex-final-review-' + stamp)
    evidence = OUT / ('final-' + stamp)
    evidence.mkdir(parents=True, exist_ok=True)
    if not args.snapshot:
        shutil.copytree(ROOT, snapshot, ignore=ignored)
        (snapshot / '.git').symlink_to(ROOT / '.git', target_is_directory=True)
        if (ROOT / 'node_modules').exists():
            (snapshot / 'node_modules').symlink_to(ROOT / 'node_modules', target_is_directory=True)
    hashes = {}
    for file in sorted(snapshot.iterdir()):
        if file.is_file() and file.suffix in {'.js', '.css', '.html'}:
            hashes[file.name] = hashlib.sha256(file.read_bytes()).hexdigest()
    for name in ['assets/vendor/manifest.json', 'assets/tailwind-3.4.17.min.css', 'scripts/start-local.py', 'start-local.bat']:
        hashes[name] = hashlib.sha256((snapshot / name).read_bytes()).hexdigest()
    results = []
    header = {
        'started': dt.datetime.now(dt.timezone.utc).isoformat(),
        'snapshot': str(snapshot), 'sourceRoot': str(ROOT),
        'sourceHead': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(),
        'sourceStatus': subprocess.check_output(['git', 'status', '--short'], cwd=ROOT, text=True),
        'runtimeSourceHashes': hashes,
        'browser': '/usr/bin/chromium', 'browserConcurrency': 2,
        'reportsPreserved': 'All old checked-in reports remain in the source checkout; checks write in the snapshot.',
    }
    (evidence / 'snapshot.json').write_text(json.dumps(header, ensure_ascii=False, indent=2))

    def run(suite):
        name, command = suite
        env = dict(os.environ, VLEX_REVIEW_ROOT=str(snapshot),
                   VLEX_REVIEW_OUTPUT=str(evidence / (name + '.json')),
                   VLP_TEST_OUTPUT=str(evidence / 'legacy-dictionary'),
                   PLAYWRIGHT_BROWSERS_PATH='/workspace/.playwright-browsers')
        started = time.monotonic()
        try:
            run = subprocess.run(command, cwd=snapshot, env=env, stdout=subprocess.PIPE,
                                 stderr=subprocess.STDOUT, text=True, timeout=240)
            code, output = run.returncode, run.stdout
        except subprocess.TimeoutExpired as error:
            code, output = 124, str(error.stdout or '') + '\nTIMED OUT\n'
        (evidence / (name + '.log')).write_text(output)
        item = {'suite': name, 'command': command, 'cwd': str(snapshot), 'exitCode': code,
                'seconds': round(time.monotonic() - started, 2),
                'passLines': sum(line.startswith('PASS') for line in output.splitlines()),
                'failLines': sum(line.startswith('FAIL') for line in output.splitlines())}
        print(json.dumps(item), flush=True)
        return item

    for suite in UNITS:
        results.append(run(suite))
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        for item in pool.map(run, BROWSERS):
            results.append(item)
    # Copy new suite reports/screenshots/video from the snapshot as evidence.
    for folder in ['store', 'explainer', 'course', 'advanced', 'css-lab', 'js-lab', 'dashboard', 'dictionary', 'dictionary-css-fixes', 'dictionary-vue-fixes', 'integration']:
        src = snapshot / 'platform-tests' / folder
        if src.exists():
            shutil.copytree(src, evidence / 'suites' / folder, dirs_exist_ok=True)
    changed_since_copy = [name for name, digest in hashes.items()
                          if not (ROOT / name).exists() or hashlib.sha256((ROOT / name).read_bytes()).hexdigest() != digest]
    summary = {**header, 'finished': dt.datetime.now(dt.timezone.utc).isoformat(),
               'sourceMatchesSnapshotAtFinish': not changed_since_copy,
               'runtimeSourcesChangedSinceSnapshot': changed_since_copy,
               'passedSuites': sum(x['exitCode'] == 0 for x in results),
               'totalSuites': len(results), 'results': results}
    (evidence / 'summary.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2))
    print('FINAL_REPORT ' + str(evidence / 'summary.json'), flush=True)
    return 0 if all(x['exitCode'] == 0 for x in results) and not changed_since_copy else 1


if __name__ == '__main__':
    raise SystemExit(main())
