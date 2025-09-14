import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In a real application, you would use a weather API
  // For this demo, we'll simulate weather data
  useEffect(() => {
    const fetchWeather = () => {
      try {
        // Simulate API call delay
        setTimeout(() => {
          // Simulate weather data based on random conditions
          const conditions = [
            { temp: 28, condition: 'Sunny', icon: '☀️' },
            { temp: 25, condition: 'Partly Cloudy', icon: '⛅' },
            { temp: 22, condition: 'Cloudy', icon: '☁️' },
            { temp: 18, condition: 'Rainy', icon: '🌧️' },
            { temp: 20, condition: 'Thunderstorm', icon: '⛈️' }
          ];
          
          const randomWeather = conditions[Math.floor(Math.random() * conditions.length)];
          setWeather({
            ...randomWeather,
            location: 'Accra, Ghana',
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="weather-widget">
        <div className="weather-loading">
          <div className="weather-spinner"></div>
          <p>Loading weather...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget">
        <div className="weather-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h3>Today's Weather</h3>
        <p>{weather.date}</p>
      </div>
      
      <div className="weather-content">
        <div className="weather-main">
          <div className="weather-icon">{weather.icon}</div>
          <div className="weather-temp">{weather.temp}°C</div>
          <div className="weather-condition">{weather.condition}</div>
        </div>
        
        <div className="weather-location">
          <p>{weather.location}</p>
        </div>
        
        <div className="weather-advice">
          {weather.condition === 'Sunny' || weather.condition === 'Partly Cloudy' ? (
            <p className="good-weather">Great weather for outdoor parties! 🎉</p>
          ) : weather.condition === 'Rainy' || weather.condition === 'Thunderstorm' ? (
            <p className="bad-weather">Consider indoor alternatives or rescheduling. ☂️</p>
          ) : (
            <p className="neutral-weather">Weather is okay for outdoor events. 🌤️</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;