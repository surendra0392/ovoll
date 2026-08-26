export const siteConfig = {
    name: 'OVOLL',
    description:
        'Premium Digital Growth Company focused on Branding, Product Design, SaaS, and AI Solutions.',
    url: 'https://ovoll.in',
    ogImage: 'https://ovoll.in/images/og.jpg',
    logo: 'https://ovoll.in/favicon.svg',
    locale: 'en_US',

    /**
     * Multi-language / hreflang configuration.
     * Extend `available` as new locale versions of the site are added.
     * Each entry maps to the URL prefix for that locale version.
     * `buildAlternateUrl` in the SEO utils uses this to generate hreflang tags.
     */
    locales: {
        /** Primary locale code (BCP 47 format for hreflang) */
        primary: 'en-US',
        /** The locale that should be used as x-default (usually your primary market) */
        xDefault: 'en-US',
        /** All available locale versions of the site */
        available: [
            {
                code: 'en_US',
                hreflang: 'en-US',
                label: 'English (US)',
                /** URL prefix or full base URL for this locale version */
                prefix: '',
            },
        ],
    },

    links: {
        twitter: 'https://x.com/ovoll',
        github: 'https://github.com/ovoll',
        linkedin: 'https://linkedin.com/company/ovoll',
    },
    company: {
        name: 'OVOLL Inc.',
        legalName: 'OVOLL Incorporated',
        address: '123 Innovation Drive, Tech City, TC 90210',
        email: 'hello@ovoll.in',
        telephone: '+1-555-0123',
        vatId: null,
        foundingDate: '2023-01-01',
    },
    social: {
        sameAs: [
            'https://x.com/ovoll',
            'https://linkedin.com/company/ovoll',
            'https://github.com/ovoll',
        ],
    },
};

export type SiteConfig = typeof siteConfig;
