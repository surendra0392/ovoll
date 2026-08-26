import { Text, MouseReactiveCard } from '@/components/ui';
import { AmbientGlow } from '@/components/vfx/AmbientGlow';
import { cn } from '@/utils';
import type { SectionData } from './types';

interface FeatureItem {
    title: string;
    description: string;
    metric?: string;
    metric_label?: string;
}

interface FeaturesSectionProps {
    section: SectionData;
}

export function FeaturesSection({ section }: FeaturesSectionProps) {
    const { variant, title, subtitle, content = {} } = section;
    const items: FeatureItem[] = (content as { items?: FeatureItem[] }).items ?? [];

    const isBento = variant === 'bento';
    const isSticky = variant === 'sticky';

    return (
        <div className="relative mx-auto w-full max-w-6xl space-y-16 px-6">
            {/* Header */}
            {(title || subtitle) && (
                <div className="relative z-10 max-w-3xl space-y-4">
                    <div className="pointer-events-none absolute -top-12 -left-12 h-60 w-60 opacity-10">
                        <AmbientGlow color="#14B8A6" radius={120} />
                    </div>
                    <Text
                        variant="caption"
                        className="font-mono tracking-widest text-[#14B8A6] uppercase"
                    >
                        Features
                    </Text>
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

            {/* Layout routing */}
            {isSticky ? (
                <div className="space-y-24">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                'flex flex-col items-center gap-12 md:flex-row',
                                idx % 2 === 1 ? 'md:flex-row-reverse' : '',
                            )}
                        >
                            {/* Text content */}
                            <div className="flex-1 space-y-4">
                                <span className="font-mono text-sm text-white/30">
                                    Feature 0{idx + 1}
                                </span>
                                <Text variant="h3" className="text-2xl font-bold md:text-3xl">
                                    {item.title}
                                </Text>
                                <Text variant="body" className="leading-relaxed text-white/60">
                                    {item.description}
                                </Text>
                                {item.metric && (
                                    <div className="flex items-baseline gap-2 pt-4">
                                        <span className="font-mono text-3xl font-bold text-white">
                                            {item.metric}
                                        </span>
                                        <span className="font-mono text-xs tracking-wider text-white/40 uppercase">
                                            {item.metric_label}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Decorative Block representing media/preview */}
                            <div className="flex aspect-video flex-1 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] font-mono text-xs text-white/10">
                                Visual representation
                            </div>
                        </div>
                    ))}
                </div>
            ) : isBento ? (
                <div className="grid auto-rows-[220px] grid-cols-1 gap-6 md:grid-cols-3">
                    {items.map((item, idx) => (
                        <MouseReactiveCard
                            key={idx}
                            className={cn(
                                'flex flex-col justify-between rounded-2xl border border-[#14B8A6]/15 bg-[#0E1624]/60 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500',
                                idx % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1',
                            )}
                        >
                            <div className="space-y-3">
                                <Text variant="h5" className="font-semibold text-white">
                                    {item.title}
                                </Text>
                                <Text
                                    variant="body"
                                    className="text-sm leading-relaxed text-white/50"
                                >
                                    {item.description}
                                </Text>
                            </div>
                            {item.metric && (
                                <div className="flex items-baseline justify-between border-t border-white/5 pt-4">
                                    <span className="font-mono text-xl font-bold text-[#00D1FF]">
                                        {item.metric}
                                    </span>
                                    <span className="font-mono text-[10px] tracking-wider text-white/30 uppercase">
                                        {item.metric_label}
                                    </span>
                                </div>
                            )}
                        </MouseReactiveCard>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {items.map((item, idx) => (
                        <MouseReactiveCard
                            key={idx}
                            className="flex min-h-[200px] flex-col justify-between rounded-2xl border border-[#14B8A6]/15 bg-[#0E1624]/60 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500"
                        >
                            <div className="space-y-3">
                                <Text variant="h5" className="font-semibold text-white">
                                    {item.title}
                                </Text>
                                <Text
                                    variant="body"
                                    className="text-sm leading-relaxed text-white/50"
                                >
                                    {item.description}
                                </Text>
                            </div>
                            {item.metric && (
                                <div className="flex items-baseline justify-between border-t border-white/5 pt-4">
                                    <span className="font-mono text-2xl font-bold text-[#00D1FF]">
                                        {item.metric}
                                    </span>
                                    <span className="font-mono text-xs tracking-wider text-white/30 uppercase">
                                        {item.metric_label}
                                    </span>
                                </div>
                            )}
                        </MouseReactiveCard>
                    ))}
                </div>
            )}
        </div>
    );
}
