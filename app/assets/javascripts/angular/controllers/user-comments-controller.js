app.controller("UserCommentsController", ['$scope', 'SelectedMovie', '$http', 'UserFactory', function($scope, SelectedMovie, $http, UserFactory){

  $scope.init = function() {
    $scope.userData = UserFactory.userData;
    $scope.selectedMovie.comments = SelectedMovie.movieData.comments;
    $scope.writeComment = false;
    $scope.comment = "";
  };

  $scope.toggleWriteComment = function() {
    $scope.writeComment = !$scope.writeComment;
    $scope.comment = "";
  };

  $scope.submitComment = function() {
    $http.post('/api/v1/movies/' + SelectedMovie.movieData.id + '/movie_comments', {comment: $scope.comment}).
      success(function(data) {
        SelectedMovie.updateMovie();
        $scope.writeComment = false;

      }).
      error(function(data) {
        console.log("error")
      });
  };

  $scope.destroyComment = function(comment) {
    $http.delete('/api/v1/movies/' + SelectedMovie.movieData.id + '/movie_comments/' + comment.id).
      success(function(data) {
        SelectedMovie.updateMovie();
      }).
      error(function(data) {
        console.log("error")
      });
  }

	$scope.init();

}]);