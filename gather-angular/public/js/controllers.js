app.controller("AuthCtrl", function($scope, $rootScope, $location, $firebaseAuth, $firebaseArray) {

  var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/users")
  var authObj = $firebaseAuth(authRef)

  $scope.users = $firebaseArray(authRef)

  $scope.register = function() {
    authObj.$createUser($scope.user)
      .then(function() {
        $scope.login()
      })

  //   $scope.newUser = {
  //     name: $scope.users.name,
  //     email: $scope.users.email,
  //     password: $scope.users.password
  //   }
  //
  // $scope.users.$add($scope.newUser)
  //   .then(function(data) {
  //     console.log('success')
  //   },
  //     function (err) {
  //       console.error('ERROR:', err);
  //       return null;
  //     })
   }
    // console.log('user', $scope.users)


  $scope.login = function() {
    authObj.$authWithPassword($scope.user)
      .then(function() {
        $location.path('/gather')
      })
    }
 })

app.controller('HomeCtrl', function($scope, $rootScope, $routeParams, $firebaseArray, $firebaseAuth, $location) {
  console.log('controller')

  var newYork = new google.maps.LatLng(40.7127837, -74.00594130000002)
  var infoWindow = new google.maps.InfoWindow();

  var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gather")
  var authObj = $firebaseAuth(authRef)

   var gatherRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gathers")
    $scope.gathers = $firebaseArray(gatherRef)
    console.log('gathers', $scope.gathers)
    console.log('search', $scope.search)

    gatherRef.on("child_added", function(snapshot, prevChildKey) {
      var temp = snapshot.val();
      var city = temp.city.split(" ").join("").toLowerCase()
      $scope.gathers.weatherCity = city
      var weatherCity = $scope.gathers.weatherCity
      console.log('city', weatherCity)


      var weatherRef = new Firebase('https://publicdata-weather.firebaseio.com/' + weatherCity + '/currently');
      weatherRef.child('temperature').on('value', function(snapshot) {
      $scope.temperature = snapshot.val()
      console.log('temp', $scope.temperature)

      weatherRef.child('summary').on('value', function(snapshot) {
      $scope.summary = snapshot.val()
      console.log('summary', $scope.summary)

      weatherRef.child('time').on('value', function(snapshot) {
      $scope.time = snapshot.val()
      console.log('icon', $scope.time)
    })
  })
  });
})

$scope.$watch('search',function(newValue,oldValue){
    if (newValue && newValue!=oldValue){
      console.log('newValue', newValue.password)
      $routeParams.password = newValue.password
      console.log('routeParams.pw', $routeParams.password)
      $rootScope.password = newValue.password
      console.log('rootscope pw', $rootScope.password)
    }
})


  initAutocomplete = function() {
    // try {google;} catch (e){location.reload();}

    //  google.maps.event.addDomListener(window, 'load', initialize);
    var map = new google.maps.Map(document.getElementById('map'), {
      center: newYork,
      zoom: 15
    });

    google.maps.event.trigger(map, 'resize')

    var service = new google.maps.places.PlacesService(map);
    console.log('service', service)

    $scope.placeSearch = function (place) {
      var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")
       $scope.places = $firebaseArray(placeRef)

      $scope.places.code = place.code
      console.log('placeCode', $scope.places.code)

        var request = {
          location: newYork,
          radius: 50,
          query: place.query
        };

        var service = new google.maps.places.PlacesService(map);

        var textSearch = service.textSearch(request, callback);
        // console.log('service', service)
        // console.log('service after', textSearch)
        return;
      };

      var callback = function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          // console.log('results.length', results.length)
          // console.log('results', results)
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            }
          }
        }
        google.maps.event.trigger(map, 'resize')

      //  var detail = new google.maps.places.PlacesService(map);

        var createMarker = function (place) {
          console.log('place', place);
          $scope.map = map
          $scope.map.markers = []


         bounds = new google.maps.LatLngBounds();

        var request = {
          reference: place.reference
        };
        var detailGetDetails = service.getDetails(request, function(result, status2) {
          console.log('result', result)

          //console.log('detail', detail)
          //console.log('detail after', detailGetDetails)
          if (status2 == google.maps.places.PlacesServiceStatus.OK) {

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

        $scope.map.markers.push({
          name: result.name,
          latitude: result.geometry.location.lat(),
          longitude: result.geometry.location.lng(),
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

        bounds.extend(result.geometry.location);
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
        //  phone: marker.phone,
         code: $scope.place.code,
        //  website: marker.website,
        //  rating: marker.rating,
        //  priceLevel: marker.priceLevel,
         address: marker.address,
        //  userRatings: marker.userRatings,
         id: marker.id
       }
       if (marker.rating != undefined) {
         $scope.newPlace.rating = marker.rating
       }
       if (marker.website != undefined) {
         $scope.newPlace.website = marker.website
       }
       if (marker.priceLevel != undefined) {
         $scope.newPlace.priceLevel = marker.priceLevel
       }
       if (marker.userRatings != undefined) {
         $scope.newPlace.userRatings = marker.userRatings
       }
       if (marker.phone != undefined) {
         $scope.newPlace.phone = marker.phone
       }


      $scope.places.$add($scope.newPlace)
        .then(function(data) {
          console.log('success')
        }).catch(function(error) {
          console.log('Error!');
          console.log('$scope.places in home', $scope.places)
     })
}

$scope.removeMarkers = function () {
  // Clear out the old markers.
  }

  initAutocomplete()
});

app.controller("NewCtrl", ["$scope", "$rootScope", "$firebaseArray", "$routeParams", "$http", "$route", "$location", "$timeout", "$window", "$firebaseAuth", function($scope, $rootScope, $firebaseArray, $routeParams, $http, $route, $location, $timeout, $window, $firebaseAuth) {

  console.log('in new controller')
  console.log('temp in new', $scope.temp)
  // $scope.search = $routeParams.password
  console.log('rootScope.pw in new', $rootScope.password)
  $scope.search = $rootScope.password


  console.log('search', $scope.search)
  console.log('$routeParams.pw in new', $routeParams.password)

  var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/users")
  var authObj = $firebaseAuth(authRef)

  $scope.users = $firebaseArray(authRef)

  var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")
    var Places = $scope.places = $firebaseArray(placeRef)

  initAutocomplete = function() {

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(41.884113, -87.64800400000001),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        google.maps.event.trigger(map, 'resize')

        console.log('map in new', map)
        // var markers = [];

        var infoWindow = new google.maps.InfoWindow();

        // Retrieve new posts as they are added to our database
        placeRef.on("child_added", function(snapshot, prevChildKey) {
          var temp = snapshot.val();

            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(temp.latitude, temp.longitude),
                title: temp.name
            });
             marker.content = temp.name

            google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(marker.title);
            infoWindow.open(map, marker);
            });

            // markers.push(marker);
            // console.log('markers', markers)
            bounds = new google.maps.LatLngBounds();
            // bounds.extend(temp.geometry.location);
          // }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }

      //  map.fitBounds(bounds);
      });
 }

    initAutocomplete()

    $scope.logout = function() {
      console.log('logout')
      authObj.$unauth()
      $location.path('/')
    }
}])

