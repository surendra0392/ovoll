import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;
    strokeWidth?: number;
    opacity?: number;
}

export const GridPattern = forwardRef<HTMLDivElement, GridPatternProps>(
    ({ className, size = 40, strokeWidth = 1, opacity = 0.05, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('pointer-events-none absolute inset-0 -z-10', className)}
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor ${strokeWidth}px, transparent ${strokeWidth}px), linear-gradient(to bottom, currentColor ${strokeWidth}px, transparent ${strokeWidth}px)`,
                    backgroundSize: `${size}px ${size}px`,
                    opacity,
                }}
                aria-hidden="true"
                {...props}
            />
        );
    }
);

GridPattern.displayName = 'GridPattern';
