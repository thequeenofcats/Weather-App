import "./style.css";
import "./reset.css";

const units = document.querySelector(".units");
const cityForecastElement = document.querySelector(".city-on-forecast");
const infoElement = document.querySelector(".info");
const minTempElement = document.querySelector(".detail-min-temp");
const maxTempElement = document.querySelector(".detail-max-temp");
const humidityElement = document.querySelector(".detail-humidity");
const windElement = document.querySelector(".detail-wind");
const sunriseElement = document.querySelector(".detail-sunrise");
const sunsetElement = document.querySelector(".detail-sunset");
const statusImg = document.querySelector(".status-img");
const searchInput = document.querySelector("#search");
const currentTemp = document.querySelector(".temp");
const currentTempUnit = document.querySelector(".current-temp-unit");

const API_ID = "3bbd7ee48b8a631e284ba0e3b341a009";
let unit = "&units=metric";
let degrees = "°C";
let windUnits = " m/s";

// Get weather data

async function getWeatherData(cityName) {
  const responseWeather = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      API_ID +
      unit,
    { mode: "cors" }
  );

  const weatherData = await responseWeather.json();
  const feelsLike = weatherData.main.feels_like;
  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const tempMax = weatherData.main.temp_max;
  const tempMin = weatherData.main.temp_min;
  const name = weatherData.name;
  const country = weatherData.sys.country;
  const icon = weatherData.weather[0].icon;
  const description = weatherData.weather[0].description;
  const wind = weatherData.wind.speed;
  const timezone = weatherData.timezone;
  const sunriseTime = new Date(
    (weatherData.sys.sunrise + timezone) * 1000
  ).toString();
  const sunsetTime = new Date(
    (weatherData.sys.sunset + timezone) * 1000
  ).toString();
  let sunrise = sunriseTime.slice(16, 21);
  const sunset = sunsetTime.slice(16, 21);
  cityForecastElement.textContent = name + ", " + country;
  infoElement.textContent =
    "Feels like " + Math.ceil(feelsLike) + degrees + ", " + description + ".";
  currentTemp.textContent = Math.ceil(temp);
  minTempElement.textContent = Math.ceil(tempMin) + degrees;
  maxTempElement.textContent = Math.ceil(tempMax) + degrees;
  humidityElement.textContent = humidity + "%";
  windElement.textContent = wind + windUnits;
  statusImg.src = "/src/icons/" + icon + ".png";
  sunriseElement.textContent = sunrise;
  sunsetElement.textContent = sunset;
  currentTempUnit.textContent = degrees;
}

// change units

function changeUnits() {
  const metric = document.querySelector(".metric");
  const imperial = document.querySelector(".imperial");
  if (unit === "&units=metric") {
    unit = "&units=imperial";
    metric.style.display = "none";
    imperial.style.display = "flex";
    degrees = "°F";
    windUnits = " mph";
  } else if (unit === "&units=imperial") {
    unit = "&units=metric";
    imperial.style.display = "none";
    metric.style.display = "flex";
    degrees = "°C";
    windUnits = " m/s";
  }
}

units.addEventListener("click", changeUnits);

searchInput.addEventListener("keydown", function (e) {
  const enter = e.key;
  const city = searchInput.value;
  if (enter === "Enter") {
    getWeatherData(city);
  }
});

getWeatherData("Ljubljana");
