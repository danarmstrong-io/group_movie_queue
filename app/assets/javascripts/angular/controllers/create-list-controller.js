app.controller("CreateListController", ['$scope', '$http', 'UserFactory', 'QueuedLists', '$state', 'ReadyList', function($scope, $http, UserFactory, QueuedLists, $state, ReadyList){

	$scope.init = function() {
		$scope.title = "Create A List";
		$scope.createListData = {invitees: [], title: ""};
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

	$scope.createList = function() {
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

	$scope.init();
}]);