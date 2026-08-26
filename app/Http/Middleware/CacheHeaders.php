<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CacheHeaders
{
    /**
     * Apply cache-control headers for better browser caching.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only cache GET requests that succeed
        if ($request->isMethod('GET') && $response->isSuccessful()) {
            $response->headers->set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
            $response->headers->set('Expires', gmdate('D, d M Y H:i:s', time() + 3600).' GMT');
        }

        return $response;
    }
}
