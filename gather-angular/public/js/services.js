app.service('GoogleMapService', function ($q) {
  console.log('Im first from service')
  var MapData = {}

  var latLng = new google.maps.LatLng(40.7127837, -74.00594130000002);

  var mapElement = document.getElementById('addressMap');

  var mapOptions = {
      zoom: 12,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(mapElement, mapOptions);
  this.service = new google.maps.places.PlacesService(this.map);
  this.infoWindow = new google.maps.InfoWindow();
  this.mapElement = mapElement;
  this.center = latLng;

  this.search = function (place) {
    var service = new google.maps.places.PlacesService(this.map);

    var deferred = $q.defer();

    var request = {
      location: this.map.center,
      radius: 50,
      query: place.query
    };

    this.service.textSearch(request, function(results, status, pagination) {
          if (status == 'OK') {
              var res = results;
              deferred.resolve(res);

              if (pagination.hasNextPage) {
                debugger;
                var moreButton = document.getElementById('more');

                moreButton.disabled = false;

                moreButton.addEventListener('click', function() {
                  morebutton.disabled = true;
                  pagination.nextPage();
                })
              }
          }
          else deferred.reject(status);
      });
      return deferred.promise;
    };

    this.addMarker = function(res) {
      if (this.marker)
      this.marker.setMap(null);

      this.marker = new google.maps.Marker({
        map: this.map,
        position: res.geometry.location,
        title: res.name,
        animation: google.maps.Animation.DROP,
      });

      this.map.setCenter(res.geometry.location);
      this.infoWindow = new google.maps.InfoWindow();

    }

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

  // return MapData = {
  //   map: map,
  //   center: latLng,
  //   zoom: 12,
  //   animation: google.maps.Animation.DROP,
  //   // center: getCenter(),
  //   lat: 40.7127837,
  //   long: -74.00594130000002,
  //   latLng: latLng,
  //   // service: service,
  //   search: function search(res),
  //   addMarker: function addMarker(res)
  //   // title: getCity()
  // };
})
