let forecast = document.querySelector(`#forecast`);
let temperature = document.querySelector(`#temperature`);
let time = document.querySelector(`#time`);
let display = document.querySelector(`#display`);

let longitude;
let latitude;

async function weather_forecast(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=3c074934c56a463e427c8b09c10b8493`
  );
  const data = await response.json();
  display.innerHTML = `
    <div class="location">
      <section>
        <h3 class="data">Country: ${data.sys.country}</h3>
      </section>
      <section>
        <h3 class="data">City: ${data.name}</h3>
      </section>
    </div>
    <div class="forecast">
      <section>
        <h5>Current<br>Weather</h5>
        <img class="weather" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <h3 class="data">${data.weather[0].main}</h3>
      </section>
      <section>
        <h5>Temperature</h5>
        <img class="heat" src="./images/heat.svg">
        <h3 class="data">${(data.main.temp).toFixed(2)}°C</h3>
      </section>
      <section>
        <h5>Wind Speed</h5>
        <img class="wind" src="./images/anemometer.svg">
        <h3 class="data">${data.wind.speed} mtr/sec</h3>
      </section>
      <section>
        <h5>Humidity</h5>
        <img class="humidity" src="./images/humidity.svg">
        <h3 class="data">${data.main.humidity}%</h3>
      </section>
    </div>
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

