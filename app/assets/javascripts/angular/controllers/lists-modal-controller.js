app.controller('ListsModalController', function ($scope, $modalInstance, QueuedLists, UserFactory, ReadyList, $state) {

	$scope.init = function() {
    $scope.queuedLists = QueuedLists.listsData;
		$scope.modalInstance = $modalInstance;
   	$scope.userData = UserFactory.userData;

	};

	$scope.selectList = function(listId) {
		ReadyList.changeListId(listId);
    $modalInstance.dismiss('cancel');
    $state.go('dashboard.readyList');

	};


	$scope.init();
    // $modalInstance.close();
    // $modalInstance.dismiss('cancel');
});