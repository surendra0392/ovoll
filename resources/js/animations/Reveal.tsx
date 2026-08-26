import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { easings } from '@/config/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealProps {
    children: React.ReactNode;
    width?: 'fit' | 'full';
    delay?: number;
    className?: string;
    /**
     * 'wipe' — the signature cover-slide (teal sheet sweeps away), for section
     *          headers and hero copy.
     * 'fade' — lightweight fade-up, for card grids and dense lists. Use with a
     *          per-item `delay` (e.g. `delay={(i % cols) * 0.08}`) to stagger.
     */
    variant?: 'wipe' | 'fade';
}

export function Reveal({
    children,
    width = 'fit',
    delay = 0,
    className,
    variant = 'wipe',
}: RevealProps) {
    const prefersReducedMotion = useReducedMotion();

    // Card-grid variant: a simple fade-up that staggers cleanly. With reduced
    // motion the content is shown immediately — no animation at all.
    if (variant === 'fade') {
        if (prefersReducedMotion) {
            return <div className={className}>{children}</div>;
        }

        return (
            <motion.div
                className={className}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        );
    }

    const containerVariants: Variants = {
        hidden: {},
        visible: {},
    };

    const contentVariants: Variants = prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
              hidden: { opacity: 0, y: 75 },
              visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay, ease: easings.premium },
              },
          };

    const slideVariants: Variants = prefersReducedMotion
        ? { hidden: {}, visible: {} }
        : {
              hidden: { left: 0 },
              visible: {
                  left: '100%',
                  transition: { duration: 0.8, delay, ease: easings.premium },
              },
          };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className={className}
            style={{
                position: 'relative',
                width: width === 'full' ? '100%' : 'fit-content',
                overflow: 'hidden',
            }}
        >
            <motion.div variants={contentVariants}>{children}</motion.div>
            {!prefersReducedMotion && (
                <motion.div
                    variants={slideVariants}
                    style={{
                        position: 'absolute',
                        top: 4,
                        bottom: 4,
                        left: 0,
                        right: 0,
                        zIndex: 20,
                    }}
                    className="bg-accent"
                />
            )}
        </motion.div>
    );
}
