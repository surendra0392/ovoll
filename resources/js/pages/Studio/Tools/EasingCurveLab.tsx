import { motion } from 'framer-motion';
import { useState } from 'react';
import { Label } from '@/components/ui/Label';

const PRESETS = [
    { name: 'Ease Out', curve: [0, 0, 0.2, 1] },
    { name: 'Premium', curve: [0.16, 1, 0.3, 1] },
    { name: 'Ease In Out', curve: [0.4, 0, 0.2, 1] },
    { name: 'Anticipate', curve: [0.68, -0.55, 0.27, 1.55] },
];

export default function EasingCurveLab() {
    const [preset, setPreset] = useState(PRESETS[1]!);
    const [key, setKey] = useState(0);

    const [x1 = 0, y1 = 0, x2 = 0, y2 = 0] = preset.curve;
    // SVG path: 100x100 box, y inverted
    const path = `M0,100 C${x1 * 100},${100 - y1 * 100} ${x2 * 100},${100 - y2 * 100} 100,0`;

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">Preset</Label>
                <div className="flex flex-wrap gap-2">
                    {PRESETS.map((p) => (
                        <button
                            key={p.name}
                            onClick={() => {
                                setPreset(p);
                                setKey((k) => k + 1);
                            }}
                            className={`border px-3 py-1.5 font-mono text-[10px] transition-all ${
                                preset.name === p.name
                                    ? 'border-[#2EC4A5] bg-[#2EC4A5]/10 text-white'
                                    : 'border-white/10 text-white/50 hover:text-white'
                            }`}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center gap-6 sm:flex-row">
                <svg viewBox="-10 -10 120 120" className="h-40 w-40 shrink-0">
                    <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" />
                    <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.1)" />
                    <path d={path} fill="none" stroke="#2EC4A5" strokeWidth="2" />
                </svg>

                <div className="flex-1 space-y-3">
                    <div className="relative h-2 w-full rounded-full bg-white/5">
                        <motion.div
                            key={key}
                            className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#2EC4A5] to-[#00D1FF]"
                            initial={{ left: '0%' }}
                            animate={{ left: 'calc(100% - 20px)' }}
                            transition={{
                                duration: 1.2,
                                ease: preset.curve as [number, number, number, number],
                                repeat: Infinity,
                                repeatType: 'reverse',
                            }}
                        />
                    </div>
                    <code className="bg-surface-raised/60 block border border-white/5 p-3 font-mono text-[11px] text-white/60">
                        cubic-bezier({preset.curve.join(', ')})
                    </code>
                </div>
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Seeing the curve drive a real object beats guessing from the numeric control points.
            </p>
        </div>
    );
}
