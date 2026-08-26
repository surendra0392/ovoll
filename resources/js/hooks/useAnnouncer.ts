import { useCallback } from 'react';
import { announce } from '@/components/a11y/Announcer';

/**
 * Hook that returns a memoized `announce` function for screen-reader
 * live region announcements.
 *
 * Re-exports the standalone `announce()` from Announcer with
 * useCallback for stable reference in dependency arrays.
 *
 * @example
 * ```tsx
 * const announce = useAnnouncer();
 * announce('Form submitted successfully', 'polite');
 * announce('Error: email is required', 'assertive');
 * ```
 */
export function useAnnouncer(): (message: string, priority?: 'polite' | 'assertive') => void {
    return useCallback(
        (message: string, priority: 'polite' | 'assertive' = 'polite') =>
            announce(message, priority),
        [],
    );
}
