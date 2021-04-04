// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// Prior instructions under the Simple_Map logic.js file version
// set the zoom level of "14" on a scale 0–18.
let map = L.map('mapid').setView([34.0522, -118.2437], 4);

// Other version of this step on the logi files under Mapping_single_point and Simple_map
// To add more markers to the map, the latitudes and longitudes are usually nested in an array
// change let marker for let cities
// An array containing each city's location, state, and population - Moved to a separate js file
// add a variable and assign it to the cities array.
// Get data from cities.js
let cityData = cities;

    //  cities.forEach(function(city) {
// Loop through the cities array and create one marker for each city.
// add the bindPopup() method. Inside the parentheses of the bindPopup() method
// will retrieve the name of the city, state, and population.
// use toLocaleString() method on the city.population in the bindPopup() to format the numbers (with ,)
// replace the marker() function with the circleMarker() so the marker size is based on population
// Assign the "radius" key to the population by using city.population AND /10K so the circles aren't too big
cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location, {
        radius: city.population/100000,
        color: "orange"
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  .addTo(map);
});

// create the tile layer that will be the background of the map.
// Detailed notes about prior steps on under the Simple_Map logic.js version
// mode was changed to dark /dark-v10 instead of /streets-v11
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