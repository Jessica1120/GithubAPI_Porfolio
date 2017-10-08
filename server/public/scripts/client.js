var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider
    .when('/', {
      templateUrl: '/views/user.html',
      controller: 'UserController as UC',
    }).when('/repos', {
      templateUrl: '/views/repos.html',
      controller: "RepoController as RC"
    });
});
