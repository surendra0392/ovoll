import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';

const PALETTE = ['#2EC4A5', '#00D1FF', '#a855f7', '#ec4899', '#eab308', '#3b82f6'];

interface Point {
    x: number;
    y: number;
    color: string;
}

function randomPoints(): Point[] {
    return Array.from({ length: 4 }, () => ({
        x: Math.round(Math.random() * 100),
        y: Math.round(Math.random() * 100),
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)]!,
    }));
}

export default function MeshGradientWeaver() {
    const [points, setPoints] = useState<Point[]>(randomPoints);

    const css = useMemo(
        () =>
            points
                .map((p) => `radial-gradient(at ${p.x}% ${p.y}%, ${p.color} 0px, transparent 55%)`)
                .join(', '),
        [points],
    );

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <div
                className="h-56 w-full border border-white/10"
                style={{ backgroundColor: 'var(--color-surface-raised)', backgroundImage: css }}
            />

            <Button variant="secondary" size="sm" onClick={() => setPoints(randomPoints())}>
                Weave new gradient
            </Button>

            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Exportable CSS
                </Label>
                <pre className="bg-surface-raised/60 overflow-x-auto border border-white/5 p-4 font-mono text-[10px] whitespace-pre-wrap text-white/60">
                    background-image: {css};
                </pre>
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Shader/CSS-driven gradients stay crisp at any resolution where exported PNGs band.
            </p>
        </div>
    );
}
