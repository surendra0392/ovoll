import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';

export default function StaggerSequencer() {
    const [delay, setDelay] = useState(60);
    const [key, setKey] = useState(0);
    const items = Array.from({ length: 8 });

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div className="flex items-end justify-between gap-4">
                <div className="flex-1 space-y-2">
                    <Label className="text-xs tracking-wider text-white/70 uppercase">
                        Per-item delay: {delay}ms
                    </Label>
                    <input
                        type="range"
                        min={0}
                        max={150}
                        step={10}
                        value={delay}
                        onChange={(e) => setDelay(Number(e.target.value))}
                        className="w-full accent-[#2EC4A5]"
                    />
                </div>
                <Button variant="secondary" size="sm" onClick={() => setKey((k) => k + 1)}>
                    Replay
                </Button>
            </div>

            <div key={key} className="grid grid-cols-4 gap-3">
                {items.map((_, i) => (
                    <motion.div
                        key={i}
                        className="h-16 rounded-none bg-gradient-to-br from-[#2EC4A5]/80 to-[#00D1FF]/80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (i * delay) / 1000, duration: 0.3 }}
                    />
                ))}
            </div>

            <div className="bg-surface-raised/60 border border-white/5 p-3 font-mono text-[11px] text-white/60">
                Total reveal: {((items.length - 1) * delay) / 1000 + 0.3}s
                {delay > 60 && (
                    <span className="ml-2 text-yellow-400">
                        · beyond ~60ms it starts feeling broken
                    </span>
                )}
            </div>
            <p className="font-mono text-[10px] text-white/40">
                Keep entrance animations under the ~400ms perceived-instant ceiling.
            </p>
        </div>
    );
}
