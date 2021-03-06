app.directive('fireioMyPosts', function() {
    return {
        restrict: 'E',
        scope: { html: '@' },
        templateUrl: 'templates/directives/admin/posts/my-posts.html',
        controller: function($scope, PostsFactory, $firebaseArray, toaster) {
            $scope.delete = function($index) {
                PostsFactory.deletePost($scope.posts[$index].$id, function(err) {
                    if(err) return toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: err,
                        timeout: 4000
                    });

                    toaster.pop({
                        type: 'success',
                        title: 'Success',
                        body: 'Post has been deleted',
                        timeout: 3000
                    });
                })
            };

            var scrollRef = new Firebase.util.Scroll(new Firebase(config.fb + '/content/posts'), 'timestamp');
            $scope.posts = $firebaseArray(scrollRef);
            $scope.scroll = scrollRef.scroll;
        }
    }
});
