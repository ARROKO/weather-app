import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl mx-auto"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher une ville..."
        className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-md rounded-2xl 
                 text-white placeholder-gray-400 outline-none border border-white/20
                 focus:border-white/40 transition-colors"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60
                 hover:text-white transition-colors"
      >
        <FiSearch size={24} />
      </button>
    </motion.form>
  );
};