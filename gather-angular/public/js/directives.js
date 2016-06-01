app.directive('googleMap', function () {
  console.log('directive')
  return {
    restrict: "AE",
    replace: true,
    scope: {
      city: "="
    },
    controller: ['$scope', '$element', '$attrs', '$rootScope', 'GoogleMapService', function ($scope, $element, $attrs, $rootScope, GoogleMapService) {

    $scope.markers = [];
    $scope.counter = 0;
    var title = '';

    // Enable the visual refresh
    // google.maps.visualRefresh = true;

    // Create marker if none were brought in from controller
    // var initializeMap = function () {

      // debugger;
      //
      // console.log('googleMap')
      // if (newMap) {
      //   return;
      // }
      //
      // latLng = new google.maps.LatLng(40.7127837, -74.00594130000002);
      //
      // // if (!$scope.city) {
      // //   $scope.city = 'new york'
      // // }
      //   var mapOptions = {
      //       zoom: 11,
      //       center: latLng,
      //       mapTypeId: google.maps.MapTypeId.ROADMAP
      //   };
      //
      // mapElement = document.getElementById('addressMap');
      //
      // newMap = new google.maps.Map(mapElement, mapOptions);
      //
      // $rootScope.$emit('newMap', newMap);
      // // $rootScope.$broadcast('newMap', newMap)
      // // $rootScope.newMap = newMap;
      // $scope.map = newMap;
      // console.log('newMap from Directive', newMap)
      // // getMarker();
      // // $scope.$broadcast('newMap', newMap)
      // };

      // initializeMap();

      var getMarker = function () {
      // var infowindow;
      var infoWindow = new google.maps.InfoWindow;

      if (marker) {
          return;
      }
      debugger;

      $scope.mapData = GoogleMapService;
      var mapData = $scope.mapData;
      var newMap = mapData.map;

      var markerOptions = {
        map: newMap,
        position: mapData.latLng,
        animation: mapData.animation
      }

      var marker = new google.maps.Marker(markerOptions);
      console.log('single marker', marker)

      marker.setMap(newMap);

      google.maps.event.addListener(marker, 'click', function($scope) {
        debugger;
        // if (infowindow) {
        //   infowindow.close();
        // }
        if (!$scope.city) {
          title = 'New York';
        }

        else {
          title = $scope.city;
        }

        var contentString = title
        infoWindow.setContent(contentString);
        // $compile(infoWindow.content)($scope);
        infoWindow.open(newMap, marker);

        // console.log('clicked', title)
      });
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
        debugger;
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': $scope.city + ', us'},

        function (results, status) {
          debugger;
          console.log('inside')
            if (status == google.maps.GeocoderStatus.OK) {
              debugger;
              console.log('status', status)
              var lat = results[0].geometry.location.lat()
              var long = results[0].geometry.location.lng()

              latLng = new google.maps.LatLng(lat, long)

              console.log('latLong', latLng)

              $scope.mapData = GoogleMapService;
              var mapData = $scope.mapData;
              var newMap = mapData.map;

                newMap.setCenter(latLng);

                getMarker();
            } else {
                alert("Geocode was not successful for the following reason: " + status);
              }
          });
        };

    var newMarker = [];

    var addMarkers = function () {
      var infowindow = new google.maps.InfoWindow();
      $scope.counter = 0;
      $scope.newMarkers = [];

        for (var i=0; i < $scope.markers.length; i++) {
          marker = $scope.markers
          var markerLat = $scope.markers[i].latitude;
          var markerLong = $scope.markers[i].longitude;
          var latLong = new google.maps.LatLng(markerLat, markerLong);
          var name = $scope.markers[i].name;
          console.log('name', name)

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

          var markerOptions = {
            map: map,
            position: latLng,
            title: name,
            animation: map.animation
          }

          var newMarker = new google.maps.Marker(markerOptions);

          google.maps.event.addListener(newMarker, 'click', function() {

          var contentString = marker[i].name + '<br>' +
                        marker[i].address + '<br>' +
                        'Phone: ' + marker[i].phone + '<br>' +
                        'Website: ' + marker[i].website + '<br>' +
                        'Rating: ' + marker[i].rating + '<br>' +
                        'Price Level: ' + marker[i].priceLevel + '<br>' +
                        'User Ratings: ' + marker[i].rating + '<br>'

          // infoWindow.setContent(content);

          var infowindow = new google.maps.InfoWindow({
              content: content
            });

            google.maps.event.addListener(newMarker, 'click', function($scope, $compile) {
              debugger;
              // if (infowindow) {
              //   infowindow.close();
              // }
              if (!$scope.city) {
                $scope.city = 'New York';
              }

              infoWindow.setContent(contentString);
              // $compile(infoWindow.content)($scope);
              infoWindow.open(newMap, newMarker);

              console.log('clicked', $scope.city)
            });

          newMap.setCenter(latLong);
          //  $scope.$apply;
          });
          $scope.newMarkers.push(newMarker);
          console.log('$scope.newMarkers', $scope.newMarkers)

          // To add the marker to the map, call setMap();
          newMarker.setMap(map);

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
        debugger;
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
