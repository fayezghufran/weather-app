import React, { useState } from "react";
import './styles.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = 'bf1720d5fccf36bbf9e2af8eebd1c147';

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "City not found");
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  
  const getWeatherColor = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return "#f7b733";
      case "Clouds":
        return "#90A4AE"; 
      case "Rain":
      case "Drizzle":
        return "#4A90E2"; 
      case "Thunderstorm":
        return "#616161"; 
      case "Snow":
        return "#00BCD4"; 
      default:
        return "#607D8B";
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {loading && <div className="spinner"></div>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div
          className="weather-card"
          style={{ backgroundColor: getWeatherColor(weather.weather[0].main) }}
        >
          <h2>{weather.name}</h2>
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <div className="weather-info">
            <p><strong>{weather.weather[0].description}</strong></p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Feels Like: {weather.main.feels_like}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Pressure: {weather.main.pressure} hPa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
