app.factory("QueuedLists", ['$http', function ($http) {
	var factory = {};

	factory.getLists = function() {
    return $http.get('/api/queued_lists');
	};

	factory.init = function() {
		factory.listsData = {};
		factory.getLists().then(factory.queuedListsRetrieved);
	};

	factory.queuedListsRetrieved = function(response) {
		factory.listsData.lists = response.data;
	};

	factory.updateLists = function() {
		factory.getLists().then(factory.queuedListsRetrieved);
	}

	factory.init();

	return factory;
}]);