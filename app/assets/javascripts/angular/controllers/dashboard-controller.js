app.controller("DashboardController", ['$scope', '$location', 'defaultList', '$state', '$stateParams', '$modal', 'ReadyList', 'PendingList', function($scope, $location, defaultList, $state, $stateParams, $modal, ReadyList, PendingList){

	$scope.init = function() {
		if (parseInt($stateParams.id)) {
			ReadyList.changeListId($stateParams.id)
		}
		else if (defaultList.id) {
			ReadyList.changeListId(defaultList.id)
		}
		else {
			$scope.openListsModal();
		}
    resizeAppContainer();
	}

  $scope.openAddAMovieModal = function (size) {
    var modalInstance = $modal.open({
      animation: false,
      templateUrl: '/templates/dashboard/add-a-movie-modal.html',
      controller: 'AddAMovieModalController',
      size: size,
      resolve: {
        movie: function () {
        return $scope.movie;
        }
      }
    });
  };

  $scope.openListsModal = function () {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/templates/lists/lists-modal.html',
      controller: 'ListsModalController',
      size: 'lg',
      backdrop: 'static',
      windowClass: 'start-modal'
    });
  };

  $( window ).resize(function() {
    resizeAppContainer();
  });

  function resizeAppContainer() {
    var height = $(window).height() - 110;
    var mainPanels = $('#main');
    $.each(mainPanels, function( index, value ) {
      $(value).css({ "max-height": height + 'px' });
      $(value).css({ "height": height + 'px' });
    });
  }

	$scope.init();

}]);