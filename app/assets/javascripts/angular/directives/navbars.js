// angular.module('app').directive('movieListNavbar', function() {
// 	return {
// 		restrict: 'E',
// 		templateUrl: "/templates/dashboard/movie-list-navbar.html",
// 		controller: "MovieListNavbarController"
// 	};
// })

angular.module('app').directive('userNavbar', function() {
	return {
		restrict: 'E',
		controller: 'UserNavbarController',
		templateUrl: "/templates/dashboard/navbar.html"
	};
})