passwordModule.controller('login', ['$scope', '$location', '$rootScope', '$route', '$http', function($scope, $location, $rootScope, $route, $http) {

    $scope.loading = false;
    $scope.resp = TOKEN;

    // Logged-in Verification
    // ------------------
    if (TOKEN != null){
        $http({ // http Request to the Verification API
            method : "GET",
            url : SP_API_URL + "/verify/?token=" + TOKEN.TOKEN
        }).then(function mySuccess(data) {
            if (data.data.success == true){ // Success Authentification
                $location.path("index")
            }else{
                chrome.storage.sync.clear( function() {
                    // TOKEN UPDATED
                });
            }
        }, function myError(response) {
            UIkit.notification({message: 'No Internet Connexion ...', status: 'danger', timeout: 1000});
        });
    }
    // ------------------

    $scope.login = function(mail, password){
        $scope.loading = true;
        if (mail === undefined || password === undefined){ // Field Verification
            UIkit.notification({message: "Entrez un mot de passe et une adresse mail !", status: 'warning', timeout: 1000});
            $scope.loading = false;
        }
        else{
            $http({ // http Request to the API
                method : "GET",
                url : SP_API_URL + "/login/?mail=" + mail + "&pass=" + password
            }).then(function mySuccess(data) {
                if (data.data.success == true){ // Success Authentification
                    UIkit.notification({message: "<span uk-icon='icon: check'></span>Connexion réussie !", status: 'success', timeout: 1000});
                    // Save the token and sync. it in the chrome's account
                    TOKEN = {TOKEN: data.data.token}
                    chrome.storage.sync.set({'TOKEN': data.data.token}, function() {
                        // TOKEN UPDATED
                    });
                    $location.path("index");
                }else{ // Failed Authentification
                    UIkit.notification({message: data.data.message, status: 'danger', timeout: 1000});
                }
                $scope.loading = false;
            }, function myError(response) {
                UIkit.notification({message: 'Connexion impossible ...', status: 'danger', timeout: 1000});
                $scope.loading = false;
            });
        }
    };
}]);