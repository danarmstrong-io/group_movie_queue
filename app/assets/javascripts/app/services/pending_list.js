angular.module('app').factory("PendingList", ['$http', '$state', function ($http, $state) {
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
		if (factory.listData.movies.length == 0) {
			$state.go('dashboard.readyList')
		}
	};

	factory.updateList = function() {
		factory.getList().then(factory.currentListRetrieved);
	}

	factory.init();

	return factory;
}]);