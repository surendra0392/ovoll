<?php

namespace Database\Seeders;

use App\Models\EmailTemplate;
use App\Models\Faq;
use App\Models\Lead;
use App\Models\NewsletterSubscriber;
use App\Models\Office;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear old records to prevent duplicate key or multiple settings issues
        Office::truncate();
        Faq::truncate();
        EmailTemplate::truncate();

        // 1. Seed Offices
        Office::create([
            'name' => 'London Headquarters',
            'address' => '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, UK',
            'business_hours' => 'Mon - Fri, 9:00 AM - 6:00 PM (GMT)',
            'email' => 'london@ovoll.com',
            'phone' => '+44 20 7946 0958',
            'is_primary' => true,
        ]);

        Office::create([
            'name' => 'New York Studio',
            'address' => 'One World Trade Center, Suite 8500, New York, NY 10007, USA',
            'business_hours' => 'Mon - Fri, 9:00 AM - 6:00 PM (EST)',
            'email' => 'ny@ovoll.com',
            'phone' => '+1 212 555 0198',
            'is_primary' => false,
        ]);

        // 3. Seed FAQs
        $faqs = [
            [
                'question' => 'How does OVOLL manage latency budgets?',
                'answer' => 'We monitor server response times using Laravel Pail and Scout integration. All JSON API payloads are structured to resolve within a strict 50ms constraint, backed by Redis caching layers.',
                'is_active' => true,
                'order' => 1,
            ],
            [
                'question' => 'What is the OVOLL design language system?',
                'answer' => 'Our design system combines Outfit typography ratios, custom back-blur parameters, and cubic-bezier(0.16, 1, 0.3, 1) transition curves to create a sense of mechanical precision and luxury.',
                'is_active' => true,
                'order' => 2,
            ],
            [
                'question' => 'Do you collaborate on long-term maintenance retainers?',
                'answer' => 'Yes. We establish service-level agreements (SLAs) with clients to monitor server uptimes, performance metrics, and execute regular design updates.',
                'is_active' => true,
                'order' => 3,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }

        // 4. Seed Email Templates
        EmailTemplate::create([
            'identifier' => 'visitor_confirmation',
            'subject' => 'Initiated: OVOLL Partnership | Ref {first_name}-{company_name}',
            'body' => '<div style="background:#030712;color:#f8fafc;padding:32px;font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid rgba(46,196,165,0.1);">'.
                      '<h2 style="color:#2EC4A5;font-size:20px;text-transform:uppercase;letter-spacing:1px;margin-bottom:24px;">First Chapter Initiated</h2>'.
                      '<p>Hello {first_name},</p>'.
                      '<p>Thank you for initiating a project discovery with OVOLL. We have registered your parameters in our partnership pipeline.</p>'.
                      '<h3 style="color:#00D1FF;font-size:14px;text-transform:uppercase;margin-top:24px;">Expected Next Steps:</h3>'.
                      '<ul style="padding-left:20px;line-height:1.6;">'.
                      '<li><strong>12-Hour Review:</strong> Our engineering leads will review your challenge.</li>'.
                      '<li><strong>Discovery Alignment:</strong> We will reach out to schedule a 30-minute technical review session.</li>'.
                      '</ul>'.
                      '<p style="margin-top:32px;color:rgba(255,255,255,0.4);font-size:11px;">OVOLL Partner Network // Secure Telemetry Reference</p>'.
                      '</div>',
            'is_active' => true,
        ]);

        EmailTemplate::create([
            'identifier' => 'team_notification',
            'subject' => 'Incoming Partnership Inquiry: {company_name} | Score: {score}',
            'body' => '<div style="background:#030712;color:#f8fafc;padding:32px;font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid rgba(46,196,165,0.1);">'.
                      '<h2 style="color:#00D1FF;font-size:20px;text-transform:uppercase;letter-spacing:1px;margin-bottom:24px;">New Lead Parameters Registered</h2>'.
                      '<table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13px;">'.
                      '<tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);">Company</td><td style="padding:8px 0;font-weight:bold;">{company_name}</td></tr>'.
                      '<tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);">Contact</td><td style="padding:8px 0;font-weight:bold;">{first_name} {last_name}</td></tr>'.
                      '<tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);">Email</td><td style="padding:8px 0;font-weight:bold;">{email}</td></tr>'.
                      '<tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);">Lead Score</td><td style="padding:8px 0;font-weight:bold;color:#2EC4A5;">{score} / 100</td></tr>'.
                      '<tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);">Priority</td><td style="padding:8px 0;font-weight:bold;color:#f59e0b;">{priority}</td></tr>'.
                      '</table>'.
                      '<p>Log in to the administrator portal to review full project parameters and trigger the discovery kickoff scope.</p>'.
                      '</div>',
            'is_active' => true,
        ]);

        // 5. Seed Sample Leads
        Lead::truncate();
        $leads = [
            [
                'first_name' => 'Alexander',
                'last_name' => 'Vance',
                'email' => 'a.vance@apexsystems.io',
                'phone' => '+1 415 890 2314',
                'company_name' => 'Apex Systems Global',
                'company_size' => '100+ Enterprise',
                'industry' => 'Fintech',
                'services' => ['Brand Strategy & Identity', 'Website Development'],
                'budget_range' => '$50k+ Enterprise',
                'timeline' => 'Immediate (1 month)',
                'goals_challenges' => 'Enterprise rebrand and high-speed WebGL investor platform migration.',
                'status' => 'qualified',
                'priority' => 'high',
                'source' => 'Direct Discovery',
                'country' => 'United States',
            ],
            [
                'first_name' => 'Elena',
                'last_name' => 'Rostova',
                'email' => 'elena@luminaryluxury.ch',
                'phone' => '+41 22 819 4400',
                'company_name' => 'Luminary Luxury Group',
                'company_size' => '50-100',
                'industry' => 'Luxury Retail',
                'services' => ['Packaging Architecture', 'Design Systems'],
                'budget_range' => '$25k - $50k',
                'timeline' => '1 - 3 months',
                'goals_challenges' => 'Global packaging architecture rollout and FMCG digital flagship store.',
                'status' => 'proposal',
                'priority' => 'high',
                'source' => 'Organic Search',
                'country' => 'Switzerland',
            ],
            [
                'first_name' => 'Liam',
                'last_name' => 'O\'Connor',
                'email' => 'liam@aetherdynamics.co.uk',
                'phone' => '+44 20 7946 0192',
                'company_name' => 'Aether Dynamics',
                'company_size' => '20-50',
                'industry' => 'AI & Robotics',
                'services' => ['Full-Stack Engineering', 'AI Automation'],
                'budget_range' => '$50k+ Enterprise',
                'timeline' => 'Immediate (1 month)',
                'goals_challenges' => 'Autonomous telemetry pipeline and interactive 3D particle dashboard.',
                'status' => 'closed_won',
                'priority' => 'medium',
                'source' => 'Knowledge Hub',
                'country' => 'United Kingdom',
            ],
            [
                'first_name' => 'Maya',
                'last_name' => 'Patel',
                'email' => 'maya.patel@solsticelabs.io',
                'phone' => '+91 98200 12345',
                'company_name' => 'Solstice Labs',
                'company_size' => '10-20',
                'industry' => 'Healthtech',
                'services' => ['Mobile App Development', 'Design Systems'],
                'budget_range' => '$10k - $25k',
                'timeline' => '3 - 6 months',
                'goals_challenges' => 'Patient-first mobile application and cross-platform design token system.',
                'status' => 'new',
                'priority' => 'medium',
                'source' => 'Studio R&D Tools',
                'country' => 'India',
            ],
        ];

        foreach ($leads as $leadData) {
            Lead::create($leadData);
        }

        // 6. Seed Newsletter Subscribers
        NewsletterSubscriber::truncate();
        $subscribers = [
            ['email' => 'sarah.design@studio.io', 'first_name' => 'Sarah', 'last_name' => 'Jenkins', 'status' => 'subscribed', 'verified_at' => now()],
            ['email' => 'marcus.eng@vanguard.tech', 'first_name' => 'Marcus', 'last_name' => 'Vogel', 'status' => 'subscribed', 'verified_at' => now()],
            ['email' => 'priya.growth@scale.dev', 'first_name' => 'Priya', 'last_name' => 'Sharma', 'status' => 'subscribed', 'verified_at' => now()],
            ['email' => 'alex@nexus.ai', 'first_name' => 'Alex', 'last_name' => 'Mercer', 'status' => 'subscribed', 'verified_at' => now()],
            ['email' => 'elena@craft.co', 'first_name' => 'Elena', 'last_name' => 'Dubois', 'status' => 'subscribed', 'verified_at' => now()],
        ];

        foreach ($subscribers as $subscriberData) {
            NewsletterSubscriber::create($subscriberData);
        }
    }
}
