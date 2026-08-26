import { motion } from 'framer-motion';
import { Mail, MessageCircle, Briefcase, MapPin } from 'lucide-react';
import { MouseReactiveCard } from '@/components/ui/MouseReactiveCard';

const iconMap: Record<string, React.ReactNode> = {
    email: <Mail className="h-6 w-6" />,
    whatsapp: <MessageCircle className="h-6 w-6" />,
    career: <Briefcase className="h-6 w-6" />,
    location: <MapPin className="h-6 w-6" />,
};

interface ContactOption {
    type?: string;
    url?: string;
    title: string;
    description: string;
}

export default function ContactOptions({ options = [] }: { options?: ContactOption[] }) {
    if (!options || options.length === 0) {
        return null;
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    } as const;

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
        },
    } as const;

    return (
        <section className="relative z-10 py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {options.map((option, index) => (
                        <motion.a
                            key={index}
                            variants={itemVariant}
                            href={option.url || '#'}
                            target={option.url?.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <MouseReactiveCard className="flex flex-col items-center rounded-3xl border border-[#14B8A6]/15 bg-[#0E1624]/60 p-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#14B8A6]/20 bg-[#14B8A6]/10 text-[#00D1FF] transition-transform duration-500 group-hover:scale-110 group-hover:border-[#14B8A6]/50 group-hover:bg-[#14B8A6]/20">
                                    {(option.type && iconMap[option.type]) || (
                                        <Mail className="h-6 w-6" />
                                    )}
                                </div>
                                <h3 className="mb-3 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#00D1FF]">
                                    {option.title}
                                </h3>
                                <p className="text-sm text-white/50 transition-colors group-hover:text-white/70">
                                    {option.description}
                                </p>
                            </MouseReactiveCard>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
