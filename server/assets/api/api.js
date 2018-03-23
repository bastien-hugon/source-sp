var crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


/**
 * Initialisation de la base de donnée
 * Création des tables:
 * users -> contient : _id, mail, password, date_creation
 * token -> contient : _id, fk_id_user, token, date_creation
 */
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("simply");
	dbo.createCollection("users", function(err, res) {
		if (err) throw err;
		dbo.createCollection("tokens", function(err, res) {
			if (err) throw err;
			db.close();
		});
	});
});

/**
 * Génération de token
 */
function generateToken(user, callback) {
	if (user[0] == undefined)
		callback(false);
	console.log("OUI >> " + JSON.stringify(user[0]));
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("simply");
		var token = crypto.randomBytes(64).toString('hex');
		dbo.collection("token").insertOne({fk_id_user: user[0]._id, token: token, date_creation: Date.now()}, function(err, res){
			if (err) throw err;
			callback(token);
			db.close();
		});
	});
}

/**
 * API Socket.IO 
 */
io.on('connection', function (socket) {
	var ip = socket.handshake.headers["x-real-ip"];
	var port = socket.handshake.headers["x-real-port"];
	console.log("Connection from: " + ip + ":" + port);

	/**
	 * Requete de login
	 */
	socket.on('login', function(mail, pwd){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("simply");
			var hash = crypto.createHash('sha256').update(pwd).digest('base64');
			dbo.collection("users").find({ mail: mail, password: hash }).toArray(function(err, res) {
				if (err) throw err;
				generateToken(res[0], function(token){
					var result = {success: (res[0] !== undefined) ? (true) : (false), data: res[0], token: token};
					db.close();
					socket.emit('login', result);
				});
			});
		});
	});

	/**
	 * Vérification de token
	 */
	socket.on('verifToken', function(token){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("simply");
			dbo.collection("token").find({ token: token }).toArray(function(err, res) {
				if (err) throw err;
				console.log(JSON.stringify(res));
				var result = (res[0]) ? (true) : (false);
				db.close();
				socket.emit('verifToken', result);
			});
		});
	});
});