app.controller("CreateListController", ['$scope', '$http', 'UserFactory', function($scope, $http, UserFactory){

	$scope.init = function() {
		$scope.title = "Create A List";
		$scope.invitees = [{}];
	};

	$scope.addInvitee = function() {
		$scope.invitees.push({});
	};

	$scope.removeInvitee = function(index) {
		$scope.invitees.splice(index, 1);
	};

	$scope.checkIfActiveUser = function(user) {
		user.checked = true;
		$http({ url: '/api/show_by_email/', method: "GET", params: {email: user.email} }).
	    success(function(data) {
	    	user.exists = JSON.parse(data);
	    }).
      error(function(data) {
      	console.log("error")
      });
	};

	$scope.createList = function() {
		$http.post('/api/queued_lists', {invitees: $scope.invitees}).
			success(function(data) {
      	console.log("success")

	    }).
      error(function(data) {
      	console.log("error")
      });
	}

	$scope.init();
}]);