app.factory("ReadyList", ['$http', 'orderByFilter', '$location', 'defaultList', 'SelectedMovie', function ($http, orderByFilter, $location, defaultList, SelectedMovie) {
	var factory = {};

	factory.getList = function(listId) {
		factory.currentListId = listId;
    return $http.get('/api/v1/queued_list_ready/' + factory.currentListId);
	};

	factory.init = function() {
		factory.listData = {};
	};

	factory.currentListRetrieved = function(response) {
		factory.listData.movies = orderByFilter(response.data.queued_list.queued_movies, 'oogway_rating', true);
		factory.listData.id = response.data.queued_list.id;
		factory.listData.users = response.data.queued_list.queued_users;
		factory.listData.title = response.data.queued_list.title;
		factory.listData.invited_users = response.data.queued_list.list_invites;
		factory.listData.genres = response.data.queued_list.genres;
		SelectedMovie.movieData = factory.listData.movies[0];
	};

	factory.changeListId = function(listId) {
		var path = "/dashboard/" + listId + '/ready';
		$location.path(path);
		defaultList.id = listId;
		factory.currentListId = listId;
		factory.getList(factory.currentListId).then(factory.currentListRetrieved);
	}

	factory.updateList = function() {
		factory.getList(factory.currentListId).then(factory.currentListRetrieved);
	}

	factory.init();

	return factory;
}]);