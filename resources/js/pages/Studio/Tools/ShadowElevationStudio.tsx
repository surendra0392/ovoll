import { useState } from 'react';
import { Label } from '@/components/ui/Label';

const LEVELS = [1, 2, 3, 4, 5, 6];

function shadowFor(level: number, intensity: number): string {
    const ambient = `0 ${level}px ${level * 2}px rgba(0,0,0,${0.04 * intensity})`;
    const key = `0 ${level * 2}px ${level * 4}px rgba(0,0,0,${0.06 * intensity})`;

    return `${ambient}, ${key}`;
}

export default function ShadowElevationStudio() {
    const [intensity, setIntensity] = useState(1);

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Light Intensity: {intensity.toFixed(1)}x
                </Label>
                <input
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={intensity}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="w-full accent-[#2EC4A5]"
                />
            </div>

            <div className="grid grid-cols-2 gap-6 rounded-none bg-white/90 p-8 sm:grid-cols-3">
                {LEVELS.map((level) => (
                    <div
                        key={level}
                        className="flex h-24 flex-col items-center justify-center rounded-lg bg-white font-mono text-[10px] text-slate-500"
                        style={{ boxShadow: shadowFor(level, intensity) }}
                    >
                        <span className="text-sm font-bold text-slate-700">elevation</span>
                        {level}
                    </div>
                ))}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Two stacked shadow layers (ambient + key light) per level read far more natural than
                a single heavy blur.
            </p>
        </div>
    );
}
