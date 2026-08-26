import { useState } from 'react';
import { cn } from '@/utils';
import { Skeleton } from '../loading/Skeleton';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    fallbackSrc?: string;
    aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
}

export function Image({
    src,
    alt,
    fallbackSrc,
    className,
    aspectRatio = 'auto',
    ...props
}: ImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const aspectClasses = {
        video: 'aspect-video',
        square: 'aspect-square',
        portrait: 'aspect-[3/4]',
        auto: 'aspect-auto',
    };

    return (
        <div
            className={cn(
                'bg-muted relative overflow-hidden rounded-xl',
                aspectClasses[aspectRatio],
                className,
            )}
        >
            {isLoading && !hasError && (
                <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            )}
            <img
                src={hasError && fallbackSrc ? fallbackSrc : src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className={cn(
                    'h-full w-full object-cover transition-opacity duration-500',
                    isLoading ? 'opacity-0' : 'opacity-100',
                )}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
                {...props}
            />
        </div>
    );
}
