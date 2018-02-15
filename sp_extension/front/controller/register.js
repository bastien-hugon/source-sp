passwordModule.controller('register', ['$scope', '$location', '$rootScope', '$route', '$http', function($scope, $location, $rootScope, $route, $http) {

    $scope.loading = false;

    // Logged-in Verification
    // ------------------
    if (TOKEN != null){
        $http({ // http Request to the Verification API
            method : "GET",
            url : SP_API_URL + "/verify/?token=" + TOKEN.TOKEN
        }).then(function mySuccess(data) {
            if (data.data.success == true){ // Success Authentification
                $location.path("index");
            }
        }, function myError(response) {
            UIkit.notification({message: 'No Internet Connexion ...', status: 'danger', timeout: 1000});
        });
    }
    // ------------------

    var regex_mail = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    $scope.login = function(mail, password, repassword){
        $scope.loading = true;
        if (mail === undefined || password === undefined || repassword === undefined){ // Field Verification
            UIkit.notification({message: "Entrez un mot de passe et une adresse mail !", status: 'warning', timeout: 1000});
            $scope.loading = false;
        }else if (password != repassword){ // Field Verification 2
            UIkit.notification({message: "Les mots de passes ne correspondent pas !", status: 'warning', timeout: 1000});
            $scope.loading = false;
        }else if(!regex_mail.test(mail)){
            UIkit.notification({message: "Entrez un Mail valide !", status: 'warning', timeout: 1000});
            $scope.loading = false;
        }else if(password.length < 6){
            UIkit.notification({message: "Mot de passe trop court !", status: 'warning', timeout: 1000});
            $scope.loading = false;
        }else{
            $http({ // http Request to the API
                method : "GET",
                url : SP_API_URL + "/register/?mail=" + mail + "&pass=" + password
            }).then(function mySuccess(data) {
                $scope.resp = data.data;
                if (data.data.success == true){ // Success Authentification
                    UIkit.notification({message: "<span uk-icon='icon: check'></span>Inscription réussie !", status: 'success', timeout: 1000});
                    UIkit.notification({message: "<span uk-icon='icon: info'></span> Connectez-vous maintenant !", status: 'success', timeout: 4000});
                    $location.path("login");
                }else{ // Failed Inscription
                    UIkit.notification({message: data.data.message, status: 'danger', timeout: 1000});
                }
                $scope.loading = false;
            }, function myError(response) {
                UIkit.notification({message: 'Inscription impossible ...', status: 'danger', timeout: 1000});
                $scope.loading = false;
            });
        }
    };
}]);