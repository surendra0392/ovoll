import { forwardRef, useState } from 'react';
import { cn } from '@/utils';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    blurDataURL?: string;
    width?: number | string;
    height?: number | string;
    containerClassName?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ src, alt, blurDataURL, width, height, className, containerClassName, ...props }, ref) => {
        const [isLoaded, setIsLoaded] = useState(false);

        return (
            <div
                className={cn(
                    'relative overflow-hidden',
                    !isLoaded && blurDataURL ? 'bg-muted' : '',
                    containerClassName
                )}
                style={{
                    width: width || '100%',
                    height: height || '100%',
                    ...(blurDataURL && !isLoaded
                        ? {
                              backgroundImage: `url(${blurDataURL})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                          }
                        : {}),
                }}
            >
                <img
                    ref={ref}
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                    className={cn(
                        'w-full h-full object-cover transition-opacity duration-500',
                        isLoaded ? 'opacity-100' : 'opacity-0',
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);

Image.displayName = 'Image';
