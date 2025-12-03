import { motion } from 'framer-motion';
import { ImageLoader } from './ImageLoader';
import paris from '../assets/images/paris.jpeg';
import london from '../assets/images/london.jpeg';
import newyork from '../assets/images/newYork.jpeg';
import tokyo from '../assets/images/tokyo.jpeg';
import dubai from '../assets/images/dubai.jpeg';
import sydney from '../assets/images/sydney.jpeg';


interface PopularCitiesProps {
  onCitySelect: (city: string) => void;
}

export const PopularCities = ({ onCitySelect }: PopularCitiesProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {[
        {
          name: "Paris",
          country: "FR",
          image: paris
        },
        {
          name: "London",
          country: "GB",
          image: london
        },
        {
          name: "New York",
          country: "US",
          image: newyork
        },
        {
          name: "Tokyo",
          country: "JP",
          image: tokyo
        },
        {
          name: "Dubai",
          country: "AE",
          image: dubai
        },
        {
          name: "Sydney",
          country: "AU",
          image: sydney
        }
      ].map((city, index) => (
        <motion.div
          key={city.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onCitySelect(`${city.name},${city.country}`)}
          className="relative cursor-pointer group overflow-hidden rounded-2xl"
        >
          <ImageLoader
            src={city.image}
            alt={city.name}
            className="w-full h-48 object-cover"
            skeletonClassName="w-full h-48"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white">{city.name}</h3>
            <p className="text-white/80">{city.country}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};