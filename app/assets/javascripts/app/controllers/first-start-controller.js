app.controller("FirstStartController", ['$scope', '$modal', function($scope, $modal) {

	$scope.init = function() {
		$scope.openStartModal();
	};

  $scope.openStartModal = function () {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/templates/first-start/start-modal.html',
      controller: 'StartModalController',
      size: 'lg',
      backdrop: 'static',
      windowClass: 'start-modal'
    });
  };

	$scope.init();
}]);
