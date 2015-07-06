angular.module('app').directive('startModalInvites', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/start-modal/start-modal-invites.html"
	};
})

angular.module('app').directive('startModalLists', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/start-modal/start-modal-lists.html"
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