angular.module('app').directive('movieInformation', function() {
	return {
		restrict: 'E',
		scope: {
			selectedMovie: "=selectedMovie"
		},
		templateUrl: "/templates/dashboard/movie-information.html.erb",
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
		templateUrl: "/templates/dashboard/users-comments.html",
		controller: "UserCommentsController"
	};
})

angular.module('app').directive('noMovies', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/dashboard/no-movies.html"
	};
})