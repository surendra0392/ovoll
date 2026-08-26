import { Badge, Button } from '@/components/ui';

interface FinalCtaSectionProps {
    content?: {
        headline?: string;
        subtitle?: string;
        button_text?: string;
        button_url?: string;
    };
}

export function FinalCtaSection({ content }: FinalCtaSectionProps) {
    const headline = content?.headline || "Let's build a new digital standard.";
    const subtitle =
        content?.subtitle ||
        'We partner with ambitious founders and technical teams to design, engineer, and scale custom visual platforms. Reach out directly to start the dialogue.';
    const buttonText = content?.button_text || 'Initiate Dialogue';
    const buttonUrl = content?.button_url || '/contact';

    return (
        <section className="relative z-10 flex w-full flex-col items-center justify-center overflow-hidden bg-transparent px-6 py-40 text-white md:py-56">
            {/* Ambient Backglow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(46,196,165,0.12)_0%,_transparent_70%)] blur-[100px]" />

            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center space-y-8 text-center select-none">
                <Badge variant="default" size="sm">
                    Section 10 — Dialogue
                </Badge>

                <div className="space-y-4">
                    <h2 className="typo-display-l max-w-3xl text-white">{headline}</h2>
                    <p className="typo-body-large mx-auto max-w-2xl text-white/50">{subtitle}</p>
                </div>

                <div className="pt-4">
                    <Button
                        variant="gradient"
                        size="lg"
                        onClick={() => (window.location.href = buttonUrl)}
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>
        </section>
    );
}
