import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Badge } from '@/components/ui';

interface ProcessStep {
    num: string;
    title: string;
    desc: string;
    details: string[];
}

export function ProcessSection() {
    const [activeStep, setActiveStep] = useState<number>(0);

    const steps: ProcessStep[] = [
        {
            num: '01',
            title: 'Discovery & Parameters',
            desc: 'We unearth the core project constraints, visual markers, and opportunity parameters.',
            details: ['Competitive audits', 'Audience profiling', 'Parameter definition'],
        },
        {
            num: '02',
            title: 'Strategy & Scaffolding',
            desc: 'Structuring the technical design tokens, stack selections, and flow architectures.',
            details: ['Route topology mapping', 'State flow validation', 'Stack selection'],
        },
        {
            num: '03',
            title: 'Visual Art Direction',
            desc: 'Crafting the tailored motion language, luxury-engineering layouts, and design system DNA.',
            details: ['Choreography specs', 'Interactive mockups', 'Asset asset systems'],
        },
        {
            num: '04',
            title: 'Technical Engineering',
            desc: 'Writing high-performance stateless components, compiling assets, and auditing latency budgets.',
            details: ['GLSL shader pipelines', 'Stateless controllers', 'Core Web Vitals tuning'],
        },
        {
            num: '05',
            title: 'Deployment & Launch',
            desc: 'Transitioning seamlessly into highly scalable production environments with zero downtime.',
            details: [
                'Cloud architecture setups',
                'DNS routing syncs',
                'Edge delivery validations',
            ],
        },
        {
            num: '06',
            title: 'Performance & Growth',
            desc: 'Continuous performance audits and data-backed optimization iterations to secure conversion gains.',
            details: [
                'Speed regression testing',
                'Interaction telemetry',
                'Conversion rate tuning',
            ],
        },
    ];

    return (
        <section className="relative z-10 w-full bg-transparent px-6 py-32 text-white md:py-48">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="mb-16 space-y-6 md:mb-24">
                    <Badge variant="default" size="sm">
                        Section 05 — The Journey
                    </Badge>
                    <h2 className="typo-heading-xl text-white">
                        The Journey: <br />
                        <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                            From parameter definition to conversion growth.
                        </span>
                    </h2>
                </div>

                {/* Connected Progress Tracker Layout */}
                <div className="relative">
                    {/* Glowing horizontal connector line */}
                    <div className="absolute top-[28px] right-[5%] left-[5%] z-0 hidden h-[2px] bg-[#2EC4A5]/10 md:block" />

                    {/* Active progress fill */}
                    <div
                        className="absolute top-[28px] left-[5%] z-0 hidden h-[2px] bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] transition-all duration-500 ease-[var(--ease-out)] md:block"
                        style={{ width: `${(activeStep / (steps.length - 1)) * 90}%` }}
                    />

                    {/* Step Nodes Grid */}
                    <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-6">
                        {steps.map((step, idx) => {
                            const isActive = activeStep === idx;
                            const isCompleted = activeStep > idx;

                            return (
                                <div
                                    key={step.num}
                                    onClick={() => setActiveStep(idx)}
                                    onMouseEnter={() => setActiveStep(idx)}
                                    className="group flex cursor-pointer flex-col items-center text-center"
                                >
                                    {/* Orbital Marker */}
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 ease-[var(--ease-out)] ${
                                            isActive
                                                ? 'border-[#00D1FF] bg-[#0E1624] shadow-[0_0_20px_rgba(0,209,255,0.3)]'
                                                : isCompleted
                                                  ? 'border-[#2EC4A5]/40 bg-[#2EC4A5]/10 text-white'
                                                  : 'bg-surface-raised border-white/10 text-white/40'
                                        }`}
                                    >
                                        <span
                                            className={`font-mono text-sm font-bold transition-colors duration-260 ${isActive ? 'text-[#00D1FF]' : ''}`}
                                        >
                                            {step.num}
                                        </span>
                                    </div>

                                    {/* Copy details */}
                                    <div className="mt-6 space-y-2 select-none">
                                        <h3
                                            className={`typo-label transition-colors duration-260 ${isActive ? 'font-extrabold text-white' : 'text-white/40 group-hover:text-white'}`}
                                        >
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Active Step Panel Detail (Wow Moment) */}
                <div className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-white/5 bg-[#0E1624]/40 p-8 md:mt-24 md:p-12">
                    <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]" />
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 items-center gap-8 md:grid-cols-12"
                        >
                            <div className="space-y-4 md:col-span-8">
                                <span className="typo-caption text-[#00D1FF]">
                                    Stage {steps[activeStep]!.num} — Detail Parameters
                                </span>
                                <h4 className="typo-heading-m text-white">
                                    {steps[activeStep]!.title}
                                </h4>
                                <p className="typo-body max-w-xl text-white/50">
                                    {steps[activeStep]!.desc}
                                </p>
                            </div>
                            <div className="space-y-3 border-t border-white/5 pt-6 md:col-span-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
                                <span className="typo-caption text-white/30">Delivery Items</span>
                                <ul className="space-y-2.5">
                                    {steps[activeStep]!.details.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="typo-body-small flex items-center gap-2 text-white/70"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#2EC4A5]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
