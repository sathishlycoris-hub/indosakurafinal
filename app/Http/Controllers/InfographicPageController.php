<?php

namespace App\Http\Controllers;

use App\Models\Infographic;
use Inertia\Inertia;
use App\Models\Seo;
use App\Models\InfographicPage;
class InfographicPageController extends Controller
{
    public function index()
{
    return Inertia::render('Infographics', [
        'infographics' => Infographic::where('status', 'published')
            ->orderBy('published_date', 'desc')
            ->get(),
        'seo'      => Seo::where('page', 'infographics')->first(),
        'pageData' => InfographicPage::first(), // ← add
    ]);
}

    public function show(Infographic $infographic)
    {
        abort_if($infographic->status !== 'published', 404);

        $related = Infographic::where('status', 'published')
            ->where('id', '!=', $infographic->id)
            ->orderBy('published_date', 'desc')
            ->limit(3)
            ->get();

        $lang = app()->getLocale();

        return Inertia::render('Infographics/InfographicDetails', [
            'infographic' => $infographic,
            'related'     => $related,
            'pageSeo' => [
                'meta_title'       => $infographic->getEffectiveMetaTitle($lang),
                'meta_description' => $infographic->getEffectiveMetaDescription($lang),
                'meta_keywords'    => $lang === 'ja'
                    ? ($infographic->meta_keywords_ja ?? $infographic->meta_keywords ?? '')
                    : ($infographic->meta_keywords ?? ''),
                'og_image' => $infographic->og_image
                    ? asset('storage/' . $infographic->og_image)
                    : ($infographic->image ? asset('storage/' . $infographic->image) : null),
            ],
        ]);
    }
}