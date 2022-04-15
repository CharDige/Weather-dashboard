var citySearch = $("#city-search");
var citySearchInputEl = $("#city-search-input");
var searchButton = $("#search-button");
var errorMessageEl = $("#error-message");
var todayWeather = $("#today-weather-card");
var fiveDayForecast = $("#five-day-forecast");


var ApiKey = "2eafffb05ee0e15aaa7a1382d485fad9";

var ApiUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + ApiKey

// Testing search button
var searchButtonHandler = function(event) {
    event.preventDefault();

    var showResults = function() {
        fetch(ApiUrl)
        .then (function (response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    console.log(data);
                })
            }
        })
    }

    showResults();
}

searchButton.on("click", searchButtonHandler);