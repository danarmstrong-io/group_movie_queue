app.controller("LeftbarController", ['$scope', 'ReadyList', 'SelectedMovie', '$modal', '$state', function($scope, ReadyList, SelectedMovie, $modal, $state){

	$scope.init = function() {
		$scope.readyListData = ReadyList.movies
		$scope.selectedMovie = SelectedMovie.movieData;
    $scope.completedCheckBox = {completed: true};
    $scope.readyListData = ReadyList.listData;
    $scope.genres = [];
		resizeMainPanels();
	}

	$scope.changeMovie = function(movie) {
		$scope.selectedMovie = movie;
		SelectedMovie.setMovie(movie);
    $state.go('dashboard.readyList');
	}

  $scope.allGenresSelected = function() {
    return ($scope.genres && $scope.genres.length == 0);
  };

  $scope.genreSelected = function(genre) {
    return ($scope.genres.indexOf(genre) > -1);
  };

  $scope.setGenresToAll = function() {
    $scope.genres = [];
  };

  $scope.toggleGenreToFilter = function(genre) {
    var genreIndex = $scope.genres.indexOf(genre);
    if (genreIndex == -1) { 
      $scope.genres.push(genre) 
    } 
    else {
      $scope.genres.splice(genreIndex, 1)
    }
  };

  $scope.toggleCompletedCheckBox = function () {
    if ($scope.completedCheckBox){
      $scope.completedCheckBox = undefined;
    }
    else {
      $scope.completedCheckBox = {completed: true};
    }
  };

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

  $( window ).resize(function() {
    resizeMainPanels();
  });

  function resizeMainPanels() {
    var height = $(window).height() - 248;
    var mainPanels = $('.main-panel');
    $.each(mainPanels, function( index, value ) {
      $(value).css({ "max-height": height + 'px' });
      $(value).css({ "height": height + 'px' });
    });
    $('body').css({ "height": height + 'px' });
  }

	$scope.init();

}]);