app.controller("ListsController", ['$scope', '$http', '$modal', function($scope, $http, $modal){

	$scope.init = function() {
    $scope.openListsModal()
	}

  $scope.openListsModal = function () {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/templates/lists/lists-modal.html',
      controller: 'ListsModalController',
      size: 'lg',
      // backdrop: 'static',
      windowClass: 'start-modal'
    });
  };

	$scope.init();

}]);
