// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// mapid refers to the id tag in our <div> on the index.html file.
// setView() method sets the view of the map with a geographical center
// First coordinate is latitude (40.7) then longitude (-94.5)
// set the zoom level of "4" on a scale 0–18.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// create the tile layer that will be the background of the map.
// streets is the variable and tileLayer the method including API urls
// add the maxZoom attribute and assign it a value of 18
// add the id attribute and assign it mapbox.streets, to show the streets on the map.
// (if want to change to other maps styles change the id i.e mapbox.stellite instead of streets)
// add the accessToken attribute and assign it the value of our API_KEY.
// (original) let streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
// other Maxbox styles urls can be found at docs.mapbox.com/api/maps/styles/ i.e instead of street-v11 use satellite-v9
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
// call the addTo() function 
// The addTo() function will add the graymap object tile layer to our let map above.
streets.addTo(map);