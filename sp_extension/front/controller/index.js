passwordModule.controller('index', ['$scope', '$location', '$rootScope', '$route', '$http', function($scope, $location, $rootScope, $route, $http) {

    chrome.storage.sync.get("TOKEN", function (data){
		console.log(data.TOKEN);
		if (data.TOKEN){
			TOKEN = data;
            // Token Verification
            api.verifToken(TOKEN.TOKEN, function(res){
                if (res !== true){ // Success Authentification
                    $location.path("login");
                    $scope.$apply();
                }
            });
		}
	});

    $scope.current_website = CURRENT_DIR;

    api.getID(TOKEN.TOKEN, CURRENT_DIR, function(res) {
        $scope.login = res.login
        api.getShared(TOKEN.TOKEN, CURRENT_DIR, function(res) {
            $scope.loginShared = res;
            $scope.$apply()
        });
    });

    $scope.getActiveSession = function(index) {
        api.activate(TOKEN.TOKEN, $scope.loginShared[index].cookies)
    }

    var regex_mail = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    $scope.sharedSession = function(emailToShare) {
        if(!emailToShare || !regex_mail.test(emailToShare)) {
            UIkit.notification({message: 'Entrez un Mail valide!', status: 'danger', timeout: 1000});
            return;
        } else {
            api.share(TOKEN.TOKEN, CURRENT_DIR, emailToShare, MY_COOKIES, function(res) {
                if (res) {
                    UIkit.notification({message: 'Session partage ! :)', status: 'danger', timeout: 1000});
                    UIkit.modal("#modalShare").hide()
                } else {
                    UIkit.notification({message: 'Error', status: 'danger', timeout: 1000});
                }
            });
        }
    }

    /*
    // Password Saved found ? ------------------
    $http({
        method : "GET",
        url : SP_API_URL + "/password/?token=" + TOKEN.TOKEN + "&website=" + CURRENT_DIR + "&action=decrypt"
    }).then(function mySuccess(data) {
        //alert(JSON.stringify(SP_API_URL + "/password/?token=" + TOKEN.TOKEN + "&website=" + $location.host() + "&action=decrypt"));        
        if (data.data.success == true){ // Password found !
            $scope.login = data.data;
        }else{
            $scope.login = "Aucun mot de passe pour ce site."
        }
    }, function myError(response) {
        UIkit.notification({message: 'No Internet Connexion ...', status: 'danger', timeout: 1000});
    });
    */

    // Logout button ------------------
    $scope.logout = function(){
        chrome.storage.sync.clear( function() {
            TOKEN = null;
            $location.path("login")
            $scope.$apply()
        });
    }

}]);