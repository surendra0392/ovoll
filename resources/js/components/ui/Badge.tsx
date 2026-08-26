import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'info' | 'glass' | 'flag';
    size?: 'sm' | 'md' | 'lg';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', size = 'md', ...props }, ref) => {
        // Each variant declares its own corner radius (the flag is deliberately
        // sharp) rather than relying on a base `rounded-full` that a variant
        // class could not reliably override.
        const variants: Record<string, string> = {
            default: 'rounded-full bg-[#2EC4A5]/6 text-[#2EC4A5] border border-[#2EC4A5]/20 shadow-[0_0_10px_rgba(46,196,165,0.06)]',
            secondary: 'rounded-full bg-[#0E1624]/60 text-white/70 border border-white/8 hover:text-white',
            outline: 'rounded-full border border-[#2EC4A5]/30 text-[#00D1FF] bg-transparent hover:border-[#2EC4A5]/50',
            success: 'rounded-full bg-[#10b981]/6 text-[#10b981] border border-[#10b981]/20',
            warning: 'rounded-full bg-[#f59e0b]/6 text-[#f59e0b] border border-[#f59e0b]/20',
            danger: 'rounded-full bg-[#ef4444]/6 text-[#ef4444] border border-[#ef4444]/20',
            info: 'rounded-full bg-[#00D1FF]/6 text-[#00D1FF] border border-[#00D1FF]/20 shadow-[0_0_10px_rgba(0,209,255,0.06)]',
            glass: 'rounded-full ovoll-glass text-white border-[#2EC4A5]/20',
            // Square flag — sharp corners + a 2px brand bar on the left edge.
            // Breaks the pill rhythm on section eyebrows.
            flag: 'rounded-none border-0 border-l-2 border-l-[#2EC4A5] bg-[#2EC4A5]/8 text-[#2EC4A5]',
        };

        const sizes: Record<string, string> = {
            sm: 'px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase font-semibold',
            md: 'px-3 py-1 text-[10px] tracking-[0.18em] uppercase font-bold',
            lg: 'px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase font-extrabold',
        };

        return (
            <span
                ref={ref}
                className={cn('inline-flex items-center font-mono font-medium whitespace-nowrap select-none transition-all duration-260 ease-[var(--ease-out)]', variants[variant], sizes[size], className)}
                {...props}
            />
        );
    }
);

Badge.displayName = 'Badge';
