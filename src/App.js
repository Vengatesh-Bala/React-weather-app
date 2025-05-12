import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      console.log("API URL:", url); // Debugging
      console.log("API Key:", apiKey); // Debugging

      try {
        const response = await axios.get(url);
        setWeather(response.data);
        setError('');
      } catch (err) {
        setWeather(null);
        if (err.response && err.response.status === 401) {
          setError('Invalid API key. Please check your .env file.');
        } else if (err.response && err.response.status === 404) {
          setError('City not found. Try another city.');
        } else {
          setError('Failed to fetch weather data.');
        }
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Information</h1>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={{ padding: '8px', fontSize: '16px' }}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weather ? (
          <div style={{ marginTop: '20px' }}>
            <h2>{weather.name}</h2>
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>🌥️ Condition: {weather.weather[0].description}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
          </div>
        ) : (
          !error && <p>Loading weather data...</p>
        )}
      </header>
    </div>
  );
}

export default App;
