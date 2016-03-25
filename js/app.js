var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'firebase', 'textAngular', 'ngSanitize', 'toaster', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/posts');

    $stateProvider
        .state('posts', {
            url: '/posts/:page',
            params: {
                page: {
                    value: null,
                    squash: true
                }
            },
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
        .state('create', {
            url: '/create',
            templateUrl: 'templates/admin/create.html'
        })
        .state('edit', {
            url: '/edit/:id',
            templateUrl: 'templates/admin/edit.html'
        })
});

app.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        //if(toState.name == 'admin' && !$rootScope.admin) {
        //    e.preventDefault();
        //    return $state.go('login')
        //}
    });
});
