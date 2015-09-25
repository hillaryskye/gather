app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/gathers/new', {
      templateUrl: 'partials/new.html',
      controller: 'NewCtrl'
    })
    .when('/gathers/:id/edit', {
      templateUrl: 'partials/edit.html',
      controller: 'EditCtrl'
    })
    .when('/gathers/:id', {
      templateUrl: 'partials/show.html',
      controller: 'ShowCtrl'
    })
    .otherwise({ redirectTo: '/' });
}]);
