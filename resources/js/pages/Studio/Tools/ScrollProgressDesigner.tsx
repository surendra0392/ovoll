import { useRef, useState } from 'react';
import { Label } from '@/components/ui/Label';

export default function ScrollProgressDesigner() {
    const [progress, setProgress] = useState(0);
    const [threshold, setThreshold] = useState(0.2);
    const scrollRef = useRef<HTMLDivElement>(null);

    const onScroll = () => {
        const el = scrollRef.current;

        if (!el) {
            return;
        }

        const max = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? el.scrollTop / max : 0);
    };

    const blocks = Array.from({ length: 6 });

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            {/* progress bar */}
            <div className="h-1.5 w-full bg-white/5">
                <div
                    className="h-full bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] transition-[width] duration-75"
                    style={{ width: `${progress * 100}%` }}
                />
            </div>
            <div className="font-mono text-[11px] text-white/50">
                Scroll progress: {(progress * 100).toFixed(0)}%
            </div>

            <div
                ref={scrollRef}
                onScroll={onScroll}
                className="bg-surface-raised/40 h-56 space-y-4 overflow-y-auto border border-white/10 p-4"
            >
                {blocks.map((_, i) => {
                    const blockProgress = (i + 1) / blocks.length;
                    const revealed = progress + threshold >= blockProgress - 1 / blocks.length;

                    return (
                        <div
                            key={i}
                            className={`flex h-24 items-center justify-center border font-mono text-xs transition-all duration-300 ${
                                revealed
                                    ? 'border-[#2EC4A5]/30 bg-[#2EC4A5]/5 text-white opacity-100'
                                    : 'border-white/5 text-white/30 opacity-40'
                            }`}
                        >
                            Section {i + 1} {revealed ? '· revealed' : ''}
                        </div>
                    );
                })}
            </div>

            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Reveal offset: {threshold.toFixed(2)}
                </Label>
                <input
                    type="range"
                    min={0}
                    max={0.5}
                    step={0.05}
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full accent-[#2EC4A5]"
                />
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Firing reveals slightly before the viewport edge feels more responsive than dead-on.
            </p>
        </div>
    );
}
