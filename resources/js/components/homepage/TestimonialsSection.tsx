import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Badge, Card } from '@/components/ui';

interface TestimonialItem {
    quote: string;
    author: string;
    role: string;
    company: string;
}

interface TestimonialsSectionProps {
    content: {
        headline: string;
        items: TestimonialItem[];
    };
    settings?: {
        autoplay?: boolean;
        duration?: number;
    };
}

export function TestimonialsSection({ content, settings }: TestimonialsSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const duration = settings?.duration ?? 6000;

    const testimonialItems: TestimonialItem[] =
        content.items && content.items.length > 0
            ? content.items
            : [
                  {
                      quote: 'OVOLL rebuilt our primary WebGL client dashboard, achieving 60 FPS on mobile browsers and improving conversion rates by 42%.',
                      author: 'Marcus Vance',
                      role: 'VP of Product',
                      company: 'Vortech',
                  },
                  {
                      quote: 'Their attention to mechanical details, transitions, and stateless architectures is unmatched. They operate like elite internal engineers.',
                      author: 'Elena Rostova',
                      role: 'Chief Technology Officer',
                      company: 'Nexa Flow',
                  },
              ];

    useEffect(() => {
        if (settings?.autoplay === false || testimonialItems.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonialItems.length);
        }, duration);

        return () => clearInterval(interval);
    }, [testimonialItems.length, duration, settings?.autoplay]);

    const active = testimonialItems[activeIndex]!;

    const differentiators = [
        {
            title: 'Creative Standard',
            desc: 'Every layout is custom designed. We do not use templates, boilerplate grids, or generic styling libraries.',
        },
        {
            title: 'Long-term Thinking',
            desc: 'We write modular, type-safe React/Laravel systems that stay maintainable for years, preventing technical debt.',
        },
    ];

    return (
        <section className="relative z-10 w-full bg-transparent px-6 py-32 text-white md:py-48">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="mb-16 space-y-6 md:mb-24">
                    <Badge variant="default" size="sm">
                        Section 08 — Why OVOLL
                    </Badge>
                    <h2 className="typo-heading-xl text-white">
                        Why OVOLL: <br />
                        <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                            We engineer digital capital.
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
                    {/* Left Column: Differentiators */}
                    <div className="space-y-8 lg:col-span-6">
                        {differentiators.map((diff, idx) => (
                            <div
                                key={idx}
                                className="space-y-3 rounded-2xl border border-white/5 bg-[#0E1624]/20 p-6 transition-all duration-300 select-none hover:border-[#2EC4A5]/15"
                            >
                                <h3 className="typo-heading-s text-white">{diff.title}</h3>
                                <p className="typo-body-small text-white/50">{diff.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Dynamic Client Testimonial (Wow Moment) */}
                    <div className="lg:col-span-6">
                        <Card
                            variant="glass"
                            className="relative flex h-[300px] flex-col justify-between border border-white/5 p-8 md:p-10"
                        >
                            <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 bg-[radial-gradient(circle,_rgba(0,209,255,0.06)_0%,_transparent_70%)] blur-[40px]" />

                            <div className="relative z-10 flex flex-1 flex-col justify-between">
                                <AnimatePresence mode="wait">
                                    <motion.blockquote
                                        key={activeIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        className="typo-heading-m leading-relaxed text-white/90 italic"
                                    >
                                        "{active.quote}"
                                    </motion.blockquote>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-6 flex items-center gap-4 border-t border-white/5 pt-6"
                                    >
                                        <div>
                                            <cite className="typo-label block text-white not-italic">
                                                {active.author}
                                            </cite>
                                            <span className="typo-caption text-white/35">
                                                {active.role} · {active.company}
                                            </span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Bullet navigation indicators */}
                            <div className="relative z-10 mt-6 flex justify-end gap-2.5">
                                {testimonialItems.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ease-[var(--ease-out)] ${
                                            activeIndex === idx
                                                ? 'w-5 bg-[#00D1FF]'
                                                : 'w-1.5 bg-white/20 hover:bg-white/40'
                                        }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
