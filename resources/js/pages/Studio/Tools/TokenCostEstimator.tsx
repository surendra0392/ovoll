import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

const MODELS = [
    { name: 'GPT-4o', in: 2.5, out: 10 },
    { name: 'GPT-4o mini', in: 0.15, out: 0.6 },
    { name: 'Claude Sonnet', in: 3, out: 15 },
    { name: 'Claude Haiku', in: 0.8, out: 4 },
];

// ~4 chars per token
const estTokens = (chars: number) => Math.ceil(chars / 4);

export default function TokenCostEstimator() {
    const [promptChars, setPromptChars] = useState(1200);
    const [outputChars, setOutputChars] = useState(600);
    const [callsPerDay, setCallsPerDay] = useState(1000);

    const rows = useMemo(() => {
        const inTok = estTokens(promptChars);
        const outTok = estTokens(outputChars);

        return MODELS.map((m) => {
            const perCall = (inTok / 1_000_000) * m.in + (outTok / 1_000_000) * m.out;

            return { name: m.name, perCall, monthly: perCall * callsPerDay * 30 };
        });
    }, [promptChars, outputChars, callsPerDay]);

    const money = (v: number) =>
        v < 0.01
            ? `$${v.toFixed(5)}`
            : `$${v.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Prompt chars
                    </Label>
                    <Input
                        type="number"
                        value={promptChars}
                        onChange={(e) => setPromptChars(Number(e.target.value))}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Output chars
                    </Label>
                    <Input
                        type="number"
                        value={outputChars}
                        onChange={(e) => setOutputChars(Number(e.target.value))}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Calls / day
                    </Label>
                    <Input
                        type="number"
                        value={callsPerDay}
                        onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="border border-white/5">
                <div className="bg-surface-raised/60 grid grid-cols-3 border-b border-white/5 px-4 py-2 font-mono text-[10px] tracking-wider text-white/50 uppercase">
                    <span>Model</span>
                    <span className="text-right">Per Call</span>
                    <span className="text-right">Monthly</span>
                </div>
                {rows.map((r) => (
                    <div
                        key={r.name}
                        className="grid grid-cols-3 px-4 py-2.5 font-mono text-xs text-white/70"
                    >
                        <span>{r.name}</span>
                        <span className="text-right text-white/50">{money(r.perCall)}</span>
                        <span className="text-right text-[#2EC4A5]">{money(r.monthly)}</span>
                    </div>
                ))}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Output tokens usually dominate cost — trimming completion length beats trimming the
                prompt. Estimated at ~4 chars/token.
            </p>
        </div>
    );
}
