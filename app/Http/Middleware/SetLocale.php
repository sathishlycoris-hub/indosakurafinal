<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * Language resolution is domain-based:
     *
     *  - Visitors on a .co.jp host always get Japanese, and the language is
     *    LOCKED — no toggle, no session override. This matches indosakura.co.jp
     *    being a Japanese-only entry point.
     *  - Visitors on any other host (indosakura.com, localhost, staging, etc.)
     *    default to English on first visit, but can switch to Japanese via the
     *    header toggle (POST /set-language), which is remembered in session
     *    for the rest of their visit.
     *
     * The resolved "is the switcher allowed" flag is stashed on the request so
     * HandleInertiaRequests can share it with the frontend as `langLocked`,
     * letting Header.tsx hide the toggle entirely on .co.jp.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $host = strtolower($request->getHost());
        $isJpDomain = str_ends_with($host, '.co.jp');

        if ($isJpDomain) {
            // Locked: always Japanese, ignore/clear any stored toggle choice.
            session(['lang' => 'ja']);
            app()->setLocale('ja');
        } else {
            // Default to English on first visit this session; otherwise respect
            // whatever the visitor last picked via the /set-language toggle.
            if (!session()->has('lang')) {
                session(['lang' => 'en']);
            }
            app()->setLocale(session('lang', 'en'));
        }

        $request->attributes->set('langLocked', $isJpDomain);

        return $next($request);
    }
}