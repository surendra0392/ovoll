import { Head, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';

export interface AlternateLocale {
    /** BCP 47 hreflang code, e.g. 'en-US', 'en-IN', 'x-default' */
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
    keywords?: string | string[];
    schema?: string | Record<string, unknown> | Array<Record<string, unknown>>;
    /** Extra <head> nodes to render (e.g. robots directives). */
    children?: ReactNode;
    /** Set to false to skip injecting the default Organization schema */
    defaultSchema?: boolean;
    /** Set to false to skip auto-generating BreadcrumbList schema */
    breadcrumbs?: boolean;
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
 */
function buildAlternateUrls(canonical: string): AlternateLocale[] {
    const { available, xDefault } = siteConfig.locales;
    const alternates: AlternateLocale[] = [];

    try {
        const url = new URL(canonical);

        for (const locale of available) {
            let href: string;

            if (locale.prefix) {
                const path = url.pathname === '/' ? '' : url.pathname;
                href = `${url.origin}${locale.prefix}${path}${url.search}`;
            } else {
                href = canonical;
            }

            alternates.push({ hreflang: locale.hreflang, href });
        }

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

/**
 * Build Schema.org BreadcrumbList from URL segments for search snippet breadcrumbs.
 */
function buildBreadcrumbSchema(canonical: string): Record<string, unknown> | null {
    try {
        const url = new URL(canonical);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        if (pathSegments.length === 0) return null;

        const itemListElement = [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteConfig.url,
            },
        ];

        let accumulatedPath = '';
        pathSegments.forEach((segment, index) => {
            accumulatedPath += `/${segment}`;
            const formattedName = segment
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            itemListElement.push({
                '@type': 'ListItem',
                position: index + 2,
                name: formattedName,
                item: `${siteConfig.url}${accumulatedPath}`,
            });
        });

        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement,
        };
    } catch {
        return null;
    }
}

/**
 * Rich Organization & ProfessionalService schema covering India & Global markets.
 */
function buildOrganizationSchema(): Record<string, unknown> {
    const indianCities = siteConfig.markets?.indianCities || ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune'];
    const globalRegions = siteConfig.markets?.globalRegions || ['United States', 'United Kingdom', 'United Arab Emirates', 'Worldwide'];

    const areaServed = [
        ...indianCities.map((city) => ({
            '@type': 'City',
            name: city,
            containedInPlace: { '@type': 'Country', name: 'India' },
        })),
        ...globalRegions.map((region) => ({
            '@type': 'Country',
            name: region,
        })),
    ];

    return {
        '@context': 'https://schema.org',
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.company.legalName || siteConfig.name,
        url: siteConfig.url,
        logo: siteConfig.logo,
        image: siteConfig.ogImage,
        description: siteConfig.description,
        email: siteConfig.company.email,
        telephone: siteConfig.company.telephone,
        foundingDate: siteConfig.company.foundingDate,
        priceRange: siteConfig.company.priceRange || '$$$$',
        currenciesAccepted: siteConfig.company.currenciesAccepted || 'INR, USD, EUR, GBP, AED',
        address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.company.address,
            addressLocality: siteConfig.company.addressLocality || 'Bengaluru',
            addressRegion: siteConfig.company.addressRegion || 'Karnataka',
            postalCode: siteConfig.company.postalCode || '560001',
            addressCountry: siteConfig.company.addressCountry || 'IN',
        },
        areaServed,
        knowsAbout: siteConfig.keywords,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Core Capabilities & Service Ecosystems',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Experience & Strategy' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Products & SaaS Engineering' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Engineering & Full-Stack Tech' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI & Autonomous Automation' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Marketing & Technical SEO' } },
            ],
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
    keywords,
    schema,
    defaultSchema = true,
    breadcrumbs = true,
    alternateLocales,
    children,
}: SeoProps) {
    const { seo } = usePage().props as {
        seo?: {
            title?: string;
            description?: string;
            image?: string;
            canonical?: string;
            keywords?: string | string[];
            schema?: string | Record<string, unknown>;
            type?: string;
        };
    };

    const finalTitle = title || seo?.title;
    // Prevent duplicated "| OVOLL" if already contained in finalTitle
    const fullTitle = finalTitle
        ? finalTitle.toLowerCase().includes(siteConfig.name.toLowerCase())
            ? finalTitle
            : `${finalTitle} | ${siteConfig.name}`
        : siteConfig.title || siteConfig.name;

    const finalDescription = description || seo?.description || siteConfig.description;
    const finalImage = image || seo?.image || siteConfig.ogImage;
    const finalCanonical = canonical || seo?.canonical || siteConfig.url;
    const finalType = type || seo?.type || 'website';

    // Keywords resolution
    const resolvedKeywords = keywords || seo?.keywords || siteConfig.keywords;
    const keywordsString = Array.isArray(resolvedKeywords)
        ? resolvedKeywords.join(', ')
        : resolvedKeywords;

    // Build hreflang alternate URLs
    const altLocales =
        alternateLocales ?? (finalCanonical ? buildAlternateUrls(finalCanonical) : []);

    // Merge custom schema with default Organization + Website + Breadcrumb schemas
    const customSchema = schema || seo?.schema;
    const schemas: Record<string, unknown>[] = [];

    if (defaultSchema) {
        schemas.push(buildOrganizationSchema());
        schemas.push(buildWebsiteSchema());
    }

    if (breadcrumbs && finalCanonical && finalCanonical !== siteConfig.url) {
        const breadcrumbSchema = buildBreadcrumbSchema(finalCanonical);
        if (breadcrumbSchema) {
            schemas.push(breadcrumbSchema);
        }
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
            {keywordsString && <meta name="keywords" content={keywordsString} />}
            <meta
                name="robots"
                content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            />
            {/* Regional Geo Signals */}
            <meta name="geo.region" content="IN" />
            <meta name="geo.placename" content="India" />

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

            {/* JSON-LD Schema */}
            {schemaString && <script type="application/ld+json">{schemaString}</script>}
        </Head>
    );
}
