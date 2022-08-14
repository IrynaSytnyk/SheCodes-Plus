function formatDate(date) {
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

  let minutes = date.getMinutes();

  let currentDate = `${day}, ${dateNumber} ${month} <br /> ${hour}:${minutes}`;
  return currentDate;
}

let currentDate = formatDate(new Date());
let date = document.querySelector("#current-date");
date.innerHTML = currentDate;

let apiKey = "6c9503a3751381612a45a5c2e886b63d";

function showCityTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temperature").innerHTML = currentTemperature;

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#country-name").innerHTML = response.data.sys.country;
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

function showCurrentLocation(event) {
  event.preventDefault();

  function getGeolocation(position) {
    let latitude = position.coords.latitude;
    let longtitude = position.coords.longitude;

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showCityTemperature);
  }

  navigator.geolocation.getCurrentPosition(getGeolocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findCity);

/*
function clickFahrenheit() {
  let fahrenheitButton = document.querySelector("#fahrenheit-button");
  fahrenheitButton.classList.add("enabled");
  fahrenheitButton.classList.remove("disabled");

  let celciusButton = document.querySelector("#celcius-button");
  celciusButton.classList.add("disabled");
  celciusButton.classList.remove("enabled");
}

function clickCelcius() {
  let fahrenheitButton = document.querySelector("#fahrenheit-button");
  fahrenheitButton.classList.add("disabled");
  fahrenheitButton.classList.remove("enabled");

  let celciusButton = document.querySelector("#celcius-button");
  celciusButton.classList.add("enabled");
  celciusButton.classList.remove("disabled");
}

function convertToFahrenheit(event) {
  event.preventDefault();

  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = "71";

  clickFahrenheit();
}

function convertToCelcius(event) {
  event.preventDefault();

  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = "25";

  clickCelcius();
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", convertToCelcius);
*/
