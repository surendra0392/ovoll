import { Text, AnimatedText, GradientText } from '@/components/ui';
import { PreviewWrapper } from '../PreviewWrapper';

export function TypographyLab() {
    return (
        <div className="space-y-8 pb-32">
            <div className="border-border mb-8 border-b pb-4">
                <Text variant="h3">Typography Lab</Text>
                <Text variant="body" className="text-muted-foreground">
                    Test font scales, weights, and specialized text components.
                </Text>
            </div>

            <div className="grid gap-6">
                <PreviewWrapper
                    title="Display Text"
                    codeSnippet={'<Text variant="display">Display Text</Text>'}
                >
                    <Text variant="display">Display Text</Text>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Heading 1"
                    codeSnippet={'<Text variant="h1">Heading 1</Text>'}
                >
                    <Text variant="h1">Heading 1</Text>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Heading 2"
                    codeSnippet={'<Text variant="h2">Heading 2</Text>'}
                >
                    <Text variant="h2">Heading 2</Text>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Body Text"
                    codeSnippet={
                        '<Text variant="body">The quick brown fox jumps over the lazy dog.</Text>'
                    }
                >
                    <Text variant="body">
                        The quick brown fox jumps over the lazy dog. A comprehensive set of
                        components ready for production.
                    </Text>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Gradient Text"
                    codeSnippet={
                        '<GradientText className="text-4xl font-extrabold w-max">\n  Stunning Gradient Text\n</GradientText>'
                    }
                >
                    <GradientText className="w-max text-4xl font-extrabold">
                        Stunning Gradient Text
                    </GradientText>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Animated Text (Reveal)"
                    codeSnippet={
                        '<AnimatedText text="Animated Reveal" variant="wordByWord" className="text-2xl font-bold" />'
                    }
                >
                    <AnimatedText
                        text="Animated Reveal"
                        variant="words"
                        className="text-2xl font-bold"
                    />
                </PreviewWrapper>
            </div>
        </div>
    );
}
