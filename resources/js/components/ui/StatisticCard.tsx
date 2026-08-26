import { cn } from '@/utils';

interface StatisticCardProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    label: string;
    suffix?: string;
    prefix?: string;
    trend?: { value: string; positive: boolean };
}

export function StatisticCard({ value, label, suffix, prefix, trend, className, ...props }: StatisticCardProps) {
    return (
        <div className={cn('rounded-xl border border-border bg-background p-6 text-center', className)} {...props}>
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {prefix}{value}{suffix}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            {trend && (
                <div className={cn('mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', trend.positive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger')}>
                    <svg className={cn('h-3 w-3', !trend.positive && 'rotate-180')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                    {trend.value}
                </div>
            )}
        </div>
    );
}
