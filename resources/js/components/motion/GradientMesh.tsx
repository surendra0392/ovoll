import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils';

export function GradientMesh({ className }: { className?: string }) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return (
            <div
                className={cn(
                    'from-primary/20 via-background to-secondary/20 absolute inset-0 -z-10 bg-gradient-to-br',
                    className,
                )}
            />
        );
    }

    return (
        <div
            className={cn(
                'bg-background pointer-events-none absolute inset-0 -z-10 overflow-hidden',
                className,
            )}
        >
            <motion.div
                className="absolute -top-[50%] -left-[50%] h-[200%] w-[200%] opacity-30"
                style={{
                    background:
                        'radial-gradient(circle at center, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at right bottom, var(--color-secondary) 0%, transparent 50%)',
                    filter: 'blur(100px)',
                }}
                animate={{
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    );
}
