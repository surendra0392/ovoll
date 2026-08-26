import { cn } from '@/utils';

interface GlowBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
    borderWidth?: number;
    borderRadius?: number;
}

export function GlowBorder({ color = 'var(--brand-accent)', borderWidth = 2, borderRadius = 12, className, children, ...props }: GlowBorderProps) {
    return (
        <div
            className={cn('relative inline-block overflow-hidden', className)}
            style={{ borderRadius: `${borderRadius}px`, padding: `${borderWidth}px` }}
            {...props}
        >
            <div
                className="absolute inset-0 z-0 animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--glow-color)_50%,transparent_100%)] opacity-50"
                style={{ '--glow-color': color } as React.CSSProperties}
            />
            <div className="absolute inset-0 z-0 bg-background" style={{ borderRadius: `${Math.max(0, borderRadius - borderWidth)}px`, margin: `${borderWidth}px` }} />
            <div className="relative z-10 h-full w-full rounded-[inherit]">
                {children}
            </div>
        </div>
    );
}
