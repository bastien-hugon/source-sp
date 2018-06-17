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

function toto(e){
	var popup = document.getElementById("sppopup");
	popup.classList.toggle("show");
	console.log(popup);
};

function simply_main(){
	$("input[type=password]").each(function(){
		if (is_login_form($(this).closest("form"))){
			var curr_form = $(this);
			api.getID(TOKEN.TOKEN, CURRENT_DIR, function(data){
				if (data === false) {
					return;
				}
				curr_form.addClass("sppopup");
				curr_form.prepend('<div class="sppopuptext">This is an exemple of speaks</div>');
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

function injectCSS(){

	var css = $("<style></style>");

	css.append(".sppopup{position: relative;display: inline-block;cursor: pointer;}");
	css.append(".sppopup .sppopuptext {visibility: hidden;width: 160px;background-color: #555;color: #fff;text-align: center;border-radius: 6px;padding: 8px 0;position: absolute;z-index: 1;bottom: 125%;left: 50%;margin-left: -80px;}");
	css.append('.sppopup .sppopuptext::after {content: "";position: absolute;top: 100%;left: 50%;margin-left: -5px;border-width: 5px;border-style: solid;border-color: #555 transparent transparent transparent;}');
	css.append(".sppopup .show {visibility: visible;-webkit-animation: fadeIn 1s;animation: fadeIn 1s}");
	css.append("@-webkit-keyframes fadeIn {from {opacity: 0;} to {opacity: 1;}}");
	css.append("@keyframes fadeIn {from {opacity: 0;}to {opacity:1 ;}}");

	$("html").prepend(css);
}

$(document).ready(function(){
	injectCSS();
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

api.getActivate(TOKEN.TOKEN, function(data){
	alert(JSON.stringify(data));
});