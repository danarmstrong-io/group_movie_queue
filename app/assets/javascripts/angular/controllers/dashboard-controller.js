app.controller("DashboardController", ['$scope', '$modal', '$http', 'ReadyList', 'PendingList', 'orderByFilter', 'UserFactory', function($scope, $modal, $http, ReadyList, PendingList, orderByFilter, UserFactory){

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

  $scope.$on('$routeChangeStart', function(next, current) { 
     console.log("changing")
   });

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

  $scope.changeMovieIndex = function(movieIndex) {
    $scope.currentMovie.movieIndex = movieIndex;
    $scope.cancelEditRating();
  }
  
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

  function updateLists() {
    ReadyList.updateList();
    PendingList.updateList();
  }

	$scope.init();

}]);









