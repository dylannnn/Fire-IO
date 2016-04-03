app.controller('LoginController', function($scope, $state, $rootScope, $http, FirebaseUrl, $firebaseAuth, toaster) {
    $scope.login = function() {
        if($scope.data.email == undefined || $scope.data.password == undefined) return toaster.pop({
            type: 'error',
            title: 'Error',
            body: 'Please enter an email and password',
            timeout: 4000
        });

        $firebaseAuth(new Firebase(FirebaseUrl)).$authWithPassword($scope.data)
            .then(function(authData) {
                $rootScope.admin = authData;

                // TODO: Change to factory
                $http.get(FirebaseUrl + 'users/' + authData.uid + '.json')
                    .then(function(resp) {
                        $rootScope.admin.displayName = resp.data.displayName;
                        $rootScope.admin.permissions = resp.data.permissions;
                        $rootScope.admin.picture = resp.data.picture;

                        toaster.pop({
                            type: 'success',
                            title: 'Success',
                            body: 'You are now logged in',
                            timeout: 3000
                        });
                        $state.go('posts');
                    })
            })
            .catch(function(err) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: err,
                    timeout: 4000
                })
            });
    };
    $scope.data = {};
});
