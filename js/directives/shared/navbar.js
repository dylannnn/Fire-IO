app.directive('fireioNavbar', function() {
    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        templateUrl: 'templates/components/shared/navbar.html',
        controllerAs: 'post',
        controller: function($scope, $rootScope, $http, FirebaseUrl, toaster) {
            $scope.admin = $rootScope.admin;

            // TODO: Move to a factory
            $http.get(FirebaseUrl + 'navigation.json')
                .then(function(resp) {
                    console.log(resp.data);
                    $scope.navbar = resp.data;
                })
                .catch(function(err) {
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: err,
                        timeout: 4000
                    });
                })

            $scope.navbar = {};
        }
    }
});
