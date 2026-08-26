import React, { lazy, Suspense } from 'react';

/**
 * Dynamic tool component registry.
 * Each tool is lazy-loaded so the initial bundle stays minimal.
 * To add a new tool, add a single entry here — that's it.
 */
const registry: Record<string, React.LazyExoticComponent<React.ComponentType<unknown>>> = {
    // Design Systems
    ColorPaletteGenerator: lazy(() => import('@/pages/Studio/Tools/ColorPaletteGenerator')),
    GradientGenerator: lazy(() => import('@/pages/Studio/Tools/GradientGenerator')),
    BorderRadiusHarmonizer: lazy(() => import('@/pages/Studio/Tools/BorderRadiusHarmonizer')),
    SpacingTokenBuilder: lazy(() => import('@/pages/Studio/Tools/SpacingTokenBuilder')),
    TypeScaleComposer: lazy(() => import('@/pages/Studio/Tools/TypeScaleComposer')),
    ShadowElevationStudio: lazy(() => import('@/pages/Studio/Tools/ShadowElevationStudio')),

    // Motion Design
    EasingCurveLab: lazy(() => import('@/pages/Studio/Tools/EasingCurveLab')),
    SpringPhysicsPlayground: lazy(() => import('@/pages/Studio/Tools/SpringPhysicsPlayground')),
    StaggerSequencer: lazy(() => import('@/pages/Studio/Tools/StaggerSequencer')),

    // Three.js & Shaders
    GlslFragmentSandbox: lazy(() => import('@/pages/Studio/Tools/GlslFragmentSandbox')),
    ParticleFieldComposer: lazy(() => import('@/pages/Studio/Tools/ParticleFieldComposer')),
    MeshGradientWeaver: lazy(() => import('@/pages/Studio/Tools/MeshGradientWeaver')),

    // AI Workflows
    PromptBuilder: lazy(() => import('@/pages/Studio/Tools/PromptBuilder')),
    TokenCostEstimator: lazy(() => import('@/pages/Studio/Tools/TokenCostEstimator')),
    EmbeddingSimilarityExplorer: lazy(
        () => import('@/pages/Studio/Tools/EmbeddingSimilarityExplorer'),
    ),
    JsonSchemaPromptLinter: lazy(() => import('@/pages/Studio/Tools/JsonSchemaPromptLinter')),

    // Accessibility
    AriaRoleInspector: lazy(() => import('@/pages/Studio/Tools/AriaRoleInspector')),
    ContrastRatioChecker: lazy(() => import('@/pages/Studio/Tools/ContrastRatioChecker')),
    FocusOrderVisualizer: lazy(() => import('@/pages/Studio/Tools/FocusOrderVisualizer')),

    // Performance
    ROICalculator: lazy(() => import('@/pages/Studio/Tools/ROICalculator')),
    BundleSizeAnalyzer: lazy(() => import('@/pages/Studio/Tools/BundleSizeAnalyzer')),
    CacheHeaderPlanner: lazy(() => import('@/pages/Studio/Tools/CacheHeaderPlanner')),
    CoreWebVitalsSimulator: lazy(() => import('@/pages/Studio/Tools/CoreWebVitalsSimulator')),

    // Developer Tools
    MetaTagGenerator: lazy(() => import('@/pages/Studio/Tools/MetaTagGenerator')),
    RegexTester: lazy(() => import('@/pages/Studio/Tools/RegexTester')),
    JwtDecoder: lazy(() => import('@/pages/Studio/Tools/JwtDecoder')),
    CronExpressionBuilder: lazy(() => import('@/pages/Studio/Tools/CronExpressionBuilder')),
    UuidUlidGenerator: lazy(() => import('@/pages/Studio/Tools/UuidUlidGenerator')),

    // Brand Exploration
    BrandNameGenerator: lazy(() => import('@/pages/Studio/Tools/BrandNameGenerator')),
    LogoGridConstructor: lazy(() => import('@/pages/Studio/Tools/LogoGridConstructor')),
    TaglineRhythmTester: lazy(() => import('@/pages/Studio/Tools/TaglineRhythmTester')),

    // Interaction Design
    CursorTrailComposer: lazy(() => import('@/pages/Studio/Tools/CursorTrailComposer')),
    ScrollProgressDesigner: lazy(() => import('@/pages/Studio/Tools/ScrollProgressDesigner')),
    HapticFeedbackMapper: lazy(() => import('@/pages/Studio/Tools/HapticFeedbackMapper')),
};

interface ToolRendererProps {
    componentName: string;
}

const ToolLoadingSkeleton = () => (
    <div className="animate-pulse space-y-6">
        <div className="bg-muted h-12 w-3/4 rounded-lg" />
        <div className="bg-muted h-40 rounded-xl" />
        <div className="bg-muted h-10 w-1/2 rounded-lg" />
    </div>
);

const ToolNotFound = ({ componentName }: { componentName: string }) => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
            <svg
                className="text-muted-foreground h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
            </svg>
        </div>
        <h3 className="text-foreground mb-2 text-xl font-semibold">Tool Coming Soon</h3>
        <p className="text-muted-foreground max-w-md">
            <code className="bg-muted rounded px-2 py-0.5 text-sm">{componentName}</code> is
            currently being built. Check back soon.
        </p>
    </div>
);

export function ToolRenderer({ componentName }: ToolRendererProps) {
    const Component = registry[componentName];

    if (!Component) {
        return <ToolNotFound componentName={componentName} />;
    }

    return (
        <Suspense fallback={<ToolLoadingSkeleton />}>
            <Component />
        </Suspense>
    );
}
