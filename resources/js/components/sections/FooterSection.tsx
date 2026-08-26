import { Text } from '@/components/ui';
import { cn } from '@/utils';
import type { SectionData } from './types';

interface LinkItem {
    label: string;
    url: string;
}

interface FooterSectionProps {
    section: SectionData;
}

export function FooterSection({ section }: FooterSectionProps) {
    const { variant, content = {} } = section;
    const links: LinkItem[] = (content as { links?: LinkItem[] }).links ?? [];
    const description: string =
        (content as { description?: string }).description ?? 'Immersive creative technologies.';
    const copyright: string =
        (content as { copyright?: string }).copyright ?? '© 2026 OVOLL. All rights reserved.';

    const isMega = variant === 'mega' || variant === 'corporate';

    return (
        <div className="mx-auto w-full max-w-6xl px-6">
            {isMega ? (
                <div className="grid grid-cols-1 items-start gap-12 border-b border-white/5 pb-12 md:grid-cols-4">
                    <div className="space-y-4">
                        <Text variant="h5" className="font-bold tracking-tight text-white">
                            OVOLL
                        </Text>
                        <Text
                            variant="body"
                            className="max-w-xs text-sm leading-relaxed text-white/40"
                        >
                            {description}
                        </Text>
                    </div>

                    <div className="space-y-4">
                        <span className="font-mono text-xs tracking-wider text-white/30 uppercase">
                            Explore
                        </span>
                        <ul className="space-y-2">
                            {links.map((link, idx) => (
                                <li key={idx}>
                                    <a
                                        href={link.url}
                                        className="text-sm text-white/60 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <span className="font-mono text-xs tracking-wider text-white/30 uppercase">
                            Connect
                        </span>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Twitter / X
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <span className="font-mono text-xs tracking-wider text-white/30 uppercase">
                            Studio
                        </span>
                        <Text variant="body" className="text-sm leading-relaxed text-white/50">
                            OVOLL Studio Inc.
                            <br />
                            Awwwards Nominee 2026.
                        </Text>
                    </div>
                </div>
            ) : null}

            <div
                className={cn(
                    'flex flex-col items-center justify-between gap-4 font-mono text-xs text-white/30 md:flex-row',
                    isMega ? 'pt-12' : 'py-6',
                )}
            >
                <span>{copyright}</span>
                <div className="flex gap-6">
                    <a href="#" className="transition-colors hover:text-white">
                        Privacy Policy
                    </a>
                    <a href="#" className="transition-colors hover:text-white">
                        Terms of Service
                    </a>
                </div>
            </div>
        </div>
    );
}
