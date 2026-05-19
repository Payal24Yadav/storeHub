import { useState } from 'react';
import { FiImage } from 'react-icons/fi';

export default function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  fallbackIcon: FallbackIcon = FiImage 
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-50 flex items-center justify-center ${containerClassName}`}>
      {/* Loading Skeleton / Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="flex flex-col items-center justify-center text-gray-300 w-full h-full p-4">
          <FallbackIcon className="w-1/3 h-1/3 max-w-[48px] max-h-[48px] mb-2 opacity-50" />
          <span className="text-[10px] font-bold tracking-wider uppercase text-center opacity-70">
            Image Unavailable
          </span>
        </div>
      ) : (
        /* Actual Image */
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          loading="lazy"
        />
      )}
    </div>
  );
}
