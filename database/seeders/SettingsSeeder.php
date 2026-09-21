<?php

namespace Database\Seeders;

use App\Models\GlobalSetting;
use App\Models\NavigationMenu;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class SettingsSeeder extends Seeder
{
    /**
     * Seed global settings and navigation menus so the CMS pipeline is live and
     * the admin panel has real content to edit. Uses updateOrCreate/handle keys
     * so re-running the seeder is idempotent.
     */
    public function run(): void
    {
        // 1. Provision branding files to public storage disk
        $publicDisk = Storage::disk('public');
        $publicDisk->makeDirectory('logos');
        $publicDisk->makeDirectory('favicons');

        $logoSource = public_path('images/logo.png');
        $iconSource = public_path('images/logo-icon.png');
        $faviconSource = public_path('images/favicon.png');
        $appIconSource = public_path('images/app-icon.png');

        if (File::exists($logoSource)) {
            $publicDisk->put('logos/default-logo.png', File::get($logoSource));
            $publicDisk->put('logos/logo.png', File::get($logoSource));
        }
        if (File::exists($iconSource)) {
            $publicDisk->put('logos/logo-icon.png', File::get($iconSource));
        }
        if (File::exists($faviconSource)) {
            $publicDisk->put('favicons/default-favicon.png', File::get($faviconSource));
            $publicDisk->put('favicons/favicon.png', File::get($faviconSource));
        }
        if (File::exists($appIconSource)) {
            $publicDisk->put('favicons/app-icon.png', File::get($appIconSource));
        }

        GlobalSetting::query()->updateOrCreate(
            ['id' => 1],
            [
                'site_info' => [
                    'name' => 'OVOLL',
                    'site_name' => 'OVOLL',
                    'tagline' => 'BUILD BETTER BRANDS.',
                    'description' => 'Vanguard branding and platform engineering studio building brand systems, high-converting web apps, 3D WebGL experiences, and autonomous AI architectures.',
                    'url' => 'https://ovoll.in',
                    'header_logo' => 'logos/default-logo.png',
                    'footer_logo' => 'logos/default-logo.png',
                    'favicon' => 'favicons/default-favicon.png',
                    'footer_description' => 'OVOLL is a vanguard branding and platform engineering studio. We unite strategic brand positioning, high-converting digital architectures, and real-time telemetry into compounding growth engines.',
                ],
                'contact_info' => [
                    'email' => 'hello@ovoll.in',
                    'telephone' => '+91 90000 00000',
                    'phone' => '+91 90000 00000',
                    'address' => 'Bengaluru, Karnataka, India',
                ],
                'social_links' => [
                    'twitter' => 'https://x.com/ovoll',
                    'linkedin' => 'https://linkedin.com/company/ovoll',
                    'github' => 'https://github.com/ovoll',
                    'instagram' => 'https://instagram.com/ovoll',
                ],
                'analytics_ids' => [],
                'meta_defaults' => [
                    'title' => 'OVOLL — Strategic Branding, UI/UX & Digital Product Engineering Studio',
                    'description' => 'Vanguard branding and digital product engineering studio in India serving global enterprises. We specialize in strategic brand systems, custom web apps, FMCG packaging, SaaS platforms, and AI automation.',
                    'keywords' => 'branding agency in India, strategic branding studio Bangalore, UI UX design agency Mumbai, custom web application development company India, enterprise SaaS development agency Delhi NCR, fintech product design studio Hyderabad, FMCG packaging design agency Pune, digital product engineering company India, AI automation company India, luxury brand design agency India, design systems, React Laravel full stack agency',
                    'og_image' => 'https://ovoll.in/images/logo.png',
                ],
                'brand_colors' => [
                    'primary' => '#14B8A6',
                    'accent' => '#00D1FF',
                    'background' => '#04070D',
                ],
                'theme_settings' => [],
            ],
        );

        $menus = [
            'header' => [
                'name' => 'Header Navigation',
                'items' => [
                    ['label' => 'Services', 'url' => '/services', 'target' => '_self', 'icon' => null],
                    ['label' => 'Products', 'url' => '/products', 'target' => '_self', 'icon' => null],
                    ['label' => 'About', 'url' => '/about', 'target' => '_self', 'icon' => null],
                    ['label' => 'Insights', 'url' => '/insights', 'target' => '_self', 'icon' => null],
                    ['label' => 'Hub', 'url' => '/hub', 'target' => '_self', 'icon' => null],
                    ['label' => 'Studio', 'url' => '/studio', 'target' => '_self', 'icon' => null],
                ],
            ],
            'mobile_nav' => [
                'name' => 'Mobile Drawer Navigation',
                'items' => [
                    ['label' => 'Services', 'url' => '/services', 'target' => '_self', 'icon' => null],
                    ['label' => 'Products', 'url' => '/products', 'target' => '_self', 'icon' => null],
                    ['label' => 'About', 'url' => '/about', 'target' => '_self', 'icon' => null],
                    ['label' => 'Insights', 'url' => '/insights', 'target' => '_self', 'icon' => null],
                    ['label' => 'Knowledge Hub', 'url' => '/hub', 'target' => '_self', 'icon' => null],
                    ['label' => 'Innovation Studio', 'url' => '/studio', 'target' => '_self', 'icon' => null],
                    ['label' => 'Contact Us', 'url' => '/contact', 'target' => '_self', 'icon' => null],
                ],
            ],
            'footer_company' => [
                'name' => 'Footer — Company',
                'items' => [
                    ['label' => 'About', 'url' => '/about', 'target' => '_self', 'icon' => null],
                    ['label' => 'Products', 'url' => '/products', 'target' => '_self', 'icon' => null],
                    ['label' => 'Insights', 'url' => '/insights', 'target' => '_self', 'icon' => null],
                    ['label' => 'Contact', 'url' => '/contact', 'target' => '_self', 'icon' => null],
                ],
            ],
            'footer_services' => [
                'name' => 'Footer — Services',
                'items' => [
                    ['label' => 'Branding', 'url' => '/services/branding', 'target' => '_self', 'icon' => null],
                    ['label' => 'Product Design', 'url' => '/services/product-design', 'target' => '_self', 'icon' => null],
                    ['label' => 'Website Development', 'url' => '/services/web-development', 'target' => '_self', 'icon' => null],
                    ['label' => 'Web App Development', 'url' => '/services/web-app-development', 'target' => '_self', 'icon' => null],
                ],
            ],
            'footer_legal' => [
                'name' => 'Footer — Legal',
                'items' => [
                    ['label' => 'Privacy Policy', 'url' => '/privacy', 'target' => '_self', 'icon' => null],
                    ['label' => 'Terms of Service', 'url' => '/terms', 'target' => '_self', 'icon' => null],
                ],
            ],
        ];

        foreach ($menus as $handle => $menu) {
            NavigationMenu::query()->updateOrCreate(
                ['handle' => $handle],
                [
                    'name' => $menu['name'],
                    'items' => $menu['items'],
                    'is_active' => true,
                ],
            );
        }
    }
}
