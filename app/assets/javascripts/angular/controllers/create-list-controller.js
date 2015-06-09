app.controller("CreateListController", ['$scope', '$http', 'UserFactory', function($scope, $http, UserFactory){

	$scope.init = function() {
		$scope.title = "Create A List";
	};

	$scope.init();
}]);