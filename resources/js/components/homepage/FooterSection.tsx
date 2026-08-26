import { Text } from '@/components/ui';

interface LinkItem {
    label: string;
    url: string;
}

interface FooterSectionProps {
    content: {
        copyright: string;
        description: string;
        links: LinkItem[];
    };
    settings: {
        layout?: string;
    };
}

export function FooterSection({ content }: FooterSectionProps) {
    return (
        <footer className="bg-surface-raised w-full border-t border-white/5 px-6 py-16 text-white">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 md:grid-cols-3">
                {/* Logo & Description */}
                <div className="space-y-4">
                    <Text variant="h5" className="font-bold tracking-tight text-white">
                        OVOLL
                    </Text>
                    <Text variant="body" className="max-w-xs text-sm leading-relaxed text-white/40">
                        {content.description}
                    </Text>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-4">
                    <div className="space-y-4">
                        <span className="font-mono text-xs tracking-wider text-white/30 uppercase">
                            Resources
                        </span>
                        <ul className="space-y-2">
                            {content.links.map((link, idx) => (
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
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-white/60 transition-colors hover:text-white"
                                >
                                    Twitter / X
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-white/60 transition-colors hover:text-white"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-white/60 transition-colors hover:text-white"
                                >
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-2 space-y-4">
                        <span className="font-mono text-xs font-bold tracking-wider text-white/30 uppercase">
                            Studio
                        </span>
                        <Text variant="body" className="text-sm leading-relaxed text-white/50">
                            OVOLL Studio Inc.
                            <br />
                            Awwwards Studio Nominee 2026.
                        </Text>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 font-mono text-xs text-white/30 md:flex-row">
                <span>{content.copyright}</span>
                <div className="flex gap-6">
                    <a href="#" className="transition-colors hover:text-white">
                        Privacy Policy
                    </a>
                    <a href="#" className="transition-colors hover:text-white">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
}
