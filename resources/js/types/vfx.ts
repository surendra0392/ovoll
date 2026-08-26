export interface VFXProps {
    className?: string;
    /** Scale or intensity of the effect (0 to 1+) */
    intensity?: number;
    /** Base speed of the animation */
    speed?: number;
    /** Override the primary color of the effect */
    color?: string;
    /** Opacity of the effect */
    opacity?: number;
    /** Whether the effect should pause completely */
    paused?: boolean;
}
