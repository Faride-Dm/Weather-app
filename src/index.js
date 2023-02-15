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
  return `${weekDay} ${hours}:${minutes} <br /> ${dateInMonth} ${yearMonths} ${year} <br />`;
}

let now = new Date();
let dayOfTheWeek = document.querySelector("#date");
dayOfTheWeek.innerHTML = formatDate(now);

function displayForcast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
        <div class="weather-forecast-date">${day}</div>
        <h2>🌦</h2>
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">6° </span>
          <span class="weather-forecast-temperature-min">2° </span>
        </div>
      </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Weather of the Selected City
function chooseCity(event) {
  event.preventDefault();
  let chosenCity = document.querySelector(".search-input");
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temp");
  let city = document.querySelector("#selected-city");
  let cityName = response.data.name;
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humidity");
  let wind = Math.round(response.data.wind.speed);
  let windy = document.querySelector("#wind");
  let feelsLike = document.querySelector("#feels-like");

  celsiusTemperature = response.data.main.temp;

  temp.innerHTML = temperature;
  city.innerHTML = `${cityName} <br />`;
  humid.innerHTML = `<br /> Humidity: ${humidity}%,  `;
  windy.innerHTML = `Wind: ${wind} Km/H <br />`;
  feelsLike.innerHTML = `It feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
}

displayForcast();

let searchCity = document.querySelector("#choose-city");
searchCity.addEventListener("submit", chooseCity);

// Celsius/Fahrenheit temperature switch
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//dark mode toggle

window.setTheFocus = function setTheFocus() {
  toggleBackground();
};
function toggleBackground() {
  let element = document.body;
  element.classList.toggle("dark-mode");
}
