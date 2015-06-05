app.factory("ReadyList", ['$http', 'orderByFilter', function ($http, orderByFilter) {
	var factory = {};

	factory.getList = function(listId) {
    return $http.get('/api/queued_list_ready/' + listId);
	};

	factory.init = function() {
		factory.listData = {};
		factory.getList(1).then(factory.currentListRetrieved);
	};

	factory.currentListRetrieved = function(response) {
		factory.listData.movies = orderByFilter(response.data.queued_list.queued_movies, 'oogway_rating', true);
		factory.listData.id = response.data.queued_list.id;
		factory.listData.users = response.data.queued_list.users;
	};

	factory.updateList = function() {
		console.log("update!")
		factory.getList(1).then(factory.currentListRetrieved);
	}

	factory.init();

	return factory;
}]);