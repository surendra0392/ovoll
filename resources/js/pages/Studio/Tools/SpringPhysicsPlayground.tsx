import { motion } from 'framer-motion';
import { useState } from 'react';
import { Label } from '@/components/ui/Label';

export default function SpringPhysicsPlayground() {
    const [stiffness, setStiffness] = useState(200);
    const [damping, setDamping] = useState(20);
    const [mass, setMass] = useState(1);
    const [toggled, setToggled] = useState(false);

    const controls = [
        { label: 'Stiffness', value: stiffness, set: setStiffness, min: 20, max: 500, step: 10 },
        { label: 'Damping', value: damping, set: setDamping, min: 1, max: 40, step: 1 },
        { label: 'Mass', value: mass, set: setMass, min: 0.5, max: 5, step: 0.1 },
    ];

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 text-left">
            <div
                className="bg-surface-raised/60 flex h-32 cursor-pointer items-center border border-white/5 px-6"
                onClick={() => setToggled((t) => !t)}
            >
                <motion.div
                    className="text-surface-raised flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2EC4A5] to-[#00D1FF] font-mono text-[9px]"
                    animate={{ x: toggled ? 300 : 0 }}
                    transition={{ type: 'spring', stiffness, damping, mass }}
                >
                    tap
                </motion.div>
            </div>
            <p className="-mt-3 font-mono text-[10px] text-white/30">Click the panel to animate.</p>

            <div className="space-y-4">
                {controls.map((c) => (
                    <div key={c.label} className="space-y-2">
                        <Label className="text-xs tracking-wider text-white/70 uppercase">
                            {c.label}: {c.value}
                        </Label>
                        <input
                            type="range"
                            min={c.min}
                            max={c.max}
                            step={c.step}
                            value={c.value}
                            onChange={(e) => c.set(Number(e.target.value))}
                            className="w-full accent-[#2EC4A5]"
                        />
                    </div>
                ))}
            </div>

            <code className="bg-surface-raised/60 block border border-white/5 p-3 font-mono text-[11px] text-white/60">
                {`{ type: "spring", stiffness: ${stiffness}, damping: ${damping}, mass: ${mass} }`}
            </code>
            <p className="font-mono text-[10px] text-white/40">
                Damping ratio matters more than raw stiffness for whether motion feels controlled.
            </p>
        </div>
    );
}
