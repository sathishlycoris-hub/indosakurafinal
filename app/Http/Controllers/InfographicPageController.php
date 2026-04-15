<?php

namespace App\Http\Controllers;

use App\Models\Infographic;
use Inertia\Inertia;

class InfographicPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Infographics', [
            'infographics' => Infographic::where('status', 'published')
                ->orderBy('published_date', 'desc')
                ->get(),
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

        return Inertia::render('Infographics/InfographicDetails', [
            'infographic' => $infographic,
            'related'     => $related,
        ]);
    }
}