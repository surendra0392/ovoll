import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
}
