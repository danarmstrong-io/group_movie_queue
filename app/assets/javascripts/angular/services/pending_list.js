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
	};

	factory.updateList = function() {
		factory.getList().then(factory.currentListRetrieved);
	}

	factory.init();

	return factory;
}]);