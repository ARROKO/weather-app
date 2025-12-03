import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageLoaderProps {
    src: string;
    alt: string;
    className?: string;
    skeletonClassName?: string;
}

export const ImageLoader = ({ src, alt, className = '', skeletonClassName = '' }: ImageLoaderProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        // Ensure skeleton shows for at least 300ms for better UX
        const minDisplayTime = setTimeout(() => {
            setShowSkeleton(false);
        }, 300);

        return () => clearTimeout(minDisplayTime);
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return (
        <div className="relative overflow-hidden">
            <AnimatePresence>
                {(showSkeleton || !isLoaded) && !hasError && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`absolute inset-0 bg-gradient-to-r from-white/5 via-white/15 to-white/5 animate-shimmer rounded-2xl ${skeletonClassName}`}
                    />
                )}
            </AnimatePresence>

            <motion.img
                src={src}
                alt={alt}
                className={className}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded && !showSkeleton ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                onLoad={handleLoad}
                onError={() => setHasError(true)}
            />

            {hasError && (
                <div className={`flex items-center justify-center bg-white/5 ${className}`}>
                    <span className="text-white/40 text-sm">Image non disponible</span>
                </div>
            )}
        </div>
    );
};
