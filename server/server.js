var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
eval(fs.readFileSync('assets/https/https.js')+'');

// Launch Express Server on 4242
httpServer.listen(8080, function () {
	console.log('Server running on 8080 on HTTP');
});

httpsServer.listen(443, function () {
	console.log('Server running on 4242 on HTTPS');
});

// Define the static route for all files required by the website
app.use('/', express.static(__dirname + '/html/'));

// Get API Content
eval(fs.readFileSync('assets/api/api.js')+'');