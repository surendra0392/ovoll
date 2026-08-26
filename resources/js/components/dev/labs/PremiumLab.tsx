import {
    SpotlightCard,
    MouseReactiveCard,
    MagneticCard,
    GlowBorder,
    HoverLift,
    FloatingCard,
    Button,
    Text,
} from '@/components/ui';
import { PreviewWrapper } from '../PreviewWrapper';

export function PremiumLab() {
    return (
        <div className="space-y-8 pb-32">
            <div className="border-border mb-8 border-b pb-4">
                <Text variant="h3">Premium Interactions</Text>
                <Text variant="body" className="text-muted-foreground">
                    Test high-end visual effects and complex micro-interactions.
                </Text>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <PreviewWrapper
                    title="Spotlight Card (Mouse Follow)"
                    codeSnippet={'<SpotlightCard>\n  <Content />\n</SpotlightCard>'}
                >
                    <SpotlightCard className="flex h-48 w-full max-w-sm flex-col justify-center p-6">
                        <Text variant="h4">Spotlight Tracking</Text>
                        <Text variant="small" className="text-muted-foreground mt-2">
                            Hover over this card to reveal the radial gradient tracking your mouse
                            cursor.
                        </Text>
                    </SpotlightCard>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Mouse Reactive Card (3D Tilt)"
                    codeSnippet={'<MouseReactiveCard>\n  <Content />\n</MouseReactiveCard>'}
                >
                    <MouseReactiveCard className="bg-muted/20 flex h-48 w-full max-w-sm flex-col justify-center p-6">
                        <Text variant="h4">3D Spring Tilt</Text>
                        <Text variant="small" className="text-muted-foreground mt-2">
                            This card uses Framer Motion spring physics to tilt in 3D space based on
                            mouse position.
                        </Text>
                    </MouseReactiveCard>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Magnetic Card"
                    codeSnippet={'<MagneticCard>\n  <Button>Magnetic</Button>\n</MagneticCard>'}
                >
                    <div className="border-border bg-muted/10 flex h-48 w-full max-w-sm items-center justify-center rounded-xl border">
                        <MagneticCard pull={20}>
                            <Button variant="primary" className="rounded-full px-8 py-6 text-lg">
                                Hover Me
                            </Button>
                        </MagneticCard>
                    </div>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Glow Border (Conic Spin)"
                    codeSnippet={'<GlowBorder color="#8b5cf6">\n  <Content />\n</GlowBorder>'}
                >
                    <GlowBorder className="w-full max-w-sm" color="#8b5cf6">
                        <div className="p-8 text-center">
                            <Text variant="h5">Continuous Glow</Text>
                        </div>
                    </GlowBorder>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Floating Element"
                    codeSnippet={
                        '<FloatingCard floatIntensity={15}>\n  <Content />\n</FloatingCard>'
                    }
                >
                    <FloatingCard
                        floatIntensity={15}
                        className="border-primary/30 rounded-2xl border bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-8 backdrop-blur-sm"
                    >
                        <Text variant="h5" className="text-primary">
                            Levitating Content
                        </Text>
                    </FloatingCard>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Hover Lift"
                    codeSnippet={'<HoverLift>\n  <Card />\n</HoverLift>'}
                >
                    <HoverLift className="w-full max-w-sm">
                        <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
                            <Text variant="h6">Elevate on Hover</Text>
                            <Text variant="small" className="text-muted-foreground mt-2">
                                Provides immediate physical feedback.
                            </Text>
                        </div>
                    </HoverLift>
                </PreviewWrapper>
            </div>
        </div>
    );
}
