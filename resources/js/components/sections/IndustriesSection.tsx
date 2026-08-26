import { motion } from 'framer-motion';
import { Text, Glass } from '@/components/ui';
import type { SectionData } from './types';

interface IndustryItem {
    title: string;
    desc: string;
}

interface IndustriesSectionProps {
    section: SectionData;
}

export function IndustriesSection({ section }: IndustriesSectionProps) {
    const { variant, title, subtitle, content = {} } = section;
    const solutions: IndustryItem[] = (content as { solutions?: IndustryItem[] }).solutions ?? [];

    const isInteractive = variant === 'interactive';

    return (
        <div className="mx-auto w-full max-w-6xl space-y-16 px-6">
            {/* Header */}
            {(title || subtitle) && (
                <div className="mx-auto max-w-3xl space-y-4 text-center">
                    <Text
                        variant="caption"
                        className="font-mono tracking-widest text-white/40 uppercase"
                    >
                        Markets We Serve
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

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {solutions.map((solution, idx) => (
                    <motion.div
                        key={idx}
                        initial={isInteractive ? { opacity: 0, y: 15 } : undefined}
                        whileInView={isInteractive ? { opacity: 1, y: 0 } : undefined}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                        className="flex"
                    >
                        <Glass className="flex w-full cursor-pointer flex-col justify-between space-y-4 rounded-2xl border border-white/5 bg-white/[0.01] p-8 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]">
                            <div className="space-y-3">
                                <Text variant="h6" className="font-semibold text-white">
                                    {solution.title}
                                </Text>
                                <Text
                                    variant="body"
                                    className="text-sm leading-relaxed text-white/50"
                                >
                                    {solution.desc}
                                </Text>
                            </div>
                        </Glass>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
