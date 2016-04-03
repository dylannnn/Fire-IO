app.directive('fireioPost', function() {
    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        templateUrl: 'templates/components/content/post.html',
        controllerAs: 'post',
        controller: function($scope, $rootScope, $state, $stateParams, PostsFactory, toaster, sweet) {
            $scope.admin = $rootScope.admin;

            $scope.back = function() {
                $state.go('posts');
            };

            $scope.save = function() {
                PostsFactory.updatePost($stateParams.key, $scope.post)
                    .then(function() {
                        console.log('then');
                        toaster.pop({
                            type: 'success',
                            title: 'Success',
                            body: 'Post has been updated',
                            timeout: 3000
                        });
                    })
                    .catch(function(err) {
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: err,
                            timeout: 4000
                        });
                    });
            };
            $scope.delete = function() {
                sweet.show({
                    title: 'Are you sure?',
                    text: 'You cannot undo this action, this post will be deleted forever!',
                    type: 'warning',
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function() {
                    PostsFactory.deletePost($stateParams.key)
                        .then(function() {
                            sweet.show({
                                title: 'Success',
                                text: 'Your post has been deleted',
                                type: 'success'
                            });
                            $state.go('posts');
                        })
                        .catch(function(err) {
                            sweet.show({
                                title: 'Error',
                                text: err,
                                type: 'error'
                            })
                        })
                });
            };

            PostsFactory.getPost($stateParams.key)
                .then(function(post) {
                    $scope.post = post;
                })
                .catch(function(err) {
                    console.log(err);
                })
            $scope.post = {};
        }
    }
});
