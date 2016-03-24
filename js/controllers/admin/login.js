app.controller('LoginController', function($scope, $rootScope, $state, $firebaseAuth, toaster) {
    $scope.login = function() {
        if($scope.data.email == undefined || $scope.data.password == undefined) return toaster.pop({
            type: 'error',
            title: 'Error',
            body: 'Please enter a valid username and password',
            timeout: 4000
        });

        $firebaseAuth(new Firebase(config.fb)).$authWithPassword({email: $scope.data.email, password: $scope.data.password}).then(function(authData) {
            $rootScope.admin = true;

            if(!$scope.data.remember) return $state.go('admin');
            window.localStorage.token = authData.token;
        }).catch(function(err) {
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: err,
                timeout: 4000
            });
        })
    };
    $scope.data = {};
});
