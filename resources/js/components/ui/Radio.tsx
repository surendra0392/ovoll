import { createContext, forwardRef, useCallback, useContext } from 'react';
import { cn } from '@/utils';

interface RadioGroupContextValue {
    value?: string;
    onValueChange?: (value: string) => void;
    name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

export interface RadioGroupProps {
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    children: React.ReactNode;
    name?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
    ({ value, onValueChange, orientation = 'vertical', className, children, name, ...props }, ref) => {
        return (
            <RadioGroupContext.Provider value={{ value, onValueChange, name }}>
                <div
                    ref={ref}
                    role="radiogroup"
                    aria-orientation={orientation}
                    className={cn(
                        'flex gap-3',
                        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </RadioGroupContext.Provider>
        );
    }
);

RadioGroup.displayName = 'RadioGroup';

export interface RadioItemProps {
    value: string;
    label?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
}

export const RadioItem = forwardRef<HTMLButtonElement, RadioItemProps>(
    ({ value, label, disabled = false, className, id }, ref) => {
        const ctx = useContext(RadioGroupContext);
        const isSelected = ctx.value === value;

        const handleClick = useCallback(() => {
            if (!disabled) {
                ctx.onValueChange?.(value);
            }
        }, [ctx, disabled, value]);

        return (
            <label
                className={cn(
                    'inline-flex items-center gap-3 select-none',
                    disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
                    className
                )}
            >
                {ctx.name && (
                    <input
                        type="radio"
                        name={ctx.name}
                        value={value}
                        checked={isSelected}
                        disabled={disabled}
                        onChange={() => ctx.onValueChange?.(value)}
                        className="sr-only"
                    />
                )}

                <button
                    ref={ref}
                    type="button"
                    role="radio"
                    id={id}
                    aria-checked={isSelected}
                    disabled={disabled}
                    onClick={handleClick}
                    className={cn(
                        'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-260 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D1FF]/40 focus-visible:border-[#00D1FF]/40 focus-visible:shadow-[0_0_15px_rgba(0,209,255,0.08)]',
                        isSelected ? 'border-[#00D1FF]/40 bg-[#0E1624]/60' : 'border-[#14B8A6]/15 bg-[#0E1624]/40 hover:border-[#14B8A6]/30'
                    )}
                >
                    {isSelected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] shadow-[0_0_8px_rgba(0,209,255,0.6)]" />
                    )}
                </button>

                {label && <span className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-260 ease-[var(--ease-out)]">{label}</span>}
            </label>
        );
    }
);

RadioItem.displayName = 'RadioItem';
