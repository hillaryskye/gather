app.service('GoogleMapService', function ($q) {
  console.log('Im first from service')
  var MapData = {}

  var latLng = new google.maps.LatLng(40.7127837, -74.00594130000002);

  var mapElement = document.getElementById('addressMap');

  this.bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(40.7127837, -74.00594130000002)
  );

  var mapOptions = {
      zoom: 12,
      maxZoom: 13,
      center: latLng,
      bounds: this.bounds,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(mapElement, mapOptions);
  var map = this.map;
  var overlay;

  this.service = new google.maps.places.PlacesService(this.map);
  this.infoWindow = new google.maps.InfoWindow();
  this.mapElement = mapElement;
  this.center = latLng;
  // $scope.MapData.map = this.map;

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
      debugger;
      if (this.marker)
      this.marker.setMap(null);

      this.marker = new google.maps.Marker({
        map: this.map,
        position: res.geometry.location,
        title: res.name,
        draggable: true,
        maxWidth: 350,
        // scrollwheel: true,
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

app.service('mapMarkerConstructor', function (GoogleMapService) {
  debugger;

var counter = 0;
var zoom_level = 0;

// this.colors = [
      // { gold: '#ffd700;' }, { moccasin: '#FFE4B5;' }, { yellow: '#ffff00;' }
//   { darkViolet: '#9400d3;' }, { forestGreen: '#228b22;' },
//   { aquamarine: '#7fffd4;' }, { white: '#ffffff;' },
//   { black: '#000000;' }, { blue: '#0000ff;' },
//   { blueViolet: '#8a2be2' }, { brown: '#a52a2a;' },
//   { lawnGreen: '#7CFC00;' }, { coral: '#FA8072;' },
//   { cornflowerBlue: '#6495ed;' }, { darkGreen: '#006400;' },
//   { cyan: '#00ffff;' }, { darkOrchid: '#9932cc;' },
//   { deepPink: '#ff1493;' }, { dodgerBlue: '#1e90ff;' },
//   { orchid: '#DA70D6;' }, { gray: '#bebebe;' },
//   { khaki: '#f0e68c;' }, { navyBlue: '#000080;' }, { violetRed4: '#8b2252;' }
// ];

this.colors = [
  'gold', 'darkViolet', 'forestGreen', 'aquamarine', 'white', 'black', 'blue', 'blueViolet',
  'lawnGreen', 'coral', 'cornflowerBlue', 'darkGreen', 'cyan', 'darkOrchid', 'deepPink',
  'dodgerBlue', 'gold4', 'gray', 'khaki', 'navyBlue',  'violetRed4'
]

var colors = this.colors;

var overlay;

const GoogleOverlayView = function(bounds, map, args) {
  debugger;
  this.bounds = bounds;
  this.setMap(map);
  this.args = args;
  this.div = null;
};

  GoogleOverlayView.prototype = new google.maps.OverlayView();

  // overlay = new GoogleOverlayView(latLng, args, map);

  GoogleOverlayView.prototype.onAdd = function () {

    var self = this;

    if (!div) {

    var div = document.createElement('div');

    div.className = 'circle';
    div.style.background = this.args.color;
    div.style.visibility = 'visible';
    div.bounds = this.args.bounds;
    // div.style.width = this.args.labelLeft;
    // div.style.height = this.args.labelTop;
    // div.style.opacity = this.args.hover;
    // div.style.background = 'blue'

    if (typeof(self.args.marker_id) !== 'undefined') {
			div.dataset.marker_id = self.args.marker_id;
		}

    if (typeof(self.args.color) !== 'undefined') {
    	div.dataset.color = self.args.color;
    }

    if (typeof(self.args.bounds) !== 'undefined') {
    	div.dataset.bounds = self.args.bounds;
    }

    this.div = div;
    this.bounds = div.bounds;

    let panes = this.getPanes();

    panes.overlayMouseTarget.appendChild(div);

    // Ensures the center is redrawn if the map center changes
  // var me = this;
  //     this.listeners_ = [
  //     google.maps.event.addListener(this.getMap(), 'center_changed', function() {
  //       debugger;
  //
  //       me.draw();
  //     })
  //   ];
    }
  }

  GoogleOverlayView.prototype.draw = function() {
    debugger;
    var self = this;
    var map = GoogleMapService.map;

    // if (!bounds) {
    //   bounds = GoogleMapService.bounds;
    // }

    bounds = self.bounds;
    console.log('bounds in draw', bounds.H)
    // div = document.createElement('div');
    // bounds = new google.maps.LatLngBounds();

    // if (counter > 1 && counter < 3) {
    //   console.log('in counter')
    //   return;
    // }

    // let point = this.getProjection().fromLatLngToDivPixel(this.latLng);

    let point = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw = point.fromLatLngToDivPixel(bounds.getSouthWest());
    var ne = point.fromLatLngToDivPixel(bounds.getNorthEast());

    var div = this.div;

    if (point) {
    //   div.style.left = (point.x - 4) + 'px';
    //   div.style.top = (point.y - 32) + 'px';
        div.style.left = (sw.x - 4) + 'px';
        div.style.top = (ne.y - 32) + 'px';
        // div.style.left = (point.x - this.args.labelAnchor) + 'px';
        // div.style.top = (point.y - this.args.labelAnchor) + 'px';
    }
    counter++
    console.log('counter', counter)
    };

    // Set the visibility to 'hidden' or 'visible'.
  GoogleOverlayView.prototype.hide = function() {
    if (this.div) {
      // The visibility property must be a string enclosed in quotes.
      this.div.style.visibility = 'hidden';
      console.log('hidden')
    }
  };

  GoogleOverlayView.prototype.show = function() {
    if (this.div) {
      this.div.style.visibility = 'visible';
      console.log('visible')
    }
  };

  GoogleOverlayView.prototype.toggle = function() {
  if (this.div) {
    if (this.div.style.visibility === 'hidden') {
      console.log('show')
      this.show();
    } else {
      this.hide();
      console.log('hide')
    }
  }
};

GoogleOverlayView.prototype.onRemove = function() {
  debugger;
  this.div.parentNode.removeChild(this.div);
  this.div = null;
};

GoogleOverlayView.prototype.zoomDelete = function () {
  if (this.getMap()) {
  // Note: setMap(null) calls OverlayView.onRemove()
    this.setMap(null);
    console.log('deleted')
  } else {
    this.setMap(this.map);
  }
}

GoogleOverlayView.prototype.getPosition = function() {
  return this.latlng;
};

GoogleOverlayView.prototype.updateClass = function(className) {
  if ( this.div ) {
    // get reg div
    var div = this.div.childNodes[1];
    if ( div ) {
      // change class name
      div.className = className;
    }
  }
};

//   google.maps.event.addListener(overlay, "mouseover", function (e) {
//     debugger;
//     console.log('mouseover'); div.style.visibility = 'visible';
//   });


  this.GoogleOverlayView = GoogleOverlayView;
})
