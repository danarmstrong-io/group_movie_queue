app.controller("RatingsComponentController", ['$scope', '$http', 'ReadyList', 'PendingList', 'UserFactory', function($scope, $http, ReadyList, PendingList, UserFactory){

  $scope.init = function() {
    $scope.userData = UserFactory.userData;

  }

  $scope.currentUsersRating = function(rating) {
    return ($scope.userData.currentUser && rating.user_id == $scope.userData.currentUser.id)
  }

  $scope.clickEditRating = function(rating) {
    $scope.editRatingFormData = _.cloneDeep(rating);
    $scope.editRating = true;
  }

  $scope.cancelEditRating = function() {
    $scope.editRating = false;
  }

  $scope.submitEditedRating = function() {
    $http.put('/api/v1/user_movie_ratings/' + $scope.editRatingFormData.id, $scope.editRatingFormData).
      success(function(data) {
        updateLists();
        $scope.cancelEditRating();
      }).
      error(function(data) {
        console.log(data);
      });
  }

  function updateLists() {
    ReadyList.updateList();
    PendingList.updateList();
  }

	$scope.init();

}]);