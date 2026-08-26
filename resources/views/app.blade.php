<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark" style="background-color: #04070D; color-scheme: dark;">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#04070D">
        <meta name="color-scheme" content="dark">
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
        <style>
            html, body { background-color: #04070D !important; color: #FFFFFF; margin: 0; padding: 0; }
            #splash { position: fixed; inset: 0; z-index: 99999; display: flex; align-items: center; justify-content: center; background-color: #04070D; }
        </style>

        @php($faviconUrl = \App\Support\SiteData::shared()['settings']['site']['favicon_url'] ?? null)
        @if ($faviconUrl)
            <link rel="icon" href="{{ $faviconUrl }}">
            <link rel="apple-touch-icon" href="{{ $faviconUrl }}">
        @else
            <link rel="icon" href="/favicon.ico" sizes="any">
            <link rel="icon" href="/favicon.svg" type="image/svg+xml">
            <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        @endif


        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />

        @php($splashSite = \App\Support\SiteData::shared()['settings']['site'] ?? [])
        @php($splashLogoUrl = $splashSite['header_logo_url'] ?? null)
        @php($splashSiteName = $splashSite['site_name'] ?? 'OVOLL')

        {{-- Static first-paint splash: the brand shows from the very first paint,
             styled by app.css, well before the JS bundle hydrates. It matches the
             site-wide preloader exactly, so the takeover is seamless. React removes
             it on mount; the CSS fade-out is a no-JS safety net. --}}
        <div
            id="splash"
            role="status"
            aria-live="polite"
            class="fixed inset-0 z-[99999] flex select-none flex-col items-center justify-center bg-surface-base"
        >
            <div class="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(46,196,165,0.08)_0%,_transparent_70%)]"></div>

            <div class="relative z-10 flex flex-col items-center gap-3">
                @if ($splashLogoUrl)
                    <img
                        src="{{ $splashLogoUrl }}"
                        alt="{{ $splashSiteName }}"
                        class="max-h-16 w-auto max-w-[260px] object-contain"
                    >
                @else
                    <div class="flex items-center gap-3">
                        <div class="relative flex h-8 w-8 shrink-0 items-center justify-center">
                            <div class="absolute inset-0 rounded-full border border-[#00D1FF]/30"></div>
                            <div class="absolute h-6 w-6 rounded-full border border-dashed border-[#14B8A6] animate-[spin_10s_linear_infinite]"></div>
                            <div class="h-2 w-2 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] animate-pulse"></div>
                        </div>
                        <span class="font-sans text-xl font-bold tracking-widest text-white md:text-2xl">{{ $splashSiteName }}</span>
                    </div>
                @endif
                <span class="sr-only">Loading</span>
            </div>

            <div class="absolute bottom-16 left-1/2 z-10 h-px w-40 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
                <div class="splash-band h-full w-1/3 bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] animate-[splash-travel_1.8s_ease-in-out_infinite]"></div>
            </div>
        </div>
    </body>
</html>
