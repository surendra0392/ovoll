import { useMemo, useState } from 'react';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

export default function JsonSchemaPromptLinter() {
    const [keys, setKeys] = useState('name, email, age');
    const [sample, setSample] = useState('{\n  "name": "Ada",\n  "email": "ada@x.com"\n}');

    const result = useMemo(() => {
        const required = keys
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean);
        let parsed: Record<string, unknown> | null = null;
        let parseError: string | null = null;

        try {
            parsed = JSON.parse(sample);
        } catch (e) {
            parseError = (e as Error).message;
        }

        if (parseError || !parsed || typeof parsed !== 'object') {
            return { parseError, missing: [], extra: [], present: [], required };
        }

        const presentKeys = Object.keys(parsed);
        const missing = required.filter((k) => !presentKeys.includes(k));
        const extra = presentKeys.filter((k) => !required.includes(k));

        return { parseError: null, missing, extra, present: presentKeys, required };
    }, [keys, sample]);

    const pass = !result.parseError && result.missing.length === 0;

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Required keys (comma separated)
                </Label>
                <Textarea value={keys} onChange={(e) => setKeys(e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Sample LLM response
                </Label>
                <Textarea
                    value={sample}
                    onChange={(e) => setSample(e.target.value)}
                    rows={5}
                    className="font-mono text-xs"
                />
            </div>

            <div
                className={`border p-4 font-mono text-sm ${
                    pass
                        ? 'border-[#2EC4A5]/30 bg-[#2EC4A5]/5 text-[#2EC4A5]'
                        : 'border-red-500/30 bg-red-500/5 text-red-300'
                }`}
            >
                {result.parseError
                    ? `Invalid JSON: ${result.parseError}`
                    : pass
                      ? 'PASS — response matches target schema.'
                      : `FAIL — missing: ${result.missing.join(', ')}`}
            </div>

            {!result.parseError && result.extra.length > 0 && (
                <p className="font-mono text-[11px] text-yellow-300">
                    Extra keys not in schema: {result.extra.join(', ')}
                </p>
            )}
            <p className="font-mono text-[10px] text-white/40">
                Declaring target keys and a few-shot example inside the system message kills drift.
            </p>
        </div>
    );
}
