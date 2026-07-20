<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * Language resolution order:
     *  1. If the visitor already has a language in their session (we only ever
     *     write this from detectLocale() below — there is no manual toggle
     *     anymore), just use that — no re-detection, ever, for this session.
     *  2. Otherwise (first visit this session): guess a sensible default from
     *     their IP location — Japan => ja, everything else (including India) => en.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!session()->has('lang')) {
            session(['lang' => $this->detectLocale($request)]);
        }

        app()->setLocale(session('lang', 'en'));

        return $next($request);
    }

    /**
     * Best-effort geolocation-based default. Falls back to 'en' whenever
     * anything is uncertain (local/dev environment, private IP, API failure, timeout).
     *
     * Uses ipwho.is — free, no API key, HTTPS-only (safer for production egress
     * than HTTP-only free tiers, which some hosts/firewalls block on port 80).
     */
    private function detectLocale(Request $request): string
    {
        $ip = $request->ip();

        // Don't attempt geo lookups for local/dev/private addresses.
        if (
            app()->environment('local') ||
            !$ip ||
            in_array($ip, ['127.0.0.1', '::1'], true) ||
            filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false
        ) {
            return 'en';
        }

        try {
            $response = Http::timeout(2)
                ->retry(1, 100)
                ->get("https://ipwho.is/{$ip}", [
                    'fields' => 'success,country_code',
                ]);

            if ($response->ok() && $response->json('success') === true) {
                return $response->json('country_code') === 'JP' ? 'ja' : 'en';
            }
        } catch (\Throwable $e) {
            Log::debug('Geo-locale detection failed, defaulting to en', [
                'ip'    => $ip,
                'error' => $e->getMessage(),
            ]);
        }

        return 'en';
    }
}