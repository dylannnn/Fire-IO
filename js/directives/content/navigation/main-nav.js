app.directive('fireioNavigationMain', function() {
    return {
        restrict: 'E',
        scope: false,
        transclude: false,
        templateUrl: 'templates/directives/content/navigation/main-nav.html',
        controller: function($scope, NavFactory, toaster) {
            NavFactory.getNavigations(function(err, navigations) {
                if(err) return toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: err,
                    timeout: 4000
                });

                $scope.navigations = navigations;
            });
            $scope.navigations = [];
        }
    }
});
