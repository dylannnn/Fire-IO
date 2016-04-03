var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'firebase', 'textAngular', 'ngSanitize', 'toaster', 'ngAnimate', 'anim-in-out', 'ng-mfb', 'hSweetAlert']);

app.constant('FirebaseUrl', 'https://fireio-v1.firebaseio.com/');
app.config(function(FirebaseUrl, $firebaseRefProvider, $stateProvider, $urlRouterProvider) {
    $firebaseRefProvider.registerUrl({
        default: FirebaseUrl,
        posts: FirebaseUrl + 'content/posts'
    });

    $stateProvider
       .state('posts', {
           url: '/posts',
           templateUrl: 'templates/content/posts.html'
       })
       .state('post', {
           url: '/post/:key',
           templateUrl: 'templates/content/post.html'
       })
       .state('add-post', {
           url: '/add-post',
           templateUrl: 'templates/content/add-post.html'
       })
       
       .state('login', {
           url: '/login',
           templateUrl: 'templates/content/login.html',
           controller: 'LoginController'
       })

    $urlRouterProvider.otherwise('/posts');
});
