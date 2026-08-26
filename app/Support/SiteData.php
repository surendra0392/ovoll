<?php

namespace App\Support;

use App\Models\GlobalSetting;
use App\Models\NavigationMenu;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

/**
 * Resolves editable CMS data (global settings + navigation menus) into clean,
 * frontend-ready shapes and shares them as global Inertia props. Results are
 * cached so the extra queries never run on the hot path; the cache is flushed
 * whenever the underlying models are saved (see the models' booted() hooks).
 */
class SiteData
{
    private const CACHE_KEY = 'site_data.shared_props';

    private const CACHE_TTL = 3600;

    /**
     * @return array{settings: array<string, mixed>, navigation: array<string, mixed>, seo: array<string, mixed>}
     */
    public static function shared(): array
    {
        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function (): array {
            $settings = GlobalSetting::query()->first();

            return [
                'settings' => self::settings($settings),
                'navigation' => self::navigation(),
                'seo' => self::seoDefaults($settings),
            ];
        });
    }

    /**
     * Clear the cached site data. Called from model booted() hooks on save/delete.
     */
    public static function flush(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    /**
     * @return array<string, mixed>
     */
    private static function settings(?GlobalSetting $settings): array
    {
        $site = $settings?->site_info ?? [];
        $disk = Storage::disk('public');
        if (! empty($site['header_logo'])) {
            $site['header_logo_url'] = $disk->url($site['header_logo']);
        }
        if (! empty($site['footer_logo'])) {
            $site['footer_logo_url'] = $disk->url($site['footer_logo']);
        }
        if (! empty($site['favicon'])) {
            $site['favicon_url'] = $disk->url($site['favicon']);
        }

        return [
            'site' => $site,
            'contact' => $settings?->contact_info ?? [],
            'social' => $settings?->social_links ?? [],
            'analytics' => $settings?->analytics_ids ?? [],
        ];
    }

    /**
     * Resolve every active navigation menu keyed by its handle. Each item is
     * normalised to { label, href, target, icon } so the frontend can consume
     * a stable shape. Returns an empty object when no menus exist, letting the
     * React components fall back to their built-in defaults (no design change).
     *
     * @return array<string, array<int, array<string, mixed>>>
     */
    private static function navigation(): array
    {
        return NavigationMenu::query()
            ->where('is_active', true)
            ->get()
            ->mapWithKeys(fn (NavigationMenu $menu): array => [
                $menu->handle => collect($menu->items ?? [])
                    ->map(fn (array $item): array => [
                        'label' => $item['label'] ?? '',
                        'href' => $item['url'] ?? '#',
                        'target' => $item['target'] ?? '_self',
                        'icon' => $item['icon'] ?? null,
                    ])
                    ->values()
                    ->all(),
            ])
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    private static function seoDefaults(?GlobalSetting $settings): array
    {
        $meta = $settings?->meta_defaults ?? [];

        return [
            'title' => $meta['title'] ?? null,
            'description' => $meta['description'] ?? null,
            'image' => $meta['og_image'] ?? ($meta['image'] ?? null),
            'keywords' => $meta['keywords'] ?? null,
        ];
    }
}
