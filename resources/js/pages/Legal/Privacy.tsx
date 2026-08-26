import { usePage } from '@inertiajs/react';
import React from 'react';
import { siteConfig } from '@/config';
import { LandingLayout } from '@/layouts';
import type { SiteSettings } from '@/types/cms';
import LegalDocument from './LegalDocument';
import type { LegalSection } from './LegalDocument';

const fallbackSections: LegalSection[] = [
    {
        heading: 'Overview',
        body: [
            `${siteConfig.company.legalName} ("OVOLL", "we", "us", or "our") respects your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains what information we collect, how we use it, the legal bases we rely on, and the choices available to you.`,
            'By using our website or services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the site.',
        ],
    },
    {
        heading: 'Information We Collect',
        body: [
            'We collect information in three broad categories, described below. We only collect what we need to run our business and deliver our services.',
        ],
        bullets: [
            'Information you provide directly: your name, email address, phone number, company name, project brief, budget range, and any messages you send through our contact or discovery forms.',
            'Information collected automatically: IP address, browser type, device information, referring pages, and interaction events, gathered through cookies and similar technologies.',
            'Information from third parties: analytics providers and, where you engage us, billing or communication platforms used to deliver a project.',
        ],
    },
    {
        heading: 'How We Use Your Information',
        body: ['We use the information we collect for the following purposes:'],
        bullets: [
            'To respond to enquiries, prepare proposals, and deliver the services you request.',
            'To operate, maintain, and improve our website and its performance.',
            'To send administrative communications, such as confirmations and updates about a project.',
            'To send marketing communications where you have opted in, which you can withdraw at any time.',
            'To detect, prevent, and address fraud, abuse, security incidents, and technical issues.',
            'To comply with legal obligations and enforce our agreements.',
        ],
    },
    {
        heading: 'Legal Bases for Processing',
        body: [
            'Where applicable law requires it (for example, the GDPR), we process personal data on the following legal bases: your consent; the performance of a contract with you; compliance with a legal obligation; and our legitimate interests in operating and improving our business, provided those interests are not overridden by your rights.',
        ],
    },
    {
        heading: 'Cookies & Tracking',
        body: [
            'We use cookies and similar technologies to keep the site functioning, remember your preferences, and understand how the site is used. You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of the site.',
        ],
    },
    {
        heading: 'Sharing & Disclosure',
        body: [
            'We do not sell your personal data. We share information only in the limited circumstances below:',
        ],
        bullets: [
            'With service providers who process data on our behalf under appropriate confidentiality and security obligations.',
            'When required by law, regulation, legal process, or enforceable governmental request.',
            'To protect the rights, property, and safety of OVOLL, our clients, or the public.',
            'In connection with a merger, acquisition, or sale of assets, with notice where required.',
        ],
    },
    {
        heading: 'Data Retention',
        body: [
            'We retain personal data only for as long as necessary to fulfil the purposes described in this policy, to comply with our legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, we securely delete or anonymise it.',
        ],
    },
    {
        heading: 'Data Security',
        body: [
            'We implement technical and organisational measures designed to protect your data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.',
        ],
    },
    {
        heading: 'Your Rights',
        body: [
            'Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal data, to object to processing, and to data portability. You may also withdraw consent at any time where processing is based on consent. To exercise these rights, contact us using the details below.',
        ],
    },
    {
        heading: "Children's Privacy",
        body: [
            'Our services are not directed to individuals under the age of 16, and we do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will take steps to delete it.',
        ],
    },
    {
        heading: 'International Transfers',
        body: [
            'Your information may be processed in countries other than your own. Where we transfer data internationally, we take steps to ensure an adequate level of protection consistent with applicable law.',
        ],
    },
    {
        heading: 'Changes to This Policy',
        body: [
            'We may update this Privacy Policy from time to time. When we do, we will revise the "last updated" date at the top of this page. Material changes will be communicated through the site or by other appropriate means.',
        ],
    },
];

interface LegalPageProps {
    name?: string;
    updated_at?: string;
    content?: { sections?: LegalSection[] };
}

export default function Privacy({ page }: { page?: LegalPageProps }) {
    const { siteSettings } = usePage<{ siteSettings?: SiteSettings }>().props;
    const cmsHtml = siteSettings?.site_info?.privacy_policy;
    const cmsSections = page?.content?.sections;

    return (
        <LegalDocument
            title={page?.name || 'Privacy Policy'}
            eyebrow="Legal // Privacy"
            headline="Privacy Policy"
            intro="How we collect, use, and protect your information."
            lastUpdated={page?.updated_at || '14 May 2024'}
            htmlContent={cmsHtml}
            sections={
                cmsSections && cmsSections.length > 0
                    ? cmsSections
                    : !cmsHtml
                      ? fallbackSections
                      : undefined
            }
            contactEmail={siteSettings?.contact_info?.email || siteConfig.company.email}
        />
    );
}

Privacy.layout = (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;
