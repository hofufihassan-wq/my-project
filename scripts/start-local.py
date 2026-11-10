#!/usr/bin/env python3
"""Run V Lex Pro locally without exposing the checkout or changing stored data."""
from __future__ import annotations

import argparse
import hashlib
import http.server
import json
import mimetypes
import socket
import sys
import threading
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOST = '127.0.0.1'
PORT = 8091
ORIGIN = 'http://127.0.0.1:8091'
HEALTH_PATH = '/__vlex_health__'
APPLICATION = 'VLex Pro local'
ROOT_ID = hashlib.sha256(str(ROOT.resolve()).encode('utf-8')).hexdigest()[:20]
ALLOWED_ROOT_SUFFIXES = {'.js', '.css'}
ASSET_SUFFIXES = {'.js', '.css', '.woff', '.woff2', '.ttf', '.otf', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.txt', '.json'}
MIME = {'.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff'}


def health():
    return {'application': APPLICATION, 'protocol': 1, 'root_id': ROOT_ID, 'origin': ORIGIN}


def public_file(url_path):
    """Resolve only runtime assets. No directory listings or checkout disclosure."""
    try:
        decoded = urllib.parse.unquote(url_path, errors='strict')
    except (UnicodeError, ValueError):
        return None
    if '\x00' in decoded or '\\' in decoded:
        return None
    parts = decoded.lstrip('/').split('/')
    if any(p in ('.', '..') or p.startswith('.') for p in parts):
        return None
    if decoded == '/':
        parts = ['index.html']
    if not parts or any(not p for p in parts):
        return None
    relative = Path(*parts)
    if len(parts) == 1:
        if parts[0] != 'index.html' and not (
            relative.suffix.lower() in ALLOWED_ROOT_SUFFIXES
            and not parts[0].startswith(('run_', 'audit_', 'test_', 'test-'))
        ):
            return None
    elif parts[0] != 'assets' or relative.suffix.lower() not in ASSET_SUFFIXES:
        return None
    try:
        resolved = (ROOT / relative).resolve(strict=True)
        resolved.relative_to(ROOT.resolve())
        if not resolved.is_file():
            return None
    except (OSError, ValueError):
        return None
    return resolved


class LocalHandler(http.server.BaseHTTPRequestHandler):
    server_version = 'VLexLocal/1'
    sys_version = ''

    def _respond(self, head=False):
        host = self.headers.get('Host', '')
        if host not in (HOST, f'{HOST}:{PORT}', 'localhost', f'localhost:{PORT}'):
            self.send_error(403, 'This server only accepts loopback Host names.')
            return
        path = urllib.parse.urlsplit(self.path).path
        if path == HEALTH_PATH:
            content = json.dumps(health(), separators=(',', ':')).encode('utf-8')
            mime = 'application/json; charset=utf-8'
        else:
            file = public_file(path)
            if file is None:
                self.send_error(404, 'File is not a public runtime asset.')
                return
            try:
                content = file.read_bytes()
            except OSError:
                self.send_error(404, 'File is unavailable.')
                return
            mime = MIME.get(file.suffix.lower()) or mimetypes.guess_type(file.name)[0] or 'application/octet-stream'
        self.send_response(200)
        self.send_header('Content-Type', mime)
        self.send_header('Content-Length', str(len(content)))
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Cache-Control', 'no-cache')
        self.end_headers()
        if not head:
            try:
                self.wfile.write(content)
            except (BrokenPipeError, ConnectionResetError):
                pass

    def do_GET(self):
        self._respond()

    def do_HEAD(self):
        self._respond(head=True)

    def do_POST(self):
        self.send_error(405, 'This is a read-only local site.')

    def log_message(self, format, *args):
        # No user code, storage contents or environment values are logged.
        if len(args) > 1 and str(args[1]).isdigit() and int(args[1]) >= 400:
            super().log_message(format, *args)


class LocalServer(http.server.ThreadingHTTPServer):
    allow_reuse_address = True
    daemon_threads = True


def existing_server():
    # The only proxy bypass is a fixed loopback destination; never external hosts.
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    try:
        with opener.open(ORIGIN + HEALTH_PATH, timeout=1) as response:
            if response.status != 200:
                return False
            value = json.loads(response.read(4096).decode('utf-8'))
            return value == health()
    except (OSError, ValueError, urllib.error.URLError):
        return False


def open_browser():
    try:
        if not webbrowser.open(ORIGIN + '/'):
            print('Open this address in your browser: ' + ORIGIN + '/', flush=True)
    except webbrowser.Error:
        print('Open this address in your browser: ' + ORIGIN + '/', flush=True)


def main(argv=None):
    parser = argparse.ArgumentParser(description='Run V Lex Pro at http://127.0.0.1:8091 only.')
    parser.add_argument('--no-browser', action='store_true', help='Start the server without opening a browser.')
    args = parser.parse_args(argv)
    if not (ROOT / 'index.html').is_file() or not (ROOT / 'assets').is_dir():
        print('ERROR: Keep scripts/start-local.py inside the complete extracted site folder.', file=sys.stderr)
        return 1
    try:
        server = LocalServer((HOST, PORT), LocalHandler)
    except OSError:
        if existing_server():
            print('This same local site is already running at ' + ORIGIN + '/', flush=True)
            if not args.no_browser:
                open_browser()
            return 0
        print('ERROR: Port 8091 is already in use or unavailable. Stop its existing server, then try again.\n'
              'The port will not change automatically because your browser data belongs to this origin.', file=sys.stderr)
        return 2
    print('V Lex Pro is running at ' + ORIGIN + '/', flush=True)
    print('Keep this window open. Press Ctrl+C to stop. Nothing is exposed to your network.', flush=True)
    timer = None
    if not args.no_browser:
        timer = threading.Timer(0.4, open_browser)
        timer.daemon = True
        timer.start()
    try:
        server.serve_forever(poll_interval=0.25)
    except KeyboardInterrupt:
        print('\nLocal server stopped. Your browser data has not been changed.', flush=True)
    finally:
        if timer:
            timer.cancel()
        server.server_close()
    return 0


if __name__ == '__main__':
    sys.exit(main())
