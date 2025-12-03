import { motion } from 'framer-motion';

interface WeatherParticlesProps {
    weatherCondition: string;
}

export const WeatherParticles = ({ weatherCondition }: WeatherParticlesProps) => {
    const getParticles = () => {
        const condition = weatherCondition.toLowerCase();

        // Rain particles
        if (condition.includes('rain') || condition.includes('drizzle')) {
            return Array.from({ length: 50 }, (_, i) => (
                <motion.div
                    key={`rain-${i}`}
                    className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-400/60 to-transparent"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: -20,
                        opacity: 0.6
                    }}
                    animate={{
                        y: window.innerHeight + 20,
                        opacity: [0.6, 0.8, 0.6]
                    }}
                    transition={{
                        duration: Math.random() * 1 + 0.5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'linear'
                    }}
                />
            ));
        }

        // Snow particles
        if (condition.includes('snow')) {
            return Array.from({ length: 40 }, (_, i) => (
                <motion.div
                    key={`snow-${i}`}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: -20,
                        opacity: 0.8
                    }}
                    animate={{
                        y: window.innerHeight + 20,
                        x: Math.random() * window.innerWidth,
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: 'easeInOut'
                    }}
                />
            ));
        }

        // Clear/Sunny particles (sun rays)
        if (condition.includes('clear')) {
            return Array.from({ length: 20 }, (_, i) => (
                <motion.div
                    key={`sun-${i}`}
                    className="absolute w-1 h-1 bg-yellow-300/40 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'easeInOut'
                    }}
                />
            ));
        }

        // Clouds particles
        if (condition.includes('cloud')) {
            return Array.from({ length: 15 }, (_, i) => (
                <motion.div
                    key={`cloud-${i}`}
                    className="absolute w-16 h-8 bg-white/10 rounded-full blur-sm"
                    initial={{
                        x: -100,
                        y: Math.random() * window.innerHeight * 0.5
                    }}
                    animate={{
                        x: window.innerWidth + 100
                    }}
                    transition={{
                        duration: Math.random() * 20 + 15,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: 'linear'
                    }}
                />
            ));
        }

        return null;
    };

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {getParticles()}
        </div>
    );
};
