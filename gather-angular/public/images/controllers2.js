app.controller('HomeCtrl', function($scope, $routeParams) {
    var newYork = new google.maps.LatLng(40.7127837, -74.00594130000002)

  function initMap() {
      var options = {
          center: newYork,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    //       control: {},
    //       markers: [],
    //       templateUrl: 'assets/templates/place3.html',
    //       templateParameter: {
    //         name: '',
    //         phone: '',
    //         website: '',
    //         html: '',
    //         type: '',
    //     place: '',
    //     result: ''
    // }
  }
    var map = new google.maps.Map(
      document.getElementById('map'),
      options
    );

      // bounds = new google.maps.LatLngBounds();
      //
      // map.fitBounds(bounds);
}
    var infowindow = new google.maps.InfoWindow();

  $scope.placeSearch = function (place) {
    // var location = place.geometry.location;
    // var lat = location.lat();
    // var lng = location.lng();

     var request = {
         position: newYork,
        radius: 50,
        query: place.query
    };
    var service = new google.maps.places.PlacesService(map);
    console.log('service', service)

    service.textSearch(request, callback);
    console.log('request', request)
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

        console.log('markers', $scope.map.markers)
        $scope.$apply();
        bounds.extend(result.geometry.location);
        console.log('location', result.geometry.location)
      }
      // map.fitBounds(bounds);
      // console.log('map', map)
    });
  }
  $scope.closeClick = function (marker) {
    marker.showWindow = false;
  };
  $scope.onMarkerClicked = function (marker) {
    marker.showWindow = true;
    $scope.map.templateParameter = {
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
  google.maps.event.addDomListener(window, 'load', initMap);
});
