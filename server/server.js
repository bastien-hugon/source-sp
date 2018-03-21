var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

// Launch Express Servee
server.listen(8080, function () {
	console.log('Server running on port 8080');
});

// Define the static route for all files required by the website
app.use('/', express.static(__dirname + '/html/'));
//app.use('/assets/', express.static(__dirname + '/html/assets/'));

// Get API Content
eval(fs.readFileSync('assets/api/api.js')+'');
