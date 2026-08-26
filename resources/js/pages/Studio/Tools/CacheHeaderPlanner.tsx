import { useState } from 'react';
import { Label } from '@/components/ui/Label';

const ASSET_CLASSES = [
    {
        id: 'hashed',
        label: 'Hashed asset (app.a1b2.js)',
        header: 'public, max-age=31536000, immutable',
    },
    {
        id: 'image',
        label: 'Image / font',
        header: 'public, max-age=604800, stale-while-revalidate=86400',
    },
    { id: 'html', label: 'HTML document', header: 'no-cache' },
    { id: 'api', label: 'API JSON response', header: 'private, max-age=0, must-revalidate' },
];

export default function CacheHeaderPlanner() {
    const [selected, setSelected] = useState(ASSET_CLASSES[0]!.id);
    const current = ASSET_CLASSES.find((a) => a.id === selected)!;

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Asset Class
                </Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {ASSET_CLASSES.map((a) => (
                        <button
                            key={a.id}
                            onClick={() => setSelected(a.id)}
                            className={`border px-4 py-2.5 text-left font-mono text-[11px] transition-all ${
                                selected === a.id
                                    ? 'border-[#2EC4A5] bg-[#2EC4A5]/10 text-white'
                                    : 'border-white/10 text-white/50 hover:text-white'
                            }`}
                        >
                            {a.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-widest text-[#00D1FF] uppercase">
                    Recommended header
                </span>
                <pre className="bg-surface-raised/60 overflow-x-auto border border-white/5 p-4 font-mono text-[12px] text-[#2EC4A5]">
                    Cache-Control: {current.header}
                </pre>
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Immutable hashed assets can cache forever; HTML almost never should.
            </p>
        </div>
    );
}
