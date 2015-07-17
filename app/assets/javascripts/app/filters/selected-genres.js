angular.module('app').filter('selectedGenres', function() {
    return function(movies, genres) {
        if (movies) {
            return movies.filter(function(movie) {
                if (genres.length == 0) { return true; }
                for (var i in movie.genres) {
                    if (genres.indexOf(movie.genres[i].name) != -1) {
                        return true;
                    }
                }
                return false;

            });
        }
    };
})
