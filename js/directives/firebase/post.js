app.directive('fireioPost', function() {
    return {
        restrict: 'E',
        scope: { html: '@' },
        templateUrl: 'templates/directives/post.html',
        controller: function($scope, $stateParams, $sce, $firebaseObject, toaster) {
            var post = $firebaseObject(new Firebase(config.fb + '/content/posts/' + $stateParams.id)).$bindTo($scope, 'post').then(function() {}).catch(function(err) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Failed to grab post from firebase',
                    timeout: 4000
                });
            });
            $scope.post = {
                title: 'Loading',
                body: 'Please wait...'
            };
        }
    }
});
