// Zero-dependency static file server for local preview.
// Usage: node serve.js [port]
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.argv[2] || 8080;
const root = __dirname;

const mime = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8',
};

http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(root, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) return serve(filePath);
    if (!err && stats.isDirectory()) return serve(path.join(filePath, 'index.html'));
    // Fallback: try adding .html (clean URLs)
    if (fs.existsSync(filePath + '.html')) return serve(filePath + '.html');
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + reqPath);
  });

  function serve(fp) {
    const ext = path.extname(fp).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    fs.createReadStream(fp).pipe(res);
  }
}).listen(port, () => {
  console.log(`Preview server running at http://localhost:${port}/`);
});
