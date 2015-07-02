app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(['$httpProvider', function($httpProvider) {
    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/dashboard/ready");

  $stateProvider
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "/templates/dashboard/dashboard.html",
      controller: "DashboardController"
    })
    .state('dashboard.readyList', {
      url: "/ready",
      templateUrl: "/templates/dashboard/dashboard.ready-list.html",
      controller: "ReadyListController"
    })
    .state('dashboard.listSettings', {
      url: "/list-settings",
      templateUrl: "/templates/dashboard/dashboard.list-settings.html",
      controller: "ListSettingsController"
    })
    .state('userPending', {
      url: "/pending",
      templateUrl: "/templates/pending-list/pending-list.html",
      controller: "PendingListController"
    })
    .state('userSettings', {
      url: "/user-settings",
      templateUrl: "/templates/user-settings.html",
      controller: "UserSettingsController"
    })
    .state('createList', {
      url: "/create-list",
      templateUrl: "/templates/create-list/create-list.html",
      controller: "CreateListController"
    })
});