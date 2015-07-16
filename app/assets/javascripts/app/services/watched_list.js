app.factory("WatchedList", ['$http', 'ReadyList', function ($http, ReadyList) {
	var factory = {};

	factory.getList = function() {
    return $http.get('/api/v1/queued_list_watched/' + ReadyList.currentListId);
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