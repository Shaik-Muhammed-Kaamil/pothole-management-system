const http = require('http');
const data = JSON.stringify({email:'admin@pothole.com', password:'password123'});
const options = {hostname:'localhost', port:5000, path:'/api/auth/login', method:'POST', headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)}};
const req = http.request(options, res => {
  console.log('status', res.statusCode);
  res.on('data', d => process.stdout.write(d));
  res.on('end', () => process.stdout.write('\n'));
});
req.on('error', e => { console.error('ERR', e); process.exit(1); });
req.write(data); req.end();
