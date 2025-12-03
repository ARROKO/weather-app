import { motion } from 'framer-motion';
import {
    WiBarometer,
    WiDaySunny,
    WiEarthquake,
    WiFog
} from 'react-icons/wi';
import { AirQualityData } from '../types/forecast';

interface AdvancedDetailsProps {
    pressure: number;
    visibility?: number;
    airQuality?: AirQualityData;
    uvIndex?: number;
}

export const AdvancedDetails = ({
    pressure,
    visibility,
    airQuality,
    uvIndex = 0
}: AdvancedDetailsProps) => {

    const getAQILevel = (aqi: number) => {
        const levels = [
            { max: 1, label: 'Excellent', color: 'text-green-400', bg: 'bg-green-400/20' },
            { max: 2, label: 'Bon', color: 'text-lime-400', bg: 'bg-lime-400/20' },
            { max: 3, label: 'Moyen', color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
            { max: 4, label: 'Mauvais', color: 'text-orange-400', bg: 'bg-orange-400/20' },
            { max: 5, label: 'Très mauvais', color: 'text-red-400', bg: 'bg-red-400/20' }
        ];
        return levels.find(l => aqi <= l.max) || levels[4];
    };

    const getUVLevel = (uv: number) => {
        if (uv <= 2) return { label: 'Faible', color: 'text-green-400', width: '20%' };
        if (uv <= 5) return { label: 'Modéré', color: 'text-yellow-400', width: '40%' };
        if (uv <= 7) return { label: 'Élevé', color: 'text-orange-400', width: '60%' };
        if (uv <= 10) return { label: 'Très élevé', color: 'text-red-400', width: '80%' };
        return { label: 'Extrême', color: 'text-purple-400', width: '100%' };
    };

    const aqi = airQuality?.list[0]?.main.aqi;
    const aqiLevel = aqi ? getAQILevel(aqi) : null;
    const uvLevel = getUVLevel(uvIndex);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 mt-6"
        >
            {/* Pressure */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-2 mb-2">
                    <WiBarometer size={28} className="text-purple-400" />
                    <p className="text-white/60 text-sm">Pression</p>
                </div>
                <p className="text-2xl font-bold text-white">{pressure} hPa</p>
                <p className="text-white/40 text-xs mt-1">
                    {pressure > 1013 ? '↑ Haute' : '↓ Basse'}
                </p>
            </div>

            {/* Visibility */}
            {visibility && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:bg-white/15 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                        <WiFog size={28} className="text-cyan-400" />
                        <p className="text-white/60 text-sm">Visibilité</p>
                    </div>
                    <p className="text-2xl font-bold text-white">
                        {(visibility / 1000).toFixed(1)} km
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                        {visibility >= 10000 ? 'Excellente' : visibility >= 5000 ? 'Bonne' : 'Limitée'}
                    </p>
                </div>
            )}

            {/* UV Index */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-2 mb-2">
                    <WiDaySunny size={28} className="text-yellow-400" />
                    <p className="text-white/60 text-sm">Index UV</p>
                </div>
                <p className={`text-2xl font-bold ${uvLevel.color}`}>{uvIndex}</p>
                <div className="mt-2 bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: uvLevel.width }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full ${uvLevel.color.replace('text', 'bg')}`}
                    />
                </div>
                <p className="text-white/40 text-xs mt-1">{uvLevel.label}</p>
            </div>

            {/* Air Quality */}
            {aqiLevel && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:bg-white/15 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                        <WiEarthquake size={28} className={aqiLevel.color} />
                        <p className="text-white/60 text-sm">Qualité de l'air</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`${aqiLevel.bg} ${aqiLevel.color} px-3 py-1 rounded-full text-sm font-semibold`}>
                            {aqiLevel.label}
                        </div>
                    </div>
                    <p className="text-white/40 text-xs mt-2">AQI: {aqi}</p>
                </div>
            )}
        </motion.div>
    );
};
