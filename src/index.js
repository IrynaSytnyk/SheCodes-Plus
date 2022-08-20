function formatDate(responseDate) {
  let date = new Date(responseDate * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let dateNumber = date.getDate();

  let months = [
    "Jan",
    "Fab",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDate = `${day}, ${dateNumber} ${month} <br /> ${hour}:${minutes}`;
  return currentDate;
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row cards">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col weather-card">
              <p>${day}</p>
              <img src="images/rain.svg" alt="storm" />
              <p class="card-temperature">28°</p>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function changeWeatherIcon(icon) {
  iconNumber = icon.slice(0, 2);
  let icons = {
    "01": "images/clear-sky.svg",
    "02": "images/few-clouds.svg",
    "03": "images/scattered-clouds.svg",
    "04": "images/broken-clouds.svg",
    "09": "images/shower-rain.svg",
    10: "images/rain.svg",
    11: "images/thunderstorm.svg",
    13: "images/snow.svg",
    50: "images/mist.svg",
  };

  document
    .querySelector("#weather-icon")
    .setAttribute("src", `${icons[iconNumber]}`);
}

function showCityTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temperature").innerHTML = celsiusTemperature;

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#country-name").innerHTML = response.data.sys.country;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  /* clear wind speed */
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
  /* end */
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt
  );

  changeWeatherIcon(response.data.weather[0].icon);
}

function searchCity(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCityTemperature);
}

function findCity(event) {
  event.preventDefault();

  let city = document.querySelector("#search-city");
  searchCity(city.value);

  event.target.reset();
}

function getGeolocation(position) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCityTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getGeolocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  fahrenheitButton.classList.remove("disabled");
  celciusButton.classList.add("disabled");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function convertToCelcius(event) {
  event.preventDefault();
  celciusButton.classList.remove("disabled");
  fahrenheitButton.classList.add("disabled");
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let apiKey = "6c9503a3751381612a45a5c2e886b63d";

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findCity);

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", convertToCelcius);

searchCity("Kyiv");
displayForecast();
