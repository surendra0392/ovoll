import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { AmbientGlow } from '@/components/vfx/AmbientGlow';
import { Aurora } from '@/components/vfx/Aurora';
import { GridPerspective } from '@/components/vfx/GridPerspective';
import { cn } from '@/utils';

// Import type engines
import { ContactSection } from './ContactSection';
import { CtaSection } from './CtaSection';
import { FaqSection } from './FaqSection';
import { FeaturesSection } from './FeaturesSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { IndustriesSection } from './IndustriesSection';
import { LogoCloudSection } from './LogoCloudSection';
import { ProcessSection } from './ProcessSection';
import { ServicesSection } from './ServicesSection';
import { StatsSection } from './StatsSection';
import { TechnologySection } from './TechnologySection';
import { TestimonialsSection } from './TestimonialsSection';
import type { SectionData } from './types';

// Import VFX backgrounds

interface SectionRendererProps {
    section: SectionData;
}

export function SectionRenderer({ section }: SectionRendererProps) {
    const { type, settings = {} } = section;
    const { theme = 'dark', padding = 'md', background = 'none' } = settings;

    // Map padding levels to Tailwind padding classes
    const paddingClasses = {
        none: 'py-0',
        sm: 'py-8 md:py-12',
        md: 'py-16 md:py-24',
        lg: 'py-24 md:py-36',
        xl: 'py-32 md:py-48',
    }[padding];

    // Map theme styles (OVOLL Brand Colors)
    const themeClasses = {
        light: 'bg-white text-surface-raised border-[#14B8A6]/10',
        dark: 'bg-surface-raised text-white border-[#14B8A6]/10',
        glass: 'bg-surface-raised/60 backdrop-blur-md text-white border-[#14B8A6]/20',
    }[theme];

    const renderContent = () => {
        switch (type) {
            case 'hero':
                return <HeroSection section={section} />;
            case 'logo_cloud':
                return <LogoCloudSection section={section} />;
            case 'services':
                return <ServicesSection section={section} />;
            case 'features':
                return <FeaturesSection section={section} />;
            case 'process':
                return <ProcessSection section={section} />;
            case 'stats':
                return <StatsSection section={section} />;
            case 'industries':
                return <IndustriesSection section={section} />;
            case 'technology':
                return <TechnologySection section={section} />;
            case 'testimonials':
                return <TestimonialsSection section={section} />;
            case 'faq':
                return <FaqSection section={section} />;
            case 'cta':
                return <CtaSection section={section} />;
            case 'contact':
                return <ContactSection section={section} />;
            case 'footer':
                return <FooterSection section={section} />;
            default:
                return null;
        }
    };

    return (
        <section
            className={cn(
                'relative w-full overflow-hidden transition-colors duration-500',
                paddingClasses,
                themeClasses,
            )}
        >
            {/* Background effects */}
            {background === 'aurora' && (
                <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
                    <Aurora colors={['#14B8A6', '#00D1FF', '#081320']} />
                </div>
            )}
            {background === 'grid' && (
                <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
                    <GridPerspective gridSize={40} />
                </div>
            )}
            {background === 'gradient' && (
                <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[#14B8A6]/[0.05]" />
            )}
            {background === 'noise' && (
                <div className="pointer-events-none absolute inset-0 z-0">
                    <NoiseOverlay opacity={0.03} />
                </div>
            )}

            {/* Central Glow option */}
            {settings.effects?.includes('glow') && (
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20">
                    <AmbientGlow color={theme === 'light' ? '#00D1FF' : '#14B8A6'} radius={300} />
                </div>
            )}

            {/* Core Section Render */}
            <div className="relative z-10 w-full">{renderContent()}</div>
        </section>
    );
}
