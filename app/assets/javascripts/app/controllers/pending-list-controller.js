angular.module('app').controller("PendingListController", ['$scope', '$http', 'PendingList', 'ReadyList', function($scope, $http, PendingList, ReadyList) {

	$scope.init = function() {
		$scope.pendingListData = PendingList.listData;
		$scope.currentPendingMovie = {movieIndex: 0}
	};

	$scope.changePendingMovieIndex = function(movieIndex) {
    $scope.currentPendingMovie.movieIndex = movieIndex;
  };

  $scope.sendUserMovieRating = function() {
  	var movie = $scope.pendingListData.movies[$scope.currentPendingMovie.movieIndex];
  	$http.put('/api/v1/user_movie_ratings/'+ movie.user_movie_rating_id, movie).
    success(function(data) {
      updateLists();
      $scope.currentPendingMovie.movieIndex = 0;
    }).
      error(function(data) {
        console.log(data);
      });
  };

  $scope.clickedHasSeen = function() {
    $scope.pendingListData.movies[$scope.currentPendingMovie.movieIndex].seen = true;
  };

  $scope.clickedHasNotSeen = function() {
    $scope.pendingListData.movies[$scope.currentPendingMovie.movieIndex].seen = false;
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

  function updateLists() {
    ReadyList.updateList();
    PendingList.updateList();
  }

	$scope.init();
}]);