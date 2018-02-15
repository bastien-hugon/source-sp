passwordModule.controller('index', ['$scope', '$location', '$rootScope', '$route', '$http', function($scope, $location, $rootScope, $route, $http) {
    $scope.var = TOKEN

    // Logged-in Verification
    // ------------------
    if (TOKEN != null){
        $http({ // http Request to the Verification API
            method : "GET",
            url : SP_API_URL + "/verify/?token=" + TOKEN.TOKEN
        }).then(function mySuccess(data) {
            if (data.data.success != true){ // Success Authentification
                $location.path("login");
            }
        }, function myError(response) {
            UIkit.notification({message: 'No Internet Connexion ...', status: 'danger', timeout: 1000});
            $location.path("login");
        });
    }
    // ------------------

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


    // Logout button ------------------
    $scope.logout = function(){
        chrome.storage.sync.clear( function() {
        });
        TOKEN = null;
        $location.path("login")
    }

}]);