function switchTempToCentigrade(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#localTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function switchTempToFahrenheit(event) {
  event.preventDefault();
  fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#localTemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    let units = "metric";
    let apiKey = "74284988913c466762956594e85e02f8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=${units}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  } else {
    alert("Please search for a city");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "74284988913c466762956594e85e02f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  let apiLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
  axios.get(`${apiLocationUrl}&appid=${apiKey}`).then(showLocationName);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}
function getForecasts(coordinates) {
  let apiKey = "74284988913c466762956594e85e02f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecasts);
}

function displayForecasts(response) {
  let forecastDays = response.data.daily;

  let forecastsElement = document.querySelector("#forecasts");

  let forecastsHTML = `<div class="row">`;
  forecastDays.forEach(function (forecastDays, index) {
    if (index > 0 && index < 7) {
      let tempMin = Math.round(forecastDays.temp.min);
      let tempMax = Math.round(forecastDays.temp.max);

      //let forecastSymbol = "#Symbol";
      //forecastSymbol.innerHTML = formatSymbol(forecastDays.weather);

      forecastsHTML =
        forecastsHTML +
        `<div class="col">
            <div class="card bg-white p-3 mb-2 text-dark" style="width: flex">
              <div class="card-body">
                <h5 class="Symbol">
                <img src= "http://openweathermap.org/img/wn/${
                  forecastDays.weather[0].icon
                }@2x.png"
                alt = ""
                width = "45" /></h5>
                <h5 class="forecastDay">${formatDay(forecastDays.dt)}</h5>
                <p class="forecastTemp"><scan class= "tempMin">${tempMin}°</scan>   <strong class= "tempMax">${tempMax}°</strong></p>
              </div>
            </div>
          </div>`;
    }
  });
  forecastsHTML = forecastsHTML + `</div>`;
  forecastsElement.innerHTML = forecastsHTML;
}

function formatSymbol(response) {
  if (response[0].icon === "01d") {
    return `<i class="fas fa-sun"></i>`;
  } else if (response[0].icon === "01n") {
    return `<i class="fas fa-moon"></i>`;
  } else if (response[0].icon === "02d") {
    return `<i class="fas fa-cloud-sun"></i>`;
  } else if (response[0].icon === "02n") {
    return `<i class="fas fa-cloud-moon"></i>`;
  } else if (
    response[0].icon === "04n" ||
    response[0].icon === "04d" ||
    response[0].icon === "03n" ||
    response[0].icon === "03d"
  ) {
    return `<i class="fas fa-cloud"></i>`;
  } else if (response[0].icon === "09n" || response[0].icon === "09d") {
    return `<i class="fas fa-cloud-showers-heavy"></i>`;
  } else if (response[0].icon === "10n") {
    return `<i class="fas fa-cloud-moon-rain"></i>`;
  } else if (response[0].icon === "10d") {
    return `<i class="fas fa-cloud-sun-rain"></i>`;
  } else if (response[0].icon === "11n" || response[0].icon === "11d") {
    return `<i class="fas fa-poo-storm"></i>`;
  } else if (response[0].icon === "13n" || response[0].icon === "13d") {
    return `<i class="fas fa-snowflake"></i>`;
  } else if (response[0].icon === "50n" || response[0].icon === "50d") {
    return `<i class="fas fa-smog"></i>`;
  }
}

function formatBackground(response) {
  if (response[0].icon === "01d") {
    return `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/590/original/01d.jpg?1645326234"`;
  } else if (response[0].icon === "01n") {
    return `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/591/original/01n.jpg?1645326270"`;
  } else if (response[0].icon === "02d") {
    return `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/592/original/02d.jpg?1645326311"`;
  } else if (response[0].icon === "02n") {
    return `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/593/original/02n.jpg?1645326349"`;
  } else if (
    response[0].icon === "04n" ||
    response[0].icon === "04d" ||
    response[0].icon === "03n" ||
    response[0].icon === "03d"
  ) {
    return `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/594/original/03d03n04d04n.jpg?1645326386"`;
  } else if (
    response[0].icon === "09n" ||
    response[0].icon === "09d" ||
    response[0].icon === "10n" ||
    response[0].icon === "10d"
  ) {
    return `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/587/original/09d09n10d10n.jpg?1645325807"`;
  } else if (response[0].icon === "11n" || response[0].icon === "11d") {
    return `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/595/original/11d11n.jpg?1645326436"`;
  } else if (response[0].icon === "13n" || response[0].icon === "13d") {
    return `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/589/original/13d13n.jpg?1645326072"`;
  } else if (response[0].icon === "50n" || response[0].icon === "50d") {
    return `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/596/original/50d50n.jpg?1645326517"`;
  }
}

function showTemperature(response) {
  celsiusTemp = response.data.main.temp;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#localTemp");
  let descriptionElement = document.querySelector("#descriptionElement");
  let description = response.data.weather[0].description;
  descriptionElement.innerHTML = `${description}`;
  temperatureElement.innerHTML = `${temperature}`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `${humidity}`;
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${windSpeed}`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let largeSymbolElement = document.querySelector("#largeSymbol");
  largeSymbolElement.innerHTML = formatSymbol(response.data.weather);
  document.getElementById("container").style.backgroundImage = formatBackground(
    response.data.weather
  );
  getForecasts(response.data.coord);
}

function showLocationName(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}

navigator.geolocation.getCurrentPosition(showPosition);

let celsiusTemp = null;

let centigrade = document.querySelector("#centigrade");
centigrade.addEventListener("click", switchTempToCentigrade);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", switchTempToFahrenheit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

displayForecasts();
