app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(['$httpProvider', function($httpProvider) {
    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/dashboard/lists/ready");

  $stateProvider
    .state('dashboard', {
      url: "/dashboard/:id",
      templateUrl: "/templates/dashboard/dashboard.html",
      controller: "DashboardController"
    })
    .state('dashboard.lists', {
      url: "/lists",
      templateUrl: "/templates/lists/lists.html",
      controller: "ListsController"
    })
    .state('dashboard.firstStart', {
      url: "/start",
      templateUrl: "/templates/first-start/start.html",
      controller: "FirstStartController"
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
    .state('dashboard.listSettings.changeTitle', {
      url: "/change-title",
      templateUrl: "/templates/dashboard/list-settings/list-settings.change-title.html"
    })
    .state('dashboard.listSettings.users', {
      url: "/users",
      templateUrl: "/templates/dashboard/list-settings/list-settings.users.html"
    })
    .state('dashboard.listSettings.watched', {
      url: "/watched",
      templateUrl: "/templates/dashboard/list-settings/list-settings.watched.html",
      controller: "WatchedListController"
    })
    .state('dashboard.listSettings.destroy', {
      url: "/destroy",
      templateUrl: "/templates/dashboard/list-settings/list-settings.destroy.html"
    })
    .state('dashboard.userPending', {
      url: "/pending",
      templateUrl: "/templates/pending-list/pending-list.html",
      controller: "PendingListController"
    })
    .state('dashboard.userSettings', {
      url: "/user-settings",
      templateUrl: "/templates/user-settings.html",
      controller: "UserSettingsController"
    })
    .state('dashboard.createList', {
      url: "/create-list",
      templateUrl: "/templates/create-list/create-list.html",
      controller: "CreateListController"
    })
});