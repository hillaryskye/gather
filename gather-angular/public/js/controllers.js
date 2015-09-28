app.controller("AuthCtrl", function($scope, $rootScope, $location, $firebaseAuth) {
  var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gather")
  var authObj = $firebaseAuth(authRef)

  $scope.users = $firebaseArray(authRef)

  $scope.register = function() {
    authObj.$createUser($scope.user)
      .then(function() {
        $scope.login()
      })

    $scope.newUser = {
      name: $scope.users.name,
      email: $scope.users.email,
      password: $scope.users.password
    }

  $scope.users.$add($scope.newUser)
    .then(function(data) {
      console.log('success')
    },
      function (err) {
        console.error('ERROR:', err);
        return null;
      })
  }
    console.log('user', $scope.users)


  $scope.login = function() {
    authObj.$authWithPassword($scope.user)
      .then(function() {
        $location.path('/gather')
      })
  }
})

app.controller('HomeCtrl', function($scope, $routeParams, $firebaseArray, $firebaseAuth, $location) {
  console.log('controller')
  var newYork = new google.maps.LatLng(40.7127837, -74.00594130000002)
  var infoWindow = new google.maps.InfoWindow();

  var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gather")
  var authObj = $firebaseAuth(authRef)

  var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")
   $scope.places = $firebaseArray(placeRef)

   var gatherRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gather")
    $scope.gathers = $firebaseArray(gatherRef)

  initAutocomplete = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: newYork,
      zoom: 15
    });

    var service = new google.maps.places.PlacesService(map);
    console.log('service', service)

    $scope.placeSearch = function (place) {
        var request = {
          location: newYork,
          radius: 50,
          query: place.query
        };
        console.log('position', request.location)
        console.log('radius', request.radius)
        console.log('query', request.query)
        // var map = $scope.map.control.getGMap();
        // map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var service = new google.maps.places.PlacesService(map);

        var textSearch = service.textSearch(request, callback);
        console.log('service', service)
        console.log('service after', textSearch)
        return;
      };

      var callback = function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            }
            console.log('results.length', results.length)
            console.log('results', results)
          }
        }

        var createMarker = function (place) {
          $scope.map = map
          $scope.map.markers = []

          var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            console.log('position', place.geometry.location)
            console.log('marker', marker)
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(place.name);
            infoWindow.open(map, this);
         });

         bounds = new google.maps.LatLngBounds();

        var request = {
          reference: place.reference
        };
        var detail = new google.maps.places.PlacesService($scope.map);

        var detailGetDetails = detail.getDetails(request, function(result, status) {
          console.log('result', result)
          console.log('detail', detail)
          console.log('detail after', detailGetDetails)
          if (status == google.maps.places.PlacesServiceStatus.OK) {

        $scope.map.markers.push({
          name: result.name,
          latitude: result.geometry.location.lat(),
          longitude: result.geometry.location.lng(),
          // position: result.geometry.location,
          // showWindow: false,
          phone: result.formatted_phone_number,
          website: result.website,
          html: result.html_attributions[0],
          rating: result.rating,
          priceLevel: result.price_level,
          address: result.formatted_address,
          userRatings: result.user_ratings_total,
          id: result.id,
          animation: google.maps.Animation.DROP
        });
        console.log('markers after', $scope.map.markers)
        // console.log('position', position)
        $scope.$apply();

        bounds.extend(result.geometry.location);
        // console.log('location', marker.geometry.location)
      }
       map.fitBounds(bounds);
    });
  }
  $scope.logout = function() {
    console.log('logout')
    authObj.$unauth()
    $location.path('/')
  }
}

  $scope.openInfoWindow = function(e, selectedMarker){
     var infoWindow = new google.maps.InfoWindow();
     e.preventDefault();

     infoWindow.setContent('<h2>' + selectedMarker.name + '</h2>');
    //  infoWindow.setOptions();
    //  infoWindow.open(map, selectedMarker);
    //  $scope.markerId = $scope.map.markers.indexOf(selectedMarker);
}

    $scope.addPlace = function(marker) {
      console.log('addPlace')
      console.log('selectedMarker', marker)
      $routeParams.name = marker.name
      $routeParams.latitude = marker.latitude
      $routeParams.longitude = marker.longitude
      $routeParams.phone = marker.phone
      $routeParams.website = marker.website
      $routeParams.html = marker.html
      $routeParams.rating = marker.rating
      $routeParams.priceLevel = marker.priceLevel
      $routeParams.address = marker.address
      $routeParams.userRatings = marker.userRatings
      $routeParams.id = marker.id

      console.log('$routeParams.name', $routeParams.name)

       $scope.newPlace = {
         name: marker.name,
         latitude: marker.latitude,
         longitude: marker.longitude,
         phone: marker.phone,
         website: marker.website,
        //  html: marker.html,
         rating: marker.rating,
         priceLevel: marker.priceLevel,
         address: marker.address,
         userRatings: marker.userRatings,
         id: marker.id
       }

      $scope.places.$add($scope.newPlace)
        .then(function(data) {
          console.log('success')
        },
          function (err) {
            console.error('ERROR:', err);
            return null;
          })
          console.log('$scope.places in home', $scope.places)

     }

