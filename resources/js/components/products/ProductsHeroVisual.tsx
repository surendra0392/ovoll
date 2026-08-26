import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Layers, 
    Smartphone, 
    Monitor, 
    Server, 
    Cpu, 
    Activity, 
    Sparkles, 
    ShieldCheck, 
    Zap 
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ProductsHeroVisual({ className = '' }: { className?: string }) {
    const reduce = useReducedMotion();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x: x * 15, y: y * 15 });
    };

    return (
        <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            className={`relative flex h-full min-h-[380px] w-full items-center justify-center select-none ${className}`}
        >
            {/* Ambient Nebula Aura Glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.2),transparent_70%)] blur-3xl" />
                <div className="h-72 w-72 translate-x-8 -translate-y-8 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.18),transparent_70%)] blur-3xl" />
            </div>

            {/* Parallax Interactive 3D Canvas */}
            <motion.div
                animate={{ rotateX: -mousePos.y, rotateY: mousePos.x }}
                transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                style={{ perspective: 1000 }}
                className="relative flex h-full w-full max-w-[420px] items-center justify-center"
            >
                {/* Holographic Product Suite Shell */}
                <div className="relative flex w-full flex-col rounded-2xl border border-white/20 bg-gradient-to-b from-white/[0.08] to-[#071320]/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl">
                    {/* Header Bar */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#2EC4A5] shadow-[0_0_8px_#2EC4A5]" />
                            <span className="font-mono text-[10px] font-bold tracking-widest text-white/80 uppercase">
                                ARCHITECTURE SUITE MATRIX
                            </span>
                        </div>
                        <span className="rounded border border-[#00D1FF]/40 bg-[#00D1FF]/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#00D1FF]">
                            MODULAR 2026
                        </span>
                    </div>

                    {/* Multi-Tier Interactive Grid */}
                    <div className="mt-4 grid grid-cols-3 gap-2.5">
                        {/* Device Tier 1: Mobile */}
                        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center transition-colors hover:border-[#2EC4A5]/60 hover:bg-[#2EC4A5]/10">
                            <Smartphone className="h-5 w-5 text-[#2EC4A5]" />
                            <span className="mt-1.5 font-mono text-[10px] font-bold text-white">NATIVE</span>
                            <span className="font-mono text-[8px] text-white/50">iOS / Android</span>
                        </div>

                        {/* Device Tier 2: Cloud Web */}
                        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center transition-colors hover:border-[#00D1FF]/60 hover:bg-[#00D1FF]/10">
                            <Monitor className="h-5 w-5 text-[#00D1FF]" />
                            <span className="mt-1.5 font-mono text-[10px] font-bold text-white">WEB APP</span>
                            <span className="font-mono text-[8px] text-white/50">SPA / SaaS</span>
                        </div>

                        {/* Device Tier 3: API & AI */}
                        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center transition-colors hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/10">
                            <Cpu className="h-5 w-5 text-[#8B5CF6]" />
                            <span className="mt-1.5 font-mono text-[10px] font-bold text-white">AI ENGINE</span>
                            <span className="font-mono text-[8px] text-white/50">LLM & RAG</span>
                        </div>
                    </div>

                    {/* Animated Data Bus Line */}
                    <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-3.5">
                        <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5 text-[#2EC4A5]">
                                <Activity className="h-3.5 w-3.5 animate-pulse" />
                                <span className="font-mono font-semibold">SYNCHRONIZED STATE BUS</span>
                            </div>
                            <span className="font-mono font-bold text-white/60">60.0 FPS</span>
                        </div>

                        {/* Telemetry Waveform */}
                        <div className="mt-2.5 flex h-7 items-center justify-between gap-1">
                            {[30, 70, 45, 90, 60, 100, 75, 40, 85, 55, 95, 65, 80, 50].map((h, i) => (
                                <motion.div
                                    key={i}
                                    className="w-full rounded-full bg-gradient-to-t from-[#2EC4A5] to-[#00D1FF]"
                                    animate={reduce ? { height: `${h}%` } : {
                                        height: [`${h * 0.4}%`, `${h}%`, `${h * 0.5}%`],
                                    }}
                                    transition={{
                                        duration: 1.8 + (i % 3) * 0.4,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer Badges */}
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-[#2EC4A5]" />
                            <span className="font-mono text-[9px] font-semibold text-white/70">ENTERPRISE GRADE</span>
                        </div>
                        <span className="font-mono text-[9px] font-bold text-[#00D1FF]">11 CORE SUITES</span>
                    </div>
                </div>

                {/* Floating Orbiting Capability Pills */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute -top-3 -left-4 z-20"
                >
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#091522]/90 px-3.5 py-1.5 shadow-lg backdrop-blur-xl">
                        <Zap className="h-3.5 w-3.5 text-[#2EC4A5]" />
                        <span className="font-mono text-[10px] font-bold text-white">SUB-30MS RESPONSE</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="absolute -bottom-3 -right-4 z-20"
                >
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#091522]/90 px-3.5 py-1.5 shadow-lg backdrop-blur-xl">
                        <Sparkles className="h-3.5 w-3.5 text-[#00D1FF]" />
                        <span className="font-mono text-[10px] font-bold text-white">AI-AUGMENTED</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default ProductsHeroVisual;