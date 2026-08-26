import { useState } from 'react';
import { Label } from '@/components/ui/Label';

export default function BorderRadiusHarmonizer() {
    const [outer, setOuter] = useState(24);
    const [padding, setPadding] = useState(8);

    const inner = Math.max(0, outer - padding);

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div className="flex justify-center py-6">
                <div
                    className="flex items-center justify-center border border-[#2EC4A5]/40 bg-[#2EC4A5]/5"
                    style={{ borderRadius: `${outer}px`, padding: `${padding}px` }}
                >
                    <div
                        className="text-surface-raised flex h-28 w-44 items-center justify-center bg-gradient-to-br from-[#2EC4A5] to-[#00D1FF] font-mono text-xs"
                        style={{ borderRadius: `${inner}px` }}
                    >
                        inner {inner}px
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Outer Radius: {outer}px
                    </Label>
                    <input
                        type="range"
                        min={0}
                        max={64}
                        value={outer}
                        onChange={(e) => setOuter(Number(e.target.value))}
                        className="w-full accent-[#2EC4A5]"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Padding (gap): {padding}px
                    </Label>
                    <input
                        type="range"
                        min={0}
                        max={40}
                        value={padding}
                        onChange={(e) => setPadding(Number(e.target.value))}
                        className="w-full accent-[#2EC4A5]"
                    />
                </div>
            </div>

            <div className="bg-surface-raised/60 border border-white/5 p-4 font-mono text-xs text-white/60">
                <span className="text-[#00D1FF]">inner-radius</span> = outer ({outer}) − padding (
                {padding}) = <span className="text-[#2EC4A5]">{inner}px</span>
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Concentric corners require the inner value to shrink by the padding, not match the
                outer.
            </p>
        </div>
    );
}
