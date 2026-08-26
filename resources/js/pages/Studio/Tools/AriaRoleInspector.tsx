import { useMemo, useState } from 'react';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

interface Finding {
    level: 'error' | 'warn';
    message: string;
}

function inspect(html: string): Finding[] {
    const findings: Finding[] = [];
    let doc: Document;

    try {
        doc = new DOMParser().parseFromString(html, 'text/html');
    } catch {
        return [{ level: 'error', message: 'Could not parse markup.' }];
    }

    doc.querySelectorAll('img').forEach((img) => {
        if (!img.hasAttribute('alt')) {
            findings.push({ level: 'error', message: `<img> missing alt attribute.` });
        }
    });

    doc.querySelectorAll('[role]').forEach((el) => {
        const role = el.getAttribute('role');
        const tag = el.tagName.toLowerCase();

        if (role === 'button' && tag === 'button') {
            findings.push({
                level: 'warn',
                message: `Redundant role="button" on native <button>. Delete the role.`,
            });
        }

        if (role === 'link' && tag === 'a') {
            findings.push({
                level: 'warn',
                message: `Redundant role="link" on native <a>. Delete the role.`,
            });
        }
    });

    doc.querySelectorAll('button, a[href]').forEach((el) => {
        const hasText = (el.textContent || '').trim().length > 0;
        const hasLabel = el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby');

        if (!hasText && !hasLabel) {
            findings.push({
                level: 'error',
                message: `<${el.tagName.toLowerCase()}> has no text and no aria-label.`,
            });
        }
    });

    doc.querySelectorAll('input, select, textarea').forEach((el) => {
        const id = el.getAttribute('id');
        const labelled =
            el.hasAttribute('aria-label') ||
            el.hasAttribute('aria-labelledby') ||
            (id && doc.querySelector(`label[for="${id}"]`));

        if (!labelled) {
            findings.push({
                level: 'warn',
                message: `<${el.tagName.toLowerCase()}> has no associated label.`,
            });
        }
    });

    return findings;
}

export default function AriaRoleInspector() {
    const [html, setHtml] = useState(
        '<button role="button">Save</button>\n<img src="logo.png">\n<a href="/x"><svg></svg></a>\n<input type="text">',
    );

    const findings = useMemo(() => inspect(html), [html]);

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">Markup</Label>
                <Textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    rows={6}
                    className="font-mono text-xs"
                />
            </div>

            <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-widest text-[#00D1FF] uppercase">
                    {findings.length} finding{findings.length === 1 ? '' : 's'}
                </span>
                {findings.length === 0 ? (
                    <div className="border border-[#2EC4A5]/20 bg-[#2EC4A5]/5 p-3 font-mono text-xs text-[#2EC4A5]">
                        No issues detected.
                    </div>
                ) : (
                    findings.map((f, i) => (
                        <div
                            key={i}
                            className={`border p-3 font-mono text-[11px] ${
                                f.level === 'error'
                                    ? 'border-red-500/30 bg-red-500/5 text-red-300'
                                    : 'border-yellow-500/30 bg-yellow-500/5 text-yellow-300'
                            }`}
                        >
                            <span className="uppercase">{f.level}</span> · {f.message}
                        </div>
                    ))
                )}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Native HTML elements usually beat ARIA — the first fix is often deleting a role.
            </p>
        </div>
    );
}
