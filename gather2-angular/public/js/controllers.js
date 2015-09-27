app.controller('HomeCtrl', function($scope, $routeParams) {
  console.log('controller')
  var newYork = new google.maps.LatLng(40.7127837, -74.00594130000002)
  var infoWindow = new google.maps.InfoWindow();

  initAutocomplete = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: newYork,
      zoom: 15
    });

    var service = new google.maps.places.PlacesService(map);

    $scope.placeSearch = function (place) {
        var request = {
          location: newYork,
          radius: 50,
          query: place.query
        };
        console.log('position', request.position)
        console.log('radius', request.radius)
        console.log('query', request.query)
        // var map = $scope.map.control.getGMap();
        // map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var service = new google.maps.places.PlacesService(map);
        console.log('map', map)
        service.textSearch(request, callback);
        return;
      };

      var callback = function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            }
          }
        }

  var createMarker = function (place) {
    $scope.map = map
    $scope.map.markers = []
    console.log('map, $scope.Map')

    var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
      });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
   });

     bounds = new google.maps.LatLngBounds();

    var request = {
      reference: place.reference
    };
    var detail = new google.maps.places.PlacesService($scope.map);
    console.log('detail', detail)

    detail.getDetails(request, function(result, status) {
      console.log('result', result)
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        $scope.map.markers.push({
          name: result.name,
          latitude: result.geometry.location.lat(),
          longitude: result.geometry.location.lng(),
          // position: result.geometry.location,
          showWindow: false,
          phone: result.formatted_phone_number,
          website: result.website,
          html: result.html_attributions[0],
          rating: result.rating,
          priceLevel: result.price_level,
          address: result.formatted_address,
          userRatings: result.user_ratings_total,
          animation: google.maps.Animation.DROP
        });
        // console.log('position', position)
        console.log('markers', $scope.map.markers)
        $scope.$apply();

        bounds.extend(result.geometry.location);
        // console.log('location', marker.geometry.location)
      }
       map.fitBounds(bounds);
    });
  }
}
$scope.openInfoWindow = function(e, selectedMarker){
     var infoWindow = new google.maps.InfoWindow();
     e && e.preventDefault();

     infoWindow.setContent('<h2>' + selectedMarker.name + '</h2>');
    //  infoWindow.setOptions();
    //  infoWindow.open(map, selectedMarker);
     $scope.markerId = $scope.map.markers.indexOf(selectedMarker);

 }

$scope.closeClick = function (marker) {
  marker.showWindow = false;
};
$scope.onMarkerClicked = function (marker) {
  marker.showInfoWindow(marker)
  // marker.showWindow = true;
  $scope.map.marker = {
    name: marker.name,
    phone: marker.phone,
    website: marker.website,
    html: marker.html,
    type: marker.type
  }
};
$scope.removeMarkers = function () {
  $scope.map.markers.length = 0;
};

  initAutocomplete()
});
