app.service('MapService', function($q) {
  var MarkersList = {}
    this.init = function() {
      console.log('init')
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13
        }
        this.map = new google.maps.Map(
            document.getElementById("map"),
            options
        );
        this.places = new google.maps.places.PlacesService(this.map);
        this.bounds = new google.maps.LatLngBounds();
    }

    console.log('here')
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                MarkersList.markers = results;
                console.log('markersList', MarkersList.markers)
                d.resolve(MarkersList.markers);
            }
            else d.reject(status);
        });
        return d.promise;
    }

    this.addMarker = function(places) {
        this.marker = new google.maps.Marker({
            map: this.map, // this puts the marker on the map
            title: places.name,
            rating: places.rating,
            priceLevel: places.price_level,
            address: places.formatted_address,
            position: places.geometry.location,
            animation: google.maps.Animation.DROP
        });

      for (var i = 0; i < places.length; i++) {
      // To add the marker to the map, call setMap();
        if(places[i]) places[i].setMap(null); // removes marker from map
            MarkersList.markers.push(this.marker)
            var bounds = new google.maps.LatLngBounds();
          }
          console.log('markersList', MarkersList.markers)
            this.bounds.extend(this.marker.position);
          //center the map to a specific spot (city)
         this.map.fitBounds(this.bounds);
        //  this.map.setZoom(15)
    }
    console.log('happy', MarkersList.markers)

    return MarkersList.markers;
});

app.controller('HomeCtrl', function($scope, MapService) {
console.log('home')
    // $scope.places = {};
    $scope.markers = MapService.MarkersList;
    console.log('markers in homectrl', $scope.markers)

    $scope.search = function() {
      console.log('search')
        $scope.apiError = false;
          MapService.search($scope.searchPlace)
          .then(
            function(markers) { // success
              for (var i = 0; i < markers.length; i++) {
                console.log('markers', markers)
                $scope.places = markers
                console.log('$scope.place', $scope.places)
                  MapService.addMarker(markers[i]);
                //   $scope.places = {
                //   $scope.places.name = markers[i].name;
                //   $scope.places.address = markers[i].formatted_address
                //   $scope.places.rating = markers[i].rating
                //   $scope.places.priceLevel = markers[i].price_level
                //   $scope.places.lat = res[i].geometry.location.lat();
                //   $scope.places.lng = res[i].geometry.location.lng();
                // }

                console.log('places in loop', $scope.places)
                }
              // var infoWindow = new google.maps.InfoWindow({
              //   content: $scope.place.name
              //   });
             },
              function(status) { // error
                  $scope.apiError = true;
                  $scope.apiStatus = status;
              }
          );
          $scope.name = function() {
            console.log('name')
          }

          // google.maps.event.addListener(this.marker, 'click', function(){
          //     infoWindow.open(this.map, this.marker);
          //  });
    }

    // $scope.send = function() {
    //     alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
    // }

    MapService.init();
});


// app.controller("HomeCtrl", ["$scope", "Map", "$http",  "$routeParams", "$location", "$route", function($scope, Map, $http, $routeParams, $location, $route) {
  // $http.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Denver&key=AIzaSyAcUV0JPpHkLuGff4rpcIcfPHAFPk74gaM')
  // .then(function(response) {
  //   $scope.gathers = response.data;
  //   console.log('results', $scope.gathers)
  // }, function(response) {
  //   console.log('error')
  // });
  // console.log('home')
  //  function initAutocomplete() {
  //   console.log('autocomplete')
  //   var mapOptions = {
  //     center: {lat: -33.8688, lng: 151.2195},
  //     zoom: 13,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //    };
  //
  //     $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  //
  //   // Create the search box and link it to the UI element.
  //   // $scope.input = document.getElementById('pac-input');
  //   searchBox = new google.maps.places.SearchBox(input);
  //   console.log('input', input)
  //     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  //
  //   // Bias the SearchBox results towards current map's viewport.
  //   map.addListener('bounds_changed', function() {
  //     searchBox.setBounds(map.getBounds());
  //   });
  //
  //   $scope.markers = [];
  //   console.log('markers', markers)
  //   // [START region_getplaces]
  //   // Listen for the event fired when the user selects a prediction and retrieve
  //   // more details for that place.
  //   searchBox.addListener('places_changed', function() {
  //     $scope.places = searchBox.getPlaces();
  //     console.log('places', places)
  //     if (places.length == 0) {
  //       return;
  //     }
  //
  //     // Clear out the old markers.
  //     markers.forEach(function(marker) {
  //       marker.setMap(null);
  //     });
  //     markers = [];
  //
  //     // For each place, get the icon, name and location.
  //     var bounds = new google.maps.LatLngBounds();
  //     places.forEach(function(place) {
  //       var icon = {
  //         url: place.icon,
  //         size: new google.maps.Size(71, 71),
  //         origin: new google.maps.Point(0, 0),
  //         anchor: new google.maps.Point(17, 34),
  //         scaledSize: new google.maps.Size(25, 25)
  //       };
  //
  //       // Create a marker for each place.
  //       $scope.markers.push(new google.maps.Marker({
  //         map: map,
  //         icon: icon,
  //         title: place.name,
  //         position: place.geometry.location
  //       }));
  //
  //       // console.log(places)
  //       if (place.geometry.viewport) {
  //         // Only geocodes have viewport.
  //         bounds.union(place.geometry.viewport);
  //       } else {
  //         bounds.extend(place.geometry.location);
  //       }
  //     });
  //     map.fitBounds(bounds);
  //   });
  //   // [END region_getplaces]
  // }


