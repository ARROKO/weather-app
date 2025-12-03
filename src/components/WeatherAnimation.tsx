// Lightweight weather animation component using CSS effects
// For Lottie animations, download JSON files from https://lottiefiles.com/
// and import them with: import animationData from './animations/rain.json';

interface WeatherAnimationProps {
    weatherCondition: string;
}

export const WeatherAnimation = ({ weatherCondition }: WeatherAnimationProps) => {
    const getAnimationData = () => {
        const condition = weatherCondition.toLowerCase();

        // Simple CSS-based subtle effects instead of heavy animations
        // This is a lightweight approach using CSS classes

        if (condition.includes('rain') || condition.includes('drizzle')) {
            return 'rain';
        }
        if (condition.includes('snow')) {
            return 'snow';
        }
        if (condition.includes('clear')) {
            return 'clear';
        }
        if (condition.includes('cloud')) {
            return 'clouds';
        }
        if (condition.includes('thunder')) {
            return 'thunder';
        }

        return null;
    };

    const animationType = getAnimationData();

    // For now, we'll use CSS-based subtle effects
    // You can download Lottie animations from https://lottiefiles.com/
    // and import them here for more complex animations

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {animationType === 'rain' && (
                <div className="rain-effect absolute inset-0" />
            )}
            {animationType === 'snow' && (
                <div className="snow-effect absolute inset-0" />
            )}
            {/* Add more weather effects as needed */}
        </div>
    );
};
