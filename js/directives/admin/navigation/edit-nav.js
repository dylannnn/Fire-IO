app.directive('fireioEditNavigation', function() {
    return {
        restrict: 'E',
        scope: { html: '@' },
        templateUrl: 'templates/directives/admin/navigation/edit-nav.html',
        controller: function($scope, NavFactory, $firebaseArray, toaster) {
            $scope.add = function() {
                if($scope.newNav.title == undefined || $scope.newNav.location == undefined || $scope.newNav.views == undefined) return toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'All fields are required',
                    timeout: 4000
                });

                NavFactory.addNavigation($scope.newNav, function(err) {
                    if(err) return toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: err,
                        timeout: 4000
                    });

                    toaster.pop({
                        type: 'success',
                        title: 'Success',
                        body: 'Navigation has been updated',
                        timeout: 3000
                    });
                });
            };
            $scope.update = function($index) {
                NavFactory.updateNavigation($scope.navigations[$index].$id, $scope.navigations[$index], function(err) {
                    if(err) return toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: err,
                        timeout: 4000
                    });

                    toaster.pop({
                        type: 'success',
                        title: 'Success',
                        body: 'Navigation has been updated',
                        timeout: 3000
                    });
                });
            };
            $scope.delete = function($index) {
                NavFactory.deleteNavigation($scope.navigations[$index].$id, function(err) {
                    if(err) return toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: err,
                        timeout: 4000
                    });

                    toaster.pop({
                        type: 'success',
                        title: 'Success',
                        body: 'Navigation has been deleted',
                        timeout: 3000
                    });
                });
            };

            NavFactory.getNavigations(function(err, navigations) {
                $scope.navigations = navigations;
            });
            $scope.navigations = [];
            $scope.newNavigations = [];
            $scope.newNav = {};
        }
    }
});
