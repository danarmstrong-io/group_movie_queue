app.controller("StartController", ['$scope', '$modal', function($scope, $modal) {


	$scope.init = function() {
		$scope.openStartModal();
	};

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
