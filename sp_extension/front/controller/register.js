passwordModule.controller('register', ['$scope', '$location', '$rootScope', '$route', '$http', function($scope, $location, $rootScope, $route, $http) {

    $scope.loading = false;

    
	chrome.storage.sync.get("TOKEN", function (data){
		console.log(data.TOKEN);
		if (data.TOKEN){
			TOKEN = data;
            // Token Verification
            api.verifToken(TOKEN.TOKEN, function(res){
                if (res === true){ // Success Authentification
                    $location.path("index");
                    $scope.$apply();
                }
            });
		}
	});

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
            api.register(mail, password, function(data){
                if (data.success == true){ // Success Authentification
                    UIkit.notification({message: "<span uk-icon='icon: check'></span>Inscription réussie !", status: 'success', timeout: 1000});
                    UIkit.notification({message: "<span uk-icon='icon: info'></span> Connectez-vous maintenant !", status: 'success', timeout: 4000});
                    $location.path("login");
                    $scope.$apply();
                }else{ // Failed Inscription
                    UIkit.notification({message: data.message, status: 'danger', timeout: 1000});
                    $scope.$apply();
                }
                $scope.loading = false;
            });
        }
    };
}]);