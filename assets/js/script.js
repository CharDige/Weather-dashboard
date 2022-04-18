var citySearch = document.querySelector("#city-search");
var citySearchInputEl = document.querySelector("#city-search-input");
var searchButton = document.querySelector("#search-button");
var errorMessageEl = document.querySelector("#error-message");
var searchedCitiesEl = document.querySelector("#searched-cities");
var todayWeather = document.querySelector("#today-weather-card");
var fiveDayForecast = document.querySelector("#five-day-forecast");

// OpenWeather API Key variable
var ApiKey = "2eafffb05ee0e15aaa7a1382d485fad9";

// Search button function
var searchButtonHandler = function(event) {
    event.preventDefault();
    var searchedCity = citySearchInputEl.value.trim();
    console.log(searchedCity);
    console.log(getCurrentCityWeather(searchedCity));
}

// Get current weather for searched city
var getCurrentCityWeather = function(searchedCity) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=metric&appid=" + ApiKey
    fetch(apiUrl)
    .then (function(response) {
        response.json()
        .then(function(data) {
            console.log(data,searchedCity)
            displayCurrentCityWeather(data, searchedCity);
        })
    })
};

// Display searched city's current weather
var displayCurrentCityWeather = function(weather, searchedCity) {
    // Clear content ahead of new content
    todayWeather.textContent = " ";
    var todayWeatherHeading = document.createElement("h2");
    todayWeatherHeading.textContent = searchedCity;
    todayWeather.appendChild(todayWeatherHeading);

    // Current date
    var currentDate = document.createElement("p");
    currentDate.textContent = moment().format("D MMM YYYY");
    todayWeather.appendChild(currentDate);

    // Current weather icon
    var currentWeatherIcon = document.createElement("img");
    currentWeatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png");
    todayWeather.appendChild(currentWeatherIcon);

    // Current temperature
    var currentTemp = document.createElement("p");
    currentTemp.textContent = "Temperature: " + weather.main.temp + "°C"
    todayWeather.appendChild(currentTemp);

    // Current humidity
    var currentHumidity = document.createElement("p");
    currentHumidity.textContent = "Humidity: " + weather.main.humidity + "%";
    todayWeather.appendChild(currentHumidity);

    // Current wind speed
    var currentWindSpeed = document.createElement("p");
    currentWindSpeed.textContent = "Wind speed: " + weather.wind.speed + " metres/second";
    todayWeather.appendChild(currentWindSpeed);

    // Current UV index as a separate function due to different API call
    var lat = weather.coord.lat
    var lon = weather.coord.lon
    currentUvIndex(lat,lon);
}

// Current UV Index fetch API function
var currentUvIndex = function(lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&appid=" + ApiKey
    fetch(apiUrl)
    .then (function(response) {
        response.json()
        .then (function(data) {
            console.log(data);
            showCurrentUvIndex(data);
        });
    });
}

// Showing the current UV index and colour coding based on severity of UV index
var showCurrentUvIndex = function(uvIndex) {
    var currentUvIndexEl = document.createElement("p");
    currentUvIndexEl.textContent = "UV Index: " + uvIndex.current.uvi
    
    // Conditional statement to change colour to indicate level of UV severity
    if (uvIndex.current.uvi <= 2) {
        currentUvIndexEl.classList.add("bg-info")
    } else if (uvIndex.current.uvi > 2 && uvIndex.current.uvi <= 5) {
        currentUvIndexEl.classList.add("bg-success");
    } else if (uvIndex.current.uvi > 5 && uvIndex.current.uvi <= 7) {
        currentUvIndexEl.classList.add("bg-warning");
    } else if (uvIndex.current.uvi > 7 && uvIndex.current.uvi <= 10) {
        currentUvIndexEl.classList.add("bg-danger");
    } else if (uvIndex.current.uvi > 10) {
        currentUvIndexEl.classList.add("bg-dark");
    };

    todayWeather.appendChild(currentUvIndexEl);
}

searchButton.addEventListener("click", searchButtonHandler);