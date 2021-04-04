// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level on a scale 0–18 after the coordanates (5)
// Prior instructions under the Simple_Map logic.js file version
// coordinates for the center of the map to somewhere in SFO
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// Coordinates for each point to be used in the polyline.
let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
  ];

// Create a line using polyline() function and the line coordinates above. color de line(yellow, blue, red).
// dashArray '1, 1' is straight line - opacity, the closer to 1 is darker and weithg is how thick the line is
L.polyline(line, {
    color: "yellow",
    weight: 4,
    opacity: 0.9,
    dashArray: '5, 5'
  }).addTo(map);

// Other version of this step on the logi files under Mapping_single_point, Simple_map, etc
// Get data from cities.js
let cityData = cities;

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
// mode in the url indicated by dark /dark-v10 or /streets-v11 or satellite-streets-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
// call the addTo() function 
// The addTo() function will add the graymap object tile layer to our let map above.
streets.addTo(map);