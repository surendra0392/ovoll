import { cn } from '@/utils';

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    gradient?: string;
    borderWidth?: number;
    borderRadius?: number;
}

export function GradientBorder({ gradient = 'from-primary via-accent to-primary', borderWidth = 2, borderRadius = 12, className, children, ...props }: GradientBorderProps) {
    return (
        <div
            className={cn('relative inline-block', className)}
            style={{ borderRadius: `${borderRadius}px`, padding: `${borderWidth}px` }}
            {...props}
        >
            <div
                className={cn('absolute inset-0 z-0 bg-gradient-to-br', gradient)}
                style={{ borderRadius: `${borderRadius}px` }}
            />
            <div className="absolute inset-0 z-0 bg-background" style={{ borderRadius: `${Math.max(0, borderRadius - borderWidth)}px`, margin: `${borderWidth}px` }} />
            <div className="relative z-10 h-full w-full rounded-[inherit]">
                {children}
            </div>
        </div>
    );
}
