const http=require('http');
const html = require('fs').readFileSync('./test.html');

const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
    res.end(html);
});

server.listen(3000);