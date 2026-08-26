import { Text } from '@/components/ui';
import type { SectionData } from './types';

interface ProcessStep {
    num: string;
    title: string;
    desc: string;
}

interface ProcessSectionProps {
    section: SectionData;
}

export function ProcessSection({ section }: ProcessSectionProps) {
    const { variant, title, subtitle, content = {} } = section;
    const steps: ProcessStep[] = (content as { steps?: ProcessStep[] }).steps ?? [];

    const isHorizontal = variant === 'horizontal';

    return (
        <div className="mx-auto w-full max-w-6xl space-y-16 px-6">
            {/* Header */}
            {(title || subtitle) && (
                <div className="space-y-4">
                    <Text
                        variant="caption"
                        className="font-mono tracking-widest text-[#14B8A6] uppercase"
                    >
                        Workflow
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
            {isHorizontal ? (
                <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Connector line */}
                    <div className="absolute top-[24px] right-[5%] left-[5%] z-0 hidden h-px bg-white/10 md:block" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="group relative z-10 flex flex-col space-y-4">
                            <div className="bg-surface-raised group-hover:text-surface-raised flex h-12 w-12 items-center justify-center rounded-full border border-white/10 font-mono text-sm text-white shadow-lg transition-all duration-300 group-hover:border-[#00D1FF]/50 group-hover:bg-gradient-to-r group-hover:from-[#14B8A6] group-hover:to-[#00D1FF] group-hover:shadow-[0_0_20px_rgba(0,209,255,0.4)]">
                                {step.num}
                            </div>
                            <div className="space-y-2">
                                <Text
                                    variant="h6"
                                    className="font-semibold text-white transition-colors duration-300 group-hover:text-[#00D1FF]"
                                >
                                    {step.title}
                                </Text>
                                <Text
                                    variant="body"
                                    className="text-sm leading-relaxed text-white/50"
                                >
                                    {step.desc}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative max-w-3xl space-y-12 border-l border-white/10 pl-8 md:pl-16">
                    {steps.map((step, idx) => (
                        <div key={idx} className="group relative">
                            {/* Dot / Indicator */}
                            <div className="bg-surface-raised absolute top-1.5 -left-[41px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white/40 transition-all duration-300 group-hover:border-[#00D1FF] group-hover:shadow-[0_0_10px_rgba(0,209,255,0.5)] md:-left-[73px]">
                                <div className="bg-surface-raised h-1.5 w-1.5 rounded-full transition-colors group-hover:bg-[#00D1FF]" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs text-white/30">
                                        {step.num}
                                    </span>
                                    <Text
                                        variant="h5"
                                        className="font-semibold text-white transition-colors duration-300 group-hover:text-[#00D1FF]"
                                    >
                                        {step.title}
                                    </Text>
                                </div>
                                <Text
                                    variant="body"
                                    className="text-sm leading-relaxed text-white/50"
                                >
                                    {step.desc}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
