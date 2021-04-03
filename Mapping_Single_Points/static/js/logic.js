// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// Prior instructions under the Simple_Map logic.js file version
// set the zoom level of "14" on a scale 0–18.
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);
// change the marker to a circle ()
// radious to 300 and color of the cicle to yellow
// let marker = L.circle([34.0522, -118.2437], {
    //color: "yellow",
    //radius: 300
 //}).addTo(map);
// use circleMarker() function - it measures the radius of the circle in pixels
// with the default radius set at 10 pixels. 
let marker = L.circleMarker([34.0522, -118.2437], {
    color: "black",
    fillColor: "#ffffa1",
    radius: 300
 }).addTo(map);


// create the tile layer that will be the background of the map.
// Detailed notes about prior steps on under the Simple_Map logic.js version
// mode was changed to dark /dark-v10 instead of /streets-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
// call the addTo() function 
// The addTo() function will add the graymap object tile layer to our let map above.
streets.addTo(map);