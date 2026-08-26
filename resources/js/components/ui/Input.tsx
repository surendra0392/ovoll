import { forwardRef } from 'react';
import { cn } from '@/utils';

// Omit 'size' from HTMLAttributes since we use it for visual size, not the HTML attribute
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    hasError?: boolean;
    size?: 'sm' | 'md' | 'lg';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const sizeClasses: Record<string, string> = {
    sm: 'h-9 text-xs',
    md: 'h-11 text-sm',
    lg: 'h-13 text-base',
};

const iconSizeClasses: Record<string, string> = {
    sm: 'h-9 w-9 [&>svg]:h-3.5 [&>svg]:w-3.5',
    md: 'h-11 w-11 [&>svg]:h-4 [&>svg]:w-4',
    lg: 'h-13 w-13 [&>svg]:h-5 [&>svg]:w-5',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, hasError, size = 'md', leftIcon, rightIcon, ...props }, ref) => {
        const hasLeftIcon = !!leftIcon;
        const hasRightIcon = !!rightIcon;

        const input = (
            <input
                type={type}
                className={cn(
                    'flex w-full rounded-none border border-[#2EC4A5]/15 bg-[#0E1624]/40 px-4 py-2.5 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:border-[#00D1FF]/40 focus-visible:ring-1 focus-visible:ring-[#00D1FF]/40 focus-visible:shadow-[0_0_15px_rgba(0,209,255,0.08)] disabled:cursor-not-allowed disabled:opacity-40 transition-all duration-260 ease-[var(--ease-out)] hover:border-[#2EC4A5]/30',
                    sizeClasses[size],
                    hasLeftIcon && 'pl-11',
                    hasRightIcon && 'pr-11',
                    hasError && 'border-[#ef4444]/40 focus-visible:border-[#ef4444]/60 focus-visible:ring-[#ef4444]/40 focus-visible:shadow-[0_0_15px_rgba(239,68,68,0.08)]',
                    className
                )}
                ref={ref}
                {...props}
            />
        );

        if (!hasLeftIcon && !hasRightIcon) {
            return input;
        }

        return (
            <div className="relative w-full">
                {hasLeftIcon && (
                    <span
                        className={cn(
                            'pointer-events-none absolute left-0 top-0 inline-flex items-center justify-center text-white/40',
                            iconSizeClasses[size]
                        )}
                    >
                        {leftIcon}
                    </span>
                )}

                {input}

                {hasRightIcon && (
                    <span
                        className={cn(
                            'pointer-events-none absolute right-0 top-0 inline-flex items-center justify-center text-white/40',
                            iconSizeClasses[size]
                        )}
                    >
                        {rightIcon}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
