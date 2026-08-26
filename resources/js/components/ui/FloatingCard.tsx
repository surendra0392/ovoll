import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FloatingCardProps
    extends Omit<
        React.HTMLAttributes<HTMLDivElement>,
        'onAnimationStart' | 'onAnimationEnd' | 'onAnimationComplete' | 'onAnimationRepeat' | 'onDrag' | 'onDragStart' | 'onDragEnd'
    > {
    delay?: number;
    floatIntensity?: number;
}

export function FloatingCard({ delay = 0, floatIntensity = 10, className, children, ...props }: FloatingCardProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className} {...props}>{children}</div>;
    }

    return (
        <motion.div
            animate={{
                y: [0, -floatIntensity, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            }}
            className={cn('relative', className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
