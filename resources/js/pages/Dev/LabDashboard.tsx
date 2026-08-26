import { AILab } from '@/components/lab/AILab';
import { BackgroundLab } from '@/components/lab/BackgroundLab';
import { CardLab } from '@/components/lab/CardLab';
import { CursorLab } from '@/components/lab/CursorLab';
import { HeroLab } from '@/components/lab/HeroLab';
import { IdeaVault } from '@/components/lab/IdeaVault';
import { PerformanceLab } from '@/components/lab/PerformanceLab';
import { ScrollStoryLab } from '@/components/lab/ScrollStoryLab';
import { SectionLab } from '@/components/lab/SectionLab';
import { SoundLab } from '@/components/lab/SoundLab';
import { TextLab } from '@/components/lab/TextLab';
import { ThreeJSLab } from '@/components/lab/ThreeJSLab';
import { SeoHead } from '@/components/seo/SeoHead';

import { Text } from '@/components/ui';
import { LabLayout } from '@/layouts/LabLayout';
import { useLabStore } from '@/store/useLabStore';

export default function LabDashboard() {
    const { activeCategory } = useLabStore();

    const renderActiveLab = () => {
        switch (activeCategory) {
            case 'dashboard':
                return (
                    <div className="mx-auto max-w-5xl space-y-8 p-8">
                        <div>
                            <Text variant="h2" className="text-white">
                                Experience Laboratory
                            </Text>
                            <Text variant="body" className="mt-2 max-w-2xl text-white/60">
                                Welcome to the OVOLL creative direction sandbox. This is an isolated
                                environment for prototyping heroes, storytelling sequences, and 3D
                                interactions before they reach production.
                            </Text>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Overview Cards */}
                            <div className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <Text variant="h6" className="mb-1 text-white">
                                    Active Experiments
                                </Text>
                                <Text variant="h3" className="text-white">
                                    12
                                </Text>
                            </div>

                            <div className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <Text variant="h6" className="mb-1 text-white">
                                    Production Ready
                                </Text>
                                <Text variant="h3" className="text-white">
                                    4
                                </Text>
                            </div>

                            <div className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                        />
                                    </svg>
                                </div>
                                <Text variant="h6" className="mb-1 text-white">
                                    Idea Vault
                                </Text>
                                <Text variant="h3" className="text-white">
                                    28
                                </Text>
                            </div>
                        </div>
                    </div>
                );
            case 'hero':
                return <HeroLab />;
            case 'scroll':
                return <ScrollStoryLab />;
            case 'threejs':
                return <ThreeJSLab />;
            case 'background':
                return <BackgroundLab />;
            case 'cursor':
                return <CursorLab />;
            case 'text':
                return <TextLab />;
            case 'card':
                return <CardLab />;
            case 'section':
                return <SectionLab />;
            case 'ai':
                return <AILab />;
            case 'sound':
                return <SoundLab />;
            case 'performance':
                return <PerformanceLab />;
            case 'vault':
                return <IdeaVault />;
            default:
                return null;
        }
    };

    return (
        <>
            <SeoHead title="OVOLL Experience Lab" />
            <LabLayout>{renderActiveLab()}</LabLayout>
        </>
    );
}
