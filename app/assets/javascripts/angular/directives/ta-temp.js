app.directive('typeahead', function($timeout,$http,ReadyList,UserFactory) {
  return {
    restrict: 'AEC',
    scope: {
      title: '@',
      retkey: '@',
      displaykey:'@',
      modeldisplay:'=',
      subtitle: '@',
      modelret: '=',
      movie: '='
    },

    link: function(scope, elem, attrs) {
        scope.current = 0;
        scope.selected = false; 

      scope.da  = function(txt){
          scope.ajaxClass = 'loadImage';
          if (txt && txt.length > 2){
            $.ajax({
                  url: 'http://sg.media-imdb.com/suggests/' + txt.charAt(0).toLowerCase() + '/' + txt.toLowerCase() + '.json',
                  dataType: 'jsonp',
                  cache: true,
                  jsonp: false,
                  jsonpCallback: 'imdb$' + txt.toLowerCase()
              }).
                  success(function(data, status) {
                    var movies = [];
                    $.each(data.d, function( index, value ) {
                      if (value.q && value.q == 'feature') {
                        movies.push(value);
                      }
                    });
                    scope.TypeAheadData = movies;
                    scope.ajaxClass = '';
                  }) ;  
          }

      }

      scope.handleSelection = function(key,val) {
        scope.modelret = key;
        scope.modeldisplay = val;
        scope.current = 0;
        scope.selected = true;
        scope.loading_gif = true;
        scope.movie = null;


        $http.jsonp('http://www.omdbapi.com/?i=' + key + "&callback=JSON_CALLBACK").
          success(function(data, status, headers, config) {
            scope.loading_gif = false;
            var key, keys = Object.keys(data);
            var n = keys.length;
            var newobj={}
            while (n--) {
              key = keys[n];
              newobj[key.toLowerCase()] = data[key];
            }
            scope.movie = newobj;
            // scope.movie.ratings = [];
            // scope.movie.ratings.push(UserFactory.userData.currentUser);
            // scope.movie.ratings[0].oogway_rating = 1;
          })
      }

      scope.isCurrent = function(index) {
        return scope.current == index;
      }

      scope.setCurrent = function(index) {
        scope.current = index;
      }

      scope.isMovie = function(item) {
        return (item.q == "feature");
      }

    },
    template: '<input class="form-control" type="text" ng-model="modeldisplay" ng-KeyPress="da(modeldisplay)"  ng-keydown="selected=false"'+
                'style="width:100%;" ng-class="ajaxClass">'+
                '<div class="list-group table-condensed overlap" ng-hide="!modeldisplay.length || selected" style="width:100%">'+
                    '<a href="#" class="list-group-item noTopBottomPad" ng-repeat="item in TypeAheadData | filter:model  track by $index" '+
                       'ng-click="handleSelection(item[retkey],item[displaykey])" style="cursor:pointer" '+
                       'ng-class="{active:isCurrent($index)}" '+
                       'ng-mouseenter="setCurrent($index)">'+
                         ' {{item[title]}}<br />'+
                         '<i>{{item[subtitle]}} </i>'+
                    '</a> '+
                '</div>'+
                '</input><br>' +
    '<img class="add-movie-loading-gif" ng-src="assets/loading.gif" ng-show="loading_gif"></img>'
  };
});


