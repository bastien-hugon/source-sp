var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

// Launch Express Server on 8080
server.listen(8080, function () {
	console.log('Server running on 8080 on HTTP');
});

// Define the static route for all files required by the website
app.use('/', express.static(__dirname + '/html/'));
app.use('/assets/', express.static(__dirname + '/html/assets/'));

// Get API Content
eval(fs.readFileSync('assets/api/api.js')+'');