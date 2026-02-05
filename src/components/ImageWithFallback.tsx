import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
  alt: string;
}

export function ImageWithFallback({ src, fallback, alt, className, ...props }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError && fallback) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        {...props}
      />
    );
  }

  if (hasError && !fallback) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className || ''}`}>
        <span className="text-muted-foreground text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`bg-muted animate-pulse ${className || ''}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className || ''} ${isLoading ? 'hidden' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
}