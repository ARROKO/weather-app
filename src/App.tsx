import { useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { PopularCities } from './components/PopularCities';
import { WeatherAnimation } from './components/WeatherAnimation';
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
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 p-4 md:p-8`}>
      {weather && <WeatherAnimation weatherCondition={weather.weather[0].main} />}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg flex items-center gap-2"
          >
            ☁️ Météo App
          </motion.h1>
          <div className="w-full md:w-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-white"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
            <p className="text-xl font-medium">Chargement des données...</p>
          </motion.div>
        )}

        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Main Weather Card - Takes 4 columns on large screens */}
            <div className="lg:col-span-4 space-y-6">
              <WeatherCard data={weather} />
            </div>

            {/* Right Column - Details and Forecast - Takes 8 columns */}
            <div className="lg:col-span-8 space-y-6">
              {/* Advanced Details Grid */}
              <AdvancedDetails
                pressure={weather.main.pressure}
                visibility={weather.visibility}
                airQuality={airQuality}
                uvIndex={3}
              />

              {/* Forecast Section */}
              {dailyForecasts.length > 0 && (
                <ForecastCard forecasts={dailyForecasts} />
              )}
            </div>
          </motion.div>
        )}

        {!weather && !isLoading && (
          <div className="mt-12">
            <PopularCities onCitySelect={handleSearch} />
          </div>
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