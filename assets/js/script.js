var citySearch = document.querySelector("#city-search");
var citySearchInputEl = document.querySelector("#city-search-input");
var searchButton = document.querySelector("#search-button");
var errorMessageEl = document.querySelector("#error-message");
var searchedCitiesEl = document.querySelector("#searched-cities");
var todayWeather = document.querySelector("#today-weather-card");
var fiveDayForecast = document.querySelector("#five-day-forecast");


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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=imperial&appid=" + ApiKey
    fetch(apiUrl)
    .then (function(response) {
        response.json()
        .then(function(data) {
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
}

searchButton.addEventListener("click", searchButtonHandler);