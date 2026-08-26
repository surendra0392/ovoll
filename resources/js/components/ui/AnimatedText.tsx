import React from 'react';
import { cn } from '@/utils';
import { useSplitText } from '@/hooks/motion/useSplitText';

interface AnimatedTextProps {
    text: string;
    className?: string;
    variant?: 'chars' | 'words' | 'lines';
    delay?: number;
    stagger?: number;
    duration?: number;
    as?: keyof React.JSX.IntrinsicElements;
}

export function AnimatedText({ 
    text, 
    className, 
    variant = 'words', 
    delay = 0,
    stagger = 0.05,
    duration = 0.8,
    as: Component = 'span' 
}: AnimatedTextProps) {
    const textRef = useSplitText({
        type: variant,
        delay,
        stagger,
        duration,
    });

    return React.createElement(
        Component,
        {
            ref: textRef,
            className: cn('inline-block', className),
        },
        text,
    );
}
