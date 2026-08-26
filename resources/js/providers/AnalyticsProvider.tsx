import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

// Basic Analytics Provider that respects stealth mode initially.
// We can expand this later with PostHog or Google Analytics when cookie consent is ready.
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const { url } = usePage();

    useEffect(() => {
        // Basic route change tracking
        console.debug(`[Analytics] Page viewed: ${url}`);

        // Future expansion:
        // window.posthog?.capture('$pageview');
        // window.gtag?.('config', 'GA_MEASUREMENT_ID', { page_path: url });
    }, [url]);

    return <>{children}</>;
}
