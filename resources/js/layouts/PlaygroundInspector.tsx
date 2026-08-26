import { useInspectorStore } from '@/components/dev/PreviewWrapper';
import { Text, Tabs, Button } from '@/components/ui';

export function PlaygroundInspector() {
    const { activeComponentCode } = useInspectorStore();

    return (
        <aside className="bg-card border-border flex w-80 shrink-0 flex-col border-l">
            <div className="border-border border-b p-4">
                <Text variant="h6">Inspector</Text>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
                <Tabs
                    tabs={[
                        {
                            id: 'props',
                            label: 'Props',
                            content: (
                                <div className="h-full space-y-6 overflow-y-auto p-4">
                                    <Text variant="caption" className="text-muted-foreground">
                                        Select a component to inspect its properties.
                                    </Text>
                                </div>
                            ),
                        },
                        {
                            id: 'docs',
                            label: 'Docs',
                            content: (
                                <div className="prose prose-sm dark:prose-invert h-full space-y-4 overflow-y-auto p-4">
                                    <h3>Component Documentation</h3>
                                    <p>
                                        Usage guidelines and accessibility notes will appear here.
                                    </p>
                                </div>
                            ),
                        },
                        {
                            id: 'code',
                            label: 'Code',
                            content: (
                                <div className="flex h-full flex-col gap-4 p-4">
                                    {activeComponentCode ? (
                                        <>
                                            <div className="border-border flex-1 overflow-auto rounded-lg border bg-zinc-950 p-4 font-mono text-xs whitespace-pre-wrap text-zinc-50">
                                                {activeComponentCode}
                                            </div>
                                            <Button
                                                className="w-full"
                                                onClick={() =>
                                                    navigator.clipboard.writeText(
                                                        activeComponentCode,
                                                    )
                                                }
                                            >
                                                Copy JSX
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="border-border text-muted-foreground flex flex-1 items-center justify-center rounded-lg border border-dashed text-sm">
                                            Select a component to view JSX
                                        </div>
                                    )}
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </aside>
    );
}
