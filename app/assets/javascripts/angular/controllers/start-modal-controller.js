app.controller('StartModalController', function ($scope, $modalInstance, QueuedLists, UserFactory, $http, PendingList, $state, ReadyList) {

	$scope.init = function() {
    $scope.queuedLists = QueuedLists.listsData;
		$scope.modalInstance = $modalInstance;
   	$scope.userData = UserFactory.userData;
	};

	$scope.switchToCreateList = function() {
		$scope.createList = true;
	};

	$scope.switchToLists = function() {
		$scope.createList = false;
	};

	$scope.membersString = function(invite) {
		var string = "";
		var users = invite.queued_list.users;
		var users_length = users.length;
		for(var index = 0; index < users_length - 2; index++) {
			string += users[index].first_name + " " + users[index].last_name + ", ";
		}
		string += users[users_length - 2].first_name + " " + users[users_length - 2].last_name
		string += " and " + users[users_length - 1].first_name + " " + users[users_length - 1].last_name;
		return string
	}

    $scope.acceptInvite = function(inviteId) {
    $http.post('/api/v1/accept_invite/' + inviteId).
	    success(function(data) {
	    	ReadyList.changeListId(data.id);
	    	UserFactory.updateUser();
	    	QueuedLists.updateLists();
	    	PendingList.updateList();
	    	console.log(data);
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

  $scope.noInvites = function() {
  	return ($scope.userData.currentUser.list_invites.length == 0);
  }


	$scope.init();
    // $modalInstance.close();
    // $modalInstance.dismiss('cancel');
});