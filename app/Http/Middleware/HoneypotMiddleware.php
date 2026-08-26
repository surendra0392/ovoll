<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class HoneypotMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $honeypotField = '_hp_trap';
        $timeField = '_hp_time';
        $minTime = 3; // Minimum seconds a human takes to fill the form

        // If honeypot is filled, it's a bot
        if ($request->filled($honeypotField)) {
            Log::info('Spam bot detected via honeypot field', ['ip' => $request->ip()]);

            // Return success to fool the bot
            return back()->with('success', 'Thank you! Your inquiry has been received.');
        }

        // Check time to complete form
        $time = $request->input($timeField);
        if ($time && is_numeric($time)) {
            $diff = time() - (int) $time;
            if ($diff < $minTime) {
                Log::info('Spam bot detected via speed trap', ['ip' => $request->ip(), 'time' => $diff]);

                return back()->with('success', 'Thank you! Your inquiry has been received.');
            }
        }

        return $next($request);
    }
}
