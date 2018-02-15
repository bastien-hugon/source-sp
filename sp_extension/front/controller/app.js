var app = angular.module('APP', ['passwordModule', 'routageModule']);

var passwordModule = angular.module('passwordModule', []);

var SP_API_URL = "https://api.simply-password.ovh"

var TOKEN = null;

chrome.storage.sync.get("TOKEN", function (data){
    if (data)
        TOKEN = data;
})

passwordModule.controller('close', ['$scope', function ($scope) {
    $scope.close = function(){
        window.close()
    }
}]);