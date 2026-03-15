const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;
const root = path.resolve(__dirname, '..');
const mimes = {
  '.html':'text/html','.js':'text/javascript','.css':'text/css',
  '.jpeg':'image/jpeg','.jpg':'image/jpeg','.png':'image/png',
  '.svg':'image/svg+xml','.json':'application/json','.ico':'image/x-icon'
};
http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/') url = '/index.html';
  const fp = path.join(root, url);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    res.writeHead(200, {'Content-Type': mimes[path.extname(fp)] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(port, () => console.log('Listening on ' + port));
