function formatDate(timestamp) {

  let date = new Date(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes<10) {
    minutes = `0${minutes}`
  };

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;


}


function showWeather(response) {
  let temperatureElement = document.querySelector("#main-current-temp");
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#search-input-city");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}°C `;
  celsiusTemperature =Math.round(response.data.main.temp);
  
  let currentHumidity = document.querySelector("#humidity");
  let humid = Math.round(response.data.main.humidity);
  currentHumidity.innerHTML = `${humid}%`;
  
  
  let currentRealFeel = document.querySelector("#real-temp");
  let realFeel = Math.round(response.data.main.feels_like);
  currentRealFeel.innerHTML = `${realFeel}°C `;
  celsiusRealFeel = Math.round(response.data.main.feels_like);
  
  let currentMaxTemp = document.querySelector("#current-max");
  let tempMax = Math.round(response.data.main.temp_max);
  currentMaxTemp.innerHTML = `${tempMax}°C `;
  celsiusMaxTemp = Math.round(response.data.main.temp_max);
  
  let currentMinTemp = document.querySelector("#current-min");
  let tempMin = Math.round(response.data.main.temp_min);
  currentMinTemp.innerHTML = `${tempMin}°C `;
  celsiusMinTemp = Math.round(response.data.main.temp_min);

  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#weather-icon")
  let weatherIcon = response.data.weather[0].icon
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
}

function searchCity(city) {

  let apiKey = "f16cae8dd5b86ff5840e0c571a06e631";
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather)

}



function handleSubmit(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#search-city");
  searchCity(inputElement.value);
}


function convertFarenheit(event) {
  event.preventDefault();
  let farenheitTemp = (celsiusTemperature * 9)/5  + 32;
  let temperatureElement = document.querySelector("#main-current-temp");
  temperatureElement.innerHTML = `${Math.round(farenheitTemp)}°F`;

  let currentRealFeel = document.querySelector("#real-temp");
  let farenheitRealFeel = Math.round((celsiusRealFeel * 9)/5 + 32);
  currentRealFeel.innerHTML = `${farenheitRealFeel}°F `;

  let currentMaxTemp = document.querySelector("#current-max");
  let farenheitMaxTemp = Math.round((celsiusMaxTemp * 9)/5 + 32);
  currentMaxTemp.innerHTML = `${farenheitMaxTemp}°F `;
  
  let currentMinTemp = document.querySelector("#current-min");
  let farenheitMinTemp = Math.round((celsiusMinTemp * 9)/5 + 32);
  currentMinTemp.innerHTML = `${farenheitMinTemp}°F `;



  farenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");

}


function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-current-temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;

  let currentRealFeel = document.querySelector("#real-temp");
  currentRealFeel.innerHTML = `${Math.round(celsiusRealFeel)}°C `;

  let currentMaxTemp = document.querySelector("#current-max");
  currentMaxTemp.innerHTML = `${Math.round(celsiusMaxTemp)}°C `;
  
  let currentMinTemp = document.querySelector("#current-min");
  currentMinTemp.innerHTML = `${Math.round(celsiusMinTemp)}°C `;

  farenheitElement.classList.remove("active");
  celsiusElement.classList.add("active");

}




let celsiusTemperature = null; //keeps track of celsius temperature and stores it to be used later
let celsiusRealFeel = null;
let celsiusMaxTemp=null;
let celsiusMinTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitElement = document.querySelector("#display-farenheit")
farenheitElement.addEventListener("click", convertFarenheit)

let celsiusElement = document.querySelector("#display-celsius")
celsiusElement.addEventListener("click", convertCelsius)


searchCity("Milan");



