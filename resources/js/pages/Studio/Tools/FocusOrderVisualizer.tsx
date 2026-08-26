import { useMemo, useState } from 'react';
import { Label } from '@/components/ui/Label';

interface Node {
    label: string;
    tabindex: number;
    domOrder: number;
}

const NODES: Node[] = [
    { label: 'Logo', tabindex: 0, domOrder: 1 },
    { label: 'Search', tabindex: 3, domOrder: 2 },
    { label: 'Menu', tabindex: 1, domOrder: 3 },
    { label: 'CTA', tabindex: 2, domOrder: 4 },
    { label: 'Footer link', tabindex: 0, domOrder: 5 },
];

// Positive tabindex jumps first (ascending), then tabindex 0 in DOM order.
function focusOrder(nodes: Node[]): Node[] {
    const positive = nodes.filter((n) => n.tabindex > 0).sort((a, b) => a.tabindex - b.tabindex);
    const natural = nodes.filter((n) => n.tabindex === 0).sort((a, b) => a.domOrder - b.domOrder);

    return [...positive, ...natural];
}

export default function FocusOrderVisualizer() {
    const [usePositive, setUsePositive] = useState(true);

    const nodes = useMemo(
        () => (usePositive ? NODES : NODES.map((n) => ({ ...n, tabindex: 0 }))),
        [usePositive],
    );
    const order = useMemo(() => focusOrder(nodes), [nodes]);
    const trapped = usePositive;

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <label className="flex cursor-pointer items-center gap-3">
                <input
                    type="checkbox"
                    checked={usePositive}
                    onChange={(e) => setUsePositive(e.target.checked)}
                    className="h-4 w-4 accent-[#2EC4A5]"
                />
                <span className="font-mono text-xs text-white/70">
                    Use positive tabindex values (anti-pattern)
                </span>
            </label>

            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Resulting tab sequence
                </Label>
                <div className="flex flex-wrap items-center gap-2">
                    {order.map((n, i) => (
                        <div key={n.label} className="flex items-center gap-2">
                            <div className="bg-surface-raised/60 flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[11px] text-white/70">
                                <span className="flex h-5 w-5 items-center justify-center bg-[#2EC4A5]/20 text-[10px] text-[#2EC4A5]">
                                    {i + 1}
                                </span>
                                {n.label}
                                {n.tabindex > 0 && (
                                    <span className="text-yellow-400">tabindex={n.tabindex}</span>
                                )}
                            </div>
                            {i < order.length - 1 && <span className="text-white/30">→</span>}
                        </div>
                    ))}
                </div>
            </div>

            <div
                className={`border p-3 font-mono text-[11px] ${
                    trapped
                        ? 'border-yellow-500/30 bg-yellow-500/5 text-yellow-300'
                        : 'border-[#2EC4A5]/30 bg-[#2EC4A5]/5 text-[#2EC4A5]'
                }`}
            >
                {trapped
                    ? 'Focus order does NOT match visual reading order — positive tabindex jumps ahead.'
                    : 'Focus order matches DOM/visual order. Clean.'}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Positive tabindex values are the usual culprit behind confusing focus sequences.
            </p>
        </div>
    );
}
