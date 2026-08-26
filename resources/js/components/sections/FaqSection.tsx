import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Text } from '@/components/ui';
import { cn } from '@/utils';
import type { SectionData } from './types';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqSectionProps {
    section: SectionData;
}

export function FaqSection({ section }: FaqSectionProps) {
    const { title, subtitle, content = {} } = section;
    const faqs: FaqItem[] = (content as { faqs?: FaqItem[] }).faqs ?? [];

    const [activeIdx, setActiveIdx] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFaqs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="mx-auto w-full max-w-3xl space-y-12 px-6">
            {/* Header */}
            {(title || subtitle) && (
                <div className="space-y-4 text-center">
                    {title && (
                        <Text
                            variant="h2"
                            className="text-4xl font-bold tracking-tight md:text-5xl"
                        >
                            {title}
                        </Text>
                    )}
                    {subtitle && (
                        <Text variant="body" className="text-white/60">
                            {subtitle}
                        </Text>
                    )}
                </div>
            )}

            {/* Search Input */}
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search frequently asked questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-6 py-4 text-white placeholder-white/30 transition-colors focus:border-white/30 focus:outline-none"
                />
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, idx) => {
                        const isOpen = activeIdx === idx;

                        return (
                            <div key={idx} className="border-b border-white/10 pb-4">
                                <button
                                    onClick={() => setActiveIdx(isOpen ? null : idx)}
                                    className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold transition-colors hover:text-white/80"
                                >
                                    <span>{faq.question}</span>
                                    <svg
                                        className={cn(
                                            'h-5 w-5 transform transition-transform duration-300',
                                            isOpen ? 'rotate-180' : '',
                                        )}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-4 text-sm leading-relaxed text-white/60">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })
                ) : (
                    <div className="py-12 text-center font-mono text-sm text-white/30">
                        No matches found for your search query.
                    </div>
                )}
            </div>
        </div>
    );
}
