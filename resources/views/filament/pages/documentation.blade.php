<x-filament-panels::page>
    @php
        $sections = [
            [
                'icon' => 'heroicon-o-document-text',
                'title' => 'Content',
                'summary' => 'Create and publish the words, articles, and pages your visitors read.',
                'items' => [
                    ['Articles', 'Write blog posts and news. Organise them with Categories, Tags and Series, and attribute each to an Author. Use the status toggle to move a post from Draft to Published.'],
                    ['Pages', 'Build standalone pages (About, Contact, Landing pages). Each page has its own slug and SEO settings.'],
                    ['FAQs', 'Add frequently asked questions that appear in FAQ blocks across the site. Reorder them by dragging.'],
                    ['Authors', 'Manage the writers shown as bylines on articles, including their bio and avatar.'],
                ],
            ],
            [
                'icon' => 'heroicon-o-briefcase',
                'title' => 'Portfolio & Offerings',
                'summary' => 'Showcase what the business provides.',
                'items' => [
                    ['Services', 'Describe the services you offer, grouped by Service Categories. Mark entries as active or featured directly from the table toggles.'],
                    ['Products', 'List products with descriptions, media, and pricing details.'],
                    ['Tools & Resources', 'Publish downloadable tools and resources, each organised by their own categories and tags.'],
                ],
            ],
            [
                'icon' => 'heroicon-o-megaphone',
                'title' => 'Marketing & Leads',
                'summary' => 'Capture and follow up with people who contact you.',
                'items' => [
                    ['Leads', 'Every contact-form submission lands here. Review new leads (see the Latest Leads widget on the Dashboard) and track them through your pipeline.'],
                    ['Newsletter Subscribers', 'View and export everyone who signed up for the newsletter.'],
                    ['Email Templates', 'Edit the reusable emails the system sends, such as confirmations and notifications.'],
                ],
            ],
            [
                'icon' => 'heroicon-o-photo',
                'title' => 'Media Library',
                'summary' => 'One central place for every uploaded file.',
                'items' => [
                    ['Uploads', 'Images and documents you upload are stored centrally and can be reused across Articles, Services, and Pages instead of uploading the same file twice.'],
                    ['Conversions', 'Uploaded images are automatically resized into optimised versions for fast page loads.'],
                ],
            ],
            [
                'icon' => 'heroicon-o-magnifying-glass',
                'title' => 'SEO',
                'summary' => 'Control how pages appear in search engines and social shares.',
                'items' => [
                    ['SEO Settings', 'When editing an Article or Page, open the SEO section to set the meta title, meta description, and Open Graph image used by Google and social previews.'],
                    ['Defaults', 'Site-wide SEO fallbacks are configured under Settings, so any content without its own values still looks correct.'],
                ],
            ],
            [
                'icon' => 'heroicon-o-cog-6-tooth',
                'title' => 'Settings & Website',
                'summary' => 'Global configuration for the whole site.',
                'items' => [
                    ['Global Settings', 'Set the site name, logos, favicon, contact details, social links, and analytics IDs. The favicon here is also used by this admin panel.'],
                    ['Navigation Menus', 'Build the header and footer menus. Each menu item has a label, link, and optional icon.'],
                    ['Offices', 'Manage office locations and their contact information shown on the Contact page.'],
                ],
            ],
            [
                'icon' => 'heroicon-o-shield-check',
                'title' => 'System & Access',
                'summary' => 'Administration, security, and your own account.',
                'items' => [
                    ['Roles & Permissions', 'Access is controlled by roles. Only Administrators can reach the System section or assign roles to other users.'],
                    ['Profile', 'Update your own name, email, and password from the Profile link in the top-right user menu. To change your password, type a new one and the Confirm and Current password fields will appear.'],
                    ['Health', 'The System Health widget on the Dashboard reports the status of the database, cache, and storage.'],
                ],
            ],
        ];
    @endphp

    <div class="grid gap-6">
        @foreach ($sections as $section)
            <x-filament::section :icon="$section['icon']">
                <x-slot name="heading">{{ $section['title'] }}</x-slot>
                <x-slot name="description">{{ $section['summary'] }}</x-slot>

                <dl class="divide-y divide-gray-100 dark:divide-white/10">
                    @foreach ($section['items'] as [$term, $definition])
                        <div class="grid gap-1 py-3 sm:grid-cols-4 sm:gap-4">
                            <dt class="text-sm font-semibold text-gray-950 dark:text-white">{{ $term }}</dt>
                            <dd class="text-sm text-gray-500 dark:text-gray-400 sm:col-span-3">{{ $definition }}</dd>
                        </div>
                    @endforeach
                </dl>
            </x-filament::section>
        @endforeach
    </div>
</x-filament-panels::page>
