app.controller("ReadyListController", ['$scope', '$modal', '$http', 'ReadyList', 'PendingList', 'orderByFilter', 'UserFactory', function($scope, $modal, $http, ReadyList, PendingList, orderByFilter, UserFactory){

  $scope.init = function() {
    resizeMainPanels();
    resizeAppContainer();
  }

  $( window ).resize(function() {
    resizeMainPanels();
    resizeAppContainer();
  });

  function resizeMainPanels() {
    var height = $(window).height() - 100;
    var mainPanels = $('.main-panel');
    $.each(mainPanels, function( index, value ) {
      $(value).css({ "max-height": height + 'px' });
      $(value).css({ "height": height + 'px' });
    });
    $('body').css({ "height": height + 'px' });
  }

  function resizeAppContainer() {
    var height = $(window).height() - 50;
    var mainPanels = $('.app-container');
    $.each(mainPanels, function( index, value ) {
      $(value).css({ "max-height": height + 'px' });
      $(value).css({ "height": height + 'px' });
    });
  }

	$scope.init();

}]);