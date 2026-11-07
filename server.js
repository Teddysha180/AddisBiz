// Ethiopian Business Directories Extractor - Server & Proxy
// Supports: AddisBiz, EthiopiaBusinessDirectory, Ezega, 2merkato
// Zero dependencies: runs with native Node.js (v18+)
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const HTML_FILE = path.join(__dirname, 'addisbiz_extractor.html');

const CHROME_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
  'Sec-Ch-Ua-Mobile': '?0',
  'Sec-Ch-Ua-Platform': '"Windows"',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1'
};

const server = http.createServer(async (req, res) => {
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
      server: 'Addisbiz',
      supported: ['addisbiz.com', 'ethiopiabusinessdirectory.com', 'businessguide.ezega.com', '2merkato.com', 'dnb.com'],
      version: '2.4.0',
      environment: process.env.NODE_ENV || 'production',
      uptime_seconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      url: 'https://addisbiz.onrender.com'
    }));
    return;
  }

  // Built-in CORS Proxy endpoint with Cloudflare resilience
  if (parsedUrl.pathname === '/api/proxy') {
    let targetUrl = parsedUrl.query.url;
    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Missing url query parameter');
      return;
    }

    if (/^https?:\/\/ethiopiabusinessdirectory\.com/i.test(targetUrl)) {
      targetUrl = targetUrl.replace(/^https?:\/\/ethiopiabusinessdirectory\.com/i, 'https://www.ethiopiabusinessdirectory.com');
    }

    // For Ezega and D&B, route through high-reliability reader proxy to bypass Cloudflare
    const isEzega = /ezega\.com/i.test(targetUrl);
    const isDnb = /dnb\.com/i.test(targetUrl);
    let fetchUrl = targetUrl;
    let fetchHeaders = CHROME_HEADERS;

    if (isEzega || isDnb) {
      fetchUrl = `https://r.jina.ai/${targetUrl}`;
      fetchHeaders = {
        'Accept': 'text/plain, text/html, application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'X-No-Cache': 'true',
        'X-With-Links-Summary': 'true'
      };
    }

    try {
      let response = await fetch(fetchUrl, {
        headers: fetchHeaders,
        redirect: 'follow',
        signal: AbortSignal.timeout(30000)
      });

      let body = await response.text();

      // If direct request for other sites was challenged by Cloudflare or blocked, retry with reader proxy
      if ((response.status === 403 || response.status === 503 || body.includes('Just a moment...')) && !fetchUrl.includes('r.jina.ai')) {
        try {
          const fbResponse = await fetch(`https://r.jina.ai/${targetUrl}`, {
            headers: {
              'Accept': 'text/html,application/xhtml+xml',
              'X-Return-Format': 'html',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            signal: AbortSignal.timeout(25000)
          });
          const fbBody = await fbResponse.text();
          if (fbResponse.ok && fbBody.length > 500 && !fbBody.includes('Just a moment...')) {
            response = fbResponse;
            body = fbBody;
          }
        } catch (_) {}
      }

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

  // Serve single-file HTML app
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
  console.log(`  Addisbiz running!`);
  console.log(`  Supported: AddisBiz, EthiopiaBusinessDirectory, Ezega, 2merkato, D&B`);
  console.log(`  Open in browser: http://localhost:${PORT}`);
  console.log(`  Local proxy:    http://localhost:${PORT}/api/proxy?url=...`);
  console.log(`=================================================\n`);
});
