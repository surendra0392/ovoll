import type { VFXProps } from '@/types/vfx';
import { cn } from '@/utils';

interface GlassPanelProps extends VFXProps {
    children?: React.ReactNode;
    blur?: number;
    border?: boolean;
    frost?: boolean;
    highlight?: boolean;
}

export function GlassPanel({
    children,
    className,
    opacity = 1,
    blur = 12,
    border = true,
    frost = true,
    highlight = true,
}: GlassPanelProps) {
    return (
        <div
            className={cn(
                'relative overflow-hidden',
                border && 'border border-white/10 dark:border-white/5',
                className,
            )}
            style={{
                opacity,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                backgroundColor: 'var(--glass-bg, rgba(255,255,255,0.03))',
            }}
        >
            {/* Frost/Noise layer */}
            {frost && (
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            )}

            {/* Highlight/Reflection layer */}
            {highlight && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
            )}

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
