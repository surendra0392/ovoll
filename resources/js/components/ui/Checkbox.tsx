import { forwardRef, useCallback } from 'react';
import { cn } from '@/utils';

export interface CheckboxProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    name?: string;
}

const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
    ({ checked = false, onCheckedChange, label, disabled = false, className, id, name }, ref) => {
        const handleClick = useCallback(() => {
            if (!disabled) {
                onCheckedChange?.(!checked);
            }
        }, [checked, disabled, onCheckedChange]);

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
                if (e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            },
            [handleClick]
        );

        return (
            <label
                className={cn(
                    'inline-flex items-center gap-3 select-none',
                    disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
                    className
                )}
            >
                {/* Hidden native input for form submission */}
                {name && <input type="hidden" name={name} value={checked ? 'on' : ''} />}

                <button
                    ref={ref}
                    type="button"
                    role="checkbox"
                    id={id}
                    aria-checked={checked}
                    disabled={disabled}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-260 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D1FF]/40 focus-visible:border-[#00D1FF]/40 focus-visible:shadow-[0_0_15px_rgba(0,209,255,0.08)]',
                        checked
                            ? 'border-[#00D1FF]/30 bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] text-surface-raised'
                            : 'border-[#14B8A6]/15 bg-[#0E1624]/40 text-transparent hover:border-[#14B8A6]/30'
                    )}
                >
                    {checked && <CheckIcon />}
                </button>

                {label && <span className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-260 ease-[var(--ease-out)]">{label}</span>}
            </label>
        );
    }
);

Checkbox.displayName = 'Checkbox';
