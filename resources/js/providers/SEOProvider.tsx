import type { ReactNode } from 'react';

export function SEOProvider({ children }: { children: ReactNode }) {
    // The SeoHead with default Organization schema is also rendered by DefaultLayout.
    // This provider wraps the app so that even pages without a layout still have SEO.
    return <>{children}</>;
}

// Default SEO data is rendered via the DefaultLayout's <SEO /> component.
// Individual pages can override by rendering their own SeoHead with page-specific props.
