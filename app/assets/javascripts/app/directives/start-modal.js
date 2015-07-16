angular.module('app').directive('startModalInvites', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/first-start/start-modal-invites.html"
	};
})

angular.module('app').directive('startModalCreateList', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/create-list/create-list.html",
		controller: "CreateListController",
		scope: {modalInstance: '=modalInstance'}
	};
})