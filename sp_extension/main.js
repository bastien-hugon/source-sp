var SP_API_URL = "https://simply-password.ovh";
var TOKEN = null;

var PASS = null;
var MAIL = null;
var CURRENT_DIR = window.location.hostname;

if (window.location.port)
	CURRENT_DIR += ":" + window.location.port

function updatePassword(form) {
	var mailVal = null;
	var passVal = null;
	var inputMail = null;
	var inputPass = null;

	$(form).find("input").each(function(){
		type = $(this).attr('type')
		if (type == "password") {
			passVal = $(this).val();
			passInput = $(this);
			if (PASS)
				$(this).val(PASS);
		} else if (type == "text" || type == "email" || type === undefined) {
			mailVal = $(this).val();
			mailInput = $(this);
			if (MAIL)
				$(this).val(MAIL);
		}
	});
	if (mailVal != null && mailVal != "" && passVal != null && passVal != ""){
		api.getID(TOKEN.TOKEN, CURRENT_DIR, function(data){
			if (data === false) { // Il faut enregistrer le mot de passe
				api.saveID(TOKEN.TOKEN, CURRENT_DIR, mailVal, passVal, function(){
					form.submit();
				});
			} else {
				inputMail = mailVal;
				inputPass = passVal;
				form.submit();
			}
		});
	}
	setTimeout(function(){
		form.submit();
	}, 200)
}

function is_login_form(form){
	var nb = form.find('input[type=text]').length + form.find('input[type=mail]').length + form.find('input[type=email]').length;
	if (nb > 1 && nb != 0)
		return false;
	return true;
}

function simply_main(){
	$("input[type=password]").each(function(){
		if (is_login_form($(this).closest("form"))){
			var curr_form = $(this);
			api.getID(TOKEN.TOKEN, CURRENT_DIR, function(data){
				if (data === false) {
					console.log("Pas de compte enregistré sur cette page.")
					return;
				}
				curr_form.closest("form").find('input').each(function () {
					type = $(this).attr('type');
					if (type == "text" || type == "email" || type === undefined){
						$(this).css('border-color', '#273c75').css('border-width', '3px').css('background-color', '#273c75').css('color', '#FFF');
						$(this).val(data.login);
						$(this).trigger("change");
						var tmp = $(this);
						MAIL = data.login;
						setTimeout(function(){
							tmp.val(data.login);
						}, 200)
					}
					else if (type == "password"){
						$(this).css('border-color', '#273c75').css('border-width', '3px').css('background-color', '#273c75').css('color', '#FFF');
						$(this).val(data.password);
						$(this).trigger("change");
						PASS = data.password;
					}
				});
			});
			curr_form.closest("form").submit(function(e){
				e.preventDefault();
				updatePassword(this);
			});
		}
	});
}

$(document).ready(function(){
	chrome.storage.sync.get("TOKEN", function (data){
		if (data.TOKEN){
			TOKEN = data;
			api.verifToken(TOKEN.TOKEN, function(res){
				if (res == true) {
					simply_main();
				}
			});
		}
	});
});