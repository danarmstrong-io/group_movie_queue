angular.module('app').controller('AddAUserModalController', ['$scope', '$http', '$templateCache', '$modalInstance', 'ReadyList', function ($scope, $http, $templateCache, $modalInstance, ReadyList) {


  $scope.init = function () {
    $scope.readyListData = ReadyList.listData;
    $scope.invitee = {};
  };

  $scope.ok = function (invitee) {
    $http.post('/api/v1/queued_lists/' + $scope.readyListData.id + '/add_user', {invitee: invitee})
      .success(function(data) {
        ReadyList.updateList();
        $modalInstance.dismiss('cancel');
      })
      .error(function(data) {
        console.log("error")
      });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.checkIfActiveUser = function(invitee) {
    invitee.checked = true;
    $http({ url: '/api/v1/show_by_email/', method: "GET", params: {email: invitee.email} }).
      success(function(data) {
        invitee.exists = JSON.parse(data);
        setUserTooltipInfo(invitee);
      }).
      error(function(data) {
        console.log("error")
      });
  };

  $scope.inviteeExistsAndChecked = function(invitee) {
    return (invitee.exists && invitee.checked);
  }

  $scope.inviteeDoesntExistAndChecked = function(invitee) {
    return (!invitee.exists && invitee.checked);
  }

  $scope.validEmail = function(invitee) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(invitee.email) && invitee.checked);
  }

  $scope.invalidEmail = function(invitee) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (!re.test(invitee.email) && invitee.checked);
  }

  function setUserTooltipInfo(invitee) {
    if (invitee.exists) {
      invitee.tooltipInfo = "User be will invited to join this list.";
    }
    else {
      invitee.tooltipInfo = "User does not exist and will be invited to Oogway's list by email.";
    }
    if (!$scope.validEmail(invitee)) {
      invitee.tooltipInfo = "Invalid Email";
    }
  }

  $scope.init();

}]);