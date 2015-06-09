app.controller("DashboardController", ['$scope', '$modal', '$http', 'ReadyList', 'PendingList', 'orderByFilter', function($scope, $modal, $http, ReadyList, PendingList, orderByFilter){

  $scope.init = function() {
    $scope.currentMovie = {}
    $scope.currentMovie.movieIndex = 0;
    $scope.readyListData = ReadyList.listData;
    $scope.pendingListData = PendingList.listData;
    resizeMainPanels();
  }

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

  $scope.changeMovieIndex = function(movieIndex) {
    $scope.currentMovie.movieIndex = movieIndex;
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

	$scope.init();

}]);