app.controller("EditCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", "$firebaseArray", "$firebaseAuth", function($scope, $routeParams, $http, $route, $location, $firebaseArray, $firebaseAuth) {
  google.maps.event.trigger(map, 'resize')
  var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/users")
  var authObj = $firebaseAuth(authRef)

  $scope.users = $firebaseArray(authRef)

  var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")

   $scope.places = $firebaseArray(placeRef)
   $scope.editId = $routeParams.id
   console.log('$routeParams.id', $routeParams)
   console.log('name', $routeParams.name)

   var place = $scope.place = $routeParams
   console.log('place', place)

   initAutocomplete = function() {

     placeRef.orderByChild("id").equalTo($routeParams.id).on("child_added", function(snapshot) {
       console.log('temp', snapshot.key());
       var temp = snapshot.val();
       console.log('temp', temp);

         var mapOptions = {
             zoom: 14,
             center: new google.maps.LatLng(temp.latitude, temp.longitude),
             mapTypeId: google.maps.MapTypeId.TERRAIN
         }
         $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

         $scope.markers = [];

         var infoWindow = new google.maps.InfoWindow();

         console.log('newTest', temp.name)
         console.log('inside loop')
         console.log('in createMarker')

         var marker = new google.maps.Marker({
             map: $scope.map,
             position: new google.maps.LatLng(temp.latitude, temp.longitude),
             title: temp.name
         });
         console.log('marker.position', marker.position)
          marker.content = temp.name

         google.maps.event.addListener(marker, 'click', function(){
             infoWindow.setContent(marker.title);
             infoWindow.open($scope.map, marker);
         });

         if (marker.id === $routeParams.id) {
           var markers = $scope.markers.push(marker);
           console.log('markers', markers)
           bounds = new google.maps.LatLngBounds();
         }
         // bounds.extend(temp.geometry.location);
       // }

         $scope.openInfoWindow = function(e, selectedMarker){
             e.preventDefault();
             google.maps.event.trigger(selectedMarker, 'click');
         }

       //  map.fitBounds(bounds);
       });
  }

     initAutocomplete()

   $scope.delPlace = function(place) {
     console.log('delete')
     $scope.places.$remove(place)
   }

   $scope.updatePlace = function(place) {
     console.log('update')
    //  $scope.posts.$save(post)

   }
   $scope.logout = function() {
     console.log('logout')
     authObj.$unauth()
     $location.path('/')
   }
 }])

 app.controller("ShowCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", "$firebaseArray", "$firebaseAuth", function($scope, $routeParams, $http, $route, $location, $firebaseArray, $firebaseAuth) {
   console.log('home')
   google.maps.event.trigger(map, 'resize')
   var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/users")
   var authObj = $firebaseAuth(authRef)

  //  $scope.users = $firebaseArray(authRef)

  var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")

    $scope.places = $firebaseArray(placeRef)
    console.log('in edit')
    $scope.editId = $routeParams.id
    console.log('$routeParams.id', $routeParams)
    console.log('name', $routeParams.name)

    var place = $scope.place = $routeParams
    console.log('place', place)

    initAutocomplete = function() {
      placeRef.orderByChild("id").equalTo($routeParams.id).on("child_added", function(snapshot) {
        console.log('temp', snapshot.key());
        var temp = snapshot.val();
        console.log('temp', temp);

          var mapOptions = {
              zoom: 14,
              center: new google.maps.LatLng(temp.latitude, temp.longitude),
              mapTypeId: google.maps.MapTypeId.TERRAIN
          }
          $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

          $scope.markers = [];

          var infoWindow = new google.maps.InfoWindow();

          console.log('newTest', temp.name)
          console.log('inside loop')
          console.log('in createMarker')

          var marker = new google.maps.Marker({
              map: $scope.map,
              position: new google.maps.LatLng(temp.latitude, temp.longitude),
              title: temp.name
          });
          console.log('marker.position', marker.position)
           marker.content = temp.name

          google.maps.event.addListener(marker, 'click', function(){
              infoWindow.setContent(marker.title);
              infoWindow.open($scope.map, marker);
          });

          if (marker.id === $routeParams.id) {
            var markers = $scope.markers.push(marker);
            console.log('markers', markers)
            bounds = new google.maps.LatLngBounds();
          }
          // bounds.extend(temp.geometry.location);
        // }

          $scope.openInfoWindow = function(e, selectedMarker){
              e.preventDefault();
              google.maps.event.trigger(selectedMarker, 'click');
          }

        //  map.fitBounds(bounds);
        });
   }

      initAutocomplete()

    $scope.delPlace = function(place) {
      console.log('delete')
      $scope.places.$remove(place)
    }

    $scope.updatePlace = function(place) {
      console.log('update')
     //  $scope.posts.$save(post)

    }
    $scope.logout = function() {
      console.log('logout')
      authObj.$unauth()
      $location.path('/')
    }
  }])

  app.controller("GatherCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", "$firebaseArray", "$firebaseAuth", function($scope, $routeParams, $http, $route, $location, $firebaseArray, $firebaseAuth) {
  var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/users")
  var authObj = $firebaseAuth(authRef)

  $scope.users = $firebaseArray(authRef)

   console.log('in gather')

   $scope.addGather = function(gather) {
     var gatherRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gathers")
      $scope.gathers = $firebaseArray(gatherRef)

     password = gather.password
     console.log('password', password)
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
       $scope.logout = function() {
         console.log('logout')
         authObj.$unauth()
         $location.path('/')
       }
 }]);
