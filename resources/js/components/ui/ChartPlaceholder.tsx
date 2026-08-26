import { cn } from '@/utils';

interface ChartPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    type?: 'line' | 'bar' | 'pie';
}

export function ChartPlaceholder({ title, description, type = 'line', className, ...props }: ChartPlaceholderProps) {
    return (
        <div className={cn('flex flex-col rounded-xl border border-border bg-background p-6', className)} {...props}>
            {(title || description) && (
                <div className="mb-6">
                    {title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
            )}
            <div className="relative flex-1 min-h-[250px] w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <svg className="h-8 w-8 mb-2 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        {type === 'line' && <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C7.125 7.875 11.25 15.375 15.375 10.125L21 4.5M3 19.5h18" />}
                        {type === 'bar' && <path strokeLinecap="round" strokeLinejoin="round" d="M3 19.5h18M5.25 19.5v-7.5m5.25 7.5v-11.25m5.25 11.25v-4.5m5.25 4.5v-15" />}
                        {type === 'pie' && <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6zM13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />}
                    </svg>
                    <span className="text-sm font-medium">Chart visualization</span>
                </div>
            </div>
        </div>
    );
}
