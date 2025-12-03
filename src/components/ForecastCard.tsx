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
            className="bg-[#202B3B] rounded-3xl p-8 mt-8 shadow-lg border border-white/5"
        >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                 Prévisions 5 jours
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {forecasts.map((forecast, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
                        className="bg-[#2A3649] rounded-2xl p-4 flex flex-col items-center justify-between min-h-[180px] border border-white/5 transition-colors"
                    >
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                            {format(forecast.date, 'EEE dd', { locale: fr })}
                        </p>

                        <div className="flex flex-col items-center my-2">
                            <ImageLoader
                                src={iconWeather[forecast.icon] || clear_icon}
                                alt={forecast.description}
                                className="w-14 h-14 object-contain drop-shadow-lg"
                                skeletonClassName="w-14 h-14 rounded-xl"
                            />
                        </div>

                        <div className="w-full text-center">
                            <div className="flex justify-center items-center gap-3 mb-2">
                                <span className="text-xl font-bold text-white">{Math.round(forecast.temp_max)}°</span>
                                <span className="text-slate-500 text-sm">{Math.round(forecast.temp_min)}°</span>
                            </div>

                            {forecast.pop > 0 && (
                                <div className="flex items-center justify-center gap-1.5 bg-blue-500/10 py-1 px-2 rounded-lg">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                    <p className="text-blue-300 text-xs font-medium">
                                        {Math.round(forecast.pop * 100)}%
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
