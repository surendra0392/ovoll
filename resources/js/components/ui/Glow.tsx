import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface GlowProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: 'primary' | 'accent' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Glow = forwardRef<HTMLDivElement, GlowProps>(
    ({ className, color = 'primary', size = 'lg', ...props }, ref) => {
        const colors = {
            primary: 'bg-primary/20',
            accent: 'bg-accent/20',
            success: 'bg-success/20',
            warning: 'bg-warning/20',
            danger: 'bg-danger/20',
        };

        const sizes = {
            sm: 'w-32 h-32 blur-[40px]',
            md: 'w-64 h-64 blur-[80px]',
            lg: 'w-96 h-96 blur-[120px]',
            xl: 'w-[40rem] h-[40rem] blur-[160px]',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'pointer-events-none absolute rounded-full mix-blend-screen dark:mix-blend-lighten',
                    colors[color],
                    sizes[size],
                    className
                )}
                aria-hidden="true"
                {...props}
            />
        );
    }
);

Glow.displayName = 'Glow';
