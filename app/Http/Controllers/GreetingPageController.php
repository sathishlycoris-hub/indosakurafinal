<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Greeting;
use Inertia\Inertia;

class GreetingPageController extends Controller
{
    public function index()
    {
        $greeting = Greeting::latest()->first();
        $lang     = app()->getLocale();

        return Inertia::render('Corporate/Greetings', [
            'greeting' => $greeting,
            'pageSeo'  => $greeting ? [
                'meta_title'       => $greeting->getEffectiveMetaTitle($lang),
                'meta_description' => $greeting->getEffectiveMetaDescription($lang),
                'meta_keywords'    => $lang === 'ja'
                    ? ($greeting->meta_keywords_ja ?? $greeting->meta_keywords ?? '')
                    : ($greeting->meta_keywords ?? ''),
                'og_image' => $greeting->og_image
                    ? asset('storage/' . $greeting->og_image)
                    : ($greeting->image ? asset('storage/' . $greeting->image) : null),
            ] : null,
        ]);
    }
}