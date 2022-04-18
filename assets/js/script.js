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
}

searchButton.addEventListener("click", searchButtonHandler);