//   $scope.closeClick = function (marker) {
//   marker.showWindow = false;
// };
// $scope.onMarkerClicked = function (marker) {
//   marker.showInfoWindow(marker)
//   // marker.showWindow = true;
//   $scope.map.marker = {
//     name: marker.name,
//     phone: marker.phone,
//     website: marker.website,
//     html: marker.html,
//     type: marker.type
//   }
// };
$scope.removeMarkers = function () {

  // Clear out the old markers.
}

  initAutocomplete()
});

app.controller("NewCtrl", ["$scope", "$rootScope", "$firebaseArray", "$routeParams", "$http", "$route", "$location", "$timeout", "$window", function($scope, $rootScope, $firebaseArray, $routeParams, $http, $route, $location, $timeout, $window) {
  console.log('in new controller')
  console.log('temp in new', $scope.temp)

  var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")
    var Places = $scope.places = $firebaseArray(placeRef)

  // initAutocomplete = function() {

  //   // create a reference to our Firebase database
  //   var placeWinRef = new $window.Firebase("https://gather-angular-firebase.firebaseio.com/places");
  //   // read data from the database into a local scope variable
  //   placeWinRef.on("value", function(snapshot) {
  //     // Since this event will occur outside Angular's $apply scope, we need to notify Angular
  //     // each time there is an update. This can be done using $scope.$apply or $timeout. We
  //     // prefer to use $timeout as it a) does not throw errors and b) ensures all levels of the
  //     // scope hierarchy are refreshed (necessary for some directives to see the changes)
  //     $timeout(function() {
  //       $scope.data = snapshot.val();
  //       var Places = $scope.data
  //
  //       console.log('Places', Places)
  //       console.log('id', Places.shift())
  //
  //   var mapOptions = {
  //           zoom: 4,
  //           center: new google.maps.LatLng(Places[0].latitude, Places[0].longitude),
  //           mapTypeId: google.maps.MapTypeId.TERRAIN
  //       }
  //       $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  //
  //       $scope.markers = [];
  //
  //       var infoWindow = new google.maps.InfoWindow();
  //
  //       for (i = 0; i < Places.length; i++) {
  //         console.log('inside loop')
  //           createMarker(Places[i]);
  //         }
  //           var createMarker = function (Places) {
  //             console.log('in createMarker')
  //
  //           var marker = new google.maps.Marker({
  //               map: $scope.map,
  //               position: new google.maps.LatLng(Places.latitude, Places.longitude),
  //               title: Places.name
  //           });
  //           console.log('marker.position', marker.position)
  //            marker.content = Places.name
  //
  //           google.maps.event.addListener(marker, 'click', function(){
  //               infoWindow.setContent(marker.title);
  //               infoWindow.open($scope.map, marker);
  //           });
  //
  //           var markers = $scope.markers.push(marker);
  //           console.log('markers', markers)
  //         }
  //
  //
  //       $scope.openInfoWindow = function(e, selectedMarker){
  //           e.preventDefault();
  //           google.maps.event.trigger(selectedMarker, 'click');
  //       }
  //
  //     })
  //   });
  //  };
   //
  //   initAutocomplete()





    //
    // var infoWindow = new google.maps.InfoWindow();
    // var chosenPlace = new google.maps.LatLng(Places[i].latitude, Places[i].longitude)
    //
    //       console.log('latitude', Places[i].latitude)
    //       console.log('chosenPlace', chosenPlace)
    //
    //       var map = new google.maps.Map(document.getElementById('map'), {
    //         center: chosenPlace,
    //         zoom: 15
    //       });
    //
    //       var service = new google.maps.places.PlacesService(map);
    //       console.log('service', service)
    //
    //       // $scope.placeSearch = function (place) {
    //           var request = {
    //             location: newYork,
    //             radius: 50,
    //             query: place.query
    //           };
    //
    //         var textSearch = service.textSearch(request, callback);
    //         console.log('service', service)
    //         console.log('service after', textSearch)
    //         return;
    //       };
    //
    //       var callback = function (results, status) {
    //         if (status == google.maps.places.PlacesServiceStatus.OK) {
    //           for (var i = 0; i < results.length; i++) {
    //             createMarker(results[i]);
    //             }
    //             console.log('results.length', results.length)
    //             console.log('results', results)
    //           }
    //         }
    //
    //         var createMarker = function (place) {
    //           $scope.map = map
    //           $scope.map.markers = []
    //
    //           var marker = new google.maps.Marker({
    //                 map: map,
    //                 position: place.geometry.location
    //             });
    //
    //             console.log('position', place.geometry.location)
    //             console.log('marker', marker)
    //           google.maps.event.addListener(marker, 'click', function() {
    //             infoWindow.setContent(place.name);
    //             infoWindow.open(map, this);
    //          });
    //
    //          bounds = new google.maps.LatLngBounds();
    //
    //          bounds.extend(result.geometry.location);
    //          // console.log('location', marker.geometry.location)
    //
    //         console.log('position', Places[i].geometry.location)
    //         console.log('marker', marker)
    //
    //         google.maps.event.addListener(marker, 'click', function() {
    //         infoWindow.setContent(Places[i].name);
    //         infoWindow.open(map, this);
    //      });
    //      map.fitBounds(bounds);
    // $routeParams.name = marker.name
    // console.log('name', $routeParams.name)
    //
}])

