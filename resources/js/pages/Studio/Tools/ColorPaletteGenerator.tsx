import { Copy, Check, RefreshCw, Lock, Unlock } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface ColorSwatch {
    hex: string;
    locked: boolean;
}

function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

        return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0');
    };

    return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(count: number, existing: ColorSwatch[]): ColorSwatch[] {
    const baseHue = Math.random() * 360;
    const modes = ['analogous', 'complementary', 'triadic', 'split-complementary'];
    const mode = modes[Math.floor(Math.random() * modes.length)];

    return existing.map((swatch, i) => {
        if (swatch.locked) {
            return swatch;
        }

        let hue: number;

        switch (mode) {
            case 'analogous':
                hue = (baseHue + i * 30) % 360;
                break;
            case 'complementary':
                hue = (baseHue + (i * 180) / (count - 1)) % 360;
                break;
            case 'triadic':
                hue = (baseHue + i * 120) % 360;
                break;
            default:
                hue = (baseHue + (i * 150) / (count - 1)) % 360;
        }

        const saturation = 55 + Math.random() * 35;
        const lightness = 35 + (i / (count - 1)) * 40;

        return { hex: hslToHex(hue, saturation, lightness), locked: false };
    });
}

function createInitialSwatches(count: number): ColorSwatch[] {
    return generatePalette(
        count,
        Array.from({ length: count }, () => ({ hex: '#000000', locked: false })),
    );
}

export default function ColorPaletteGenerator() {
    const [swatches, setSwatches] = useState<ColorSwatch[]>(() => createInitialSwatches(5));
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const regenerate = useCallback(() => {
        setSwatches((prev) => generatePalette(prev.length, prev));
    }, []);

    const toggleLock = (index: number) => {
        setSwatches((prev) => prev.map((s, i) => (i === index ? { ...s, locked: !s.locked } : s)));
    };

    const copyColor = async (hex: string, index: number) => {
        await navigator.clipboard.writeText(hex);
        setCopiedIdx(index);
        setTimeout(() => setCopiedIdx(null), 1500);
    };

    const updateColor = (index: number, hex: string) => {
        setSwatches((prev) => prev.map((s, i) => (i === index ? { ...s, hex } : s)));
    };

    const exportCSS = () => {
        const css = swatches.map((s, i) => `  --color-${i + 1}: ${s.hex};`).join('\n');
        const output = `:root {\n${css}\n}`;
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="space-y-8">
            {/* Palette Preview */}
            <div className="border-border flex h-48 overflow-hidden rounded-2xl border shadow-inner md:h-64">
                {swatches.map((swatch, i) => (
                    <div
                        key={i}
                        className="group relative flex-1 cursor-pointer transition-all hover:flex-[1.3]"
                        style={{ backgroundColor: swatch.hex }}
                    >
                        <div className="bg-surface-raised/20 absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                            <button
                                onClick={() => toggleLock(i)}
                                className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
                            >
                                {swatch.locked ? (
                                    <Lock className="h-4 w-4" />
                                ) : (
                                    <Unlock className="h-4 w-4" />
                                )}
                            </button>
                            <button
                                onClick={() => copyColor(swatch.hex, i)}
                                className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
                            >
                                {copiedIdx === i ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Color Inputs */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                {swatches.map((swatch, i) => (
                    <div key={i} className="space-y-2">
                        <Label className="text-muted-foreground text-xs">Color {i + 1}</Label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={swatch.hex}
                                onChange={(e) => updateColor(i, e.target.value)}
                                className="border-border h-10 w-10 cursor-pointer rounded-lg border"
                            />
                            <Input
                                value={swatch.hex}
                                onChange={(e) => updateColor(i, e.target.value)}
                                className="font-mono text-sm"
                                size="sm"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
                <Button onClick={regenerate} variant="primary" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Generate New Palette
                </Button>
                <Button onClick={exportCSS} variant="outline" className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy as CSS Variables
                </Button>
            </div>
        </div>
    );
}
