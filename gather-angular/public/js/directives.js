app.directive('googleMap', function() {
  console.log('directive')
  debugger;
  return {
    restrict: "A",
    replace: true,
    scope: {
      city: "=",
      map: "&map"

    },
    controller: function ($scope) {

  // link: function (scope, element, attrs) {
    debugger;

    var mapElement;
    // var map;

    var initializeMap = function () {
      console.log('googleMap')
      debugger;

      latLng = new google.maps.LatLng(40.7127837, -74.00594130000002);

      // if (!$scope.city) {
      //   $scope.city = 'new york'
      // }
        var mapOptions = {
            zoom: 11,
            center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

      mapElement = document.getElementById('addressMap');

      $scope.map = new google.maps.Map(mapElement, mapOptions);
      };

      var markAdressToMap = function () {
        debugger;

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': $scope.city + ', us'},

        function (results, status) {
          console.log('inside')
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('status')

              var lat = results[0].geometry.location.lat()
              var long = results[0].geometry.location.lng()

              latLng = new google.maps.LatLng(lat, long)

              console.log('latLong', latLng)
                map.setCenter(latLng);

                var markerOptions = {
                  map: $scope.map,
                  position: latLng,
                  title: $scope.city,
                  animation: google.maps.Animation.Bounce
                }
                // console.log('map', map)
                // $scope.map = map;
                console.log('$scope.map', $scope.map)

                var marker = new google.maps.Marker(markerOptions);
            }
        });
    };

      $scope.$watch("city", function () {
        debugger;
        if ($scope.city != undefined) {
          debugger;
            markAdressToMap();
        }
      });

      initializeMap();
    }
  };
  // }
});
