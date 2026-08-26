import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MouseReactiveCardProps
    extends Omit<
        React.HTMLAttributes<HTMLDivElement>,
        'onAnimationStart' | 'onAnimationEnd' | 'onAnimationComplete' | 'onAnimationRepeat' | 'onDrag' | 'onDragStart' | 'onDragEnd'
    > {}

export function MouseReactiveCard({ className, children, ...props }: MouseReactiveCardProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [3, -3]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-3, 3]);
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [50, -50]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [50, -50]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || prefersReducedMotion) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    if (prefersReducedMotion) {
        return <div className={className} {...props}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className={cn('relative rounded-none border border-white/10 bg-transparent transition-colors duration-300', className)}
            {...props}
        >
            {/* Glare effect */}
            <motion.div
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-300"
                style={{ opacity: isHovered ? 0.3 : 0 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30 blur-xl"
                    style={{ x: glareX, y: glareY }}
                />
            </motion.div>
            
            {/* Content, elevated slightly in 3d */}
            <div className="relative z-10 h-full w-full" style={{ transform: 'translateZ(8px)' }}>
                {children}
            </div>
        </motion.div>
    );
}
