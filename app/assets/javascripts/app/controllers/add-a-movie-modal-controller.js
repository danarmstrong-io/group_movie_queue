angular.module('app').controller('AddAMovieModalController', ['$scope', '$http', '$templateCache', '$modalInstance', 'movie', 'ReadyList', function ($scope, $http, $templateCache, $modalInstance, movie, ReadyList) {

  $scope.init = function() {
    $scope.loading_gif = false;
    $scope.movie_rating = { rating: 1, favorite: false, rewatch: false}
  };

  $scope.ok = function (movie) {
    $scope.movie_rating.movie_id = movie.id;
    var data = {user_movie_rating: $scope.movie_rating}
    console.log(data);
    $http.post('/api/v1/queued_lists/'+ ReadyList.listData.id + '/queued_movies', data).
      success(function(data) {
        console.log(data)
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

  $scope.genresString = function(movie) {
    if (movie && movie.genres) {
      var string = ""
      for(var index = 0; index < movie.genres.length - 1; index++) {
        string += movie.genres[index].name + ', '
      }
      string += movie.genres[movie.genres.length - 1].name
      return string
    }
  }

  $scope.init();

}]);