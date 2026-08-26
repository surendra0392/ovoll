import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { VFXProps } from '@/types/vfx';
import { cn } from '@/utils';

interface SVGMorphProps extends VFXProps {
    paths: string[];
    width?: number;
    height?: number;
    viewBox?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    loop?: boolean;
    trigger?: 'auto' | 'hover';
}

/**
 * Note: For SVGMorph to work perfectly in Framer Motion, all paths should
 * ideally have the same number of nodes/points.
 */
export function SVGMorph({
    paths,
    className,
    speed = 1,
    opacity = 1,
    color,
    width = 24,
    height = 24,
    viewBox = '0 0 24 24',
    fill = 'none',
    stroke = 'currentColor',
    strokeWidth = 2,
    loop = true,
    trigger = 'auto',
    paused = false,
}: SVGMorphProps) {
    const prefersReducedMotion = useReducedMotion();
    const controls = useAnimation();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (prefersReducedMotion || paused || paths.length < 2) {
            return;
        }

        if (trigger === 'hover' && !isHovered) {
            controls.start({
                d: paths[0],
                transition: { duration: 0.5 / speed, ease: 'easeInOut' },
            });

            return;
        }

        if (trigger === 'auto' || isHovered) {
            const sequence = async () => {
                while (true) {
                    for (let i = 1; i < paths.length; i++) {
                        await controls.start({
                            d: paths[i],
                            transition: { duration: 0.8 / speed, ease: 'easeInOut' },
                        });
                        // Add slight pause at keyframes
                        await new Promise((resolve) => setTimeout(resolve, 200));
                    }

                    if (!loop) {
                        break;
                    }

                    // Return to start
                    await controls.start({
                        d: paths[0],
                        transition: { duration: 0.8 / speed, ease: 'easeInOut' },
                    });
                    await new Promise((resolve) => setTimeout(resolve, 200));
                }
            };

            sequence();
        }
    }, [paths, trigger, isHovered, speed, loop, prefersReducedMotion, paused, controls]);

    return (
        <div
            className={cn('inline-flex items-center justify-center', className)}
            style={{ width, height, opacity, color }}
            onMouseEnter={() => trigger === 'hover' && setIsHovered(true)}
            onMouseLeave={() => trigger === 'hover' && setIsHovered(false)}
        >
            <svg
                width={width}
                height={height}
                viewBox={viewBox}
                fill={fill}
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    d={paths[0]}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={controls}
                />
            </svg>
        </div>
    );
}
