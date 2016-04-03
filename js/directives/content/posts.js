app.directive('fireioPosts', function() {
    return {
        restrict: 'E',
        scope: { html: '@' },
        templateUrl: 'templates/components/content/posts.html',
        controller: function($scope, PostsFactory) {
            $scope.view = function($index) {
                
            };

            PostsFactory.load()
                .then(function(pages) {
                    PostsFactory.getPosts(0)
                        .then(function(posts) {
                            $scope.posts = posts;
                        })
                        .catch(function(err) {
                            console.log(err);
                        });

                })
                .catch(function(err) {
                    console.log(err);
                })

            $scope.posts = [];
        }
    }
});
