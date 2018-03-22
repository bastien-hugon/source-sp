var crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("simply");
	dbo.createCollection("users", function(err, res) {
		if (err) throw err;
		dbo.createCollection("tokens", function(err, res) {
			if (err) throw err;
			console.log(crypto.createHash('sha256').update("1234").digest('base64'));
			var myobj = { mail: "bastien.hugon@epitech.eu", password: crypto.createHash('sha256').update("1234").digest('base64') };
			dbo.collection("users").insertOne(myobj, function(err, res) {
				if (err) throw err;
				db.close();
			});
		});
	});
});

io.on('connection', function (socket) {
	var ip = socket.handshake.headers["x-real-ip"];
	var port = socket.handshake.headers["x-real-port"];
	console.log("Connection from: " + ip + ":" + port);
	socket.on('login', function(mail, pwd){
		console.log(pwd);
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("simply");
			var hash = crypto.createHash('sha256').update(pwd).digest('base64');
			dbo.collection("users").find({ mail: mail, password: hash }).toArray(function(err, res) {
				if (err) throw err;
				console.log(res);
				var result = {success: (res[0].mail !== undefined) ? (true) : (false), data: res};
				db.close();
				socket.emit('login', result);
			});
		});
	});
});
