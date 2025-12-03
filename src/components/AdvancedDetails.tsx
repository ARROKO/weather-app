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
            { max: 1, label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-400/20' },
            { max: 2, label: 'Bon', color: 'text-lime-400', bg: 'bg-lime-400/20' },
            { max: 3, label: 'Moyen', color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
            { max: 4, label: 'Mauvais', color: 'text-orange-400', bg: 'bg-orange-400/20' },
            { max: 5, label: 'Très mauvais', color: 'text-red-400', bg: 'bg-red-400/20' }
        ];
        return levels.find(l => aqi <= l.max) || levels[4];
    };

    const getUVLevel = (uv: number) => {
        if (uv <= 2) return { label: 'Faible', color: 'text-emerald-400', width: '20%' };
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
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        >
            {/* Pressure */}
            <div className="bg-[#202B3B] rounded-3xl p-6 shadow-lg border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-xl">
                        <WiBarometer size={24} className="text-purple-400" />
                    </div>
                    <p className="text-slate-400 font-medium">Pression</p>
                </div>
                <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-white">{pressure}</p>
                    <p className="text-xl text-slate-400">hPa</p>
                </div>
                <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                    {pressure > 1013 ? '↑ Plus haute' : '↓ Plus basse'} que la normale
                </p>
            </div>

            {/* Visibility */}
            {visibility && (
                <div className="bg-[#202B3B] rounded-3xl p-6 shadow-lg border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-cyan-500/20 rounded-xl">
                            <WiFog size={24} className="text-cyan-400" />
                        </div>
                        <p className="text-slate-400 font-medium">Visibilité</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-white">{(visibility / 1000).toFixed(1)}</p>
                        <p className="text-xl text-slate-400">km</p>
                    </div>
                    <p className="text-slate-500 text-sm mt-2">
                        {visibility >= 10000 ? 'Excellente visibilité' : visibility >= 5000 ? 'Bonne visibilité' : 'Visibilité réduite'}
                    </p>
                </div>
            )}

            {/* UV Index */}
            <div className="bg-[#202B3B] rounded-3xl p-6 shadow-lg border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-500/20 rounded-xl">
                        <WiDaySunny size={24} className="text-yellow-400" />
                    </div>
                    <p className="text-slate-400 font-medium">Index UV</p>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                    <p className={`text-3xl font-bold ${uvLevel.color}`}>{uvIndex}</p>
                    <p className="text-lg text-slate-400">{uvLevel.label}</p>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: uvLevel.width }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full ${uvLevel.color.replace('text', 'bg')} shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                    />
                </div>
            </div>

            {/* Air Quality */}
            {aqiLevel && (
                <div className="bg-[#202B3B] rounded-3xl p-6 shadow-lg border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-500/20 rounded-xl">
                            <WiEarthquake size={24} className={aqiLevel.color} />
                        </div>
                        <p className="text-slate-400 font-medium">Qualité de l'air</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <span className={`${aqiLevel.bg} ${aqiLevel.color} px-4 py-1.5 rounded-xl text-sm font-bold`}>
                                {aqiLevel.label}
                            </span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500">AQI</p>
                            <p className="text-2xl font-bold text-white">{aqi}</p>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};
