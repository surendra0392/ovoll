import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

export default function RegexTester() {
    const [pattern, setPattern] = useState('(?<year>\\d{4})-(?<month>\\d{2})');
    const [flags, setFlags] = useState('g');
    const [text, setText] = useState('Releases: 2024-01, 2024-06 and 2025-11 are planned.');

    const result = useMemo(() => {
        try {
            const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
            const matches = [...text.matchAll(re)];

            return { matches, error: null as string | null };
        } catch (e) {
            return { matches: [], error: (e as Error).message };
        }
    }, [pattern, flags, text]);

    const highlighted = useMemo(() => {
        if (result.error || result.matches.length === 0) {
            return null;
        }

        const parts: React.ReactNode[] = [];
        let last = 0;
        result.matches.forEach((m, i) => {
            const start = m.index ?? 0;
            parts.push(<span key={`t${i}`}>{text.slice(last, start)}</span>);
            parts.push(
                <mark key={`m${i}`} className="bg-[#2EC4A5]/30 text-white">
                    {m[0]}
                </mark>,
            );
            last = start + m[0].length;
        });
        parts.push(<span key="end">{text.slice(last)}</span>);

        return parts;
    }, [result, text]);

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <div className="flex gap-3">
                <div className="flex-1 space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Pattern
                    </Label>
                    <Input
                        value={pattern}
                        onChange={(e) => setPattern(e.target.value)}
                        hasError={!!result.error}
                        className="font-mono text-xs"
                    />
                </div>
                <div className="w-24 space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">Flags</Label>
                    <Input
                        value={flags}
                        onChange={(e) => setFlags(e.target.value)}
                        className="font-mono text-xs"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Test String
                </Label>
                <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} />
            </div>

            {result.error ? (
                <div className="border border-red-500/20 bg-red-500/5 p-3 font-mono text-xs text-red-300">
                    {result.error}
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="bg-surface-raised/60 border border-white/5 p-4 text-sm leading-relaxed break-words text-white/70">
                        {highlighted ?? <span className="text-white/30">No matches</span>}
                    </div>
                    <div className="font-mono text-[11px] text-white/50">
                        {result.matches.length} match{result.matches.length === 1 ? '' : 'es'}
                    </div>
                    {result.matches.map((m, i) =>
                        m.groups ? (
                            <div
                                key={i}
                                className="border border-white/5 bg-[#0E1624]/40 p-3 font-mono text-[11px] text-white/60"
                            >
                                <span className="text-[#00D1FF]">Match {i + 1} groups:</span>{' '}
                                {Object.entries(m.groups).map(([k, v]) => (
                                    <span key={k} className="mr-3">
                                        {k}=<span className="text-[#2EC4A5]">{String(v)}</span>
                                    </span>
                                ))}
                            </div>
                        ) : null,
                    )}
                </div>
            )}
            <p className="font-mono text-[10px] text-white/40">
                Named capture groups (?&lt;name&gt;...) make patterns readable long after you write
                them.
            </p>
        </div>
    );
}
