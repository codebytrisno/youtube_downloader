import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/convert?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (e) => console.log('Error:', e.message));
req.setTimeout(30000);
req.end();