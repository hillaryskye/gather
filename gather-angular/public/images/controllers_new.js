app.service('MapService', function($q) {
  var MarkersList = {}
  MarkersList.markers = []
  var newYork = new google.maps.LatLng(40.7127837, -74.00594130000002)

    MarkersList.init = function() {
      console.log('init')
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13
        }
        map = new google.maps.Map(
            document.getElementById("map"),
            options
        );
        var bounds = new google.maps.LatLngBounds();
    }

    console.log('here')
    MarkersList.search = function(place) {
        // var d = $q.defer();

    //     places.textSearch({query: str}, function(results, status) {
    //         if (status == 'OK') {
    //             // MarkersList.markers = results;
    //             // console.log('markersList', MarkersList.markers)
    //             d.resolve(results);
    //         }
    //         else d.reject(status);
    //         return results;
    //     });
    //     return d.promise;
    var places = new google.maps.places.PlacesService(map);

    var request = {
        position: newYork,
       radius: 50,
       query: place.query
   };

   places.textSearch(request, callback);
   console.log('request', request)
   return;
  }

    callback = function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          addMarker(results[i]);
          console.log('callback', addMarker(results[i]))
        }
      }
    }
    MarkersList.addMarker = function(places) {
        // var marker = new google.maps.Marker({
        //     map: map, // this puts the marker on the map
        //     title: places.name,
        //     rating: places.rating,
        //     priceLevel: places.price_level,
        //     address: places.formatted_address,
        //     position: places.geometry.location,
        //     animation: google.maps.Animation.DROP
        // });

        bounds = new google.maps.LatLngBounds();

        var detail = new google.maps.places.PlacesService(map);

        var request = {
          reference: places.reference
        };

        detail.getDetails(request, function(result, status) {
          console.log('details', result)
          if (status == google.maps.places.PlacesServiceStatus.OK) {

            MarkersList.markers = result;
            console.log('MarkersList.markers', MarkersList.markers)

            var marker = new google.maps.Marker({
              map: map, // this puts the marker on the map
              name: result.name,
              position: result.geometry.location,
              // position: {
              //   latitude: result.geometry.location.lat(),
              //   longitude: result.geometry.location.lng()
              // },
              // showWindow: false,
              phone: result.formatted_phone_number,
              website: result.website,
              html: result.html_attributions[0],
              rating: result.rating,
              priceLevel: result.price_level,
              address: result.formatted_address,
              type: result.types.toString(),
              animation: google.maps.Animation.DROP
            });

        console.log('latitude', result.geometry.location.lat())
        console.log('position', result.geometry.location)
        // var marker = marker

        MarkersList.openInfo = function(marker) {
          var infoWindow = new google.maps.InfoWindow();

          google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(marker.name);
              MarkersList.open = infoWindow.open(map, marker);
           });
        }

      for (var i = 0; i < places.length; i++) {
      // To add the marker to the map, call setMap();
        if(places[i]) places[i].setMap(null); // removes marker from map
        MarkersList.markers.push(marker)

            // MarkersList.markers.push(marker)
            bounds = new google.maps.LatLngBounds();
          }
          console.log('markersList', MarkersList.markers)
          // console.log('markersList', MarkersList.markers)
            bounds.extend(marker.position);
          //center the map to a specific spot (city)
         map.fitBounds(bounds);
        //  this.map.setZoom(15)
        return markers;
    }
  })
}
    // MarkersList.details = function() {
    //   var request = {
    //       placeId: $routeParams.id
    //     };
    //
    //     service = new google.maps.places.PlacesService(map);
    //     service.getDetails(request, callback);
    //
    //     function callback(place, status) {
    //       if (status == google.maps.places.PlacesServiceStatus.OK) {
    //         createMarker(place);
    //       }
    //       console.log('request', request)
    //       console.log('place', place)
    //     }
    //     return request
    //   }
    return MarkersList;
});

app.controller('HomeCtrl', function($scope, MapService, $routeParams) {
console.log('home')
    // $scope.places = {};
    // var infoWindow = new google.maps.InfoWindow();

    $scope.markers = MapService.addMarker;

    $scope.search = function() {
      console.log('search')
        $scope.apiError = false;
          MapService.search($scope.place.query)
          .then(
            function(markers) { // success
              for (var i = 0; i < markers.length; i++) {
                $scope.places = markers
                console.log('places in search', $scope.places)
                  MapService.addMarker(markers[i]);

                MapService.openInfo(markers[i])

                google.maps.event.addListener($scope.places[i], 'click', function(){
                  MapService.infoWindow.setContent('<h2>' + $scope.places[i].name + '</h2>');
                  infoWindow.open($scope.places[i].map, $scope.places[i]);
                });
                }
             },
              function(status) { // error
                  $scope.apiError = true;
                  $scope.apiStatus = status;
              }
          );
          $scope.name = function() {
            console.log('name')
          }
    }

    $scope.openInfo = function(e, selectedMarker){
      // console.log('inside openInfoWindow', MapService.infoWindow(selectedMarker))
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
        // MapService.openInfo()
         MapService.openInfo(selectedMarker)

        $routeParams.id = selectedMarker.place_id
      console.log('routeParams', $routeParams.id)
      // $scope.markerId = $scope.markers.indexOf(selectedMarker);
      //  console.log('id after', $scope.markerId)
    }
    // $scope.send = function() {
    //     alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
    // }

    MapService.init();
});

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
  console.log('id', $routeParams.id)

  // var init = function() {
  //   MapService.details()
  //
  // }
  // init()
  // $scope.details = $routeParams
  //   $scope.init = function() {
  //     var request = {
  //         placeId: marker.id
  //       };
  //
  //       service = new google.maps.places.PlacesService(map);
  //       service.getDetails(request, callback);
  //
  //       function callback(place, status) {
  //         if (status == google.maps.places.PlacesServiceStatus.OK) {
  //           createMarker(place);
  //         }
  //         console.log('request', request)
  //         console.log('place', place)
  //       }
  //     }
  //     init()

  // $http.get('https://maps.googleapis.com/maps/api/' + $routeParams.id + '/js?key=AIzaSyB2vdzULzb50xB3ipnrTgXcNOULSVNv4Nw&libraries=places')
  // .then(function(response) {
  //   console.log(response)
  //   $scope.gather = response.data;
  //   console.log('response.data', response.data)
  // }, function(response) {
  //   console.log('error')
  // });

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
