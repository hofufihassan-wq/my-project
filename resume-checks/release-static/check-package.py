"""Offline contract checks for the static exporter; no runtime data is changed."""
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import zipfile

root = Path(__file__).resolve().parents[2]
bundle = Path(sys.argv[1]).resolve()
spec = importlib.util.spec_from_file_location('package_static', root / 'scripts/package-static.py')
exporter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(exporter)
manifest = json.loads((bundle / 'STATIC_PACKAGE_MANIFEST.json').read_text())
archive = bundle / manifest['archive']['name']
checks = []
assert hashlib.sha256(archive.read_bytes()).hexdigest() == manifest['archive']['sha256']
with zipfile.ZipFile(archive) as zipper:
    assert set(zipper.namelist()) == set(manifest['files'])
    assert zipper.testzip() is None
    for name, info in manifest['files'].items():
        path = Path(name)
        assert name == '.nojekyll' or name == 'index.html' or (
            len(path.parts) == 1 and path.suffix in ('.js', '.css')
            and not name.startswith(('run_', 'audit_', 'test_', 'test-'))
        ) or path.parts[0] == 'assets', name
        assert not any(part.startswith('.env') or part in ('.git', 'node_modules', '_pristine_backup', '_v3.5_pre_hands_on_backup') for part in path.parts)
        assert path.suffix.lower() not in ('.zip', '.pem', '.key', '.p12', '.pfx')
        assert hashlib.sha256(zipper.read(name)).hexdigest() == info['sha256']
        assert (bundle / 'website' / name).read_bytes() == zipper.read(name)
checks.append('ZIP, extracted directory, manifest SHA and runtime-only inventory match')
runtime = exporter.runtime_files()
baseline = exporter.verify_runtime(runtime)
assert len(baseline['html_assets']) > 30 and not baseline['empty_css']
checks.append('Every HTML/CSS resource exists; vendored manifest matches; no empty runtime CSS')
for label, broken in (
    ('missing script', {name: data for name, data in runtime.items() if name != 'app.js'}),
    ('empty CSS', {**runtime, 'styles.css': b''}),
    ('altered vendored asset', {**runtime, 'assets/vendor/vue-3.4.21.global.prod.js': b'corrupted'}),
):
    try:
        exporter.verify_runtime(broken)
    except RuntimeError:
        checks.append('Exporter refuses ' + label)
    else:
        raise AssertionError('Exporter accepted ' + label)
result = subprocess.run([sys.executable, str(root / 'scripts/package-static.py'), '--output-dir', str(root)], capture_output=True, text=True)
assert result.returncode != 0 and 'outside the checkout' in result.stderr
checks.append('Exporter refuses writing its bundle inside the checkout')
output = {'status': 'passed', 'source_commit': manifest['source_commit'], 'archive': str(archive),
          'runtime_file_count': len(manifest['files']), 'checks': checks,
          'asset_checks': baseline}
(Path(__file__).parent / 'package-results.json').write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'status': 'passed', 'checks': len(checks), 'files': len(manifest['files'])}))
