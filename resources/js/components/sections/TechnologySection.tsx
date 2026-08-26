import { motion } from 'framer-motion';
import { Text, Glass } from '@/components/ui';
import type { SectionData } from './types';

interface TechItem {
    name: string;
    desc: string;
}

interface TechnologySectionProps {
    section: SectionData;
}

export function TechnologySection({ section }: TechnologySectionProps) {
    const { variant, title, subtitle, content = {}, settings = {} } = section;
    const techs: TechItem[] = (content as { techs?: TechItem[] }).techs ?? [];

    const isOrbit = variant === 'orbit';
    const radius = settings.orbit_radius ?? 150;
    const speed = settings.orbit_speed ?? 20;

    return (
        <div className="mx-auto w-full max-w-6xl space-y-16 px-6">
            {/* Header */}
            {!isOrbit && (title || subtitle) && (
                <div className="mx-auto max-w-3xl space-y-4 text-center">
                    <Text
                        variant="caption"
                        className="font-mono tracking-widest text-white/40 uppercase"
                    >
                        Our Ecosystem
                    </Text>
                    {title && (
                        <Text
                            variant="h2"
                            className="text-4xl font-bold tracking-tight md:text-5xl"
                        >
                            {title}
                        </Text>
                    )}
                    {subtitle && (
                        <Text variant="body" className="text-white/60">
                            {subtitle}
                        </Text>
                    )}
                </div>
            )}

            {/* Layout routing */}
            {isOrbit ? (
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    {/* Left Column info */}
                    <div className="space-y-6">
                        <Text
                            variant="caption"
                            className="font-mono tracking-widest text-white/40 uppercase"
                        >
                            Interactive Stack
                        </Text>
                        {title && (
                            <Text
                                variant="h2"
                                className="text-4xl leading-tight font-bold tracking-tight md:text-5xl"
                            >
                                {title}
                            </Text>
                        )}
                        {subtitle && (
                            <Text variant="body" className="text-white/60">
                                {subtitle}
                            </Text>
                        )}
                    </div>

                    {/* Right Column Orbit */}
                    <div className="relative flex h-[380px] w-full items-center justify-center">
                        <div className="text-surface-raised z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white font-bold shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                            OVOLL
                        </div>
                        <div
                            style={{ width: radius * 2, height: radius * 2 }}
                            className="pointer-events-none absolute rounded-full border border-white/5"
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ ease: 'linear', duration: speed, repeat: Infinity }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            {techs.map((tech, idx) => {
                                const angle = (idx * 360) / techs.length;
                                const x = radius * Math.cos((angle * Math.PI) / 180);
                                const y = radius * Math.sin((angle * Math.PI) / 180);

                                return (
                                    <motion.div
                                        key={idx}
                                        style={{ x, y }}
                                        className="bg-surface-raised/90 hover:text-surface-raised absolute flex cursor-pointer flex-col items-center justify-center rounded-xl border border-white/10 p-4 text-center shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-white"
                                    >
                                        <motion.div
                                            animate={{ rotate: -360 }}
                                            transition={{
                                                ease: 'linear',
                                                duration: speed,
                                                repeat: Infinity,
                                            }}
                                        >
                                            <span className="block font-mono text-xs font-bold tracking-wider">
                                                {tech.name}
                                            </span>
                                            <span className="mt-1 block text-[10px] leading-none opacity-50">
                                                {tech.desc}
                                            </span>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
                    {techs.map((tech, idx) => (
                        <Glass
                            key={idx}
                            className="flex h-[140px] cursor-pointer flex-col items-center justify-center space-y-2 rounded-2xl border border-white/5 bg-white/[0.01] p-6 text-center transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]"
                        >
                            <Text
                                variant="h6"
                                className="text-sm font-bold tracking-tight text-white"
                            >
                                {tech.name}
                            </Text>
                            <Text
                                variant="body"
                                className="text-[10px] leading-tight text-white/40"
                            >
                                {tech.desc}
                            </Text>
                        </Glass>
                    ))}
                </div>
            )}
        </div>
    );
}
