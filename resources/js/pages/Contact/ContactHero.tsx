import { motion } from 'framer-motion';

const renderHeading = (text: string) => {
    if (text === "Let's Build Something Extraordinary.") {
        return (
            <>
                Let's Build{' '}
                <span className="text-gradient bg-gradient-to-r from-[#14B8A6] to-[#00D1FF]">
                    Something Extraordinary.
                </span>
            </>
        );
    }

    const words = text.split(' ');

    if (words.length > 2) {
        const firstPart = words.slice(0, -2).join(' ');
        const lastPart = words.slice(-2).join(' ');

        return (
            <>
                {firstPart}{' '}
                <span className="text-gradient bg-gradient-to-r from-[#14B8A6] to-[#00D1FF]">
                    {lastPart}
                </span>
            </>
        );
    }

    return text;
};

export default function ContactHero({
    heroContent,
}: {
    heroContent?: {
        title?: string;
        subtitle?: string;
    };
}) {
    return (
        <section className="relative flex min-h-[60vh] items-center py-20 text-white lg:py-32">
            {/* Animated Orbital Background */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-30">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                    className="absolute h-[800px] w-[800px] rounded-full border border-[#14B8A6]/10"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                    className="absolute h-[600px] w-[600px] rounded-full border border-[#00D1FF]/10"
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                    className="absolute h-[400px] w-[400px] rounded-full border border-dashed border-[#14B8A6]/20"
                />
                <div className="from-surface-raised absolute inset-0 z-10 bg-gradient-to-t via-transparent to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mx-auto mb-8 max-w-4xl text-5xl leading-[1.1] font-bold tracking-tighter text-white md:text-7xl"
                >
                    {renderHeading(heroContent?.title || "Let's Build Something Extraordinary.")}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl"
                >
                    {heroContent?.subtitle ||
                        'We partner with visionary brands to create digital experiences that drive growth.'}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                >
                    <a
                        href="#contact-form"
                        className="text-surface-raised inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] px-8 py-4 font-semibold shadow-[0_0_20px_rgba(20,184,166,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]"
                    >
                        Start a Project
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
