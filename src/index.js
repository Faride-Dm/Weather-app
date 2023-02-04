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
