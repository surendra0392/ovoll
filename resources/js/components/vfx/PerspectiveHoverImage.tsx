import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { VFXProps } from '@/types/vfx';
import { cn } from '@/utils';

interface PerspectiveHoverImageProps extends VFXProps {
    src: string;
    alt: string;
    maxRotation?: number;
    scale?: number;
    glare?: boolean;
}

export function PerspectiveHoverImage({
    src,
    alt,
    className,
    intensity = 1,
    speed = 1,
    opacity = 1,
    maxRotation = 15,
    scale = 1.05,
    glare = true,
    paused = false,
}: PerspectiveHoverImageProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for smooth spring physics
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const springConfig = { damping: 20 / speed, stiffness: 300 * speed, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Transform input (0-1) into rotation (-maxRotation to maxRotation)
    const rotateX = useTransform(
        springY,
        [0, 1],
        [maxRotation * intensity, -maxRotation * intensity],
    );
    const rotateY = useTransform(
        springX,
        [0, 1],
        [-maxRotation * intensity, maxRotation * intensity],
    );

    // Extracted from conditional render to satisfy hook rules
    const glareX = useTransform(springX, [0, 1], [0, 100]);
    const glareY = useTransform(springY, [0, 1], [0, 100]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || paused || prefersReducedMotion) {
            return;
        }

        const rect = ref.current.getBoundingClientRect();

        // Calculate position percentage (0 to 1)
        const posX = (e.clientX - rect.left) / rect.width;
        const posY = (e.clientY - rect.top) / rect.height;

        x.set(posX);
        y.set(posY);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0.5);
        y.set(0.5);
    };

    if (prefersReducedMotion) {
        return (
            <div
                className={cn('relative overflow-hidden rounded-xl', className)}
                style={{ opacity }}
            >
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                />
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className={cn('relative rounded-xl', className)}
            style={{ perspective: '1000px', opacity }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative h-full w-full transform-gpu overflow-hidden rounded-xl"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    scale: isHovered && !paused ? scale : 1,
                }}
                transition={{ type: 'spring', ...springConfig }}
            >
                {/* The Image */}
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="pointer-events-none relative z-0 h-full w-full object-cover"
                />

                {/* Glare Effect */}
                {glare && (
                    <motion.div
                        className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
                        style={{
                            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.4) 0%, transparent 50%)`,
                            opacity: isHovered ? intensity : 0,
                        }}
                    />
                )}
            </motion.div>
        </div>
    );
}
