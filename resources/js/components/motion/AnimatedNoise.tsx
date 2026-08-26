import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils';

export function AnimatedNoise({
    opacity = 0.05,
    className,
}: {
    opacity?: number;
    className?: string;
}) {
    const prefersReducedMotion = useReducedMotion();

    // SVG Noise Data URI for better performance than CSS gradients
    const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

    if (prefersReducedMotion) {
        return (
            <div
                className={cn(
                    'pointer-events-none absolute inset-0 z-50 mix-blend-overlay',
                    className,
                )}
                style={{ backgroundImage: noiseSvg, opacity }}
            />
        );
    }

    return (
        <div
            className="pointer-events-none absolute inset-0 z-50 overflow-hidden opacity-[var(--noise-opacity)] mix-blend-overlay"
            style={{ '--noise-opacity': opacity } as CSSProperties}
        >
            <motion.div
                className={cn('absolute -inset-[100%] h-[300%] w-[300%]', className)}
                style={{ backgroundImage: noiseSvg }}
                animate={{
                    x: ['0%', '-5%', '-15%', '7%', '-5%', '-15%', '15%', '0%', '3%', '-10%'],
                    y: ['0%', '-10%', '5%', '-25%', '25%', '10%', '0%', '15%', '35%', '10%'],
                }}
                transition={{
                    duration: 8,
                    ease: 'easeInOut',
                    repeat: Infinity,
                }}
            />
        </div>
    );
}
