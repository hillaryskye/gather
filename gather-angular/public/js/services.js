app.factory('GoogleMapService', function () {
  debugger;
  console.log('Im first from service')
  var MapData = {}



  var latLng = new google.maps.LatLng(40.7127837, -74.00594130000002);

  var mapElement = document.getElementById('addressMap');

  var mapOptions = {
      zoom: 12,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(mapElement, mapOptions);

  // var getCenter = function () {
  //   debugger;
  //   var geocoder = new google.maps.Geocoder();
  //
  //   geocoder.geocode({ 'address': search.city + ', us'},
  //
  //   function (results, status) {
  //     console.log('inside')
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         debugger;
  //         console.log('status', status)
  //         var lat = results[0].geometry.location.lat()
  //         var long = results[0].geometry.location.lng()
  //
  //         latLng = new google.maps.LatLng(lat, long)
  //
  //         console.log('latLong', latLng)
  //           map.setCenter(latLng);
  //
  //           getMarker();
  //       } else {
  //           alert("Geocode was not successful for the following reason: " + status);
  //         }
  //     });
  //   };
  //
  //   var getCity = function (search) {
  //     console.log('city')
  //   }

  // console.log('MyMap Service', MapData)

  return MapData = {
    map: map,
    center: latLng,
    zoom: 12,
    animation: google.maps.Animation.DROP,
    // center: getCenter(),
    lat: 40.7127837,
    long: -74.00594130000002,
    latLng: latLng,
    // title: getCity()
  };
})
