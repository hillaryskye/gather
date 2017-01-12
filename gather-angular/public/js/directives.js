app.directive('googleMap', function () {
  console.log('directive')
  return {
    restrict: "E",
    replace: true,
    scope: {
      city: "=",
      active: "=",
      mapMarker: "=mapMarker"
    },
    link: function($scope, el, attrs) {
      // let isActive = attrs.active === 'yes';
      // let notActive = attrs.active === 'no';
      // if (attrs.mapMarker) {
      //   let mapMarker = attrs.mapMarker;
      // }
    },
    controllerAs: 'mapvm',
    controller: [
      '$scope',
      '$element',
      '$attrs',
      '$rootScope',
      '$compile',
      'GoogleMapService',
      'mapMarkerConstructor',
      'ControlsService',
      function (
        $scope,
        $element,
        $attrs,
        $rootScope,
        $compile,
        GoogleMapService,
        mapMarkerConstructor,
        ControlsService
      ) {

    let mapvm = this;
    // let mapvm = $scope;
    mapvm.active = $scope.active;
    $scope.newMarkers = [];
    var overlay;
    $scope.counter = 0;

    // Enable the visual refresh
    // google.maps.visualRefresh = true;
    var getMarker, mouseover, mouseout;
    var marker = null;

    var nyMarker = function (marker) {
// debugger;

    if (!$scope.mapData) {
      $scope.mapData = GoogleMapService;
      var mapData = $scope.mapData;
      var newMap = mapData.map;
      bounds = mapData.bounds;
      console.log('bounds in getMarker', bounds)
    }

    // var marker = new google.maps.Marker(markerOptions);
    $scope.mapData = GoogleMapService;

    var marker = $scope.mapData;
    marker.index = 0;
    marker.id = '123';

    marker.contentString = '<div class="info-box-wrap">' +
                      '<div class="info-box-title">New York</div>' +
                      // '<div class="info-box-wrap">' +
                        // '<div class="iw-subTitle">History</div>' +
                        '<img src="/images/newYork.jpeg" alt="New York" height="115" width="83">' +
                        '<p class="padding">The history of New York begins around 10,000 BC, when the first Native Americans arrived. By 1100 AD, New York\'s main native cultures, the Iroquoian and Algonquian, had developed. European discovery of New York was led by the French in 1524 and the first land claim came in 1609 by the Dutch. As part of New Netherland, the colony was important in the fur trade and eventually became an agricultural resource thanks to the patroon system. In 1626 the Dutch bought the island of Manhattan from Native Americans.[1] In 1664, England renamed the colony New York, after the Duke of York (later James II & VII.) New York City gained prominence in the 18th century as a major trading port in the Thirteen Colonies.</p>' +
                        '<p><a href="https://www.newyorkpass.com/En/" target="_blank">The New York Pass</a></p>' +
                      '</div>' +
                    '</div>';
    console.log('marker', marker)

      getMarker(marker);
      return marker;
    }

    var getMarker = function (marker) {
      console.log('marker in getMarker', marker.name + ' ' + marker.id)
      // console.log('contentString', marker.contentString);
      // this.bikelayerFn();
      // this.transitLayerFn();

      if (!marker.contentString) {
        debugger;
        marker.contentString = $scope.city;
      }

      marker.color = '';
      var index, id;
      $scope.mapData.colors = mapMarkerConstructor.colors;

      var colors = $scope.mapData.colors;
      // var index = $scope.mapData.index;

      if (!marker.type) { // Coming from first time NY or selecting a city
        index = 0;
        id = '123';
        // $scope.mapData.id = marker.id;
      } else { // Coming from loop from Controller with 20 Details results
        index = marker.index;
        id = marker.id;
        // marker.index = $scope.mapData.index;
        // marker.bounds = $scope.mapData.bounds;
      }

      overlay = new mapMarkerConstructor.GoogleOverlayView(
        marker.bounds, marker.map, {
          marker_id: id,
          color: colors[index],
          bounds: marker.bounds
          // hover: marker.hover
        }
      );

      var color = overlay.args.color;

      console.log('marker', marker);
      // console.log('$scope.mapData', $scope.mapData);
      console.log('name', marker.name)

      marker.color = color;
      marker.id = id;
      marker.overlay = overlay;
      marker.index = index;

      // var labels = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      // var labelIndex = 0;

      var markerOptions = {
        map: $scope.mapData.map,
        position: $scope.mapData.center,
        bounds: $scope.mapData.bounds,
        animation: google.maps.Animation.DROP,
        title: marker.contentString,
        type: $scope.mapData.type,
        zoom: 12,
        maxWidth: 350,
        maxZoom: 16,
        name: marker.name,
        color: marker.color,
        index: marker.index,
        id: marker.id,
        overlay: marker.overlay,
        address: marker.address,
        phone: marker.phone,
        photo: marker.photo,
        priceLevel: marker.priceLevel,
        rating: marker.rating,
        website: marker.website,
        type: marker.type,
        photos: marker.photos,
        password: marker.password,
        draggable: true
        // label: labels[labelIndex++ % labels.length],
      }
      if (marker.name) {
        $scope.newMarkers.push(marker);
      }

      console.log('newMarkers in directive', $scope.newMarkers);

      marker = new google.maps.Marker(markerOptions); // marker gets overridden

      // marker.setMap(marker.map);

      google.maps.event.addListener(marker, "mouseover", function () {
        console.log('mouseover ' + marker.name);
          overlay.isActive(marker.overlay.div);
          $scope.$emit('marker', { marker: marker, active: $scope.active = 'yes' });
          // $scope.apply();
      });

      mouseover = function(mapMarker) {
        console.log('click in function')
          console.log('mouseover function ' + mapMarker.name)
          if (mapMarker) {
            overlay.isActive(mapMarker.overlay.div);
        };
      }

      mouseout = function(mapMarker) {
            console.log('mouseout in function ' + mapMarker.name);
            if (mapMarker) {
              overlay.notActive(mapMarker.overlay.div);
            }
      }

      google.maps.event.addListener(marker, 'mouseout', function() {
          console.log('mouseout ' + marker.name);
            overlay.notActive(marker.overlay.div);
            $scope.$emit('markerEvent', { marker: marker, active: $scope.active ="yes" });
      });

      $scope.marker = marker; // Save marker data to $scope.marker

      // listener Events for zoom_change, hover and click
    //   zoom_level = marker.map.getZoom();
    //  console.log('zoom Directive', zoom_level)
      // bounds.extend(marker.position);

  //     var listener = google.maps.event.addListenerOnce(marker.map, "zoom_changed", function() {
  //     // marker.map.panTo(marker.getPosition());
  //     // bounds = marker.bounds;
  //     zoom_level = marker.map.getZoom();
  //     console.log('zoom Directive 2', zoom_level)
  //   //  overlay.zoomDelete();
  //   //  overlay.draw();
  //   // google.maps.event.removeListener(listener);
  //    // map.setCenter(newCenter);
  //  });

   var boxText = document.createElement("div");

   var myOptions = {
     content: boxText,
     disableAutoPan: false,
     maxWidth: 0,
     pixelOffset: new google.maps.Size(-140, 0),
     zIndex: null,
     boxStyle: {
       background: "url('tipbox.gif') no-repeat",
       opacity: 0.75,
       width: "345px",
     },
     closeBoxMargin: "10px 2px 2px 2px",
     closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
     infoBoxClearance: new google.maps.Size(1, 1),
     isHidden: false,
     isActive: true,
     pane: "floatPane",
     enableEventPropagation: false
   };

   google.maps.event.addListener(marker, 'click', function() {
       console.log('click marker for boxText');
         overlay.notActive(marker.overlay.div);
   });

   google.maps.event.addListener(marker, 'click', function() {
    //  debugger;
      console.log('click in first')

      var boxText = document.createElement("div");
      boxText.className = 'infobox';
      // boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
      boxText.innerHTML = marker.title;

      myOptions.content = boxText;
      var ib = new InfoBox(myOptions);
      ib.open(marker.map, marker);
      });

    //   google.maps.event.addListener(marker, "mouseover", function () {
    //     // for (var i = 0; i < $scope.markers[i].length; i++) {
    //       console.log('mouseover'); overlay.isActive(marker.overlay.div);
    //       // console.log('name', marker)
    //       console.log('name in mouseover', marker.name + ' ' + marker.index + ' ' + marker.color);
    //   });
    // }

      // marker.map.fitBounds(bounds);
      console.log('newMarkers in directive', $scope.newMarkers);
      console.log('mapvm.newMarkers', mapvm.newMarkers);
      mapvm.newMarkers = $scope.newMarkers
    }
    nyMarker(marker);

    var clearMarkers = function (marker) {
      var marker = $scope.marker;
      if (marker) {
        marker.setMap(null);
      }

      console.log('deleted marker' + marker.id)
    }

    $scope.mapData.clearMarkers = clearMarkers;

      var markAdressToMap = function (marker) { // Search for city

        if (!$scope.city) {
          return;
        }

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': $scope.city + ', us'},

        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var lat = results[0].geometry.location.lat()
              var long = results[0].geometry.location.lng()

              var center = new google.maps.LatLng(lat, long)
              var bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(lat, long)
              );

              if (!$scope.mapData) {
                $scope.mapData = GoogleMapService;
              }

              // Reassign center variable with selected city
              $scope.mapData.newCenter = center;
              $scope.mapData.center = center;
              $scope.mapData.lat = lat;
              $scope.mapData.bounds = bounds;
              $scope.mapData.category = 'city';
              $scope.mapData.contentString = $scope.city;

              // console.log('bounds in city', bounds.H)
              // console.log('lat in city', $scope.mapData.lat)
              $scope.mapData.map.setCenter(center);

              if (overlay) {
                overlay.zoomDelete();
                console.log('zoomDelete');
              }

              // clearMarkers(marker);
              getMarker($scope.mapData);

            } else {
                alert("Geocode was not successful for the following reason: " + status);
              }
          });
        }; // end of markAdressToMap

    var addMarkers = function () {
      $scope.counter = 0;
      // $scope.newMarkers = [];
      // $scope.overlays = [];
      $scope.myDataSource = {};
      $scope.markers.index = 0;
      $scope.mapData.index = 0;
      // $scope.mapData.overlay = {};
      // $scope.newMarkers.overlays = [];
      // $scope.marker.overlay = {};
      // $scope.marker.color = '';
      // $scope.markers.overlays = [];
      // $scope.markers.overlay = {};

        for (var i=0; i < $scope.markers.length; i++) {
          console.log('$scope.markers.map', $scope.markers[i].map);
          var marker = $scope.markers;
          var color = $scope.mapData.colors[i]; // pull in the array of colors from service
          marker[i].color = color;

          var markerLat = $scope.markers[i].latitude;
          var markerLong = $scope.markers[i].longitude;
          var type = $scope.markers[i].type;
          var center = new google.maps.LatLng(markerLat, markerLong);
          var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(markerLat, markerLong)
          );
          var name = $scope.markers[i].name;
          var id = $scope.markers[i].id;
          console.log('name' + [i], name)
          $scope.markers[i].index = i;
          // $scope.markers[i].color = $scope.colors[i];

          // Reassign center variable with selected city
          $scope.mapData.center = center;
          $scope.mapData.lat = markerLat;
          $scope.mapData.bounds = bounds;
          $scope.mapData.id = id;
          $scope.mapData.type = type;
          console.log('bounds in loop', $scope.mapData.bounds.H)
          $scope.mapData.index = i;
          console.log('index in loop', i)

          $scope.markers[i].bounds = bounds;
          // $scope.mapData.overlay = $scope.overlay;
          // $scope.markers[i].color = $scope.mapData.overlay.args.color;
          // $scope.markers[i].overlay = $scope.mapData.overlay;
          // $scope.newMarker.overlay = $scope.overlays[i];
          // $scope.marker.overlay = $scope.overlays[i];
          $scope.marker.bounds = bounds;

        if (!$scope.mapData) {
            $scope.mapData = GoogleMapService;
          }

          $scope.mapData.map.setCenter(center);

          // if (marker[i].priceLevel) {
          //   $scope.dataSource = {
                // "chart": {
                //     "caption": "Pricing",
                //     "captionFontSize": "15",
                //     "bgColor": "#00f987",
                //     "showAxisLines": "1",
                //     "xAxisName": "Price Level",
                //     "toolTipColor": "#ffffff",
                //     "axisLineAlpha": "85",
                //     "xAxisLineColor": "#000",
                //     "showHoverEffect": "1",
                //     "animation": "1"
                // },
                // "data": [{
                //     "label": "Price Level",
                //     "value": marker[i].priceLevel,
                //     "showLabel": "1",
                //     "showValue": "1"
                //   }]

          //     }
          //     marker[i].dataSource = $scope.dataSource.data;
          // }

          if (marker[i].rating) {
            var ratingStars = [];
            for (var j=1; j < marker[i].rating; j++) {

              // ratingStars += '<i class="fa fa-star-o" aria-hidden="true"></i>'
              ratingStars += '<span class="rating">★</span>'
              // ratingStars += '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 14 14" style="enable-background:0 0 14 14;" xml:space="preserve"><style type="text/css">	.st0{fill:#335CFF;}</style><polygon class="st0" points="2.5,3.1 2.1,2.9 1.7,3 1.8,2.6 1.5,2.2 2,2.2 2.2,1.8 2.4,2.2 2.9,2.4 2.5,2.7 "/></svg>'
            }
          }

          var contentString = '<div class="info-box-wrap"><div class="info-box-title">' + marker[i].name + '</div>';
            contentString += '<div class="address">Address: ' + marker[i].address + '</div><br>';
            if (typeof marker[i].photo !== 'undefined') contentString += '<img src="' + marker[i].photo + '" alt="" height="115" width="83">';
            if (typeof marker[i].phone !== 'undefined') contentString += 'Phone: ' + marker[i].phone + '<br>'
            if (typeof marker[i].website !== 'undefined') contentString += 'Website: <a target="_blank" href="' + marker[i].website + '">' + marker[i].name + '</a><br>';
            if (typeof marker[i].priceLevel !== 'undefined') contentString += '<div class="progress-container"><div class="progress-bar" style="width: ' + (marker[i].priceLevel * 10) * 2 + '%"> Price: ' + marker[i].priceLevel + '</div>';
            if (typeof marker[i].rating !== 'undefined') contentString += 'User Ratings (' + marker[i].rating + '): &nbsp;' + ratingStars + '<br>';
            contentString += '</div>';

          $scope.markers[i].contentString = contentString;
          // var compiled = $compile(contentString)($scope);
          // $scope.mapData.contentString = compiled[0];
          console.log('marker in loop', $scope.markers[i].name + ' ' + $scope.markers[i].id)

          var m = $scope.markers[i];

          getMarker(m);
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

          // bounds = new google.maps.LatLngBounds();
        } // end of for loop
        // newMap.fitBounds(bounds);
      } //end of getMarker() function

      // $scope.$watchGroup(["active", "mapMarker"], function() {
      //   // debugger;
      //   // if ($scope.mapMarker) {
      //   // $scope.active = newValue;
      //     console.log('active in watch', $scope.active)
      //     if ($scope.active === 'yes') {
      //       mouseover($scope.mapMarker);
      //     } else if ($scope.active === 'no') {
      //       mouseout($scope.mapMarker);
      //     }
      //   // }
      // });

      // $scope.$watch("mapMarker", function() {
      //   if ($scope.mapMarker) {
      //     console.log('mapMarker in watch', $scope.mapMarker);
      //   }
      // })

      $scope.$watch("city", function () {
        if ($scope.city) {
         clearMarkers($scope.marker);
         markAdressToMap(marker);
       }
       });
       // catches $broadcase sent over from hover on mapMarker in home.html for overlay on map
       $scope.$on('mouseOver', function(event, mouseOver) {
         console.log('yes in dir', mouseOver);
         if (mouseOver.active === 'yes') {
           mouseover(mouseOver.mapMarker);
         }
       });
       // catches $broadcase sent over from hover on mapMarker in home.html for overlay on map
       $scope.$on('mouseOut', function(event, mouseOut) {
         console.log('no in dir', mouseOut)
         if (mouseOut.active === 'no') {
           mouseout(mouseOut.mapMarker);
         }
       });

      $scope.$on('markersArr', function (event, markersArr) {
        if (markersArr && $scope.counter < 2) {
          $scope.markers = markersArr;
          console.log('markers from Directive', $scope.markers)
          console.log('counter in $scope.$on', $scope.counter)

          if ($scope.marker) {
            clearMarkers($scope.marker);
          }

          if (overlay) {
            overlay.zoomDelete();
            console.log('zoomDelete');
          }
          addMarkers();

        }
        // if ($scope.counter < 2) {
        //   $scope.counter++
        //   console.log('counter in directive', $scope.counter);
        //   newMarkers = $scope.newMarkers
        //   $scope.$emit('newMarkers', newMarkers)
        // }
      });
      console.log('newMarkers outisde of $on', $scope.newMarkers)
      console.log('mapvm.newMarkers', mapvm.newMarkers);
      // $scope.$on('markerActive', function(event, markerActive) {
      //   console.log('markerActive in $scope.on', markerActive);
      //
      //   mouseover(markerActive);
      // })
    }
  ]};
});
