angular.module('app').controller("InformationComponentController", ['$scope', 'ReadyList', '$http', 'PendingList', function($scope, ReadyList, $http, PendingList){

  $scope.init = function() {
    $scope.readyListData = ReadyList.listData;
  }

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

  $scope.setCurrentMovieAsWatched = function() {
    var queued_movie_id = $scope.selectedMovie.queued_movie_id
    $http.put('/api/v1/queued_movies/' + queued_movie_id).
      success(function(data) {
        ReadyList.updateList();
        PendingList.updateList();
      }).
      error(function(data) {
        console.log(data);
      });
  }

	$scope.init();

}]);