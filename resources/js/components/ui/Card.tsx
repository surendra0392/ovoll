import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'standard' | 'glass' | 'feature' | 'pricing' | 'statistic';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'standard', ...props }, ref) => {
        const variants = {
            // Elegant container with premium frosted alignment
            standard: 'bg-transparent border-t border-white/10 hover:border-white/30 transition-all duration-500 ease-[var(--ease-out)]',
            
            // Heavy glassmorphic container with frosted border refraction
            glass: 'ovoll-glass border border-white/10 transition-all duration-500 ease-[var(--ease-out)]',
            
            // Sleek feature card with subtle hover translation
            feature: 'bg-transparent border-t border-white/10 hover:border-[#2EC4A5]/30 transition-all duration-500 ease-[var(--ease-out)]',
            
            // Highly framed pricing card with active teal border glow
            pricing: 'bg-[#081220]/40 border border-white/10 hover:border-[#00D1FF]/40 transition-all duration-500 ease-[var(--ease-out)]',
            
            // Technical coordinate data card
            statistic: 'bg-transparent border-t border-white/10 transition-all duration-500 ease-[var(--ease-out)] hover:border-white/30',
        };

        return (
            <div
                ref={ref}
                className={cn('relative overflow-hidden rounded-none p-7 text-white', variants[variant], className)}
                {...props}
            >
                {/* Ambient background glass noise overlay for subtle tactile texture */}
                {variant === 'glass' && (
                    <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[size:16px_16px] z-0" />
                )}
                
                <div className="relative z-10">{props.children}</div>
            </div>
        );
    }
);

Card.displayName = 'Card';
