app.controller("MovieListNavbarController", ['$scope', '$modal', function($scope, $modal) {

    $scope.init = function() {

    }

    $scope.openAddAMovieModal = function (size) {
            var modalInstance = $modal.open({
            animation: false,
            templateUrl: '/templates/dashboard/add-a-movie-modal.html',
            controller: 'AddAMovieModalController',
            size: size,
            resolve: {
                movie: function () {
                return $scope.movie;
                }
            }
        });
    };

    $scope.init();

}]);