app.controller("UserSettingsController", ['$scope', '$http', 'UserFactory', 'QueuedLists', function($scope, $http, UserFactory, QueuedLists){

	$scope.init = function() {
		$scope.userData = UserFactory.userData;
		$scope.changePassword = false;
		$scope.passwordData = {password: "", confirmPassword: ""}
    $scope.queuedLists = QueuedLists.listsData;
   	$scope.selectedListId = UserFactory.userData.currentUser.default_list_id;
	};

	$scope.setDefaultList = function() {
		$http.put('/api/v1/default_lists/' + $scope.selectedListId)
	    .success(function(data) {
	    	$scope.updateDefaultSuccess = true;
	    })
      .error(function(data) {
      	console.log("error")
      });
	}

	$scope.removeDefaultList = function() {
		$http.delete('/api/v1/default_lists/1')
	    .success(function(data) {
	    	$scope.updateDefaultSuccess = true;
	    	$scope.selectedListId = "";
	    })
	    .error(function(data) {
	    	console.log("error")
	    });
	}

	$scope.updateCurrentUser = function() {
		if ($scope.current_user_form.$valid) {
			$http.put('api/v1/update_current_user', { user: $scope.userFormData }).success($scope.updateCurrentUserSuccess);
		}
	};

	$scope.updateCurrentUserSuccess = function(response) {
		$scope.editSettings = false;
		$scope.userData.currentUser = response;
	};

	$scope.cancelEdit = function() {
		$scope.editSettings = false;
	};

	$scope.editUser = function() {
		$scope.editSettings = true;
		$scope.userFormData = _.clone($scope.userData.currentUser);
	};

	$scope.changePasswordToggle = function() {
		$scope.changePassword = !$scope.changePassword;
	};

	$scope.updatePassword = function() {
		$http.put('/api/v1/update_current_password', { user: $scope.passwordData})
			.success($scope.updateCurrentPasswordSuccess);
	};

	$scope.updateCurrentPasswordSuccess = function(response) {
		$scope.changePassword = false;
	};

	$scope.init();
}]);