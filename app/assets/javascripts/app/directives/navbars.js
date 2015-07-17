angular.module('app').directive('userNavbar', function() {
	return {
		restrict: 'E',
		controller: 'UserNavbarController',
		templateUrl: "/templates/dashboard/navbar.html"
	};
})