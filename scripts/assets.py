"""Reproduce or verify pinned runtime assets. HTTPS and npm integrity stay enabled."""
import base64
import hashlib
import io
import json
from pathlib import Path
import sys
import tarfile
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
LOCK = ROOT / 'assets/vendor/manifest.json'

def digest(data):
    return hashlib.sha256(data).hexdigest()

manifest = json.loads(LOCK.read_text())
mode = sys.argv[1] if len(sys.argv) > 1 else 'verify'
if mode == 'vendor':
    for package in manifest['packages']:
        with urllib.request.urlopen(package['tarball'], timeout=60) as response:
            archive = response.read()
        algorithm, expected = package['integrity'].split('-', 1)
        actual = base64.b64encode(hashlib.new(algorithm, archive).digest()).decode()
        if actual != expected:
            raise ValueError('npm integrity mismatch: ' + package['name'])
        with tarfile.open(fileobj=io.BytesIO(archive)) as tar:
            for file in package['files']:
                # Extract only explicitly locked members, never a whole archive.
                data = tar.extractfile('package/' + file['source']).read()
                if package.get('font_family') and file['source'] == 'index.css':
                    text = data.decode().replace(package['font_family'] + ' Variable', package['font_family'])
                    import re
                    text = re.sub(r'font-weight: \d+ \d+;', 'font-weight: ' + package['font_weight'] + ';', text)
                    data = text.encode()
                if digest(data) != file['sha256']:
                    raise ValueError('Locked asset mismatch: ' + file['path'])
                path = ROOT / file['path']
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(data)
    print('Pinned packages and extracted assets verified and restored.')
elif mode == 'lock-css':
    # Build output is generated from tracked source and the pinned CLI, not downloaded.
    manifest['generated_css'] = {
        'path': 'assets/tailwind-3.4.17.min.css',
        'sha256': digest((ROOT / 'assets/tailwind-3.4.17.min.css').read_bytes()),
        'tool': 'tailwindcss@3.4.17',
        'config_sha256': digest((ROOT / 'tailwind.config.cjs').read_bytes()),
        'inputs_sha256': {name: digest((ROOT / name).read_bytes()) for name in
            ['index.html', 'app.js', 'lexicon-data.js', 'practice-curriculum.js', 'simulator-guides.js']}
    }
    LOCK.write_text(json.dumps(manifest, indent=2) + '\n')
    print('Recorded CSS build hash.')
elif mode == 'verify':
    files = [file for package in manifest['packages'] for file in package['files']]
    files.append(manifest['generated_css'])
    for file in files:
        if digest((ROOT / file['path']).read_bytes()) != file['sha256']:
            raise ValueError('Asset checksum mismatch: ' + file['path'])
    if digest((ROOT / 'tailwind.config.cjs').read_bytes()) != manifest['generated_css']['config_sha256']:
        raise ValueError('Tailwind config changed; rebuild CSS.')
    for name, expected in manifest['generated_css']['inputs_sha256'].items():
        if digest((ROOT / name).read_bytes()) != expected:
            raise ValueError('CSS input changed; run npm run build:css: ' + name)
    print('PASS: ' + str(len(files)) + ' local runtime/license assets match their locked SHA-256 hashes.')
else:
    raise SystemExit('Use verify, vendor, or lock-css.')
