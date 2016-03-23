app.directive('fireioPosts', function() {
    return {
        restrict: 'E',
        scope: { html: '@' },
        templateUrl: 'templates/directives/posts.html',
        controller: function($scope, $firebaseObject, toaster) {
            var posts = $firebaseObject(new Firebase(config.fb + '/content/posts')).$bindTo($scope, 'posts').then(function() {}).catch(function(err) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Failed to grab posts from firebase',
                    timeout: 4000
                });
            });
            $scope.posts = [];
        }
    }
});
