var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'firebase', 'textAngular', 'toaster', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/content/home.html'
        })
        .state('post', {
            url: '/post/:id',
            templateUrl: 'templates/content/post.html'
        })
});
