app.controller("MovieListNavbarController", ['$scope', '$modal', 'ReadyList', function($scope, $modal, ReadyList) {

	$scope.init = function() {
		$scope.completedCheckBox = {completed: true};
    $scope.readyListData = ReadyList.listData;
    $scope.genres = [];
	};

	$scope.allGenresSelected = function() {
		return ($scope.genres && $scope.genres.length == 0);
	};

	$scope.genreSelected = function(genre) {
		return ($scope.genres.indexOf(genre) > -1);
	};

	$scope.setGenresToAll = function() {
    $scope.genres = [];
	};

	$scope.addGenreToFilter = function(genre) {
		if ($scope.genres.indexOf(genre) == -1) { $scope.genres.push(genre) };
	};

	$scope.toggleCompletedCheckBox = function () {
		if ($scope.completedCheckBox){
			$scope.completedCheckBox = undefined;
		}
		else {
			$scope.completedCheckBox = {completed: true};
		}
	};

	$scope.openAddAMovieModal = function (size) {
		var modalInstance = $modal.open({
			animation: false,
			templateUrl: '/templates/dashboard/add-a-movie-modal.html',
			controller: 'AddAMovieModalController',
			size: size,
			resolve: {
				movie: function () {
				return $scope.movie;
				}
			}
		});
	};

	$scope.init();

}]);