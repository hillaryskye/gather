app.controller('HomeCtrl', function($scope, $routeParams) {
  function initMap() {
      var options = {
          center: new google.maps.LatLng(40.7127837, -74.00594130000002),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
}
  var map = new google.maps.Map(
    document.getElementById('map'),
    options
  );
}
$scope.placeSearch = function (place) {
  places.textSearch({query: str}, function(results, status) {
    var request = {
       query: place.query
   };
   var service = new google.maps.places.PlacesService(map);
   console.log('service', service)
   return request;
    })
 }
 initMap()
});
