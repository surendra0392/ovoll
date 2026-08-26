import { Copy, Check, RefreshCw } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';

type GradientType = 'linear' | 'radial' | 'conic';

interface GradientStop {
    color: string;
    position: number;
}

const PRESETS = [
    {
        name: 'Sunset',
        stops: [
            { color: '#ff6b6b', position: 0 },
            { color: '#feca57', position: 100 },
        ],
    },
    {
        name: 'Ocean',
        stops: [
            { color: '#667eea', position: 0 },
            { color: '#764ba2', position: 100 },
        ],
    },
    {
        name: 'Forest',
        stops: [
            { color: '#11998e', position: 0 },
            { color: '#38ef7d', position: 100 },
        ],
    },
    {
        name: 'Nightfall',
        stops: [
            { color: '#0f0c29', position: 0 },
            { color: '#302b63', position: 50 },
            { color: '#24243e', position: 100 },
        ],
    },
    {
        name: 'Peach',
        stops: [
            { color: '#ffecd2', position: 0 },
            { color: '#fcb69f', position: 100 },
        ],
    },
    {
        name: 'Aurora',
        stops: [
            { color: '#a8edea', position: 0 },
            { color: '#fed6e3', position: 100 },
        ],
    },
];

export default function GradientGenerator() {
    const [type, setType] = useState<GradientType>('linear');
    const [angle, setAngle] = useState(135);
    const [stops, setStops] = useState<GradientStop[]>([
        { color: '#6366f1', position: 0 },
        { color: '#ec4899', position: 100 },
    ]);
    const [copied, setCopied] = useState(false);

    const buildGradientCSS = useCallback(() => {
        const colorStops = stops.map((s) => `${s.color} ${s.position}%`).join(', ');

        switch (type) {
            case 'radial':
                return `radial-gradient(circle, ${colorStops})`;
            case 'conic':
                return `conic-gradient(from ${angle}deg, ${colorStops})`;
            default:
                return `linear-gradient(${angle}deg, ${colorStops})`;
        }
    }, [type, angle, stops]);

    const cssOutput = `background: ${buildGradientCSS()};`;

    const copyCSS = async () => {
        await navigator.clipboard.writeText(cssOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const updateStop = (index: number, field: 'color' | 'position', value: string | number) => {
        setStops((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
    };

    const addStop = () => {
        if (stops.length >= 6) {
            return;
        }

        setStops((prev) => [
            ...prev,
            {
                color:
                    '#' +
                    Math.floor(Math.random() * 16777215)
                        .toString(16)
                        .padStart(6, '0'),
                position: 50,
            },
        ]);
    };

    const removeStop = (index: number) => {
        if (stops.length <= 2) {
            return;
        }

        setStops((prev) => prev.filter((_, i) => i !== index));
    };

    const applyPreset = (preset: (typeof PRESETS)[0]) => {
        setStops(preset.stops);
    };

    const randomize = () => {
        setAngle(Math.floor(Math.random() * 360));
        setStops(
            stops.map((s) => ({
                ...s,
                color:
                    '#' +
                    Math.floor(Math.random() * 16777215)
                        .toString(16)
                        .padStart(6, '0'),
            })),
        );
    };

    return (
        <div className="space-y-8">
            {/* Preview */}
            <div
                className="border-border h-48 w-full rounded-2xl border shadow-inner transition-all duration-300 md:h-64"
                style={{ background: buildGradientCSS() }}
            />

            {/* Controls */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Left — Type & Angle */}
                <div className="space-y-6">
                    <div>
                        <label className="text-foreground mb-3 block text-sm font-medium">
                            Gradient Type
                        </label>
                        <div className="flex gap-2">
                            {(['linear', 'radial', 'conic'] as GradientType[]).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                                        type === t
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : 'border-border text-muted-foreground hover:border-primary/30'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {type !== 'radial' && (
                        <div>
                            <label className="text-foreground mb-2 block text-sm font-medium">
                                Angle: {angle}°
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={360}
                                value={angle}
                                onChange={(e) => setAngle(Number(e.target.value))}
                                className="accent-primary w-full"
                            />
                        </div>
                    )}

                    {/* Presets */}
                    <div>
                        <label className="text-foreground mb-3 block text-sm font-medium">
                            Presets
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {PRESETS.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => applyPreset(preset)}
                                    className="border-border hover:border-primary/30 text-muted-foreground hover:text-foreground rounded-lg border px-3 py-2 text-xs font-medium transition-colors"
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — Color Stops */}
                <div className="space-y-4">
                    <label className="text-foreground block text-sm font-medium">Color Stops</label>
                    {stops.map((stop, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <input
                                type="color"
                                value={stop.color}
                                onChange={(e) => updateStop(i, 'color', e.target.value)}
                                className="border-border h-10 w-10 cursor-pointer rounded-lg border"
                            />
                            <input
                                type="text"
                                value={stop.color}
                                onChange={(e) => updateStop(i, 'color', e.target.value)}
                                className="border-input bg-background h-10 flex-1 rounded-md border px-3 font-mono text-sm"
                            />
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={stop.position}
                                onChange={(e) => updateStop(i, 'position', Number(e.target.value))}
                                className="border-input bg-background h-10 w-20 rounded-md border px-3 text-center text-sm"
                            />
                            <span className="text-muted-foreground text-xs">%</span>
                            {stops.length > 2 && (
                                <button
                                    onClick={() => removeStop(i)}
                                    className="text-muted-foreground text-sm hover:text-red-500"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    {stops.length < 6 && (
                        <button onClick={addStop} className="text-primary text-sm hover:underline">
                            + Add stop
                        </button>
                    )}
                </div>
            </div>

            {/* CSS Output */}
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2">
                    <span className="font-mono text-xs text-zinc-400">CSS</span>
                    <button
                        onClick={copyCSS}
                        className="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-white"
                    >
                        {copied ? (
                            <Check className="h-3.5 w-3.5" />
                        ) : (
                            <Copy className="h-3.5 w-3.5" />
                        )}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
                    <code>{cssOutput}</code>
                </pre>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button onClick={randomize} variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Randomize
                </Button>
                <Button onClick={copyCSS} variant="primary" className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy CSS
                </Button>
            </div>
        </div>
    );
}
