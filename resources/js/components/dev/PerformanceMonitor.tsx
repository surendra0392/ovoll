import { useEffect, useState } from 'react';
import { Text } from '@/components/ui';

export function PerformanceMonitor() {
    const [fps, setFps] = useState(0);

    useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();
        let animationFrameId: number;

        const loop = () => {
            const now = performance.now();
            frameCount++;

            if (now - lastTime >= 1000) {
                setFps(Math.round((frameCount * 1000) / (now - lastTime)));
                frameCount = 0;
                lastTime = now;
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-zinc-50 shadow-lg">
            <div
                className={`h-2 w-2 rounded-full ${fps >= 50 ? 'bg-green-500' : fps >= 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
            />
            <Text variant="code" className="m-0 text-xs leading-none font-medium">
                {fps} FPS
            </Text>
        </div>
    );
}
