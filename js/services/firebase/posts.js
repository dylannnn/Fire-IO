app.factory('PostsFactory', function($firebaseObject, $firebaseArray) {
    var $scope = this;
    $scope.posts = [];

    return {
        createPost: function(data, fn) {
            $firebaseArray(new Firebase(config.fb + '/content/posts')).$add(data).then(function() {
                fn(null);
            }).catch(function(err) {
                fn(err);
            });
        },
        getPosts: function(page, fn) {
            var postsStart = page * config.posts.loadPerPage;
            var posts = $firebaseArray(new Firebase(config.fb + '/content/posts').orderByChild('created').limitToLast(config.posts.loadPerPage)).$loaded().then(function(posts) {
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
