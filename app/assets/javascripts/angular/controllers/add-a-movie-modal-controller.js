app.controller('AddAMovieModalController', ['$scope', '$http', '$templateCache', '$modalInstance', 'movie', 'ReadyList', function ($scope, $http, $templateCache, $modalInstance, movie, ReadyList) {

  $scope.ok = function (movie) {
    $http.post('/api/queued_lists/'+ ReadyList.listData.id + '/queued_movies', movie).
      success(function(data) {
        ReadyList.updateList();
        $modalInstance.dismiss('cancel');
      }).
      error(function(data) {
        console.log(data);
      });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);