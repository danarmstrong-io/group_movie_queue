app.controller("DefaultListController", ['$scope', '$http', 'QueuedLists', 'UserFactory', function($scope, $http, QueuedLists, UserFactory) {

	$scope.init = function() {
    $scope.queuedLists = QueuedLists.listsData;
   	$scope.userData = UserFactory.userData;
   	$scope.selectedListId = UserFactory.userData.currentUser.default_list_id;
	};

	$scope.setDefaultList = function() {
		$http.put('/api/v1/default_lists/' + $scope.selectedListId)
	    .success(function(data) {
	    	console.log(data)
	    })
      .error(function(data) {
      	console.log("error")
      });
	}

	$scope.removeDefaultList = function() {
		$http.delete('/api/v1/default_lists/1')
	    .success(function(data) {
	    	console.log(data)
	    	$scope.selectedListId = "";
	    })
	    .error(function(data) {
	    	console.log("error")
	    });
	}

	$scope.init();
}]);
