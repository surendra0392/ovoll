import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { SeoHead } from '@/components/seo/SeoHead';
import { siteConfig } from '@/config/site';

const errorSchema: Record<string, unknown>[] = [
    {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${siteConfig.url}/500#webpage`,
        url: `${siteConfig.url}/500`,
        name: '500 — Server Error | OVOLL',
        description: 'OVOLL experienced a temporary technical issue.',
        isPartOf: {
            '@id': `${siteConfig.url}/#website`,
        },
    },
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${siteConfig.url}/500#breadcrumb`,
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
                name: '500 — Server Error',
            },
        ],
    },
];

export default function ServerError() {
    return (
        <>
            <SeoHead
                title="500 — Server Error"
                description="We're experiencing a technical issue. OVOLL's team has been notified and is working on a fix. Please try again shortly or contact support."
                canonical={siteConfig.url}
                schema={errorSchema as unknown as Record<string, unknown>}
                defaultSchema={false}
                noIndex={true}
            />

            <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.08)_0%,_transparent_70%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="typo-caption mb-6 inline-block text-red-400">Error 500</span>

                    <h1 className="typo-display-l mb-6 text-white">Something went wrong</h1>

                    <p className="typo-body-large mb-12 max-w-md text-white/50">
                        We're experiencing a technical issue. Our team has been notified and is
                        working on a fix. Please try again shortly.
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
                            Report Issue
                        </Link>
                    </div>

                    <p className="mt-16 text-xs text-white/20">
                        If the problem persists, please contact our support team.
                    </p>
                </motion.div>
            </div>
        </>
    );
}
