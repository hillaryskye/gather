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

app.controller('HomeCtrl', ['$scope', '$rootScope', '$routeParams', '$firebaseArray', '$firebaseAuth', '$location',
function($scope, $rootScope, $routeParams, $firebaseArray, $firebaseAuth, $location) {

  console.log('controller')

  $scope.add = false;
  $scope.show = false;

// console.log('cityOutside', $routeParams.city)
// console.log('rootscopeCity outsideWatch', $rootScope.city)
  var newYork = new google.maps.LatLng(40.7127837, -74.00594130000002)
  var infoWindow, service, map, placesList, marker, mapElement, latLng;

  var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gather")
  var authObj = $firebaseAuth(authRef)

  latLng = newYork;
  title = 'New York';

  // $scope.initialize = function () {
  //   mapOptions = {
  //     Zoom: 11 ,				 // zoom value
  //     Center: latLng,		 // center coordinates [specified in LatLng class]
  //   };
  //
  //   $scope.initalize();
  //
  //   mapElement = document.getElementById('map');
  //
  //   map = new google.maps.Map(mapElement, mapOptions);
  //
  //   var marker = new google.maps.Marker({
  //     position: latLng,
  //     map: map,
  //     title: title
  //   });
  // }

// For getting the city to use in the Firebase Weather APP
  // $scope.$watch('search', function(newValue, oldValue) {
  //   if (newValue && newValue != oldValue) {
  //     // console.log('newValue', newValue.password)
  //     $routeParams.password = newValue.password
  //     $routeParams.city = newValue.city
  //     $routeParams.temperature = newValue.temperature
  //     console.log('city in watch', $routeParams.city)
  //     console.log('newValue', newValue)
  //       // $scope.gather.password = newValue.password
  //       // console.log('gather.password', $scope.gather.password)
  //     console.log('routeParams.city', $routeParams.city)
  //     $rootScope.password = newValue.password
  //     $rootScope.city = newValue.city
  //     $scope.gathers.weatherCity = newValue.city
  //
  //     // console.log('weathTemp 1st', $scope.data.temperature)
  //     // console.log('rootscopeCity in Watch', $rootScope.city)
  //     // console.log('TempData', $scope.data.temperature)
  //     //
  //     // console.log('rootscope pw', $rootScope.password)
  //     // console.log('routeParamTemp 1st', $routeParams.temperature)
  //     // console.log('rootscopeTemp 1st', $rootScope.temperature)
  //
  //     // $scope.weatherFn();
  //     // $scope.findCityLocation();
  //   }
  // })

  var gatherRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gathers")
  $scope.gathers = $firebaseArray(gatherRef)

      $scope.changeCity = function($scope) {
      debugger;
      // console.log('search', search)

      // $scope.search = search
      console.log('$scope', $scope)

      // $scope.newCity = {
      //   lat: $scope.lat,
      //   long: $scope.long,
      //   latLng: $scope.latLng,
      //   city: $scope.city,
      //   mapElement: $scope.mapElement,
      //   map: $scope.map,
      //   mapOptions: $scope.mapOptions,
      //   marker: $scope.marker
      // }
      // console.log($scope.newCity)
      //
      // $scope.gathers.$add($scope.newCity)
      //   .then(function(data) {
      //       console.log('success')
      //     },
      //     function(err) {
      //       console.error('ERROR:', err);
      //       return null;
      //     })
      //     return $scope.search;
      };


      //   var newCity = null;
      //
        // var geocoder =  new google.maps.Geocoder();
        //
        // // Get lat long for selected gather event
        // geocoder.geocode( { 'address': search.city + ', us'}, function(results, status) {
        //   debugger;
        //
        //     if (status == google.maps.GeocoderStatus.OK) {
        //       var lat = results[0].geometry.location.lat()
        //       var long = results[0].geometry.location.lng()
        //       $scope.search.lat = lat;
        //       search.lat = lat;
        //
        //       $scope.search.long = long;
        //       search.long = long;
        //
        //       console.log("lat", lat)
        //       console.log("long", long);
        //       console.log('search.lat', search.lat)
        //
        //     } else {
        //       console.log("Something got wrong " + status);
        //     }
        //
        //     newCity = new google.maps.LatLng(lat, long)
        //
        //     common.rootScope.$broadcast('search', search);
        //
        //     $scope.weatherFn(search);
        //   });


    //   $scope.weatherFn = function(search) {
    //   gatherRef.on("child_added", function(snapshot, prevChildKey) {
    //     if (search.city === $scope.gathers.weatherCity) {
    //
    //         var temp = snapshot.val();
    //         var city = temp.city.split(" ").join("").toLowerCase()
    //         $scope.data.city = city;
    //         $scope.gathers.weatherCity = city
    //         var weatherCity = $scope.gathers.weatherCity
    //         console.log('city', weatherCity)
    //       // var searchCity = search.city.toLowerCase();
    //       // console.log('searchCity', searchCity)
    //
    //
    //       var weatherRef = new Firebase('https://publicdata-weather.firebaseio.com/' + weatherCity + '/currently');
    //       weatherRef.child('temperature').on('value', function(snapshot) {
    //
    //           var temperature = snapshot.val()
    //
    //           search.temperature = temperature;
    //           console.log('Temp', search.temperature)
    //
    //         weatherRef.child('summary').on('value', function(snapshot) {
    //           search.summary = snapshot.val()
    //           console.log('summary', search.summary)
    //         })
    //         return;
    //       });
    //       return;
    //     }
    //   })
    //   // latLng = newCity;
    //   // title = search.city;
    //   //
    //   // initialize();
    //
    //   $scope.initAutocomplete(search);
    // }

    // initAutocomplete = function() {
    // $scope.findCityLocation();
    $scope.placeSearch = function(place) {
      debugger;
      console.log('place Submitted')
      console.log('$scope.search', $scope.search)
      console.log('$scope.map', $scope.map)
      console.log('map', map)
      var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")
      $scope.places = $firebaseArray(placeRef)

      var service = new google.maps.places.PlacesService(map);

      // if code is empty, it prevents placesearch from taking place
      if (!$scope.place.code) {
        return;
      }

      $scope.places.code = place.code
      console.log('placeCode', $scope.places.code)

      var request = {
        location: $scope.search.city,
        radius: 50,
        query: place.query
      };

      var infoWindow = new google.maps.InfoWindow();
      // placesList = document.getElementById('places');
      // service = new google.maps.places.PlacesService(map);

      service.textSearch(request, callback);
      $scope.add = false;
      // return;
    };

    var callback = function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          $scope.map = map
          $scope.map.markers = []
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

    var createMarker = function(place) {
      console.log('place', place);
      var placeLoc = place.geometry.location;

      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
      });
      // $scope.map = map
      // $scope.map.markers = []

      bounds = new google.maps.LatLngBounds();
      console.log('bounds', bounds)

      var request = {
        reference: place.reference
      };

      service.getDetails(request, function(details, status) {
        console.log('details', details)

        // if (status == google.maps.places.PlacesServiceStatus.OK) {

          //   google.maps.event.addListener(marker, 'click', function() {
          //     infoWindow.setContent(place.name);
          //     // infoWindow.open(map, this);
          //
          //     infoWindow.open(map, marker);
          //     console.log('clicked', place.name)
          //  });

          $scope.map.markers.push({
            name: result.name,
            latitude: result.geometry.location.lat(),
            longitude: result.geometry.location.lng(),
            phone: result.formatted_phone_number,
            website: result.website,
            // html: result.html_attributions[0],
            rating: result.rating,
            priceLevel: result.price_level,
            address: result.formatted_address,
            userRatings: result.user_ratings_total,
            id: result.id,
            // photos: result.photos[0],
            animation: google.maps.Animation.DROP,
            password: $scope.place.code
          });
          console.log('$scope.map.markers', $scope.map.markers)

          console.log('geometry.lat', result.geometry.location.lat())
          var extend = bounds.extend(result.geometry.location);
          console.log('extend', extend)

          google.maps.event.addListener(marker, 'click', function() {
            debugger;

            var content = details.name + '<br>' +
                          details.formatted_address + '<br>' +
                          'Phone: ' + details.formatted_phone_number + '<br>' +
                          'Website: ' + details.website + '<br>' +
                          'Rating: ' + details.rating + '<br>' +
                          'Price Level: ' + details.price_level + '<br>' +
                          'User Ratings: ' + details.user_ratings_total + '<br>' +
                          details.photos[0].html_attributions[0];



            infoWindow.setContent(content);

            // <a href="/#/gather/places/{{marker.password}}/new" target="_self" ng-click="addPlace(marker)">{{marker.name}}</a>

            // <div class="container marker border-opacity" ng-repeat="marker in map.markers track by $index | orderBy : 'name'">
            //    <!-- <a href="#" class="red" ng-click="openInfoWindow($event, marker)">{{marker.name}}</a> -->
            //    <p><a href="/#/gather/places/{{marker.password}}/new" target="_self" ng-click="addPlace(marker)">{{marker.name}}</a></p>
            //   <p>Address: {{marker.address}}</p>
            //   <p>Phone: {{marker.phone}}</p>
            //   <p>Website: <a href="{{marker.website}}">{{marker.website}}</a></p>
            //   <p>Rating: {{marker.rating}}</p>
            //   <p>User Ratings: {{marker.userRatings}}</p>
            //   <p>Price Level: {{marker.priceLevel}}</p>
            //   </div>
            // infoWindow.open(map, this);

            infoWindow.open(map, marker);
            console.log('clicked', place.name)
          });
        // }
        map.fitBounds(bounds);
        $scope.$apply();
        console.log('apply')
      });
    }
    $scope.logout = function() {
      console.log('logout')
      authObj.$unauth()
      $location.path('/')
    }

    // initAutocomplete();
  // }

  //   $scope.openInfoWindow = function(e, selectedMarker){
  //      var infoWindow = new google.maps.InfoWindow();
  //      e.preventDefault();
  //      console.log('openInfoWindow', openInfoWindow)
  //      infoWindow.setContent('<h2>' + selectedMarker.name + '</h2>');
  // }

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
  $scope.addForm = function() {
    if ($scope.add === false) {
      $scope.add = true;
    } else if ($scope.add === true) {
      $scope.add = false;
    }
  }

  $scope.removeMarkers = function() {
    // Clear out the old markers.
  }

  // $scope.initAutocomplete();

}]);

