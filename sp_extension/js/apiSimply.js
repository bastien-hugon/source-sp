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
		if (mail == undefined || password === undefined)
			return false;
		this.socket.emit('login', mail, password);
		this.socket.on('login', callback(res));
		return true;
	}
}

var api = new ApiSimply('https://simply-password.ovh/');