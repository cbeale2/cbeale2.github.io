
  $(document).load(function() {
  
    $(".se-pre-con").fadeOut("slow");
    $("#lo").hide();
  });
    $("#lo").hide();

var info = document.getElementById('info');
var map = L.map('map', {
  zoomControl: false
});


L.tileLayer(
  'http://a.tiles.mapbox.com/v3/devseed.j2afnnal/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);
var hazardIcon = L.icon({
  iconUrl: "http://a.tiles.mapbox.com/v3/marker/pin-m-circle-stroked+2c3e50@2x.png",
  iconSize: [30, 70],
  popupAnchor: [0, -40]
});
new L.Control.Zoom({
  position: 'topleft'
}).addTo(map);


var markers = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  spiderfyDistanceMultiplier: 3,
  maxClusterRadius: 60,
});

var url = "https://cbeale2.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20all_t";
$.ajax({
  type: "GET",
  url: url,
  dataType: 'json',
  success: function(data) {
    geojsonLayer = L.geoJson(data, {
      onEachFeature: function(feature, layer) {
        layer.setIcon(hazardIcon);
        layer.bindPopup("<div style='background-color:#e74c3c; height:40px;';> <h1 style='font-size:18px;font-weight:bold; color:white;padding-top:10px;margin-left:10px;'>HOST NAME</h1> </div> <br><p style='margin-top:-10px; margin-left:10px;'> <i class='fa fa-pencil-square-o' aria-hidden='true'></i>  " + feature.properties.host + "</p><h1 style='font-size:18px; font-weight:bold; color:#1abc9c;margin-left:10px;'>Number of host listing</h1><br><p style='margin-top:-15px; margin-left:10px;'><i class='fa fa-bed'aria-hidden='true'></i> " + feature.properties.number_of_host_listings + "</p>" + "<h1 style='font-size:18px; font-weight:bold; color:#1abc9c;margin-left:10px;'>PRICE PER NIGHT</h1><br><p style='margin-top:-15px; margin-left:10px;'><i class='fa fa-gbp'aria-hidden='true'></i> " + feature.properties.per_night + "</p>");

      }
    });
   

    map.fitBounds(geojsonLayer.getBounds());

    markers.addLayer(geojsonLayer);
     geojsonLayer.on('click', function(e) {
        map.panTo(e.layer.getLatLng());
    });
    map.addLayer(markers);
    $(".se-pre-con").fadeOut("slow");;
    $("#lo").hide();
    $("#zoom").click(function() {
      map.fitBounds(geojsonLayer.getBounds());
      markers.clearLayers();

    });
    $("select").on('change', function() {
      markers.clearLayers();
      console.log("deleted");

    });

  }

});



//second ajax request based on changable sql statment

$('select').on('change', function() {
 $("#lo").show();
var markers = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  spiderfyDistanceMultiplier: 3,
  maxClusterRadius: 60,
});



  console.log("added");
  var sql = this.value;

  var url = sql;
  $.ajax({
    type: "GET",
    url: url,
    dataType: 'json',
    success: function(data) {
      geojsonLayer = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
          layer.setIcon(hazardIcon);
        layer.bindPopup("<div style='background-color:#e74c3c; height:40px;';> <h1 style='font-size:18px;font-weight:bold; color:white;padding-top:10px;margin-left:10px;'>HOST NAME</h1> </div> <br><p style='margin-top:-10px; margin-left:10px;'> <i class='fa fa-pencil-square-o' aria-hidden='true'></i>  " + feature.properties.host + "</p><h1 style='font-size:18px; font-weight:bold; color:#1abc9c;margin-left:10px;'>Number of host listing</h1><br><p style='margin-top:-15px; margin-left:10px;'><i class='fa fa-bed'aria-hidden='true'></i> " + feature.properties.number_of_host_listings + "</p>" + "<h1 style='font-size:18px; font-weight:bold; color:#1abc9c;margin-left:10px;'>PRICE PER NIGHT</h1><br><p style='margin-top:-15px; margin-left:10px;'><i class='fa fa-gbp'aria-hidden='true'></i> " + feature.properties.per_night + "</p>");

        }
      });



      map.fitBounds(geojsonLayer.getBounds());

      markers.addLayer(geojsonLayer);
      $("#lo").hide();
      geojsonLayer.on('click', function(e) {
      map.panTo(e.layer.getLatLng());
    });
      map.addLayer(markers);
  
      $("#zoom").click(function() {
        map.fitBounds(geojsonLayer.getBounds());
        markers.clearLayers();
      });
    }
  });
  $("select").on('change', function() {
    markers.clearLayers();
    console.log("deleted");
  });
});
