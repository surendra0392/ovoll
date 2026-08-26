import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
    intensity?: 'light' | 'medium' | 'heavy';
}

export const Glass = forwardRef<HTMLDivElement, GlassProps>(
    ({ className, intensity = 'medium', ...props }, ref) => {
        const intensities = {
            light: 'bg-background/40 backdrop-blur-md',
            medium: 'bg-background/60 backdrop-blur-xl',
            heavy: 'bg-background/80 backdrop-blur-xl',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'relative overflow-hidden border border-[var(--glass-border)] shadow-sm',
                    intensities[intensity],
                    className
                )}
                {...props}
            >
                {/* Subtle SVG Noise Overlay */}
                <div 
                    className="pointer-events-none absolute inset-0 z-[-1] opacity-20 mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
                {props.children}
            </div>
        );
    }
);

Glass.displayName = 'Glass';
