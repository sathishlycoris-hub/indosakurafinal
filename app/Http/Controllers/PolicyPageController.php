<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Policy;
use Inertia\Inertia;

class PolicyPageController extends Controller
{
    public function index($slug = null)
    {
        $policies = Policy::with('sections')
            ->orderBy('sort_order')
            ->get();

        if ($policies->isEmpty()) {
            return Inertia::render('Corporate/Policy', [
                'policies' => [],
                'activePolicy' => null,
            ]);
        }

        $activePolicy = $slug
            ? $policies->firstWhere('slug', $slug)
            : $policies->first();

        return Inertia::render('Corporate/Policy', [
            'policies' => $policies->values(), // force array
            'activePolicy' => $activePolicy,
        ]);
    }
}
