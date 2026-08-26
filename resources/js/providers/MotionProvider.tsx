import React from 'react';
import { CustomCursor } from '@/components/motion/CustomCursor';

interface MotionProviderProps {
    children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
    // MotionProvider no longer drives scroll state via Lenis since we use
    // AnimationProvider with the Lenis instance directly. This provider remains
    // as a wrapper for global motion-related context if needed.

    return (
        <>
            {children}
            <CustomCursor />
        </>
    );
}
