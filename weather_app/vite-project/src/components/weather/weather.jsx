import React, { useState } from 'react';
import styles from './weather.module.css';

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const apikey = "47da424fffcf8fad6943ae7fe419251e";

    const search = async () => {
        try {
            const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
            const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
            const response = await fetch(apiurl);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeatherData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        }
    };

    const getWeatherIcon = (wid) => {
        if (wid >= 200 && wid < 300) return "🌩️";
        if (wid >= 300 && wid < 400) return "⛅";
        if (wid >= 500 && wid < 600) return "🌧️";
        if (wid >= 600 && wid < 700) return "🌨️";
        if (wid >= 700 && wid < 800) return "🌨️";
        if (wid === 800) return "🌤️";
        if (wid > 800 && wid < 900) return "☁️";
        return "";
    };

    return (
        <div className={styles.weatherContainer}>
            <section className={styles.weather_container}>
                <nav>
                    <input 
                        type="text" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                    />
                    <i className="bx bx-search" id={styles.searchIcon} onClick={search}></i>
                </nav>
                {error && <p>{error}</p>}
                {weatherData && (
                    <div className={styles.weather_content} style={{ display: 'flex' }}>
                        <h2>{city}</h2>
                        <div className={styles.weather_info}>
                            <h1>{(weatherData.main.temp - 273.5).toFixed(2)}°</h1>
                            <span>{getWeatherIcon(weatherData.weather[0].id)}</span>
                            <p className={styles.humidity}>Humidity: {weatherData.main.humidity}%</p>
                            <p className={styles.desc}>
                                {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Weather;