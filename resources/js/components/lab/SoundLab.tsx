import { Text } from '@/components/ui';
import { useSound } from '@/hooks/useSound';
import { Experiment } from './Experiment';

export function SoundLab() {
    const { play } = useSound();

    return (
        <div className="mx-auto max-w-7xl space-y-12 p-8">
            <Experiment
                id="snd-001"
                title="Procedural UI Audio Engine"
                category="Sound Lab"
                stage="Prototype"
                purpose="Generate synthetic, brand-aligned interaction sounds using the Web Audio API without relying on external asset files."
                technicalNotes="Uses Oscillators (sine, triangle, square) and AudioBuffers (noise) routed through gain envelopes and biquad filters."
                performanceNotes="Zero network requests. Instantly available. Extremely low memory footprint."
                accessibilityNotes="Should be globally toggleable via a user preference or 'Reduced Motion' media query."
                qc={{
                    tellsStory: false,
                    strengthensBrand: true,
                    improvesUsability: true,
                    isMemorable: true,
                    scales: true,
                    reusable: true,
                }}
            >
                <div className="flex min-h-[400px] flex-col items-center justify-center bg-[#050505] p-12">
                    <Text variant="h3" className="mb-8 text-white">
                        Interaction Audio Matrix
                    </Text>

                    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Hover Sound */}
                        <button
                            onMouseEnter={() => play('hover')}
                            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors hover:bg-white/10"
                        >
                            <div className="absolute inset-0 translate-y-[100%] bg-blue-500/10 transition-transform duration-300 ease-out group-hover:translate-y-0" />
                            <div className="relative z-10">
                                <Text variant="h6" className="mb-1 text-white">
                                    Hover (Subtle Tick)
                                </Text>
                                <Text variant="body" className="text-sm text-white/50">
                                    Sine wave · Fast attack · 400Hz
                                </Text>
                            </div>
                        </button>

                        {/* Click Sound */}
                        <button
                            onMouseDown={() => play('click')}
                            className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors active:bg-white/10"
                        >
                            <Text variant="h6" className="mb-1 text-white">
                                Click (Snappy Pop)
                            </Text>
                            <Text variant="body" className="text-sm text-white/50">
                                Triangle wave · Pitch drop
                            </Text>
                        </button>

                        {/* Tech/Action Sound */}
                        <button
                            onClick={() => play('tech')}
                            className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-left transition-colors hover:bg-emerald-500/10"
                        >
                            <Text variant="h6" className="mb-1 text-emerald-400">
                                Action (Tech Chirp)
                            </Text>
                            <Text variant="body" className="text-sm text-emerald-400/50">
                                Square wave · Lowpass sweep
                            </Text>
                        </button>

                        {/* Success Sound */}
                        <button
                            onClick={() => play('success')}
                            className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6 text-left transition-colors hover:bg-purple-500/10"
                        >
                            <Text variant="h6" className="mb-1 text-purple-400">
                                Success (Two-Tone Bell)
                            </Text>
                            <Text variant="body" className="text-sm text-purple-400/50">
                                Sine wave · Twin pitch intervals
                            </Text>
                        </button>

                        {/* Transition/Woosh */}
                        <button
                            onMouseEnter={() => play('woosh', { volume: 0.05 })}
                            className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center transition-colors hover:bg-white/10 md:col-span-2"
                        >
                            <Text variant="h6" className="mb-1 text-white">
                                Transition (Woosh)
                            </Text>
                            <Text variant="body" className="text-sm text-white/50">
                                White noise buffer · Bandpass sweep · 500ms
                            </Text>
                        </button>
                    </div>
                </div>
            </Experiment>
        </div>
    );
}
