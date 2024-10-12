import React, { useEffect, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import humidity from '../assets/humidity.png';
import cloud_icon from '../assets/cloud.png';
import wind from '../assets/wind.png';
import scattered_clouds from '../assets/nuage.png';
import broken_icon from '../assets/sombre.png';
import shower_icon from '../assets/pluie-abondante.png';
import rain_icon from '../assets/drizzle.png';
import thunderstorm from '../assets/eclair-de-nuage.png';
import snow_icon from '../assets/snow.png';
import mist_icon from '../assets/brumeux.png';

import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const API_KEY_WEATHER = import.meta.env.VITE_API_WEATHER_KEY;
    const iconWeather = {
        '01d' : clear_icon,
        '02d' : cloud_icon,
        '03d' : scattered_clouds,
        '04d' : broken_icon,
        '09d' : shower_icon,
        '10d' : rain_icon,
        '11d' : thunderstorm,
        '13d' : snow_icon,
        '50d' : mist_icon
    }

    // console.log(iconWeather['01d']);
    

    const handleSubmit = async (city) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY_WEATHER}`);
            let data = response.data;
            let icon = iconWeather[`${data.weather[0].icon}`]

            setWeatherData({
                name: data.name,
                humidity: data.main.humidity,
                temp: Math.floor(data.main.temp),
                wind: data.wind.speed,
                icon: icon
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSubmit('Yaounde');
    }, []);

    return (
        <div className='container'>
            <div className="card">
                <div className="search row">
                    <input type="text" placeholder='Recherche' ref={inputRef} />
                    <img src={search_icon} onClick={() => handleSubmit(inputRef.current.value)} />
                </div>
                {
                    loading === false ?
                        <>
                            <img src={weatherData.icon} className='icon'/>
                            <div className="degre">
                                <div>{weatherData.temp}°c</div>
                                <div className='city'>{weatherData.name}</div>
                            </div>
                            <div className="details">
                                <div className="col">
                                    <img src={humidity} />
                                    <div>
                                        <p>{weatherData.humidity}%</p>
                                        <span>Humidité</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <img src={wind} />
                                    <div>
                                        <p>{weatherData.wind} km/h</p>
                                        <span>Vitesse du vent</span>
                                    </div>
                                </div>
                            </div>
                        </> :
                        <ClipLoader color={"#fff"} loading={loading} size={150} className='loader'/>
                }
            </div>
        </div>
    );
};

export default Weather;
