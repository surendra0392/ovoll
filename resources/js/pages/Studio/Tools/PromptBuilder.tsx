import { Copy, Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

export default function PromptBuilder() {
    const [role, setRole] = useState('You are a precise data extraction assistant.');
    const [task, setTask] = useState('Extract the invoice number and total from the text.');
    const [format, setFormat] = useState('{ "invoice": string, "total": number }');
    const [example, setExample] = useState(
        'Input: "INV-42, $99.50" → { "invoice": "INV-42", "total": 99.5 }',
    );
    const [copied, setCopied] = useState(false);

    const compiled = useMemo(
        () =>
            [
                `# Role\n${role}`,
                `# Task\n${task}`,
                `# Output format (return ONLY valid JSON)\n${format}`,
                `# Example\n${example}`,
            ].join('\n\n'),
        [role, task, format, example],
    );

    const copy = async () => {
        await navigator.clipboard.writeText(compiled);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const fields = [
        { label: 'Role', value: role, set: setRole },
        { label: 'Task', value: task, set: setTask },
        { label: 'Output format', value: format, set: setFormat },
        { label: 'Example', value: example, set: setExample },
    ];

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            {fields.map((f) => (
                <div key={f.label} className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        {f.label}
                    </Label>
                    <Textarea value={f.value} onChange={(e) => f.set(e.target.value)} rows={2} />
                </div>
            ))}

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-[#00D1FF] uppercase">
                        Compiled Prompt
                    </span>
                    <button
                        onClick={copy}
                        className="flex items-center gap-1.5 font-mono text-[10px] text-white/50 hover:text-white"
                    >
                        {copied ? (
                            <Check className="h-3 w-3 text-[#2EC4A5]" />
                        ) : (
                            <Copy className="h-3 w-3" />
                        )}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
                <pre className="bg-surface-raised/60 overflow-x-auto border border-white/5 p-4 font-mono text-[11px] whitespace-pre-wrap text-white/70">
                    {compiled}
                </pre>
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Explicit formatting examples inside the system message prevent hallucination in
                production.
            </p>
        </div>
    );
}
