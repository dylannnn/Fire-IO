app.directive('fireioEditPost', function() {
    return {
        restrict: 'E',
        scope: { html: '@' },
        templateUrl: 'templates/directives/admin/posts/edit-post.html',
        controller: function($scope, $state, $stateParams, PostsFactory, toaster) {
            PostsFactory.getPost($stateParams.id, function(err, post) {
                if(err) {
                    $state.go('posts');
                    return toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: err,
                        timeout: 4000
                    });
                }

                $scope.update = function() {
                    PostsFactory.updatePost($stateParams.id, $scope.post, function(err) {
                        if(err) return toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: err,
                            timeout: 4000
                        });

                        toaster.pop({
                            type: 'success',
                            title: 'Success',
                            body: 'The post has been updated.',
                            timeout: 3000
                        });

                        $state.go('post', {id: $stateParams.id});
                    });
                };

                $scope.post.title = post.title;
                $scope.post.description = post.description;
                $scope.post.body = post.body;
            });
            $scope.post = {};
        }
    }
});
