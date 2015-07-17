angular.module('app').controller("LeftbarController", ['$scope', 'ReadyList', 'SelectedMovie', '$modal', '$state', function($scope, ReadyList, SelectedMovie, $modal, $state){

	$scope.init = function() {
    $scope.completedCheckBox = {completed: true};
    $scope.readyListData = ReadyList.listData;
    $scope.genres = [];
		resizeMainPanels();
	};

  $scope.toggleLeftbar = function() {
    if ($('#leftbar').width() == 299) {
      $scope.closeLeftbar();
    } 
    if ($('#leftbar').width() == 15) {
      $scope.openLeftbar();
    }
  };

  $scope.openLeftbar = function() {
    $('#leftbar').addClass('toggled').find('.sidebar-container').animate({
    width: '299px'
      }, 100, function(){
    $('#leftbar').find('.shadowed').fadeIn(150); 
      });
  };

  $scope.closeLeftbar = function() {
    $('#leftbar').find('.shadowed').fadeOut(150, function(){
    $('#leftbar').removeClass('toggled').find('.sidebar-container').animate({
        width: '15px'
    }, 100);
    $('#leftbar').find('.shadowed').hide();
      });
  };

  $scope.$watch(function(scope) { return SelectedMovie.movieData },
    function(newValue, oldValue) {
      $scope.selectedMovie = SelectedMovie.movieData;
    }
  );

	$scope.changeMovie = function(movie) {
    $scope.toggleLeftbar();
		$scope.selectedMovie = movie;
		SelectedMovie.setMovie(movie);
    $state.go('dashboard.readyList');
	};

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
    if ($scope.selectedMovie == false && $scope.readyListData.movies.length > 0) {
      $scope.selectedMovie = $scope.readyListData.movies[0];
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
    var height = $(window).height() - 225;
    var mainPanels = $('.main-panel');
    $.each(mainPanels, function( index, value ) {
      $(value).css({ "max-height": height + 'px' });
      $(value).css({ "height": height + 'px' });
    });
    $('body').css({ "height": height + 'px' });
  }

	$scope.init();

}]);