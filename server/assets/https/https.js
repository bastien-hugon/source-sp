var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('assets/https/sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('assets/https/sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);