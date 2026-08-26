import React, { useState } from 'react';
import { Text } from '@/components/ui';
import { cn } from '@/utils';

export type ExperimentStage =
    | 'Idea'
    | 'Sketch'
    | 'Prototype'
    | 'Review'
    | 'Performance Test'
    | 'Accessibility Test'
    | 'Approval'
    | 'Production Ready';

const STAGES: ExperimentStage[] = [
    'Idea',
    'Sketch',
    'Prototype',
    'Review',
    'Performance Test',
    'Accessibility Test',
    'Approval',
    'Production Ready',
];

interface QualityControl {
    tellsStory: boolean;
    strengthensBrand: boolean;
    improvesUsability: boolean;
    isMemorable: boolean;
    scales: boolean;
    reusable: boolean;
}

interface ExperimentProps {
    id: string;
    title: string;
    stage: ExperimentStage;
    category: string;

    // Documentation
    purpose: string;
    story?: string;
    animationNotes?: string;
    technicalNotes?: string;
    performanceNotes?: string;
    accessibilityNotes?: string;
    futureImprovements?: string;

    // QC
    qc: QualityControl;

    children: React.ReactNode;
}

export function Experiment({
    title,
    stage,
    category,
    purpose,
    story,
    animationNotes,
    technicalNotes,
    performanceNotes,
    accessibilityNotes,
    futureImprovements,
    qc,
    children,
}: ExperimentProps) {
    const [showDocs, setShowDocs] = useState(false);
    const currentStageIndex = STAGES.indexOf(stage);

    return (
        <div className="mb-12 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]">
            {/* Experiment Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-4">
                    <div className="rounded bg-white/10 px-2 py-1 font-mono text-xs tracking-wider text-white/70 uppercase">
                        {category}
                    </div>
                    <Text variant="h6" className="m-0 leading-none text-white">
                        {title}
                    </Text>
                </div>

                <button
                    onClick={() => setShowDocs(!showDocs)}
                    className={cn(
                        'rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors',
                        showDocs
                            ? 'text-surface-raised border-white bg-white'
                            : 'border-white/20 bg-transparent text-white hover:bg-white/10',
                    )}
                >
                    {showDocs ? 'Hide Details' : 'View Details'}
                </button>
            </div>

            {/* Stage Tracker */}
            <div className="custom-scrollbar overflow-x-auto border-b border-white/10 px-6 py-4">
                <div className="flex min-w-max items-center gap-2">
                    {STAGES.map((s, idx) => {
                        const isPast = idx < currentStageIndex;
                        const isCurrent = idx === currentStageIndex;

                        return (
                            <React.Fragment key={s}>
                                <div
                                    className={cn(
                                        'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                                        isCurrent
                                            ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                            : isPast
                                              ? 'border-white/20 bg-white/10 text-white'
                                              : 'border-white/10 bg-transparent text-white/30',
                                    )}
                                >
                                    {isPast && (
                                        <svg
                                            className="h-3 w-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                    {isCurrent && (
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                                    )}
                                    {s}
                                </div>
                                {idx !== STAGES.length - 1 && (
                                    <div
                                        className={cn(
                                            'h-px w-6',
                                            isPast ? 'bg-white/20' : 'bg-white/5',
                                        )}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Documentation Panel (Expandable) */}
            {showDocs && (
                <div className="grid grid-cols-1 gap-0 border-b border-white/10 lg:grid-cols-3">
                    <div className="space-y-6 border-r border-white/10 p-6 lg:col-span-2">
                        <div>
                            <Text
                                variant="caption"
                                className="mb-2 block font-bold tracking-widest text-white/40 uppercase"
                            >
                                Purpose
                            </Text>
                            <Text variant="body" className="text-white/80">
                                {purpose}
                            </Text>
                        </div>
                        {story && (
                            <div>
                                <Text
                                    variant="caption"
                                    className="mb-2 block font-bold tracking-widest text-white/40 uppercase"
                                >
                                    Storytelling Approach
                                </Text>
                                <Text variant="body" className="text-white/80">
                                    {story}
                                </Text>
                            </div>
                        )}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {animationNotes && (
                                <div>
                                    <Text
                                        variant="caption"
                                        className="mb-2 block font-bold tracking-widest text-white/40 uppercase"
                                    >
                                        Animation
                                    </Text>
                                    <Text variant="body" className="text-sm text-white/80">
                                        {animationNotes}
                                    </Text>
                                </div>
                            )}
                            {technicalNotes && (
                                <div>
                                    <Text
                                        variant="caption"
                                        className="mb-2 block font-bold tracking-widest text-white/40 uppercase"
                                    >
                                        Technical Specs
                                    </Text>
                                    <Text variant="body" className="text-sm text-white/80">
                                        {technicalNotes}
                                    </Text>
                                </div>
                            )}
                            {performanceNotes && (
                                <div>
                                    <Text
                                        variant="caption"
                                        className="mb-2 block font-bold tracking-widest text-white/40 uppercase"
                                    >
                                        Performance
                                    </Text>
                                    <Text variant="body" className="text-sm text-emerald-400">
                                        {performanceNotes}
                                    </Text>
                                </div>
                            )}
                            {accessibilityNotes && (
                                <div>
                                    <Text
                                        variant="caption"
                                        className="mb-2 block font-bold tracking-widest text-white/40 uppercase"
                                    >
                                        Accessibility
                                    </Text>
                                    <Text variant="body" className="text-sm text-amber-400">
                                        {accessibilityNotes}
                                    </Text>
                                </div>
                            )}
                            {futureImprovements && (
                                <div className="md:col-span-2">
                                    <Text
                                        variant="caption"
                                        className="mb-2 block font-bold tracking-widest text-white/40 uppercase"
                                    >
                                        Future Improvements
                                    </Text>
                                    <Text variant="body" className="text-sm text-blue-400">
                                        {futureImprovements}
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* QC Checklist */}
                    <div className="bg-white/[0.01] p-6">
                        <Text
                            variant="caption"
                            className="mb-4 block font-bold tracking-widest text-white/40 uppercase"
                        >
                            Quality Control
                        </Text>
                        <div className="space-y-3">
                            <QCItem checked={qc.tellsStory} label="Does it tell a story?" />
                            <QCItem checked={qc.strengthensBrand} label="Strengthens brand?" />
                            <QCItem checked={qc.improvesUsability} label="Improves usability?" />
                            <QCItem checked={qc.isMemorable} label="Is it memorable?" />
                            <QCItem checked={qc.scales} label="Can it scale?" />
                            <QCItem checked={qc.reusable} label="Can it become reusable?" />
                        </div>
                    </div>
                </div>
            )}

            {/* The Actual Prototype Canvas */}
            <div className="bg-surface-raised relative min-h-[500px] w-full overflow-hidden">
                {children}
            </div>
        </div>
    );
}

function QCItem({ checked, label }: { checked: boolean; label: string }) {
    return (
        <div className="flex items-center gap-3">
            <div
                className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded',
                    checked
                        ? 'border border-emerald-500/50 bg-emerald-500/20 text-emerald-400'
                        : 'border border-white/10 bg-white/5 text-transparent',
                )}
            >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <Text
                variant="body"
                className={cn('text-sm', checked ? 'text-white' : 'text-white/40')}
            >
                {label}
            </Text>
        </div>
    );
}
