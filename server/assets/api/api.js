io.on('connection', function (socket) {
    var ip = socket.handshake.headers["x-real-ip"];
    var port = socket.handshake.headers["x-real-port"];
    console.log("Connection from: " + ip + ":" + port);
});
