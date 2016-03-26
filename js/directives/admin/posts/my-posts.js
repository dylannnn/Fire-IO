app.directive('fireioMyPosts', function() {
    return {
        restrict: 'E',
        scope: { html: '@' },
        templateUrl: 'templates/directives/admin/posts/my-posts.html',
        controller: function($scope, $state, $stateParams, PostsFactory, toaster) {
            $scope.delete = function(id) {
                PostsFactory.deletePost($scope.posts[$index].$id, function(err) {
                    if(err) return toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: err,
                        timeout: 4000
                    });

                    $scope.posts.splice($index, 1);
                    toaster.pop({
                        type: 'success',
                        title: 'Success',
                        body: 'Post has been deleted',
                        timeout: 3000
                    });
                })
            };

            PostsFactory.getPosts($stateParams.page, function(err, posts) {
                if(err) return toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Failed to grab posts from firebase',
                    timeout: 4000
                });
                $scope.posts = posts;
            });
        }
    }
});
