import { motion } from 'framer-motion';
import { MapPin, Clock, Mail, Phone } from 'lucide-react';
import { MouseReactiveCard } from '@/components/ui/MouseReactiveCard';

interface Office {
    city?: string;
    address?: string;
    business_hours?: string;
    email?: string;
    phone?: string;
}

export default function OfficeInformation({ offices = [] }: { offices?: Office[] }) {
    if (!offices || offices.length === 0) {
        return null;
    }

    return (
        <section className="relative z-10 py-24">
            <div className="container mx-auto max-w-6xl px-6">
                <div className="mb-16 md:text-center">
                    <h2 className="mb-6 text-4xl font-bold tracking-tighter text-white md:text-5xl">
                        Our Offices
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-white/50">
                        Come visit us. We have offices in key locations to serve our global client
                        base.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {offices.map((office, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="flex"
                        >
                            <MouseReactiveCard className="group flex w-full flex-col rounded-3xl border border-[#14B8A6]/15 bg-[#0E1624]/60 p-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500">
                                <h3 className="mb-6 flex items-center text-2xl font-bold text-white transition-colors group-hover:text-[#00D1FF]">
                                    <span className="mr-3 h-2 w-2 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] shadow-[0_0_10px_rgba(20,184,166,0.5)]"></span>
                                    {office.city || 'Global HQ'}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start text-white/60">
                                        <MapPin className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-[#14B8A6]" />
                                        <span>{office.address}</span>
                                    </div>
                                    <div className="flex items-start text-white/60">
                                        <Clock className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-[#14B8A6]" />
                                        <span>{office.business_hours || 'Mon-Fri, 9am-6pm'}</span>
                                    </div>
                                    {office.email && (
                                        <div className="flex items-center text-white/60">
                                            <Mail className="mr-3 h-5 w-5 shrink-0 text-[#14B8A6]" />
                                            <a
                                                href={`mailto:${office.email}`}
                                                className="transition-colors hover:text-[#00D1FF]"
                                            >
                                                {office.email}
                                            </a>
                                        </div>
                                    )}
                                    {office.phone && (
                                        <div className="flex items-center text-white/60">
                                            <Phone className="mr-3 h-5 w-5 shrink-0 text-[#14B8A6]" />
                                            <a
                                                href={`tel:${office.phone}`}
                                                className="transition-colors hover:text-[#00D1FF]"
                                            >
                                                {office.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </MouseReactiveCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
