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
    getCurrentCityWeather(searchedCity);
}

// Get current weather for searched city
var getCurrentCityWeather = function(searchedCity) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=metric&appid=" + ApiKey
    fetch(apiUrl)
    .then (function(response) {
        response.json()
        .then(function(data) {
            console.log(data,searchedCity)
            displayCityWeatherForecast(data, searchedCity);
        })
    })
};

// Display searched city's current weather
var displayCityWeatherForecast = function(currentWeather, searchedCity) {
    // Clear content ahead of new content
    todayWeather.textContent = "";
    // Adding heading for searched city
    var todayWeatherHeading = document.createElement("h2");
    todayWeatherHeading.textContent = searchedCity;
    todayWeather.appendChild(todayWeatherHeading);

    // Current date
    var currentDate = document.createElement("p");
    currentDate.textContent = moment().format("D MMM YYYY");
    todayWeather.appendChild(currentDate);

    // Current weather icon
    var currentWeatherIcon = document.createElement("img");
    currentWeatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + "@2x.png");
    todayWeather.appendChild(currentWeatherIcon);

    // Current temperature
    var currentTemp = document.createElement("p");
    currentTemp.textContent = "Temperature: " + currentWeather.main.temp + "°C"
    todayWeather.appendChild(currentTemp);

    // Current humidity
    var currentHumidity = document.createElement("p");
    currentHumidity.textContent = "Humidity: " + currentWeather.main.humidity + "%";
    todayWeather.appendChild(currentHumidity);

    // Current wind speed
    var currentWindSpeed = document.createElement("p");
    currentWindSpeed.textContent = "Wind speed: " + currentWeather.wind.speed + " metres/second";
    todayWeather.appendChild(currentWindSpeed);

    // Current UV index as a separate function due to different API call
    var lat = currentWeather.coord.lat
    var lon = currentWeather.coord.lon
    currentUvIndex(lat,lon);

    // Five Day forecast as a separate function due to difference API call
    getFiveDayForecast(lat,lon);
}

// Current UV Index fetch API function
var currentUvIndex = function(lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&units=metric&appid=" + ApiKey
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
        currentUvIndexEl.classList.add("bg-success")
    } else if (uvIndex.current.uvi > 2 && uvIndex.current.uvi <= 5) {
        currentUvIndexEl.classList.add("bg-warning");
    } else if (uvIndex.current.uvi > 5) {
        currentUvIndexEl.classList.add("bg-danger");
    };

    todayWeather.appendChild(currentUvIndexEl);
}

// Get five day forecast using separate fetch request
var getFiveDayForecast = function(lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=metric&appid=" + ApiKey

    fetch(apiUrl)
    .then (function(response) {
        response.json()
        .then (function(data) {
            console.log(data);
            displayFiveDayForecast(data);
        })
    })
}

// Display the five day forecast of the searched city
var displayFiveDayForecast = function(fiveDayWeather) {
    // Clear contents ahead of new content
    fiveDayForecast.textContent = "";

    // Adding heading for five day forecast
    var fiveDayForecastHeading = document.createElement("h3");
    fiveDayForecastHeading.textContent = "Five day forecast:";
    fiveDayForecast.appendChild(fiveDayForecastHeading);

    dailyForecast = fiveDayWeather.daily;

    // Day 1 card of five day weather forecast
    var dayOneForecast = document.createElement("div")
    dayOneForecast.classList.add("card");
    dayOneForecast.classList.add("bg-success");
    dayOneForecast.classList.add("m-2");
    fiveDayForecast.appendChild(dayOneForecast);

    // Date for day 1 of five day weather forecast
    var dayOneDate = document.createElement("p");
    dayOneDate.textContent = moment.unix(fiveDayWeather.daily[1].dt).format("D MMM Y");
    dayOneForecast.appendChild(dayOneDate);

    // Icon to show weather for day 1 of five day weather forecast
    var dayOneWeatherIcon = document.createElement("img");
    dayOneWeatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + fiveDayWeather.daily[1].weather[0].icon + "@2x.png")
    dayOneForecast.appendChild(dayOneWeatherIcon);

    // Temperature for day 1 of five day weather forecast
    var dayOneTemp = document.createElement("p");
    dayOneTemp.textContent = "Temperature: " + fiveDayWeather.daily[1].temp.day + "°C"
    dayOneForecast.appendChild(dayOneTemp);

    // Humidity for day 1 of five day weather forecast
    var dayOneHumidity = document.createElement("p");
    dayOneHumidity.textContent = "Humidity: " + fiveDayWeather.daily[1].humidity + "%"
    dayOneForecast.appendChild(dayOneHumidity);

    // Wind speed for day 1 of five day weather forecast
    var dayOneWindSpeed = document.createElement("p");
    dayOneWindSpeed.textContent = "Wind speed: " + fiveDayWeather.daily[1].wind_speed + " metres/second"
    dayOneForecast.appendChild(dayOneWindSpeed);

    // Day 2 card of five day weather forecast
    var dayTwoForecast = document.createElement("div");
    dayTwoForecast.classList.add("card");
    dayTwoForecast.classList.add("bg-success");
    dayTwoForecast.classList.add("m-2");
    fiveDayForecast.appendChild(dayTwoForecast);

    // Date for day 2 of five day weather forecast
    var dayTwoDate = document.createElement("p");
    dayTwoDate.textContent = moment.unix(fiveDayWeather.daily[2].dt).format("D MMM Y");
    dayTwoForecast.appendChild(dayTwoDate);

    // Icon to show weather for day 1 of five day weather forecast
    var dayTwoWeatherIcon = document.createElement("img");
    dayTwoWeatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + fiveDayWeather.daily[2].weather[0].icon + "@2x.png")
    dayTwoForecast.appendChild(dayTwoWeatherIcon);

    // Temperature for day 1 of five day weather forecast
    var dayTwoTemp = document.createElement("p");
    dayTwoTemp.textContent = "Temperature: " + fiveDayWeather.daily[2].temp.day + "°C"
    dayTwoForecast.appendChild(dayTwoTemp);

    // Humidity for day 1 of five day weather forecast
    var dayTwoHumidity = document.createElement("p");
    dayTwoHumidity.textContent = "Humidity: " + fiveDayWeather.daily[2].humidity + "%"
    dayTwoForecast.appendChild(dayTwoHumidity);

    // Wind speed for day 1 of five day weather forecast
    var dayTwoWindSpeed = document.createElement("p");
    dayTwoWindSpeed.textContent = "Wind speed: " + fiveDayWeather.daily[2].wind_speed + " metres/second"
    dayTwoForecast.appendChild(dayTwoWindSpeed);

    console.log(fiveDayWeather.daily[0]);
    console.log(fiveDayWeather.daily[1]);
    console.log(fiveDayWeather.daily[2]);
}

searchButton.addEventListener("click", searchButtonHandler);