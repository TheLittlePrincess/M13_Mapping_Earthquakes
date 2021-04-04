// Add console.log to check to see if our code is working.
console.log("working");
// Prior instructions under the Simple_Map logic.js file version
// removed the setView when introduced the base (street and dark) layers
//let map = L.map('mapid').setView([30, 30], 2);

// create the tile layer that will be the background of the map.
// Detailed notes about prior steps on under the Simple_Map logic.js version
// mode in the url indicated by dark /dark-v10 or /streets-v11 or satellite-streets-v11 or navigation-preview-night-v4
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
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
// Street and Dark can be used to toggle between styles in the index.html
let baseMaps = {
  Street: streets,
  Dark: dark
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
// Accessing the airport GeoJSON URL (from my github repository raw link for the data file)
let airportData = "https://raw.githubusercontent.com/TheLittlePrincess/M13_Mapping_Earthquakes/main/majorAirports.json";

//add the d3.json() method, which returns a promise with the then() method and the anonymous function().
//Inside the d3.json() method we'll add the airportData variable.
//Inside the anonymous function() we'll add the data parameter, which references the airportData.
//We'll pass this data to the L.geoJSON() layer and then it'll be added to the map with addTo(map).
// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data).addTo(map);
});

// Attempt to get a pop up - skill drill 13.5.3 & 13.5.4
// Grabbing our GeoJSON data.
//L.geoJson(airportData, {
  // We turn each feature into a marker on the map - instead of pointToLayer use onEachFeature
  //onEachFeature: function(FeatureCollection, features, properties) {
    //console.log(layer);
    // use the bindPopup() method 
    //layer.bindPopup("<h2> Airport Name: " + FeatureCollection.features.properties.name + ", " + FeatureCollection.features.properties.city + "</h2>");
  //}

//}).addTo(map);

