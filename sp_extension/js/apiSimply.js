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

	/**
	 * Get all shared cookies
	 */
	getShared(token, dir, callback) {
		if (token === undefined || dir === undefined)
			return false;
		this.socket.emit('getShared', token, dir);
		this.socket.on('getShared', function(res){
				callback(res);
		});
	}

	/**
	 * Share cookies
	 * of a session
	 */
	share(token, dir, mail, cookies, callback) {
		if (token === undefined || dir === undefined || mail === undefined)
			return false;
		this.socket.emit('share', token, dir, mail, cookies);
		this.socket.on('share', function(res){
				callback(res);
		});
	}

	/**
	 * Activate Session
	 */
	activate(token, cookies) {
		if (token == undefined || cookies === undefined)
			return false;
		this.socket.emit('activate', token, cookies);
	}

	getActivate(token, callback){
		this.socket.on('activate', function(token, cookie){
			if (token == TOKEN.TOKEN) {
				callback(cookie);
			}
		});
	};
}

var api = new ApiSimply('https://simply-password.ovh/');