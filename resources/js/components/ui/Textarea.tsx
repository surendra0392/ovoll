import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    hasError?: boolean;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const resizeClasses: Record<string, string> = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, hasError, resize = 'vertical', rows = 3, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                rows={rows}
                className={cn(
                    'flex min-h-[80px] w-full rounded-none border border-[#2EC4A5]/15 bg-[#0E1624]/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:border-[#00D1FF]/40 focus-visible:ring-1 focus-visible:ring-[#00D1FF]/40 focus-visible:shadow-[0_0_15px_rgba(0,209,255,0.08)] disabled:cursor-not-allowed disabled:opacity-40 transition-all duration-260 ease-[var(--ease-out)] hover:border-[#2EC4A5]/30',
                    resizeClasses[resize],
                    hasError && 'border-[#ef4444]/40 focus-visible:border-[#ef4444]/60 focus-visible:ring-[#ef4444]/40 focus-visible:shadow-[0_0_15px_rgba(239,68,68,0.08)]',
                    className
                )}
                {...props}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
