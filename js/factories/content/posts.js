app.factory('PostsFactory', function($http, $q, FirebaseUrl, $firebaseRef, $firebaseObject) {
    var data = {
        pages: [],
        posts: []
    };

    var $scope = {
        getPosts: function(page) {
            var deferred = $q.defer();

            if(data.pages[page] == undefined) {
                deferred.reject('The page: ' + page + ' does not exist. There is only: ' + data.pages.length + ' pages');
            } else {
                if(data.posts[page] != undefined) {
                    deferred.resolve(data.posts[page]);
                } else {
                    var promises = [];
                    data.pages[page].forEach(function(key) {
                        promises.push($http.get(FirebaseUrl + 'content/posts/' + key + '.json'));
                    });

                    Promise.all(promises)
                        .then(function(resps) {
                            data.posts[page] = [];

                            for(var x = 0; x < resps.length; x++) {
                                resps[x].data.key = data.pages[page][x];
                                data.posts[page].push(resps[x].data);
                            }

                            deferred.resolve(data.posts[page]);
                        })
                        .catch(function(err) {
                            deferred.reject(err);
                        })
                }
            }

            return deferred.promise;
        },
        getPost: function(key) {
            var deferred = $q.defer();
            var sent = false;

            data.posts.forEach(function(page) {
                page.forEach(function(post) {
                    if(post.key == key) {
                        sent = true;
                        deferred.resolve(post);
                    }
                })
            });

            if(!sent) {
                $http.get(FirebaseUrl + 'content/posts/' + key + '.json')
                    .then(function(resp) {
                        var post = resp.data;
                        post.key = key;
                        deferred.resolve(post);
                    })
                    .catch(function(err) {
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        },
        load: function() {
            var deferred = $q.defer();

            $http.get(FirebaseUrl + 'content/posts.json?shallow=true')
                .then(function(resp) {
                    var keys = Object.keys(resp.data).sort().reverse();

                    var page = 0;
                    for(var x = 0; x < keys.length; x++) {
                        var percent = x / config.posts.chunkSize;
                        if((Number(percent) === percent && percent % 1 === 0) && x != 0) page++;
                        if(data.pages[page] == undefined) data.pages[page] = [];

                        data.pages[page].push(keys[x]);

                    }

                    deferred.resolve(data.pages);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        updatePost: function(key, data) {
            var deferred = $q.defer();

            var post = $firebaseObject(new Firebase(FirebaseUrl + 'content/posts/' + key));
            post.$loaded()
                .then(function() {
                    post.title = data.title;
                    post.body = data.body;
                    post.updated = Date.now();

                    post.$save()
                        .then(function() {
                            deferred.resolve();
                        })
                        .catch(function(err) {
                            deferred.reject(err);
                        })
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        deletePost: function(key) {
            var deferred = $q.defer();

            $firebaseObject(new Firebase(FirebaseUrl + 'content/posts/' + key))
                .$remove()
                    .then(function() {
                        deferred.resolve();
                    })
                    .catch(function(err) {
                        deferred.reject(err);
                    })

            return deferred.promise;
        }
    }

    return $scope;
});
