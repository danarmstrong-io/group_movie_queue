app.controller("ListSettingsController", ['$scope', '$http', '$modal', 'QueuedLists', 'PendingList', 'ReadyList', 'WatchedList', function($scope, $http, $modal, QueuedLists, PendingList, ReadyList, WatchedList) {

  $scope.init = function() {
  }

  $scope.removeUserFromList = function (queuedUserId) {
  	$http.delete("/api/v1/queued_users/" + queuedUserId)
  		.success(function(data) {
        ReadyList.updateList();
        QueuedLists.updateLists();
      })
      .error(function(data) {
        console.log(data);
      });
  }

  $scope.uninviteUserFromList = function (listInviteId) {
  	$http.delete("/api/v1/list_invites/" + listInviteId)
  		.success(function(data) {
        ReadyList.updateList();
      })
      .error(function(data) {
        console.log(data);
      });
  }

  $scope.isCurrentUser = function(user) {
    return ($scope.userData.currentUser && user.id == $scope.userData.currentUser.id)
  }

 	$scope.removeSelfFromList = function() {
 		$scope.userData.currentUser.id
 		$http.delete("/api/v1/queued_users/" + $scope.userData.currentUser.id)
  		.success(function(data) {
        ReadyList.updateList();
        QueuedLists.updateLists();
        // redirect to other lists
      })
      .error(function(data) {
        console.log(data);
      });
 	}

  $scope.openAddAUserModal = function (size) {
    var modalInstance = $modal.open({
      animation: false,
      templateUrl: '/templates/dashboard/add-a-user-modal.html',
      controller: 'AddAUserModalController',
      size: size
    });
  };

  $scope.submitListOptions = function() {

    $http.put('/api/v1/queued_lists/' + $scope.readyListData.id, {title: $scope.readyListData.title})
      .success(function(data) {
        ReadyList.updateList();
        QueuedLists.updateLists();
      })
      .error(function(data) {
        console.log(data);
      });
  };


  // $( window ).resize(function() {
  //   resizeMainPanels();
  //   resizeAppContainer();
  // });

  // function resizeMainPanels() {
  //   var height = $(window).height() - 100;
  //   var mainPanels = $('.main-panel');
  //   $.each(mainPanels, function( index, value ) {
  //     $(value).css({ "max-height": height + 'px' });
  //     $(value).css({ "height": height + 'px' });
  //   });
  //   $('body').css({ "height": height + 'px' });
  // }

  // function resizeAppContainer() {
  //   var height = $(window).height() - 50;
  //   var mainPanels = $('.app-container');
  //   $.each(mainPanels, function( index, value ) {
  //     $(value).css({ "max-height": height + 'px' });
  //     $(value).css({ "height": height + 'px' });
  //   });
  // }

	$scope.init();


}]);