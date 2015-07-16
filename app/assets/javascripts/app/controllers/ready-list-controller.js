app.controller("ReadyListController", ['$scope', '$modal', '$http', 'ReadyList', 'PendingList', 'orderByFilter', 'UserFactory', 'SelectedMovie', function($scope, $modal, $http, ReadyList, PendingList, orderByFilter, UserFactory, SelectedMovie){

  $scope.init = function() {
    $scope.currentMovie = {}
    $scope.currentMovie.movieIndex = 0;
    $scope.readyListData = ReadyList.listData;
    $scope.pendingListData = PendingList.listData;
    $scope.userData = UserFactory.userData;
    $scope.editRating = false;
    $scope.movie = SelectedMovie.movieData;
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



	$scope.init();

}]);