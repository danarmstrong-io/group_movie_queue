angular.module('app').directive('checkPoster', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                $http.get(ngSrc).error(function(){
                    // alert('image not exist');
                    element.attr('src', 'assets/404_not_found.jpg'); // set default image
                });
            });
        }
    };
});