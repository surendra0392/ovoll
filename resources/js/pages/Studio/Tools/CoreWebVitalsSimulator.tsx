import { useMemo, useState } from 'react';
import { Label } from '@/components/ui/Label';

const THRESHOLDS = {
    lcp: { good: 2.5, poor: 4 },
    cls: { good: 0.1, poor: 0.25 },
    inp: { good: 200, poor: 500 },
};

function rate(value: number, t: { good: number; poor: number }) {
    if (value <= t.good) {
        return { label: 'Good', color: '#2EC4A5' };
    }

    if (value <= t.poor) {
        return { label: 'Needs work', color: '#eab308' };
    }

    return { label: 'Poor', color: '#ef4444' };
}

export default function CoreWebVitalsSimulator() {
    const [lcp, setLcp] = useState(2.8);
    const [cls, setCls] = useState(0.08);
    const [inp, setInp] = useState(180);

    const metrics = useMemo(
        () => [
            {
                key: 'LCP',
                value: lcp,
                unit: 's',
                set: setLcp,
                min: 0.5,
                max: 6,
                step: 0.1,
                t: THRESHOLDS.lcp,
            },
            {
                key: 'CLS',
                value: cls,
                unit: '',
                set: setCls,
                min: 0,
                max: 0.5,
                step: 0.01,
                t: THRESHOLDS.cls,
            },
            {
                key: 'INP',
                value: inp,
                unit: 'ms',
                set: setInp,
                min: 50,
                max: 800,
                step: 10,
                t: THRESHOLDS.inp,
            },
        ],
        [lcp, cls, inp],
    );

    const allGood = metrics.every((m) => rate(m.value, m.t).label === 'Good');

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div
                className="flex items-center justify-between border p-4 font-mono text-sm"
                style={{
                    borderColor: allGood ? '#2EC4A5' : '#eab308',
                    color: allGood ? '#2EC4A5' : '#eab308',
                    background: allGood ? 'rgba(46,196,165,0.05)' : 'rgba(234,179,8,0.05)',
                }}
            >
                <span className="uppercase">Field verdict (75th percentile)</span>
                <span className="font-bold">{allGood ? 'PASS' : 'FAIL'}</span>
            </div>

            {metrics.map((m) => {
                const r = rate(m.value, m.t);

                return (
                    <div key={m.key} className="space-y-2">
                        <div className="flex justify-between">
                            <Label className="text-xs tracking-wider text-white/70 uppercase">
                                {m.key}: {m.value}
                                {m.unit}
                            </Label>
                            <span className="font-mono text-[11px]" style={{ color: r.color }}>
                                {r.label}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={m.min}
                            max={m.max}
                            step={m.step}
                            value={m.value}
                            onChange={(e) => m.set(Number(e.target.value))}
                            className="w-full"
                            style={{ accentColor: r.color }}
                        />
                    </div>
                );
            })}
            <p className="font-mono text-[10px] text-white/40">
                The 75th percentile means tail devices, not the median, decide whether you pass.
            </p>
        </div>
    );
}
