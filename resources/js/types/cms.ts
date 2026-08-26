/**
 * Shared shape of the admin-driven `settings` prop (site-wide CMS settings).
 * All fields are optional because the CMS may be unseeded — components
 * fall back to siteConfig / defaults.
 */
export interface SiteSettings {
    site?: {
        site_name?: string;
        header_logo_url?: string;
        footer_logo_url?: string;
        footer_description?: string;
    };
    contact?: {
        email?: string;
        telephone?: string;
        address?: string;
    };
    social?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        instagram?: string;
    };
    site_info?: {
        privacy_policy?: string;
        terms_of_service?: string;
    };
    contact_info?: {
        email?: string;
    };
    seo_meta?: {
        title?: string;
    };
    hero_content?: {
        subheadline?: string;
    };
    trust_section?: {
        headline?: string;
    };
    final_cta?: {
        button_text?: string;
        headline?: string;
        subheadline?: string;
    };
    partnership_timeline?: Array<{
        step: string;
        title: string;
        description: string;
    }>;
    discovery_questions?: Array<{
        id: string;
        step: number;
        question: string;
        options: string[];
    }>;
}
