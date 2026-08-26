import ErrorBoundary from '../components/error/ErrorBoundary';
import { AccessibilityProvider } from './AccessibilityProvider';
import { AnimationProvider } from './AnimationProvider';
import { SentryProvider } from './SentryProvider';
import { SEOProvider } from './SEOProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <SentryProvider>
                <SEOProvider>
                    <ThemeProvider>
                        <AccessibilityProvider>
                            <AnimationProvider>
                                <ToastProvider>{children}</ToastProvider>
                            </AnimationProvider>
                        </AccessibilityProvider>
                    </ThemeProvider>
                </SEOProvider>
            </SentryProvider>
        </ErrorBoundary>
    );
}
