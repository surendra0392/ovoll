import { motion } from 'framer-motion';
import type { SectionData } from './types';

interface LogoItem {
    name: string;
    icon: string;
}

interface LogoCloudSectionProps {
    section: SectionData;
}

export function LogoCloudSection({ section }: LogoCloudSectionProps) {
    const { variant, content = {}, settings = {} } = section;
    const logos: LogoItem[] = (content as { logos?: LogoItem[] }).logos ?? [];

    const isMarquee = variant === 'marquee';
    const marqueeSpeed = settings.animation?.duration ?? 25;

    // Helper to render mockup SVGs
    const renderLogoIcon = (icon: string) => {
        switch (icon.toLowerCase()) {
            case 'stripe':
                return (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.9 11.2c0-1-.6-1.5-1.7-1.5-1.1 0-2.3.4-3.3.9l-.6-4c1.3-.6 3.1-1 4.9-1 4.1 0 6.6 2 6.6 5.6 0 5.4-4 6.7-6.7 7.7-1 .3-1.6.7-1.6 1.3 0 .8.8 1.2 1.9 1.2 1.4 0 2.8-.5 3.8-1.1l.6 3.9c-1.3.6-3.2 1.1-5.1 1.1-4.2 0-7.2-2-7.2-5.7 0-5.3 4.2-6.7 6.8-7.7.9-.3 1.6-.7 1.6-1.3z" />
                    </svg>
                );
            case 'vercel':
                return (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L24 22H0L12 1Z" />
                    </svg>
                );
            case 'framer':
                return (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 2h16v8h-8L4 2zm0 8h8v8H4v-8zm8 8h8l-8 6v-6z" />
                    </svg>
                );
            default:
                return (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 22h20L12 2z" />
                    </svg>
                );
        }
    };

    if (isMarquee) {
        const marqueeLogos = [...logos, ...logos, ...logos];

        return (
            <div className="relative flex w-full items-center overflow-hidden py-6">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

                <motion.div
                    animate={{ x: [0, -800] }}
                    transition={{ ease: 'linear', duration: marqueeSpeed, repeat: Infinity }}
                    className="flex min-w-max items-center gap-16 px-6 whitespace-nowrap"
                >
                    {marqueeLogos.map((logo, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 opacity-40 transition-opacity duration-300 hover:opacity-100"
                        >
                            {renderLogoIcon(logo.icon)}
                            <span className="font-mono text-sm font-semibold tracking-wider uppercase">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        );
    }

    // Grid layout
    return (
        <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 md:grid-cols-6">
                {logos.map((logo, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="flex cursor-pointer flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100"
                    >
                        {renderLogoIcon(logo.icon)}
                        <span className="font-mono text-xs tracking-widest">{logo.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
