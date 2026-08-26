<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\SiteSetting;
class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],

             // ── Shared globally — used by Header, Footer, FloatingActions ──
            'siteSettings' => fn () => SiteSetting::firstOrCreate([]),

            // ── Shared globally — used by Header and every page that switches
            // EN/JA copy. Must be a closure (lazy prop): HandleInertiaRequests
            // runs BEFORE SetLocale in the middleware stack, so a plain
            // app()->getLocale() call here would capture last request's locale,
            // not this one. Inertia resolves closures later, when the response
            // is actually built — by then SetLocale has already run.
            'lang' => fn () => app()->getLocale(),

            // ── True on .co.jp (English-only, no toggle). Header.tsx uses this
            // to hide the EN/JA switcher entirely. Set by SetLocale middleware.
            'langLocked' => fn () => (bool) $request->attributes->get('langLocked', false),

        ];
    }
}