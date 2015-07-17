angular.module('app').controller("UserNavbarController", ['$scope', 'ReadyList', 'PendingList', 'QueuedLists', '$state', 'UserFactory', '$http', function($scope, ReadyList, PendingList, QueuedLists, $state, UserFactory, $http) {

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
    }

    $scope.acceptInvite = function(inviteId) {
    $http.post('/api/v1/accept_invite/' + inviteId).
        success(function(data) {
        	UserFactory.updateUser();
        	QueuedLists.updateLists();
        	PendingList.updateList();
            ReadyList.changeListId(data.id);
            $modalInstance.dismiss('cancel');
            $state.go('dashboard.readyList');
        })
    }

    $scope.rejectInvite = function(inviteId) {
    $http.post('/api/v1/reject_invite/'+ inviteId).
        success(function(data) {
        	UserFactory.updateUser();
        })
    }

    $scope.doesntHaveReadyList = function() {
        return $.isEmptyObject($scope.readyListData);
    }

    $scope.hasAReadyList = function() {
        return !($.isEmptyObject($scope.readyListData));
    }

    $scope.init();

}]);