<?php

namespace App\Listeners;

use Illuminate\Foundation\Http\Events\RequestHandled;
use Symfony\Component\HttpFoundation\StreamedResponse;

class InjectCspNonces
{
    /**
     * Inject the per-request CSP nonce into every <script> tag of the final
     * HTML response.
     *
     * This runs on RequestHandled — deliberately not as middleware — because
     * Livewire's SupportAutoInjectedAssets appends its livewire.js tag to the
     * response in its own RequestHandled listener, i.e. after the middleware
     * stack has finished. Under the nonce + 'strict-dynamic' script-src policy,
     * 'self' is ignored, so every script tag (inline and external) must carry
     * the nonce. Registered after Livewire's listener, so it sees the complete
     * document. See app/Support/Csp/Policy.php.
     */
    public function handle(RequestHandled $event): void
    {
        $response = $event->response;

        if (! config('csp.enabled') || ! config('csp.nonce_enabled')) {
            return;
        }

        if ($response instanceof StreamedResponse) {
            return;
        }

        if (! $response->headers->has('Content-Security-Policy')) {
            return;
        }

        if (! str_contains((string) $response->headers->get('Content-Type', ''), 'text/html')) {
            return;
        }

        $content = $response->getContent();
        if (! is_string($content) || $content === '') {
            return;
        }

        $nonce = app('csp-nonce');
        if (empty($nonce)) {
            return;
        }

        // Every <script> tag — inline blocks and external src tags alike — and
        // skips tags that already carry a nonce.
        $content = preg_replace_callback(
            '/<script\b(?![^>]*\snonce=)[^>]*>/i',
            fn (array $match): string => substr($match[0], 0, -1).' nonce="'.$nonce.'">',
            $content,
        );

        if ($content !== null) {
            // setContent() replaces the response's "original" (the View behind
            // Inertia pages), which tests read via viewData() — restore it.
            $original = $response->original ?? null;
            $response->setContent($content);
            $response->original = $original;
        }
    }
}
