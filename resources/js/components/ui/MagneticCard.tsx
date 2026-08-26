import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticCardProps
    extends Omit<
        React.HTMLAttributes<HTMLDivElement>,
        'onAnimationStart' | 'onAnimationEnd' | 'onAnimationComplete' | 'onAnimationRepeat' | 'onDrag' | 'onDragStart' | 'onDragEnd'
    > {
    pull?: number;
}

export function MagneticCard({ pull = 10, className, children, ...props }: MagneticCardProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || prefersReducedMotion) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: (middleX / width) * pull, y: (middleY / height) * pull });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    if (prefersReducedMotion) {
        return <div className={className} {...props}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn('relative', className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
