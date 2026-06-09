<?php

namespace App\Http\Controllers;

use App\Models\Seminar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Seo;

class SeminarPageController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Seminars', [
            'upcomingSeminars' => Seminar::where('status', 'upcoming')
                ->orderBy('date')
                ->get(),

            'archivedSeminars' => Seminar::where('status', 'archived')
                ->orderBy('date', 'desc')
                ->get(),
            'seo' => Seo::where('page', 'seminars')->first(),
        ]);
    }

    public function show(Seminar $seminar)
    {
        $lang = app()->getLocale();
        return Inertia::render('Seminar/SeminarDetail', [
            'seminar' => $seminar,
            'pageSeo' => [
                'meta_title'       => $seminar->getEffectiveMetaTitle($lang),
                'meta_description' => $seminar->getEffectiveMetaDescription($lang),
                'meta_keywords'    => $lang === 'ja'
                    ? ($seminar->meta_keywords_ja ?? $seminar->meta_keywords ?? '')
                    : ($seminar->meta_keywords ?? ''),
                'og_image' => $seminar->og_image
                    ? asset('storage/' . $seminar->og_image)
                    : ($seminar->image ? asset('storage/' . $seminar->image) : null),
            ],
        ]);
    }
}
