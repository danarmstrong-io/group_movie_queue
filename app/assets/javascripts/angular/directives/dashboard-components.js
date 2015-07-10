angular.module('app').directive('movieInformation', function() {
	return {
		restrict: 'E',
		scope: {
			selectedMovie: "=selectedMovie"
		},
		templateUrl: "/templates/dashboard/movie-information.html"
	};
})

angular.module('app').directive('ratings', function() {
	return {
		restrict: 'E',
		scope: {
			selectedMovie: "=selectedMovie"
		},
		templateUrl: "/templates/dashboard/ratings.html"
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