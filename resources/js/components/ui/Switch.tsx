import { forwardRef, useCallback } from 'react';
import { cn } from '@/utils';

export interface SwitchProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    id?: string;
    name?: string;
}

const trackSizes: Record<string, string> = {
    sm: 'h-5 w-9.5',
    md: 'h-6.5 w-12',
    lg: 'h-8 w-[58px]',
};

const thumbSizes: Record<string, string> = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4.5 w-4.5',
    lg: 'h-5.5 w-5.5',
};

const thumbTranslate: Record<string, string> = {
    sm: 'translate-x-5',
    md: 'translate-x-6',
    lg: 'translate-x-7',
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    ({ checked = false, onCheckedChange, label, disabled = false, size = 'md', className, id, name }, ref) => {
        const handleClick = useCallback(() => {
            if (!disabled) {
                onCheckedChange?.(!checked);
            }
        }, [checked, disabled, onCheckedChange]);

        return (
            <label
                className={cn(
                    'inline-flex items-center gap-3 select-none',
                    disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
                    className
                )}
            >
                {name && <input type="hidden" name={name} value={checked ? 'on' : ''} />}

                <button
                    ref={ref}
                    type="button"
                    role="switch"
                    id={id}
                    aria-checked={checked}
                    disabled={disabled}
                    onClick={handleClick}
                    className={cn(
                        'relative inline-flex shrink-0 items-center rounded-full border border-[#14B8A6]/15 transition-all duration-260 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D1FF]/40 focus-visible:border-[#00D1FF]/40 focus-visible:shadow-[0_0_15px_rgba(0,209,255,0.08)]',
                        trackSizes[size],
                        checked ? 'bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] border-[#00D1FF]/30' : 'bg-[#0E1624]/60 hover:border-[#14B8A6]/30'
                    )}
                >
                    <span
                        className={cn(
                            'pointer-events-none inline-block rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.3)] ring-0 transition-all duration-260 ease-[var(--ease-out)]',
                            thumbSizes[size],
                            checked ? thumbTranslate[size] : 'translate-x-0.5'
                        )}
                    />
                </button>

                {label && <span className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-260 ease-[var(--ease-out)]">{label}</span>}
            </label>
        );
    }
);

Switch.displayName = 'Switch';
