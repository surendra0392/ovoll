import { usePage } from '@inertiajs/react';
import React from 'react';
import { siteConfig } from '@/config';
import { LandingLayout } from '@/layouts';
import type { SiteSettings } from '@/types/cms';
import LegalDocument from './LegalDocument';
import type { LegalSection } from './LegalDocument';

const fallbackSections: LegalSection[] = [
    {
        heading: 'Agreement to Terms',
        body: [
            `These Terms of Service ("Terms") govern your access to and use of the website and services provided by ${siteConfig.company.legalName} ("OVOLL", "we", "us", or "our"). By accessing or using the site, you agree to be bound by these Terms.`,
            'If you do not agree to these Terms, you may not access or use the site or our services.',
        ],
    },
    {
        heading: 'Use of the Site',
        body: [
            'You agree to use the site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else’s use of the site. Prohibited behaviour includes the following:',
        ],
        bullets: [
            'Attempting to gain unauthorised access to the site, its servers, or any connected systems.',
            'Introducing malware, viruses, or any other malicious or harmful code.',
            'Scraping, harvesting, or collecting data from the site without our prior written consent.',
            'Using the site to transmit unsolicited or unauthorised advertising or spam.',
        ],
    },
    {
        heading: 'Services & Proposals',
        body: [
            'Any project undertaken by OVOLL is governed by a separate written agreement or statement of work that defines scope, deliverables, timelines, and fees. Information on this site, including estimates produced by our calculators, is provided for general guidance only and does not constitute a binding offer.',
        ],
    },
    {
        heading: 'Intellectual Property',
        body: [
            'All content on this site — including text, graphics, logos, designs, code, and the arrangement of them — is owned by or licensed to OVOLL and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any part of the site without our prior written permission.',
            'Ownership of deliverables produced during a client engagement is governed by the applicable statement of work.',
        ],
    },
    {
        heading: 'User Submissions',
        body: [
            'When you submit information through our forms — such as a project brief or message — you confirm that you have the right to share that information and that it is accurate. You grant us a limited licence to use the submitted information for the purpose of responding to and delivering the services you request.',
        ],
    },
    {
        heading: 'Third-Party Links',
        body: [
            'The site may contain links to third-party websites or services that we do not own or control. We are not responsible for the content, policies, or practices of any third-party sites, and you access them at your own risk.',
        ],
    },
    {
        heading: 'Disclaimer of Warranties',
        body: [
            'The site is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.',
        ],
    },
    {
        heading: 'Limitation of Liability',
        body: [
            'To the fullest extent permitted by law, OVOLL shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising from your use of, or inability to use, the site. Our total liability for any claim relating to the site shall not exceed the amount you paid us, if any, for access to the site.',
        ],
    },
    {
        heading: 'Indemnification',
        body: [
            'You agree to indemnify and hold harmless OVOLL and its officers, employees, and agents from any claims, liabilities, damages, and expenses arising out of your use of the site or your breach of these Terms.',
        ],
    },
    {
        heading: 'Termination',
        body: [
            'We may suspend or terminate your access to the site at any time, without notice, if we believe you have violated these Terms. Provisions that by their nature should survive termination will remain in effect.',
        ],
    },
    {
        heading: 'Governing Law',
        body: [
            'These Terms are governed by and construed in accordance with the laws of the jurisdiction in which OVOLL is established, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts of that jurisdiction.',
        ],
    },
    {
        heading: 'Changes to These Terms',
        body: [
            'We may revise these Terms from time to time. The most current version will always be posted on this page with an updated "last updated" date. Your continued use of the site after changes take effect constitutes acceptance of the revised Terms.',
        ],
    },
];

interface LegalPageProps {
    name?: string;
    updated_at?: string;
    content?: { sections?: LegalSection[] };
}

export default function Terms({ page }: { page?: LegalPageProps }) {
    const { siteSettings } = usePage<{ siteSettings?: SiteSettings }>().props;
    const cmsHtml = siteSettings?.site_info?.terms_of_service;
    const cmsSections = page?.content?.sections;

    return (
        <LegalDocument
            title={page?.name || 'Terms of Service'}
            eyebrow="Legal // Terms"
            headline="Terms of Service"
            intro="The rules, guidelines, and agreements for using our services."
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

Terms.layout = (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;
