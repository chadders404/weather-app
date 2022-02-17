//Time:
let currentTime = new Date();
let date = currentTime.getDate();

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();
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
let day = days[currentTime.getDay()];

let h3 = document.querySelector("h3");
h3.innerHTML = `Your local time: ${day} ${hours}:${minutes}`;

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

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#localTemp");
  temperatureElement.innerHTML = `${temperature}`;
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
