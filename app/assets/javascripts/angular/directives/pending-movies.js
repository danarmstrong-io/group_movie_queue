angular.module('app').directive('pendingMovies', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/pending-list/pending-movies.html"
	};
})

angular.module('app').directive('pendingMovieInformation', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/pending-list/pending-movie-information.html"
	};
})