<?php

namespace App\Http\Middleware;

use App\Support\SiteData;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $site = SiteData::shared();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            // Editable CMS data, shared on every page so the header, footer,
            // and SEO head stay in sync with the admin panel.
            'settings' => $site['settings'],
            'navigation' => $site['navigation'],
            'seo' => [
                ...$site['seo'],
                'canonical' => $request->url(),
            ],
        ];
    }
}
