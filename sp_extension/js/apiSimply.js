/**
 * Api Simply Password
 */

class ApiSimply
{
	constructor (ip = 'https://simply-password.ovh/') {
		this.socket = io.connect(ip);
	}

	/**
	 * Login query
	 */
	login (mail, password, callback) {
		if (mail === undefined || password === undefined)
			return false;
		this.socket.emit('login', mail, password);
		this.socket.on('login', function(res){
			callback(res);
		});
	}

	/**
	 * Register Query
	 */
	register (mail, password, callback) {
		if (mail === undefined || password === undefined)
			return false;
		this.socket.emit('register', mail, password);
		this.socket.on('register', function(res){
			callback(res);
		});
	}

	/**
	 * Token verification
	 */
	verifToken (token, callback) {
		if (token === undefined)
			return false;
		this.socket.emit('verifToken', token);
		this.socket.on('verifToken', function(res){
			callback(res);
		});
	}

	/**
	 * Get the user login
	 * in function of the website
	 */
	getID (token, dir, callback) {
		if (token === undefined || dir === undefined)
			return false;
		this.socket.emit('getID', token, dir);
		this.socket.on('getID', function(res){
			callback(res);
		});
	}

	/**
	 * Add an user login
	 * in function of the website
	 */
	saveID (token, dir, mail, pass, callback) {
		if (token === undefined || dir === undefined || mail == undefined || pass == undefined)
			return false;
		this.socket.emit('saveID', token, dir, mail, pass);
		this.socket.on('saveID', function(){
			callback();
		});
	}

	getShared(token, dir, callback) {
		if (token === undefined || dir === undefined)
			return false;
		this.socket.emit('getShared', token, dir);
		this.socket.on('getShared', function(res){
				callback(res);
		});
	}

	share(token, dir, mail, callback) {
		if (token === undefined || dir === undefined || mail === undefined)
			return false;
		this.socket.emit('share', token, dir, mail, document.cookie);
		this.socket.on('share', function(res){
				callback(res);
		});
	}

}

var api = new ApiSimply('https://simply-password.ovh/');