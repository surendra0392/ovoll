import { useMemo, useState } from 'react';
import { Label } from '@/components/ui/Label';

const RATIOS = [
    { name: 'Minor Third', value: 1.2 },
    { name: 'Major Third', value: 1.25 },
    { name: 'Perfect Fourth', value: 1.333 },
    { name: 'Golden Ratio', value: 1.618 },
];

const STEPS = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'];

export default function TypeScaleComposer() {
    const [baseSize, setBaseSize] = useState(16);
    const [ratio, setRatio] = useState(1.25);

    const scale = useMemo(() => {
        const baseIndex = 2; // 'base'

        return STEPS.map((name, i) => {
            const size = baseSize * Math.pow(ratio, i - baseIndex);

            return { name, px: Math.round(size * 100) / 100 };
        });
    }, [baseSize, ratio]);

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div className="flex flex-wrap gap-6">
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Base: {baseSize}px
                    </Label>
                    <input
                        type="range"
                        min={12}
                        max={20}
                        value={baseSize}
                        onChange={(e) => setBaseSize(Number(e.target.value))}
                        className="w-48 accent-[#2EC4A5]"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">Ratio</Label>
                    <div className="flex flex-wrap gap-2">
                        {RATIOS.map((r) => (
                            <button
                                key={r.value}
                                onClick={() => setRatio(r.value)}
                                className={`border px-3 py-1.5 font-mono text-[10px] transition-all ${
                                    ratio === r.value
                                        ? 'border-[#2EC4A5] bg-[#2EC4A5]/10 text-white'
                                        : 'border-white/10 text-white/50 hover:text-white'
                                }`}
                            >
                                {r.name} · {r.value}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-3 border-t border-white/5 pt-4">
                {scale
                    .slice()
                    .reverse()
                    .map((s) => (
                        <div key={s.name} className="flex items-baseline gap-4">
                            <span className="w-24 shrink-0 font-mono text-[10px] text-white/40">
                                {s.name} · {s.px}px
                            </span>
                            <span
                                className="truncate leading-tight font-semibold text-white"
                                style={{ fontSize: `${Math.min(s.px, 48)}px` }}
                            >
                                Almost before we knew it
                            </span>
                        </div>
                    ))}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Fluid ramps eliminate the jarring jumps that fixed breakpoint typography produces.
            </p>
        </div>
    );
}
