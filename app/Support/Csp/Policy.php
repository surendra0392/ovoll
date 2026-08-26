<?php

namespace App\Support\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Presets\Basic;

class Policy extends Basic
{
    public function configure(\Spatie\Csp\Policy $policy): void
    {
        // Base sources mirror Spatie's Basic preset, except styles keep
        // 'unsafe-inline' instead of a nonce: runtime-injected <style> elements
        // (framer-motion keyframes, Livewire/Alpine helpers) are created after
        // the response is built, so a server-side nonce can never authorize
        // them. Scripts — the directive that actually needs the nonce — keep it.
        if (config('csp.nonce_enabled')) {
            $policy
                ->addNonce(Directive::SCRIPT)
                ->add(Directive::SCRIPT, Keyword::STRICT_DYNAMIC);
        } else {
            $policy
                ->add(Directive::SCRIPT, Keyword::SELF)
                ->add(Directive::SCRIPT, Keyword::UNSAFE_INLINE);
        }

        $policy
            ->add(Directive::BASE, Keyword::SELF)
            ->add(Directive::CONNECT, Keyword::SELF)
            ->add(Directive::DEFAULT, Keyword::SELF)
            ->add(Directive::FONT, Keyword::SELF)
            ->add(Directive::FORM_ACTION, Keyword::SELF)
            ->add(Directive::FRAME, Keyword::SELF)
            ->add(Directive::IMG, Keyword::SELF)
            ->add(Directive::MEDIA, Keyword::SELF)
            ->add(Directive::OBJECT, Keyword::NONE)
            ->add(Directive::STYLE, Keyword::SELF)

            // Required for Tailwind CSS + Inertia (also covers React SSR style
            // attributes — nonces cannot authorize attributes)
            ->add(Directive::STYLE, Keyword::UNSAFE_INLINE)

            // Scripts are mode-aware: with nonces on, 'strict-dynamic' makes
            // 'self'/'unsafe-inline' ignored, so every <script> tag must carry
            // the nonce (the AddNonceToInlineTags middleware injects it into
            // all of them, and nonce-trusted scripts may load further scripts
            // dynamically). With nonces off, fall back to 'self' + 'unsafe-inline'.
            ->add(Directive::SCRIPT, Keyword::UNSAFE_EVAL)
            // The spatie media-library responsive-image blade ships an inline
            // onload handler; nonces cannot authorize event-handler attributes
            // (only <script> elements), so allow them explicitly. Tradeoff:
            // inline event handlers are an XSS sink, but the only one in the
            // codebase is this progressive-enhancement image sizing hook.
            ->add(Directive::SCRIPT_ATTR, Keyword::UNSAFE_INLINE)

            // Allow self + Sentry for error reporting
            ->add(Directive::CONNECT, Keyword::SELF)
            ->add(Directive::CONNECT, 'https://*.sentry.io')

            // Font sources — self-hosted Geist + Bunny CDN fallback
            ->add(Directive::FONT, Keyword::SELF)
            ->add(Directive::FONT, 'https://fonts.bunny.net')

            // Image sources
            ->add(Directive::IMG, Keyword::SELF)
            ->add(Directive::IMG, 'data:')
            ->add(Directive::IMG, 'blob:')
            ->add(Directive::IMG, 'https://*.ovoll.com')
            // Filament admin user avatars (ui-avatars.com)
            ->add(Directive::IMG, 'https://ui-avatars.com')
            // The app's configured origin — content stores absolute asset URLs
            // (e.g. APP_URL=http://ovoll.test in local dev), so images must be
            // allowed even when the site is browsed via another loopback host.
            // In production this equals 'self' and is a no-op.
            ->add(Directive::IMG, config('app.url'))

            // Media sources
            ->add(Directive::MEDIA, Keyword::SELF)
            ->add(Directive::MEDIA, 'https://*.ovoll.com')

            // Frame ancestors — defense in depth against clickjacking
            ->add(Directive::FRAME_ANCESTORS, Keyword::SELF);
    }
}
