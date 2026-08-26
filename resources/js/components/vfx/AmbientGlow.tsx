import { motion } from 'framer-motion';
import { BRAND } from '@/components/ui/Logo';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { VFXProps } from '@/types/vfx';
import { cn } from '@/utils';

interface AmbientGlowProps extends VFXProps {
    radius?: number;
    position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function AmbientGlow({
    className,
    color = BRAND.teal,
    opacity = 0.5,
    radius = 300,
    intensity = 1,
    speed = 1,
    position = 'center',
    paused = false,
}: AmbientGlowProps) {
    const prefersReducedMotion = useReducedMotion();

    const positionClasses = {
        center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
        'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
        'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
        'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    };

    const glowStyle = {
        width: radius * 2,
        height: radius * 2,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: opacity * intensity,
        filter: `blur(${radius / 4}px)`,
        mixBlendMode: 'screen' as const,
    };

    if (prefersReducedMotion || paused) {
        return (
            <div
                className={cn(
                    `pointer-events-none absolute -z-10 rounded-full`,
                    positionClasses[position],
                    className,
                )}
                style={glowStyle}
            />
        );
    }

    return (
        <motion.div
            className={cn(
                `pointer-events-none absolute -z-10 rounded-full`,
                positionClasses[position],
                className,
            )}
            style={glowStyle}
            animate={{
                scale: [1, 1.1 + intensity * 0.1, 1],
                opacity: [opacity * intensity, opacity * intensity * 1.2, opacity * intensity],
            }}
            transition={{
                duration: 4 / speed,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />
    );
}
