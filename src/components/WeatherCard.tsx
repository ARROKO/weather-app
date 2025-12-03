import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { WeatherData } from '../types/weather';
import { ImageLoader } from './ImageLoader';
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiSunrise,
} from 'react-icons/wi';

import clear_icon from '../assets/icons/clear.png';
import cloud_icon from '../assets/icons/cloud.png';
import scattered_clouds from '../assets/icons/nuage.png';
import broken_icon from '../assets/icons/sombre.png';
import shower_icon from '../assets/icons/pluie-abondante.png';
import rain_icon from '../assets/icons/drizzle.png';
import thunderstorm from '../assets/icons/eclair-de-nuage.png';
import snow_icon from '../assets/icons/snow.png';
import mist_icon from '../assets/icons/brumeux.png';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard = ({ data }: WeatherCardProps) => {

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

  const icon = iconWeather[`${data.weather[0].icon}`] || clear_icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#202B3B] relative w-full h-full rounded-3xl p-8 text-white shadow-lg border border-white/5 flex flex-col justify-between"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <ImageLoader
            src={icon}
            alt={data.weather[0].description}
            className="w-32 h-32 object-contain drop-shadow-2xl"
            skeletonClassName="w-32 h-32 rounded-2xl"
          />
        </div>

        {/* City Info */}
        <div className="text-center md:text-left flex-grow">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">{data.name}</h2>
          <p className="text-xl text-slate-400 font-medium tracking-wide">{data.sys.country}</p>
        </div>

        {/* Temp Info */}
        <div className="text-center md:text-right">
          <p className="text-6xl md:text-7xl font-bold tracking-tighter">{Math.round(data.main.temp)}°</p>
          <p className="text-xl text-slate-400 capitalize mt-2">{data.weather[0].description}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Feels Like */}
        <div className="bg-[#2A3649] rounded-2xl p-4 flex items-center gap-4 border border-white/5 hover:bg-[#324156] transition-colors">
          <div className="p-3 bg-yellow-500/10 rounded-xl">
            <WiThermometer size={32} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Ressenti</p>
            <p className="text-xl font-bold text-white">{Math.round(data.main.feels_like)}°C</p>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-[#2A3649] rounded-2xl p-4 flex items-center gap-4 border border-white/5 hover:bg-[#324156] transition-colors">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <WiHumidity size={32} className="text-blue-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Humidité</p>
            <p className="text-xl font-bold text-white">{data.main.humidity}%</p>
          </div>
        </div>

        {/* Wind */}
        <div className="bg-[#2A3649] rounded-2xl p-4 flex items-center gap-4 border border-white/5 hover:bg-[#324156] transition-colors">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <WiStrongWind size={32} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Vent</p>
            <p className="text-xl font-bold text-white">{Math.round(data.wind.speed * 3.6)} km/h</p>
          </div>
        </div>

        {/* Sunrise */}
        <div className="bg-[#2A3649] rounded-2xl p-4 flex items-center gap-4 border border-white/5 hover:bg-[#324156] transition-colors">
          <div className="p-3 bg-orange-500/10 rounded-xl">
            <WiSunrise size={32} className="text-orange-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Lever du soleil</p>
            <p className="text-xl font-bold text-white">
              {format(new Date(data.sys.sunrise * 1000), 'HH:mm', { locale: fr })}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-slate-500 text-sm font-medium border-t border-white/5 pt-6">
        Dernière mise à jour : {format(new Date(), 'dd MMMM yyyy à HH:mm', { locale: fr })}
      </div>
    </motion.div>
  );
};