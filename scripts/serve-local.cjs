/**
 * VueLexicon Pro - Secure Zero-Dependency Local Static Server for Windows
 * - Listens on 127.0.0.1 ONLY
 * - Path traversal protection
 * - Blocks hidden files (.git, .github, etc.) and internal backup folders
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5173;
const ROOT_DIR = path.resolve(__dirname, '..');

// Blocked prefixes, directories, and sensitive file patterns
const BLOCKED_SEGMENTS = [
  '.git',
  '.github',
  '_pristine_backup',
  '_v3.5_pre_hands_on_backup',
  'node_modules'
];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.cjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4'
};

function isPathBlocked(normalizedRelPath) {
  // Disallow null bytes
  if (normalizedRelPath.includes('\0')) return true;

  // Split into path segments
  const segments = normalizedRelPath.split(/[/\\]+/).filter(Boolean);

  for (const seg of segments) {
    // Block dot-files/dirs (.git, .gitignore, .env, etc.)
    if (seg.startsWith('.')) return true;
    // Block internal backup and system directories
    if (BLOCKED_SEGMENTS.includes(seg.toLowerCase())) return true;
  }

  // Block sensitive config or source files
  const baseName = path.basename(normalizedRelPath).toLowerCase();
  if (baseName.endsWith('.log') || baseName.endsWith('.patch')) {
    return true;
  }

  return false;
}

function createServer(port) {
  const server = http.createServer((req, res) => {
    try {
      // Parse request URL
      let reqUrl;
      try {
        reqUrl = new URL(req.url, `http://127.0.0.1:${port}`);
      } catch (_) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('400 طلب غير صالح');
        return;
      }

      let pathname = decodeURIComponent(reqUrl.pathname);
      if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
      }

      // Check blocked patterns before resolving path
      if (isPathBlocked(pathname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 ممنوع: الوصول إلى هذا المسار غير مصرح به');
        return;
      }

      // Prevent path traversal
      const safeRelativePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
      const filePath = path.resolve(ROOT_DIR, '.' + path.sep + safeRelativePath);

      // Verify resolved path stays strictly within ROOT_DIR
      if (!filePath.startsWith(ROOT_DIR + path.sep) && filePath !== ROOT_DIR) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 ممنوع: محاولة وصول خارج نطاق مجلد المشروع');
        return;
      }

      fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 الملف غير موجود');
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': stats.size,
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
          'X-Content-Type-Options': 'nosniff'
        });

        const stream = fs.createReadStream(filePath);
        stream.on('error', () => {
          if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('500 خطأ أثناء قراءة الملف');
          }
        });
        stream.pipe(res);
      });
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 خطأ في الخادم: ' + e.message);
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`[!] المنفذ ${port} مشغول حالياً، جاري تجربة المنفذ ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('[X] خطأ في تشغيل الخادم:', err.message);
    }
  });

  server.listen(port, '127.0.0.1', () => {
    console.log(`\n======================================================`);
    console.log(`  قاموس ومحاكي VueLexicon Pro يعمل محلياً بنجاح!`);
    console.log(`  العنوان: http://127.0.0.1:${port}/`);
    console.log(`  الاستماع حصرياً على: 127.0.0.1 (محمي من الشبكة الخارجية)`);
    console.log(`  الملفات الحساسة والنسخ الاحتياطية: محجوبة`);
    console.log(`  (اضغط Ctrl+C لإيقاف الخادم عند الانتهاء)`);
    console.log(`======================================================\n`);
  });
}

createServer(DEFAULT_PORT);
