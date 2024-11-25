

w_call = "https://api.openweathermap.org/data/2.5/weather?q=Orlando&units=imperial&appid={API-Key Goes here}"

// Removed my API Key to save me money because I am a broke college student
maps_call = "https://maps.googleapis.com/maps/api/js?key={API key goes here}&callback=console.debug&libraries=maps,marker&v=beta"
console.log(maps_call)

var city_lat;
var city_lon;
var city_name;

// w_call api to get weather information for city
function getWeather(w_call) {
    fetch(
        w_call
    )
        // Make sure the API call was succesful
    .then(res => {
        if (res.ok){
            console.log("SUCCESSFUL CONNECTION")
        } else {
            console.log("Unsuccessful connection")
        }

        return res.json()
    })
    
    // Get JSON data from API call and transfer it into usable code (Look for the things needed forr the project)
    .then(data => {
        console.log("Weather api data")
        console.log(data)
        console.log("End of Weather API data")
        if (data.cod === "404"){
            alert("City not found try again")
        } else {
        city_name = data.name;
        city_temp = data.main.temp
        city_forecast = data.weather[0].description
        console.log(city_forecast)
        city_lat = data.coord.lat
        city_lon = data.coord.lon

        console.log("City Latitude:" + city_lat)
        console.log("City Longitude:" + city_lon)


        updateWebPage(city_name, city_temp, city_forecast, city_lat, city_lon); 
        initMap();
        }
        
    })
    .catch(error => {
        
        console.log(error)
    
    })
}
// End of getWeather function

//Start of searchCity function
function searchCity() {
    console.clear()
    searched_city = document.getElementById('search-bar').value
    if (document.getElementById("degree").innerHTML === "°F"){
        call = "https://api.openweathermap.org/data/2.5/weather?q="+searched_city+"&units=imperial&appid=b90d56ad9e582c78d49348953405002f";
    } else {
        call = "https://api.openweathermap.org/data/2.5/weather?q="+searched_city+"&units=metric&appid=b90d56ad9e582c78d49348953405002f"
    }
    
    console.log(call)
    getWeather(call);
}
//End of searchCity function

//Start of updateWebPage function
function updateWebPage(city, temp, sky, latitude, longitude){

    document.getElementById("city").innerHTML = city;
    document.getElementById("forecast").innerHTML = sky;
    document.getElementById("temp").innerHTML = temp + document.getElementById("degree").innerHTML;
    document.getElementById("lat").innerHTML = latitude;
    document.getElementById("long").innerHTML = longitude;

}
//End of updateWebPage function

// Change between Celsius and Fahrenheit degree
function changeDegree() {
    //Check what button is (should start with F)
    if (document.getElementById("degree").innerHTML === "°F"){
        //if clicked it will change to Celsius and call the api to change to metric system (regenerate in Celsius)
        document.getElementById("degree").innerHTML = "°C";
        w_call = "https://api.openweathermap.org/data/2.5/weather?q="+document.getElementById('city').innerHTML+"&units=metric&appid=b90d56ad9e582c78d49348953405002f";
        getWeather(w_call);
    } else {
        //if clicked and not F/is C it will change to Fahrenheit and w_call the api to change to imperial system (regenerate in Fahrenheit)
        document.getElementById("degree").innerHTML = "°F";
        w_call = "https://api.openweathermap.org/data/2.5/weather?q="+document.getElementById('city').innerHTML+"&units=imperial&appid=b90d56ad9e582c78d49348953405002f";
        getWeather(w_call);
    }
}

// Initialize and add the map
let map;
fetch(
    maps_call
)
.then( data => {
    console.log("Google Maps API data")
    console.log(data)
})
async function initMap() {
  // The location of Orlando
  latitude = parseFloat(document.getElementById("lat").innerHTML);
  console.log(latitude)
  longitude = parseFloat(document.getElementById("long").innerHTML);
  console.log(longitude)
  cityName = document.getElementById("city").innerHTML;

  const position = { lat: latitude, lng: longitude };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Orlando
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: cityName,
  });
}

// Run at first launch of website but not after
var ran = false;
if (ran === false) {
    getWeather(w_call);
    initMap();
    ran = true;
}
