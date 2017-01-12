app.service('GatherService', function ($firebaseAuth, $firebaseArray) {
      var gatherRef = {};
      var url = 'https://gather-angular-firebase.firebaseio.com/gathers';
      gatherRef = new Firebase(url)

      this.getAll = function () {
        return $firebaseArray(gatherRef);
      }
})

app.service('PlaceService', function ($firebaseAuth, $firebaseArray) {
      var placeRef = {};
      var url = 'https://gather-angular-firebase.firebaseio.com/places';
      placeRef = new Firebase(url)

      this.getAll = function () {
        return $firebaseArray(placeRef);
      }
})

// app.service('PromiseService', function ($q) {
//   this.search = function (place) {
//     var service = new google.maps.places.PlacesService(this.map);
//
//     var deferred = $q.defer();
//
//     var request = {
//       location: this.map.center,
//       radius: 50,
//       query: place.query
//     };
//
//     this.service.textSearch(request, function(results, status, pagination) {
//       if (status == 'OK') {
//           var res = results;
//           deferred.resolve(res);
//
//           if (pagination.hasNextPage) {
//             var moreButton = document.getElementById('more');
//
//             moreButton.disabled = false;
//
//             moreButton.addEventListener('click', function() {
//               morebutton.disabled = true;
//               pagination.nextPage();
//             })
//           }
//       }
//       else deferred.reject(status);
//       });
//       return deferred.promise;
//     };
// });

app.service('GoogleMapService', function ($q, $timeout) {
  console.log('Im first from service')
  var MapData = {}
  let transit, bike;

  var latLng = new google.maps.LatLng(40.7127837, -74.00594130000002);

  var mapElement = document.getElementById('addressMap');

  this.bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(40.7127837, -74.00594130000002)
  );

  var mapOptions = {
      zoom: 12,
      maxZoom: 16,
      center: latLng,
      bounds: this.bounds,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  this.map = new google.maps.Map(mapElement, mapOptions);
  var map = this.map;

  // marker = new google.maps.Marker(markerOptions);
  var overlay;

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
      if (this.marker && !this.marker.type) {
        // this.marker.setMap(null);
        this.marker.overlay.zoomDelete();
        this.clearMarkers(this.marker);
      }

      // this.marker = new google.maps.Marker({
      //   map: this.map,
      //   position: res.geometry.location,
      //   title: res.name,
      //   maxZoom: 16,
      //   type: res.types[0],
      //   draggable: true,
      //   maxWidth: 350,
      //   zoom: 12,
      //   // scrollwheel: true,
      //   animation: google.maps.Animation.DROP,
      // });

      // res = this.marker;

      // res.setMap(this.map);

      // res.map = this.marker.map;
      // res.position = this.marker.position;
      // res.title = res.name;
      // res.maxZoom = 16;
      // res.type = res.types[0];
      // res.draggable = true;
      // res.maxWidth = 350;
      // res.zoom = 12,
      // res.animation = 2;
      // res.marker = this.marker;

      // res.marker.setMap(this.map);

      this.map.setCenter(res.geometry.location);
    }
    // $timeout(function() {
      this.details = function (res) {
        debugger;

        // $timeout(function(){
        //   console.log('timeout in services', res)
        // }, 5000);
          var deferred = $q.defer();

        var request = {
          placeId: res.place_id,
          photo: res.photo,
          map: this.map
        };

          this.service.getDetails(request, function(details, status) {
              if (status == 'OK') {
                  deferred.resolve(details);
              }
              else deferred.reject(status);
          });

        return deferred.promise;
      }
      // }, 50);

    // var authRef = new Firebase("https://gather-angular-firebase.firebaseio.com/users")
    //   this.authObj = $firebaseAuth(authRef)
    //
    //   this.users = $firebaseArray(authRef)
    //
    //   var gatherRef = new Firebase("https://gather-angular-firebase.firebaseio.com/gathers")
    //   this.gatherRef = gatherRef;
    //   // this.gathers = $firebaseArray(gatherRef)
    //
    //   var placeRef = new Firebase("https://gather-angular-firebase.firebaseio.com/places")
    //   this.PlaceRef = placeRef;
    //   this.Places = $firebaseArray(placeRef)
    //
    //   this.register = function() {
    //       authObj.$createUser(this.user)
    //         .then(function() {
    //           this.login();
    //         })
    //
    //       //   $scope.newUser = {
    //       //     name: $scope.users.name,
    //       //     email: $scope.users.email,
    //       //     password: $scope.users.password
    //       //   }
    //       //
    //       // $scope.users.$add($scope.newUser)
    //       //   .then(function(data) {
    //       //     console.log('success')
    //       //   },
    //       //     function (err) {
    //       //       console.error('ERROR:', err);
    //       //       return null;
    //       //     })
    //       this.login();
    //     }
    //
    //   // $scope.login = function() {
    //   //   authObj.$authWithPassword($scope.user)
    //   //     .then(function() {
    //   //       $location.path('/gather')
    //   //     })
    //   // }
    //
    //   this.login = function() {
    //     this.authObj.$authWithPassword(this.user)
    //       .then(function() {
    //         $location.path('/gather')
    //       })
    //   }
    //
    //   this.logout = function() {
    //     debugger;
    //     console.log('logout')
    //     this.authObj.$unauth()
    //     $location.path('/')
    //   }
    //
    //   this.delPlace = function(place) {
    //     console.log('delete')
    //     this.Places.$remove(place)
    //   }
    //
    //   this.updatePlace = function(place) {
    //     console.log('update')
    //       //  $scope.posts.$save(post)
    //   }
})

