app.directive('fireioPosts', function() {
    return {
        restrict: 'E',
        scope: { html: '@' },
        templateUrl: 'templates/directives/posts.html',
        controller: function($scope, $state, $stateParams, PostsFactory, toaster) {
            if($stateParams.page == undefined)
                $stateParams.page = 0;

            PostsFactory.getPosts($stateParams.page, function(err, posts) {
                console.log(posts);
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
