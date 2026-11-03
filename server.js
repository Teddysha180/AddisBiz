// Ethiopian Business Directories Extractor - Server & Proxy
// Supports: AddisBiz, EthiopiaBusinessDirectory, Ezega, 2merkato
// Zero dependencies: runs with native Node.js (v18+)
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const HTML_FILE = path.join(__dirname, 'addisbiz_extractor.html');

const server = http.createServer(async (req, res) => {
  // Enable CORS for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  // Health check
  if (parsedUrl.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      server: 'Ethiopian Business Directories Extractor',
      supported: ['addisbiz.com', 'ethiopiabusinessdirectory.com', 'businessguide.ezega.com', '2merkato.com'],
      version: '2.0.0',
      environment: process.env.NODE_ENV || 'production',
      uptime_seconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      url: 'https://addisbiz.onrender.com'
    }));
    return;
  }

  // Built-in CORS Proxy endpoint
  if (parsedUrl.pathname === '/api/proxy') {
    let targetUrl = parsedUrl.query.url;
    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Missing url query parameter');
      return;
    }

    // Auto-normalize ethiopiabusinessdirectory.com naked domain to www to avoid SSL mismatch
    if (/^https?:\/\/ethiopiabusinessdirectory\.com/i.test(targetUrl)) {
      targetUrl = targetUrl.replace(/^https?:\/\/ethiopiabusinessdirectory\.com/i, 'https://www.ethiopiabusinessdirectory.com');
    }

    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(35000)
      });

      const body = await response.text();
      res.writeHead(response.status, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      res.end(body);
    } catch (err) {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Proxy Error: ' + err.message);
    }
    return;
  }

  // Serve the single-file HTML app
  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index.html' || parsedUrl.pathname === '/addisbiz_extractor.html') {
    if (fs.existsSync(HTML_FILE)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(HTML_FILE).pipe(res);
      return;
    }
  }

  // Fallback for static assets in same directory
  const safePath = path.normalize(path.join(__dirname, parsedUrl.pathname));
  if (safePath.startsWith(__dirname) && fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    const ext = path.extname(safePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(safePath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`  Ethiopian Business Directories Extractor running!`);
  console.log(`  Supported: AddisBiz, EthiopiaBusinessDirectory, Ezega, 2merkato`);
  console.log(`  Open in browser: http://localhost:${PORT}`);
  console.log(`  Local proxy:    http://localhost:${PORT}/api/proxy?url=...`);
  console.log(`=================================================\n`);
});
