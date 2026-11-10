#!/usr/bin/env python3
"""Prepare a static hosting bundle offline. This script never deploys anything."""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
from html.parser import HTMLParser
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote, urlsplit
import zipfile

ROOT = Path(__file__).resolve().parent.parent
FORBIDDEN_SUFFIXES = {'.pem', '.key', '.p12', '.pfx', '.pyc', '.zip'}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def git_value(*args):
    try:
        return subprocess.check_output(['git', '-C', str(ROOT), *args], text=True,
                                       stderr=subprocess.DEVNULL).strip()
    except (OSError, subprocess.CalledProcessError):
        return None


def runtime_files():
    # Share the local server's public-runtime boundary rather than collecting
    # arbitrary private checkout files. Importing it does not start a server.
    spec = importlib.util.spec_from_file_location('vlex_local_static', ROOT / 'scripts/start-local.py')
    local = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(local)
    files = {}
    candidates = list(ROOT.iterdir()) + list((ROOT / 'assets').rglob('*'))
    for path in sorted(candidates):
        relative = path.relative_to(ROOT)
        parts = relative.parts
        if len(parts) > 1 and parts[0] != 'assets':
            continue
        if (not path.is_file() or path.is_symlink() or
                any(p.startswith('.') for p in parts) or path.suffix.lower() in FORBIDDEN_SUFFIXES):
            continue
        if relative.as_posix() == 'assets/tailwind.input.css':
            continue  # Build input, not the generated runtime stylesheet.
        public = local.public_file('/' + relative.as_posix())
        # Preserve the vendored licenses, including extensionless LICENSE files.
        license_file = parts[:3] == ('assets', 'vendor', 'licenses')
        if license_file:
            path.resolve(strict=True).relative_to(ROOT.resolve())
        if public is not None or license_file:
            files[relative.as_posix()] = path.read_bytes()
    if 'index.html' not in files or 'app.js' not in files:
        raise RuntimeError('Required runtime index.html/app.js is missing.')
    return files


class HTMLAssets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'script' and attrs.get('src'):
            self.references.append(attrs['src'])
        elif tag == 'link' and attrs.get('href'):
            self.references.append(attrs['href'])


def verify_runtime(files):
    parser = HTMLAssets()
    parser.feed(files['index.html'].decode('utf-8'))
    checked = []
    for value in parser.references:
        url = urlsplit(value)
        if url.scheme == 'data':
            continue
        if url.scheme or url.netloc or value.startswith('/'):
            raise RuntimeError('HTML runtime asset is not a portable relative URL: ' + value)
        name = unquote(url.path)
        if name not in files:
            raise RuntimeError('HTML runtime asset is missing: ' + name)
        checked.append(name)
    empty_css = [name for name, data in files.items() if name.endswith('.css') and not data.strip()]
    if empty_css:
        raise RuntimeError('Empty runtime CSS must be investigated: ' + ', '.join(empty_css))
    lock = json.loads(files['assets/vendor/manifest.json'])
    locked = [entry for package in lock['packages'] for entry in package['files']]
    locked += [lock[name] for name in ('generated_css', 'generated_compiler', 'generated_dom') if name in lock]
    for entry in locked:
        name = entry['path']
        # Pinned build-only vendored sources are checked by verify:assets,
        # but must not be exposed by the public runtime allowlist.
        if name.startswith('scripts/vendor/') and name not in files:
            continue
        if name not in files or digest(files[name]) != entry['sha256']:
            raise RuntimeError('Vendored asset manifest mismatch: ' + name)
    css_refs = []
    from posixpath import normpath, join, dirname
    for name, data in files.items():
        if not name.endswith('.css'):
            continue
        for match in re.finditer(r'url\(\s*([\'"]?)(.*?)\1\s*\)', data.decode('utf-8'), re.I):
            raw = match.group(2).strip()
            url = urlsplit(raw)
            if url.scheme in ('data', 'blob') or raw.startswith('#'):
                continue
            if url.scheme or url.netloc or raw.startswith('/'):
                raise RuntimeError('CSS asset is not a portable relative URL: ' + name + ': ' + raw)
            target = normpath(join(dirname(name), unquote(url.path)))
            if target not in files:
                raise RuntimeError('CSS runtime asset is missing: ' + name + ': ' + target)
            css_refs.append({'source': name, 'target': target})
    return {'html_assets': checked, 'css_url_references': css_refs,
            'vendored_manifest_entries_verified': len(locked), 'empty_css': empty_css}


def main(argv=None):
    parser = argparse.ArgumentParser(description='Create a static site folder and ZIP locally; never deploy.')
    parser.add_argument('--output-dir', type=Path, default=ROOT.parent / 'downloads')
    args = parser.parse_args(argv)
    output = args.output_dir.resolve()
    try:
        output.relative_to(ROOT.resolve())
    except ValueError:
        pass
    else:
        parser.error('--output-dir must be outside the checkout.')
    files = runtime_files()
    checks = verify_runtime(files)
    files['.nojekyll'] = b''
    timestamp = dt.datetime.now(dt.timezone.utc)
    commit = git_value('rev-parse', 'HEAD')
    stem = 'VLex-Pro-static-' + timestamp.strftime('%Y%m%d-%H%M%S-%f') + '-' + (commit[:8] if commit else 'source')
    bundle = output / stem
    site = bundle / 'website'
    site.mkdir(parents=True, exist_ok=False)
    manifest = {'application': 'V Lex Pro static hosting preparation', 'created_utc': timestamp.isoformat(),
                'source_commit': commit, 'source_branch': git_value('branch', '--show-current'),
                'uncommitted_files_present': bool(git_value('status', '--porcelain')),
                'deployment_performed': False, 'website_folder': 'website',
                'note': 'Only website/ contents belong on a public host. This manifest stays outside it.',
                'checks': checks, 'files': {}}
    archive = bundle / (stem + '.zip')
    with zipfile.ZipFile(archive, 'x', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zipper:
        for name, data in sorted(files.items()):
            file = site / name
            file.parent.mkdir(parents=True, exist_ok=True)
            file.write_bytes(data)
            zipper.writestr(name, data)
            manifest['files'][name] = {'bytes': len(data), 'sha256': digest(data)}
    with zipfile.ZipFile(archive) as zipper:
        if zipper.testzip() is not None or set(zipper.namelist()) != set(files):
            raise RuntimeError('ZIP inventory/integrity check failed.')
        for name, info in manifest['files'].items():
            if digest(zipper.read(name)) != info['sha256'] or digest((site / name).read_bytes()) != info['sha256']:
                raise RuntimeError('ZIP/folder content mismatch: ' + name)
    manifest['archive'] = {'name': archive.name, 'bytes': archive.stat().st_size,
                           'sha256': digest(archive.read_bytes())}
    manifest_path = bundle / 'STATIC_PACKAGE_MANIFEST.json'
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    archive.with_suffix('.zip.sha256').write_text(manifest['archive']['sha256'] + '  ' + archive.name + '\n', encoding='ascii')
    print(json.dumps({'website': str(site), 'archive': str(archive), 'manifest': str(manifest_path),
                      'files': len(files), **manifest['archive'], 'source_commit': commit}, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    sys.exit(main())
