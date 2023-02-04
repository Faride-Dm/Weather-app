// Current Date
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = days[day];
  dayOfTheWeek.innerHTML = `${weekDay} ${hours}:${minutes} <br />`;

  let month = date.getMonth();
  let months = [
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

  let yearMonths = months[month];

  let dateInMonth = date.getDate();
  let year = date.getFullYear();
  return `${weekDay} ${hours}:${minutes} <br /> ${dateInMonth} ${yearMonths} ${year}`;
}

let now = new Date();
let dayOfTheWeek = document.querySelector("#date");
dayOfTheWeek.innerHTML = formatDate(now);

// Weather of the Selected City
function chooseCity(event) {
  event.preventDefault();
  let city = document.querySelector("#selected-city");
  let chosenCity = document.querySelector("#data-list");
  city.innerHTML = chosenCity.value;

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temp");
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humidity");
  let wind = response.data.wind.speed;
  let windy = document.querySelector("#wind");
  temp.innerHTML = temperature;
  humid.innerHTML = `Humidity ${humidity},  `;
  windy.innerHTML = `Wind ${wind}`;
}

let searchCity = document.querySelector("#choose-city");
searchCity.addEventListener("submit", chooseCity);

// Current location button
function location(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showWeather);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = temperature;
  let city = document.querySelector("#selected-city");
  let cityName = response.data.name;
  city.innerHTML = `${cityName} <br />`;
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `<br /> Humidity ${humidity},  `;
  let wind = response.data.wind.speed;
  let windy = document.querySelector("#wind");
  windy.innerHTML = `Wind ${wind}`;
  let description = response.data.weather[0].description;
  button.innerHTML = description;
}

let button = document.querySelector("#current-location");
button.addEventListener("click", location);

// Celsius/Fahrenheit temperature switch
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
