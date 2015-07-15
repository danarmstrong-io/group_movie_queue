app.controller("RightbarController", ['$scope', function($scope){

  $scope.init = function() {
  };

  $scope.toggleRightbar = function() {
    if ($('#rightbar').width() == 200) {
      $scope.closeRightbar();
    } 
    else {
      $scope.openRightbar();
    }
  };

  $scope.openRightbar = function() {
    $('#rightbar').addClass('toggled').find('.sidebar-container').animate({
    width: '200px'
      }, 100, function(){
    $('#rightbar').find('.shadowed').fadeIn(150); 
      });
  };

  $scope.closeRightbar = function() {
    $('#rightbar').find('.shadowed').fadeOut(150, function(){
    $('#rightbar').removeClass('toggled').find('.sidebar-container').animate({
        width: '15px'
    }, 100);
    $('#rightbar').find('.shadowed').hide();
      });
  };

  $scope.init();

}]);