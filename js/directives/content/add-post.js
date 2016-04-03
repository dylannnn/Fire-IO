app.directive('fireioAddPost', function() {
    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        templateUrl: 'templates/components/content/add-post.html',
        controllerAs: 'post',
        controller: function($scope, $rootScope, $state, PostsFactory, toaster) {
            $scope.save = function() {
                if($scope.post.body == undefined || $scope.post.title == undefined) return toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Please write a title and a body',
                    timeout: 4000
                });

                PostsFactory.createPost($scope.post)
                    .then(function(key) {
                        toaster.pop({
                            type: 'success',
                            title: 'Success',
                            body: 'Post has been created',
                            timeout: 3000
                        });
                        $state.go('post', {key: key});
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
            $scope.post = {
                title: 'Post title'
            };
        }
    }
});
