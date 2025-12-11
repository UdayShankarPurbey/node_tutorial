const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>Welcome to My Server!</h1>
      <p>This is a simple server created using Node.js</p>
    `);
  } else if (url === '/project') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`
      Project Page
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404: Page Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
