app.controller("PendingListController", ['$scope', '$http', 'PendingList', 'ReadyList', function($scope, $http, PendingList, ReadyList) {

	$scope.init = function() {
		$scope.pendingListData = PendingList.listData;
		$scope.currentPendingMovie = {movieIndex: 0}
    $scope.movie_rating = { rating: 1, favorite: false, rewatch: false}
		$scope.title = "Pending List"
    resizeMainPanels();
	};

  $( window ).resize(function() {
    resizeMainPanels();
  });

  function resizeMainPanels() {
    var height = $(window).height() - 100;
    var mainPanels = $('.main-panel');
    $.each(mainPanels, function( index, value ) {
      $(value).css({ "max-height": height + 'px' });
    });
  }

	$scope.changePendingMovieIndex = function(movieIndex) {
    $scope.currentPendingMovie.movieIndex = movieIndex;
    $scope.movie_rating = { rating: 1, seen: false, favorite: false, rewatch: false}
  };

  $scope.sendUserMovieRating = function() {
  	var movie = $scope.pendingListData.movies[$scope.currentPendingMovie.movieIndex];
  	$http.put('/api/v1/user_movie_ratings/'+ movie.user_movie_rating_id, $scope.movie_rating).
    success(function(data) {
      updateLists();
      $scope.movie_rating = { rating: 1, favorite: false, rewatch: false}
      $scope.currentPendingMovie.movieIndex = 0;
    }).
      error(function(data) {
        console.log(data);
      });
  };

  $scope.clickedHasSeen = function() {
    $scope.movie_rating = { rating: 1, seen: true, favorite: false, rewatch: false}
  };

  $scope.clickedHasNotSeen = function() {
    $scope.movie_rating = { rating: 1, seen: false, favorite: false, rewatch: false}
  };

  function updateLists() {
    ReadyList.updateList();
    PendingList.updateList();
  }

	$scope.init();
}]);