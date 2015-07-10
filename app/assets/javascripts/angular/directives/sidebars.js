angular.module('app').directive('leftbar', function() {
	return {
		restrict: 'E',
		scope: {
			movies: "=movies",
			selectedMovie: "=selectedMovie"
		},
		templateUrl: "/templates/dashboard/leftbar.html",
		controller: "LeftbarController"
	};
})

angular.module('app').directive('rightbar', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/dashboard/rightbar.html"
	};
})