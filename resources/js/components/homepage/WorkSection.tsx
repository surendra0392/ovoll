import { useState } from 'react';
import { Badge, Card } from '@/components/ui';

interface CraftItem {
    id: string;
    title: string;
    category: string;
    description: string;
    metric: string;
    metricLabel: string;
    techStack: string[];
}

export function WorkSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const crafts: CraftItem[] = [
        {
            id: '01',
            title: 'WebGL Background Particle Engine',
            category: 'Immersive 3D',
            description:
                'Flow fields, mouse attraction vectors, and breathing cinematic camera pannes mapped in real-time.',
            metric: '60 FPS',
            metricLabel: 'GPU Speed',
            techStack: ['Three.js', 'React Three Fiber', 'GLSL Shaders'],
        },
        {
            id: '02',
            title: 'Mechanical Design System DNA',
            category: 'Design Systems',
            description:
                'Frosted glass panels, border reflections, and tactile radial focus halos compiled as reusable primitives.',
            metric: '24 Primitives',
            metricLabel: 'Core Library',
            techStack: ['Tailwind CSS', 'React', 'Framer Motion'],
        },
        {
            id: '03',
            title: 'Inertia Route Page Synchronizer',
            category: 'Architecture',
            description:
                'Managing preloading states and persistent layout components on page route transitions.',
            metric: '<2.5s',
            metricLabel: 'Transition Fade',
            techStack: ['Inertia.js', 'Laravel', 'React Router'],
        },
        {
            id: '04',
            title: 'Unified Motion Easing Bible',
            category: 'Motion Design',
            description:
                'Registering custom cubic-bezier curves globally to choreograph header menu slides, cursor lags, and accordion springs.',
            metric: '260ms',
            metricLabel: 'Base Timing',
            techStack: ['GSAP', 'CSS Variables', 'Bezier Math'],
        },
    ];

    return (
        <section className="relative z-10 w-full bg-transparent px-6 py-32 text-white md:py-48">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
                    <div className="space-y-6">
                        <Badge variant="default" size="sm">
                            Section 06 — The Craft
                        </Badge>
                        <h2 className="typo-heading-xl text-white">
                            Show The Craft: <br />
                            <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                                Interactive prototypes and visual systems.
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Crafts Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                    {crafts.map((craft, idx) => {
                        const isHovered = hoveredIndex === idx;

                        return (
                            <div
                                key={craft.id}
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group flex h-[360px] flex-col justify-between"
                            >
                                <Card
                                    variant="glass"
                                    className={`flex flex-1 flex-col justify-between border p-8 transition-all duration-300 ease-[var(--ease-out)] ${
                                        isHovered
                                            ? 'border-[#00D1FF]/40 bg-[#0E1624]/60 shadow-[0_0_30px_rgba(0,209,255,0.06)]'
                                            : 'border-white/5 bg-[#0E1624]/30'
                                    }`}
                                >
                                    {/* Card Header metadata */}
                                    <div className="flex items-start justify-between">
                                        <span className="typo-caption text-[#2EC4A5]">
                                            {craft.category}
                                        </span>
                                        <span className="typo-caption text-white/30">
                                            {craft.id}
                                        </span>
                                    </div>

                                    {/* Title & description */}
                                    <div className="space-y-3">
                                        <h3
                                            className={`typo-heading-m text-white transition-colors duration-260 ${isHovered ? 'text-[#00D1FF]' : ''}`}
                                        >
                                            {craft.title}
                                        </h3>
                                        <p className="typo-body-small max-w-md text-white/50">
                                            {craft.description}
                                        </p>
                                    </div>

                                    {/* Metrics & tech tags */}
                                    <div className="flex items-end justify-between border-t border-white/5 pt-6">
                                        <div className="flex flex-wrap gap-2">
                                            {craft.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded bg-white/3 px-2 py-0.5 font-mono text-[9px] tracking-wider text-white/40"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono text-xl font-bold text-white">
                                                {craft.metric}
                                            </div>
                                            <div className="typo-caption text-white/30">
                                                {craft.metricLabel}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
