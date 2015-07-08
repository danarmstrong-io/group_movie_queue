app.controller("DashboardController", ['$scope', '$location', 'defaultList', '$state', '$stateParams', '$modal', 'ReadyList', function($scope, $location, defaultList, $state, $stateParams, $modal, ReadyList){

	$scope.init = function() {
		if (parseInt($stateParams.id)) {
			ReadyList.changeListId($stateParams.id)
		}
		else if (defaultList.id) {
			ReadyList.changeListId(defaultList.id)
		}
		else {
			$scope.openListsModal();
		}

	}

  $scope.openListsModal = function () {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/templates/lists/lists-modal.html',
      controller: 'ListsModalController',
      size: 'lg',
      backdrop: 'static',
      windowClass: 'start-modal'
    });
  };

	$scope.init();

}]);