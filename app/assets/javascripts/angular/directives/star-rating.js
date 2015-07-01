angular.module("app").directive("starRating", function() {
  return {
    restrict : "EA",
    templateUrl : "/templates/directives/star-rating.html",
    scope : {
      ratingValue : "=ngModel",
      max : "=?", //optional: default is 5
      onRatingSelected : "&?",
      readonly: "=?",
      icon: "=?"
    },
    link : function(scope, elem, attrs) {
      scope.icon = attrs.icon;
      if (scope.max == undefined) { scope.max = 10; }
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : i < scope.ratingValue
          });
        }
      };
      scope.toggle = function(index) {
        if (scope.readonly == undefined || scope.readonly == false){
          scope.ratingValue = index + 1;
          // scope.onRatingSelected({
          //   rating: index + 1
          // });
        }
      };
      scope.$watch("ratingValue", function(oldVal, newVal) {
        if (newVal) { updateStars(); }
      });
    }
  };
});