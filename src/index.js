function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function searchCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${citySearch.value}`;
  search(citySearch.value);
}
search("San Diego");

function displayForecast(response) {

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index =0;index < 4;index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-0">
                <h3>
                        ${formatHours(forecast.dt * 1000)}
                </h3>
                        <li>
                        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                    </li>
                    <div class="weather-forecast-temperature">
                    <strong>${Math.round(forecast.main.temp_max)}°F</strong> | ${Math.round(forecast.main.temp_min)}°F
                      </div>
              </div>
              `;
  }
}

function search(city) {
  let apiKey = "72a6f55e4b65680441a701dfe7a8721f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°F`;
  let weatherDescription = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${weatherDescription}`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);


   showMessage(weatherDescription);
}

function showMessage(weatherDescription) {
  let messageElement = document.querySelector("#message");
  if (weatherDescription === "Clear"){
    messageElement.innerHTML = "It's a good day for a walk! 🙂";
  } else if (weatherDescription === "Clouds") {
    messageElement.innerHTML = "A cloudy sky doesn't always cry rain! ☁️";
  } else if (weatherDescription === "Rain") {
    messageElement.innerHTML = "Let a smile be your umbrella! ☂️";
  } else if (weatherDescription === "Drizzle"){
    messageElement.innerHTML = "Let a smile be your umbrella! ☂️";
  } else if (weatherDescription === "Thunderstorm") {
    messageElement.innerHTML = "After a storm comes a calm! ⚡️";
  }
  else if (weatherDescription === "Snow") {
    messageElement.innerHTML = "Let it snow, let it snow, let it snow!❄️";
  } else {
    messageElement.innerHTML = "It's a good day to have a good day! 🙂";
}
}