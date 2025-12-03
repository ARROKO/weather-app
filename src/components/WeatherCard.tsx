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
  //   WiSunset
} from 'react-icons/wi';

import clear_icon from '../assets/icons/clear.png';
// import humidity from '../assets/icons/humidity.png';
import cloud_icon from '../assets/icons/cloud.png';
// import wind from '../assets/icons/wind.png';
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
    '02d': cloud_icon,
    '03d': scattered_clouds,
    '04d': broken_icon,
    '09d': shower_icon,
    '10d': rain_icon,
    '11d': thunderstorm,
    '13d': snow_icon,
    '50d': mist_icon
  }

  let icon = iconWeather[`${data.weather[0].icon}`]
  console.log(data);


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md relative w-full max-w-xl mx-auto rounded-3xl p-6 text-white"
    >
      <div className="flex items-center justify-between mb-6">
        <ImageLoader
          src={icon}
          alt={data.weather[0].description}
          className="w-24 h-24 object-contain"
          skeletonClassName="w-24 h-24 rounded-2xl"
        />
        <div>
          <h2 className="text-3xl font-bold">{data.name}</h2>
          <p className="text-lg text-white/80">{data.sys.country}</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-bold">{Math.round(data.main.temp)}°C</p>
          <p className="text-white/80">{data.weather[0].description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <WiThermometer size={24} className="text-yellow-400" />
          <div>
            <p className="text-sm text-white/60">Ressenti</p>
            <p className="font-semibold">{Math.round(data.main.feels_like)}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <WiHumidity size={24} className="text-blue-400" />
          <div>
            <p className="text-sm text-white/60">Humidité</p>
            <p className="font-semibold">{data.main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <WiStrongWind size={24} className="text-green-400" />
          <div>
            <p className="text-sm text-white/60">Vent</p>
            <p className="font-semibold">{Math.round(data.wind.speed * 3.6)} km/h</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <WiSunrise size={24} className="text-orange-400" />
          <div>
            <p className="text-sm text-white/60">Lever du soleil</p>
            <p className="font-semibold">
              {format(new Date(data.sys.sunrise * 1000), 'HH:mm', { locale: fr })}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-white/60 text-sm">
        Dernière mise à jour : {format(new Date(), 'dd MMMM yyyy à HH:mm', { locale: fr })}
      </div>
    </motion.div>
  );
};