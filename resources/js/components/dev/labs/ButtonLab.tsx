import { Button, Flex } from '@/components/ui';
import { PreviewWrapper } from '../PreviewWrapper';

export function ButtonLab() {
    return (
        <div className="space-y-8 pb-32">
            <div className="border-border mb-8 border-b pb-4">
                <h3 className="text-foreground text-3xl font-bold tracking-tight">Button Lab</h3>
                <p className="text-muted-foreground mt-2">
                    Test button variants, states, and group behaviors.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <PreviewWrapper
                    title="Primary Variant"
                    codeSnippet={'<Button variant="primary">Primary Button</Button>'}
                >
                    <Button variant="primary">Primary Button</Button>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Secondary Variant"
                    codeSnippet={'<Button variant="secondary">Secondary Button</Button>'}
                >
                    <Button variant="secondary">Secondary Button</Button>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Outline Variant"
                    codeSnippet={'<Button variant="outline">Outline Button</Button>'}
                >
                    <Button variant="outline">Outline Button</Button>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Ghost Variant"
                    codeSnippet={'<Button variant="ghost">Ghost Button</Button>'}
                >
                    <Button variant="ghost">Ghost Button</Button>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Premium Glass"
                    className="bg-gradient-to-br from-indigo-500 to-purple-600"
                    codeSnippet={'<Button variant="glass">Glass Button</Button>'}
                >
                    <Button variant="glass">Glass Button</Button>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Premium Gradient"
                    codeSnippet={'<Button variant="gradient">Gradient Button</Button>'}
                >
                    <Button variant="gradient">Gradient Button</Button>
                </PreviewWrapper>

                <PreviewWrapper
                    title="States: Loading"
                    codeSnippet={'<Button state="loading">Loading...</Button>'}
                >
                    <Button state="loading">Loading...</Button>
                </PreviewWrapper>

                <PreviewWrapper
                    title="States: Success"
                    codeSnippet={'<Button state="success">Saved Successfully</Button>'}
                >
                    <Button state="success">Saved Successfully</Button>
                </PreviewWrapper>

                <PreviewWrapper
                    title="States: Error"
                    codeSnippet={'<Button state="error">Action Failed</Button>'}
                >
                    <Button state="error">Action Failed</Button>
                </PreviewWrapper>

                <PreviewWrapper
                    title="Shapes & Sizes"
                    codeSnippet={
                        '<Flex gap={2}>\n  <Button variant="pill">Pill Shape</Button>\n  <Button size="icon">+</Button>\n  <Button variant="floating">+</Button>\n</Flex>'
                    }
                >
                    <Flex gap={2} align="center">
                        <Button variant="pill">Pill Shape</Button>
                        <Button size="icon">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </Button>
                        <Button variant="floating">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </Button>
                    </Flex>
                </PreviewWrapper>
            </div>
        </div>
    );
}
