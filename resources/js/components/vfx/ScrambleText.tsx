import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { VFXProps } from '@/types/vfx';
import { cn } from '@/utils';

interface ScrambleTextProps extends VFXProps {
    text: string;
    characters?: string;
    revealDuration?: number;
    delay?: number;
    trigger?: 'hover' | 'auto';
    as?: React.ElementType<{
        className?: string;
        style?: React.CSSProperties;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
        children?: React.ReactNode;
    }>;
}

const DEFAULT_CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export function ScrambleText({
    text,
    className,
    speed = 1,
    opacity = 1,
    color,
    characters = DEFAULT_CHARS,
    revealDuration = 1000,
    delay = 0,
    trigger = 'auto',
    as: Component = 'span',
    paused = false,
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const frameRef = useRef<number | null>(null);

    // Store original text to prevent issues on re-renders if prop changes
    const textRef = useRef(text);
    useEffect(() => {
        textRef.current = text;
    }, [text]);

    useEffect(() => {
        if (prefersReducedMotion || paused || (trigger === 'hover' && !isHovered)) {
            requestAnimationFrame(() => setDisplayText(text));

            return;
        }

        let start: number | null = null;
        let timeoutId: ReturnType<typeof setTimeout>;

        const duration = revealDuration / speed;

        const scramble = (timestamp: number) => {
            if (!start) {
                start = timestamp;
            }

            const progress = timestamp - start;
            const percent = Math.min(progress / duration, 1);

            const currentLength = textRef.current.length;
            const revealIndex = Math.floor(currentLength * percent);

            let result = '';

            for (let i = 0; i < currentLength; i++) {
                if (i < revealIndex || textRef.current[i] === ' ') {
                    result += textRef.current[i];
                } else {
                    result += characters[Math.floor(Math.random() * characters.length)];
                }
            }

            setDisplayText(result);

            if (percent < 1) {
                frameRef.current = requestAnimationFrame(scramble);
            }
        };

        if (trigger === 'auto' && delay > 0) {
            timeoutId = setTimeout(() => {
                frameRef.current = requestAnimationFrame(scramble);
            }, delay);
        } else {
            frameRef.current = requestAnimationFrame(scramble);
        }

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [
        text,
        characters,
        revealDuration,
        speed,
        delay,
        trigger,
        isHovered,
        prefersReducedMotion,
        paused,
    ]);

    return (
        <Component
            className={cn('inline-block', className)}
            style={{ opacity, color }}
            onMouseEnter={() => trigger === 'hover' && setIsHovered(true)}
            onMouseLeave={() => trigger === 'hover' && setIsHovered(false)}
        >
            {displayText}
        </Component>
    );
}
