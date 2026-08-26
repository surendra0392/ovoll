import { motion } from 'framer-motion';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { PageBreadcrumbs } from '@/components/navigation/PageBreadcrumbs';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge } from '@/components/ui';

export interface LegalSection {
    heading: string;
    /** Paragraphs of body copy. */
    body?: string[];
    /** Optional bullet list rendered after the paragraphs. */
    bullets?: string[];
}

interface LegalDocumentProps {
    /** Page <title> and breadcrumb label. */
    title: string;
    /** Short mono eyebrow above the headline, e.g. "Legal // Privacy". */
    eyebrow: string;
    /** Large headline. */
    headline: string;
    /** Intro paragraph under the headline. */
    intro: string;
    /** ISO or human date this document was last revised. */
    lastUpdated: string;
    sections?: LegalSection[];
    htmlContent?: string;
    /** Closing contact line, e.g. an email for questions. */
    contactEmail: string;
}

/**
 * Shared chrome for static legal pages (Privacy, Terms). Keeps both documents
 * visually consistent with the rest of the site while each page supplies only
 * its own content data.
 */
export default function LegalDocument({
    title,
    eyebrow,
    headline,
    intro,
    lastUpdated,
    sections,
    htmlContent,
    contactEmail,
}: LegalDocumentProps) {
    return (
        <>
            <SeoHead title={`${title} — OVOLL`} />
            <CustomCursor />

            <PageBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: title }]} />

            <div className="relative z-10 min-h-screen overflow-hidden bg-transparent font-sans text-white">
                <div className="h-6" />

                {/* Header */}
                <section className="container-editorial relative px-6 py-20 md:py-28">
                    <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(circle,_rgba(46,196,165,0.06)_0%,_transparent_70%)] blur-[40px]" />

                    <div className="relative z-10 mx-auto max-w-3xl space-y-6 border-b border-white/10 pb-14">
                        <Badge
                            variant="default"
                            size="sm"
                            className="font-mono text-xs tracking-widest uppercase"
                        >
                            {eyebrow}
                        </Badge>
                        <h1 className="typo-display-l leading-none text-white uppercase">
                            {headline}
                        </h1>
                        <p className="typo-body-large leading-relaxed font-light text-white/50">
                            {intro}
                        </p>
                        <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
                            Last updated // {lastUpdated}
                        </p>
                    </div>
                </section>

                {/* Body */}
                <section className="container-editorial relative px-6 pb-32">
                    <div className="mx-auto max-w-3xl space-y-14">
                        {htmlContent ? (
                            <div
                                className="prose prose-invert prose-p:text-white/60 prose-a:text-[#2EC4A5] hover:prose-a:text-[#00D1FF] prose-headings:text-white max-w-none"
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
                            />
                        ) : sections ? (
                            sections.map((section, idx) => (
                                <motion.div
                                    key={section.heading}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-baseline gap-4">
                                        <span className="font-mono text-[11px] text-[#2EC4A5]">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <h2 className="typo-heading-m tracking-tight text-white uppercase">
                                            {section.heading}
                                        </h2>
                                    </div>

                                    {typeof section.body === 'string' ? (
                                        <div
                                            className="prose prose-invert prose-p:text-white/50 prose-a:text-[#2EC4A5] hover:prose-a:text-[#00D1FF] max-w-none"
                                            dangerouslySetInnerHTML={{ __html: section.body }}
                                        />
                                    ) : (
                                        section.body?.map((para, i) => (
                                            <p
                                                key={i}
                                                className="typo-body-large leading-relaxed font-light text-white/50"
                                            >
                                                {para}
                                            </p>
                                        ))
                                    )}

                                    {section.bullets && section.bullets.length > 0 && (
                                        <ul className="mt-4 list-none space-y-3 pl-8">
                                            {section.bullets.map((bullet, bIdx) => (
                                                <li
                                                    key={bIdx}
                                                    className="relative text-[14px] text-white/60"
                                                >
                                                    <span className="absolute top-2 -left-5 h-1 w-1 rounded-full bg-[#00D1FF]/50" />
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            ))
                        ) : null}

                        {/* Contact */}
                        <div className="mt-16 rounded-none border border-white/5 bg-[#0E1624]/60 p-8">
                            <h2 className="typo-heading-s tracking-tight text-white uppercase">
                                Questions?
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed font-light text-white/60">
                                If you have any questions about this document, reach out to us at{' '}
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="text-[#00D1FF] underline-offset-4 transition-colors hover:underline"
                                >
                                    {contactEmail}
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
