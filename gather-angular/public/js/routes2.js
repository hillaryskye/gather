app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('/', {
            url:'/',
            templateUrl: 'partials/landing.html',
            controller: 'AuthCtrl'
        })
        .state('gather', {
            url:'/gather',
            templateUrl: 'partials/gather.html',
            controller: 'GatherCtrl'
        })
        .state('gather.places', {
            url:'/gather/places',
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
            resolve: "{user: resolveUser}"
        })
        .state('gather/places/new', {
            url:'/gather/places/new',
            templateUrl: 'partials/new.html',
            controller: 'NewCtrl'
        })
        .state('gather/places/:id/edit', {
            url:'/gather/places/:id/edit',
            templateUrl: 'partials/edit.html',
            controller: 'EditCtrl'
        })
        .state('gather/places/:id/show', {
            url:'/gather/places/:id/show',
            templateUrl: 'partials/show.html',
            controller: 'ShowCtrl'
        })

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
