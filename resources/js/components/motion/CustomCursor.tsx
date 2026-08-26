import { motion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMotionStore } from '@/store/useMotionStore';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const { cursorState, cursorText, setCursorState, setCursorText } = useMotionStore();
    const prefersReducedMotion = useReducedMotion();

    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Spring physics for smooth trailing
    const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
    const cursorX = useSpring(mousePosition.x, springConfig);
    const cursorY = useSpring(mousePosition.y, springConfig);

    useEffect(() => {
        // Detect touch devices
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();

        if (prefersReducedMotion || isTouchDevice) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            if (!isVisible) {
                setIsVisible(true);
            }
        };

        // Global hover delegate for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest(
                'button, a, input, select, textarea, [role="button"], [data-cursor]',
            );

            if (interactive) {
                const cursorAttr = interactive.getAttribute('data-cursor');
                const cursorVal = interactive.getAttribute('data-cursor-text') || '';

                if (cursorAttr === 'text') {
                    setCursorState('text');
                    setCursorText(cursorVal || 'VIEW');
                } else if (cursorAttr === 'media') {
                    setCursorState('media');
                    setCursorText(cursorVal || 'PLAY');
                } else if (cursorAttr === 'hidden') {
                    setCursorState('hidden');
                } else {
                    setCursorState('hover');
                }
            } else {
                setCursorState('default');
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [
        prefersReducedMotion,
        isTouchDevice,
        cursorX,
        cursorY,
        isVisible,
        setCursorState,
        setCursorText,
    ]);

    if (prefersReducedMotion || isTouchDevice) {
        return null;
    }

    const variants = {
        default: {
            width: 12,
            height: 12,
            backgroundColor: '#2EC4A5', // Brand Teal Accent
            border: '0px solid transparent',
            mixBlendMode: 'normal' as const,
            opacity: 0.8,
            boxShadow: '0 0 10px rgba(46,196,165,0.5)',
        },
        hover: {
            width: 48,
            height: 48,
            backgroundColor: 'transparent',
            border: '2px solid #00D1FF', // Brand Cyan ring
            mixBlendMode: 'normal' as const,
            opacity: 1,
            boxShadow: '0 0 15px rgba(0,209,255,0.3)',
        },
        text: {
            width: 80,
            height: 80,
            backgroundColor: '#2EC4A5',
            border: '0px solid transparent',
            mixBlendMode: 'normal' as const,
            opacity: 1,
            boxShadow: '0 0 20px rgba(46,196,165,0.6)',
        },
        media: {
            width: 64,
            height: 64,
            backgroundColor: '#00D1FF',
            border: '0px solid transparent',
            mixBlendMode: 'normal' as const,
            opacity: 0.9,
            boxShadow: '0 0 20px rgba(0,209,255,0.5)',
        },
        hidden: {
            opacity: 0,
            width: 0,
            height: 0,
        },
    };

    return (
        <motion.div
            ref={cursorRef}
            className="pointer-events-none fixed top-0 left-0 z-[9999] flex origin-center -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full will-change-transform"
            style={{
                x: cursorX,
                y: cursorY,
            }}
            initial="hidden"
            animate={isVisible ? cursorState : 'hidden'}
            variants={variants}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
            {(cursorState === 'text' || cursorState === 'media') && (
                <span className="text-surface-base font-mono text-[10px] font-bold tracking-widest uppercase">
                    {cursorText}
                </span>
            )}
        </motion.div>
    );
}
