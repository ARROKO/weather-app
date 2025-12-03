import { useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { PopularCities } from './components/PopularCities';
import { WeatherParticles } from './components/WeatherParticles';
import { ForecastCard } from './components/ForecastCard';
import { AdvancedDetails } from './components/AdvancedDetails';
import { getWeatherByCity, getForecastByCity, getAirQuality } from './services/WeatherApi';
import { DailyForecast } from './types/forecast';

const queryClient = new QueryClient();

function WeatherApp() {
  const [city, setCity] = useState<string>('');

  const { data: weather, isLoading } = useQuery(
    ['weather', city],
    () => getWeatherByCity(city),
    {
      enabled: !!city,
      onError: () => {
        toast.error('Ville non trouvée. Veuillez réessayer.');
      }
    }
  );

  const { data: forecast } = useQuery(
    ['forecast', city],
    () => getForecastByCity(city),
    {
      enabled: !!city,
      onError: () => {
        console.error('Erreur lors de la récupération des prévisions');
      }
    }
  );

  const { data: airQuality } = useQuery(
    ['airQuality', weather?.coord.lat, weather?.coord.lon],
    () => getAirQuality(weather!.coord.lat, weather!.coord.lon),
    {
      enabled: !!weather?.coord,
      onError: () => {
        console.error('Erreur lors de la récupération de la qualité de l\'air');
      }
    }
  );

  // Process forecast data into daily summaries
  const dailyForecasts = useMemo(() => {
    if (!forecast) return [];

    const dailyMap = new Map<string, DailyForecast>();

    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, {
          date,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          pop: item.pop
        });
      } else {
        const existing = dailyMap.get(dateKey)!;
        existing.temp_min = Math.min(existing.temp_min, item.main.temp_min);
        existing.temp_max = Math.max(existing.temp_max, item.main.temp_max);
        existing.pop = Math.max(existing.pop, item.pop);
      }
    });

    return Array.from(dailyMap.values()).slice(0, 5);
  }, [forecast]);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  // Dynamic background based on weather
  const getBackgroundGradient = () => {
    if (!weather) return 'from-slate-900 to-slate-800';

    const condition = weather.weather[0].main.toLowerCase();
    const isNight = new Date().getHours() >= 20 || new Date().getHours() < 6;

    if (condition.includes('clear')) {
      return isNight
        ? 'from-indigo-950 via-purple-900 to-slate-900'
        : 'from-sky-400 via-blue-500 to-indigo-600';
    }
    if (condition.includes('rain')) {
      return 'from-slate-700 via-slate-800 to-slate-900';
    }
    if (condition.includes('cloud')) {
      return 'from-gray-600 via-slate-700 to-slate-800';
    }
    if (condition.includes('snow')) {
      return 'from-slate-300 via-slate-400 to-slate-600';
    }
    if (condition.includes('thunder')) {
      return 'from-gray-900 via-slate-900 to-black';
    }

    return 'from-slate-900 to-slate-800';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      {weather && <WeatherParticles weatherCondition={weather.weather[0].main} />}

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg"
        >
          ☁️ Météo App
        </motion.h1>

        <SearchBar onSearch={handleSearch} />

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white mt-8"
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="mt-4 text-lg">Chargement...</p>
          </motion.div>
        )}

        <div className='m-8'></div>

        {weather && (
          <div className="space-y-6">
            <WeatherCard data={weather} />

            <AdvancedDetails
              pressure={weather.main.pressure}
              visibility={weather.visibility}
              airQuality={airQuality}
              uvIndex={3}
            />

            {dailyForecasts.length > 0 && (
              <ForecastCard forecasts={dailyForecasts} />
            )}
          </div>
        )}

        {!weather && !isLoading && (
          <PopularCities onCitySelect={handleSearch} />
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
}