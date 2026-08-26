import { motion } from 'framer-motion';
import { Text, Button } from '@/components/ui';
import { cn } from '@/utils';
import type { SectionData } from './types';

interface CtaSectionProps {
    section: SectionData;
}

export function CtaSection({ section }: CtaSectionProps) {
    const { variant, title, subtitle, ctas = [] } = section;

    const isSplit = variant === 'split';
    const isGradient = variant === 'gradient';

    return (
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
            {isGradient && (
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-xl" />
            )}

            <div
                className={cn(
                    'flex flex-col items-center justify-between gap-12 rounded-3xl border border-white/5 bg-white/[0.01] p-12 md:p-20',
                    isSplit ? 'md:flex-row md:text-left' : 'text-center',
                )}
            >
                <div className={cn('space-y-4', isSplit ? 'max-w-2xl' : 'mx-auto max-w-3xl')}>
                    {title && (
                        <Text
                            variant="h2"
                            className="text-3xl font-bold tracking-tight md:text-5xl"
                        >
                            {title}
                        </Text>
                    )}
                    {subtitle && (
                        <Text variant="body" className="text-base text-white/60 md:text-lg">
                            {subtitle}
                        </Text>
                    )}
                </div>

                {ctas.length > 0 && (
                    <div className="flex shrink-0 flex-col items-center justify-center gap-4 sm:flex-row">
                        {ctas.map((cta, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    href={cta.url}
                                    variant={cta.variant ?? (idx === 0 ? 'primary' : 'outline')}
                                    className="rounded-full px-8 py-3 font-bold"
                                >
                                    {cta.label}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
