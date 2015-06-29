app.factory("UserFactory", ['$http', function ($http) {
	var factory = {};

	factory.getCurrentUser = function() {
    return $http.get('/api/v1/show_current_user');
	};

	factory.init = function() {
		factory.userData = {};
		factory.getCurrentUser().then(factory.currentUserRetrieved);
	};

	factory.currentUserRetrieved = function(response) {
		factory.userData.currentUser = response.data.user;
	};

	factory.init();

	return factory;
}]);