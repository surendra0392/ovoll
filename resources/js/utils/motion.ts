import gsap from 'gsap';

// --------------------------------------------------------------------------
// THE OVOLL MOTION BIBLE (UNIFIED INTERACTION & KINETIC SCALING TOKENS)
// --------------------------------------------------------------------------

// 1. Unified Easing Tokens
export const MOTION_EASE = {
    // Ultra-premium mechanical out curve (Apple / Linear style)
    out: [0.16, 1, 0.3, 1] as const,
    outString: 'cubic-bezier(0.16, 1, 0.3, 1)',

    // Cinematic, slow cubic in-out curve (Stripe / Vercel style)
    inOut: [0.76, 0, 0.24, 1] as const,
    inOutString: 'cubic-bezier(0.76, 0, 0.24, 1)',

    // Smooth mechanical linear
    linear: 'linear' as const,
};

// Register custom GSAP eases for unified scripting
if (typeof window !== 'undefined') {
    gsap.registerEase('ovollOut', (x: number) => {
        // Approximate cubic-bezier(0.16, 1, 0.3, 1) mathematically
        return 1 - Math.pow(1 - x, 4);
    });

    gsap.registerEase('ovollInOut', (x: number) => {
        // Approximate cubic-bezier(0.76, 0, 0.24, 1)
        return x < 0.5 ? 8 * Math.pow(x, 4) : 1 - Math.pow(-2 * x + 2, 4) / 2;
    });
}

// 2. Standard Durations (in seconds)
export const MOTION_DURATION = {
    micro: 0.15, // Hover feedback, toggle micro state
    fast: 0.26, // Menu collapse, tooltip reveal, small interactive elements
    normal: 0.5, // Standard card overlays, sliding menus, normal flips
    reveal: 0.8, // Page sections entrance, mask reveals
    cinematic: 1.5, // Major transitions, particle morphs, camera pushes
};

// 2.1 Reusable Motion Tokens requested by the Motion System Sprint
export const MOTION_TOKENS = {
    fast: MOTION_DURATION.micro,
    normal: MOTION_DURATION.fast,
    slow: MOTION_DURATION.normal,
    hero: MOTION_DURATION.reveal,
    pageTransition: MOTION_DURATION.fast,
    hover: MOTION_DURATION.micro,
    exit: MOTION_DURATION.fast,
    success: 0.4,
    error: 0.4,
    loading: 1.2,
    focus: MOTION_DURATION.micro,
};

// 3. Framer Motion Animation Presets
export const MOTION_PRESETS = {
    // Editorial Mask reveal
    maskReveal: (delay = 0) => ({
        initial: { y: '110%', rotate: 1.5 },
        animate: { y: 0, rotate: 0 },
        transition: {
            duration: MOTION_DURATION.reveal,
            ease: MOTION_EASE.out,
            delay,
        },
    }),

    // Translucent glass card zoom-fade on mount
    cardMount: (delay = 0) => ({
        initial: { opacity: 0, scale: 0.96, y: 15 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: {
            duration: MOTION_DURATION.normal,
            ease: MOTION_EASE.out,
            delay,
        },
    }),

    // Header/menu slide down reveal
    headerSlideDown: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: {
            duration: MOTION_DURATION.normal,
            ease: MOTION_EASE.out,
        },
    },

    // Page fade out overlay
    pageExit: {
        initial: { opacity: 1 },
        exit: {
            opacity: 0,
            y: '-100%',
            transition: {
                duration: MOTION_DURATION.reveal,
                ease: MOTION_EASE.inOut,
                delay: 0.2,
            },
        },
    },
};
