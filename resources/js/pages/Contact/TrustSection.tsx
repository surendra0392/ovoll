import { motion } from 'framer-motion';
import { Image } from '@/components/ui/Image';

interface TrustContent {
    title?: string;
    subtitle?: string;
    logos?: Array<{ url: string; alt?: string }>;
    stats?: Array<{ value: string; label: string }>;
}

export default function TrustSection({ trustContent }: { trustContent?: TrustContent }) {
    if (!trustContent) {
        return null;
    }

    return (
        <section className="relative overflow-hidden py-32 text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#14B8A6]/10 via-transparent to-transparent opacity-50" />

            <div className="relative z-10 container mx-auto px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="mb-8 bg-gradient-to-r from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-5xl lg:text-6xl"
                    >
                        {trustContent.title || 'Trusted by innovative companies worldwide'}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className="mb-20 text-xl leading-relaxed text-white/50"
                    >
                        {trustContent.subtitle ||
                            'We build long-term partnerships based on trust, transparency, and exceptional results.'}
                    </motion.p>

                    {trustContent.logos && trustContent.logos.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 1 }}
                            className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 md:gap-24"
                        >
                            {trustContent.logos.map((logo, idx: number) => (
                                <Image
                                    key={idx}
                                    src={logo.url}
                                    alt={logo.alt || 'Partner logo'}
                                    className="h-8 object-contain transition-all hover:scale-110 md:h-12"
                                />
                            ))}
                        </motion.div>
                    )}

                    {trustContent.stats && trustContent.stats.length > 0 && (
                        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-[#14B8A6]/10 pt-16 md:grid-cols-4">
                            {trustContent.stats.map((stat, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 * idx }}
                                    className="group bg-surface-raised/40 rounded-3xl border border-[#14B8A6]/10 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#14B8A6]/30 hover:bg-[#14B8A6]/5 hover:shadow-[0_8px_30px_rgba(20,184,166,0.1)]"
                                >
                                    <div className="mb-3 bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] bg-clip-text text-5xl font-bold text-transparent transition-transform duration-500 group-hover:scale-110 md:text-6xl">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-medium tracking-widest text-white/50 uppercase md:text-base">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
