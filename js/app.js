var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'firebase', 'textAngular']);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/content/index.html'
        })

    $urlRouterProvider.otherwise('/');

});
