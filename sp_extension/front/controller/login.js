passwordModule.controller('login', ['$scope', '$location', '$rootScope', '$route', '$http', function($scope, $location, $rootScope, $route, $http) {

    $scope.loading = false;
    $scope.resp = TOKEN;

    $scope.login = function(mail, password){
        $scope.loading = true;
        if (mail === undefined || password === undefined){ // Field Verification
            UIkit.notification({message: "Entrez un mot de passe et une adresse mail !", status: 'warning', timeout: 1000});
            $scope.loading = false;
        }
        else{
            api.login(mail, password, function(res) {
                console.log(res);
            });
        }
    };
}]);