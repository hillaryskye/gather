app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/landing.html',
      controller: 'AuthCtrl'
    })
    .when('/gather', {
      templateUrl: 'partials/gather.html',
      controller: 'GatherCtrl'
    })
    .when('/gather/places', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      resolve: "{user: resolveUser}"
    })
    .when('/gather/places/new', {
      templateUrl: 'partials/new.html',
      controller: 'NewCtrl'
    })
    .when('/gather/places/:id/edit', {
      templateUrl: 'partials/edit.html',
      controller: 'EditCtrl'
    })
    .when('/gather/places/:id/show', {
      templateUrl: 'partials/show.html',
      controller: 'ShowCtrl'
    })
    .otherwise({ redirectTo: '/' });

    app.run(function($rootScope, $location) {
      $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
          $location.path('/')
        }
      })
    })

    function resolveUser($firebaseAuth) {
      var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/users")
      var authObj = $firebaseAuth(authRef)

      return authObj.$requireAuth()
    }
}]);