app.controller("EditCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", "$firebaseArray", function($scope, $routeParams, $http, $route, $location, $firebaseArray) {
  var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")

   $scope.places = $firebaseArray(placeRef)
   console.log('in edit')
   $scope.editId = $routeParams.id
   console.log('$routeParams.id', $routeParams)
   console.log('name', $routeParams.name)


   var place = $scope.place = $routeParams
   console.log('place', place)

   $scope.delPlace = function(place) {
     console.log('delete')
     $scope.places.$remove(place)
   }

   $scope.updatePlace = function(place) {
     console.log('update')
    //  $scope.posts.$save(post)

   }
 }])

app.controller("GatherCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", "$firebaseArray", function($scope, $routeParams, $http, $route, $location, $firebaseArray) {
  var gatherRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gather")

   $scope.gathers = $firebaseArray(gatherRef)

   console.log('in gather')

   $scope.addGather = function(gather) {
     console.log('addGather')
     $scope.newGather = {
       title: gather.title,
       startDate: gather.startDate,
       endDate: gather.endDate,
       city: gather.city,
       state: gather.state,
       country: gather.country,
       name: gather.name,
       password: gather.password
     }
     console.log($scope.newGather)

   $scope.gathers.$add($scope.newGather)
     .then(function(data) {
       console.log('success')
     },
       function (err) {
         console.error('ERROR:', err);
         return null;
       })
   }
       console.log('gather', $scope.gathers)
 }])
