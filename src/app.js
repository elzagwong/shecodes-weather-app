function formatDate(timestamp) {

  let date = new Date(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes<10) {
    minutes = `0${minutes}`
  };

  let daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let weekday = daysWeek[date.getDay()];
  return `${weekday} ${hour}:${minutes}`;


}


function showWeather(response) {
  let temperatureElement = document.querySelector("#main-current-temp");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#search-input-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}°C `;
  celsiusTemperature =Math.round(response.data.temperature.current);
  
  let currentHumidity = document.querySelector("#humidity");
  let humid = Math.round(response.data.temperature.humidity);
  currentHumidity.innerHTML = `${humid}%`;
  
  
  let currentRealFeel = document.querySelector("#real-temp");
  let realFeel = Math.round(response.data.temperature.feels_like);
  currentRealFeel.innerHTML = `${realFeel}°C `;
  celsiusRealFeel = Math.round(response.data.temperature.feels_like);

  
  // let currentMaxTemp = document.querySelector("#current-max");
  // let tempMax = Math.round(response.data.main.temp_max);
  // currentMaxTemp.innerHTML = `${tempMax}°C `;
  // celsiusMaxTemp = Math.round(response.data.main.temp_max);
  
  // let currentMinTemp = document.querySelector("#current-min");
  // let tempMin = Math.round(response.data.main.temp_min);
  // currentMinTemp.innerHTML = `${tempMin}°C `;
  // celsiusMinTemp = Math.round(response.data.main.temp_min);

  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#weather-icon")
  let weatherIcon = response.data.condition.icon
  iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIcon}.png`)



 getForecast(response.data.city)

}

function searchCity(city) {

  let apiKey = "32464c0t915a235858a6af28ccbb4oa0";
  let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //console.log(apiUrl)
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

  // let currentMaxTemp = document.querySelector("#current-max");
  // let farenheitMaxTemp = Math.round((celsiusMaxTemp * 9)/5 + 32);
  // currentMaxTemp.innerHTML = `${farenheitMaxTemp}°F `;
  
  // let currentMinTemp = document.querySelector("#current-min");
  // let farenheitMinTemp = Math.round((celsiusMinTemp * 9)/5 + 32);
  // currentMinTemp.innerHTML = `${farenheitMinTemp}°F `;



  farenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");

}


function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-current-temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;

  let currentRealFeel = document.querySelector("#real-temp");
  currentRealFeel.innerHTML = `${Math.round(celsiusRealFeel)}°C `;

  // let currentMaxTemp = document.querySelector("#current-max");
  // currentMaxTemp.innerHTML = `${Math.round(celsiusMaxTemp)}°C `;
  
  // let currentMinTemp = document.querySelector("#current-min");
  // currentMinTemp.innerHTML = `${Math.round(celsiusMinTemp)}°C `;

  farenheitElement.classList.remove("active");
  celsiusElement.classList.add("active");

}

function forecastDate(timestamp) {

  let date = new Date(timestamp *1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];

}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  //let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]; 
  let forecastHTML = "";

  response.data.daily.forEach(function (day,index) {
    if (index < 6) {
    forecastHTML = forecastHTML + `<div class="weather-forecast-days" style="width: 100%">
            <div class="forecast-day">${forecastDate(day.time)}</div>
              <img src="${day.condition.icon_url}" class="forecast-icon"/>
            <div class = "forecast-max-min">
                <span class="forecast-max">${Math.round(day.temperature.maximum)}°</span>
                /
                <span class="forecast-min ">${Math.round(day.temperature.minimum)}°</span>
            </div>
        </div>

      `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(cityElement) {
  let apiKey = "32464c0t915a235858a6af28ccbb4oa0";
  let apiUrl= `https://api.shecodes.io/weather/v1/forecast?query=${cityElement}&key=${apiKey}&units=metric`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast)

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


searchCity("Bologna");
//getForecast();

