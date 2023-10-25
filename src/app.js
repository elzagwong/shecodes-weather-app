let currentDate = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[currentDate.getDay()];

let currentDay = document.querySelector("#h2date-time");

let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

currentDay.innerHTML = `${day} ${hours}:${minutes}` 



//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. 
//When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.


let activeCelsius = document.querySelector("#celsius");
let activeFaren = document.querySelector("#faren");
let mainCurrentTemp = document.querySelector("#main-current-temp");

activeCelsius.addEventListener("click", changeUnitC)
activeFaren.addEventListener("click", changeUnitF)

function changeUnitC(event) {
  event.preventDefault();

  activeCelsius.classList.add("active");
  //activeCelsius.classList.remove("btn-primary");
  activeFaren.classList.remove("active");
  
  let mainCurrentTemp = document.querySelector("#main-current-temp");
  mainCurrentTemp.innerHTML ="21°C" ;

  let mainMaxMin = document.querySelector("#main-maxmin");
  mainMaxMin.innerHTML = "28°/14°";
  let realTemp = document.querySelector("#real-temp");
  realTemp.innerHTML = "22°C";

}

function changeUnitF(event) {
  event.preventDefault();
  
  
  
  activeFaren.classList.add("active");
  //activeFaren.classList.remove("btn-primary");
  activeCelsius.classList.remove("active");
  
  let mainCurrentTemp = document.querySelector("#main-current-temp");
  mainCurrentTemp.innerHTML ="70°F";
  
  activeFaren.classList.replace("#faren",'clicked');
  activeCelsius.classList.replace("celsius",'unclicked');

  let mainMaxMin = document.querySelector("#main-maxmin");
  mainMaxMin.innerHTML = "82°/57°";
  let realTemp = document.querySelector("#real-temp");
  realTemp.innerHTML = "72°F";

}


//In your project, when a user searches for a city (example: New York), 
//it should display the name of the city on the result page and the current temperature of the city.


let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity)
// let apiKey = "f16cae8dd5b86ff5840e0c571a06e631";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${apiKey}&units=metric`;


function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");
  let citySearch = document.querySelector("#search-input-city");
  let city = searchInput.value 
  let apiKey = "f16cae8dd5b86ff5840e0c571a06e631";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


  axios.get(apiUrl).then(showTemp);
  axios.get(apiUrl).then(showHumidity);
  axios.get(apiUrl).then(showRealFeel);
  axios.get(apiUrl).then(showMaxTemp);
  axios.get(apiUrl).then(showMinTemp);


  if (city) {
    citySearch.innerHTML = `${city}`; 
  } else {
    alert("Please enter a city.");
  }
}


function showTemp(response) {
let temp = Math.round(response.data.main.temp);
let currentCity = document.querySelector("#search-input-city");
currentCity.innerHTML = response.data.name;
let currentTempCity = document.querySelector("#main-current-temp");
currentTempCity.innerHTML = `${temp}°C `;
}


function showHumidity(response) {
let humid = Math.round(response.data.main.humidity);
console.log(humid);
let currentHumidity = document.querySelector("#humidity");
currentHumidity.innerHTML = `${humid}%`;
}

function showRealFeel(response) {
let realFeel = Math.round(response.data.main.feels_like);
console.log(realFeel);
let currentRealFeel = document.querySelector("#real-temp");
currentRealFeel.innerHTML = `${realFeel}°C `;
}

function showMaxTemp(response) {
  let tempMax = Math.round(response.data.main.temp_max);
  console.log(tempMax);
  let currentMaxTemp = document.querySelector("#current-max");
  currentMaxTemp.innerHTML = `${tempMax}°C `;
}

function showMinTemp(response) {
  let tempMin = Math.round(response.data.main.temp_min);
  console.log(tempMin);
  let currentMinTemp = document.querySelector("#current-min");
  currentMinTemp.innerHTML = `${tempMin}°C `;
}
  
// Add a Current Location button. 
// When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
 

let searchPosition = document.querySelector("#search-location");
searchPosition.addEventListener("click", retrievePosition)
// let apiKey = "f16cae8dd5b86ff5840e0c571a06e631";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${apiKey}&units=metric`;




function retrievePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "f16cae8dd5b86ff5840e0c571a06e631";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  
  
  axios.get(apiUrl).then(showTemp);
  // axios.get(apiUrl).then(showHumidityPosition);
  // axios.get(apiUrl).then(showRealFeelPosition);
  // axios.get(apiUrl).then(showMaxTempPosition);
  // axios.get(apiUrl).then(showMinTempPosition);

  
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

// function showTempPosition(response) {
//   let temp = Math.round(response.data.main.temp);
  
//   let currentCity = document.querySelector("#search-input-city")
//   currentCity.innerHTML = response.data.name;
//   let currentTempCity = document.querySelector("#main-current-temp");
//   currentTempCity.innerHTML = `${temp}°C `;
//   }
  
  
