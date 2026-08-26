<?php

use App\Models\GlobalSetting;
use App\Models\NavigationMenu;
use App\Support\SiteData;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

it('shares global settings, navigation and seo on every page', function () {
    GlobalSetting::query()->create([
        'site_info' => ['name' => 'OVOLL'],
        'contact_info' => ['email' => 'hello@ovoll.com'],
        'social_links' => ['twitter' => 'https://x.com/ovoll'],
        'meta_defaults' => ['title' => 'Home', 'description' => 'Desc'],
    ]);

    NavigationMenu::query()->create([
        'name' => 'Header Navigation',
        'handle' => 'header',
        'items' => [
            ['label' => 'Services', 'url' => '/services', 'target' => '_self'],
        ],
        'is_active' => true,
    ]);

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('settings.contact.email', 'hello@ovoll.com')
            ->where('settings.social.twitter', 'https://x.com/ovoll')
            ->where('navigation.header.0.label', 'Services')
            ->where('navigation.header.0.href', '/services')
            ->where('seo.title', 'Home')
            ->has('seo.canonical')
        );
});

it('omits inactive navigation menus from shared data', function () {
    NavigationMenu::query()->create([
        'name' => 'Hidden',
        'handle' => 'header',
        'items' => [['label' => 'X', 'url' => '/x']],
        'is_active' => false,
    ]);

    expect(SiteData::shared()['navigation'])->not->toHaveKey('header');
});

it('resolves a public url for the uploaded favicon', function () {
    GlobalSetting::query()->create([
        'site_info' => ['favicon' => 'favicons/icon.png'],
    ]);

    $site = SiteData::shared()['settings']['site'];

    expect($site['favicon_url'])->toBe(Storage::disk('public')->url('favicons/icon.png'));

});

it('flushes the cache when a navigation menu is saved', function () {

    $menu = NavigationMenu::query()->create([
        'name' => 'Header',
        'handle' => 'header',
        'items' => [['label' => 'Services', 'url' => '/services']],
        'is_active' => true,
    ]);

    // Prime the cache.
    expect(SiteData::shared()['navigation']['header'][0]['label'])->toBe('Services');

    // Saving should flush the cache so the next read reflects the change.
    $menu->update(['items' => [['label' => 'Products', 'url' => '/products']]]);

    expect(SiteData::shared()['navigation']['header'][0]['label'])->toBe('Products');
});
