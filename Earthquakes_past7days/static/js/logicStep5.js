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
// We create the salite view or dark tile layer that will be an option for our map.
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

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  "Earthquakes": earthquakes
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Then we add a control to the map that will allow the user to change
// which layers are visible (base are streets and satalite and overlay is earthquakes)
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

/// Add the following function styleInfo() inside the d3.json() method:

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
//replace the hexadecimal color code with the function getColor()
//add the dot notation code feature.properties.mag inside, to change the color of each earthquake marker based on the magnitude.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    //fillColor: "#ffae42",
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    //In the getRadius()function use feature.properties.mag to retrieve the earthquake's magnitude
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

//write code for the getColor() function to change the marker's color based on the magnitude. 
//i.e if the magnitude is >5, it will be a certain color, if the magnitude is < 4

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
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
      //console.log(data);
      return L.circleMarker(latlng);
    },
  // We set the style for each circleMarker using our styleInfo function.
style: styleInfo,
  // We create a popup for each circleMarker to display the magnitude and
  //  location of the earthquake after the marker has been created and styled.
  onEachFeature: function(feature, layer) {
  layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
}
//}).addTo(map);
}).addTo(earthquakes);

/// copy the code on https://leafletjs.com/examples/choropleth/ for the Custom Legend Control 
// and paste it below the L.geoJSON() layer, where we add the earthquake layer to the map, earthquakes.addTo(map)

let legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    let div = L.DomUtil.create('div', 'info legend');
    // instead of grades magnitudes
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];     
        //labels = [];
// loop through our density intervals and generate a label with a colored square for each interval
    //for (var i = 0; i < grades.length; i++) {
        //div.innerHTML +=
            //'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
           // grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    //}

    //return div;
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='width: 14px; background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
   }
    return div;
  };
 
  legend.addTo(map);

  ////Then we add the earthquake layer to our map
  //earthquakes.addTo(map);
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

