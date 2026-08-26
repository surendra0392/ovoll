import React, { forwardRef } from 'react';
import { cn } from '@/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'gradient' | 'link' | 'icon' | 'floating' | 'pill';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
    state?: 'default' | 'loading' | 'success' | 'error';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    /** When provided, renders an <a> instead of a <button> */
    href?: string;
    /** When true, renders the child element directly without wrapping */
    asChild?: boolean;
}

const spinnerSvg = (
    <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', state = 'default', isLoading = false, leftIcon, rightIcon, children, disabled, href, asChild, ...props }, ref) => {
        const isDisabled = disabled || isLoading || state === 'loading';

        const base = 'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap typo-button transition-all duration-260 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2EC4A5] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] select-none';

        const variants: Record<string, string> = {
            primary: 'bg-[#0E1624]/60 text-white border border-[#2EC4A5]/20 hover:border-[#00D1FF]/40 hover:bg-[#0c1a2e] hover:shadow-[0_0_20px_rgba(46,196,165,0.12)] rounded-xl shadow-sm',
            secondary: 'bg-[#2EC4A5]/8 text-[#00D1FF] hover:bg-[#2EC4A5]/15 border border-[#2EC4A5]/15 hover:border-[#2EC4A5]/30 rounded-xl',
            outline: 'border border-white/10 bg-transparent hover:border-[#2EC4A5]/30 hover:bg-[#2EC4A5]/5 text-white rounded-xl',
            ghost: 'hover:bg-[#2EC4A5]/5 text-white/60 hover:text-white rounded-xl',
            glass: 'ovoll-glass text-white hover:border-[#2EC4A5]/30 hover:shadow-[0_0_15px_rgba(46,196,165,0.1)] rounded-xl',
            gradient: 'bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] text-surface-base font-bold shadow-[0_0_20px_rgba(46,196,165,0.2)] hover:shadow-[0_0_30px_rgba(0,209,255,0.4)] rounded-xl',
            link: 'text-[#2EC4A5] underline-offset-4 hover:text-[#00D1FF] hover:underline p-0 h-auto rounded-none',
            icon: 'hover:bg-white/5 border border-white/5 hover:border-white/10 text-white/70 hover:text-white rounded-xl',
            floating: 'bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] text-surface-base rounded-full shadow-[0_0_25px_rgba(46,196,165,0.25)] hover:shadow-[0_0_35px_rgba(0,209,255,0.5)] hover:-translate-y-0.5 font-bold',
            pill: 'bg-[#0E1624]/60 text-white hover:bg-[#0c1a2e] border border-[#2EC4A5]/20 rounded-full',
        };

        const sizes: Record<string, string> = {
            xs: 'h-8.5 px-3 text-[10px]',
            sm: 'h-9.5 px-4 text-xs',
            md: 'h-11 px-5 text-xs',
            lg: 'h-13 px-7 text-sm',
            xl: 'h-15 px-9 text-base',
            icon: 'h-11 w-11 shrink-0',
        };

        const stateClasses: Record<string, string> = {
            default: '',
            loading: 'opacity-70 cursor-wait',
            success: 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30',
            error: 'bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30',
        };

        const classNameMerged = cn(base, variants[variant], sizes[size], stateClasses[state], className);

        // When asChild is true, render the single child with merged className
        if (asChild && React.isValidElement(children)) {
            const child = children as React.ReactElement<{ className?: string; 'aria-busy'?: boolean }>;

            return React.cloneElement(child, {
                className: cn(classNameMerged, child.props.className),
                'aria-busy': isLoading || state === 'loading',
            });
        }

        // When href is provided, render an anchor
        if (href) {
            return (
                <a
                    href={href}
                    className={classNameMerged}
                    aria-busy={isLoading || state === 'loading'}
                >
                    {!isDisabled && (variant === 'primary' || variant === 'gradient' || variant === 'glass') && (
                        <span className="absolute inset-0 block -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-[var(--ease-in-out)] pointer-events-none" />
                    )}
                    {(isLoading || state === 'loading') && (
                        <span className="shrink-0 animate-spin">{spinnerSvg}</span>
                    )}
                    {!(isLoading || state === 'loading') && leftIcon && (
                        <span className="shrink-0 transition-transform duration-260 ease-[var(--ease-out)] group-hover:scale-105">{leftIcon}</span>
                    )}
                    <span className="relative z-10">{children}</span>
                    {!(isLoading || state === 'loading') && rightIcon && (
                        <span className="shrink-0 transition-transform duration-260 ease-[var(--ease-out)] group-hover:translate-x-0.5">{rightIcon}</span>
                    )}
                </a>
            );
        }

        return (
            <button
                ref={ref}
                className={classNameMerged}
                disabled={isDisabled}
                aria-busy={isLoading || state === 'loading'}
                {...props}
            >
                {!isDisabled && (variant === 'primary' || variant === 'gradient' || variant === 'glass') && (
                    <span className="absolute inset-0 block -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-[var(--ease-in-out)] pointer-events-none" />
                )}

                {(isLoading || state === 'loading') && (
                    <span className="shrink-0 animate-spin">{spinnerSvg}</span>
                )}
                {!(isLoading || state === 'loading') && leftIcon && (
                    <span className="shrink-0 transition-transform duration-260 ease-[var(--ease-out)] group-hover:scale-105">{leftIcon}</span>
                )}
                <span className="relative z-10">{children}</span>
                {!(isLoading || state === 'loading') && rightIcon && (
                    <span className="shrink-0 transition-transform duration-260 ease-[var(--ease-out)] group-hover:translate-x-0.5">{rightIcon}</span>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';
