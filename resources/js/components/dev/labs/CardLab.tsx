import {
    ServiceCard,
    FeatureCard,
    PricingCard,
    TeamCard,
    StatisticCard,
    QuoteCard,
    Text,
    Button,
} from '@/components/ui';
import { PreviewWrapper } from '../PreviewWrapper';

export function CardLab() {
    return (
        <div className="space-y-8 pb-32">
            <div className="border-border mb-8 border-b pb-4">
                <Text variant="h3">Card Lab</Text>
                <Text variant="body" className="text-muted-foreground">
                    Test specialized domain cards for marketing and data display.
                </Text>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <PreviewWrapper
                    title="Service Card"
                    codeSnippet={
                        '<ServiceCard title="Development" description="..." icon={<Icon />} />'
                    }
                >
                    <ServiceCard
                        className="w-full max-w-md"
                        icon={
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                />
                            </svg>
                        }
                        title="Web Development"
                        description="We build scalable, high-performance web applications using modern technologies like React, Next.js, and Laravel."
                    />
                </PreviewWrapper>

                <PreviewWrapper
                    title="Feature Card"
                    codeSnippet={
                        '<FeatureCard badge="New" title="AI Analytics" description="..." />'
                    }
                >
                    <FeatureCard
                        className="w-full max-w-md"
                        badge="New"
                        title="AI-Powered Analytics"
                        description="Gain deep insights into user behavior with our proprietary machine learning algorithms."
                    />
                </PreviewWrapper>

                <PreviewWrapper
                    title="Pricing Card (Highlighted)"
                    codeSnippet={
                        '<PricingCard title="Pro" price="$49" features={[]} highlighted />'
                    }
                >
                    <PricingCard
                        className="w-full max-w-md"
                        title="Pro Plan"
                        price="$49"
                        period="/month"
                        description="Perfect for growing digital teams."
                        features={[
                            'Unlimited Projects',
                            'Priority Support',
                            'Custom Domains',
                            'Advanced Analytics',
                        ]}
                        cta={<Button className="w-full">Get Started</Button>}
                        highlighted
                    />
                </PreviewWrapper>

                <PreviewWrapper
                    title="Team Card"
                    codeSnippet={'<TeamCard name="Jane Doe" role="Designer" socials={[]} />'}
                >
                    <TeamCard
                        className="w-full max-w-xs"
                        name="Jane Doe"
                        role="Principal Designer"
                        socials={[
                            { label: 'Twitter', href: '#' },
                            { label: 'LinkedIn', href: '#' },
                        ]}
                    />
                </PreviewWrapper>

                <PreviewWrapper
                    title="Quote Card"
                    codeSnippet={'<QuoteCard quote="..." author="..." role="..." />'}
                >
                    <QuoteCard
                        className="w-full max-w-md"
                        quote="Working with OVOLL completely transformed how we approach our digital strategy. Their architecture is flawless."
                        author="Sarah Jenkins"
                        role="CTO at TechFlow"
                    />
                </PreviewWrapper>

                <PreviewWrapper
                    title="Statistic Card"
                    codeSnippet={
                        '<StatisticCard label="Uptime" value="99.9" suffix="%" trend={{value: "+0.1%", positive: true}} />'
                    }
                >
                    <StatisticCard
                        className="w-full max-w-sm"
                        label="Server Uptime"
                        value="99.9"
                        suffix="%"
                        trend={{ value: '+0.1%', positive: true }}
                    />
                </PreviewWrapper>
            </div>
        </div>
    );
}
