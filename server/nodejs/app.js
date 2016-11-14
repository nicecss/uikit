const fs = require('fs');
const http = require('http');
const https = require('https');



const server = http.createServer((req, res) => {
  const model = fs.readFileSync('../model/table.json').toString();
  res.writeHead(200, { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'});
  res.end(JSON.stringify(model));
});
server.listen(9988)
