app.controller("UserNavbarController", ['$scope', 'ReadyList', 'PendingList', 'QueuedLists', '$state', 'UserFactory', '$http', function($scope, ReadyList, PendingList, QueuedLists, $state, UserFactory, $http) {

    $scope.init = function() {
        $scope.pendingListData = PendingList.listData;
        $scope.readyListData = {};
        $scope.readyListData.users = [];
        $scope.readyListData = ReadyList.listData;
        $scope.queuedLists = QueuedLists.listsData;
        $scope.userData = UserFactory.userData;
    }

    $scope.changeUserList = function(listId) {
        ReadyList.changeListId(listId);
        $state.go('dashboard');
    }

    $scope.acceptInvite = function(inviteId) {
    $http.post('/api/v1/accept_invite/' + inviteId).
    success(function(data) {
    	UserFactory.updateUser();
    	QueuedLists.updateLists();
    	PendingList.updateList();
    })
    }

    $scope.rejectInvite = function(inviteId) {
    $http.post('/api/v1/reject_invite/'+ inviteId).
    success(function(data) {
    	UserFactory.updateUser();
    })
    }

    $scope.init();

}]);