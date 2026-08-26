import type { Auth } from '@/types/auth';
import type { SiteSettings } from '@/types/cms';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            settings?: SiteSettings;
            seo?: {
                title?: string;
                description?: string;
                canonical?: string;
                image?: string;
                type?: string;
                schema?: string | Record<string, unknown>;
            };
            [key: string]: unknown;
        };
    }
}
