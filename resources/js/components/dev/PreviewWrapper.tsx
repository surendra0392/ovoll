import React from 'react';
import { create } from 'zustand';

// Simple store to communicate between PreviewWrapper and PlaygroundInspector
interface InspectorState {
    activeComponentCode: string;
    setActiveComponentCode: (code: string) => void;
    // In a full implementation, we'd add prop controls and documentation structures here.
}

export const useInspectorStore = create<InspectorState>((set) => ({
    activeComponentCode: '',
    setActiveComponentCode: (code) => set({ activeComponentCode: code }),
}));

interface PreviewWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    codeSnippet?: string;
}

export function PreviewWrapper({
    title,
    codeSnippet = '',
    className,
    children,
    ...props
}: PreviewWrapperProps) {
    const { setActiveComponentCode } = useInspectorStore();

    // When clicked/focused, this component sends its data to the right sidebar inspector
    const handleInspect = () => {
        setActiveComponentCode(codeSnippet);
    };

    return (
        <div
            className="group border-border/50 bg-background/50 hover:border-primary/50 relative flex cursor-pointer flex-col gap-4 rounded-xl border p-6 transition-all hover:shadow-md"
            onClick={handleInspect}
        >
            <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-primary text-[10px] font-bold tracking-wider uppercase">
                    Inspect
                </span>
            </div>

            <h3 className="text-muted-foreground text-sm font-semibold">{title}</h3>

            <div
                className={`border-border flex w-full items-center justify-center rounded-lg border border-dashed p-8 ${className}`}
                {...props}
            >
                {children}
            </div>
        </div>
    );
}
