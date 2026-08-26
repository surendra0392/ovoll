import { Copy, Check, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';

const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function uuidV4(): string {
    return crypto.randomUUID();
}

function ulid(): string {
    let time = Date.now();
    let ts = '';

    for (let i = 0; i < 10; i++) {
        ts = CROCKFORD[time % 32] + ts;
        time = Math.floor(time / 32);
    }

    let rand = '';
    const bytes = crypto.getRandomValues(new Uint8Array(16));

    for (let i = 0; i < 16; i++) {
        rand += CROCKFORD[bytes[i]! % 32]!;
    }

    return ts + rand;
}

export default function UuidUlidGenerator() {
    const [count, setCount] = useState(5);
    const [mode, setMode] = useState<'uuid' | 'ulid'>('ulid');
    const [values, setValues] = useState<string[]>(() => Array.from({ length: 5 }, () => ulid()));
    const [copied, setCopied] = useState<string | null>(null);

    const generate = () => {
        const gen = mode === 'uuid' ? uuidV4 : ulid;
        setValues(Array.from({ length: count }, () => gen()));
    };

    const copy = async (v: string) => {
        await navigator.clipboard.writeText(v);
        setCopied(v);
        setTimeout(() => setCopied(null), 1200);
    };

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div className="flex flex-wrap items-end gap-4">
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">Format</Label>
                    <div className="flex">
                        {(['ulid', 'uuid'] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`border px-4 py-2 font-mono text-xs uppercase transition-all ${
                                    mode === m
                                        ? 'border-[#2EC4A5] bg-[#2EC4A5]/10 text-white'
                                        : 'border-white/10 text-white/50 hover:text-white'
                                }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">Count</Label>
                    <input
                        type="range"
                        min={1}
                        max={20}
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-40 accent-[#2EC4A5]"
                    />
                    <span className="ml-2 font-mono text-xs text-white/60">{count}</span>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={generate}
                    leftIcon={<RefreshCw className="h-3 w-3" />}
                >
                    Generate
                </Button>
            </div>

            <div className="space-y-2">
                {values.map((v, i) => (
                    <button
                        key={i}
                        onClick={() => copy(v)}
                        className="group bg-surface-raised/60 flex w-full items-center justify-between border border-white/5 px-4 py-2.5 text-left font-mono text-xs text-white/70 transition-all hover:border-[#2EC4A5]/40"
                    >
                        <span className="truncate">{v}</span>
                        {copied === v ? (
                            <Check className="h-3.5 w-3.5 shrink-0 text-[#2EC4A5]" />
                        ) : (
                            <Copy className="h-3.5 w-3.5 shrink-0 text-white/30 group-hover:text-white/60" />
                        )}
                    </button>
                ))}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                ULIDs keep insert order, avoiding the index fragmentation random UUIDs cause. Click
                any value to copy.
            </p>
        </div>
    );
}
