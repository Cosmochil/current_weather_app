let forecast = document.querySelector(`#forecast`);
let temperature = document.querySelector(`#temperature`);
let time = document.querySelector(`#time`);
let display = document.querySelector(`#display`);

let longitude;
let latitude;

function f_to_c(temp) {
  return (temp - 32) / 1.8
  
}
async function weather_forecast(lat, lon) {
  const response = await fetch(
    `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3c074934c56a463e427c8b09c10b8493`
  );
  const data = await response.json();
  display.innerHTML = `
    <section>
      <h5>Location</h5>
      <h3 class="data">Country: ${data.sys.country}</h3>
      <h3 class="data">City: ${data.name}</h3>
    </section>
    <section>
      <h5>Current<br>Weather</h5>
      <h3 class="data">${data.weather[0].main}</h3>
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    </section>
    <section>
      <h5>Current<br>Temperature</h5>
      <img class="heat" src="./images/heat.svg">
      <h3 class="data">${f_to_c(data.main.temp).toFixed(2)}</h3>
    </section>
    <section>
      <h5>Wind Speed</h5>
      <img class="wind" src="./images/anemometer.svg">
      <h3 class="data">${data.wind.speed} miles/hr</h3>
    </section>
    <section>
      <h5>Humidity</h5>
      <h3 class="data">${data.main.humidity}</h3>
    </section>
    `;
}


function getGeolocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      longitude = Math.round(longitude);
      latitude = Math.round(latitude);
      weather_forecast(latitude, longitude);
    })
  }
}

window.addEventListener("load", ()=> {
  getGeolocation();
})

