app.controller('ListsModalController', function ($scope, $modalInstance, QueuedLists, UserFactory, ReadyList, $state) {

	$scope.init = function() {
    $scope.queuedLists = QueuedLists.listsData;
		$scope.modalInstance = $modalInstance;
   	$scope.userData = UserFactory.userData;
   	$scope.modalInstance = $modalInstance;

	};

	$scope.selectList = function(listId) {
		ReadyList.changeListId(listId);
    $modalInstance.dismiss('cancel');
    $state.go('dashboard.readyList');

	};

	$scope.switchToCreateList = function() {
		$scope.createList = true;
	};

	$scope.switchToLists = function() {
		$scope.createList = false;
	};


	$scope.init();
    // $modalInstance.close();
    // $modalInstance.dismiss('cancel');
});