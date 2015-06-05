app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(['$httpProvider', function($httpProvider) {
    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/list/1");



  $stateProvider
    .state('dashboard', {
      url: "/list/:listId",
      templateUrl: "/templates/dashboard/dashboard.html",
      controller: "DashboardController"
    })
    // .state('userList', {
    //   url: "/list/:listId",
    //   templateUrl: "/templates/user-list.html",
    //   controller: "UserListController"
    // })
    .state('userSettings', {
      url: "/user-settings",
      templateUrl: "/templates/user-settings.html",
      controller: "UserSettingsController"
    })
});