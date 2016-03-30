app.factory('NavFactory', function($firebaseObject, $firebaseArray) {
    var $scope = this;

    return {
        getNavigations(fn) {
            var navs = $firebaseArray(new Firebase(config.fb + '/navigation'));
            navs.$loaded().then(function() {
                for(var x = 0; x < navs.length; x++)


                fn(null, navs);
            }).catch(function(err) {
                fn(err);
            })
        },
        updateNavigation(location, data, fn) {
            if(location == data.newLocation) {
                var nav = $firebaseObject(new Firebase(config.fb + '/navigation/' + location));
                nav.$loaded().then(function() {
                    nav.title = data.title;
                    nav.views = data.views;
                    nav.$save().then(function() {
                        fn();
                    });
                }).catch(function(err) {
                    fn(err);
                });
            } else {
                $firebaseObject(new Firebase(config.fb + '/navigation/' + location)).$remove().then(function() {
                    var nav = $firebaseObject(new Firebase(config.fb + '/navigation/' + data.newLocation));
                    nav.$loaded().then(function() {
                        nav.title = data.title;
                        nav.views = data.views;
                        nav.$save().then(function() {
                            fn();
                        });
                    });
                }).catch(function(err) {
                    fn(err);
                });
            }
        },
        addNavigation: function(data, fn) {
            var nav = $firebaseObject(new Firebase(config.fb + '/navigation/' + data.location));
            nav.$loaded().then(function() {
                nav.title = data.title;
                nav.view = data.view;
                nav.$save().then(function() {
                    fn();
                });
            }).catch(function(err) {
                fn(err);
            })
        },
        deleteNavigation: function(location, fn) {
            $firebaseObject(new Firebase(config.fb + '/navigation/' + location)).$remove().then(function() {
                fn();
            }).catch(function(err) {
                fn(err);
            });
        }
    }
});
