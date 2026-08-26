import { useState } from 'react';
import { cn } from '@/utils';

interface ImageWrapperProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
    blurDataURL?: string;
}

export function ImageWrapper({
    src,
    alt,
    className,
    aspectRatio = 'auto',
    blurDataURL,
    ...props
}: ImageWrapperProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    const aspectClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        auto: 'aspect-auto',
    };

    return (
        <div className={cn('relative overflow-hidden bg-muted', aspectClasses[aspectRatio], className)}>
            {/* Blur placeholder */}
            {blurDataURL && !isLoaded && (
                <img
                    src={blurDataURL}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover blur-lg filter"
                />
            )}
            
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={cn(
                    'h-full w-full object-cover transition-opacity duration-500',
                    isLoaded ? 'opacity-100' : 'opacity-0'
                )}
                {...props}
            />
        </div>
    );
}
