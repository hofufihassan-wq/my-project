#!/usr/bin/env python3
"""Build a transferable local site archive without dependencies or private files."""
from __future__ import annotations
import argparse
import datetime as dt
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import zipfile

ROOT = Path(__file__).resolve().parent.parent
BACKUPS = ('_pristine_backup', '_v3.5_pre_hands_on_backup')
EXTRA_ROOT = {'start-local.bat', 'package.json', 'package-lock.json', 'tailwind.config.cjs'}
SCRIPT_FILES = ('start-local.py', 'package-local.py', 'package-static.py', 'assets.py', 'build-sfc-compiler.cjs')
FORBIDDEN_PARTS = {'.git', '.aws', '.codex', 'node_modules', '__pycache__'}
FORBIDDEN_SUFFIXES = {'.pem', '.key', '.p12', '.pfx', '.pyc', '.zip'}


def safe(path):
    rel = path.relative_to(ROOT)
    return not any(p in FORBIDDEN_PARTS or p.startswith('.env') for p in rel.parts) and path.suffix.lower() not in FORBIDDEN_SUFFIXES


def selected_files():
    files = set()
    for path in ROOT.iterdir():
        if not path.is_file() or not safe(path):
            continue
        if path.name == 'index.html' or path.name in EXTRA_ROOT or path.suffix == '.md' or (
            path.suffix in ('.js', '.css') and not path.name.startswith(('run_', 'audit_', 'test_', 'test-'))
        ):
            files.add(path)
    for folder in ('assets', *BACKUPS):
        parent = ROOT / folder
        if not parent.is_dir():
            raise RuntimeError('Required folder is missing: ' + folder)
        for path in parent.rglob('*'):
            if path.is_file() and safe(path):
                files.add(path)
    for name in SCRIPT_FILES:
        file = ROOT / 'scripts' / name
        if file.is_file():
            files.add(file)
    for path in files:
        # A symlink may not pull unrelated files from outside the checkout.
        path.resolve(strict=True).relative_to(ROOT.resolve())
    return sorted(files, key=lambda p: p.relative_to(ROOT).as_posix())


def git_value(*args):
    try:
        return subprocess.check_output(['git', '-C', str(ROOT), *args], text=True, stderr=subprocess.DEVNULL).strip()
    except (OSError, subprocess.CalledProcessError):
        return None


def main(argv=None):
    parser = argparse.ArgumentParser(description='Create a VLex Pro local Windows ZIP.')
    parser.add_argument('--output-dir', type=Path, default=Path('/workspace/downloads') if Path('/workspace').is_dir() else ROOT.parent / 'downloads')
    args = parser.parse_args(argv)
    output = args.output_dir.resolve()
    # Keep packages outside the checkout so the next build cannot collect itself.
    try:
        output.relative_to(ROOT.resolve())
        parser.error('--output-dir must be outside the project folder.')
    except ValueError:
        pass
    output.mkdir(parents=True, exist_ok=True)
    commit = git_value('rev-parse', 'HEAD')
    timestamp = dt.datetime.now(dt.timezone.utc)
    stem = 'VLex-Pro-local-' + timestamp.strftime('%Y%m%d-%H%M%S') + '-' + (commit[:8] if commit else 'source')
    archive = output / (stem + '.zip')
    suffix = 1
    while archive.exists():
        archive = output / (stem + '-' + str(suffix) + '.zip')
        suffix += 1
    files = selected_files()
    for required in ('index.html', 'start-local.bat', 'LOCAL_RUN_AR.md', 'scripts/start-local.py'):
        if ROOT / required not in files:
            raise RuntimeError('Required file is missing: ' + required)
    manifest = {'application': 'V Lex Pro', 'created_utc': timestamp.isoformat(),
                'git_commit': commit, 'git_branch': git_value('branch', '--show-current'),
                'uncommitted_files_present': bool(git_value('status', '--porcelain')),
                'origin': 'http://127.0.0.1:8091/',
                'note': 'manifest itself is excluded from recursive file hashes; backup folders are retained but not served over HTTP.',
                'files': {}}
    with zipfile.ZipFile(archive, 'x', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zip_file:
        for file in files:
            data = file.read_bytes()
            relative = file.relative_to(ROOT).as_posix()
            manifest['files'][relative] = {'sha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data)}
            zip_file.writestr('VLex-Pro/' + relative, data)
        zip_file.writestr('VLex-Pro/LOCAL_PACKAGE_MANIFEST.json', json.dumps(manifest, ensure_ascii=False, indent=2).encode('utf-8'))
    with zipfile.ZipFile(archive) as zip_file:
        damaged = zip_file.testzip()
        if damaged:
            raise RuntimeError('Archive integrity failed: ' + damaged)
        for relative, info in manifest['files'].items():
            if hashlib.sha256(zip_file.read('VLex-Pro/' + relative)).hexdigest() != info['sha256']:
                raise RuntimeError('Manifest integrity failed: ' + relative)
    sha256 = hashlib.sha256(archive.read_bytes()).hexdigest()
    archive.with_suffix('.zip.sha256').write_text(sha256 + '  ' + archive.name + '\n', encoding='ascii')
    print(json.dumps({'archive': str(archive), 'bytes': archive.stat().st_size, 'sha256': sha256,
                      'file_count': len(files), 'commit': commit, 'dirty': manifest['uncommitted_files_present']}, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    sys.exit(main())
