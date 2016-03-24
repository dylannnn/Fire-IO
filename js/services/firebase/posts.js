app.factory('PostsFactory', function($firebaseObject, $firebaseArray) {
    var $scope = this;

    return {
        getPosts: function(page, fn) {
            /*
                TODO: Cache pages for later use
            */
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
