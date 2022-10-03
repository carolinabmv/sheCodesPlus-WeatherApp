//Date and time
let daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthsOfTheYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentWeekDay = daysOfTheWeek[new Date().getDay()];
let currentMonth = monthsOfTheYear[new Date().getMonth()];
let currentWeekDate = new Date().getDate();
document.querySelector(
  "#date-today"
).innerHTML = `${currentWeekDay} | ${currentMonth} ${currentWeekDate}`;

let currentHour = new Date().getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = new Date().getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let currentTime = `${currentHour}:${currentMinute}`;
document.querySelector("#time-now").innerHTML = currentTime;

//City

function getCityFromSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;

  searchCity(city);
}
document
  .querySelector("#form-search-city")
  .addEventListener("submit", getCityFromSubmit);

function searchCity(city) {
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureAndCity);
}
searchCity("Oslo");

//Display temperature and temperature conversion C/F

function showTemperatureAndCity(response) {
  let realTemperatureC = Math.round(response.data.main.temp);
  let realTemperatureF = Math.round(realTemperatureC * 1.8 + 32);

  document.querySelector("#temperature").innerHTML = `${realTemperatureC}º`;
  document.querySelector(".city").innerHTML = `${response.data.name}`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}ºC `;
  document.querySelector("#max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}ºC`;
  document.querySelector("#min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}ºC`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#windspeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;

  function convertTempToF(event) {
    document.querySelector("#temperature").innerHTML = `${realTemperatureF}º`;
  }

  let changeTempToF = document.querySelector("#tempF");
  changeTempToF.addEventListener("click", convertTempToF);

  function convertTempToC(event) {
    document.querySelector("#temperature").innerHTML = `${realTemperatureC}º`;
  }
  let changeTempC = document.querySelector("#tempC");
  changeTempC.addEventListener("click", convertTempToC);
}

//Current location

function showWeatherCurrentLocation(response) {
  let realTemperatureC = Math.round(response.data.main.temp);
  let realTemperatureF = Math.round(realTemperatureC * 1.8 + 32);
  document.querySelector("#temperature").innerHTML = `${realTemperatureC}º`;
  document.querySelector(".city").innerHTML = `${response.data.name}`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}ºC `;
  document.querySelector("#max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}ºC`;
  document.querySelector("#min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}ºC`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#windspeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;

  function convertTempToF(event) {
    document.querySelector("#temperature").innerHTML = `${realTemperatureF}º`;
  }

  let changeTempToF = document.querySelector("#tempF");
  changeTempToF.addEventListener("click", convertTempToF);

  function convertTempToC(event) {
    document.querySelector("#temperature").innerHTML = `${realTemperatureC}º`;
  }
  let changeTempC = document.querySelector("#tempC");
  changeTempC.addEventListener("click", convertTempToC);
}
function getCoords(position) {
  let latitude = Math.round(position.coords.latitude);
  let longitude = Math.round(position.coords.longitude);
  let apiUrlCurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=62231151ce343c4d68652e1617efc22f&units=metric`;
  axios.get(apiUrlCurrentLocation).then(showWeatherCurrentLocation);
}
function getcurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(getCoords);
}

let currentLocationButton = document.querySelector("#location-icon");
currentLocationButton.addEventListener("click", getcurrentPosition);
