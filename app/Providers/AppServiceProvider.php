<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\ServiceProvider;
use App\Models\Service;
use App\Models\Solution;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'lang' => fn() => app()->getLocale(),

            // 'lang' => fn() => session('lang', 'en'),
            'flash' => fn() => [
                'success' => session('success'),
                'error' => session('error'),
            ],

            //  GLOBAL service navigation
            'serviceNav' => fn() => Service::select('title', 'title_ja', 'slug')
                ->orderBy('id')
                ->get(),

            'footerServices' => fn() =>
            Service::select('title', 'title_ja', 'slug')->orderBy('slug')->get(),

            'footerSolutions' => fn() =>
            Solution::select('title', 'title_ja', 'slug')->orderBy('id')->get(),
        ]);
    }
}
