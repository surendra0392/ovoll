import { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/Label';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export default function ParticleFieldComposer() {
    const [count, setCount] = useState(120);
    const [speed, setSpeed] = useState(0.4);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const raf = useRef<number>(0);
    const speedRef = useRef(speed);

    // Writing a ref during render is a React 19 purity violation; keep the
    // animation loop's speed in sync via an effect instead.
    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const w = (canvas.width = canvas.offsetWidth);
        const h = (canvas.height = 224);

        particles.current = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            particles.current.forEach((p) => {
                p.x += p.vx * speedRef.current;
                p.y += p.vy * speedRef.current;

                if (p.x < 0 || p.x > w) {
                    p.vx *= -1;
                }

                if (p.y < 0 || p.y > h) {
                    p.vy *= -1;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = '#2EC4A5';
                ctx.fill();
            });
            raf.current = requestAnimationFrame(draw);
        };
        draw();

        return () => cancelAnimationFrame(raf.current);
    }, [count]);

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <canvas
                ref={canvasRef}
                className="bg-surface-raised/60 h-56 w-full border border-white/10"
            />

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Particle count: {count}
                    </Label>
                    <input
                        type="range"
                        min={20}
                        max={400}
                        step={20}
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full accent-[#2EC4A5]"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Drift speed: {speed.toFixed(1)}
                    </Label>
                    <input
                        type="range"
                        min={0.1}
                        max={2}
                        step={0.1}
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-full accent-[#2EC4A5]"
                    />
                </div>
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Draw-call count, not particle count, is what actually breaks mobile frame budgets.
            </p>
        </div>
    );
}
