app.service('MapService', function($q) {
  var MarkersList = {}
  MarkersList.markers = []
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
        places = new google.maps.places.PlacesService(map);
        bounds = new google.maps.LatLngBounds();
    }

    console.log('here')
    MarkersList.search = function(str) {
        var d = $q.defer();
        places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                MarkersList.markers = results;
                // console.log('markersList', MarkersList.markers)
                d.resolve(MarkersList.markers);
            }
            else d.reject(status);
        });
        return d.promise;
    }

    MarkersList.addMarker = function(places) {
        var marker = new google.maps.Marker({
            map: map, // this puts the marker on the map
            title: places.name,
            rating: places.rating,
            priceLevel: places.price_level,
            address: places.formatted_address,
            position: places.geometry.location,
            animation: google.maps.Animation.DROP
        });

        console.log('position', marker.position)
        // var marker = marker

        MarkersList.openInfo = function() {
          var infoWindow = new google.maps.InfoWindow();

          console.log('marker', marker)
          google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(marker.title);
              infoWindow.open(map, marker);
              console.log('title', marker.title)
           });
        }

      for (var i = 0; i < places.length; i++) {
      // To add the marker to the map, call setMap();
        if(places[i]) places[i].setMap(null); // removes marker from map
            MarkersList.markers.push(marker)
            bounds = new google.maps.LatLngBounds();
          }
          console.log('list', MarkersList.markers)
          // console.log('markersList', MarkersList.markers)
            bounds.extend(marker.position);
          //center the map to a specific spot (city)
         map.fitBounds(bounds);
        //  this.map.setZoom(15)
        return marker;
    }
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
          MapService.search($scope.searchPlace)
          .then(
            function(markers) { // success
              for (var i = 0; i < markers.length; i++) {
                $scope.places = markers
                  MapService.addMarker(markers[i]);
                //   $scope.places = {
                //   $scope.places.name = markers[i].name;
                //   $scope.places.address = markers[i].formatted_address
                //   $scope.places.rating = markers[i].rating
                //   $scope.places.priceLevel = markers[i].price_level
                  //  $scope.places.lat = markers[i].geometry.location.lat();
                  //  $scope.places.lng = markers[i].geometry.location.lng();
                // }
                MapService.openInfo(markers[i])

                // google.maps.event.addListener($scope.places[i], 'click', function(){
                //   MapService.infoWindow.setContent('<h2>' + $scope.places[i].name + '</h2>');
                //   infoWindow.open($scope.places[i].map, $scope.places[i]);
                // });
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
         MapService.openInfo.infoWindow.open(MapService.addMarker.map, selectedMarker);

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
console.log('id', $routeParams.id)
  $scope.getDetails = function() {
    var request = {
        placeId: marker.id
      };

      service = new google.maps.places.PlacesService(map);
      service.getDetails(request, callback);

      function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          createMarker(place);
        }
        console.log('request', request)
        console.log('place', place)
      }
    }
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
