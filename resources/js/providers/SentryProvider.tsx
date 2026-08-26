'use client';

import { browserTracingIntegration } from '@sentry/browser';
import * as Sentry from '@sentry/react';
import { useEffect } from 'react';

/**
 * SentryProvider initializes error tracking and performance monitoring.
 *
 * - Captures unhandled React errors and unhandled promise rejections
 * - Tracks browser Web Vitals (LCP, CLS, FCP, TTFB, INP) automatically
 * - Instruments route transitions via browser tracing
 *
 * Requires VITE_SENTRY_DSN to be set in .env for production.
 * In development, Sentry is disabled unless explicitly enabled.
 */
export function SentryProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;

        if (!dsn) {
            if (import.meta.env.DEV) {
                console.debug('[Sentry] Skipping initialization (no DSN in development)');
            }

            return;
        }

        Sentry.init({
            dsn,
            environment: import.meta.env.PROD ? 'production' : 'development',
            release: `ovoll@${import.meta.env.VITE_APP_VERSION ?? '1.0.0'}`,

            // Send 100% of traces in production for accurate Core Web Vitals data.
            // Adjust down (e.g. 0.25) for high-traffic apps to manage quota.
            tracesSampleRate: 1.0,

            // Profile 25% of sampled transactions for CPU profiling
            profilesSampleRate: 0.25,

            integrations: [
                // Automatically instruments page loads, route transitions,
                // and captures LCP, CLS, FCP, TTFB, and INP as spans
                browserTracingIntegration({
                    // Set the transaction name to the current URL path
                    // (useful for Inertia.js SPA routing)
                    instrumentPageLoad: true,
                    instrumentNavigation: true,
                    enableInp: true,
                }),
            ],

            // Filter out known non-actionable errors (e.g., browser extensions,
            // network blips, ResizeObserver loop limit exceeded)
            beforeSend(event) {
                // Ignore common non-actionable errors
                const ignoreErrors = [
                    'ResizeObserver loop limit exceeded',
                    'ResizeObserver loop completed with undelivered notifications',
                    'Non-Error promise rejection captured',
                    'Network request failed',
                    'Failed to load resource',
                    'Loading chunk',
                ];

                const message = event.exception?.values?.[0]?.value ?? '';

                if (ignoreErrors.some((ignore) => message.includes(ignore)) || message === '') {
                    return null; // Drop the event
                }

                return event;
            },
        });

        try {
            // Track page load as a metric — Sentry v8+ moved metrics to experimental
            const metrics = (
                Sentry as unknown as {
                    metrics?: { increment?: (name: string, value: number) => void };
                }
            ).metrics;

            metrics?.increment?.('page_load', 1);
        } catch {
            // Metrics API may not be available depending on Sentry version
        }

        console.debug('[Sentry] Initialized with DSN:', dsn.slice(0, 20) + '...');
    }, []);

    return <>{children}</>;
}
