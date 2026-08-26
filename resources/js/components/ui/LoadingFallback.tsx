import { cn } from '@/utils';

interface LoadingFallbackProps {
    /** Additional classes for the outer container */
    className?: string;
}

/**
 * A reusable loading placeholder for lazy-loaded Three.js canvases and
 * other async components that need a suspense fallback.
 *
 * Renders a centered, pulsing circular indicator.
 * Accepts `className` for custom sizing/positioning (defaults to
 * `absolute inset-0` for canvas overlays).
 */
export function LoadingFallback({ className }: LoadingFallbackProps) {
    return (
        <div
            className={cn(
                'absolute inset-0 flex items-center justify-center',
                className,
            )}
            role="status"
            aria-label="Loading"
        >
            <div className="h-24 w-24 animate-pulse rounded-full border border-white/5" />
            <span className="sr-only">Loading...</span>
        </div>
    );
}
