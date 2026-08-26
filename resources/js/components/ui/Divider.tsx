import { cn } from '@/utils';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
    label?: string;
}

export function Divider({ orientation = 'horizontal', decorative = true, label, className, ...props }: DividerProps) {
    if (label) {
        return (
            <div className={cn('flex items-center gap-4', className)} {...props}>
                <div className="flex-1 border-t border-border" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
                <div className="flex-1 border-t border-border" />
            </div>
        );
    }

    return (
        <div
            role={decorative ? 'none' : 'separator'}
            aria-orientation={orientation}
            className={cn(
                orientation === 'horizontal' ? 'w-full border-t border-border' : 'h-full border-l border-border self-stretch',
                className
            )}
            {...props}
        />
    );
}
