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
        updatePost: function(id, data, fn) {
            var post = $firebaseObject(new Firebase(config.fb + '/content/posts/' + id));
            post.$loaded().then(function() {
                if(post.title == undefined) return fn('This post has been deleted, or is un-accessable.');

                post.title = data.title;
                post.body = data.body;
                post.description = data.description;
                post.updated = Date.now();
                post.$save().then(function() {
                    fn();
                });
            }).catch(function(err) {
                fn(err);
            })
        },
        getPosts: function(page, fn) {
            var postsStart = page * config.posts.loadPerPage;
            var posts = $firebaseArray(new Firebase(config.fb + '/content/posts').orderByChild('created').limitToLast(config.posts.loadPerPage).endAt(9999999999999999)).$loaded().then(function(posts) {
                fn(null, posts.reverse());
            }).catch(function(err) {
                fn(err);
            });
        },
        getPost: function(id, fn) {
            var post = new $firebaseObject(new Firebase(config.fb + '/content/posts/' + id));
            post.$loaded().then(function() {
                if(post.title == undefined) return fn('This post has been deleted, or is un-accessable');
                fn(null, post);
            }).catch(function(err) {
                fn(err);
            })
        }
    }
});
