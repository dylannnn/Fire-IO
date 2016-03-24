app.factory('PostsFactory', function($firebaseObject, $firebaseArray) {
    var $scope = this;

    return {
        getPosts: function(page, fn) {
            //IS COMMENTED TILL OVERFLOW QUESTION ANSWERED
            /*if($scope.firstPage) $scope.firstPage = page;
            if($scope.posts != undefined) {
                // Check if already has these posts cached

                var posts = [];
                for(var x = 0; x < $scope.posts.length; x++)
                    if($scope.posts[x].page == page) posts.push($scope.posts[x]);

                // If all posts for the page are cached, return them
                if(posts.length >= config.posts.loadPerPage)
                    return fn(null, posts);
            }

            var postsStart = page * config.posts.loadPerPage;
            var posts = $firebaseArray(new Firebase(config.fb + '/content/posts').startAt(null, 1).endAt(null, 5));
            posts.$loaded().then(function() {
                if($scope.posts == undefined) $scope.posts = [];
                $scope.posts = $scope.posts.concat(posts);
                console.log(posts);

                // If the cache is over the limit, remove the first page it contains
                if(config.posts.cacheLimit > $scope.posts) {
                    for(var x = 0; x < $scope.posts.length; x++)
                        if($scope.posts[x].page == $scope.firstPage) $scope.pages.splice(x, 1);

                    $scope.firstPage = 999999999999;

                    for(var x = 0; x < $scope.posts.length; x++)
                        if($scope.posts[x].page < $scope.firstPage) $scope.firstPage = $scope.posts[x].page;
                }

                fn(null, posts);
            }).catch(function(err) {
                fn(err);
            });*/
            var posts = $firebaseObject(new Firebase(config.fb + '/content/posts'));
            posts.$loaded().then(function() {
                fn(null, posts);
            }).catch(function(err) {
                fn(err);
            });
        },
        getPost: function(id, fn) {
            /*
                TODO: Check cache and other shit
            */
            fn(null, $firebaseObject(new Firebase(config.fb + '/content/posts/' + id)));
        }
    }
});
