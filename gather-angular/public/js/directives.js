app.directive('googleMap', function () {
  console.log('directive')
  return {
    restrict: "E",
    replace: true,
    scope: {
      city: "="
    },
    controller: ['$scope', '$element', '$attrs', '$rootScope', '$compile', 'GoogleMapService', function ($scope, $element, $attrs, $rootScope, $compile, GoogleMapService) {

    $scope.markers = [];
    $scope.counter = 0;
    // var title = '';

    // Enable the visual refresh
    // google.maps.visualRefresh = true;

      var getMarker = function () {
      // if (marker) {
      //     return;
      // }
      // console.log('newCenter from getMarker', newCenter)
      var currWindow = false;
      var infoWindow = new google.maps.InfoWindow();

      if (!$scope.mapData) {
        $scope.mapData = GoogleMapService;
        var mapData = $scope.mapData;
        var newMap = mapData.map;
        // var infoWindow = mapData.infoWindow;
      }

      // if (newCenter) {
      //   mapData.center = newCenter;
      // }

      // infoWindow = new google.maps.InfoWindow();


      if ($scope.mapData.contentString) {
        var contentString = $scope.mapData.contentString;

      } else if (!$scope.city) {
        // var title = 'New York';
        // contentString = '<h5> New York </h5>';

        contentString = '<div id="iw-container">' +
                          '<div class="iw-title">New York</div>' +
                          '<div class="iw-content">' +
                            '<div class="iw-subTitle">History</div>' +
                            '<img src="/images/newYork.jpeg" alt="New York" height="115" width="83">' +
                            '<p>The history of New York begins around 10,000 BC, when the first Native Americans arrived. By 1100 AD, New York\'s main native cultures, the Iroquoian and Algonquian, had developed. European discovery of New York was led by the French in 1524 and the first land claim came in 1609 by the Dutch. As part of New Netherland, the colony was important in the fur trade and eventually became an agricultural resource thanks to the patroon system. In 1626 the Dutch bought the island of Manhattan from Native Americans.[1] In 1664, England renamed the colony New York, after the Duke of York (later James II & VII.) New York City gained prominence in the 18th century as a major trading port in the Thirteen Colonies.</p>' +
                            // '<div class="iw-subTitle">Contacts</div>' +
                            // '<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>'+
                            '<p><a href="https://www.newyorkpass.com/En/" target="_blank">The New York Pass</a></p>' +
                          '</div>' +
                          '<div class="iw-bottom-gradient"></div>' +
                        '</div>';
      } else {
        // var title = $scope.city;
        contentString = $scope.city;
      }
      // if (!newMarker) {
      //   label = '';
      //
      // } else {
        var labels = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var labelIndex = 0;
      // }

      var markerOptions = {
        map: $scope.mapData.map,
        position: $scope.mapData.center,
        animation: google.maps.Animation.DROP,
        title: $scope.mapData.contentString,
        maxWidth: 350,
        label: labels[labelIndex++ % labels.length]
      }

      var marker = new google.maps.Marker(markerOptions);
      $scope.marker = marker;

      marker.setMap($scope.mapData.map);

      google.maps.event.addListener(marker, 'click', function($scope) {
        // infoWindow.close();

          infoWindow.setContent(contentString);
          infoWindow.open(marker.map, marker);

          if( currWindow ) {
             currWindow.close();
          }

          currWindow = infoWindow;
      })

      // *
      // START INFOWINDOW CUSTOMIZE.
      // The google.maps.event.addListener() event expects
      // the creation of the infowindow HTML structure 'domready'
      // and before the opening of the infowindow, defined styles are applied.
      // *
      google.maps.event.addListener(infoWindow, 'domready', function() {

        // Reference to the DIV that wraps the bottom of infowindow
        var iwOuter = $('.gm-style-iw');

        /* Since this div is in a position prior to .gm-div style-iw.
         * We use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
        */
        var iwBackground = iwOuter.prev();

        // Removes background shadow DIV
        iwBackground.children(':nth-child(2)').css({'display' : 'none'});

        // Removes white background DIV
        iwBackground.children(':nth-child(4)').css({'display' : 'none'});

        // Moves the infowindow 115px to the right.
        // iwOuter.parent().parent().css({left: '115px'});

        iwOuter.parent().parent().css({left: '113px'});

        // Moves the shadow of the arrow 76px to the left margin.
        iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

        // Moves the arrow 76px to the left margin.
        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

        // Changes the desired tail shadow color.
        iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(240, 230, 140, 0.6) 0px 1px 6px', 'z-index' : '1'});

        // Reference to the div that groups the close button elements.
        var iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
        iwCloseBtn.css({opacity: '1', right: '43px', top: '8px', border: '7px solid #ffff99', 'border-radius': '13px', 'box-shadow': '2px 3px 5px #35236D'});

        // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
        if($('.iw-content').height() < 140){
          $('.iw-bottom-gradient').css({display: 'none'});
        }

        // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
        iwCloseBtn.mouseout(function(){
          $(this).css({opacity: '1'});
        });
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

              if (!$scope.mapData) {
                $scope.mapData = GoogleMapService;
              }

              // Reassign center variable with selected city
              $scope.mapData.newCenter = center;
              $scope.mapData.center = center;
              $scope.mapData.lat = lat;
              $scope.mapData.map.setCenter(center);

              getMarker();

            } else {
                alert("Geocode was not successful for the following reason: " + status);
              }
          });
        };

    var newMarker = [];

    var addMarkers = function () {
      $scope.counter = 0;
      $scope.newMarkers = [];
      $scope.myDataSource = {};

        for (var i=0; i < $scope.markers.length; i++) {
          debugger;
          marker = $scope.markers
          var markerLat = $scope.markers[i].latitude;
          var markerLong = $scope.markers[i].longitude;
          var center = new google.maps.LatLng(markerLat, markerLong);
          var name = $scope.markers[i].name;
          console.log('name' + [i], name)

          // Reassign center variable with selected city
          $scope.mapData.center = center;
          $scope.mapData.lat = markerLat;

          if (!$scope.mapData) {
            $scope.mapData = GoogleMapService;
          }

          $scope.mapData.map.setCenter(center);

          if (marker[i].priceLevel) {
            debugger;
            $scope.dataSource = {
                "chart": {
                    "caption": "Pricing",
                    "captionFontSize": "15",
                    "bgColor": "#00f987",
                    "showAxisLines": "1",
                    "xAxisName": "Price Level",
                    "toolTipColor": "#ffffff",
                    "axisLineAlpha": "85",
                    "xAxisLineColor": "#000",
                    "showHoverEffect": "1",
                    "animation": "1"
                },
                "data": [{
                    "label": "Price Level",
                    "value": marker[i].priceLevel.toString(),
                    "showLabel": "1",
                    "showValue": "1"
                  }]

              }
              marker[i].dataSource = $scope.dataSource.data;
          }

          if (marker[i].rating) {
            debugger;
            var ratingStars = [];
            for (var j=1; j < marker[i].rating; j++) {

              ratingStars += '<i class="fa fa-star-o" aria-hidden="true"></i>'
              // star.push(marker[i].rating);
            }
          }

          var contentString = '<h4>' + marker[i].name + '</h4><br>' +
            marker[i].address + '<br>';
            if (typeof marker[i].phone !== 'undefined') contentString += 'Phone: ' + marker[i].phone + '<br>'
            if (typeof marker[i].website !== 'undefined') contentString += 'Website: <a target="_blank" href="' + marker[i].website + '">' + marker[i].name + '</a><br>';
            if (typeof marker[i].rating !== 'undefined') contentString += 'Rating: ' + marker[i].rating + '<br>';
            if (typeof marker[i].priceLevel !== 'undefined') contentString += '<div class="container"><div fusioncharts id="mychartcontainer" chartid="mychart" width="100" height="20" type="bar2d" dataSource="' + $scope.dataSource + '"></div></div><br>';
            if (typeof marker[i].rating !== 'undefined') contentString += 'User Ratings: ' + ratingStars + '<br>';

          $scope.mapData.contentString = contentString;
          // var compiled = $compile(contentString)($scope);
          // $scope.mapData.contentString = compiled[0];

          getMarker();
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

          // $scope.mapData = GoogleMapService;
          // var mapData = $scope.mapData;
          // var newMap = mapData.map;

          // var markerOptions = {
          //   map: newMap,
          //   position: latLng,
          //   title: name,
          //   animation: newMap.animation
          // }

          // var newMarker = new google.maps.Marker(markerOptions);

          // google.maps.event.addListener(newMarker, 'click', function() {



          // infoWindow.setContent(content);

          // var infowindow = new google.maps.InfoWindow({
          //     content: content
          //   });
          //
          //   google.maps.event.addListener(newMarker, 'click', function($scope, $compile) {
          //     debugger;
          //     // if (infoWindow) {
          //     //   infoWindow.close();
          //     // }
          //     if (!$scope.city) {
          //       $scope.city = 'New York';
          //     }
          //
          //     infoWindow.setContent(contentString);
          //     // $compile(infoWindow.content)($scope);
          //     infoWindow.open(newMap, newMarker);

              // console.log('clicked', $scope.city)
            // });

          // newMap.setCenter(latLong);
          // });

          $scope.newMarkers.push($scope.marker);

          // To add the marker to the map, call setMap();
          // $scope.marker.setMap($scope.mapData.map);

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
