export const easings = {
    premium: [0.16, 1, 0.3, 1] as [number, number, number, number],
    smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    swift: [0.76, 0, 0.24, 1] as [number, number, number, number],
    spring: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
};

export const motionConfig = {
    transition: {
        base: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
        },
        smooth: {
            type: 'tween',
            ease: easings.premium,
            duration: 0.8,
        },
        hover: {
            type: 'tween',
            ease: 'easeOut',
            duration: 0.15, // 150ms
        },
    },
    duration: {
        fast: 0.15, // 150ms
        base: 0.3, // 300ms
        slow: 0.5, // 500ms
        premium: 0.8,
    },
};

export type MotionConfig = typeof motionConfig;
