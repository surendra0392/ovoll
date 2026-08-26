import { useMemo } from 'react';

const DEPS = [
    { name: 'moment', gzip: 72 },
    { name: 'lodash (full)', gzip: 24 },
    { name: 'three', gzip: 155 },
    { name: 'react-dom', gzip: 42 },
    { name: 'framer-motion', gzip: 34 },
    { name: 'app code', gzip: 48 },
];

export default function BundleSizeAnalyzer() {
    const sorted = useMemo(() => [...DEPS].sort((a, b) => b.gzip - a.gzip), []);
    const total = sorted.reduce((s, d) => s + d.gzip, 0);
    const max = sorted[0]!.gzip;

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <div className="flex items-baseline justify-between border-b border-white/5 pb-3">
                <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">
                    Sample build treemap
                </span>
                <span className="font-mono text-sm text-white">{total} kB gzip</span>
            </div>

            <div className="space-y-2">
                {sorted.map((d) => {
                    const pct = Math.round((d.gzip / total) * 100);
                    const isOffender = d.gzip === max;

                    return (
                        <div key={d.name} className="space-y-1">
                            <div className="flex justify-between font-mono text-[11px]">
                                <span className={isOffender ? 'text-red-300' : 'text-white/70'}>
                                    {d.name}
                                    {isOffender && ' ← biggest offender'}
                                </span>
                                <span className="text-white/40">
                                    {d.gzip} kB · {pct}%
                                </span>
                            </div>
                            <div className="h-3 w-full bg-white/5">
                                <div
                                    className={`h-full ${isOffender ? 'bg-red-500/60' : 'bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]'}`}
                                    style={{ width: `${(d.gzip / max) * 100}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                A single mis-imported date or icon library often outweighs the entire app code.
            </p>
        </div>
    );
}
