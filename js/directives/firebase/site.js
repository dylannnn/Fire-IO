app.directive('fireioSite', function() {
    return {
        restrict: 'E',
        controller: function($scope, $firebaseObject, toaster) {
            var site = $firebaseObject(new Firebase(config.fb + '/site'));
            site.$loaded().then(function(){
                $scope.site = site;
            }).catch(function(err) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Failed to grab data from firebase',
                    timeout: 4000
                });
            });

            $scope.site = {
                name: 'Loading'
            };
        }
    }
});
