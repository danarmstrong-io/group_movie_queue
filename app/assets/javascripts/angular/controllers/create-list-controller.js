app.controller("CreateListController", ['$scope', '$http', 'UserFactory', function($scope, $http, UserFactory){

	$scope.init = function() {
		$scope.title = "Create A List";
		$scope.createListData = {invitees: [{}]};
	};

	$scope.addInvitee = function() {
		$scope.createListData.invitees.push({});
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
      	console.log("success")

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

	function setUserTooltipInfo(user) {
		if (user.exists) {
  		user.tooltipInfo = "User will invited to join this list.";
  	}
  	else {
  		user.tooltipInfo = "User does not exist and will be invited to Oogway's list by email.";
  	}
	}

	$scope.init();
}]);