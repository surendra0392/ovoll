import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    options: SelectOption[];
    placeholder?: string;
    hasError?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, options, placeholder, hasError, value, onChange, ...props }, ref) => {
        return (
            <select
                ref={ref}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className={cn(
                    'flex h-11 w-full appearance-none rounded-xl border border-[#14B8A6]/15 bg-[#0E1624]/40 px-4 py-2.5 pr-10 text-sm text-white focus-visible:outline-none focus-visible:border-[#00D1FF]/40 focus-visible:ring-1 focus-visible:ring-[#00D1FF]/40 focus-visible:shadow-[0_0_15px_rgba(0,209,255,0.08)] disabled:cursor-not-allowed disabled:opacity-40 transition-all duration-260 ease-[var(--ease-out)] hover:border-[#14B8A6]/30',
                    !value && 'text-white/30',
                    hasError && 'border-[#ef4444]/40 focus-visible:border-[#ef4444]/60 focus-visible:ring-[#ef4444]/40 focus-visible:shadow-[0_0_15px_rgba(239,68,68,0.08)]',
                    className
                )}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2314B8A6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.85rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.25rem 1.25rem',
                }}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled className="bg-surface-raised text-white/30">
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value} className="bg-surface-raised text-white">
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);

Select.displayName = 'Select';
