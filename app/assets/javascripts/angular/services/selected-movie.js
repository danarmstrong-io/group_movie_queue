app.factory("SelectedMovie", ['$http', function ($http) {
	var factory = {};

	factory.init = function() {
		factory.movieData = {};
	};

	factory.setMovie = function(movie) {
		factory.movieData = movie;
	}

	factory.init();

	return factory;
}]);