app.factory("PendingList", ['$http', function ($http) {
	var factory = {};

	factory.getList = function() {
    return $http.get('/api/queued_list_pending/');
	};

	factory.init = function() {
		factory.listData = {};
		factory.getList().then(factory.currentListRetrieved);
	};

	factory.currentListRetrieved = function(response) {
		factory.listData.movies = response.data.movies;
		// $.each(factory.listData.movies, function( index, value ) {
		//   value.user_rating = { rating: 1, seen: false, rewatch: false, favorite: false };
		// });
	};

	factory.updateList = function() {
		factory.getList().then(factory.currentListRetrieved);
	}

	factory.init();

	return factory;
}]);