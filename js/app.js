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
        .state('addpost', {
            url: '/add-post',
            templateUrl: 'templates/admin/posts/add-post.html'
        })
        .state('editpost', {
            url: '/edit-post/:id',
            templateUrl: 'templates/admin/posts/edit-post.html'
        })
});

app.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        var state = toState.name;
        if(state == 'admin' || state == 'addpost' || state == 'editpost')
            $rootScope.inPanel = true;
        else
            $rootScope.inPanel = false;
        //if(toState.name == 'admin' && !$rootScope.admin) {
        //    e.preventDefault();
        //    return $state.go('login')
        //}
    });
});
