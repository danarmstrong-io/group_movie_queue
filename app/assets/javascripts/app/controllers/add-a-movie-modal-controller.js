angular.module('app').controller('AddAMovieModalController', ['$scope', '$http', '$templateCache', '$modalInstance', 'movie', 'ReadyList', function ($scope, $http, $templateCache, $modalInstance, movie, ReadyList) {

  $scope.init = function() {
    $scope.loading_gif = false;
    $scope.movie_rating = { rating: 1, favorite: false, rewatch: false}
  };

  $scope.ok = function (movie) {
    var data = {movie: movie, user_movie_rating: $scope.movie_rating, genres: movie.genre}
    $http.post('/api/v1/queued_lists/'+ ReadyList.listData.id + '/queued_movies', data).
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

  $scope.init();

}]);