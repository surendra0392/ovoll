import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils';

interface Faq {
    question: string;
    answer: string;
}

export default function FaqAccordion({ faqs = [] }: { faqs?: Faq[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) {
        return null;
    }

    return (
        <section className="relative z-10 py-24">
            <div className="container mx-auto max-w-3xl px-6">
                <div className="mb-16 md:text-center">
                    <h2 className="mb-6 text-4xl font-bold tracking-tighter text-white md:text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-white/50">
                        Everything you need to know about partnering with us.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;

                        return (
                            <div
                                key={idx}
                                className={cn(
                                    'bg-surface-raised/60 overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300',
                                    isOpen
                                        ? 'border-[#14B8A6]/30 shadow-[0_4px_20px_rgba(20,184,166,0.1)]'
                                        : 'border-[#14B8A6]/10 hover:border-[#14B8A6]/20',
                                )}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <span className="text-lg font-medium text-white transition-colors hover:text-[#00D1FF]">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className={cn(
                                            'ml-4 flex-shrink-0 transition-colors',
                                            isOpen ? 'text-[#00D1FF]' : 'text-white/30',
                                        )}
                                    >
                                        <ChevronDown className="h-5 w-5" />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-6 pb-6 leading-relaxed text-white/60">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
