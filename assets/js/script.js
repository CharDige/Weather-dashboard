var citySearch = $("#city-search");
var citySearchInputEl = $("#city-search-input");
var searchButton = $("#search-button");
var errorMessageEl = $("#error-message");
var searchedCitiesEl = $("#searched-cities");
var todayWeather = $("#today-weather-card");
var fiveDayForecast = $("#five-day-forecast");


var ApiKey = "2eafffb05ee0e15aaa7a1382d485fad9";

// Search button function
var searchButtonHandler = function(event) {
    event.preventDefault();
    var searchedCity = citySearchInputEl.val();
    console.log(searchedCity);
    console.log(getCurrentCityWeather());
}

// Get current weather for searched city
var getCurrentCityWeather = function(city) {
    var searchedCity = citySearchInputEl.val();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=imperial&appid=" + ApiKey
    fetch(apiUrl)
    .then (function(response) {
        response.json()
        .then(function(data) {
            console.log(data, city);
        })
    })
};

searchButton.on("click", searchButtonHandler);