app.service('mapMarkerConstructor', function (GoogleMapService) {

var counter = 0;
var zoom_level = 0;
let markerActive = false;


// this.colors = [
      // { gold: '#ffd700;' }, { moccasin: '#FFE4B5;' }, { yellow: '#ffff00;' }
//   { darkViolet: '#9400d3;' }, { forestGreen: '#228b22;' },
//   { aquamarine: '#7fffd4;' }, { white: '#ffffff;' },
//   { black: '#000000;' }, { blue: '#0000ff;' }, { darkSeaGreen: '#8fbc8f;'}
//   { blueViolet: '#8a2be2' }, { brown: '#a52a2a;' }, { crail: '#bb3e47;'}
//   { lawnGreen: '#7CFC00;' }, { sandyBrown: '#f4a460;' },
//   { cornflowerBlue: '#6495ed;' }, { darkGreen: '#006400;' },
//   { cyan: '#00ffff;' }, { darkOrchid: '#9932cc;' }
//   { deepPink: '#ff1493;' }, { dodgerBlue: '#1e90ff;' }, { pastelGreen: '#61ED96;'}
//   { orchid: '#DA70D6;' }, { silver: '#C0C0C0;' },
//   { khaki: '#f0e68c;' }, { navy: '#000080;' }
// ];

this.colors = [
  'gold', 'brown', 'forestGreen', 'aquamarine', 'white', 'black', 'blue', 'blueViolet',
  'lawnGreen', 'sandyBrown', 'cornflowerBlue', 'darkGreen', 'cyan', 'darkOrchid', 'deepPink',
  'dodgerBlue', 'darkSeaGreen', 'silver', 'khaki', 'navy', 'crail'
]

var colors = this.colors;

var overlay;

const GoogleOverlayView = function(bounds, map, args) {
  this.bounds = bounds;
  this.setMap(map);
  this.args = args;
};

  GoogleOverlayView.prototype = new google.maps.OverlayView();

  GoogleOverlayView.prototype.onAdd = function () {

    var self = this;

    if (!div) {

    var div = document.createElement('div');

    div.className = 'circle';
    div.style.background = this.args.color;
    div.style.visibility = 'visible';
    div.bounds = this.args.bounds;

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
    // this.setActive = '.circle';

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
    var self = this;
    var map = GoogleMapService.map;

    // if (!bounds) {
    //   bounds = GoogleMapService.bounds;
    // }

    bounds = self.bounds;
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
        // div.ngStyle = "active";
        // div.style.left = (point.x - this.args.labelAnchor) + 'px';
        // div.style.top = (point.y - this.args.labelAnchor) + 'px';
    }

    counter++
    console.log('counter', counter)
    // if (counter > 22) {
    //   console.log('counter in if in service', counter)
    //     return;
    // }
    };

    GoogleOverlayView.prototype.hover = function() {
      let me = this;
      var div = this.div;
      markerActive = true;

      if (div) {
        div.style.width = '14px';
        div.style.height = '14px';
        div.style.marginTop = '-3px';
        div.style.marginLeft = '-3px';
      };

      // Add a listener - we'll accept clicks anywhere on this div, but you may want
      // to validate the click i.e. verify it occurred in some portion of your overlay.
      // google.maps.event.addDomListener(div, 'mouseover', function() {
      //     google.maps.event.trigger(me, 'mouseover');
      // });

    }

    // Set the visibility to 'hidden' or 'visible'.
  GoogleOverlayView.prototype.hide = function() {
    if (this.div) {
      // The visibility property must be a string enclosed in quotes.
      this.div.style.visibility = 'hidden';
      // this.setActive.removeClass('active');
      console.log('hidden')
    }
  };

  GoogleOverlayView.prototype.show = function() {
    if (this.div) {
      this.div.style.visibility = 'visible';
      // this.setActive.addClass('active');
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

GoogleOverlayView.prototype.isActive = function (div) {
  if (div) {
    div.style.width = '14px';
    div.style.height = '14px';
    div.style.marginTop = '-3px';
    div.style.marginLeft = '-3px';
  };
}

GoogleOverlayView.prototype.notActive = function (div) {
  if (div) {
    // this.div.className = 'circle';
    div.style.width = '8px';
    div.style.height = '8px';
    div.style.marginTop = '0px';
    div.style.marginLeft = '0px';
  };
}

GoogleOverlayView.prototype.onRemove = function() {
  this.div.parentNode.removeChild(this.div);
  this.div = null;
};

GoogleOverlayView.prototype.zoomDelete = function () {
  if (this.getMap()) {
  // Note: setMap(null) calls OverlayView.onRemove()
    this.setMap(null);
    console.log('deleted overlay')
  }
  // else {
  //   this.setMap(this.map);
  // }
}

GoogleOverlayView.prototype.getPosition = function() {
  return this.latlng;
};

GoogleOverlayView.prototype.updateClass = function() {
  // debugger;
  if ( this.div ) {
    // let div = this.div;
    let div = this.div.parentNode.childNodes[0];
    // var div = this.div.childNodes[1];
    // if ( div ) {
      // change class name
      div.className = "active";
    // }
  }
};
//   google.maps.event.addListener(overlay, "mouseover", function (e) {
//     debugger;
//     console.log('mouseover'); div.style.visibility = 'visible';
//   });

  this.GoogleOverlayView = GoogleOverlayView;
});

app.service('ControlsService', function (GoogleMapService) {
  let mapData = GoogleMapService;
  let map = mapData.map;
  let controlsData = {};
  let TransitControl;
  let self = this;
  // const GoogleControls = function(map, args) {
  //   this.bikelayerFn = bikelayerFn;
  //   this.transitLayerFn = transitLayerFn;
  //   this.setMap(map);
  //   this.args = args;
  // };

    // GoogleControls.prototype = new google.maps.OverlayView();

    this.bikelayerFn = function () {
        this.bikeLayer = new google.maps.BicyclingLayer();
        // mapData.bikeLayer = bikeLayer;
        this.bikeLayer.setMap(null);
          this.bikeLayer.setMap(map);
          // console.log('bikeLayer', mapData.bikeLayer);
      };

    this.transitLayerFn = function () {
      var transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);
    };

    this.transit = function() {
      console.log('transit');

      TransitControl = function(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'right';
        controlUI.title = 'Click to get transit details for the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '14px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Transit Layer';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
       controlUI.addEventListener('click', function() {
         console.log('transit')
         self.transitLayerFn();
       });
      }
    }

    this.transitC = function() {
      // Create the DIV to hold the control and call the TransitControl()
      // constructor passing in this DIV.
      var transitControlDiv = document.createElement('div');
      var transitControl = new TransitControl(transitControlDiv, map);

      transitControl.index = 1;
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(transitControlDiv);
    }

    this.bike = function() {
      console.log('transit');

      BikeControl = function(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'right';
        controlUI.style.paddingRight = '100px'
        controlUI.title = 'Click to get bike details for the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '14px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Bike Layer';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
       controlUI.addEventListener('click', function() {
         console.log('bike')
         self.bikelayerFn();
       });
      }

      this.bikeC = function() {
        // Create the DIV to hold the control and call the TransitControl()
        // constructor passing in this DIV.
        var bikeControlDiv = document.createElement('div');
        var bikeControl = new BikeControl(bikeControlDiv, map);

        bikeControl.index = 1;
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(bikeControlDiv);
      }

      // $scope.controlsData = ControlsService;
      // ControlsService.transitLayerFn();
      this.transit();
      this.transitC();
      this.bike();
      this.bikeC();
      // let bikeLayer = $scope.controlsData.bikeLayer;
    }
});
