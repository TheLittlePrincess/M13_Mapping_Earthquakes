/// Prior branches contain step by steps - see the logic file on Simple_Map, Mapping_GeoJson_Polygons, etc for more details
// Add console.log to check to see if our code is working.
console.log("working");

// create the tile layer that will be the background of the map.
// mode in the url indicated by dark /dark-v10 or /streets-v11 or satellite-streets-v11 or navigation-preview-night-v4
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    //id: 'mapbox.streets',
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let sataliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
// light and Dark or streets and stalite can be used to toggle between styles in the index.html
let baseMaps = {
  "Streets": streets,
  "Satalite": sataliteStreets
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

/// Add the following function styleInfo() inside the d3.json() method:

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    //In the getRadius()function use feature.properties.mag to retrieve the earthquake's magnitude
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
// If the magnitude is greater than 0, then the magnitude is multiplied by 4.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}


// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {

  // We turn each feature into a circleMarker on the map.
  
  pointToLayer: function(feature, latlng) {
              console.log(data);
              return L.circleMarker(latlng);
          },
        // We set the style for each circleMarker using our styleInfo function.
      style: styleInfo
      }).addTo(map);
  });


/// STYLE AND POPUP INSTRUCTIONS FROM PRIOR EXERCISES BELOW

// Accessing the Toronto neighborhoods GeoJSON URL.
//let torontoHoods = "https://raw.githubusercontent.com/TheLittlePrincess/M13_Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
//let myStyle = {
  //color: "blue",
  //weight: 1,
  //fillcolor: "#ffffff"

//}

//d3.json(torontoHoods).then(function(data) {
  ///console.log(data);
// Creating a GeoJSON layer with the retrieved data.
//L.geoJson(data, {
  //style: myStyle,
  //onEachFeature: function(feature, layer) {
    //console.log(layer);
    // use the bindPopup() method 
    //layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3> <hr><h3> Code: " 
    //+ feature.properties.AREA_S_CD + "</h3>");
  //}
//})
//.addTo(map);
//});

