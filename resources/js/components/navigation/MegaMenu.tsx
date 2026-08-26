import { useNavStore } from '@/store/useNavStore';
import { cn } from '@/utils';
import { Container } from '../ui/Container';

interface MegaMenuSection {
    title: string;
    items: { label: string; href: string; description?: string }[];
}

interface MegaMenuProps {
    sections: MegaMenuSection[];
    menuName: string;
}

export function MegaMenu({ sections, menuName }: MegaMenuProps) {
    const { isMegaMenuOpen, activeMegaMenu } = useNavStore();
    const isActive = isMegaMenuOpen && activeMegaMenu === menuName;

    return (
        <div
            className={cn(
                'absolute top-full right-0 left-0 z-[var(--z-index-dropdown)] transition-all duration-300',
                isActive
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-2 opacity-0',
            )}
        >
            <div className="bg-surface-raised/90 border-t border-[#14B8A6]/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <Container className="relative py-12">
                    {/* Inner subtle glow */}
                    <div className="pointer-events-none absolute top-0 left-1/4 h-[200px] w-[400px] rounded-full bg-[#14B8A6]/5 blur-3xl" />

                    <div className="relative z-10 grid grid-cols-3 gap-12">
                        {sections.map((section) => (
                            <div key={section.title}>
                                <h3 className="mb-6 text-xs font-semibold tracking-widest text-[#14B8A6] uppercase">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.items.map((item) => (
                                        <li key={item.href}>
                                            <a
                                                href={item.href}
                                                className="group -m-3 block rounded-xl p-3 transition-all duration-300 hover:bg-white/5"
                                            >
                                                <span className="text-sm font-medium text-white/80 transition-colors group-hover:text-white">
                                                    {item.label}
                                                </span>
                                                {item.description && (
                                                    <p className="mt-1.5 text-xs text-white/40 transition-colors group-hover:text-white/60">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    );
}
