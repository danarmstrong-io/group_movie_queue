angular.module('app').factory("SelectedMovie", ['$http', function ($http) {
	var factory = {};

	factory.getComments = function() {
    return $http.get('/api/v1/movies/' + factory.movieData.id + '/movie_comments');
	};

	factory.init = function() {
		factory.movieData = {};
	};

	factory.setMovie = function(movie) {
		factory.movieData = movie;
		if (factory.movieData.id) {
			factory.getComments().then(factory.selectedMovieCommentsRetrieved);
		}
	}

	factory.updateMovie = function() {
		factory.getComments().then(factory.selectedMovieCommentsRetrieved);
	}

	factory.selectedMovieCommentsRetrieved = function(response) {
		factory.movieData.comments = response.data;
	};

	factory.init();

	return factory;
}]);
