import { motion } from 'framer-motion';
import { Text } from '@/components/ui';
import { Counter } from '@/components/ui/Counter';
import type { SectionData } from './types';

interface StatItem {
    value: number;
    suffix?: string;
    label: string;
    desc?: string;
}

interface StatsSectionProps {
    section: SectionData;
}

export function StatsSection({ section }: StatsSectionProps) {
    const { variant, title, subtitle, content = {} } = section;
    const stats: StatItem[] = (content as { stats?: StatItem[] }).stats ?? [];

    const isCounter = variant === 'counter';

    return (
        <div className="relative mx-auto w-full max-w-6xl space-y-16 px-6">
            {/* Soft decorative background glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,209,255,0.04)_0%,_transparent_75%)] blur-2xl" />

            {/* Header */}
            {(title || subtitle) && (
                <div className="relative z-10 mx-auto max-w-3xl space-y-4 text-center">
                    {title && (
                        <Text
                            variant="h2"
                            className="text-gradient bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] text-4xl font-bold tracking-tight md:text-5xl"
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
            <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="space-y-2 text-center"
                    >
                        <div className="text-gradient flex items-center justify-center bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] font-mono text-5xl font-bold tracking-tighter md:text-6xl">
                            {isCounter ? (
                                <Counter to={stat.value} duration={2} />
                            ) : (
                                <span>{stat.value}</span>
                            )}
                            {stat.suffix && (
                                <span className="bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] bg-clip-text text-transparent">
                                    {stat.suffix}
                                </span>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Text
                                variant="h6"
                                className="text-sm font-semibold tracking-wider text-white uppercase"
                            >
                                {stat.label}
                            </Text>
                            {stat.desc && (
                                <Text variant="body" className="text-xs text-white/40">
                                    {stat.desc}
                                </Text>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
