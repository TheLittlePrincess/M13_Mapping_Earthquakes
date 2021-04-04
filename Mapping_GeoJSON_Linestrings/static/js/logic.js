// Add console.log to check to see if our code is working.
console.log("working");
// Prior instructions under the Simple_Map logic.js file version
// removed the setView when introduced the base (street and dark) layers
//let map = L.map('mapid').setView([30, 30], 2);

// create the tile layer that will be the background of the map.
// Detailed notes about prior steps on under the Simple_Map logic.js version
// mode in the url indicated by dark /dark-v10 or /streets-v11 or satellite-streets-v11 or navigation-preview-night-v4
// what was streets before we replaced by light on 13.5.5
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
// call the addTo() function 
// The addTo() function will add the graymap object tile layer to our let map above.
//streets.addTo(map);

// Create a base layer that holds both maps.
// light and Dark can be used to toggle between styles in the index.html
let baseMaps = {
  Light: light,
  Dark: dark
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [light]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Create a torontoData variable and assign it to the URL for the torontoRoutes.json file on MY GitHub
// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/TheLittlePrincess/M13_Mapping_Earthquakes/main/torontoRoutes.json";

// Accessing the airport GeoJSON URL (from my github repository raw link for the data file)
// let airportData = "https://raw.githubusercontent.com/TheLittlePrincess/M13_Mapping_Earthquakes/main/majorAirports.json";

//add the d3.json() method and other deatils in prior version of the logic file like //d3.json(airportData).then(function(data) {
// Grabbing our GeoJSON data.

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: myStyle,
  onEachFeature: function(feature, layer) {
    //console.log(layer);
    // use the bindPopup() method 
    layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Detination" 
    + feature.properties.dst + "</h3>");
  }
})
.addTo(map);
});

