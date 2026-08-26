import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

function hexToRgb(hex: string): [number, number, number] | null {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());

    if (!m) {
        return null;
    }

    return [parseInt(m[1]!, 16), parseInt(m[2]!, 16), parseInt(m[3]!, 16)];
}

function luminance([r, g, b]: [number, number, number]): number {
    const a = [r, g, b].map((v) => {
        const s = v / 255;

        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * a[0]! + 0.7152 * a[1]! + 0.0722 * a[2]!;
}

export default function ContrastRatioChecker() {
    const [fg, setFg] = useState('#0E1624');
    const [bg, setBg] = useState('#2EC4A5');

    const ratio = useMemo(() => {
        const f = hexToRgb(fg);
        const b = hexToRgb(bg);

        if (!f || !b) {
            return null;
        }

        const l1 = luminance(f);
        const l2 = luminance(b);

        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }, [fg, bg]);

    const verdict = (min: number) => (ratio && ratio >= min ? 'PASS' : 'FAIL');

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div
                className="flex h-32 items-center justify-center border border-white/10"
                style={{ backgroundColor: bg, color: fg }}
            >
                <span className="text-xl font-bold">Sample Text 24px</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Foreground
                    </Label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={fg}
                            onChange={(e) => setFg(e.target.value)}
                            className="h-11 w-11 cursor-pointer border border-white/10 bg-transparent"
                        />
                        <Input
                            value={fg}
                            onChange={(e) => setFg(e.target.value)}
                            className="font-mono text-xs"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Background
                    </Label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={bg}
                            onChange={(e) => setBg(e.target.value)}
                            className="h-11 w-11 cursor-pointer border border-white/10 bg-transparent"
                        />
                        <Input
                            value={bg}
                            onChange={(e) => setBg(e.target.value)}
                            className="font-mono text-xs"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-surface-raised/60 flex items-center justify-between border border-white/5 p-5">
                <span className="font-mono text-xs text-white/50 uppercase">Contrast Ratio</span>
                <span className="text-3xl font-bold text-white">
                    {ratio ? ratio.toFixed(2) : '--'}:1
                </span>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-[11px]">
                {[
                    { label: 'AA Normal', min: 4.5 },
                    { label: 'AA Large', min: 3 },
                    { label: 'AAA Normal', min: 7 },
                ].map((t) => (
                    <div
                        key={t.label}
                        className={`border p-3 text-center ${
                            verdict(t.min) === 'PASS'
                                ? 'border-[#2EC4A5]/30 bg-[#2EC4A5]/5 text-[#2EC4A5]'
                                : 'border-red-500/30 bg-red-500/5 text-red-300'
                        }`}
                    >
                        <div className="text-white/60">{t.label}</div>
                        <div className="mt-1 text-sm font-bold">{verdict(t.min)}</div>
                    </div>
                ))}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Relative luminance, not perceived brightness, is what the WCAG ratio measures.
            </p>
        </div>
    );
}
