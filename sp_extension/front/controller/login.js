passwordModule.controller('login', ['$scope', '$location', '$rootScope', '$route', '$http', function($scope, $location, $rootScope, $route, $http) {

    $scope.loading = false;

    api.socket.on('connect_error', function(){
        UIkit.notification({message: "Connexion au serveur impossible.", status: 'danger', timeout: 500});
    });

	chrome.storage.sync.get("TOKEN", function (data){
		console.log(data.TOKEN);
		if (data.TOKEN){
			TOKEN = data;
            // Token Verification
            api.verifToken(TOKEN.TOKEN, function(res){
                if (res === true){ // Success Authentification
                    $location.path("index");
                    $scope.$apply()
                    }
            });
		}
	});


    $scope.login = function(mail, password){
        $scope.loading = true;
        if (mail === undefined || password === undefined){ // Field Verification
            UIkit.notification({message: "Entrez un mot de passe et une adresse mail !", status: 'warning', timeout: 1000});
            $scope.loading = false;
        } else {
            api.login(mail, password, function(res) {
                if (res.success === true) {
                    chrome.storage.sync.set({'TOKEN': res.token}, function() {
                        UIkit.notification({message: "Connexion réussie !", status: 'success', timeout: 1000});
                        $scope.loading = false;
                        $location.path("index");
                        $scope.$apply();
                    });
                } else {
                    UIkit.notification({message: "Mauvais identifiant / mot de passe", status: 'danger', timeout: 1000});
                    $scope.password = "";
                    $scope.loading = false;
                    $scope.$apply();
                }
            });
        }
    };
}]);