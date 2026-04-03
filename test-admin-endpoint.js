const http = require('http');
const options = {hostname:'localhost',port:5001,path:'/api/admin/overview',method:'GET'};
const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Data:', data);
  });
});
req.on('error', e => console.error('Error:', e));
req.end();
