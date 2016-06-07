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

app.controller('HomeCtrl', ['$scope', '$rootScope', '$routeParams', '$firebaseArray', '$firebaseAuth', '$location', 'GoogleMapService', '$timeout', '$q',
function($scope, $rootScope, $routeParams, $firebaseArray, $firebaseAuth, $location, GoogleMapService, $timeout, $q) {

  console.log('controller')

  $scope.add = false;
  $scope.show = false;

  var newYork = new google.maps.LatLng(40.7127837, -74.00594130000002)
  var infoWindow, service, placesList, marker, mapElement, latLng;

  var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gather")
  var authObj = $firebaseAuth(authRef)

  var gatherRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gathers")
  $scope.gathers = $firebaseArray(gatherRef)

    $scope.changeCity = function(search) {

      $scope.city = search.city
      console.log('city in controller', $scope.city)

    //
    // console.log('newMap Controller', newMap)

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
    //
    //   $scope.initAutocomplete(search);
    // }

    $scope.placeSearch = function(place) {
      var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")
      $scope.places = $firebaseArray(placeRef)
      var markersArr;
      $scope.markersArr = [];

      $scope.mapData = GoogleMapService;
      var mapData = $scope.mapData;
      var newMap = mapData.map;

      console.log('$scope.map controller', newMap)

      // var service = new google.maps.places.PlacesService(newMap);

      // if code is empty, it prevents placesearch from taking place
      if (!$scope.place.code) {
        return;
      }

      $scope.places.code = place.code

      // var request = {
      //   location: mapData.latLng,
      //   radius: 50,
      //   query: place.query
      // };

    //   var deferred = $q.defer();
    //
    //
    //   service.textSearch(request, function(results, status) {
    //         if (status == 'OK') {
    //             var res = results[0];
    //             deferred.resolve(res);
    //         }
    //         else deferred.reject(status);
    //     });
    //     return deferred.promise;
    //
    //   $scope.add = false;
    // };

      // deferred.resolve(

      GoogleMapService.search(place)
      .then(
        function(res) { // success
          // debugger;
          // Closes form for entering in textSearch
          $scope.add = false;

              for (var i = 0; i < res.length; i++) {
                createMarker(res[i])

              console.log('res.name' + [i], res[i].name)
            }
          // var extend = bounds.extend(results.geometry.location);
          // console.log('extend', extend)
        $scope.mapData.results = results;
        // return results;
      }
    );
  }

      $scope.markers = [];
      // var infoWindow = new google.maps.InfoWindow();

    var createMarker = function(res) {
debugger;
        var newMap = $scope.mapData.map;
        results = $scope.mapData.results;

        GoogleMapService.addMarker(res);
        var photo = '';
        var photoOptions = { 'maxWidth': 100, 'maxHeight': 100 };

        if (res.photos) {
          photo = res.photos[0].getUrl(photoOptions);
        }
        else photo = '';

        // $scope.markers.name = res.name;
        // $scope.markers.lat = res.geometry.location.lat();
        // $scope.markers.lng = res.geometry.location.lng();
        // $scope.markers.photo = photo;
        res.photo = photo;

      var request = {
        placeId: res.place_id,
        photo: res.photo
      };

      service = new google.maps.places.PlacesService(newMap);

      // $timeout(function() {
        service.getDetails(request, function(details, status) {
          // $scope.markers = [];
          debugger;
          var onePhoto;
          var photos = [];
          var photoOptions = { 'maxWidth': 100, 'maxHeight': 100 };

          if (details.photos) {
            for (var i = 0; i < details.photos.length; i++) {

              onePhoto = details.photos[i].getUrl(photoOptions)
              photos.push(onePhoto);
            }
          }
          var markersOptions = {
            name: details.name,
            latitude: details.geometry.location.lat(),
            longitude: details.geometry.location.lng(),
            phone: details.formatted_phone_number,
            website: details.website,
            photo: request.photo,
            photos: photos,
            rating: details.rating,
            priceLevel: details.price_level,
            address: details.formatted_address,
            id: details.id,
            animation: google.maps.Animation.DROP,
            password: $scope.place.code
          }
          debugger;
              $scope.markers.push(markersOptions)
              console.log('$scope.markers', $scope.markers)

            // Send markersArr data to Directive to display the markers
            if ($scope.markers.length > 19) {
              debugger;
              console.log('$scope.markers', $scope.markers)

              markersArr = $scope.markers;
              $scope.$broadcast('markersArr', markersArr);
            }

            $scope.markersList = $scope.markers;

            // google.maps.event.addListener(marker, 'click', function() {
            //   debugger;
            //   // var content = details.name + '<br>' +
            //   //               details.formatted_address + '<br>' +
            //   //               'Phone: ' + details.formatted_phone_number + '<br>' +
            //   //               'Website: ' + details.website + '<br>' +
            //   //               'Rating: ' + details.rating + '<br>' +
            //   //               'Price Level: ' + details.price_level + '<br>' +
            //   //               'User Ratings: ' + details.user_ratings_total + '<br>';
            //
            //   infoWindow.setContent(details.name + '<br>' +
            //                 details.formatted_address + '<br>' +
            //                 'Phone: ' + details.formatted_phone_number + '<br>' +
            //                 'Website: ' + details.website + '<br>' +
            //                 'Rating: ' + details.rating + '<br>' +
            //                 'Price Level: ' + details.price_level + '<br>' +
            //                 'User Ratings: ' + details.user_ratings_total + '<br>');
            //
            //   infoWindow.open(newMap, marker);
            //   console.log('clicked', place.name)
            // });

          // bounds = new google.maps.LatLngBounds();
          //
          // newMap.fitBounds(bounds);

          // var zoom = newMap.getZoom();
          // console.log('zoom', zoom)
          //
          // var markersListFn = function(markersList) {
            $scope.$apply();
          // }
        });
      // }, 3000);
    }

    $scope.$on('newMarkers', function (event, newMarkers) {
      if (newMarkers) {
        console.log('controllerMap', newMarkers);
        $scope.newMarkers = newMarkers;
        console.log('$scope.map in Controller', $scope.newMarkers)
      }
  });

    $scope.logout = function() {
      console.log('logout')
      authObj.$unauth()
      $location.path('/')
    }

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
    for (var i = 0; i < $scope.markers.length; i++) {
      if ($scope.markers[i].id == marker.id) {
          //Remove the marker from Map
          $scope.markers[i].setMap(null);

          //Remove the marker from array.
          $scope.markers.splice(i, 1);
      }
    }
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
