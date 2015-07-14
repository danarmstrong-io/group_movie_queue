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
	};

	factory.updateSelectedMovie = function(response) {
		SelectedMovie.movieData = firstCompletedMovie();
	}

	factory.changeListId = function(listId) {
		var path = "/dashboard/" + listId + '/ready';
		$location.path(path);
		defaultList.id = listId;
		factory.currentListId = listId;
		factory.getList(factory.currentListId).then(factory.currentListRetrieved).then(factory.updateSelectedMovie);
	}

	factory.updateList = function() {
		factory.getList(factory.currentListId).then(factory.currentListRetrieved).then(factory.updateSelectedMovie);
	}

	factory.updateListWithoutSelectedChange = function() {
		factory.getList(factory.currentListId).then(factory.currentListRetrieved)
	}

	function firstCompletedMovie() {
		for (var index = 0; index < factory.listData.movies.length; index++) {
			if (factory.listData.movies[index].completed == true) {
				return factory.listData.movies[index];
			}
		}
		return false;
	}

	factory.init();

	return factory;
}]);