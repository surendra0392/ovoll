import { Label } from '@/components/ui/Label';

const PATTERNS = [
    { name: 'Tap', pattern: [10], desc: 'Light confirmation' },
    { name: 'Success', pattern: [15, 40, 15], desc: 'Double pulse' },
    { name: 'Warning', pattern: [30, 30, 30], desc: 'Triple short' },
    { name: 'Error', pattern: [80, 40, 80], desc: 'Heavy buzz' },
];

export default function HapticFeedbackMapper() {
    const supported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

    const play = (pattern: number[]) => {
        if (supported) {
            navigator.vibrate(pattern);
        }
    };

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <Label className="text-xs tracking-wider text-white/70 uppercase">
                Interaction Haptics
            </Label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PATTERNS.map((p) => (
                    <button
                        key={p.name}
                        onClick={() => play(p.pattern)}
                        className="group bg-surface-raised/60 border border-white/10 p-4 text-left transition-all hover:border-[#2EC4A5]/40"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white group-hover:text-[#2EC4A5]">
                                {p.name}
                            </span>
                            <span className="font-mono text-[10px] text-white/40">
                                [{p.pattern.join(', ')}]
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-white/50">{p.desc}</p>
                        {/* pattern waveform */}
                        <div className="mt-3 flex h-6 items-end gap-1">
                            {p.pattern.map((ms, i) => (
                                <div
                                    key={i}
                                    className="w-3 bg-gradient-to-t from-[#2EC4A5] to-[#00D1FF]"
                                    style={{ height: `${Math.min(100, (ms / 80) * 100)}%` }}
                                />
                            ))}
                        </div>
                    </button>
                ))}
            </div>

            <div
                className={`border p-3 font-mono text-[11px] ${
                    supported
                        ? 'border-[#2EC4A5]/20 bg-[#2EC4A5]/5 text-[#2EC4A5]'
                        : 'border-yellow-500/20 bg-yellow-500/5 text-yellow-300'
                }`}
            >
                {supported
                    ? 'Vibration API supported — tap a pattern on a mobile device to feel it.'
                    : 'Vibration API not available in this browser (desktop). Patterns still preview visually.'}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Short, sparse pulses read as intentional; long buzzes read as a malfunction.
            </p>
        </div>
    );
}
