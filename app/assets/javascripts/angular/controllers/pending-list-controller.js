app.controller("PendingListController", ['$scope', '$http', 'PendingList', 'ReadyList', function($scope, $http, PendingList, ReadyList) {

	$scope.init = function() {
		$scope.pendingListData = PendingList.listData;
		$scope.currentPendingMovie = {movieIndex: 0}
    $scope.movie_rating = { rating: 1, seen: false, favorite: false, rewatch: false}
    
		$scope.title = "Pending List"
	};

	$scope.changePendingMovieIndex = function(movieIndex) {
    $scope.currentPendingMovie.movieIndex = movieIndex;
    $scope.movie_rating = { rating: 1, seen: false, favorite: false, rewatch: false}
  };

  $scope.sendUserMovieRating = function() {
  	var movie = $scope.pendingListData.movies[$scope.currentPendingMovie.movieIndex];
  	console.log(movie)
  	$http.put('/api/user_movie_ratings/'+ movie.user_movie_rating_id, $scope.movie_rating).
    success(function(data) {
      updateLists();
      $scope.movie_rating = { rating: 1, seen: false, favorite: false, rewatch: false}
    }).
      error(function(data) {
        console.log(data);
      });
  };

  function updateLists() {
    ReadyList.updateList();
    PendingList.updateList();
  }

	$scope.init();
}]);