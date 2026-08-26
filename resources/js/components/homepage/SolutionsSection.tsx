import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Badge } from '@/components/ui';

interface PrincipleItem {
    title: string;
    tagline: string;
    details: string;
    quote: string;
}

export function SolutionsSection() {
    const [activeTab, setActiveTab] = useState<number>(0);

    const principles: PrincipleItem[] = [
        {
            title: 'Choreographed Visuals',
            tagline: 'Animation is code, not decoration.',
            details:
                'Every motion curve in the OVOLL universe is mathematically calibrated to serve user narrative. We reject random transitions, bouncy spring timelines, and default template fades.',
            quote: '“Design is not what it looks like; it is how it behaves.”',
        },
        {
            title: 'Deterministic Engineering',
            tagline: 'Uptime and speed are creative choices.',
            details:
                'We implement stateless backend architectures, strict latency budgets, and real-time GPU sanitation. Our components load and run at a consistent 60 FPS.',
            quote: '“Code should be as clean and elegant as the user interface it powers.”',
        },
        {
            title: 'Uncompromised Partnership',
            tagline: 'Direct collaborative velocity.',
            details:
                'We do not hide behind client managers or layers of agency hierarchy. You partner directly with the award-winning design architects and WebGL engineers executing your vision.',
            quote: '“The best digital products are built by small, highly aligned teams.”',
        },
    ];

    return (
        <section className="relative z-10 w-full bg-transparent px-6 py-32 text-white md:py-48">
            <div className="mx-auto max-w-7xl">
                {/* Widescreen Editorial Header */}
                <div className="mb-16 max-w-3xl space-y-6 md:mb-24">
                    <Badge variant="default" size="sm">
                        Section 04 — Philosophy
                    </Badge>
                    <h2 className="typo-heading-xl text-white">
                        How We Think: <br />
                        <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                            Engineering meets digital artistry.
                        </span>
                    </h2>
                </div>

                {/* Alternating Widescreen Interactive Layout */}
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                    {/* Left 4 Cols: Navigation Pillars */}
                    <div className="flex flex-col gap-4 lg:col-span-4">
                        {principles.map((item, idx) => {
                            const isActive = activeTab === idx;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`relative rounded-xl border p-6 text-left transition-all duration-300 ease-[var(--ease-out)] focus-visible:outline-none ${
                                        isActive
                                            ? 'border-[#00D1FF]/30 bg-[#0E1624]/60 shadow-[0_0_20px_rgba(0,209,255,0.06)]'
                                            : 'border-transparent text-white/50 hover:bg-[#0E1624]/20 hover:text-white'
                                    }`}
                                >
                                    <div className="typo-caption mb-1 text-[#2EC4A5]">
                                        0{idx + 1}
                                    </div>
                                    <div className="typo-heading-s text-white">{item.title}</div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right 8 Cols: Immersive Visual Panel (Wow Moment) */}
                    <div className="relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-[#0E1624]/30 p-8 md:p-12 lg:col-span-8">
                        {/* Soft light sweep backdrop glow */}
                        <div className="absolute top-0 right-0 h-64 w-64 bg-[radial-gradient(circle,_rgba(20,184,166,0.08)_0%,_transparent_70%)] blur-[50px]" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="relative z-10 space-y-6"
                            >
                                <span className="typo-caption text-[#00D1FF]">
                                    {principles[activeTab]!.tagline}
                                </span>

                                <p className="typo-heading-m max-w-xl text-white/70">
                                    {principles[activeTab]!.details}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="typo-body-small z-10 mt-8 border-t border-white/5 pt-6 text-white/40 italic"
                            >
                                {principles[activeTab]!.quote}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
