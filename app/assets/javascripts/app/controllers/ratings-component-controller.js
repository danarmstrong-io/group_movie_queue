angular.module('app').controller("RatingsComponentController", ['$scope', '$http', 'ReadyList', 'PendingList', 'UserFactory', 'SelectedMovie', function($scope, $http, ReadyList, PendingList, UserFactory, SelectedMovie){

  $scope.init = function() {
    $scope.userData = UserFactory.userData;
  };

  $scope.currentUsersRatingIndex = function() {
    var ratings = SelectedMovie.movieData.user_movie_ratings;
    for(var index = 0; index < ratings.length; index++) {
      if ($scope.userData.currentUser && ratings[index].user_id == $scope.userData.currentUser.id) {
        return index;
      }
    };
    return undefined;
  };

  $scope.currentUsersRating = function() {
    return SelectedMovie.movieData.user_movie_ratings[$scope.currentUsersRatingIndex()];
  };

  $scope.isCurrentUsersRating = function(rating) {
    return ($scope.userData.currentUser && rating.user_id == $scope.userData.currentUser.id)
  };

  $scope.clickEditRating = function() {
    $scope.editRatingFormData = _.cloneDeep($scope.currentUsersRating());
    $scope.editRating = true;
  };

  $scope.cancelEditRating = function() {
    $scope.editRating = false;
  };

  $scope.submitEditedRating = function() {
    $http.put('/api/v1/user_movie_ratings/' + $scope.editRatingFormData.id, $scope.editRatingFormData).
      success(function(data) {
        SelectedMovie.movieData.user_movie_ratings[$scope.currentUsersRatingIndex()] = data;
        $scope.cancelEditRating();
        updateLists();
      }).
      error(function(data) {
        console.log(data);
      });
  };

  function updateLists() {
    ReadyList.updateListWithoutSelectedChange();
    PendingList.updateList();
  };

	$scope.init();

}]);
