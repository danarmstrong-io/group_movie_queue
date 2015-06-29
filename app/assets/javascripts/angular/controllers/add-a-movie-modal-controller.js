app.controller('AddAMovieModalController', ['$scope', '$http', '$templateCache', '$modalInstance', 'movie', 'ReadyList', function ($scope, $http, $templateCache, $modalInstance, movie, ReadyList) {

  $scope.ok = function (movie) {
    movie.rating = $scope.movie_rating
    $http.post('/api/v1/queued_lists/'+ ReadyList.listData.id + '/queued_movies', movie).
      success(function(data) {
        ReadyList.updateList();
        $modalInstance.dismiss('cancel');
      }).
      error(function(data) {
        console.log(data);
      });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.clickedHasSeen = function() {
    $scope.movie_rating = { rating: 1, seen: true, favorite: false, rewatch: false}
  };

  $scope.clickedHasNotSeen = function() {
    $scope.movie_rating = { rating: 1, seen: false, favorite: false, rewatch: false}
  };

  $scope.loading_gif = false;
    $scope.movie_rating = { rating: 1, favorite: false, rewatch: false}

}]);