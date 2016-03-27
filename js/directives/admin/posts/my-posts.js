app.directive('fireioMyPosts', function() {
    return {
        restrict: 'E',
        scope: { html: '@' },
        templateUrl: 'templates/directives/admin/posts/my-posts.html',
        controller: function($scope, PostsFactory, $firebaseArray, toaster) {
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

            var scrollRef = new Firebase.util.Scroll(new Firebase(config.fb + '/content/posts'), '$key');
            $scope.posts = $firebaseArray(scrollRef);
            $scope.posts.scroll = scrollRef.scroll;
        }
    }
});
