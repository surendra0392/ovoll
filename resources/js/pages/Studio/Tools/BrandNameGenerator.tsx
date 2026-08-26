import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const PREFIXES = [
    'Aero',
    'Nova',
    'Omni',
    'Vela',
    'Zen',
    'Syn',
    'Lumi',
    'Core',
    'Aura',
    'Evo',
    'Nexus',
    'Vertex',
    'Stratos',
    'Quantum',
    'Apex',
    'Sol',
    'Hyper',
];
const SUFFIXES = [
    'ify',
    'ly',
    'io',
    'base',
    'flow',
    'cast',
    'shift',
    'sync',
    'grid',
    'forge',
    'loom',
    'sphere',
    'path',
    'point',
    'wave',
    'node',
];
const KEYWORDS = [
    'tech',
    'data',
    'cloud',
    'mind',
    'logic',
    'byte',
    'pulse',
    'spark',
    'flux',
    'vision',
    'stack',
    'scale',
    'link',
    'net',
];

interface GeneratedName {
    name: string;
    domain: string;
    style: string;
}

export default function BrandNameGenerator() {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState<GeneratedName[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedName, setCopiedName] = useState<string | null>(null);

    const generateNames = () => {
        setIsGenerating(true);

        setTimeout(() => {
            const kw =
                keyword.trim().toLowerCase() ||
                KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)]!;
            const capitalizedKw = kw.charAt(0).toUpperCase() + kw.slice(1);

            const generated: GeneratedName[] = [];
            const count = 12;

            for (let i = 0; i < count; i++) {
                const type = Math.floor(Math.random() * 4);
                let name = '';
                let style = '';

                if (type === 0) {
                    // Prefix + Keyword
                    const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)]!;
                    name = prefix + kw;
                    style = 'Compound';
                } else if (type === 1) {
                    // Keyword + Suffix
                    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]!;
                    name = capitalizedKw + suffix;
                    style = 'Modern';
                } else if (type === 2) {
                    // Two words blended (Portmanteau-ish)
                    const kw2 = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)]!;
                    name = capitalizedKw + kw2.charAt(0).toUpperCase() + kw2.slice(1);
                    style = 'Classic';
                } else {
                    // Random Prefix + Suffix
                    const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)]!;
                    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]!;
                    name = prefix + suffix;
                    style = 'Abstract';
                }

                // Add to results if unique
                if (!generated.find((g) => g.name === name)) {
                    generated.push({
                        name,
                        domain: name.toLowerCase() + '.com',
                        style,
                    });
                } else {
                    i--; // retry
                }
            }

            setResults(generated);
            setIsGenerating(false);
        }, 600);
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedName(text);
        setTimeout(() => setCopiedName(null), 1500);
    };

    return (
        <div className="mx-auto max-w-4xl">
            {/* Input Section */}
            <div className="bg-primary/5 border-primary/20 mb-12 rounded-3xl border p-8 text-center md:p-12">
                <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <Sparkles className="h-8 w-8" />
                </div>
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">What is your project about?</h2>
                <p className="text-muted-foreground mx-auto mb-8 max-w-lg">
                    Enter a keyword related to your industry or idea, and our AI will generate
                    unique, brandable names instantly.
                </p>

                <div className="mx-auto flex max-w-md gap-3">
                    <Input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="e.g. analytics, coffee, fitness"
                        size="lg"
                        className="bg-background flex-1"
                        onKeyDown={(e) => e.key === 'Enter' && generateNames()}
                    />
                    <Button
                        size="lg"
                        variant="primary"
                        onClick={generateNames}
                        isLoading={isGenerating}
                        disabled={isGenerating}
                    >
                        Generate
                    </Button>
                </div>
            </div>

            {/* Results Grid */}
            {results.length > 0 && (
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Generated Names</h3>
                        <Button variant="ghost" size="sm" onClick={generateNames} className="gap-2">
                            <RefreshCw className="h-4 w-4" /> Regenerate
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {results.map((item, i) => (
                            <div
                                key={i}
                                className="group bg-card border-border hover:border-primary/40 relative rounded-xl border p-6 transition-all hover:shadow-md"
                            >
                                <Badge
                                    variant="secondary"
                                    className="absolute top-4 right-4 text-[10px]"
                                >
                                    {item.style}
                                </Badge>

                                <h4 className="text-foreground group-hover:text-primary mb-1 text-xl font-bold transition-colors">
                                    {item.name}
                                </h4>
                                <p className="text-muted-foreground mb-4 font-mono text-sm">
                                    {item.domain}
                                </p>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full gap-2"
                                    onClick={() => copyToClipboard(item.name)}
                                >
                                    {copiedName === item.name ? (
                                        <Check className="text-success h-4 w-4" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                    {copiedName === item.name ? 'Copied' : 'Copy Name'}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
