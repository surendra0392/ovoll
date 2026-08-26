import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { VFXProps } from '@/types/vfx';
import { cn } from '@/utils';

interface GridPerspectiveProps extends VFXProps {
    gridSize?: number;
    perspective?: number;
}

export function GridPerspective({
    className,
    speed = 1,
    opacity = 0.2,
    color = 'var(--color-primary)',
    gridSize = 40,
    perspective = 600,
    paused = false,
}: GridPerspectiveProps) {
    const prefersReducedMotion = useReducedMotion();

    const gridStyle = {
        backgroundImage: `
            linear-gradient(to right, ${color} 1px, transparent 1px),
            linear-gradient(to bottom, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        opacity,
    };

    if (prefersReducedMotion) {
        return (
            <div className={cn('pointer-events-none absolute inset-0 -z-10', className)}>
                <div className="absolute inset-0" style={gridStyle} />
            </div>
        );
    }

    return (
        <div
            className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
            style={{ perspective: `${perspective}px` }}
        >
            {/* Top fade gradient */}
            <div className="from-background absolute inset-0 z-10 bg-gradient-to-b via-transparent to-transparent" />

            <motion.div
                className="absolute bottom-0 left-[-50%] h-[150%] w-[200%] origin-bottom"
                style={{
                    ...gridStyle,
                    transformStyle: 'preserve-3d',
                }}
                initial={{ rotateX: 60, y: 0 }}
                animate={
                    paused
                        ? { rotateX: 60, y: 0 }
                        : {
                              rotateX: 60,
                              y: [0, gridSize],
                          }
                }
                transition={{
                    duration: 2 / (speed || 1),
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    );
}
