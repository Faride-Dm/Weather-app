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

function formatDay(forecastDt) {
  let forecastDate = new Date(forecastDt * 1000);
  let forecastDay = forecastDate.getDay();
  let forecastDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return forecastDays[forecastDay];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  // console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
      <div class="col">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img class="iconElement" alt="${
          forecastDay.weather[0].description
        }" src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  // console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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
  let currentIcon = document.querySelector(".currentWeatherIcon");

  celsiusTemperature = response.data.main.temp;

  temp.innerHTML = temperature;
  city.innerHTML = `${cityName} <br />`;
  humid.innerHTML = `<br /> Humidity: <strong id="humid-percent">${humidity}%</strong>,  `;
  windy.innerHTML = `Wind: <strong id="speed">${wind} Km/H</strong> <br />`;
  feelsLike.innerHTML = `It feels like <strong id="feel-temp">${Math.round(
    response.data.main.feels_like
  )}°C</strong>`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  currentIcon.setAttribute("alt", response.data.weather[0].description);
  // console.log(response.data);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function chooseCity(event) {
  event.preventDefault();
  let chosenCity = document.querySelector(".search-input");
  search(chosenCity.value);
}

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

let now = new Date();
let dayOfTheWeek = document.querySelector("#date");
dayOfTheWeek.innerHTML = formatDate(now);

let searchCity = document.querySelector("#input-city");
searchCity.addEventListener("submit", chooseCity);

celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//dark mode toggle

const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

search("Edinburgh");
