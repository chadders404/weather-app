//function switchTempToCentigrade (event) {
//event.preventDefault();
//let scan = document.querySelector("#localTemp");
//scan.innerHTML = "17"
//}

//function switchTempToFahrenheit (event) {
//event.preventDefault();
//let scan = document.querySelector("#localTemp");
//scan.innerHTML = "66"
//}

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
  console.log(position);
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

//Icon formatting - the idea is I will write an if statement for each Open Weather "icon" code, so it will return a different Font Awesome icon.

function formatSymbol(response) {
  if (response[0].icon === "04n");
  return `<i class="fa-solid fa-cloud"></i>`; // <---- This icon displays fine on the Font Awesome website, but displays as a square on my weather app.
}

function showTemperature(response) {
  console.log(response.data);
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
  if (temperature <= 10) {
    document.getElementById(
      "container"
    ).style.backgroundImage = `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/025/955/original/FreeVector-Rain-Background.jpg?1643503251"`;
  } else {
    document.getElementById(
      "container"
    ).style.backgroundImage = `url("https://www.hinghamanchor.com/wp-content/uploads/2021/05/marek-szturc-2s3fI3M1lO0-unsplash-scaled.jpg"`;
  }
}

function showLocationName(response) {
  console.log(response.data.name);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}

navigator.geolocation.getCurrentPosition(showPosition);

//let centigrade = document.querySelector("#centigrade");
//centigrade.addEventListener("click", switchTempToCentigrade);

//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", switchTempToFahrenheit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
