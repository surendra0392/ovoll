import { motion } from 'framer-motion';
import { Text } from '@/components/ui';

interface LogoItem {
    name: string;
    icon: string;
}

interface LogosSectionProps {
    content: {
        logos: LogoItem[];
    };
    settings: {
        marquee_speed?: number;
        direction?: 'left' | 'right';
        hover_pause?: boolean;
    };
}

export function LogosSection({ content, settings }: LogosSectionProps) {
    const speed = settings.marquee_speed ?? 25;
    const direction = settings.direction ?? 'left';

    // Duplicate logos to ensure seamless loop
    const marqueeLogos = [...content.logos, ...content.logos, ...content.logos];

    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-y border-white/[0.05] bg-[#0E1624] py-16">
            {/* Gradient Mask Overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0E1624] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0E1624] to-transparent" />

            <div className="flex w-full items-center">
                <motion.div
                    animate={{
                        x: direction === 'left' ? [0, -1000] : [-1000, 0],
                    }}
                    transition={{
                        ease: 'linear',
                        duration: speed,
                        repeat: Infinity,
                    }}
                    className="flex min-w-max items-center gap-16 px-8 whitespace-nowrap"
                >
                    {marqueeLogos.map((logo, idx) => (
                        <div
                            key={`${logo.name}-${idx}`}
                            className="group flex transform cursor-pointer items-center gap-2 opacity-40 grayscale filter transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                        >
                            {/* Render a beautiful mockup SVG logo based on name */}
                            <MockupLogo icon={logo.icon} />
                            <Text
                                variant="h6"
                                className="m-0 font-mono leading-none font-semibold tracking-wider text-white"
                            >
                                {logo.name}
                            </Text>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function MockupLogo({ icon }: { icon: string }) {
    switch (icon) {
        case 'stripe':
            return (
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.9 11.2c0-1-.6-1.5-1.7-1.5-1.1 0-2.3.4-3.3.9l-.6-4c1.3-.6 3.1-1 4.9-1 4.1 0 6.6 2 6.6 5.6 0 5.4-4 6.7-6.7 7.7-1 .3-1.6.7-1.6 1.3 0 .8.8 1.2 1.9 1.2 1.4 0 2.8-.5 3.8-1.1l.6 3.9c-1.3.6-3.2 1.1-5.1 1.1-4.2 0-7.2-2-7.2-5.7 0-5.3 4.2-6.7 6.8-7.7.9-.3 1.6-.7 1.6-1.3z" />
                </svg>
            );
        case 'vercel':
            return (
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L24 22H0L12 1Z" />
                </svg>
            );
        case 'linear':
            return (
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
            );
        case 'framer':
            return (
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 2h16v8h-8L4 2zm0 8h8v8H4v-8zm8 8h8l-8 6v-6z" />
                </svg>
            );
        case 'openai':
            return (
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8z" />
                </svg>
            );
        default:
            return (
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 22h20L12 2z" />
                </svg>
            );
    }
}