app.controller("NewCtrl", ["$scope", "$rootScope", "$firebaseArray", "$routeParams", "$http", "$route", "$location", "$timeout", "$window", "$firebaseAuth", function($scope, $rootScope, $firebaseArray, $routeParams, $http, $route, $location, $timeout, $window, $firebaseAuth) {

  console.log('in new controller')
  console.log('password', $routeParams.password)
  console.log('temp in new', $scope.temp)
    // $scope.search = $routeParams.password
  console.log('rootScope.pw in new', $rootScope.password)
  console.log('$routeParams.pw in new', $routeParams.password)

  var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/users")
  var authObj = $firebaseAuth(authRef)

  $scope.users = $firebaseArray(authRef)

  var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")
  // var currentGather = placeRef.child()
  var Places = $scope.places = $firebaseArray(placeRef)

  initAutocomplete = function() {

    var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(41.884113, -87.64800400000001),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    var mapElement = document.getElementById('map');
    console.log(mapElement);
    var drawingManager = new google.maps.drawing.DrawingManager();

    var map = new google.maps.Map(mapElement, mapOptions);
    drawingManager.setMap(map);
    // google.maps.event.trigger(map, 'resize');


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

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(marker.title);
        infoWindow.open(map, marker);
      });

      // markers.push(marker);
      // console.log('markers', markers)
      bounds = new google.maps.LatLngBounds();
      // bounds.extend(temp.geometry.location);
      // }

      $scope.openInfoWindow = function(e, selectedMarker) {
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

      google.maps.event.addListener(marker, 'click', function() {
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

      $scope.openInfoWindow = function(e, selectedMarker) {
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

      google.maps.event.addListener(marker, 'click', function() {
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

      $scope.openInfoWindow = function(e, selectedMarker) {
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

  // function initalize() {
  //   var newYork = new google.maps.LatLng(40.7127837, -74.00594130000002)
  //
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: newYork,
  //     zoom: 12
  //   });
  //   google.maps.event.addDomListener(window, "load", initialize);
  // }

//   initalize();
//
//   function initalize() {
//     mapOptions = {
//     Zoom: 11 ,				 // zoom value
//     Center: newYork,		 // center coordinates [specified in LatLng class]
//   };
//
//   mapElement = document.getElementById('map');
//
//   map = new google.maps.Map(mapElement, mapOptions);
//
//   var marker = new google.maps.Marker({
//     position: newYork,
//     map: map,
//     title: search.name
//   });
// }

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
        function(err) {
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
  // initalize();
}]);
