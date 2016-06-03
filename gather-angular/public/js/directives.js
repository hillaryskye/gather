app.directive('googleMap', function () {
  console.log('directive')
  return {
    restrict: "E",
    replace: true,
    scope: {
      city: "="
    },
    controller: ['$scope', '$element', '$attrs', '$rootScope', '$compile', 'GoogleMapService', function ($scope, $element, $attrs, $rootScope, $compile, GoogleMapService) {

    $scope.markers = [];
    $scope.counter = 0;
    // var title = '';

    // Enable the visual refresh
    // google.maps.visualRefresh = true;

      var getMarker = function () {
      // if (marker) {
      //     return;
      // }
      debugger;

      // console.log('newCenter from getMarker', newCenter)

      if (!$scope.mapData) {
        $scope.mapData = GoogleMapService;
        var mapData = $scope.mapData;
        var newMap = mapData.map;
      }

      console.log('$scope.mapData.lat', $scope.mapData.lat)
      console.log('$scope.mapData.newCenter', $scope.mapData.newCenter)

      // if (newCenter) {
      //   mapData.center = newCenter;
      // }

      var infoWindow = new google.maps.InfoWindow();

      if ($scope.mapData.contentString) {
        var contentString = $scope.mapData.contentString;

      } else if (!$scope.city) {
        // var title = 'New York';
        contentString = '<h5> New York </h5>';
      } else {
        // var title = $scope.city;
        contentString = $scope.city;
      }

      var markerOptions = {
        map: $scope.mapData.map,
        position: $scope.mapData.center,
        animation: $scope.mapData.animation,
        title: $scope.mapData.contentString
      }

      var marker = new google.maps.Marker(markerOptions);
      $scope.marker = marker;

      marker.setMap($scope.mapData.map);

      google.maps.event.addListener(marker, 'click', function($scope) {
        debugger;

          infoWindow.setContent(contentString);
          infoWindow.open(marker.map, marker);

        if (infoWindow && $scope.markers) {
          infoWindow.close();
        }
      })
    }

    getMarker();

      // $scope.newMap = newMap;

      // var bikelayerFn = function () {
      //   var bikeLayer = new google.maps.BicyclingLayer();
      //     bikeLayer.setMap(map);
      // }
      //
      // var transitLayerFn = function () {
      //   var transitLayer = new google.maps.TransitLayer();
      //     transitLayer.setMap(map);
      // }

      // console.log('$scope.map Directive', map)

      var markAdressToMap = function () {

        if (!$scope.city) {
          return;
        }

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': $scope.city + ', us'},

        function (results, status) {
          console.log('inside')
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('status', status)
              var lat = results[0].geometry.location.lat()
              var long = results[0].geometry.location.lng()

              var center = new google.maps.LatLng(lat, long)

              if (!$scope.mapData) {
                $scope.mapData = GoogleMapService;
              }

              // Reassign center variable with selected city
              $scope.mapData.newCenter = center;
              $scope.mapData.center = center;
              $scope.mapData.lat = lat;
              console.log('lat', $scope.mapData.lat)

              $scope.mapData.map.setCenter(center);

              getMarker();

            } else {
                alert("Geocode was not successful for the following reason: " + status);
              }
          });
        };

    var newMarker = [];

    var addMarkers = function () {
      // var infoWindow = new google.maps.InfoWindow();
      $scope.counter = 0;
      $scope.newMarkers = [];

        for (var i=0; i < $scope.markers.length; i++) {
          marker = $scope.markers
          var markerLat = $scope.markers[i].latitude;
          var markerLong = $scope.markers[i].longitude;
          var center = new google.maps.LatLng(markerLat, markerLong);
          var name = $scope.markers[i].name;
          console.log('name', name)

          // Reassign center variable with selected city
          $scope.mapData.center = center;
          $scope.mapData.lat = markerLat;

          console.log('center from markersArr', $scope.mapData.lat)

          if (!$scope.mapData) {
            $scope.mapData = GoogleMapService;
          }

          $scope.mapData.map.setCenter(center);

          var contentString = '<h4>' + marker[i].name + '</h4><br>' +
                        marker[i].address + '<br>' +
                        'Phone: ' + marker[i].phone + '<br>' +
                        'Website: <a href="' + marker[i].website + '"><br>' +
                        'Rating: ' + marker[i].rating + '<br>' +
                        'Price Level: ' + marker[i].priceLevel + '<br>' +
                        'User Ratings: ' + marker[i].rating + '<br>';

          $scope.mapData.contentString = contentString;

          getMarker();
          // function drop() {
          //   clearMarkers();
          //   for (var i = 0; i < neighborhoods.length; i++) {
          //     addMarkerWithTimeout(neighborhoods[i], i * 200);
          //   }
          // }

          // If you're adding a number of markers, you may want to drop them on the map
          // consecutively rather than all at once. This example shows how to use
          // window.setTimeout() to space your markers' animation.
          // function addMarkerWithTimeout(latLng, timeout) {
          //   window.setTimeout(function() {
          //     newMarkers.push(new google.maps.Marker({
          //       position: latLng,
          //       map: newMap,
          //       title: name,
          //       animation: google.maps.Animation.DROP
          //     }));
          //   }, timeout);
          // }
          //
          // function clearMarkers() {
          //   for (var i = 0; i < markers.length; i++) {
          //     markers[i].setMap(null);
          //   }
          //   markers = [];
          // }

          // $scope.mapData = GoogleMapService;
          // var mapData = $scope.mapData;
          // var newMap = mapData.map;

          // var markerOptions = {
          //   map: newMap,
          //   position: latLng,
          //   title: name,
          //   animation: newMap.animation
          // }

          // var newMarker = new google.maps.Marker(markerOptions);

          // google.maps.event.addListener(newMarker, 'click', function() {



          // infoWindow.setContent(content);

          // var infowindow = new google.maps.InfoWindow({
          //     content: content
          //   });
          //
          //   google.maps.event.addListener(newMarker, 'click', function($scope, $compile) {
          //     debugger;
          //     // if (infoWindow) {
          //     //   infoWindow.close();
          //     // }
          //     if (!$scope.city) {
          //       $scope.city = 'New York';
          //     }
          //
          //     infoWindow.setContent(contentString);
          //     // $compile(infoWindow.content)($scope);
          //     infoWindow.open(newMap, newMarker);

              // console.log('clicked', $scope.city)
            // });

          // newMap.setCenter(latLong);
          // });

          $scope.newMarkers.push($scope.marker);
          console.log('$scope.newMarkers', $scope.newMarkers)

          // To add the marker to the map, call setMap();
          // $scope.marker.setMap($scope.mapData.map);

          // bounds = new google.maps.LatLngBounds();
        }
        // newMap.fitBounds(bounds);
      }

      var settingMarkers = function () {
        $scope.counter + 2
        for (var i=0; i < $scope.markers.length; i++) {

          addMarkers($scope.markers[i])
          console.log('marker' + [i], newMarker.name)
        }
      }

      settingMarkers();

      $scope.$watch("city", function () {
        if ($scope.city) {
         markAdressToMap();
       }
       });

      //  $scope.$watch("newMap", function () {
      // //  if (newMap) {
      //    debugger;
      //    console.log('newMap from $watch')
      //       // initializeMap();
      //      markAdressToMap();
      // //  }
      //  });

      //  $scope.$watch("markers", function () {
      //    debugger;
      //    if ($scope.markers) {
      //      debugger;
      //         addMarkers();
      //    }
      //   //  if (!marker) {
      //   //     getMarker();
      //   //  }
      //  });

      $scope.$on('markersArr', function (event, markersArr) {
        debugger;
        if (markersArr && $scope.counter < 2) {
          $scope.markers = markersArr;
          console.log('markers from Directive', $scope.markers)

          addMarkers();
        }
        newMarkers = $scope.newMarkers
        $scope.$emit('newMarkers', newMarkers)
      });
    }
  ]};
});
