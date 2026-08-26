import { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/Label';

export default function CursorTrailComposer() {
    const [lag, setLag] = useState(0.15);
    const [size, setSize] = useState(28);
    const areaRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const target = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });
    const raf = useRef<number>(0);

    useEffect(() => {
        const tick = () => {
            pos.current.x += (target.current.x - pos.current.x) * lag;
            pos.current.y += (target.current.y - pos.current.y) * lag;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`;
            }

            raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf.current);
    }, [lag, size]);

    const onMove = (e: React.MouseEvent) => {
        const rect = areaRef.current?.getBoundingClientRect();

        if (rect) {
            target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }
    };

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div
                ref={areaRef}
                onMouseMove={onMove}
                className="bg-surface-raised/60 relative h-56 cursor-none overflow-hidden border border-white/10"
            >
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-xs text-white/30">
                    move your cursor here
                </span>
                <div
                    ref={dotRef}
                    className="pointer-events-none absolute top-0 left-0 rounded-full bg-gradient-to-br from-[#2EC4A5] to-[#00D1FF] mix-blend-screen"
                    style={{ width: size, height: size }}
                />
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Lag (follow speed): {lag.toFixed(2)}
                    </Label>
                    <input
                        type="range"
                        min={0.03}
                        max={0.5}
                        step={0.01}
                        value={lag}
                        onChange={(e) => setLag(Number(e.target.value))}
                        className="w-full accent-[#2EC4A5]"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Size: {size}px
                    </Label>
                    <input
                        type="range"
                        min={10}
                        max={60}
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="w-full accent-[#2EC4A5]"
                    />
                </div>
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Keeping the true cursor visible under the effect preserves click accuracy and trust.
            </p>
        </div>
    );
}
