import { LucideProps } from 'lucide-react';
import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface IconProps extends LucideProps {
    icon: React.ComponentType<LucideProps>;
    size?: number | string;
    strokeWidth?: number;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ icon: IconComponent, size = 20, strokeWidth, className, ...props }, ref) => {
        // Automatically determine stroke width based on size for optimal rendering
        const calculatedStrokeWidth = strokeWidth ?? (typeof size === 'number' && size >= 24 ? 1.5 : 2);

        return (
            <IconComponent
                ref={ref}
                size={size}
                strokeWidth={calculatedStrokeWidth}
                className={cn('shrink-0', className)}
                {...props}
            />
        );
    }
);

Icon.displayName = 'Icon';
