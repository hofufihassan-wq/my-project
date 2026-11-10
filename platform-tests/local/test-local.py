import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('vlex_start_local', ROOT / 'scripts/start-local.py')
server = importlib.util.module_from_spec(spec)
spec.loader.exec_module(server)


class PublicFileBoundary(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory(prefix='vlex-public-test-')
        cls.root = Path(cls.temp.name)
        cls.saved_root = server.ROOT
        server.ROOT = cls.root
        (cls.root / 'assets').mkdir()
        for name in ['index.html', 'app.js', 'learning-test.js', 'styles.css', 'run_test.js', 'audit_engine.cjs', '.env', 'README.md']:
            (cls.root / name).write_text('fixture', encoding='utf-8')
        (cls.root / 'assets/font.woff2').write_bytes(b'font')
        (cls.root / 'assets/.secret.js').write_text('not public')
        (cls.root / '_pristine_backup').mkdir()
        (cls.root / '_pristine_backup/index.html').write_text('original backup')
        cls.outside = Path(cls.temp.name).parent / (cls.root.name + '-outside.txt')
        cls.outside.write_text('outside test fixture')
        (cls.root / 'assets/escape.txt').symlink_to(cls.outside)

    @classmethod
    def tearDownClass(cls):
        server.ROOT = cls.saved_root
        cls.temp.cleanup()
        cls.outside.unlink()

    def test_runtime_files(self):
        for route in ['/', '/index.html', '/app.js', '/learning-test.js', '/styles.css', '/assets/font.woff2']:
            with self.subTest(route=route):
                self.assertIsNotNone(server.public_file(route))

    def test_private_and_non_runtime_files(self):
        for route in ['/.env', '/.git/config', '/README.md', '/run_test.js', '/audit_engine.cjs', '/_pristine_backup/index.html', '/assets/.secret.js', '/assets/escape.txt']:
            with self.subTest(route=route):
                self.assertIsNone(server.public_file(route))

    def test_path_traversal_and_unusual_paths(self):
        for route in ['/../index.html', '/assets/../app.js', '/%2e%2e/index.html', '/assets/%2e%2e/app.js', '/assets\\..\\app.js', '/assets//font.woff2', '/%00', '/assets/', '/unknown.js']:
            with self.subTest(route=route):
                self.assertIsNone(server.public_file(route))

    def test_exact_health_contract(self):
        self.assertEqual(server.health()['origin'], 'http://127.0.0.1:8091')
        self.assertEqual(server.health()['protocol'], 1)
        self.assertEqual(server.HOST, '127.0.0.1')
        self.assertEqual(server.PORT, 8091)

    def test_windows_launcher_crlf_and_version_guard(self):
        data = (ROOT / 'start-local.bat').read_bytes()
        self.assertIn(b'cd /d "%~dp0"\r\n', data)
        self.assertIn(b'sys.version_info >= (3, 8)', data)
        self.assertNotIn(b'\n', data.replace(b'\r\n', b''))
        self.assertNotIn(b'netsh', data.lower())
        self.assertNotIn(b'0.0.0.0', data)


if __name__ == '__main__':
    unittest.main(verbosity=2)
