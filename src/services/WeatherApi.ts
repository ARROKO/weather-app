import axios from 'axios';
import { WeatherData } from '../types/weather';
import { ForecastData, AirQualityData } from '../types/forecast';

const API_KEY = '209535fdfcb82292aa57dbff7af40b70'; // Replace with your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};

export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};

export const getAirQuality = async (lat: number, lon: number): Promise<AirQualityData> => {
  const response = await axios.get(`${BASE_URL}/air_pollution`, {
    params: {
      lat,
      lon,
      appid: API_KEY
    }
  });
  return response.data;
};