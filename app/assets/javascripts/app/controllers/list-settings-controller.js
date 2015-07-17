angular.module('app').controller("ListSettingsController", ['$scope', '$http', '$modal', 'QueuedLists', 'ReadyList', '$state', function($scope, $http, $modal, QueuedLists, ReadyList, $state) {

  $scope.init = function() {
  }

  $scope.removeUserFromList = function (queuedUserId) {
  	$http.delete("/api/v1/queued_users/" + queuedUserId)
  		.success(function(data) {
        ReadyList.updateList();
        QueuedLists.updateLists();
      })
      .error(function(data) {
        console.log(data);
      });
  }

  $scope.uninviteUserFromList = function (listInviteId) {
  	$http.delete("/api/v1/list_invites/" + listInviteId)
  		.success(function(data) {
        ReadyList.updateList();
      })
      .error(function(data) {
        console.log(data);
      });
  }

  $scope.isCurrentUser = function(user) {
    return ($scope.userData.currentUser && user.id == $scope.userData.currentUser.id)
  }

 	$scope.removeSelfFromList = function() {
 		$http.delete("/api/v1/queued_users/" + currentQueuedUserId())
  		.success(function(data) {
        $state.go('dashboard.lists');
        ReadyList.updateList();
        QueuedLists.updateLists();
      })
      .error(function(data) {
        console.log(data);
      });
 	}

  $scope.openAddAUserModal = function (size) {
    var modalInstance = $modal.open({
      animation: false,
      templateUrl: '/templates/dashboard/add-a-user-modal.html',
      controller: 'AddAUserModalController',
      size: size
    });
  };

  $scope.submitListOptions = function() {

    $http.put('/api/v1/queued_lists/' + $scope.readyListData.id, {title: $scope.readyListData.title})
      .success(function(data) {
        ReadyList.updateList();
        QueuedLists.updateLists();
      })
      .error(function(data) {
        console.log(data);
      });
  };

  $scope.destroyList = function() {
    $http.delete('/api/v1/queued_lists/' + ReadyList.listData.id)
      .success(function(data) {
        ReadyList.updateList();
        QueuedLists.updateLists();
        $state.go('dashboard.lists');
      })
      .error(function(data) {
        console.log(data);
      });
  }

  function currentQueuedUserId() {
    for(var index = 0; index < $scope.readyListData.users.length; index++) {
      if ($scope.readyListData.users[index].id == $scope.userData.currentUser.id) {
        return $scope.readyListData.users[index].queued_user_id;
      }
    }
    return false;

  };

	$scope.init();


}]);