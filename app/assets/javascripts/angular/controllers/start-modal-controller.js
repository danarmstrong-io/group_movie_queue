app.controller('StartModalController', ['$scope', '$modalInstance', 'QueuedLists', 'UserFactory', '$http', 'PendingList', '$state,' 'ReadyList', function ($scope, $modalInstance, QueuedLists, UserFactory, $http, PendingList, $state, ReadyList) {

	$scope.init = function() {
    $scope.queuedLists = QueuedLists.listsData;
		$scope.modalInstance = $modalInstance;
   	$scope.userData = UserFactory.userData;
		$scope.createListData = {invitees: [], title: ""};
	};

	$scope.selectList = function(listId) {
		ReadyList.changeListId(listId);
    $modalInstance.dismiss('cancel');
	};

	$scope.switchToCreateList = function() {
		$scope.createList = true;
	};

	$scope.switchToInvites = function() {
		$scope.createList = false;
	};

	$scope.addInvitee = function() {
		$scope.createListData.invitees.push({email: ""});
	};

	$scope.removeInvitee = function(index) {
		$scope.createListData.invitees.splice(index, 1);
	};

	$scope.checkIfActiveUser = function(user) {
		user.checked = true;
		$http({ url: '/api/v1/show_by_email/', method: "GET", params: {email: user.email} }).
	    success(function(data) {
	    	user.exists = JSON.parse(data);
	    	setUserTooltipInfo(user);
	    }).
      error(function(data) {
      	console.log("error")
      });
	};

	$scope.postList = function() {
		$http.post('/api/v1/queued_lists', $scope.createListData).
			success(function(data) {
	    	ReadyList.changeListId(data.id)
				QueuedLists.updateLists();
	    	$state.go('dashboard.readyList');
	    	if ($scope.modalInstance) {
	    		$scope.modalInstance.dismiss('cancel');
	    	}

	    }).
      error(function(data) {
      	console.log("error")
      });
	}

	$scope.inviteeExistsAndChecked = function(invitee) {
		return (invitee.exists && invitee.checked);
	}

	$scope.inviteeDoesntExistAndChecked = function(invitee) {
		return (!invitee.exists && invitee.checked);
	}

	$scope.invalidEmail = function(invitee) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return (!re.test(invitee.email) && invitee.checked);
	}

	$scope.invalidTitleOrInvalidEmails = function() {
		if ($scope.createListData.title == "") {
			return true;
		}
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		for(var index = 0; index < $scope.createListData.invitees.length; index++) {
			if ($scope.createListData.invitees[index].email != "") {
		  	if (!re.test($scope.createListData.invitees[index].email)) {
		  		return true;
		  	}
		  }
		}
		return false;
	}

	$scope.hasInvitees = function() {
		return ($scope.createListData.invitees.length > 0)
	}

	function setUserTooltipInfo(user) {
		if (user.exists) {
  		user.tooltipInfo = "User will be invited to join this list.";
  	}
  	else {
  		user.tooltipInfo = "User does not exist and will be invited to Oogway's list by email.";
  	}
  	if ($scope.invalidEmail(user)) {
  		user.tooltipInfo = "Invalid Email";
  	}
	}

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

}]);