// }])

app.controller("NewCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", function($scope, $routeParams, $http, $route, $location) {
  console.log('from newCtrl')

  // $scope.addGather = function(gather) {
  //   console.log('gather', gather)
  //     var gather = {
  //       name: $scope.gather.name,
  //       desc: $scope.gather.desc,
  //       topics: $scope.gather.topics,
  //       price: $scope.gather.price,
  //       physical: $scope.gather.physical,
  //       schedule: $scope.gather.schedule
  //     }
  //     $http.post('http://localhost:8080/api/gathers', gather)
  //     .then(function(response) {
  //       console.log(response)
  //       $location.path('/');
  //     }), function(response) {
  //       console.log("Invalid URL")
  //     $route.reload()
  //     }
  //   }
  }])

  app.controller("ShowCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", function($scope, $routeParams, $http, $route, $location) {
  console.log('routeParams', $routeParams.id)
  // $http.get('http://localhost:8080/api/gathers/' + $routeParams.id)
  // .then(function(response) {
  //   console.log(response)
  //   $scope.gather = response.data;
  //   console.log('response.data', response.data)
  // }, function(response) {
  //   console.log('error')
  // });
  //
  // $scope.newSubscription = function(gather) {
  //   $scope.addSubscription = false;
  //   console.log('newSubscription')
  //   console.log('gather', gather)
  //
  // var subscription = {
  //   name: gather.subscription.name,
  //   address: gather.subscription.address,
  //   email: gather.subscription.email
  // }
  //
  //   console.log('subscription', subscription)
  //   var subscriptions = gather.subscriptions || [];
  //
  //   subscriptions.push(subscription);
  //     gather.subscription.name = null
  //     gather.subscription.address = null
  //     gather.subscription.email = null
  //
  // gather.subscriptions = subscriptions
  //
  // $http.put('http://localhost:8080/api/gathers/' + gather._id, gather)
  //   .then(function(response) {
  //     console.log("added");
  // }, function(response) {
  //   console.log("Invalid URL");
  //   });
  // };
  //
  // $scope.deleteSubscription = function(gather, subscribe) {
  //   console.log('Deleting')
  //   console.log('subscribe', subscribe)
  //   var index = gather.subscriptions.indexOf(subscribe)
  //   console.log('index', index)
  //   gather.subscriptions.splice(index, 1)
  //   $http.put('http://localhost:8080/api/gathers/' + gather._id, gather)
  //   .then(function(response) {
  //      console.log("deleted.");
  //    }, function(response) {
  //      console.log("Invalid URL");
  //    });
  //  }
}])

app.controller("EditCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", function($scope, $routeParams, $http, $route, $location) {
console.log('from Editctrl')
console.log('routeparams', $routeParams.id)

// $http.get('http://localhost:8080/api/gathers/' + $routeParams.id)
//   .then(function(response) {
//     console.log(response)
//     $scope.gather = response.data;
//     console.log('response.data', response.data)
//   }, function(response) {
//     console.log('error')
//   });
//
//   $scope.editGather = function(gather) {
//     console.log('gather',gather)
//     console.log('id', $routeParams.id)
//
//     var gather = {
//       name: $scope.gather.name,
//       desc: $scope.gather.desc,
//       topics: $scope.gather.topics,
//       price: $scope.gather.price,
//       physical: $scope.gather.physical,
//       schedule: $scope.gather.schedule
//     }
//
//     $http.put('http://localhost:8080/api/gathers/' + $routeParams.id, gather)
//       .then(function(response) {
//        console.log("update");
//        $location.path('/');
//      }, function(response) {
//        console.log("Invalid URL");
//     });
//   }
//
//   $scope.deleteGather = function(gather) {
//     console.log('delete', gather)
//     $http.delete('http://localhost:8080/api/gathers/' + gather._id, gather)
//     .then(function(response) {
//       $route.reload()
//     }, function(response) {
//       console.log("Invalid URL")
//       })
//     }
}])
