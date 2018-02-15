var routageModule = angular.module('routageModule', ['ngRoute']);

routageModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/register', {
        templateUrl: "/front/view/register.html",
        controller: "register"
    })
    .when('/login', {
        templateUrl: "/front/view/login.html",
        controller: "login"
    })
    .when('/index', {
        templateUrl: "/front/view/index.html",
        controller: "index"
    })
    .otherwise({
        redirectTo: '/login'
    })
}]);