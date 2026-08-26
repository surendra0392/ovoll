import { cn } from '@/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export function Progress({ value, max = 100, variant = 'default', size = 'md', showLabel, className, ...props }: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variants: Record<string, string> = {
        default: 'bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] shadow-[0_0_10px_rgba(20,184,166,0.5)]',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
        accent: 'bg-[#14B8A6]',
    };

    const sizes: Record<string, string> = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
    };

    return (
        <div className={cn('w-full', className)} {...props}>
            {showLabel && <div className="mb-1 flex justify-between text-xs text-muted-foreground"><span>Progress</span><span>{Math.round(percentage)}%</span></div>}
            <div className={cn('w-full overflow-hidden rounded-full bg-surface-raised border border-[#14B8A6]/20', sizes[size])} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
                <div className={cn('h-full rounded-full transition-all duration-500 ease-out', variants[variant])} style={{ width: `${percentage}%` }} />
            </div>
        </div>
    );
}
