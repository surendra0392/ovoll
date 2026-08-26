<?php

namespace App\Providers\Filament;

use Althinect\FilamentSpatieRolesPermissions\FilamentSpatieRolesPermissionsPlugin;
use App\Filament\Pages\EditProfile;
use App\Filament\Widgets\CmsOverviewWidget;
use App\Filament\Widgets\ContentBreakdownChartWidget;
use App\Filament\Widgets\LatestArticlesWidget;
use App\Filament\Widgets\LatestLeadsWidget;
use App\Filament\Widgets\LeadsChartWidget;
use App\Support\SiteData;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationGroup;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use ShuvroRoy\FilamentSpatieLaravelHealth\FilamentSpatieLaravelHealthPlugin;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->profile(EditProfile::class, isSimple: false)

            ->colors([
                'primary' => Color::Teal,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                CmsOverviewWidget::class,
                LeadsChartWidget::class,
                ContentBreakdownChartWidget::class,
                LatestLeadsWidget::class,
                LatestArticlesWidget::class,
            ])
            ->brandName('OVOLL Premium CMS')
            ->brandLogo(asset('images/logo.png'))
            ->brandLogoHeight('2.2rem')
            ->favicon($this->faviconUrl())

            ->navigationGroups([
                NavigationGroup::make()
                    ->label('Dashboard'),
                NavigationGroup::make()
                    ->label('Website'),
                NavigationGroup::make()
                    ->label('Content'),
                NavigationGroup::make()
                    ->label('Portfolio'),
                NavigationGroup::make()
                    ->label('Marketing'),
                NavigationGroup::make()
                    ->label('Media'),
                NavigationGroup::make()
                    ->label('SEO'),
                NavigationGroup::make()
                    ->label('Forms'),
                NavigationGroup::make()
                    ->label('Analytics'),
                NavigationGroup::make()
                    ->label('System'),
                NavigationGroup::make()
                    ->label('Settings'),
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->plugins([
                FilamentSpatieRolesPermissionsPlugin::make(),

                FilamentSpatieLaravelHealthPlugin::make(),
            ]);
    }

    public function boot(): void
    {
        // Workaround for a Filament bug where the sidebar store persists
        // `collapsedGroups` with a null default and then calls `.includes()`
        // on it. Seeds valid persist values before the core bundle evaluates
        // the store — see public/js/ovoll-sidebar-persist-seed.js.
        FilamentView::registerRenderHook(
            PanelsRenderHook::HEAD_START,
            fn (): string => '<script src="'.e(asset('js/ovoll-sidebar-persist-seed.js')).'"></script>',
        );
    }

    /**
     * Resolve the browser favicon from the admin's Global Settings
     * (site_info.favicon on the public disk). Falls back to null so
     * Filament uses its default when no favicon is configured, and is
     * guarded so a missing settings table never breaks the panel boot.
     */
    private function faviconUrl(): ?string
    {
        try {
            return SiteData::shared()['settings']['site']['favicon_url'] ?? null;
        } catch (\Throwable) {
            return null;
        }
    }
}
