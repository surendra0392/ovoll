import React from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { VFXProps } from '@/types/vfx';
import { cn } from '@/utils';

interface ShimmerTextProps extends VFXProps {
    children: React.ReactNode;
    as?: React.ElementType<{
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode;
    }>;
}

export function ShimmerText({
    children,
    className,
    color = 'var(--color-primary)',
    speed = 1,
    opacity = 1,
    as: Component = 'span',
    paused = false,
}: ShimmerTextProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion || paused) {
        return (
            <Component className={className} style={{ opacity, color }}>
                {children}
            </Component>
        );
    }

    return (
        <Component
            className={cn(
                'animate-shimmer relative inline-block overflow-hidden bg-clip-text text-transparent',
                className,
            )}
            style={{
                opacity,
                backgroundImage: `linear-gradient(90deg, currentColor 0%, currentColor 40%, ${color} 50%, currentColor 60%, currentColor 100%)`,
                backgroundSize: '200% 100%',
                animationDuration: `${3 / speed}s`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
        >
            {children}

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .animate-shimmer {
                    animation-name: shimmer;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `,
                }}
            />
        </Component>
    );
}
