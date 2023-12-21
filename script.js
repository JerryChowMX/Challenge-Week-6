document.addEventListener('DOMContentLoaded', function () {
  const apiKey = "1a2459f5101f90518706926733bc8876";
  const searchButton = document.getElementById('searchButton');
  const cityInput = document.getElementById('cityInput');
  const currentWeatherDetails = document.getElementById('currentWeatherDetails');
  const forecastGrid = document.getElementById('forecastGrid');
  const searchHistory = document.getElementById('searchHistory');

  searchButton.addEventListener('click', function () {
    const city = cityInput.value.trim();
    if (city) {
      getWeatherData(city);
      addCityToHistory(city);
    }
  });

  function getWeatherData(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
        displayCurrentWeather(data);
      })
      .catch(error => console.error('Error:', error));

    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        displayForecast(data);
      })
      .catch(error => console.error('Error:', error));
  }

  function displayCurrentWeather(data) {
    currentWeatherDetails.innerHTML = `
      <h3>${data.name} (${new Date().toLocaleDateString()})</h3>
      <p>Temperature: ${data.main.temp}°F</p>
      <p>Wind Speed: ${data.wind.speed} mph</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  }

  function displayForecast(data) {
    forecastGrid.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) {
      const forecast = data.list[i];
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      forecastGrid.innerHTML += `
        <div class="forecast-card">
          <h4>${date}</h4>
          <p>Temp: ${forecast.main.temp}°F</p>
          <p>Wind: ${forecast.wind.speed} mph</p>
          <p>Humidity: ${forecast.main.humidity}%</p>
        </div>
      `;
    }
  }

  function addCityToHistory(city) {
    const cityBtn = document.createElement('button');
    cityBtn.textContent = city;
    cityBtn.classList.add('history-btn');
    cityBtn.onclick = () => getWeatherData(city);
    searchHistory.appendChild(cityBtn);
  }
});
