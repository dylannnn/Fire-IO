app.directive("fireioReadTime", function() {
    return {
        restrict: "A",
        link: function($scope, element, attrs) {
            attrs.$observe('fireioReadTime', function(value) {
                value = value ? String(value).replace(/<[^>]+>/gm, '') : '';
                var words = value.split(' ').length;

                // Average read time is about 250
                var time = Math.round( (words / 250) * 10 ) / 10;
                element.html(time)
            });
        }
    };
});
