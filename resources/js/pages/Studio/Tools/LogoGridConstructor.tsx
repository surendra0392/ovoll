import { useState } from 'react';
import { Label } from '@/components/ui/Label';

export default function LogoGridConstructor() {
    const [clearSpace, setClearSpace] = useState(1);
    const markSize = 100;
    const pad = clearSpace * (markSize / 4);
    const total = markSize + pad * 2;

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Clear space: {clearSpace.toFixed(2)}× mark height
                </Label>
                <input
                    type="range"
                    min={0.25}
                    max={2}
                    step={0.25}
                    value={clearSpace}
                    onChange={(e) => setClearSpace(Number(e.target.value))}
                    className="w-full accent-[#2EC4A5]"
                />
            </div>

            <div className="flex justify-center">
                <div
                    className="relative bg-white/5"
                    style={{ width: total, height: total, padding: pad }}
                >
                    {/* clear-space rings */}
                    <div className="absolute inset-0 border border-dashed border-[#00D1FF]/40" />
                    <div
                        className="text-surface-raised flex items-center justify-center bg-gradient-to-br from-[#2EC4A5] to-[#00D1FF] font-bold"
                        style={{ width: markSize, height: markSize }}
                    >
                        LOGO
                    </div>
                </div>
            </div>

            <div className="bg-surface-raised/60 border border-white/5 p-4 font-mono text-xs text-white/60">
                Clear space = <span className="text-[#2EC4A5]">{pad}px</span> on every side · min
                canvas {total}×{total}px
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Defining clear-space as a multiple of a logo feature scales better than fixed
                pixels.
            </p>
        </div>
    );
}
