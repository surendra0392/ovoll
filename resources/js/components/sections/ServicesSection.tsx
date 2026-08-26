import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Text, MouseReactiveCard } from '@/components/ui';
import { cn } from '@/utils';
import type { SectionData } from './types';

interface ServiceItem {
    title: string;
    description: string;
    expanded?: string;
}

interface ServicesSectionProps {
    section: SectionData;
}

export function ServicesSection({ section }: ServicesSectionProps) {
    const { variant, title, subtitle, content = {} } = section;
    const services: ServiceItem[] = (content as { services?: ServiceItem[] }).services ?? [];

    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [activeAccordionIdx, setActiveAccordionIdx] = useState<number | null>(0);

    const isBento = variant === 'bento';
    const isInteractive = variant === 'interactive';
    const isAccordion = variant === 'accordion';

    return (
        <div className="mx-auto w-full max-w-6xl space-y-16 px-6">
            {/* Header */}
            {(title || subtitle) && (
                <div className="mx-auto max-w-3xl space-y-4 text-center">
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

            {/* Layout Variant routing */}
            {isAccordion ? (
                <div className="mx-auto max-w-3xl space-y-4">
                    {services.map((service, idx) => {
                        const isOpen = activeAccordionIdx === idx;

                        return (
                            <div key={idx} className="border-b border-white/10 pb-4">
                                <button
                                    onClick={() => setActiveAccordionIdx(isOpen ? null : idx)}
                                    className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold transition-colors hover:text-white/80"
                                >
                                    <span>{service.title}</span>
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
                                                {service.expanded ?? service.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            ) : isBento ? (
                <div className="grid auto-rows-[240px] grid-cols-1 gap-6 md:grid-cols-3">
                    {services.map((service, idx) => (
                        <MouseReactiveCard
                            key={idx}
                            className={cn(
                                'flex flex-col justify-between rounded-2xl border border-[#14B8A6]/15 bg-[#0E1624]/60 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500',
                                idx === 0
                                    ? 'md:col-span-2 md:row-span-2'
                                    : 'md:col-span-1 md:row-span-1',
                            )}
                        >
                            <div className="space-y-3">
                                <Text variant="h5" className="font-semibold text-white">
                                    {service.title}
                                </Text>
                                <Text
                                    variant="body"
                                    className="line-clamp-4 text-sm leading-relaxed text-white/50"
                                >
                                    {service.description}
                                </Text>
                            </div>
                            <div className="font-mono text-xs text-white/30">0{idx + 1}</div>
                        </MouseReactiveCard>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {services.map((service, idx) => {
                        const isHovered = hoveredIdx === idx;

                        return (
                            <div
                                key={idx}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                className="relative flex h-[360px]"
                            >
                                <MouseReactiveCard className="flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#14B8A6]/15 bg-[#0E1624]/60 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500">
                                    <div className="space-y-4">
                                        <div className="group-hover:text-surface-raised flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-mono text-sm text-white/50 transition-colors duration-500 group-hover:bg-white">
                                            0{idx + 1}
                                        </div>
                                        <Text
                                            variant="h5"
                                            className="font-semibold tracking-tight text-white"
                                        >
                                            {service.title}
                                        </Text>

                                        <div className="relative mt-4 overflow-hidden">
                                            <motion.p
                                                animate={{
                                                    opacity: isInteractive && isHovered ? 0 : 1,
                                                    y: isInteractive && isHovered ? -10 : 0,
                                                }}
                                                className="text-sm leading-relaxed text-white/60"
                                            >
                                                {service.description}
                                            </motion.p>

                                            {isInteractive && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{
                                                        opacity: isHovered ? 1 : 0,
                                                        y: isHovered ? 0 : 20,
                                                    }}
                                                    className="pointer-events-none absolute inset-0 text-sm leading-relaxed text-white/80"
                                                >
                                                    {service.expanded ?? service.description}
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </MouseReactiveCard>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
