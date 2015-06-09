app.controller("DashboardController", ['$scope', '$modal', '$http', 'ReadyList', 'PendingList', 'orderByFilter', function($scope, $modal, $http, ReadyList, PendingList, orderByFilter){

	$scope.init = function() {
    $scope.currentMovie = {}
    $scope.currentMovie.movieIndex = 0;
    $scope.readyListData = ReadyList.listData;
    $scope.pendingListData = PendingList.listData;
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