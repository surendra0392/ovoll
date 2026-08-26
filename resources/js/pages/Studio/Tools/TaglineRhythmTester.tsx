import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

function countSyllables(word: string): number {
    const w = word.toLowerCase().replace(/[^a-z]/g, '');

    if (!w) {
        return 0;
    }

    const groups = w.match(/[aeiouy]+/g);
    let n = groups ? groups.length : 1;

    if (w.endsWith('e') && n > 1) {
        n--;
    }

    return Math.max(1, n);
}

export default function TaglineRhythmTester() {
    const [tagline, setTagline] = useState('Build something unforgettable together');

    const analysis = useMemo(() => {
        const words = tagline.trim().split(/\s+/).filter(Boolean);
        const syllables = words.map(countSyllables);
        const totalSyll = syllables.reduce((a, b) => a + b, 0);
        const charLen = tagline.trim().length;

        let score = 100;

        if (charLen > 40) {
            score -= (charLen - 40) * 1.5;
        }

        if (words.length > 6) {
            score -= (words.length - 6) * 8;
        }

        if (totalSyll > 12) {
            score -= (totalSyll - 12) * 4;
        }

        score = Math.max(0, Math.min(100, Math.round(score)));

        return { words, syllables, totalSyll, charLen, score };
    }, [tagline]);

    const scoreColor =
        analysis.score >= 70 ? '#2EC4A5' : analysis.score >= 40 ? '#eab308' : '#ef4444';

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">Tagline</Label>
                <Input value={tagline} onChange={(e) => setTagline(e.target.value)} size="lg" />
            </div>

            <div className="bg-surface-raised/60 flex items-center justify-between border border-white/5 p-5">
                <span className="font-mono text-xs text-white/50 uppercase">Rhythm Score</span>
                <span className="text-3xl font-bold" style={{ color: scoreColor }}>
                    {analysis.score}
                </span>
            </div>

            <div className="flex flex-wrap gap-2">
                {analysis.words.map((w, i) => (
                    <span
                        key={i}
                        className="border border-white/10 bg-[#0E1624]/40 px-3 py-1.5 font-mono text-[11px] text-white/70"
                    >
                        {w}
                        <span className="ml-1.5 text-[#00D1FF]">{analysis.syllables[i]}σ</span>
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-[11px] text-white/60">
                <div className="border border-white/5 p-3 text-center">
                    <div className="text-white/40">Words</div>
                    <div className="text-lg text-white">{analysis.words.length}</div>
                </div>
                <div className="border border-white/5 p-3 text-center">
                    <div className="text-white/40">Syllables</div>
                    <div className="text-lg text-white">{analysis.totalSyll}</div>
                </div>
                <div className="border border-white/5 p-3 text-center">
                    <div className="text-white/40">Characters</div>
                    <div className="text-lg text-white">{analysis.charLen}</div>
                </div>
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Short, rhythmic lines that resolve on a stressed syllable read as more quotable.
            </p>
        </div>
    );
}
