require('./index.css');
const { Weather } = require('./Weather');
const { UI } = require('./UI')
const { Store } = require('./Store');

//Data localStorage
const storage = new Store();
const { city, countryCode } = storage.getLocationData();

// Data API
const weather = new Weather(city, countryCode);

// User Interface
const ui = new UI();

async function fetchWeather(){
  const data = await weather.getWeather();
  ui.render(data);
}

document.getElementById('w-change-btn').addEventListener('click', (e) =>{
  const city = document.getElementById('city').value;
  const countryCode = document.getElementById('countryCode').value;
  e.preventDefault();
  weather.changeLocation(city, countryCode);
  storage.setLocationData(city, countryCode);
  fetchWeather();
});

//When app is loaded
document.addEventListener('DOMContentLoaded', fetchWeather);
