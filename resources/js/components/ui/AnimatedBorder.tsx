import { cn } from '@/utils';

interface AnimatedBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    borderRadius?: number;
}

export function AnimatedBorder({ borderRadius = 12, className, children, ...props }: AnimatedBorderProps) {
    return (
        <div
            className={cn('relative inline-flex overflow-hidden p-[1px]', className)}
            style={{ borderRadius: `${borderRadius}px` }}
            {...props}
        >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--color-border)_0%,var(--color-primary)_50%,var(--color-border)_100%)] opacity-50" />
            <div className="relative inline-flex h-full w-full bg-background" style={{ borderRadius: `${Math.max(0, borderRadius - 1)}px` }}>
                {children}
            </div>
        </div>
    );
}
