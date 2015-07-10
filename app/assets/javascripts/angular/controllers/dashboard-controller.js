app.controller("DashboardController", ['$scope', '$location', 'defaultList', '$state', '$stateParams', '$modal', 'ReadyList', function($scope, $location, defaultList, $state, $stateParams, $modal, ReadyList){

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

  $scope.genresString = function(movie) {
    if (movie && movie.genres) {
      var string = ""
      for(var index = 0; index < movie.genres.length - 1; index++) {
        string += movie.genres[index].name + ', '
      }
      string += movie.genres[movie.genres.length - 1].name
      return string
    }
  }

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