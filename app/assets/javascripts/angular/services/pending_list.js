app.factory("PendingList", ['$http', function ($http) {
	var factory = {};

	factory.getList = function() {
    return $http.get('/api/v1/queued_list_pending/');
	};

	factory.init = function() {
		factory.listData = {};
		factory.getList().then(factory.currentListRetrieved);
	};

	factory.currentListRetrieved = function(response) {
		factory.listData.movies = response.data.movies;
		console.log(factory.listData.movies)
	};

	factory.updateList = function() {
		factory.getList().then(factory.currentListRetrieved);
	}

	factory.init();

	return factory;
}]);