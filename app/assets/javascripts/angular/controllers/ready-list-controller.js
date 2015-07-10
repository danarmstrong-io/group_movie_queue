app.controller("ReadyListController", ['$scope', '$modal', '$http', 'ReadyList', 'PendingList', 'orderByFilter', 'UserFactory', function($scope, $modal, $http, ReadyList, PendingList, orderByFilter, UserFactory){

  $scope.init = function() {
    $scope.currentMovie = {}
    $scope.currentMovie.movieIndex = 0;
    $scope.readyListData = ReadyList.listData;
    $scope.pendingListData = PendingList.listData;
    $scope.userData = UserFactory.userData;
    $scope.editRating = false;
    resizeMainPanels();
    resizeAppContainer();
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

  $scope.changeMovieIndex = function(movieIndex) {
    $scope.currentMovie.movieIndex = movieIndex;
    $scope.cancelEditRating();
  }

  $scope.openStartModal = function () {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/templates/start-modal/start-modal.html',
      controller: 'StartModalController',
      size: 'lg',
      backdrop: 'static',
      windowClass: 'start-modal'
    });
  };

  $scope.currentUsersRating = function(rating) {
    return ($scope.userData.currentUser && rating.user_id == $scope.userData.currentUser.id)
  }

  $scope.clickEditRating = function(rating) {
    $scope.editRatingFormData = _.cloneDeep(rating);
    $scope.editRating = true;
  }

  $scope.cancelEditRating = function() {
    $scope.editRating = false;
  }

  $scope.submitEditedRating = function() {
    $http.put('/api/v1/user_movie_ratings/' + $scope.editRatingFormData.id, $scope.editRatingFormData).
      success(function(data) {
        updateLists();
        $scope.cancelEditRating();
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

  function updateLists() {
    ReadyList.updateList();
    PendingList.updateList();
  }

  $( window ).resize(function() {
    resizeMainPanels();
    resizeAppContainer();
  });

  function resizeMainPanels() {
    var height = $(window).height() - 100;
    var mainPanels = $('.main-panel');
    $.each(mainPanels, function( index, value ) {
      $(value).css({ "max-height": height + 'px' });
      $(value).css({ "height": height + 'px' });
    });
    $('body').css({ "height": height + 'px' });
  }

  function resizeAppContainer() {
    var height = $(window).height() - 50;
    var mainPanels = $('.app-container');
    $.each(mainPanels, function( index, value ) {
      $(value).css({ "max-height": height + 'px' });
      $(value).css({ "height": height + 'px' });
    });
  }

	$scope.init();

}]);