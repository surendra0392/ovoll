import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { SeoHead } from '@/components/seo/SeoHead';
import { siteConfig } from '@/config/site';

const errorSchema: Record<string, unknown>[] = [
    {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${siteConfig.url}/404#webpage`,
        url: `${siteConfig.url}/404`,
        name: '404 — Page Not Found | OVOLL',
        description: 'The requested page could not be found on OVOLL.',
        isPartOf: {
            '@id': `${siteConfig.url}/#website`,
        },
        mainEntity: {
            '@type': 'ImageObject',
            name: '404 Illustration',
        },
    },
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${siteConfig.url}/404#breadcrumb`,
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteConfig.url,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: '404 — Page Not Found',
            },
        ],
    },
];

export default function NotFound() {
    return (
        <>
            <SeoHead
                title="404 — Page Not Found"
                description="The page you're looking for doesn't exist or has been moved. Return to OVOLL's homepage to explore our services in branding, product design, SaaS, and AI solutions."
                canonical={siteConfig.url}
                schema={errorSchema as unknown as Record<string, unknown>}
                defaultSchema={false}
            />
            <SeoHead>
                <meta name="robots" content="noindex, nofollow" />
            </SeoHead>

            <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,_rgba(46,196,165,0.1)_0%,_transparent_70%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="typo-caption mb-6 inline-block text-[#2EC4A5]">Error 404</span>

                    <h1 className="typo-display-l mb-6 text-white">Page not found</h1>

                    <p className="typo-body-large mb-12 max-w-md text-white/50">
                        The page you're looking for doesn't exist or has been moved. Let's get you
                        back on track.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="text-surface-base inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] px-8 py-3 text-sm font-semibold shadow-[0_0_20px_rgba(46,196,165,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(46,196,165,0.4)]"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Go Home
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
