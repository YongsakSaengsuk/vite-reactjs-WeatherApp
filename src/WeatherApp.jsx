import React, { useState, useEffect } from "react";
import "./WeatherApp.css";
function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Bangkok");
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your OpenWeather API key

  const fetchWeather = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`City not found: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setWeather(null);
      });
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <div className="weather-app">
      <div className="main-forcast">
        <div className="topbar">
          <div>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleSearch}>Get Weather</button>
          </div>
          <div>date</div>
        </div>
        <div className="main-content">
          <div>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {weather && (
              <div>
                <h1>{weather.main.temp}°C</h1>
                <h2>{weather.weather[0].description}</h2>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
              </div>
            )}
          </div>
          <div>
            <h2>Details</h2>
            <p>Humidity: {weather && weather.main.humidity}%</p>
            <p>Wind: {weather && weather.wind.speed} m/s</p>
          </div>
        </div>
      </div>
      <div className="side-forcast">
        <h3>Good Morning</h3>
        <h3>Time</h3>
        <h5>{weather.main.temp}°C</h5>
        <p>Feels like: {weather && weather.main.feels_like}°C</p>
        <h5>{weather.weather[0].description}</h5>
        <p>hourly forcast</p>
      </div>
    </div>
  );
}

export default WeatherApp;
