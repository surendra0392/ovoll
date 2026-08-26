import { cn } from '@/utils';

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    showLabel?: boolean;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent';
}

export function CircularProgress({ value, max = 100, size = 48, strokeWidth = 4, showLabel = false, variant = 'default', className, ...props }: CircularProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const colors: Record<string, string> = {
        default: 'stroke-primary',
        success: 'stroke-success',
        warning: 'stroke-warning',
        danger: 'stroke-danger',
        accent: 'stroke-accent',
    };

    return (
        <div className={cn('relative inline-flex items-center justify-center', className)} {...props}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
                <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" className="stroke-muted" />
                <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className={cn('transition-all duration-500 ease-out', colors[variant])} />
            </svg>
            {showLabel && <span className="absolute text-xs font-semibold text-foreground">{Math.round(percentage)}%</span>}
        </div>
    );
}
