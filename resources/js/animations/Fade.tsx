import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { easings } from '@/config/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FadeProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    className?: string;
}

export function Fade({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.5,
    className,
}: FadeProps) {
    const prefersReducedMotion = useReducedMotion();

    const directionOffset: Record<string, { x: number; y: number }> = {
        up: { x: 0, y: 24 },
        down: { x: 0, y: -24 },
        left: { x: 24, y: 0 },
        right: { x: -24, y: 0 },
        none: { x: 0, y: 0 },
    };

    const variants: Variants = prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
              hidden: {
                  opacity: 0,
                  x: directionOffset[direction]!.x,
                  y: directionOffset[direction]!.y,
              },
              visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: duration || 0.8, delay, ease: easings.premium },
              },
          };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
