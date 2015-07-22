angular.module('app').directive('loadingGif', function() {
	return {
		restrict: 'E',
		templateUrl: "/templates/directives/loading-gif.html",
		scope: {
			loadingGif: "="
		}
	};
})