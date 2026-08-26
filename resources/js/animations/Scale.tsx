import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { easings } from '@/config/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScaleProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function Scale({ children, delay = 0, duration = 0.5, className }: ScaleProps) {
    const prefersReducedMotion = useReducedMotion();

    const variants: Variants = prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
              hidden: { opacity: 0, scale: 0.85 },
              visible: {
                  opacity: 1,
                  scale: 1,
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
