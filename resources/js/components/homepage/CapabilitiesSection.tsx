import { Card, Badge } from '@/components/ui';

interface CapabilityItem {
    title: string;
    description: string;
    metric: string;
    metric_label: string;
}

interface CapabilitiesSectionProps {
    content: {
        headline: string;
        description: string;
        items: CapabilityItem[];
    };
}

export function CapabilitiesSection({ content }: CapabilitiesSectionProps) {
    // Curated high-fidelity fallback items for OVOLL engineering credibility
    const credibilityItems = [
        {
            title: 'Latency Budgeting',
            description:
                'Every interaction loop is audited to complete execution inside a strict 16ms render window, ensuring zero frame drops.',
            metric: '<16ms',
            metric_label: 'Render Window',
        },
        {
            title: 'GPU Memory Sanitation',
            description:
                'Automatic destruction of unrendered WebGL geometry buffers, prevent memory leaks and browser repaints.',
            metric: '0.0MB',
            metric_label: 'Leaked Bytes',
        },
        {
            title: 'Deterministic State Flow',
            description:
                'Unidirectional data flows and clean Inertia routing synchronizations deliver structural predictability.',
            metric: '100%',
            metric_label: 'Route Sync',
        },
        {
            title: 'Core Web Vitals Integrity',
            description:
                'Leveraging modern asset optimization pipelines to ensure our digital products load instantly across every platform.',
            metric: '99/100',
            metric_label: 'Lighthouse',
        },
    ];

    const items = content.items && content.items.length > 0 ? content.items : credibilityItems;

    return (
        <section className="relative z-10 w-full bg-transparent px-6 py-24 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
                    {/* Sticky Sidebar Intro */}
                    <div className="space-y-6 lg:sticky lg:top-32">
                        <Badge variant="default" size="sm">
                            Engineering Rigor
                        </Badge>
                        <h2 className="typo-heading-xl text-white">
                            We don\'t compromise on{' '}
                            <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                                architectural quality.
                            </span>
                        </h2>
                        <p className="typo-body max-w-sm text-white/50">
                            {content.description ||
                                'Behind every premium animation lies a robust technical architecture designed for reliability, accessibility, and speed.'}
                        </p>
                    </div>

                    {/* Capabilities Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2">
                        {items.map((item, idx) => (
                            <Card
                                key={idx}
                                variant="glass"
                                className="group flex h-[260px] flex-col justify-between border border-white/5 p-8 transition-all duration-300 ease-[var(--ease-out)] hover:border-[#14B8A6]/25"
                            >
                                <div className="space-y-3">
                                    <h3 className="typo-heading-s text-white transition-colors duration-260 group-hover:text-[#00D1FF]">
                                        {item.title}
                                    </h3>
                                    <p className="typo-body-small text-white/50">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="flex items-baseline justify-between border-t border-white/5 pt-4">
                                    <span className="font-mono text-2xl font-bold tracking-tight text-[#00D1FF] transition-colors duration-300 group-hover:text-[#14B8A6]">
                                        {item.metric}
                                    </span>
                                    <span className="typo-caption text-white/30">
                                        {item.metric_label}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
