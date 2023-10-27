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
  
  let currentHumidity = document.querySelector("#humidity");
  let humid = Math.round(response.data.main.humidity);
  currentHumidity.innerHTML = `${humid}%`;
  
  let currentRealFeel = document.querySelector("#real-temp");
  let realFeel = Math.round(response.data.main.feels_like);
  currentRealFeel.innerHTML = `${realFeel}°C `;
  
  let currentMaxTemp = document.querySelector("#current-max");
  let tempMax = Math.round(response.data.main.temp_max);
  currentMaxTemp.innerHTML = `${tempMax}°C `;
  
  let currentMinTemp = document.querySelector("#current-min");
  let tempMin = Math.round(response.data.main.temp_min);
  currentMinTemp.innerHTML = `${tempMin}°C `;

  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  
}


let city = "Choluteca"
let apiKey = "f16cae8dd5b86ff5840e0c571a06e631";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showWeather)

