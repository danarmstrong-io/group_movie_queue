app.factory("PendingLists", ['$http', function ($http) {
	var factory = {};

	factory.getList = function(listId) {
    return $http.get('/api/queued_list_pending/' + listId);
	};

	factory.init = function() {
		factory.listData = {};
		factory.getList(1).then(factory.currentListRetrieved);
	};

	factory.currentListRetrieved = function(response) {
		factory.listsData = response.data;
	};

	factory.init();

	return factory;
}]);