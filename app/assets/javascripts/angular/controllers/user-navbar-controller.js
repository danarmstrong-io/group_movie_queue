app.controller("UserNavbarController", ['$scope', 'ReadyList', 'PendingList', 'QueuedLists', function($scope, ReadyList, PendingList, QueuedLists) {

	$scope.init = function() {
    $scope.pendingListData = PendingList.listData;
    $scope.readyListData = {};
    $scope.readyListData.users = [];
    $scope.readyListData = ReadyList.listData;
    $scope.queuedLists = QueuedLists.listsData;
	}

	$scope.changeUserList = function(listId) {
		console.log(listId)
		ReadyList.changeListId(listId);
	}

	$scope.userListName = function() {
		if ($scope.readyListData.users) {
			string = ""
			if ($scope.readyListData.users.length == 2) {
				return twoUsersString();
			}
			else {
				return multipleUsersString();
			}
		}
	}

	function multipleUsersString() {
		string = "";
		$.each($scope.readyListData.users, function( index, value ) {
		  if(index + 1 == $scope.readyListData.users.length) {
		  	string += '& ' + value.first_name
		  }
		  else {
			  string += value.first_name + ", ";
		  }

		});
		return string
	}

	function twoUsersString() {
		return $scope.readyListData.users[1].first_name + " & " + $scope.readyListData.users[0].first_name;
	}

	$scope.init();

}]);