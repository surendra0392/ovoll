import { useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/utils';

export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    poster?: string;
    autoPlayWhenVisible?: boolean;
}

export function Video({
    src,
    poster,
    className,
    autoPlayWhenVisible = true,
    ...props
}: VideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const entry = useIntersectionObserver(videoRef, { threshold: 0.1 });

    useEffect(() => {
        if (!autoPlayWhenVisible || !videoRef.current) {
            return;
        }

        if (entry?.isIntersecting) {
            videoRef.current.play().catch(() => {
                // Auto-play failed (usually due to browser policies if not muted)
            });
        } else {
            videoRef.current.pause();
        }
    }, [entry?.isIntersecting, autoPlayWhenVisible]);

    return (
        <div className={cn('bg-muted relative overflow-hidden rounded-xl', className)}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                playsInline
                muted
                loop
                className="h-full w-full object-cover"
                {...props}
            />
        </div>
    );
}
