/**
 * OVOLL Dynamic Event Tracker
 * Centralized client-side handler for conversion events.
 *
 * In production, events are sent to Sentry as breadcrumbs for context
 * around error reports. Falls back gracefully if Sentry isn't loaded.
 */
import * as Sentry from '@sentry/react';

function captureBreadcrumb(message: string, data?: Record<string, unknown>) {
    try {
        Sentry.addBreadcrumb({
            category: 'user.event',
            message,
            data,
            level: 'info',
        });
    } catch {
        // Sentry not initialized — silently ignore
    }
}

export const EventTracker = {
    /**
     * Log CTA engagement clicks.
     */
    trackCtaClick(ctaLabel: string, sectionId: string): void {
        console.log(`[EventTracker] CTA Clicked: "${ctaLabel}" in Section: "${sectionId}"`);
        captureBreadcrumb('CTA Clicked', { ctaLabel, sectionId });
    },

    /**
     * Log wizard questionnaires.
     */
    trackFormStart(formId: string): void {
        console.log(`[EventTracker] Form Started: "${formId}"`);
        captureBreadcrumb('Form Started', { formId });
    },

    trackStepChange(formId: string, stepIndex: number, stepName: string): void {
        console.log(
            `[EventTracker] Form "${formId}" progressed to Step ${stepIndex + 1}: "${stepName}"`,
        );
        captureBreadcrumb('Form Step Changed', { formId, stepIndex, stepName });
    },

    trackFormComplete(formId: string, score: number): void {
        console.log(`[EventTracker] Form Completed: "${formId}". Scored Lead Quality: ${score}`);
        captureBreadcrumb('Form Completed', { formId, score });
    },

    /**
     * Log ROI Calculator sliders.
     */
    trackCalculatorChange(calcId: string, metrics: Record<string, number | string>): void {
        console.log(`[EventTracker] Calculator "${calcId}" modified:`, metrics);
        captureBreadcrumb('Calculator Modified', { calcId, ...metrics });
    },

    /**
     * Log Project Estimator checkbox interactions.
     */
    trackEstimatorSelected(service: string, selected: boolean): void {
        console.log(`[EventTracker] Estimator service "${service}" toggled to: ${selected}`);
        captureBreadcrumb('Estimator Toggled', { service, selected });
    },

    /**
     * Log exit intent modal trigger.
     */
    trackExitIntentTriggered(): void {
        console.log('[EventTracker] Exit Intent Modal Triggered');
        captureBreadcrumb('Exit Intent Triggered');
    },
};
