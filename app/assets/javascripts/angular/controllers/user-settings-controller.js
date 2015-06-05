app.controller("UserSettingsController", ['$scope', '$http', 'UserFactory', function($scope, $http, UserFactory){

	$scope.init = function() {
		$scope.userData = UserFactory.userData;
	};

	$scope.updateCurrentUser = function() {
		if ($scope.current_user_form.$valid) {
			$http.put('api/update_current_user', { user: $scope.userFormData }).success($scope.updateCurrentUserSuccess);
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

	$scope.init();
}]);