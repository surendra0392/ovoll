import { Head, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';

export interface AlternateLocale {
    /** BCP 47 hreflang code, e.g. 'en-US', 'fr', 'x-default' */
    hreflang: string;
    /** Full absolute URL for this locale version of the current page */
    href: string;
}

export interface SeoProps {
    title?: string;
    description?: string;
    canonical?: string;
    image?: string;
    type?: string;
    schema?: string | Record<string, unknown>;
    /** Extra <head> nodes to render (e.g. robots directives). */
    children?: ReactNode;
    /** Set to false to skip injecting the default Organization schema */
    defaultSchema?: boolean;
    /**
     * Override the current locale code for hreflang detection.
     * Defaults to siteConfig.locales.primary.
     */
    currentLocale?: string;
    /**
     * Override the auto-generated alternate locale URLs.
     * Useful when a page has a non-standard URL pattern across locales.
     */
    alternateLocales?: AlternateLocale[];
}

/**
 * Build alternate locale URLs from the canonical URL for all configured locales.
 * For the primary locale (no prefix), the URL is kept as-is.
 * For other locales, the prefix is inserted into the URL path.
 */
function buildAlternateUrls(canonical: string): AlternateLocale[] {
    const { available, xDefault } = siteConfig.locales;
    const alternates: AlternateLocale[] = [];

    try {
        const url = new URL(canonical);

        for (const locale of available) {
            let href: string;

            if (locale.prefix) {
                // Insert prefix after the origin, e.g. https://ovoll.in/fr/path
                const path = url.pathname === '/' ? '' : url.pathname;
                href = `${url.origin}${locale.prefix}${path}${url.search}`;
            } else {
                // Primary locale — no prefix, keep canonical as-is
                href = canonical;
            }

            alternates.push({ hreflang: locale.hreflang, href });
        }

        // Add x-default pointing to the canonical/x-default locale version
        const xDefaultEntry = available.find((l) => l.hreflang === xDefault);

        if (xDefaultEntry) {
            const xDefaultUrl = xDefaultEntry.prefix
                ? `${url.origin}${xDefaultEntry.prefix}${url.pathname === '/' ? '' : url.pathname}${url.search}`
                : canonical;
            alternates.push({ hreflang: 'x-default', href: xDefaultUrl });
        }
    } catch {
        // Invalid canonical URL — skip alternate generation
    }

    return alternates;
}

function buildOrganizationSchema(): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.company.legalName || siteConfig.name,
        url: siteConfig.url,
        logo: siteConfig.logo,
        image: siteConfig.ogImage,
        description: siteConfig.description,
        email: siteConfig.company.email,
        telephone: siteConfig.company.telephone,
        foundingDate: siteConfig.company.foundingDate,
        address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.company.address,
            addressLocality: 'New York',
            addressRegion: 'NY',
            addressCountry: 'US',
        },
        sameAs: siteConfig.social.sameAs,
    };
}

function buildWebsiteSchema(): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
            '@id': `${siteConfig.url}/#organization`,
        },
        inLanguage: siteConfig.locale,
    };
}

export function SeoHead({
    title,
    description,
    canonical,
    image,
    type,
    schema,
    defaultSchema = true,
    alternateLocales,
    children,
}: SeoProps) {
    const { seo } = usePage().props;

    const finalTitle = title || seo?.title;
    const fullTitle = finalTitle ? `${finalTitle} | ${siteConfig.name}` : siteConfig.name;
    const finalDescription = description || seo?.description || siteConfig.description;
    const finalImage = image || seo?.image || siteConfig.ogImage;
    const finalCanonical = canonical || seo?.canonical || siteConfig.url;
    const finalType = type || seo?.type || 'website';

    // Build hreflang alternate URLs
    const altLocales =
        alternateLocales ?? (finalCanonical ? buildAlternateUrls(finalCanonical) : []);

    // Merge custom schema with default Organization + Website schemas
    const customSchema = schema || seo?.schema;
    const schemas: Record<string, unknown>[] = [];

    if (defaultSchema) {
        schemas.push(buildOrganizationSchema());
        schemas.push(buildWebsiteSchema());
    }

    if (customSchema) {
        try {
            const parsed =
                typeof customSchema === 'string' ? JSON.parse(customSchema) : customSchema;

            if (Array.isArray(parsed)) {
                schemas.push(...parsed);
            } else {
                schemas.push(parsed);
            }
        } catch {
            // Ignore invalid JSON in custom schema, just use defaults
        }
    }

    const schemaString = schemas.length > 0 ? JSON.stringify(schemas) : null;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription} />
            {children}
            <meta property="og:locale" content={siteConfig.locale} />
            <meta property="og:site_name" content={siteConfig.name} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={finalType} />
            <meta property="og:url" content={finalCanonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={finalCanonical} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* Canonical */}
            {finalCanonical && <link rel="canonical" href={finalCanonical} />}

            {/* Hreflang alternate locale links */}
            {altLocales.map((alt) => (
                <link key={alt.hreflang} rel="alternate" hrefLang={alt.hreflang} href={alt.href} />
            ))}

            {/* JSON-LD Schema — Organization + Website + custom */}
            {schemaString && <script type="application/ld+json">{schemaString}</script>}
        </Head>
    );
}
