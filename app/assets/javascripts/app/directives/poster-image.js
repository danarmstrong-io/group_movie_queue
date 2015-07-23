angular.module('app').directive('infoPosterImage', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/directives/info-poster-image.html",
		scope: {
			source: "="
		}
	};
})

angular.module('app').directive('thumbnailPosterImage', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/directives/thumbnail-poster-image.html",
		scope: {
			source: "="
		}
	};
})

angular.module('app').directive('fallbackSrc', function () {
  var fallbackSrc = {
    link: function postLink(scope, elem, attrs) {

      scope.$watch(function(){return attrs.src}, function(value){
      	elem.removeClass('hidden');
      	elem.siblings().addClass('hidden');

	      elem.bind('error', function() {
	      	elem.addClass('hidden');
	      	elem.siblings().removeClass('hidden');
	      });

      });
    }
   }
   return fallbackSrc;
});