export const siteConfig = {
    name: 'OVOLL',
    title: 'OVOLL — Strategic Branding, UI/UX & Digital Product Engineering Studio',
    description:
        'Vanguard branding and digital product engineering studio in India serving global enterprises. We specialize in strategic brand systems, custom web apps, FMCG packaging, SaaS platforms, and AI automation.',
    url: 'https://ovoll.in',
    ogImage: 'https://ovoll.in/images/og.jpg',
    logo: 'https://ovoll.in/favicon.svg',
    locale: 'en_US',

    /**
     * Target geographic markets for search engine indexing & rich snippets.
     * Primary coverage: India (all tier-1 and tier-2 metros).
     * Global coverage: United States, United Kingdom, UAE, Singapore, Australia, Europe.
     */
    markets: {
        primaryCountry: 'India',
        countryCode: 'IN',
        indianCities: [
            'Bengaluru',
            'Mumbai',
            'Delhi NCR',
            'Hyderabad',
            'Pune',
            'Chennai',
            'Kolkata',
            'Ahmedabad',
            'Jaipur',
            'Kochi',
            'Chandigarh',
            'Surat',
            'Lucknow',
            'Indore',
            'Coimbatore',
            'Bhubaneswar',
        ],
        globalRegions: [
            'United States',
            'United Kingdom',
            'United Arab Emirates',
            'Singapore',
            'Australia',
            'Canada',
            'Germany',
            'Worldwide',
        ],
    },

    /**
     * High-intent commercial keywords for search visibility.
     */
    keywords: [
        // India Specific Focus
        'branding agency in India',
        'strategic branding studio Bangalore',
        'UI UX design agency Mumbai',
        'custom web application development company India',
        'enterprise SaaS development agency Delhi NCR',
        'fintech product design studio Hyderabad',
        'FMCG packaging design agency Pune',
        'digital product engineering company India',
        'AI automation company India',
        'luxury brand design agency India',
        // Global Commercial Focus
        'strategic brand positioning agency',
        'design systems and token architecture',
        'full stack web application development',
        'custom React and Laravel engineering',
        'creative 3D WebGL development studio',
        'enterprise conversion rate optimization',
    ],

    /**
     * Multi-language / hreflang configuration.
     */
    locales: {
        primary: 'en-US',
        xDefault: 'en-US',
        available: [
            {
                code: 'en_US',
                hreflang: 'en-US',
                label: 'English (Global)',
                prefix: '',
            },
            {
                code: 'en_IN',
                hreflang: 'en-IN',
                label: 'English (India)',
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
        name: 'OVOLL',
        legalName: 'OVOLL',
        address: 'India',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560001',
        addressCountry: 'IN',
        email: 'hello@ovoll.in',
        telephone: '+91 90000 00000',
        vatId: null,
        foundingDate: '2023-01-01',
        priceRange: '$$$$',
        currenciesAccepted: 'INR, USD, EUR, GBP, AED',
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
