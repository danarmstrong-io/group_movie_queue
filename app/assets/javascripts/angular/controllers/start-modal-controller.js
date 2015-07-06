app.controller('StartModalController', function ($scope, $modalInstance) {

	$scope.init = function() {
		$scope.modalInstance = $modalInstance;
	};


	$scope.init();
    // $modalInstance.close();
    // $modalInstance.dismiss('cancel');
});