import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { MOTION_EASE, MOTION_DURATION } from '@/utils';

interface AnimatedSectionProps extends HTMLMotionProps<'div'> {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function AnimatedSection({
    children,
    delay = 0,
    className = '',
    ...props
}: AnimatedSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: MOTION_DURATION.reveal, delay, ease: MOTION_EASE.out }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
