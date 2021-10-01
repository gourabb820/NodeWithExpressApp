const http = require('http');
const reqHandler = require('./route');
const  server = http.createServer(reqHandler);

server.listen(3000)
