import React, { useState } from 'react';
import { SeoHead } from '@/components/seo/SeoHead';
import { Text } from '@/components/ui';
import {
    Aurora,
    GridPerspective,
    AmbientGlow,
    GlassPanel,
    TracingBorder,
    ShimmerText,
    ScrambleText,
    SVGMorph,
    OrbitalRingsScene,
    GlassCrystalScene,
} from '@/components/vfx';
import { PlaygroundLayout } from '@/layouts/PlaygroundLayout';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';

const demoPath1 = 'M12 2L2 22h20L12 2z'; // Triangle
const demoPath2 = 'M12 2a10 10 0 100 20 10 10 0 000-20z'; // Circle
const demoPath3 = 'M2 2h20v20H2z'; // Square

export default function EffectsPlayground() {
    const { activeLab, setActiveLab } = usePlaygroundStore();

    // Global VFX controls for the playground
    const [intensity, setIntensity] = useState(1);
    const [speed, setSpeed] = useState(1);
    const [paused, setPaused] = useState(false);

    React.useEffect(() => {
        if (!activeLab || !activeLab.startsWith('vfx-')) {
            setActiveLab('vfx-backgrounds');
        }
    }, [activeLab, setActiveLab]);

    const Controls = () => (
        <div className="bg-card/80 border-border absolute top-4 right-4 z-50 flex gap-4 rounded-xl border p-4 backdrop-blur-md">
            <div className="flex flex-col gap-1">
                <Text variant="caption">Intensity</Text>
                <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={intensity}
                    onChange={(e) => setIntensity(parseFloat(e.target.value))}
                    className="w-24"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Text variant="caption">Speed</Text>
                <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-24"
                />
            </div>
            <div className="mt-4 flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={paused}
                    onChange={(e) => setPaused(e.target.checked)}
                    id="paused"
                />
                <label htmlFor="paused">
                    <Text variant="caption">Paused</Text>
                </label>
            </div>
        </div>
    );

    const renderLab = () => {
        switch (activeLab) {
            case 'vfx-backgrounds':
                return (
                    <div className="border-border bg-surface-raised relative flex h-full min-h-[600px] w-full flex-col items-center justify-center gap-12 overflow-hidden rounded-xl border">
                        <Controls />
                        <div className="relative h-64 w-3/4 overflow-hidden rounded-xl border border-white/20">
                            <Aurora intensity={intensity} speed={speed} paused={paused} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Text variant="h3" className="text-white mix-blend-overlay">
                                    Aurora
                                </Text>
                            </div>
                        </div>
                        <div className="bg-surface-raised relative h-64 w-3/4 overflow-hidden rounded-xl border border-white/20">
                            <GridPerspective intensity={intensity} speed={speed} paused={paused} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Text
                                    variant="h3"
                                    className="bg-surface-raised/50 rounded-xl px-4 py-2 text-white"
                                >
                                    Grid Perspective
                                </Text>
                            </div>
                        </div>
                        <div className="bg-surface-raised relative h-64 w-3/4 overflow-hidden rounded-xl border border-white/20">
                            <AmbientGlow
                                intensity={intensity}
                                speed={speed}
                                paused={paused}
                                color="#00ffcc"
                                radius={200}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Text variant="h3" className="text-white">
                                    Ambient Glow
                                </Text>
                            </div>
                        </div>
                    </div>
                );
            case 'vfx-materials':
                return (
                    <div className="border-border bg-surface-raised relative flex h-full min-h-[600px] w-full flex-col items-center justify-center gap-12 overflow-hidden rounded-xl border">
                        <Aurora opacity={0.3} />
                        <Controls />
                        <GlassPanel
                            blur={12 * intensity}
                            className="flex w-96 flex-col gap-4 rounded-2xl p-8"
                        >
                            <Text variant="h4" className="text-white">
                                Glass Panel
                            </Text>
                            <Text variant="body" className="text-white/70">
                                Highly realistic glass with frost, noise, and specular highlights.
                            </Text>
                        </GlassPanel>

                        <TracingBorder
                            borderWidth={2}
                            color="#00ffcc"
                            speed={speed}
                            paused={paused}
                            className="bg-surface-raised/50 w-96 rounded-2xl p-8 backdrop-blur-md"
                        >
                            <Text variant="h4" className="text-white">
                                Tracing Border
                            </Text>
                            <Text variant="body" className="text-white/70">
                                Animated SVG stroke around elements on hover.
                            </Text>
                        </TracingBorder>
                    </div>
                );
            case 'vfx-text':
                return (
                    <div className="border-border bg-surface-raised relative flex h-full min-h-[600px] w-full flex-col items-center justify-center gap-12 overflow-hidden rounded-xl border">
                        <Controls />
                        <ShimmerText
                            speed={speed}
                            paused={paused}
                            color="#ffffff"
                            className="text-6xl font-bold text-white/20"
                        >
                            Shimmering Text Effect
                        </ShimmerText>

                        <div className="flex flex-col items-center gap-2">
                            <Text variant="caption" className="text-white/50">
                                Hover the text below
                            </Text>
                            <ScrambleText
                                text="HOVER TO SCRAMBLE ME"
                                speed={speed}
                                paused={paused}
                                trigger="hover"
                                color="#00ffcc"
                                className="cursor-pointer font-mono text-4xl"
                            />
                        </div>
                    </div>
                );
            case 'vfx-svg':
                return (
                    <div className="border-border bg-surface-raised relative flex h-full min-h-[600px] w-full flex-col items-center justify-center gap-12 overflow-hidden rounded-xl border">
                        <Controls />
                        <div className="flex flex-col items-center gap-4">
                            <Text variant="h4" className="text-white">
                                SVG Morphing (Auto)
                            </Text>
                            <SVGMorph
                                paths={[demoPath1, demoPath2, demoPath3]}
                                speed={speed}
                                paused={paused}
                                width={100}
                                height={100}
                                color="#00ffcc"
                                strokeWidth={1}
                            />
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <Text variant="h4" className="text-white">
                                SVG Morphing (Hover)
                            </Text>
                            <SVGMorph
                                paths={[demoPath1, demoPath2]}
                                trigger="hover"
                                speed={speed}
                                paused={paused}
                                width={100}
                                height={100}
                                color="#ff00cc"
                                strokeWidth={1}
                            />
                        </div>
                    </div>
                );
            case 'vfx-3d':
                return (
                    <div className="border-border bg-surface-raised relative flex h-full min-h-[600px] w-full flex-col items-center gap-12 overflow-hidden rounded-xl border">
                        <Controls />

                        <div className="relative h-96 w-full border-b border-white/10">
                            <div className="absolute top-4 left-4 z-10">
                                <Text variant="h4" className="text-white">
                                    Orbital Rings
                                </Text>
                            </div>
                            <OrbitalRingsScene
                                speed={speed}
                                color="#00aaff"
                                className="h-full w-full"
                            />
                        </div>

                        <div className="relative h-96 w-full">
                            <div className="absolute top-4 left-4 z-10">
                                <Text variant="h4" className="text-white">
                                    Glass Crystal (Hoverable)
                                </Text>
                            </div>
                            <GlassCrystalScene speed={speed} className="h-full w-full" />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <SeoHead title="VFX Showcase" />
            <PlaygroundLayout>
                <div className="mx-auto h-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {renderLab()}
                </div>
            </PlaygroundLayout>
        </>
    );
}
