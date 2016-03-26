app.directive('fireioPost', function() {
    return {
        restrict: 'E',
        scope: { html: '@' },
        templateUrl: 'templates/directives/content/posts/post.html',
        controller: function($scope, $rootScope, $stateParams, $sce, PostsFactory, toaster) {
            PostsFactory.getPost($stateParams.id, function(err, post) {
                if(err) return toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Failed to grab post from firebase',
                    timeout: 4000
                });
                post.$bindTo($scope, 'post').then(function() {}).catch(function(err) {
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: 'Failed to grab post from firebase',
                        timeout: 4000
                    });
                });
            });

            $scope.admin = $rootScope.admin;
            $scope.post = {
                title: 'Loading',
                body: 'Please wait...'
            };
        }
    }
});
