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

    var MAIL = null;

    api.getID(TOKEN.TOKEN, CURRENT_DIR, function(res) {
        $scope.login = res.login
        api.getShared(TOKEN.TOKEN, CURRENT_DIR, function(res) {
            $scope.loginShared = res;
            $scope.$apply()
        });
    });


    UIkit.notification({message: CURRENT_DIR, status: 'warning', timeout: 1000});

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