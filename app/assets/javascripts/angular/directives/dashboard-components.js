angular.module('app').directive('movieInformation', function() {
	return {
		restrict: 'E',
		scope: {
			selectedMovie: "=selectedMovie"
		},
		templateUrl: "/templates/dashboard/movie-information.html",
		controller: "InformationComponentController"
	};
})

angular.module('app').directive('ratings', function() {
	return {
		restrict: 'E',
		scope: {
			selectedMovie: "=selectedMovie"
		},
		templateUrl: "/templates/dashboard/ratings.html",
		controller: "RatingsComponentController"
	};
})

angular.module('app').directive('usersComments', function() {
	return {
		restrict: 'E',
		scope: {
			selectedMovie: "=selectedMovie"
		},
		templateUrl: "/templates/dashboard/users-comments.html"
	};
})