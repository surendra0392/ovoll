export interface SectionMedia {
    type: 'image' | 'video' | '3d';
    url: string;
    alt?: string;
    config?: Record<string, unknown>;
}

export interface SectionCta {
    label: string;
    url: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface SectionSettings {
    theme?: 'light' | 'dark' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    background?: 'solid' | 'gradient' | 'mesh' | 'grid' | 'aurora' | 'noise' | 'particles' | 'none';
    effects?: string[]; // spotlight, glow, orbital, etc.
    animation?: {
        preset?: 'reveal' | 'fade' | 'slide' | 'scale' | 'parallax' | 'none';
        delay?: number;
        duration?: number;
        stagger?: number;
    };
    seo?: {
        tag?: 'h1' | 'h2' | 'h3';
        srOnly?: string;
    };
    /** Orbit layout tuning (TechnologySection, variant="orbit"). */
    orbit_radius?: number;
    orbit_speed?: number;
}

export interface SectionData {
    id: string | number;
    type:
        | 'hero'
        | 'logo_cloud'
        | 'services'
        | 'features'
        | 'process'
        | 'stats'
        | 'industries'
        | 'technology'
        | 'testimonials'
        | 'faq'
        | 'cta'
        | 'contact'
        | 'footer';
    variant: string;
    title: string;
    subtitle?: string;
    badge?: string;
    content?: unknown;
    media?: SectionMedia[];
    ctas?: SectionCta[];
    settings?: SectionSettings;
}
