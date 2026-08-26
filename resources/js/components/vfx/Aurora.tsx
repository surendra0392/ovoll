import { motion } from 'framer-motion';
import { BRAND } from '@/components/ui/Logo';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { VFXProps } from '@/types/vfx';
import { cn } from '@/utils';

interface AuroraProps extends VFXProps {
    colors?: [string, string, string];
}

export function Aurora({
    className,
    intensity = 1,
    speed = 1,
    opacity = 1,
    colors = [BRAND.teal, BRAND.cyan, BRAND.deepSpace],
    paused = false,
}: AuroraProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return (
            <div
                className={cn('pointer-events-none absolute inset-0 -z-10', className)}
                style={{
                    background: `linear-gradient(135deg, ${colors[0]} 0%, transparent 100%)`,
                    opacity: opacity * intensity * 0.3,
                }}
            />
        );
    }

    return (
        <div
            className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
            style={{ opacity }}
        >
            <div className="bg-surface-raised absolute inset-0 z-10 opacity-50 mix-blend-overlay" />
            <motion.div
                className="absolute top-[-50%] left-[-50%] h-[200%] w-[200%] opacity-60 mix-blend-screen"
                style={{
                    backgroundImage: `
                        radial-gradient(ellipse at 100% 0%, ${colors[0]} 0%, transparent 50%), 
                        radial-gradient(ellipse at 0% 100%, ${colors[1]} 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 50%, ${colors[2]} 0%, transparent 50%)
                    `,
                    filter: `blur(${80 * intensity}px)`,
                }}
                animate={
                    paused
                        ? {}
                        : {
                              rotate: [0, 10, -5, 0],
                              scale: [1, 1.05, 0.95, 1],
                              x: ['0%', '2%', '-2%', '0%'],
                              y: ['0%', '-2%', '2%', '0%'],
                          }
                }
                transition={{
                    duration: 20 / speed,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}
