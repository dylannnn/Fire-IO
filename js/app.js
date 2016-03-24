var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'firebase', 'textAngular', 'ngSanitize', 'toaster', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/posts/0');

    $stateProvider
        .state('posts', {
            url: '/posts/:page',
            templateUrl: 'templates/content/posts.html'
        })
        .state('post', {
            url: '/post/:id',
            templateUrl: 'templates/content/post.html'
        })

        // Admin
        .state('login', {
            url: '/login',
            templateUrl: 'templates/admin/login.html',
            controller: 'LoginController'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'templates/admin/home.html'
        })
});

app.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        if(toState == 'admin' && !$rootScope.admin) {
            e.preventDefault();
            return $state.go('login')
        }
    });
});
