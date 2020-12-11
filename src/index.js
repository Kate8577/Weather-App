let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${citySearch.value}`;
  search(citySearch.value);
}
function search(city) {
  let apiKey = "72a6f55e4b65680441a701dfe7a8721f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°F`;

  let weatherDescription = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${weatherDescription}`;
}