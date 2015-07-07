app.controller('StartModalController', function ($scope, $modalInstance, QueuedLists, UserFactory) {

	$scope.init = function() {
    $scope.queuedLists = QueuedLists.listsData;
		$scope.modalInstance = $modalInstance;
   	$scope.userData = UserFactory.userData;

	};


	$scope.init();
    // $modalInstance.close();
    // $modalInstance.dismiss('cancel');
});