import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DailyForecast } from '../types/forecast';
import { ImageLoader } from './ImageLoader';

import clear_icon from '../assets/icons/clear.png';
import cloud_icon from '../assets/icons/cloud.png';
import scattered_clouds from '../assets/icons/nuage.png';
import broken_icon from '../assets/icons/sombre.png';
import shower_icon from '../assets/icons/pluie-abondante.png';
import rain_icon from '../assets/icons/drizzle.png';
import thunderstorm from '../assets/icons/eclair-de-nuage.png';
import snow_icon from '../assets/icons/snow.png';
import mist_icon from '../assets/icons/brumeux.png';

interface ForecastCardProps {
    forecasts: DailyForecast[];
}

export const ForecastCard = ({ forecasts }: ForecastCardProps) => {
    const iconWeather: { [key: string]: string } = {
        '01d': clear_icon,
        '01n': clear_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': scattered_clouds,
        '03n': scattered_clouds,
        '04d': broken_icon,
        '04n': broken_icon,
        '09d': shower_icon,
        '09n': shower_icon,
        '10d': rain_icon,
        '10n': rain_icon,
        '11d': thunderstorm,
        '11n': thunderstorm,
        '13d': snow_icon,
        '13n': snow_icon,
        '50d': mist_icon,
        '50n': mist_icon
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mt-6"
        >
            <h3 className="text-2xl font-bold text-white mb-4">Prévisions 5 jours</h3>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {forecasts.map((forecast, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[140px] hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <p className="text-white/80 text-sm font-medium mb-2">
                            {format(forecast.date, 'EEE dd MMM', { locale: fr })}
                        </p>

                        <div className="flex justify-center mb-3">
                            <ImageLoader
                                src={iconWeather[forecast.icon] || clear_icon}
                                alt={forecast.description}
                                className="w-16 h-16 object-contain"
                                skeletonClassName="w-16 h-16 rounded-xl"
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-2xl font-bold text-white mb-1">
                                {Math.round(forecast.temp_max)}°
                            </p>
                            <p className="text-white/60 text-sm">
                                {Math.round(forecast.temp_min)}°
                            </p>
                        </div>

                        {forecast.pop > 0 && (
                            <div className="mt-2 flex items-center justify-center gap-1">
                                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                <p className="text-blue-400 text-xs">
                                    {Math.round(forecast.pop * 100)}%
                                </p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
