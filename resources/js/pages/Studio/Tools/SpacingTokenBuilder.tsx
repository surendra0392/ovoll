import { useMemo, useState } from 'react';
import { Label } from '@/components/ui/Label';

export default function SpacingTokenBuilder() {
    const [base, setBase] = useState(4);
    const [steps, setSteps] = useState(8);

    const tokens = useMemo(
        () =>
            Array.from({ length: steps }, (_, i) => {
                const scale = i + 1;

                return { name: `space-${scale}`, value: base * scale };
            }),
        [base, steps],
    );

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div className="flex flex-wrap gap-6">
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Base Unit: {base}px
                    </Label>
                    <input
                        type="range"
                        min={2}
                        max={8}
                        step={2}
                        value={base}
                        onChange={(e) => setBase(Number(e.target.value))}
                        className="w-48 accent-[#2EC4A5]"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Steps: {steps}
                    </Label>
                    <input
                        type="range"
                        min={4}
                        max={12}
                        value={steps}
                        onChange={(e) => setSteps(Number(e.target.value))}
                        className="w-48 accent-[#2EC4A5]"
                    />
                </div>
            </div>

            <div className="space-y-2">
                {tokens.map((t) => (
                    <div key={t.name} className="flex items-center gap-4">
                        <span className="w-24 shrink-0 font-mono text-[11px] text-white/50">
                            {t.name}
                        </span>
                        <span className="w-14 shrink-0 font-mono text-[11px] text-[#00D1FF]">
                            {t.value}px
                        </span>
                        <div
                            className="h-4 bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]"
                            style={{ width: `${t.value}px` }}
                        />
                    </div>
                ))}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                A visible preview at each step stops teams from inventing off-scale one-off values.
            </p>
        </div>
    );
}
