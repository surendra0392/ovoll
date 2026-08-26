'use client';

import { useId } from 'react';
import { cn } from '@/utils';

/**
 * Screen-reader-only live region for announcing dynamic content updates.
 *
 * - `polite` region: non-urgent updates (form step changes, success messages)
 * - `assertive` region: urgent updates (validation errors, alerts)
 *
 * Announcements are rendered inside visually-hidden spans so assistive
 * technology reads them without visual disruption.
 */
export function Announcer({ className }: { className?: string }) {
    const politeId = useId();
    const assertiveId = useId();

    return (
        <>
            <div className={cn('sr-only', className)} aria-live="polite" aria-atomic="true">
                <span id={`announcer-polite-${politeId}`} />
            </div>
            <div className={cn('sr-only', className)} aria-live="assertive" aria-atomic="true">
                <span id={`announcer-assertive-${assertiveId}`} />
            </div>
        </>
    );
}

/**
 * Update a screen-reader announcement region with a message.
 * Uses a setTimeout/reset trick to ensure repeated messages are re-announced.
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const prefix = priority === 'assertive' ? 'announcer-assertive-' : 'announcer-polite-';

    // Find all announcer spans on the page (there should be one polite + one assertive)
    const elements = document.querySelectorAll<HTMLSpanElement>(`[id^="${prefix}"]`);

    elements.forEach((el) => {
        // Clear first to ensure repeated identical messages are re-announced
        el.textContent = '';
        setTimeout(() => {
            el.textContent = message;
        }, 50);
    });
}
