app.controller("WatchedListController", ['$scope', '$http', 'WatchedList', 'ReadyList', function($scope, $http, WatchedList, ReadyList){

	$scope.init = function() {
		WatchedList.updateList();
		$scope.watchedListData = WatchedList.listData;
	}

	$scope.markAsUnwatched = function(queued_movie_id) {
    $http.put('/api/v1/queued_movies/' + queued_movie_id + '/unwatch').
      success(function(data) {
        ReadyList.updateList();
        WatchedList.updateList();
      }).
      error(function(data) {
        console.log(data);
      });
	}

  $scope.setCurrentMovieAsWatched = function() {
    var queued_movie_id = $scope.readyListData.movies[$scope.currentMovie.movieIndex].queued_movie_id
    $http.put('/api/v1/queued_movies/' + queued_movie_id).
      success(function(data) {
        console.log(data);
        updateLists();
      }).
      error(function(data) {
        console.log(data);
      });
  }

	$scope.init();

}]);
