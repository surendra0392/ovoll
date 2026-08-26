import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Text, Glass } from '@/components/ui';
import { cn } from '@/utils';
import type { SectionData } from './types';

interface TestimonialItem {
    quote: string;
    author: string;
    role: string;
    company: string;
}

interface TestimonialsSectionProps {
    section: SectionData;
}

export function TestimonialsSection({ section }: TestimonialsSectionProps) {
    const { variant, title, subtitle, content = {}, settings = {} } = section;
    const items: TestimonialItem[] = (content as { items?: TestimonialItem[] }).items ?? [];

    const [activeIndex, setActiveIndex] = useState(0);
    const duration = settings.animation?.duration ?? 5000;
    const isSlider = variant === 'slider';

    useEffect(() => {
        if (!isSlider || items.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, duration);

        return () => clearInterval(interval);
    }, [items.length, duration, isSlider]);

    const active = items[activeIndex];

    return (
        <div className="mx-auto w-full max-w-4xl space-y-16 px-6">
            {/* Header */}
            {(title || subtitle) && (
                <div className="mx-auto max-w-3xl space-y-4 text-center">
                    <Text
                        variant="caption"
                        className="font-mono tracking-widest text-white/40 uppercase"
                    >
                        Testimonials
                    </Text>
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

            {/* Layout routing */}
            {isSlider && active ? (
                <div className="flex flex-col items-center space-y-8">
                    <div className="relative h-[280px] w-full text-center md:h-[200px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 flex flex-col justify-between"
                            >
                                <blockquote className="mx-auto max-w-3xl text-xl leading-relaxed font-medium text-white/90 italic md:text-2xl">
                                    "{active.quote}"
                                </blockquote>
                                <div className="mx-auto w-fit border-t border-white/10 pt-6">
                                    <cite className="block font-semibold text-white not-italic">
                                        {active.author}
                                    </cite>
                                    <span className="font-mono text-xs tracking-wider text-white/40 uppercase">
                                        {active.role} · {active.company}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Dots */}
                    {items.length > 1 && (
                        <div className="flex gap-2">
                            {items.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={cn(
                                        'h-2 w-2 rounded-full transition-colors',
                                        activeIndex === idx ? 'bg-white' : 'bg-white/20',
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {items.map((item, idx) => (
                        <Glass
                            key={idx}
                            className="flex flex-col justify-between space-y-6 rounded-2xl border border-white/5 bg-white/[0.01] p-8 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]"
                        >
                            <blockquote className="text-base leading-relaxed text-white/80 italic">
                                "{item.quote}"
                            </blockquote>
                            <div className="border-t border-white/5 pt-4">
                                <cite className="block text-sm font-semibold text-white not-italic">
                                    {item.author}
                                </cite>
                                <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
                                    {item.role} · {item.company}
                                </span>
                            </div>
                        </Glass>
                    ))}
                </div>
            )}
        </div>
    );
}
