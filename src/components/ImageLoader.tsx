import { useState } from 'react';
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

    return (
        <div className="relative overflow-hidden">
            <AnimatePresence>
                {!isLoaded && !hasError && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer ${skeletonClassName}`}
                    />
                )}
            </AnimatePresence>

            <motion.img
                src={src}
                alt={alt}
                className={className}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                onLoad={() => setIsLoaded(true)}
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
