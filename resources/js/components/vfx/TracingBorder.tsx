import { BRAND } from '@/components/ui/Logo';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { VFXProps } from '@/types/vfx';
import { cn } from '@/utils';

interface TracingBorderProps extends VFXProps {
    children: React.ReactNode;
    borderWidth?: number;
    borderRadius?: number;
}

export function TracingBorder({
    children,
    className,
    color = BRAND.teal,
    speed = 1,
    opacity = 1,
    borderWidth = 1,
    borderRadius = 8,
    paused = false,
}: TracingBorderProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion || paused) {
        return (
            <div
                className={cn('relative', className)}
                style={{
                    border: `${borderWidth}px solid ${color}`,
                    borderRadius,
                    opacity,
                }}
            >
                {children}
            </div>
        );
    }

    return (
        <div className={cn('group relative', className)} style={{ opacity, borderRadius }}>
            {/* Base border (dim) */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    border: `${borderWidth}px solid ${BRAND.cyan}`,
                    opacity: 0.1,
                    borderRadius,
                }}
            />

            {/* The animated tracing border */}
            <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{ borderRadius }}
            >
                {/* SVG path to trace the border */}
                <svg className="absolute inset-0 h-full w-full" style={{ borderRadius }}>
                    <rect
                        width="100%"
                        height="100%"
                        rx={borderRadius}
                        ry={borderRadius}
                        fill="none"
                        stroke={color}
                        strokeWidth={borderWidth * 2} // Double width because half is clipped
                        strokeLinecap="round"
                        className="animate-tracing-border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                            strokeDasharray: '40 1000', // Short dash, long gap
                            strokeDashoffset: '0',
                            animation: `tracingBorder ${3 / speed}s linear infinite`,
                            filter: `drop-shadow(0 0 4px ${BRAND.cyan})`,
                        }}
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">{children}</div>

            {/* Need to add the keyframes globally or handle via inline style block if we don't have tailwind config */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes tracingBorder {
                    0% { stroke-dashoffset: 1040; }
                    100% { stroke-dashoffset: 0; }
                }
            `,
                }}
            />
        </div>
    );
}
