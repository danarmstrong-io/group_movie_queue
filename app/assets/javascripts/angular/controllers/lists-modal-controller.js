app.controller('ListsModalController', function ($scope, $modalInstance, QueuedLists, UserFactory, ReadyList, $state, $stateParams) {

	$scope.init = function() {
    $scope.queuedLists = QueuedLists.listsData;
		$scope.modalInstance = $modalInstance;
   	$scope.userData = UserFactory.userData;
   	$scope.modalInstance = $modalInstance;
	};

	$scope.selectList = function(listId) {
		ReadyList.changeListId(listId);
    $modalInstance.dismiss('cancel');
	};

	$scope.switchToCreateList = function() {
		$scope.createList = true;
	};

	$scope.switchToLists = function() {
		$scope.createList = false;
	};

	$scope.init();
	
});