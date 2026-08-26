import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

// Lightweight bag-of-words cosine similarity (no real embeddings, but honest math).
function tokenize(s: string): Map<string, number> {
    const map = new Map<string, number>();
    s.toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean)
        .forEach((w) => map.set(w, (map.get(w) || 0) + 1));

    return map;
}

function cosine(a: Map<string, number>, b: Map<string, number>): number {
    let dot = 0;
    let magA = 0;
    let magB = 0;
    a.forEach((v, k) => {
        dot += v * (b.get(k) || 0);
        magA += v * v;
    });
    b.forEach((v) => {
        magB += v * v;
    });

    if (magA === 0 || magB === 0) {
        return 0;
    }

    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export default function EmbeddingSimilarityExplorer() {
    const [query, setQuery] = useState('fast database queries');
    const [threshold, setThreshold] = useState(0.3);
    const [docs] = useState([
        'Optimizing slow SQL database queries with indexes',
        'A recipe for chocolate chip cookies',
        'Speeding up query performance in Postgres',
        'How to train a golden retriever puppy',
    ]);

    const scored = useMemo(() => {
        const q = tokenize(query);

        return docs
            .map((d) => ({ text: d, score: cosine(q, tokenize(d)) }))
            .sort((a, b) => b.score - a.score);
    }, [query, docs]);

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">Query</Label>
                <Input value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Match threshold: {threshold.toFixed(2)}
                </Label>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full accent-[#2EC4A5]"
                />
            </div>

            <div className="space-y-2">
                {scored.map((s, i) => {
                    const pass = s.score >= threshold;

                    return (
                        <div
                            key={i}
                            className={`flex items-center justify-between border p-3 text-xs ${
                                pass
                                    ? 'border-[#2EC4A5]/30 bg-[#2EC4A5]/5 text-white'
                                    : 'bg-surface-raised/40 border-white/5 text-white/40'
                            }`}
                        >
                            <span className="pr-3">{s.text}</span>
                            <span className="shrink-0 font-mono">{s.score.toFixed(2)}</span>
                        </div>
                    );
                })}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                The right cutoff is corpus-specific; a fixed default silently drops valid matches.
                (Demo uses bag-of-words cosine.)
            </p>
        </div>
    );
}
